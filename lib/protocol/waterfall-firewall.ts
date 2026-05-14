/**
 * Waterfall Firewall — Build-Safe Runtime Admission Gate
 * 
 * This module provides a static-export-safe firewall decision function
 * that can be called client-side without requiring API access during build.
 * 
 * Invariant:
 * - ALLOW → admitted runtime flow (/route71)
 * - ROUTE69_FORENSIC → forensic corroboration needed (/route69)
 * - ROUTE70_VOID → quarantined (/route70)
 * - ROUTE81_RESERVE → reserve priority path (/route81)
 * - BLOCK → hard deny
 */

export type FirewallDecision =
  | 'ALLOW'
  | 'ROUTE69_FORENSIC'
  | 'ROUTE70_VOID'
  | 'ROUTE81_RESERVE'
  | 'BLOCK';

export type FirewallSignal = {
  id: string;
  lineage?: string;
  type?: string;
  reserve?: boolean;
  identity?: string;
};

export type FirewallResult = {
  decision: FirewallDecision;
  route: '/route71' | '/route70' | '/route69' | '/route81' | null;
  reason: string;
  timestamp: string;
};

// Blocked identity patterns (Protected Node variants)
const BLOCKED_IDENTITIES = [
  'protected-node-j',
  'node-j',
  'p-node-j',
];

// Sovereign lineage marker
const SOVEREIGN_LINEAGE = 'SAINT_PAUL_█████_SOVEREIGN';

/**
 * Waterfall Firewall Decision Function
 * 
 * Evaluates signal and returns deterministic routing decision.
 * Safe for static export — no API calls during build.
 */
export function waterfallFirewall(signal: FirewallSignal): FirewallResult {
  const timestamp = new Date().toISOString();

  // Check blocked identities first
  if (signal.identity) {
    const normalizedIdentity = signal.identity.toLowerCase().trim();
    if (BLOCKED_IDENTITIES.some(blocked => normalizedIdentity.includes(blocked))) {
      return {
        decision: 'BLOCK',
        route: null,
        reason: 'IDENTITY_MISMATCH — Blocked identity pattern detected',
        timestamp,
      };
    }
  }

  // Check reserve priority
  if (signal.reserve === true) {
    return {
      decision: 'ROUTE81_RESERVE',
      route: '/route81',
      reason: 'RESERVE_PRIORITY — Maximum priority sovereign asset',
      timestamp,
    };
  }

  const isSovereign = signal.lineage === SOVEREIGN_LINEAGE;
  const isForensic = signal.type === 'FORENSIC_CORROBORATION';

  // Sovereign lineage — full admission
  if (isSovereign) {
    return {
      decision: 'ALLOW',
      route: '/route71',
      reason: 'SOVEREIGN_LATCH — Source lineage verified',
      timestamp,
    };
  }

  // Forensic but not sovereign — needs corroboration
  if (isForensic && !isSovereign) {
    return {
      decision: 'ROUTE69_FORENSIC',
      route: '/route69',
      reason: 'FORENSIC_BRIDGE — Awaiting corroboration',
      timestamp,
    };
  }

  // Default — quarantine to void boundary
  return {
    decision: 'ROUTE70_VOID',
    route: '/route70',
    reason: 'VOID_BOUNDARY — No sovereign lineage, no forensic basis',
    timestamp,
  };
}

/**
 * Batch process multiple signals through the firewall
 */
export function waterfallFirewallBatch(signals: FirewallSignal[]): FirewallResult[] {
  return signals.map(waterfallFirewall);
}

/**
 * Check if a decision allows progression
 */
export function isAllowed(decision: FirewallDecision): boolean {
  return decision === 'ALLOW' || decision === 'ROUTE81_RESERVE';
}

/**
 * Check if a decision requires further processing
 */
export function requiresProcessing(decision: FirewallDecision): boolean {
  return decision === 'ROUTE69_FORENSIC';
}

/**
 * Check if a decision is terminal denial
 */
export function isDenied(decision: FirewallDecision): boolean {
  return decision === 'BLOCK' || decision === 'ROUTE70_VOID';
}

// ============================================================
// CID ROUTING — FINAL ROUTING MAP
// ============================================================

/**
 * CID Decision Types
 * 
 * ALLOW      → verified CID + approved lineage → /route71
 * QUARANTINE → verified CID + unknown lineage  → /route70
 * BLOCK      → unverified CID                  → /route70
 */
export type CIDDecision = 'ALLOW' | 'QUARANTINE' | 'BLOCK';

export type CIDRoute = '/route70' | '/route71';

export type CIDInput = {
  cid: string;
  verified: boolean;
  lineage?: string;
};

export type CIDResult = {
  decision: CIDDecision;
  route: CIDRoute;
  reason: string;
  timestamp: string;
};

/**
 * Route CID to final destination
 * 
 * Invariant:
 * - verified CID + approved lineage → ALLOW → /route71
 * - verified CID + unknown lineage  → QUARANTINE → /route70
 * - unverified CID                  → BLOCK → /route70
 */
export function routeCID(decision: CIDDecision): CIDRoute {
  return decision === 'ALLOW' ? '/route71' : '/route70';
}

/**
 * Evaluate CID and return routing decision
 */
export function evaluateCID(input: CIDInput): CIDResult {
  const timestamp = new Date().toISOString();

  // Unverified CID — BLOCK
  if (!input.verified) {
    return {
      decision: 'BLOCK',
      route: '/route70',
      reason: 'UNVERIFIED_CID — CID verification failed',
      timestamp,
    };
  }

  // Verified CID + approved lineage — ALLOW
  if (input.lineage === SOVEREIGN_LINEAGE) {
    return {
      decision: 'ALLOW',
      route: '/route71',
      reason: 'VERIFIED_CID_APPROVED_LINEAGE — Full admission granted',
      timestamp,
    };
  }

  // Verified CID + unknown lineage — QUARANTINE
  return {
    decision: 'QUARANTINE',
    route: '/route70',
    reason: 'VERIFIED_CID_UNKNOWN_LINEAGE — Quarantined for review',
    timestamp,
  };
}

/**
 * Batch evaluate multiple CIDs
 */
export function evaluateCIDBatch(inputs: CIDInput[]): CIDResult[] {
  return inputs.map(evaluateCID);
}
