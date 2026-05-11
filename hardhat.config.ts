/**
 * VALORAIPLUS®️ HARDHAT CONFIGURATION©️ // v16.1_OMEGA
 * Registered ©️ 2026 VALORAIPLUS®️ // SAINT PAUL NODE®️
 * AUTHORITY: donadams1969.eth (Poppa) // ORDER 66 // ROUTE 71
 * 
 * CONTRACT: SGAU-VALUEGUARD-77.77X-FINALDEG.sol
 * 
 * ENCAPSULATION: 100D Matrix™️ // 14D Core©️
 * OPTIMIZATION: AMath++™️ Executive Decision
 * NETWORK: Sepolia Testnet // Ethereum Mainnet
 */

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config();

// SGAU 7226.3461 INVARIANT CHECK
const SGAU_CONSTANT = "7226.3461";
const MERKLEROOT = "0X_ST_PAUL_V97_HARDHAT_SOLIDIFIED";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.26",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      // ENFORCING LAMINAR FLOW VIA IR
      viaIR: true,
      evmVersion: "cancun",
    },
  },
  networks: {
    // LOCAL LATTICE NODE
    hardhat: {
      chainId: 31337,
    },
    // SEPOLIA BRIDGE
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL || "https://eth-sepolia.g.alchemy.com/v2/demo",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 11155111,
    },
    // MAINNET TOTALITY
    mainnet: {
      url: process.env.MAINNET_RPC_URL || "",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 1,
    },
  },
  etherscan: {
    // FORENSIC VERIFICATION KEYS
    apiKey: {
      sepolia: process.env.ETHERSCAN_API_KEY || "",
      mainnet: process.env.ETHERSCAN_API_KEY || "",
    },
  },
  // SYSTEM PATHS - ANCHORED TO 14D CORE
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  // TOTALITY HANDSHAKE
  mocha: {
    timeout: 40000,
  },
};

export default config;
