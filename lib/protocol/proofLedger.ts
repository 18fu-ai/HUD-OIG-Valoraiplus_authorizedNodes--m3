/**
 * VALORAIPLUS Proof Ledger
 * Deterministic Verification Ledger for Runtime Claims
 */

import {
  type ProofVector,
  type ValidationScores,
  type ValidationStatus,
  type ProofLedgerEntry,
  type RuntimeClaim,
  type InvariantState,
  type AdmissionStatus,
  VERIFICATION_THRESHOLDS,
} from './types';

// ============================================================
// PROOF VECTOR COMPUTATION
// ============================================================

/**
 * Create proof vector from claim properties
 */
export function createProofVector(claim: RuntimeClaim): ProofVector {
  const hasSource = !!claim.sourceRef;
  const isImplemented = claim.status === 'IMPLEMENTED';
  const confidence = claim.validationScore;
  
  return {
    evidence: hasSource ? 0.95 : 0.30,
    provenance: hasSource ? 0.90 : 0.40,
    replay: claim.isReplayable ? 0.95 : 0.50,
    determinism: claim.isDeterministic ? 0.98 : confidence * 0.70,
    attribution: isImplemented ? 0.90 : 0.50,
    temporal: 0.95, // Protocol maintains temporal continuity
    consensus: confidence,
  };
}

/**
 * Create proof vector from raw values
 */
export function buildProofVector(
  evidence: number,
  provenance: number,
  replay: number,
  determinism: number,
  attribution: number,
  temporal: number,
  consensus: number
): ProofVector {
  return {
    evidence: Math.max(0, Math.min(1, evidence)),
    provenance: Math.max(0, Math.min(1, provenance)),
    replay: Math.max(0, Math.min(1, replay)),
    determinism: Math.max(0, Math.min(1, determinism)),
    attribution: Math.max(0, Math.min(1, attribution)),
    temporal: Math.max(0, Math.min(1, temporal)),
    consensus: Math.max(0, Math.min(1, consensus)),
  };
}

// ============================================================
// SCORE COMPUTATION
// ============================================================

/**
 * Compute Proof Score (Tier 1)
 * Measures mechanical support
 * P = (E × P × R × D)^0.25
 */
export function computeProofScore(vector: ProofVector): number {
  const { evidence, provenance, replay, determinism } = vector;
  const raw = Math.pow(evidence * provenance * replay * determinism, 0.25);
  return Math.round(raw * 1000) / 1000;
}

/**
 * Compute Confidence Score (Tier 2)
 * Measures interpretation reliability
 * C = (A + T + Cn) / 3
 */
export function computeConfidenceScore(vector: ProofVector): number {
  const { attribution, temporal, consensus } = vector;
  const raw = (attribution + temporal + consensus) / 3;
  return Math.round(raw * 1000) / 1000;
}

/**
 * Compute Validation Score
 * V = (P + C) / 2
 */
export function computeValidationScore(proofScore: number, confidenceScore: number): number {
  return Math.round(((proofScore + confidenceScore) / 2) * 1000) / 1000;
}

/**
 * Determine validation status from score
 */
export function determineValidationStatus(
  validationScore: number,
  hasReplay: boolean,
  hasSourceLineage: boolean
): ValidationStatus {
  if (validationScore >= VERIFICATION_THRESHOLDS.VERIFIED && hasReplay && hasSourceLineage) {
    return 'VERIFIED';
  } else if (validationScore >= VERIFICATION_THRESHOLDS.HIGH) {
    return 'HIGH';
  } else if (validationScore >= VERIFICATION_THRESHOLDS.MEDIUM) {
    return 'MEDIUM';
  } else if (validationScore >= VERIFICATION_THRESHOLDS.LOW) {
    return 'LOW';
  }
  return 'UNVERIFIED';
}

/**
 * Generate complete validation scores from proof vector
 */
export function generateValidationScores(
  vector: ProofVector,
  hasReplay: boolean = true,
  hasSourceLineage: boolean = true
): ValidationScores {
  const proofScore = computeProofScore(vector);
  const confidenceScore = computeConfidenceScore(vector);
  const validationScore = computeValidationScore(proofScore, confidenceScore);
  const status = determineValidationStatus(validationScore, hasReplay, hasSourceLineage);
  
  return {
    proofScore,
    confidenceScore,
    validationScore,
    status,
  };
}

// ============================================================
// PROOF LEDGER ENTRY GENERATION
// ============================================================

/**
 * Create a proof ledger entry from claim and computed data
 */
