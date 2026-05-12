/**
 * Server-Only Protocol Exports
 * 
 * This barrel exports modules that should ONLY be used in:
 * - API routes (app/api/*)
 * - Server Components
 * - Server Actions
 * 
 * These modules may have async operations, database calls, or heavy dependencies.
 */

// ============================================================
// FULL MODULE EXPORTS (server-only)
// ============================================================

// Waterfall Firewall (with async evaluation)
export {
  waterfallFirewall,
  waterfallFirewallBatch,
  evaluateCID,
  evaluateCIDBatch,
  isAllowed,
  requiresProcessing,
  isDenied,
  routeCID,
  type FirewallDecision,
  type FirewallSignal,
  type FirewallResult,
  type CIDDecision,
  type CIDRoute,
  type CIDInput,
  type CIDResult,
} from './waterfall-firewall';

// MEVR (Identity Gate)
export {
  ValoraiplusMEVR,
  validateIdentityClaim,
  type SovereignInvariant,
  type DeterministicClassification,
  type MEVRGateResult,
} from './mevr';

// Receipt System
export {
  generateReceiptHash,
  generateIntentHash,
  type ReceiptV1,
  type ReceiptV2,
  type AdmissionStatus,
} from './receipt';

// Topology Authority
export {
  enforceTopology,
  topologyAuthority,
  type SovereignRoute,
  type TopologyDecision,
  type TopologyReasonCode,
} from './topology-authority';

// Verify Contract (REV_33)
export {
  type RuntimeSignal,
  type PolicyDecision,
  type VerifyRequest,
} from './verify-contract';

// Audit Engine
export {
  computeValidationScore,
  computeProtocolSignals,
  generateAuditSummary,
  generateDefensibleOutput,
  type AuditRecord,
  type AuditSummary,
  type ProtocolSignals,
} from './auditEngine';

// Proof Ledger
export {
  appendToLedger,
  getLedger,
  createProofLedgerEntry,
  computeProofScore,
} from './proofLedger';

// Verification Pipeline
export {
  runVerificationPipeline,
  type PipelineResult,
} from './verificationPipeline';

// Invariant Engine
export {
  enforceInvariants,
  extractViolations,
  type InvariantRule,
  type InvariantResult,
  type EnforcementResult,
} from './invariantEngine';

// Reason Codes
export {
  REASON_CODE_REGISTRY,
  getReasonCode,
  type ReasonCode,
  type ReasonSeverity,
} from './reasonCodes';

// Trace Graph
export {
  constructTraceGraph,
  getDecisionPath,
  generateTraceSummary,
  type TraceNode,
  type TraceGraph,
  type TraceEdge,
} from './traceGraph';

// Replay Validator
export {
  createSnapshot,
  storeSnapshot,
  getSnapshots,
  type ReplaySnapshot,
  type ReplayValidationResult,
} from './replayValidator';

// Governance Kernel
export {
  getGovernanceKernel,
  resetGovernanceKernel,
  type GovernanceDecision,
  type GovernanceMode,
  type GovernanceConfig,
} from './governanceKernel';

// Export Policy
export {
  evaluateExportEligibility,
  findBestPolicy,
  type ExportEligibility,
  type ExportCandidate,
  type ExportPolicy,
} from './exportPolicy';

// Runtime Topology
export {
  route66DualEvaluation,
  kernelGovernance,
  decisionBoundary,
  type TopologyClaim,
  type RuntimeResult,
  type DualEvaluation,
} from './runtimeTopology';

// Machine-Enforced Runtime Surface
export {
  evaluateRuntimeSignal,
  evaluateIdentity,
  buildRuntimeSurface,
  type RuntimeCategory,
  type RuntimeRoute,
  type RuntimeSignalInput,
  type IdentityInvariant,
  type IdentityResult,
} from './machine-enforced-runtime-surface';

// EIP-712 Signing
export {
  buildDomain,
  validateIntentPayload,
  type IntentType,
  type ValidationResult as TypedDataPayload,
} from './eip712';

// Nonce Store
export {
  getNonce,
  getNoncesBatch,
  incrementNonce,
} from './nonceStore';

// Intent Verification
export {
  verifyIntent,
  verifyIntentReadOnly,
  verifyIntentBatch,
  type VerificationResult,
} from './verifyIntent';

// Event Indexer
export {
  indexEvent,
  indexEventsBatch,
  queryEvents,
  getNodeHistory,
  getLatestEvents,
  getEventStats,
  type IndexedEvent,
  type EventFilter,
} from './eventIndexer';

// ============================================================
// CONSTANTS
// ============================================================

export const PROTOCOL_VERSION = '1.4.100D';
export const TRUTH_CYCLE_MS = 266;
export const SOVEREIGN_LINEAGE = 'SAINT_PAUL_55116_SOVEREIGN';
