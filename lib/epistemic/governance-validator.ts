/**
 * VALORAIPLUS Governance Validator
 * Validates proofs against governance rules for legitimacy
 */

import type { ProofRecord, GovernanceRule, RuntimeTelemetry, RuntimeSignal } from './types';

export class GovernanceValidator {
  /**
   * Validate proof against core governance rules
   */
  validate(proof: ProofRecord): GovernanceRule[] {
    return [
      {
        id: "lineage-complete",
        name: "Lineage Completeness",
        passed: proof.lineageDepth > 0,
      },
      {
        id: "replayability",
        name: "Replayability",
        passed: proof.replayable,
      },
      {
        id: "verified",
        name: "Verification",
        passed: proof.verified,
      },
      {
        id: "evidence-linked",
        name: "Evidence Linked",
        passed: !!proof.evidenceId && proof.evidenceId.length > 0,
      },
    ];
  }

  /**
   * Validate all rules pass
   */
  allRulesPass(rules: GovernanceRule[]): boolean {
    return rules.every(rule => rule.passed);
  }

  /**
   * Get failed rules
   */
  getFailedRules(rules: GovernanceRule[]): GovernanceRule[] {
    return rules.filter(rule => !rule.passed);
  }

  /**
   * Compute governance pass rate
   */
  computePassRate(rules: GovernanceRule[]): number {
    if (rules.length === 0) return 0;
    return rules.filter(r => r.passed).length / rules.length;
  }
}

/**
 * ABSOLUTE_9_ZERO_DRIFT Runtime Signal Classification
 * Green is ONLY legal at exact optimum
 */
export function classifyRuntimeSignal(
  telemetry: RuntimeTelemetry
): RuntimeSignal {
  // ABSOLUTE_9_ZERO_DRIFT enforcement:
  // Green is only legal at exact optimum
  if (telemetry.driftCriticalCount > 0) return "CRITICAL";
  if (telemetry.signalPercent < 100) return "DEGRADED";
  return "ALL_GREEN";
}

/**
 * Check if green render is allowed
 * ABSOLUTE_9_ZERO_DRIFT: signalPercent === 100 AND driftCriticalCount === 0
 */
export function canRenderGreen(
  proofComplete: boolean,
  governanceValid: boolean,
  replayable: boolean,
  telemetry: RuntimeTelemetry
): boolean {
  return (
    proofComplete &&
    governanceValid &&
    replayable &&
    classifyRuntimeSignal(telemetry) === "ALL_GREEN"
  );
}

/**
 * Get current runtime telemetry
 * In production, this would fetch from the actual runtime
 */
export function getCurrentTelemetry(): RuntimeTelemetry {
  return {
    truthCycle: 47,
    intervalMs: 266,
    timestamp: new Date().toISOString(),
    signalPercent: 100.0, // Target: OPTIMUM
    driftCriticalCount: 0, // Target: ABSOLUTE ZERO
  };
}

// Singleton instance
export const governanceValidator = new GovernanceValidator();
