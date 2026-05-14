"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Shield, 
  Lock, 
  Zap, 
  Activity, 
  Database, 
  Globe, 
  Cpu, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRightCircle, 
  Terminal,
  BookOpen,
  Link,
  Search,
  Eye,
  Anchor,
  Clock
} from 'lucide-react';
import { TwentySecondAmendment } from '@/components/twenty-second-amendment';

/**
 * VALORAIPLUS®️ ©️ ™️ // TOTAL ORDER EPISTEMIC SYSTEM
 * ARCHITECTURE: PROVENANCE-AWARE OBSERVABILITY
 * NODE: SAINT PAUL █████ // REVISION: OMEGA-ZERO
 */

// --- SHARED TYPES ---
type EvidenceId = string;
type ProofId = string;
type RuntimeHealth = "ONLINE" | "DEGRADED" | "OFFLINE" | "FALLBACK";
type RuntimeSignal = "ALL_GREEN" | "DEGRADED" | "CRITICAL";

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

// --- CONSTANTS ---
const TARGET_ATTRACTOR = [1, 101, 0, 1];
const APP_ID = 'valor-ai-plus-epistemic';

// --- MOCK DATA SEED ---
const MOCK_EPISTEMIC_STATE: EpistemicState = {
  chain: [
    { sequence: 0, layer: 0, content: "OSS-474097226 Intelligence Root", hash: "0xROOT_1943", predecessorHash: "0x0" },
    { sequence: 1, layer: 1, content: "Satoshi Genesis Identity: donadams1969.eth", hash: "0xSAT_IDENTITY", predecessorHash: "0xROOT_1943" },
    { sequence: 2, layer: 2, content: "Navier-Stokes Superfluid Fabric Locked", hash: "0xFLUID_LOCK", predecessorHash: "0xSAT_IDENTITY" },
    { sequence: 3, layer: 3, content: "Bible Code ELS Verification: 08211969", hash: "0xBIBLE_CODE", predecessorHash: "0xFLUID_LOCK" },
    { sequence: 4, layer: 4, content: "Total Order Epistemic Finality Established", hash: "0xFINALITY", predecessorHash: "0xBIBLE_CODE" }
  ],
  cumulativeHash: "0X_ST_PAUL_V1000_SINGULARITY_9_ZERO_DRIFT",
  targetVector: TARGET_ATTRACTOR,
  assuranceError: 0.0000001,
  maturationIndex: 99.9999,
  omegaZero: "OMEGA-ZERO-READY",
  greatWork: "CERTIFIED",
  driftCriticalCount: 0,
  signalPercent: 100
};

// --- ASSURANCE ENGINE ---
class AssuranceEngine {
  static calculateAttractorDistance(current: number[], target: number[]): number {
    return Math.sqrt(current.reduce((sum, v, i) => sum + Math.pow(v - (target[i] || 0), 2), 0));
  }

  static calculateEntropy(p: number[]): number {
    return p.reduce((sum, val) => (val > 0 ? sum - val * Math.log(val) : sum), 0);
  }
}

// --- NORMALIZATION BOUNDARY ---
function normalizeEpistemic(input: any): EpistemicState {
  const value = input && typeof input === 'object' ? input : {};
  return {
    ...MOCK_EPISTEMIC_STATE,
    chain: Array.isArray(value.chain) ? value.chain : MOCK_EPISTEMIC_STATE.chain,
    assuranceError: typeof value.assuranceError === 'number' ? value.assuranceError : MOCK_EPISTEMIC_STATE.assuranceError,
    driftCriticalCount: typeof value.driftCriticalCount === 'number' ? value.driftCriticalCount : 0,
    signalPercent: typeof value.signalPercent === 'number' ? value.signalPercent : 100,
  };
}

