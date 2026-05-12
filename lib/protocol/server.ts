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
  createReceipt,
  getReceipt,
  generateReceiptHash,
  type ReceiptV1,
  type ReceiptV2,
  type AdmissionStatus,
  type CreateReceiptInput,
} from './receipt';

// Topology Authority
export {
  enforceTopology,
  ValoraiplusTopologyAuthority,
  topologyAuthority,
  type SovereignRoute,
  type TopologyReasonCode,
  type RuntimeSignal,
  type TopologyDecision,
} from './topology-authority';

// Verify Contract (REV_33)
export {
  verifySignal,
  type RuntimeSignal as VerifyRuntimeSignal,
  type PolicyDecision,
  type VerifyRequest,
  type VerifyResponse,
} from './verify-contract';

// Audit Engine
export {
  SYSTEM_AUDIT_REGISTRY,
  computeValidationScore,
  computeProtocolSignals,
  generateAuditSummary,
  generateDefensibleOutput,
  softenClaim,
  type AuditRecord,
  type ProofVector,
  type ValidationScores,
} from './auditEngine';

// Proof Ledger
export {
  createProofVector,
  buildProofVector,
  computeProofScore,
  getLedger,
  appendToLedger,
} from './proofLedger';

// Verification Pipeline
export {
  runVerificationPipeline,
  type PipelineResult,
} from './verificationPipeline';

// Invariant Engine
export {
  enforceInvariants,
  validateInvariant,
  runAdmissionPipeline,
  createRuntimeClaim,
  type InvariantRule,
  type InvariantResult,
  type RuntimeClaim,
  type AdmissionPipelineResult,
} from './invariantEngine';

// Reason Codes
export {
  REASON_CODE_REGISTRY,
  getReasonCode,
  getReasonCodesByCategory,
  type ReasonCode,
  type ReasonCategory,
} from './reasonCodes';

// Trace Graph
export {
  constructTraceGraph,
  TraceGraphBuilder,
  type TraceNode,
  type TraceGraph,
} from './traceGraph';

// Replay Validator
export {
  validateReplayConsistency,
  performReplayValidation,
  type ReplaySnapshot,
  type ReplayValidationResult,
} from './replayValidator';

// Governance Kernel
export {
  GovernanceKernel,
  getGovernanceKernel,
  type GovernanceDecision,
  type GovernanceMode,
} from './governanceKernel';

// Export Policy
export {
  evaluateExportEligibility,
  findBestPolicy,
  type ExportEligibility,
  type ExportPolicy,
} from './exportPolicy';

// Runtime Topology
export {
  routeClaim,
  type ClaimRoute,
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
  createTypedData,
  validateIntentPayload,
  type IntentType,
  type TypedDataPayload,
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
  getEvents,
  type IndexedEvent,
} from './eventIndexer';

// ============================================================
// CONSTANTS
// ============================================================

export const PROTOCOL_VERSION = '1.4.100D';
export const TRUTH_CYCLE_MS = 266;
export const SOVEREIGN_LINEAGE = 'SAINT_PAUL_55116_SOVEREIGN';
