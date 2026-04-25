/**
 * SIMPLE MACHINE-ENFORCED RUNTIME TOPOLOGY
 * 
 * Flow:
 *   Claim → Route66 (dual evaluation) → Kernel (governance) → Decision Boundary → Route70/71
 * 
 * Invariant:
 *   score >= threshold → Route71 (ADMITTED)
 *   score < threshold  → Route70 (REJECTED)
 */

// ============================================================
// TYPES
// ============================================================

export type ClaimStatus = 'PENDING' | 'ADMITTED' | 'REJECTED';

export type TopologyClaim = {
  id: string;
  evidenceScore: number;
  proofScore: number;
  confidenceScore: number;
};

export type RuntimeResult = {
  route: '/route70' | '/route71';
  status: ClaimStatus;
  reason: string;
};

export type DualEvaluation = {
  evaluationA: number;
  evaluationB: number;
  combinedScore: number;
};

export type GovernanceResult = {
  admitted: boolean;
  reason: string;
  threshold: number;
  score: number;
};

// ============================================================
// ROUTE 66: DUAL EVALUATION
// ============================================================

/**
 * Route 66 performs parallel dual evaluation:
 * - Evaluation A: Raw evidence score
 * - Evaluation B: Average of proof and confidence scores
 * - Combined: Average of both evaluations
 */
export function route66DualEvaluation(claim: TopologyClaim): DualEvaluation {
  const evaluationA = claim.evidenceScore;
  const evaluationB = (claim.proofScore + claim.confidenceScore) / 2;

  return {
    evaluationA,
    evaluationB,
    combinedScore: (evaluationA + evaluationB) / 2,
  };
}

// ============================================================
// KERNEL: GOVERNANCE
// ============================================================

const DEFAULT_GOVERNANCE_THRESHOLD = 0.85;

/**
 * Kernel governance applies the threshold invariant
 */
export function kernelGovernance(
  score: number, 
  threshold: number = DEFAULT_GOVERNANCE_THRESHOLD
): GovernanceResult {
  if (score >= threshold) {
    return {
      admitted: true,
      reason: `Score ${(score * 100).toFixed(1)}% passed governance threshold ${(threshold * 100).toFixed(0)}%`,
      threshold,
      score,
    };
  }

  return {
    admitted: false,
    reason: `Score ${(score * 100).toFixed(1)}% below governance threshold ${(threshold * 100).toFixed(0)}%`,
    threshold,
    score,
  };
}

// ============================================================
// DECISION BOUNDARY
// ============================================================

/**
 * Decision boundary routes to Route70 (rejected) or Route71 (admitted)
 */
export function decisionBoundary(governance: GovernanceResult): RuntimeResult {
  if (governance.admitted) {
    return {
      route: '/route71',
      status: 'ADMITTED',
      reason: governance.reason,
    };
  }

  return {
    route: '/route70',
    status: 'REJECTED',
    reason: governance.reason,
  };
}

// ============================================================
// RUNTIME TOPOLOGY (MAIN ENTRY POINT)
// ============================================================

export type TopologyResult = {
  claim: TopologyClaim;
  evaluation: DualEvaluation;
  governance: GovernanceResult;
  result: RuntimeResult;
  timestamp: string;
};

/**
 * Execute the full runtime topology:
 * Claim → Route66 → Kernel → Decision Boundary → Route70/71
 */
export function runtimeTopology(
  claim: TopologyClaim, 
  threshold?: number
): TopologyResult {
  // Route 66: Dual evaluation
  const evaluation = route66DualEvaluation(claim);

  // Kernel: Governance
  const governance = kernelGovernance(evaluation.combinedScore, threshold);

  // Decision Boundary: Final routing
  const result = decisionBoundary(governance);

  return {
    claim,
    evaluation,
    governance,
    result,
    timestamp: new Date().toISOString(),
  };
}

// ============================================================
// BATCH PROCESSING
// ============================================================

export type BatchTopologyResult = {
  results: TopologyResult[];
  summary: {
    total: number;
    admitted: number;
    rejected: number;
    admissionRate: number;
    averageScore: number;
  };
};

/**
 * Process multiple claims through the topology
 */
export function batchTopology(
  claims: TopologyClaim[], 
  threshold?: number
): BatchTopologyResult {
  const results = claims.map(claim => runtimeTopology(claim, threshold));
  
  const admitted = results.filter(r => r.result.status === 'ADMITTED').length;
  const scores = results.map(r => r.evaluation.combinedScore);
  const averageScore = scores.length > 0 
    ? scores.reduce((a, b) => a + b, 0) / scores.length 
    : 0;

  return {
    results,
    summary: {
      total: claims.length,
      admitted,
      rejected: claims.length - admitted,
      admissionRate: claims.length > 0 ? admitted / claims.length : 0,
      averageScore,
    },
  };
}

// ============================================================
// CLAIM FACTORY
// ============================================================

/**
 * Create a topology claim from raw scores
 */
export function createTopologyClaim(
  id: string,
  evidenceScore: number,
  proofScore: number,
  confidenceScore: number
): TopologyClaim {
  return {
    id,
    evidenceScore: Math.max(0, Math.min(1, evidenceScore)),
    proofScore: Math.max(0, Math.min(1, proofScore)),
    confidenceScore: Math.max(0, Math.min(1, confidenceScore)),
  };
}

/**
 * Create a topology claim from a validation score (shorthand)
 */
export function createClaimFromValidation(
  id: string,
  validationScore: number
): TopologyClaim {
  // Derive component scores from validation
  return createTopologyClaim(
    id,
    validationScore,
    validationScore * 0.95,
    validationScore * 1.02
  );
}

// ============================================================
// VISUAL FLOW (ASCII)
// ============================================================

export const TOPOLOGY_FLOW = `
┌─────────┐
│  Claim  │
└────┬────┘
     │
     ▼
┌─────────────────────┐
│  Route66            │
│  (dual evaluation)  │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Kernel             │
│  (governance)       │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Decision Boundary  │
└──────────┬──────────┘
           │
     ┌─────┴─────┐
     ▼           ▼
┌─────────┐ ┌─────────┐
│ Route70 │ │ Route71 │
│REJECTED │ │ADMITTED │
└─────────┘ └─────────┘
`;
