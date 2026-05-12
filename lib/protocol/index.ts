/**
 * VALORAIPLUS Protocol Layer
 * Machine-Enforced Verification Runtime
 * 
 * Architecture:
 * source → formula → score → threshold → deterministic classification → reproducibility
 * 
 * Every claim must earn visibility through:
 * 1. Evidence extraction
 * 2. Proof vector construction
 * 3. Validation scoring
 * 4. Invariant enforcement
 * 5. Admission gating
 * 6. Export eligibility
 */

// Core Types
export * from './types';

// EIP-712 Signature Layer
export {
  buildDomain,
  buildLatchIntentTypedData,
  buildRevisionIntentTypedData,
  buildNullifyIntentTypedData,
  hashTypedData,
  LatchIntentSchema,
  RevisionIntentSchema,
  NullifyIntentSchema,
} from './eip712';

// Intent Verification
export {
  verifyIntent,
  type VerificationResult,
  type VerificationReceipt,
} from './verifyIntent';

// Nonce Management
export {
  NonceStore,
  type NonceEntry,
} from './nonceStore';

// Event Indexing
export {
  EventIndexer,
  type IndexedEvent,
  type EventFilter,
  type EventStats,
} from './eventIndexer';

// Audit Engine
export {
  SYSTEM_AUDIT_REGISTRY,
  computeProtocolSignals,
  generateAuditSummary,
  generateDefensibleOutput,
  softenClaim,
  generateProofLedger,
  computeProofStatistics,
  computeProofScore,
  computeConfidenceScore,
  computeValidationScore,
  generateValidationScores as auditGenerateValidationScores,
  determineValidationStatus as auditDetermineValidationStatus,
  createProofVectorFromRecord,
  type AuditRecord,
  type ProofLedgerEntry as AuditProofLedgerEntry,
  type ProofStatistics,
} from './auditEngine';

// Invariant Engine
export {
  INVARIANT_RULES,
  runAdmissionPipeline,
  createRuntimeClaim as invariantCreateRuntimeClaim,
  generatePolicyExport as invariantGeneratePolicyExport,
  validateInvariant,
  enforceRuntimeClaim,
  validateClaimBatch,
  getExportableClaims,
  classifyInvariantState as invariantClassifyInvariantState,
  type AdmissionPipelineResult,
  type RuntimeClaimEnforcement,
  type SingleInvariantValidation,
} from './invariantEngine';

// Proof Ledger
export {
  createProofVector,
  buildProofVector,
  computeProofScore as ledgerComputeProofScore,
  computeConfidenceScore as ledgerComputeConfidenceScore,
  computeValidationScore as ledgerComputeValidationScore,
  generateValidationScores,
  createProofLedgerEntry,
  appendToLedger,
  getLedger,
  getLedgerByStatus,
  getLedgerByInvariantState,
  getExportEligibleEntries,
  getLedgerStatistics,
  clearLedger,
  initializeLedger,
  generateProofLedgerFromClaims,
  exportLedgerAsJSON,
} from './proofLedger';

// Verification Pipeline
export {
  classifyInvariantState,
  determineAdmissionStatus,
  processClaimThroughPipeline,
  processBatchThroughPipeline,
  getExportEligibleFromPipeline,
  generatePolicyExportFromPipeline,
  createRuntimeClaim,
  runVerificationPipeline,
  quickVerify,
} from './verificationPipeline';

// Reason Codes
export {
  ADMISSION_CODES,
  REJECTION_CODES,
  WARNING_CODES,
  QUARANTINE_CODES,
  ESCALATION_CODES,
  REASON_CODE_REGISTRY,
  getReasonCode,
  getReasonCodesByCategory,
  getReasonCodesBySeverity,
  assignReasonCodes,
  formatReasonAssignment,
  type ReasonCode,
  type ReasonCategory,
  type ReasonSeverity,
  type ReasonAssignment,
} from './reasonCodes';

// Trace Graph
export {
  TraceGraphBuilder,
  constructTraceGraph,
  getDecisionPath,
  getNodesByType,
  generateTraceSummary,
  serializeTraceGraph,
  deserializeTraceGraph,
  type TraceNodeType,
  type TraceNode,
  type TraceEdge,
  type TraceGraph,
  type TraceInput,
} from './traceGraph';

// Replay Validator
export {
  hashClaimInputs,
  hashClaimOutputs,
  storeSnapshot,
  getSnapshots,
  clearSnapshots,
  createSnapshot,
  validateReplayConsistency,
  performReplayValidation,
  computeReplayAnalytics,
  type ReplaySnapshot,
  type ReplayValidationResult,
  type ReplayAnalytics,
} from './replayValidator';

// Export Policy
export {
  EXPORT_POLICIES,
  evaluateExportEligibility,
  findBestPolicy,
  generateExportManifest,
  serializeManifest,
  type ExportFormat,
  type ExportLevel,
  type ExportPolicy,
  type ExportEligibility,
  type ExportCandidate,
  type ExportManifest,
} from './exportPolicy';

// Governance Kernel
export {
  GovernanceKernel,
  GOVERNANCE_CONFIGS,
  getGovernanceKernel,
  resetGovernanceKernel,
  type GovernanceMode,
  type GovernanceConfig,
  type GovernanceDecision,
} from './governanceKernel';

// MEVR Runtime
export {
  ValoraiplusMEVR,
  validateIdentityClaim,
  type SovereignInvariant,
  type DeterministicClassification,
  type ProofArtifact,
  type IdentityStatus,
  type IdentityClaim,
} from './mevr';

