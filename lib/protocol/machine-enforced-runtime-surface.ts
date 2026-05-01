// machine-enforced-runtime-surface.ts
// Simple Machine-Enforced Runtime Surface
// Drop into: /lib/protocol/machine-enforced-runtime-surface.ts

export type RuntimeCategory = 'INTERNAL' | 'EXTERNAL';

export type InvariantState =
  | 'VALID'
  | 'BLOCKED'
  | 'UNSOURCED'
  | 'NONDETERMINISTIC';

export type ReplayStatus = 'PASS' | 'FAIL';

export type RuntimeRoute = '/route70' | '/route71';

export type ReasonCode =
  | 'ADMITTED'
  | 'SOURCE_MISSING'
  | 'REPLAY_FAILED'
  | 'THRESHOLD_FAILED'
  | 'NONDETERMINISTIC'
  | 'IDENTITY_MISMATCH';

export type RuntimeSignalInput = {
  id: string;
  category: RuntimeCategory;
  label: string;
  value: string;

  formula: string;

  proofScore: number;       // 0–1
  confidenceScore: number;  // 0–1
  threshold: number;        // required validation threshold

  replayStatus: ReplayStatus;
  deterministic: boolean;

  sourceRefs: string[];
};

export type ProofArtifact = {
  receiptHash: string;
  validationScore: number;
  invariantState: InvariantState;
  reasonCode: ReasonCode;
  createdAt: string;
};

export type RuntimeSignal = RuntimeSignalInput & {
  validationScore: number;
  invariantState: InvariantState;
  exportEligible: boolean;
  visible: boolean;
  route: RuntimeRoute;
  reasonCode: ReasonCode;
  proofArtifact: ProofArtifact;
};

export type IdentityInvariant = {
  entityId: string;
  displayName: string;

  sourceRefs: string[];

  lineageVerified: boolean;
  reproducible: boolean;
  deterministic: boolean;
};

export type IdentityResult = IdentityInvariant & {
  invariantState: InvariantState;
  exportEligible: boolean;
  visible: boolean;
  route: RuntimeRoute;
  reasonCode: ReasonCode;
};

// ----------------------------
// Utilities
// ----------------------------

function clamp01(n: number): number {
  return Math.max(0, Math.min(1, n));
}

function round3(n: number): number {
  return Math.round(n * 1000) / 1000;
}

function simpleHash(input: string): string {
  let hash = 0;

  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }

  return `0x${Math.abs(hash).toString(16)}`;
}

// ----------------------------
// Validation Model
// ----------------------------

export function computeValidationScore(
  proofScore: number,
  confidenceScore: number
): number {
  return round3(
    (clamp01(proofScore) + clamp01(confidenceScore)) / 2
  );
}

// ----------------------------
// Runtime Signal Evaluation
// ----------------------------

export function evaluateRuntimeSignal(
  input: RuntimeSignalInput
): RuntimeSignal {

  const validationScore = computeValidationScore(
    input.proofScore,
    input.confidenceScore
  );

  let invariantState: InvariantState = 'VALID';
  let reasonCode: ReasonCode = 'ADMITTED';

  // Invariant enforcement
  if (input.sourceRefs.length === 0) {
    invariantState = 'UNSOURCED';
    reasonCode = 'SOURCE_MISSING';
  }

  else if (!input.deterministic) {
    invariantState = 'NONDETERMINISTIC';
    reasonCode = 'NONDETERMINISTIC';
  }

  else if (input.replayStatus === 'FAIL') {
    invariantState = 'BLOCKED';
    reasonCode = 'REPLAY_FAILED';
  }

  else if (validationScore < input.threshold) {
    invariantState = 'BLOCKED';
    reasonCode = 'THRESHOLD_FAILED';
  }

  const exportEligible = invariantState === 'VALID';
  const visible = exportEligible;

  const route: RuntimeRoute =
    exportEligible ? '/route71' : '/route70';

  const receiptHash = simpleHash(
    `${input.id}-${validationScore}-${reasonCode}`
  );

  const proofArtifact: ProofArtifact = {
    receiptHash,
    validationScore,
    invariantState,
    reasonCode,
    createdAt: new Date().toISOString(),
  };

  return {
    ...input,
    validationScore,
    invariantState,
    exportEligible,
    visible,
    route,
    reasonCode,
    proofArtifact,
  };
}

// ----------------------------
// Identity Evaluation
// ----------------------------

export function evaluateIdentity(
  input: IdentityInvariant
): IdentityResult {

  let invariantState: InvariantState = 'VALID';
  let reasonCode: ReasonCode = 'ADMITTED';

  if (input.sourceRefs.length === 0) {
    invariantState = 'UNSOURCED';
    reasonCode = 'SOURCE_MISSING';
  }

  else if (
    !input.lineageVerified ||
    !input.reproducible ||
    !input.deterministic
  ) {
    invariantState = 'BLOCKED';
    reasonCode = 'NONDETERMINISTIC';
  }

  // Explicit identity mismatch guard
  if (input.entityId.toLowerCase().includes('node-j')) {
    invariantState = 'BLOCKED';
    reasonCode = 'IDENTITY_MISMATCH';
  }

  const exportEligible = invariantState === 'VALID';
  const visible = exportEligible;

  const route: RuntimeRoute =
    exportEligible ? '/route71' : '/route70';

  return {
    ...input,
    invariantState,
    exportEligible,
    visible,
    route,
    reasonCode,
  };
}

// ----------------------------
// Runtime Surface Builder
// ----------------------------

export function buildRuntimeSurface(
  signals: RuntimeSignalInput[],
  identities: IdentityInvariant[]
) {

  const evaluatedSignals = signals.map(evaluateRuntimeSignal);
  const evaluatedIdentities = identities.map(evaluateIdentity);

  return {
    admittedSignals: evaluatedSignals.filter(s => s.visible),
    blockedSignals: evaluatedSignals.filter(s => !s.visible),

    admittedIdentities: evaluatedIdentities.filter(i => i.visible),
    blockedIdentities: evaluatedIdentities.filter(i => !i.visible),

    totals: {
      signals: evaluatedSignals.length,
      admittedSignals: evaluatedSignals.filter(s => s.visible).length,
      blockedSignals: evaluatedSignals.filter(s => !s.visible).length,
    }
  };
}