export function createProofLedgerEntry(
  claim: RuntimeClaim,
  vector: ProofVector,
  scores: ValidationScores,
  invariantState: InvariantState,
  admissionStatus: AdmissionStatus,
  reasoning: string[] = []
): ProofLedgerEntry {
  const exportEligible = 
    admissionStatus !== 'BLOCKED' && 
    scores.validationScore >= VERIFICATION_THRESHOLDS.EXPORT_MINIMUM &&
    invariantState !== 'BLOCKED';
  
  return {
    id: claim.id,
    statement: claim.statement,
    formula: `${claim.component}/${claim.id}`,
    component: claim.component,
    sourceRef: claim.sourceRef,
    proofScore: scores.proofScore,
    confidenceScore: scores.confidenceScore,
    validationScore: scores.validationScore,
    validationStatus: scores.status,
    invariantState,
    admissionStatus,
    exportEligible,
    reasoning,
    timestamp: claim.timestamp,
  };
}

// ============================================================
// PROOF LEDGER OPERATIONS
// ============================================================

/**
 * In-memory proof ledger store
 */
let proofLedger: ProofLedgerEntry[] = [];

/**
 * Append entry to proof ledger
 */
export function appendToLedger(entry: ProofLedgerEntry): void {
  proofLedger.push(entry);
}

/**
 * Get all ledger entries
 */
export function getLedger(): ProofLedgerEntry[] {
  return [...proofLedger];
}

/**
 * Get ledger entries by validation status
 */
export function getLedgerByStatus(status: ValidationStatus): ProofLedgerEntry[] {
  return proofLedger.filter(e => e.validationStatus === status);
}

/**
 * Get ledger entries by invariant state
 */
export function getLedgerByInvariantState(state: InvariantState): ProofLedgerEntry[] {
  return proofLedger.filter(e => e.invariantState === state);
}

/**
 * Get export-eligible entries
 */
export function getExportEligibleEntries(): ProofLedgerEntry[] {
  return proofLedger.filter(e => e.exportEligible);
}

/**
 * Get ledger statistics
 */
export function getLedgerStatistics(): {
  total: number;
  verified: number;
  high: number;
  medium: number;
  low: number;
  unverified: number;
  exportEligible: number;
  avgProofScore: number;
  avgConfidenceScore: number;
  avgValidationScore: number;
} {
  const total = proofLedger.length;
  if (total === 0) {
    return {
      total: 0,
      verified: 0,
      high: 0,
      medium: 0,
      low: 0,
      unverified: 0,
      exportEligible: 0,
      avgProofScore: 0,
      avgConfidenceScore: 0,
      avgValidationScore: 0,
    };
  }
  
  return {
    total,
    verified: proofLedger.filter(e => e.validationStatus === 'VERIFIED').length,
    high: proofLedger.filter(e => e.validationStatus === 'HIGH').length,
    medium: proofLedger.filter(e => e.validationStatus === 'MEDIUM').length,
    low: proofLedger.filter(e => e.validationStatus === 'LOW').length,
    unverified: proofLedger.filter(e => e.validationStatus === 'UNVERIFIED').length,
    exportEligible: proofLedger.filter(e => e.exportEligible).length,
    avgProofScore: Math.round((proofLedger.reduce((s, e) => s + e.proofScore, 0) / total) * 1000) / 1000,
    avgConfidenceScore: Math.round((proofLedger.reduce((s, e) => s + e.confidenceScore, 0) / total) * 1000) / 1000,
    avgValidationScore: Math.round((proofLedger.reduce((s, e) => s + e.validationScore, 0) / total) * 1000) / 1000,
  };
}

/**
 * Clear the proof ledger (for testing)
 */
export function clearLedger(): void {
  proofLedger = [];
}

/**
 * Initialize ledger with entries
 */
export function initializeLedger(entries: ProofLedgerEntry[]): void {
  proofLedger = [...entries];
}

// ============================================================
// BATCH OPERATIONS
// ============================================================

/**
 * Generate proof ledger entries from claims
 */
export function generateProofLedgerFromClaims(
  claims: RuntimeClaim[],
  getInvariantState: (claim: RuntimeClaim) => InvariantState,
  getAdmissionStatus: (claim: RuntimeClaim) => AdmissionStatus
): ProofLedgerEntry[] {
  return claims.map(claim => {
    const vector = createProofVector(claim);
    const scores = generateValidationScores(vector, claim.isReplayable, !!claim.sourceRef);
    const invariantState = getInvariantState(claim);
    const admissionStatus = getAdmissionStatus(claim);
    
    const reasoning = [
      `ProofScore = ${scores.proofScore}`,
      `ConfidenceScore = ${scores.confidenceScore}`,
      `ValidationScore = ${scores.validationScore}`,
      `InvariantState = ${invariantState}`,
      `AdmissionStatus = ${admissionStatus}`,
    ];
    
    return createProofLedgerEntry(
      claim,
      vector,
      scores,
      invariantState,
      admissionStatus,
      reasoning
    );
  });
}

/**
 * Export proof ledger as JSON
 */
export function exportLedgerAsJSON(): string {
  return JSON.stringify({
    exportTimestamp: new Date().toISOString(),
    statistics: getLedgerStatistics(),
    entries: proofLedger,
  }, null, 2);
}
