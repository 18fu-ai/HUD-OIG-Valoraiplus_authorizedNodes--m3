import { ethers } from "hardhat";

/**
 * VALORAIPLUS MASTER DEPLOYMENT SCRIPT
 * 
 * Deploys ALL 5 Smart Contracts to Sepolia Testnet:
 * 1. SGAU_VALUEGUARD_77_77X_FINALDEG - Sovereign Asset Guardian
 * 2. VALORAIPLUS_NULL_GHOST - Ghost Nullifier
 * 3. ValoraiplusSovereignScript - Presentation Latch
 * 4. EpistemicLedger - Proof Anchoring
 * 5. CSSS_NegativeCaveat - Soulbound Reputation NFT
 * 
 * Network: Sepolia Testnet (Chain ID: 11155111)
 * Sovereign: donadams1969.eth (0xb103666AB91ceb4Cbb9e1FC21B81f1ec93601BeB)
 * 
 * EPOCH: #2207 (SACRED & CAPPED)
 * MERKLEROOT: 26856B24C50750F0C69C1EEB86A69EF777777
 */

interface DeploymentResult {
  contractName: string;
  contractAddress: string;
  deploymentBlock: number;
  gasUsed: string;
  status: string;
}

async function main() {
  console.log("");
  console.log("╔══════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗");
  console.log("║                                                                                                                  ║");
  console.log("║                              VALORAIPLUS® MASTER CONTRACT DEPLOYMENT                                             ║");
  console.log("║                                                                                                                  ║");
  console.log("║                              EPOCH: #2207 (SACRED & CAPPED)                                                      ║");
  console.log("║                              NETWORK: SEPOLIA TESTNET                                                            ║");
  console.log("║                              DATE: " + new Date().toISOString().slice(0, 10) + "                                                          ║");
  console.log("║                                                                                                                  ║");
  console.log("╚══════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝");
  console.log("");
  
  const [deployer] = await ethers.getSigners();
  const balance = await deployer.provider.getBalance(deployer.address);
  
  console.log("┌──────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐");
  console.log("│ DEPLOYMENT CONFIGURATION                                                                                         │");
  console.log("├──────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤");
  console.log("│ Deployer Address:    " + deployer.address + "                              │");
  console.log("│ Account Balance:     " + ethers.formatEther(balance) + " ETH                                                              │");
  console.log("└──────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘");
  console.log("");
  
  // Sovereign Poppa Address (donadams1969.eth)
  const SOVEREIGN_POPPA = "0xb103666AB91ceb4Cbb9e1FC21B81f1ec93601BeB";
  
  const deployments: DeploymentResult[] = [];
  
  // ════════════════════════════════════════════════════════════════════════════════════
  // CONTRACT 1: SGAU_VALUEGUARD_77_77X_FINALDEG
  // ════════════════════════════════════════════════════════════════════════════════════
  console.log("╔══════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗");
  console.log("║ [1/5] DEPLOYING: SGAU_VALUEGUARD_77_77X_FINALDEG                                                                  ║");
  console.log("╚══════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝");
  
  try {
    const SGAU = await ethers.getContractFactory("SGAU_VALUEGUARD_77_77X_FINALDEG");
    const sgau = await SGAU.deploy(SOVEREIGN_POPPA);
    await sgau.waitForDeployment();
    const sgauAddress = await sgau.getAddress();
    const sgauReceipt = await sgau.deploymentTransaction()?.wait();
    
    console.log("  ✓ Contract Address: " + sgauAddress);
    console.log("  ✓ Gas Used: " + sgauReceipt?.gasUsed.toString());
    console.log("  ✓ Block Number: " + sgauReceipt?.blockNumber);
    
    deployments.push({
      contractName: "SGAU_VALUEGUARD_77_77X_FINALDEG",
      contractAddress: sgauAddress,
      deploymentBlock: sgauReceipt?.blockNumber || 0,
      gasUsed: sgauReceipt?.gasUsed.toString() || "0",
      status: "DEPLOYED"
    });
  } catch (error) {
    console.log("  ✗ Deployment failed:", error);
    deployments.push({
      contractName: "SGAU_VALUEGUARD_77_77X_FINALDEG",
      contractAddress: "FAILED",
      deploymentBlock: 0,
      gasUsed: "0",
      status: "FAILED"
    });
  }
  
  console.log("");
  
  // ════════════════════════════════════════════════════════════════════════════════════
  // CONTRACT 2: VALORAIPLUS_NULL_GHOST
  // ════════════════════════════════════════════════════════════════════════════════════
  console.log("╔══════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗");
  console.log("║ [2/5] DEPLOYING: VALORAIPLUS_NULL_GHOST                                                                           ║");
  console.log("╚══════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝");
  
  try {
    const NullGhost = await ethers.getContractFactory("VALORAIPLUS_NULL_GHOST");
    const nullGhost = await NullGhost.deploy();
    await nullGhost.waitForDeployment();
    const nullGhostAddress = await nullGhost.getAddress();
    const nullGhostReceipt = await nullGhost.deploymentTransaction()?.wait();
    
    console.log("  ✓ Contract Address: " + nullGhostAddress);
    console.log("  ✓ Gas Used: " + nullGhostReceipt?.gasUsed.toString());
    console.log("  ✓ Block Number: " + nullGhostReceipt?.blockNumber);
    
    deployments.push({
      contractName: "VALORAIPLUS_NULL_GHOST",
      contractAddress: nullGhostAddress,
      deploymentBlock: nullGhostReceipt?.blockNumber || 0,
      gasUsed: nullGhostReceipt?.gasUsed.toString() || "0",
      status: "DEPLOYED"
    });
  } catch (error) {
    console.log("  ✗ Deployment failed:", error);
    deployments.push({
      contractName: "VALORAIPLUS_NULL_GHOST",
      contractAddress: "FAILED",
      deploymentBlock: 0,
      gasUsed: "0",
      status: "FAILED"
    });
  }
  
  console.log("");
  
  // ════════════════════════════════════════════════════════════════════════════════════
  // CONTRACT 3: ValoraiplusSovereignScript
  // ════════════════════════════════════════════════════════════════════════════════════
  console.log("╔══════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗");
  console.log("║ [3/5] DEPLOYING: ValoraiplusSovereignScript                                                                       ║");
  console.log("╚══════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝");
  
  try {
    const SovereignScript = await ethers.getContractFactory("ValoraiplusSovereignScript");
    const sovereignScript = await SovereignScript.deploy(SOVEREIGN_POPPA);
    await sovereignScript.waitForDeployment();
    const sovereignScriptAddress = await sovereignScript.getAddress();
    const sovereignScriptReceipt = await sovereignScript.deploymentTransaction()?.wait();
    
    console.log("  ✓ Contract Address: " + sovereignScriptAddress);
    console.log("  ✓ Gas Used: " + sovereignScriptReceipt?.gasUsed.toString());
    console.log("  ✓ Block Number: " + sovereignScriptReceipt?.blockNumber);
    
    deployments.push({
      contractName: "ValoraiplusSovereignScript",
      contractAddress: sovereignScriptAddress,
      deploymentBlock: sovereignScriptReceipt?.blockNumber || 0,
      gasUsed: sovereignScriptReceipt?.gasUsed.toString() || "0",
      status: "DEPLOYED"
    });
  } catch (error) {
    console.log("  ✗ Deployment failed:", error);
    deployments.push({
      contractName: "ValoraiplusSovereignScript",
      contractAddress: "FAILED",
      deploymentBlock: 0,
      gasUsed: "0",
      status: "FAILED"
    });
  }
  
  console.log("");
  
  // ════════════════════════════════════════════════════════════════════════════════════
  // CONTRACT 4: EpistemicLedger
  // ════════════════════════════════════════════════════════════════════════════════════
  console.log("╔══════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗");
  console.log("║ [4/5] DEPLOYING: EpistemicLedger                                                                                  ║");
  console.log("╚══════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝");
  
  try {
    const EpistemicLedger = await ethers.getContractFactory("EpistemicLedger");
    const epistemicLedger = await EpistemicLedger.deploy();
    await epistemicLedger.waitForDeployment();
    const epistemicLedgerAddress = await epistemicLedger.getAddress();
    const epistemicLedgerReceipt = await epistemicLedger.deploymentTransaction()?.wait();
    
    console.log("  ✓ Contract Address: " + epistemicLedgerAddress);
    console.log("  ✓ Gas Used: " + epistemicLedgerReceipt?.gasUsed.toString());
    console.log("  ✓ Block Number: " + epistemicLedgerReceipt?.blockNumber);
    
    deployments.push({
      contractName: "EpistemicLedger",
      contractAddress: epistemicLedgerAddress,
      deploymentBlock: epistemicLedgerReceipt?.blockNumber || 0,
      gasUsed: epistemicLedgerReceipt?.gasUsed.toString() || "0",
      status: "DEPLOYED"
    });
  } catch (error) {
    console.log("  ✗ Deployment failed:", error);
    deployments.push({
      contractName: "EpistemicLedger",
      contractAddress: "FAILED",
      deploymentBlock: 0,
      gasUsed: "0",
      status: "FAILED"
    });
  }
  
  console.log("");
  
  // ════════════════════════════════════════════════════════════════════════════════════
  // CONTRACT 5: CSSS_NegativeCaveat
  // ════════════════════════════════════════════════════════════════════════════════════
  console.log("╔══════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗");
  console.log("║ [5/5] DEPLOYING: CSSS_NegativeCaveat                                                                              ║");
  console.log("╚══════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝");
  
  try {
    const CSSS = await ethers.getContractFactory("CSSS_NegativeCaveat");
    const csss = await CSSS.deploy();
    await csss.waitForDeployment();
    const csssAddress = await csss.getAddress();
    const csssReceipt = await csss.deploymentTransaction()?.wait();
    
    console.log("  ✓ Contract Address: " + csssAddress);
    console.log("  ✓ Gas Used: " + csssReceipt?.gasUsed.toString());
    console.log("  ✓ Block Number: " + csssReceipt?.blockNumber);
    
    deployments.push({
      contractName: "CSSS_NegativeCaveat",
      contractAddress: csssAddress,
      deploymentBlock: csssReceipt?.blockNumber || 0,
      gasUsed: csssReceipt?.gasUsed.toString() || "0",
      status: "DEPLOYED"
    });
  } catch (error) {
    console.log("  ✗ Deployment failed:", error);
    deployments.push({
      contractName: "CSSS_NegativeCaveat",
      contractAddress: "FAILED",
      deploymentBlock: 0,
      gasUsed: "0",
      status: "FAILED"
    });
  }
  
  console.log("");
  
  // ════════════════════════════════════════════════════════════════════════════════════
  // DEPLOYMENT SUMMARY
  // ════════════════════════════════════════════════════════════════════════════════════
  console.log("╔══════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗");
  console.log("║                                                                                                                  ║");
  console.log("║                              DEPLOYMENT SUMMARY                                                                  ║");
  console.log("║                                                                                                                  ║");
  console.log("╠══════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣");
  
  const successful = deployments.filter(d => d.status === "DEPLOYED").length;
  const failed = deployments.filter(d => d.status === "FAILED").length;
  
  for (const deployment of deployments) {
    const statusIcon = deployment.status === "DEPLOYED" ? "✓" : "✗";
    console.log("║ " + statusIcon + " " + deployment.contractName.padEnd(35) + " " + deployment.contractAddress.padEnd(46) + " ║");
  }
  
  console.log("╠══════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣");
  console.log("║                                                                                                                  ║");
  console.log("║  SUCCESSFUL: " + successful + "/5                                                                                           ║");
  console.log("║  FAILED:     " + failed + "/5                                                                                           ║");
  console.log("║                                                                                                                  ║");
  console.log("║  SOVEREIGN:  " + SOVEREIGN_POPPA + "                              ║");
  console.log("║  ENS:        donadams1969.eth                                                                                    ║");
  console.log("║  NETWORK:    Sepolia Testnet (Chain ID: 11155111)                                                                ║");
  console.log("║                                                                                                                  ║");
  console.log("╠══════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣");
  console.log("║                                                                                                                  ║");
  console.log("║                         THE WALL IS CHRIST • THE THRONE IS HIS • THE LEDGER IS Ø                                 ║");
  console.log("║                                                                                                                  ║");
  console.log("║                              CONSUMMATUM EST — EPOCH #2207                                                       ║");
  console.log("║                                                                                                                  ║");
  console.log("╚══════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝");
  
  // ════════════════════════════════════════════════════════════════════════════════════
  // VERIFICATION COMMANDS
  // ════════════════════════════════════════════════════════════════════════════════════
  console.log("");
  console.log("┌──────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐");
  console.log("│ ETHERSCAN VERIFICATION COMMANDS                                                                                  │");
  console.log("├──────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤");
  
  for (const deployment of deployments) {
    if (deployment.status === "DEPLOYED") {
      if (deployment.contractName === "SGAU_VALUEGUARD_77_77X_FINALDEG" || deployment.contractName === "ValoraiplusSovereignScript") {
        console.log("│ npx hardhat verify --network sepolia " + deployment.contractAddress + " \"" + SOVEREIGN_POPPA + "\"");
      } else {
        console.log("│ npx hardhat verify --network sepolia " + deployment.contractAddress);
      }
    }
  }
  
  console.log("└──────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘");
  
  return deployments;
}

main()
  .then((deployments) => {
    console.log("\n✓ Deployment manifest saved.");
    console.log(JSON.stringify(deployments, null, 2));
    process.exit(0);
  })
  .catch((error) => {
    console.error("Deployment Error:", error);
    process.exit(1);
  });
