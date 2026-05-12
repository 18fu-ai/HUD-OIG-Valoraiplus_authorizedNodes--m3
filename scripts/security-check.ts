/**
 * VALORAIPLUS Security Check
 * Block release if required security headers or deployment controls are missing
 */

import fs from "node:fs";
import path from "node:path";

type SecurityViolationType =
  | "MISSING_VERCEL_CONFIG"
  | "MISSING_HEADER"
  | "WEAK_HEADER"
  | "INVALID_REGION"
  | "INVALID_FRAME_POLICY";

interface SecurityViolation {
  type: SecurityViolationType;
  target: string;
  recommendation: string;
}

const VERCEL_CONFIG_PATH = path.join(process.cwd(), "vercel.json");

const REQUIRED_HEADERS = {
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload"
} as const;

function loadVercelConfig(): Record<string, unknown> | null {
  if (!fs.existsSync(VERCEL_CONFIG_PATH)) {
    return null;
  }

  const raw = fs.readFileSync(VERCEL_CONFIG_PATH, "utf8");
  return JSON.parse(raw);
}

function validateSecurityConfig(): SecurityViolation[] {
  const violations: SecurityViolation[] = [];
  const config = loadVercelConfig();

  if (!config) {
    return [
      {
        type: "MISSING_VERCEL_CONFIG",
        target: "vercel.json",
        recommendation: "Add vercel.json with required security headers."
      }
    ];
  }

  const regions = config.regions as string[] | undefined;
  if (!Array.isArray(regions) || !regions.includes("iad1")) {
    violations.push({
      type: "INVALID_REGION",
      target: "regions",
      recommendation: "Set regions to include iad1 or update approved deployment region policy."
    });
  }

  const headerGroups = config.headers as Array<{ source?: string; headers?: Array<{ key: string; value: string }> }> | undefined;
  const headerEntries = headerGroups?.flatMap((entry) => entry.headers ?? []) ?? [];

  const headerMap = new Map<string, string>(
    headerEntries.map((header) => [header.key, header.value])
  );

  for (const [key, expectedValue] of Object.entries(REQUIRED_HEADERS)) {
    const actualValue = headerMap.get(key);

    if (!actualValue) {
      violations.push({
        type: "MISSING_HEADER",
        target: key,
        recommendation: `Add ${key}: ${expectedValue}`
      });

      continue;
    }

    if (actualValue !== expectedValue) {
      violations.push({
        type: "WEAK_HEADER",
        target: key,
        recommendation: `Expected '${expectedValue}', received '${actualValue}'.`
      });
    }
  }

  if (headerMap.get("X-Frame-Options") !== "DENY") {
    violations.push({
      type: "INVALID_FRAME_POLICY",
      target: "X-Frame-Options",
      recommendation: "Use DENY to prevent framing."
    });
  }

  return violations;
}

async function main() {
  const violations = validateSecurityConfig();

  if (violations.length > 0) {
    console.error("\nSecurity validation failed:\n");

    for (const violation of violations) {
      console.error(`[${violation.type}] ${violation.target}`);
      console.error(`-> ${violation.recommendation}\n`);
    }

    process.exit(1);
  }

  console.log("Security validation passed.");
  process.exit(0);
}

main();
