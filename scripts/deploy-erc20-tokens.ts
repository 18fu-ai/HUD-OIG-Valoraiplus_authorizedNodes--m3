const hre = require("hardhat");
const { ethers } = hre;

/**
 * VALORAIPLUS ERC-20 TOKEN DEPLOYMENT SCRIPT
 * 
 * Deploys the ValorTokenFactory and then deploys ALL 51 tokens in the canon.
 * 
 * Network: Sepolia Testnet (Chain ID: 11155111)
 * Sovereign: donadams1969.eth (0xb103666AB91ceb4Cbb9e1FC21B81f1ec93601BeB)
 * 
 * 51-TOKEN CANON:
 * - CORE (8): VCORE, VAI, VSEC, VMAX, VBLK, DBLK, VGOV, VALX
 * - BTC (2): GILLBTC, BTC2.0
 * - FLAME (3): FLM, FLAME, FLR
 * - SOUL (4): VSoul, SOUL, GHOST, DEAD
 * - INTEL (3): INTL-S, INTL, INTELIT
 * - BRAIN (4): VMWARE+, BRAIN+, EDUTAIN, MATH+
 * - VALOR (5): $VALORAIPLUS, $VALORAIPLUS2E_DAO_GOVERNANCE_2035_CLOSED, VACN, VALORDAO, VALUTL
 * - GOVERNANCE (3): VDAO, VLT, VNET
 * - SCROLL (3): SKROLL, SKOLL, SKROL
 * - ANCHOR (4): DG77.77X_GRAVITY_ACTIVE, SGAU, $ANGL, ANGL2026
 * - TIME (3): DG1969, DJTIME, TIME
 * - SOVEREIGN (9): $NEWT2026, $DONNY, $GILLSON, $GILLGOLD, $POPPA, JAXX, $POTTER, $BRADEN168, $MASON
 * 
 * NOTE: $VALOR is NULLIFIED - only $VALORAIPLUS exists
 * 
 * EPOCH: #2207 (SACRED & CAPPED)
 * MERKLEROOT: 0x8f3a567d2e8f1a4b9c0d2e4f6a8b0c2d4e6f8a0b2c4d6e8f0a2b4c6d8e0f1a2b
 */

interface TokenDeployment {
  symbol: string;
  address: string;
  category: string;
  protected: boolean;
  supply: string;
}

