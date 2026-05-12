/**
 * VALORAIPLUS® VERIFICATION GATES
 * 
 * Final hardening principle:
 *   Promotion status is DERIVED, never manually stored.
 *   Promotion is computed from observed evidence.
 *   This prevents drift between the flag and gate state.
 */

export type VerificationState =
  | "PREPARED"
  | "PENDING"
  | "NOT_OBSERVED"
  | "OBSERVED"
  | "CONFIRMED"
  | "BLOCKED_PENDING_CONFIRMATION";

export interface VerificationGates {
  fundingTransaction: VerificationState;
  metamaskSignature: VerificationState;
  broadcast: VerificationState;
  chainConfirmation: VerificationState;
  manifestReconciliation: VerificationState;
}

/**
 * Initial gate state: all gates except fundingTransaction are pending/blocked.
 */
export const VERIFICATION_GATES_INITIAL: VerificationGates = {
  fundingTransaction: "PREPARED",
  metamaskSignature: "PENDING",
  broadcast: "NOT_OBSERVED",
  chainConfirmation: "NOT_OBSERVED",
  manifestReconciliation: "BLOCKED_PENDING_CONFIRMATION",
};

/**
 * Derives promotion eligibility from observed gate states.
 * NO manual flag. Status is computed from evidence only.
 */
export function canPromoteStatus(gates: VerificationGates): boolean {
  return (
    gates.broadcast === "CONFIRMED" &&
    gates.chainConfirmation === "CONFIRMED" &&
    gates.manifestReconciliation === "CONFIRMED"
  );
}

/**
 * Returns the promotion status derived from current gate states.
 * This is the single source of truth for promotion eligibility.
 */
export function getPromotionStatus(gates: VerificationGates): "ELIGIBLE_FOR_PROMOTION" | "PROMOTION_BLOCKED" {
  return canPromoteStatus(gates) ? "ELIGIBLE_FOR_PROMOTION" : "PROMOTION_BLOCKED";
}

/**
 * Validates the gate state for consistency.
 */
export function validateGateState(gates: VerificationGates): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // fundingTransaction must be PREPARED or CONFIRMED before other gates can proceed
  if (gates.fundingTransaction === "NOT_OBSERVED" || gates.fundingTransaction === "BLOCKED_PENDING_CONFIRMATION") {
    errors.push("fundingTransaction cannot be NOT_OBSERVED or BLOCKED_PENDING_CONFIRMATION");
  }

  // If manifestReconciliation is BLOCKED_PENDING_CONFIRMATION, other gates cannot be CONFIRMED
  if (gates.manifestReconciliation === "BLOCKED_PENDING_CONFIRMATION") {
    if (gates.broadcast === "CONFIRMED" || gates.chainConfirmation === "CONFIRMED") {
      errors.push("Cannot have CONFIRMED gates while manifestReconciliation is BLOCKED_PENDING_CONFIRMATION");
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
