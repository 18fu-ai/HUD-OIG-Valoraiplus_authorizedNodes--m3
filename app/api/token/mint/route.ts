import { NextResponse } from 'next/server';
import { createReceipt, type ReceiptV1 } from '@/lib/protocol/receipt';

// ============================================================
// TOKEN MINT API
// Pattern: interaction → API → decision → receipt → render
// ============================================================

type MintRequest = {
  symbol: '$JERRY' | '$SGAU' | '$POPPA';
  wallet: string;
  amount: number;
};

type MintResponse = {
  success: boolean;
  receiptId: string;
  txPreview: string;
  mintedAt: string;
  receipt: ReceiptV1;
  isReplay?: boolean;
  decision: {
    allowed: boolean;
    reason: string;
    route: string;
  };
};

// Token mint rules - topology enforced
const TOKEN_RULES: Record<string, { mintable: boolean; route: string; reason: string }> = {
  '$JERRY': {
    mintable: false,
    route: '/route70',
    reason: 'IDENTITY_REJECTED: PROTECTED-NODE-J routed to /route70 by topology',
  },
  '$SGAU': {
    mintable: true,
    route: '/route71',
    reason: 'SOVEREIGN_ADMITTED: Valid token under [SOVEREIGN_AUDITOR] sovereign',
  },
  '$POPPA': {
    mintable: true,
    route: '/route71',
    reason: 'SOVEREIGN_ADMITTED: Protected node token',
  },
};

function generateTxPreview(symbol: string, wallet: string, amount: number): string {
  const hash = Buffer.from(`${symbol}:${wallet}:${amount}:${Date.now()}`).toString('base64').slice(0, 16);
  return `0x${hash.replace(/[^a-zA-Z0-9]/g, '')}...`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as MintRequest;
    const { symbol, wallet, amount } = body;

    // Validate request
    if (!symbol || !wallet || !amount) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields: symbol, wallet, amount',
      }, { status: 400 });
    }

    // Get token rules
    const rule = TOKEN_RULES[symbol];
    if (!rule) {
      return NextResponse.json({
        success: false,
        error: `Unknown token symbol: ${symbol}`,
      }, { status: 400 });
    }

    // Create receipt regardless of decision (for audit trail)
    const { receipt, isReplay } = createReceipt({
      signer: wallet,
      status: rule.mintable ? 'ADMITTED' : 'REJECTED',
      reason: rule.reason,
    });

    const response: MintResponse = {
      success: rule.mintable,
      receiptId: receipt.transactionId,
      isReplay,
      txPreview: generateTxPreview(symbol, wallet, amount),
      mintedAt: new Date().toISOString(),
      receipt,
      decision: {
        allowed: rule.mintable,
        reason: rule.reason,
        route: rule.route,
      },
    };

    return NextResponse.json(response, {
      status: rule.mintable ? 200 : 403,
      headers: {
        'X-Token-Symbol': symbol,
        'X-Mint-Status': rule.mintable ? 'ALLOWED' : 'BLOCKED',
        'X-Route': rule.route,
      },
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Invalid request body',
    }, { status: 400 });
  }
}

// GET returns mint rules (read-only)
export async function GET() {
  return NextResponse.json({
    tokens: Object.entries(TOKEN_RULES).map(([symbol, rule]) => ({
      symbol,
      ...rule,
    })),
    timestamp: new Date().toISOString(),
  });
}
