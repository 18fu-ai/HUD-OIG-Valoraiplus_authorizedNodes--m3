/**
 * VALORAIPLUS Protocol Runtime Types
 * Shared type definitions for the Machine-Enforced Verification Runtime
 */

// ============================================================
// STATEMENT CLASSIFICATION
// ============================================================

export type StatementStatus = 
  | 'IMPLEMENTED'   // Deployed code with runtime evidence
  | 'STUBBED'       // Interface exists, logic pending
  | 'SIMULATED'     // Hardcoded/mock data
  | 'PLANNED'       // Architecture defined, not built
  | 'NEEDS_SOURCE'; // Claim requires external verification

export type ClaimSafety = 
  | 'PROVEN'        // Mechanically verified
  | 'INFERRED'      // Evidence suggests
  | 'SIMULATED'     // Mock/hardcoded
  | 'PENDING'       // Awaiting verification
  | 'NEEDS_SOURCE'; // Requires external source

// ============================================================
// VALIDATION STATUS
// ============================================================

export type ValidationStatus = 
  | 'VERIFIED'      // V >= 0.95 + replay + lineage
  | 'HIGH'          // V >= 0.85
  | 'MEDIUM'        // V >= 0.70
  | 'LOW'           // V >= 0.50
  | 'UNVERIFIED';   // V < 0.50

// ============================================================
// INVARIANT STATES
// ============================================================

export type InvariantState = 
  | 'VALID'           // All checks passed
  | 'INCOMPLETE'      // Missing evidence
  | 'NONDETERMINISTIC'// Replay inconsistency
  | 'UNSOURCED'       // No source lineage
  | 'BLOCKED';        // Hard violation

export type InvariantId = 
  | 'STATE_OBSERVABLE'
  | 'AUTHORITY_EXPLICIT'
  | 'MUTATION_DETERMINISTIC'
  | 'LEDGER_CANONICAL'
  | 'REPLAY_FIRST_CLASS';

export type EnforcementLevel = 'HARD' | 'SOFT';

// ============================================================
// ADMISSION STATUS
// ============================================================

export type AdmissionStatus = 
  | 'ADMITTED'  // Passed all checks
  | 'WARNED'    // Soft violations
  | 'BLOCKED';  // Hard violations

export type PipelineStatus = 
  | 'HEALTHY'   // All claims admitted
  | 'DEGRADED'  // Some warnings
  | 'FAILING';  // Hard blocks present

// ============================================================
// PROOF VECTOR
// ============================================================

export interface ProofVector {
  evidence: number;      // E - source count (0-1)
  provenance: number;    // P - trace completeness (0-1)
  replay: number;        // R - reproducibility (0-1)
  determinism: number;   // D - same-input consistency (0-1)
  attribution: number;   // A - actor linkage (0-1)
  temporal: number;      // T - temporal continuity (0-1)
  consensus: number;     // C - consensus agreement (0-1)
}

// ============================================================
// VALIDATION SCORES
// ============================================================

export interface ValidationScores {
  proofScore: number;       // P = (E × P × R × D)^0.25
  confidenceScore: number;  // C = (A + T + C) / 3
  validationScore: number;  // V = (P + C) / 2
  status: ValidationStatus;
}

// ============================================================
// RUNTIME CLAIM
// ============================================================

export interface RuntimeClaim {
  id: string;
  statement: string;
  component: string;
  sourceRef?: string;
  proofScore: number;
  confidenceScore: number;
  validationScore: number;
  status: StatementStatus;
  safety: ClaimSafety;
  timestamp: string;
  
  // Invariant properties
  isObservable: boolean;
  hasExplicitAuthority: boolean;
  isDeterministic: boolean;
  isLedgerAnchored: boolean;
  isReplayable: boolean;
  hasSourceRef: boolean;
}

// ============================================================
// PROOF LEDGER ENTRY
// ============================================================

export interface ProofLedgerEntry {
  id: string;
  statement: string;
  formula: string;
  component: string;
  sourceRef?: string;
  proofScore: number;
  confidenceScore: number;
  validationScore: number;
  validationStatus: ValidationStatus;
  invariantState: InvariantState;
  admissionStatus: AdmissionStatus;
  exportEligible: boolean;
  reasoning: string[];
  timestamp: string;
}

// ============================================================
// INVARIANT RULE
// ============================================================

export interface InvariantRule {
  id: InvariantId;
  name: string;
  description: string;
  enforcement: EnforcementLevel;
  check: (claim: RuntimeClaim) => InvariantCheckResult;
}

export interface InvariantCheckResult {
  invariantId: InvariantId;
  passed: boolean;
  reason: string;
  severity: 'CRITICAL' | 'WARNING' | 'INFO';
}

// ============================================================
// ENFORCEMENT RESULT
// ============================================================

export interface EnforcementResult {
  claim: RuntimeClaim;
  invariantResults: InvariantCheckResult[];
  allPassed: boolean;
  hasHardViolation: boolean;
  hasSoftViolation: boolean;
  exportEligible: boolean;
  visibilityGranted: boolean;
}

// ============================================================
// PIPELINE RESULT
// ============================================================

export interface PipelineResult {
  claim: RuntimeClaim;
  proofVector: ProofVector;
  validationScores: ValidationScores;
  invariantState: InvariantState;
  admissionStatus: AdmissionStatus;
  exportEligible: boolean;
  ledgerEntry: ProofLedgerEntry;
  reasoning: string[];
}

// ============================================================
// BATCH PIPELINE RESULT
// ============================================================

export interface BatchPipelineResult {
  results: PipelineResult[];
  summary: {
    total: number;
    verified: number;
    high: number;
    medium: number;
    low: number;
    unverified: number;
    admitted: number;
    warned: number;
    blocked: number;
    exportEligible: number;
  };
  pipelineStatus: PipelineStatus;
  timestamp: string;
}

// ============================================================
// AUDIT SUMMARY
// ============================================================

export interface AuditSummary {
  totalStatements: number;
  implemented: number;
  stubbed: number;
  simulated: number;
  planned: number;
  needsSource: number;
  averageConfidence: number;
  exportReady: boolean;
}

// ============================================================
// POLICY EXPORT
// ============================================================

export interface PolicyExport {
  exportId: string;
  timestamp: string;
  pipelineStatus: PipelineStatus;
  totalClaims: number;
  exportedClaims: number;
  claims: ProofLedgerEntry[];
  summary: AuditSummary;
  invariantHealth: {
    id: InvariantId;
    passRate: number;
    violations: number;
  }[];
}

// ============================================================
// PROTOCOL SIGNALS
// ============================================================

export interface ProtocolSignals {
  eventVelocity: number;
  actorEscalation: number;
  mutationDensity: number;
  replayConfidence: number;
  sourceCompleteness: number;
  statementRisk: number;
  auditReadiness: number;
}

// ============================================================
// RUNTIME STAGE
// ============================================================

export type RuntimeStage = 
  | 'OBSERVE'
  | 'AGGREGATE'
  | 'INTERPRET'
  | 'AUDIT'
  | 'SOFTEN'
  | 'RECOMMEND'
  | 'EXPORT';

// ============================================================
// VERIFICATION CONSTANTS
// ============================================================

export const VERIFICATION_THRESHOLDS = {
  VERIFIED: 0.95,
  HIGH: 0.85,
  MEDIUM: 0.70,
  LOW: 0.50,
  EXPORT_MINIMUM: 0.75,
} as const;

export const TRUTH_CYCLE_MS = 266;
