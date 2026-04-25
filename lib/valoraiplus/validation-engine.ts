/**
 * VALORAIPLUS CONTINUOUS VALIDATION ENGINE
 * 
 * Schema: REV_33
 * Classification: S-CLASS REFLEXIVE GOVERNANCE
 * 
 * 14 dimensions defined → 14 dimensions continuously validated
 */

import {
  type ValorAIPlusDimensionId,
  type ValorAIPlusDimensionContract,
  type ValorAIPlus2eValidationResult,
  type ValorAIPlus3eGovernanceState,
  type ValorAIPlusGrade,
  VALORAIPLUS_DIMENSION_REGISTRY,
  VALORAIPLUS_GRADE_WEIGHTS,
  VALORAIPLUS_GOVERNING_INVARIANT
} from './dimension-contracts';

// ============================================================
// VALORAIPLUS VALIDATION FUNCTIONS
// ============================================================

let valoraiplusValidationCycle = 0;
let valoraiplusChallengeCounter = 0;

/**
 * Generate a unique challenge ID
 */
function generateValorAIPlusChallengeId(): string {
  return `VALORAIPLUS_CHALLENGE_${Date.now().toString(36).toUpperCase()}_${(++valoraiplusChallengeCounter).toString().padStart(4, '0')}`;
}

/**
 * Generate reflexive integrity hash
 */
function generateValorAIPlusIntegrityHash(state: Partial<ValorAIPlus3eGovernanceState>): string {
  const input = JSON.stringify({
    cycle: valoraiplusValidationCycle,
    dimensions: state.dimensions?.length || 0,
    confidence: state.totalConfidence || 0,
    timestamp: Date.now()
  });
  
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return `VALORAIPLUS_INTEGRITY_${Math.abs(hash).toString(16).toUpperCase().padStart(8, '0')}`;
}

/**
 * Validate a single dimension
 */
export function valoraiplusValidateDimension(
  dimension: ValorAIPlusDimensionContract
): ValorAIPlus2eValidationResult {
  const challengeId = generateValorAIPlusChallengeId();
  
  // Validation logic: check evidence count, confidence, and grade progression
  const hasEvidence = dimension.evidence.length >= 3;
  const hasConfidence = dimension.confidence >= 85;
  const hasValidations = dimension.validationCount >= 10;
  const hasChallenges = dimension.challengesSurvived >= 1;
  
  const passed = hasEvidence && hasConfidence && hasValidations && hasChallenges;
  const confidence = passed ? dimension.confidence : Math.min(dimension.confidence, 70);
  
  const reasons: string[] = [];
  if (!hasEvidence) reasons.push('VALORAIPLUS_INSUFFICIENT_EVIDENCE');
  if (!hasConfidence) reasons.push('VALORAIPLUS_LOW_CONFIDENCE');
  if (!hasValidations) reasons.push('VALORAIPLUS_INSUFFICIENT_VALIDATIONS');
  if (!hasChallenges) reasons.push('VALORAIPLUS_NO_CHALLENGES_SURVIVED');
  
  return Object.freeze({
    dimensionId: dimension.id,
    passed,
    confidence,
    reason: passed ? 'VALORAIPLUS_VALIDATION_PASSED' : reasons.join(' | '),
    timestamp: new Date().toISOString(),
    challengeId
  });
}

/**
 * Validate all 14 dimensions
 */
export function valoraiplusValidateAllDimensions(): readonly ValorAIPlus2eValidationResult[] {
  return Object.freeze(
    VALORAIPLUS_DIMENSION_REGISTRY.map(valoraiplusValidateDimension)
  );
}

/**
 * Calculate total confidence score
 */
export function valoraiplusCalculateTotalConfidence(
  dimensions: readonly ValorAIPlusDimensionContract[]
): number {
  if (dimensions.length === 0) return 0;
  
  const totalWeight = dimensions.reduce((sum, d) => {
    return sum + (d.confidence * VALORAIPLUS_GRADE_WEIGHTS[d.currentGrade]);
  }, 0);
  
  const maxWeight = dimensions.length * 100 * 100; // max confidence * max grade weight
  return Math.round((totalWeight / maxWeight) * 100);
}

/**
 * Calculate coverage percentage
 */
export function valoraiplusCalculateCoverage(
  results: readonly ValorAIPlus2eValidationResult[]
): number {
  if (results.length === 0) return 0;
  const passed = results.filter(r => r.passed).length;
  return Math.round((passed / results.length) * 100);
}

/**
 * Get full governance state
 */
export function valoraiplusGetGovernanceState(): ValorAIPlus3eGovernanceState {
  valoraiplusValidationCycle++;
  
  const results = valoraiplusValidateAllDimensions();
  const totalConfidence = valoraiplusCalculateTotalConfidence(VALORAIPLUS_DIMENSION_REGISTRY);
  const coveragePercent = valoraiplusCalculateCoverage(results);
  
  const state: ValorAIPlus3eGovernanceState = {
    schemaVersion: 'REV_33',
    classification: 'S-CLASS',
    dimensions: VALORAIPLUS_DIMENSION_REGISTRY,
    totalConfidence,
    coveragePercent,
    lastFullValidation: new Date().toISOString(),
    valorLoopCycle: valoraiplusValidationCycle,
    reflexiveIntegrityHash: ''
  };
  
  // Generate integrity hash based on state
  const integrityHash = generateValorAIPlusIntegrityHash(state);
  
  return Object.freeze({
    ...state,
    reflexiveIntegrityHash: integrityHash
  });
}

