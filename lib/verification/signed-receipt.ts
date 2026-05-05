/**
 * SIGNED RECEIPT GENERATOR
 * 
 * Creates cryptographically signed receipts for verification.
 * Uses HMAC-SHA256 for symmetric signing (production would use Ed25519/RSA).
 * 
 * Flow: Data -> Hash -> Sign -> Receipt
 */

import { createHmac, createHash, randomBytes } from 'crypto';

// ============================================================
// TYPES
// ============================================================

export interface VerificationReceipt {
  type: 'VERIFICATION_RECEIPT';
  version: '1.0.0';
  issued_at: string;
  hash: string;
  key_id: string;
  signature: string;
  nonce: string;
}

export interface SignedExportPackage<T> {
  /** The canonical export data */
  export: {
    data: T;
    sha256: string;
    generated_at: string;
  };
  /** The verification receipt */
  receipt: VerificationReceipt;
  /** Metadata for verification */
  verification: {
    algorithm: 'HMAC-SHA256';
    key_id: string;
    verify_endpoint: string;
  };
}

// ============================================================
// SIGNING KEY MANAGEMENT
// ============================================================

// In production, this would be stored securely (e.g., HSM, KMS)
// For demo purposes, we generate a deterministic key
const SIGNING_KEY_ID = 'VALOR_KEY_001';

function getSigningKey(): Buffer {
  // In production: retrieve from secure key store
  // For demo: use environment variable or generate deterministic key
  const keyMaterial = process.env.SIGNING_KEY || 'VALORAIPLUS_VERIFICATION_KEY_2026';
  return createHash('sha256').update(keyMaterial).digest();
}

// ============================================================
// SIGNING FUNCTIONS
// ============================================================

/**
 * Sign data using HMAC-SHA256
 */
export function signData(data: string, key?: Buffer): string {
  const signingKey = key || getSigningKey();
  return createHmac('sha256', signingKey)
    .update(data)
    .digest('base64');
}

/**
 * Verify a signature
 */
export function verifySignature(data: string, signature: string, key?: Buffer): boolean {
  const expectedSignature = signData(data, key);
  return expectedSignature === signature;
}

/**
 * Generate a random nonce
 */
export function generateNonce(): string {
  return randomBytes(16).toString('hex');
}

// ============================================================
// RECEIPT GENERATION
// ============================================================

/**
 * Generate a verification receipt for export data
 */
export function generateReceipt(
  hash: string,
  keyId: string = SIGNING_KEY_ID
): VerificationReceipt {
  const timestamp = new Date().toISOString();
  const nonce = generateNonce();
  
  // Create payload to sign
  const payload = {
    type: 'VERIFICATION_RECEIPT' as const,
    version: '1.0.0' as const,
    issued_at: timestamp,
    hash,
    key_id: keyId,
    nonce,
  };
  
  const payloadString = JSON.stringify(payload);
  const signature = signData(payloadString);
  
  return {
    ...payload,
    signature,
  };
}

/**
 * Verify a receipt's signature
 */
export function verifyReceipt(receipt: VerificationReceipt): boolean {
  // Reconstruct payload without signature
  const payload = {
    type: receipt.type,
    version: receipt.version,
    issued_at: receipt.issued_at,
    hash: receipt.hash,
    key_id: receipt.key_id,
    nonce: receipt.nonce,
  };
  
  const payloadString = JSON.stringify(payload);
  return verifySignature(payloadString, receipt.signature);
}

// ============================================================
// SIGNED EXPORT PACKAGE
// ============================================================

/**
 * Create a signed export package with receipt
 */
export function createSignedExportPackage<T>(
  data: T,
  sha256: string,
  verifyEndpoint: string = '/api/verification/verify'
): SignedExportPackage<T> {
  const generated_at = new Date().toISOString();
  const receipt = generateReceipt(sha256);
  
  return {
    export: {
      data,
      sha256,
      generated_at,
    },
    receipt,
    verification: {
      algorithm: 'HMAC-SHA256',
      key_id: SIGNING_KEY_ID,
      verify_endpoint: verifyEndpoint,
    },
  };
}

/**
 * Verify a signed export package
 */
export function verifySignedExportPackage<T>(
  pkg: SignedExportPackage<T>,
  computedHash: string
): { valid: boolean; reason?: string } {
  // Step 1: Verify hash matches
  if (pkg.export.sha256 !== computedHash) {
    return { valid: false, reason: 'HASH_MISMATCH' };
  }
  
  // Step 2: Verify receipt hash matches export hash
  if (pkg.receipt.hash !== pkg.export.sha256) {
    return { valid: false, reason: 'RECEIPT_HASH_MISMATCH' };
  }
  
  // Step 3: Verify receipt signature
  if (!verifyReceipt(pkg.receipt)) {
    return { valid: false, reason: 'INVALID_SIGNATURE' };
  }
  
  return { valid: true };
}
