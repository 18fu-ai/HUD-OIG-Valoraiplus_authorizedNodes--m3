/**
 * VALORAIPLUS REMAINING TOKEN DEPLOYMENT
 * Deploy 9 failed tokens with reconciled nonces
 * MODE: LAMINAR_FLUSH_FORCE
 * 
 * Requires: DEPLOYER_PRIVATE_KEY env var with funded wallet
 */

import { ethers } from "ethers";
import { BASE_FACTORY_ADDRESS, DEPLOYER_ADDRESS } from "../lib/auth/anchors";

const BASE_RPC = process.env.BASE_RPC_URL || "https://mainnet.base.org";

// 9 Failed tokens from first deployment
const FAILED_TOKENS = [
  { name: "DONNY 2207", symbol: "DONNY2207", category: "DYNASTY", protected: true },
  { name: "LEG 1904", symbol: "LEG1904", category: "DYNASTY", protected: true },
  { name: "VALORAI PLUS 2E", symbol: "VALORAIPLUS2E", category: "VALOR", protected: true },
  { name: "Valor Credit", symbol: "VCRD", category: "DEFI", protected: false },
  { name: "JAXX Core", symbol: "JAXX", category: "CORE", protected: true },
  { name: "Valor NFT", symbol: "VNFT", category: "NFT", protected: false },
  { name: "Valor Social", symbol: "VSOC", category: "SOCIAL", protected: false },
  { name: "Valor Commerce", symbol: "VCOM", category: "ENTERPRISE", protected: false },
  { name: "Valor Acceleration", symbol: "VACN", category: "UTILITY", protected: false },
];

// 1 trillion tokens per deployment
const SUPPLY = ethers.parseEther("1000000000000");

// Minimal factory ABI for deployToken
const FACTORY_ABI = [
  "function deployToken(string name, string symbol, uint256 initialSupply, string category, bool isProtected) external returns (address)",
  "event TokenDeployed(address indexed tokenAddress, string name, string symbol, uint256 initialSupply, string category, bool isProtected)"
];

interface DeployResult {
  symbol: string;
  address: string;
  txHash: string;
  status: string;
  gasUsed?: string;
}

