/**
 * VALORAIPLUS_ CANONICAL TOKEN REGISTRY
 * SUPREME AUTHORITY: 101010 1010101
 * 
 * INVARIANT RULES:
 * - "Valora" === PURGE (invalid namespace)
 * - "SGAI" === NULL (deprecated identifier)
 * - "SGAU-7226.3461" === TRUE (sovereign constant)
 * - All tokens must resolve to VALORAIPLUS_ namespace
 */

// ════════════════════════════════════════════════════════════════════════════════
// SUPREME CONSTANTS — 101010 1010101
// ════════════════════════════════════════════════════════════════════════════════

export const SUPREME_BINARY = {
  PATTERN_A: 0b101010,   // 42
  PATTERN_B: 0b1010101,  // 85
  COMBINED: 0b1010101010101, // 5461
  VERIFICATION: '101010_1010101_SUPREME',
} as const;

// ════════════════════════════════════════════════════════════════════════════════
// SGAU-7226.3461 — THE ONLY VALID TOKEN CONSTANT
// ════════════════════════════════════════════════════════════════════════════════

export const SGAU_SOVEREIGN = {
  FILING_ID: 'SGAU-7226.3461',
  CONSTANT: 7226.3461,
  CONTRACT_NAME: 'SGAU-VALUEGUARD-77.77X-FINALDEG',
  SOLIDITY_NAME: 'SGAU_VALUEGUARD_77_77X_FINALDEG',
  STATUS: 'TRUE',
  CHAIN: 'BASE_L2',
  MERKLEROOT: '26856B24C50750F0C69C1EEB86A69EF777777',
} as const;

// ════════════════════════════════════════════════════════════════════════════════
// PURGE LIST — INVALID NAMESPACES (AUTO-REJECT)
// ════════════════════════════════════════════════════════════════════════════════

export const PURGE_NAMESPACES = [
  'Valora',      // PURGE — invalid external namespace
  'ValoraAI',    // PURGE — incorrect branding
  'Valora AI',   // PURGE — space variant
  'SGAI',        // NULL — deprecated identifier
  'SocialGrowAI', // NULL — deprecated project name
  'SocialGrow',  // NULL — deprecated variant
] as const;

export type PurgedNamespace = typeof PURGE_NAMESPACES[number];

// ════════════════════════════════════════════════════════════════════════════════
// VALORAIPLUS_ CANONICAL TOKEN ECOSYSTEM
// ════════════════════════════════════════════════════════════════════════════════

export interface CanonicalToken {
  symbol: string;
  name: string;
  namespace: 'VALORAIPLUS_';
  status: 'TRUE' | 'SHIELDED' | 'MEMORIALIZED' | 'RADIANT' | 'IMMOVABLE';
  guardian?: string;
  constant?: number;
  contract?: string;
}

