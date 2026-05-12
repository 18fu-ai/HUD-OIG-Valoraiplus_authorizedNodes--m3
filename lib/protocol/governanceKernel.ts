/**
 * VALORAIPLUS Protocol — Governance Kernel
 * 
 * The Runtime Governance Kernel orchestrates the entire verification chain.
 * Rules are configurable runtime primitives, not hardcoded logic.
 * Every decision is reconstructable via trace graph.
 */

import { INVARIANT_RULES, enforceInvariants, createRuntimeClaim, type RuntimeClaim } from './invariantEngine';
import { assignReasonCodes, type ReasonAssignment } from './reasonCodes';
import { constructTraceGraph, generateTraceSummary, type TraceGraph } from './traceGraph';
import { performReplayValidation, type ReplayValidationResult } from './replayValidator';
import { evaluateExportEligibility, EXPORT_POLICIES, type ExportEligibility, type ExportPolicy } from './exportPolicy';

// ============================================================
// GOVERNANCE KERNEL TYPES
// ============================================================

export type GovernanceMode = 'STRICT' | 'STANDARD' | 'PERMISSIVE' | 'AUDIT';

export interface GovernanceConfig {
  mode: GovernanceMode;
  exportPolicy: ExportPolicy;
  enableTracing: boolean;
  enableReplayValidation: boolean;
  validationThreshold: number;
  escalationThreshold: number;
}

export interface GovernanceDecision {
  claimId: string;
  admitted: boolean;
  exportEligible: boolean;
  visibilityGranted: boolean;
  validationScore: number;
  reasonAssignment: ReasonAssignment;
  traceGraph?: TraceGraph;
  replayResult?: ReplayValidationResult;
  exportEligibility?: ExportEligibility;
  timestamp: string;
  mode: GovernanceMode;
}

// ============================================================
// DEFAULT CONFIGURATIONS
// ============================================================

export const GOVERNANCE_CONFIGS: Record<GovernanceMode, GovernanceConfig> = {
  STRICT: {
    mode: 'STRICT',
    exportPolicy: EXPORT_POLICIES.STRICT,
    enableTracing: true,
    enableReplayValidation: true,
    validationThreshold: 0.95,
    escalationThreshold: 0.50,
  },
  STANDARD: {
    mode: 'STANDARD',
    exportPolicy: EXPORT_POLICIES.STANDARD,
    enableTracing: true,
    enableReplayValidation: true,
    validationThreshold: 0.75,
    escalationThreshold: 0.40,
  },
  PERMISSIVE: {
    mode: 'PERMISSIVE',
    exportPolicy: EXPORT_POLICIES.PERMISSIVE,
    enableTracing: false,
    enableReplayValidation: false,
    validationThreshold: 0.50,
    escalationThreshold: 0.25,
  },
  AUDIT: {
    mode: 'AUDIT',
    exportPolicy: EXPORT_POLICIES.STRICT,
    enableTracing: true,
    enableReplayValidation: true,
    validationThreshold: 0.90,
    escalationThreshold: 0.60,
  },
};

// ============================================================
// GOVERNANCE KERNEL CLASS
// ============================================================

export class GovernanceKernel {
  private config: GovernanceConfig;
  private decisions: GovernanceDecision[] = [];

  constructor(mode: GovernanceMode = 'STANDARD') {
    this.config = GOVERNANCE_CONFIGS[mode];
  }

  /**
   * Set governance mode
   */
  setMode(mode: GovernanceMode): void {
    this.config = GOVERNANCE_CONFIGS[mode];
  }

  /**
   * Get current configuration
   */
  getConfig(): GovernanceConfig {
    return { ...this.config };
  }

