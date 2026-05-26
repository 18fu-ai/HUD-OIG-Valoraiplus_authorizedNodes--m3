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
  ReceiptV2,
  AdmissionStatus,
} from './receipt';

// Topology types — TopologyRoute, TopologySignal, TopologyResult are in runtimeTopology
export type {
  TopologyResult,
} from './runtimeTopology';

// Verify Contract types
export type {
  InvariantState as VerifyInvariantState,
  RuntimeSignalStatus,
  RouteDestination,
  ReasonCode as VerifyReasonCode,
  RuntimeSignal as VerifyRuntimeSignal,
  PolicyDecision as VerifyPolicyDecision,
  VerifyRequest,
  VerifyResponse,
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
  REASON_CODE_REGISTRY,
  ADMISSION_CODES,
  REJECTION_CODES,
  getReasonCode,
  getReasonCodesBySeverity,
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
  mevr,
  validateIdentityClaim,
  type SovereignInvariant,
  type DeterministicClassification,
  type IdentityStatus,
  type IdentityClaim,
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
} from './auditEngine';

// ============================================================
// AMATH DUAL-BOUNDARY TYPES (v2.0)
// ============================================================

export type {
  CorroborationStatus,
  RuntimeProvenance,
  SourceType,
  EvidenceRow,
  RuntimeLayer,
  ObservedFact,
  Interpretation,
  ClosedLoopStage,
  ClosedLoopState,
  HardeningStatus,
  HardeningCapability,
} from '@/lib/amath';

export {
  LAYER_RESPONSIBILITIES,
  PRODUCTION_SCORECARD,
  HARDENED_INVARIANT,
  isTrusted,
  isUncertain,
  getDefaultCorroboration,
} from '@/lib/amath';

// ============================================================
// CONSTANTS (compile-time values)
// ============================================================

export const PROTOCOL_VERSION = '1.4.100D';
export const TRUTH_CYCLE_MS = 266;
export const SOVEREIGN_LINEAGE = 'SAINT_PAUL_█████_SOVEREIGN';