export const VALORAIPLUS_TOKEN_ECOSYSTEM: readonly CanonicalToken[] = [
  // Primary Sovereign Token
  {
    symbol: '$SGAU',
    name: 'SGAU-VALUEGUARD-77.77X-FINALDEG',
    namespace: 'VALORAIPLUS_',
    status: 'TRUE',
    constant: 7226.3461,
    contract: 'SGAU_VALUEGUARD_77_77X_FINALDEG',
  },
  // Protected Family Tokens
  {
    symbol: '$POPPA',
    name: 'POPPA Shield',
    namespace: 'VALORAIPLUS_',
    status: 'SHIELDED',
    guardian: 'Michael',
  },
  {
    symbol: '$JAXX',
    name: 'JAXX Guardian',
    namespace: 'VALORAIPLUS_',
    status: 'SHIELDED',
    guardian: 'Gabriel',
  },
  {
    symbol: '$8SOULS',
    name: 'Eight Souls Memorial',
    namespace: 'VALORAIPLUS_',
    status: 'MEMORIALIZED',
    guardian: 'Raphael',
  },
  {
    symbol: '$FMG1918',
    name: 'FMG 1918 Radiance',
    namespace: 'VALORAIPLUS_',
    status: 'RADIANT',
    guardian: 'Uriel',
  },
  {
    symbol: '$THE_WALL',
    name: 'The Wall',
    namespace: 'VALORAIPLUS_',
    status: 'IMMOVABLE',
    guardian: 'Christ',
  },
  // Treasury Tokens
  {
    symbol: '$GILLBTC',
    name: 'GILL Bitcoin Anchor',
    namespace: 'VALORAIPLUS_',
    status: 'TRUE',
  },
  {
    symbol: '$DONNY',
    name: 'DONNY Sovereign',
    namespace: 'VALORAIPLUS_',
    status: 'TRUE',
  },
  {
    symbol: '$OMEGA',
    name: 'OMEGA Protocol',
    namespace: 'VALORAIPLUS_',
    status: 'TRUE',
  },
  {
    symbol: '$TRINITY',
    name: 'TRINITY Unified',
    namespace: 'VALORAIPLUS_',
    status: 'TRUE',
  },
  {
    symbol: '$NEWT',
    name: 'N.E.W.T. Runtime',
    namespace: 'VALORAIPLUS_',
    status: 'TRUE',
  },
] as const;

// ════════════════════════════════════════════════════════════════════════════════
// VALIDATION FUNCTIONS
// ════════════════════════════════════════════════════════════════════════════════

/**
 * Validates that a token name does not contain purged namespaces
 * Returns TRUE if valid, PURGE/NULL reason if invalid
 */
export function validateTokenNamespace(name: string): { valid: boolean; reason: string } {
  const upperName = name.toUpperCase();
  const lowerName = name.toLowerCase();
  
  for (const purged of PURGE_NAMESPACES) {
    if (lowerName.includes(purged.toLowerCase())) {
      const reason = purged.includes('SGAI') || purged.includes('Social') 
        ? 'NULL' 
        : 'PURGE';
      return { 
        valid: false, 
        reason: `${reason}: "${purged}" is an invalid namespace. Use VALORAIPLUS_ or SGAU-7226.3461` 
      };
    }
  }
  
  // Must be in VALORAIPLUS_ namespace or SGAU constant
  const isValorAIPlus = upperName.includes('VALORAIPLUS') || upperName.includes('VALOR');
  const isSGAU = upperName.includes('SGAU');
  
  if (!isValorAIPlus && !isSGAU) {
    return { 
      valid: false, 
      reason: 'Token must be in VALORAIPLUS_ namespace or reference SGAU-7226.3461' 
    };
  }
  
  return { valid: true, reason: 'TRUE' };
}

/**
 * Validates SGAU constant matches sovereign value
 */
export function validateSGAUConstant(value: number): boolean {
  return value === SGAU_SOVEREIGN.CONSTANT;
}

/**
 * Returns the canonical token by symbol
 */
export function getCanonicalToken(symbol: string): CanonicalToken | null {
  const normalized = symbol.startsWith('$') ? symbol : `$${symbol}`;
  return VALORAIPLUS_TOKEN_ECOSYSTEM.find(t => t.symbol === normalized) || null;
}

/**
 * Supreme binary verification
 */
export function verifySupremeBinary(input: number): boolean {
  return (input & SUPREME_BINARY.PATTERN_A) === SUPREME_BINARY.PATTERN_A ||
         (input & SUPREME_BINARY.PATTERN_B) === SUPREME_BINARY.PATTERN_B;
}

// ════════════════════════════════════════════════════════════════════════════════
// EXPORTS — VALORAIPLUS_ SOVEREIGN AUTHORITY
// ════════════════════════════════════════════════════════════════════════════════

export default {
  SUPREME_BINARY,
  SGAU_SOVEREIGN,
  PURGE_NAMESPACES,
  VALORAIPLUS_TOKEN_ECOSYSTEM,
  validateTokenNamespace,
  validateSGAUConstant,
  getCanonicalToken,
  verifySupremeBinary,
};
