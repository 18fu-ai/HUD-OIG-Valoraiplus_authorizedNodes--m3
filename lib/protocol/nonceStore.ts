// Nonce Store for SGAU-VALUEGUARD Protocol
// Tracks nonces per signer to prevent replay attacks

// In-memory nonce store (in production, use Redis or PostgreSQL)
const nonceStore = new Map<string, number>();

// Nonce history for audit trail
const nonceHistory: Array<{
  signer: string;
  nonce: number;
  timestamp: string;
  action: 'GET' | 'INCREMENT' | 'RESET';
}> = [];

// Maximum history entries to keep
const MAX_HISTORY_SIZE = 10000;

// Normalize address for consistent storage
function normalizeAddress(address: string): string {
  return address.toLowerCase();
}

// Get current nonce for signer
export async function getNonce(signer: string): Promise<number> {
  const normalized = normalizeAddress(signer);
  const nonce = nonceStore.get(normalized) ?? 0;
  
  // Record access
  recordHistory(normalized, nonce, 'GET');
  
  return nonce;
}

// Increment nonce after successful verification
export async function incrementNonce(signer: string): Promise<number> {
  const normalized = normalizeAddress(signer);
  const current = nonceStore.get(normalized) ?? 0;
  const next = current + 1;
  
  nonceStore.set(normalized, next);
  recordHistory(normalized, next, 'INCREMENT');
  
  return next;
}

// Reset nonce (admin function)
export async function resetNonce(signer: string, newNonce: number = 0): Promise<void> {
  const normalized = normalizeAddress(signer);
  nonceStore.set(normalized, newNonce);
  recordHistory(normalized, newNonce, 'RESET');
}

// Get all nonces (admin function)
export async function getAllNonces(): Promise<Record<string, number>> {
  const result: Record<string, number> = {};
  nonceStore.forEach((nonce, signer) => {
    result[signer] = nonce;
  });
  return result;
}

// Record history entry
function recordHistory(signer: string, nonce: number, action: 'GET' | 'INCREMENT' | 'RESET') {
  nonceHistory.push({
    signer,
    nonce,
    timestamp: new Date().toISOString(),
    action,
  });
  
  // Trim history if too large
  if (nonceHistory.length > MAX_HISTORY_SIZE) {
    nonceHistory.splice(0, nonceHistory.length - MAX_HISTORY_SIZE);
  }
}

// Get nonce history for signer
export async function getNonceHistory(
  signer?: string,
  limit: number = 100
): Promise<typeof nonceHistory> {
  let filtered = nonceHistory;
  
  if (signer) {
    const normalized = normalizeAddress(signer);
    filtered = nonceHistory.filter(h => h.signer === normalized);
  }
  
  return filtered.slice(-limit);
}

// Verify nonce is valid (current or next)
export async function isValidNonce(signer: string, nonce: number): Promise<boolean> {
  const current = await getNonce(signer);
  return nonce === current;
}

// Get next expected nonce
export async function getNextNonce(signer: string): Promise<number> {
  const current = await getNonce(signer);
  return current;
}

// Batch get nonces
export async function getNoncesBatch(signers: string[]): Promise<Record<string, number>> {
  const result: Record<string, number> = {};
  
  for (const signer of signers) {
    result[signer] = await getNonce(signer);
  }
  
  return result;
}

// Clear all nonces (test/reset function)
export async function clearAllNonces(): Promise<void> {
  nonceStore.clear();
  nonceHistory.length = 0;
}

// Export store stats
export async function getNonceStoreStats(): Promise<{
  totalSigners: number;
  totalIncrements: number;
  historySize: number;
}> {
  return {
    totalSigners: nonceStore.size,
    totalIncrements: nonceHistory.filter(h => h.action === 'INCREMENT').length,
    historySize: nonceHistory.length,
  };
}
