/**
 * VALORAIPLUS Verification Pipeline
 * End-to-end verification pipeline wiring all protocol layers
 */

import {
  type RuntimeClaim,
  type ProofVector,
  type ValidationScores,
  type InvariantState,
  type AdmissionStatus,
  type PipelineResult,
  type BatchPipelineResult,
  type PipelineStatus,
  type PolicyExport,
  type AuditSummary,
  type InvariantId,
  VERIFICATION_THRESHOLDS,
} from './types';

import {
  createProofVector,
  generateValidationScores,
  createProofLedgerEntry,
  getLedgerStatistics,
} from './proofLedger';

// ============================================================
// INVARIANT STATE CLASSIFICATION
// ============================================================

/**
 * Classify the invariant state of a claim
 */
export function classifyInvariantState(claim: RuntimeClaim): InvariantState {
  // Check for hard blocks first
  if (!claim.isObservable || !claim.hasExplicitAuthority) {
    return 'BLOCKED';
  }
  
  // Check for non-determinism
  if (!claim.isDeterministic) {
    return 'NONDETERMINISTIC';
  }
  
  // Check for missing source
  if (!claim.hasSourceRef) {
    return 'UNSOURCED';
  }
  
  // Check for incomplete evidence
  if (!claim.isLedgerAnchored || !claim.isReplayable) {
    return 'INCOMPLETE';
  }
  
  return 'VALID';
}

/**
 * Determine admission status from invariant state and validation score
 */
export function determineAdmissionStatus(
  invariantState: InvariantState,
  validationScore: number
): AdmissionStatus {
  if (invariantState === 'BLOCKED') {
    return 'BLOCKED';
  }
  
  if (invariantState === 'NONDETERMINISTIC' || invariantState === 'UNSOURCED') {
    return 'WARNED';
  }
  
  if (validationScore < VERIFICATION_THRESHOLDS.LOW) {
    return 'WARNED';
  }
  
  return 'ADMITTED';
}

// ============================================================
// SINGLE CLAIM PIPELINE
// ============================================================

/**
 * Process a single claim through the full verification pipeline
 */
export function processClaimThroughPipeline(claim: RuntimeClaim): PipelineResult {
  // Step 1: Create proof vector
  const proofVector = createProofVector(claim);
  
  // Step 2: Compute validation scores
  const validationScores = generateValidationScores(
    proofVector,
    claim.isReplayable,
    !!claim.sourceRef
  );
  
  // Step 3: Classify invariant state
  const invariantState = classifyInvariantState(claim);
  
  // Step 4: Determine admission status
  const admissionStatus = determineAdmissionStatus(
    invariantState,
    validationScores.validationScore
  );
  
  // Step 5: Determine export eligibility
  const exportEligible = 
    admissionStatus !== 'BLOCKED' &&
    validationScores.validationScore >= VERIFICATION_THRESHOLDS.EXPORT_MINIMUM &&
    invariantState !== 'BLOCKED';
  
  // Step 6: Build reasoning chain
  const reasoning = buildReasoningChain(
    claim,
    proofVector,
    validationScores,
    invariantState,
    admissionStatus,
    exportEligible
  );
  
  // Step 7: Create ledger entry
  const ledgerEntry = createProofLedgerEntry(
    claim,
    proofVector,
    validationScores,
    invariantState,
    admissionStatus,
    reasoning
  );
  
  return {
    claim,
    proofVector,
    validationScores,
    invariantState,
    admissionStatus,
    exportEligible,
    ledgerEntry,
    reasoning,
  };
}

/**
 * Build reasoning chain for a claim
 */
