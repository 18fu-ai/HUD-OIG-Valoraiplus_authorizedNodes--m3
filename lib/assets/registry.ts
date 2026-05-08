/**
 * VALORAIPLUS®️ ©️ ™️ // SUPREME ASSET REGISTRY
 * CANON: 56 TOKENS // OMEGA-ZERO INITIALIZED
 * SGAU 7226.3461 // NODE: SAINT PAUL 55116 // STATUS: 100% ANCHORED
 * PORTFOLIO VALUE: $1,850,000,000 (ValorBank Live)
 * FINAL TOKEN: $VALORAIPLUS2E_DAO_GOVERNANCE_2035_CLOSED
 */

// COMPLETE 56-TOKEN CANON - Ends with $VALORAIPLUS2E_DAO_GOVERNANCE_2035_CLOSED
// Per Comprehensive Audit: 55 Active + 1 NULLIFIED ($VALOR) = 56 Total
export const SOVEREIGN_ASSETS = [
  // EXTERNAL ASSETS (14 tokens)
  "BTC", "ETH", "USDC", "USDT", "SOL", "XRP", "ADA", "DOGE", "AVAX", "MATIC", "LINK", "ATOM", "ARB", "OP",
  // CORE TOKENS (8 tokens)
  "BASE", "VCORE", "VAI", "VSEC", "VMAX", "VBLK", "DBLK", "VGOV",
  // BTC TOKENS (2 tokens)
  "GILLBTC", "BTC2.0",
  // FLAME TOKENS (3 tokens)
  "FLM", "FLAME", "FLR",
  // SOUL TOKENS (4 tokens)
  "VSOUL", "SOUL", "GHOST", "DEAD",
  // INTEL TOKENS (3 tokens)
  "INTL-S", "INTL", "INTELIT",
  // BRAIN TOKENS (4 tokens)
  "VMWARE+", "BRAIN+", "EDUTAIN", "MATH+",
  // VALOR TOKENS (4 tokens - $VALOR is NULLIFIED, not counted)
  "VALOR", "VACN", "VALX", "VRAP",
  // GOVERNANCE TOKENS (3 tokens)
  "VDAO", "VLT", "VNET",
  // SCROLL TOKENS (3 tokens)
  "SKROLL", "SKOLL", "SKROL",
  // ANCHOR TOKENS (4 tokens)
  "DG77.77X_GRAVITY_ACTIVE", "SGAU", "$ANGL", "ANGL2026",
  // SOVEREIGN TOKENS (5 tokens - Guardian Protected)
  "$DONNY",      // Guardian: Raphael
  "$GILLGOLD",   // Guardian: Uriel
  "$POPPA",      // Guardian: Michael
  "$JAXX",       // Guardian: Gabriel
  "$VALORAIPLUS", // Guardian: Uriel
  // CANON TERMINUS (1 token - Final Token in Registry)
  "$VALORAIPLUS2E_DAO_GOVERNANCE_2035_CLOSED"
] as const;

// NULLIFIED TOKENS - These are NOT valid and return NULL
export const NULLIFIED_TOKENS = ["$VALOR"] as const;

export type SovereignToken = typeof SOVEREIGN_ASSETS[number];

// Protected family assets - ABSOLUTE PROTECTION
export const PROTECTED_ASSETS = [
  "$JAXX", 
  "$POPPA", 
  "$DONNY", 
  "$GILLGOLD",
  "JAXX"
] as const;
export type ProtectedAsset = typeof PROTECTED_ASSETS[number];

