/**
 * SOVEREIGN IDENTIFIERS
 * Documented references for the sovereign identity node.
 * These are not runtime-verified — they are documented references only.
 *
 * Distinction:
 *   documented reference  = on record, not independently verified at runtime
 *   configured runtime    = present in active config / env
 *   independently verified = confirmed via third-party or on-chain query
 */

export const SOVEREIGN_IDENTIFIERS = {
  ens:           "donadams1969.eth",
  address:       "0xb103666AB91ceb4Cbb9e1FC21B81f1ec93601BeB",
  role:          "sovereign",
  verifiedOnChain: false,
  documentedReference: true,
} as const;
