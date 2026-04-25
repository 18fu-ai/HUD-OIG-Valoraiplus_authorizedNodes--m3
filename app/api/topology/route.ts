import { NextResponse } from 'next/server';
import { enforceTopology } from '@/lib/protocol';

export const dynamic = 'force-dynamic';

/**
 * POST /api/topology
 * 
 * Enforces the 4-route topology on a signal.
 * Body: { signal: RuntimeSignal }
 * 
 * Routes:
 *   - /route71: sovereign=true
 *   - /route81: reserve=true (maximum priority)
 *   - /route69: forensic=true, sovereign=false
 *   - /route70: sovereign=false, forensic=false (void)
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { signal } = body;

    if (!signal) {
      return NextResponse.json({
        success: false,
        error: 'Missing required field: signal',
      }, { status: 400 });
    }

    const decision = enforceTopology(signal);

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      input: signal,
      decision,
      _meta: {
        version: 'v1.0.0',
        invariant: '4-route-topology',
      },
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}

/**
 * GET /api/topology
 * 
 * Returns topology routing documentation.
 */
export async function GET() {
  return NextResponse.json({
    success: true,
    timestamp: new Date().toISOString(),
    documentation: {
      description: '4-Route Topology Authority',
      routes: {
        '/route71': {
          condition: 'sovereign = true',
          purpose: 'Admitted claims with visibility granted',
        },
        '/route81': {
          condition: 'reserve = true',
          purpose: 'Maximum-priority sovereign assets',
        },
        '/route69': {
          condition: 'forensic = true AND sovereign = false',
          purpose: 'Forensic bridge for uncapped corroboration',
        },
        '/route70': {
          condition: 'sovereign = false AND forensic = false',
          purpose: 'Void boundary (blocked claims)',
        },
      },
      usage: {
        method: 'POST',
        body: {
          signal: {
            id: 'string',
            sovereign: 'boolean',
            forensic: 'boolean (optional)',
            reserve: 'boolean (optional)',
            score: 'number',
          },
        },
      },
    },
    _meta: {
      version: 'v1.0.0',
    },
  });
}
