// Event Indexing Layer - Query indexed contract events
// GET /api/events

import { NextRequest, NextResponse } from 'next/server';
import { 
  queryEvents, 
  getLatestEvents, 
  getNodeHistory,
  getEventStats,
  reconstructNodeState,
  type EventFilter,
} from '@/lib/protocol/eventIndexer';
import { 
  queryReceipts, 
  getReceiptStats,
  getReceiptById,
  serializeReceipts,
  serializeReceipt,
} from '@/lib/db/receipts';
import { type RegistryEventName } from '@/lib/contracts/registryAbi';

// Serialize BigInt values for JSON
function serializeEvent(event: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  
  for (const [key, value] of Object.entries(event)) {
    if (typeof value === 'bigint') {
      result[key] = value.toString();
    } else if (value && typeof value === 'object' && !Array.isArray(value)) {
      result[key] = serializeEvent(value as Record<string, unknown>);
    } else {
      result[key] = value;
    }
  }
  
  return result;
}

// GET /api/events
export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  
  // Check for specific endpoints
  const endpoint = searchParams.get('endpoint');
  const nodeId = searchParams.get('nodeId');
  const receiptId = searchParams.get('receiptId');
  
  // Get specific receipt
  if (receiptId) {
    const receipt = await getReceiptById(receiptId);
    
    if (!receipt) {
      return NextResponse.json(
        { error: 'Receipt not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      receipt: serializeReceipt(receipt),
    });
  }
  
  // Get node history and reconstructed state
  if (nodeId) {
    const history = await getNodeHistory(nodeId);
    const state = await reconstructNodeState(nodeId);
    
    return NextResponse.json({
      success: true,
      nodeId,
      state: serializeEvent(state as Record<string, unknown>),
      history: history.map(e => serializeEvent(e as unknown as Record<string, unknown>)),
      eventCount: history.length,
    });
  }
  
  // Get statistics
  if (endpoint === 'stats') {
    const eventStats = await getEventStats();
    const receiptStats = await getReceiptStats();
    
    return NextResponse.json({
      success: true,
      events: serializeEvent(eventStats as unknown as Record<string, unknown>),
      receipts: receiptStats,
      timestamp: new Date().toISOString(),
    });
  }
  
  // Get latest events
  if (endpoint === 'latest') {
    const limit = parseInt(searchParams.get('limit') ?? '50', 10);
    const events = await getLatestEvents(Math.min(limit, 100));
    
    return NextResponse.json({
      success: true,
      events: events.map(e => serializeEvent(e as unknown as Record<string, unknown>)),
      count: events.length,
      timestamp: new Date().toISOString(),
    });
  }
  
  // Build filter from query params
  const filter: EventFilter = {};
  
  const eventName = searchParams.get('eventName');
  if (eventName && ['NodeLatched', 'RevisionCreated', 'NodeNullified', 'AnchorUpdated', 'VerifierApproved'].includes(eventName)) {
    filter.eventName = eventName as RegistryEventName;
  }
  
  const fromBlock = searchParams.get('fromBlock');
  if (fromBlock) {
    filter.fromBlock = BigInt(fromBlock);
  }
  
  const toBlock = searchParams.get('toBlock');
  if (toBlock) {
    filter.toBlock = BigInt(toBlock);
  }
  
  const signer = searchParams.get('signer');
  if (signer) {
    filter.signer = signer;
  }
  
  const limit = parseInt(searchParams.get('limit') ?? '100', 10);
  filter.limit = Math.min(limit, 500);
  
  const offset = parseInt(searchParams.get('offset') ?? '0', 10);
  filter.offset = Math.max(offset, 0);
  
  // Query events
  const events = await queryEvents(filter);
  
  return NextResponse.json({
    success: true,
    events: events.map(e => serializeEvent(e as unknown as Record<string, unknown>)),
    count: events.length,
    filter: {
      ...filter,
      fromBlock: filter.fromBlock?.toString(),
      toBlock: filter.toBlock?.toString(),
    },
    timestamp: new Date().toISOString(),
  });
}

// POST /api/events - Query with complex filters
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    
    // Query receipts
    if (body.type === 'receipts') {
      const receipts = await queryReceipts({
        signer: body.signer,
        nodeId: body.nodeId,
        intentType: body.intentType,
        accepted: body.accepted,
        fromTimestamp: body.fromTimestamp,
        toTimestamp: body.toTimestamp,
        limit: Math.min(body.limit ?? 100, 500),
        offset: body.offset ?? 0,
      });
      
      return NextResponse.json({
        success: true,
        receipts: serializeReceipts(receipts),
        count: receipts.length,
      });
    }
    
    // Query events with complex filter
    const filter: EventFilter = {
      eventName: body.eventName,
      fromBlock: body.fromBlock ? BigInt(body.fromBlock) : undefined,
      toBlock: body.toBlock ? BigInt(body.toBlock) : undefined,
      nodeId: body.nodeId,
      signer: body.signer,
      limit: Math.min(body.limit ?? 100, 500),
      offset: body.offset ?? 0,
    };
    
    const events = await queryEvents(filter);
    
    return NextResponse.json({
      success: true,
      events: events.map(e => serializeEvent(e as unknown as Record<string, unknown>)),
      count: events.length,
    });
    
  } catch (error) {
    console.error('[Events API] Error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}
