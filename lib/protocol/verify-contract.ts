// lib/protocol/verify-contract.ts
// Canonical runtime signal verification contract
// Policy Version: REV_33

export type InvariantState = 'VALID' | 'BLOCKED' | 'PENDING';

export type RuntimeSignalStatus =
  | 'VERIFIED'
  | 'BLOCKED'
  | 'PENDING'
  | 'ADVERSARY';

export type RouteDestination = '/route70' | '/route71';

export type ReasonCode =
  | 'POLICY_ADMITTED'
  | 'INVARIANT_BLOCKED'
  | 'ADVERSARY_DETECTED';

export type RuntimeSignal = {
  id: string;
  invariantState: InvariantState;
  status: RuntimeSignalStatus;
  payload: unknown;
};

export type PolicyDecision = {
  signalId: string;
  admitted: boolean;
  failedAt: string | null;
  reasonCode: ReasonCode;
  route: RouteDestination;
  visibilityGranted: boolean;
  evaluatedAt: string;
  policyVersion: 'REV_33';
  origin: 'USA';
};

export type ReceiptV1 = {
  receiptVersion: 'v1';
  signalId: string;
  decision: PolicyDecision;
  receiptHash: string;
  createdAt: string;
};

export type VerifyRequest = {
  signal: RuntimeSignal;
};

export type VerifyResponse = {
  signal: RuntimeSignal;
  decision: PolicyDecision;
  receipt: ReceiptV1;
};

/**
 * Core policy decision function
 * 
 * Final invariant:
 *   VALID + VERIFIED → /route71 (admitted, visibility granted)
 *   ADVERSARY → /route70 (blocked, adversary detected)
 *   anything else → /route70 (blocked, invariant blocked)
 */
export function decideVisibility(signal: RuntimeSignal): PolicyDecision {
  const admitted =
    signal.invariantState === 'VALID' &&
    signal.status === 'VERIFIED';

  const reasonCode: ReasonCode = admitted
    ? 'POLICY_ADMITTED'
    : signal.status === 'ADVERSARY'
      ? 'ADVERSARY_DETECTED'
      : 'INVARIANT_BLOCKED';

  return {
    signalId: signal.id,
    admitted,
    failedAt: admitted ? null : reasonCode,
    reasonCode,
    route: admitted ? '/route71' : '/route70',
    visibilityGranted: admitted,
    evaluatedAt: new Date().toISOString(),
    policyVersion: 'REV_33',
    origin: 'USA',
  };
}

/**
 * Simple deterministic hash for receipt
 */
export function simpleHash(input: string): string {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return `0x${Math.abs(hash).toString(16).padStart(8, '0')}`;
}

/**
 * Create a receipt from signal and decision
 */
export function createVerifyReceipt(signal: RuntimeSignal, decision: PolicyDecision): ReceiptV1 {
  return {
    receiptVersion: 'v1',
    signalId: signal.id,
    decision,
    receiptHash: simpleHash(JSON.stringify({ signal, decision })),
    createdAt: new Date().toISOString(),
  };
}

/**
 * Full verification flow: signal → decision → receipt
 */
export function verifySignal(signal: RuntimeSignal): VerifyResponse {
  const decision = decideVisibility(signal);
  const receipt = createVerifyReceipt(signal, decision);
  
  return {
    signal,
    decision,
    receipt,
  };
}
