// Intent Verification Layer for SGAU-VALUEGUARD Protocol
// Signed Intent Firewall - validates before contract mutation

import { 
  type SignedIntent, 
  type IntentType,
  validateIntentPayload,
  buildDomain,
  EIP712_TYPES,
} from './eip712';
import { getNonce, incrementNonce } from './nonceStore';
import { ROLES } from '../contracts/registryAbi';

// Verification result type
export type VerificationResult = {
  verified: boolean;
  signer?: string;
  error?: string;
  code?: VerificationErrorCode;
};

// Error codes for verification failures
export type VerificationErrorCode =
  | 'INVALID_PAYLOAD'
  | 'INVALID_SIGNATURE'
  | 'INVALID_DOMAIN'
  | 'INVALID_CHAIN_ID'
  | 'INVALID_NONCE'
  | 'EXPIRED'
  | 'UNAUTHORIZED_SIGNER'
  | 'INVALID_PAYLOAD_HASH'
  | 'UNKNOWN_ERROR';

// Allowlist for authorized signers (in production, this would come from contract/database)
const AUTHORIZED_SIGNERS: Record<string, `0x${string}`[]> = {
  ADMIN: [],
  AUDITOR: [],
  ENFORCER: [],
  VERIFIER: [],
  RECOVERY: [],
};

// Configuration
const CONFIG = {
  chainId: 1, // Default to mainnet
  verifyingContract: '0x0000000000000000000000000000000000000000' as `0x${string}`,
  maxExpirationWindow: 3600, // 1 hour max
  minExpirationWindow: 60, // 1 minute min
};

// Update config (called during initialization)
export function updateVerificationConfig(config: Partial<typeof CONFIG>) {
  Object.assign(CONFIG, config);
}

// Add authorized signer
export function addAuthorizedSigner(role: keyof typeof AUTHORIZED_SIGNERS, address: `0x${string}`) {
  if (!AUTHORIZED_SIGNERS[role].includes(address)) {
    AUTHORIZED_SIGNERS[role].push(address);
  }
}

// Remove authorized signer
export function removeAuthorizedSigner(role: keyof typeof AUTHORIZED_SIGNERS, address: `0x${string}`) {
  const index = AUTHORIZED_SIGNERS[role].indexOf(address);
  if (index > -1) {
    AUTHORIZED_SIGNERS[role].splice(index, 1);
  }
}

// Check if signer is authorized for any role
function isAuthorizedSigner(address: string): { authorized: boolean; roles: string[] } {
  const roles: string[] = [];
  const normalizedAddress = address.toLowerCase();
  
  for (const [role, signers] of Object.entries(AUTHORIZED_SIGNERS)) {
    if (signers.some(s => s.toLowerCase() === normalizedAddress)) {
      roles.push(role);
    }
  }
  
  // In simulation mode, allow all signers
  if (process.env.NODE_ENV === 'development' || process.env.SIMULATION_MODE === 'true') {
    return { authorized: true, roles: ['SIMULATION'] };
  }
  
  return { authorized: roles.length > 0, roles };
}

// Verify signature and recover signer (simplified - would use viem in production)
async function recoverSigner(
  intentType: IntentType,
  message: Record<string, unknown>,
  signature: string,
  chainId: number,
  verifyingContract: `0x${string}`
): Promise<string | null> {
  // In production, this would use viem's verifyTypedData
  // For now, return a deterministic mock signer based on signature
  
  // Simulate signature verification
  if (!signature || !signature.startsWith('0x') || signature.length < 132) {
    return null;
  }
  
  // In simulation mode, derive a deterministic address from the signature
  const hash = signature.slice(2, 42);
  return `0x${hash}`;
}

// Verify nonce
async function verifyNonce(signer: string, providedNonce: number): Promise<boolean> {
  const currentNonce = await getNonce(signer);
  return providedNonce === currentNonce;
}

