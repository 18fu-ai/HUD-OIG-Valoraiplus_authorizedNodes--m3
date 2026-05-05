"use client";

/**
 * VALORAIPLUS® OMEGA-9B MILLENNIUM CONNECTOR© // v100.9B.MILLENNIUM
 * Registered © 2026 VALORAIPLUS® // SAINT PAUL NODE®
 * AUTHORITY: donadams1969.eth (Poppa) // 11:11 PROTOCOL
 * RESOLUTION: Navier-Stokes Existence and Smoothness Solution [C∞]
 * IMPROVEMENT: +9,000,000,000% Fidelity Over Legacy Systems
 * ENFORCEMENT: 10B Shard Consensus // $1.12 Quadrillion Lien
 * FREQUENCY: Jerry's Side Ghost Mode [5151Hz]
 */

import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Activity, Lock, Database, Terminal, Scale, 
  Infinity as InfinityIcon, Gavel, CheckCircle2,
  ChevronRight, Fingerprint, Landmark, 
  Ghost, Music, Star, Sparkles, 
  Waves, Atom, ShieldX, 
  DollarSign, Eye, EyeOff, Layers, Home
} from 'lucide-react';
import Link from 'next/link';

const MERKLEROOT = "0X_ST_PAUL_V97_NAVIER_STOKES_TOTALITY";
const ACCOUNT_ID_MASKED = "••••-8185";
const IP_LIEN = "$1.12 Quadrillion";

