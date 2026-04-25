/**
 * VALORAIPLUS Protocol — Export Policy
 * 
 * Governs what claims may be exported from the runtime.
 * Export eligibility is a policy-earned status, not a default.
 */

import { type ReasonAssignment } from './reasonCodes';

// ============================================================
// EXPORT POLICY TYPES
// ============================================================

export type ExportFormat = 'JSON' | 'PDF' | 'MARKDOWN' | 'HTML' | 'LEDGER';

export type ExportLevel = 
  | 'FULL'          // Complete claim with all metadata
  | 'SUMMARY'       // Condensed claim summary
  | 'REDACTED'      // Claim with sensitive fields removed
  | 'REFERENCE';    // Claim reference only (no content)

export interface ExportPolicy {
  id: string;
  name: string;
  description: string;
  minValidationScore: number;
  requiresSourceLineage: boolean;
  requiresReplayConsistency: boolean;
  allowedFormats: ExportFormat[];
  allowedLevels: ExportLevel[];
  maxSoftViolations: number;
  blockOnHardViolation: boolean;
}

// ============================================================
// DEFAULT EXPORT POLICIES
// ============================================================

export const EXPORT_POLICIES: Record<string, ExportPolicy> = {
  STRICT: {
    id: 'STRICT',
    name: 'Strict Export Policy',
    description: 'Maximum verification requirements for export',
    minValidationScore: 0.95,
    requiresSourceLineage: true,
    requiresReplayConsistency: true,
    allowedFormats: ['JSON', 'PDF', 'LEDGER'],
    allowedLevels: ['FULL'],
    maxSoftViolations: 0,
    blockOnHardViolation: true,
  },
  STANDARD: {
    id: 'STANDARD',
    name: 'Standard Export Policy',
    description: 'Balanced verification requirements',
    minValidationScore: 0.75,
    requiresSourceLineage: true,
    requiresReplayConsistency: true,
    allowedFormats: ['JSON', 'PDF', 'MARKDOWN', 'HTML', 'LEDGER'],
    allowedLevels: ['FULL', 'SUMMARY'],
    maxSoftViolations: 2,
    blockOnHardViolation: true,
  },
  PERMISSIVE: {
    id: 'PERMISSIVE',
    name: 'Permissive Export Policy',
    description: 'Relaxed requirements for internal use',
    minValidationScore: 0.50,
    requiresSourceLineage: false,
    requiresReplayConsistency: false,
    allowedFormats: ['JSON', 'MARKDOWN', 'HTML'],
    allowedLevels: ['FULL', 'SUMMARY', 'REDACTED'],
    maxSoftViolations: 5,
    blockOnHardViolation: true,
  },
  REFERENCE_ONLY: {
    id: 'REFERENCE_ONLY',
    name: 'Reference Only Policy',
    description: 'Export claim references without content',
    minValidationScore: 0.0,
    requiresSourceLineage: false,
    requiresReplayConsistency: false,
    allowedFormats: ['JSON'],
    allowedLevels: ['REFERENCE'],
    maxSoftViolations: 999,
    blockOnHardViolation: false,
  },
};

// ============================================================
// EXPORT ELIGIBILITY
// ============================================================

export interface ExportEligibility {
  eligible: boolean;
  policy: ExportPolicy;
  allowedFormats: ExportFormat[];
  allowedLevels: ExportLevel[];
  blockers: string[];
  warnings: string[];
}

export interface ExportCandidate {
  claimId: string;
  statement: string;
  validationScore: number;
  hasSourceLineage: boolean;
  isReplayConsistent: boolean;
  hardViolations: number;
  softViolations: number;
  reasonAssignment: ReasonAssignment;
}

/**
 * Evaluate export eligibility against a policy
 */
