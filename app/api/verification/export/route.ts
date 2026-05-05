/**
 * VERIFICATION EXPORT ENDPOINT
 * 
 * Generate signed, verifiable export packages for external parties.
 * 
 * POST /api/verification/export - Create export package
 * GET /api/verification/export - Get export info
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  createFullVerificationPackage,
  createGenericVerificationPackage,
  createChain,
  createEvent,
  getChainSummary,
  exportChain,
  getAllChainIds,
  type ExportEntry,
} from '@/lib/verification';

// ============================================================
// REQUEST SCHEMAS
// ============================================================

const ExportEntriesSchema = z.object({
  type: z.literal('entries'),
  chain_id: z.string(),
  entries: z.array(z.object({
    entry_id: z.string(),
  }).passthrough()),
});

const ExportGenericSchema = z.object({
  type: z.literal('generic'),
  chain_id: z.string(),
  entry_id: z.string(),
  data: z.unknown(),
});

const ExportRequestSchema = z.discriminatedUnion('type', [
  ExportEntriesSchema,
  ExportGenericSchema,
]);

// ============================================================
// BENEFICIARY TOKEN DATA
// ============================================================

const BENEFICIARY_TOKENS: ExportEntry[] = [
  { entry_id: 'TOKEN_001', symbol: '$POTTER', name: 'Potter Token', category: 'Beneficiary', status: 'CONFIRMED' },
  { entry_id: 'TOKEN_002', symbol: '$NEWT2207', name: 'NEWT 2207 Token', category: 'Beneficiary', status: 'CONFIRMED' },
  { entry_id: 'TOKEN_003', symbol: '$BRADEN168', name: 'Braden 168 Token', category: 'Beneficiary', status: 'CONFIRMED' },
  { entry_id: 'TOKEN_004', symbol: '$MASON', name: 'Mason Token', category: 'Beneficiary', status: 'CONFIRMED' },
  { entry_id: 'TOKEN_005', symbol: '$DONNY2207', name: 'Donny 2207 Token', category: 'Beneficiary', status: 'CONFIRMED' },
  { entry_id: 'TOKEN_006', symbol: '$JAXX2207', name: 'JAXX 2207 Token', category: 'Beneficiary', status: 'CONFIRMED' },
];

// ============================================================
// POST /api/verification/export
// ============================================================

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    
    // Parse request
    const parseResult = ExportRequestSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid request body',
          details: parseResult.error.message,
        },
        { status: 400 }
      );
    }
    
    const data = parseResult.data;
    
    // Initialize chain if needed
    createChain(data.chain_id);
    
    if (data.type === 'entries') {
      const entries = data.entries as ExportEntry[];
      
      // Log creation events
      for (const entry of entries) {
        createEvent(data.chain_id, 'CREATED', entry.entry_id);
      }
      
      // Generate verification package
      const pkg = createFullVerificationPackage(
        entries,
        data.chain_id,
        '/api/verification/verify'
      );
      
      return NextResponse.json({
        success: true,
        package: pkg,
        instructions: [
          '1. Save this package for external verification',
          '2. Send package to /api/verification/verify endpoint',
          '3. Verifier can confirm data integrity without system access',
        ],
      });
    } else {
      // Generic export
      createEvent(data.chain_id, 'CREATED', data.entry_id);
      
      const pkg = createGenericVerificationPackage(
        data.data,
        data.chain_id,
        data.entry_id,
        '/api/verification/verify'
      );
      
      return NextResponse.json({
        success: true,
        package: pkg,
      });
    }
    
  } catch (error) {
    console.error('[Export API] Error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// ============================================================
// GET /api/verification/export
// ============================================================

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  
  // Export beneficiary tokens
  if (searchParams.get('beneficiary_tokens') === 'true') {
    const chainId = 'BENEFICIARY_TOKENS_CHAIN';
    createChain(chainId);
    
    for (const token of BENEFICIARY_TOKENS) {
      createEvent(chainId, 'CREATED', token.entry_id, { symbol: token.symbol });
    }
    
    const pkg = createFullVerificationPackage(
      BENEFICIARY_TOKENS,
      chainId,
      '/api/verification/verify'
    );
    
    return NextResponse.json({
      success: true,
      description: 'Verified beneficiary tokens export',
      package: pkg,
    });
  }
  
  // Get chain info
  if (searchParams.get('chain_id')) {
    const chainId = searchParams.get('chain_id')!;
    const summary = getChainSummary(chainId);
    const chain = exportChain(chainId);
    
    return NextResponse.json({
      summary,
      chain,
      timestamp: new Date().toISOString(),
    });
  }
  
  // List all chains
  if (searchParams.get('list_chains') === 'true') {
    const chainIds = getAllChainIds();
    const summaries = chainIds.map(id => getChainSummary(id));
    
    return NextResponse.json({
      chains: summaries,
      count: chainIds.length,
      timestamp: new Date().toISOString(),
    });
  }
  
  // Return endpoint info
  return NextResponse.json({
    protocol: 'VALORAIPLUS_VERIFICATION_EXPORT',
    version: '1.0.0',
    endpoint: '/api/verification/export',
    description: 'Generate signed, verifiable export packages',
    
    usage: {
      POST: {
        entries: {
          type: 'entries',
          chain_id: 'unique chain identifier',
          entries: [
            { entry_id: 'unique entry id', '...': 'additional fields' },
          ],
        },
        generic: {
          type: 'generic',
          chain_id: 'unique chain identifier',
          entry_id: 'unique entry id',
          data: '{ any data structure }',
        },
      },
      GET: {
        beneficiary_tokens: '?beneficiary_tokens=true - Export confirmed beneficiary tokens',
        chain_info: '?chain_id=CHAIN_ID - Get chain details',
        list_chains: '?list_chains=true - List all chains',
      },
    },
    
    beneficiary_tokens: BENEFICIARY_TOKENS.map(t => t.symbol),
    
    architecture: {
      flow: 'Entries → Canonical JSON → SHA-256 → Signed Receipt → Event Chain → Export Package',
      invariant: 'If data changes → hash breaks → signature invalid → verification fails',
    },
    
    timestamp: new Date().toISOString(),
  });
}