// Verify expiration
function verifyExpiration(expiration: number): { valid: boolean; error?: string } {
  const now = Math.floor(Date.now() / 1000);
  
  if (expiration <= now) {
    return { valid: false, error: 'Intent has expired' };
  }
  
  if (expiration > now + CONFIG.maxExpirationWindow) {
    return { valid: false, error: 'Expiration too far in future' };
  }
  
  if (expiration < now + CONFIG.minExpirationWindow) {
    return { valid: false, error: 'Expiration window too short' };
  }
  
  return { valid: true };
}

// Main verification function
export async function verifyIntent(
  intentType: IntentType,
  payload: unknown
): Promise<VerificationResult> {
  // Step 1: Validate payload shape
  const validation = validateIntentPayload(intentType, payload);
  if (!validation.valid) {
    return {
      verified: false,
      error: validation.error,
      code: 'INVALID_PAYLOAD',
    };
  }
  
  const intent = validation.parsedIntent as SignedIntent;
  
  // Step 2: Verify expiration
  const expirationCheck = verifyExpiration(intent.expiration);
  if (!expirationCheck.valid) {
    return {
      verified: false,
      error: expirationCheck.error,
      code: 'EXPIRED',
    };
  }
  
  // Step 3: Build message for signature verification
  const message: Record<string, unknown> = { ...intent };
  delete (message as Record<string, unknown>).signature;
  
  // Step 4: Recover signer from signature
  const signer = await recoverSigner(
    intentType,
    message,
    intent.signature,
    CONFIG.chainId,
    CONFIG.verifyingContract
  );
  
  if (!signer) {
    return {
      verified: false,
      error: 'Could not recover signer from signature',
      code: 'INVALID_SIGNATURE',
    };
  }
  
  // Step 5: Check if signer is authorized
  const authorization = isAuthorizedSigner(signer);
  if (!authorization.authorized) {
    return {
      verified: false,
      error: `Signer ${signer} is not authorized`,
      code: 'UNAUTHORIZED_SIGNER',
      signer,
    };
  }
  
  // Step 6: Verify nonce
  const nonceValid = await verifyNonce(signer, intent.nonce);
  if (!nonceValid) {
    const currentNonce = await getNonce(signer);
    return {
      verified: false,
      error: `Invalid nonce: expected ${currentNonce}, got ${intent.nonce}`,
      code: 'INVALID_NONCE',
      signer,
    };
  }
  
  // Step 7: Increment nonce for next use
  await incrementNonce(signer);
  
  // Verification successful
  return {
    verified: true,
    signer,
  };
}

// Verify without nonce increment (for read-only verification)
export async function verifyIntentReadOnly(
  intentType: IntentType,
  payload: unknown
): Promise<VerificationResult> {
  // Step 1: Validate payload shape
  const validation = validateIntentPayload(intentType, payload);
  if (!validation.valid) {
    return {
      verified: false,
      error: validation.error,
      code: 'INVALID_PAYLOAD',
    };
  }
  
  const intent = validation.parsedIntent as SignedIntent;
  
  // Step 2: Build message for signature verification
  const message: Record<string, unknown> = { ...intent };
  delete (message as Record<string, unknown>).signature;
  
  // Step 3: Recover signer from signature
  const signer = await recoverSigner(
    'LatchExhibit',
    message,
    intent.signature,
    CONFIG.chainId,
    CONFIG.verifyingContract
  );
  
  if (!signer) {
    return {
      verified: false,
      error: 'Could not recover signer from signature',
      code: 'INVALID_SIGNATURE',
    };
  }
  
  // Step 4: Check authorization
  const authorization = isAuthorizedSigner(signer);
  
  return {
    verified: authorization.authorized,
    signer,
    error: authorization.authorized ? undefined : `Signer ${signer} is not authorized`,
    code: authorization.authorized ? undefined : 'UNAUTHORIZED_SIGNER',
  };
}

// Batch verification
export async function verifyIntentBatch(
  intents: Array<{ type: IntentType; payload: unknown }>
): Promise<VerificationResult[]> {
  return Promise.all(
    intents.map(({ type, payload }) => verifyIntentReadOnly(type, payload))
  );
}
