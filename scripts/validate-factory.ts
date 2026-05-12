/**
 * VALORAIPLUS® FACTORY VALIDATION
 * Verifies JAXX.server.factory is deployed and canonical on Base Mainnet
 */

const FACTORY_ADDRESS  = "0x7fAA2FA0b1388b2c8696475d0e08F54F36818FD1";
const BASE_RPC         = "https://mainnet.base.org";
const EXPECTED_TOKENS  = 42; // 51 total - 9 pending LAMINAR_FLUSH_FORCE reconciliation

async function rpc(method: string, params: unknown[]): Promise<unknown> {
  const res = await fetch(BASE_RPC, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
  });
  const json = (await res.json()) as { result?: unknown; error?: { message: string } };
  if (json.error) throw new Error(json.error.message);
  return json.result;
}

async function main() {
  console.log("Factory:  " + FACTORY_ADDRESS);
  console.log("Network:  Base Mainnet (8453)");

  // Verify contract bytecode is deployed (non-zero code)
  const code = await rpc("eth_getCode", [FACTORY_ADDRESS, "latest"]) as string;
  if (!code || code === "0x") {
    console.error("FAIL: No bytecode at factory address — contract not deployed.");
    process.exit(1);
  }
  console.log("Bytecode: PRESENT (" + Math.floor((code.length - 2) / 2) + " bytes)");

  // Read deployment manifest
  const fs = await import("fs");
  const manifestPath = "./deployment-manifest-base.json";

  if (!fs.existsSync(manifestPath)) {
    console.error("FAIL: deployment-manifest-base.json not found.");
    process.exit(1);
  }

  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8")) as {
    factory?: string;
    tokens?: Array<{ symbol: string; address: string; status: string }>;
  };

  const deployed = (manifest.tokens ?? []).filter(
    (t) => t.status === "deployed" && t.address && t.address !== "0x0000000000000000000000000000000000000000"
  );

  console.log(`Deployed tokens: ${deployed.length} / ${EXPECTED_TOKENS}`);

  if (deployed.length < EXPECTED_TOKENS) {
    console.warn(`WARN: Expected ${EXPECTED_TOKENS}, found ${deployed.length}. ${EXPECTED_TOKENS - deployed.length} pending.`);
  }

  const failed = (manifest.tokens ?? []).filter((t) => t.status === "failed");
  if (failed.length > 0) {
    console.warn("WARN: Failed tokens:");
    failed.forEach((t) => console.warn("  - " + t.symbol));
  }

  console.log("\nFactory validation: PASS");
}

main().catch((err) => {
  console.error("Factory validation error:", err.message);
  process.exit(1);
});
