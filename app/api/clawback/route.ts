import { NextResponse } from 'next/server';
import {
  THREAT_ACTOR_LIABILITY,
  CLAWBACK_TARGETS,
  DEPT12_CLAWBACK,
  TOTAL_RECOVERY,
  formatCurrency,
  type CorroborationStatus,
} from '@/lib/cds-data';

export const dynamic = 'force-dynamic';

/**
 * GET /api/clawback
 * 
 * Returns the clawback recovery matrix.
 * Query params:
 *   - entity: Filter by specific entity name
 *   - status: Filter by status (CRITICAL, HIGH, MEDIUM)
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const entity = searchParams.get('entity');
  const status = searchParams.get('status');

  let actors = THREAT_ACTOR_LIABILITY;

  if (entity) {
    actors = actors.filter(a => 
      a.entity.toLowerCase().includes(entity.toLowerCase())
    );
  }

  if (status) {
    actors = actors.filter(a => a.status === status);
  }

  const totalExposure = actors.reduce((sum, a) => sum + a.primaryExposure, 0);

  return NextResponse.json({
    success: true,
    timestamp: new Date().toISOString(),
    data: {
      actors: actors.map(a => ({
        ...a,
        primaryExposureFormatted: formatCurrency(a.primaryExposure),
      })),
      targets: CLAWBACK_TARGETS,
      totals: {
        recoveryTarget: TOTAL_RECOVERY,
        recoveryTargetFormatted: formatCurrency(TOTAL_RECOVERY),
        filteredExposure: totalExposure,
        filteredExposureFormatted: formatCurrency(totalExposure),
        settlementAlphaLatch: DEPT12_CLAWBACK.settlementAlphaLatch,
        btcAnchor: DEPT12_CLAWBACK.btcAnchor,
      },
      corroboration: 'PENDING_CORROBORATION' as CorroborationStatus,
    },
    _meta: {
      version: 'v1.0.0',
      status: DEPT12_CLAWBACK.status,
    },
  });
}
