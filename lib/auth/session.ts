// lib/auth/session.ts - VALORAIPLUS KEY VALIDATION
// OMEGA-UNIFIED // Saint Paul Node #2207

const RAW_KEY = process.env.PRIVATE_KEY || "";

/**
 * Normalizes the Sovereign Key. 
 * Strips '0x' if present and verifies the 64-char entropy requirement.
 */
export const getValidatedPrivateKey = (): Buffer => {
  const cleanKey = RAW_KEY.startsWith("0x") ? RAW_KEY.slice(2) : RAW_KEY;
  
  if (cleanKey.length !== 64) {
    throw new Error(`CRITICAL_DRIFT: Private Key length is ${cleanKey.length}, expected 64.`);
  }
  
  return Buffer.from(cleanKey, "hex");
};

/**
 * Returns the hex string version of the private key (with 0x prefix)
 */
export const getPrivateKeyHex = (): string => {
  const cleanKey = RAW_KEY.startsWith("0x") ? RAW_KEY.slice(2) : RAW_KEY;
  
  if (cleanKey.length !== 64) {
    throw new Error(`CRITICAL_DRIFT: Private Key length is ${cleanKey.length}, expected 64.`);
  }
  
  return `0x${cleanKey}`;
};

/**
 * Validates key format without exposing the key
 */
export const validateKeyFormat = (): { valid: boolean; length: number } => {
  const cleanKey = RAW_KEY.startsWith("0x") ? RAW_KEY.slice(2) : RAW_KEY;
  return {
    valid: cleanKey.length === 64 && /^[0-9a-fA-F]+$/.test(cleanKey),
    length: cleanKey.length
  };
};

// Sovereign constants
export const SOVEREIGN_ADDRESS = "0xb103666AB91ceb4Cbb9e1FC21B81f1ec93601BeB";
export const SOVEREIGN_ENS = "donadams1969.eth";
export const MERKLE_BLOCK = 144000;
