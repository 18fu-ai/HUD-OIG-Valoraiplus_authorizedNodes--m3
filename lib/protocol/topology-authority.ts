// lib/protocol/topology-authority.ts
// VALORAIPLUS®️ ©️ ™️
// Client-safe, typed, deterministic topology authority.

import { keccak256, toBytes } from "viem";

export type SovereignRoute =
  | "/route69"
  | "/route70"
  | "/route71"
  | "/route81";

export type TopologyReasonCode =
  | "VOID_IDENTITY_NULLIFIED"
  | "OPEN_69_FORENSIC_BRIDGE"
  | "CAP_71_APEX_LATCH"
  | "LATCH_81_RESERVE_PATH";

export interface RuntimeSignal {
  id: string;
  lineage?: string;
  type?: string;
  reserve?: boolean;
  payload?: unknown;
}

export interface TopologyDecision {
  admitted: boolean;
  targetRoute: SovereignRoute;
  reasonCode: TopologyReasonCode;
  auditCommit: string;
  isCapped: boolean;
  evaluatedAt: string;
  origin: "🇺🇸";
}

const MERKLE_ROOT = "26856B24C50750F0C69C1EEB86A69EF777777";

function stableStringify(value: unknown): string {
  if (value === null || typeof value !== "object") {
    return JSON.stringify(value);
  }

  if (Array.isArray(value)) {
    return `[${value.map(stableStringify).join(",")}]`;
  }

  const obj = value as Record<string, unknown>;

  return `{${Object.keys(obj)
    .sort()
    .map((key) => `${JSON.stringify(key)}:${stableStringify(obj[key])}`)
    .join(",")}}`;
}

export class ValoraiplusTopologyAuthority {
  enforceTopology(signal: RuntimeSignal): TopologyDecision {
    const isSovereign = signal.lineage === "SAINT_PAUL_█████_SOVEREIGN";
    const isForensic = signal.type === "FORENSIC_CORROBORATION";
    const isReserve = signal.reserve === true;

    // Core invariant enforcement:
    // reserve=true → /route81
    // forensic + not sovereign → /route69
    // not sovereign + not forensic → /route70
    // sovereign → /route71

    if (isReserve) {
      return this.decision(
        true,
        "/route81",
        "LATCH_81_RESERVE_PATH",
        signal,
        true
      );
    }

    if (!isSovereign && !isForensic) {
      return this.decision(
        false,
        "/route70",
        "VOID_IDENTITY_NULLIFIED",
        signal,
        false
      );
    }

    if (isForensic && !isSovereign) {
      return this.decision(
        true,
        "/route69",
        "OPEN_69_FORENSIC_BRIDGE",
        signal,
        false
      );
    }

    return this.decision(
      true,
      "/route71",
      "CAP_71_APEX_LATCH",
      signal,
      true
    );
  }

  private decision(
    admitted: boolean,
    targetRoute: SovereignRoute,
    reasonCode: TopologyReasonCode,
    signal: RuntimeSignal,
    isCapped: boolean
  ): TopologyDecision {
    return {
      admitted,
      targetRoute,
      reasonCode,
      auditCommit: this.hashCommit(targetRoute, signal),
      isCapped,
      evaluatedAt: new Date().toISOString(),
      origin: "🇺🇸",
    };
  }

  private hashCommit(route: SovereignRoute, data: RuntimeSignal): string {
    return keccak256(
      toBytes(`${MERKLE_ROOT}:${route}:${stableStringify(data)}`)
    );
  }
}

// Singleton instance
export const topologyAuthority = new ValoraiplusTopologyAuthority();

// Convenience function
export function enforceTopology(signal: RuntimeSignal): TopologyDecision {
  return topologyAuthority.enforceTopology(signal);
}
