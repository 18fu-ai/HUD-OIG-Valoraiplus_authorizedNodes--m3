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