function buildReasoningChain(
  claim: RuntimeClaim,
  proofVector: ProofVector,
  validationScores: ValidationScores,
  invariantState: InvariantState,
  admissionStatus: AdmissionStatus,
  exportEligible: boolean
): string[] {
  const reasoning: string[] = [];
  
  // Evidence analysis
  reasoning.push(`Evidence: E=${proofVector.evidence.toFixed(2)}, P=${proofVector.provenance.toFixed(2)}`);
  reasoning.push(`Replay: R=${proofVector.replay.toFixed(2)}, D=${proofVector.determinism.toFixed(2)}`);
  reasoning.push(`Interpretation: A=${proofVector.attribution.toFixed(2)}, T=${proofVector.temporal.toFixed(2)}, C=${proofVector.consensus.toFixed(2)}`);
  
  // Score computation
  reasoning.push(`ProofScore = (E × P × R × D)^0.25 = ${validationScores.proofScore}`);
  reasoning.push(`ConfidenceScore = (A + T + C) / 3 = ${validationScores.confidenceScore}`);
  reasoning.push(`ValidationScore = (P + C) / 2 = ${validationScores.validationScore}`);
  
  // Threshold analysis
  reasoning.push(`Threshold for VERIFIED = ${VERIFICATION_THRESHOLDS.VERIFIED}`);
  reasoning.push(`ValidationStatus = ${validationScores.status}`);
  
  // Invariant analysis
  reasoning.push(`Observable: ${claim.isObservable}`);
  reasoning.push(`ExplicitAuthority: ${claim.hasExplicitAuthority}`);
  reasoning.push(`Deterministic: ${claim.isDeterministic}`);
  reasoning.push(`LedgerAnchored: ${claim.isLedgerAnchored}`);
  reasoning.push(`Replayable: ${claim.isReplayable}`);
  reasoning.push(`InvariantState = ${invariantState}`);
  
  // Admission
  reasoning.push(`AdmissionStatus = ${admissionStatus}`);
  reasoning.push(`ExportEligible = ${exportEligible}`);
  
  return reasoning;
}

// ============================================================
// BATCH PIPELINE
// ============================================================

/**
 * Process a batch of claims through the verification pipeline
 */
export function processBatchThroughPipeline(claims: RuntimeClaim[]): BatchPipelineResult {
  const results = claims.map(processClaimThroughPipeline);
  
  // Compute summary statistics
  const summary = {
    total: results.length,
    verified: results.filter(r => r.validationScores.status === 'VERIFIED').length,
    high: results.filter(r => r.validationScores.status === 'HIGH').length,
    medium: results.filter(r => r.validationScores.status === 'MEDIUM').length,
    low: results.filter(r => r.validationScores.status === 'LOW').length,
    unverified: results.filter(r => r.validationScores.status === 'UNVERIFIED').length,
    admitted: results.filter(r => r.admissionStatus === 'ADMITTED').length,
    warned: results.filter(r => r.admissionStatus === 'WARNED').length,
    blocked: results.filter(r => r.admissionStatus === 'BLOCKED').length,
    exportEligible: results.filter(r => r.exportEligible).length,
  };
  
  // Determine pipeline status
  let pipelineStatus: PipelineStatus;
  if (summary.blocked > 0) {
    pipelineStatus = 'FAILING';
  } else if (summary.warned > 0) {
    pipelineStatus = 'DEGRADED';
  } else {
    pipelineStatus = 'HEALTHY';
  }
  
  return {
    results,
    summary,
    pipelineStatus,
    timestamp: new Date().toISOString(),
  };
}

// ============================================================
// EXPORT PIPELINE
// ============================================================

/**
 * Get only export-eligible claims from pipeline results
 */
export function getExportEligibleFromPipeline(results: PipelineResult[]): PipelineResult[] {
  return results.filter(r => r.exportEligible);
}

/**
 * Generate policy export from batch pipeline result
 */
