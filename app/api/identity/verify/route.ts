import { NextRequest, NextResponse } from 'next/server';
import { validateIdentityClaim } from '@/lib/protocol/mevr';
import { 
  createReceipt, 
  logQuarantine, 
  type ReceiptV1,
  type AdmissionStatus 
} from '@/lib/protocol/receipt';

/**
 * POST /api/identity/verify
 * Validate identity claim and return admission decision plus frozen receipt payload
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, signer } = body;
    
    // Validate required fields
    if (!name || typeof name !== 'string') {
      logQuarantine('UNKNOWN', 'MISSING_NAME_FIELD', body);
      return NextResponse.json(
        { 
          error: 'Missing required field: name',
          code: 'VALIDATION_ERROR',
        },
        { status: 400 }
      );
    }
    
    // Use signer if provided, otherwise derive from name
    const signerAddress = signer || `${name.toLowerCase().replace(/\s+/g, '')}.eth`;
    
    // Validate identity through MEVR
    const identityClaim = validateIdentityClaim(name);
    
    // Map identity status to admission status
    let status: AdmissionStatus;
    let reason: string;
    
    switch (identityClaim.status) {
      case 'VERIFIED':
        status = 'ADMITTED';
        reason = `LINEAGE_VERIFIED_${identityClaim.sourceLineage || 'SOVEREIGN'}`;
        break;
      case 'BLOCKED':
        status = 'REJECTED';
        reason = identityClaim.reasonCode;
        logQuarantine(signerAddress, identityClaim.reasonCode, body);
        break;
      case 'INVALID':
        status = 'REJECTED';
        reason = identityClaim.reasonCode;
        logQuarantine(signerAddress, identityClaim.reasonCode, body);
        break;
      case 'UNVERIFIED':
      default:
        status = 'QUARANTINED';
        reason = 'IDENTITY_PENDING_VERIFICATION';
        logQuarantine(signerAddress, 'UNVERIFIED_IDENTITY', body);
        break;
    }
    
    // Create receipt with deduplication
    const { receipt, isReplay } = createReceipt({
      signer: signerAddress,
      status,
      reason,
    });
    
    // Build response
    const response: VerifyResponse = {
      success: status === 'ADMITTED',
      isReplay,
      identityClaim: {
        name: identityClaim.name,
        status: identityClaim.status,
        invariantState: identityClaim.invariantState,
        exportEligible: identityClaim.exportEligible,
        route: identityClaim.route,
        replacement: identityClaim.replacement,
      },
      receipt,
      routing: {
        destination: identityClaim.route,
        reason: status === 'ADMITTED' 
          ? 'Sovereign latch acquired — export eligible'
          : status === 'REJECTED'
            ? 'Identity blocked — no export eligibility'
            : 'Identity quarantined — pending review',
      },
    };
    
    return NextResponse.json(response, { 
      status: status === 'ADMITTED' ? 200 : status === 'REJECTED' ? 403 : 202 
    });
    
  } catch (error) {
    logQuarantine('UNKNOWN', 'PARSE_ERROR', { error: String(error) });
    return NextResponse.json(
      { 
        error: 'Invalid request body',
        code: 'PARSE_ERROR',
      },
      { status: 400 }
    );
  }
}

// Response type
interface VerifyResponse {
  success: boolean;
  isReplay: boolean;
  identityClaim: {
    name: string;
    status: string;
    invariantState: string;
    exportEligible: boolean;
    route: string;
    replacement?: string;
  };
  receipt: ReceiptV1;
  routing: {
    destination: string;
    reason: string;
  };
}

/**
 * GET /api/identity/verify
 * Return endpoint documentation
 */
export async function GET() {
  return NextResponse.json({
    protocol: 'VALORAIPLUS_MEVR',
    endpoint: '/api/identity/verify',
    description: 'Validate identity claim through MEVR admission gate',
    version: '1.0.0',
    usage: {
      POST: {
        body: {
          name: 'string (required) - Identity name to verify',
          signer: 'string (optional) - Signer address, derived from name if not provided',
        },
        responses: {
          200: 'Identity ADMITTED - sovereign latch acquired',
          202: 'Identity QUARANTINED - pending review',
          403: 'Identity REJECTED - blocked',
          400: 'Invalid request',
        },
      },
    },
    validIdentities: [
      'Poppa Donny Gillson',
      'Poppa Donny',
      'Donny Gillson',
    ],
    blockedIdentities: [
      'Jerry Gillson',
      'Jerry',
    ],
  });
}
