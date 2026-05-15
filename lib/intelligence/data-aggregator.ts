/**
 * Intelligence data aggregator — collects all report data
 */

export const INTELLIGENCE_DATA = {
  federalInvestigations: [
    { agency: 'FBI', division: 'Corruption Task Force', status: 'ACTIVE' },
    { agency: 'HHS OCR', caseNumber: '25-621293', status: 'ACTIVE' },
    { agency: 'DOJ', division: 'Civil Rights', status: 'ACTIVE' },
    { agency: 'VA OIG', division: 'Mortality Review', status: 'ACTIVE' },
  ],
  hhsOcr: {
    caseNumber: '25-621293',
    agency: 'Health & Human Services OCR',
    respondent: 'San Francisco Housing Authority',
    violations: 'Section 504 - Rehabilitation Act',
    status: 'ACTIVE',
    filed: '2026-01-15',
  },
  mimecastIncidents: {
    spoliationAttempts: 14,
    deletionEvents: 3,
    unauthorizedAccess: 7,
    policyViolations: 21,
    archiveIntegrity: 2,
  },
  financialMatrix: {
    baseRecovery: 508631005.52,
    trebleDamages: 1525893016.56,
    sovereignMint: 80000000.0,
    total: 589334237.34,
  },
  protectedAssets: [
    { symbol: '$POPPA', guardian: 'Michael', status: 'SHIELDED' },
    { symbol: '$JAXX', guardian: 'Gabriel', status: 'SHIELDED' },
    { symbol: '$GILLBTC', status: 'ANCHORED' },
    { symbol: '$DONNY', status: 'ACTIVE' },
  ],
  tokenEcosystem: {
    filing: 'SGAU-7226.3461',
    contract: 'SGAU-VALUEGUARD-77.77X-FINALDEG',
    namespace: 'VALORAIPLUS_',
    supremeBinary: '101010_1010101',
    status: 'CANONICAL',
  },
};
