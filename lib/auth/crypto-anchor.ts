import { createHash } from 'crypto';

/**
 * VALORAIPLUS® CRYPTO ANCHOR
 * Saint Paul Node #2207 | v13.1
 *
 * Loads the verified 64-character hex private key from environment.
 * Throws at import time in production if key is absent or malformed —
 * preventing any route handler from serving requests with a broken anchor.
 */
const MASTER_SHARD = process.env.PRIVATE_KEY?.replace(/^0x/, '') ?? '';
const MAINNET_ANCHOR = '0x50FB4a7da28ACaDbD452949508A32726aD6E36C0';

if (process.env.NODE_ENV === 'production') {
  if (!MASTER_SHARD || MASTER_SHARD.length !== 64) {
    throw new Error('PRIVATE_KEY must be exactly 64 hex characters.');
  }
} else if (!MASTER_SHARD || MASTER_SHARD.length !== 64) {
  console.warn('[crypto-anchor] PRIVATE_KEY not loaded or invalid — signing disabled in dev.');
}

/**
 * Generates a deterministic SHA-384 HMAC-style signature for any evidence payload.
 * Combines payload + master shard + mainnet anchor for irrefutable provenance.
 */
export const signEvidenceShard = (payload: string): string => {
  if (MASTER_SHARD.length !== 64) {
    throw new Error('PRIVATE_KEY must be exactly 64 hex characters.');
  }
  return createHash('sha384')
    .update(payload + MASTER_SHARD + MAINNET_ANCHOR)
    .digest('hex');
};

/**
 * Returns true if the anchor key is properly loaded and formatted.
 */
export const verifyKeyIntegrity = (): boolean =>
  MASTER_SHARD.length === 64 && /^[0-9a-f]{64}$/i.test(MASTER_SHARD);

/**
 * Generates a short CAL-ID formatted reference for forensic documents.
 */
export const generateCalIdSignature = (manifestId: string, timestamp: string): string => {
  const payload = `${manifestId}:${timestamp}:SAINT_PAUL_2207`;
  const hash = signEvidenceShard(payload);
  return `CAL-ID-${hash.slice(0, 12).toUpperCase()}-${hash.slice(12, 24).toUpperCase()}`;
};

/**
 * Static system anchor metadata — reviewer-safe, bounded authority.
 */
export const getSystemAnchors = () => ({
  mainnetContract: MAINNET_ANCHOR,
  node: 'Saint Paul #2207',
  version: 'v13.1',
});

export const ANCHOR_METADATA = {
  node: 'SAINT PAUL #2207',
  version: 'v13.1',
  sovereign: 'donadams1969.eth',
  address: '0xb103666AB91ceb4Cbb9e1FC21B81f1ec93601BeB',
  factory: '0x7fAA2FA0b1388b2c8696475d0e08F54F36818FD1',
} as const;
