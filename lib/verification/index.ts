/**
 * VERIFICATION LAYER
 * 
 * Complete verification system for VALORAIPLUS:
 * - Canonical Export Generator (deterministic JSON + SHA-256)
 * - Signed Receipt Generator (HMAC-SHA256 signatures)
 * - Chained Event Log (tamper-evident audit trail)
 * 
 * Flow: Entries -> Canonical JSON -> SHA-256 Hash -> Signed Receipt -> Event Chain -> Export Package -> External Verification
 */

// Re-export all verification modules
export * from './canonical';
export * from './signed-receipt';
export * from './event-chain';

// Import for combined functions
import { 
  generateCanonicalExport, 
  generateCanonicalExportGeneric,
  verifyCanonicalExport,
  type CanonicalExport,
  type ExportEntry,
} from './canonical';

import {
  createSignedExportPackage,
  verifySignedExportPackage,
  generateReceipt,
  verifyReceipt,
  type SignedExportPackage,
  type VerificationReceipt,
} from './signed-receipt';

import {
  createChain,
  createEvent,
  verifyChain,
  exportChain,
  getChainSummary,
  type ChainedEvent,
  type EventChain,
} from './event-chain';

// ============================================================
// COMBINED VERIFICATION PACKAGE
// ============================================================

export interface FullVerificationPackage<T> {
  /** Package metadata */
  metadata: {
    package_version: '1.0.0';
    generated_at: string;
    system: 'VALORAIPLUS';
    classification: 'INTERNAL_REFERENCE';
  };
  /** Canonical export with hash */
  canonical_export: CanonicalExport<T>;
  /** Signed verification receipt */
  receipt: VerificationReceipt;
  /** Event chain state */
  chain_summary: {
    chain_id: string;
    length: number;
    head_hash: string;
    integrity: 'VALID' | 'BROKEN';
  };
  /** Verification instructions */
  verification_instructions: {
    endpoint: string;
    method: 'POST';
    steps: string[];
  };
}

/**
 * Create a complete verification package
 */
export function createFullVerificationPackage<T extends ExportEntry>(
  entries: T[],
  chainId: string,
  verifyEndpoint: string = '/api/verification/verify'
): FullVerificationPackage<T[]> {
  const now = new Date().toISOString();
  
  // Step 1: Generate canonical export
  const canonicalExport = generateCanonicalExport(entries);
  
  // Step 2: Generate signed receipt
  const receipt = generateReceipt(canonicalExport.sha256);
  
  // Step 3: Log export event
  createEvent(chainId, 'EXPORTED', 'FULL_PACKAGE', {
    entry_count: entries.length,
    hash: canonicalExport.sha256,
  });
  
  // Step 4: Get chain summary
  const chainSummaryData = getChainSummary(chainId);
  const chainSummary = chainSummaryData || {
    chain_id: chainId,
    length: 0,
    head_hash: '',
    integrity: 'BROKEN' as const,
  };
  
  return {
    metadata: {
      package_version: '1.0.0',
      generated_at: now,
      system: 'VALORAIPLUS',
      classification: 'INTERNAL_REFERENCE',
    },
    canonical_export: canonicalExport,
    receipt,
    chain_summary: {
      chain_id: chainSummary.chain_id,
      length: chainSummary.length,
      head_hash: chainSummary.head_hash,
      integrity: chainSummary.integrity,
    },
    verification_instructions: {
      endpoint: verifyEndpoint,
      method: 'POST',
      steps: [
        '1. Receive export package',
        '2. Recompute SHA-256 of canonical_json',
        '3. Compare computed hash to canonical_export.sha256',
        '4. Verify receipt.signature using public key',
        '5. Confirm chain_summary.integrity === "VALID"',
        '6. Result: VALID or INVALID',
      ],
    },
  };
}

/**
 * Create verification package for generic data
 */
export function createGenericVerificationPackage<T>(
  data: T,
  chainId: string,
  entryId: string,
  verifyEndpoint: string = '/api/verification/verify'
): FullVerificationPackage<T> {
  const now = new Date().toISOString();
  
  const canonicalExport = generateCanonicalExportGeneric(data);
  const receipt = generateReceipt(canonicalExport.sha256);
  
  createEvent(chainId, 'EXPORTED', entryId, {
    hash: canonicalExport.sha256,
  });
  
  const chainSummaryData = getChainSummary(chainId);
  const chainSummary = chainSummaryData || {
    chain_id: chainId,
    length: 0,
    head_hash: '',
    integrity: 'BROKEN' as const,
  };
  
  return {
    metadata: {
      package_version: '1.0.0',
      generated_at: now,
      system: 'VALORAIPLUS',
      classification: 'INTERNAL_REFERENCE',
    },
    canonical_export: canonicalExport,
    receipt,
    chain_summary: {
      chain_id: chainSummary.chain_id,
      length: chainSummary.length,
      head_hash: chainSummary.head_hash,
      integrity: chainSummary.integrity,
    },
    verification_instructions: {
      endpoint: verifyEndpoint,
      method: 'POST',
      steps: [
        '1. Receive export package',
        '2. Recompute SHA-256 of canonical_json',
        '3. Compare computed hash to canonical_export.sha256',
        '4. Verify receipt.signature using public key',
        '5. Confirm chain_summary.integrity === "VALID"',
        '6. Result: VALID or INVALID',
      ],
    },
  };
}

/**
 * Verify a full verification package
 */
export function verifyFullPackage<T>(
  pkg: FullVerificationPackage<T>
): { valid: boolean; checks: Record<string, boolean>; reason?: string } {
  const checks: Record<string, boolean> = {
    canonical_export_valid: false,
    receipt_hash_matches: false,
    receipt_signature_valid: false,
  };
  
  // Check 1: Verify canonical export hash
  checks.canonical_export_valid = verifyCanonicalExport(pkg.canonical_export);
  if (!checks.canonical_export_valid) {
    return { valid: false, checks, reason: 'CANONICAL_HASH_MISMATCH' };
  }
  
  // Check 2: Verify receipt hash matches export hash
  checks.receipt_hash_matches = pkg.receipt.hash === pkg.canonical_export.sha256;
  if (!checks.receipt_hash_matches) {
    return { valid: false, checks, reason: 'RECEIPT_HASH_MISMATCH' };
  }
  
  // Check 3: Verify receipt signature
  checks.receipt_signature_valid = verifyReceipt(pkg.receipt);
  if (!checks.receipt_signature_valid) {
    return { valid: false, checks, reason: 'INVALID_SIGNATURE' };
  }
  
  return { valid: true, checks };
}
