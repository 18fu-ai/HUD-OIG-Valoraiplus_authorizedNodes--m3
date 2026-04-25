/**
 * AMath Hardened Dual-Boundary Runtime Architecture v2.0
 * 
 * Barrel Export
 * 
 * Core Invariant:
 *   Runtime confirms execution.
 *   Evidence confirms reality.
 *   Visualization reflects classification.
 */

// Types
export type {
  CorroborationStatus,
  RuntimeProvenance,
  SourceType,
  EvidenceRow,
  ReceiptV2,
  RuntimeLayer,
  LayerResponsibility,
  ObservedFact,
  Interpretation,
  ClosedLoopStage,
  ClosedLoopState,
  HardeningStatus,
  HardeningCapability,
  // New in v2.0
  RuntimeSignal,
  RuntimeDecision,
  EvidenceBoundary,
  HardenedReceiptV1,
} from './types';

// Constants
export {
  LAYER_RESPONSIBILITIES,
  PRODUCTION_SCORECARD,
  HARDENED_INVARIANT,
} from './types';

// Runtime functions
export {
  // Immutability
  deepFreeze,
  
  // Provenance
  generateProvenance,
  
  // Hardened Receipt V1 (new primary)
  createHardenedReceipt,
  createEvidenceBoundary,
  createRuntimeSignal,
  createRuntimeDecision,
  
  // Receipt V2 (legacy compat)
  createReceiptV2,
  
  // Evidence
  createEvidenceRow,
  
  // Observations
  recordObservation,
  createInterpretation,
  
  // Closed Loop
  initializeClosedLoop,
  advanceClosedLoop,
  isClosedLoopComplete,
  STAGE_ORDER,
  
  // Corroboration
  requiresCorroboration,
  getDefaultCorroboration,
  isTrusted,
  isUncertain,
  
  // Layer Validation
  validateLayerAction,
  
  // Scorecard
  getProductionScorecard,
  getHardeningPercentage,
} from './runtime';
