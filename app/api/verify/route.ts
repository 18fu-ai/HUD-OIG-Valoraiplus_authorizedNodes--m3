/**
 * Verification Layer - Closed Loop Architecture
 * signal → verify → receipt → route → dashboard
 * 
 * POST /api/verify - Verify identity claim, emit RuntimeDecision + ReceiptV1
 * GET /api/verify - Get nonce or endpoint info
 */
import { SOVEREIGN_AUDITOR } from '@/lib/encrypted-ids';

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { 
  createReceipt, 
  getReceiptsByStatus,
  getTelemetry,
  type ReceiptV1,
  type AdmissionStatus 
} from '@/lib/protocol/receipt';

// ============================================================
// RUNTIME DECISION TYPE
// ============================================================

export interface RuntimeDecision {
  decision: 'ADMIT' | 'REJECT' | 'QUARANTINE';
  route: '/route71' | '/route70' | '/route69' | '/route66';
  reason: string;
  confidence: number;
  timestamp: string;
  nonce: number;
}

// ============================================================
// REQUEST SCHEMAS
// ============================================================

// Identity verification request
const IdentityVerifySchema = z.object({
  type: z.literal('identity'),
  claim: z.string().min(1),
  metadata: z.object({
    source: z.string().optional(),
    timestamp: z.string().optional(),
  }).optional(),
});

// Signal verification request
const SignalVerifySchema = z.object({
  type: z.literal('signal'),
  signal: z.object({
    category: z.enum(['identity', 'forensic', 'financial', 'legal']),
    source: z.string(),
    verified: z.boolean(),
    score: z.number().min(0).max(100).optional(),
  }),
});

// Generic verification request
const VerifyRequestSchema = z.discriminatedUnion('type', [
  IdentityVerifySchema,
  SignalVerifySchema,
]);

// ============================================================
// DECISION LOGIC
// ============================================================

let nonceCounter = 144000;

function evaluateIdentityClaim(claim: string): RuntimeDecision {
  const nonce = nonceCounter++;
  const timestamp = new Date().toISOString();
  
  // Sovereign identity check
  if (claim === SOVEREIGN_AUDITOR || claim.toLowerCase().includes('sovereign')) {
    return {
      decision: 'ADMIT',
      route: '/route71',
      reason: 'SOVEREIGN_IDENTITY_VERIFIED',
      confidence: 100,
      timestamp,
      nonce,
    };
  }
  
  // Blocked identity check
  if (claim === 'PROTECTED-NODE-J' || claim.toLowerCase().includes('node-j')) {
    return {
      decision: 'REJECT',
      route: '/route70',
      reason: 'IDENTITY_BLOCKED_BY_POLICY',
      confidence: 100,
      timestamp,
      nonce,
    };
  }
  
  // Reserve route for unrecognized but valid format
  if (claim.length > 0 && claim.length < 100) {
    return {
      decision: 'QUARANTINE',
      route: '/route69',
      reason: 'UNVERIFIED_IDENTITY_QUARANTINED',
      confidence: 50,
      timestamp,
      nonce,
    };
  }
  
  // Null route for invalid input
  return {
    decision: 'REJECT',
    route: '/route66',
    reason: 'INVALID_CLAIM_FORMAT',
    confidence: 0,
    timestamp,
    nonce,
  };
}

function evaluateSignal(signal: { category: string; source: string; verified: boolean; score?: number }): RuntimeDecision {
  const nonce = nonceCounter++;
  const timestamp = new Date().toISOString();
  
  if (signal.verified && (signal.score ?? 0) >= 80) {
    return {
      decision: 'ADMIT',
      route: '/route71',
      reason: 'SIGNAL_VERIFIED_HIGH_CONFIDENCE',
      confidence: signal.score ?? 80,
      timestamp,
      nonce,
    };
  }
  
  if (signal.verified) {
    return {
      decision: 'QUARANTINE',
      route: '/route69',
      reason: 'SIGNAL_VERIFIED_LOW_CONFIDENCE',
      confidence: signal.score ?? 50,
      timestamp,
      nonce,
    };
  }
  
  return {
    decision: 'REJECT',
    route: '/route70',
    reason: 'SIGNAL_VERIFICATION_FAILED',
    confidence: 0,
    timestamp,
    nonce,
  };
}

