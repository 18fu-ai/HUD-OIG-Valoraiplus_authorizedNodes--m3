import { NextResponse } from 'next/server';
import { 
  waterfallFirewall, 
  waterfallFirewallBatch,
  evaluateCID,
  evaluateCIDBatch,
  type FirewallSignal,
  type CIDInput,
} from '@/lib/protocol/server';

export const dynamic = 'force-dynamic';

/**
 * POST /api/firewall
 * 
 * Evaluates signals through the waterfall firewall.
 * Body: 
 *   { signal: FirewallSignal } — single signal
 *   { signals: FirewallSignal[] } — batch processing
 *   { cid: CIDInput } — CID routing
 *   { cids: CIDInput[] } — batch CID routing
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { signal, signals, cid, cids } = body;

    // CID batch routing
    if (cids && Array.isArray(cids)) {
      const results = evaluateCIDBatch(cids as CIDInput[]);
      return NextResponse.json({
        success: true,
        timestamp: new Date().toISOString(),
        type: 'cid_batch',
        results,
        summary: {
          total: results.length,
          allowed: results.filter(r => r.decision === 'ALLOW').length,
          quarantined: results.filter(r => r.decision === 'QUARANTINE').length,
          blocked: results.filter(r => r.decision === 'BLOCK').length,
        },
      });
    }

    // Single CID routing
    if (cid) {
      const result = evaluateCID(cid as CIDInput);
      return NextResponse.json({
        success: true,
        timestamp: new Date().toISOString(),
        type: 'cid',
        input: cid,
        result,
      });
    }

    // Batch signal processing
    if (signals && Array.isArray(signals)) {
      const results = waterfallFirewallBatch(signals as FirewallSignal[]);
      return NextResponse.json({
        success: true,
        timestamp: new Date().toISOString(),
        type: 'signal_batch',
        results,
        summary: {
          total: results.length,
          allowed: results.filter(r => r.decision === 'ALLOW').length,
          blocked: results.filter(r => r.decision === 'BLOCK').length,
          route69: results.filter(r => r.decision === 'ROUTE69_FORENSIC').length,
          route70: results.filter(r => r.decision === 'ROUTE70_VOID').length,
          route81: results.filter(r => r.decision === 'ROUTE81_RESERVE').length,
        },
      });
    }

    // Single signal processing
    if (signal) {
      const result = waterfallFirewall(signal as FirewallSignal);
      return NextResponse.json({
        success: true,
        timestamp: new Date().toISOString(),
        type: 'signal',
        input: signal,
        result,
      });
    }

    return NextResponse.json({
      success: false,
      error: 'Missing required field: signal, signals, cid, or cids',
    }, { status: 400 });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}

/**
 * GET /api/firewall
 * 
 * Returns firewall documentation.
 */
export async function GET() {
  return NextResponse.json({
    success: true,
    timestamp: new Date().toISOString(),
    documentation: {
      description: 'Waterfall Firewall Admission Gate',
      decisions: {
        ALLOW: 'Verified signal with approved lineage → /route71',
        ROUTE69_FORENSIC: 'Forensic signal requiring corroboration → /route69',
        ROUTE70_VOID: 'Unverified or void signal → /route70',
        ROUTE81_RESERVE: 'Maximum-priority reserve signal → /route81',
        BLOCK: 'Terminal denial',
      },
      cidDecisions: {
        ALLOW: 'Verified CID + approved lineage → /route71',
        QUARANTINE: 'Verified CID + unknown lineage → /route70',
        BLOCK: 'Unverified CID → /route70',
      },
      usage: {
        signal: {
          method: 'POST',
          body: {
            signal: {
              id: 'string',
              type: "'sovereign' | 'forensic' | 'reserve' | 'standard'",
              lineage: 'string (optional)',
              verified: 'boolean',
            },
          },
        },
        batch: {
          method: 'POST',
          body: { signals: 'FirewallSignal[]' },
        },
        cid: {
          method: 'POST',
          body: {
            cid: {
              cid: 'string',
              verified: 'boolean',
              lineage: 'string (optional)',
            },
          },
        },
      },
    },
  });
}
