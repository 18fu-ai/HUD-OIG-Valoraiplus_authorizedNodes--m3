const { ethers } = require("hardhat");

const FACTORY_ADDRESS = "0x7fAA2FA0b1388b2c8696475d0e08F54F36818FD1";

const FACTORY_ABI = [
  "function getAllDeployedTokens() view returns (string[])",
  "function getTokenAddress(string symbol) view returns (address)",
  "function getFactoryStatus() view returns (uint256 deployed, bool complete)",
  "function sovereignAddress() view returns (address)"
];

async function main() {
  console.log("=== JAXX.server.factory TOKEN QUERY ===");
  console.log("Factory:", FACTORY_ADDRESS);
  console.log("");
  
  const factory = new ethers.Contract(FACTORY_ADDRESS, FACTORY_ABI, ethers.provider);
  
  // Get factory status
  const status = await factory.getFactoryStatus();
  console.log("Tokens Deployed:", status.deployed.toString());
  console.log("Canon Complete:", status.complete);
  console.log("");
  
  // Get all deployed tokens
  const symbols = await factory.getAllDeployedTokens();
  console.log("Deployed Token Symbols:", symbols.length);
  console.log("");
  
  const tokens: { symbol: string; address: string }[] = [];
  
  for (const symbol of symbols) {
    const address = await factory.getTokenAddress(symbol);
    tokens.push({ symbol, address });
    console.log(`${symbol}: ${address}`);
  }
  
  // Save to file
  const fs = require("fs");
  const manifest = {
    factory: FACTORY_ADDRESS,
    network: "base",
    chainId: 8453,
    deployer: "0x50FB4a7da28ACaDbD452949508A32726aD6E36C0",
    sovereign: "0xb103666AB91ceb4Cbb9e1FC21B81f1ec93601BeB",
    timestamp: new Date().toISOString(),
    sync: "34D // $GILLSON2207",
    tokensDeployed: status.deployed.toString(),
    canonComplete: status.complete,
    tokens
  };
  
  fs.writeFileSync("deployment-manifest-base-v2.json", JSON.stringify(manifest, null, 2));
  console.log("\nManifest saved to deployment-manifest-base-v2.json");
  
  return manifest;
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
