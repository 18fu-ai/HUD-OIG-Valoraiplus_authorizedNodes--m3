/**
 * VALORAIPLUS® TOKEN MANIFEST VALIDATION
 * Validates deployment-manifest-base.json schema and completeness
 */

import fs from "fs";

const MANIFEST_PATH  = "./deployment-manifest-base.json";
const REQUIRED_KEYS  = ["factory", "network", "chainId", "tokens"] as const;
const NULL_ADDRESS   = "0x0000000000000000000000000000000000000000";

interface TokenEntry {
  symbol: string;
  name: string;
  address: string;
  status: "deployed" | "failed" | "pending";
  txHash?: string;
}

interface Manifest {
  factory?: string;
  network?: string;
  chainId?: number;
  tokens?: TokenEntry[];
}

function main() {
  if (!fs.existsSync(MANIFEST_PATH)) {
    console.error("FAIL: Manifest not found at " + MANIFEST_PATH);
    process.exit(1);
  }

  let manifest: Manifest;
  try {
    manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8")) as Manifest;
  } catch (e) {
    console.error("FAIL: Manifest is not valid JSON:", (e as Error).message);
    process.exit(1);
  }

  // Check top-level keys
  const missing = REQUIRED_KEYS.filter((k) => manifest[k] === undefined);
  if (missing.length > 0) {
    console.error("FAIL: Manifest missing keys:", missing.join(", "));
    process.exit(1);
  }

  // Validate factory address
  if (!manifest.factory?.startsWith("0x") || manifest.factory.length !== 42) {
    console.error("FAIL: Invalid factory address:", manifest.factory);
    process.exit(1);
  }
  console.log("Factory:  " + manifest.factory);
  console.log("Network:  " + manifest.network + " (chainId " + manifest.chainId + ")");

  const tokens = manifest.tokens ?? [];
  const deployed  = tokens.filter((t) => t.status === "deployed" && t.address !== NULL_ADDRESS);
  const failed    = tokens.filter((t) => t.status === "failed");
  const pending   = tokens.filter((t) => t.status === "pending" || !t.address || t.address === NULL_ADDRESS);

  // Check for duplicate addresses
  const addresses = deployed.map((t) => t.address.toLowerCase());
  const dupes = addresses.filter((a, i) => addresses.indexOf(a) !== i);
  if (dupes.length > 0) {
    console.error("FAIL: Duplicate token addresses detected:", dupes);
    process.exit(1);
  }

  // Report
  console.log("\nToken summary:");
  console.log("  Deployed : " + deployed.length);
  console.log("  Failed   : " + failed.length + (failed.length > 0 ? " (" + failed.map((t) => t.symbol).join(", ") + ")" : ""));
  console.log("  Pending  : " + pending.length);
  console.log("  Total    : " + tokens.length);

  console.log("\nToken manifest validation: PASS");
}

main();
