/**
 * AMath Runtime Engine
 * 
 * Implements the hardened closed-loop lifecycle:
 *   Input → Validation → Policy → Decision → Receipt → Provenance → Route → Visualization → Corroboration
 */

import {
  type CorroborationStatus,
  type RuntimeProvenance,
  type ReceiptV2,
  type SourceType,
  type EvidenceRow,
  type ObservedFact,
  type Interpretation,
  type ClosedLoopStage,
  type ClosedLoopState,
  type HardeningCapability,
  PRODUCTION_SCORECARD,
  LAYER_RESPONSIBILITIES,
} from './types';

// ============================================================
// PROVENANCE GENERATION
// ============================================================

/**
 * Generate runtime provenance for a given source
 */
export function generateProvenance(
  routeSource: string,
  verifiedBy: 'build' | 'api' | 'runtime' = 'runtime'
): RuntimeProvenance {
  const timestamp = new Date().toISOString();
  const buildHash = process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 8) || 'dev-local';
  const environment = (process.env.VERCEL_ENV as 'dev' | 'preview' | 'production') || 'dev';
  
  return {
    buildHash,
    generatedAt: timestamp,
    verifiedBy,
    environment,
    routeSource,
    checksum: generateChecksum(`${buildHash}:${timestamp}:${routeSource}`),
  };
}

/**
 * Simple checksum for provenance integrity
 */
function generateChecksum(input: string): string {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16).padStart(8, '0');
}

// ============================================================
// RECEIPT V2 GENERATION
// ============================================================

let receiptCounter = 0;

/**
 * Create a hardened ReceiptV2 with full provenance
 */
export function createReceiptV2(
  route: string,
  decision: string,
  corroboration: CorroborationStatus = 'RUNTIME_VERIFIED'
): ReceiptV2 {
  receiptCounter++;
  const provenance = generateProvenance(route, 'runtime');
  
  return {
    receiptId: `RV2-${Date.now().toString(36).toUpperCase()}-${receiptCounter.toString().padStart(4, '0')}`,
    route,
    decision,
    generatedAt: provenance.generatedAt,
    runtimeVerified: true,
    corroboration,
    provenance,
  };
}

// ============================================================
// EVIDENCE ROW GENERATION
// ============================================================

/**
 * Create a hardened evidence row with full metadata
 */
export function createEvidenceRow(
  id: string,
  label: string,
  value: string,
  sourceType: SourceType,
  corroboration: CorroborationStatus,
  routeSource: string
): EvidenceRow {
  return {
    id,
    label,
    value,
    sourceType,
    corroboration,
    lastReviewedAt: new Date().toISOString(),
    provenance: sourceType === 'runtime' ? generateProvenance(routeSource, 'runtime') : undefined,
  };
}

// ============================================================
// OBSERVED FACT GENERATION
// ============================================================

/**
 * Record an observed runtime fact
 */
export function recordObservation(
  observation: string,
  source: 'build' | 'api' | 'runtime' | 'topology',
  metric?: number
): ObservedFact {
  return {
    id: `OBS-${Date.now().toString(36).toUpperCase()}`,
    observation,
    timestamp: new Date().toISOString(),
    source,
    metric,
  };
}

/**
 * Create an interpretation from observed facts
 */
export function createInterpretation(
  statement: string,
  basedOn: ObservedFact[],
  confidence: 'high' | 'medium' | 'low',
  requiresCorroboration: boolean
): Interpretation {
  return {
    id: `INT-${Date.now().toString(36).toUpperCase()}`,
    statement,
    basedOn: basedOn.map(f => f.id),
    confidence,
    requiresCorroboration,
  };
}

// ============================================================
// CLOSED LOOP LIFECYCLE
// ============================================================

const STAGE_ORDER: ClosedLoopStage[] = [
  'input',
  'validation',
  'policy',
  'decision',
  'receipt',
  'provenance',
  'route',
  'visualization',
  'corroboration',
];

/**
 * Initialize a new closed loop trace
 */
export function initializeClosedLoop(): ClosedLoopState {
  return {
    currentStage: 'input',
    completedStages: [],
    timestamp: new Date().toISOString(),
    traceId: `TRACE-${Date.now().toString(36).toUpperCase()}`,
  };
}

