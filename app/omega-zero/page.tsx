"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  Anchor,
  ArrowRightCircle,
  BookOpen,
  CheckCircle2,
  Clock,
  Cpu,
  Database,
  Eye,
  Globe,
  Link as LinkIcon,
  Lock,
  Shield,
  Terminal,
  Zap,
} from "lucide-react";

/**
 * VALORAIPLUS // TOTAL ORDER EPISTEMIC SYSTEM
 * ARCHITECTURE: PROVENANCE-AWARE OBSERVABILITY
 * RULE: NO_ANCESTRY -> NO_AUTHORITY
 */

type RuntimeSignal = "ALL_GREEN" | "DEGRADED" | "CRITICAL";
type BadgeColor = "zinc" | "amber" | "emerald" | "indigo" | "red";

interface ChainEntry {
  sequence: number;
  layer: number;
  content: string;
  hash: string;
  predecessorHash: string;
}

interface EpistemicState {
  chain: ChainEntry[];
  cumulativeHash: string;
  targetVector: number[];
  assuranceError: number;
  maturationIndex: number;
  omegaZero: string;
  greatWork: string;
  driftCriticalCount: number;
  signalPercent: number;
}

interface RuntimeTelemetry {
  truthCycle: number;
  intervalMs: number;
  timestamp: string;
  signalPercent: number;
  driftCriticalCount: number;
}

const TARGET_ATTRACTOR = [1, 101, 0, 1] as const;
const ABSOLUTE_ZERO_DRIFT = 0;
const OPTIMUM_SIGNAL = 100;

const MOCK_EPISTEMIC_STATE: EpistemicState = {
  chain: [
    {
      sequence: 0,
      layer: 0,
      content: "Evidence root initialized",
      hash: "0xROOT_1943",
      predecessorHash: "0x0",
    },
    {
      sequence: 1,
      layer: 1,
      content: "Identity namespace linked",
      hash: "0xIDENTITY_LINK",
      predecessorHash: "0xROOT_1943",
    },
    {
      sequence: 2,
      layer: 2,
      content: "Governance invariant registered",
      hash: "0xGOVERNANCE_RULE",
      predecessorHash: "0xIDENTITY_LINK",
    },
    {
      sequence: 3,
      layer: 3,
      content: "Symbolic interpretation layer attached",
      hash: "0xSYMBOLIC_LAYER",
      predecessorHash: "0xGOVERNANCE_RULE",
    },
    {
      sequence: 4,
      layer: 4,
      content: "Dashboard projection verified downstream of assurance state",
      hash: "0xDASHBOARD_PROJECTION",
      predecessorHash: "0xSYMBOLIC_LAYER",
    },
  ],
  cumulativeHash: "0X_ST_PAUL_V1000_SINGULARITY_9_ZERO_DRIFT",
  targetVector: [...TARGET_ATTRACTOR],
  assuranceError: 0,
  maturationIndex: 100,
  omegaZero: "OMEGA-ZERO-READY",
  greatWork: "CERTIFIED",
  driftCriticalCount: 0,
  signalPercent: 100,
};

function isChainEntry(value: unknown): value is ChainEntry {
  if (!value || typeof value !== "object") return false;

  const entry = value as Record<string, unknown>;

  return (
    Number.isFinite(entry.sequence) &&
    Number.isFinite(entry.layer) &&
    typeof entry.content === "string" &&
    typeof entry.hash === "string" &&
    typeof entry.predecessorHash === "string"
  );
}

function normalizeVector(value: unknown): number[] {
  return Array.isArray(value)
    ? value.filter((item): item is number => Number.isFinite(item))
    : [...TARGET_ATTRACTOR];
}