  /**
   * Process a claim through the full governance chain
   */
  processClaim(claim: RuntimeClaim): GovernanceDecision {
    // Step 1: Enforce invariants
    const enforcement = enforceInvariants(claim);
    const hardViolations = enforcement.invariantResults
      .filter(r => !r.passed && r.severity === 'HARD')
      .map(r => r.invariantId);
    const softViolations = enforcement.invariantResults
      .filter(r => !r.passed && r.severity === 'SOFT')
      .map(r => r.invariantId);

    // Step 2: Perform replay validation (if enabled)
    let replayResult: ReplayValidationResult | undefined;
    if (this.config.enableReplayValidation) {
      replayResult = performReplayValidation(
        { id: claim.id, statement: claim.statement, component: claim.component, sourceRef: claim.sourceRef },
        { proofScore: claim.proofScore, confidenceScore: claim.confidenceScore, validationScore: claim.validationScore, status: claim.status },
        enforcement.invariantResults.map(r => `${r.invariantId}:${r.passed}`)
      );
    }

    // Step 3: Determine admission
    const meetsThreshold = claim.validationScore >= this.config.validationThreshold;
    const passesInvariants = hardViolations.length === 0;
    const isReplayConsistent = replayResult?.consistent ?? true;
    const admitted = meetsThreshold && passesInvariants && isReplayConsistent;

    // Step 4: Assign reason codes
    const reasonAssignment = assignReasonCodes(
      admitted,
      claim.validationScore,
      hardViolations.length,
      softViolations.length,
      !!claim.sourceRef,
      isReplayConsistent,
      { claimId: claim.id, mode: this.config.mode }
    );

    // Step 5: Evaluate export eligibility
    const exportEligibility = evaluateExportEligibility(
      {
        claimId: claim.id,
        statement: claim.statement,
        validationScore: claim.validationScore,
        hasSourceLineage: !!claim.sourceRef,
        isReplayConsistent,
        hardViolations: hardViolations.length,
        softViolations: softViolations.length,
        reasonAssignment,
      },
      this.config.exportPolicy
    );

    // Step 6: Construct trace graph (if enabled)
    let traceGraph: TraceGraph | undefined;
    if (this.config.enableTracing) {
      traceGraph = constructTraceGraph({
        claimId: claim.id,
        statement: claim.statement,
        sourceRef: claim.sourceRef,
        proofScore: claim.proofScore,
        confidenceScore: claim.confidenceScore,
        validationScore: claim.validationScore,
        hardViolations,
        softViolations,
        replayConsistent: isReplayConsistent,
        reasonAssignment,
        admitted,
        exportEligible: exportEligibility.eligible,
      });
    }

    // Step 7: Create governance decision
    const decision: GovernanceDecision = {
      claimId: claim.id,
      admitted,
      exportEligible: exportEligibility.eligible,
      visibilityGranted: admitted,
      validationScore: claim.validationScore,
      reasonAssignment,
      traceGraph,
      replayResult,
      exportEligibility,
      timestamp: new Date().toISOString(),
      mode: this.config.mode,
    };

    this.decisions.push(decision);
    return decision;
  }

  /**
   * Process multiple claims
   */
  processBatch(claims: RuntimeClaim[]): GovernanceDecision[] {
    return claims.map(claim => this.processClaim(claim));
  }

  /**
   * Get all decisions
   */
  getDecisions(): GovernanceDecision[] {
    return [...this.decisions];
  }

  /**
   * Get decisions by admission status
   */
  getAdmittedDecisions(): GovernanceDecision[] {
    return this.decisions.filter(d => d.admitted);
  }

  /**
   * Get decisions eligible for export
   */
  getExportableDecisions(): GovernanceDecision[] {
    return this.decisions.filter(d => d.exportEligible);
  }

  /**
   * Generate governance summary
   */
  generateSummary(): {
    mode: GovernanceMode;
    totalDecisions: number;
    admitted: number;
    rejected: number;
    exportEligible: number;
    averageValidationScore: number;
    traceGraphsGenerated: number;
  } {
    const admitted = this.decisions.filter(d => d.admitted).length;
    const exportEligible = this.decisions.filter(d => d.exportEligible).length;
    const traced = this.decisions.filter(d => d.traceGraph).length;
    const avgScore = this.decisions.length > 0
      ? this.decisions.reduce((sum, d) => sum + d.validationScore, 0) / this.decisions.length
      : 0;

    return {
      mode: this.config.mode,
      totalDecisions: this.decisions.length,
      admitted,
      rejected: this.decisions.length - admitted,
      exportEligible,
      averageValidationScore: Math.round(avgScore * 1000) / 1000,
      traceGraphsGenerated: traced,
    };
  }

  /**
   * Explain a decision
   */
  explainDecision(claimId: string): string | null {
    const decision = this.decisions.find(d => d.claimId === claimId);
    if (!decision) return null;

    const lines: string[] = [
      `Governance Decision: ${decision.claimId}`,
      `Mode: ${decision.mode}`,
      `Timestamp: ${decision.timestamp}`,
      ``,
      `Result:`,
      `  Admitted: ${decision.admitted}`,
      `  Export Eligible: ${decision.exportEligible}`,
      `  Visibility Granted: ${decision.visibilityGranted}`,
      `  Validation Score: ${decision.validationScore.toFixed(3)}`,
      ``,
      `Reason:`,
      `  Primary: [${decision.reasonAssignment.primaryCode.code}] ${decision.reasonAssignment.primaryCode.message}`,
      `  Description: ${decision.reasonAssignment.primaryCode.description}`,
    ];

    if (decision.reasonAssignment.secondaryCodes.length > 0) {
      lines.push(`  Secondary Codes:`);
      for (const code of decision.reasonAssignment.secondaryCodes) {
        lines.push(`    [${code.code}] ${code.message}`);
      }
    }

    if (decision.traceGraph) {
      lines.push(``, `Trace:`, generateTraceSummary(decision.traceGraph));
    }

    return lines.join('\n');
  }

  /**
   * Clear decision history
   */
  clearHistory(): void {
    this.decisions = [];
  }
}

// ============================================================
// SINGLETON INSTANCE
// ============================================================

let kernelInstance: GovernanceKernel | null = null;

/**
 * Get the singleton governance kernel instance
 */
export function getGovernanceKernel(mode?: GovernanceMode): GovernanceKernel {
  if (!kernelInstance) {
    kernelInstance = new GovernanceKernel(mode || 'STANDARD');
  } else if (mode) {
    kernelInstance.setMode(mode);
  }
  return kernelInstance;
}

/**
 * Reset the governance kernel
 */
export function resetGovernanceKernel(): void {
  kernelInstance = null;
}
