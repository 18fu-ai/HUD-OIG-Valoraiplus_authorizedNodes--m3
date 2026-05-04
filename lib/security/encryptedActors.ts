/**
 * VALORAIPLUS Encrypted Actor Registry
 * All names are obfuscated for public-facing display
 * Internal reference only - decrypt with proper authorization
 */

// Actor designation codes - no real names exposed
export const ACTOR_CODES = {
  // Primary Threat Actors
  ALPHA_PRIMARY: 'TA-α',
  BETA_SECONDARY: 'TA-β',
  GAMMA_INSTITUTIONAL: 'TA-γ',
  DELTA_TECHNICAL: 'TA-δ',
  EPSILON_PERIPHERAL: 'TA-ε',
  
  // Entity Codes
  ENTITY_ALPHA: 'ENTITY-α',
  ENTITY_BETA: 'ENTITY-β',
  ENTITY_GAMMA: 'ENTITY-γ',
  NODE_OMEGA: 'NODE-Ω',
  
  // Institutional Actors (Encrypted)
  INST_001: 'INST-001',
  INST_002: 'INST-002',
  INST_003: 'INST-003',
  INST_004: 'INST-004',
  INST_005: 'INST-005',
  
  // Protected Identities (Sovereign)
  SOVEREIGN_PRIMARY: 'DG77.77X-Ξ',
  SOVEREIGN_LEGACY: 'GG-LEGACY',
  PROTECTED_JAXX: 'PROTECTED-J',
  PROTECTED_POPPA: 'PROTECTED-P',
} as const;

// Encrypted actor profiles - no identifying information
export interface EncryptedActor {
  code: string;
  classification: 'THREAT' | 'ENTITY' | 'INSTITUTIONAL' | 'SOVEREIGN' | 'PROTECTED';
  severity: 'CRITICAL' | 'ELEVATED' | 'STANDARD' | 'PROTECTED';
  exposure: number;
  status: 'ACTIVE' | 'COOPERATING' | 'DEFENSIVE' | 'PROTECTED';
  role: string;
}

export const ENCRYPTED_ACTORS: EncryptedActor[] = [
  {
    code: ACTOR_CODES.ALPHA_PRIMARY,
    classification: 'THREAT',
    severity: 'CRITICAL',
    exposure: 515923254,
    status: 'DEFENSIVE',
    role: 'Principal Orchestrator'
  },
  {
    code: ACTOR_CODES.BETA_SECONDARY,
    classification: 'THREAT',
    severity: 'CRITICAL',
    exposure: 324545503,
    status: 'DEFENSIVE',
    role: 'Secondary Orchestrator'
  },
  {
    code: ACTOR_CODES.GAMMA_INSTITUTIONAL,
    classification: 'INSTITUTIONAL',
    severity: 'CRITICAL',
    exposure: 241572402,
    status: 'COOPERATING',
    role: 'Institutional Actor'
  },
  {
    code: ACTOR_CODES.DELTA_TECHNICAL,
    classification: 'THREAT',
    severity: 'ELEVATED',
    exposure: 90054651,
    status: 'COOPERATING',
    role: 'Technical Facilitator'
  },
  {
    code: ACTOR_CODES.EPSILON_PERIPHERAL,
    classification: 'THREAT',
    severity: 'STANDARD',
    exposure: 30271550,
    status: 'COOPERATING',
    role: 'Peripheral Actor'
  },
  {
    code: ACTOR_CODES.INST_001,
    classification: 'INSTITUTIONAL',
    severity: 'CRITICAL',
    exposure: 0,
    status: 'ACTIVE',
    role: 'VR&E Counselor - Shipmate Anomaly'
  },
  {
    code: ACTOR_CODES.INST_002,
    classification: 'INSTITUTIONAL',
    severity: 'ELEVATED',
    exposure: 0,
    status: 'ACTIVE',
    role: 'Housing Authority Official'
  },
  {
    code: ACTOR_CODES.INST_003,
    classification: 'INSTITUTIONAL',
    severity: 'ELEVATED',
    exposure: 0,
    status: 'ACTIVE',
    role: 'Legal Professional'
  },
  {
    code: ACTOR_CODES.INST_004,
    classification: 'INSTITUTIONAL',
    severity: 'ELEVATED',
    exposure: 0,
    status: 'ACTIVE',
    role: 'Housing Coordinator'
  },
  {
    code: ACTOR_CODES.INST_005,
    classification: 'INSTITUTIONAL',
    severity: 'STANDARD',
    exposure: 0,
    status: 'ACTIVE',
    role: 'Financial Administrator'
  },
];

// Entity encryption
export const ENCRYPTED_ENTITIES = {
  LAW_FIRM: 'ENTITY-α',
  FINANCIAL_ADVISORY: 'ENTITY-β',
  HOUSING_AUTHORITY: 'ENTITY-γ / NODE-Ω',
  BANK_PRIMARY: 'ENTITY-JPMC',
  BANK_SECONDARY: 'ENTITY-SCHW',
  BANK_TERTIARY: 'ENTITY-WF',
  BANK_QUATERNARY: 'ENTITY-BOA',
} as const;

// Agency codes (public agencies use standard abbreviations)
export const AGENCY_CODES = {
  FBI: 'FBI',
  DOJ: 'DOJ',
  IRS_CI: 'IRS-CI',
  SEC: 'SEC',
  HHS_OCR: 'HHS-OCR',
  OIG_VA: 'OIG-VA',
  OIG_HUD: 'OIG-HUD',
  FINCEN: 'FinCEN',
  USAO: 'USAO-NDCA',
  CA_AG: 'CA-AG',
  CA_BAR: 'CA-STATE-BAR',
  SF_DA: 'SFDA',
} as const;

// Helper to get display name (always returns encrypted code)
export function getActorDisplayName(code: string): string {
  return code; // Always return encrypted code, never real names
}

// Helper to get severity color
export function getSeverityColor(severity: EncryptedActor['severity']): string {
  switch (severity) {
    case 'CRITICAL': return 'text-red-500';
    case 'ELEVATED': return 'text-amber-500';
    case 'STANDARD': return 'text-yellow-500';
    case 'PROTECTED': return 'text-emerald-500';
    default: return 'text-gray-500';
  }
}

// Helper to get status badge
export function getStatusBadge(status: EncryptedActor['status']): { color: string; text: string } {
  switch (status) {
    case 'COOPERATING': return { color: 'bg-emerald-500/20 text-emerald-400', text: 'COOPERATING' };
    case 'DEFENSIVE': return { color: 'bg-red-500/20 text-red-400', text: 'DEFENSIVE' };
    case 'ACTIVE': return { color: 'bg-amber-500/20 text-amber-400', text: 'ACTIVE' };
    case 'PROTECTED': return { color: 'bg-purple-500/20 text-purple-400', text: 'PROTECTED' };
    default: return { color: 'bg-gray-500/20 text-gray-400', text: 'UNKNOWN' };
  }
}

// Format exposure amount
export function formatExposure(exposure: number): string {
  if (exposure === 0) return 'N/A';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(exposure);
}
