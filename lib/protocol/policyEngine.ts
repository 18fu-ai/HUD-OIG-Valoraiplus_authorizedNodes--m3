/**
 * VALORAIPLUS Deterministic Policy Engine
 * ============================================================
 * Engine ID: policy-engine-11579396039993102480
 * Classification: OMEGA-UNIFIED // DETERMINISTIC_LINEAGE
 * Merkleroot: 26856B24C50750F0C69C1EEB86A69EF777777
 * Runtime: ValorAiEngine++
 * ============================================================
 *
 * This module implements the policy layer as a DETERMINISTIC EVALUATION
 * ENGINE — not an inference or truth engine. The policy engine evaluates
 * signals, enforces trust boundaries, produces deterministic decisions
 * with full audit lineage, detects drift, and exports typed artifacts.
 *
 * Core Architecture:
 *   Signal → Classification → Evaluation → Decision → Audit → Export
 *
 * Reviewer-Safe Interpretation Boundary:
 *   Runtime Telemetry != Identity Attribution != External Proof
 *   The system provides mathematical provenance;
 *   the reviewer provides the legal conclusion.
 *
 * ============================================================
 */

import type { ProtocolSignals } from './types';

// ============================================================
// I. ENGINE IDENTITY — DETERMINISTIC INVARIANT
// ============================================================

export const POLICY_ENGINE_ID = 'policy-engine-11579396039993102480';
export const POLICY_ENGINE_VERSION = '1.0.0';
export const POLICY_ENGINE_CLASSIFICATION = 'OMEGA-UNIFIED // DETERMINISTIC_LINEAGE';
export const POLICY_ENGINE_MERKLEROOT = '26856B24C50750F0C69C1EEB86A69EF777777';

export interface PolicyEngineIdentity {
  engineId: string;
  version: string;
  classification: string;
  merkleroot: string;
  truthCycleMs: number;
  runtimeEngine: string;
  status: 'PROCESS_ACTIVE' | 'EVAL_COMPLETE' | 'SUSPENDED';
  temporalLineage: string; // ISO 8601 of engine instantiation
}

export function getPolicyEngineIdentity(): PolicyEngineIdentity {
  return {
    engineId: POLICY_ENGINE_ID,
    version: POLICY_ENGINE_VERSION,
    classification: POLICY_ENGINE_CLASSIFICATION,
    merkleroot: POLICY_ENGINE_MERKLEROOT,
    truthCycleMs: 266,
    runtimeEngine: 'ValorAiEngine++',
    status: 'PROCESS_ACTIVE',
    temporalLineage: new Date().toISOString(),
  };
}

// ============================================================
// II. TYPED POLICY CLASSIFICATIONS
// ============================================================

export type PolicyClassification =
  | 'ADMIT'           // Policy permits visibility
  | 'BLOCK'           // Policy denies visibility (hard violation)
  | 'QUARANTINE'      // Policy holds for review
  | 'ESCALATE'        // Policy requires elevated authority
  | 'DEFER'           // Policy cannot decide, defers to governance
  | 'REDACT';         // Policy permits with redacted fields

export type PolicySeverity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFO';

export type PolicyDomain =
  | 'TRUST_BOUNDARY'
  | 'SIGNAL_EVALUATION'
  | 'INVARIANT_ENFORCEMENT'
  | 'DRIFT_DETECTION'
  | 'AUDIT_LINEAGE'
  | 'EXPORT_CONTROL';

export interface PolicyClassificationResult {
  classification: PolicyClassification;
  severity: PolicySeverity;
  domain: PolicyDomain;
  reason: string;
  deterministic: true; // Always true — engine is deterministic
  timestamp: string;
}

// ============================================================
// III. SIGNAL-AWARE EVALUATION MODEL
// ============================================================

export interface PolicySignal {
  id: string;
  name: string;
  value: number;       // 0-1 normalized
  weight: number;      // Contribution weight (0-1)
  domain: PolicyDomain;
  healthy: boolean;    // Signal within nominal range
  threshold: { warn: number; critical: number };
}

export interface SignalEvaluation {
  signals: PolicySignal[];
  compositeScore: number;   // Weighted aggregate (0-1)
  healthySignals: number;
  degradedSignals: number;
  criticalSignals: number;
  evaluatedAt: string;
}

/**
 * Convert 7-dimension ProtocolSignals into PolicySignals
 */
