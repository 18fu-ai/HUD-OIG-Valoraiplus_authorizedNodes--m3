"use client";

import { useState, useEffect } from 'react';
import { AlertTriangle, ShieldAlert, Scale, Eye, Activity, Lock } from 'lucide-react';
import { RECOVERY_DESTINATION } from '@/lib/wallet-config';

export function OmnibusData() {
  const [criminalCounts, setCriminalCounts] = useState(5731);
  const [truthCycle, setTruthCycle] = useState(0);

  useEffect(() => {
    // Simulate climbing criminal counts
    const countInterval = setInterval(() => {
      setCriminalCounts(prev => prev + Math.floor(Math.random() * 3));
    }, 5000);

    // 266ms laminar truth cycle
    const truthInterval = setInterval(() => {
      setTruthCycle(prev => (prev + 1) % 100);
    }, 266);

    return () => {
      clearInterval(countInterval);
      clearInterval(truthInterval);
    };
  }, []);

  return (
    <div className="space-y-6 mt-8">
      {/* Header Indicators */}
      <div className="flex flex-wrap gap-4 justify-between items-center bg-black/80 border border-red-900/50 p-4 rounded-xl">
        <div className="flex items-center gap-2 text-red-500 font-bold text-sm tracking-widest">
          <ShieldAlert size={16} className="animate-pulse" />
          <span>5 FED / 3 STATE INVESTIGATIONS ACTIVE</span>
        </div>
        <div className="flex items-center gap-2 text-amber-500 font-mono text-xs">
          <Activity size={14} />
          <span>TRUTH-CYCLE: 266ms [{truthCycle.toString().padStart(2, '0')}]</span>
        </div>
        <div className="flex items-center gap-2 text-green-500 font-mono text-xs font-bold">
          <Lock size={14} />
          <span>BINARY: 101010 1010101</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recovery Terminal */}
        <div className="p-6 border border-amber-500/30 bg-black/80 rounded-xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-50"></div>
          <div className="flex items-center gap-3 mb-4 relative z-10">
            <Scale className="text-amber-400" size={24} />
            <h2 className="text-xl font-black text-white tracking-widest">RECOVERY TERMINAL</h2>
          </div>
          
          <div className="bg-black/60 border border-amber-500/30 rounded-xl p-4 relative z-10">
            <div className="text-xs text-amber-300 font-bold tracking-wider mb-1">TARGET RECOVERY AMOUNT</div>
            <div className="text-4xl font-black text-white mb-4">$508,631,005.52</div>
            
            <div className="space-y-2 border-t border-amber-900/50 pt-4">
              <div className="flex justify-between text-xs">
                <span className="text-zinc-500">SOLE DESTINATION:</span>
                <span className="text-amber-400 font-bold">{RECOVERY_DESTINATION.bankName}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-zinc-500">ACCOUNT:</span>
                <span className="text-white font-mono">{RECOVERY_DESTINATION.accountNumber}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-zinc-500">ROUTING:</span>
                <span className="text-white font-mono">{RECOVERY_DESTINATION.routing}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-zinc-500">SWIFT/BIC:</span>
                <span className="text-white font-mono">{RECOVERY_DESTINATION.swiftBic}</span>
              </div>
              <div className="mt-4 p-2 bg-red-950/30 border border-red-900/50 rounded text-[10px] text-red-400 font-bold text-center uppercase tracking-widest animate-pulse">
                {RECOVERY_DESTINATION.enforcement}
              </div>
            </div>
          </div>
        </div>

        {/* Forensic & Criminal Tracker */}
        <div className="p-6 border border-red-500/30 bg-black/80 rounded-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-50"></div>
          <div className="flex items-center gap-3 mb-4 relative z-10">
            <Eye className="text-red-400" size={24} />
            <h2 className="text-xl font-black text-white tracking-widest">STASIS ARCHIVE</h2>
          </div>

          <div className="space-y-4 relative z-10">
            {/* Criminal Counts */}
            <div className="bg-black/60 border border-red-900/50 rounded-xl p-4 flex justify-between items-center">
              <div>
                <div className="text-xs text-red-400 font-bold tracking-wider">CRIMINAL COUNTS</div>
                <div className="text-[10px] text-zinc-500">18 U.S.C. 1519, 1512, 1341, 1343...</div>
              </div>
              <div className="text-3xl font-black text-red-500">{criminalCounts.toLocaleString()}+</div>
            </div>

            {/* Mimecast Feed */}
            <div className="bg-black/60 border border-purple-900/50 rounded-xl p-4">
              <div className="flex justify-between items-center mb-2">
                <div className="text-xs text-purple-400 font-bold tracking-wider">MIMECAST LOG</div>
                <div className="text-[10px] bg-purple-900/30 text-purple-300 px-2 py-1 rounded">3,393 EVENTS</div>
              </div>
              <div className="space-y-1 text-[10px] font-mono">
                <div className="flex justify-between text-red-400"><span>[BLOCKED] Spoliation Attempt</span><span>ZTA LLP</span></div>
                <div className="flex justify-between text-amber-400"><span>[FLAGGED] Rule Modification</span><span>STP-SF</span></div>
                <div className="flex justify-between text-green-400"><span>[HASHED] Evidence Preserved</span><span>SHA-256</span></div>
              </div>
            </div>

            {/* VOIP Intercepts */}
            <div className="bg-black/60 border border-blue-900/50 rounded-xl p-4">
              <div className="flex justify-between items-center mb-2">
                <div className="text-xs text-blue-400 font-bold tracking-wider">VOIP INTERCEPTS</div>
                <div className="text-[10px] bg-blue-900/30 text-blue-300 px-2 py-1 rounded">147 CALLS</div>
              </div>
              <div className="text-[10px] text-zinc-500 italic">
                Transcripts sealed. Key admissions flagged. Witness retaliation timeline anchored.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