export function generatePolicyExportFromPipeline(
  batchResult: BatchPipelineResult
): PolicyExport {
  const exportable = getExportEligibleFromPipeline(batchResult.results);
  
  // Generate audit summary
  const auditSummary: AuditSummary = {
    totalStatements: batchResult.summary.total,
    implemented: batchResult.results.filter(r => r.claim.status === 'IMPLEMENTED').length,
    stubbed: batchResult.results.filter(r => r.claim.status === 'STUBBED').length,
    simulated: batchResult.results.filter(r => r.claim.status === 'SIMULATED').length,
    planned: batchResult.results.filter(r => r.claim.status === 'PLANNED').length,
    needsSource: batchResult.results.filter(r => r.claim.status === 'NEEDS_SOURCE').length,
    averageConfidence: batchResult.results.length > 0
      ? batchResult.results.reduce((s, r) => s + r.validationScores.validationScore, 0) / batchResult.results.length
      : 0,
    exportReady: batchResult.summary.blocked === 0 && batchResult.summary.exportEligible > 0,
  };
  
  // Generate invariant health
  const invariantIds: InvariantId[] = [
    'STATE_OBSERVABLE',
    'AUTHORITY_EXPLICIT',
    'MUTATION_DETERMINISTIC',
    'LEDGER_CANONICAL',
    'REPLAY_FIRST_CLASS',
  ];
  
  const invariantHealth = invariantIds.map(id => {
    const violations = batchResult.results.filter(r => {
      switch (id) {
        case 'STATE_OBSERVABLE':
          return !r.claim.isObservable;
        case 'AUTHORITY_EXPLICIT':
          return !r.claim.hasExplicitAuthority;
        case 'MUTATION_DETERMINISTIC':
          return !r.claim.isDeterministic;
        case 'LEDGER_CANONICAL':
          return !r.claim.isLedgerAnchored;
        case 'REPLAY_FIRST_CLASS':
          return !r.claim.isReplayable;
        default:
          return false;
      }
    }).length;
    
    return {
      id,
      passRate: batchResult.summary.total > 0
        ? (batchResult.summary.total - violations) / batchResult.summary.total
        : 1,
      violations,
    };
  });
  
  return {
    exportId: `EXPORT-${Date.now()}`,
    timestamp: new Date().toISOString(),
    pipelineStatus: batchResult.pipelineStatus,
    totalClaims: batchResult.summary.total,
    exportedClaims: exportable.length,
    claims: exportable.map(r => r.ledgerEntry),
    summary: auditSummary,
    invariantHealth,
  };
}

// ============================================================
// RUNTIME CLAIM FACTORY
// ============================================================

/**
 * Create a runtime claim with sensible defaults
 */
export function createRuntimeClaim(
  id: string,
  statement: string,
  component: string,
  sourceRef?: string,
  proofScore: number = 0.80,
  confidenceScore: number = 0.75,
  validationScore: number = 0.775,
  status: RuntimeClaim['status'] = 'IMPLEMENTED',
  safety: RuntimeClaim['safety'] = 'PROVEN'
): RuntimeClaim {
  const hasSource = !!sourceRef;
  const isImplemented = status === 'IMPLEMENTED';
  
  return {
    id,
    statement,
    component,
    sourceRef,
    proofScore,
    confidenceScore,
    validationScore,
    status,
    safety,
    timestamp: new Date().toISOString(),
    isObservable: isImplemented,
    hasExplicitAuthority: isImplemented,
    isDeterministic: isImplemented && safety === 'PROVEN',
    isLedgerAnchored: hasSource,
    isReplayable: isImplemented,
    hasSourceRef: hasSource,
  };
}

// ============================================================
// VERIFICATION PIPELINE ENTRY POINT
// ============================================================

/**
 * Main entry point: verify a batch of claims and generate export
 */
export function runVerificationPipeline(claims: RuntimeClaim[]): {
  batchResult: BatchPipelineResult;
  policyExport: PolicyExport;
} {
  const batchResult = processBatchThroughPipeline(claims);
  const policyExport = generatePolicyExportFromPipeline(batchResult);
  
  return {
    batchResult,
    policyExport,
  };
}

/**
 * Quick verification check for a single claim
 */
export function quickVerify(claim: RuntimeClaim): {
  verified: boolean;
  exportEligible: boolean;
  score: number;
  status: string;
  invariantState: InvariantState;
} {
  const result = processClaimThroughPipeline(claim);
  
  return {
    verified: result.validationScores.status === 'VERIFIED',
    exportEligible: result.exportEligible,
    score: result.validationScores.validationScore,
    status: result.validationScores.status,
    invariantState: result.invariantState,
  };
}
