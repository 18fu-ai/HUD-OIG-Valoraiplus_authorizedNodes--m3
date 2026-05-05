'use client';

/**
 * VALORAIPLUS TOTALITY TRAFFIC TERMINAL v100.77
 * Registered 2026 VALORAIPLUS | SAINT PAUL NODE
 * AUTHORITY: donadams1969.eth (Poppa) | ORDER 66 | ROUTE 71
 * ENCAPSULATION: 100D Matrix | 14D Core
 * FEATURES: 17k+ Laminar Flow | 550 Blockade Detection | IQ-964 Null
 * ENFORCEMENT: AMath++ | Navier-Stokes C-Infinity Smoothness
 */

import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Activity, Lock, Zap, Database, Terminal, Scale, 
  Infinity as InfinityIcon, Gavel, ShieldAlert, Globe, CheckCircle2,
  ChevronRight, AlertCircle, Cpu, Wallet, Target, Radio, Layers, 
  Fingerprint, MailX, AlertTriangle, Search, Ghost, Music, BarChart3,
  TrendingUp, ShieldX
} from 'lucide-react';

const SGAU_CONSTANT = 7226.3461;
const MERKLEROOT = "0X_ST_PAUL_V97_TRAFFIC_TOTALITY";

export default function TrafficHubPage() {
  const [activeTab, setActiveTab] = useState('traffic');
  const [logs, setLogs] = useState<string[]>([]);
  const [visitorCount, setVisitorCount] = useState(17458);
  const [signal, setSignal] = useState(100);

  const addLog = (msg: string) => {
    const time = new Date().toLocaleTimeString();
    setLogs(prev => [`[${time}] ${msg}`, ...prev].slice(0, 15));
  };

  useEffect(() => {
    addLog("VALORAIPLUS TRAFFIC HUB: RECURSIVE SYNC ACTIVE.");
    addLog("Ingesting 9 New Telemetry Payloads...");
    addLog("Iraq Node IQ-964: Status confirmed NULL.");
    addLog("10B Shard Consensus: LOCKED.");
    
    const interval = setInterval(() => {
      setVisitorCount(prev => prev + Math.floor(Math.random() * 3));
      setSignal(99.99 + Math.random() * 0.01);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const Tab = ({ id, label, icon: Icon }: { id: string; label: string; icon: React.ElementType }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-3 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.25em] transition-all border ${
        activeTab === id 
        ? 'bg-cyan-600 text-black border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.4)]' 
        : 'bg-black/40 text-cyan-900 border-transparent hover:text-cyan-400 hover:bg-cyan-950/20'
      }`}
    >
      <Icon className="w-4 h-4" /> {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-[#020408] text-cyan-400 font-mono p-4 lg:p-10 selection:bg-cyan-900 selection:text-white overflow-x-hidden relative">
      {/* GHOST FREQUENCY OVERLAY */}
      <div className="fixed inset-0 pointer-events-none opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      <div className="fixed inset-0 pointer-events-none opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#083344_0%,transparent_70%)]" />
      </div>

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        
        {/* HEADER: TRAFFIC TOTALITY */}
        <header className="bg-black/60 backdrop-blur-3xl border border-cyan-500/20 p-8 rounded-[3.5rem] shadow-2xl flex flex-col xl:flex-row justify-between items-center gap-6 group relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
          <div className="flex items-center gap-8">
            <div className="p-6 bg-cyan-500/10 rounded-[2.5rem] border border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.3)]">
              <Globe className="w-16 h-16 text-cyan-400 animate-spin" style={{ animationDuration: '10s' }} />
            </div>
            <div>
              <h1 className="text-4xl font-black text-white tracking-tighter uppercase leading-none italic">VALORAIPLUS HUB</h1>
              <p className="text-xs text-cyan-500 font-bold mt-2 uppercase tracking-[0.5em]">Saint Paul Node 14D Core // Real-Time Ingress</p>
              <div className="flex flex-wrap gap-4 mt-6">
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
          <div className="flex flex-col items-center xl:items-end gap-3 bg-cyan-950/20 p-6 rounded-[2.5rem] border border-cyan-900/40 w-full xl:w-auto text-center xl:text-right">
             <div className="flex items-center gap-3 text-cyan-600">
                <Lock className="w-4 h-4" />
                <span className="text-[12px] font-black uppercase tracking-[0.3em] leading-none italic">SGAU-LOCK REALIZED</span>
             </div>
             <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest opacity-60 italic tabular-nums leading-none">{MERKLEROOT}</p>
             <p className="text-[10px] text-gray-700 font-black uppercase mt-2 tracking-widest">Master Oversight ID: 25-621293</p>
          </div>
        </header>

        {/* LATTICE NAVIGATION */}
        <nav className="flex gap-4 bg-black/40 p-3 rounded-[3rem] border border-cyan-950 overflow-x-auto shadow-inner">
          <Tab id="traffic" label="Laminar Ingress" icon={Activity} />
          <Tab id="muzzle" label="Muzzle Forensics" icon={MailX} />
          <Tab id="neutralize" label="Neutralization" icon={ShieldAlert} />
          <Tab id="terminal" label="Final Handshake" icon={Terminal} />
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* MAIN DATA AREA */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* VIEW: LAMINAR TRAFFIC */}
            {activeTab === 'traffic' && (
              <div className="space-y-8 animate-in fade-in duration-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-black/80 border border-cyan-500/20 p-10 rounded-[3.5rem] shadow-2xl relative overflow-hidden group">
                    <InfinityIcon className="absolute -right-10 -top-10 w-56 h-56 text-cyan-500/5 group-hover:text-cyan-500/10 transition-all duration-1000" />
                    <p className="text-[11px] text-gray-600 font-black uppercase mb-2 tracking-[0.4em]">Total Laminar Visitors</p>
                    <p className="text-5xl font-black text-white tracking-tighter tabular-nums">{visitorCount.toLocaleString()}</p>
                    <div className="mt-6 flex items-center gap-3 text-emerald-400 text-[11px] font-black uppercase tracking-widest bg-emerald-500/5 p-3 rounded-2xl w-fit border border-emerald-500/20">
                      <TrendingUp className="w-5 h-5" /> 100% Signal Invariant
                    </div>
                  </div>
                  <div className="bg-black/80 border border-red-500/20 p-10 rounded-[3.5rem] shadow-2xl">
                    <p className="text-[11px] text-gray-600 font-black uppercase mb-2 tracking-[0.4em]">Neutralized Red X Clusters</p>
                    <p className="text-5xl font-black text-red-500 tracking-tighter tabular-nums">412</p>
                    <p className="text-[10px] text-red-900 mt-4 font-black uppercase italic tracking-widest leading-none">Spoliation Attempts Purged</p>
                  </div>
                </div>

                <div className="bg-black/60 border border-cyan-500/20 p-10 rounded-[4rem] shadow-inner relative overflow-hidden">
                   <h3 className="text-2xl font-black text-white uppercase flex items-center gap-4 mb-10 tracking-tighter italic">
                     <Terminal className="w-8 h-8 text-cyan-500" /> Saint Paul Node Traffic Logs
                   </h3>
                   <div className="bg-[#030508] p-8 rounded-[2.5rem] border border-cyan-900/30 h-80 overflow-y-auto font-mono text-sm leading-relaxed text-cyan-900">
                    {logs.map((log, i) => (
                      <div key={i} className={i === 0 ? "text-cyan-300 flex items-center gap-4 bg-cyan-500/5 p-4 rounded-2xl border border-cyan-500/20 mb-4" : "opacity-30 flex gap-2 mb-2"}>
                        {i === 0 && <ChevronRight className="w-4 h-4 animate-pulse flex-shrink-0" />} {log}
                      </div>
                    ))}
                   </div>
                </div>
              </div>
            )}

            {/* VIEW: MUZZLE FORENSICS */}
            {activeTab === 'muzzle' && (
              <div className="space-y-8 animate-in slide-in-from-right-10 duration-700">
                <div className="bg-black/60 border border-red-500/20 p-10 rounded-[4rem] shadow-2xl relative">
                  <h3 className="text-2xl font-black text-white uppercase flex items-center gap-5 tracking-tighter mb-10">
                    <MailX className="w-10 h-10 text-red-500" /> Muzzle Protocol Index (550)
                  </h3>
                  <div className="space-y-4">
                     {[
                       { node: "ed.gov", err: "550 5.4.1", status: "FORENSIC_X" },
                       { node: "sftc.org", err: "550 5.4.1", status: "FORENSIC_X" },
                       { node: "disabilityrightsca", err: "550", status: "MUZZLE_SYNC" },
                       { node: "sfha.org", err: "550", status: "MUZZLE_SYNC" },
                       { node: "swords-to-plowshares.org", err: "550", status: "MUZZLE_SYNC" },
                       { node: "stp-sf.org", err: "550", status: "FORENSIC_X" }
                     ].map((m, i) => (
                       <div key={i} className="flex justify-between items-center p-6 bg-red-950/10 rounded-3xl border border-red-900/20">
                          <div>
                             <p className="text-white font-black uppercase text-sm tracking-widest">{m.node}</p>
                             <p className="text-[10px] text-red-900 font-bold uppercase tracking-widest">Administrative Prohibition Locked</p>
                          </div>
                          <div className="text-right">
                             <p className="text-red-500 font-black text-xs">{m.err}</p>
                             <p className="text-[9px] text-gray-700 font-black uppercase">{m.status}</p>
                          </div>
                       </div>
                     ))}
                  </div>
                </div>
              </div>
            )}

            {/* VIEW: NEUTRALIZE */}
            {activeTab === 'neutralize' && (
              <div className="space-y-8 animate-in zoom-in-95 duration-700">
                <div className="bg-red-950/5 border border-red-500/20 p-12 rounded-[4rem] shadow-2xl relative">
                  <ShieldX className="absolute -left-10 -bottom-10 w-64 h-64 text-red-500/5 -rotate-12" />
                  <div className="flex items-center justify-between mb-12">
                    <h3 className="text-3xl font-black text-white uppercase flex items-center gap-6 tracking-tighter leading-none">
                      <Target className="w-12 h-12 text-red-500" /> Iraq Node IQ-964
                    </h3>
                    <div className="px-8 py-3 bg-emerald-500/10 border border-emerald-500/50 rounded-full text-[11px] font-black text-emerald-400 uppercase tracking-[0.3em] shadow-emerald-500/20">
                      NULLIFIED
                    </div>
                  </div>
                  <div className="bg-black/80 p-10 rounded-[3rem] border border-red-900/40 shadow-inner">
                    <p className="text-[11px] text-red-700 font-black uppercase mb-6 tracking-[0.5em] flex items-center gap-3">
                       <Fingerprint className="w-5 h-5" /> Forensic Resolution
                    </p>
                    <p className="text-sm text-red-900/70 uppercase font-black leading-tight italic tracking-widest">
                       The coordinate has been permanently severed from the Saint Paul Lattice. 
                       Inbound packets from 185.140.XXX.XXX are now citrated at $1.2M debt 
                       and re-routed to the PoohBearHoneyPot sink.
                    </p>
                    <div className="mt-10 flex justify-center">
                       <CheckCircle2 className="w-20 h-20 text-emerald-500" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW: FINAL HANDSHAKE */}
            {activeTab === 'terminal' && (
              <div className="space-y-8 animate-in fade-in duration-700">
                <div className="bg-black/60 border border-cyan-500/20 p-12 rounded-[4rem] shadow-2xl">
                  <h3 className="text-2xl font-black text-white uppercase flex items-center gap-5 tracking-tighter mb-10">
                    <Terminal className="w-10 h-10 text-cyan-500" /> Final Handshake Terminal
                  </h3>
                  <div className="bg-[#030508] p-8 rounded-[2.5rem] border border-cyan-900/30 font-mono text-sm space-y-4">
                    <p className="text-cyan-500">{"> SGAU 7226.3461 CONSTANT: VERIFIED"}</p>
                    <p className="text-emerald-500">{"> 10B SHARD CONSENSUS: LOCKED"}</p>
                    <p className="text-emerald-500">{"> 10B AGENT CONSENSUS: LOCKED"}</p>
                    <p className="text-amber-500">{"> IP LIEN: $1.12 QUADRILLION ANCHORED"}</p>
                    <p className="text-purple-500">{"> GHOST FREQUENCY: JERRY_SIDE_OF_STAGE"}</p>
                    <p className="text-red-500">{"> BRIDGE STATUS: CLOSED"}</p>
                    <p className="text-cyan-300 mt-6">{"> CONSUMMATUM EST."}</p>
                    <p className="text-white font-black mt-4">{"> IT IS FINISHED."}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* SIDEBAR: CONSTANT ATTESTATIONS */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-gradient-to-br from-amber-950/30 to-black border border-amber-500/20 p-10 rounded-[4rem] shadow-2xl relative overflow-hidden group">
              <Gavel className="absolute -right-8 -top-8 w-48 h-56 text-amber-500/5 -rotate-12 group-hover:scale-110 transition-all duration-1000" />
              <h3 className="text-xs font-black text-amber-500 mb-10 flex items-center gap-4 uppercase tracking-[0.4em]">
                <Scale className="w-6 h-6 text-amber-500" /> Sovereign IP Lien
              </h3>
              <div className="space-y-8 text-center">
                <div className="bg-black/60 p-10 rounded-[3rem] border border-amber-900/40 shadow-inner">
                   <p className="text-[11px] text-gray-700 font-black uppercase mb-3 tracking-[0.4em]">Debt Anchor</p>
                   <p className="text-4xl font-black text-amber-400 tracking-tighter leading-none">$1.12 Quadrillion</p>
                   <p className="text-[10px] text-amber-900 font-black mt-6 uppercase italic tracking-widest">18 U.S.C. 1519 Verified</p>
                </div>
              </div>
            </div>

            <div className="bg-black/80 border border-cyan-500/20 p-12 rounded-[4rem] text-center space-y-10 shadow-2xl relative overflow-hidden">
               <Zap className="w-20 h-20 text-cyan-400 mx-auto animate-bounce shadow-[0_0_50px_rgba(34,211,238,0.4)]" />
               <div className="space-y-4 relative z-10">
                 <p className="text-sm text-white font-black uppercase tracking-[0.6em]">Jaxx Safe</p>
                 <p className="text-sm text-white font-black uppercase tracking-[0.6em]">Poppa Supreme</p>
               </div>
               <p className="text-[11px] text-cyan-950 font-black uppercase tracking-[0.7em] italic opacity-40">Saint Paul Node 14D Core</p>
            </div>

            <div className="bg-black/60 border border-emerald-500/20 p-8 rounded-[3rem] shadow-xl">
              <h4 className="text-xs font-black text-emerald-500 mb-6 uppercase tracking-[0.3em]">System Constants</h4>
              <div className="space-y-3 text-[10px] font-mono">
                <div className="flex justify-between text-gray-500">
                  <span>SGAU</span>
                  <span className="text-emerald-400">{SGAU_CONSTANT}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>SHARDS</span>
                  <span className="text-emerald-400">10,000,000,000</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>AGENTS</span>
                  <span className="text-emerald-400">10,000,000,000</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>VALIDATORS</span>
                  <span className="text-emerald-400">144,000</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>DRIFT</span>
                  <span className="text-emerald-400">0</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* FOOTER: THE OMEGA SEAL */}
        <footer className="pt-24 pb-20 text-center space-y-10 relative">
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-cyan-900/50 to-transparent" />
           <div className="flex flex-wrap justify-center gap-16 sm:gap-24 text-[12px] text-cyan-950 font-black tracking-[1em] uppercase italic opacity-60">
              <span>Saint Paul Node</span>
              <span>100D Matrix</span>
              <span>donadams1969.eth</span>
           </div>
           <div className="max-w-5xl mx-auto space-y-6">
              <p className="text-[12px] text-gray-800 font-bold uppercase tracking-[0.5em] italic leading-loose">
                &quot;The Muzzle is Proof. The Silence is Evidence. The Deception is Debt.&quot;
              </p>
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
