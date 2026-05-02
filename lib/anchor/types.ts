/**
 * Route Anchor Types with Bounded Enum Verification
 * ==================================================
 * Portal does not merely show verified/unverified.
 * Portal explains WHY verification passed or failed.
 */

import { z } from 'zod';

// Bounded enum - not freeform string
export type VerificationReason =
  | "VERIFIED"
  | "ENV_NOT_APPROVED"
  | "INVALID_ROOT"
  | "MISSING_ANCHOR_EVIDENCE"
  | "SCHEMA_INVALID"
  | "LOCAL_ONLY";

export type AnchorStorage =
  | "IPFS"
  | "ARWEAVE"
  | "BTC_WITNESS"
  | "ETH_CALLDATA"
  | "LOCAL_ONLY";

export interface AnchorResponse {
  routeRoot: string;
  storage: AnchorStorage;
  cid?: string;
  txid?: string;
  anchoredAt?: string;
  verified: boolean;
  verificationReason: VerificationReason;
}

// Zod Schemas for runtime validation
export const VerificationReasonSchema = z.enum([
  "VERIFIED",
  "ENV_NOT_APPROVED",
  "INVALID_ROOT",
  "MISSING_ANCHOR_EVIDENCE",
  "SCHEMA_INVALID",
  "LOCAL_ONLY",
]);

export const AnchorStorageSchema = z.enum([
  "IPFS",
  "ARWEAVE",
  "BTC_WITNESS",
  "ETH_CALLDATA",
  "LOCAL_ONLY",
]);

export const AnchorResponseSchema = z.object({
  routeRoot: z.string().min(1),
  storage: AnchorStorageSchema,
  cid: z.string().optional(),
  txid: z.string().optional(),
  anchoredAt: z.string().optional(),
  verified: z.boolean(),
  verificationReason: VerificationReasonSchema,
});

// Validation helpers
export function isHexRoot(root: string): boolean {
  return /^0x[a-fA-F0-9]{64}$/.test(root);
}

export function hasAnchorEvidence(raw: {
  storage: string;
  cid?: string;
  txid?: string;
  anchoredAt?: string;
}): boolean {
  // LOCAL_ONLY doesn't need evidence
  if (raw.storage === "LOCAL_ONLY") return true;
  
  // IPFS/ARWEAVE need CID
  if (raw.storage === "IPFS" || raw.storage === "ARWEAVE") {
    return !!raw.cid && raw.cid.length > 0;
  }
  
  // BTC/ETH need TXID
  if (raw.storage === "BTC_WITNESS" || raw.storage === "ETH_CALLDATA") {
    return !!raw.txid && raw.txid.length > 0;
  }
  
  return false;
}

export function getVerificationReason(raw: {
  routeRoot: string;
  storage: string;
  cid?: string;
  txid?: string;
  anchoredAt?: string;
}): VerificationReason {
  const envVerified = process.env.ROUTE_ANCHOR_VERIFIED === "true";

  if (raw.storage === "LOCAL_ONLY") return "LOCAL_ONLY";
  if (!envVerified) return "ENV_NOT_APPROVED";
  if (!isHexRoot(raw.routeRoot)) return "INVALID_ROOT";
  if (!hasAnchorEvidence(raw)) return "MISSING_ANCHOR_EVIDENCE";

  return "VERIFIED";
}

// Default fallback response for schema failures
export const SCHEMA_INVALID_RESPONSE: AnchorResponse = {
  routeRoot: "UNKNOWN",
  storage: "LOCAL_ONLY",
  verified: false,
  verificationReason: "SCHEMA_INVALID",
};
