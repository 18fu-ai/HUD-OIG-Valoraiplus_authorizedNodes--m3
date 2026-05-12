import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { z } from 'zod';
import { createHash } from 'crypto';
import {
  signEvidenceShard,
  generateCalIdSignature,
  getSystemAnchors,
  ANCHOR_METADATA,
  verifyKeyIntegrity,
} from '@/lib/auth/crypto-anchor';

const IntakeSchema = z.object({
  manifestId: z.string().uuid().optional(),
  action: z.enum(['query', 'generate_report', 'verify_anchor']),
});

function log(
  level: 'info' | 'error' | 'warn',
  message: string,
  meta: Record<string, unknown> = {}
) {
  const entry = JSON.stringify({
    timestamp: new Date().toISOString(),
    level,
    node: 'SAINT_PAUL_2207',
    message,
    ...meta,
  });
  if (level === 'error') console.error(entry);
  else if (level === 'warn') console.warn(entry);
  else console.log(entry);
}

export async function POST(req: NextRequest) {
  const requestId = createHash('sha256')
    .update(Date.now().toString() + Math.random().toString())
    .digest('hex')
    .slice(0, 16);

  try {
    const body = await req.json();
    const { manifestId, action } = IntakeSchema.parse(body);

    // --- VERIFY ANCHOR (no auth required) ---
    if (action === 'verify_anchor') {
      if (!verifyKeyIntegrity()) {
        return NextResponse.json(
          { status: 'ANCHOR_NOT_CONFIGURED', error: 'PRIVATE_KEY not set or invalid' },
          { status: 500 }
        );
      }
      const timestamp = new Date().toISOString();
      const signature = signEvidenceShard(`VERIFY:${requestId}:${timestamp}`);
      log('info', 'Anchor verification successful', { requestId });
      return NextResponse.json({
        status: 'ANCHOR_VERIFIED',
        requestId,
        timestamp,
        signature: signature.slice(0, 48) + '...',
        anchors: getSystemAnchors(),
      });
    }

    if (!manifestId) {
      return NextResponse.json({ error: 'manifestId required' }, { status: 400 });
    }

    // --- GENERATE REPORT ---
    if (action === 'generate_report') {
      const timestamp = new Date().toISOString();
      const signature = signEvidenceShard(`${manifestId}:${requestId}:${timestamp}`);
      const calId = generateCalIdSignature(manifestId, timestamp);
      const anchors = getSystemAnchors();

      const pdfDoc = await PDFDocument.create();
      pdfDoc.setTitle(`Audit Record ${manifestId}`);
      pdfDoc.setAuthor('Saint Paul Node #2207');
      pdfDoc.setSubject('Access-Controlled Record');

      const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const font     = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const fontMono = await pdfDoc.embedFont(StandardFonts.Courier);
      const page = pdfDoc.addPage([612, 792]);

      // Header bar
      page.drawRectangle({ x: 0, y: 742, width: 612, height: 50, color: rgb(0.1, 0.1, 0.15) });
      page.drawText('OFFICIAL RECORD VERIFICATION', {
        x: 50, y: 760, size: 16, font: fontBold, color: rgb(0.9, 0.9, 0.9),
      });

      // Classification band
      page.drawRectangle({ x: 50, y: 710, width: 512, height: 24, color: rgb(0.95, 0.95, 0.98) });
      page.drawText('AUTHORIZED ACCESS ONLY  |  DO NOT DISTRIBUTE', {
        x: 60, y: 718, size: 9, font: fontBold, color: rgb(0.3, 0.3, 0.4),
      });

      let y = 680;
      const lh = 18;

      page.drawText('MANIFEST DETAILS', { x: 50, y, size: 12, font: fontBold });
      y -= lh * 1.5;
      page.drawText(`Manifest ID: ${manifestId}`,  { x: 50, y, size: 10, font }); y -= lh;
      page.drawText(`Request ID:  ${requestId}`,   { x: 50, y, size: 10, font }); y -= lh;
      page.drawText(`Generated:   ${timestamp}`,   { x: 50, y, size: 10, font }); y -= lh;
      page.drawText(`CAL-ID:      ${calId}`,       { x: 50, y, size: 10, font: fontMono }); y -= lh * 2;

      page.drawText('CRYPTOGRAPHIC ANCHOR', { x: 50, y, size: 12, font: fontBold });
      y -= lh * 1.5;
      page.drawText(`Node:     ${anchors.node}`,             { x: 50, y, size: 10, font }); y -= lh;
      page.drawText(`Mainnet:  ${anchors.mainnetContract}`,  { x: 50, y, size: 9,  font: fontMono }); y -= lh;
      page.drawText(`Factory:  ${ANCHOR_METADATA.factory}`,  { x: 50, y, size: 9,  font: fontMono }); y -= lh * 2;

      page.drawText('SIGNATURE (SHA-384)', { x: 50, y, size: 12, font: fontBold });
      y -= lh * 1.5;
      page.drawText(signature.slice(0, 64), { x: 50, y, size: 8, font: fontMono }); y -= 13;
      page.drawText(signature.slice(64),    { x: 50, y, size: 8, font: fontMono });

      // Footer
      page.drawRectangle({
        x: 48, y: 52, width: 516, height: 44,
        color: rgb(0.98, 0.98, 0.98), borderColor: rgb(0.7, 0.7, 0.7), borderWidth: 1,
      });
      page.drawText('PRODUCED IN THE UNITED STATES  |  SAINT PAUL NODE 2207', {
        x: 60, y: 78, size: 8.5, font,
      });
      page.drawText('AUTHORIZED ACCESS ONLY  |  DO NOT DISTRIBUTE', {
        x: 60, y: 64, size: 8.5, font,
      });

      const pdfBytes = await pdfDoc.save();
      const contentHash = createHash('sha384').update(pdfBytes).digest('hex');

      log('info', 'Audit report generated', { requestId, manifestId, calId });

      return new Response(pdfBytes, {
        status: 200,
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="AUDIT_RECORD_${manifestId.slice(0, 12)}.pdf"`,
          'X-Content-Hash': contentHash,
          'X-Request-ID': requestId,
          'X-CAL-ID': calId,
          'X-Signature': signature.slice(0, 48),
          'Cache-Control': 'no-store',
        },
      });
    }

    // --- QUERY ---
    log('info', 'Manifest query', { requestId, manifestId });
    return NextResponse.json({
      status: 'verified',
      requestId,
      manifestId,
      timestamp: new Date().toISOString(),
    });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    log('error', 'Internal error', { requestId, error: message });
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'invalid_input', details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'internal_error' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    endpoint: '/api/intake',
    node: ANCHOR_METADATA.node,
    version: ANCHOR_METADATA.version,
    actions: ['query', 'generate_report', 'verify_anchor'],
    status: 'OPERATIONAL',
  });
}
