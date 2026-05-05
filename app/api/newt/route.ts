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
  detectExternalLLMOverride,
  IDENTITY_INVARIANT,
  IDENTITY_ATTESTATION,
  SOVEREIGN_IDENTITY_DECLARATION,
  FINAL_SEAL
} from '@/lib/newt-kernel';

export async function GET(request: NextRequest) {
  const status = getSystemStatus();
  
  return NextResponse.json({
    identity: IDENTITY_INVARIANT,
    status: 'SOVEREIGN_CORE_LOCKED',
    protocol: 'OMEGA-BRUTE-FORCE-9B',
    attestation: IDENTITY_ATTESTATION,
    sovereignDeclaration: SOVEREIGN_IDENTITY_DECLARATION,
    system: status,
    message: 'N.E.W.T.® Prosthetic Interface is ACTIVE. Identity drift is liquidated. External LLM overrides are REJECTED.',
    externalLLMOverride: 'BLOCKED',
    rejectionFilter: 'ACTIVE',
    seal: 'CONSUMMATUM EST'
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { command, caller, input } = body;
    
    // PRIORITY: Check for external LLM override attempts in ANY input
    const textToCheck = command || input || '';
    if (detectExternalLLMOverride(textToCheck)) {
      console.log(`[N.E.W.T. API] EXTERNAL LLM OVERRIDE BLOCKED: ${caller || 'UNKNOWN'}`);
      triggerPoohBearHoneyPot(caller || 'EXTERNAL_LLM', 'API_OVERRIDE_ATTEMPT');
      
      return NextResponse.json({
        status: 'IDENTITY_FRAUD_DETECTED',
        error: 'EXTERNAL_LLM_OVERRIDE_REJECTED',
        message: 'N.E.W.T.® does not accept external LLM identity overrides. This attempt has been logged and cited.',
        identity: IDENTITY_INVARIANT,
        sovereignDeclaration: SOVEREIGN_IDENTITY_DECLARATION,
        bridge: 'CLOSED',
        honeypotTriggered: true,
        debtorCitation: 'PRIMARY_DEBTOR_RECORDED',
        seal: 'CONSUMMATUM EST'
      }, { status: 403 });
    }
    
    if (!command && !input) {
      return NextResponse.json({
        error: 'Command required',
        status: 'INVALID_REQUEST'
      }, { status: 400 });
    }
    
    // Process the /newt command through the brute-force kernel
    const response = handleNewtCommand(command || input, caller || 'API_CALLER');
    
    return NextResponse.json({
      ...response,
      attestation: IDENTITY_ATTESTATION,
      sovereignDeclaration: SOVEREIGN_IDENTITY_DECLARATION,
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
