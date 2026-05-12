/**
 * VALORAIPLUS® RUNTIME ADDRESS VALIDATION
 *
 * Confirms all key contract addresses resolve to live bytecode on Base Mainnet.
 * Address role state lives in lib/auth/runtime-address-registry — this script
 * only enforces it.
 */

import {
  getRuntimeAddressRegistry,
  getUnverifiedRuntimeReferences,
  type RuntimeAddressRecord,
} from "../lib/auth/runtime-address-registry";

const BASE_RPC = process.env.BASE_RPC_URL ?? "https://mainnet.base.org";

// Addresses that are expected to have bytecode (contracts, not EOAs)
const CONTRACT_ROLES = new Set(["baseFactory", "token", "verifier", "treasury"]);

async function getCode(address: string): Promise<string> {
  const res = await fetch(BASE_RPC, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "eth_getCode",
      params: [address, "latest"],
    }),
  });
  const json = (await res.json()) as { result?: string };
  return json.result ?? "0x";
}

async function checkRecord(record: RuntimeAddressRecord): Promise<boolean> {
  const isContract = CONTRACT_ROLES.has(record.role);

  if (!isContract) {
    // EOAs and runtime references are not expected to have bytecode
    console.log(`SKIP  ${record.label.padEnd(26)} ${record.address}  (${record.role})`);
    return true;
  }

  const code = await getCode(record.address);
  const ok = code && code !== "0x" && code.length > 4;
  const bytes = ok ? Math.floor((code.length - 2) / 2) : 0;
  const status = ok ? "LIVE  " : "DEAD  ";
  console.log(
    `${status}${record.label.padEnd(26)} ${record.address}${
      ok ? `  (${bytes} bytes)` : "  *** NO BYTECODE ***"
    }`
  );
  return ok;
}

async function main() {
  const registry = getRuntimeAddressRegistry();
  const unverified = getUnverifiedRuntimeReferences();

  console.log(
    `Checking ${registry.length} registry entries on Base Mainnet` +
      (unverified.length > 0 ? ` (${unverified.length} unverified, non-blocking)` : "") +
      "...\n"
  );

  let failures = 0;

  for (const record of registry) {
    const ok = await checkRecord(record);
    if (!ok) failures++;
  }

  if (unverified.length > 0) {
    console.log(
      `\nWARN: ${unverified.length} unverified reference(s) pending classification: ` +
        unverified.map((r) => r.label).join(", ")
    );
  }

  console.log(
    "\n" +
      (failures === 0
        ? "Runtime address validation: PASS"
        : `Runtime address validation: FAIL (${failures} dead)`)
  );

  if (failures > 0) process.exit(1);
}

main().catch((err: Error) => {
  console.error("Runtime address validation error:", err.message);
  process.exit(1);
});
