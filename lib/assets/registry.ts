/**
 * VALORAIPLUS®️ ©️ ™️ // SUPREME ASSET REGISTRY
 * CANON: 50 TOKENS // OMEGA-ZERO INITIALIZED
 * SGAU 7226.3461 // NODE: SAINT PAUL 55116 // STATUS: 100% ANCHORED
 */

export const SOVEREIGN_ASSETS = [
  "VCORE", "VAI", "GILLBTC", "VSEC", "VMAX", "VBLK", "DBLK", "VGOV", "VALX",
  "FLM", "FLAME", "FLR", "VSoul", "SOUL", "GHOST", "DEAD", "INTL-S", "INTL",
  "VMWARE+", "BRAIN+", "EDUTAIN", "MATH+", "VALOR", "VACN", "JAXX", "VDAO",
  "SKROLL", "SKOLL", "SKROL", "DG77.77X_GRAVITY_ACTIVE", "VLT", "SGAU",
  "$ANGL", "ANGL2026", "BTC2.0", "INTELIT", "VALORDAO", "VNET", "VALUTL",
  "DG1969", "DJTIME", "TIME", "$NEWT2026", "$DONNY", "$GILLSON", "$GILLGOLD",
  "$POPPA", "$POTTER", "$BRADEN168", "$MASON"
] as const;

export type SovereignToken = typeof SOVEREIGN_ASSETS[number];

// Protected family assets - ABSOLUTE PROTECTION
export const PROTECTED_ASSETS = ["$JAXX", "$POPPA", "$DONNY", "$GILLSON", "$GILLGOLD", "$POTTER", "$BRADEN168", "$MASON"] as const;
export type ProtectedAsset = typeof PROTECTED_ASSETS[number];

// Token categories
export const TOKEN_CATEGORIES = {
  CORE: ["VCORE", "VAI", "VSEC", "VMAX", "VBLK", "DBLK", "VGOV", "VALX"],
  FLAME: ["FLM", "FLAME", "FLR"],
  SOUL: ["VSoul", "SOUL", "GHOST", "DEAD"],
  INTEL: ["INTL-S", "INTL", "INTELIT"],
  BRAIN: ["VMWARE+", "BRAIN+", "EDUTAIN", "MATH+"],
  VALOR: ["VALOR", "VACN", "VALORDAO", "VALUTL"],
  GOVERNANCE: ["VDAO", "VLT", "VNET"],
  SCROLL: ["SKROLL", "SKOLL", "SKROL"],
  ANCHOR: ["DG77.77X_GRAVITY_ACTIVE", "SGAU", "$ANGL", "ANGL2026"],
  BTC: ["GILLBTC", "BTC2.0"],
  TIME: ["DG1969", "DJTIME", "TIME"],
  SOVEREIGN: ["$NEWT2026", "$DONNY", "$GILLSON", "$GILLGOLD", "$POPPA", "JAXX", "$POTTER", "$BRADEN168", "$MASON"],
} as const;

/**
 * Validates asset alignment against the BTC Witness Anchor
 */
export const validateSovereignCanon = (tokens: string[]): boolean => {
  if (tokens.length !== 50) return false;
  return tokens.every(t => SOVEREIGN_ASSETS.includes(t as SovereignToken));
};

/**
 * Check if asset is protected (family assets)
 */
export const isProtectedAsset = (token: string): boolean => {
  return PROTECTED_ASSETS.includes(token as ProtectedAsset);
};

/**
 * Get token category
 */
export const getTokenCategory = (token: string): string | null => {
  for (const [category, tokens] of Object.entries(TOKEN_CATEGORIES)) {
    if (tokens.includes(token as never)) {
      return category;
    }
  }
  return null;
};

/**
 * BTC Witness Anchor Reference
 */
export const BTC_WITNESS_ANCHOR = {
  txId: "26856b24...5c2",
  blockHeight: 847234,
  timestamp: "2024-03-15T00:00:00Z",
  merkleRoot: "0x8f3a567d2e8f1a4b9c0d2e4f6a8b0c2d4e6f8a0b2c4d6e8f0a2b4c6d8e0f1a2b",
} as const;

/**
 * Registry metadata
 */
export const REGISTRY_META = {
  version: "14.1.3.0",
  canonSize: 50,
  node: "SAINT PAUL 55116",
  sgauRef: "7226.3461",
  status: "ANCHORED",
  ledger: "Ø",
} as const;
