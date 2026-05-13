const { ethers } = require("hardhat");

/**
 * JAXX.server.factory Token Batch Deployment
 * Deploys tokens individually to avoid gas limits
 * 
 * Factory Address: 0x12e2441A6406eF61Ad7e6b5D762988890597587d
 * Network: Base Mainnet
 * Sync: 34D // $GILLSON2207
 */

const FACTORY_ADDRESS = "0x7fAA2FA0b1388b2c8696475d0e08F54F36818FD1";
const SUPPLY = ethers.parseEther("1000000000"); // 1 billion tokens

// 51-Token Canon ($VALOR=NULL)
const TOKEN_CANON = [
  // CORE tokens
  { name: "Valor Core", symbol: "VCORE", category: "CORE", protected: false },
  { name: "Valor AI", symbol: "VAI", category: "CORE", protected: false },
  { name: "Valor Security", symbol: "VSEC", category: "CORE", protected: false },
  { name: "Valor Max", symbol: "VMAX", category: "CORE", protected: false },
  { name: "Valor Block", symbol: "VBLK", category: "CORE", protected: false },
  { name: "Dead Block", symbol: "DBLK", category: "CORE", protected: false },
  { name: "Valor Governance", symbol: "VGOV", category: "CORE", protected: false },
  { name: "Valor X", symbol: "VALX", category: "CORE", protected: false },
  
  // BTC tokens
  { name: "Gillson BTC", symbol: "GILLBTC", category: "BTC", protected: false },
  { name: "BTC 2.0", symbol: "BTC2.0", category: "BTC", protected: false },
  
  // FLAME tokens
  { name: "Flame", symbol: "FLAME", category: "FLAME", protected: false },
  { name: "Blue Flame", symbol: "BLUFLM", category: "FLAME", protected: false },
  
  // PROTECTED LEGACY - Gillson Dynasty
  { name: "Gillson 2207", symbol: "GILLSON2207", category: "PROTECTED", protected: true },
  { name: "Jaxx 2207", symbol: "JAXX2207", category: "PROTECTED", protected: true },
  { name: "Newt 2207", symbol: "NEWT2207", category: "PROTECTED", protected: true },
  { name: "Donny 2207", symbol: "DONNY2207", category: "PROTECTED", protected: true },
  { name: "LEG 1904", symbol: "LEG1904", category: "PROTECTED", protected: true },
  { name: "FMG 1918", symbol: "FMG1918", category: "PROTECTED", protected: true },
  { name: "DBG 1943", symbol: "DBG1943", category: "PROTECTED", protected: true },
  { name: "DEG 1969", symbol: "DEG1969", category: "PROTECTED", protected: true },
  // LEG1977 BANNED — REMOVED FROM DEPLOYMENT
  
  // STABLECOIN tokens
  { name: "SGAU Stable", symbol: "SGAU", category: "STABLECOIN", protected: false },
  { name: "Valorai Plus", symbol: "VALORAIPLUS", category: "STABLECOIN", protected: false },
  { name: "Valorai Plus 2E", symbol: "VALORAIPLUS2E", category: "STABLECOIN", protected: false },
  { name: "Valorai Plus 3E", symbol: "VALORAIPLUS3E", category: "STABLECOIN", protected: false },
  
  // UTILITY tokens
  { name: "Valor Rewards", symbol: "VREW", category: "UTILITY", protected: false },
  { name: "Valor Points", symbol: "VPNT", category: "UTILITY", protected: false },
  { name: "Valor Credit", symbol: "VCRD", category: "UTILITY", protected: false },
  
  // MEMETIC tokens
  { name: "PoppaCoin", symbol: "POPPA", category: "MEMETIC", protected: false },
  { name: "NewtCoin", symbol: "NEWT", category: "MEMETIC", protected: false },
  { name: "JaxxCoin", symbol: "JAXX", category: "MEMETIC", protected: false },
  
  // RESEARCH tokens
  { name: "Valor Research", symbol: "VRES", category: "RESEARCH", protected: false },
  { name: "Valor Data", symbol: "VDAT", category: "RESEARCH", protected: false },
  { name: "Valor Analytics", symbol: "VANA", category: "RESEARCH", protected: false },
  
  // INSTITUTIONAL tokens
  { name: "Valor Treasury", symbol: "VTRS", category: "INSTITUTIONAL", protected: false },
  { name: "Valor Reserve", symbol: "VRSV", category: "INSTITUTIONAL", protected: false },
  { name: "Valor Fund", symbol: "VFND", category: "INSTITUTIONAL", protected: false },
  
  // GAMING tokens
  { name: "Valor Gaming", symbol: "VGAM", category: "GAMING", protected: false },
  { name: "Valor NFT", symbol: "VNFT", category: "GAMING", protected: false },
  { name: "Valor Meta", symbol: "VMTA", category: "GAMING", protected: false },
  
  // DEFI tokens
  { name: "Valor Swap", symbol: "VSWP", category: "DEFI", protected: false },
  { name: "Valor Yield", symbol: "VYLD", category: "DEFI", protected: false },
  { name: "Valor Lend", symbol: "VLND", category: "DEFI", protected: false },
  
  // IDENTITY tokens
  { name: "Valor Identity", symbol: "VID", category: "IDENTITY", protected: false },
  { name: "Valor KYC", symbol: "VKYC", category: "IDENTITY", protected: false },
  
  // SOCIAL tokens
  { name: "Valor Social", symbol: "VSOC", category: "SOCIAL", protected: false },
  { name: "Valor Community", symbol: "VCOM", category: "SOCIAL", protected: false },
  
  // ENTERPRISE tokens
  { name: "Valor Enterprise", symbol: "VENT", category: "ENTERPRISE", protected: false },
  { name: "Valor Pro", symbol: "VPRO", category: "ENTERPRISE", protected: false },
  { name: "Valor Business", symbol: "VBIZ", category: "ENTERPRISE", protected: false },
];

