import { createHash } from 'crypto';

/**
 * VALORAIPLUS MASTER KEY ANCHOR
 * Loads the verified 64-character hex private key from environment.
 * SAINT PAUL NODE #2207 | OMEGA-INTAKE PROTOCOL
 */
const MASTER_SHARD = process.env.PRIVATE_KEY?.replace(/^0x/, '') || '';

if (!MASTER_SHARD || MASTER_SHARD.length !== 64) {
  console.warn('CRYPTO_ANCHOR: PRIVATE_KEY not loaded or invalid length.');
}

/**
 * Generates a deterministic SHA-384 signature for any evidence payload.
 * Combines payload with the Master Shard for irrefutable anchoring.
 */
export const signEvidenceShard = (payload: string): string => {
  if (MASTER_SHARD.length !== 64) {
    throw new Error('CRITICAL: PRIVATE_KEY must be exactly 64 hex characters.');
  }
  return createHash('sha384')
    .update(payload + MASTER_SHARD)
    .digest('hex');
};

/**
 * Quick verification helper
 */
export const verifyKeyIntegrity = (): boolean => {
  return MASTER_SHARD.length === 64 && /^[0-9a-f]{64}$/i.test(MASTER_SHARD);
};

/**
 * Generate CAL-ID formatted signature for forensic documents
 */
export const generateCalIdSignature = (manifestId: string, timestamp: string): string => {
  const payload = `${manifestId}:${timestamp}:SAINT_PAUL_2207`;
  const hash = signEvidenceShard(payload);
  return `CAL-ID-${hash.slice(0, 12).toUpperCase()}-${hash.slice(12, 24).toUpperCase()}`;
};

/**
 * Anchor metadata for blockchain verification
 */
export const ANCHOR_METADATA = {
  node: 'SAINT PAUL #2207',
  version: 'SGAU-VALUEGUARD-77.77X-FINALDEG v12.1',
  protocol: 'OMEGA-INTAKE',
  classification: 'INSTITUTIONAL | ZERO-TRUST | CRYPTOGRAPHICALLY SEALED',
  valuation: '$2.8 TRILLION',
  sovereign: 'donadams1969.eth',
  address: '0xb103666AB91ceb4Cbb9e1FC21B81f1ec93601BeB',
};