async function main() {
  console.log("=".repeat(60));
  console.log("VALORAIPLUS REMAINING TOKEN DEPLOYMENT");
  console.log("Mode: LAMINAR_FLUSH_FORCE");
  console.log("Target: 9 Failed Tokens");
  console.log("Network: Base Mainnet (8453)");
  console.log("=".repeat(60));

  // Check for private key
  const privateKey = process.env.DEPLOYER_PRIVATE_KEY;
  if (!privateKey) {
    console.log("\nERROR: DEPLOYER_PRIVATE_KEY not set");
    console.log("Set this environment variable with the deployer wallet private key.");
    console.log(`Expected deployer address: ${DEPLOYER_ADDRESS}`);
    console.log("\nTo set temporarily:");
    console.log("  export DEPLOYER_PRIVATE_KEY=0x...");
    console.log("  npm run nonce:reconcile");
    process.exit(1);
  }

  // Connect to Base Mainnet
  const provider = new ethers.JsonRpcProvider(BASE_RPC);
  const wallet = new ethers.Wallet(privateKey, provider);

  // Verify wallet matches expected deployer
  if (wallet.address.toLowerCase() !== DEPLOYER_ADDRESS.toLowerCase()) {
    console.log("\nWARNING: Wallet address mismatch!");
    console.log(`  Expected: ${DEPLOYER_ADDRESS}`);
    console.log(`  Got:      ${wallet.address}`);
    console.log("Proceeding anyway - ensure this is intentional.");
  }

  console.log("\nDeployer:", wallet.address);

  // Check balance
  const balance = await provider.getBalance(wallet.address);
  const balanceEth = parseFloat(ethers.formatEther(balance));
  console.log("Balance:", balanceEth.toFixed(6), "ETH");

  // Estimate minimum required (rough: 0.0003 ETH per token * 9 = 0.0027 ETH)
  const MIN_BALANCE = 0.003;
  if (balanceEth < MIN_BALANCE) {
    console.log(`\nERROR: Insufficient balance`);
    console.log(`  Required: ~${MIN_BALANCE} ETH`);
    console.log(`  Available: ${balanceEth.toFixed(6)} ETH`);
    console.log(`\nFund wallet ${wallet.address} with at least ${MIN_BALANCE} ETH on Base Mainnet`);
    process.exit(1);
  }

  // Connect to factory
  const factory = new ethers.Contract(BASE_FACTORY_ADDRESS, FACTORY_ABI, wallet);
  console.log("\nFactory:", BASE_FACTORY_ADDRESS);

  // Verify factory has code
  const factoryCode = await provider.getCode(BASE_FACTORY_ADDRESS);
  if (factoryCode === "0x") {
    console.log("\nERROR: Factory contract not found at address");
    process.exit(1);
  }
  console.log("Factory bytecode:", factoryCode.length, "chars (LIVE)");

  const results: DeployResult[] = [];

  console.log("\n" + "-".repeat(60));
  console.log("DEPLOYING TOKENS");
  console.log("-".repeat(60));

  for (let i = 0; i < FAILED_TOKENS.length; i++) {
    const token = FAILED_TOKENS[i];
    console.log(`\n[${i + 1}/${FAILED_TOKENS.length}] Deploying ${token.symbol}...`);

    try {
      // Get current nonce and gas price
      const nonce = await wallet.getNonce();
      const feeData = await provider.getFeeData();
      
      // Add 50% buffer to gas price for faster confirmation
      const gasPrice = feeData.gasPrice 
        ? (feeData.gasPrice * 150n) / 100n 
        : undefined;

      console.log(`  Nonce: ${nonce}`);
      if (gasPrice) {
        console.log(`  Gas Price: ${ethers.formatUnits(gasPrice, "gwei")} gwei`);
      }

      // Deploy token
      const tx = await factory.deployToken(
        token.name,
        token.symbol,
        SUPPLY,
        token.category,
        token.protected,
        { nonce, gasPrice }
      );

      console.log(`  TX Hash: ${tx.hash}`);
      console.log(`  Waiting for confirmation...`);

      const receipt = await tx.wait();

      // Parse TokenDeployed event to get address
      let tokenAddress = "UNKNOWN";
      for (const log of receipt.logs) {
        try {
          const parsed = factory.interface.parseLog({
            topics: log.topics as string[],
            data: log.data,
          });
          if (parsed?.name === "TokenDeployed") {
            tokenAddress = parsed.args[0];
            break;
          }
        } catch {
          // Not our event, skip
        }
      }

      console.log(`  Token Address: ${tokenAddress}`);
      console.log(`  Gas Used: ${receipt.gasUsed.toString()}`);
      console.log(`  Block: ${receipt.blockNumber}`);
      console.log(`  Status: SUCCESS`);

      results.push({
        symbol: token.symbol,
        address: tokenAddress,
        txHash: tx.hash,
        status: "SUCCESS",
        gasUsed: receipt.gasUsed.toString(),
      });

      // 3 second delay between deployments to avoid nonce issues
      if (i < FAILED_TOKENS.length - 1) {
        console.log(`  Waiting 3s before next deployment...`);
        await new Promise((resolve) => setTimeout(resolve, 3000));
      }

    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.log(`  Status: FAILED`);
      console.log(`  Error: ${errorMessage.slice(0, 200)}`);

      results.push({
        symbol: token.symbol,
        address: "",
        txHash: "",
        status: "FAILED: " + errorMessage.slice(0, 100),
      });
    }
  }

  // Summary
  console.log("\n" + "=".repeat(60));
  console.log("DEPLOYMENT SUMMARY");
  console.log("=".repeat(60));

  const successful = results.filter((r) => r.status === "SUCCESS");
  const failed = results.filter((r) => r.status !== "SUCCESS");

  console.log(`\nSuccessful: ${successful.length}/${FAILED_TOKENS.length}`);
  console.log(`Failed: ${failed.length}/${FAILED_TOKENS.length}`);

  if (successful.length > 0) {
    console.log("\nDeployed Tokens:");
    for (const result of successful) {
      console.log(`  ${result.symbol}: ${result.address}`);
    }
  }

  if (failed.length > 0) {
    console.log("\nFailed Tokens:");
    for (const result of failed) {
      console.log(`  ${result.symbol}: ${result.status}`);
    }
  }

  // Final balance
  const finalBalance = await provider.getBalance(wallet.address);
  const spent = balanceEth - parseFloat(ethers.formatEther(finalBalance));
  console.log(`\nFinal Balance: ${ethers.formatEther(finalBalance)} ETH`);
  console.log(`Total Spent: ${spent.toFixed(6)} ETH`);

  // Output JSON for manifest update
  if (successful.length > 0) {
    console.log("\n" + "-".repeat(60));
    console.log("MANIFEST UPDATE (copy to deployment-manifest-base.json):");
    console.log("-".repeat(60));
    for (const result of successful) {
      const token = FAILED_TOKENS.find((t) => t.symbol === result.symbol);
      console.log(JSON.stringify({
        symbol: result.symbol,
        name: token?.name,
        address: result.address,
        category: token?.category,
        status: "deployed",
      }));
    }
  }

  // Exit code based on results
  if (failed.length === 0) {
    console.log("\n51-TOKEN CANON COMPLETE");
    process.exit(0);
  } else if (successful.length > 0) {
    console.log("\nPartial success - some tokens deployed");
    process.exit(0);
  } else {
    console.log("\nAll deployments failed");
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
