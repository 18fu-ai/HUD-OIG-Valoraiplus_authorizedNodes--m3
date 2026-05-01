/**
 * VALORAIPLUS Assurance Engine
 * Computes confidence, entropy, and attractor distance for epistemic validation
 */

import type { AssuranceState, ProofRecord, GovernanceRule } from './types';

export class AssuranceEngine {
  /**
   * Calculate confidence score based on proof quality, governance pass rate, and replayability
   * Weighted formula: 40% proof + 35% governance + 25% replayability
   */
  calculateConfidence(
    proofQuality: number,
    governancePassRate: number,
    replayability: number
  ): number {
    return (
      proofQuality * 0.4 +
      governancePassRate * 0.35 +
      replayability * 0.25
    );
  }

  /**
   * Compute Shannon entropy from probability distribution
   * Lower entropy = higher certainty
   */
  computeEntropy(values: number[]): number {
    return values.reduce((sum, p) => {
      if (p <= 0) return sum;
      return sum - p * Math.log(p);
    }, 0);
  }

  /**
   * Compute Euclidean distance from current state to attractor (optimal state)
   * Zero distance = optimal alignment
   */
  computeAttractorDistance(
    current: number[],
    attractor: number[]
  ): number {
    return Math.sqrt(
      current.reduce((sum, value, index) => {
        return sum + Math.pow(value - attractor[index], 2);
      }, 0)
    );
  }

  /**
   * Compute full assurance state from proof and governance rules
   */
  computeAssuranceState(
    proof: ProofRecord,
    governanceRules: GovernanceRule[]
  ): AssuranceState {
    const proofQuality = proof.verified ? 1.0 : 0.0;
    const passedRules = governanceRules.filter(r => r.passed).length;
    const governancePassRate = governanceRules.length > 0 
      ? passedRules / governanceRules.length 
      : 0;
    const replayability = proof.replayable ? 1.0 : 0.0;

    const confidence = this.calculateConfidence(
      proofQuality,
      governancePassRate,
      replayability
    );

    // Compute entropy from rule pass/fail distribution
    const passRate = governancePassRate;
    const failRate = 1 - passRate;
    const entropy = this.computeEntropy([passRate, failRate].filter(v => v > 0));

    // Attractor is [1.0, 1.0, 1.0] (perfect proof, governance, replayability)
    const attractor = [1.0, 1.0, 1.0];
    const current = [proofQuality, governancePassRate, replayability];
    const attractorDistance = this.computeAttractorDistance(current, attractor);

    // Lineage integrity is based on depth
    const lineageIntegrity = proof.lineageDepth > 0 ? 1.0 : 0.0;

    return {
      confidence,
      entropy,
      attractorDistance,
      lineageIntegrity,
    };
  }

  /**
   * Check if assurance state meets ABSOLUTE_9_ZERO_DRIFT requirements
   */
  meetsZeroDriftRequirements(state: AssuranceState): boolean {
    return (
      state.confidence >= 1.0 &&
      state.entropy === 0 &&
      state.attractorDistance === 0 &&
      state.lineageIntegrity === 1.0
    );
  }
}

// Singleton instance
export const assuranceEngine = new AssuranceEngine();
