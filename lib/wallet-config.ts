// SOVEREIGN WALLET CONFIGURATION
// This is the main hardcoded wallet for all cryptocurrency transactions
// DO NOT MODIFY without 3/3 multisig approval

export const SOVEREIGN_WALLET = {
  // Primary wallet address
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
