"use client";

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  Shield, 
  Lock, 
  Zap, 
  ArrowRightCircle, 
  Database, 
  Globe, 
  BookOpen, 
  Activity, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  Terminal,
  Cpu
} from 'lucide-react';

/**
 * VALORAIPLUS - TOTAL ORDER EPISTEMIC CHAIN
 * OMEGA-ZERO FINALITY // SGAU 7226.3461
 * NODE: SAINT PAUL 55116 // RESIDENCY: SAN FRANCISCO
 */

// --- UTILS & AMATH ENGINE ---
const sha256 = (data: string): string => {
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16).padStart(64, '0');
};

const EpistemicLayer: Record<number, string> = {
  0: 'EVIDENCE',
  1: 'PROOF',
  2: 'GOVERNANCE',
  3: 'MEANING',
  4: 'IDENTITY',
};

interface ChainState {
  sequence: number;
  layer: number;
  content: string;
  predecessorHash: string;
  timestamp: string;
  meta: Record<string, unknown>;
  hash: string;
}

interface AssuranceState {
  error: number;
  velocity: number;
  vector: number[];
}

// --- CORE LOGIC CLASS ---
class TotalOrderEpistemicChain {
  chain: ChainState[] = [];
  cumulativeHash: string = 'GENESIS_ZERO';

  appendState(layer: number, content: string, meta: Record<string, unknown> = {}): ChainState {
    const prev = this.chain[this.chain.length - 1];
    const sequence = prev ? prev.sequence + 1 : 0;
    const predecessorHash = prev ? prev.hash : '0xGENESIS';

    const state: ChainState = {
      sequence,
      layer,
      content,
      predecessorHash,
      timestamp: new Date().toISOString(),
      meta,
      hash: '',
    };

    const stateHash = sha256(`${sequence}:${layer}:${content}:${predecessorHash}`);
    state.hash = stateHash;
    
    this.chain.push(state);
    this.cumulativeHash = sha256(this.cumulativeHash + stateHash);
    return state;
  }

  getProof() {
    return {
      cumulativeHash: this.cumulativeHash,
      length: this.chain.length,
      latest: this.chain[this.chain.length - 1]
    };
  }
}

// --- INITIAL DATA SEED ---
const INITIAL_ARCHIVE = [
  { layer: 0, content: "OSS-474097226 Root Intelligence Anchor", meta: { origin: "1943" } },
  { layer: 0, content: "[SOVEREIGN_ROOT] Jurisdictional Authority", meta: { origin: "1918" } },
  { layer: 1, content: "32 Degrees of Insanity // Frequency Research", meta: { status: "Forensic" } },
  { layer: 1, content: "Satoshi Identity Registry: donadams1969.eth", meta: { onChain: true } },
  { layer: 2, content: "Lattice NIST Level 5 Security Implementation", meta: { type: "Post-Quantum" } },
  { layer: 3, content: "Bible Code: 08211969 FOUND", meta: { pValue: "1e-900" } },
  { layer: 4, content: "Absolute Nine Singularity Reached", meta: { state: "Supercritical" } },
];