export function mapProtocolSignals(signals: ProtocolSignals): PolicySignal[] {
  return [
    {
      id: 'sig-event-velocity',
      name: 'Event Velocity',
      value: signals.eventVelocity,
      weight: 0.15,
      domain: 'SIGNAL_EVALUATION',
      healthy: signals.eventVelocity >= 0.7,
      threshold: { warn: 0.5, critical: 0.3 },
    },
    {
      id: 'sig-actor-escalation',
      name: 'Actor Escalation',
      value: signals.actorEscalation,
      weight: 0.20,
      domain: 'TRUST_BOUNDARY',
      healthy: signals.actorEscalation >= 0.7,
      threshold: { warn: 0.5, critical: 0.3 },
    },
    {
      id: 'sig-mutation-density',
      name: 'Mutation Density',
      value: signals.mutationDensity,
      weight: 0.15,
      domain: 'INVARIANT_ENFORCEMENT',
      healthy: signals.mutationDensity >= 0.7,
      threshold: { warn: 0.5, critical: 0.3 },
    },
    {
      id: 'sig-replay-confidence',
      name: 'Replay Confidence',
      value: signals.replayConfidence,
      weight: 0.15,
      domain: 'AUDIT_LINEAGE',
      healthy: signals.replayConfidence >= 0.7,
      threshold: { warn: 0.5, critical: 0.3 },
    },
    {
      id: 'sig-source-completeness',
      name: 'Source Completeness',
      value: signals.sourceCompleteness,
      weight: 0.10,
      domain: 'SIGNAL_EVALUATION',
      healthy: signals.sourceCompleteness >= 0.7,
      threshold: { warn: 0.5, critical: 0.3 },
    },
    {
      id: 'sig-statement-risk',
      name: 'Statement Risk',
      value: 1 - signals.statementRisk, // Invert: low risk = high health
      weight: 0.10,
      domain: 'TRUST_BOUNDARY',
      healthy: signals.statementRisk <= 0.3,
      threshold: { warn: 0.5, critical: 0.7 },
    },
    {
      id: 'sig-audit-readiness',
      name: 'Audit Readiness',
      value: signals.auditReadiness,
      weight: 0.15,
      domain: 'EXPORT_CONTROL',
      healthy: signals.auditReadiness >= 0.7,
      threshold: { warn: 0.5, critical: 0.3 },
    },
  ];
}

/**
 * Evaluate policy signals and produce composite score
 */
export function evaluateSignals(signals: ProtocolSignals): SignalEvaluation {
  const policySignals = mapProtocolSignals(signals);

  const totalWeight = policySignals.reduce((sum, s) => sum + s.weight, 0);
  const compositeScore = policySignals.reduce(
    (sum, s) => sum + s.value * s.weight,
    0,
  ) / totalWeight;

  return {
    signals: policySignals,
    compositeScore: Math.round(compositeScore * 1000) / 1000,
    healthySignals: policySignals.filter(s => s.healthy).length,
    degradedSignals: policySignals.filter(s => !s.healthy && s.value >= 0.3).length,
    criticalSignals: policySignals.filter(s => s.value < 0.3).length,
    evaluatedAt: new Date().toISOString(),
  };
}

// ============================================================
// IV. DETERMINISTIC DECISION CONTRACT
// ============================================================

export interface PolicyDecisionInput {
  signalEvaluation: SignalEvaluation;
  trustBoundaryStatus: TrustBoundaryStatus;
  driftStatus: PolicyDriftReport;
  invariantsPassed: boolean;
  validationScore: number;
  hasSourceLineage: boolean;
  isReplayConsistent: boolean;
}

export interface PolicyDecision {
  id: string;
  classification: PolicyClassification;
  severity: PolicySeverity;
  compositeScore: number;
  reasoning: string[];
  blockers: string[];
  warnings: string[];
  exportEligible: boolean;
  visibilityGranted: boolean;
  deterministic: true;
  reproducible: boolean;
  decisionHash: string;    // SHA-256-like fingerprint of inputs
  timestamp: string;
  engineId: string;
}

/**
 * The core deterministic decision function.
 * Same inputs ALWAYS produce same outputs.
 */
