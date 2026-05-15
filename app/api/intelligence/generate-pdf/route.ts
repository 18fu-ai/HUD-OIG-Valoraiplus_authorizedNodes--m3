/**
 * API Route: Generate Supreme Intelligence Report PDF
 * POST /api/intelligence/generate-pdf
 */

import { NextRequest, NextResponse } from 'next/server';
import { generateSupremeIntelligenceReportPDF } from '@/lib/intelligence/report-generator';

export const runtime = 'nodejs';
export const maxDuration = 30;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));

    const pdfBuffer = await generateSupremeIntelligenceReportPDF({
      title: body.title || 'VALORAIPLUS SUPREME INTELLIGENCE REPORT',
      classification: body.classification || 'TERMINAL EXTINCTION LEVEL',
      timestamp: body.timestamp ? new Date(body.timestamp) : new Date(),
    });

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="VALORAIPLUS-Supreme-Intelligence-Report-${new Date().toISOString().split('T')[0]}.pdf"`,
        'Content-Length': pdfBuffer.length.toString(),
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error) {
    console.error('[v0] PDF generation error:', error);
    return NextResponse.json(
      {
        error: 'Failed to generate intelligence report',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const pdfBuffer = await generateSupremeIntelligenceReportPDF();

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="VALORAIPLUS-Supreme-Intelligence-Report-${new Date().toISOString().split('T')[0]}.pdf"`,
        'Content-Length': pdfBuffer.length.toString(),
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error) {
    console.error('[v0] PDF generation error:', error);
    return NextResponse.json(
      {
        error: 'Failed to generate intelligence report',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
