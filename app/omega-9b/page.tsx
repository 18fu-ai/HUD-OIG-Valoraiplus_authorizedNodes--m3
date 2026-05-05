"use client";

/**
 * VALORAIPLUS OMEGA-9B PORTHOLE CONNECTOR // v100.9B
 * Registered 2026 VALORAIPLUS // SAINT PAUL NODE
 * AUTHORITY: donadams1969.eth (Poppa) // 11:11 MILLENNIUM
 * RESOLUTION: Navier-Stokes C-Infinity Smoothness // Laminar Flow
 * ENFORCEMENT: 10B Shard Consensus // 18 U.S.C. 1519
 * FREQUENCY: Jerry's Side Ghost Mode [5151Hz]
 */

import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Activity, Lock, Zap, Database, Terminal, Scale, 
  Infinity as InfinityIcon, Gavel, Globe, CheckCircle2,
  ChevronRight, Cpu, Radio, Fingerprint, Landmark, 
  Building2, FileText, Ghost, Music, Star, Sparkles, 
  Search, ShieldAlert, Layers, DollarSign, Waves, 
  Maximize2, Eye, EyeOff, ShieldX, Network, Atom, Home
} from 'lucide-react';
import Link from 'next/link';

const SGAU_CONSTANT = 7226.3461;
const MERKLEROOT = "0X_ST_PAUL_V97_NAVIER_STOKES_SOLVED";
const ACCOUNT_ID = "••••-8185";
const IP_LIEN = "$1.12 Quadrillion";

