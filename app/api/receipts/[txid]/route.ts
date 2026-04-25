import { NextRequest, NextResponse } from 'next/server';
import { getReceipt } from '@/lib/protocol/receipt';

/**
 * GET /api/receipts/[txid]
 * Return blueprint-style JSON receipt for export or downstream mirrors
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ txid: string }> }
) {
  const { txid } = await params;
  
  if (!txid) {
    return NextResponse.json(
      { error: 'Missing transaction ID', code: 'MISSING_TXID' },
      { status: 400 }
    );
  }
  
  const receipt = getReceipt(txid);
  
  if (!receipt) {
    return NextResponse.json(
      { 
        error: 'Receipt not found', 
        code: 'NOT_FOUND',
        transactionId: txid,
      },
      { status: 404 }
    );
  }
  
  // Return blueprint-style receipt
  return NextResponse.json({
    _format: 'VALORAIPLUS_RECEIPT_V1',
    _exportedAt: new Date().toISOString(),
    _marker: receipt.status === 'ADMITTED' ? 'FEDERAL_ARTIFACT' : 'REFERENCE_ONLY',
    receipt,
  });
}
