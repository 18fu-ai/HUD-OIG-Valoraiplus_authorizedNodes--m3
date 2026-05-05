/**
 * VERIFICATION ENDPOINT
 * 
 * External parties can verify exported packages without
 * needing access to the original system.
 * 
 * POST /api/verification/verify - Verify a package
 * GET /api/verification/verify - Get verification info
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  sha256,
  verifyReceipt,
  verifyChain,
  type VerificationReceipt,
} from '@/lib/verification';

// ============================================================
// REQUEST SCHEMAS
// ============================================================

const VerifyRequestSchema = z.object({
  canonical_json: z.string(),
  sha256: z.string(),
  receipt: z.object({
    type: z.literal('VERIFICATION_RECEIPT'),
    version: z.string(),
    issued_at: z.string(),
    hash: z.string(),
    key_id: z.string(),
    signature: z.string(),
    nonce: z.string(),
  }),
  chain_id: z.string().optional(),
});

// ============================================================
// VERIFICATION RESULT
// ============================================================

interface VerificationResult {
  valid: boolean;
  timestamp: string;
  checks: {
    hash_match: boolean;
    receipt_hash_match: boolean;
    signature_valid: boolean;
    chain_valid?: boolean;
  };
  reason?: string;
  details?: string;
}

// ============================================================
// POST /api/verification/verify
// ============================================================

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    
    // Parse request
    const parseResult = VerifyRequestSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        {
          valid: false,
          timestamp: new Date().toISOString(),
          checks: {
            hash_match: false,
            receipt_hash_match: false,
            signature_valid: false,
          },
          reason: 'INVALID_REQUEST',
          details: parseResult.error.message,
        } as VerificationResult,
        { status: 400 }
      );
    }
    
    const { canonical_json, sha256: providedHash, receipt, chain_id } = parseResult.data;
    
    const result: VerificationResult = {
      valid: false,
      timestamp: new Date().toISOString(),
      checks: {
        hash_match: false,
        receipt_hash_match: false,
        signature_valid: false,
      },
    };
    
    // Step 1: Recompute hash from canonical JSON
    const computedHash = sha256(canonical_json);
    result.checks.hash_match = computedHash === providedHash;
    
    if (!result.checks.hash_match) {
      result.reason = 'HASH_MISMATCH';
      result.details = 'Computed hash does not match provided hash';
      return NextResponse.json(result);
    }
    
    // Step 2: Verify receipt hash matches export hash
    result.checks.receipt_hash_match = receipt.hash === providedHash;
    
    if (!result.checks.receipt_hash_match) {
      result.reason = 'RECEIPT_HASH_MISMATCH';
      result.details = 'Receipt hash does not match export hash';
      return NextResponse.json(result);
    }
    
    // Step 3: Verify receipt signature
    const receiptObj: VerificationReceipt = {
      type: receipt.type,
      version: receipt.version as '1.0.0',
      issued_at: receipt.issued_at,
      hash: receipt.hash,
      key_id: receipt.key_id,
      signature: receipt.signature,
      nonce: receipt.nonce,
    };
    
    result.checks.signature_valid = verifyReceipt(receiptObj);
    
    if (!result.checks.signature_valid) {
      result.reason = 'INVALID_SIGNATURE';
      result.details = 'Receipt signature verification failed';
      return NextResponse.json(result);
    }
    
    // Step 4: Optional chain verification
    if (chain_id) {
      const chainResult = verifyChain(chain_id);
      result.checks.chain_valid = chainResult.valid;
      
      if (!chainResult.valid) {
        result.reason = 'CHAIN_BROKEN';
        result.details = `Event chain verification failed: ${chainResult.reason}`;
        return NextResponse.json(result);
      }
    }
    
    // All checks passed
    result.valid = true;
    return NextResponse.json(result);
    
  } catch (error) {
    console.error('[Verification API] Error:', error);
    
    return NextResponse.json(
      {
        valid: false,
        timestamp: new Date().toISOString(),
        checks: {
          hash_match: false,
          receipt_hash_match: false,
          signature_valid: false,
        },
        reason: 'INTERNAL_ERROR',
        details: error instanceof Error ? error.message : 'Unknown error',
      } as VerificationResult,
      { status: 500 }
    );
  }
}

// ============================================================
// GET /api/verification/verify
// ============================================================

export async function GET(): Promise<NextResponse> {
  return NextResponse.json({
    protocol: 'VALORAIPLUS_VERIFICATION',
    version: '1.0.0',
    endpoint: '/api/verification/verify',
    description: 'Verify exported packages without access to original system',
    algorithm: 'HMAC-SHA256',
    
    flow: [
      '1. Receive canonical_json and sha256',
      '2. Recompute hash: SHA-256(canonical_json)',
      '3. Compare: computed_hash === provided_sha256',
      '4. Verify receipt signature',
      '5. Optional: verify event chain integrity',
      '6. Return verification result',
    ],
    
    invariant: {
      rule: 'If data changes → hash breaks → signature invalid → verification fails',
      implication: 'System is rejected if any tampering occurs',
    },
    
    usage: {
      method: 'POST',
      body: {
        canonical_json: 'The exact JSON string that was hashed',
        sha256: 'The claimed hash of the canonical JSON',
        receipt: {
          type: 'VERIFICATION_RECEIPT',
          version: '1.0.0',
          issued_at: 'ISO timestamp',
          hash: 'Must match sha256',
          key_id: 'Signing key identifier',
          signature: 'HMAC-SHA256 signature (base64)',
          nonce: 'Random nonce for replay protection',
        },
        chain_id: 'Optional: event chain ID for chain verification',
      },
    },
    
    responses: {
      valid: {
        valid: true,
        timestamp: 'ISO timestamp',
        checks: {
          hash_match: true,
          receipt_hash_match: true,
          signature_valid: true,
          chain_valid: 'true if chain_id provided',
        },
      },
      invalid: {
        valid: false,
        timestamp: 'ISO timestamp',
        checks: { '...': 'partial check results' },
        reason: 'HASH_MISMATCH | RECEIPT_HASH_MISMATCH | INVALID_SIGNATURE | CHAIN_BROKEN',
        details: 'Human-readable explanation',
      },
    },
    
    timestamp: new Date().toISOString(),
  });
}