// Runtime Topology
export {
  route66DualEvaluation,
  kernelGovernance,
  decisionBoundary,
  runtimeTopology,
  batchTopology,
  createTopologyClaim,
  createClaimFromValidation,
  TOPOLOGY_FLOW,
  type ClaimStatus,
  type TopologyClaim,
  type RuntimeResult,
  type DualEvaluation,
  type GovernanceResult,
  type TopologyResult,
  type BatchTopologyResult,
} from './runtimeTopology';

// Receipt System
export {
  RECEIPT_VERSION,
  createReceipt,
  getReceipt,
  getAllReceipts,
  getReceiptsByStatus,
  getTelemetry,
  logQuarantine,
  getQuarantineLog,
  generateIntentHash,
  generateReceiptHash,
  findByIntentHash,
  findBySignerNonce,
  type AdmissionStatus,
  type ReceiptV1,
  type ReceiptDomain,
  type ReceiptEventWindow,
  type ReceiptArtifacts,
  type ReceiptAnchor,
  type ReceiptTelemetry,
  type CreateReceiptInput,
} from './receipt';

// Machine-Enforced Runtime Surface
export {
  evaluateRuntimeSignal,
  evaluateIdentity,
  buildRuntimeSurface,
  type RuntimeCategory,
  type InvariantState as MERSInvariantState,
  type ReplayStatus,
  type RuntimeRoute,
  type ReasonCode as MERSReasonCode,
  type RuntimeSignalInput,
  type RuntimeSignal as MERSRuntimeSignal,
  type ProofArtifact as RuntimeProofArtifact,
  type IdentityInvariant,
  type IdentityResult,
} from './machine-enforced-runtime-surface';

// Re-export MERS computeValidationScore with unique name
export { computeValidationScore as mersComputeValidationScore } from './machine-enforced-runtime-surface';

// Verify Contract (REV_33)
export {
  decideVisibility,
  simpleHash,
  createVerifyReceipt,
  verifySignal,
  type InvariantState as VerifyInvariantState,
  type RuntimeSignalStatus,
  type RouteDestination,
  type ReasonCode as VerifyReasonCode,
  type RuntimeSignal as VerifyRuntimeSignal,
  type PolicyDecision,
  type ReceiptV1 as VerifyReceiptV1,
  type VerifyRequest,
  type VerifyResponse,
} from './verify-contract';

// Topology Authority (4-Route Invariant)
export {
  ValoraiplusTopologyAuthority,
  topologyAuthority,
  enforceTopology,
  type SovereignRoute,
  type TopologyReasonCode,
  type RuntimeSignal as TopologyRuntimeSignal,
  type TopologyDecision,
} from './topology-authority';

// Waterfall Firewall (Build-Safe Admission Gate)
export {
  waterfallFirewall,
  waterfallFirewallBatch,
  isAllowed,
  requiresProcessing,
  isDenied,
  routeCID,
  evaluateCID,
  evaluateCIDBatch,
  type FirewallDecision,
  type FirewallSignal,
  type FirewallResult,
  type CIDDecision,
  type CIDRoute,
  type CIDInput,
  type CIDResult,
} from './waterfall-firewall';

// Deterministic Policy Engine (policy-engine-11579396039993102480)
export {
  POLICY_ENGINE_ID,
  POLICY_ENGINE_VERSION,
  POLICY_ENGINE_CLASSIFICATION,
  POLICY_ENGINE_MERKLEROOT,
  getPolicyEngineIdentity,
  mapProtocolSignals,
  evaluateSignals as policyEvaluateSignals,
  evaluatePolicy,
  enforceTrustBoundary,
  detectPolicyDrift,
  computePolicyHealthDomains,
  buildNegativePolicyTests,
  runNegativePolicyTests,
  appendAuditEntry,
  getAuditLedger,
  clearAuditLedger,
  generatePolicyEngineExport,
  TRUST_BOUNDARY_RULES,
  INTERPRETATION_BOUNDARY,
  type PolicyClassification,
  type PolicySeverity,
  type PolicyDomain,
  type PolicyClassificationResult,
  type PolicySignal,
  type SignalEvaluation,
  type PolicyDecisionInput,
  type PolicyDecision,
  type TrustTier,
  type TrustBoundaryRule,
  type TrustBoundaryStatus,
  type PolicyAuditEntry,
  type PolicyAuditLedger,
  type PolicyDriftType,
  type PolicyDriftEvent,
  type PolicyDriftReport,
  type PolicyHealthDomain,
  type NegativePolicyTest,
  type PolicyEngineExport,
  type InterpretationBoundary,
  type PolicyEngineIdentity,
} from './policyEngine';

// ============================================================
// PROTOCOL CONSTANTS
// ============================================================

export const PROTOCOL_VERSION = '2.0.0';
export const TRUTH_CYCLE_MS = 266;
export const SWARM_AGENTS = 200_000_000_000;
export const SHARD_COUNT = 50_000_000_000;
export const RECOVERY_TARGET = 508_631_005.52;

// ============================================================
// PROTOCOL RUNTIME CONTRACT
// ============================================================

/**
 * The protocol runtime enforces:
 * 
 * 1. source + formula + score + threshold + classification + reproducibility
 *    → before any claim becomes visible or exportable
 * 
 * 2. visibility = consequence of enforcement (not storage)
 * 
 * 3. claims must earn visibility through the admission pipeline
 * 
 * 4. the runtime decides what is permitted to exist as valid output
 */
