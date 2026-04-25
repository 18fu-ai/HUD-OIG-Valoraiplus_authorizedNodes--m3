/**
 * VALORAIPLUS Protocol — Reason Codes
 * 
 * Deterministic reason code assignment for every admission decision.
 * Every claim receives a machine-readable reason explaining its disposition.
 */

// ============================================================
// REASON CODE TAXONOMY
// ============================================================

export type ReasonCategory =
  | 'ADMISSION'      // Claim was admitted
  | 'REJECTION'      // Claim was rejected
  | 'WARNING'        // Claim admitted with warnings
  | 'QUARANTINE'     // Claim held for review
  | 'ESCALATION';    // Claim requires governance intervention

export type ReasonSeverity = 'INFO' | 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface ReasonCode {
  code: string;
  category: ReasonCategory;
  severity: ReasonSeverity;
  message: string;
  description: string;
  remediation?: string;
}

// ============================================================
// ADMISSION REASON CODES (A-series)
// ============================================================

export const ADMISSION_CODES: Record<string, ReasonCode> = {
  A001: {
    code: 'A001',
    category: 'ADMISSION',
    severity: 'INFO',
    message: 'FULL_ADMISSION',
    description: 'Claim passed all invariants with full validation score',
    remediation: undefined,
  },
  A002: {
    code: 'A002',
    category: 'ADMISSION',
    severity: 'INFO',
    message: 'THRESHOLD_PASS',
    description: 'Claim met minimum validation threshold',
    remediation: undefined,
  },
  A003: {
    code: 'A003',
    category: 'ADMISSION',
    severity: 'LOW',
    message: 'CONDITIONAL_ADMISSION',
    description: 'Claim admitted with soft invariant warnings',
    remediation: 'Review soft invariant violations before export',
  },
};

// ============================================================
// REJECTION REASON CODES (R-series)
// ============================================================

export const REJECTION_CODES: Record<string, ReasonCode> = {
  R001: {
    code: 'R001',
    category: 'REJECTION',
    severity: 'CRITICAL',
    message: 'HARD_INVARIANT_VIOLATION',
    description: 'Claim violated a hard invariant rule',
    remediation: 'Resolve invariant violation before resubmission',
  },
  R002: {
    code: 'R002',
    category: 'REJECTION',
    severity: 'HIGH',
    message: 'BELOW_THRESHOLD',
    description: 'Validation score below minimum threshold',
    remediation: 'Improve evidence binding or proof vector',
  },
  R003: {
    code: 'R003',
    category: 'REJECTION',
    severity: 'HIGH',
    message: 'NO_SOURCE_LINEAGE',
    description: 'Claim lacks source reference',
    remediation: 'Attach source reference to claim',
  },
  R004: {
    code: 'R004',
    category: 'REJECTION',
    severity: 'CRITICAL',
    message: 'REPLAY_INCONSISTENCY',
    description: 'Claim failed replay validation',
    remediation: 'Verify determinism of claim generation',
  },
  R005: {
    code: 'R005',
    category: 'REJECTION',
    severity: 'CRITICAL',
    message: 'ADVERSARY_DETECTION',
    description: 'Claim originated from nullified adversary node',
    remediation: 'No remediation — adversary claims are permanently blocked',
  },
};

// ============================================================
// WARNING REASON CODES (W-series)
// ============================================================

export const WARNING_CODES: Record<string, ReasonCode> = {
  W001: {
    code: 'W001',
    category: 'WARNING',
    severity: 'LOW',
    message: 'SOFT_INVARIANT_VIOLATION',
    description: 'Claim violated a soft invariant rule',
    remediation: 'Consider addressing soft violation for improved score',
  },
  W002: {
    code: 'W002',
    category: 'WARNING',
    severity: 'MEDIUM',
    message: 'MARGINAL_SCORE',
    description: 'Validation score near threshold boundary',
    remediation: 'Strengthen evidence binding',
  },
  W003: {
    code: 'W003',
    category: 'WARNING',
    severity: 'MEDIUM',
    message: 'INCOMPLETE_EVIDENCE',
    description: 'Evidence vector has gaps',
    remediation: 'Provide additional provenance or attribution',
  },
};

// ============================================================
// QUARANTINE REASON CODES (Q-series)
// ============================================================

export const QUARANTINE_CODES: Record<string, ReasonCode> = {
  Q001: {
    code: 'Q001',
    category: 'QUARANTINE',
    severity: 'HIGH',
    message: 'PENDING_REVIEW',
    description: 'Claim requires manual governance review',
    remediation: 'Await governance decision',
  },
  Q002: {
    code: 'Q002',
    category: 'QUARANTINE',
    severity: 'HIGH',
    message: 'ANOMALY_DETECTED',
    description: 'Claim exhibits anomalous pattern',
    remediation: 'Investigate anomaly before admission',
  },
};