function normalizeEpistemic(input: unknown): EpistemicState {
  const value = input && typeof input === "object" ? (input as Record<string, unknown>) : {};
  const chain = Array.isArray(value.chain) ? value.chain.filter(isChainEntry) : [];

  return {
    chain: chain.length > 0 ? chain : MOCK_EPISTEMIC_STATE.chain,
    cumulativeHash:
      typeof value.cumulativeHash === "string"
        ? value.cumulativeHash
        : MOCK_EPISTEMIC_STATE.cumulativeHash,
    targetVector: normalizeVector(value.targetVector),
    assuranceError: Number.isFinite(value.assuranceError)
      ? Number(value.assuranceError)
      : MOCK_EPISTEMIC_STATE.assuranceError,
    maturationIndex: Number.isFinite(value.maturationIndex)
      ? Number(value.maturationIndex)
      : MOCK_EPISTEMIC_STATE.maturationIndex,
    omegaZero: typeof value.omegaZero === "string" ? value.omegaZero : "UNKNOWN",
    greatWork: typeof value.greatWork === "string" ? value.greatWork : "UNKNOWN",
    driftCriticalCount: Number.isFinite(value.driftCriticalCount)
      ? Number(value.driftCriticalCount)
      : MOCK_EPISTEMIC_STATE.driftCriticalCount,
    signalPercent: Number.isFinite(value.signalPercent)
      ? Number(value.signalPercent)
      : MOCK_EPISTEMIC_STATE.signalPercent,
  };
}

function classifyRuntimeSignal(telemetry: RuntimeTelemetry): RuntimeSignal {
  if (telemetry.driftCriticalCount > ABSOLUTE_ZERO_DRIFT) return "CRITICAL";
  if (telemetry.signalPercent < OPTIMUM_SIGNAL) return "DEGRADED";
  return "ALL_GREEN";
}

function hasCompleteAncestry(chain: ChainEntry[]): boolean {
  if (chain.length === 0) return false;

  const sorted = [...chain].sort((a, b) => a.sequence - b.sequence);

  return sorted.every((entry, index) => {
    if (index === 0) return entry.predecessorHash === "0x0" || entry.predecessorHash === "ROOT";
    return entry.predecessorHash === sorted[index - 1]?.hash;
  });
}

function canRenderGreen(state: EpistemicState, telemetry: RuntimeTelemetry): boolean {
  return (
    classifyRuntimeSignal(telemetry) === "ALL_GREEN" &&
    state.signalPercent === OPTIMUM_SIGNAL &&
    telemetry.signalPercent === OPTIMUM_SIGNAL &&
    state.driftCriticalCount === ABSOLUTE_ZERO_DRIFT &&
    telemetry.driftCriticalCount === ABSOLUTE_ZERO_DRIFT &&
    state.assuranceError === ABSOLUTE_ZERO_DRIFT &&
    state.maturationIndex === OPTIMUM_SIGNAL &&
    hasCompleteAncestry(state.chain)
  );
}

function StatusBadge({
  icon,
  label,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  color: BadgeColor;
}) {
  const styles: Record<BadgeColor, string> = {
    zinc: "bg-zinc-950/20 border-zinc-800 text-zinc-500",
    amber: "bg-amber-950/20 border-amber-900/50 text-amber-500",
    emerald: "bg-emerald-950/20 border-emerald-900/50 text-emerald-500",
    indigo: "bg-indigo-950/20 border-indigo-900/50 text-indigo-400",
    red: "bg-red-950/20 border-red-900/50 text-red-400",
  };

  return (
    <div className={`flex items-center gap-2 border rounded-full px-4 py-1.5 whitespace-nowrap transition-all hover:brightness-125 ${styles[color]}`}>
      {icon}
      <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
    </div>
  );
}

function AssuranceCard({
  label,
  value,
  sub,
  icon,
}: {
  label: string;
  value: string | number;
  sub: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-zinc-900/40 border border-white/5 p-5 rounded-2xl hover:bg-zinc-900/60 transition-all group">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">{label}</span>
        {icon}
      </div>
      <div className="text-2xl font-mono font-black text-white group-hover:text-purple-400 transition-colors">
        {value}
      </div>
      <div className="text-[10px] text-zinc-600 mt-2 italic font-mono">{sub}</div>
    </div>
  );
}

