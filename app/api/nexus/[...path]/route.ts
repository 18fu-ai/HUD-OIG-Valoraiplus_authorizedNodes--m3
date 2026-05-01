/**
 * VALORAIPLUS Sovereign Nexus API
 * Catch-all API handler for the unified terminal communication layer.
 * 
 * Endpoints:
 * - GET/POST /api/nexus/status - Get sovereign ledger status
 * - POST /api/nexus/command - Execute sovereign commands
 * 
 * SGAU 7226.3461 // ZERO DRIFT PROTOCOL
 */

import { NextRequest } from 'next/server';
import { handleApiRoute } from '@/lib/api/routes';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const endpoint = path.join('/');
  return handleApiRoute(request, endpoint);
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const endpoint = path.join('/');
  return handleApiRoute(request, endpoint);
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Authorization, Content-Type',
    },
  });
}
