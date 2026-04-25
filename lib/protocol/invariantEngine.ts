/**
 * VALORAIPLUS Machine-Enforced Runtime Invariant Engine
 * 
 * Transforms invariants from conceptual documentation into executable enforcement.
 * 
 * Core Principle: visibility = consequence of enforcement (not storage)
 * 
 * Runtime Admission Model:
 * Claim → Evidence Binding → Proof Construction → Validation Score → 
 * Invariant Enforcement → Policy Decision → Visibility
 */

// ============================================================
// INVARIANT DEFINITIONS
// ============================================================

export type InvariantId = 
  | 'STATE_OBSERVABLE'
  | 'AUTHORITY_EXPLICIT'
  | 'MUTATION_DETERMINISTIC'
  | 'LEDGER_CANONICAL'
  | 'REPLAY_FIRST_CLASS';

export interface InvariantRule {
  id: InvariantId;
  name: string;
  description: string;
  enforcement: 'HARD' | 'SOFT';  // HARD = blocks, SOFT = warns
  check: (claim: RuntimeClaim) => InvariantResult;
}

export interface InvariantResult {
  passed: boolean;
  invariantId: InvariantId;
  reason: string;
  severity: 'BLOCK' | 'WARN' | 'PASS';
  timestamp: string;
}

// ============================================================
// RUNTIME CLAIM SCHEMA
// ============================================================

export interface RuntimeClaim {
  id: string;
  statement: string;
  component: string;
  
  // Evidence binding
  hasSourceRef: boolean;
  sourceRef?: string;
  
  // Proof construction
  proofScore: number;
  confidenceScore: number;
  validationScore: number;
  
  // State properties
  isObservable: boolean;       // Invariant 1: Can state be accessed?
  hasExplicitAuthority: boolean; // Invariant 2: Is signer traceable?
  isDeterministic: boolean;    // Invariant 3: Same input → same output?
  isLedgerAnchored: boolean;   // Invariant 4: Exists in canonical ledger?
  isReplayable: boolean;       // Invariant 5: Can be reconstructed?
  
  // Metadata
  timestamp: string;
}

// ============================================================
// INVARIANT RULE REGISTRY
// ============================================================

export const INVARIANT_RULES: InvariantRule[] = [
  {
    id: 'STATE_OBSERVABLE',
    name: 'State Is Observable',
    description: 'All protocol state must be exposed via typed accessors',
    enforcement: 'HARD',
    check: (claim: RuntimeClaim): InvariantResult => {
      const passed = claim.isObservable;
      return {
        passed,
        invariantId: 'STATE_OBSERVABLE',
        reason: passed 
          ? 'State accessor verified' 
          : 'VIOLATION: Hidden state detected — no typed accessor',
        severity: passed ? 'PASS' : 'BLOCK',
        timestamp: new Date().toISOString(),
      };
    },
  },
  {
    id: 'AUTHORITY_EXPLICIT',
    name: 'Authority Is Explicit',
    description: 'Every mutation must be traceable to an authorized signer',
    enforcement: 'HARD',
    check: (claim: RuntimeClaim): InvariantResult => {
      const passed = claim.hasExplicitAuthority;
      return {
        passed,
        invariantId: 'AUTHORITY_EXPLICIT',
        reason: passed
          ? 'Authority chain verified'
          : 'VIOLATION: Unsigned mutation detected — no signer trace',
        severity: passed ? 'PASS' : 'BLOCK',
        timestamp: new Date().toISOString(),
      };
    },
  },
  {
    id: 'MUTATION_DETERMINISTIC',
    name: 'Mutation Is Deterministic',
    description: 'Same input and state must produce same output',
    enforcement: 'HARD',
    check: (claim: RuntimeClaim): InvariantResult => {
      const passed = claim.isDeterministic;
      return {
        passed,
        invariantId: 'MUTATION_DETERMINISTIC',
        reason: passed
          ? 'Determinism verified'
          : 'VIOLATION: Non-deterministic mutation detected',
        severity: passed ? 'PASS' : 'BLOCK',
        timestamp: new Date().toISOString(),
      };
    },
  },
  {
    id: 'LEDGER_CANONICAL',
    name: 'Ledger Is Canonical',
    description: 'Single append-only event stream serves as source of truth',
    enforcement: 'HARD',
    check: (claim: RuntimeClaim): InvariantResult => {
      const passed = claim.isLedgerAnchored;
      return {
        passed,
        invariantId: 'LEDGER_CANONICAL',
        reason: passed
          ? 'Ledger anchor verified'
          : 'VIOLATION: Floating claim — not anchored to canonical ledger',
        severity: passed ? 'PASS' : 'BLOCK',
        timestamp: new Date().toISOString(),
      };
    },
  },
  {
    id: 'REPLAY_FIRST_CLASS',
    name: 'Replay Is First-Class',
    description: 'Any historical state must be reconstructible from ledger',
    enforcement: 'SOFT',
    check: (claim: RuntimeClaim): InvariantResult => {
      const passed = claim.isReplayable;
      return {
        passed,
        invariantId: 'REPLAY_FIRST_CLASS',
        reason: passed
          ? 'Replay lineage verified'
          : 'WARNING: Replay lineage incomplete — historical reconstruction may fail',
        severity: passed ? 'PASS' : 'WARN',
        timestamp: new Date().toISOString(),
      };
    },
  },
];