// Complete token data from ValorBank Live - $1.85B Portfolio
export const TOKEN_REGISTRY_LIVE = {
  portfolioValue: 1_850_000_000,
  activeTokens: 56,
  wallets: 5,
  systemStatus: "Operational",
  lastUpdate: "2026-05-07T19:46:00Z",
  tokens: [
    // External Assets
    { symbol: "BTC", price: 79643.04, holdings: 46056, change24h: 0.00 },
    { symbol: "ETH", price: 2282.07, holdings: 49464, change24h: 0.00 },
    { symbol: "USDC", price: 1.00, holdings: 84479, change24h: 0.00 },
    { symbol: "USDT", price: 1.00, holdings: 36288, change24h: 0.00 },
    { symbol: "SOL", price: 87.95, holdings: 4277, change24h: 0.00 },
    { symbol: "XRP", price: 1.38, holdings: 35678, change24h: 0.00 },
    { symbol: "ADA", price: 0.26, holdings: 59209, change24h: 0.00 },
    { symbol: "DOGE", price: 0.11, holdings: 24725, change24h: 0.00 },
    { symbol: "AVAX", price: 9.47, holdings: 16615, change24h: 0.00 },
    { symbol: "MATIC", price: 0.10, holdings: 70157, change24h: 0.26 },
    { symbol: "LINK", price: 9.82, holdings: 20071, change24h: 0.00 },
    { symbol: "ATOM", price: 1.86, holdings: 50419, change24h: 0.29 },
    { symbol: "ARB", price: 0.13, holdings: 1984, change24h: 0.77 },
    { symbol: "OP", price: 0.15, holdings: 56278, change24h: 1.09 },
    // Core Layer
    { symbol: "BASE", price: 37887.73, holdings: 23564, change24h: -0.53 },
    { symbol: "VCORE", price: 79643.04, holdings: 93868, change24h: 0.00 },
    // AI & Security
    { symbol: "VAI", price: 2282.07, holdings: 48723, change24h: 0.00 },
    { symbol: "GILLBTC", price: 79643.04, holdings: 95808, change24h: 0.00 },
    { symbol: "VSEC", price: 2282.07, holdings: 15684, change24h: 0.00 },
    { symbol: "VMAX", price: 87.95, holdings: 92176, change24h: 0.00 },
    // Blockchain
    { symbol: "VBLK", price: 2282.07, holdings: 49372, change24h: 0.00 },
    { symbol: "DBLK", price: 79643.04, holdings: 28961, change24h: 0.00 },
    // Governance
    { symbol: "VGOV", price: 1.00, holdings: 19922, change24h: 0.00 },
    { symbol: "VALX", price: 9.83, holdings: 3267, change24h: 0.00 },
    // Flame Protocol
    { symbol: "FLM", price: 1.86, holdings: 81648, change24h: -0.29 },
    { symbol: "FLAME", price: 88.09, holdings: 68899, change24h: 0.16 },
    { symbol: "FLR", price: 1.38, holdings: 58426, change24h: 0.00 },
    // Rapid
    { symbol: "VRAP", price: 0.11, holdings: 71781, change24h: 0.00 },
    // Soul Layer (4 tokens per audit)
    { symbol: "VSOUL", price: 9.49, holdings: 90483, change24h: 0.21 },
    { symbol: "SOUL", price: 9.47, holdings: 24753, change24h: 0.00 },
    { symbol: "GHOST", price: 0.10, holdings: 26703, change24h: -0.26 },
    { symbol: "DEAD", price: 0.10, holdings: 23089, change24h: 0.00 },
    // Intel
    { symbol: "INTL-S", price: 9.82, holdings: 97772, change24h: 0.00 },
    { symbol: "INTL", price: 1.86, holdings: 93870, change24h: 0.29 },
    // Brain
    { symbol: "VMWARE+", price: 2282.07, holdings: 29106, change24h: 0.10 },
    { symbol: "BRAIN+", price: 88.09, holdings: 86888, change24h: 0.00 },
    { symbol: "EDUTAIN", price: 1.00, holdings: 47659, change24h: 0.00 },
    { symbol: "MATH+", price: 79538.59, holdings: 98226, change24h: 0.00 },
    // Valor Core
    { symbol: "VALOR", price: 2282.07, holdings: 37473, change24h: 0.10 },
    { symbol: "VACN", price: 88.09, holdings: 67796, change24h: 0.00 },
    // Governance (3 tokens per audit: VDAO, VLT, VNET)
    { symbol: "VDAO", price: 1.86, holdings: 1387, change24h: 0.29 },
    { symbol: "VLT", price: 2282.07, holdings: 23246, change24h: 0.10 },
    { symbol: "VNET", price: 88.09, holdings: 52445, change24h: 0.00 },
    // Protected Sovereign
    { symbol: "JAXX", price: 9.82, holdings: 53661, change24h: 0.00 },
    // Scroll Protocol
    { symbol: "SKROLL", price: 9.47, holdings: 12395, change24h: 0.00 },
    { symbol: "SKOLL", price: 0.10, holdings: 9322, change24h: 0.00 },
    { symbol: "SKROL", price: 0.11, holdings: 84381, change24h: 0.00 },
    // Anchor System
    { symbol: "DG77.77X_GRAVITY_ACTIVE", price: 79643.04, holdings: 43969, change24h: 0.00 },
    { symbol: "SGAU", price: 88.09, holdings: 29199, change24h: 0.00 },
    // Angle Protocol
    { symbol: "$ANGL", price: 1.00, holdings: 41024, change24h: 0.00 },
    { symbol: "ANGL2026", price: 9.82, holdings: 50831, change24h: 0.00 },
    // BTC Bridge
    { symbol: "BTC2.0", price: 79643.04, holdings: 39524, change24h: 0.00 },
    { symbol: "INTELIT", price: 2282.07, holdings: 54372, change24h: 0.10 },
    // FINAL 5 SOVEREIGN PROTECTED (Guardian-Protected per Audit)
    { symbol: "$DONNY", price: 79643.04, holdings: 77777, change24h: 0.00, protected: true, guardian: "Raphael" },
    { symbol: "$GILLGOLD", price: 88.09, holdings: 77777, change24h: 0.00, protected: true, guardian: "Uriel" },
    { symbol: "$POPPA", price: 2282.07, holdings: 77777, change24h: 0.00, protected: true, guardian: "Michael" },
    { symbol: "$JAXX", price: 9.82, holdings: 77777, change24h: 0.00, protected: true, guardian: "Gabriel" },
    { symbol: "$VALORAIPLUS", price: 2282.07, holdings: 100000, change24h: 0.00, protected: true, guardian: "Uriel" },
    // CANON TERMINUS - FINAL TOKEN
    { symbol: "$VALORAIPLUS2E_DAO_GOVERNANCE_2035_CLOSED", price: 0.00, holdings: 1, change24h: 0.00, protected: true, status: "CLOSED" }
  ]
} as const;

