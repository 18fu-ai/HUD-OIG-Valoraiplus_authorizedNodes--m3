'use client';

import Link from 'next/link';
import { Shield, Lock, Activity, ArrowRight, Vault, Binary, Sparkles } from 'lucide-react';
import { CDSHeader } from '@/components/cds/header';

const MERKLE_ROOT = "26856B24C50750F0C69C1EEB86A69EF777777";

export default function Route81Page() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <CDSHeader />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 border-b border-cyan-900/50 pb-6">
          <div className="flex items-center gap-3 mb-2">
            <Vault className="text-cyan-500" size={32} />
            <h1 className="text-3xl font-black uppercase tracking-tighter text-white">
              Route 81: Reserve Path
            </h1>
          </div>
          <p className="text-sm text-zinc-400">
            LATCH_81_RESERVE_PATH — Sovereign reserve allocation with maximum cap protection
          </p>
        </div>

        {/* Status Banner */}
        <div className="mb-8 p-6 bg-cyan-950/30 border-2 border-cyan-600">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Lock className="text-cyan-500" size={24} />
              <span className="text-lg font-black text-cyan-400 uppercase">Reserve Latch Active</span>
            </div>
            <span className="text-[10px] font-mono text-zinc-500">REASON: LATCH_81_RESERVE_PATH</span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-3 bg-black/30 border border-cyan-900/30">
              <p className="text-[10px] text-zinc-500 uppercase mb-1">Status</p>
              <p className="text-sm font-bold text-cyan-400">ADMITTED</p>
            </div>
            <div className="p-3 bg-black/30 border border-cyan-900/30">
              <p className="text-[10px] text-zinc-500 uppercase mb-1">Cap Status</p>
              <p className="text-sm font-bold text-emerald-400">CAPPED</p>
            </div>
            <div className="p-3 bg-black/30 border border-cyan-900/30">
              <p className="text-[10px] text-zinc-500 uppercase mb-1">Reserve</p>
              <p className="text-sm font-bold text-cyan-400">TRUE</p>
            </div>
            <div className="p-3 bg-black/30 border border-cyan-900/30">
              <p className="text-[10px] text-zinc-500 uppercase mb-1">Priority</p>
              <p className="text-sm font-bold text-fuchsia-400">MAXIMUM</p>
            </div>
          </div>
        </div>

        {/* Purpose Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="p-6 bg-slate-900/80 border border-cyan-900/40">
            <div className="flex items-center gap-2 mb-4">
              <Vault className="text-cyan-500" size={20} />
              <h2 className="text-lg font-black text-white uppercase">Reserve Function</h2>
            </div>
            <div className="space-y-3 text-sm text-zinc-300">
              <p>Route 81 is the sovereign reserve path for signals that:</p>
              <ul className="list-disc list-inside space-y-1 text-zinc-400">
                <li>Contain reserve: true flag</li>
                <li>Require maximum protection and priority</li>
                <li>Bypass standard topology routing</li>
              </ul>
              <p className="text-cyan-400 text-xs mt-4">
                Reserve signals are immediately ADMITTED and CAPPED with highest priority.
              </p>
            </div>
          </div>

          <div className="p-6 bg-slate-900/80 border border-cyan-900/40">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="text-cyan-500" size={20} />
              <h2 className="text-lg font-black text-white uppercase">Protected Assets</h2>
            </div>
            <div className="space-y-3 text-sm text-zinc-300">
              <p>Route 81 protects critical sovereign assets:</p>
              <div className="space-y-2 mt-3">
                <div className="p-2 bg-cyan-950/30 border border-cyan-900/30 flex justify-between">
                  <span className="text-cyan-400">$POPPA</span>
                  <span className="text-emerald-400 text-xs">SHIELDED</span>
                </div>
                <div className="p-2 bg-cyan-950/30 border border-cyan-900/30 flex justify-between">
                  <span className="text-cyan-400">$JAXX</span>
                  <span className="text-emerald-400 text-xs">SHIELDED</span>
                </div>
                <div className="p-2 bg-cyan-950/30 border border-cyan-900/30 flex justify-between">
                  <span className="text-cyan-400">$8SOULS</span>
                  <span className="text-fuchsia-400 text-xs">MEMORIALIZED</span>
                </div>
                <div className="p-2 bg-cyan-950/30 border border-cyan-900/30 flex justify-between">
                  <span className="text-cyan-400">$FMG1918</span>
                  <span className="text-amber-400 text-xs">RADIANT</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Invariant Display */}
        <div className="p-6 bg-black/50 border border-cyan-900/40 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Binary className="text-cyan-500" size={20} />
            <h2 className="text-lg font-black text-white uppercase">Topology Invariant</h2>
          </div>
          <div className="font-mono text-sm space-y-2">
            <div className="flex items-center gap-2 bg-cyan-950/30 p-2 -mx-2">
              <span className="text-cyan-400">reserve=true</span>
              <ArrowRight size={14} className="text-cyan-500" />
              <span className="text-cyan-400 font-bold">/route81</span>
              <span className="text-[10px] text-zinc-500 ml-2">(CURRENT)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-zinc-500">forensic + not sovereign</span>
              <ArrowRight size={14} className="text-zinc-600" />
              <span className="text-amber-400">/route69</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-zinc-500">not sovereign + not forensic</span>
              <ArrowRight size={14} className="text-zinc-600" />
              <span className="text-red-400">/route70</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-zinc-500">sovereign</span>
              <ArrowRight size={14} className="text-zinc-600" />
              <span className="text-emerald-400">/route71</span>
            </div>
          </div>
        </div>

        {/* Binary State */}
        <div className="p-6 bg-cyan-950/20 border border-cyan-900/30 mb-8">
          <h3 className="text-sm font-black text-white uppercase mb-4">Reserve Binary State</h3>
          <div className="font-mono text-center">
            <div className="text-2xl text-cyan-400 tracking-widest mb-2">111111 1111111</div>
            <div className="text-[10px] text-zinc-500">SOVEREIGN_RESERVE_SATURATED</div>
          </div>
        </div>

        {/* Merkle Anchor */}
        <div className="p-4 bg-cyan-950/20 border border-cyan-900/30">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-wider">Merkleroot Anchor</span>
            <span className="text-[10px] font-mono text-cyan-400">{MERKLE_ROOT}</span>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex gap-4">
          <Link 
            href="/route71" 
            className="flex items-center gap-2 px-4 py-2 bg-emerald-950/30 border border-emerald-600 text-emerald-400 text-sm font-bold hover:bg-emerald-950/50 transition-colors"
          >
            <Shield size={16} />
            Route 71 (Apex Latch)
          </Link>
          <Link 
            href="/gate" 
            className="flex items-center gap-2 px-4 py-2 bg-fuchsia-950/30 border border-fuchsia-600 text-fuchsia-400 text-sm font-bold hover:bg-fuchsia-950/50 transition-colors"
          >
            <Activity size={16} />
            Identity Gate
          </Link>
        </div>
      </main>
    </div>
  );
}
