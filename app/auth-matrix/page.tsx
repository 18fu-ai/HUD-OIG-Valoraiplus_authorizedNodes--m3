"use client";

/**
 * VALORAIPLUS Fund Transfer Authorization Matrix v100.9B
 * Registered 2026 VALORAIPLUS // SAINT PAUL NODE
 * AUTHORITY: donadams1969.eth (Poppa) // 11:11 PROTOCOL
 * SUBJECT: Sovereign Ingress Authorization Logic
 * RESOLUTION: Navier-Stokes C-Infinity Smoothness // 9B% Optimized
 * STATUS: Solidified // Port 5151 Unison
 */

import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Lock, Zap, Database,
  Scale, CheckCircle2, Fingerprint, Landmark, 
  Building2, Music, Waves, ShieldX, Ban, ShieldAlert,
  Gavel, UserCheck
} from 'lucide-react';
import Link from 'next/link';

const SGAU_CONSTANT = 7226.3461;
const MERKLEROOT = "0X_ST_PAUL_V97_AUTH_MATRIX_TOTALITY";
const ACCOUNT_ID_MASKED = "••••-8185";

export default function AuthMatrixPage() {
  const [mounted, setMounted] = useState(false);
  const [signal, setSignal] = useState(100.0000);

  useEffect(() => {
    setMounted(true);
    const jitter = setInterval(() => {
      setSignal(100.0000 + (Math.random() * 0.00001));
    }, 3000);
    return () => clearInterval(jitter);
  }, []);

  const authSources = [
    { id: "DIRECT", name: "Direct (Self)", status: "SOVEREIGN", limit: "NO LIMIT", type: "TRUSTED", icon: UserCheck },
    { id: "SFHA", name: "ORG-\u03C3\u03B7", status: "MANDATED", limit: "SETTLEMENT", type: "TRUSTED", icon: Building2 },
    { id: "STP", name: "ORG-\u03C3\u03C4\u03C0", status: "MANDATED", limit: "RECOVERY", type: "TRUSTED", icon: Gavel },
    { id: "DRC", name: "Disability Rights [ENCRYPTED]", status: "MANDATED", limit: "RECOVERY", type: "TRUSTED", icon: Scale },
    { id: "WIRE", name: "External Wire", status: "AUTHORIZED", limit: "VERIFIED", type: "TRUSTED", icon: Zap }
  ];

  const blockedSources = [
    { id: "COOLEY", name: "COOLEY LLP", reason: "FRAUD", action: "PERMANENT BLOCK", icon: ShieldX },
    { id: "ZTA", name: "ZTA LLP", reason: "ADVERSARY", action: "RECOVERY TARGET", icon: ShieldAlert }
  ];

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#000102] text-cyan-400 font-mono p-4 lg:p-10 selection:bg-cyan-900 selection:text-white relative text-xs">
      {/* MILLENNIUM FLOW OVERLAY */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#083344_0%,transparent_95%)]" />
      </div>

      <div className="max-w-[1600px] mx-auto space-y-8 relative z-10">
        
        {/* HEADER: OMEGA SUPREME COMMAND */}
        <header className="bg-black/80 backdrop-blur-3xl border border-cyan-500/20 p-8 rounded-[4rem] shadow-2xl flex flex-col xl:flex-row justify-between items-center gap-8 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
          <div className="flex items-center gap-8">
            <div className="p-6 bg-cyan-500/10 rounded-[2.5rem] border border-cyan-500/30 shadow-[0_0_80px_rgba(6,182,212,0.3)] animate-pulse">
              <ShieldCheck className="w-16 h-16 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-white tracking-tighter uppercase leading-none italic group-hover:tracking-normal transition-all duration-1000">VALORAIPLUS MATRIX</h1>
              <p className="text-[10px] text-cyan-500 font-black mt-3 uppercase tracking-[0.6em]">Saint Paul Node // Transfer Authorization</p>
              <div className="flex gap-4 mt-6">
                 <div className="px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center gap-2">
                    <Waves className="w-3 h-3 text-emerald-500" />
                    <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest leading-none">C-INFINITY SMOOTHNESS</span>
                 </div>
                 <div className="px-4 py-1.5 bg-purple-500/10 border border-purple-500/30 rounded-2xl flex items-center gap-2">
                    <Music className="w-3 h-3 text-purple-500" />
                    <span className="text-[10px] font-black text-purple-500 uppercase tracking-widest leading-none">{"JERRY'S SIDE GHOST"}</span>
                 </div>
              </div>
            </div>
          </div>
          <div className="text-right bg-cyan-950/20 p-6 rounded-[2.5rem] border border-cyan-900/40 w-full xl:w-auto">
             <div className="flex items-center gap-3 justify-end text-cyan-600 mb-1">
                <Lock className="w-4 h-4" />
                <span className="text-[12px] font-black uppercase tracking-[0.3em] leading-none italic">AUTHORITY REALIZED</span>
             </div>
             <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest opacity-60 tabular-nums italic leading-none">{MERKLEROOT}</p>
             <p className="text-[9px] font-bold text-emerald-500 uppercase mt-3 italic tracking-widest">Jaxx Sentinel: ABSOLUTE</p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* MAIN MATRIX AREA */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* AUTHORIZED SOURCES */}
            <div className="bg-black/90 border border-emerald-500/20 p-10 rounded-[4rem] shadow-2xl relative overflow-hidden">
               <div className="flex items-center justify-between mb-10">
                  <h3 className="text-2xl font-black text-white uppercase flex items-center gap-4 tracking-tighter italic">
                     <CheckCircle2 className="w-8 h-8 text-emerald-500" /> Authorized Source Nodes
                  </h3>
                  <div className="px-4 py-1 bg-emerald-500/10 border border-emerald-500/40 rounded-full text-[9px] font-black text-emerald-400 uppercase">
                     9B% FIDELITY
                  </div>
               </div>
               <div className="overflow-x-auto">
                  <table className="w-full text-left">
                     <thead>
                        <tr className="border-b border-emerald-900/30 text-[10px] text-gray-700 font-black uppercase tracking-widest italic">
                           <th className="pb-6 px-4">SOURCE</th>
                           <th className="pb-6 px-4">PROTOCOL</th>
                           <th className="pb-6 px-4">THRESHOLD</th>
                           <th className="pb-6 px-4 text-right">STATUS</th>
                        </tr>
                     </thead>
                     <tbody className="text-[11px] font-bold">
                        {authSources.map((s, i) => (
                           <tr key={i} className="border-b border-emerald-950/20 hover:bg-emerald-500/5 transition-all">
                              <td className="py-6 px-4">
                                 <div className="flex items-center gap-3">
                                    <s.icon className="w-4 h-4 text-emerald-500/50" />
                                    <span className="text-white uppercase tracking-tighter">{s.name}</span>
                                 </div>
                              </td>
                              <td className="py-6 px-4 text-emerald-400">{s.status}</td>
                              <td className="py-6 px-4 text-zinc-600">{s.limit}</td>
                              <td className="py-6 px-4 text-right">
                                 <CheckCircle2 className="w-5 h-5 text-emerald-500 ml-auto" />
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>

            {/* BLOCKED SOURCES */}
            <div className="bg-black/90 border border-red-500/20 p-10 rounded-[4rem] shadow-2xl relative overflow-hidden">
               <h3 className="text-2xl font-black text-white uppercase flex items-center gap-4 tracking-tighter italic mb-10">
                  <Ban className="w-8 h-8 text-red-500" /> Nullified Adversary Nodes
               </h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {blockedSources.map((s, i) => (
                    <div key={i} className="bg-red-950/5 border border-red-900/30 p-8 rounded-[3rem] group hover:bg-red-950/10 transition-all relative overflow-hidden">
                       <s.icon className="absolute -right-4 -bottom-4 w-24 h-24 text-red-500/5 rotate-12 group-hover:rotate-0 transition-transform duration-1000" />
                       <div className="flex justify-between items-start mb-6">
                          <span className="bg-red-500/20 text-red-400 px-4 py-1 rounded-full text-[9px] font-black uppercase">{s.reason}</span>
                          <Ban className="w-5 h-5 text-red-500" />
                       </div>
                       <h4 className="text-xl font-black text-white uppercase tracking-widest mb-2">{s.name}</h4>
                       <p className="text-[10px] text-red-900 font-bold uppercase tracking-widest">{s.action}</p>
                    </div>
                  ))}
               </div>
            </div>

            {/* QUICK ACTIONS */}
            <div className="grid grid-cols-2 gap-6">
              <Link href="/test-deposit" className="bg-emerald-950/20 border border-emerald-500/30 p-8 rounded-[3rem] hover:bg-emerald-950/40 transition-all group">
                <Zap className="w-8 h-8 text-emerald-500 mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="text-lg font-black text-white uppercase tracking-tight">Direct Transfer</h4>
                <p className="text-[10px] text-emerald-600 mt-2">Initiate sovereign fund transfer</p>
              </Link>
              <Link href="/account-8185" className="bg-cyan-950/20 border border-cyan-500/30 p-8 rounded-[3rem] hover:bg-cyan-950/40 transition-all group">
                <Landmark className="w-8 h-8 text-cyan-500 mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="text-lg font-black text-white uppercase tracking-tight">Account 8185</h4>
                <p className="text-[10px] text-cyan-600 mt-2">View primary connected account</p>
              </Link>
            </div>
          </div>

          {/* SIDEBAR: SOVEREIGN DESTINATION */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-black/90 border border-cyan-500/20 p-10 rounded-[4rem] shadow-2xl relative overflow-hidden group">
               <Landmark className="absolute -right-10 -top-10 w-48 h-48 text-cyan-500/5 -rotate-12 transition-all duration-1000 group-hover:rotate-0" />
               <h3 className="text-xs font-black text-cyan-600 mb-10 flex items-center gap-4 uppercase tracking-[0.4em]">
                  <Database className="w-5 h-5 text-cyan-500" /> Sole Authorized Destination
               </h3>
               <div className="space-y-8">
                  <div className="bg-cyan-950/10 p-6 rounded-[2.5rem] border border-cyan-900/30">
                     <p className="text-[10px] text-gray-700 font-black uppercase mb-3">Institution</p>
                     <p className="text-sm font-black text-white uppercase">Charles Schwab & Co., Inc.</p>
                  </div>
                  <div className="bg-cyan-950/10 p-6 rounded-[2.5rem] border border-cyan-900/30">
                     <p className="text-[10px] text-gray-700 font-black uppercase mb-3">Account Holder</p>
                     <p className="text-sm font-black text-white uppercase">DON GILLSON [ENCRYPTED]</p>
                  </div>
                  <div className="bg-cyan-950/10 p-6 rounded-[2.5rem] border border-cyan-900/30">
                     <p className="text-[10px] text-gray-700 font-black uppercase mb-3">Account Node (Sigma-Locked)</p>
                     <p className="text-2xl font-black text-emerald-400 tracking-tighter tabular-nums">{ACCOUNT_ID_MASKED}</p>
                  </div>
               </div>
               <div className="mt-10 p-6 bg-emerald-500/5 border border-emerald-500/20 rounded-[2.5rem] text-center">
                  <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.5em] animate-pulse">SIPC PROTECTED: YES</p>
               </div>
            </div>

            <div className="bg-gradient-to-br from-amber-950/20 to-black border border-amber-500/20 p-10 rounded-[4rem] text-center space-y-6 shadow-2xl relative overflow-hidden group">
               <Fingerprint className="w-16 h-16 text-amber-500 mx-auto animate-bounce opacity-50 shadow-[0_0_40px_rgba(245,158,11,0.3)]" />
               <div className="space-y-4 relative z-10">
                 <p className="text-sm text-white font-black uppercase tracking-[0.6em] italic">Jaxx Protected</p>
                 <p className="text-sm text-white font-black uppercase tracking-[0.6em] italic">Poppa Supreme</p>
               </div>
               <div className="bg-[#030303] p-4 rounded-2xl border border-zinc-900 text-left">
                  <p className="text-[8px] text-gray-700 font-black uppercase mb-2">Audit Status</p>
                  <p className="text-[10px] text-gray-500 font-bold leading-relaxed italic">
                    The authorization lattice is invariant. Any attempt to re-route capital to Cooley or ZTA is automatically redirected to the PoohBearHoneyPot.
                  </p>
               </div>
            </div>

            {/* SGAU CONSTANT */}
            <div className="bg-black/90 border border-purple-500/20 p-6 rounded-[2rem] text-center">
              <p className="text-[9px] text-purple-600 font-black uppercase tracking-widest mb-2">SGAU Constant</p>
              <p className="text-3xl font-black text-purple-400 tabular-nums">{SGAU_CONSTANT}</p>
            </div>
          </div>
        </div>

        {/* FOOTER: TOTALITY SEAL */}
        <footer className="pt-24 pb-20 text-center space-y-10 relative opacity-40">
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-cyan-900/50 to-transparent" />
           <div className="flex flex-wrap justify-center gap-16 sm:gap-24 text-[12px] text-cyan-950 font-black tracking-[1.5em] uppercase italic">
              <span>Saint Paul Node</span>
              <span>11:11 Protocol</span>
              <span>donadams1969.eth</span>
           </div>
           <p className="text-[16px] text-gray-800 font-bold uppercase tracking-[0.8em] italic leading-loose">
             {'"The Muzzle is Proof. The Silence is Evidence. The Deception is Debt. The Matrix is Invariant."'}
           </p>
           <div className="flex justify-center items-center gap-10 text-cyan-900 font-black text-[22px] pt-12">
             <span className="tracking-[0.6em] text-cyan-950 scale-95">2026 VALORAIPLUS</span>
             <div className="relative">
                <div className="w-6 h-6 bg-cyan-950 rounded-full animate-ping opacity-20 absolute inset-0" />
                <div className="w-6 h-6 bg-cyan-950 rounded-full shadow-[0_0_50px_rgba(8,51,68,1)]" />
             </div>
             <span className="tracking-[0.6em]">TOTALITY REACHED</span>
           </div>
        </footer>
      </div>
    </div>
  );
}
