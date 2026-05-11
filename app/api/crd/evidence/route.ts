/**
 * VALORAIPLUS® CRD EVIDENCE API ROUTE
 * Production-Grade Evidence Package Delivery
 * REV_34 ETERNAL CAP — Zero Drift Verified
 * 
 * Serves the CRD Evidence Submission LaTeX file with:
 * - SHA-256 hash verification
 * - Immutable cache headers
 * - Download logging
 */

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { sha256, ANCHORS, EVIDENCE_PACKAGE, CRD_CASE } from '@/lib/sovereign-identity';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const filePath = path.join(process.cwd(), 'lib/crd-evidence.tex');
  
  try {
    // Read the LaTeX evidence file
    const texContent = fs.readFileSync(filePath, 'utf8');
    
    // Compute SHA-256 hash for integrity verification
    const hash = await sha256(texContent);
    
    // Log download attempt with timestamp
    const downloadLog = {
      timestamp: new Date().toISOString(),
      caseNumber: CRD_CASE.caseNumber,
      hash: hash.substring(0, 16) + '...',
      revision: ANCHORS.REVISION,
    };
    console.log('[CRD-EVIDENCE-DOWNLOAD]', JSON.stringify(downloadLog));

    // Return the file with security headers
    return new NextResponse(texContent, {
      headers: {
        'Content-Type': EVIDENCE_PACKAGE.contentType,
        'Content-Disposition': `attachment; filename="${EVIDENCE_PACKAGE.filename}"`,
        'X-CRD-Case': CRD_CASE.caseNumber,
        'X-CRD-Hash': hash,
        'X-CRD-Revision': ANCHORS.REVISION,
        'X-CRD-Runtime': ANCHORS.RUNTIME,
        'Cache-Control': 'no-store, no-cache, must-revalidate, immutable',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (error) {
    console.error('[CRD-EVIDENCE-ERROR]', error);
    
    return new NextResponse(
      JSON.stringify({
        error: 'Evidence package not found',
        caseNumber: CRD_CASE.caseNumber,
        status: 'SEALED',
        message: 'Contact system administrator',
      }),
      { 
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}

// Metadata endpoint for verification without download
export async function HEAD() {
  const filePath = path.join(process.cwd(), 'lib/crd-evidence.tex');
  
  try {
    const texContent = fs.readFileSync(filePath, 'utf8');
    const hash = await sha256(texContent);
    const stats = fs.statSync(filePath);

    return new NextResponse(null, {
      status: 200,
      headers: {
        'X-CRD-Case': CRD_CASE.caseNumber,
        'X-CRD-Hash': hash,
        'X-CRD-Revision': ANCHORS.REVISION,
        'X-CRD-Size': stats.size.toString(),
        'X-CRD-Modified': stats.mtime.toISOString(),
      },
    });
  } catch {
    return new NextResponse(null, { status: 404 });
  }
}
