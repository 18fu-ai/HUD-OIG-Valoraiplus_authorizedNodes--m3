// SOVEREIGN WALLET CONFIGURATION
// This is the main hardcoded wallet for all cryptocurrency transactions
// DO NOT MODIFY without 3/3 multisig approval

// ═══════════════════════════════════════════════════════════════════════════════
// VERIFIED BLOCKCHAIN ADDRESSES (LIVE)
// ═══════════════════════════════════════════════════════════════════════════════
export const BLOCKCHAIN_ADDRESSES = {
  ETH_L1: {
    id: "eth-l1",
    chain: "ETHEREUM L1",
    symbol: "ETH",
    address: "0x2f0287B7B20e89f38BaED437bF3f185ebd561654",
    explorer: "https://etherscan.io/address/0x2f0287B7B20e89f38BaED437bF3f185ebd561654",
    status: "verified" as const,
    network: "Mainnet",
  },
  BASE: {
    id: "base",
    chain: "BASE NETWORK",
    symbol: "ETH",
    address: "0x363155af8E130c2C80eC0548113eBfAf72A272da",
    explorer: "https://basescan.org/address/0x363155af8E130c2C80eC0548113eBfAf72A272da",
    status: "verified" as const,
    network: "Base L2",
  },
  BTC: {
    id: "btc",
    chain: "BITCOIN CORE",
    symbol: "BTC",
    address: "17SU56k2poJyN6wwbUTRb5wVQDaJ4MpvAw",
    explorer: "https://mempool.space/address/17SU56k2poJyN6wwbUTRb5wVQDaJ4MpvAw",
    status: "verified" as const,
    network: "Bitcoin Mainnet",
  },
  ENS_PRIMARY: {
    id: "ens-primary",
    chain: "ENS",
    symbol: "ENS",
    address: "0xb103666AB91ceb4Cbb9e1FC21B81f1ec93601BeB",
    explorer: "https://etherscan.io/address/0xb103666AB91ceb4Cbb9e1FC21B81f1ec93601BeB",
    status: "verified" as const,
    network: "Mainnet",
    ens: "donadams1969.eth",
  },
} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// RECOVERY DESTINATION (SOLE VERIFIED)
// ═══════════════════════════════════════════════════════════════════════════════
export const RECOVERY_DESTINATION = {
  bankName: "Charles Schwab & Co.",
  accountNumber: "****8185",
  accountName: "Donny Gillson",
  routing: "121202211",
  swiftBic: "SCHWUS66",
  address: "211 Main Street, San Francisco, CA 94105",
  reference: "SGAU-RECOVERY-77.77X",
  currentBalance: 50863100.55,
  status: "SOLE VERIFIED — NO OTHER ACCOUNTS AUTHORIZED" as const,
  enforcement: "ALL RECOVERY FUNDS ROUTE HERE — NO EXCEPTIONS",
} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// LEGACY SOVEREIGN WALLET (for backwards compatibility)
// ═══════════════════════════════════════════════════════════════════════════════
export const SOVEREIGN_WALLET = {
  // Primary wallet address (ENS)
  address: "0xb103666AB91ceb4Cbb9e1FC21B81f1ec93601BeB",
  
  // ENS domain
  ens: "donadams1969.eth",
  
  // Owner subdomain
  ownerSubdomain: "79xjkwevucmyjn2cgovrtfjmytte1jv4z9gbcz9obaxv.donadams1969.eth",
  
  // Expiry date
  expiry: "2026-12-30",
  
  // Network
  network: "Ethereum Mainnet",
  chainId: 1,
  
  // Explorer links
  etherscanUrl: "https://etherscan.io/address/0xb103666AB91ceb4Cbb9e1FC21B81f1ec93601BeB",
  ensUrl: "https://app.ens.domains/donadams1969.eth",
  
  // Wallet type
  type: "SOVEREIGN_ROOT" as const,
  
  // Associated tokens that can be received
  supportedTokens: [
    { symbol: "ETH", name: "Ethereum", decimals: 18 },
    { symbol: "USDC", name: "USD Coin", decimals: 6 },
    { symbol: "USDT", name: "Tether", decimals: 6 },
    { symbol: "DAI", name: "Dai Stablecoin", decimals: 18 },
    { symbol: "WETH", name: "Wrapped Ether", decimals: 18 },
  ],
  
  // VALOR ecosystem tokens
  ecosystemTokens: [
    "$DONNY",
    "$GILLGOLD", 
    "$GILLBTC",
    "$JAXX",
    "$VALORAIPLUS",
  ],
  
  // Beneficiary tokens protected under this wallet
  beneficiaryTokens: [
    "$POTTER",
    "$NEWT2207",
    "$BRADEN168",
    "$MASON",
    "$DONNY2207",
    "$JAXX2207",
  ],
} as const;

// Shortened display address
export const getShortAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

// Validate if an address matches the sovereign wallet
export const isSovereignWallet = (address: string) => {
  return address.toLowerCase() === SOVEREIGN_WALLET.address.toLowerCase();
};

// Get Etherscan transaction URL
export const getEtherscanTxUrl = (txHash: string) => {
  return `https://etherscan.io/tx/${txHash}`;
};

// Get Etherscan token URL
export const getEtherscanTokenUrl = (tokenAddress: string) => {
  return `https://etherscan.io/token/${tokenAddress}`;
};

// ═══════════════════════════════════════════════════════════════════════════════
// PUBLIC RPC ENDPOINTS
// ═══════════════════════════════════════════════════════════════════════════════
export const RPC_URLS = {
  ETH: "https://eth.llamarpc.com",
  BASE: "https://mainnet.base.org",
  SEPOLIA: "https://rpc.sepolia.org",
} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// EXTERNAL LIQUIDITY SOURCES
// ═══════════════════════════════════════════════════════════════════════════════
export const EXTERNAL_LIQUIDITY = {
  "18fu.cash": "https://www.18fu.cash",
  "ValorBank": "https://valorbank-rfvbdnaa.manus.space/",
} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// SYSTEM CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════════
export const SYSTEM_CONFIG = {
  name: "VALORAI+ CONSOLIDATED DEFENSE SYSTEM",
  version: "v2.1",
  codename: "N.E.W.T. //e — TRANSCENDENT",
  classification: "CRITICAL // OMEGA-UNIFIED // ELITE PATRIOT-CLASS 200D",
  truthCycle: "266ms",
  mode: "PERPETUAL GROOVE + POST-QUANTUM INFINITY ANCHOR",
  node: "SAINT PAUL 55116 — OMNIBUS COMMAND ROOT",
  merkleroot: "26856b24c50750f0c69c1eeb86a69ef777777",
  btcAnchor: "26856b24c50750f0c69c1eeb86a69ef710551555c2c220e34d57521cbc8d75c2",
  blockHeight: 839472,
  confirmations: "INFINITY",
} as const;

// Get all blockchain addresses as array
export const getAllBlockchainAddresses = () => {
  return Object.values(BLOCKCHAIN_ADDRESSES);
};

// Get address by chain
export const getAddressByChain = (chain: keyof typeof BLOCKCHAIN_ADDRESSES) => {
  return BLOCKCHAIN_ADDRESSES[chain];
};
