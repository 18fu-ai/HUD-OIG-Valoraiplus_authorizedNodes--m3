// Intent Intake Layer - Accepts signed state-transition packets
// POST /api/intents

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { verifyIntent, type VerificationResult } from '@/lib/protocol/verifyIntent';
import { type IntentType, validateIntentPayload } from '@/lib/protocol/eip712';
import { createReceipt, serializeReceipt } from '@/lib/db/receipts';
import { indexEvent, type IndexedEvent } from '@/lib/protocol/eventIndexer';

// Request body schema
const IntentRequestSchema = z.object({
  intentType: z.enum([
    'LatchExhibit',
    'CreateRevision',
    'NullifyNode',
    'UpdateAnchor',
    'ApproveVerifier',
  ]),
  payload: z.record(z.unknown()),
  chainId: z.number().int().positive().optional().default(1),
});

// Response type
type IntentResponse = {
  success: boolean;
  receipt?: ReturnType<typeof serializeReceipt>;
  verification?: VerificationResult;
  error?: string;
  code?: string;
};

export async function POST(request: NextRequest): Promise<NextResponse<IntentResponse>> {
  try {
    // Parse request body
    const body = await request.json();
    
    // Validate request shape
    const parseResult = IntentRequestSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid request body',
          code: 'INVALID_REQUEST',
        },
        { status: 400 }
      );
    }
    
    const { intentType, payload, chainId } = parseResult.data;
    
    // Validate payload shape before verification
    const payloadValidation = validateIntentPayload(intentType as IntentType, payload);
    if (!payloadValidation.valid) {
      return NextResponse.json(
        {
          success: false,
          error: payloadValidation.error,
          code: 'INVALID_PAYLOAD',
        },
        { status: 400 }
      );
    }
    
    // Verify the signed intent
    const verification = await verifyIntent(intentType as IntentType, payload);
    
    if (!verification.verified) {
      // Create rejection receipt
      const receipt = await createReceipt({
        accepted: false,
        signer: verification.signer ?? 'unknown',
        txHash: null,
        blockNumber: null,
        nodeId: (payload as Record<string, unknown>).nodeId as string ?? 'unknown',
        revision: 0,
        intentType: intentType as IntentType,
        metadata: {
          error: verification.error,
          code: verification.code,
        },
      });
      
      return NextResponse.json(
        {
          success: false,
          receipt: serializeReceipt(receipt),
          verification,
          error: verification.error,
          code: verification.code,
        },
        { status: 403 }
      );
    }
    
    // In production, submit to contract here
    // const txHash = await contract.write.latchExhibit([...]);
    
    // Simulate transaction hash for now
    const simulatedTxHash = `0x${Buffer.from(Date.now().toString()).toString('hex').padEnd(64, '0')}`;
    const simulatedBlockNumber = BigInt(Math.floor(Date.now() / 1000));
    
    // Create acceptance receipt
    const receipt = await createReceipt({
      accepted: true,
      signer: verification.signer!,
      txHash: simulatedTxHash,
      blockNumber: simulatedBlockNumber,
      nodeId: (payload as Record<string, unknown>).nodeId as string,
      revision: 0,
      intentType: intentType as IntentType,
      metadata: {
        chainId,
        category: (payload as Record<string, unknown>).category,
        logicHash: (payload as Record<string, unknown>).logicHash,
        truthCycle: (payload as Record<string, unknown>).truthCycle,
      },
    });
    
    // Index the simulated event
    const event: IndexedEvent = {
      eventName: 'NodeLatched',
      blockNumber: simulatedBlockNumber,
      blockHash: `0x${Buffer.from('block').toString('hex').padEnd(64, '0')}`,
      transactionHash: simulatedTxHash,
      logIndex: 0,
      timestamp: new Date().toISOString(),
      args: {
        nodeId: (payload as Record<string, unknown>).nodeId,
        category: (payload as Record<string, unknown>).category,
        logicHash: (payload as Record<string, unknown>).logicHash,
        truthCycle: (payload as Record<string, unknown>).truthCycle,
        signer: verification.signer,
      },
    };
    
    await indexEvent(event);
    
    return NextResponse.json(
      {
        success: true,
        receipt: serializeReceipt(receipt),
        verification,
      },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('[Intent API] Error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        code: 'INTERNAL_ERROR',
      },
      { status: 500 }
    );
  }
}

// GET /api/intents - Get intent submission info
export async function GET(): Promise<NextResponse> {
  return NextResponse.json({
    protocol: 'SGAU-VALUEGUARD',
    version: '1.0.0',
    endpoint: '/api/intents',
    supportedIntents: [
      'LatchExhibit',
      'CreateRevision',
      'NullifyNode',
      'UpdateAnchor',
      'ApproveVerifier',
    ],
    documentation: {
      LatchExhibit: {
        description: 'Create a new latched exhibit node',
        requiredFields: ['nodeId', 'category', 'logicHash', 'truthCycle', 'nonce', 'expiration', 'signature'],
      },
      CreateRevision: {
        description: 'Create a revision for an existing node',
        requiredFields: ['nodeId', 'logicHash', 'nonce', 'expiration', 'signature'],
      },
      NullifyNode: {
        description: 'Nullify an existing node',
        requiredFields: ['nodeId', 'reason', 'nonce', 'expiration', 'signature'],
      },
      UpdateAnchor: {
        description: 'Update merkle anchor',
        requiredFields: ['anchorId', 'merkleRoot', 'nonce', 'expiration', 'signature'],
      },
      ApproveVerifier: {
        description: 'Approve a new verifier',
        requiredFields: ['verifier', 'role', 'nonce', 'expiration', 'signature'],
      },
    },
  });
}