/**
 * Advance the closed loop to the next stage
 */
export function advanceClosedLoop(state: ClosedLoopState): ClosedLoopState {
  const currentIndex = STAGE_ORDER.indexOf(state.currentStage);
  
  if (currentIndex === -1 || currentIndex >= STAGE_ORDER.length - 1) {
    // Already at final stage or invalid
    return {
      ...state,
      completedStages: [...state.completedStages, state.currentStage],
      timestamp: new Date().toISOString(),
    };
  }
  
  const nextStage = STAGE_ORDER[currentIndex + 1];
  
  return {
    ...state,
    currentStage: nextStage,
    completedStages: [...state.completedStages, state.currentStage],
    timestamp: new Date().toISOString(),
  };
}

/**
 * Check if closed loop is complete
 */
export function isClosedLoopComplete(state: ClosedLoopState): boolean {
  return state.currentStage === 'corroboration' || state.completedStages.length === STAGE_ORDER.length;
}

// ============================================================
// CORROBORATION HELPERS
// ============================================================

/**
 * Determine if a claim requires corroboration based on source type
 */
export function requiresCorroboration(sourceType: SourceType): boolean {
  return sourceType !== 'runtime';
}

/**
 * Get the appropriate corroboration status for a source type
 */
export function getDefaultCorroboration(sourceType: SourceType): CorroborationStatus {
  switch (sourceType) {
    case 'runtime':
      return 'RUNTIME_VERIFIED';
    case 'external':
      return 'PENDING_CORROBORATION';
    case 'manual':
      return 'UNVERIFIED';
  }
}

/**
 * Check if a corroboration status indicates trusted data
 */
export function isTrusted(status: CorroborationStatus): boolean {
  return status === 'RUNTIME_VERIFIED' || status === 'CORROBORATED';
}

/**
 * Check if a corroboration status indicates uncertain data
 */
export function isUncertain(status: CorroborationStatus): boolean {
  return status === 'PENDING_CORROBORATION' || status === 'UNVERIFIED' || status === 'DISPUTED';
}

// ============================================================
// LAYER RESPONSIBILITY VALIDATION
// ============================================================

/**
 * Validate that an action respects layer boundaries
 */
export function validateLayerAction(
  layer: 'runtime' | 'policy' | 'evidence' | 'presentation' | 'corroboration',
  action: 'decideTruth' | 'inventEvidence' | 'claimExternalCertainty'
): { allowed: boolean; reason: string } {
  const responsibility = LAYER_RESPONSIBILITIES.find(r => r.layer === layer);
  
  if (!responsibility) {
    return { allowed: false, reason: 'Unknown layer' };
  }
  
  switch (action) {
    case 'decideTruth':
      return responsibility.canDecideTruth
        ? { allowed: true, reason: `${layer} layer can decide truth` }
        : { allowed: false, reason: `${layer} layer cannot decide truth` };
    case 'inventEvidence':
      return { allowed: false, reason: 'No layer can invent evidence' };
    case 'claimExternalCertainty':
      return responsibility.canClaimExternalCertainty
        ? { allowed: true, reason: `${layer} layer can claim external certainty` }
        : { allowed: false, reason: `${layer} layer cannot claim external certainty` };
  }
}

// ============================================================
// PRODUCTION SCORECARD
// ============================================================

/**
 * Get current production hardening scorecard
 */
export function getProductionScorecard(): HardeningCapability[] {
  return PRODUCTION_SCORECARD.map(cap => ({
    ...cap,
    verifiedAt: new Date().toISOString(),
  }));
}

/**
 * Calculate hardening percentage
 */
export function getHardeningPercentage(): number {
  const hardened = PRODUCTION_SCORECARD.filter(c => c.status === 'Hardened').length;
  return Math.round((hardened / PRODUCTION_SCORECARD.length) * 100);
}

// ============================================================
// EXPORTS
// ============================================================

export {
  PRODUCTION_SCORECARD,
  LAYER_RESPONSIBILITIES,
  STAGE_ORDER,
};
