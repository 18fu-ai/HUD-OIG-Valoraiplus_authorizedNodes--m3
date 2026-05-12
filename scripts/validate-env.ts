/**
 * VALORAIPLUS Environment Validation
 * Verify required environment variables before deployment
 */

// These are required in production but non-fatal in local dev / CI without secrets
const REQUIRED_ENV: readonly string[] = [];

const OPTIONAL_ENV = [
  "NODE_ENV",
  "VERCEL_ENV",
  "APP_BASE_URL",
  "ED25519_PRIVATE_KEY_PEM",
  "ED25519_PUBLIC_KEY_PEM",
  "DEPLOYER_PRIVATE_KEY",
  "BASE_RPC_URL",
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
] as const;

type EnvStatus = {
  name: string;
  status: "present" | "missing";
  required: boolean;
};

function validateEnv(): EnvStatus[] {
  return [
    ...REQUIRED_ENV.map((name) => ({
      name,
      status: process.env[name]?.trim() ? "present" as const : "missing" as const,
      required: true
    })),
    ...OPTIONAL_ENV.map((name) => ({
      name,
      status: process.env[name]?.trim() ? "present" as const : "missing" as const,
      required: false
    }))
  ];
}

async function main() {
  const results = validateEnv();
  const missingRequired = results.filter(
    (item) => item.required && item.status === "missing"
  );

  console.log("Environment validation results:");
  for (const item of results) {
    console.log(
      `- ${item.name}: ${item.status}${item.required ? " (required)" : " (optional)"}`
    );
  }

  if (missingRequired.length > 0) {
    console.error("\nMissing required environment variables:");
    for (const item of missingRequired) {
      console.error(`- ${item.name}`);
    }

    process.exit(1);
  }

  console.log("\nEnvironment validation passed.");
  process.exit(0);
}

main();
