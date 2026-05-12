import {
  getPromotionStatus,
  validateGateState,
  VERIFICATION_GATES_INITIAL,
  type VerificationGates,
} from "../lib/runtime/verification-gates";

const BASE_RPC_URL = process.env.BASE_RPC_URL ?? "https://mainnet.base.org";
const FUNDING_ADDRESS = "0x50FB4a7da28ACaDbD452949508A32726aD6E36C0";

async function rpc(method: string, params: unknown[]): Promise<unknown> {
  const res = await fetch(BASE_RPC_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
  });

  if (!res.ok) throw new Error(`RPC failed: ${res.status}`);

  const json = await res.json() as { result?: unknown; error?: unknown };
  if (json.error) throw new Error(JSON.stringify(json.error));

  return json.result;
}

async function main(): Promise<void> {
  const gates: VerificationGates = VERIFICATION_GATES_INITIAL;

  // Live check 1: deployer transaction count (nonce) — if > 0, funding tx was sent
  const txCountHex = await rpc("eth_getTransactionCount", [FUNDING_ADDRESS, "latest"]) as string;
  const txCount = parseInt(txCountHex, 16);

  // Live check 2: deployer ETH balance
  const balanceHex = await rpc("eth_getBalance", [FUNDING_ADDRESS, "latest"]) as string;
  const balanceEth = (parseInt(balanceHex, 16) / 1e18).toFixed(6);

  // Derive observed gate updates from on-chain state
  const observedGates: VerificationGates = {
    ...gates,
    fundingTransaction: txCount > 0 ? "CONFIRMED" : "PREPARED",
    broadcast:          txCount > 0 ? "CONFIRMED" : "NOT_OBSERVED",
    chainConfirmation:  txCount > 0 ? "CONFIRMED" : "NOT_OBSERVED",
    // manifestReconciliation stays BLOCKED until nonce:reconcile is run
    manifestReconciliation: gates.manifestReconciliation,
  };

  const promotionStatus = getPromotionStatus(observedGates);
  const validation = validateGateState(observedGates);

  console.log("=== OBSERVER LOOP CHECK ===");
  console.log(`Timestamp:         ${new Date().toISOString()}`);
  console.log(`Address:           ${FUNDING_ADDRESS}`);
  console.log(`Balance:           ${balanceEth} ETH`);
  console.log(`Transaction count: ${txCount}`);
  console.log(`Promotion status:  ${promotionStatus}`);
  console.log(`Gate valid:        ${validation.valid}`);

  if (validation.errors.length > 0) {
    console.log("\nGate validation errors:");
    validation.errors.forEach((e) => console.log(`  - ${e}`));
  }

  console.log("\nCurrent gate state:");
  console.table(observedGates);

  console.log("\n=== PROMOTION INVARIANT ===");
  console.log("No observed hash         = no promotion");
  console.log("No confirmation          = no reconciliation");
  console.log("No reconciliation        = PROMOTION_BLOCKED");

  if (promotionStatus === "PROMOTION_BLOCKED") {
    const blockedGates = Object.entries(observedGates)
      .filter(([, v]) => v !== "CONFIRMED")
      .map(([k]) => k);
    console.log(`\nBlocked on: ${blockedGates.join(", ")}`);
    console.log("Action required: fund deployer wallet and run npm run nonce:reconcile");
  } else {
    console.log("\nAll gates CONFIRMED — run npm run nonce:reconcile to finalize.");
  }
}

main().catch((err) => {
  console.error("Observer loop failed:", err instanceof Error ? err.message : String(err));
  process.exit(1);
});
