/**
 * VALORAIPLUS® TOKEN MANIFEST VALIDATOR
 * Blocks release if:
 *   - invalid token address
 *   - wrong factory source
 *   - duplicate token
 *   - missing symbol / name
 *   - active token not tied to active factory
 *
 * Pending tokens (pendingVerification) are reported as warnings, not failures.
 */

import { FACTORY_ADDRESS } from "../lib/auth/factory";
import { TOKEN_MANIFEST } from "../lib/tokens/manifest";

type TokenManifestViolationType =
  | "INVALID_TOKEN_ADDRESS"
  | "INVALID_FACTORY_SOURCE"
  | "DUPLICATE_TOKEN"
  | "MISSING_METADATA"
  | "UNAUTHORIZED_ACTIVE_TOKEN";

interface TokenManifestViolation {
  type: TokenManifestViolationType;
  target: string;
  recommendation: string;
}

const ETH_ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/;

function validateTokenManifest(): TokenManifestViolation[] {
  const violations: TokenManifestViolation[] = [];
  const seenAddresses = new Set<string>();

  for (const token of TOKEN_MANIFEST) {
    // Skip pending tokens — address is intentionally empty
    if (token.status === "pendingVerification" || token.status === "deprecated") continue;

    const normalizedAddress = token.address.toLowerCase();

    // Address validity
    if (!ETH_ADDRESS_REGEX.test(token.address)) {
      violations.push({
        type: "INVALID_TOKEN_ADDRESS",
        target: token.symbol,
        recommendation: `Invalid token address: ${token.address}`,
      });
    }

    // Duplicate detection
    if (seenAddresses.has(normalizedAddress)) {
      violations.push({
        type: "DUPLICATE_TOKEN",
        target: token.symbol,
        recommendation: `Duplicate token address detected: ${token.address}`,
      });
    }
    seenAddresses.add(normalizedAddress);

    // Required metadata
    if (!token.symbol?.trim() || !token.name?.trim()) {
      violations.push({
        type: "MISSING_METADATA",
        target: token.address,
        recommendation: "Token must include symbol and name.",
      });
    }

    // Factory source enforcement
    if (token.sourceFactory.toLowerCase() !== FACTORY_ADDRESS.toLowerCase()) {
      violations.push({
        type: "INVALID_FACTORY_SOURCE",
        target: token.symbol,
        recommendation: `Expected source factory ${FACTORY_ADDRESS}, got ${token.sourceFactory}`,
      });
    }

    // Active token gate
    if (
      token.status === "active" &&
      token.sourceFactory.toLowerCase() !== FACTORY_ADDRESS.toLowerCase()
    ) {
      violations.push({
        type: "UNAUTHORIZED_ACTIVE_TOKEN",
        target: token.symbol,
        recommendation: "Active tokens must originate from the active factory.",
      });
    }
  }

  return violations;
}

const pending   = TOKEN_MANIFEST.filter((t) => t.status === "pendingVerification");
const active    = TOKEN_MANIFEST.filter((t) => t.status === "active");
const violations = validateTokenManifest();

console.log(`Factory:  ${FACTORY_ADDRESS}`);
console.log(`Active:   ${active.length}`);
console.log(`Pending:  ${pending.length} (LAMINAR_FLUSH_FORCE — not blocking)`);
if (pending.length > 0) {
  console.log(`  -> ${pending.map((t) => t.symbol).join(", ")}`);
}

if (violations.length > 0) {
  console.error("\nToken manifest validation FAILED:\n");
  for (const v of violations) {
    console.error(`  [${v.type}] ${v.target}`);
    console.error(`  -> ${v.recommendation}\n`);
  }
  process.exit(1);
}

console.log("\nToken manifest validation: PASS");
process.exit(0);