async function main() {
  console.log("\n╔══════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗");
  console.log("║                              JAXX.server.factory BATCH TOKEN DEPLOYMENT                                          ║");
  console.log("║                              34D // $GILLSON2207 SYNC                                                            ║");
  console.log("╚══════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝\n");

  const [deployer] = await ethers.getSigners();
  const balance = await ethers.provider.getBalance(deployer.address);
  
  console.log(`Deployer: ${deployer.address}`);
  console.log(`Balance: ${ethers.formatEther(balance)} ETH`);
  console.log(`Factory: ${FACTORY_ADDRESS}`);
  console.log(`Tokens to deploy: ${TOKEN_CANON.length}\n`);

  // Get factory contract
  const factory = await ethers.getContractAt("JAXXServerFactory", FACTORY_ADDRESS);
  
  // Track deployed tokens
  const deployed: { symbol: string; address: string; tx: string }[] = [];
  const failed: { symbol: string; error: string }[] = [];
  
  // Deploy tokens one by one
  for (let i = 0; i < TOKEN_CANON.length; i++) {
    const token = TOKEN_CANON[i];
    console.log(`[${i + 1}/${TOKEN_CANON.length}] Deploying ${token.symbol}...`);
    
    try {
      // Check if already deployed
      const existingAddress = await factory.tokenAddresses(token.symbol);
      if (existingAddress !== ethers.ZeroAddress) {
        console.log(`  ✓ Already deployed at: ${existingAddress}`);
        deployed.push({ symbol: token.symbol, address: existingAddress, tx: "existing" });
        continue;
      }
      
      // Get current nonce and gas price
      const nonce = await deployer.getNonce();
      const feeData = await ethers.provider.getFeeData();
      const gasPrice = feeData.gasPrice ? (feeData.gasPrice * 150n / 100n) : undefined;
      
      // Deploy new token with explicit nonce and higher gas price
      const tx = await factory.deployToken(
        token.name,
        token.symbol,
        SUPPLY,
        token.category,
        token.protected,
        { nonce, gasPrice }
      );
      
      const receipt = await tx.wait();
      const tokenAddress = await factory.tokenAddresses(token.symbol);
      
      console.log(`  ✓ Deployed: ${tokenAddress}`);
      console.log(`  ✓ Gas: ${receipt?.gasUsed.toString()}`);
      
      deployed.push({ 
        symbol: token.symbol, 
        address: tokenAddress, 
        tx: receipt?.hash || "" 
      });
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error: any) {
      console.log(`  ✗ Failed: ${error.message?.substring(0, 100)}`);
      failed.push({ symbol: token.symbol, error: error.message });
    }
  }
  
  // Summary
  console.log("\n╔══════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗");
  console.log("║                              DEPLOYMENT SUMMARY                                                                   ║");
  console.log("╚══════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝");
  console.log(`\nSuccessfully deployed: ${deployed.length}/${TOKEN_CANON.length}`);
  console.log(`Failed: ${failed.length}\n`);
  
  if (deployed.length > 0) {
    console.log("DEPLOYED TOKENS:");
    deployed.forEach(t => console.log(`  ${t.symbol}: ${t.address}`));
  }
  
  if (failed.length > 0) {
    console.log("\nFAILED TOKENS:");
    failed.forEach(t => console.log(`  ${t.symbol}: ${t.error.substring(0, 80)}`));
  }
  
  // Save deployment manifest
  const manifest = {
    factory: FACTORY_ADDRESS,
    network: "base",
    chainId: 8453,
    deployer: deployer.address,
    timestamp: new Date().toISOString(),
    sync: "34D // $GILLSON2207",
    tokens: deployed,
    failed: failed,
  };
  
  const fs = require("fs");
  fs.writeFileSync(
    "deployment-manifest-base.json",
    JSON.stringify(manifest, null, 2)
  );
  console.log("\nManifest saved to: deployment-manifest-base.json");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
