// Verification Layer - Validates signatures without submitting to contract
// POST /api/verify

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { verifyIntentReadOnly, verifyIntentBatch } from '@/lib/protocol/verifyIntent';
import { type IntentType, validateIntentPayload } from '@/lib/protocol/eip712';
import { getNonce, getNoncesBatch } from '@/lib/protocol/nonceStore';

// Single verification request schema
const VerifyRequestSchema = z.object({
  intentType: z.enum([
    'LatchExhibit',
    'CreateRevision',
    'NullifyNode',
    'UpdateAnchor',
    'ApproveVerifier',
  ]),
  payload: z.record(z.unknown()),
});

// Batch verification request schema
const BatchVerifyRequestSchema = z.object({
  intents: z.array(VerifyRequestSchema).min(1).max(100),
});

// Nonce query schema
const NonceQuerySchema = z.object({
  signers: z.array(z.string()).min(1).max(50),
});

// POST /api/verify - Verify a signed intent without submitting
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    
    // Check if batch request
    if (body.intents && Array.isArray(body.intents)) {
      // Batch verification
      const parseResult = BatchVerifyRequestSchema.safeParse(body);
      if (!parseResult.success) {
        return NextResponse.json(
          {
            success: false,
            error: 'Invalid batch request body',
            details: parseResult.error.errors,
          },
          { status: 400 }
        );
      }
      
      const { intents } = parseResult.data;
      
      // Verify all intents
      const results = await verifyIntentBatch(
        intents.map(i => ({
          type: i.intentType as IntentType,
          payload: i.payload,
        }))
      );
      
      const allVerified = results.every(r => r.verified);
      
      return NextResponse.json({
        success: allVerified,
        totalIntents: intents.length,
        verifiedCount: results.filter(r => r.verified).length,
        rejectedCount: results.filter(r => !r.verified).length,
        results: results.map((r, i) => ({
          index: i,
          intentType: intents[i].intentType,
          ...r,
        })),
      });
    }
    
    // Single verification
    const parseResult = VerifyRequestSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid request body',
          details: parseResult.error.errors,
        },
        { status: 400 }
      );
    }
    
    const { intentType, payload } = parseResult.data;
    
    // Validate payload shape
    const payloadValidation = validateIntentPayload(intentType as IntentType, payload);
    if (!payloadValidation.valid) {
      return NextResponse.json(
        {
          success: false,
          verified: false,
          error: payloadValidation.error,
          code: 'INVALID_PAYLOAD',
        },
        { status: 400 }
      );
    }
    
    // Verify the intent (read-only, no nonce increment)
    const verification = await verifyIntentReadOnly(intentType as IntentType, payload);
    
    return NextResponse.json({
      success: verification.verified,
      intentType,
      verification,
      timestamp: new Date().toISOString(),
    });
    
  } catch (error) {
    console.error('[Verify API] Error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}

// GET /api/verify?signer=0x... - Get nonce for signer
export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const signer = searchParams.get('signer');
  const signers = searchParams.get('signers');
  
  // Single signer nonce query
  if (signer) {
    if (!/^0x[a-fA-F0-9]{40}$/.test(signer)) {
      return NextResponse.json(
        { error: 'Invalid signer address format' },
        { status: 400 }
      );
    }
    
    const nonce = await getNonce(signer);
    
    return NextResponse.json({
      signer,
      nonce,
      timestamp: new Date().toISOString(),
    });
  }
  
  // Batch signer nonce query
  if (signers) {
    const signerList = signers.split(',').map(s => s.trim());
    
    // Validate all addresses
    for (const s of signerList) {
      if (!/^0x[a-fA-F0-9]{40}$/.test(s)) {
        return NextResponse.json(
          { error: `Invalid signer address format: ${s}` },
          { status: 400 }
        );
      }
    }
    
    if (signerList.length > 50) {
      return NextResponse.json(
        { error: 'Maximum 50 signers per query' },
        { status: 400 }
      );
    }
    
    const nonces = await getNoncesBatch(signerList);
    
    return NextResponse.json({
      nonces,
      count: signerList.length,
      timestamp: new Date().toISOString(),
    });
  }
  
  // Return verification endpoint info
  return NextResponse.json({
    protocol: 'SGAU-VALUEGUARD',
    endpoint: '/api/verify',
    description: 'Verify signed intents without submitting to contract',
    usage: {
      POST: {
        single: {
          intentType: 'LatchExhibit | CreateRevision | NullifyNode | UpdateAnchor | ApproveVerifier',
          payload: '{ ... signed intent payload ... }',
        },
        batch: {
          intents: '[{ intentType, payload }, ...]',
        },
      },
      GET: {
        singleNonce: '?signer=0x...',
        batchNonce: '?signers=0x...,0x...',
      },
    },
  });
}
