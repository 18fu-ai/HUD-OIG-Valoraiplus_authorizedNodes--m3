// POST /api/signal/verify
// Canonical runtime signal verification endpoint
// Policy Version: REV_33

import { NextResponse } from 'next/server';
import {
  type VerifyRequest,
  type VerifyResponse,
  verifySignal,
} from '@/lib/protocol/verify-contract';

export async function POST(request: Request): Promise<NextResponse<VerifyResponse | { error: string }>> {
  try {
    const body = (await request.json()) as VerifyRequest;
    
    // Validate signal structure
    if (!body.signal || !body.signal.id || !body.signal.invariantState || !body.signal.status) {
      return NextResponse.json(
        { error: 'Invalid signal: requires id, invariantState, status' },
        { status: 400 }
      );
    }
    
    // Execute verification
    const response = verifySignal(body.signal);
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('[Signal Verify API] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(): Promise<NextResponse> {
  return NextResponse.json({
    protocol: 'VALORAIPLUS-SIGNAL-VERIFY',
    endpoint: '/api/signal/verify',
    policyVersion: 'REV_33',
    description: 'Runtime signal verification with policy decision and receipt',
    invariant: {
      admitted: 'VALID + VERIFIED → /route71',
      adversary: 'ADVERSARY → /route70',
      blocked: 'anything else → /route70',
    },
    usage: {
      method: 'POST',
      body: {
        signal: {
          id: 'string (required)',
          invariantState: 'VALID | BLOCKED | PENDING',
          status: 'VERIFIED | BLOCKED | PENDING | ADVERSARY',
          payload: 'any (optional)',
        },
      },
      response: {
        signal: 'original signal',
        decision: {
          admitted: 'boolean',
          route: '/route70 | /route71',
          reasonCode: 'POLICY_ADMITTED | INVARIANT_BLOCKED | ADVERSARY_DETECTED',
          visibilityGranted: 'boolean',
        },
        receipt: {
          receiptVersion: 'v1',
          receiptHash: 'deterministic hash',
        },
      },
    },
    origin: 'USA',
  });
}