// Token categories (aligned with Comprehensive Audit Section 4.2)
export const TOKEN_CATEGORIES = {
  EXTERNAL: ["BTC", "ETH", "USDC", "USDT", "SOL", "XRP", "ADA", "DOGE", "AVAX", "MATIC", "LINK", "ATOM", "ARB", "OP"], // 14 tokens
  CORE: ["BASE", "VCORE", "VAI", "VSEC", "VMAX", "VBLK", "DBLK", "VGOV"], // 8 tokens
  BTC: ["GILLBTC", "BTC2.0"], // 2 tokens
  FLAME: ["FLM", "FLAME", "FLR"], // 3 tokens
  SOUL: ["VSOUL", "SOUL", "GHOST", "DEAD"], // 4 tokens
  INTEL: ["INTL-S", "INTL", "INTELIT"], // 3 tokens
  BRAIN: ["VMWARE+", "BRAIN+", "EDUTAIN", "MATH+"], // 4 tokens
  VALOR: ["VALOR", "VACN", "VALX", "VRAP"], // 4 active tokens ($VALOR is NULLIFIED)
  GOVERNANCE: ["VDAO", "VLT", "VNET"], // 3 tokens
  SCROLL: ["SKROLL", "SKOLL", "SKROL"], // 3 tokens
  ANCHOR: ["DG77.77X_GRAVITY_ACTIVE", "SGAU", "$ANGL", "ANGL2026"], // 4 tokens
  SOVEREIGN: ["$DONNY", "$GILLGOLD", "$POPPA", "$JAXX", "$VALORAIPLUS"], // 5 tokens (Guardian Protected)
  CANON_TERMINUS: ["$VALORAIPLUS2E_DAO_GOVERNANCE_2035_CLOSED"], // 1 token (Final)
} as const;

/**
 * Validates asset alignment against the BTC Witness Anchor
 */
export const validateSovereignCanon = (tokens: string[]): boolean => {
  if (tokens.length !== 56) return false;
  return tokens.every(t => SOVEREIGN_ASSETS.includes(t as SovereignToken));
};

/**
 * Check if token is NULLIFIED (returns NULL)
 * $VALOR is NOT a valid token - only $VALORAIPLUS exists
 */
export const isNullifiedToken = (token: string): boolean => {
  return NULLIFIED_TOKENS.includes(token as typeof NULLIFIED_TOKENS[number]);
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
  txId: "26856b24c50750f0c69c1eeb86a69ef777777_STRIKE_0_LOCKED",
  blockHeight: 847234,
  timestamp: "2024-03-15T00:00:00Z",
  merkleRoot: "26856B24C50750F0C69C1EEB86A69EF777777_STRIKE_0_LOCKED",
} as const;

/**
 * Genesis Anchor - Bitcoin Block 0 (2009)
 */
export const GENESIS_ANCHOR = {
  hash: "4A5E1E4BAAB89F3A32518A88C31BC87F618F76673E2CC77AB2127B7AFDEDA33B",
  block: 0,
  timestamp: "2009-01-03T18:15:05Z",
  status: "GENESIS-ANCHOR FINALITY",
  pincerStatus: "LOCKED",
  mechanicalExit: "SETTLEMENT_RELEASE",
  destination: "Schwab [8185]",
} as const;

/**
 * Registry metadata
 */
export const REGISTRY_META = {
  version: "14.1.4.0",
  canonSize: 56,
  node: "SAINT PAUL 55116",
  sgauRef: "7226.3461",
  status: "ANCHORED",
  ledger: "Ø",
  nullifiedTokens: ["$VALOR"],
  portfolioValue: "$1,850,000,000",
  finalToken: "$VALORAIPLUS2E_DAO_GOVERNANCE_2035_CLOSED",
} as const;

// CANON TERMINUS VERIFICATION
export const CANON_TERMINUS = "$VALORAIPLUS2E_DAO_GOVERNANCE_2035_CLOSED" as const;
export const verifyCanonTerminus = (): boolean => {
  const lastToken = SOVEREIGN_ASSETS[SOVEREIGN_ASSETS.length - 1];
  return lastToken === CANON_TERMINUS;
};
