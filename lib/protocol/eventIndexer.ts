// Event Indexer for SGAU-VALUEGUARD Protocol
// Reads contract events and reconstructs history

import { type RegistryEventName } from '../contracts/registryAbi';

// Indexed event type
export type IndexedEvent = {
  eventName: RegistryEventName;
  blockNumber: bigint;
  blockHash: string;
  transactionHash: string;
  logIndex: number;
  timestamp: string;
  args: Record<string, unknown>;
};

// Event filter type
export type EventFilter = {
  eventName?: RegistryEventName;
  fromBlock?: bigint;
  toBlock?: bigint;
  nodeId?: string;
  signer?: string;
  limit?: number;
  offset?: number;
};

// In-memory event store (in production, use PostgreSQL)
const eventStore: IndexedEvent[] = [];

// Event statistics
const eventStats: Record<RegistryEventName, number> = {
  NodeLatched: 0,
  RevisionCreated: 0,
  NodeNullified: 0,
  AnchorUpdated: 0,
  VerifierApproved: 0,
};

// Last indexed block per chain
const lastIndexedBlock: Record<number, bigint> = {};

// Index a new event
export async function indexEvent(event: IndexedEvent): Promise<void> {
  // Check for duplicates
  const exists = eventStore.some(
    e => e.transactionHash === event.transactionHash && e.logIndex === event.logIndex
  );
  
  if (!exists) {
    eventStore.push(event);
    eventStats[event.eventName]++;
    
    // Sort by block number and log index
    eventStore.sort((a, b) => {
      if (a.blockNumber !== b.blockNumber) {
        return Number(a.blockNumber - b.blockNumber);
      }
      return a.logIndex - b.logIndex;
    });
  }
}

// Index batch of events
export async function indexEventsBatch(events: IndexedEvent[]): Promise<number> {
  let indexed = 0;
  
  for (const event of events) {
    const sizeBefore = eventStore.length;
    await indexEvent(event);
    if (eventStore.length > sizeBefore) {
      indexed++;
    }
  }
  
  return indexed;
}

// Query events with filters
export async function queryEvents(filter: EventFilter = {}): Promise<IndexedEvent[]> {
  let results = [...eventStore];
  
  // Filter by event name
  if (filter.eventName) {
    results = results.filter(e => e.eventName === filter.eventName);
  }
  
  // Filter by block range
  if (filter.fromBlock !== undefined) {
    results = results.filter(e => e.blockNumber >= filter.fromBlock!);
  }
  
  if (filter.toBlock !== undefined) {
    results = results.filter(e => e.blockNumber <= filter.toBlock!);
  }
  
  // Filter by nodeId
  if (filter.nodeId) {
    results = results.filter(e => 
      e.args.nodeId === filter.nodeId || e.args.anchorId === filter.nodeId
    );
  }
  
  // Filter by signer
  if (filter.signer) {
    const normalizedSigner = filter.signer.toLowerCase();
    results = results.filter(e => {
      const signer = e.args.signer as string | undefined;
      const nullifier = e.args.nullifier as string | undefined;
      const approver = e.args.approver as string | undefined;
      
      return (
        signer?.toLowerCase() === normalizedSigner ||
        nullifier?.toLowerCase() === normalizedSigner ||
        approver?.toLowerCase() === normalizedSigner
      );
    });
  }
  
  // Apply pagination
  const offset = filter.offset ?? 0;
  const limit = filter.limit ?? 100;
  
  return results.slice(offset, offset + limit);
}

// Get events for specific node
export async function getNodeHistory(nodeId: string): Promise<IndexedEvent[]> {
  return queryEvents({ nodeId });
}

// Get latest events
export async function getLatestEvents(limit: number = 50): Promise<IndexedEvent[]> {
  return eventStore.slice(-limit).reverse();
}

// Get event statistics
export async function getEventStats(): Promise<{
  totalEvents: number;
  byType: Record<RegistryEventName, number>;
  latestBlock: bigint | null;
  oldestBlock: bigint | null;
}> {
  const blocks = eventStore.map(e => e.blockNumber);
  
  return {
    totalEvents: eventStore.length,
    byType: { ...eventStats },
    latestBlock: blocks.length > 0 ? blocks[blocks.length - 1] : null,
    oldestBlock: blocks.length > 0 ? blocks[0] : null,
  };
}

// Update last indexed block
export async function setLastIndexedBlock(chainId: number, blockNumber: bigint): Promise<void> {
  lastIndexedBlock[chainId] = blockNumber;
}

// Get last indexed block
export async function getLastIndexedBlock(chainId: number): Promise<bigint> {
  return lastIndexedBlock[chainId] ?? BigInt(0);
}

// Reconstruct node state from events
export async function reconstructNodeState(nodeId: string): Promise<{
  exists: boolean;
  category?: string;
  logicHash?: string;
  truthCycle?: number;
  revision?: number;
  signer?: string;
  nullified?: boolean;
  nullifyReason?: string;
  createdAt?: string;
  updatedAt?: string;
}> {
  const events = await getNodeHistory(nodeId);
  
  if (events.length === 0) {
    return { exists: false };
  }
  
  // Find the latest state
  let state: ReturnType<typeof reconstructNodeState> extends Promise<infer T> ? T : never = {
    exists: true,
    revision: 0,
    nullified: false,
  };
  
  for (const event of events) {
    switch (event.eventName) {
      case 'NodeLatched':
        state = {
          exists: true,
          category: event.args.category as string,
          logicHash: event.args.logicHash as string,
          truthCycle: Number(event.args.truthCycle),
          revision: 0,
          signer: event.args.signer as string,
          nullified: false,
          createdAt: event.timestamp,
          updatedAt: event.timestamp,
        };
        break;
        
      case 'RevisionCreated':
        state.logicHash = event.args.logicHash as string;
        state.revision = Number(event.args.revision);
        state.signer = event.args.signer as string;
        state.updatedAt = event.timestamp;
        break;
        
      case 'NodeNullified':
        state.nullified = true;
        state.nullifyReason = event.args.reason as string;
        state.updatedAt = event.timestamp;
        break;
    }
  }
  
  return state;
}

// Clear all events (test/reset function)
export async function clearAllEvents(): Promise<void> {
  eventStore.length = 0;
  Object.keys(eventStats).forEach(key => {
    eventStats[key as RegistryEventName] = 0;
  });
}

// Export event count
export async function getEventCount(): Promise<number> {
  return eventStore.length;
}
