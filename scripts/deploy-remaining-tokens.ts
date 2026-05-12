/**
 * VALORAIPLUS REMAINING TOKEN DEPLOYMENT
 * Deploy 9 failed tokens with reconciled nonces
 * MODE: LAMINAR_FLUSH_FORCE
 */

const { ethers } = require("hardhat");

const FACTORY_ADDRESS = "0x7fAA2FA0b1388b2c8696475d0e08F54F36818FD1";

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

const FACTORY_ABI = [
  "function deployToken(string name, string symbol, uint256 initialSupply, string category, bool isProtected) external returns (address)",
  "function getDeployedTokens() external view returns (address[])",
  "function canonComplete() external view returns (bool)",
  "event TokenDeployed(address indexed tokenAddress, string name, string symbol, uint256 initialSupply, string category, bool isProtected)"
];

async function main() {
  console.log("=".repeat(60));
  console.log("VALORAIPLUS REMAINING TOKEN DEPLOYMENT");
  console.log("Mode: LAMINAR_FLUSH_FORCE");
  console.log("Target: 9 Failed Tokens");
  console.log("=".repeat(60));
  
  const [deployer] = await ethers.getSigners();
  console.log("\nDeployer:", deployer.address);
  
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Balance:", ethers.formatEther(balance), "ETH");
  
  const factory = new ethers.Contract(FACTORY_ADDRESS, FACTORY_ABI, deployer);
  console.log("\nFactory:", FACTORY_ADDRESS);
  
  // Check current state
  const currentTokens = await factory.getDeployedTokens();
  console.log("Current deployed tokens:", currentTokens.length);
  
  const results: { symbol: string; address: string; txHash: string; status: string }[] = [];
  
  for (let i = 0; i < FAILED_TOKENS.length; i++) {
    const token = FAILED_TOKENS[i];
    console.log(`\n[${i + 1}/${FAILED_TOKENS.length}] Deploying ${token.symbol}...`);
    
    try {
      // Get fresh nonce and gas price for each transaction
      const nonce = await deployer.getNonce();
      const feeData = await ethers.provider.getFeeData();
      const gasPrice = feeData.gasPrice ? (feeData.gasPrice * 150n / 100n) : undefined;
      
      console.log(`  Nonce: ${nonce}`);
      console.log(`  Gas Price: ${gasPrice ? ethers.formatUnits(gasPrice, "gwei") + " gwei" : "auto"}`);
      
      const tx = await factory.deployToken(
        token.name,
        token.symbol,
        SUPPLY,
        token.category,
        token.protected,
        { nonce, gasPrice }
      );
      
      console.log(`  TX Hash: ${tx.hash}`);
      
      const receipt = await tx.wait();
      
      // Parse TokenDeployed event
      const event = receipt.logs.find((log: { topics: string[] }) => 
        log.topics[0] === ethers.id("TokenDeployed(address,string,string,uint256,string,bool)")
      );
      
      let tokenAddress = "0x0000000000000000000000000000000000000000";
      if (event && event.topics[1]) {
        tokenAddress = ethers.getAddress("0x" + event.topics[1].slice(26));
      }
      
      console.log(`  Token Address: ${tokenAddress}`);
      console.log(`  Gas Used: ${receipt.gasUsed.toString()}`);
      console.log(`  Status: SUCCESS`);
      
      results.push({
        symbol: token.symbol,
        address: tokenAddress,
        txHash: tx.hash,
        status: "SUCCESS"
      });
      
      // Small delay between deployments
      await new Promise(resolve => setTimeout(resolve, 2000));
      
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.log(`  Status: FAILED`);
      console.log(`  Error: ${errorMessage.slice(0, 100)}`);
      
      results.push({
        symbol: token.symbol,
        address: "0x0000000000000000000000000000000000000000",
        txHash: "",
        status: "FAILED: " + errorMessage.slice(0, 50)
      });
    }
  }
  
  // Summary
  console.log("\n" + "=".repeat(60));
  console.log("DEPLOYMENT SUMMARY");
  console.log("=".repeat(60));
  
  const successful = results.filter(r => r.status === "SUCCESS");
  const failed = results.filter(r => r.status !== "SUCCESS");
  
  console.log(`\nSuccessful: ${successful.length}`);
  console.log(`Failed: ${failed.length}`);
  
  console.log("\nDeployed Tokens:");
  for (const result of successful) {
    console.log(`  ${result.symbol}: ${result.address}`);
  }
  
  if (failed.length > 0) {
    console.log("\nFailed Tokens:");
    for (const result of failed) {
      console.log(`  ${result.symbol}: ${result.status}`);
    }
  }
  
  // Check final state
  const finalTokens = await factory.getDeployedTokens();
  const canonComplete = await factory.canonComplete();
  
  console.log(`\nTotal Deployed Tokens: ${finalTokens.length}`);
  console.log(`Canon Complete: ${canonComplete}`);
  
  const finalBalance = await ethers.provider.getBalance(deployer.address);
  console.log(`Remaining Balance: ${ethers.formatEther(finalBalance)} ETH`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
