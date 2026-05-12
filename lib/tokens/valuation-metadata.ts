/**
 * TOKEN VALUATION METADATA
 * Internal estimates only — NOT independently verified.
 *
 * Production Rule:
 *   These values are internal estimates for review purposes.
 *   They are explicitly NOT independently verified observations.
 *   Do not use these values as the basis for financial decisions.
 */

export interface TokenValuationEntry {
  symbol: string;
  internalEstimate: string;
  basis: "internal-estimate";
  independentlyVerified: false;
  reviewerNote: string;
}

export const TOKEN_VALUATION_METADATA: TokenValuationEntry[] = [
  {
    symbol: "GILLSON2207",
    internalEstimate: "sovereign-floor",
    basis: "internal-estimate",
    independentlyVerified: false,
    reviewerNote: "Designated sovereign floor token. Value is a documented reference, not a market observation.",
  },
  {
    symbol: "SGAU",
    internalEstimate: "77.77x-multiplier-anchor",
    basis: "internal-estimate",
    independentlyVerified: false,
    reviewerNote: "Designated anchor multiplier. Value is an internal estimate, not an independently verified figure.",
  },
  {
    symbol: "VALORAIPLUS",
    internalEstimate: "core-operating-system",
    basis: "internal-estimate",
    independentlyVerified: false,
    reviewerNote: "Primary protocol token. Valuation basis is internal designation, not market-derived.",
  },
  {
    symbol: "POPPA",
    internalEstimate: "sovereign-identity",
    basis: "internal-estimate",
    independentlyVerified: false,
    reviewerNote: "Sovereign identity token. Valuation is a documented reference for review purposes.",
  },
  {
    symbol: "DEG1969",
    internalEstimate: "sovereign-birth-block",
    basis: "internal-estimate",
    independentlyVerified: false,
    reviewerNote: "Sovereign birth block anchor. Valuation is a documented reference, not market-verified.",
  },
];
