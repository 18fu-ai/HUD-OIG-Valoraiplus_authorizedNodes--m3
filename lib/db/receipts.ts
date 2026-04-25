// Receipt Storage for SGAU-VALUEGUARD Protocol
// Stores deterministic proof objects for all verified transactions

import { type IntentType } from '../protocol/eip712';

// Verification receipt type
export type VerificationReceipt = {
  id: string;
  accepted: boolean;
  signer: string;
  txHash: string | null;
  blockNumber: bigint | null;
  nodeId: string;
  revision: number;
  intentType: IntentType;
  timestamp: string;
  metadata?: Record<string, unknown>;
};

// Receipt query filter
export type ReceiptFilter = {
  signer?: string;
  nodeId?: string;
  intentType?: IntentType;
  accepted?: boolean;
  fromTimestamp?: string;
  toTimestamp?: string;
  limit?: number;
  offset?: number;
};

// In-memory receipt store (in production, use PostgreSQL)
const receiptStore: VerificationReceipt[] = [];

// Generate receipt ID
function generateReceiptId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 10);
  return `rcpt_${timestamp}_${random}`;
}

// Create a new receipt
export async function createReceipt(
  receipt: Omit<VerificationReceipt, 'id' | 'timestamp'>
): Promise<VerificationReceipt> {
  const newReceipt: VerificationReceipt = {
    ...receipt,
    id: generateReceiptId(),
    timestamp: new Date().toISOString(),
  };
  
  receiptStore.push(newReceipt);
  
  return newReceipt;
}

// Get receipt by ID
export async function getReceiptById(id: string): Promise<VerificationReceipt | null> {
  return receiptStore.find(r => r.id === id) ?? null;
}

// Get receipt by transaction hash
export async function getReceiptByTxHash(txHash: string): Promise<VerificationReceipt | null> {
  return receiptStore.find(r => r.txHash === txHash) ?? null;
}

// Query receipts with filters
export async function queryReceipts(filter: ReceiptFilter = {}): Promise<VerificationReceipt[]> {
  let results = [...receiptStore];
  
  // Filter by signer
  if (filter.signer) {
    const normalizedSigner = filter.signer.toLowerCase();
    results = results.filter(r => r.signer.toLowerCase() === normalizedSigner);
  }
  
  // Filter by nodeId
  if (filter.nodeId) {
    results = results.filter(r => r.nodeId === filter.nodeId);
  }
  
  // Filter by intent type
  if (filter.intentType) {
    results = results.filter(r => r.intentType === filter.intentType);
  }
  
  // Filter by accepted status
  if (filter.accepted !== undefined) {
    results = results.filter(r => r.accepted === filter.accepted);
  }
  
  // Filter by timestamp range
  if (filter.fromTimestamp) {
    results = results.filter(r => r.timestamp >= filter.fromTimestamp!);
  }
  
  if (filter.toTimestamp) {
    results = results.filter(r => r.timestamp <= filter.toTimestamp!);
  }
  
  // Sort by timestamp descending
  results.sort((a, b) => b.timestamp.localeCompare(a.timestamp));
  
  // Apply pagination
  const offset = filter.offset ?? 0;
  const limit = filter.limit ?? 100;
  
  return results.slice(offset, offset + limit);
}

// Get receipts for signer
export async function getReceiptsBySigner(
  signer: string,
  limit: number = 50
): Promise<VerificationReceipt[]> {
  return queryReceipts({ signer, limit });
}

// Get receipts for node
export async function getReceiptsByNode(
  nodeId: string,
  limit: number = 50
): Promise<VerificationReceipt[]> {
  return queryReceipts({ nodeId, limit });
}

// Get latest receipts
export async function getLatestReceipts(limit: number = 50): Promise<VerificationReceipt[]> {
  return receiptStore
    .sort((a, b) => b.timestamp.localeCompare(a.timestamp))
    .slice(0, limit);
}

// Get receipt statistics
export async function getReceiptStats(): Promise<{
  totalReceipts: number;
  acceptedCount: number;
  rejectedCount: number;
  byIntentType: Record<IntentType, number>;
  uniqueSigners: number;
  uniqueNodes: number;
}> {
  const byIntentType: Record<IntentType, number> = {
    LatchExhibit: 0,
    CreateRevision: 0,
    NullifyNode: 0,
    UpdateAnchor: 0,
    ApproveVerifier: 0,
  };
  
  const signers = new Set<string>();
  const nodes = new Set<string>();
  let acceptedCount = 0;
  let rejectedCount = 0;
  
  for (const receipt of receiptStore) {
    byIntentType[receipt.intentType]++;
    signers.add(receipt.signer.toLowerCase());
    nodes.add(receipt.nodeId);
    
    if (receipt.accepted) {
      acceptedCount++;
    } else {
      rejectedCount++;
    }
  }
  
  return {
    totalReceipts: receiptStore.length,
    acceptedCount,
    rejectedCount,
    byIntentType,
    uniqueSigners: signers.size,
    uniqueNodes: nodes.size,
  };
}

// Update receipt with transaction hash (after on-chain confirmation)
export async function updateReceiptTxHash(
  id: string,
  txHash: string,
  blockNumber: bigint
): Promise<VerificationReceipt | null> {
  const receipt = receiptStore.find(r => r.id === id);
  
  if (receipt) {
    receipt.txHash = txHash;
    receipt.blockNumber = blockNumber;
    return receipt;
  }
  
  return null;
}

// Delete receipt (admin function)
export async function deleteReceipt(id: string): Promise<boolean> {
  const index = receiptStore.findIndex(r => r.id === id);
  
  if (index > -1) {
    receiptStore.splice(index, 1);
    return true;
  }
  
  return false;
}

// Clear all receipts (test/reset function)
export async function clearAllReceipts(): Promise<void> {
  receiptStore.length = 0;
}

// Export receipt count
export async function getReceiptCount(): Promise<number> {
  return receiptStore.length;
}

// Serialize receipt for JSON response (handles BigInt)
export function serializeReceipt(receipt: VerificationReceipt): Record<string, unknown> {
  return {
    ...receipt,
    blockNumber: receipt.blockNumber?.toString() ?? null,
  };
}

// Serialize multiple receipts
export function serializeReceipts(receipts: VerificationReceipt[]): Record<string, unknown>[] {
  return receipts.map(serializeReceipt);
}