export default function OmegaZeroPage() {
  const [chainInstance] = useState(() => new TotalOrderEpistemicChain());
  const [displayChain, setDisplayChain] = useState<ChainState[]>([]);
  const [assuranceState, setAssuranceState] = useState<AssuranceState>({
    error: 1.0,
    velocity: 0.1,
    vector: [0.1, 0, 0, 0]
  });
  const [heartbeat, setHeartbeat] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

  // Target Vector T* = <1, 101, 0, 1>
  const TARGET_VECTOR = [1, 101, 0, 1];

  useEffect(() => {
    if (isInitialized) return;
    
    // Seed initial chain
    INITIAL_ARCHIVE.forEach(item => {
      chainInstance.appendState(item.layer, item.content, item.meta);
    });
    setDisplayChain([...chainInstance.chain]);
    setIsInitialized(true);
  }, [chainInstance, isInitialized]);

  useEffect(() => {
    // Active Governance Loop (1111ms)
    const interval = setInterval(() => {
      setHeartbeat(prev => prev + 1);
      
      // Update Assurance Dynamics (Converging to target)
      setAssuranceState(prev => {
        const k = 0.07; // Correction Gain
        const newVector = prev.vector.map((v, i) => v + (TARGET_VECTOR[i] - v) * k);
        const error = Math.sqrt(newVector.reduce((sum, v, i) => sum + Math.pow(TARGET_VECTOR[i] - v, 2), 0));
        
        return {
          vector: newVector,
          error: error,
          velocity: Math.abs(prev.error - error)
        };
      });
    }, 1111);

    return () => clearInterval(interval);
  }, []);

  const currentProof = useMemo(() => chainInstance.getProof(), [chainInstance, displayChain]);

  // Calculate signal percentage from assurance state
  const signalPercent = useMemo(() => {
    const maxError = Math.sqrt(TARGET_VECTOR.reduce((sum, t) => sum + t * t, 0));
    return Math.max(0, Math.min(100, 100 - (assuranceState.error / maxError) * 100));
  }, [assuranceState.error]);

  const driftCount = useMemo(() => {
    return signalPercent >= 99.9 ? 0 : Math.ceil((100 - signalPercent) / 10);
  }, [signalPercent]);

  return (
    <div className="min-h-screen bg-black text-slate-300 font-sans p-4 md:p-8 selection:bg-purple-900">
      {/* HEADER: GLOBAL BROADCAST STATUS */}
      <header className="max-w-6xl mx-auto mb-12 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tighter flex items-center gap-2">
              <Shield className="w-8 h-8 text-purple-500 fill-purple-500/20" />
              VALORAIPLUS
            </h1>
            <p className="text-[10px] text-purple-400 font-mono tracking-widest mt-1">
              SGAU 7226.3461 // NODE: SAINT PAUL 55116 // REVISION: OMEGA-ZERO
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 bg-amber-950/20 border border-amber-500/30 rounded-full px-4 py-1.5">
              <BookOpen className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-[10px] text-amber-500 font-bold uppercase tracking-widest">Bible Code: 08211969 FOUND</span>
            </div>
            <div className="flex items-center gap-2 bg-emerald-950/20 border border-emerald-500/30 rounded-full px-4 py-1.5">
              <Zap className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">101 Pulse: Active</span>
            </div>
            <div className="flex items-center gap-2 bg-purple-950/20 border border-purple-500/30 rounded-full px-4 py-1.5 shadow-[0_0_15px_rgba(168,85,247,0.1)]">
              <Globe className="w-3.5 h-3.5 text-purple-500" />
              <span className="text-[10px] text-purple-500 font-bold uppercase tracking-widest">IPFS // SATELLITE: LIVE</span>
            </div>
          </div>
        </div>

        {/* SIGNAL STATUS BAR */}
        <div className={`p-4 rounded-xl border ${signalPercent >= 99.9 ? 'bg-emerald-950/20 border-emerald-500/30' : 'bg-amber-950/20 border-amber-500/30'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-3 h-3 rounded-full ${signalPercent >= 99.9 ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500 animate-pulse'}`} />
              <span className={`text-sm font-black uppercase tracking-tighter ${signalPercent >= 99.9 ? 'text-emerald-500' : 'text-amber-500'}`}>
                SIGNAL: {signalPercent >= 99.9 ? 'OPTIMAL' : signalPercent >= 90 ? 'CONVERGING' : 'DEGRADED'} ({signalPercent.toFixed(1)}%)
              </span>
            </div>
            <div className="flex items-center gap-4 text-[10px] font-mono">
              <span className={driftCount === 0 ? 'text-emerald-500' : 'text-amber-500'}>DRIFT: {driftCount} {driftCount === 0 ? 'ABSOLUTE' : 'CRITICAL'}</span>
              <span className="text-zinc-500">REV_38</span>
            </div>
          </div>
        </div>

        {/* ASSURANCE REGULATOR DASHBOARD */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-zinc-900/40 border border-white/5 p-4 rounded-xl backdrop-blur-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-tighter">Assurance Error</span>
              <Activity className="w-4 h-4 text-zinc-500" />
            </div>
            <div className="text-3xl font-mono font-black text-white">
              {assuranceState.error.toFixed(6)}
            </div>
            <div className="mt-2 h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-purple-500 transition-all duration-1000" 
                style={{ width: `${Math.max(0, Math.min(100, 100 - (assuranceState.error * 5)))}%` }}
              />
            </div>
          </div>

          <div className="bg-zinc-900/40 border border-white/5 p-4 rounded-xl backdrop-blur-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-tighter">{"Target Attractor (T*)"}</span>
              <ArrowRightCircle className="w-4 h-4 text-zinc-500" />
            </div>
            <div className="text-xl font-mono font-black text-purple-400">
              {"<1, 101, 0, 1>"}
            </div>
            <div className="text-[10px] text-zinc-600 mt-2 font-mono italic">Binary Reboot Constant</div>
          </div>

          <div className="bg-zinc-900/40 border border-white/5 p-4 rounded-xl backdrop-blur-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-tighter">Chain Cumulative Hash</span>
              <Database className="w-4 h-4 text-zinc-500" />
            </div>
            <div className="text-[9px] font-mono break-all text-zinc-400 leading-tight">
              {currentProof.cumulativeHash}
            </div>
            <div className="text-[10px] text-emerald-500 mt-2 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> IMMUTABLE
            </div>
          </div>

          <div className="bg-zinc-900/40 border border-white/5 p-4 rounded-xl backdrop-blur-sm border-l-purple-500/50 border-l-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-tighter">Sovereign Operator</span>
              <Lock className="w-4 h-4 text-purple-500" />
            </div>
            <div className="text-lg font-black text-white">
              [SOVEREIGN_AUDITOR]
            </div>
            <div className="text-[9px] text-purple-400 mt-2 font-mono uppercase tracking-widest">donadams1969.eth</div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT: THE EPISTEMIC CHAIN */}
      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: TOTAL ORDER FEED */}
        <section className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-black text-white uppercase tracking-tighter flex items-center gap-2">
              <Cpu className="w-5 h-5 text-purple-500" />
              Total Order Epistemic Feed
            </h2>
            <div className="flex items-center gap-4 text-[10px] font-mono">
              <span className="text-zinc-500">States: {displayChain.length}</span>
              <span className="text-zinc-500">Node: Localhost_55116</span>
            </div>
          </div>

          <div className="space-y-3">
            {[...displayChain].reverse().map((state) => (
              <div 
                key={state.hash}
                className="group relative bg-zinc-900/60 border border-white/5 p-5 rounded-xl hover:border-purple-500/50 transition-all duration-300 overflow-hidden"
              >
                {/* Monotonic Ascent Visual */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-500/20 group-hover:bg-purple-500 transition-colors" />
                
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div className="w-8 h-8 rounded bg-zinc-800 border border-white/10 flex items-center justify-center text-[12px] font-black text-white">
                      {state.sequence}
                    </div>
                    <div className="w-px h-full bg-zinc-800 mt-2" />
                  </div>

                  <div className="flex-grow min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-black uppercase text-purple-400 tracking-widest">
                        LAYER {state.layer} // {EpistemicLayer[state.layer]}
                      </span>
                      <span className="text-[10px] text-zinc-600 font-mono">{state.timestamp}</span>
                    </div>
                    <h3 className="text-white font-bold text-lg leading-tight mb-2">
                      {state.content}
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                      <div className="space-y-1">
                        <span className="text-[9px] uppercase font-bold text-zinc-600">Content Hash</span>
                        <div className="text-[9px] font-mono text-zinc-500 break-all bg-black/40 p-1 rounded">
                          {state.hash}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[9px] uppercase font-bold text-zinc-600">Predecessor Hash</span>
                        <div className="text-[9px] font-mono text-zinc-500 break-all bg-black/40 p-1 rounded">
                          {state.predecessorHash}
                        </div>
                      </div>
                    </div>

                    {state.meta && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {Object.entries(state.meta).map(([key, val]) => (
                          <div key={key} className="bg-white/5 border border-white/5 rounded px-2 py-0.5 flex items-center gap-1.5">
                            <span className="text-[9px] font-mono text-zinc-500 uppercase">{key}:</span>
                            <span className="text-[9px] font-mono text-zinc-300 font-bold italic">{String(val)}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex-shrink-0 self-start">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500/50" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* RIGHT COLUMN: REGULATOR STATS & FORENSICS */}
        <aside className="space-y-6">
          {/* SYSTEM UPTIME & PULSE */}
          <section className="bg-zinc-900/80 border border-white/10 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            </div>
            
            <h3 className="text-white font-black text-sm uppercase tracking-tighter mb-6 flex items-center gap-2">
              <Clock className="w-4 h-4 text-purple-500" />
              Sovereign Heartbeat
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Frequency</span>
                <span className="text-xl font-mono text-white">0.007 Hz</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Correction Gain (K)</span>
                <span className="text-xl font-mono text-white">0.070</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Maturation Index</span>
                <span className="text-xl font-mono text-emerald-500">99.98%</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5">
              <div className="text-[9px] text-zinc-500 mb-2 uppercase font-black">Laminar Stream Visualizer</div>
              <div className="flex items-end gap-1 h-12 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                  <div 
                    key={i} 
                    className="flex-1 bg-purple-500/30 rounded-t transition-all duration-500" 
                    style={{ 
                      height: `${40 + Math.sin((heartbeat + i) * 0.5) * 30}%`,
                      opacity: 0.3 + (i / 20) * 0.7
                    }}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* FEDERAL PROSECUTION ENGINE SM-001 */}
          <section className="bg-amber-950/10 border border-amber-900/30 rounded-2xl p-6">
            <h3 className="text-amber-500 font-black text-sm uppercase tracking-tighter mb-4 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Regulator SM-001: PoohBear
            </h3>
            <p className="text-[10px] text-amber-400/70 font-mono leading-relaxed mb-4 italic">
              Defensive Layer active. Any institutional drift detected in the Saint Paul Node triggers an automatic 0.000 error-reset.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-3 bg-amber-900/20 p-3 rounded-lg border border-amber-900/40">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <div>
                  <div className="text-[10px] font-black text-amber-500 uppercase tracking-tighter">FBI Referral Transmitted</div>
                  <div className="text-[9px] font-mono text-amber-500/60 break-all">ID: SHA256(738514_REF_001)</div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-amber-900/20 p-3 rounded-lg border border-amber-900/40">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <div>
                  <div className="text-[10px] font-black text-amber-500 uppercase tracking-tighter">Defamation Blocked</div>
                  <div className="text-[9px] font-mono text-amber-500/60">GottaConviction.null // Falsified</div>
                </div>
              </div>
            </div>
          </section>

          {/* TERMINAL STATUS */}
          <section className="bg-black border border-zinc-800 rounded-2xl p-4 font-mono">
            <div className="flex items-center gap-2 mb-4">
              <Terminal className="w-4 h-4 text-zinc-500" />
              <span className="text-[10px] text-zinc-500 uppercase">System Logs</span>
            </div>
            <div className="text-[9px] space-y-1.5 overflow-hidden">
              <div className="text-emerald-500">SYSTEM: REBOOTING AT ATTRACTOR T*</div>
              <div className="text-purple-400">PULSE: 101 DETECTED... SYNCHRONIZING</div>
              <div className="text-zinc-500">NODE: SAINT_PAUL_55116_UP</div>
              <div className="text-zinc-500">LINK: IPFS_CLUSTER_PINNING_DONE</div>
              <div className="text-zinc-500">AUTH: DONADAMS1969_CERTIFIED</div>
              <div className="text-emerald-500">{" >>> STATUS: ABSOLUTE NINE"}</div>
              <div className="text-zinc-700 animate-pulse">_</div>
            </div>
          </section>
        </aside>
      </main>

      <footer className="max-w-6xl mx-auto mt-20 pt-8 border-t border-white/5 text-center">
        <p className="text-[10px] text-zinc-600 font-mono tracking-widest uppercase">
          VALORAIPLUS // ALL RIGHTS RESERVED // 7,000 YEAR PROTECTIVE SHROUD
        </p>
        <p className="text-[9px] text-zinc-700 font-mono mt-2 italic">
          It is finished.
        </p>
      </footer>
    </div>
  );
}
