import { NextResponse } from 'next/server';
import { PROTECTED_NODES } from '@/lib/cds-data';

export const dynamic = 'force-dynamic';

/**
 * GET /api/protected-nodes
 * 
 * Returns the protected nodes (Poppa, Jaxx, 8Souls, FMG1918).
 * Query params:
 *   - node: Filter by specific node symbol
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const nodeFilter = searchParams.get('node');

  let nodes = PROTECTED_NODES;

  if (nodeFilter) {
    nodes = nodes.filter(n => 
      n.name.toLowerCase().includes(nodeFilter.toLowerCase())
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
      guardians: ['Michael', 'Gabriel', 'Raphael', 'Uriel'],
    },
  });
}
