/**
 * VALORAIPLUS Epistemic System
 * Hybrid Dashboard + Backend + Smart Contract Architecture
 * 
 * Core Architecture:
 * Frontend Dashboard → Projection Layer → Assurance Engine → 
 * Governance Rules → Lineage Graph → Evidence Store → Blockchain Proof Layer
 * 
 * ABSOLUTE_9_ZERO_DRIFT Enforcement:
 * - SIGNAL TARGET: 100.0% OPTIMUM
 * - DRIFT TARGET: 0 ABSOLUTE
 * - GREEN_RENDER_ALLOWED ONLY WHEN: signalPercent === 100 AND driftCriticalCount === 0
 */

// Types
export * from './types';

// Assurance Engine
export { AssuranceEngine, assuranceEngine } from './assurance-engine';

// Total Order Epistemic Chain
export { TotalOrderEpistemicChain, epistemicChain } from './total-order-chain';

// Governance Validator
export { 
  GovernanceValidator, 
  governanceValidator,
  classifyRuntimeSignal,
  canRenderGreen,
  getCurrentTelemetry,
} from './governance-validator';

// Dashboard Integrity
export {
  computeDashboardIntegrity,
  getSignalColor,
  getSignalBackground,
  formatSignal,
  meetsZeroDriftTarget,
  ZERO_DRIFT_TARGET,
  type DashboardIntegrityState,
} from './dashboard-integrity';
