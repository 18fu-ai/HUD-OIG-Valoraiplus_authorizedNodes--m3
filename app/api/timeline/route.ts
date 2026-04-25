import { NextResponse } from 'next/server';
import { TIMELINE_EVENTS } from '@/lib/cds-data';

export const dynamic = 'force-dynamic';

/**
 * GET /api/timeline
 * 
 * Returns the chronological timeline of events.
 * Query params:
 *   - category: Filter by category
 *   - from: Filter events from date (ISO string)
 *   - to: Filter events to date (ISO string)
 *   - limit: Number of events to return
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const from = searchParams.get('from');
  const to = searchParams.get('to');
  const limit = parseInt(searchParams.get('limit') || '0') || undefined;

  let events = [...TIMELINE_EVENTS];

  if (category) {
    events = events.filter(e => 
      e.category.toLowerCase().includes(category.toLowerCase())
    );
  }

  if (from) {
    const fromDate = new Date(from);
    events = events.filter(e => new Date(e.date) >= fromDate);
  }

  if (to) {
    const toDate = new Date(to);
    events = events.filter(e => new Date(e.date) <= toDate);
  }

  // Sort by date descending
  events.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (limit) {
    events = events.slice(0, limit);
  }

  // Calculate category counts
  const categoryCounts = TIMELINE_EVENTS.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return NextResponse.json({
    success: true,
    timestamp: new Date().toISOString(),
    data: {
      events,
      count: events.length,
      totalCount: TIMELINE_EVENTS.length,
    },
    stats: {
      byCategory: categoryCounts,
    },
    _meta: {
      version: 'v1.0.0',
    },
  });
}