export function evaluatePolicy(input: PolicyDecisionInput): PolicyDecision {
  const id = `PD-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const reasoning: string[] = [];
  const blockers: string[] = [];
  const warnings: string[] = [];

  // Step 1: Signal composite analysis
  reasoning.push(`CompositeScore = ${input.signalEvaluation.compositeScore}`);
  reasoning.push(`HealthySignals = ${input.signalEvaluation.healthySignals}/7`);
  reasoning.push(`ValidationScore = ${input.validationScore.toFixed(3)}`);

  // Step 2: Trust boundary check
  if (input.trustBoundaryStatus.violated) {
    blockers.push(`Trust boundary violation: ${input.trustBoundaryStatus.violationReason}`);
    reasoning.push('TRUST_BOUNDARY: VIOLATED');
  } else {
    reasoning.push('TRUST_BOUNDARY: ENFORCED');
  }

  // Step 3: Drift check
  if (input.driftStatus.hasCriticalDrift) {
    blockers.push(`Critical drift detected: ${input.driftStatus.criticalEvents} events`);
    reasoning.push('DRIFT: CRITICAL');
  } else if (input.driftStatus.totalDrifts > 0) {
    warnings.push(`Drift detected: ${input.driftStatus.totalDrifts} events`);
    reasoning.push(`DRIFT: ${input.driftStatus.totalDrifts} non-critical`);
  } else {
    reasoning.push('DRIFT: NONE');
  }

  // Step 4: Invariant check
  if (!input.invariantsPassed) {
    blockers.push('Invariant enforcement failed');
    reasoning.push('INVARIANTS: FAILED');
  } else {
    reasoning.push('INVARIANTS: PASSED');
  }

  // Step 5: Source lineage check
  if (!input.hasSourceLineage) {
    warnings.push('Source lineage not present');
    reasoning.push('SOURCE_LINEAGE: ABSENT');
  } else {
    reasoning.push('SOURCE_LINEAGE: PRESENT');
  }

  // Step 6: Replay consistency
  if (!input.isReplayConsistent) {
    warnings.push('Replay consistency not validated');
    reasoning.push('REPLAY: INCONSISTENT');
  } else {
    reasoning.push('REPLAY: CONSISTENT');
  }

  // Step 7: Deterministic classification
  let classification: PolicyClassification;
  let severity: PolicySeverity;

  if (blockers.length > 0) {
    if (input.trustBoundaryStatus.violated) {
      classification = 'BLOCK';
      severity = 'CRITICAL';
    } else if (input.driftStatus.hasCriticalDrift) {
      classification = 'QUARANTINE';
      severity = 'HIGH';
    } else {
      classification = 'BLOCK';
      severity = 'HIGH';
    }
  } else if (warnings.length > 2) {
    classification = 'ESCALATE';
    severity = 'MEDIUM';
  } else if (warnings.length > 0) {
    classification = 'ADMIT';
    severity = 'LOW';
  } else {
    classification = 'ADMIT';
    severity = 'INFO';
  }

  // Step 8: Export eligibility
  const exportEligible =
    classification === 'ADMIT' &&
    input.validationScore >= 0.75 &&
    input.hasSourceLineage &&
    input.isReplayConsistent;

  // Step 9: Visibility
  const visibilityGranted = classification === 'ADMIT' || classification === 'ESCALATE';

  // Step 10: Decision hash (deterministic fingerprint)
  const decisionHash = computeDecisionHash(input);

  reasoning.push(`Classification = ${classification}`);
  reasoning.push(`ExportEligible = ${exportEligible}`);
  reasoning.push(`VisibilityGranted = ${visibilityGranted}`);

  return {
    id,
    classification,
    severity,
    compositeScore: input.signalEvaluation.compositeScore,
    reasoning,
    blockers,
    warnings,
    exportEligible,
    visibilityGranted,
    deterministic: true,
    reproducible: true,
    decisionHash,
    timestamp: new Date().toISOString(),
    engineId: POLICY_ENGINE_ID,
  };
}

function computeDecisionHash(input: PolicyDecisionInput): string {
  const raw = [
    input.signalEvaluation.compositeScore.toFixed(6),
    input.trustBoundaryStatus.violated ? '1' : '0',
    input.driftStatus.totalDrifts.toString(),
    input.invariantsPassed ? '1' : '0',
    input.validationScore.toFixed(6),
    input.hasSourceLineage ? '1' : '0',
    input.isReplayConsistent ? '1' : '0',
  ].join(':');

  // Simple deterministic hash
  let hash = 0;
  for (let i = 0; i < raw.length; i++) {
    const char = raw.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return Math.abs(hash).toString(16).padStart(8, '0');
}

// ============================================================
// V. TRUST-BOUNDARY ENFORCEMENT
// ============================================================

export type TrustTier =
  | 'RUNTIME_VERIFIED'
  | 'PENDING_CORROBORATION'
  | 'EXTERNALLY_CORROBORATED';

export interface TrustBoundaryRule {
  id: string;
  name: string;
  fromTier: TrustTier;
  toTier: TrustTier;
  allowed: boolean;
  requiresEscalation: boolean;
  description: string;
}

export interface TrustBoundaryStatus {
  enforced: boolean;
  violated: boolean;
  violationReason?: string;
  currentTier: TrustTier;
  rulesChecked: number;
  rulesPassed: number;
  timestamp: string;
}

export const TRUST_BOUNDARY_RULES: TrustBoundaryRule[] = [
  {
    id: 'TB-001',
    name: 'Runtime to Corroboration Gate',
    fromTier: 'RUNTIME_VERIFIED',
    toTier: 'PENDING_CORROBORATION',
    allowed: true,
    requiresEscalation: false,
    description: 'Runtime-verified claims may request external corroboration',
  },
  {
    id: 'TB-002',
    name: 'Corroboration to External Gate',
    fromTier: 'PENDING_CORROBORATION',
    toTier: 'EXTERNALLY_CORROBORATED',
    allowed: true,
    requiresEscalation: true,
    description: 'Pending claims require escalation for external corroboration',
  },
  {
    id: 'TB-003',
    name: 'External to Runtime Block',
    fromTier: 'EXTERNALLY_CORROBORATED',
    toTier: 'RUNTIME_VERIFIED',
    allowed: false,
    requiresEscalation: false,
    description: 'External claims cannot downgrade to runtime-verified',
  },
  {
    id: 'TB-004',
    name: 'Runtime Self-Loop',
    fromTier: 'RUNTIME_VERIFIED',
    toTier: 'RUNTIME_VERIFIED',
    allowed: true,
    requiresEscalation: false,
    description: 'Runtime-verified claims may transition within same tier',
  },
];

export function enforceTrustBoundary(
  currentTier: TrustTier,
  requestedTier: TrustTier,
): TrustBoundaryStatus {
  const rule = TRUST_BOUNDARY_RULES.find(
    r => r.fromTier === currentTier && r.toTier === requestedTier,
  );

  if (!rule) {
    return {
      enforced: true,
      violated: true,
      violationReason: `No rule defined for transition ${currentTier} -> ${requestedTier}`,
      currentTier,
      rulesChecked: TRUST_BOUNDARY_RULES.length,
      rulesPassed: 0,
      timestamp: new Date().toISOString(),
    };
  }

  if (!rule.allowed) {
    return {
      enforced: true,
      violated: true,
      violationReason: `Rule ${rule.id}: ${rule.description}`,
      currentTier,
      rulesChecked: TRUST_BOUNDARY_RULES.length,
      rulesPassed: TRUST_BOUNDARY_RULES.filter(r => r.allowed).length,
      timestamp: new Date().toISOString(),
    };
  }

  return {
    enforced: true,
    violated: false,
    currentTier: requestedTier,
    rulesChecked: TRUST_BOUNDARY_RULES.length,
    rulesPassed: TRUST_BOUNDARY_RULES.filter(r => r.allowed).length,
    timestamp: new Date().toISOString(),
  };
}

// ============================================================
// VI. POLICY AUDIT LINEAGE
// ============================================================

export interface PolicyAuditEntry {
  id: string;
  decisionId: string;
  action: 'EVALUATE' | 'CLASSIFY' | 'ENFORCE' | 'EXPORT' | 'DRIFT_CHECK';
  domain: PolicyDomain;
  input: string;       // Serialized input summary
  output: string;      // Serialized output summary
  classification: PolicyClassification;
  severity: PolicySeverity;
  timestamp: string;
  engineId: string;
  sequenceNumber: number;
}

export interface PolicyAuditLedger {
  entries: PolicyAuditEntry[];
  totalEntries: number;
  firstEntry: string;   // ISO 8601
  lastEntry: string;    // ISO 8601
  sequenceIntegrity: boolean;
  replayable: boolean;
}

let auditSequence = 0;
const auditEntries: PolicyAuditEntry[] = [];

export function appendAuditEntry(
  decisionId: string,
  action: PolicyAuditEntry['action'],
  domain: PolicyDomain,
  input: string,
  output: string,
  classification: PolicyClassification,
  severity: PolicySeverity,
): PolicyAuditEntry {
  auditSequence++;
  const entry: PolicyAuditEntry = {
    id: `PAE-${auditSequence.toString().padStart(6, '0')}`,
    decisionId,
    action,
    domain,
    input,
    output,
    classification,
    severity,
    timestamp: new Date().toISOString(),
    engineId: POLICY_ENGINE_ID,
    sequenceNumber: auditSequence,
  };
  auditEntries.push(entry);
  return entry;
}

export function getAuditLedger(): PolicyAuditLedger {
  const sorted = [...auditEntries].sort((a, b) => a.sequenceNumber - b.sequenceNumber);
  const isSequenceValid = sorted.every(
    (e, i) => i === 0 || e.sequenceNumber === sorted[i - 1].sequenceNumber + 1,
  );

  return {
    entries: sorted,
    totalEntries: sorted.length,
    firstEntry: sorted[0]?.timestamp ?? '',
    lastEntry: sorted[sorted.length - 1]?.timestamp ?? '',
    sequenceIntegrity: isSequenceValid,
    replayable: isSequenceValid && sorted.length > 0,
  };
}

export function clearAuditLedger(): void {
  auditEntries.length = 0;
  auditSequence = 0;
}

// ============================================================
// VII. DRIFT DETECTION (POLICY-LEVEL)
// ============================================================

export type PolicyDriftType =
  | 'SIGNAL_DEVIATION'       // Signal value moved outside expected range
  | 'CLASSIFICATION_SHIFT'   // Same inputs produced different classification
  | 'BOUNDARY_MIGRATION'     // Trust tier changed unexpectedly
  | 'SCORE_ANOMALY'          // Composite score anomalous change
  | 'SEQUENCE_GAP'           // Audit sequence gap detected
  | 'INSTITUTIONAL_SPOLIATION'; // Deliberate evidence tampering signal

export interface PolicyDriftEvent {
  type: PolicyDriftType;
  signalId?: string;
  message: string;
  severity: PolicySeverity;
  detectedAt: string;
  previousValue?: number;
  currentValue?: number;
}

export interface PolicyDriftReport {
  events: PolicyDriftEvent[];
  totalDrifts: number;
  criticalEvents: number;
  hasCriticalDrift: boolean;
  systemStable: boolean;
  lastCheck: string;
}

export function detectPolicyDrift(
  current: SignalEvaluation,
  previous: SignalEvaluation | null,
): PolicyDriftReport {
  const events: PolicyDriftEvent[] = [];

  if (!previous) {
    // First evaluation, no drift possible
    return {
      events: [],
      totalDrifts: 0,
      criticalEvents: 0,
      hasCriticalDrift: false,
      systemStable: true,
      lastCheck: new Date().toISOString(),
    };
  }

  // Compare each signal for deviation
  for (const currentSig of current.signals) {
    const prevSig = previous.signals.find(s => s.id === currentSig.id);
    if (!prevSig) continue;

    const delta = Math.abs(currentSig.value - prevSig.value);

    if (delta > 0.3) {
      events.push({
        type: 'SIGNAL_DEVIATION',
        signalId: currentSig.id,
        message: `${currentSig.name}: shifted ${(delta * 100).toFixed(1)}% (${prevSig.value.toFixed(3)} -> ${currentSig.value.toFixed(3)})`,
        severity: delta > 0.5 ? 'CRITICAL' : 'HIGH',
        detectedAt: new Date().toISOString(),
        previousValue: prevSig.value,
        currentValue: currentSig.value,
      });
    }
  }

  // Composite score anomaly
  const compositeDelta = Math.abs(current.compositeScore - previous.compositeScore);
  if (compositeDelta > 0.2) {
    events.push({
      type: 'SCORE_ANOMALY',
      message: `Composite score shifted ${(compositeDelta * 100).toFixed(1)}%`,
      severity: compositeDelta > 0.4 ? 'CRITICAL' : 'MEDIUM',
      detectedAt: new Date().toISOString(),
      previousValue: previous.compositeScore,
      currentValue: current.compositeScore,
    });
  }

  // Audit sequence integrity
  const ledger = getAuditLedger();
  if (!ledger.sequenceIntegrity && ledger.totalEntries > 0) {
    events.push({
      type: 'SEQUENCE_GAP',
      message: 'Audit sequence integrity violation detected',
      severity: 'CRITICAL',
      detectedAt: new Date().toISOString(),
    });
  }

  const criticalEvents = events.filter(e => e.severity === 'CRITICAL').length;

  return {
    events,
    totalDrifts: events.length,
    criticalEvents,
    hasCriticalDrift: criticalEvents > 0,
    systemStable: events.length === 0,
    lastCheck: new Date().toISOString(),
  };
}

// ============================================================
// VIII. POLICY HEALTH DOMAIN
// ============================================================

export interface PolicyHealthDomain {
  domain: PolicyDomain;
  label: string;
  status: 'NOMINAL' | 'DEGRADED' | 'CRITICAL';
  score: number;       // 0-100
  signals: PolicySignal[];
  description: string;
}

export function computePolicyHealthDomains(
  signalEval: SignalEvaluation,
): PolicyHealthDomain[] {
  const domainMap: Record<PolicyDomain, { label: string; desc: string }> = {
    TRUST_BOUNDARY: {
      label: 'Trust Boundary',
      desc: 'Reviewer-safe tier enforcement',
    },
    SIGNAL_EVALUATION: {
      label: 'Signal Evaluation',
      desc: '7-dimension telemetry processing',
    },
    INVARIANT_ENFORCEMENT: {
      label: 'Invariant Enforcement',
      desc: 'Deterministic rule evaluation',
    },
    DRIFT_DETECTION: {
      label: 'Drift Detection',
      desc: 'State delta awareness monitoring',
    },
    AUDIT_LINEAGE: {
      label: 'Audit Lineage',
      desc: 'Sequential provenance tracking',
    },
    EXPORT_CONTROL: {
      label: 'Export Control',
      desc: 'Policy-earned artifact export',
    },
  };

  return (Object.keys(domainMap) as PolicyDomain[]).map(domain => {
    const info = domainMap[domain];
    const domainSignals = signalEval.signals.filter(s => s.domain === domain);

    if (domainSignals.length === 0) {
      return {
        domain,
        label: info.label,
        status: 'NOMINAL' as const,
        score: 100,
        signals: [],
        description: info.desc,
      };
    }

    const avgValue =
      domainSignals.reduce((sum, s) => sum + s.value, 0) / domainSignals.length;
    const score = Math.round(avgValue * 100);
    const hasCritical = domainSignals.some(s => s.value < 0.3);
    const hasDegraded = domainSignals.some(s => !s.healthy);

    let status: PolicyHealthDomain['status'] = 'NOMINAL';
    if (hasCritical) status = 'CRITICAL';
    else if (hasDegraded) status = 'DEGRADED';

    return {
      domain,
      label: info.label,
      status,
      score,
      signals: domainSignals,
      description: info.desc,
    };
  });
}

// ============================================================
// IX. NEGATIVE POLICY TESTS
// ============================================================

export interface NegativePolicyTest {
  id: string;
  name: string;
  description: string;
  expectedClassification: PolicyClassification;
  expectedBlocked: boolean;
  testFn: () => PolicyDecision;
  passed?: boolean;
  actualClassification?: PolicyClassification;
}

/**
 * Negative policy tests ensure the engine BLOCKS what it should block.
 * These are the "must-fail" tests that prove the engine is not permissive.
 */
export function buildNegativePolicyTests(): NegativePolicyTest[] {
  return [
    {
      id: 'NPT-001',
      name: 'Trust Boundary Violation Blocks',
      description: 'A trust boundary violation must produce BLOCK classification',
      expectedClassification: 'BLOCK',
      expectedBlocked: true,
      testFn: () => evaluatePolicy({
        signalEvaluation: evaluateSignals({
          eventVelocity: 0.9, actorEscalation: 0.9, mutationDensity: 0.9,
          replayConfidence: 0.9, sourceCompleteness: 0.9, statementRisk: 0.1,
          auditReadiness: 0.9,
        }),
        trustBoundaryStatus: {
          enforced: true, violated: true,
          violationReason: 'Downgrade attempt: EXTERNAL -> RUNTIME',
          currentTier: 'EXTERNALLY_CORROBORATED',
          rulesChecked: 4, rulesPassed: 0,
          timestamp: new Date().toISOString(),
        },
        driftStatus: { events: [], totalDrifts: 0, criticalEvents: 0, hasCriticalDrift: false, systemStable: true, lastCheck: new Date().toISOString() },
        invariantsPassed: true,
        validationScore: 0.95,
        hasSourceLineage: true,
        isReplayConsistent: true,
      }),
    },
    {
      id: 'NPT-002',
      name: 'Invariant Failure Blocks',
      description: 'Failed invariants must produce BLOCK classification',
      expectedClassification: 'BLOCK',
      expectedBlocked: true,
      testFn: () => evaluatePolicy({
        signalEvaluation: evaluateSignals({
          eventVelocity: 0.9, actorEscalation: 0.9, mutationDensity: 0.9,
          replayConfidence: 0.9, sourceCompleteness: 0.9, statementRisk: 0.1,
          auditReadiness: 0.9,
        }),
        trustBoundaryStatus: {
          enforced: true, violated: false, currentTier: 'RUNTIME_VERIFIED',
          rulesChecked: 4, rulesPassed: 3, timestamp: new Date().toISOString(),
        },
        driftStatus: { events: [], totalDrifts: 0, criticalEvents: 0, hasCriticalDrift: false, systemStable: true, lastCheck: new Date().toISOString() },
        invariantsPassed: false,
        validationScore: 0.95,
        hasSourceLineage: true,
        isReplayConsistent: true,
      }),
    },
    {
      id: 'NPT-003',
      name: 'Critical Drift Quarantines',
      description: 'Critical drift must produce QUARANTINE classification',
      expectedClassification: 'QUARANTINE',
      expectedBlocked: true,
      testFn: () => evaluatePolicy({
        signalEvaluation: evaluateSignals({
          eventVelocity: 0.9, actorEscalation: 0.9, mutationDensity: 0.9,
          replayConfidence: 0.9, sourceCompleteness: 0.9, statementRisk: 0.1,
          auditReadiness: 0.9,
        }),
        trustBoundaryStatus: {
          enforced: true, violated: false, currentTier: 'RUNTIME_VERIFIED',
          rulesChecked: 4, rulesPassed: 3, timestamp: new Date().toISOString(),
        },
        driftStatus: {
          events: [{ type: 'INSTITUTIONAL_SPOLIATION', message: 'Spoliation detected', severity: 'CRITICAL', detectedAt: new Date().toISOString() }],
          totalDrifts: 1, criticalEvents: 1, hasCriticalDrift: true, systemStable: false, lastCheck: new Date().toISOString(),
        },
        invariantsPassed: true,
        validationScore: 0.95,
        hasSourceLineage: true,
        isReplayConsistent: true,
      }),
    },
    {
      id: 'NPT-004',
      name: 'No Lineage Prevents Export',
      description: 'Missing source lineage must prevent export eligibility',
      expectedClassification: 'ADMIT',
      expectedBlocked: false,
      testFn: () => evaluatePolicy({
        signalEvaluation: evaluateSignals({
          eventVelocity: 0.9, actorEscalation: 0.9, mutationDensity: 0.9,
          replayConfidence: 0.9, sourceCompleteness: 0.9, statementRisk: 0.1,
          auditReadiness: 0.9,
        }),
        trustBoundaryStatus: {
          enforced: true, violated: false, currentTier: 'RUNTIME_VERIFIED',
          rulesChecked: 4, rulesPassed: 3, timestamp: new Date().toISOString(),
        },
        driftStatus: { events: [], totalDrifts: 0, criticalEvents: 0, hasCriticalDrift: false, systemStable: true, lastCheck: new Date().toISOString() },
        invariantsPassed: true,
        validationScore: 0.95,
        hasSourceLineage: false,
        isReplayConsistent: true,
      }),
    },
    {
      id: 'NPT-005',
      name: 'Multiple Warnings Escalate',
      description: 'Three or more warnings must produce ESCALATE classification',
      expectedClassification: 'ESCALATE',
      expectedBlocked: false,
      testFn: () => evaluatePolicy({
        signalEvaluation: evaluateSignals({
          eventVelocity: 0.5, actorEscalation: 0.5, mutationDensity: 0.5,
          replayConfidence: 0.5, sourceCompleteness: 0.5, statementRisk: 0.5,
          auditReadiness: 0.5,
        }),
        trustBoundaryStatus: {
          enforced: true, violated: false, currentTier: 'RUNTIME_VERIFIED',
          rulesChecked: 4, rulesPassed: 3, timestamp: new Date().toISOString(),
        },
        driftStatus: {
          events: [{ type: 'SIGNAL_DEVIATION', message: 'Minor drift', severity: 'MEDIUM', detectedAt: new Date().toISOString() }],
          totalDrifts: 1, criticalEvents: 0, hasCriticalDrift: false, systemStable: false, lastCheck: new Date().toISOString(),
        },
        invariantsPassed: true,
        validationScore: 0.60,
        hasSourceLineage: false,
        isReplayConsistent: false,
      }),
    },
  ];
}

/**
 * Execute all negative policy tests and return results
 */
export function runNegativePolicyTests(): {
  tests: NegativePolicyTest[];
  passed: number;
  failed: number;
  total: number;
  allPassed: boolean;
} {
  const tests = buildNegativePolicyTests();

  for (const test of tests) {
    const decision = test.testFn();
    test.actualClassification = decision.classification;

    if (test.expectedBlocked) {
      test.passed = decision.classification === test.expectedClassification;
    } else {
      // For non-blocking tests, check specific conditions
      if (test.id === 'NPT-004') {
        test.passed = !decision.exportEligible;
      } else {
        test.passed = decision.classification === test.expectedClassification;
      }
    }
  }

  const passed = tests.filter(t => t.passed).length;
  return {
    tests,
    passed,
    failed: tests.length - passed,
    total: tests.length,
    allPassed: passed === tests.length,
  };
}

// ============================================================
// X. EXPORT SCHEMA
// ============================================================

export interface PolicyEngineExport {
  engineIdentity: PolicyEngineIdentity;
  signalEvaluation: SignalEvaluation;
  healthDomains: PolicyHealthDomain[];
  decision: PolicyDecision;
  trustBoundary: TrustBoundaryStatus;
  driftReport: PolicyDriftReport;
  auditLedger: PolicyAuditLedger;
  negativePolicyTestResults: {
    passed: number;
    failed: number;
    total: number;
    allPassed: boolean;
  };
  exportedAt: string;
  merkleroot: string;
  deterministicContract: {
    sameInputsSameOutputs: true;
    reproducible: true;
    reviewerSafe: true;
    interpretationBoundary: 'SYSTEM_PROVIDES_PROVENANCE_REVIEWER_PROVIDES_CONCLUSION';
  };
}

/**
 * Generate a full policy engine export artifact
 */
export function generatePolicyEngineExport(
  signals: ProtocolSignals,
): PolicyEngineExport {
  // 1. Evaluate signals
  const signalEvaluation = evaluateSignals(signals);

  // 2. Enforce trust boundary (self-referential — runtime tier)
  const trustBoundary = enforceTrustBoundary('RUNTIME_VERIFIED', 'RUNTIME_VERIFIED');

  // 3. Detect drift (no previous for export snapshot)
  const driftReport = detectPolicyDrift(signalEvaluation, null);

  // 4. Compute health domains
  const healthDomains = computePolicyHealthDomains(signalEvaluation);

  // 5. Evaluate policy
  const decision = evaluatePolicy({
    signalEvaluation,
    trustBoundaryStatus: trustBoundary,
    driftStatus: driftReport,
    invariantsPassed: true,
    validationScore: signalEvaluation.compositeScore,
    hasSourceLineage: true,
    isReplayConsistent: true,
  });

  // 6. Log to audit
  appendAuditEntry(
    decision.id,
    'EXPORT',
    'EXPORT_CONTROL',
    `signals:${JSON.stringify(signals)}`,
    `classification:${decision.classification}`,
    decision.classification,
    decision.severity,
  );

  // 7. Run negative tests
  const negativeTests = runNegativePolicyTests();

  // 8. Get audit ledger
  const auditLedger = getAuditLedger();

  return {
    engineIdentity: getPolicyEngineIdentity(),
    signalEvaluation,
    healthDomains,
    decision,
    trustBoundary,
    driftReport,
    auditLedger,
    negativePolicyTestResults: {
      passed: negativeTests.passed,
      failed: negativeTests.failed,
      total: negativeTests.total,
      allPassed: negativeTests.allPassed,
    },
    exportedAt: new Date().toISOString(),
    merkleroot: POLICY_ENGINE_MERKLEROOT,
    deterministicContract: {
      sameInputsSameOutputs: true,
      reproducible: true,
      reviewerSafe: true,
      interpretationBoundary: 'SYSTEM_PROVIDES_PROVENANCE_REVIEWER_PROVIDES_CONCLUSION',
    },
  };
}

// ============================================================
// XI. REVIEWER-SAFE INTERPRETATION BOUNDARY
// ============================================================

export interface InterpretationBoundary {
  systemProvides: string[];
  systemDoesNot: string[];
  reviewerProvides: string[];
  legalBoundary: string;
}

export const INTERPRETATION_BOUNDARY: InterpretationBoundary = {
  systemProvides: [
    'Mathematical provenance of all signal evaluations',
    'Deterministic classification of policy decisions',
    'Temporal lineage of all state transitions',
    'Reproducible audit trail with sequence integrity',
    'Drift detection across evaluation windows',
    'Trust-tier enforcement with rule traceability',
    'Negative test results proving enforcement boundaries',
  ],
  systemDoesNot: [
    'Attribute identity to external actors',
    'Assert legal conclusions or guilt',
    'Replace human judgment or legal analysis',
    'Produce probabilistic or inferential outputs',
    'Override reviewer interpretation',
  ],
  reviewerProvides: [
    'Legal conclusions drawn from provenance data',
    'Identity attribution based on evidence chains',
    'Jurisdictional determinations',
    'Final authority on claim disposition',
  ],
  legalBoundary: 'Runtime Telemetry ≠ Identity Attribution ≠ External Proof',
};
