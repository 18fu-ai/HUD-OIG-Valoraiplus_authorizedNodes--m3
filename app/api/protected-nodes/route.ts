import { NextResponse } from 'next/server';
import { PROTECTED_NODES } from '@/lib/cds-data';

export const dynamic = 'force-dynamic';

/**
 * GET /api/protected-nodes
 *
 * Returns the protected nodes registry ($POPPA, $JAXX, $8SOULS, $FMG1918).
 * Query params:
 *   - filter: Filter by node id (symbol) or name
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const nodeFilter = searchParams.get('filter');

  let nodes = PROTECTED_NODES;

  if (nodeFilter) {
    nodes = nodes.filter(n =>
      (n.id && n.id.toLowerCase().includes(nodeFilter.toLowerCase())) ||
      (n.name && n.name.toLowerCase().includes(nodeFilter.toLowerCase()))
    );
  }

  return NextResponse.json({
    success: true,
    timestamp: new Date().toISOString(),
    data: {
      nodes,
      count: nodes.length,
    },
    _meta: {
      version: 'v1.0.0',
      governance_model: 'DG77.77X',
      guardians: ['Michael', 'Gabriel', 'Raphael', 'Uriel'],
    },
  });
}
