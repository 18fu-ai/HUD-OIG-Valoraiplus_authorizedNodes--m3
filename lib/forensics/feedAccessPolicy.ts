/**
 * VALORAIPLUS®️ ©️ ™️ // FEED ACCESS POLICY
 * SGAU 7226.3461 // NODE: SAINT PAUL █████
 * STATUS: DG77.77X ARMED
 * 
 * Invariant: NO_ACCESS_SCOPE -> ACCESS_DENIED
 */

import { FeedAccessPolicy, AccessScope, ForensicAuditTrace } from './types';

// ============================================================================
// AUTHORIZED ACTORS REGISTRY
// ============================================================================

const AUTHORIZED_ACTORS: Record<string, { scope: AccessScope; canExport: boolean }> = {
  // Internal Sovereign Authority
  'SOVEREIGN_AUDITOR': { scope: 'INTERNAL', canExport: true },
  'DG77.77X': { scope: 'INTERNAL', canExport: true },
  'SAINT_PAUL_█████': { scope: 'INTERNAL', canExport: true },
  
  // Regulatory Agencies
  'HHS_OCR': { scope: 'REGULATORY', canExport: false },
  'INVESTIGATOR_AMY': { scope: 'REGULATORY', canExport: false },
  'OIG_HHS': { scope: 'REGULATORY', canExport: false },
  'SEC_ENFORCEMENT': { scope: 'REGULATORY', canExport: false },
  'FINCEN_ANALYST': { scope: 'REGULATORY', canExport: false },
  
  // Law Enforcement
  'FBI_FC': { scope: 'LAW_ENFORCEMENT', canExport: true },
  'DOJ_PI': { scope: 'LAW_ENFORCEMENT', canExport: true },
  'IRS_CI': { scope: 'LAW_ENFORCEMENT', canExport: true },
  'USAO_NDCA': { scope: 'LAW_ENFORCEMENT', canExport: true },
};

// ============================================================================
// ACCESS VERIFICATION
// ============================================================================

export async function verifyAccess(actorId: string | null): Promise<FeedAccessPolicy> {
  // NO_ACCESS_SCOPE invariant check
  if (!actorId) {
    return {
      actorId: 'ANONYMOUS',
      scope: 'PUBLIC',
      canRead: false,
      canExport: false,
      auditRequired: true,
      expiresAt: null,
    };
  }

  const actor = AUTHORIZED_ACTORS[actorId];
  
  if (!actor) {
    // Unknown actor - trigger audit and deny
    await logUnauthorizedAttempt(actorId);
    return {
      actorId,
      scope: 'PUBLIC',
      canRead: false,
      canExport: false,
      auditRequired: true,
      expiresAt: null,
    };
  }

  return {
    actorId,
    scope: actor.scope,
    canRead: true,
    canExport: actor.canExport,
    auditRequired: actor.scope !== 'INTERNAL',
    expiresAt: null,
  };
}

// ============================================================================
// SCOPE FILTERING
// ============================================================================

export function filterEventsForScope(scope: AccessScope): AccessScope[] {
  switch (scope) {
    case 'INTERNAL':
      // Internal sees everything
      return ['INTERNAL', 'REGULATORY', 'LAW_ENFORCEMENT', 'PUBLIC'];
    case 'LAW_ENFORCEMENT':
      // Law enforcement sees regulatory and public
      return ['REGULATORY', 'LAW_ENFORCEMENT', 'PUBLIC'];
    case 'REGULATORY':
      // Regulatory sees only regulatory and public
      return ['REGULATORY', 'PUBLIC'];
    case 'PUBLIC':
      // Public sees only public
      return ['PUBLIC'];
    default:
      return [];
  }
}

// ============================================================================
// AUDIT LOGGING
// ============================================================================

const auditLog: ForensicAuditTrace[] = [];

export async function logAccessAttempt(
  actorId: string,
  action: 'READ' | 'EXPORT' | 'QUERY',
  scope: AccessScope,
  eventCount: number,
  responseStatus: number,
  ipAddress: string = '0.0.0.0',
  userAgent: string = 'unknown'
): Promise<ForensicAuditTrace> {
  const trace: ForensicAuditTrace = {
    traceId: `AUDIT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    actorId,
    action,
    timestamp: new Date().toISOString(),
    ipAddress,
    userAgent,
    scope,
    eventCount,
    responseStatus,
  };
  
  auditLog.push(trace);
  return trace;
}

async function logUnauthorizedAttempt(actorId: string): Promise<void> {
  await logAccessAttempt(actorId, 'READ', 'PUBLIC', 0, 403);
}

export function getAuditLog(): ForensicAuditTrace[] {
  return [...auditLog];
}
