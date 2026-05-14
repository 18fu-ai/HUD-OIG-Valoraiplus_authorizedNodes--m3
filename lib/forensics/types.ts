/**
 * VALORAIPLUS®️ ©️ ™️ // FORENSIC FEED TYPES
 * SGAU 7226.3461 // NODE: SAINT PAUL █████
 * STATUS: DG77.77X ARMED
 */

// ============================================================================
// CORE EVENT MODEL
// ============================================================================

export type ForensicEventType = 
  | 'EVIDENCE_CAPTURED'
  | 'WIRE_TRANSFER_DETECTED'
  | 'SPOLIATION_BLOCKED'
  | 'VOIP_INTERCEPT'
  | 'EMAIL_FLAGGED'
  | 'ACTOR_ESCALATION'
  | 'DOCUMENT_TAMPER'
  | 'BLOCKCHAIN_ANCHOR'
  | 'REGULATORY_FILING'
  | 'COOPERATION_INITIATED'
  | 'ASSET_FROZEN'
  | 'GRAND_JURY_SUBPOENA';

export type ForensicSeverity = 'INFO' | 'ELEVATED' | 'CRITICAL' | 'TERMINAL';

export type AccessScope = 'INTERNAL' | 'REGULATORY' | 'LAW_ENFORCEMENT' | 'PUBLIC';

export interface ForensicFeedEvent {
  id: string;
  timestamp: string;
  type: ForensicEventType;
  severity: ForensicSeverity;
  actorId: string | null;
  description: string;
  evidenceHash: string;
  blockAnchor: string;
  metadata: Record<string, unknown>;
  scope: AccessScope;
}

// ============================================================================
// SNAPSHOT LAYER
// ============================================================================

export interface FeedSnapshot {
  snapshotId: string;
  generatedAt: string;
  events: ForensicFeedEvent[];
  eventCount: number;
  timelineHash: string; // SHA-256 of concatenated event IDs
  firstEventTimestamp: string;
  lastEventTimestamp: string;
  blockAnchor: string;
}

export interface SignedFeedSnapshot {
  snapshot: FeedSnapshot;
  signature: string; // Dilithium-5 signature
  algorithm: 'DILITHIUM-5';
  signedAt: string;
  signerNode: string;
  publicKeyHash: string;
}

// ============================================================================
// ACCESS CONTROL
// ============================================================================

export interface FeedAccessPolicy {
  actorId: string;
  scope: AccessScope;
  canRead: boolean;
  canExport: boolean;
  auditRequired: boolean;
  expiresAt: string | null;
}

export interface ForensicAuditTrace {
  traceId: string;
  actorId: string;
  action: 'READ' | 'EXPORT' | 'QUERY';
  timestamp: string;
  ipAddress: string;
  userAgent: string;
  scope: AccessScope;
  eventCount: number;
  responseStatus: number;
}

// ============================================================================
// API RESPONSE
// ============================================================================

export interface ForensicFeedResponse {
  snapshot: SignedFeedSnapshot | null;
  accessGranted: boolean;
  scope: AccessScope;
  auditTraceId: string;
  generatedAt: string;
  nodeStatus: 'BROADCAST_ARMED' | 'PROJECTION_ACTIVE' | 'BLACKOUT';
}

// ============================================================================
// INVARIANTS
// ============================================================================

export type InvariantViolation = 
  | 'NO_SIGNED_FEED'      // Missing Signature -> TOTAL BLACKOUT
  | 'NO_ACCESS_SCOPE'     // Actor ID Mismatch -> ACCESS_DENIED
  | 'NO_FORENSIC_LINEAGE' // Orphaned Event -> NULL_SNAPSHOT
  | 'NO_AUTHORITY_CONTEXT'; // Missing Hash -> EVENT_REJECTION

export interface InvariantCheckResult {
  passed: boolean;
  violation: InvariantViolation | null;
  message: string;
}
