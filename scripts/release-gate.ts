import { execFileSync } from "node:child_process";

const CHECKS = [
  ["Environment validation",       "npm", ["run", "validate:env"]],
  ["Ontology validation",          "npm", ["run", "validate:ontology"]],
  ["Factory validation",           "npm", ["run", "validate:factory"]],
  ["Runtime address validation",   "npm", ["run", "validate:runtime-addresses"]],
  ["Token manifest validation",    "npm", ["run", "validate:token-manifest"]],
  ["Security check",               "npm", ["run", "security:check"]],
  ["Database readiness",           "npm", ["run", "db:readiness"]],
  ["Build",                        "npm", ["run", "build"]],
  ["Smoke test",                   "npm", ["run", "smoke:test"]],
] as const;

for (const [label, command, args] of CHECKS) {
  console.log(`\n=== ${label} ===`);
  try {
    execFileSync(command, [...args], { stdio: "inherit" });
  } catch {
    console.error(`\nRelease gate failed: ${label}`);
    process.exit(1);
  }
}

console.log("\nRelease gate passed.");
process.exit(0);
