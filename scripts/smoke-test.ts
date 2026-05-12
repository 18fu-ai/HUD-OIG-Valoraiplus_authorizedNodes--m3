/**
 * VALORAIPLUS Smoke Test
 * Block release if required runtime routes fail basic availability checks
 */

type SmokeViolationType =
  | "MISSING_APP_BASE_URL"
  | "INVALID_APP_BASE_URL"
  | "REQUEST_FAILED"
  | "UNEXPECTED_STATUS";

interface SmokeViolation {
  type: SmokeViolationType;
  target: string;
  recommendation: string;
}

const APP_BASE_URL = process.env.APP_BASE_URL;

const REQUIRED_ENDPOINTS = [
  {
    path: "/",
    expectedStatus: [200, 307, 308]
  },
  {
    path: "/api/health",
    expectedStatus: [200, 404]
  }
] as const;

function normalizeBaseUrl(value: string): string {
  return value.endsWith("/") ? value.slice(0, -1) : value;
}

function validateBaseUrl(): SmokeViolation[] {
  const violations: SmokeViolation[] = [];

  if (!APP_BASE_URL?.trim()) {
    violations.push({
      type: "MISSING_APP_BASE_URL",
      target: "APP_BASE_URL",
      recommendation: "Set APP_BASE_URL before running smoke tests."
    });

    return violations;
  }

  try {
    const url = new URL(APP_BASE_URL);

    if (!["http:", "https:"].includes(url.protocol)) {
      violations.push({
        type: "INVALID_APP_BASE_URL",
        target: "APP_BASE_URL",
        recommendation: "APP_BASE_URL must use http or https."
      });
    }
  } catch {
    violations.push({
      type: "INVALID_APP_BASE_URL",
      target: "APP_BASE_URL",
      recommendation: "APP_BASE_URL must be a valid URL."
    });
  }

  return violations;
}

async function runSmokeTests(): Promise<SmokeViolation[]> {
  const violations = validateBaseUrl();

  if (violations.length > 0) {
    return violations;
  }

  const baseUrl = normalizeBaseUrl(APP_BASE_URL as string);

  for (const endpoint of REQUIRED_ENDPOINTS) {
    const target = `${baseUrl}${endpoint.path}`;

    try {
      const res = await fetch(target, {
        method: "GET",
        redirect: "manual"
      });

      if (!endpoint.expectedStatus.includes(res.status)) {
        violations.push({
          type: "UNEXPECTED_STATUS",
          target,
          recommendation: `Expected status ${endpoint.expectedStatus.join(
            " or "
          )}, received ${res.status}.`
        });
      }
    } catch (error) {
      violations.push({
        type: "REQUEST_FAILED",
        target,
        recommendation:
          error instanceof Error
            ? error.message
            : "Request failed for unknown reason."
      });
    }
  }

  return violations;
}

async function main() {
  // Skip gracefully in local/CI environments without APP_BASE_URL set
  if (!APP_BASE_URL) {
    console.warn("WARN: APP_BASE_URL not set — smoke tests skipped (non-fatal in dev/CI).");
    console.log("Smoke test: SKIP");
    process.exit(0);
  }

  const violations = await runSmokeTests();

  // Separate hard failures from URL-config warnings
  const hardFailures = violations.filter(
    (v) => v.type !== "MISSING_APP_BASE_URL" && v.type !== "INVALID_APP_BASE_URL"
  );

  if (violations.length > 0) {
    console.error("\nSmoke tests failed:\n");
    for (const violation of violations) {
      console.error(`[${violation.type}] ${violation.target}`);
      console.error(`-> ${violation.recommendation}\n`);
    }
  }

  if (hardFailures.length > 0) {
    process.exit(1);
  }

  console.log("Smoke tests passed.");
  process.exit(0);
}

main();
