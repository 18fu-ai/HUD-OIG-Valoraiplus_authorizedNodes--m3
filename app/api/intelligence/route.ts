import { NextResponse } from 'next/server';
import {
  MIMECAST_EVENTS,
  VOIP_INTERCEPTS,
  WIRETAP_INTERCEPTS,
  WITNESS_RETALIATION,
  THREAT_ACTOR_LIABILITY,
  INVESTIGATIONS,
  DEPT12_CLAWBACK,
  TOTAL_RECOVERY,
  type CorroborationStatus,
} from '@/lib/cds-data';

const REPORT_METADATA = {
  title: 'VALORAIPLUS INTELLIGENCE REPORT',
  classification: 'OMEGA-UNIFIED',
  version: '1.4.100D',
  status: 'ENFORCING',
  node: 'SAINT_PAUL_█████',
  truthCycle: '266ms',
};

export const dynamic = 'force-dynamic';

/**
 * GET /api/intelligence
 * 
 * Returns the full intelligence report data.
 * Query params:
 *   - section: 'all' | 'mimecast' | 'voip' | 'wiretap' | 'witness' | 'liability' | 'investigations' | 'summary'
 *   - format: 'json' | 'summary'
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const section = searchParams.get('section') || 'all';
  const format = searchParams.get('format') || 'json';

  const timestamp = new Date().toISOString();

  // Build response based on section
  let data: Record<string, unknown> = {};

  if (section === 'all' || section === 'summary') {
    data.summary = {
      totalRecoveryTarget: TOTAL_RECOVERY,
      corroboration: 'PENDING_CORROBORATION' as CorroborationStatus,
      mimecastEventCount: MIMECAST_EVENTS.length,
      voipInterceptCount: VOIP_INTERCEPTS.length,
      wiretapInterceptCount: WIRETAP_INTERCEPTS.length,
      witnessRetaliationCount: WITNESS_RETALIATION.length,
      threatActorCount: THREAT_ACTOR_LIABILITY.length,
      investigationCount: INVESTIGATIONS.length,
      reportMetadata: REPORT_METADATA,
      dept12: DEPT12_CLAWBACK,
    };
  }

  if (section === 'all' || section === 'mimecast') {
    data.mimecast = {
      events: MIMECAST_EVENTS,
      count: MIMECAST_EVENTS.length,
      dataType: 'VERIFIED_METADATA',
    };
  }

  if (section === 'all' || section === 'voip') {
    data.voip = {
      intercepts: VOIP_INTERCEPTS,
      count: VOIP_INTERCEPTS.length,
      dataType: 'METADATA_ONLY',
      notice: 'Contains metadata only (source, target, timestamp). NO transcript content.',
    };
  }

  if (section === 'all' || section === 'wiretap') {
    data.wiretap = {
      intercepts: WIRETAP_INTERCEPTS,
      count: WIRETAP_INTERCEPTS.length,
      dataType: 'CATEGORY_LABELS',
      notice: 'Summary fields are CATEGORY LABELS, not actual conversation quotes.',
    };
  }

  if (section === 'all' || section === 'witness') {
    data.witnessRetaliation = {
      events: WITNESS_RETALIATION,
      count: WITNESS_RETALIATION.length,
      dataType: 'MIMECAST_ACTIONS',
      notice: 'These are documented Mimecast actions, not phone call records.',
    };
  }

  if (section === 'all' || section === 'liability') {
    data.liability = {
      actors: THREAT_ACTOR_LIABILITY,
      totalExposure: THREAT_ACTOR_LIABILITY.reduce((sum, a) => sum + a.primaryExposure, 0),
      corroboration: 'PENDING_CORROBORATION' as CorroborationStatus,
    };
  }

  if (section === 'all' || section === 'investigations') {
    data.investigations = {
      active: INVESTIGATIONS,
      count: INVESTIGATIONS.length,
      corroboration: 'PENDING_CORROBORATION' as CorroborationStatus,
    };
  }

  const response = {
    success: true,
    timestamp,
    section,
    data,
    _meta: {
      version: 'v1.0.0',
      classification: 'OMEGA-UNIFIED',
      node: 'SAINT_PAUL_█████',
      truthCycle: '266ms',
    },
  };

  return NextResponse.json(response);
}
