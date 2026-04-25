import { NextResponse } from 'next/server';
import {
  MIMECAST_EVENTS,
  VOIP_INTERCEPTS,
  WIRETAP_INTERCEPTS,
  WITNESS_RETALIATION,
  THREAT_ACTOR_LIABILITY,
  INVESTIGATIONS,
  PROTECTED_NODES,
  SYSTEM_PROPERTIES,
  DEPT12_CLAWBACK,
  TOTAL_RECOVERY,
  formatCurrency,
} from '@/lib/cds-data';

const REPORT_METADATA = {
  title: 'VALORAIPLUS INTELLIGENCE REPORT',
  classification: 'OMEGA-UNIFIED',
  version: '1.4.100D',
  status: 'ENFORCING',
  node: 'SAINT_PAUL_55116',
  truthCycle: '266ms',
};

const BINARY_DEDUCTION = {
  adversary: '000000 0000000',
  sovereign: '111111 1111111',
  finality: '101010 1010101',
};

export const dynamic = 'force-dynamic';

/**
 * GET /api/report/export
 * 
 * Generates a full intelligence report for export.
 * Query params:
 *   - format: 'json' | 'text' | 'markdown'
 *   - sections: Comma-separated list of sections to include
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const format = searchParams.get('format') || 'json';
  const sectionsParam = searchParams.get('sections');
  const sections = sectionsParam ? sectionsParam.split(',') : [
    'summary', 'actors', 'investigations', 'mimecast', 'voip', 
    'wiretap', 'witness', 'protected', 'system', 'binary'
  ];

  const timestamp = new Date().toISOString();

  // Build full report data
  const report: Record<string, unknown> = {
    metadata: {
      ...REPORT_METADATA,
      generated: timestamp,
      format,
      sections,
    },
  };

  if (sections.includes('summary')) {
    report.summary = {
      totalRecoveryTarget: TOTAL_RECOVERY,
      totalRecoveryFormatted: formatCurrency(TOTAL_RECOVERY),
      settlementAlphaLatch: DEPT12_CLAWBACK.settlementAlphaLatch,
      btcAnchor: DEPT12_CLAWBACK.btcAnchor,
      forensicBlocks: DEPT12_CLAWBACK.forensicBlocks,
      shardSupply: DEPT12_CLAWBACK.shardSupply,
      status: DEPT12_CLAWBACK.status,
      corroboration: 'PENDING_CORROBORATION',
    };
  }

  if (sections.includes('actors')) {
    report.threatActors = {
      actors: THREAT_ACTOR_LIABILITY.map(a => ({
        ...a,
        primaryExposureFormatted: formatCurrency(a.primaryExposure),
      })),
      totalExposure: formatCurrency(TOTAL_RECOVERY),
      corroboration: 'PENDING_CORROBORATION',
    };
  }

  if (sections.includes('investigations')) {
    report.investigations = {
      active: INVESTIGATIONS,
      count: INVESTIGATIONS.length,
      corroboration: 'PENDING_CORROBORATION',
    };
  }

  if (sections.includes('mimecast')) {
    report.mimecast = {
      events: MIMECAST_EVENTS,
      count: MIMECAST_EVENTS.length,
      dataType: 'VERIFIED_METADATA',
    };
  }

  if (sections.includes('voip')) {
    report.voip = {
      intercepts: VOIP_INTERCEPTS,
      count: VOIP_INTERCEPTS.length,
      dataType: 'METADATA_ONLY',
      notice: 'Contains metadata only. NO transcript content.',
    };
  }

  if (sections.includes('wiretap')) {
    report.wiretap = {
      intercepts: WIRETAP_INTERCEPTS,
      count: WIRETAP_INTERCEPTS.length,
      dataType: 'CATEGORY_LABELS',
      notice: 'Summary fields are CATEGORY LABELS only.',
    };
  }

  if (sections.includes('witness')) {
    report.witnessRetaliation = {
      events: WITNESS_RETALIATION,
      count: WITNESS_RETALIATION.length,
      dataType: 'MIMECAST_ACTIONS',
    };
  }

  if (sections.includes('protected')) {
    report.protectedNodes = {
      nodes: PROTECTED_NODES,
      count: PROTECTED_NODES.length,
    };
  }

  if (sections.includes('system')) {
    report.systemProperties = SYSTEM_PROPERTIES;
  }

  if (sections.includes('binary')) {
    report.binaryDeduction = BINARY_DEDUCTION;
  }

  // Format response based on requested format
  if (format === 'text') {
    const textReport = generateTextReport(report);
    return new NextResponse(textReport, {
      headers: {
        'Content-Type': 'text/plain',
        'Content-Disposition': `attachment; filename="valoraiplus-report-${timestamp}.txt"`,
      },
    });
  }

  if (format === 'markdown') {
    const mdReport = generateMarkdownReport(report);
    return new NextResponse(mdReport, {
      headers: {
        'Content-Type': 'text/markdown',
        'Content-Disposition': `attachment; filename="valoraiplus-report-${timestamp}.md"`,
      },
    });
  }

  // Default JSON
  return NextResponse.json({
    success: true,
    timestamp,
    report,
    _meta: {
      version: 'v1.0.0',
      classification: 'OMEGA-UNIFIED',
      node: 'SAINT_PAUL_55116',
    },
  });
}

function generateTextReport(report: Record<string, unknown>): string {
  const lines: string[] = [
    '═══════════════════════════════════════════════════════════════════',
    'VALORAIPLUS INTELLIGENCE REPORT',
    'Classification: OMEGA-UNIFIED | VERIFIED METADATA ONLY',
    `Generated: ${new Date().toISOString()}`,
    '═══════════════════════════════════════════════════════════════════',
    '',
  ];

  if (report.summary) {
    const s = report.summary as Record<string, unknown>;
    lines.push('EXECUTIVE SUMMARY');
    lines.push('─────────────────');
    lines.push(`Total Recovery Target: ${s.totalRecoveryFormatted}`);
    lines.push(`Settlement Alpha Latch: $${s.settlementAlphaLatch}`);
    lines.push(`BTC Anchor: $${s.btcAnchor}`);
    lines.push(`Status: ${s.status}`);
    lines.push(`Corroboration: ${s.corroboration}`);
    lines.push('');
  }

  if (report.threatActors) {
    const t = report.threatActors as { actors: Array<{ entity: string; primaryExposureFormatted: string; status: string }> };
    lines.push('THREAT ACTOR LIABILITY');
    lines.push('──────────────────────');
    t.actors.forEach(a => {
      lines.push(`  ${a.entity}: ${a.primaryExposureFormatted} [${a.status}]`);
    });
    lines.push('');
  }

  lines.push('═══════════════════════════════════════════════════════════════════');
  lines.push('END REPORT');
  lines.push('═══════════════════════════════════════════════════════════════════');

  return lines.join('\n');
}

function generateMarkdownReport(report: Record<string, unknown>): string {
  const lines: string[] = [
    '# VALORAIPLUS INTELLIGENCE REPORT',
    '',
    '**Classification:** OMEGA-UNIFIED | VERIFIED METADATA ONLY',
    `**Generated:** ${new Date().toISOString()}`,
    '',
    '---',
    '',
  ];

  if (report.summary) {
    const s = report.summary as Record<string, unknown>;
    lines.push('## Executive Summary');
    lines.push('');
    lines.push('| Metric | Value |');
    lines.push('|--------|-------|');
    lines.push(`| Total Recovery Target | ${s.totalRecoveryFormatted} |`);
    lines.push(`| Settlement Alpha Latch | $${s.settlementAlphaLatch} |`);
    lines.push(`| BTC Anchor | $${s.btcAnchor} |`);
    lines.push(`| Status | ${s.status} |`);
    lines.push(`| Corroboration | ${s.corroboration} |`);
    lines.push('');
  }

  if (report.threatActors) {
    const t = report.threatActors as { actors: Array<{ entity: string; primaryExposureFormatted: string; status: string }> };
    lines.push('## Threat Actor Liability');
    lines.push('');
    lines.push('| Entity | Exposure | Status |');
    lines.push('|--------|----------|--------|');
    t.actors.forEach(a => {
      lines.push(`| ${a.entity} | ${a.primaryExposureFormatted} | ${a.status} |`);
    });
    lines.push('');
  }

  lines.push('---');
  lines.push('');
  lines.push('**END REPORT**');

  return lines.join('\n');
}