export function evaluateExportEligibility(
  candidate: ExportCandidate,
  policy: ExportPolicy
): ExportEligibility {
  const blockers: string[] = [];
  const warnings: string[] = [];

  // Check validation score
  if (candidate.validationScore < policy.minValidationScore) {
    blockers.push(`Validation score ${candidate.validationScore.toFixed(3)} below threshold ${policy.minValidationScore}`);
  }

  // Check source lineage
  if (policy.requiresSourceLineage && !candidate.hasSourceLineage) {
    blockers.push('Source lineage required but not present');
  }

  // Check replay consistency
  if (policy.requiresReplayConsistency && !candidate.isReplayConsistent) {
    blockers.push('Replay consistency required but not validated');
  }

  // Check hard violations
  if (policy.blockOnHardViolation && candidate.hardViolations > 0) {
    blockers.push(`${candidate.hardViolations} hard invariant violation(s) block export`);
  }

  // Check soft violations
  if (candidate.softViolations > policy.maxSoftViolations) {
    blockers.push(`${candidate.softViolations} soft violations exceed maximum ${policy.maxSoftViolations}`);
  }

  // Add warnings for marginal cases
  if (candidate.validationScore < policy.minValidationScore + 0.1) {
    warnings.push('Validation score near threshold');
  }

  if (candidate.softViolations > 0) {
    warnings.push(`${candidate.softViolations} soft violation(s) present`);
  }

  const eligible = blockers.length === 0;

  return {
    eligible,
    policy,
    allowedFormats: eligible ? policy.allowedFormats : [],
    allowedLevels: eligible ? policy.allowedLevels : [],
    blockers,
    warnings,
  };
}

/**
 * Find the most permissive policy a candidate qualifies for
 */
export function findBestPolicy(candidate: ExportCandidate): ExportEligibility | null {
  const policies = ['STRICT', 'STANDARD', 'PERMISSIVE', 'REFERENCE_ONLY'];
  
  for (const policyId of policies) {
    const policy = EXPORT_POLICIES[policyId];
    const eligibility = evaluateExportEligibility(candidate, policy);
    if (eligibility.eligible) {
      return eligibility;
    }
  }

  return null;
}

// ============================================================
// EXPORT MANIFEST
// ============================================================

export interface ExportManifest {
  id: string;
  timestamp: string;
  policy: ExportPolicy;
  format: ExportFormat;
  level: ExportLevel;
  claims: Array<{
    claimId: string;
    statement: string;
    validationScore: number;
    reasonCode: string;
  }>;
  metadata: {
    totalClaims: number;
    exportedClaims: number;
    blockedClaims: number;
    averageValidationScore: number;
  };
}

/**
 * Generate an export manifest
 */
export function generateExportManifest(
  candidates: ExportCandidate[],
  policy: ExportPolicy,
  format: ExportFormat,
  level: ExportLevel
): ExportManifest {
  const eligible: ExportCandidate[] = [];
  const blocked: ExportCandidate[] = [];

  for (const candidate of candidates) {
    const eligibility = evaluateExportEligibility(candidate, policy);
    if (eligibility.eligible) {
      eligible.push(candidate);
    } else {
      blocked.push(candidate);
    }
  }

  const avgScore = eligible.length > 0
    ? eligible.reduce((sum, c) => sum + c.validationScore, 0) / eligible.length
    : 0;

  return {
    id: `export_${Date.now()}_${policy.id}`,
    timestamp: new Date().toISOString(),
    policy,
    format,
    level,
    claims: eligible.map(c => ({
      claimId: c.claimId,
      statement: c.statement,
      validationScore: c.validationScore,
      reasonCode: c.reasonAssignment.primaryCode.code,
    })),
    metadata: {
      totalClaims: candidates.length,
      exportedClaims: eligible.length,
      blockedClaims: blocked.length,
      averageValidationScore: Math.round(avgScore * 1000) / 1000,
    },
  };
}

/**
 * Serialize export manifest
 */
export function serializeManifest(manifest: ExportManifest): string {
  return JSON.stringify(manifest, null, 2);
}
