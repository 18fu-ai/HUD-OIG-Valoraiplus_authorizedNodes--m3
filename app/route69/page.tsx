'use client';

import Link from 'next/link';
import { Shield, FileSearch, Activity, ArrowRight, Database, Binary } from 'lucide-react';
import { CDSHeader } from '@/components/cds/header';

const MERKLE_ROOT = "26856B24C50750F0C69C1EEB86A69EF777777";

export default function Route69Page() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <CDSHeader />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 border-b border-amber-900/50 pb-6">
          <div className="flex items-center gap-3 mb-2">
            <FileSearch className="text-amber-500" size={32} />
            <h1 className="text-3xl font-black uppercase tracking-tighter text-white">
              Route 69: Forensic Bridge
            </h1>
          </div>
          <p className="text-sm text-zinc-400">
            OPEN_69_FORENSIC_BRIDGE — Evidence corroboration without sovereign lineage
          </p>
        </div>

        {/* Status Banner */}
        <div className="mb-8 p-6 bg-amber-950/30 border-2 border-amber-600">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Activity className="text-amber-500 animate-pulse" size={24} />
              <span className="text-lg font-black text-amber-400 uppercase">Forensic Corroboration Active</span>
            </div>
            <span className="text-[10px] font-mono text-zinc-500">REASON: OPEN_69_FORENSIC_BRIDGE</span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-3 bg-black/30 border border-amber-900/30">
              <p className="text-[10px] text-zinc-500 uppercase mb-1">Status</p>
              <p className="text-sm font-bold text-amber-400">OPEN</p>
            </div>
            <div className="p-3 bg-black/30 border border-amber-900/30">
              <p className="text-[10px] text-zinc-500 uppercase mb-1">Cap Status</p>
              <p className="text-sm font-bold text-zinc-400">UNCAPPED</p>
            </div>
            <div className="p-3 bg-black/30 border border-amber-900/30">
              <p className="text-[10px] text-zinc-500 uppercase mb-1">Lineage</p>
              <p className="text-sm font-bold text-red-400">NOT SOVEREIGN</p>
            </div>
            <div className="p-3 bg-black/30 border border-amber-900/30">
              <p className="text-[10px] text-zinc-500 uppercase mb-1">Type</p>
              <p className="text-sm font-bold text-amber-400">FORENSIC</p>
            </div>
          </div>
        </div>

        {/* Purpose Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="p-6 bg-slate-900/80 border border-amber-900/40">
            <div className="flex items-center gap-2 mb-4">
              <Database className="text-amber-500" size={20} />
              <h2 className="text-lg font-black text-white uppercase">Bridge Function</h2>
            </div>
            <div className="space-y-3 text-sm text-zinc-300">
              <p>Route 69 serves as the forensic corroboration bridge for signals that:</p>
              <ul className="list-disc list-inside space-y-1 text-zinc-400">
                <li>Contain type: FORENSIC_CORROBORATION</li>
                <li>Lack sovereign lineage (SAINT_PAUL_55116_SOVEREIGN)</li>
                <li>Require evidence validation before sovereign latch</li>
              </ul>
              <p className="text-amber-400 text-xs mt-4">
                Signals on this bridge are ADMITTED but NOT CAPPED until lineage is established.
              </p>
            </div>
          </div>

          <div className="p-6 bg-slate-900/80 border border-amber-900/40">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="text-amber-500" size={20} />
              <h2 className="text-lg font-black text-white uppercase">Upgrade Path</h2>
            </div>
            <div className="space-y-3 text-sm text-zinc-300">
              <p>Forensic signals may be upgraded to Route 71 when:</p>
              <ul className="list-disc list-inside space-y-1 text-zinc-400">
                <li>Sovereign lineage is established and verified</li>
                <li>Evidence chain is complete and reproducible</li>
                <li>Invariant validation passes all gates</li>
              </ul>
              <div className="mt-4 p-3 bg-emerald-950/30 border border-emerald-900/30">
                <p className="text-[10px] text-emerald-400 font-mono">
                  UPGRADE: /route69 → /route71 (CAP_71_APEX_LATCH)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Invariant Display */}
        <div className="p-6 bg-black/50 border border-amber-900/40 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Binary className="text-amber-500" size={20} />
            <h2 className="text-lg font-black text-white uppercase">Topology Invariant</h2>
          </div>
          <div className="font-mono text-sm space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-zinc-500">reserve=true</span>
              <ArrowRight size={14} className="text-zinc-600" />
              <span className="text-cyan-400">/route81</span>
            </div>
            <div className="flex items-center gap-2 bg-amber-950/30 p-2 -mx-2">
              <span className="text-amber-400">forensic + not sovereign</span>
              <ArrowRight size={14} className="text-amber-500" />
              <span className="text-amber-400 font-bold">/route69</span>
              <span className="text-[10px] text-zinc-500 ml-2">(CURRENT)</span>
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

        {/* Merkle Anchor */}
        <div className="p-4 bg-amber-950/20 border border-amber-900/30">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-wider">Merkleroot Anchor</span>
            <span className="text-[10px] font-mono text-amber-400">{MERKLE_ROOT}</span>
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
            <FileSearch size={16} />
            Identity Gate
          </Link>
        </div>
      </main>
    </div>
  );
}