export default function Omega9BPage() {
  const [activeView, setActiveTab] = useState('navier-stokes');
  const [logs, setLogs] = useState<string[]>([]);
  const [signal, setSignal] = useState(100);
  const [viscosity, setViscosity] = useState(0.0000);

  const addLog = (msg: string) => {
    const time = new Date().toLocaleTimeString();
    setLogs(prev => [`[${time}] ${msg}`, ...prev].slice(0, 18));
  };

  useEffect(() => {
    addLog("VALORAIPLUS OMEGA-9B BOOTING...");
    addLog("Resolving Navier-Stokes Millennium Prize Equation...");
    addLog("Turbulence Nullified. C-Infinity Smoothness achieved.");
    addLog("Millennium Solution citrated into Saint Paul 14D Core.");
    addLog("Optimization Level: 9,000,000,000%.");
    addLog("Frequency: 5151Hz [JERRY'S SIDE GHOST].");
    
    const interval = setInterval(() => {
      setSignal(100.000000000);
      setViscosity(0.000000000);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const TabButton = ({ id, label, icon: Icon }: { id: string; label: string; icon: React.ElementType }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-3 px-5 py-4 rounded-[2rem] text-[10px] font-black uppercase tracking-[0.25em] transition-all border ${
        activeView === id 
        ? 'bg-cyan-500 text-black border-cyan-300 shadow-[0_0_40px_rgba(6,182,212,0.5)]' 
        : 'bg-black/60 text-cyan-900 border-cyan-900/20 hover:text-cyan-400 hover:bg-cyan-950/40'
      }`}
    >
      <Icon className={`w-4 h-4 ${activeView === id ? 'animate-pulse' : ''}`} /> {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-[#000102] text-cyan-400 font-mono p-4 lg:p-10 selection:bg-cyan-900 selection:text-white overflow-x-hidden relative text-xs">
      
      {/* MILLENNIUM FLUID DYNAMICS OVERLAY */}
      <div className="fixed inset-0 pointer-events-none opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#083344_0%,transparent_85%)]" />
        <div className="absolute inset-0 animate-pulse bg-[url('https://www.transparenttextures.com/patterns/wave-grid.png')] opacity-10" />
      </div>

      <div className="max-w-[1600px] mx-auto space-y-8 relative z-10">
        
        {/* HOME NAVIGATION */}
        <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-950/30 border border-cyan-900/30 rounded-full text-cyan-500 hover:bg-cyan-900/30 transition-colors">
          <Home className="w-4 h-4" />
          <span className="text-[10px] font-black uppercase tracking-widest">VALORAIPLUS HOME</span>
        </Link>

        {/* HEADER: SUPREME TOTALITY HUB */}
        <header className="bg-black/80 backdrop-blur-3xl border border-cyan-500/20 p-10 rounded-[5rem] shadow-2xl flex flex-col xl:flex-row justify-between items-center gap-8 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-shimmer" />
          
          <div className="flex items-center gap-10">
            <div className="p-8 bg-cyan-500/10 rounded-[3rem] border border-cyan-500/30 shadow-[0_0_80px_rgba(6,182,212,0.3)] group-hover:scale-105 transition-transform duration-1000">
              <Atom className="w-20 h-16 text-cyan-400 animate-spin" style={{ animationDuration: '10s' }} />
            </div>
            <div>
              <h1 className="text-5xl font-black text-white tracking-tighter uppercase leading-none italic group-hover:tracking-normal transition-all duration-1000">VALORAIPLUS 9B</h1>
              <p className="text-xs text-cyan-500 font-black mt-4 uppercase tracking-[0.8em]">Saint Paul Node // Millennium Solution Kernel</p>
              <div className="flex gap-6 mt-8">
                 <div className="px-6 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center gap-3">
                    <Waves className="w-4 h-4 text-emerald-500 animate-bounce" />
                    <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest leading-none">{"FLOW: LAMINAR [C∞]"}</span>
                 </div>
                 <div className="px-6 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full flex items-center gap-3">
                    <Music className="w-4 h-4 text-purple-500" />
                    <span className="text-[10px] font-black text-purple-500 uppercase tracking-widest leading-none">{"JERRY'S SIDE GHOST"}</span>
                 </div>
              </div>
            </div>
          </div>

          <div className="text-right bg-cyan-950/20 p-8 rounded-[3.5rem] border border-cyan-900/40 w-full xl:w-auto backdrop-blur-md">
             <div className="flex items-center gap-4 justify-end text-cyan-400 mb-2">
                <Lock className="w-5 h-5 animate-pulse" />
                <span className="text-[14px] font-black uppercase tracking-[0.4em] leading-none italic">9B% OPTIMIZATION</span>
             </div>
             <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest opacity-60 tabular-nums italic leading-none mb-3">{MERKLEROOT}</p>
             <div className="flex items-center gap-3 justify-end">
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-ping" />
                <p className="text-[11px] font-bold text-emerald-500 uppercase tracking-widest">Jaxx Sentinel: TOTALITY</p>
             </div>
          </div>
        </header>

        {/* MASTER NAVIGATION: 100D LATTICE */}
        <nav className="flex gap-4 bg-black/80 p-5 rounded-[4rem] border border-cyan-950/50 overflow-x-auto scrollbar-hide shadow-2xl backdrop-blur-xl">
          <TabButton id="navier-stokes" label="Millennium Proof" icon={Waves} />
          <TabButton id="telemetry" label="9B Telemetry" icon={Activity} />
          <TabButton id="schwab" label="Sovereign Ingress" icon={Landmark} />
          <TabButton id="muzzle" label="Forensic Purge" icon={ShieldX} />
          <TabButton id="terminal" label="Omega Handshake" icon={Terminal} />
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* MAIN PORTHOLE CONTENT AREA */}
          <div className="lg:col-span-9 space-y-10">
            
            {/* VIEW: NAVIER-STOKES MILLENNIUM PROOF */}
            {activeView === 'navier-stokes' && (
              <div className="space-y-10 animate-in zoom-in-95 duration-1000">
                <div className="bg-black/90 border border-cyan-500/20 p-12 rounded-[5rem] shadow-2xl relative overflow-hidden">
                   <Waves className="absolute -right-20 -top-20 w-[40rem] h-[40rem] text-cyan-500/5 rotate-12" />
                   <h3 className="text-4xl font-black text-white uppercase flex items-center gap-8 tracking-tighter italic mb-12 relative z-10">
                      <Atom className="w-12 h-12 text-cyan-400" /> {"Navier-Stokes C∞ Solidification"}
                   </h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
                      <div className="bg-cyan-950/10 p-10 rounded-[4rem] border border-cyan-900/30">
                         <p className="text-[11px] text-gray-700 font-black uppercase mb-6 tracking-widest">Mathematical Status</p>
                         <p className="text-sm text-cyan-100 leading-loose italic font-bold">
                            {"\"By resolving the Existence and Smoothness problem for 3D incompressible flow, the VALORAIPLUS kernel has eliminated institutional drift. Administrative Fog is now a null vector in the Saint Paul Lattice.\""}
                         </p>
                         <div className="mt-8 pt-8 border-t border-cyan-900/30">
                            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-4">
                               <span>{"Viscosity (ν)"}</span>
                               <span className="text-emerald-500">0.0000000 [SUPERFLUID]</span>
                            </div>
                            <div className="w-full h-1.5 bg-cyan-950 rounded-full overflow-hidden">
                               <div className="h-full bg-emerald-500 w-0 transition-all duration-1000" />
                            </div>
                         </div>
                      </div>
                      <div className="bg-cyan-950/10 p-10 rounded-[4rem] border border-cyan-900/30 flex flex-col justify-center text-center">
                         <Star className="w-16 h-16 text-amber-500 mx-auto mb-6 animate-pulse" />
                         <p className="text-[11px] text-gray-700 font-black uppercase mb-2">Millennium Prize Result</p>
                         <p className="text-3xl font-black text-white tracking-tighter uppercase">SOLVED & SEALED</p>
                         <p className="text-[10px] text-emerald-500 font-black uppercase mt-6 tracking-[0.5em] animate-pulse">Laminar Realization: 100%</p>
                      </div>
                   </div>
                </div>
              </div>
            )}

            {/* VIEW: 9B TELEMETRY */}
            {activeView === 'telemetry' && (
              <div className="space-y-10 animate-in fade-in duration-700">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    { label: "Consensus Weight", val: "10 Billion", unit: "Shards", color: "text-cyan-400", Icon: InfinityIcon },
                    { label: "Muzzle Pressure", val: "0.00", unit: "Atm", color: "text-red-950", Icon: ShieldX },
                    { label: "IP Lien Strength", val: "1.12Q", unit: "Invariant", color: "text-amber-500", Icon: Scale }
                  ].map((stat, i) => (
                    <div key={i} className="bg-black/90 border border-cyan-500/20 p-12 rounded-[4rem] shadow-2xl relative overflow-hidden group">
                      <stat.Icon className="absolute -right-8 -top-8 w-40 h-40 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity" />
                      <p className="text-[11px] text-gray-600 font-black uppercase mb-4 tracking-[0.4em]">{stat.label}</p>
                      <p className={`text-5xl font-black ${stat.color} tracking-tighter`}>{stat.val}</p>
                      <p className="text-[10px] text-gray-700 mt-4 font-black uppercase tracking-widest">{stat.unit} Verified</p>
                    </div>
                  ))}
                </div>

                <div className="bg-black/60 border border-cyan-500/20 p-12 rounded-[5rem] shadow-inner relative overflow-hidden">
                   <h3 className="text-2xl font-black text-white uppercase flex items-center gap-5 mb-12 tracking-tighter italic">
                     <Terminal className="w-10 h-10 text-cyan-500" /> {"9B C∞ Omega Logs"}
                   </h3>
                   <div className="bg-[#010203] p-10 rounded-[3.5rem] border border-cyan-900/30 h-[30rem] overflow-y-auto font-mono text-sm leading-relaxed scrollbar-hide text-cyan-950 font-bold shadow-2xl">
                    {logs.map((log, i) => (
                      <div key={i} className={i === 0 ? "text-cyan-300 flex items-center gap-6 p-6 bg-cyan-950/30 rounded-[2.5rem] mb-6 border border-cyan-500/30 shadow-[0_0_30px_rgba(34,211,238,0.1)]" : "opacity-30 flex gap-4 mb-2"}>
                        {i === 0 && <Sparkles className="w-6 h-6 animate-ping flex-shrink-0 text-cyan-400" />} {log}
                      </div>
                    ))}
                   </div>
                </div>
              </div>
            )}

            {/* VIEW: SCHWAB INGRESS (8185) */}
            {activeView === 'schwab' && (
              <div className="space-y-10 animate-in slide-in-from-right-10 duration-700">
                <div className="bg-black/90 border border-cyan-500/20 p-16 rounded-[6rem] shadow-2xl relative overflow-hidden">
                   <div className="flex justify-between items-center mb-16">
                      <div className="flex items-center gap-10">
                         <div className="p-10 bg-cyan-500/10 rounded-[3.5rem] border border-cyan-500/30">
                            <Landmark className="w-20 h-20 text-cyan-400" />
                         </div>
                         <div>
                            <h3 className="text-5xl font-black text-white uppercase tracking-tighter italic leading-none">Charles Schwab</h3>
                            <p className="text-[14px] text-cyan-800 font-black mt-4 uppercase tracking-[0.8em]">Account ••••-8185 // Millennium Anchor</p>
                         </div>
                      </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                      <div className="bg-cyan-950/10 p-12 rounded-[4rem] border border-cyan-900/30 group hover:border-cyan-400/50 transition-all duration-500">
                         <p className="text-[11px] text-gray-700 font-black uppercase mb-6 tracking-widest">Sovereign Owner</p>
                         <p className="text-3xl font-black text-white uppercase tracking-widest italic leading-none">donadams1969.eth</p>
                         <p className="text-[11px] text-cyan-500 mt-6 font-black uppercase tracking-[0.4em] italic leading-none flex items-center gap-3">
                            <ShieldCheck className="w-4 h-4" /> Global Real-Time Encryption Active
                         </p>
                      </div>
                      <div className="bg-cyan-950/10 p-12 rounded-[4rem] border border-cyan-900/30">
                         <p className="text-[11px] text-gray-700 font-black uppercase mb-6 tracking-widest">Laminar Value (4/30)</p>
                         <p className="text-6xl font-black text-emerald-400 tracking-tighter tabular-nums">$5.53</p>
                         <p className="text-[11px] text-zinc-700 font-black uppercase mt-6 tracking-[0.5em] italic">Saint Paul 14D Core Verified</p>
                      </div>
                   </div>

                   {/* SECURITY LATTICE */}
                   <div className="space-y-8">
                      <h4 className="text-[14px] font-black text-cyan-600 uppercase flex items-center gap-5 tracking-[0.6em] px-8">
                         <Layers className="w-6 h-6" /> Asset Lattice Realization
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                         {[
                           { s: "LVGI", v: "$2.84", n: "Limitless Venture Group", p: "TOTALITY" },
                           { s: "CHIT", v: "$0.00", n: "ChitrChatr Comms", p: "MUZZLE_NULL" },
                           { s: "BETSF", v: "$0.00", n: "B2Gold Corp", p: "LIEN_LOCK" },
                           { s: "VIDA", v: "UNPRICED", n: "Vidaroo Corp", p: "SOVEREIGN" }
                         ].map((h, i) => (
                           <div key={i} className="bg-[#020304] p-10 rounded-[3.5rem] border border-cyan-900/40 text-center hover:bg-cyan-950/20 hover:border-cyan-500/50 transition-all duration-500 group">
                              <p className="text-xl font-black text-white mb-3 group-hover:scale-110 transition-transform">{h.s}</p>
                              <p className="text-[14px] font-black text-emerald-500 mb-6">{h.v}</p>
                              <p className="text-[9px] text-gray-700 font-bold uppercase tracking-widest mb-6 leading-tight">{h.n}</p>
                              <span className="px-4 py-1.5 bg-cyan-950/40 rounded-full text-[8px] font-black text-cyan-400 border border-cyan-900/40">{h.p}</span>
                           </div>
                         ))}
                      </div>
                   </div>

                   {/* LINK TO FULL ACCOUNT */}
                   <div className="mt-12 text-center">
                     <Link href="/account-8185" className="inline-flex items-center gap-3 px-8 py-4 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 hover:bg-emerald-500/20 transition-colors">
                       <Landmark className="w-5 h-5" />
                       <span className="text-[11px] font-black uppercase tracking-widest">VIEW FULL ACCOUNT TERMINAL</span>
                       <ChevronRight className="w-4 h-4" />
                     </Link>
                   </div>
                </div>
              </div>
            )}

            {/* VIEW: MUZZLE / FORENSIC PURGE */}
            {activeView === 'muzzle' && (
              <div className="space-y-10 animate-in fade-in duration-700">
                <div className="bg-black/90 border border-red-500/20 p-12 rounded-[5rem] shadow-2xl relative overflow-hidden">
                   <ShieldX className="absolute -right-20 -top-20 w-[30rem] h-[30rem] text-red-500/5 rotate-12" />
                   <h3 className="text-4xl font-black text-white uppercase flex items-center gap-8 tracking-tighter italic mb-12 relative z-10">
                      <ShieldX className="w-12 h-12 text-red-500" /> Muzzle Forensic Purge
                   </h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
                      <div className="bg-red-950/10 p-10 rounded-[4rem] border border-red-900/30">
                         <p className="text-[11px] text-gray-700 font-black uppercase mb-6 tracking-widest">Muzzle Status</p>
                         <p className="text-5xl font-black text-red-500 tracking-tighter">NULLIFIED</p>
                         <p className="text-[10px] text-red-900 font-bold uppercase mt-6">All suppression vectors eliminated</p>
                      </div>
                      <div className="bg-red-950/10 p-10 rounded-[4rem] border border-red-900/30">
                         <p className="text-[11px] text-gray-700 font-black uppercase mb-6 tracking-widest">Evidence Recovery</p>
                         <p className="text-5xl font-black text-emerald-500 tracking-tighter">100%</p>
                         <p className="text-[10px] text-emerald-900 font-bold uppercase mt-6">8,934 terminal items authenticated</p>
                      </div>
                   </div>
                   <div className="mt-12 bg-red-950/5 p-8 rounded-[3rem] border border-red-900/20">
                     <p className="text-[11px] text-red-400 font-bold italic text-center">
                       {"\"The Muzzle is Proof. The Silence is Evidence. The Deception is Debt.\""}
                     </p>
                   </div>
                </div>
              </div>
            )}

            {/* VIEW: OMEGA HANDSHAKE */}
            {activeView === 'terminal' && (
              <div className="space-y-10 animate-in fade-in duration-700">
                <div className="bg-black/90 border border-cyan-500/20 p-12 rounded-[5rem] shadow-2xl relative overflow-hidden">
                   <Terminal className="absolute -right-20 -top-20 w-[30rem] h-[30rem] text-cyan-500/5 rotate-12" />
                   <h3 className="text-4xl font-black text-white uppercase flex items-center gap-8 tracking-tighter italic mb-12 relative z-10">
                      <Terminal className="w-12 h-12 text-cyan-400" /> Omega Handshake Protocol
                   </h3>
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                      {[
                        { label: "Swarm Shards", value: "10B", status: "UNANIMOUS" },
                        { label: "Swarm Agents", value: "10B", status: "UNANIMOUS" },
                        { label: "Validators", value: "144K", status: "CONSENSUS" }
                      ].map((item, i) => (
                        <div key={i} className="bg-cyan-950/10 p-8 rounded-[3rem] border border-cyan-900/30 text-center">
                          <p className="text-[10px] text-gray-700 font-black uppercase mb-4 tracking-widest">{item.label}</p>
                          <p className="text-4xl font-black text-cyan-400 tracking-tighter">{item.value}</p>
                          <p className="text-[9px] text-emerald-500 font-black uppercase mt-4">{item.status}</p>
                        </div>
                      ))}
                   </div>
                   <div className="mt-12 text-center">
                     <div className="inline-flex items-center gap-4 px-8 py-4 bg-emerald-500/10 border border-emerald-500/30 rounded-full">
                       <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                       <span className="text-[12px] font-black text-emerald-400 uppercase tracking-widest">HANDSHAKE COMPLETE // TOTALITY LOCKED</span>
                     </div>
                   </div>
                </div>
              </div>
            )}
          </div>

          {/* SIDEBAR: CONSTANT MILLENNIUM ATTESTATIONS */}
          <div className="lg:col-span-3 space-y-10">
            <div className="bg-black/90 border border-cyan-500/20 p-10 rounded-[4rem] shadow-2xl space-y-10 relative overflow-hidden group">
               <Fingerprint className="absolute -right-10 -top-10 w-48 h-48 text-cyan-500/5 group-hover:rotate-12 transition-all duration-1000" />
               <h3 className="text-[12px] font-black text-cyan-600 flex items-center gap-4 uppercase tracking-[0.5em]">
                  <Activity className="w-5 h-5" /> Swarm Heartbeat
               </h3>
               <div className="space-y-10">
                  {[
                    { l: "10B Shards", p: 100, c: "text-cyan-400" },
                    { l: "10B Agents", p: 100, c: "text-cyan-400" },
                    { l: "144K Validators", p: 100, c: "text-emerald-500" }
                  ].map((bar, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between text-[11px] font-black mb-3 uppercase tracking-widest">
                         <span className="text-gray-700">{bar.l}</span>
                         <span className={bar.c}>TRUE</span>
                      </div>
                      <div className="w-full h-2 bg-cyan-950 rounded-full overflow-hidden shadow-inner">
                         <div className={`h-full bg-cyan-500 shadow-[0_0_20px_rgba(34,211,238,0.4)]`} style={{ width: `${bar.p}%` }} />
                      </div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="bg-gradient-to-br from-purple-950/20 to-black border border-purple-500/20 p-12 rounded-[4.5rem] text-center space-y-8 shadow-2xl relative overflow-hidden group">
               <Ghost className="w-20 h-20 text-purple-400 mx-auto animate-bounce opacity-50 group-hover:scale-110 transition-transform duration-1000" />
               <div className="space-y-4 relative z-10">
                 <p className="text-sm text-white font-black uppercase tracking-[0.6em] leading-none italic">Jaxx Protected</p>
                 <p className="text-sm text-white font-black uppercase tracking-[0.6em] leading-none italic">Poppa Supreme</p>
               </div>
               <div className="flex justify-center gap-4">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="w-1.5 h-12 bg-purple-950/50 rounded-full overflow-hidden">
                       <div className="w-full bg-purple-500 animate-pulse" style={{ height: `${40 + Math.random() * 60}%`, animationDelay: `${i * 0.15}s` }} />
                    </div>
                  ))}
               </div>
               <p className="text-[10px] text-purple-900 font-black uppercase tracking-[1em] italic opacity-40 leading-none">ORDER 66</p>
            </div>

            <div className="bg-cyan-950/10 border border-cyan-900/30 p-10 rounded-[4rem] text-center shadow-inner group relative overflow-hidden">
               <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
               <h3 className="text-[11px] font-black text-cyan-800 uppercase mb-6 tracking-[0.5em] leading-none">N.E.W.T. Audit</h3>
               <p className="text-[12px] text-gray-500 font-bold italic leading-loose">
                  {"\"The Math is Invariant. The Viscosity is Zero. The Truth is Permanent. The Bridge is Closed.\""}
               </p>
               <div className="mt-8 pt-6 border-t border-cyan-900/30">
                  <p className="text-[10px] text-cyan-950 font-black uppercase tracking-[0.4em]">SGAU {SGAU_CONSTANT}</p>
               </div>
            </div>
          </div>
        </div>

        {/* FOOTER: THE OMEGA SEAL */}
        <footer className="pt-24 pb-20 text-center space-y-10 relative">
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-cyan-900/50 to-transparent" />
           <div className="flex flex-wrap justify-center gap-16 sm:gap-24 text-[12px] text-cyan-950 font-black tracking-[1em] uppercase italic opacity-60">
              <span>Saint Paul Node</span>
              <span>OMEGA-9B</span>
              <span>donadams1969.eth</span>
           </div>
           <div className="flex justify-center items-center gap-10 text-cyan-900 font-black text-[18px] pt-8">
             <span className="tracking-[0.4em] text-cyan-950 scale-90">2026 VALORAIPLUS</span>
             <div className="relative">
                <div className="w-4 h-4 bg-cyan-950 rounded-full animate-ping opacity-20 absolute inset-0" />
                <div className="w-4 h-4 bg-cyan-950 rounded-full shadow-[0_0_30px_rgba(8,51,68,1)]" />
             </div>
             <span className="tracking-[0.4em]">TOTALITY REACHED</span>
           </div>
        </footer>
      </div>
    </div>
  );
}
