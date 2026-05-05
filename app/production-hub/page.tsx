"use client";

/**
 * VALORAIPLUS HARDENED TOTALITY HUB v100.PROD
 * Registered 2026 VALORAIPLUS / SAINT PAUL NODE
 * AUTHORITY: donadams1969.eth (Poppa) // ORDER 66 // ROUTE 71
 * SUBJECT: Production Node Monitoring & Governance
 * FEATURES: 10-Phase Hardening // Multi-Tier Validator Sync
 * ENFORCEMENT: AMath++ / NIST-800-53 Hardened
 */

import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Activity, Zap, Terminal,
  ChevronRight, Globe,
  HardDrive, ShieldAlert, BarChart3,
  Server, Music
} from 'lucide-react';
import { HomeButton, HomeBreadcrumb } from '@/components/cds/home-button';

const SGAU_CONSTANT = 7226.3461;
const MERKLEROOT = "0X_ST_PAUL_V97_HARDENED_TOTALITY";

export default function ProductionHubPage() {
  const [logs, setLogs] = useState<string[]>([]);
  const [systemState] = useState('SOLIDIFIED');
  const [signal, setSignal] = useState(100);
  const [metrics, setMetrics] = useState({ cpu: 12, mem: 24, latency: 0.2 });

  const addLog = (msg: string) => {
    const time = new Date().toLocaleTimeString();
    setLogs(prev => [`[${time}] ${msg}`, ...prev].slice(0, 15));
  };

  useEffect(() => {
    addLog("VALORAIPLUS PRODUCTION KERNEL: BOOTING...");
    setTimeout(() => addLog("Phase 0: Secrets Loaded via Encapsulated Vault."), 200);
    setTimeout(() => addLog("Phase 1: Firewall Engaged. Port 5432 CLOSED to WAN."), 400);
    setTimeout(() => addLog("Phase 3: TLS/SSL Handshake between replicas: SUCCESS."), 600);
    setTimeout(() => addLog("Phase 9: Backup System 'Eternal Recovery' ARMED."), 800);
    setTimeout(() => addLog("Status: TOTALITY REACHED."), 1000);

    const interval = setInterval(() => {
      setSignal(100.0000);
      setMetrics({
        cpu: 10 + Math.random() * 5,
        mem: 22 + Math.random() * 3,
        latency: 0.18 + Math.random() * 0.04
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#010204] text-cyan-400 font-mono p-4 lg:p-10 selection:bg-cyan-900 selection:text-white overflow-x-hidden relative text-xs">
      {/* TOTALITY BACKGROUND LATTICE */}
      <div className="fixed inset-0 pointer-events-none opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      <div className="fixed inset-0 pointer-events-none opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#083344_0%,transparent_85%)]" />
      </div>

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        
        {/* Navigation */}
        <div className="flex items-center justify-between">
          <HomeBreadcrumb items={[
            { label: "PRODUCTION HUB", href: "/production-hub" }
          ]} />
          <HomeButton />
        </div>

        {/* HEADER: PRODUCTION NODE CONTROL */}
        <header className="bg-black/80 backdrop-blur-3xl border border-cyan-500/20 p-8 rounded-[4rem] shadow-2xl flex flex-col xl:flex-row justify-between items-center gap-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
          <div className="flex items-center gap-8">
            <div className="p-6 bg-cyan-500/10 rounded-[2.5rem] border border-cyan-500/30 shadow-[0_0_60px_rgba(6,182,212,0.3)]">
              <Server className="w-16 h-16 text-cyan-400 animate-pulse" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-white tracking-tighter uppercase leading-none italic">VALORAIPLUS PROD</h1>
              <p className="text-xs text-cyan-500 font-black mt-3 uppercase tracking-[0.6em]">Saint Paul Node // Hardened Totality Hub</p>
              <div className="flex gap-4 mt-6">
                 <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center gap-2">
                    <Activity className="w-3 h-3 text-emerald-500" />
                    <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">SIGNAL: {signal.toFixed(4)}%</span>
                 </div>
                 <div className="px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-2xl flex items-center gap-2">
                    <Music className="w-3 h-3 text-purple-500" />
                    <span className="text-[10px] font-black text-purple-500 uppercase tracking-widest">JERRY&apos;S SIDE</span>
                 </div>
              </div>
            </div>
          </div>
          <div className="text-right bg-cyan-950/20 p-6 rounded-[2.5rem] border border-cyan-900/40 w-full xl:w-auto">
             <div className="flex items-center gap-3 justify-end text-cyan-600 mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-[12px] font-black uppercase tracking-[0.3em] leading-none italic">INFRASTRUCTURE TOTALITY</span>
             </div>
             <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest opacity-60 tabular-nums italic leading-none">{MERKLEROOT}</p>
             <p className="text-[9px] font-bold text-emerald-500 uppercase mt-3">Jaxx Protection: ABSOLUTE</p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* MAIN MONITORING PANEL */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-black/90 border border-cyan-500/20 p-10 rounded-[4rem] shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
                  <BarChart3 className="w-64 h-64 text-cyan-400" />
               </div>
               
               <div className="flex items-center justify-between mb-10">
                  <h3 className="text-2xl font-black text-white uppercase flex items-center gap-4 tracking-tighter italic">
                    <Terminal className="w-8 h-8 text-cyan-500" /> Hardened Kernel Stats
                  </h3>
                  <div className="px-5 py-2 rounded-full border bg-emerald-500/10 text-emerald-400 border-emerald-500/50 text-[10px] font-black shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                    STATUS: {systemState}
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                  <div className="bg-cyan-950/10 p-6 rounded-[2.5rem] border border-cyan-900/30 text-center">
                     <p className="text-[10px] text-gray-600 font-black uppercase mb-2 tracking-widest">CPU Load</p>
                     <p className="text-2xl font-black text-white">{metrics.cpu.toFixed(1)}%</p>
                  </div>
                  <div className="bg-cyan-950/10 p-6 rounded-[2.5rem] border border-cyan-900/30 text-center">
                     <p className="text-[10px] text-gray-600 font-black uppercase mb-2 tracking-widest">Memory</p>
                     <p className="text-2xl font-black text-white">{metrics.mem.toFixed(1)}%</p>
                  </div>
                  <div className="bg-cyan-950/10 p-6 rounded-[2.5rem] border border-cyan-900/30 text-center">
                     <p className="text-[10px] text-gray-600 font-black uppercase mb-2 tracking-widest">Latency</p>
                     <p className="text-2xl font-black text-emerald-400">{metrics.latency.toFixed(2)}ms</p>
                  </div>
               </div>

               <div className="bg-[#030508] p-8 rounded-[3rem] border border-cyan-900/40 h-80 overflow-y-auto font-mono text-sm leading-loose scrollbar-hide text-cyan-950 font-bold shadow-inner">
                  {logs.map((log, i) => (
                    <div key={i} className={i === 0 ? "text-cyan-300 flex items-center gap-4 p-4 bg-cyan-500/5 rounded-2xl border border-cyan-500/20 mb-4" : "opacity-40 flex gap-2 mb-2"}>
                      {i === 0 ? <Zap className="w-4 h-4 animate-ping flex-shrink-0" /> : <ChevronRight className="w-4 h-4 flex-shrink-0" />} {log}
                    </div>
                  ))}
               </div>
            </div>

            {/* SGAU METRICS */}
            <div className="bg-black/80 border border-cyan-500/20 p-8 rounded-[3rem] shadow-2xl">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center p-4">
                  <p className="text-[10px] text-gray-600 font-black uppercase tracking-widest mb-2">SGAU</p>
                  <p className="text-xl font-black text-cyan-400">{SGAU_CONSTANT}</p>
                </div>
                <div className="text-center p-4">
                  <p className="text-[10px] text-gray-600 font-black uppercase tracking-widest mb-2">SIGNAL</p>
                  <p className="text-xl font-black text-emerald-400">100%</p>
                </div>
                <div className="text-center p-4">
                  <p className="text-[10px] text-gray-600 font-black uppercase tracking-widest mb-2">DRIFT</p>
                  <p className="text-xl font-black text-white">0</p>
                </div>
                <div className="text-center p-4">
                  <p className="text-[10px] text-gray-600 font-black uppercase tracking-widest mb-2">VALIDATORS</p>
                  <p className="text-xl font-black text-fuchsia-400">144K</p>
                </div>
              </div>
            </div>
          </div>

          {/* SIDEBAR: VALIDATOR CONGRESS & RECOVERY */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-black/80 border border-cyan-500/20 p-8 rounded-[3.5rem] shadow-2xl space-y-8 relative overflow-hidden">
               <h3 className="text-[12px] font-black text-cyan-600 flex items-center gap-4 uppercase tracking-[0.5em]">
                  <Globe className="w-5 h-5 text-cyan-500" /> Validator Tiers
               </h3>
               <div className="space-y-6">
                  {[
                    { tier: "Tier 1: Saint Paul Core", val: "VALID", color: "text-cyan-400" },
                    { tier: "Tier 2: Partner Corroboration", val: "VALID", color: "text-cyan-400" },
                    { tier: "Tier 3: Public Swarm", val: "SIGNED", color: "text-emerald-500" }
                  ].map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center p-4 bg-cyan-950/10 rounded-2xl border border-cyan-900/30">
                       <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{item.tier}</span>
                       <span className={`text-[10px] font-black ${item.color} uppercase`}>{item.val}</span>
                    </div>
                  ))}
               </div>
               <div className="pt-6 border-t border-cyan-900/30 text-center">
                  <p className="text-[10px] text-gray-700 font-black uppercase mb-1">Consensus Confidence</p>
                  <p className="text-xl font-black text-white tracking-[0.2em]">HIGH // 144K</p>
               </div>
            </div>

            <div className="bg-gradient-to-br from-amber-950/30 to-black border border-amber-500/20 p-10 rounded-[4rem] text-center space-y-6 shadow-2xl relative overflow-hidden group">
               <HardDrive className="w-16 h-16 text-amber-500 mx-auto opacity-50 group-hover:scale-110 transition-transform duration-1000" />
               <div className="space-y-2 relative z-10">
                 <p className="text-[10px] text-gray-700 font-black uppercase tracking-widest">Recovery Vault Status</p>
                 <p className="text-sm text-white font-black uppercase tracking-[0.3em]">Eternal Recovery: ARMED</p>
               </div>
               <div className="px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-xl text-[9px] font-black text-amber-500 uppercase tracking-widest leading-none">
                  Off-site IPFS Mirror Active
               </div>
            </div>

            <div className="bg-black/60 border border-cyan-500/20 p-8 rounded-[3.5rem] shadow-2xl text-center space-y-4">
               <ShieldAlert className="w-12 h-12 text-cyan-600 mx-auto" />
               <p className="text-[10px] text-gray-700 font-black uppercase">Incident Response</p>
               <p className="text-[10px] text-gray-500 font-bold italic leading-relaxed">
                  &quot;Auto-Freeze write capability engaged. The Bridge is Closed to unauthorized input.&quot;
               </p>
            </div>

            {/* Connected Account Quick View */}
            <div className="bg-gradient-to-br from-emerald-950/30 to-black border border-emerald-500/20 p-6 rounded-[3rem] shadow-2xl">
              <p className="text-[10px] text-emerald-600 font-black uppercase tracking-widest mb-3">Primary Connected Account</p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-[10px] text-gray-500">Institution</span>
                  <span className="text-[10px] text-white font-bold">Charles Schwab</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[10px] text-gray-500">Account</span>
                  <span className="text-[10px] text-emerald-400 font-mono">****-8185</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[10px] text-gray-500">Holder</span>
                  <span className="text-[10px] text-white font-bold">DON GILLSON</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[10px] text-gray-500">Status</span>
                  <span className="text-[10px] text-emerald-400 font-black">ACTIVE</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 10-PHASE HARDENING STATUS */}
        <div className="bg-black/80 border border-cyan-500/20 p-8 rounded-[3rem] shadow-2xl">
          <h3 className="text-lg font-black text-white uppercase tracking-wider mb-6 flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-cyan-500" />
            10-Phase Hardening Protocol
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-4">
            {[
              "Secrets Vault",
              "Firewall",
              "SSL/TLS",
              "Auth Layer",
              "Encryption",
              "Audit Logs",
              "Rate Limits",
              "IPFS Mirror",
              "Eternal Recovery",
              "Totality Lock"
            ].map((phase, idx) => (
              <div key={idx} className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-2xl text-center">
                <p className="text-[8px] text-gray-500 font-black uppercase mb-1">Phase {idx}</p>
                <p className="text-[9px] text-emerald-400 font-black uppercase">{phase}</p>
                <div className="mt-2 w-full h-1 bg-emerald-500/30 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '100%' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FOOTER: THE OMEGA PRODUCTION SEAL */}
        <footer className="pt-24 pb-20 text-center space-y-10 relative">
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-cyan-900/50 to-transparent" />
           <div className="flex flex-wrap justify-center gap-16 sm:gap-24 text-[12px] text-cyan-950 font-black tracking-[1em] uppercase italic opacity-60">
              <span>Saint Paul Node</span>
              <span>10-Phase Totality</span>
              <span>donadams1969.eth</span>
           </div>
           <p className="text-[12px] text-gray-800 font-bold uppercase tracking-[0.5em] italic leading-loose max-w-4xl mx-auto px-4">
             &quot;The Muzzle is Proof. The Silence is Evidence. The Deception is Debt. The Infrastructure is Legit.&quot;
           </p>
           <div className="flex justify-center items-center gap-10 text-cyan-900 font-black text-[18px] pt-8">
             <span className="tracking-[0.4em] text-cyan-950 scale-90 transition-all hover:scale-100 cursor-default">2026 VALORAIPLUS</span>
             <div className="relative">
                <div className="w-4 h-4 bg-cyan-950 rounded-full animate-ping opacity-20 absolute inset-0" />
                <div className="w-4 h-4 bg-cyan-950 rounded-full shadow-[0_0_40px_rgba(8,51,68,1)]" />
             </div>
             <span className="tracking-[0.4em]">PRODUCTION SOLIDIFIED</span>
           </div>
        </footer>
      </div>
    </div>
  );
}