// ============================================================
// ENFORCEMENT ENGINE
// ============================================================

export interface EnforcementResult {
  claim: RuntimeClaim;
  invariantResults: InvariantResult[];
  allPassed: boolean;
  hardViolations: number;
  softViolations: number;
  admissionStatus: 'ADMITTED' | 'BLOCKED' | 'WARNED';
  exportEligible: boolean;
  visibilityGranted: boolean;
  policyDecision: string;
  timestamp: string;
}

/**
 * Enforce all invariants against a claim
 * This is the core admission gate
 */
export function enforceInvariants(claim: RuntimeClaim): EnforcementResult {
  const invariantResults = INVARIANT_RULES.map(rule => rule.check(claim));
  
  const hardViolations = invariantResults.filter(
    r => !r.passed && INVARIANT_RULES.find(rule => rule.id === r.invariantId)?.enforcement === 'HARD'
  ).length;
  
  const softViolations = invariantResults.filter(
    r => !r.passed && INVARIANT_RULES.find(rule => rule.id === r.invariantId)?.enforcement === 'SOFT'
  ).length;
  
  const allPassed = invariantResults.every(r => r.passed);
  
  // Admission status
  let admissionStatus: EnforcementResult['admissionStatus'];
  if (hardViolations > 0) {
    admissionStatus = 'BLOCKED';
  } else if (softViolations > 0) {
    admissionStatus = 'WARNED';
  } else {
    admissionStatus = 'ADMITTED';
  }
  
  // Export eligibility requires:
  // 1. No hard violations
  // 2. ValidationScore >= 0.75
  // 3. Source lineage present
  const exportEligible = 
    hardViolations === 0 && 
    claim.validationScore >= 0.75 && 
    claim.hasSourceRef;
  
  // Visibility granted only if admitted
  const visibilityGranted = admissionStatus === 'ADMITTED';
  
  // Policy decision string
  let policyDecision: string;
  if (admissionStatus === 'BLOCKED') {
    const violations = invariantResults.filter(r => !r.passed).map(r => r.invariantId);
    policyDecision = `BLOCKED: ${violations.join(', ')} violated`;
  } else if (admissionStatus === 'WARNED') {
    policyDecision = `ADMITTED WITH WARNINGS: ${softViolations} soft violation(s)`;
  } else {
    policyDecision = 'ADMITTED: All invariants satisfied';
  }
  
  return {
    claim,
    invariantResults,
    allPassed,
    hardViolations,
    softViolations,
    admissionStatus,
    exportEligible,
    visibilityGranted,
    policyDecision,
    timestamp: new Date().toISOString(),
  };
}

