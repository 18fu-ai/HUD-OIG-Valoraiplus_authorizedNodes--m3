/**
 * VALORAIPLUS® OMEGA — EX-05 FORENSIC EXPORT
 * Version: 13.2.0-OMEGA
 *
 * Generates a real, investigator-ready JSON archive bound to
 * the on-chain manifest. Every value is derived from code —
 * nothing is fabricated or hardcoded outside of canonical sources.
 *
 * Run: npm run finalize:ex05
 * Output: exports/EX-05_FINAL_MANIFEST.json
 */

import fs from "fs";
import path from "path";
import { createHash } from "crypto";
import { getEX05Report } from "../lib/audit/ex-05";
import { getActiveTokenManifest, getPendingTokenManifest } from "../lib/tokens/manifest";

function deriveIntegrityHash(payload: string): string {
  return "0x" + createHash("sha256").update(payload).digest("hex");
}

async function finalizeEX05() {
  console.log("[finalize-ex05] Starting EX-05 forensic export...");

  const report    = getEX05Report();
  const active    = getActiveTokenManifest();
  const pending   = getPendingTokenManifest();

  // Build the full package — all values sourced from canonical modules
  const forensicPackage = {
    header: {
      exhibitId:           report.exhibitId,
      title:               report.title,
      manifestVersion:     report.integrityAnchors.manifestVersion,
      reconciliationDate:  report.integrityAnchors.reconciliationDate,
      generatedAt:         report.generatedAt,
      node:                report.integrityAnchors.node,
      syncSignature:       report.integrityAnchors.syncSignature,
      posture:             report.compliance.posture,
    },

    integrityAnchors: {
      factory:    report.integrityAnchors.factory,
      sovereign:  report.integrityAnchors.sovereign,
      deployer:   report.integrityAnchors.deployer,
    },

    compliance: {
      auditScore:       report.compliance.auditScore,
      totalTokensCanon: report.compliance.totalTokensCanon,
      activeTokens:     active.length,
      pendingTokens:    pending.length,
      intakeDate:       report.compliance.intakeDate,
    },

    investigatorPosture: report.investigatorPosture,

    activeTokens: active.map((t) => ({
      symbol:        t.symbol,
      name:          t.name,
      address:       t.address,
      category:      t.category,
      status:        t.status,
      sourceFactory: t.sourceFactory,
    })),

    pendingTokens: pending.map((t) => ({
      symbol:   t.symbol,
      name:     t.name,
      category: t.category,
      status:   t.status,
      note:     "Pending deployment — awaiting ETH in deployer wallet for gas",
    })),
  };

  // Derive a real integrity hash from the actual package content
  const packageJson   = JSON.stringify(forensicPackage, null, 2);
  const integrityHash = deriveIntegrityHash(packageJson);

  const finalOutput = {
    ...forensicPackage,
    integrityHash,
    integrityHashAlgorithm: "SHA-256 (derived from package content)",
  };

  // Write to exports/
  const outDir  = path.resolve(__dirname, "../exports");
  const outPath = path.join(outDir, "EX-05_FINAL_MANIFEST.json");

  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(finalOutput, null, 2), "utf8");

  console.log("[finalize-ex05] EX-05 package written to:", outPath);
  console.log("[finalize-ex05] Integrity Hash:", integrityHash);
  console.log(`[finalize-ex05] Active tokens: ${active.length} | Pending: ${pending.length}`);
  console.log("[finalize-ex05] Audit Score:", report.compliance.auditScore);
  console.log("[finalize-ex05] Done.");

  process.exit(0);
}

finalizeEX05().catch((err) => {
  console.error("[finalize-ex05] Error:", err);
  process.exit(1);
});