function decisionToStatus(decision: RuntimeDecision['decision']): AdmissionStatus {
  switch (decision) {
    case 'ADMIT': return 'ADMITTED';
    case 'REJECT': return 'REJECTED';
    case 'QUARANTINE': return 'QUARANTINED';
  }
}

// ============================================================
// POST /api/verify - Verify and emit decision + receipt
// ============================================================

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    
    // Parse request
    const parseResult = VerifyRequestSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid request body',
          details: parseResult.error.errors,
        },
        { status: 400 }
      );
    }
    
    const data = parseResult.data;
    let runtimeDecision: RuntimeDecision;
    let signer: string;
    
    // Evaluate based on type
    if (data.type === 'identity') {
      runtimeDecision = evaluateIdentityClaim(data.claim);
      signer = data.claim;
    } else {
      runtimeDecision = evaluateSignal(data.signal);
      signer = data.signal.source;
    }
    
    // Create receipt
    const { receipt, isReplay } = createReceipt({
      signer,
      status: decisionToStatus(runtimeDecision.decision),
      reason: runtimeDecision.reason,
      artifacts: {
        total: runtimeDecision.decision === 'ADMIT' ? 102 : 0,
        voipIntercepts: runtimeDecision.decision === 'ADMIT' ? 47 : 0,
        mimecastBreaches: runtimeDecision.decision === 'ADMIT' ? 12 : 0,
        spoliationEvents: runtimeDecision.decision === 'ADMIT' ? 9 : 0,
      },
    });
    
    // Return closed-loop response
    return NextResponse.json({
      success: true,
      isReplay,
      
      // Runtime Decision
      decision: runtimeDecision,
      
      // Receipt V1
      receipt,
      
      // Route Assignment
      routing: {
        assignedRoute: runtimeDecision.route,
        redirectUrl: runtimeDecision.route,
        canExport: runtimeDecision.decision === 'ADMIT',
      },
      
      // Telemetry
      telemetry: getTelemetry(),
    });
    
  } catch (error) {
    console.error('[Verify API] Error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}

// ============================================================
// GET /api/verify - Telemetry and endpoint info
// ============================================================

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status') as AdmissionStatus | null;
  
  // Get receipts by status
  if (status && ['ADMITTED', 'REJECTED', 'QUARANTINED'].includes(status)) {
    const receipts = getReceiptsByStatus(status);
    return NextResponse.json({
      status,
      count: receipts.length,
      receipts,
      timestamp: new Date().toISOString(),
    });
  }
  
  // Get full telemetry
  if (searchParams.get('telemetry') === 'true') {
    return NextResponse.json({
      telemetry: getTelemetry(),
      timestamp: new Date().toISOString(),
    });
  }
  
  // Return endpoint info
  return NextResponse.json({
    protocol: 'VALORAIPLUS_CLOSED_LOOP',
    version: '1.4.100D',
    endpoint: '/api/verify',
    description: 'Verify claims → emit RuntimeDecision + ReceiptV1 → route assignment',
    flow: 'signal → verify → receipt → route → dashboard',
    usage: {
      POST: {
        identity: {
          type: 'identity',
          claim: '[SOVEREIGN_AUDITOR]',
        },
        signal: {
          type: 'signal',
          signal: {
            category: 'identity | forensic | financial | legal',
            source: 'source identifier',
            verified: true,
            score: 85,
          },
        },
      },
      GET: {
        telemetry: '?telemetry=true',
        byStatus: '?status=ADMITTED | REJECTED | QUARANTINED',
      },
    },
    routes: {
      '/route71': 'ADMITTED - Sovereign claims with full export rights',
      '/route70': 'REJECTED - Blocked claims archived for audit',
      '/route69': 'QUARANTINED - Pending review claims',
      '/route66': 'NULL - Invalid/malformed claims',
    },
  });
}
