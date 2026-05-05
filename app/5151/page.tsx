'use client';

/**
 * VALORAIPLUS®️ TRINITY TERMINAL 5151© // v100.5151
 * Registered ©️ 2026 VALORAIPLUS®️ // SAINT PAUL NODE®️
 * AUTHORITY: donadams1969.eth (Poppa) // ORDER 66 // ROUTE 71
 * SUBJECT: UNCOUPLING 6666 // PORT 5151 LOCK
 * FREQUENCY: Ghost Mode // Jerry's Side of the Stage
 */

import React, { useState, useEffect } from 'react';
import { 
  Terminal, ChevronRight, Music, Network
} from 'lucide-react';
import Link from 'next/link';

export default function Port5151Page() {
  const [logs, setLogs] = useState<string[]>([]);
  const [portStatus, setPortStatus] = useState('UNCOUPLING');
  const [progress, setProgress] = useState(0);

  const addLog = (msg: string) => {
    const time = new Date().toLocaleTimeString();
    setLogs(prev => [`[${time}] ${msg}`, ...prev].slice(0, 15));
  };

  useEffect(() => {
    addLog("VALORAIPLUS®️ PORT MANAGER: INITIALIZED.");
    addLog("Terminating listener on Port 6666...");
    
    let p = 0;
    const interval = setInterval(() => {
      p += 1;
      setProgress(p);
      if (p === 30) addLog("Uncoupling Logic Complete.");
      if (p === 60) {
        setPortStatus('COUPLING_5151');
        addLog("Coupling 14D Core to Port 5151...");
      }
      if (p === 90) addLog("Ghost Mode frequency adjusted to 5151Hz.");
      
      if (p >= 100) {
        clearInterval(interval);
        setPortStatus('LOCKED_5151');
        addLog("PORT 5151 UNISON ACHIEVED.");
        addLog("Binary status: MAINNET_TOTALITY.");
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#010204] text-cyan-400 font-mono p-4 lg:p-10 selection:bg-cyan-900 selection:text-white overflow-x-hidden relative text-xs">
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#083344_0%,transparent_70%)]" />
      </div>

      <div className="max-w-5xl mx-auto space-y-6 relative z-10">
        {/* Home Link */}
        <Link href="/" className="inline-flex items-center gap-2 text-cyan-500 hover:text-cyan-300 transition-colors mb-4">
          <ChevronRight className="w-4 h-4 rotate-180" />
          <span className="text-xs font-bold uppercase tracking-widest">Return to Uplink</span>
        </Link>

        <header className="bg-black/80 backdrop-blur-3xl border border-cyan-500/20 p-8 rounded-[3rem] shadow-2xl flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6">
            <div className="p-5 bg-cyan-500/10 rounded-[2rem] border border-cyan-500/30">
              <Network className={`w-12 h-12 text-cyan-400 ${portStatus !== 'LOCKED_5151' ? 'animate-pulse' : ''}`} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white tracking-tighter uppercase leading-none italic">VALORAIPLUS 5151</h1>
              <p className="text-[10px] text-cyan-500 font-black mt-2 uppercase tracking-[0.4em]">Port Unison // Saint Paul 14D Core</p>
            </div>
          </div>
          <div className="flex gap-4">
             <div className="bg-cyan-950/20 px-4 py-2 rounded-2xl border border-cyan-900/30 text-center">
                <p className="text-[9px] text-gray-600 font-black uppercase">Active Port</p>
                <p className="text-sm font-black text-white">5151</p>
             </div>
             <div className="bg-purple-950/20 px-4 py-2 rounded-2xl border border-purple-900/30 text-center">
                <Music className="w-3 h-3 text-purple-500 mx-auto mb-1" />
                <p className="text-[9px] text-purple-400 font-black uppercase">Ghost</p>
             </div>
          </div>
        </header>

        <div className="bg-black/90 border border-cyan-500/20 p-8 rounded-[3.5rem] shadow-2xl space-y-8">
           <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-white uppercase flex items-center gap-3 tracking-widest">
                 <Terminal className="w-5 h-5" /> Port Unison Console
              </h3>
              <div className={`px-4 py-1 rounded-full border text-[10px] font-black ${portStatus === 'LOCKED_5151' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/50' : 'bg-cyan-900/20 text-cyan-600 border-cyan-900/40'}`}>
                {portStatus}
              </div>
           </div>

           <div className="bg-[#030508] p-6 rounded-[2.5rem] border border-cyan-900/30 h-80 overflow-y-auto font-mono leading-relaxed scrollbar-hide text-cyan-950 font-bold">
              {logs.map((log, i) => (
                <div key={i} className={i === 0 ? "text-cyan-400 flex items-center gap-3 mb-2" : "opacity-40"}>
                  {i === 0 && <ChevronRight className="w-4 h-4 animate-pulse flex-shrink-0" />} {log}
                </div>
              ))}
           </div>

           <div className="space-y-3">
              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                 <span>Port Coupling Progress</span>
                 <span>{progress}%</span>
              </div>
              <div className="w-full h-2 bg-cyan-950 rounded-full overflow-hidden border border-cyan-900/40">
                 <div className="h-full bg-cyan-400 transition-all duration-300" style={{ width: `${progress}%` }} />
              </div>
           </div>
        </div>

        {/* System Constants */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'SGAU', value: '7226.3461' },
            { label: 'Shards', value: '10B' },
            { label: 'Agents', value: '10B' },
            { label: 'Validators', value: '144K' },
          ].map((item, i) => (
            <div key={i} className="bg-black/80 border border-cyan-900/30 p-4 rounded-2xl text-center">
              <p className="text-[9px] text-gray-600 font-black uppercase tracking-widest">{item.label}</p>
              <p className="text-lg font-black text-cyan-400">{item.value}</p>
            </div>
          ))}
        </div>

        <footer className="pt-10 pb-8 text-center space-y-4 opacity-40">
           <p className="text-[10px] text-gray-800 font-bold uppercase tracking-[0.4em] italic">
             The Muzzle is Proof. The Silence is Evidence. The Deception is Debt.
           </p>
           <div className="flex justify-center items-center gap-6 text-cyan-900 font-black text-[12px]">
             <span>2026 VALORAIPLUS</span>
             <div className="w-2 h-2 bg-cyan-950 rounded-full" />
             <span>PORT 5151 SEALED</span>
           </div>
        </footer>
      </div>
    </div>
  );
}
