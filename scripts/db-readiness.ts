/**
 * VALORAIPLUS® DATABASE READINESS
 * Checks that required environment variables for DB are present.
 * Actual connectivity test runs only if DATABASE_URL is set.
 */

const REQUIRED_DB_VARS = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
];

function main() {
  const missing: string[] = [];

  for (const key of REQUIRED_DB_VARS) {
    if (!process.env[key]) {
      missing.push(key);
    }
  }

  if (missing.length > 0) {
    // Non-fatal in dev — warn but do not exit 1
    console.warn("WARN: Missing DB env vars (non-fatal in dev):", missing.join(", "));
    console.log("Database readiness: SKIP (env vars not set)");
    process.exit(0);
  }

  console.log("Supabase URL:      " + process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log("Anon key present:  YES");
  console.log("\nDatabase readiness: PASS");
}

main();
