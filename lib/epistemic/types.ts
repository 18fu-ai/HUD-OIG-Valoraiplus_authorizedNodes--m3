/**
 * VALORAIPLUS Epistemic System - Shared Types
 * NO_ANCESTRY → NO_AUTHORITY
 */

export type EvidenceId = string;
export type ProofId = string;
export type GovernanceId = string;

export interface EvidenceRecord {
  id: EvidenceId;
  timestamp: number;
  source: string;
  contentHash: string;
}

export interface ProofRecord {
  id: ProofId;
  evidenceId: EvidenceId;
  verified: boolean;
  replayable: boolean;
  lineageDepth: number;
}

export interface GovernanceRule {
  id: GovernanceId;
  name: string;
  passed: boolean;
}

export interface AssuranceState {
  confidence: number;
  entropy: number;
  attractorDistance: number;
  lineageIntegrity: number;
}

export interface DashboardCard {
  id: string;
  label: string;
  assurance: AssuranceState;
  proofId: ProofId;
  evidenceId: EvidenceId;
}

// Runtime Signal Types - ABSOLUTE_9_ZERO_DRIFT
export type RuntimeSignal = "ALL_GREEN" | "DEGRADED" | "CRITICAL";

export interface RuntimeTelemetry {
  truthCycle: number;
  intervalMs: number;
  timestamp: string;
  signalPercent: number;
  driftCriticalCount: number;
}

// Epistemic Event for Total Order Chain
export interface EpistemicEvent {
  id: string;
  timestamp: number;
  type: string;
  payload: unknown;
}

// Token Types
export interface SovereignToken {
  symbol: string;
  name: string;
  totalSupply: number;
  status: 'ACTIVE' | 'FROZEN' | 'PURGED' | 'NULL';
  sovereignAddress: string;
}

// Ledger Event Types
export interface LedgerEvent {
  id: string;
  eventType: 'MINT' | 'BURN' | 'TRANSFER' | 'HOLD' | 'RELEASE' | 'VERIFY' | 'ANCHOR';
  tokenSymbol: string;
  amount: number;
  fromAddress?: string;
  toAddress?: string;
  signature: string;
  sequenceNumber: number;
  parentHash?: string;
  eventHash: string;
  createdAt: string;
}

// Validator Consensus
export interface ValidatorNode {
  address: string;
  stakeAmount: number;
  status: 'ACTIVE' | 'SLASHED' | 'JAILED' | 'EXITED';
  lastAttestation?: string;
  attestationCount: number;
}

// Forensic Audit
export interface ForensicAuditEntry {
  id: string;
  auditType: 'TRANSACTION' | 'SIGNATURE' | 'ACCESS' | 'ANOMALY' | 'BREACH' | 'RECOVERY';
  severity: 'INFO' | 'WARNING' | 'CRITICAL' | 'TERMINAL';
  actorAddress?: string;
  targetAddress?: string;
  evidenceHash: string;
  evidenceData: Record<string, unknown>;
  chainAnchor?: string;
  createdAt: string;
}

// SGAU Filing
export interface SGAUFiling {
  id: string;
  filingNumber: string;
  filingType: 'COUNTER' | 'ORIGINAL' | 'AMENDMENT' | 'RESPONSE';
  status: 'PENDING' | 'FILED' | 'ACCEPTED' | 'REJECTED' | 'STANDS';
  protectedAssets: string[];
  evidenceHashes: string[];
  filingDate: string;
}
