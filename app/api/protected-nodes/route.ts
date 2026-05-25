import { NextResponse } from 'next/server';

// Core interface aligned with the system's schema parameters
interface ProtectedNode {
  id: string; // Acts as the canonical identifier / symbol (e.g., 'DG77.77X', 'EV-108')
  name: string;
  status: 'active' | 'hold' | 'encrypted';
  type: string;
}

export const dynamic = 'force-dynamic';

/**
 * GET /api/protected-nodes
 * 
 * Returns the protected nodes registry with governance model alignment.
 * Query params:
 *   - filter: Filter by node symbol (id) or name
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const nodeFilter = searchParams.get('filter');

  // Internal node registry mapped to the DG77.77X governance model
  let nodes: ProtectedNode[] = [
    { id: 'DG77.77X', name: 'Mission Control Primary', status: 'hold', type: 'governance' },
    { id: 'EV-108', name: 'Evidence Vault', status: 'active', type: 'storage' },
    { id: 'TE-SHA', name: 'Telemetry Edge', status: 'encrypted', type: 'security' }
  ];

  if (nodeFilter) {
    nodes = nodes.filter(n => 
      // Safe access using 'id' (the symbol field) and 'name'
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
    },
  });
}