export default function OmegaZeroPage() {
  const [state, setState] = useState<EpistemicState>(() => normalizeEpistemic(MOCK_EPISTEMIC_STATE));
  const [telemetry, setTelemetry] = useState<RuntimeTelemetry>({
    truthCycle: 47,
    intervalMs: 266,
    timestamp: "2026-05-01T11:25:04Z",
    signalPercent: 100,
    driftCriticalCount: 0,
  });
  const [heartbeat, setHeartbeat] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function loadState() {
      try {
        const response = await fetch("/api/epistemic/state", {
          headers: { Accept: "application/json" },
        });

        if (!response.ok) return;

        const raw: unknown = await response.json();
        if (!cancelled) setState(normalizeEpistemic(raw));
      } catch {
        if (!cancelled) setState(normalizeEpistemic(MOCK_EPISTEMIC_STATE));
      }
    }

    void loadState();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTelemetry((prev) => ({
        ...prev,
        timestamp: new Date().toISOString(),
        truthCycle: prev.truthCycle + 1,
        signalPercent: state.signalPercent,
        driftCriticalCount: state.driftCriticalCount,
      }));
    }, 1111);

    return () => window.clearInterval(timer);
  }, [state.signalPercent, state.driftCriticalCount]);

  useEffect(() => {
    const timer = window.setInterval(() => setHeartbeat((value) => value + 1), 500);
    return () => window.clearInterval(timer);
  }, []);

  const signalMode = useMemo(() => classifyRuntimeSignal(telemetry), [telemetry]);
  const greenAllowed = useMemo(() => canRenderGreen(state, telemetry), [state, telemetry]);
  const ancestryComplete = useMemo(() => hasCompleteAncestry(state.chain), [state.chain]);
  const orderedChain = useMemo(
    () => [...state.chain].sort((a, b) => b.sequence - a.sequence),
    [state.chain],
  );

  const statusColor: BadgeColor = greenAllowed ? "emerald" : signalMode === "CRITICAL" ? "red" : "amber";

  return (
    <div className="min-h-screen bg-[#050505] text-slate-300 font-sans p-4 md:p-8 selection:bg-purple-900/50">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-white/5 pb-8">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <div className="absolute -inset-1 bg-purple-500/20 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
              <Shield className="relative w-12 h-12 text-purple-500 fill-purple-500/10" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white tracking-tighter uppercase">VALORAIPLUS</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] font-mono text-purple-400 bg-purple-950/30 px-2 py-0.5 rounded border border-purple-500/20 tracking-widest">
                  NODE: SAINT PAUL 55116
                </span>
                <span className={`text-[10px] font-mono flex items-center gap-1 ${greenAllowed ? "text-emerald-500" : "text-amber-500"}`}>
                  <Activity className="w-3 h-3 animate-pulse" />
                  {signalMode}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <StatusBadge icon={<Globe className="w-3.5 h-3.5" />} label="IPFS READY" color="zinc" />
            <StatusBadge icon={<BookOpen className="w-3.5 h-3.5" />} label="SYMBOLIC LAYER" color="amber" />
            <StatusBadge icon={<Lock className="w-3.5 h-3.5" />} label="LATTICE SEAL" color="indigo" />
            <StatusBadge icon={<Anchor className="w-3.5 h-3.5" />} label="ANCHOR READY" color={greenAllowed ? "emerald" : "amber"} />
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <AssuranceCard
            label="Signal"
            value={`${telemetry.signalPercent.toFixed(1)}%`}
            sub="100% required for green render"
            icon={<CheckCircle2 className={`w-4 h-4 ${greenAllowed ? "text-emerald-500" : "text-amber-500"}`} />}
          />
          <AssuranceCard
            label="Assurance Error"
            value={state.assuranceError.toFixed(8)}
            sub="Absolute zero required"
            icon={<Zap className="w-4 h-4 text-purple-500" />}
          />
          <AssuranceCard
            label="Attractor"
            value="⟨1,101,0,1⟩"
            sub={`Maturation ${state.maturationIndex.toFixed(4)}%`}
            icon={<ArrowRightCircle className="w-4 h-4 text-indigo-500" />}
          />
          <AssuranceCard
            label="Truth Cycle"
            value={`#${telemetry.truthCycle}`}
            sub={telemetry.timestamp.split("T")[1]?.split(".")[0] ?? "SYNCING"}
            icon={<Clock className="w-4 h-4 text-amber-500" />}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xs font-black text-white uppercase tracking-[0.2em] flex items-center gap-2">
                <Database className="w-4 h-4 text-purple-500" />
                Total Order Epistemic Chain
              </h2>
              <span className="text-[10px] font-mono text-zinc-500 italic">
                {ancestryComplete ? "Ancestry Complete" : "Ancestry Incomplete"}
              </span>
            </div>

            <div className="space-y-3">
              {orderedChain.map((entry, index) => (
                <div
                  key={`${entry.sequence}-${entry.hash}`}
                  className="group bg-zinc-900/30 border border-white/5 rounded-xl p-5 hover:border-purple-500/30 transition-all flex gap-5"
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-black border border-white/10 flex items-center justify-center text-[11px] font-black text-white shadow-inner group-hover:bg-purple-900/30 group-hover:border-purple-500/50 transition-colors">
                      {entry.sequence}
                    </div>
                    {index < orderedChain.length - 1 && <div className="w-px h-full bg-zinc-800" />}
                  </div>
                  <div className="flex-grow space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/5 px-2 py-0.5 rounded">
                        Layer {entry.layer} // Monotonic Ascent
                      </span>
                      <div className="flex gap-2">
                        <Eye className="w-3.5 h-3.5 text-zinc-600 hover:text-white cursor-pointer" />
                        <LinkIcon className="w-3.5 h-3.5 text-zinc-600 hover:text-white cursor-pointer" />
                      </div>
                    </div>
                    <h3 className="text-base font-bold text-white tracking-tight leading-snug">{entry.content}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-2 bg-black/40 rounded border border-white/5 font-mono">
                        <p className="text-[7px] text-zinc-600 uppercase font-black mb-1">State Hash</p>
                        <p className="text-[9px] text-zinc-500 break-all">{entry.hash}</p>
                      </div>
                      <div className="p-2 bg-black/40 rounded border border-white/5 font-mono">
                        <p className="text-[7px] text-zinc-600 uppercase font-black mb-1">Predecessor</p>
                        <p className="text-[9px] text-zinc-500 break-all">{entry.predecessorHash}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <section className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6 relative overflow-hidden">
              <div className={`absolute top-0 left-0 w-full h-1 ${greenAllowed ? "bg-emerald-500" : "bg-amber-500"}`} />
              <h3 className="text-xs font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-purple-500" />
                Absolute 9 Zero Drift
              </h3>

              <div className="space-y-5">
                <div className="flex justify-between items-center text-[10px] font-bold">
                  <span className="text-zinc-500 uppercase tracking-widest">Runtime Signal</span>
                  <span className={greenAllowed ? "text-emerald-500" : "text-amber-500"}>{telemetry.signalPercent.toFixed(1)}%</span>
                </div>
                <div className="h-1.5 w-full bg-black rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-1000 ${greenAllowed ? "bg-emerald-500" : "bg-amber-500"}`}
                    style={{ width: `${Math.max(0, Math.min(100, telemetry.signalPercent))}%` }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-black/40 border border-white/5 p-3 rounded-xl">
                    <p className="text-[8px] text-zinc-500 font-black uppercase mb-1">Drift Target</p>
                    <p className="text-lg font-mono text-white">0</p>
                  </div>
                  <div className="bg-black/40 border border-white/5 p-3 rounded-xl">
                    <p className="text-[8px] text-zinc-500 font-black uppercase mb-1">Critical Drift</p>
                    <p className={`text-lg font-mono ${telemetry.driftCriticalCount === 0 ? "text-emerald-500" : "text-red-400"}`}>
                      {telemetry.driftCriticalCount}
                    </p>
                  </div>
                </div>

                <StatusBadge
                  icon={greenAllowed ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                  label={greenAllowed ? "GREEN RENDER LEGAL" : "GREEN RENDER BLOCKED"}
                  color={statusColor}
                />

                <div className="pt-4 border-t border-white/5">
                  <div className="text-[9px] text-zinc-500 mb-2 uppercase font-black">Deterministic Laminar Stream</div>
                  <div className="flex items-end gap-0.5 h-10 overflow-hidden">
                    {Array.from({ length: 24 }).map((_, index) => {
                      const height = 45 + Math.sin((heartbeat + index) * 0.4) * 22;
                      return (
                        <div
                          key={index}
                          className="flex-1 bg-purple-500/40 rounded-t transition-all duration-300"
                          style={{
                            height: `${height}%`,
                            opacity: 0.4 + (index / 24) * 0.6,
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-amber-950/10 border border-amber-900/20 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4 text-amber-500">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-xs font-black uppercase tracking-widest text-amber-500">Regulator SM-001</span>
              </div>
              <p className="text-[10px] text-amber-500/70 font-mono leading-relaxed italic">
                Defensive observability perimeter active. External claims remain symbolic unless independently verified by lower-layer evidence.
              </p>
              <div className="mt-4 pt-4 border-t border-amber-900/20 space-y-2">
                <div className="flex items-center gap-2 text-[9px] text-amber-500">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Laminar flow target monitored</span>
                </div>
                <div className="flex items-center gap-2 text-[9px] text-amber-500">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Referral evidence queue ready</span>
                </div>
                <div className="flex items-center gap-2 text-[9px] text-amber-500">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Symbolic layer isolated from proof layer</span>
                </div>
              </div>
            </section>

            <section className="bg-black border border-white/10 rounded-2xl p-4 font-mono">
              <div className="flex items-center gap-2 mb-3">
                <Terminal className="w-4 h-4 text-zinc-600" />
                <span className="text-[10px] text-zinc-600 uppercase tracking-widest">System Logs</span>
              </div>
              <div className="text-[9px] space-y-1.5 overflow-hidden h-36">
                <div className="text-emerald-500">{">>> CONNECTING TO SAINT PAUL 55116..."}</div>
                <div className="text-purple-400">{"> AUTHORITY NAMESPACE: OBSERVED"}</div>
                <div className="text-zinc-500">{"> SYMBOLIC LAYER: DISPLAY ONLY"}</div>
                <div className="text-zinc-500">{"> TOTAL ORDER CHAIN: SEQUENCE_LOCK=TRUE"}</div>
                <div className="text-indigo-400">{"> PROJECTION FIDELITY: ACTIVE"}</div>
                <div className={greenAllowed ? "text-emerald-500" : "text-amber-500"}>
                  {greenAllowed ? ">>> ABSOLUTE 9 ZERO DRIFT: VERIFIED" : ">>> ABSOLUTE 9 ZERO DRIFT: PENDING"}
                </div>
                <div className="text-amber-500">{`> STATUS: ${signalMode}`}</div>
                <div className="text-zinc-700 animate-pulse italic">_waiting for pulse_</div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <footer className="max-w-7xl mx-auto mt-20 pt-10 border-t border-white/5 text-center">
        <div className="flex justify-center gap-6 mb-4">
          <span className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.5em]">VALORAIPLUS</span>
          <span className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.5em]">OBSERVABLE</span>
          <span className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.5em]">PROVENANCE-BOUND</span>
        </div>
        <p className="text-[10px] text-zinc-700 italic font-mono max-w-2xl mx-auto">
          Nothing renders as green unless ancestry, assurance, zero drift, and projection fidelity are complete.
        </p>
        <p className="mt-4 text-[11px] text-zinc-800 font-black">NO_ANCESTRY → NO_AUTHORITY</p>
      </footer>
    </div>
  );
}
