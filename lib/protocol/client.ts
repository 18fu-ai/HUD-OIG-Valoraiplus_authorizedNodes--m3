/**
 * Client-Safe Protocol Exports
 * 
 * This barrel exports ONLY types and pure functions safe for client components.
 * No async operations, no server-only modules, no heavy dependencies.
 */

// ============================================================
// TYPES ONLY (zero runtime cost)
// ============================================================

// Firewall types
export type {
  FirewallDecision,
  FirewallSignal,
  FirewallResult,
  CIDDecision,
  CIDRoute,
  CIDInput,
  CIDResult,
} from './waterfall-firewall';

// MEVR types - exported with ValoraiplusMEVR below

// Receipt types
export type {
  ReceiptV1,
  ReceiptProof,
  ReceiptBlock,
} from './receipt';

// Topology types
export type {
  TopologyRoute,
  TopologySignal,
  TopologyResult,
} from './topology-authority';

// Verify Contract types
export type {
  SignalInput,
  VerificationOutput,
} from './verify-contract';

// ============================================================
// PURE FUNCTIONS (no side effects, no async)
// ============================================================

// Firewall pure functions
export {
  waterfallFirewall,
  isAllowed,
  requiresProcessing,
  isDenied,
  routeCID,
} from './waterfall-firewall';

// Reason codes (pure data)
export {
  REASON_CODES,
  getReasonCode,
  getReasonSeverity,
} from './reasonCodes';

// Invariant Engine (pure sync functions)
export {
  INVARIANT_RULES,
  runAdmissionPipeline,
  createRuntimeClaim,
  generatePolicyExport,
  type InvariantId,
  type InvariantRule,
  type InvariantResult,
  type RuntimeClaim,
  type AdmissionPipelineResult,
} from './invariantEngine';

// MEVR (pure sync functions)
export {
  ValoraiplusMEVR,
  type SovereignInvariant,
  type DeterministicClassification,
  type MEVRGateResult,
} from './mevr';

// Audit Engine (pure sync functions for client display)
export {
  SYSTEM_AUDIT_REGISTRY,
  computeValidationScore,
  computeProtocolSignals,
  generateAuditSummary,
  generateDefensibleOutput,
  softenClaim,
  generateProofLedger,
  computeProofStatistics,
  type AuditRecord,
  type ProtocolSignals,
  type AuditSummary,
  type RuntimeStage,
  type StatementStatus,
  type ClaimSafety,
  type ProofLedgerEntry,
  type ProofStatistics,
  type SpoliationEvent,
} from './auditEngine';

// ============================================================
// CONSTANTS (compile-time values)
// ============================================================

export const PROTOCOL_VERSION = '1.4.100D';
export const TRUTH_CYCLE_MS = 266;
export const SOVEREIGN_LINEAGE = 'SAINT_PAUL_55116_SOVEREIGN';
