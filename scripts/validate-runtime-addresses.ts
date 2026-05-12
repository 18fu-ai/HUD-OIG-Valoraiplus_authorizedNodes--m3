/**
 * VALORAIPLUS® RUNTIME ADDRESS VALIDATION
 * Confirms all key contract addresses resolve to live bytecode on Base Mainnet
 */

const BASE_RPC = "https://mainnet.base.org";

const RUNTIME_ADDRESSES: Record<string, string> = {
  "JAXX.server.factory":  "0x7fAA2FA0b1388b2c8696475d0e08F54F36818FD1",
  "$VALORAIPLUS":         "0x70943DEac156Ee8715e450ac15197A00212f1420",
  "$GILLSON2207":         "0xc28e8d0F978a1341a7cA56600b50C2f4763C7865",
  "$VCORE":               "0xC20610545cc936cEF4eD884ae034bD6514322d40",
  "$SGAU":                "0x374366eE057d6eef3ffF91877CC131896CfA8C7B",
  "$POPPA":               "0xCFD95eC167EaAC35D4055b1416E2Ab668EB87213",
  "$VGOV":                "0x27f9e880F91E1f3b94Dc059caE2AaB28719F9f31",
};

async function getCode(address: string): Promise<string> {
  const res = await fetch(BASE_RPC, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0", id: 1,
      method: "eth_getCode",
      params: [address, "latest"],
    }),
  });
  const json = (await res.json()) as { result?: string };
  return json.result ?? "0x";
}

async function main() {
  let failures = 0;
  console.log("Checking " + Object.keys(RUNTIME_ADDRESSES).length + " runtime addresses on Base Mainnet...\n");

  for (const [label, address] of Object.entries(RUNTIME_ADDRESSES)) {
    const code = await getCode(address);
    const ok = code && code !== "0x" && code.length > 4;
    const bytes = ok ? Math.floor((code.length - 2) / 2) : 0;
    const status = ok ? "LIVE  " : "DEAD  ";
    console.log(`${status} ${label.padEnd(26)} ${address}${ok ? "  (" + bytes + " bytes)" : "  *** NO BYTECODE ***"}`);
    if (!ok) failures++;
  }

  console.log("\n" + (failures === 0 ? "Runtime address validation: PASS" : `Runtime address validation: FAIL (${failures} dead)`));
  if (failures > 0) process.exit(1);
}

main().catch((err) => {
  console.error("Runtime address validation error:", err.message);
  process.exit(1);
});