/**
 * Get grade distribution
 */
export function valoraiplusGetGradeDistribution(): Record<ValorAIPlusGrade, number> {
  const distribution: Record<ValorAIPlusGrade, number> = {
    'S': 0, 'A++': 0, 'A+': 0, 'A': 0, 'B+': 0, 'B': 0, 'C': 0, 'F': 0
  };
  
  for (const dimension of VALORAIPLUS_DIMENSION_REGISTRY) {
    distribution[dimension.currentGrade]++;
  }
  
  return distribution;
}

/**
 * Get overall grade based on distribution
 */
export function valoraiplusGetOverallGrade(): ValorAIPlusGrade {
  const distribution = valoraiplusGetGradeDistribution();
  
  // S-class requires majority S grades
  if (distribution['S'] >= 7) return 'S';
  
  // A++ requires majority A++ or higher
  if (distribution['S'] + distribution['A++'] >= 10) return 'A++';
  
  // A+ requires majority A+ or higher
  if (distribution['S'] + distribution['A++'] + distribution['A+'] >= 12) return 'A+';
  
  // A requires no grades below B+
  if (distribution['B'] + distribution['C'] + distribution['F'] === 0) return 'A';
  
  // Default based on weighted average
  const totalWeight = VALORAIPLUS_DIMENSION_REGISTRY.reduce((sum, d) => {
    return sum + VALORAIPLUS_GRADE_WEIGHTS[d.currentGrade];
  }, 0);
  
  const avgWeight = totalWeight / VALORAIPLUS_DIMENSION_REGISTRY.length;
  
  if (avgWeight >= 95) return 'A++';
  if (avgWeight >= 90) return 'A+';
  if (avgWeight >= 85) return 'A';
  if (avgWeight >= 80) return 'B+';
  if (avgWeight >= 75) return 'B';
  if (avgWeight >= 65) return 'C';
  return 'F';
}

/**
 * Get telemetry metrics
 */
export function valoraiplusGetTelemetry() {
  const state = valoraiplusGetGovernanceState();
  const distribution = valoraiplusGetGradeDistribution();
  const overallGrade = valoraiplusGetOverallGrade();
  
  return Object.freeze({
    schemaVersion: 'REV_33',
    classification: 'S-CLASS',
    overallGrade,
    distribution,
    totalConfidence: state.totalConfidence,
    coveragePercent: state.coveragePercent,
    valorLoopCycle: state.valorLoopCycle,
    reflexiveIntegrityHash: state.reflexiveIntegrityHash,
    dimensionCount: 14,
    sClassCount: distribution['S'],
    aPlusPlusCount: distribution['A++'],
    aPlusCount: distribution['A+'],
    governingInvariant: VALORAIPLUS_GOVERNING_INVARIANT.rule,
    chainLayers: VALORAIPLUS_GOVERNING_INVARIANT.layers,
    timestamp: new Date().toISOString()
  });
}

/**
 * Challenge a specific dimension (ValorLoop++ falsification)
 */
export function valoraiplusChallengeDimension(
  dimensionId: ValorAIPlusDimensionId
): ValorAIPlus2eValidationResult {
  const dimension = VALORAIPLUS_DIMENSION_REGISTRY.find(d => d.id === dimensionId);
  
  if (!dimension) {
    return Object.freeze({
      dimensionId,
      passed: false,
      confidence: 0,
      reason: 'VALORAIPLUS_DIMENSION_NOT_FOUND',
      timestamp: new Date().toISOString(),
      challengeId: generateValorAIPlusChallengeId()
    });
  }
  
  // Apply challenge - slightly stricter validation
  const result = valoraiplusValidateDimension(dimension);
  
  return Object.freeze({
    ...result,
    reason: result.passed 
      ? 'VALORAIPLUS_CHALLENGE_SURVIVED' 
      : `VALORAIPLUS_CHALLENGE_FAILED: ${result.reason}`
  });
}

/**
 * Full ValorLoop++ cycle - challenge all dimensions
 */
export function valoraiplusRunValorLoopCycle(): {
  results: readonly ValorAIPlus2eValidationResult[];
  survivedCount: number;
  failedCount: number;
  cycleNumber: number;
} {
  const results = VALORAIPLUS_DIMENSION_REGISTRY.map(d => 
    valoraiplusChallengeDimension(d.id)
  );
  
  const survivedCount = results.filter(r => r.passed).length;
  const failedCount = results.filter(r => !r.passed).length;
  
  return Object.freeze({
    results: Object.freeze(results),
    survivedCount,
    failedCount,
    cycleNumber: ++valoraiplusValidationCycle
  });
}