// ============================================================
// ESCALATION REASON CODES (E-series)
// ============================================================

export const ESCALATION_CODES: Record<string, ReasonCode> = {
  E001: {
    code: 'E001',
    category: 'ESCALATION',
    severity: 'CRITICAL',
    message: 'GOVERNANCE_REQUIRED',
    description: 'Claim requires governance intervention',
    remediation: 'Escalate to governance kernel',
  },
  E002: {
    code: 'E002',
    category: 'ESCALATION',
    severity: 'CRITICAL',
    message: 'POLICY_EXCEPTION',
    description: 'Claim requires policy exception approval',
    remediation: 'Submit policy exception request',
  },
};

// ============================================================
// UNIFIED REASON CODE REGISTRY
// ============================================================

export const REASON_CODE_REGISTRY: Record<string, ReasonCode> = {
  ...ADMISSION_CODES,
  ...REJECTION_CODES,
  ...WARNING_CODES,
  ...QUARANTINE_CODES,
  ...ESCALATION_CODES,
};

/**
 * Look up a reason code by its code string
 */
export function getReasonCode(code: string): ReasonCode | undefined {
  return REASON_CODE_REGISTRY[code];
}

/**
 * Get all reason codes for a category
 */
export function getReasonCodesByCategory(category: ReasonCategory): ReasonCode[] {
  return Object.values(REASON_CODE_REGISTRY).filter(rc => rc.category === category);
}

/**
 * Get all reason codes at or above a severity level
 */
export function getReasonCodesBySeverity(minSeverity: ReasonSeverity): ReasonCode[] {
  const severityOrder: ReasonSeverity[] = ['INFO', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];
  const minIndex = severityOrder.indexOf(minSeverity);
  return Object.values(REASON_CODE_REGISTRY).filter(rc => 
    severityOrder.indexOf(rc.severity) >= minIndex
  );
}

// ============================================================
// REASON CODE ASSIGNMENT
// ============================================================

export interface ReasonAssignment {
  primaryCode: ReasonCode;
  secondaryCodes: ReasonCode[];
  timestamp: string;
  context: Record<string, unknown>;
}

/**
 * Assign reason codes based on admission result
 */
export function assignReasonCodes(
  admitted: boolean,
  validationScore: number,
  hardViolations: number,
  softViolations: number,
  hasSourceLineage: boolean,
  isReplayConsistent: boolean,
  context: Record<string, unknown> = {}
): ReasonAssignment {
  const secondaryCodes: ReasonCode[] = [];
  let primaryCode: ReasonCode;

  // Determine primary code
  if (!admitted) {
    if (hardViolations > 0) {
      primaryCode = REJECTION_CODES.R001;
    } else if (!isReplayConsistent) {
      primaryCode = REJECTION_CODES.R004;
    } else if (!hasSourceLineage) {
      primaryCode = REJECTION_CODES.R003;
    } else {
      primaryCode = REJECTION_CODES.R002;
    }
  } else if (softViolations > 0) {
    primaryCode = ADMISSION_CODES.A003;
    secondaryCodes.push(WARNING_CODES.W001);
  } else if (validationScore >= 0.95) {
    primaryCode = ADMISSION_CODES.A001;
  } else {
    primaryCode = ADMISSION_CODES.A002;
    if (validationScore < 0.80) {
      secondaryCodes.push(WARNING_CODES.W002);
    }
  }

  // Add secondary codes for incomplete evidence
  if (admitted && !hasSourceLineage) {
    secondaryCodes.push(WARNING_CODES.W003);
  }

  return {
    primaryCode,
    secondaryCodes,
    timestamp: new Date().toISOString(),
    context,
  };
}

/**
 * Format reason assignment for display
 */
export function formatReasonAssignment(assignment: ReasonAssignment): string {
  const lines: string[] = [
    `[${assignment.primaryCode.code}] ${assignment.primaryCode.message}`,
    `  └─ ${assignment.primaryCode.description}`,
  ];

  if (assignment.primaryCode.remediation) {
    lines.push(`  └─ Remediation: ${assignment.primaryCode.remediation}`);
  }

  for (const secondary of assignment.secondaryCodes) {
    lines.push(`[${secondary.code}] ${secondary.message}`);
    lines.push(`  └─ ${secondary.description}`);
  }

  return lines.join('\n');
}