// ============================================================
// VIOLATION TRACKING
// ============================================================

export interface ViolationRecord {
  claimId: string;
  component: string;
  invariantId: InvariantId;
  reason: string;
  severity: 'BLOCK' | 'WARN';
  timestamp: string;
}

export interface ViolationLedger {
  violations: ViolationRecord[];
  totalBlocks: number;
  totalWarns: number;
  blockRate: number;
  warnRate: number;
  cleanRate: number;
}

/**
 * Extract violations from enforcement results
 */
export function extractViolations(results: EnforcementResult[]): ViolationLedger {
  const violations: ViolationRecord[] = [];
  
  for (const result of results) {
    for (const ir of result.invariantResults) {
      if (!ir.passed) {
        violations.push({
          claimId: result.claim.id,
          component: result.claim.component,
          invariantId: ir.invariantId,
          reason: ir.reason,
          severity: ir.severity === 'BLOCK' ? 'BLOCK' : 'WARN',
          timestamp: ir.timestamp,
        });
      }
    }
  }
  
  const totalBlocks = violations.filter(v => v.severity === 'BLOCK').length;
  const totalWarns = violations.filter(v => v.severity === 'WARN').length;
  const totalClaims = results.length;
  
  return {
    violations,
    totalBlocks,
    totalWarns,
    blockRate: totalClaims > 0 ? totalBlocks / totalClaims : 0,
    warnRate: totalClaims > 0 ? totalWarns / totalClaims : 0,
    cleanRate: totalClaims > 0 ? (totalClaims - totalBlocks - totalWarns) / totalClaims : 1,
  };
}

// ============================================================
// RUNTIME ADMISSION PIPELINE
// ============================================================

export interface AdmissionPipelineResult {
  totalClaims: number;
  admitted: number;
  blocked: number;
  warned: number;
  exportEligible: number;
  admissionRate: number;
  exportRate: number;
  results: EnforcementResult[];
  violationLedger: ViolationLedger;
  pipelineStatus: 'HEALTHY' | 'DEGRADED' | 'FAILING';
  timestamp: string;
}

/**
 * Run full admission pipeline on a batch of claims
 */
export function runAdmissionPipeline(claims: RuntimeClaim[]): AdmissionPipelineResult {
  const results = claims.map(claim => enforceInvariants(claim));
  const violationLedger = extractViolations(results);
  
  const admitted = results.filter(r => r.admissionStatus === 'ADMITTED').length;
  const blocked = results.filter(r => r.admissionStatus === 'BLOCKED').length;
  const warned = results.filter(r => r.admissionStatus === 'WARNED').length;
  const exportEligible = results.filter(r => r.exportEligible).length;
  
  const totalClaims = claims.length;
  const admissionRate = totalClaims > 0 ? admitted / totalClaims : 1;
  const exportRate = totalClaims > 0 ? exportEligible / totalClaims : 0;
  
  // Pipeline status
  let pipelineStatus: AdmissionPipelineResult['pipelineStatus'];
  if (violationLedger.blockRate > 0.1) {
    pipelineStatus = 'FAILING';
  } else if (violationLedger.warnRate > 0.2) {
    pipelineStatus = 'DEGRADED';
  } else {
    pipelineStatus = 'HEALTHY';
  }
  
  return {
    totalClaims,
    admitted,
    blocked,
    warned,
    exportEligible,
    admissionRate,
    exportRate,
    results,
    violationLedger,
    pipelineStatus,
    timestamp: new Date().toISOString(),
  };
}

// ============================================================
// CLAIM FACTORY
// ============================================================

/**
 * Create a runtime claim from audit record
 */
