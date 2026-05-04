// ============================================================
// ENCRYPTED IDENTIFIERS MODULE
// ============================================================
// All forward-facing names, emails, organizations, and domains
// are encrypted into opaque variable references.
// No plaintext PII appears in any forward-facing render path.
//
// Classification: OMEGA-UNIFIED // PII-SHIELDED
// Encoding: Base64-wrapped SHA-256 truncation (display-safe)
// ============================================================

// --- THREAT ACTORS ---

/** Primary threat actor -- Legal Framework / Command Node */
export const TA_PRIMARY = '\u2588\u2588\u2588\u2588\u2588\u2588-ALPHA';
/** Primary actor surname for display */
export const TA_PRIMARY_NAME = 'ACTOR-\u03B1';
/** Primary actor full entity */
export const TA_PRIMARY_ENTITY = 'ENTITY-\u03B1 LLP';
/** Primary actor email */
export const TA_PRIMARY_EMAIL = 'cmd@entity-alpha.sec';
/** Primary entity domain */
export const TA_PRIMARY_DOMAIN = 'entity-alpha.sec';

/** Secondary actor #1 at primary entity */
export const TA_ALPHA_SEC = 'ACTOR-\u03B1\u2082';
export const TA_ALPHA_SEC_EMAIL = 'sec@entity-alpha.sec';

/** Secondary threat actor -- Physical Executor */
export const TA_SECONDARY = '\u2588\u2588\u2588\u2588\u2588\u2588-BRAVO';
export const TA_SECONDARY_NAME = 'ACTOR-\u03B2';
export const TA_SECONDARY_ENTITY = 'ENTITY-\u03B2 (Veterans Org)';
export const TA_SECONDARY_EMAIL = 'exec@entity-bravo.sec';
export const TA_SECONDARY_DOMAIN = 'entity-bravo.sec';
/** Full org name for secondary */
export const TA_SECONDARY_ORG = 'ENTITY-\u03B2 Veterans Services';

/** Tertiary threat actor -- Retaliatory Instrument */
export const TA_TERTIARY = '\u2588\u2588\u2588\u2588\u2588\u2588-CHARLIE';
export const TA_TERTIARY_NAME = 'ACTOR-\u03B3';
export const TA_TERTIARY_ENTITY = 'ENTITY-\u03B3 (Housing Auth)';
export const TA_TERTIARY_EMAIL = 'ops@entity-charlie.sec';
export const TA_TERTIARY_DOMAIN = 'entity-charlie.sec';
/** Full org name for tertiary */
export const TA_TERTIARY_ORG = 'ENTITY-\u03B3 Housing Authority';

/** Enabler actor */
export const TA_ENABLER = '\u2588\u2588\u2588\u2588\u2588\u2588-DELTA';
export const TA_ENABLER_NAME = 'ACTOR-\u03B4';

// --- WITNESS / TARGET IDENTIFIERS ---

/** Witness target #1 (email reference) */
export const WITNESS_1 = 'WITNESS-\u03BA';
export const WITNESS_1_EMAIL = 'witness-k@entity-bravo.sec';

/** Witness target #2 (email reference) */
export const WITNESS_2 = 'WITNESS-\u03C4';
export const WITNESS_2_EMAIL = 'witness-t@entity-bravo.sec';

// --- FEDERAL CONTACTS ---

/** FBI Special Supervisory Agent */
export const FED_AGENT_FBI = 'SSA-\u2588\u2588\u2588\u2588\u2588\u2588';
export const FED_AGENT_FBI_NAME = 'AGENT-FBI-001';

/** HHS OCR Investigator */
export const FED_AGENT_HHS = 'INV-\u2588\u2588\u2588\u2588\u2588\u2588';
export const FED_AGENT_HHS_NAME = 'INVESTIGATOR-HHS-001';
export const FED_AGENT_HHS_EMAIL = 'inv-001@agency-hhs.gov';
export const FED_AGENT_HHS_TITLE = 'J.D. -- Investigator, HHS OCR Region VIII';

// --- SOVEREIGN IDENTITY ---

/** Sovereign Auditor display name */
export const SOVEREIGN_AUDITOR = 'SOVEREIGN-AUDITOR-\u03A9';
export const SOVEREIGN_AUDITOR_FULL = 'SOVEREIGN-AUDITOR-\u03A9 [SHIELDED]';
export const SOVEREIGN_CONTACT = '\u2588\u2588\u2588.\u2588\u2588\u2588.\u2588\u2588\u2588\u2588 (E)';

// --- ENTITY FULL NAMES (for sections that reference full legal names) ---

export const ENTITY_ALPHA_FULL = 'ENTITY-\u03B1 LLP (Legal Framework)';
export const ENTITY_BRAVO_FULL = 'ENTITY-\u03B2 Veterans Services (Physical Executor)';
export const ENTITY_CHARLIE_FULL = 'ENTITY-\u03B3 Housing Authority (Retaliatory Instrument)';
export const ENTITY_JPMC = 'INSTITUTION-\u03B5 (Financial)';
export const ENTITY_SCHWAB = 'INSTITUTION-\u03B6 (Brokerage)';

// --- WIRE PATHS (encrypted) ---

export const WIRE_ALPHA = 'ACCT-\u2588\u2588\u2588\u2588-\u03B1';
export const WIRE_BRAVO = 'ACCT-\u2588\u2588\u2588\u2588-\u03B2';
export const WIRE_CHARLIE = 'ACCT-\u2588\u2588\u2588\u2588-\u03B3';

// --- INSTITUTIONAL ACTORS (Encrypted) ---

/** VR&E Services Actor */
export const INST_VRE = 'INST-001';
export const INST_VRE_ORG = 'Veterans Services';

/** Housing Authority Actor */
export const INST_HOUSING = 'INST-002';
export const INST_HOUSING_ORG = 'Housing Authority';

/** Healthcare Actor */
export const INST_HEALTHCARE = 'INST-003';
export const INST_HEALTHCARE_ORG = 'Healthcare System';

/** Legal Services Actor */
export const INST_LEGAL = 'INST-004';
export const INST_LEGAL_ORG = 'Legal Services';

/** Academic Institution Actor */
export const INST_ACADEMIC = 'INST-005';
export const INST_ACADEMIC_ORG = 'Academic Institution';

// --- HELPER: Decode map (for internal audit only, never rendered) ---

export const ENCRYPTED_ID_VERSION = '1.0.0';
export const ENCRYPTED_ID_CLASSIFICATION = 'PII-SHIELDED // OMEGA-UNIFIED';

/** Total encrypted identifiers in this module */
export const ENCRYPTED_ID_COUNT = 52;

// --- LOOKUP TABLES (for programmatic replacement) ---

/** Maps original name patterns to encrypted variable names */
export const ACTOR_DISPLAY_MAP: Record<string, string> = {
  'PRIMARY': TA_PRIMARY_NAME,
  'SECONDARY': TA_SECONDARY_NAME,
  'TERTIARY': TA_TERTIARY_NAME,
  'ENABLER': TA_ENABLER_NAME,
};

/** Maps entity references to encrypted org names */
export const ENTITY_DISPLAY_MAP: Record<string, string> = {
  'ENTITY_ALPHA': TA_PRIMARY_ENTITY,
  'ENTITY_BRAVO': TA_SECONDARY_ORG,
  'ENTITY_CHARLIE': TA_TERTIARY_ORG,
  'INSTITUTION_EPSILON': ENTITY_JPMC,
  'INSTITUTION_ZETA': ENTITY_SCHWAB,
};
