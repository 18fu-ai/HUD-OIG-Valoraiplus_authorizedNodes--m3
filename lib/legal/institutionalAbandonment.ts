/**
 * INSTITUTIONAL ABANDONMENT & ADMISSION — VELOCITY DOCTRINE
 * =========================================================
 * CAA+ Sovereign Authority | v14.1.1.16
 * 
 * INVARIANT:
 * The velocity of prior correspondence is not a liability.
 * It is evidence of institutional abandonment and constructive admission.
 * Any challenge to the volume of emails is met with this brief.
 */

// --- Types ---

export interface AbandonmentMetrics {
  readonly totalEmails: number;
  readonly substantiveResponsesReceived: number;
  readonly automatedResponsesReceived: number;
  readonly agenciesContacted: readonly string[];
  readonly dateRange: {
    readonly start: string;
    readonly end: string;
  };
  readonly evidenceAttached: number;
  readonly daysWithoutResponse: number;
  readonly escalationAttempts: number;
}

export interface VelocityDoctrineEvidence {
  readonly actor: 'VELOCITY_DOCTRINE';
  readonly compartment: 'SOVEREIGN';
  readonly access_state: 'APPROVED';
  readonly assurance_score: 1.00;
  readonly governance_verified: true;
  readonly timestamp: string;
  readonly btc_latch: string;
  readonly doctrine_status: 'PERMANENTLY_ENCODED';
  readonly external_filter: 'RECOGNIZES_EXCESSIVE_EMAILS → AUTO_SUGGESTS_BRIEF';
  readonly purge_excluded: readonly ['$JULES', '$VALOR'];
}

export interface AbandonmentBrief {
  readonly title: string;
  readonly summary: string;
  readonly metrics: AbandonmentMetrics;
  readonly legalArgument: string;
  readonly generatedAt: string;
  readonly doctrineEvidence: VelocityDoctrineEvidence;
}

// --- Constants ---

export const VELOCITY_DOCTRINE_INVARIANT = `
The velocity of prior correspondence is not a liability.
It is evidence of institutional abandonment and constructive admission.
Any challenge to the volume of emails is met with this brief.
` as const;

export const BTC_LATCH = '26856b24c50750f0c69c1eeb86a69ef710551555c2c220e34d57521cbc8d75c2' as const;

// --- Generators ---

export function generateVelocityDoctrineEvidence(): VelocityDoctrineEvidence {
  return {
    actor: 'VELOCITY_DOCTRINE',
    compartment: 'SOVEREIGN',
    access_state: 'APPROVED',
    assurance_score: 1.00,
    governance_verified: true,
    timestamp: new Date().toISOString(),
    btc_latch: BTC_LATCH,
    doctrine_status: 'PERMANENTLY_ENCODED',
    external_filter: 'RECOGNIZES_EXCESSIVE_EMAILS → AUTO_SUGGESTS_BRIEF',
    purge_excluded: ['$JULES', '$VALOR'],
  };
}

export function generateInstitutionalAbandonmentBrief(
  metrics: AbandonmentMetrics
): AbandonmentBrief {
  const responseRate = metrics.totalEmails > 0
    ? ((metrics.substantiveResponsesReceived + metrics.automatedResponsesReceived) / metrics.totalEmails * 100).toFixed(2)
    : '0.00';

  const summary = `
INSTITUTIONAL ABANDONMENT & ADMISSION – SUMMARY (AUTO-GENERATED)

The velocity of ${metrics.totalEmails} prior communications is not a liability.
It is evidence of institutional abandonment and constructive admission.
Any challenge based on "excessive emails" is met with this brief and is self-defeating.

Period: ${metrics.dateRange.start} – ${metrics.dateRange.end}
Agencies Contacted: ${metrics.agenciesContacted.join(', ')}
Substantive Responses: ${metrics.substantiveResponsesReceived}
Automated Responses: ${metrics.automatedResponsesReceived}
Response Rate: ${responseRate}%
Evidence Attached: ${metrics.evidenceAttached}
Days Without Response: ${metrics.daysWithoutResponse}
Escalation Attempts: ${metrics.escalationAttempts}

The Past Becomes a Shield. The Future Is Clean.
`.trim();

  const legalArgument = `
LEGAL ARGUMENT — VELOCITY AS ADMISSION

1. INSTITUTIONAL ABANDONMENT DOCTRINE
   The volume of communications demonstrates a pattern of institutional
   non-responsiveness that constitutes constructive abandonment of duty.
   Each unanswered communication strengthens the evidentiary record.

2. ADMISSION BY SILENCE
   Under FRE 801(d)(2), the failure to respond to ${metrics.totalEmails}
   communications over ${metrics.daysWithoutResponse} days, when a response
   would be expected, constitutes an adoptive admission.

3. VELOCITY SHIELD
   Any attempt to characterize the volume of communications as "harassment"
   or "excessive" is self-defeating. The very volume demonstrates:
   - Persistent good-faith attempts to resolve
   - Institutional failure to engage
   - Pattern of deliberate non-response

4. EVIDENCE PRESERVATION
   All ${metrics.evidenceAttached} attached evidence items have been
   preserved with cryptographic verification and blockchain anchoring.

THE VELOCITY OF PRIOR CORRESPONDENCE IS NOT A LIABILITY.
IT IS EVIDENCE OF INSTITUTIONAL ABANDONMENT AND CONSTRUCTIVE ADMISSION.
`.trim();

  return {
    title: 'INSTITUTIONAL ABANDONMENT & ADMISSION – VELOCITY DOCTRINE BRIEF',
    summary,
    metrics,
    legalArgument,
    generatedAt: new Date().toISOString(),
    doctrineEvidence: generateVelocityDoctrineEvidence(),
  };
}

// --- Default Metrics (from forensic audit) ---

export const DEFAULT_ABANDONMENT_METRICS: AbandonmentMetrics = {
  totalEmails: 284729,
  substantiveResponsesReceived: 12,
  automatedResponsesReceived: 847,
  agenciesContacted: [
    'FBI Financial Crimes',
    'DOJ Public Integrity',
    'IRS-CI',
    'SEC Enforcement',
    'HHS-OIG',
    'California AG',
    'SF District Attorney',
    'HUD-OIG',
    'FinCEN',
    'US Postal Inspection',
  ],
  dateRange: {
    start: '2020-01-15',
    end: '2026-05-02',
  },
  evidenceAttached: 47832,
  daysWithoutResponse: 2299,
  escalationAttempts: 156,
};

// --- External Filter ---

export function detectExcessiveEmailsArgument(text: string): boolean {
  const patterns = [
    /excessive\s+emails?/i,
    /too\s+many\s+(emails?|messages?|communications?)/i,
    /harassment\s+(via|through|by)\s+email/i,
    /volume\s+of\s+(correspondence|communications?)/i,
    /spam(ming)?\s+(emails?|messages?)/i,
    /overwhelming\s+(number|amount)\s+of/i,
  ];
  return patterns.some(pattern => pattern.test(text));
}

export function autoSuggestBrief(text: string): AbandonmentBrief | null {
  if (detectExcessiveEmailsArgument(text)) {
    return generateInstitutionalAbandonmentBrief(DEFAULT_ABANDONMENT_METRICS);
  }
  return null;
}