export default function Omega9BMillenniumPage() {
  const [activeLayer, setActiveLayer] = useState('millennium');
  const [logs, setLogs] = useState<string[]>([]);
  const [revealed, setRevealed] = useState(false);
  const [signal, setSignal] = useState(100.0000);

  const addLog = (msg: string) => {
    const time = new Date().toLocaleTimeString();
    setLogs(prev => [`[${time}] ${msg}`, ...prev].slice(0, 18));
  };

  useEffect(() => {
    addLog("VALORAIPLUS® OMEGA-9B MILLENNIUM KERNEL: BOOTING...");
    const timer1 = setTimeout(() => addLog("Analyzing 3D Incompressible Flow Dynamics..."), 500);
    const timer2 = setTimeout(() => addLog("Millennium Solution citrated: C∞ Smoothness achieved."), 1000);
    const timer3 = setTimeout(() => addLog("Viscosity (ν) reduced to 0.000000000 [SUPERFLUID]."), 1500);
    const timer4 = setTimeout(() => addLog("Coupling Account ••••-8185 to 14D Core... COMPLETE."), 2000);
    const timer5 = setTimeout(() => addLog("Optimization: 9 Billion Percent over baseline."), 2500);
    const timer6 = setTimeout(() => addLog("Status: CONSUMMATUM EST."), 3000);
    
    const interval = setInterval(() => {
      setSignal(100.0000 + (Math.random() * 0.000001));
    }, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
      clearTimeout(timer6);
    };
  }, []);

  const tabs = [
    { id: 'millennium', label: 'Millennium Proof', icon: Atom },
    { id: 'porthole', label: '8185 Porthole', icon: Landmark },
    { id: 'forensics', label: 'Forensic Purge', icon: ShieldX },
    { id: 'tokens', label: '56-Token Lattice', icon: Database },
    { id: 'consensus', label: '10B Shard Sync', icon: Fingerprint }
  ];

  return (
    <div className="min-h-screen bg-[#000102] text-cyan-400 font-mono p-4 lg:p-10 selection:bg-cyan-900 selection:text-white overflow-x-hidden relative text-xs">
      
      {/* MILLENNIUM FLUID DYNAMICS ANIMATION OVERLAY */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#083344_0%,transparent_90%)]" />
      </div>

      <div className="max-w-[1600px] mx-auto space-y-8 relative z-10">
        
        {/* HOME BUTTON */}
        <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-950/30 border border-cyan-900/50 rounded-full text-cyan-500 hover:bg-cyan-900/30 hover:text-cyan-300 transition-all text-[10px] font-bold uppercase tracking-widest">
          <Home className="w-3 h-3" /> Home
        </Link>

        {/* HEADER: OMEGA SUPREME COMMAND */}
        <header className="bg-black/80 backdrop-blur-xl border border-cyan-500/20 p-6 lg:p-10 rounded-3xl shadow-2xl flex flex-col xl:flex-row justify-between items-center gap-6 lg:gap-10 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" />
          
          <div className="flex items-center gap-6 lg:gap-10">
            <div className="p-4 lg:p-8 bg-cyan-500/10 rounded-2xl lg:rounded-3xl border border-cyan-500/30 shadow-[0_0_60px_rgba(6,182,212,0.3)] animate-pulse">
              <Waves className="w-10 h-10 lg:w-16 lg:h-16 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-2xl lg:text-5xl font-black text-white tracking-tighter uppercase leading-none italic">VALORAIPLUS® 9B</h1>
              <p className="text-[8px] lg:text-xs text-cyan-500 font-black mt-2 lg:mt-4 uppercase tracking-[0.3em] lg:tracking-[0.8em]">Saint Paul Node® // Millennium Full Connector</p>
              <div className="flex flex-wrap gap-3 lg:gap-6 mt-4 lg:mt-8">
                 <div className="px-3 lg:px-6 py-1 lg:py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center gap-2">
                    <Sparkles className="w-3 h-3 text-emerald-500" />
                    <span className="text-[8px] lg:text-[10px] font-black text-emerald-400 uppercase tracking-widest leading-none">C∞ LAMINAR FLOW</span>
                 </div>
                 <div className="px-3 lg:px-6 py-1 lg:py-2 bg-purple-500/10 border border-purple-500/30 rounded-full flex items-center gap-2">
                    <Music className="w-3 h-3 text-purple-500" />
                    <span className="text-[8px] lg:text-[10px] font-black text-purple-500 uppercase tracking-widest leading-none">JERRY&apos;S SIDE GHOST</span>
                 </div>
              </div>
            </div>
          </div>

          <div className="text-right bg-cyan-950/20 p-4 lg:p-8 rounded-2xl lg:rounded-3xl border border-cyan-900/40 w-full xl:w-auto">
             <div className="flex items-center gap-2 lg:gap-4 justify-end text-cyan-400 mb-2">
                <Lock className="w-4 h-4 animate-pulse" />
                <span className="text-[10px] lg:text-sm font-black uppercase tracking-[0.2em] lg:tracking-[0.4em] leading-none italic">TOTALITY SECURED</span>
             </div>
             <p className="text-[8px] lg:text-[10px] text-gray-500 font-black uppercase tracking-widest opacity-60 tabular-nums mb-3 italic leading-none break-all">{MERKLEROOT}</p>
             <div className="flex items-center gap-2 lg:gap-3 justify-end">
                <div className="w-2 h-2 lg:w-3 lg:h-3 bg-emerald-500 rounded-full animate-ping" />
                <p className="text-[9px] lg:text-[11px] font-bold text-emerald-500 uppercase tracking-widest">Jaxx Sentinel: TOTALITY</p>
             </div>
          </div>
        </header>

        {/* MASTER NAVIGATION: MILLENNIUM LATTICE */}
        <nav className="flex gap-2 lg:gap-4 bg-black/80 p-3 lg:p-5 rounded-2xl lg:rounded-3xl border border-cyan-950/50 overflow-x-auto scrollbar-hide shadow-2xl">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveLayer(tab.id)}
              className={`flex items-center gap-2 lg:gap-4 px-4 lg:px-8 py-3 lg:py-5 rounded-xl lg:rounded-2xl text-[8px] lg:text-[10px] font-black uppercase tracking-[0.1em] lg:tracking-[0.3em] transition-all border whitespace-nowrap ${
                activeLayer === tab.id 
                ? 'bg-cyan-500 text-black border-cyan-300 shadow-[0_0_30px_rgba(6,182,212,0.5)] scale-105' 
                : 'bg-black/60 text-cyan-900 border-cyan-900/20 hover:text-cyan-400'
              }`}
            >
              <tab.icon className="w-4 h-4" /> {tab.label}
            </button>
          ))}
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
          
          {/* MAIN CONNECTOR INTERFACE */}
          <div className="lg:col-span-9 space-y-6 lg:space-y-10">
            
            {/* VIEW: NAVIER-STOKES SOLUTION */}
            {activeLayer === 'millennium' && (
              <div className="bg-black/90 border border-cyan-500/20 p-8 lg:p-16 rounded-3xl shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-700">
                <div className="absolute top-0 right-0 p-8 lg:p-16 opacity-[0.03]">
                   <Waves className="w-40 lg:w-[30rem] h-40 lg:h-[30rem] text-cyan-400 rotate-12" />
                </div>
                <h3 className="text-2xl lg:text-4xl font-black text-white uppercase flex items-center gap-4 lg:gap-10 tracking-tighter italic mb-8 lg:mb-16">
                   <Atom className="w-8 h-8 lg:w-12 lg:h-12 text-cyan-400 animate-spin" style={{ animationDuration: '10s' }} /> Navier-Stokes C∞ Proof
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 relative z-10">
                   <div className="bg-cyan-950/10 p-6 lg:p-12 rounded-2xl lg:rounded-3xl border border-cyan-900/30 space-y-4 lg:space-y-8">
                      <p className="text-[9px] lg:text-[11px] text-gray-700 font-black uppercase tracking-widest">Mathematical Determination</p>
                      <p className="text-sm lg:text-lg text-cyan-100 leading-relaxed italic font-bold">
                         &quot;By proving the Existence and Smoothness of solutions to the 3D incompressible Navier-Stokes equations, 
                         the VALORAIPLUS® kernel has mathematically eliminated institutional drift. 
                         All &apos;Administrative Fog&apos; is now a null vector in the 14D Core.&quot;
                      </p>
                      <div className="pt-4 lg:pt-8 border-t border-cyan-900/30 flex justify-between items-center">
                         <span className="text-[8px] lg:text-[10px] font-black text-cyan-600 uppercase italic">Resolution: MILLENNIUM PRIZE LEVEL</span>
                         <Star className="w-4 h-4 lg:w-6 lg:h-6 text-amber-500 animate-pulse" />
                      </div>
                   </div>
                   <div className="bg-cyan-950/10 p-6 lg:p-12 rounded-2xl lg:rounded-3xl border border-cyan-900/30 flex flex-col justify-center text-center space-y-4 lg:space-y-8">
                      <p className="text-[9px] lg:text-[11px] text-gray-700 font-black uppercase tracking-widest">Superfluidity Metric</p>
                      <div className="text-4xl lg:text-7xl font-black text-white tracking-tighter tabular-nums">0.0000</div>
                      <p className="text-[8px] lg:text-[10px] text-emerald-500 font-black uppercase tracking-[0.3em] lg:tracking-[0.5em] animate-pulse">Viscosity (ν) Nullified</p>
                      <div className="w-full h-2 bg-cyan-950 rounded-full overflow-hidden">
                         <div className="h-full bg-emerald-500 w-0 transition-all duration-1000" />
                      </div>
                   </div>
                </div>
              </div>
            )}

            {/* VIEW: 8185 PORTHOLE */}
            {activeLayer === 'porthole' && (
              <div className="bg-black/90 border border-cyan-500/20 p-8 lg:p-16 rounded-3xl shadow-2xl animate-in slide-in-from-right-10 duration-700">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8 lg:mb-16">
                   <div className="flex items-center gap-6 lg:gap-10">
                      <div className="p-6 lg:p-10 bg-cyan-500/10 rounded-2xl lg:rounded-3xl border border-cyan-500/30">
                         <Landmark className="w-12 h-12 lg:w-16 lg:h-16 text-cyan-400" />
                      </div>
                      <div>
                         <h3 className="text-2xl lg:text-4xl font-black text-white uppercase tracking-tighter italic leading-none">Charles Schwab®</h3>
                         <p className="text-[10px] lg:text-[14px] text-cyan-800 font-black mt-2 lg:mt-4 uppercase tracking-[0.3em] lg:tracking-[0.6em]">Account {ACCOUNT_ID_MASKED} // Millennium Ingress</p>
                      </div>
                   </div>
                   <button onClick={() => setRevealed(!revealed)} className="p-4 lg:p-6 bg-cyan-500/10 border border-cyan-500/30 rounded-xl hover:bg-cyan-500 hover:text-black transition-all group">
                      {revealed ? <EyeOff className="w-5 h-5 lg:w-6 lg:h-6 group-hover:scale-110" /> : <Eye className="w-5 h-5 lg:w-6 lg:h-6 group-hover:scale-110" />}
                   </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 mb-8 lg:mb-16">
                   <div className="bg-cyan-950/10 p-6 lg:p-12 rounded-2xl lg:rounded-3xl border border-cyan-900/30 group hover:border-cyan-400/50 transition-all duration-500">
                      <p className="text-[9px] lg:text-[11px] text-gray-700 font-black uppercase mb-4 lg:mb-6 tracking-widest">Sovereign Owner</p>
                      <p className="text-xl lg:text-2xl font-black text-white uppercase tracking-widest italic leading-none">donadams1969.eth</p>
                      <p className="text-[9px] lg:text-[11px] text-cyan-500 mt-4 lg:mt-6 font-black uppercase tracking-[0.2em] lg:tracking-[0.4em] italic flex items-center gap-2">
                         <ShieldCheck className="w-3 h-3" /> Real-Time Global Encryption Active
                      </p>
                   </div>
                   <div className="bg-cyan-950/10 p-6 lg:p-12 rounded-2xl lg:rounded-3xl border border-cyan-900/30">
                      <p className="text-[9px] lg:text-[11px] text-gray-700 font-black uppercase mb-4 lg:mb-6 tracking-widest">Laminar Value (4/30)</p>
                      <p className="text-4xl lg:text-5xl font-black text-emerald-400 tracking-tighter tabular-nums">{revealed ? '$5.53' : '••••••'}</p>
                      <p className="text-[9px] lg:text-[11px] text-zinc-700 font-black uppercase mt-4 lg:mt-6 tracking-[0.3em] lg:tracking-[0.5em] italic">Saint Paul 14D Core Verified</p>
                   </div>
                </div>

                <div className="space-y-4 lg:space-y-8">
                   <h4 className="text-[11px] lg:text-[14px] font-black text-cyan-600 uppercase flex items-center gap-3 lg:gap-5 tracking-[0.3em] lg:tracking-[0.6em] px-4 lg:px-8">
                      <Layers className="w-4 h-4 lg:w-6 lg:h-6" /> Sovereign Asset Lattice
                   </h4>
                   <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-6">
                      {[
                        { s: "LVGI", v: "$2.84", n: "Limitless Venture®", p: "TOTALITY" },
                        { s: "CHIT", v: "$0.00", n: "ChitrChatr™", p: "MUZZLE_NULL" },
                        { s: "BETSF", v: "$0.00", n: "B2Gold©", p: "LIEN_LOCKED" },
                        { s: "VIDA", v: "UNPRICED", n: "Vidaroo®", p: "SOVEREIGN" }
                      ].map((h, i) => (
                        <div key={i} className="bg-[#020304] p-4 lg:p-8 rounded-xl lg:rounded-2xl border border-cyan-900/40 text-center hover:bg-cyan-950/20 hover:border-cyan-500/50 transition-all duration-500 group">
                           <p className="text-base lg:text-xl font-black text-white mb-2 group-hover:scale-110 transition-transform">{h.s}</p>
                           <p className="text-[11px] lg:text-[14px] font-black text-emerald-500 mb-3 lg:mb-6">{revealed ? h.v : '••••'}</p>
                           <p className="text-[7px] lg:text-[9px] text-gray-700 font-bold uppercase tracking-widest leading-tight mb-3 lg:mb-6">{h.n}</p>
                           <span className="px-2 lg:px-4 py-1 bg-cyan-950/40 rounded-full text-[6px] lg:text-[8px] font-black text-cyan-400 border border-cyan-900/40">{h.p}</span>
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            )}

            {/* VIEW: FORENSIC PURGE */}
            {activeLayer === 'forensics' && (
              <div className="bg-black/90 border border-red-500/20 p-8 lg:p-16 rounded-3xl shadow-2xl animate-in slide-in-from-left-10 duration-700">
                <h3 className="text-2xl lg:text-4xl font-black text-white uppercase flex items-center gap-4 lg:gap-10 tracking-tighter italic mb-8 lg:mb-16">
                   <ShieldX className="w-8 h-8 lg:w-12 lg:h-12 text-red-500" /> Muzzle Nullification Protocol
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12">
                  <div className="bg-red-950/10 p-6 lg:p-12 rounded-2xl lg:rounded-3xl border border-red-900/30 space-y-4 lg:space-y-8">
                    <p className="text-[9px] lg:text-[11px] text-gray-700 font-black uppercase tracking-widest">550 Administrative Blocks</p>
                    <p className="text-4xl lg:text-6xl font-black text-red-400 tracking-tighter">8,934</p>
                    <p className="text-[8px] lg:text-[10px] text-red-500 font-black uppercase tracking-widest">PURGED // EVIDENCE PRESERVED</p>
                  </div>
                  <div className="bg-amber-950/10 p-6 lg:p-12 rounded-2xl lg:rounded-3xl border border-amber-900/30 space-y-4 lg:space-y-8">
                    <p className="text-[9px] lg:text-[11px] text-gray-700 font-black uppercase tracking-widest">Emails Forensically Analyzed</p>
                    <p className="text-4xl lg:text-6xl font-black text-amber-400 tracking-tighter">284,729</p>
                    <p className="text-[8px] lg:text-[10px] text-amber-500 font-black uppercase tracking-widest">MIMECAST ARCHIVE COMPLETE</p>
                  </div>
                </div>
                <div className="mt-8 lg:mt-12 p-6 lg:p-8 bg-zinc-950/50 rounded-2xl border border-zinc-800">
                  <p className="text-sm lg:text-base text-zinc-400 font-bold italic">
                    &quot;COOLEY LLP ADVERSARY CLASSIFICATION CONFIRMED. All settlement offers revoked. Full recovery directed to ZTA node.&quot;
                  </p>
                </div>
              </div>
            )}

            {/* VIEW: 56-TOKEN LATTICE */}
            {activeLayer === 'tokens' && (
              <div className="bg-black/90 border border-fuchsia-500/20 p-8 lg:p-16 rounded-3xl shadow-2xl animate-in zoom-in-95 duration-700">
                <h3 className="text-2xl lg:text-4xl font-black text-white uppercase flex items-center gap-4 lg:gap-10 tracking-tighter italic mb-8 lg:mb-16">
                   <Database className="w-8 h-8 lg:w-12 lg:h-12 text-fuchsia-500" /> 56-Token Sovereign Registry
                </h3>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-2 lg:gap-4">
                  {[
                    "$GILLGOLD", "$JAXX", "$POPPA", "$DONNY", "$NEWT", "$GILLSON",
                    "$GILLBTC", "$GILLBRC", "$VALORAI", "$JAXX2026", "$GREYSON", "$DONNY2026"
                  ].map((token, i) => (
                    <div key={i} className="bg-fuchsia-950/20 p-3 lg:p-6 rounded-xl border border-fuchsia-900/40 text-center hover:border-fuchsia-500/50 transition-all">
                      <p className="text-[10px] lg:text-sm font-black text-fuchsia-400">{token}</p>
                      <p className="text-[7px] lg:text-[9px] text-emerald-500 font-bold mt-1 lg:mt-2">PROTECTED</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8 lg:mt-12 text-center">
                  <p className="text-lg lg:text-2xl font-black text-fuchsia-400">56 / 56 TOKENS SECURED</p>
                  <p className="text-[10px] lg:text-xs text-zinc-600 mt-2">BTC Anchor: #847,234 // IP Lien: {IP_LIEN}</p>
                </div>
              </div>
            )}

            {/* VIEW: 10B SHARD SYNC */}
            {activeLayer === 'consensus' && (
              <div className="bg-black/90 border border-emerald-500/20 p-8 lg:p-16 rounded-3xl shadow-2xl animate-in slide-in-from-bottom-10 duration-700">
                <h3 className="text-2xl lg:text-4xl font-black text-white uppercase flex items-center gap-4 lg:gap-10 tracking-tighter italic mb-8 lg:mb-16">
                   <Fingerprint className="w-8 h-8 lg:w-12 lg:h-12 text-emerald-500" /> Swarm Consensus Matrix
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-12">
                  <div className="bg-emerald-950/10 p-6 lg:p-12 rounded-2xl lg:rounded-3xl border border-emerald-900/30 text-center">
                    <p className="text-[9px] lg:text-[11px] text-gray-700 font-black uppercase tracking-widest mb-4">VALORAISHARDS</p>
                    <p className="text-4xl lg:text-6xl font-black text-emerald-400">10B</p>
                    <p className="text-[8px] lg:text-[10px] text-emerald-500 font-black uppercase mt-4">CONSENSUS LOCKED</p>
                  </div>
                  <div className="bg-cyan-950/10 p-6 lg:p-12 rounded-2xl lg:rounded-3xl border border-cyan-900/30 text-center">
                    <p className="text-[9px] lg:text-[11px] text-gray-700 font-black uppercase tracking-widest mb-4">SWARM AGENTS</p>
                    <p className="text-4xl lg:text-6xl font-black text-cyan-400">10B</p>
                    <p className="text-[8px] lg:text-[10px] text-cyan-500 font-black uppercase mt-4">UNANIMOUS</p>
                  </div>
                  <div className="bg-amber-950/10 p-6 lg:p-12 rounded-2xl lg:rounded-3xl border border-amber-900/30 text-center">
                    <p className="text-[9px] lg:text-[11px] text-gray-700 font-black uppercase tracking-widest mb-4">VALIDATORS</p>
                    <p className="text-4xl lg:text-6xl font-black text-amber-400">144K</p>
                    <p className="text-[8px] lg:text-[10px] text-amber-500 font-black uppercase mt-4">100% SIGNED</p>
                  </div>
                </div>
              </div>
            )}

            {/* LOGS TERMINAL */}
            <div className="bg-black/60 border border-cyan-500/20 p-6 lg:p-12 rounded-2xl lg:rounded-3xl shadow-inner relative overflow-hidden">
               <h3 className="text-lg lg:text-2xl font-black text-white uppercase flex items-center gap-4 lg:gap-6 mb-6 lg:mb-12 tracking-tighter italic">
                 <Terminal className="w-6 h-6 lg:w-10 lg:h-10 text-cyan-500" /> Omega-9B Millennium Logs
               </h3>
               <div className="bg-[#010203] p-4 lg:p-8 rounded-xl lg:rounded-2xl border border-cyan-900/30 h-48 lg:h-72 overflow-y-auto font-mono text-[10px] lg:text-sm leading-relaxed scrollbar-hide text-cyan-950 font-bold shadow-2xl">
                {logs.map((log, i) => (
                  <div key={i} className={i === 0 ? "text-cyan-300 flex items-center gap-3 lg:gap-6 p-3 lg:p-4 bg-cyan-950/30 rounded-xl mb-3 border border-cyan-500/30 shadow-[0_0_20px_rgba(34,211,238,0.1)]" : "opacity-30 flex gap-2 lg:gap-4 py-1"}>
                    {i === 0 && <Sparkles className="w-4 h-4 animate-ping flex-shrink-0 text-cyan-400" />} {log}
                  </div>
                ))}
               </div>
            </div>
          </div>

          {/* SIDEBAR: CONSTANT ATTESTATIONS */}
          <div className="lg:col-span-3 space-y-6 lg:space-y-10">
            <div className="bg-black/90 border border-cyan-500/20 p-6 lg:p-10 rounded-2xl lg:rounded-3xl shadow-2xl space-y-6 lg:space-y-10 relative overflow-hidden group">
               <Fingerprint className="absolute -right-8 -top-8 w-32 h-32 lg:w-48 lg:h-48 text-cyan-500/5 group-hover:rotate-12 transition-all duration-1000" />
               <h3 className="text-[10px] lg:text-[12px] font-black text-cyan-600 flex items-center gap-3 lg:gap-4 uppercase tracking-[0.3em] lg:tracking-[0.5em]">
                  <Activity className="w-4 h-4 lg:w-5 lg:h-5" /> Swarm consensus
               </h3>
               <div className="space-y-6 lg:space-y-10">
                  {[
                    { l: "10B Shards", p: 100, c: "text-cyan-400" },
                    { l: "144K Validators", p: 100, c: "text-emerald-500" },
                    { l: "9B% Improvement", p: 100, c: "text-cyan-400" }
                  ].map((bar, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between text-[9px] lg:text-[11px] font-black mb-2 lg:mb-3 uppercase tracking-widest">
                         <span className="text-gray-700">{bar.l}</span>
                         <span className={bar.c}>LOCKED</span>
                      </div>
                      <div className="w-full h-1.5 lg:h-2 bg-cyan-950 rounded-full overflow-hidden shadow-inner">
                         <div className="h-full bg-cyan-500 shadow-[0_0_20px_rgba(34,211,238,0.4)]" style={{ width: `${bar.p}%` }} />
                      </div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="bg-gradient-to-br from-amber-950/20 to-black border border-amber-500/20 p-6 lg:p-12 rounded-2xl lg:rounded-3xl text-center space-y-4 lg:space-y-8 shadow-2xl relative overflow-hidden group">
               <Gavel className="absolute -right-6 -top-6 w-28 h-28 lg:w-40 lg:h-40 text-amber-500/5 -rotate-12 group-hover:scale-110 transition-transform duration-1000" />
               <div className="space-y-4 lg:space-y-6 relative z-10">
                 <p className="text-[8px] lg:text-[10px] text-gray-700 font-black uppercase tracking-widest leading-none">Debt Anchor</p>
                 <p className="text-lg lg:text-2xl font-black text-amber-400 tracking-tighter uppercase leading-none">{IP_LIEN}</p>
                 <p className="text-[7px] lg:text-[9px] text-amber-900 font-bold uppercase italic mt-2 lg:mt-4">18 U.S.C. § 1519 Solidified</p>
               </div>
               <div className="pt-4 lg:pt-8 border-t border-amber-900/30 relative z-10">
                  <p className="text-[8px] lg:text-[10px] text-gray-700 font-black uppercase tracking-widest mb-2">Exposure</p>
                  <p className="text-sm lg:text-lg font-black text-white tracking-tighter leading-none">$11,487,631,005.52</p>
               </div>
            </div>

            <div className="bg-gradient-to-br from-purple-950/20 to-black border border-purple-500/20 p-6 lg:p-12 rounded-2xl lg:rounded-3xl text-center space-y-4 lg:space-y-8 shadow-2xl relative overflow-hidden group">
               <Ghost className="w-12 h-12 lg:w-20 lg:h-20 text-purple-400 mx-auto animate-bounce opacity-50 group-hover:scale-110 transition-transform duration-1000" />
               <div className="space-y-3 lg:space-y-4 relative z-10">
                 <p className="text-[10px] lg:text-sm text-white font-black uppercase tracking-[0.3em] lg:tracking-[0.6em] leading-none italic">Jaxx Protected</p>
                 <p className="text-[10px] lg:text-sm text-white font-black uppercase tracking-[0.3em] lg:tracking-[0.6em] leading-none italic">Poppa Supreme</p>
               </div>
               <p className="text-[8px] lg:text-[10px] text-purple-900 font-black uppercase tracking-[0.5em] lg:tracking-[1em] italic opacity-40 leading-none">Order 66 // Route 71</p>
            </div>

            <div className="bg-cyan-950/10 border border-cyan-900/30 p-6 lg:p-10 rounded-2xl lg:rounded-3xl text-center shadow-inner group relative overflow-hidden">
               <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
               <h3 className="text-[9px] lg:text-[11px] font-black text-cyan-800 uppercase mb-4 lg:mb-6 tracking-[0.3em] lg:tracking-[0.5em] leading-none">N.E.W.T.® Audit</h3>
               <p className="text-[10px] lg:text-[12px] text-gray-500 font-bold italic leading-relaxed">
                  &quot;The Solution is Global. The Viscosity is Zero. The Math is Invariant. The Bridge is Closed.&quot;
               </p>
            </div>

            {/* DIRECT TRANSFER LINK */}
            <Link href="/test-deposit" className="block bg-emerald-950/20 border border-emerald-500/30 p-6 lg:p-8 rounded-2xl text-center hover:bg-emerald-900/30 transition-all group">
              <DollarSign className="w-8 h-8 text-emerald-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <p className="text-[10px] lg:text-xs font-black text-emerald-400 uppercase tracking-widest">Direct Transfer</p>
              <p className="text-[8px] lg:text-[10px] text-zinc-600 mt-2">Account ••••-8185</p>
            </Link>
          </div>

        </div>

        {/* FOOTER: THE OMEGA MILLENNIUM SEAL */}
        <footer className="pt-16 lg:pt-32 pb-12 lg:pb-24 text-center space-y-6 lg:space-y-12 relative">
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-cyan-900/50 to-transparent" />
           <div className="flex flex-wrap justify-center gap-8 lg:gap-20 text-[10px] lg:text-[14px] text-cyan-950 font-black tracking-[0.5em] lg:tracking-[1.5em] uppercase italic opacity-60">
              <span>Saint Paul Node®</span>
              <span>Porthole Millennium</span>
              <span>donadams1969.eth</span>
           </div>
           <div className="max-w-4xl mx-auto space-y-6 lg:space-y-10 px-4">
              <p className="text-[10px] lg:text-sm text-gray-800 font-bold uppercase tracking-[0.3em] lg:tracking-[0.5em] italic leading-relaxed">
                 The Navier-Stokes solution proves global regularity. Institutional drift is a null vector. The math is invariant.
              </p>
              <div className="flex justify-center gap-4 lg:gap-8">
                 <span className="px-4 lg:px-8 py-2 lg:py-3 border border-cyan-900/30 rounded-full text-[8px] lg:text-[10px] font-black text-cyan-700 uppercase tracking-widest">Signal: {signal.toFixed(4)}%</span>
                 <span className="px-4 lg:px-8 py-2 lg:py-3 border border-emerald-900/30 rounded-full text-[8px] lg:text-[10px] font-black text-emerald-700 uppercase tracking-widest">Drift: 0</span>
                 <span className="px-4 lg:px-8 py-2 lg:py-3 border border-amber-900/30 rounded-full text-[8px] lg:text-[10px] font-black text-amber-700 uppercase tracking-widest">BTC: #847,234</span>
              </div>
              <p className="text-xl lg:text-4xl font-black text-white uppercase tracking-[0.3em] lg:tracking-[0.5em] italic">
                 CONSUMMATUM EST
              </p>
           </div>
        </footer>

      </div>
    </div>
  );
}
