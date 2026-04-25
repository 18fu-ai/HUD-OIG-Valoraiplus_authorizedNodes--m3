// EIP-712 Typed Data Signing for SGAU-VALUEGUARD Protocol
// Protocol Verification Layer

import { z } from 'zod';

// Domain separator for EIP-712
export const EIP712_DOMAIN = {
  name: 'SGAU-VALUEGUARD-Registry',
  version: '1.0.0',
  // chainId and verifyingContract are set dynamically
} as const;

// Type definitions for EIP-712 structured data
export const EIP712_TYPES = {
  LatchExhibit: [
    { name: 'nodeId', type: 'bytes32' },
    { name: 'category', type: 'string' },
    { name: 'logicHash', type: 'bytes32' },
    { name: 'truthCycle', type: 'uint256' },
    { name: 'nonce', type: 'uint256' },
    { name: 'expiration', type: 'uint256' },
  ],
  CreateRevision: [
    { name: 'nodeId', type: 'bytes32' },
    { name: 'logicHash', type: 'bytes32' },
    { name: 'nonce', type: 'uint256' },
    { name: 'expiration', type: 'uint256' },
  ],
  NullifyNode: [
    { name: 'nodeId', type: 'bytes32' },
    { name: 'reason', type: 'string' },
    { name: 'nonce', type: 'uint256' },
    { name: 'expiration', type: 'uint256' },
  ],
  UpdateAnchor: [
    { name: 'anchorId', type: 'bytes32' },
    { name: 'merkleRoot', type: 'bytes32' },
    { name: 'nonce', type: 'uint256' },
    { name: 'expiration', type: 'uint256' },
  ],
  ApproveVerifier: [
    { name: 'verifier', type: 'address' },
    { name: 'role', type: 'bytes32' },
    { name: 'nonce', type: 'uint256' },
    { name: 'expiration', type: 'uint256' },
  ],
} as const;

// Build domain for specific chain and contract
export function buildDomain(chainId: number, verifyingContract: `0x${string}`) {
  return {
    ...EIP712_DOMAIN,
    chainId,
    verifyingContract,
  };
}

// Zod schema for signed intent validation
export const SignedIntentSchema = z.object({
  nodeId: z.string().regex(/^0x[a-fA-F0-9]{64}$/, 'Invalid nodeId format'),
  category: z.string().min(1).max(64),
  logicHash: z.string().regex(/^0x[a-fA-F0-9]{64}$/, 'Invalid logicHash format'),
  truthCycle: z.number().int().positive(),
  nonce: z.number().int().nonnegative(),
  expiration: z.number().int().positive(),
  signature: z.string().regex(/^0x[a-fA-F0-9]+$/, 'Invalid signature format'),
});

export type SignedIntent = z.infer<typeof SignedIntentSchema>;

// Zod schema for revision intent
export const RevisionIntentSchema = z.object({
  nodeId: z.string().regex(/^0x[a-fA-F0-9]{64}$/),
  logicHash: z.string().regex(/^0x[a-fA-F0-9]{64}$/),
  nonce: z.number().int().nonnegative(),
  expiration: z.number().int().positive(),
  signature: z.string().regex(/^0x[a-fA-F0-9]+$/),
});

export type RevisionIntent = z.infer<typeof RevisionIntentSchema>;

// Zod schema for nullify intent
export const NullifyIntentSchema = z.object({
  nodeId: z.string().regex(/^0x[a-fA-F0-9]{64}$/),
  reason: z.string().min(1).max(256),
  nonce: z.number().int().nonnegative(),
  expiration: z.number().int().positive(),
  signature: z.string().regex(/^0x[a-fA-F0-9]+$/),
});

export type NullifyIntent = z.infer<typeof NullifyIntentSchema>;

// Zod schema for anchor update intent
export const AnchorIntentSchema = z.object({
  anchorId: z.string().regex(/^0x[a-fA-F0-9]{64}$/),
  merkleRoot: z.string().regex(/^0x[a-fA-F0-9]{64}$/),
  nonce: z.number().int().nonnegative(),
  expiration: z.number().int().positive(),
  signature: z.string().regex(/^0x[a-fA-F0-9]+$/),
});

export type AnchorIntent = z.infer<typeof AnchorIntentSchema>;

// Zod schema for verifier approval intent
export const VerifierIntentSchema = z.object({
  verifier: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  role: z.string().regex(/^0x[a-fA-F0-9]{64}$/),
  nonce: z.number().int().nonnegative(),
  expiration: z.number().int().positive(),
  signature: z.string().regex(/^0x[a-fA-F0-9]+$/),
});

export type VerifierIntent = z.infer<typeof VerifierIntentSchema>;

// Intent types union
export type IntentType = 
  | 'LatchExhibit'
  | 'CreateRevision'
  | 'NullifyNode'
  | 'UpdateAnchor'
  | 'ApproveVerifier';

// Get message hash for typed data
export function getTypedDataHash(
  intentType: IntentType,
  message: Record<string, unknown>,
  chainId: number,
  verifyingContract: `0x${string}`
): string {
  // This would use viem's hashTypedData in production
  // Placeholder for type-safe implementation
  const domain = buildDomain(chainId, verifyingContract);
  return JSON.stringify({ domain, types: EIP712_TYPES, primaryType: intentType, message });
}

// Validation result type
export type ValidationResult = {
  valid: boolean;
  error?: string;
  parsedIntent?: SignedIntent | RevisionIntent | NullifyIntent | AnchorIntent | VerifierIntent;
};

// Validate intent payload shape
export function validateIntentPayload(
  intentType: IntentType,
  payload: unknown
): ValidationResult {
  try {
    switch (intentType) {
      case 'LatchExhibit':
        return { valid: true, parsedIntent: SignedIntentSchema.parse(payload) };
      case 'CreateRevision':
        return { valid: true, parsedIntent: RevisionIntentSchema.parse(payload) };
      case 'NullifyNode':
        return { valid: true, parsedIntent: NullifyIntentSchema.parse(payload) };
      case 'UpdateAnchor':
        return { valid: true, parsedIntent: AnchorIntentSchema.parse(payload) };
      case 'ApproveVerifier':
        return { valid: true, parsedIntent: VerifierIntentSchema.parse(payload) };
      default:
        return { valid: false, error: `Unknown intent type: ${intentType}` };
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { valid: false, error: error.errors.map(e => e.message).join(', ') };
    }
    return { valid: false, error: 'Unknown validation error' };
  }
}
