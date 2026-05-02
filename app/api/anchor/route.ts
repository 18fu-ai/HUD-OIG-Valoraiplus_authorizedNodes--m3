/**
 * Route Anchor API
 * ================
 * Portal does not merely show verified/unverified.
 * Portal explains WHY verification passed or failed.
 */

import { NextResponse } from 'next/server';
import {
  AnchorResponseSchema,
  getVerificationReason,
  SCHEMA_INVALID_RESPONSE,
  type AnchorResponse,
  type AnchorStorage,
} from '@/lib/anchor/types';

// Route anchors - SGAU canonical roots
const ROUTE_ANCHORS: Record<string, {
  routeRoot: string;
  storage: AnchorStorage;
  cid?: string;
  txid?: string;
  anchoredAt?: string;
}> = {
  'route66': {
    routeRoot: '0x8f3a567d2e8f1a4b9c0d2e4f6a8b0c2d4e6f8a0b2c4d6e8f0a2b4c6d8e0f1a2b',
    storage: 'BTC_WITNESS',
    txid: 'abc123def456789...',
    anchoredAt: '2024-03-15T00:00:00Z',
  },
  'route70': {
    routeRoot: '0x0000000000000000000000000000000000000000000000000000000000000000',
    storage: 'LOCAL_ONLY',
    anchoredAt: '2024-04-01T00:00:00Z',
  },
  'route71': {
    routeRoot: '0x9d4f678e3f9g2b5c0e3f5g7b9d1e3f5a7b9c1d3e5f7a9b1c3d5e7f9a1b3c5d7e',
    storage: 'IPFS',
    cid: 'QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG',
    anchoredAt: '2024-03-20T00:00:00Z',
  },
  'sgau-7226': {
    routeRoot: '0x7226346100000000000000000000000000000000000000000000000000000001',
    storage: 'ETH_CALLDATA',
    txid: '0x1234567890abcdef...',
    anchoredAt: '2024-03-15T12:00:00Z',
  },
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const route = searchParams.get('route') || 'route66';

  try {
    const raw = ROUTE_ANCHORS[route];

    if (!raw) {
      return NextResponse.json(SCHEMA_INVALID_RESPONSE, { status: 404 });
    }

    // Derive verification reason from bounded enum
    const verificationReason = getVerificationReason(raw);

    const candidate: AnchorResponse = {
      ...raw,
      verified: verificationReason === "VERIFIED",
      verificationReason,
    };

    // Validate against schema
    const parsed = AnchorResponseSchema.safeParse(candidate);

    if (!parsed.success) {
      return NextResponse.json(SCHEMA_INVALID_RESPONSE, { status: 500 });
    }

    return NextResponse.json(parsed.data, {
      headers: {
        'X-Anchor-Route': route,
        'X-Verification-Reason': verificationReason,
        'Cache-Control': 'public, max-age=60',
      },
    });
  } catch {
    return NextResponse.json(SCHEMA_INVALID_RESPONSE, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { route, routeRoot, storage, cid, txid } = body;

    if (!route || !routeRoot || !storage) {
      return NextResponse.json(
        { error: 'Missing required fields: route, routeRoot, storage' },
        { status: 400 }
      );
    }

    const raw = {
      routeRoot,
      storage,
      cid,
      txid,
      anchoredAt: new Date().toISOString(),
    };

    const verificationReason = getVerificationReason(raw);

    const candidate: AnchorResponse = {
      ...raw,
      verified: verificationReason === "VERIFIED",
      verificationReason,
    };

    const parsed = AnchorResponseSchema.safeParse(candidate);

    if (!parsed.success) {
      return NextResponse.json(SCHEMA_INVALID_RESPONSE, { status: 400 });
    }

    return NextResponse.json({
      ...parsed.data,
      anchored: true,
      route,
    }, {
      status: 201,
      headers: {
        'X-Anchor-Route': route,
        'X-Verification-Reason': verificationReason,
      },
    });
  } catch {
    return NextResponse.json(SCHEMA_INVALID_RESPONSE, { status: 500 });
  }
}