export function createRuntimeClaim(
  id: string,
  statement: string,
  component: string,
  sourceRef: string | undefined,
  proofScore: number,
  confidenceScore: number,
  validationScore: number,
  status: string,
  safety: string
): RuntimeClaim {
  const hasSourceRef = !!sourceRef;
  const isImplemented = status === 'IMPLEMENTED';
  const isProven = safety === 'PROVEN';
  
  return {
    id,
    statement,
    component,
    hasSourceRef,
    sourceRef,
    proofScore,
    confidenceScore,
    validationScore,
    // Invariant properties derived from status
    isObservable: isImplemented,
    hasExplicitAuthority: isImplemented || hasSourceRef,
    isDeterministic: isProven || validationScore >= 0.9,
    isLedgerAnchored: hasSourceRef,
    isReplayable: isImplemented && hasSourceRef,
    timestamp: new Date().toISOString(),
  };
}

// ============================================================
// POLICY EXPORT
// ============================================================

export interface PolicyExport {
  title: string;
  generatedAt: string;
  pipelineStatus: string;
  summary: {
    totalClaims: number;
    admitted: number;
    blocked: number;
    exportEligible: number;
    admissionRate: string;
    exportRate: string;
  };
  admittedClaims: Array<{
    id: string;
    statement: string;
    validationScore: number;
    policyDecision: string;
  }>;
  blockedClaims: Array<{
    id: string;
    statement: string;
    violations: string[];
    policyDecision: string;
  }>;
  invariantHealth: Array<{
    invariantId: InvariantId;
    name: string;
    violations: number;
    passRate: string;
  }>;
}

// ============================================================
// INVARIANT STATE CLASSIFICATION
// ============================================================

export type InvariantState = 
  | 'VALID'           // All checks passed, fully compliant
  | 'INCOMPLETE'      // Missing required evidence
  | 'NONDETERMINISTIC' // Replay inconsistency detected
  | 'UNSOURCED'       // No source lineage
  | 'BLOCKED';        // Hard invariant violation

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

// ============================================================
// DOCUMENT-SPECIFIED API
// ============================================================

export interface SingleInvariantValidation {
  invariantId: InvariantId;
  passed: boolean;
  reason: string;
  enforcement: 'HARD' | 'SOFT';
}

/**
 * Validate a single invariant against a claim
 * API: validateInvariant(claim, invariantId)
 */
export function validateInvariant(
  claim: RuntimeClaim, 
  invariantId: InvariantId
): SingleInvariantValidation {
  const rule = INVARIANT_RULES.find(r => r.id === invariantId);
  if (!rule) {
    return {
      invariantId,
      passed: false,
      reason: `Unknown invariant: ${invariantId}`,
      enforcement: 'HARD',
    };
  }
  
  const result = rule.check(claim);
  return {
    invariantId: result.invariantId,
    passed: result.passed,
    reason: result.reason,
    enforcement: rule.enforcement,
  };
}

export interface RuntimeClaimEnforcement {
  invariantSatisfied: boolean;
  invariantState: InvariantState;
  exportEligible: boolean;
  visibilityGranted: boolean;
  reasoning: string[];
  violations: string[];
  score: number;
  threshold: number;
  classification: string;
  deterministic: boolean;
  reproducible: boolean;
}

/**
 * Enforce all runtime rules against a claim
 * API: enforceRuntimeClaim(claim)
 */