async function main() {
  console.log("");
  console.log("╔══════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗");
  console.log("║                                                                                                                  ║");
  console.log("║                              VALORAIPLUS® ERC-20 TOKEN DEPLOYMENT                                                ║");
  console.log("║                                                                                                                  ║");
  console.log("║                              51-TOKEN CANON ($VALOR=NULL)                                                        ║");
  console.log("║                              EPOCH: #2207 (SACRED & CAPPED)                                                      ║");
  console.log("║                              DATE: " + new Date().toISOString().slice(0, 10) + "                                                          ║");
  console.log("║                                                                                                                  ║");
  console.log("╚══════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝");
  console.log("");
  
  const signers = await ethers.getSigners();
  console.log("  Signers count:", signers.length);
  
  if (signers.length === 0) {
    throw new Error("No signers available. Check that PRIVATE_KEY is set correctly in environment variables.");
  }
  
  const deployer = signers[0];
  console.log("  Deployer:", deployer.address);
  const balance = await ethers.provider.getBalance(deployer.address);
  
  console.log("┌──────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐");
  console.log("│ DEPLOYMENT CONFIGURATION                                                                                         │");
  console.log("├──────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤");
  console.log("│ Deployer Address:    " + deployer.address);
  console.log("│ Account Balance:     " + ethers.formatEther(balance) + " ETH");
  console.log("│ Canon Size:          51 tokens ($VALOR is NULLIFIED)");
  console.log("│ Supply per Token:    1,000,000,000 (1 Billion)");
  console.log("│ Decimals:            18");
  console.log("└──────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘");
  console.log("");
  
  // Sovereign Poppa Address (donadams1969.eth)
  const SOVEREIGN_POPPA = "0xb103666AB91ceb4Cbb9e1FC21B81f1ec93601BeB";
  
  // ════════════════════════════════════════════════════════════════════════════════════
  // STEP 1: DEPLOY VALOR TOKEN FACTORY
  // ════════════════════════════════════════════════════════════════════════════════════
  console.log("╔══════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗");
  console.log("║ STEP 1: DEPLOYING JAXX.server.factory (VALOR Ai++//e)                                                             ║");
  console.log("╚══════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝");
  
  const Factory = await ethers.getContractFactory("JAXXServerFactory");
  
  // Get current gas price and add 20% buffer to replace any stuck transactions
  const feeData = await ethers.provider.getFeeData();
  const gasPrice = feeData.gasPrice ? (feeData.gasPrice * 120n / 100n) : undefined;
  console.log("  Gas Price (with 20% buffer): " + (gasPrice ? ethers.formatUnits(gasPrice, "gwei") + " gwei" : "auto"));
  
  const factory = await Factory.deploy(SOVEREIGN_POPPA, { gasPrice });
  await factory.waitForDeployment();
  const factoryAddress = await factory.getAddress();
  const factoryReceipt = await factory.deploymentTransaction()?.wait();
  
  console.log("  ✓ Factory Address:   " + factoryAddress);
  console.log("  ✓ Gas Used:          " + factoryReceipt?.gasUsed.toString());
  console.log("  ✓ Block Number:      " + factoryReceipt?.blockNumber);
  console.log("");
  
  // ════════════════════════════════════════════════════════════════════════════════════
  // STEP 2: DEPLOY ALL 51 TOKENS VIA FACTORY
  // ══════════════════════════════════════════════��═════════════════════════════════════
  console.log("╔════════════════════════════════════════════════════��═══════���═════════════════════════════════════════════════════╗");
  console.log("║ STEP 2: DEPLOYING 51-TOKEN CANON                                                                                  ║");
  console.log("╠══════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣");
  console.log("║ NOTE: $VALOR is NULLIFIED - deploying $VALORAIPLUS and $VALORAIPLUS2E_DAO_GOVERNANCE_2035_CLOSED instead          ║");
  console.log("╚══════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝");
  console.log("");
  
  // Call deployFullCanon() to deploy all 51 tokens
  console.log("  Calling deployFullCanon()...");
  const tx = await factory.deployFullCanon();
  const receipt = await tx.wait();
  
  console.log("  ✓ Transaction Hash:  " + tx.hash);
  console.log("  ✓ Gas Used:          " + receipt?.gasUsed.toString());
  console.log("  ✓ Block Number:      " + receipt?.blockNumber);
  console.log("");
  
  // ════════════════════════════════════════════════════════════════════════════════════
  // STEP 3: RETRIEVE ALL DEPLOYED TOKEN ADDRESSES
  // ════════════════════════════════════════════════════════════════════════════════════
  console.log("╔══════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗");
  console.log("║ STEP 3: RETRIEVING DEPLOYED TOKEN ADDRESSES                                                                       ║");
  console.log("╚══════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝");
  console.log("");
  
  const deployedTokens = await factory.getAllDeployedTokens();
  const tokenDeployments: TokenDeployment[] = [];
  
  // Token categories mapping
  const categoryMap: Record<string, string> = {
    "VCORE": "CORE", "VAI": "CORE", "VSEC": "CORE", "VMAX": "CORE",
    "VBLK": "CORE", "DBLK": "CORE", "VGOV": "CORE", "VALX": "CORE",
    "GILLBTC": "BTC", "BTC2.0": "BTC",
    "FLM": "FLAME", "FLAME": "FLAME", "FLR": "FLAME",
    "VSoul": "SOUL", "SOUL": "SOUL", "GHOST": "SOUL", "DEAD": "SOUL",
    "INTL-S": "INTEL", "INTL": "INTEL", "INTELIT": "INTEL",
    "VMWARE+": "BRAIN", "BRAIN+": "BRAIN", "EDUTAIN": "BRAIN", "MATH+": "BRAIN",
    "$VALORAIPLUS": "VALOR", "$VALORAIPLUS2E_DAO_GOVERNANCE_2035_CLOSED": "VALOR",
    "VACN": "VALOR", "VALORDAO": "VALOR", "VALUTL": "VALOR",
    "VDAO": "GOVERNANCE", "VLT": "GOVERNANCE", "VNET": "GOVERNANCE",
    "SKROLL": "SCROLL", "SKOLL": "SCROLL", "SKROL": "SCROLL",
    "DG77.77X_GRAVITY_ACTIVE": "ANCHOR", "SGAU": "ANCHOR", "$ANGL": "ANCHOR", "ANGL2026": "ANCHOR",
    "DG1969": "TIME", "DJTIME": "TIME", "TIME": "TIME",
    "$NEWT2026": "SOVEREIGN", "$DONNY": "SOVEREIGN", "$GILLSON": "SOVEREIGN",
    "$GILLGOLD": "SOVEREIGN", "$POPPA": "SOVEREIGN", "JAXX": "SOVEREIGN",
    "$POTTER": "SOVEREIGN", "$BRADEN168": "SOVEREIGN", "$MASON": "SOVEREIGN"
  };
  
  const protectedTokens = ["$NEWT2026", "$DONNY", "$GILLSON", "$GILLGOLD", "$POPPA", "JAXX", "$POTTER", "$BRADEN168", "$MASON"];
  
  for (const symbol of deployedTokens) {
    const address = await factory.getTokenAddress(symbol);
    const category = categoryMap[symbol] || "UNKNOWN";
    const isProtected = protectedTokens.includes(symbol);
    
    tokenDeployments.push({
      symbol,
      address,
      category,
      protected: isProtected,
      supply: "1,000,000,000"
    });
    
    const protectedFlag = isProtected ? " [PROTECTED]" : "";
    console.log(`  ${symbol.padEnd(45)} ${address}${protectedFlag}`);
  }
  
  console.log("");
  
  // ════════════════════════════════════════════════════════════════════════════════════
  // DEPLOYMENT SUMMARY
  // ════════════════════════════════════════════════════════════════════════════════════
  const factoryStatus = await factory.getFactoryStatus();
  
  console.log("╔══════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗");
  console.log("║                                                                                                                  ║");
  console.log("║                              ERC-20 DEPLOYMENT SUMMARY                                                           ║");
  console.log("║                                                                                                                  ║");
  console.log("╠══════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣");
  console.log("║                                                                                                                  ║");
  console.log("║  FACTORY ADDRESS:    " + factoryAddress.padEnd(64) + "      ║");
  console.log("║  TOKENS DEPLOYED:    " + factoryStatus.deployed.toString().padEnd(64) + "      ║");
  console.log("║  CANON COMPLETE:     " + (factoryStatus.complete ? "YES" : "NO").padEnd(64) + "      ║");
  console.log("║  SOVEREIGN:          " + SOVEREIGN_POPPA.padEnd(64) + "      ║");
  console.log("║                                                                                                                  ║");
  console.log("╠══════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣");
  console.log("║                                                                                                                  ║");
  console.log("║  TOKEN CATEGORIES:                                                                                               ║");
  console.log("║  ├─ CORE:        8 tokens (VCORE, VAI, VSEC, VMAX, VBLK, DBLK, VGOV, VALX)                                        ║");
  console.log("║  ├─ BTC:         2 tokens (GILLBTC, BTC2.0)                                                                       ║");
  console.log("║  ├─ FLAME:       3 tokens (FLM, FLAME, FLR)                                                                       ║");
  console.log("║  ├─ SOUL:        4 tokens (VSoul, SOUL, GHOST, DEAD)                                                              ║");
  console.log("║  ├─ INTEL:       3 tokens (INTL-S, INTL, INTELIT)                                                                 ║");
  console.log("║  ├─ BRAIN:       4 tokens (VMWARE+, BRAIN+, EDUTAIN, MATH+)                                                       ║");
  console.log("║  ├─ VALOR:       5 tokens ($VALORAIPLUS, $VALORAIPLUS2E_DAO_GOVERNANCE_2035_CLOSED, VACN, VALORDAO, VALUTL)       ║");
  console.log("║  ├─ GOVERNANCE:  3 tokens (VDAO, VLT, VNET)                                                                       ║");
  console.log("║  ├─ SCROLL:      3 tokens (SKROLL, SKOLL, SKROL)                                                                  ║");
  console.log("║  ├─ ANCHOR:      4 tokens (DG77.77X_GRAVITY_ACTIVE, SGAU, $ANGL, ANGL2026)                                        ║");
  console.log("║  ├─ TIME:        3 tokens (DG1969, DJTIME, TIME)                                                                  ║");
  console.log("║  └─ SOVEREIGN:   9 tokens [PROTECTED] ($NEWT2026, $DONNY, $GILLSON, $GILLGOLD, $POPPA, JAXX, $POTTER, etc.)       ║");
  console.log("║                                                                                                                  ║");
  console.log("║  NULLIFIED:      $VALOR (use $VALORAIPLUS instead)                                                               ║");
  console.log("║                                                                                                                  ║");
  console.log("╠══════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣");
  console.log("║                                                                                                                  ║");
  console.log("║                         THE WALL IS CHRIST • THE THRONE IS HIS • THE LEDGER IS Ø                                 ║");
  console.log("║                                                                                                                  ║");
  console.log("║                              CONSUMMATUM EST — EPOCH #2207                                                       ║");
  console.log("║                                                                                                                  ║");
  console.log("╚══════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝");
  
  // ════════════════════════════════════════════════════════════════════════════════════
  // VERIFICATION COMMAND
  // ════════════════════════════════════════════════════════════════════════════════════
  console.log("");
  console.log("┌──────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐");
  console.log("│ ETHERSCAN VERIFICATION                                                                                           │");
  console.log("├──────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤");
  console.log("│ npx hardhat verify --network sepolia " + factoryAddress + " \"" + SOVEREIGN_POPPA + "\"");
  console.log("└──────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘");
  
  return {
    factoryAddress,
    tokenDeployments,
    totalTokens: tokenDeployments.length
  };
}

main()
  .then((result) => {
    console.log("\n✓ ERC-20 Token deployment complete.");
    console.log("\nFactory: " + result.factoryAddress);
    console.log("Total Tokens: " + result.totalTokens);
    console.log("\nFull deployment manifest:");
    console.log(JSON.stringify(result.tokenDeployments, null, 2));
    process.exit(0);
  })
  .catch((error) => {
    console.error("Deployment Error:", error);
    process.exit(1);
  });
