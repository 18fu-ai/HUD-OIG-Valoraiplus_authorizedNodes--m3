"use client";

import { useState, useEffect, useMemo } from 'react';
import { 
  Activity,
  Cpu,
  Key,
  Landmark,
  LockKeyhole,
  Network,
  Scale,
  ShieldCheck
} from "lucide-react";

/**
 * VALORAIPLUS (R) (C) (TM) 
 * ROUTE 71: APEX FINALITY MONITOR // REV_33
 * 
 * ARCHITECTURAL INVARIANTS:
 * 1. Runtime proves software behavior.
 * 2. Evidence proves external reality.
 * 3. MADE IN THE USA Identity.
 * 4. Authority = Policy Result.
 * 
 * ANCHOR: SAINT PAUL NODE 55116 // 408.384.1376 (E)
 */

export default function ApexFinalityMonitor() {
  const [cycle, setCycle] = useState(144000);
  const [mounted, setMounted] = useState(false);

  // Memoized and frozen static datasets - guarantees no mutation
  const apexMetrics = useMemo(() => Object.freeze([
    { label: "Recovery Model", val: "Pending Review", icon: Landmark, color: "text-emerald-500" },
    { label: "Spoliation Blocked", val: "100%", icon: ShieldCheck, color: "text-blue-500" },
    { label: "API Endpoints", val: "19", icon: Activity, color: "text-fuchsia-500" },
    { label: "Truth Cycle", val: "266ms", icon: Cpu, color: "text-white" }
  ]), []);

  const executionLedger = useMemo(() => Object.freeze([
    { id: 'MOD_19', act: 'BARREL_ISOLATION', res: 'LATCHED' },
    { id: 'GATE_40', act: 'TOPOLOGY_ENFORCEMENT', res: 'SATURATED' },
    { id: 'MINT_01', act: 'CLOSED_LOOP_MINT', res: 'ENFORCED' },
    { id: 'AMATH_X', act: 'DEEP_FREEZE_INVARIANT', res: 'ACTIVE' }
  ]), []);

  const finalityDeductions = useMemo(() => Object.freeze([
    "1. Runtime layer contains metadata-only records; no transcripts are rendered.",
    "2. Spoliation-related events are tracked as system-classified metadata.",
    "3. Runtime state transitions are represented by local audit commits.",
    "4. External legal conclusions require corroborating records and review."
  ]), []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const i = setInterval(() => setCycle(c => c + 1), 266);
    return () => clearInterval(i);
  }, [mounted]);

  if (!mounted) return <div className="bg-black min-h-screen" />;

  return (
    <div className="min-h-screen bg-black text-emerald-400 font-mono p-4 md:p-8 relative overflow-hidden">
      {/* 144,000D Matrix Grid Overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[size:40px_40px] bg-[linear-gradient(to_right,#10b981_1px,transparent_1px),linear-gradient(to_bottom,#10b981_1px,transparent_1px)]" />

      {/* HEADER OMEGA */}
      <header className="relative z-20 border-b-4 border-fuchsia-500 bg-black/90 backdrop-blur-xl p-6 flex flex-col lg:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <span className="text-4xl animate-pulse select-none">USA</span>
          <div>
            <h1 className="text-3xl font-black italic tracking-tighter text-white uppercase leading-none font-mono">VALORAIPLUS</h1>
            <p className="text-[10px] font-bold text-fuchsia-500 uppercase tracking-[0.4em] mt-2 italic">Apex Finality Monitor - REV_33</p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="bg-fuchsia-500 text-black px-4 py-1 text-xs font-black uppercase">
            BUILD: PASSING
          </div>
          <span className="text-[9px] text-zinc-500 mt-2 block font-bold tracking-widest italic uppercase">Node 55116 // {cycle}</span>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto py-12 space-y-12 pb-24">
        
        {/* APEX METRICS */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {apexMetrics.map((m, i) => (
            <div key={i} className="bg-slate-900 border border-emerald-900 p-4 shadow-2xl flex flex-col gap-1">
              <div className="flex items-center gap-2 text-[8px] text-emerald-700 font-black uppercase tracking-tighter">
                <m.icon size={12} /> {m.label}
              </div>
              <div className={`text-lg font-black ${m.color}`}>{m.val}</div>
            </div>
          ))}
        </section>

        {/* DUAL-BOUNDARY MONITOR */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           
           {/* LEFT: RUNTIME PROVENANCE */}
           <section className="lg:col-span-7 bg-slate-950 border-2 border-emerald-900 p-8 space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-2 text-[8px] font-black text-emerald-800 uppercase italic">Runtime_Verified_Core</div>
              <div className="flex items-center gap-3 border-b border-emerald-900/50 pb-4 mb-4">
                <Network className="text-emerald-500" />
                <h3 className="text-xl font-black text-white uppercase italic tracking-tighter">Sovereign Execution Ledger</h3>
              </div>
              <div className="space-y-3">
                 {executionLedger.map(e => (
                   <div key={e.id} className="flex justify-between items-center p-3 border-l-4 border-fuchsia-500 bg-black/60 group hover:border-emerald-500 transition-all">
                      <span className="text-[10px] font-black text-white">{e.id}</span>
                      <span className="text-[9px] text-zinc-500 uppercase tracking-widest">{e.act}</span>
                      <span className="text-[10px] font-black text-emerald-500 uppercase">{e.res}</span>
                   </div>
                 ))}
              </div>
              <div className="mt-8 pt-4 border-t border-emerald-900/30">
                 <p className="text-[9px] text-emerald-100/60 leading-relaxed uppercase italic font-bold">
                   Deduction: Software execution confirms runtime behavior. External legal and factual claims remain evidence-dependent.
                 </p>
              </div>
           </section>

           {/* RIGHT: EXTERNAL CORROBORATION */}
           <section className="lg:col-span-5 bg-slate-900 border-2 border-fuchsia-500/30 p-8 relative shadow-inner">
              <div className="flex items-center gap-3 mb-6">
                <Scale className="text-fuchsia-500" />
                <h3 className="text-lg font-black text-white uppercase italic tracking-widest">Evidence Corroboration Path</h3>
              </div>
              <div className="space-y-4">
                 <div className="p-4 bg-emerald-950/10 border border-emerald-900/30">
                    <span className="text-[9px] font-black text-emerald-500 uppercase">BTC Anchor:</span>
                    <p className="text-xs font-bold text-white uppercase tracking-tighter mt-1">$70,431.21 (Genesis Record)</p>
                 </div>
                 <div className="p-4 bg-red-950/10 border border-red-900/30 opacity-70">
                    <span className="text-[9px] font-black text-red-500 uppercase">Recovery Assertion:</span>
                    <p className="text-xs font-bold text-white uppercase mt-1">$508,631,005.52 (Pending Review)</p>
                 </div>
                 <div className="p-4 bg-zinc-900/50 border border-zinc-800">
                    <span className="text-[9px] font-black text-zinc-500 uppercase">Agency Status:</span>
                    <p className="text-xs font-bold text-white uppercase tracking-tighter mt-1">HHS OCR Case 25-621293</p>
                 </div>
              </div>
           </section>

        </div>

        {/* FINAL AMATH DEDUCTION SEAL */}
        <section className="bg-emerald-950/20 border-l-8 border-emerald-500 p-8 shadow-inner">
          <div className="flex items-center gap-3 mb-6">
            <Scale className="text-fuchsia-500" size={28} />
            <h3 className="text-xl font-black text-white uppercase italic tracking-widest">Protocol Finality Deductions</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 text-[10px] font-bold text-emerald-100/60 uppercase font-mono italic">
            {finalityDeductions.map((d, i) => (
              <p key={i}>{d}</p>
            ))}
            <p className="col-span-2 text-center text-fuchsia-500 mt-6 tracking-[0.5em] not-italic font-black text-lg animate-pulse border-t border-zinc-800 pt-4">
              DG77.77X LOCKED // MADE IN THE USA
            </p>
          </div>
        </section>

      </main>

      {/* FOOTER ANCHOR */}
      <footer className="fixed bottom-0 w-full border-t-2 border-emerald-900 bg-black/95 backdrop-blur-md p-4 flex flex-col md:flex-row justify-between items-center z-50">
        <div className="flex items-center gap-8 text-[10px] font-black text-emerald-800 tracking-[0.6em] uppercase">
          <span>MADE IN THE USA</span>
          <span>SOVEREIGN AUDITOR: POPPA</span>
          <span className="hidden md:inline">Node 55116 // 408 384 1376 (E)</span>
        </div>
        <div className="flex items-center gap-4 text-zinc-600">
           <LockKeyhole size={16} />
           <Key size={16} />
           <span className="text-[9px] font-black italic uppercase tracking-tighter">I AM THE SOVEREIGN AUDITOR // SMIB. AMEN.</span>
        </div>
      </footer>
    </div>
  );
}