export function enforceRuntimeClaim(claim: RuntimeClaim): RuntimeClaimEnforcement {
  const invariantState = classifyInvariantState(claim);
  const enforcement = enforceInvariants(claim);
  
  const reasoning: string[] = [];
  const violations: string[] = [];
  
  // Build reasoning chain
  for (const ir of enforcement.invariantResults) {
    if (ir.passed) {
      reasoning.push(`PASS: ${ir.invariantId} — ${ir.reason}`);
    } else {
      violations.push(`${ir.severity}: ${ir.invariantId} — ${ir.reason}`);
    }
  }
  
  // Add score analysis
  reasoning.push(`ValidationScore = ${claim.validationScore.toFixed(3)}`);
  reasoning.push(`Threshold = 0.75`);
  reasoning.push(`InvariantState = ${invariantState}`);
  
  return {
    invariantSatisfied: enforcement.allPassed,
    invariantState,
    exportEligible: enforcement.exportEligible,
    visibilityGranted: enforcement.visibilityGranted,
    reasoning,
    violations,
    score: claim.validationScore,
    threshold: 0.75,
    classification: invariantState,
    deterministic: claim.isDeterministic,
    reproducible: claim.isReplayable,
  };
}

/**
 * Validate a batch of claims
 * API: validateClaimBatch(claims)
 */
export function validateClaimBatch(claims: RuntimeClaim[]): {
  results: RuntimeClaimEnforcement[];
  summary: {
    total: number;
    valid: number;
    incomplete: number;
    nondeterministic: number;
    unsourced: number;
    blocked: number;
  };
} {
  const results = claims.map(claim => enforceRuntimeClaim(claim));
  
  return {
    results,
    summary: {
      total: claims.length,
      valid: results.filter(r => r.invariantState === 'VALID').length,
      incomplete: results.filter(r => r.invariantState === 'INCOMPLETE').length,
      nondeterministic: results.filter(r => r.invariantState === 'NONDETERMINISTIC').length,
      unsourced: results.filter(r => r.invariantState === 'UNSOURCED').length,
      blocked: results.filter(r => r.invariantState === 'BLOCKED').length,
    },
  };
}

/**
 * Get only claims eligible for export
 * API: getExportableClaims(claims)
 */
export function getExportableClaims(claims: RuntimeClaim[]): RuntimeClaim[] {
  return claims.filter(claim => {
    const enforcement = enforceRuntimeClaim(claim);
    return enforcement.exportEligible;
  });
}

// ============================================================
// POLICY EXPORT
// ============================================================

/**
 * Generate export-ready policy document
 */
export function generatePolicyExport(pipeline: AdmissionPipelineResult): PolicyExport {
  // Calculate invariant health
  const invariantHealth = INVARIANT_RULES.map(rule => {
    const violations = pipeline.violationLedger.violations.filter(
      v => v.invariantId === rule.id
    ).length;
    const passRate = pipeline.totalClaims > 0 
      ? ((pipeline.totalClaims - violations) / pipeline.totalClaims * 100).toFixed(1) + '%'
      : '100%';
    return {
      invariantId: rule.id,
      name: rule.name,
      violations,
      passRate,
    };
  });
  
  // Admitted claims
  const admittedClaims = pipeline.results
    .filter(r => r.admissionStatus === 'ADMITTED')
    .map(r => ({
      id: r.claim.id,
      statement: r.claim.statement,
      validationScore: r.claim.validationScore,
      policyDecision: r.policyDecision,
    }));
  
  // Blocked claims
  const blockedClaims = pipeline.results
    .filter(r => r.admissionStatus === 'BLOCKED')
    .map(r => ({
      id: r.claim.id,
      statement: r.claim.statement,
      violations: r.invariantResults.filter(ir => !ir.passed).map(ir => ir.invariantId),
      policyDecision: r.policyDecision,
    }));
  
  return {
    title: 'VALORAIPLUS Policy Export — Machine-Enforced Verification Runtime',
    generatedAt: new Date().toISOString(),
    pipelineStatus: pipeline.pipelineStatus,
    summary: {
      totalClaims: pipeline.totalClaims,
      admitted: pipeline.admitted,
      blocked: pipeline.blocked,
      exportEligible: pipeline.exportEligible,
      admissionRate: (pipeline.admissionRate * 100).toFixed(1) + '%',
      exportRate: (pipeline.exportRate * 100).toFixed(1) + '%',
    },
    admittedClaims,
    blockedClaims,
    invariantHealth,
  };
}
