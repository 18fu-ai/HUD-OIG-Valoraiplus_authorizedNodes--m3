/**
 * VALORAIPLUS Protocol — Replay Validator
 * 
 * Validates deterministic reproducibility of claims.
 * A claim is replay-consistent if the same inputs produce the same outputs.
 */

// ============================================================
// REPLAY SNAPSHOT TYPES
// ============================================================

export interface ReplaySnapshot {
  id: string;
  claimId: string;
  timestamp: string;
  inputHash: string;
  outputHash: string;
  validationScore: number;
  proofScore: number;
  confidenceScore: number;
  invariantResults: string[]; // serialized invariant check results
}

export interface ReplayValidationResult {
  consistent: boolean;
  snapshots: ReplaySnapshot[];
  divergencePoint?: string;
  divergenceReason?: string;
  confidence: number; // 0-1
}

// ============================================================
// HASH UTILITIES
// ============================================================

/**
 * Simple deterministic hash for replay comparison
 * Uses a basic string hashing algorithm for demonstration
 */
function simpleHash(input: string): string {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(16).padStart(8, '0');
}

/**
 * Create a deterministic hash of claim inputs
 */
export function hashClaimInputs(claim: {
  id: string;
  statement: string;
  component: string;
  sourceRef?: string;
}): string {
  const canonical = JSON.stringify({
    id: claim.id,
    statement: claim.statement,
    component: claim.component,
    sourceRef: claim.sourceRef || null,
  });
  return simpleHash(canonical);
}

/**
 * Create a deterministic hash of claim outputs
 */
export function hashClaimOutputs(outputs: {
  proofScore: number;
  confidenceScore: number;
  validationScore: number;
  status: string;
}): string {
  const canonical = JSON.stringify({
    proofScore: Math.round(outputs.proofScore * 1000),
    confidenceScore: Math.round(outputs.confidenceScore * 1000),
    validationScore: Math.round(outputs.validationScore * 1000),
    status: outputs.status,
  });
  return simpleHash(canonical);
}

// ============================================================
// REPLAY SNAPSHOT STORE
// ============================================================

const snapshotStore: Map<string, ReplaySnapshot[]> = new Map();

/**
 * Store a replay snapshot
 */
export function storeSnapshot(snapshot: ReplaySnapshot): void {
  const existing = snapshotStore.get(snapshot.claimId) || [];
  existing.push(snapshot);
  snapshotStore.set(snapshot.claimId, existing);
}

/**
 * Get all snapshots for a claim
 */
export function getSnapshots(claimId: string): ReplaySnapshot[] {
  return snapshotStore.get(claimId) || [];
}

/**
 * Clear snapshots for a claim
 */
export function clearSnapshots(claimId: string): void {
  snapshotStore.delete(claimId);
}

// ============================================================
// REPLAY VALIDATION
// ============================================================

/**
 * Create a replay snapshot from current claim state
 */
export function createSnapshot(
  claimId: string,
  inputs: { id: string; statement: string; component: string; sourceRef?: string },
  outputs: { proofScore: number; confidenceScore: number; validationScore: number; status: string },
  invariantResults: string[]
): ReplaySnapshot {
  return {
    id: `snap_${claimId}_${Date.now()}`,
    claimId,
    timestamp: new Date().toISOString(),
    inputHash: hashClaimInputs(inputs),
    outputHash: hashClaimOutputs(outputs),
    validationScore: outputs.validationScore,
    proofScore: outputs.proofScore,
    confidenceScore: outputs.confidenceScore,
    invariantResults,
  };
}

/**
 * Validate replay consistency for a claim
 * Compares current computation against historical snapshots
 */
export function validateReplayConsistency(
  claimId: string,
  currentInputHash: string,
  currentOutputHash: string
): ReplayValidationResult {
  const snapshots = getSnapshots(claimId);

  // No history — assume consistent (first run)
  if (snapshots.length === 0) {
    return {
      consistent: true,
      snapshots: [],
      confidence: 1.0,
    };
  }

  // Find snapshots with matching inputs
  const matchingInputSnapshots = snapshots.filter(s => s.inputHash === currentInputHash);

  if (matchingInputSnapshots.length === 0) {
    // Inputs changed — cannot compare, treat as new claim
    return {
      consistent: true,
      snapshots,
      confidence: 0.5, // Lower confidence due to input change
    };
  }

  // Check if outputs match for same inputs
  const divergentSnapshots = matchingInputSnapshots.filter(s => s.outputHash !== currentOutputHash);

  if (divergentSnapshots.length > 0) {
    // Found divergence — same inputs produced different outputs
    return {
      consistent: false,
      snapshots: matchingInputSnapshots,
      divergencePoint: divergentSnapshots[0].id,
      divergenceReason: 'Output hash mismatch for identical inputs — non-deterministic computation detected',
      confidence: 0,
    };
  }

  // All matching — consistent
  const consistencyRate = matchingInputSnapshots.length / snapshots.length;
  return {
    consistent: true,
    snapshots: matchingInputSnapshots,
    confidence: Math.min(1.0, 0.5 + (consistencyRate * 0.5)),
  };
}

/**
 * Perform full replay validation with snapshot creation
 */
export function performReplayValidation(
  claim: { id: string; statement: string; component: string; sourceRef?: string },
  outputs: { proofScore: number; confidenceScore: number; validationScore: number; status: string },
  invariantResults: string[]
): ReplayValidationResult {
  const inputHash = hashClaimInputs(claim);
  const outputHash = hashClaimOutputs(outputs);

  // Validate against history
  const result = validateReplayConsistency(claim.id, inputHash, outputHash);

  // Store current snapshot for future validation
  const snapshot = createSnapshot(claim.id, claim, outputs, invariantResults);
  storeSnapshot(snapshot);

  return {
    ...result,
    snapshots: [...result.snapshots, snapshot],
  };
}

// ============================================================
// REPLAY ANALYTICS
// ============================================================

export interface ReplayAnalytics {
  totalClaims: number;
  totalSnapshots: number;
  consistentClaims: number;
  divergentClaims: number;
  averageConfidence: number;
  deterministicRate: number;
}

/**
 * Compute replay analytics across all stored claims
 */
export function computeReplayAnalytics(): ReplayAnalytics {
  const claimIds = Array.from(snapshotStore.keys());
  let totalSnapshots = 0;
  let consistentClaims = 0;
  let totalConfidence = 0;

  for (const claimId of claimIds) {
    const snapshots = getSnapshots(claimId);
    totalSnapshots += snapshots.length;

    if (snapshots.length > 1) {
      // Check consistency across snapshots
      const firstInputHash = snapshots[0].inputHash;
      const firstOutputHash = snapshots[0].outputHash;
      const allConsistent = snapshots.every(s => 
        s.inputHash !== firstInputHash || s.outputHash === firstOutputHash
      );
      if (allConsistent) {
        consistentClaims++;
        totalConfidence += 1.0;
      } else {
        totalConfidence += 0.0;
      }
    } else {
      // Single snapshot — assume consistent
      consistentClaims++;
      totalConfidence += 0.75; // Lower confidence for single-snapshot claims
    }
  }

  const totalClaims = claimIds.length;
  return {
    totalClaims,
    totalSnapshots,
    consistentClaims,
    divergentClaims: totalClaims - consistentClaims,
    averageConfidence: totalClaims > 0 ? totalConfidence / totalClaims : 1.0,
    deterministicRate: totalClaims > 0 ? consistentClaims / totalClaims : 1.0,
  };
}