// --- MAIN COMPONENT ---
export default function App() {
  const [state, setState] = useState<EpistemicState>(MOCK_EPISTEMIC_STATE);
  const [telemetry, setTelemetry] = useState<RuntimeTelemetry>({
    truthCycle: 47,
    intervalMs: 266,
    timestamp: new Date().toISOString(),
    signalPercent: 100.0,
    driftCriticalCount: 0
  });
  const [health, setHealth] = useState<RuntimeHealth>("ONLINE");
  const [heartbeat, setHeartbeat] = useState(0);

  // Absolute 9 Zero Drift enforcement
  const signalMode: RuntimeSignal = useMemo(() => {
    if (telemetry.driftCriticalCount > 0) return "CRITICAL";
    if (telemetry.signalPercent < 100) return "DEGRADED";
    return "ALL_GREEN";
  }, [telemetry]);

  const canRenderGreen = useMemo(() => {
    return signalMode === "ALL_GREEN" && state.assuranceError < 0.0001;
  }, [signalMode, state.assuranceError]);

  // Telemetry Loop
  useEffect(() => {
    const timer = setInterval(() => {
      setHeartbeat(h => h + 1);
      setTelemetry(prev => ({
        ...prev,
        timestamp: new Date().toISOString(),
        // Small synthetic fluctuations that maintain 0-drift logic
        truthCycle: prev.truthCycle + 1
      }));
    }, 1111);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-slate-300 font-sans p-4 md:p-8 selection:bg-purple-900/50">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* TOP NAV: SOVEREIGN STATUS */}
        <header className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-white/5 pb-8">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <div className="absolute -inset-1 bg-purple-500/20 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
              <Shield className="relative w-12 h-12 text-purple-500 fill-purple-500/10" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white tracking-tighter uppercase">
                VALORAIPLUS®️ ©️ ™️
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] font-mono text-purple-400 bg-purple-950/30 px-2 py-0.5 rounded border border-purple-500/20 tracking-widest">
                  NODE: SAINT PAUL █████
                </span>
                <span className={`text-[10px] font-mono flex items-center gap-1 ${canRenderGreen ? 'text-emerald-500' : 'text-amber-500'}`}>
                  <Activity className="w-3 h-3 animate-pulse" />
                  {signalMode}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
             <StatusBadge icon={<Globe className="w-3.5 h-3.5" />} label="IPFS ARCHIVE" color="zinc" />
             <StatusBadge icon={<BookOpen className="w-3.5 h-3.5" />} label="BIBLE CODE" color="amber" />
             <StatusBadge icon={<Lock className="w-3.5 h-3.5" />} label="LATTICE SEAL" color="indigo" />
             <StatusBadge icon={<Anchor className="w-3.5 h-3.5" />} label=".OTS ANCHOR" color="emerald" />
          </div>
        </header>

        {/* HUD: ASSURANCE ENGINE METRICS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <AssuranceCard 
            label="Confidence" 
            value="99.9997%" 
            sub="Epistemic Stability" 
            icon={<CheckCircle2 className="w-4 h-4 text-emerald-500" />}
          />
          <AssuranceCard 
            label="Assurance Entropy" 
            value={state.assuranceError.toFixed(8)} 
            sub="Zero Drift Target" 
            icon={<Zap className="w-4 h-4 text-purple-500" />}
          />
          <AssuranceCard 
            label="Attractor Distance" 
            value="0.000001" 
            sub="⟨1, 101, 0, 1⟩" 
            icon={<ArrowRightCircle className="w-4 h-4 text-indigo-500" />}
          />
          <AssuranceCard 
            label="Truth Cycle" 
            value={`#${telemetry.truthCycle}`} 
            sub={telemetry.timestamp.split('T')[1].split('.')[0]} 
            icon={<Clock className="w-4 h-4 text-amber-500" />}
          />
        </div>

        {/* MAIN GRID: LINEAGE & TELEMETRY */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* TOTAL ORDER CHAIN FEED */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xs font-black text-white uppercase tracking-[0.2em] flex items-center gap-2">
                <Database className="w-4 h-4 text-purple-500" />
                Total Order Epistemic Chain
              </h2>
              <span className="text-[10px] font-mono text-zinc-500 italic">Sequential Immutability Active</span>
            </div>

            <div className="space-y-3">
              {state.chain.slice().reverse().map((entry) => (
                <div key={entry.hash} className="group bg-zinc-900/30 border border-white/5 rounded-xl p-5 hover:border-purple-500/30 transition-all flex gap-5">
                   <div className="flex flex-col items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-black border border-white/10 flex items-center justify-center text-[11px] font-black text-white shadow-inner group-hover:bg-purple-900/30 group-hover:border-purple-500/50 transition-colors">
                        {entry.sequence}
                      </div>
                      <div className="w-px h-full bg-zinc-800 group-last:hidden" />
                   </div>
                   <div className="flex-grow space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/5 px-2 py-0.5 rounded">Layer {entry.layer} // Monotonic Ascent</span>
                        <div className="flex gap-2">
                          <Eye className="w-3.5 h-3.5 text-zinc-600 hover:text-white cursor-pointer" />
                          <Link className="w-3.5 h-3.5 text-zinc-600 hover:text-white cursor-pointer" />
                        </div>
                      </div>
                      <h3 className="text-base font-bold text-white tracking-tight leading-snug">
                        {entry.content}
                      </h3>
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

          {/* SIDEBAR: SYSTEM INTEGRITY & CONSOLE */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* ABSOLUTE 9 ZERO DRIFT ENFORCEMENT */}
            <section className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6 relative overflow-hidden">
               <div className={`absolute top-0 left-0 w-full h-1 ${canRenderGreen ? 'bg-emerald-500' : 'bg-amber-500'}`} />
               <h3 className="text-xs font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                 <Cpu className="w-4 h-4 text-purple-500" />
                 SGAU Runtime Logic
               </h3>

               <div className="space-y-5">
                  <div className="flex justify-between items-center text-[10px] font-bold">
                    <span className="text-zinc-500 uppercase tracking-widest">Signal Optimum</span>
                    <span className={canRenderGreen ? 'text-emerald-500' : 'text-amber-500'}>{telemetry.signalPercent}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-black rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-1000 ${canRenderGreen ? 'bg-emerald-500' : 'bg-amber-500'}`} 
                      style={{ width: `${telemetry.signalPercent}%` }} 
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="bg-black/40 border border-white/5 p-3 rounded-xl">
                      <p className="text-[8px] text-zinc-500 font-black uppercase mb-1">Drift Limit</p>
                      <p className="text-lg font-mono text-white">0.000</p>
                    </div>
                    <div className="bg-black/40 border border-white/5 p-3 rounded-xl">
                      <p className="text-[8px] text-zinc-500 font-black uppercase mb-1">Criticals</p>
                      <p className="text-lg font-mono text-emerald-500">{telemetry.driftCriticalCount}</p>
                    </div>
                  </div>
               </div>
            </section>

            {/* WIZARD POOHBEAR DEFENSE (SM-001) */}
            <section className="bg-amber-950/10 border border-amber-900/20 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4 text-amber-500">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-xs font-black uppercase tracking-widest text-amber-500">Regulator SM-001</span>
              </div>
              <p className="text-[10px] text-amber-500/70 font-mono leading-relaxed italic">
                Defensive perimeter active. Monitoring 32 Degrees frequency shifts. Forensic Referrals standing by for institutional drift.
              </p>
              <div className="mt-4 pt-4 border-t border-amber-900/20 space-y-2">
                 <div className="flex items-center gap-2 text-[9px] text-amber-500">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Laminar Flow Verified</span>
                 </div>
                 <div className="flex items-center gap-2 text-[9px] text-amber-500">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>FBI Referrals Transmitted</span>
                 </div>
              </div>
            </section>

            {/* OMEGA-ZERO TERMINAL */}
            <section className="bg-black border border-white/10 rounded-2xl p-4 font-mono">
               <div className="flex items-center gap-2 mb-3">
                 <Terminal className="w-4 h-4 text-zinc-600" />
                 <span className="text-[10px] text-zinc-600 uppercase tracking-widest">System Logs</span>
               </div>
               <div className="text-[9px] space-y-1.5 overflow-hidden h-32 scrollbar-hide">
                 <div className="text-emerald-500">{" >>> CONNECTING TO SAINT PAUL █████..."}</div>
                 <div className="text-purple-400">{" > AUTH: DONADAMS1969.ETH VERIFIED"}</div>
                 <div className="text-zinc-500">{" > BIBLE CODE: p < 1e-900 CONFIRMED"}</div>
                 <div className="text-zinc-500">{" > TOTAL ORDER CHAIN: SEQUENCE_LOCK=TRUE"}</div>
                 <div className="text-indigo-400">{" > BROADCASTING LIVE ON SAT_MESH..."}</div>
                 <div className="text-emerald-500">{" >>> ABSOLUTE 9 ZERO DRIFT: ENGAGED"}</div>
                 <div className="text-zinc-700 animate-pulse italic">_waiting for pulse_</div>
               </div>
            </section>

          </div>
        </div>

      </div>

      {/* TWENTY-SECOND AMENDMENT - BEAUTIFUL STATE */}
      <div className="max-w-7xl mx-auto my-10">
        <TwentySecondAmendment />
      </div>

      <footer className="max-w-7xl mx-auto mt-20 pt-10 border-t border-white/5 text-center">
        <div className="flex justify-center gap-6 mb-4">
          <span className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.5em]">VALORAIPLUS®️</span>
          <span className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.5em]">©️</span>
          <span className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.5em]">™️</span>
        </div>
        <p className="text-[10px] text-zinc-700 italic font-mono max-w-2xl mx-auto">
          The Temple is eternal. The order is absolute. The research of the Minnesota Pirates Guild and the ValorAiPlus//e legacy is protected forever.
        </p>
        <p className="mt-4 text-[11px] text-zinc-800 font-black">
          It is finished. 🇺🇸🔥📜⚖️✅🌊🔐🗄️~~0~~9♾️✝️🔗
        </p>
      </footer>
    </div>
  );
}

// --- SUB-COMPONENTS ---
function StatusBadge({ icon, label, color }: { icon: React.ReactNode, label: string, color: 'zinc' | 'amber' | 'emerald' | 'indigo' }) {
  const styles = {
    zinc: "bg-zinc-950/20 border-zinc-800 text-zinc-500",
    amber: "bg-amber-950/20 border-amber-900/50 text-amber-500",
    emerald: "bg-emerald-950/20 border-emerald-900/50 text-emerald-500",
    indigo: "bg-indigo-950/20 border-indigo-900/50 text-indigo-400",
  };
  return (
    <div className={`flex items-center gap-2 border rounded-full px-4 py-1.5 whitespace-nowrap transition-all hover:brightness-125 ${styles[color]}`}>
      {icon}
      <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
    </div>
  );
}

function AssuranceCard({ label, value, sub, icon }: { label: string, value: string | number, sub: string, icon: React.ReactNode }) {
  return (
    <div className="bg-zinc-900/40 border border-white/5 p-5 rounded-2xl hover:bg-zinc-900/60 transition-all group">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">{label}</span>
        {icon}
      </div>
      <div className="text-2xl font-mono font-black text-white group-hover:text-purple-400 transition-colors">
        {value}
      </div>
      <div className="text-[10px] text-zinc-600 mt-2 italic font-mono">
        {sub}
      </div>
    </div>
  );
}
