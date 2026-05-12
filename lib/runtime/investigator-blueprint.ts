/**
 * INVESTIGATOR BLUEPRINT
 * Review order and verification checklist for CRD / investigator survivability.
 *
 * Production Rule:
 *   Distinguish documented references, runtime configuration, and internal estimates.
 *   Never conflate configured runtime with independently verified observations.
 */

export const INVESTIGATOR_BLUEPRINT = {
  reviewOrder: [
    "documentedReferences",
    "manifestSummary",
    "configuredRuntime",
    "valuationMetadata",
  ],

  verifyTerminalAnchors: [
    "Confirm factory address matches 0x7fAA2FA0b1388b2c8696475d0e08F54F36818FD1",
    "Confirm mainnet anchor matches 0x50FB4a7da28ACaDbD452949508A32726aD6E36C0",
    "Confirm sovereign identity references are documented, not runtime-verified",
  ],

  evaluateManifest: [
    "Review active token manifest (42 entries)",
    "Confirm all active entries reference factory 0x7fAA...",
    "Exclude pendingVerification entries from active count",
    "Note: 9 tokens pending LAMINAR_FLUSH_FORCE nonce reconciliation",
  ],

  deploymentReview: [
    "Review release gate status (7/7 checks)",
    "Review runtime validation (configured)",
    "Confirm deployment stability on Base Mainnet (chain 8453)",
  ],

  evidencePosture: {
    documentedReference:   true,
    runtimeConfiguration:  true,
    independentlyVerified: false,
  },

  reviewerRule:
    "Distinguish documented references, runtime configuration, and internal estimates. " +
    "Runtime configuration and internal estimates are not independently verified observations.",

  crdSentence:
    "This package provides documented runtime references, configured verification " +
    "workflows, and token manifest alignment for review purposes. Runtime configuration " +
    "and internal estimates are distinguished from independently verified observations.",
} as const;
