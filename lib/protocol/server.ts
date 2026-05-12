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
  generateReceipt,
  getReceipt,
  type ReceiptV1,
  type ReceiptProof,
} from './receipt';

// Topology Authority
export {
  enforceTopology,
  TopologyAuthority,
  VALID_ROUTES,
  type TopologyRoute,
  type TopologySignal,
  type TopologyResult,
} from './topology-authority';

// Verify Contract (REV_33)
export {
  verifySignal,
  type SignalInput,
  type VerificationOutput,
} from './verify-contract';

// Audit Engine
export {
  recordSpoliationAttempt,
  getSpoliationLog,
  computeValidationScore,
  type SpoliationEvent,
  type AuditRecord,
} from './auditEngine';

// Proof Ledger
export {
  anchorProof,
  getProof,
  verifyProofChain,
  type ProofEntry,
  type ProofChain,
} from './proofLedger';

// Verification Pipeline
export {
  runVerificationPipeline,
  type PipelineResult,
} from './verificationPipeline';

// Invariant Engine
export {
  enforceInvariant,
  checkInvariant,
  type InvariantRule,
  type InvariantResult,
} from './invariantEngine';

// Reason Codes
export {
  REASON_CODES,
  getReasonCode,
  getReasonSeverity,
} from './reasonCodes';

// Trace Graph
export {
  buildTraceGraph,
  type TraceNode,
  type TraceGraph,
} from './traceGraph';

// Replay Validator
export {
  validateReplay,
  type ReplayResult,
} from './replayValidator';

// Governance Kernel
export {
  evaluateGovernance,
  type GovernanceDecision,
} from './governanceKernel';

// Export Policy
export {
  checkExportEligibility,
  type ExportDecision,
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
  getEvents,
  type IndexedEvent,
} from './eventIndexer';

// ============================================================
// CONSTANTS
// ============================================================

export const PROTOCOL_VERSION = '1.4.100D';
export const TRUTH_CYCLE_MS = 266;
export const SOVEREIGN_LINEAGE = 'SAINT_PAUL_55116_SOVEREIGN';
