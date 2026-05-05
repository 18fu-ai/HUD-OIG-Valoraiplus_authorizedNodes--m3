/**
 * CHAINED EVENT LOG (TAMPER-EVIDENT)
 * 
 * Creates an immutable chain of events where each event
 * references the hash of the previous event.
 * 
 * If any event is modified, the chain breaks.
 */

import { createHash } from 'crypto';

// ============================================================
// TYPES
// ============================================================

export type EventAction = 
  | 'CREATED'
  | 'UPDATED'
  | 'EXPORTED'
  | 'VERIFIED'
  | 'SIGNED'
  | 'ANCHORED'
  | 'REVOKED'
  | 'ARCHIVED';

export interface ChainedEvent {
  /** Event sequence number */
  sequence: number;
  /** ISO timestamp */
  timestamp: string;
  /** Action performed */
  action: EventAction;
  /** Entry ID affected */
  entry_id: string;
  /** Hash of the previous event (null for genesis) */
  previous_hash: string | null;
  /** Hash of this event */
  hash: string;
  /** Additional metadata */
  metadata?: Record<string, unknown>;
}

export interface EventChain {
  /** Chain identifier */
  chain_id: string;
  /** Chain version */
  version: string;
  /** Genesis timestamp */
  created_at: string;
  /** Last event timestamp */
  last_updated: string;
  /** Number of events */
  length: number;
  /** Head hash (most recent event) */
  head_hash: string;
  /** All events in order */
  events: ChainedEvent[];
}

// ============================================================
// HASHING
// ============================================================

/**
 * Hash an event (without its own hash field)
 */
function hashEvent(event: Omit<ChainedEvent, 'hash'>): string {
  const data = JSON.stringify({
    sequence: event.sequence,
    timestamp: event.timestamp,
    action: event.action,
    entry_id: event.entry_id,
    previous_hash: event.previous_hash,
    metadata: event.metadata,
  });
  return createHash('sha256').update(data).digest('hex');
}

// ============================================================
// EVENT CHAIN MANAGEMENT
// ============================================================

// In-memory chain store (production: database)
const chainStore = new Map<string, EventChain>();

/**
 * Create a new event chain
 */
export function createChain(chainId: string): EventChain {
  const now = new Date().toISOString();
  
  const chain: EventChain = {
    chain_id: chainId,
    version: '1.0.0',
    created_at: now,
    last_updated: now,
    length: 0,
    head_hash: '',
    events: [],
  };
  
  chainStore.set(chainId, chain);
  return chain;
}

/**
 * Get or create a chain
 */
export function getChain(chainId: string): EventChain {
  let chain = chainStore.get(chainId);
  if (!chain) {
    chain = createChain(chainId);
  }
  return chain;
}

/**
 * Create and append a new event to the chain
 */
export function createEvent(
  chainId: string,
  action: EventAction,
  entryId: string,
  metadata?: Record<string, unknown>
): ChainedEvent {
  const chain = getChain(chainId);
  const now = new Date().toISOString();
  
  const previousHash = chain.events.length > 0 
    ? chain.events[chain.events.length - 1].hash 
    : null;
  
  const eventWithoutHash: Omit<ChainedEvent, 'hash'> = {
    sequence: chain.events.length,
    timestamp: now,
    action,
    entry_id: entryId,
    previous_hash: previousHash,
    metadata,
  };
  
  const event: ChainedEvent = {
    ...eventWithoutHash,
    hash: hashEvent(eventWithoutHash),
  };
  
  // Append to chain
  chain.events.push(event);
  chain.length = chain.events.length;
  chain.head_hash = event.hash;
  chain.last_updated = now;
  
  return event;
}

/**
 * Verify the integrity of an entire chain
 */
export function verifyChain(chainId: string): { 
  valid: boolean; 
  broken_at?: number;
  reason?: string;
} {
  const chain = chainStore.get(chainId);
  
  if (!chain) {
    return { valid: false, reason: 'CHAIN_NOT_FOUND' };
  }
  
  for (let i = 0; i < chain.events.length; i++) {
    const event = chain.events[i];
    
    // Verify event hash
    const expectedHash = hashEvent({
      sequence: event.sequence,
      timestamp: event.timestamp,
      action: event.action,
      entry_id: event.entry_id,
      previous_hash: event.previous_hash,
      metadata: event.metadata,
    });
    
    if (event.hash !== expectedHash) {
      return { 
        valid: false, 
        broken_at: i,
        reason: 'HASH_MISMATCH',
      };
    }
    
    // Verify chain link
    if (i > 0) {
      const previousEvent = chain.events[i - 1];
      if (event.previous_hash !== previousEvent.hash) {
        return { 
          valid: false, 
          broken_at: i,
          reason: 'CHAIN_LINK_BROKEN',
        };
      }
    } else if (event.previous_hash !== null) {
      return {
        valid: false,
        broken_at: 0,
        reason: 'INVALID_GENESIS',
      };
    }
  }
  
  return { valid: true };
}

/**
 * Get chain summary for export
 */
export function getChainSummary(chainId: string): {
  chain_id: string;
  length: number;
  head_hash: string;
  created_at: string;
  last_updated: string;
  integrity: 'VALID' | 'BROKEN';
} | null {
  const chain = chainStore.get(chainId);
  if (!chain) return null;
  
  const verification = verifyChain(chainId);
  
  return {
    chain_id: chain.chain_id,
    length: chain.length,
    head_hash: chain.head_hash,
    created_at: chain.created_at,
    last_updated: chain.last_updated,
    integrity: verification.valid ? 'VALID' : 'BROKEN',
  };
}

/**
 * Export full chain for external verification
 */
export function exportChain(chainId: string): EventChain | null {
  return chainStore.get(chainId) || null;
}

/**
 * Get all chain IDs
 */
export function getAllChainIds(): string[] {
  return Array.from(chainStore.keys());
}
