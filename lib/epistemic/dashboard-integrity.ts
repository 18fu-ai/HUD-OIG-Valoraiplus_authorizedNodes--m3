/**
 * VALORAIPLUS Dashboard Integrity Rules
 * ABSOLUTE_9_ZERO_DRIFT Enforcement
 * 
 * MODE: ABSOLUTE_9_ZERO_DRIFT
 * SIGNAL TARGET: 100.0% OPTIMUM
 * DRIFT TARGET: 0 ABSOLUTE
 * GREEN_RENDER_ALLOWED ONLY WHEN: signalPercent === 100 AND driftCriticalCount === 0
 */

import type { RuntimeTelemetry, RuntimeSignal, AssuranceState } from './types';
import { classifyRuntimeSignal, canRenderGreen } from './governance-validator';
import { assuranceEngine } from './assurance-engine';

export interface DashboardIntegrityState {
  signal: RuntimeSignal;
  signalPercent: number;
  driftCriticalCount: number;
  canRenderGreen: boolean;
  assurance: AssuranceState;
  truthCycle: number;
  timestamp: string;
}

/**
 * Compute full dashboard integrity state
 */
export function computeDashboardIntegrity(
  telemetry: RuntimeTelemetry,
  proofComplete: boolean = true,
  governanceValid: boolean = true,
  replayable: boolean = true
): DashboardIntegrityState {
  const signal = classifyRuntimeSignal(telemetry);
  const greenAllowed = canRenderGreen(
    proofComplete,
    governanceValid,
    replayable,
    telemetry
  );

  // Compute assurance state based on signal
  const assurance: AssuranceState = {
    confidence: telemetry.signalPercent / 100,
    entropy: telemetry.driftCriticalCount > 0 ? 0.1 * telemetry.driftCriticalCount : 0,
    attractorDistance: (100 - telemetry.signalPercent) / 100,
    lineageIntegrity: proofComplete ? 1.0 : 0.0,
  };

  return {
    signal,
    signalPercent: telemetry.signalPercent,
    driftCriticalCount: telemetry.driftCriticalCount,
    canRenderGreen: greenAllowed,
    assurance,
    truthCycle: telemetry.truthCycle,
    timestamp: telemetry.timestamp,
  };
}

/**
 * Get status color based on signal
 * ABSOLUTE_9_ZERO_DRIFT: Green only at exact optimum
 */
export function getSignalColor(signal: RuntimeSignal): string {
  switch (signal) {
    case 'ALL_GREEN':
      return 'text-emerald-400';
    case 'DEGRADED':
      return 'text-amber-400';
    case 'CRITICAL':
      return 'text-red-500';
    default:
      return 'text-zinc-400';
  }
}

/**
 * Get status background based on signal
 */
export function getSignalBackground(signal: RuntimeSignal): string {
  switch (signal) {
    case 'ALL_GREEN':
      return 'bg-emerald-500/10 border-emerald-500/30';
    case 'DEGRADED':
      return 'bg-amber-500/10 border-amber-500/30';
    case 'CRITICAL':
      return 'bg-red-500/10 border-red-500/30';
    default:
      return 'bg-zinc-500/10 border-zinc-500/30';
  }
}

/**
 * Format signal for display
 */
export function formatSignal(signal: RuntimeSignal): string {
  switch (signal) {
    case 'ALL_GREEN':
      return 'ALL GREEN - ZERO DRIFT';
    case 'DEGRADED':
      return 'DEGRADED - DRIFT DETECTED';
    case 'CRITICAL':
      return 'CRITICAL - DRIFT ACTIVE';
    default:
      return 'UNKNOWN';
  }
}

/**
 * ABSOLUTE_9_ZERO_DRIFT target telemetry
 */
export const ZERO_DRIFT_TARGET: RuntimeTelemetry = {
  truthCycle: 47,
  intervalMs: 266,
  timestamp: new Date().toISOString(),
  signalPercent: 100.0,
  driftCriticalCount: 0,
};

/**
 * Check if current state meets ABSOLUTE_9_ZERO_DRIFT
 */
export function meetsZeroDriftTarget(telemetry: RuntimeTelemetry): boolean {
  return (
    telemetry.signalPercent === 100.0 &&
    telemetry.driftCriticalCount === 0
  );
}
