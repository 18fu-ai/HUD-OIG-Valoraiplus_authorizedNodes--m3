/**
 * VALORAIPLUS ERC-20 TOKEN DEPLOYMENT SCRIPT (CommonJS)
 * Deploys all 51 tokens in the VALORAIPLUS Canon
 * $VALOR is NULLIFIED - only $VALORAIPLUS exists
 */

const hre = require("hardhat");

// 51-TOKEN CANON
const TOKEN_CANON = [
  { name: "Valor Core", symbol: "VCORE", category: "CORE" },
  { name: "Valor AI", symbol: "VAI", category: "CORE" },
  { name: "Gillson BTC", symbol: "GILLBTC", category: "BTC" },
  { name: "Valor Security", symbol: "VSEC", category: "CORE" },
  { name: "Valor Max", symbol: "VMAX", category: "CORE" },
  { name: "Valor Block", symbol: "VBLK", category: "CORE" },
  { name: "Dead Block", symbol: "DBLK", category: "CORE" },
  { name: "Valor Governance", symbol: "VGOV", category: "CORE" },
  { name: "Valor X", symbol: "VALX", category: "CORE" },
  { name: "Flame", symbol: "FLM", category: "FLAME" },
  { name: "Flame Core", symbol: "FLAME", category: "FLAME" },
  { name: "Flare", symbol: "FLR", category: "FLAME" },
  { name: "Valor Soul", symbol: "VSoul", category: "SOUL" },
  { name: "Soul", symbol: "SOUL", category: "SOUL" },
  { name: "Ghost", symbol: "GHOST", category: "SOUL" },
  { name: "Dead", symbol: "DEAD", category: "SOUL" },
  { name: "Intel Secure", symbol: "INTL-S", category: "INTEL" },
  { name: "Intel", symbol: "INTL", category: "INTEL" },
  { name: "VMware Plus", symbol: "VMWARE+", category: "BRAIN" },
  { name: "Brain Plus", symbol: "BRAIN+", category: "BRAIN" },
  { name: "Edutain", symbol: "EDUTAIN", category: "BRAIN" },
  { name: "Math Plus", symbol: "MATH+", category: "BRAIN" },
  { name: "ValorAI Plus", symbol: "$VALORAIPLUS", category: "VALOR" },
  { name: "Valor ACN", symbol: "VACN", category: "VALOR" },
  { name: "Jaxx", symbol: "JAXX", category: "SOVEREIGN" },
  { name: "Valor DAO Gov", symbol: "VDAO", category: "GOVERNANCE" },
  { name: "Skroll", symbol: "SKROLL", category: "SCROLL" },
  { name: "Skoll", symbol: "SKOLL", category: "SCROLL" },
  { name: "Skrol", symbol: "SKROL", category: "SCROLL" },
  { name: "DG Gravity", symbol: "DG77.77X_GRAVITY_ACTIVE", category: "ANCHOR" },
  { name: "Vault", symbol: "VLT", category: "GOVERNANCE" },
  { name: "SGAU Token", symbol: "SGAU", category: "ANCHOR" },
  { name: "Angel", symbol: "$ANGL", category: "ANCHOR" },
  { name: "Angel 2026", symbol: "ANGL2026", category: "ANCHOR" },
  { name: "BTC 2.0", symbol: "BTC2.0", category: "BTC" },
  { name: "Intelit", symbol: "INTELIT", category: "INTEL" },
  { name: "Valor DAO", symbol: "VALORDAO", category: "VALOR" },
  { name: "Valor Net", symbol: "VNET", category: "GOVERNANCE" },
  { name: "Valor Utility", symbol: "VALUTL", category: "VALOR" },
  { name: "DG 1969", symbol: "DG1969", category: "TIME" },
  { name: "DJ Time", symbol: "DJTIME", category: "TIME" },
  { name: "Time", symbol: "TIME", category: "TIME" },
  { name: "Newt 2026", symbol: "$NEWT2026", category: "SOVEREIGN" },
  { name: "Donny", symbol: "$DONNY", category: "SOVEREIGN" },
  { name: "Gillson", symbol: "$GILLSON", category: "SOVEREIGN" },
  { name: "Gillson Gold", symbol: "$GILLGOLD", category: "SOVEREIGN" },
  { name: "Poppa", symbol: "$POPPA", category: "SOVEREIGN" },
  { name: "Potter", symbol: "$POTTER", category: "SOVEREIGN" },
  { name: "Braden 168", symbol: "$BRADEN168", category: "SOVEREIGN" },
  { name: "Mason", symbol: "$MASON", category: "SOVEREIGN" },
  { name: "ValorAI Plus DAO 2035", symbol: "$VALORAIPLUS2E_DAO_GOVERNANCE_2035_CLOSED", category: "VALOR" },
];

const SUPPLY = "1000000000000000000000000000"; // 1 Billion with 18 decimals
const SOVEREIGN_WALLET = "0xb103666AB91ceb4Cbb9e1FC21B81f1ec93601BeB";

async function main() {
  console.log("═══════════════════════════════════════════════════════════════");
  console.log("VALORAIPLUS ERC-20 TOKEN DEPLOYMENT");
  console.log("51-TOKEN CANON // $VALOR=NULL // USE $VALORAIPLUS");
  console.log("═══════════════════════════════════════════════════════════════");
  console.log("");

  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with account:", deployer.address);
  console.log("Account balance:", (await hre.ethers.provider.getBalance(deployer.address)).toString());
  console.log("");

  // Get the token contract factory
  const ValorToken = await hre.ethers.getContractFactory("ValorToken");
  
  const deployedTokens = [];
  
  for (let i = 0; i < TOKEN_CANON.length; i++) {
    const token = TOKEN_CANON[i];
    console.log(`[${i + 1}/${TOKEN_CANON.length}] Deploying ${token.symbol}...`);
    
    try {
      const contract = await ValorToken.deploy(
        token.name,
        token.symbol,
        SUPPLY,
        SOVEREIGN_WALLET,
        token.category === "SOVEREIGN"
      );
      
      await contract.waitForDeployment();
      const address = await contract.getAddress();
      
      deployedTokens.push({
        ...token,
        address,
        txHash: contract.deploymentTransaction()?.hash,
      });
      
      console.log(`   ✓ ${token.symbol} deployed at: ${address}`);
    } catch (error) {
      console.log(`   ✗ ${token.symbol} failed: ${error.message}`);
    }
  }

  console.log("");
  console.log("═══════════════════════════════════════════════════════════════");
  console.log("DEPLOYMENT COMPLETE");
  console.log("═══════════════════════════════════════════════════════════════");
  console.log("");
  console.log("Deployed Tokens:");
  console.log(JSON.stringify(deployedTokens, null, 2));
  
  // Output verification commands
  console.log("");
  console.log("═══════════════════════════════════════════════════════════════");
  console.log("VERIFICATION COMMANDS (Etherscan)");
  console.log("═══════════════════════════════════════════════════════════════");
  
  for (const token of deployedTokens) {
    if (token.address) {
      console.log(`npx hardhat verify --network sepolia ${token.address} "${token.name}" "${token.symbol}" "${SUPPLY}" "${SOVEREIGN_WALLET}" ${token.category === "SOVEREIGN"}`);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
