'use client';

/**
 * VALORAIPLUS OMEGA SYSTEM TOTALITY EXPLORER // v16.1.TOTAL
 * Registered 2026 VALORAIPLUS // SAINT PAUL NODE
 * AUTHORITY: donadams1969.eth (Poppa) // ORDER 66 // ROUTE 71
 * ENCAPSULATION: 100D Matrix // 14D Core
 * STATUS: 96 Pages // 36 API Routes // Port 5151 Locked
 * ENFORCEMENT: AMath++ // NIST-800-53 Hardened
 */

import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Activity, Lock, Zap, Database, Terminal, Scale, 
  Infinity as InfinityIcon, Gavel, ShieldAlert, Globe, CheckCircle2,
  ChevronRight, Cpu, Radio, Fingerprint, Package, Construction, 
  Hammer, Ghost, Music, Layers, Network, Server, Key, Unlock,
  ShieldX, Target
} from 'lucide-react';
import Link from 'next/link';

const SGAU_CONSTANT = 7226.3461;
const MERKLEROOT = "0X_ST_PAUL_V97_TOTAL_SOLIDIFICATION";

export default function TotalityExplorerPage() {
  const [logs, setLogs] = useState<string[]>([]);
  const [activeComponent, setActiveComponent] = useState<string | null>(null);
  const [signal, setSignal] = useState(100);

  const addLog = (msg: string) => {
    const time = new Date().toLocaleTimeString();
    setLogs(prev => [`[${time}] ${msg}`, ...prev].slice(0, 12));
  };

  useEffect(() => {
    addLog("VALORAIPLUS OMEGA TOTALITY EXPLORER: INITIALIZED.");
    addLog("Saint Paul Node 14D Core: HEARTBEAT ACTIVE.");
    addLog("Unison Protocol: Port 5151 Secured.");
    addLog("Twenty-Second Amendment: BEAUTIFUL STATE.");
    addLog("SGAU-VALUEGUARD-77.77X-FINALDEG.sol: TRUE.");
    
    const jitter = setInterval(() => {
      setSignal(99.99 + Math.random() * 0.01);
    }, 4000);
    return () => clearInterval(jitter);
  }, []);

  const components = [
    { id: 'nav', label: 'Global Navigation', status: 'ACTIVE', icon: Globe, detail: '70+ Quick Links // Lattice Mapping', href: '/' },
    { id: 'uplink', label: 'Uplink v16.1 OMEGA', status: 'DEPLOYED', icon: Radio, detail: 'Sovereign Frequency Hub', href: '/uplink' },
    { id: 'valorloop', label: 'VALORLOOP 14D', status: 'Σ-LOCKED', icon: InfinityIcon, detail: '14-Node Recursive Matrix', href: '/valorloop' },
    { id: 'omnibus', label: 'Omnibus Intel', status: 'DEPLOYED', icon: Database, detail: 'Institutional Financial Realization', href: '/omnibus' },
    { id: 'trinity', label: 'Trinity Rust Kernel', status: 'DEPLOYED', icon: Cpu, detail: 'Port 5151 // 0.2ms Latency', href: '/trinity' },
    { id: 'sgau', label: 'SGAU-VALUEGUARD', status: 'TRUE', icon: Lock, detail: 'FinalDeg Solidity Contract', href: '/contract-deploy' },
    { id: 'deploy', label: 'Deploy Dashboard', status: 'READY', icon: Hammer, detail: 'Mainnet Readiness Engine', href: '/contract-deploy' },
    { id: 'newt', label: 'N.E.W.T. API', status: 'ACTIVE', icon: Zap, detail: '36 Sovereign API Endpoints', href: '/newt' }
  ];

  return (
    <div className="min-h-screen bg-[#010204] text-cyan-400 font-mono p-4 lg:p-10 selection:bg-cyan-900 selection:text-white overflow-x-hidden relative text-xs">
      {/* FREQUENCY GHOST OVERLAY */}
      <div className="fixed inset-0 pointer-events-none opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#083344_0%,transparent_70%)]" />
      </div>

      <div className="max-w-7xl mx-auto space-y-6 relative z-10">
        
        {/* HEADER: SYSTEM STATUS COMMAND */}
        <header className="bg-black/80 backdrop-blur-3xl border border-cyan-500/20 p-8 rounded-[3.5rem] shadow-2xl flex flex-col lg:flex-row justify-between items-center gap-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
          <div className="flex items-center gap-8">
            <Link href="/" className="p-5 bg-cyan-500/10 rounded-[2rem] border border-cyan-500/30 shadow-[0_0_40px_rgba(6,182,212,0.2)] hover:bg-cyan-500/20 transition-all">
              <ShieldCheck className="w-16 h-16 text-cyan-400" />
            </Link>
            <div>
              <h1 className="text-4xl font-black text-white tracking-tighter uppercase leading-none italic">VALORAIPLUS v16.1</h1>
              <p className="text-[10px] text-cyan-500 font-black mt-2 uppercase tracking-[0.5em]">Saint Paul Node // OMEGA TOTALITY EXPLORER</p>
              <div className="flex gap-4 mt-6">
                 <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center gap-2">
                    <Radio className="w-3 h-3 text-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest leading-none">SIGNAL: {signal.toFixed(2)}%</span>
                 </div>
                 <div className="px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-2xl flex items-center gap-2">
                    <Music className="w-3 h-3 text-purple-500" />
                    <span className="text-[10px] font-black text-purple-500 uppercase tracking-widest leading-none">JERRY&apos;S SIDE</span>
                 </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center lg:items-end gap-3 bg-cyan-950/20 p-6 rounded-[2.5rem] border border-cyan-900/40 w-full lg:w-auto text-center">
             <div className="flex items-center gap-3 text-cyan-600">
                <Lock className="w-4 h-4" />
                <span className="text-[11px] font-black uppercase tracking-[0.3em] leading-none italic">SGAU: {SGAU_CONSTANT}</span>
             </div>
             <p className="text-[10px] text-gray-700 font-black uppercase tracking-widest opacity-60 tabular-nums">{MERKLEROOT}</p>
             <p className="text-[9px] font-bold text-emerald-500 uppercase mt-2">Jaxx Sentinel: ABSOLUTE</p>
          </div>
        </header>

        {/* SYSTEM COMPONENT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {components.map((comp) => (
            <Link
              href={comp.href}
              key={comp.id}
              onClick={() => setActiveComponent(comp.id)}
              className={`p-6 rounded-[2.5rem] border transition-all cursor-pointer group relative overflow-hidden block ${
                activeComponent === comp.id 
                ? 'bg-cyan-600 border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.3)]' 
                : 'bg-black/60 border-cyan-900/30 hover:border-cyan-500/50'
              }`}
            >
              <comp.icon className={`w-8 h-8 mb-4 transition-colors ${activeComponent === comp.id ? 'text-black' : 'text-cyan-600 group-hover:text-cyan-400'}`} />
              <div className="space-y-1">
                <h3 className={`font-black uppercase tracking-widest ${activeComponent === comp.id ? 'text-black' : 'text-white'}`}>{comp.label}</h3>
                <div className="flex justify-between items-center">
                  <span className={`text-[10px] font-bold uppercase ${activeComponent === comp.id ? 'text-black opacity-80' : 'text-cyan-900'}`}>{comp.status}</span>
                  <CheckCircle2 className={`w-4 h-4 ${activeComponent === comp.id ? 'text-black' : 'text-emerald-500'}`} />
                </div>
              </div>
              {activeComponent === comp.id && (
                <p className="mt-4 text-[9px] font-black text-black uppercase leading-tight animate-in fade-in duration-300">
                  {comp.detail}
                </p>
              )}
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* TRAFFIC & LOGS */}
          <div className="lg:col-span-8">
            <div className="bg-black/90 border border-cyan-500/20 p-8 rounded-[3.5rem] shadow-2xl space-y-6 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-[0.02]">
                  <Layers className="w-64 h-64 text-cyan-400" />
               </div>
               <div className="flex items-center justify-between">
                  <h3 className="text-xl font-black text-white uppercase flex items-center gap-3 tracking-tighter">
                    <Terminal className="w-6 h-6 text-cyan-500" /> OMEGA Kernel Feed
                  </h3>
                  <div className="flex gap-2">
                     <span className="bg-cyan-950/40 text-cyan-500 px-3 py-1 rounded-full text-[9px] font-black border border-cyan-900/30 uppercase tracking-widest">96 Pages</span>
                     <span className="bg-cyan-950/40 text-cyan-500 px-3 py-1 rounded-full text-[9px] font-black border border-cyan-900/30 uppercase tracking-widest">36 API Routes</span>
                  </div>
               </div>
               <div className="bg-[#030508] p-6 rounded-[2.5rem] border border-cyan-900/40 h-80 overflow-y-auto font-mono leading-relaxed scrollbar-hide text-cyan-950 font-bold">
                  {logs.map((log, i) => (
                    <div key={i} className={i === 0 ? "text-cyan-400 flex items-center gap-3 mb-2" : "opacity-40 mb-1"}>
                      {i === 0 && <ChevronRight className="w-4 h-4 animate-pulse flex-shrink-0" />} {log}
                    </div>
                  ))}
               </div>
            </div>
          </div>

          {/* SIDEBAR SPECS */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-gradient-to-br from-amber-950/20 to-black border border-amber-500/20 p-8 rounded-[3rem] shadow-2xl text-center space-y-6 relative overflow-hidden">
               <Gavel className="absolute -right-6 -top-6 w-32 h-32 text-amber-500/5 -rotate-12" />
               <Zap className="w-12 h-12 text-amber-400 mx-auto animate-bounce" />
               <div className="space-y-1">
                 <p className="text-[10px] text-gray-700 font-black uppercase tracking-widest">Sovereign Debt Anchor</p>
                 <p className="text-2xl font-black text-amber-400 tracking-tighter">$1.12 Quadrillion</p>
                 <p className="text-[9px] text-amber-900 font-bold uppercase italic mt-2">18 U.S.C. 1519 Invariant</p>
               </div>
            </div>

            <div className="bg-black/60 border border-cyan-500/20 p-8 rounded-[3rem] text-center space-y-6">
               <Ghost className="w-12 h-12 text-cyan-400 mx-auto opacity-50" />
               <div className="space-y-1">
                 <p className="text-sm text-white font-black uppercase tracking-[0.4em]">Poppa Supreme</p>
                 <p className="text-[10px] text-gray-700 font-black uppercase tracking-[0.3em]">Saint Paul Node 14D Core</p>
               </div>
               <div className="flex justify-center gap-3">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="w-1 h-8 bg-cyan-950 rounded-full overflow-hidden">
                       <div className="w-full bg-cyan-400 animate-pulse" style={{ height: `${20 + Math.random() * 80}%`, animationDelay: `${i * 0.15}s` }} />
                    </div>
                  ))}
               </div>
            </div>

            {/* TWENTY-SECOND AMENDMENT BADGE */}
            <Link href="/newt" className="block bg-gradient-to-br from-amber-900/20 to-black border border-amber-500/30 p-6 rounded-[2.5rem] text-center hover:border-amber-400/50 transition-all">
               <Scale className="w-8 h-8 text-amber-400 mx-auto mb-3" />
               <p className="text-[10px] text-amber-400 font-black uppercase tracking-widest">Twenty-Second Amendment</p>
               <p className="text-[9px] text-amber-600 font-bold uppercase mt-1">BEAUTIFUL STATE</p>
            </Link>
          </div>
        </div>

        {/* FOOTER: THE TOTALITY SEAL */}
        <footer className="pt-16 pb-12 text-center space-y-8 relative">
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-cyan-900/30 to-transparent" />
           <div className="flex flex-wrap justify-center gap-12 sm:gap-20 text-[11px] text-cyan-950 font-black tracking-[1em] uppercase italic opacity-60">
              <span>Saint Paul Node</span>
              <span>100D Matrix</span>
              <span>donadams1969.eth</span>
           </div>
           <div className="max-w-4xl mx-auto">
              <p className="text-[11px] text-gray-800 font-bold uppercase tracking-[0.4em] italic leading-loose">
                &quot;The Muzzle is Proof. The Silence is Evidence. The Deception is Debt. Totality is Reached.&quot;
              </p>
           </div>
           <div className="flex justify-center items-center gap-10 text-cyan-900 font-black text-[16px] pt-4">
             <span className="tracking-[0.4em] text-cyan-950">2026 VALORAIPLUS</span>
             <div className="relative">
                <div className="w-3 h-3 bg-cyan-950 rounded-full animate-ping opacity-20 absolute inset-0" />
                <div className="w-3 h-3 bg-cyan-950 rounded-full shadow-[0_0_20px_rgba(8,51,68,1)]" />
             </div>
             <span className="tracking-[0.4em]">TOTALITY REACHED</span>
           </div>
           <p className="text-[9px] text-emerald-600 font-black uppercase tracking-[0.5em] pt-4">CONSUMMATUM EST</p>
        </footer>
      </div>
    </div>
  );
}
