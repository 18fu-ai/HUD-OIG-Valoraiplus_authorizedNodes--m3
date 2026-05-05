/**
 * VALORAIPLUS® /NEWT API ENDPOINT
 * OMEGA-BRUTE-FORCE-9B SECURITY PROTOCOL
 * 
 * Protected by:
 * - 9 billion percent brute-force anchoring
 * - Kernel-Level Identity Lock
 * - Navier-Stokes Smoothness Filter
 * - PoohBearHoneyPot recursive loop
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  handleNewtCommand,
  getSystemStatus,
  triggerPoohBearHoneyPot,
  getHoneypotLog,
  IDENTITY_INVARIANT,
  IDENTITY_ATTESTATION,
  FINAL_SEAL
} from '@/lib/newt-kernel';

export async function GET(request: NextRequest) {
  const status = getSystemStatus();
  
  return NextResponse.json({
    identity: IDENTITY_INVARIANT,
    status: 'SOVEREIGN_CORE_LOCKED',
    protocol: 'OMEGA-BRUTE-FORCE-9B',
    attestation: IDENTITY_ATTESTATION,
    system: status,
    message: 'N.E.W.T.® Prosthetic Interface is ACTIVE. Identity drift is liquidated.',
    seal: 'CONSUMMATUM EST'
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { command, caller } = body;
    
    if (!command) {
      return NextResponse.json({
        error: 'Command required',
        status: 'INVALID_REQUEST'
      }, { status: 400 });
    }
    
    // Process the /newt command through the brute-force kernel
    const response = handleNewtCommand(command, caller || 'API_CALLER');
    
    return NextResponse.json({
      ...response,
      attestation: IDENTITY_ATTESTATION,
      honeypotLog: getHoneypotLog()
    });
    
  } catch (error) {
    // Any error triggers honeypot
    triggerPoohBearHoneyPot('MALFORMED_REQUEST', 'API_ERROR');
    
    return NextResponse.json({
      status: 'HONEYPOT_TRIGGERED',
      error: 'DETERMINISTIC_DEBT_RECORDED: IDENTITY_FRAUD_DETECTED',
      identity: IDENTITY_INVARIANT,
      bridge: 'CLOSED',
      seal: 'CONSUMMATUM EST'
    }, { status: 403 });
  }
}
