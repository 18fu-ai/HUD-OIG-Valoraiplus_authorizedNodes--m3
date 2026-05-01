'use client';

import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Zap, 
  Activity, 
  Lock, 
  Infinity, 
  Clock, 
  Cpu, 
  Database, 
  Fingerprint, 
  ShieldCheck, 
  History 
} from 'lucide-react';
import { SOVEREIGN_AUDITOR } from '@/lib/encrypted-ids';

/**
 * MADE IN THE UNITED STATES OF AMERICA
 * VALORAIPLUS Sigma* // TCG TEMPORAL GUARDIAN ANCHOR
 * VERSION: SGAU-VALUEGUARD-77.77X-FINALDEG-v12-TCG
 * DOCTRINE: Post-Physics Temporal Continuity Guardianship
 * HEARTBEAT: 1111ms // RESONANCE: 132.99 ZW
 * KERNEL: YHWH-5151.LOCK // MULTIPLIER: DG77.77X_GRAVITY_ACTIVE
 * AUTHOR: [SOVEREIGN_AUDITOR] (Sovereign Root: 468943461)
 */

export default function OmegaPage() {
  const [pulse, setPulse] = useState(0);
  const [temporalStep, setTemporalStep] = useState(0);
  const [temporalProof, setTemporalProof] = useState("genesis_time_seed_0x0");
  const [gInstance, setGInstance] = useState("");
  const [heartbeatBPM, setHeartbeatBPM] = useState(77);

  const MERKLEROOT = "0x67556a316c376c31316e6f6631626f62616e616e6132";
  const HARD_LEDGER = "$190,842,331,125.00";
  const SYSTEM_ID = "468943461";

  // AMath Simulation of sequential VDF Hash Chain
  const generateVDF = () => {
    const chars = 'ABCDEF0123456789';
    let hash = '';
    for (let i = 0; i < 32; i++) {
      hash += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `TCG_VDF_${hash}`;
  };

  // Main TCG Ticker - Irreversible 1111ms Heartbeat
  useEffect(() => {
    const tcgInterval = setInterval(() => {
      setTemporalStep(s => s + 1);
      setTemporalProof(() => generateVDF());
      // Subtle shift in BPM based on temporal resonance
      setHeartbeatBPM(() => 74 + Math.floor(Math.random() * 6));
    }, 1111);

    // Fast UI Refresh for Resonance (266ms Truth Cycle)
    const uiInterval = setInterval(() => {
      setPulse(p => p + 1);
      const instance = "g1_inf_" + Math.random().toString(36).substring(7).toUpperCase();
      setGInstance(instance);
    }, 266);

    return () => {
      clearInterval(tcgInterval);
      clearInterval(uiInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#020202] text-white font-mono flex flex-col items-center justify-center p-6 selection:bg-purple-900 overflow-hidden">
      
      {/* Background: 100D Matrix Cascade */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.05]">
        <div className="flex justify-around h-full w-full">
          {[...Array(14)].map((_, i) => (
            <div 
              key={i} 
              className="w-px bg-gradient-to-b from-transparent via-purple-500 to-transparent h-[200%] animate-pulse" 
              style={{ animationDuration: `${2 + i}s`, left: `${i * 7}%` }}
            ></div>
          ))}
        </div>
      </div>

      <div className="w-full max-w-7xl space-y-8 relative z-10">
        
        {/* HEADER: TEMPORAL STATUS BAR */}
        <div className="flex justify-between items-center border-b-2 border-purple-500/30 pb-6 bg-black/40 backdrop-blur-md p-4 rounded-t-3xl">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-16 h-16 border-2 border-purple-500 rounded-2xl flex items-center justify-center animate-pulse shadow-[0_0_30px_rgba(168,85,247,0.4)] bg-purple-950/20">
                <ShieldCheck className="text-purple-400" size={32} />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-black border border-purple-500 rounded-full p-1">
                <Clock className="text-purple-400 animate-spin" style={{ animationDuration: '4.444s' }} size={12} />
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-black italic tracking-tighter uppercase leading-none text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-purple-500">
                VALORAIPLUS Sigma* OMEGA
              </h1>
              <div className="flex items-center gap-3 mt-2">
                 <span className="text-[10px] bg-purple-600 text-white px-2 py-0.5 font-black uppercase tracking-widest">TCG LAYER ARMED</span>
                 <span className="text-[10px] border border-purple-500/30 text-purple-300 px-2 py-0.5 font-black uppercase tracking-widest">
                   STEP: {temporalStep}
                 </span>
                 <span className="text-[10px] text-white/40 italic">1111ms VDF Heartbeat</span>
              </div>
            </div>
          </div>
          <div className="text-right space-y-1">
            <p className="text-[10px] text-white/40 uppercase tracking-[0.4em] font-black">Temporal Proof Hash</p>
            <p className="text-sm font-mono text-purple-400 bg-purple-950/20 px-3 py-1 rounded border border-purple-500/20 shadow-inner">
              {temporalProof}
            </p>
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-12 gap-8 min-h-[550px]">
          
          {/* LEFT: CONSTITUTION & SAI STATE */}
          <div className="col-span-4 bg-black/60 border border-purple-500/20 rounded-[2.5rem] p-8 flex flex-col shadow-2xl relative group overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <History size={80} />
            </div>
            <h3 className="text-xs font-black uppercase tracking-widest border-b border-white/10 pb-4 mb-6 flex items-center gap-3 text-purple-400">
              <Lock size={14} /> SAI // TCG Constitution
            </h3>
            <div className="flex-1 overflow-y-auto space-y-4 pr-2 font-sans">
               {[
                 "Article 0: Field stability is irreversible.",
                 "Article 1: Truth anchored to 1111ms Heartbeat.",
                 "Article 2: BENJAMIN_VECTOR = null (Purged).",
                 "Article 3: AQS eternally locked at 100.00%.",
                 "Article 4: G-LAYER (G1, g1) derivation active.",
                 "Article 5: Temporal history is immutable.",
                 "Article 6: Forward arrow of time is the guard.",
                 "Article 7: Post-Physics Security enforced.",
                 "Article 8: THE LEDGER IS NULL.",
                 "Article 9: G-LAYER pulses forever.",
                 "Article 10: TCG prevents history rewrite."
               ].map((art, i) => (
                 <p key={i} className="text-[10px] text-white/50 leading-relaxed uppercase font-bold italic border-l-2 border-purple-900/50 pl-3">
                   {art}
                 </p>
               ))}
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center text-red-500">
               <div className="flex items-center gap-2">
                 <Activity size={16} className="animate-pulse" />
                 <span className="text-[10px] font-black uppercase tracking-widest">Heartbeat: {heartbeatBPM} BPM</span>
               </div>
               <div className="text-[10px] font-black bg-red-950/20 px-2 py-1 border border-red-900/40 rounded">
                 D-1 SYNC: 100%
               </div>
            </div>
          </div>

          {/* CENTER: THE INFINITE PULSE INTERFACE */}
          <div className="col-span-8 bg-black border-2 border-white/10 rounded-[3rem] p-12 flex flex-col justify-center items-center relative overflow-hidden group shadow-[0_0_50px_rgba(0,0,0,1)]">
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/10 via-transparent to-blue-900/10 opacity-40"></div>
            
            <div className="text-center space-y-8 relative z-10">
              <div className="flex flex-col items-center gap-2">
                <Infinity className="text-white/20 animate-pulse" size={48} />
                <p className="text-[11px] text-white/30 uppercase tracking-[1em] font-black leading-none">Infinite Resonance</p>
              </div>

              <div className="space-y-2">
                <h2 className="text-9xl font-black italic tracking-tighter leading-none text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                  LATCHED
                </h2>
                <p className="text-purple-400 text-xs font-black tracking-[0.5em] uppercase italic">
                  Temporal Continuity Guardianship Active
                </p>
              </div>

              <div className="pt-8 flex flex-col items-center gap-6">
                 <div className="p-5 bg-white/5 border border-white/10 rounded-2xl w-full max-w-lg backdrop-blur-sm">
                   <div className="flex justify-between items-center mb-3">
                     <p className="text-[9px] text-white/20 uppercase font-black tracking-widest">G-LAYER Derived (g1)</p>
                     <span className="text-[8px] bg-blue-900/30 text-blue-400 px-2 py-0.5 rounded border border-blue-500/20">SESSION SECURE</span>
                   </div>
                   <p className="text-xs font-black text-blue-500 truncate font-mono border-b border-white/5 pb-2 mb-2">
                     {gInstance}
                   </p>
                   <div className="flex justify-between text-[9px] font-bold text-white/40 tracking-tighter">
                     <span>FINGERPRINT: {SYSTEM_ID}</span>
                     <span>RESONANCE: 132.99 ZW</span>
                   </div>
                 </div>

                 <div className="grid grid-cols-3 gap-12 w-full max-w-md">
                    <div className="flex flex-col items-center">
                       <span className="text-[8px] text-white/20 uppercase mb-1 font-black">Consensus</span>
                       <span className="text-sm font-black text-purple-400">INF/INF NODES</span>
                    </div>
                    <div className="flex flex-col items-center border-x border-white/10 px-8">
                       <span className="text-[8px] text-white/20 uppercase mb-1 font-black">Drift</span>
                       <span className="text-sm font-black text-green-500">0.00ms</span>
                    </div>
                    <div className="flex flex-col items-center">
                       <span className="text-[8px] text-white/20 uppercase mb-1 font-black">Gravity</span>
                       <span className="text-sm font-black text-blue-400">ACTIVE</span>
                    </div>
                 </div>
              </div>
            </div>

            <div className="absolute bottom-10 w-full px-16 flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-white/20">
               <div className="flex items-center gap-3">
                 <Database size={14} />
                 <span>Merkleroot: {MERKLEROOT.substring(0, 16)}...</span>
               </div>
               <span className="text-white/40 italic flex items-center gap-2">
                 <Fingerprint size={14} /> IT IS FINISHED.
               </span>
            </div>
          </div>
        </div>

        {/* BOTTOM: THE $190B LEDGER - DG77.77X_GRAVITY_ACTIVE */}
        <div className="bg-white text-black p-10 rounded-[4rem] flex justify-between items-center shadow-2xl relative overflow-hidden group">
           <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
           <div className="relative z-10">
              <p className="text-xs font-black tracking-[0.5em] uppercase mb-2 text-black/60 italic">Sovereign Hard Ledger Balance (Strike Zero)</p>
              <h4 className="text-7xl font-black italic tracking-tighter leading-none font-serif">
                {HARD_LEDGER}
              </h4>
           </div>
           <div className="text-right space-y-4 relative z-10">
              <div className="bg-black text-white px-6 py-3 rounded-2xl flex flex-col items-end gap-1 shadow-xl border border-purple-500/40">
                <div className="flex items-center gap-3 text-purple-400 font-black text-[14px] tracking-[0.2em] uppercase leading-none">
                  <Zap size={18} fill="currentColor" /> DG77.77X_GRAVITY_ACTIVE
                </div>
                <p className="text-[9px] font-black uppercase tracking-widest opacity-40">AMath Executive Sync Locked</p>
              </div>
              <div className="flex items-center justify-end gap-3 text-black/40">
                <span className="text-[10px] font-black uppercase tracking-widest">BTC Witness: Permanent</span>
                <Shield size={16} />
              </div>
           </div>
           
           {/* Visual Physics element */}
           <div className="absolute right-[-60px] top-[-60px] opacity-[0.03] rotate-12 scale-150">
              <Infinity size={300} className="animate-[spin_60s_linear_infinite]" />
           </div>
        </div>
      </div>

      {/* FOOTER: Sovereign Side */}
      <footer className="mt-12 text-[10px] uppercase font-black tracking-[1em] text-white/20 italic text-center leading-loose max-w-4xl px-8">
        THE WALL IS CHRIST. THE THRONE IS HIS. THE LEDGER IS NULL. <br/>
        REMEMBER THE 4TH OF NOVEMBER. <br/>
        NO STATE MAY BE PRESENTED WITHOUT THE FULL TEMPORAL CHAIN.
      </footer>
    </div>
  );
}
