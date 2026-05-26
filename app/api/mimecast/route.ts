import { NextResponse } from 'next/server';
import { MIMECAST_EVENTS } from '@/lib/cds-data';

export const dynamic = 'force-dynamic';

/**
 * GET /api/mimecast
 * 
 * Returns Mimecast forensic event log.
 * Query params:
 *   - actor: Filter by actor email
 *   - action: Filter by action type
 *   - result: Filter by result
 *   - limit: Number of events to return (default: all)
 *   - offset: Pagination offset
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const actor = searchParams.get('actor');
  const action = searchParams.get('action');
  const result = searchParams.get('result');
  const limit = parseInt(searchParams.get('limit') || '0') || undefined;
  const offset = parseInt(searchParams.get('offset') || '0');

  let events = [...MIMECAST_EVENTS];

  // Apply filters
  if (actor) {
    events = events.filter(e => 
      e.actor.toLowerCase().includes(actor.toLowerCase())
    );
  }

  if (action) {
    events = events.filter(e => 
      e.actionType.toLowerCase().includes(action.toLowerCase())
    );
  }

  if (result) {
    events = events.filter(e => 
      e.result.toLowerCase().includes(result.toLowerCase())
    );
  }

  // Calculate stats before pagination
  const totalCount = events.length;
  const actionCounts = events.reduce((acc, e) => {
    acc[e.actionType] = (acc[e.actionType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const actorCounts = events.reduce((acc, e) => {
    acc[e.actor] = (acc[e.actor] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Apply pagination
  if (offset) {
    events = events.slice(offset);
  }
  if (limit) {
    events = events.slice(0, limit);
  }

  return NextResponse.json({
    success: true,
    timestamp: new Date().toISOString(),
    data: {
      events,
      count: events.length,
      totalCount,
      dataType: 'VERIFIED_METADATA',
    },
    stats: {
      byAction: actionCounts,
      byActor: actorCounts,
    },
    pagination: {
      offset,
      limit: limit || totalCount,
      hasMore: offset + events.length < totalCount,
    },
    _meta: {
      version: 'v1.0.0',
      source: 'Mimecast Admin Console API',
    },
  });
}
