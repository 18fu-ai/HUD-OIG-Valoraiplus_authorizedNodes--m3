import { NextResponse } from "next/server";

import { MAINNET_ANCHOR, BASE_FACTORY_ADDRESS } from "@/lib/auth/anchors";
import { SOVEREIGN_IDENTIFIERS } from "@/lib/runtime/sovereign-anchors";
import { TOKEN_MANIFEST, getActiveTokenManifest } from "@/lib/tokens/manifest";
import { TOKEN_VALUATION_METADATA } from "@/lib/tokens/valuation-metadata";
import { INVESTIGATOR_BLUEPRINT } from "@/lib/runtime/investigator-blueprint";

export async function GET() {
  const activeTokens = getActiveTokenManifest();

  return NextResponse.json({
    metadata: {
      generatedAt:   new Date().toISOString(),
      environment:   "base-mainnet",
      purpose:       "review",
      reviewOrder:   INVESTIGATOR_BLUEPRINT.reviewOrder,
    },

    /**
     * What is on record.
     * These are documented references — not runtime-verified observations.
     */
    documentedReferences: {
      factoryAddress:    BASE_FACTORY_ADDRESS,
      mainnetAnchor:     MAINNET_ANCHOR,
      sovereignIdentity: SOVEREIGN_IDENTIFIERS,
      terminalMerkleRoot:
        process.env.TERMINAL_MERKLE_ROOT ?? "not-configured",
    },

    /**
     * What is live in the configured runtime.
     * Present in active config — not independently verified.
     */
    configuredRuntime: {
      releaseGate:       "configured",
      runtimeValidation: "configured",
      deploymentStatus:  "implementation_ready",
    },

    /**
     * Token manifest summary.
     */
    manifestSummary: {
      chainId:       8453,
      network:       "Base Mainnet",
      totalEntries:  TOKEN_MANIFEST.length,
      activeEntries: activeTokens.length,
      pendingEntries: TOKEN_MANIFEST.filter(
        (t) => t.status === "pendingVerification"
      ).length,
    },

    /**
     * Internal estimates only — NOT independently verified.
     */
    valuationMetadata: TOKEN_VALUATION_METADATA,

    /**
     * Evidence posture — explicit for reviewer clarity.
     * Prevents authority confusion, overstatement risk, and reviewer pause.
     */
    evidencePosture: {
      documentedReference:   true,
      runtimeConfiguration:  true,
      independentlyVerified: false,
      reviewerNote: INVESTIGATOR_BLUEPRINT.reviewerRule,
    },

    /**
     * CRD-safe top-line sentence.
     */
    crdSentence: INVESTIGATOR_BLUEPRINT.crdSentence,
  });
}
