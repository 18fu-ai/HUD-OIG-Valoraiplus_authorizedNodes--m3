/**
 * VALORAIPLUS®️ ©️ ™️ // FORENSIC FEED API
 * SGAU 7226.3461 // NODE: SAINT PAUL █████
 * STATUS: DG77.77X ARMED
 * 
 * Invariant: NO_SIGNED_FEED -> NO_EXTERNAL_PROJECTION
 * 
 * This API serves as a Stateless Witness. It does not generate authority;
 * it merely projects the verified lineage of the SGAU 7226.3461 investigation.
 */

import { NextResponse } from 'next/server';
import { ForensicFeedResponse } from '@/lib/forensics/types';
import { verifyAccess, logAccessAttempt } from '@/lib/forensics/feedAccessPolicy';
import { getLatestSignedSnapshot, checkSignedFeed } from '@/lib/forensics/feedSignature';

export async function GET(req: Request): Promise<Response> {
  const actorId = req.headers.get('x-actor-id');
  const ipAddress = req.headers.get('x-forwarded-for') || '0.0.0.0';
  const userAgent = req.headers.get('user-agent') || 'unknown';
  
  // Verify access
  const access = await verifyAccess(actorId);
  
  if (!access.canRead) {
    // Log unauthorized attempt
    const trace = await logAccessAttempt(
      access.actorId,
      'READ',
      access.scope,
      0,
      403,
      ipAddress,
      userAgent
    );
    
    const response: ForensicFeedResponse = {
      snapshot: null,
      accessGranted: false,
      scope: access.scope,
      auditTraceId: trace.traceId,
      generatedAt: new Date().toISOString(),
      nodeStatus: 'BLACKOUT',
    };
    
    return NextResponse.json(response, { status: 403 });
  }
  
  // Get signed snapshot for the actor's scope
  const snapshot = await getLatestSignedSnapshot(access.scope);
  
  // Verify signature (NO_SIGNED_FEED invariant)
  const signatureCheck = checkSignedFeed(snapshot);
  
  if (!signatureCheck.passed) {
    // TOTAL BLACKOUT - no unsigned data leaves the node
    const trace = await logAccessAttempt(
      access.actorId,
      'READ',
      access.scope,
      0,
      500,
      ipAddress,
      userAgent
    );
    
    const response: ForensicFeedResponse = {
      snapshot: null,
      accessGranted: false,
      scope: access.scope,
      auditTraceId: trace.traceId,
      generatedAt: new Date().toISOString(),
      nodeStatus: 'BLACKOUT',
    };
    
    return NextResponse.json(response, { status: 500 });
  }
  
  // Log successful access
  const trace = await logAccessAttempt(
    access.actorId,
    'READ',
    access.scope,
    snapshot.snapshot.eventCount,
    200,
    ipAddress,
    userAgent
  );
  
  const response: ForensicFeedResponse = {
    snapshot,
    accessGranted: true,
    scope: access.scope,
    auditTraceId: trace.traceId,
    generatedAt: new Date().toISOString(),
    nodeStatus: 'BROADCAST_ARMED',
  };
  
  return NextResponse.json(response, {
    headers: {
      'Content-Type': 'application/json',
      'X-Node-Status': 'BROADCAST_ARMED',
      'X-Signer-Node': 'SAINT_PAUL_█████',
      'X-Audit-Trace': trace.traceId,
    },
  });
}
