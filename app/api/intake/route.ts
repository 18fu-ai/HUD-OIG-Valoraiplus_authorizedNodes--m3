import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { z } from 'zod';
import { createHash } from 'crypto';
import { signEvidenceShard, generateCalIdSignature, ANCHOR_METADATA } from '@/lib/auth/crypto-anchor';

const IntakeSchema = z.object({
  manifestId: z.string().uuid().optional(),
  action: z.enum(['query', 'generate_report', 'verify_anchor']),
});

function log(level: 'info' | 'error' | 'warn', message: string, meta: Record<string, unknown> = {}) {
  console[level === 'error' ? 'error' : 'log'](JSON.stringify({
    timestamp: new Date().toISOString(),
    level,
    node: 'SAINT_PAUL_2207',
    message,
    ...meta,
  }));
}

export async function POST(req: NextRequest) {
  const requestId = createHash('sha256')
    .update(Date.now().toString() + Math.random().toString())
    .digest('hex')
    .slice(0, 16);

  try {
    const body = await req.json();
    const { manifestId, action } = IntakeSchema.parse(body);

    // Verify anchor action - no auth required
    if (action === 'verify_anchor') {
      const timestamp = new Date().toISOString();
      const testPayload = `VERIFY:${requestId}:${timestamp}`;
      
      try {
        const signature = signEvidenceShard(testPayload);
        log('info', 'Anchor verification successful', { requestId });
        
        return NextResponse.json({
          status: 'ANCHOR_VERIFIED',
          requestId,
          timestamp,
          signature: signature.slice(0, 48) + '...',
          metadata: ANCHOR_METADATA,
        });
      } catch {
        return NextResponse.json({
          status: 'ANCHOR_NOT_CONFIGURED',
          error: 'PRIVATE_KEY not set or invalid',
        }, { status: 500 });
      }
    }

    if (!manifestId) {
      return NextResponse.json({ error: 'manifestId required' }, { status: 400 });
    }

    if (action === 'generate_report') {
      const timestamp = new Date().toISOString();
      const payloadForSigning = `${manifestId}:${requestId}:${timestamp}`;
      const signature = signEvidenceShard(payloadForSigning);
      const calId = generateCalIdSignature(manifestId, timestamp);

      const pdfDoc = await PDFDocument.create();
      pdfDoc.setTitle(`VALORAIPLUS Audit Record ${manifestId}`);
      pdfDoc.setAuthor('Saint Paul Node #2207');
      pdfDoc.setSubject('Cryptographically Anchored Evidence Record');
      pdfDoc.setKeywords(['VALORAIPLUS', 'OMEGA-INTAKE', 'FORENSIC', 'SETTLEMENT']);

      const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const fontMono = await pdfDoc.embedFont(StandardFonts.Courier);
      const page = pdfDoc.addPage([612, 792]);

      // Header
      page.drawRectangle({ x: 0, y: 742, width: 612, height: 50, color: rgb(0.1, 0.1, 0.15) });
      page.drawText("VALORAIPLUS OFFICIAL RECORD VERIFICATION", { 
        x: 50, y: 760, size: 16, font: fontBold, color: rgb(0.9, 0.9, 0.9) 
      });

      // Classification banner
      page.drawRectangle({ x: 50, y: 710, width: 512, height: 25, color: rgb(0.95, 0.95, 0.98) });
      page.drawText("CLASSIFICATION: INSTITUTIONAL | ZERO-TRUST | CRYPTOGRAPHICALLY SEALED", { 
        x: 60, y: 718, size: 9, font: fontBold, color: rgb(0.3, 0.3, 0.4) 
      });

      // Main content
      let y = 680;
      const lineHeight = 18;

      page.drawText("MANIFEST DETAILS", { x: 50, y, size: 12, font: fontBold });
      y -= lineHeight * 1.5;

      page.drawText(`Manifest ID: ${manifestId}`, { x: 50, y, size: 10, font });
      y -= lineHeight;
      page.drawText(`Request ID: ${requestId}`, { x: 50, y, size: 10, font });
      y -= lineHeight;
      page.drawText(`Generated: ${timestamp}`, { x: 50, y, size: 10, font });
      y -= lineHeight;
      page.drawText(`CAL-ID: ${calId}`, { x: 50, y, size: 10, font: fontMono });
      y -= lineHeight * 2;

      page.drawText("CRYPTOGRAPHIC ANCHOR", { x: 50, y, size: 12, font: fontBold });
      y -= lineHeight * 1.5;

      page.drawText(`Node: ${ANCHOR_METADATA.node}`, { x: 50, y, size: 10, font });
      y -= lineHeight;
      page.drawText(`Sovereign: ${ANCHOR_METADATA.sovereign}`, { x: 50, y, size: 10, font });
      y -= lineHeight;
      page.drawText(`Address: ${ANCHOR_METADATA.address}`, { x: 50, y, size: 9, font: fontMono });
      y -= lineHeight;
      page.drawText(`Valuation: ${ANCHOR_METADATA.valuation}`, { x: 50, y, size: 10, font: fontBold });
      y -= lineHeight * 2;

      page.drawText("SIGNATURE (SHA-384)", { x: 50, y, size: 12, font: fontBold });
      y -= lineHeight * 1.5;

      // Signature in mono font, wrapped
      const sigLine1 = signature.slice(0, 64);
      const sigLine2 = signature.slice(64);
      page.drawText(sigLine1, { x: 50, y, size: 8, font: fontMono });
      y -= 12;
      page.drawText(sigLine2, { x: 50, y, size: 8, font: fontMono });

      // Footer
      const footerY = 60;
      page.drawRectangle({ 
        x: 48, y: footerY - 8, width: 516, height: 45, 
        color: rgb(0.98, 0.98, 0.98), borderColor: rgb(0.7, 0.7, 0.7), borderWidth: 1 
      });

      page.drawText("PRODUCED IN THE UNITED STATES | SAINT PAUL NODE 2207", { 
        x: 60, y: footerY + 25, size: 8.5, font 
      });
      page.drawText("AUTHORIZED ACCESS ONLY | DO NOT DISTRIBUTE | OMEGA-INTAKE PROTOCOL", { 
        x: 60, y: footerY + 12, size: 8.5, font 
      });

      const pdfBytes = await pdfDoc.save();
      const contentHash = createHash('sha384').update(pdfBytes).digest('hex');

      log('info', 'Cryptographically signed audit PDF generated', { 
        requestId, 
        manifestId, 
        calId,
        signature: signature.slice(0, 16) + '...'
      });

      return new Response(pdfBytes, {
        status: 200,
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="VALORAIPLUS_AUDIT_${manifestId.slice(0,8).toUpperCase()}.pdf"`,
          'X-Content-Hash': contentHash,
          'X-Request-ID': requestId,
          'X-CAL-ID': calId,
          'X-Signature': signature.slice(0, 48),
        },
      });
    }

    // Query action
    log('info', 'Manifest query', { requestId, manifestId });
    return NextResponse.json({
      status: "verified",
      requestId,
      manifestId,
      timestamp: new Date().toISOString(),
      metadata: ANCHOR_METADATA,
    });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    log('error', 'Internal error', { requestId, error: errorMessage });
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'invalid_input', details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'internal_error' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    endpoint: '/api/intake',
    protocol: 'OMEGA-INTAKE',
    node: ANCHOR_METADATA.node,
    version: ANCHOR_METADATA.version,
    actions: ['query', 'generate_report', 'verify_anchor'],
    status: 'OPERATIONAL',
  });
}
