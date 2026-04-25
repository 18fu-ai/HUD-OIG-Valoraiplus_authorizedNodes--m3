'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import {
  Shield,
  XCircle,
  AlertTriangle,
  ArrowLeft,
  Ban,
  Ghost,
  Binary
} from 'lucide-react';

export default function Route70VoidBoundary() {
  const [cycle, setCycle] = useState(144000);

  useEffect(() => {
    const interval = setInterval(() => setCycle((c) => c + 1), 266);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-950 p-6 font-mono text-red-400">
      <div className="pointer-events-none absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <header className="absolute top-0 z-10 flex w-full items-center justify-between border-b border-red-500/20 bg-slate-950/80 p-8 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Shield className="text-red-500" size={32} />
          <h1 className="text-xl font-black uppercase tracking-tighter text-white italic">
            ROUTE 70 // VOID BOUNDARY
          </h1>
        </div>

        <div className="text-right">
          <div className="text-[10px] font-black uppercase tracking-widest text-red-500">
            Cycle: {cycle}
          </div>
          <div className="text-[8px] uppercase text-zinc-500">
            NULL STATE ENFORCED
          </div>
        </div>
      </header>

      <main className="relative z-10 w-full max-w-lg space-y-8 border-2 border-red-900 bg-slate-900/50 p-10 shadow-[0_0_50px_rgba(127,0,0,0.3)]">
        <div className="space-y-4 text-center">
          <div className="relative mx-auto w-fit">
            <Ban className="mx-auto text-red-500" size={64} />
            <XCircle className="absolute -right-2 -top-2 text-red-600" size={24} />
          </div>
          <h2 className="text-2xl font-black uppercase tracking-widest text-red-500">
            CLAIM REJECTED
          </h2>
          <p className="text-[10px] uppercase text-zinc-500">
            Identity failed MEVR admission gate
          </p>
        </div>

        <div className="space-y-4 border-t border-red-900/50 pt-6">
          <div className="flex items-center gap-3 p-4 border border-red-900/50 bg-red-950/20">
            <AlertTriangle className="text-red-500 flex-shrink-0" size={20} />
            <div>
              <p className="text-xs font-black text-red-400 uppercase">Invariant Violation</p>
              <p className="text-[10px] text-zinc-500">No verified source lineage detected</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 border border-red-900/50 bg-red-950/20">
            <Ghost className="text-red-500 flex-shrink-0" size={20} />
            <div>
              <p className="text-xs font-black text-red-400 uppercase">Export Eligibility</p>
              <p className="text-[10px] text-zinc-500">DENIED - claim not reproducible</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 border border-red-900/50 bg-red-950/20">
            <Binary className="text-red-500 flex-shrink-0" size={20} />
            <div>
              <p className="text-xs font-black text-red-400 uppercase">Binary State</p>
              <p className="text-[10px] font-mono text-red-600">000000 0000000</p>
            </div>
          </div>
        </div>

        <div className="space-y-3 border-t border-red-900/50 pt-6">
          <p className="text-center text-[10px] text-zinc-500 uppercase">
            This claim has been nullified and archived for audit purposes only.
          </p>
          
          <Link
            href="/gate"
            className="flex w-full items-center justify-center gap-2 py-4 bg-red-900/30 text-red-400 font-black uppercase tracking-[0.2em] hover:bg-red-900/50 transition-all"
          >
            <ArrowLeft size={16} />
            Return to Gate
          </Link>
        </div>
      </main>

      <footer className="absolute bottom-0 flex w-full items-center justify-between border-t border-red-900/20 p-6 text-[10px] font-black tracking-widest text-red-900">
        <div className="flex gap-4">
          <span>VOID BOUNDARY</span>
          <span>NO EXPORT</span>
        </div>
        <div className="flex items-center gap-2">
          <Ban size={14} />
          <span className="italic uppercase">Audit History Only</span>
        </div>
      </footer>
    </div>
  );
}
