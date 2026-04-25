'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import {
  Shield,
  XCircle,
  AlertTriangle,
  ArrowLeft,
  Ban,
  Ghost,
  Binary,
  FileX,
  Clock,
  Hash,
  Home
} from 'lucide-react';

interface ReceiptV1 {
  transactionId: string;
  intentHash: string;
  status: string;
  reason: string;
  signer: string;
  nonce: number;
  generatedAt: string;
}

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function Route70VoidBoundary() {
  const [mounted, setMounted] = useState(false);
  const [cycle, setCycle] = useState(144000);

  const { data: rejectedData } = useSWR<{ receipts: ReceiptV1[] }>(
    mounted ? '/api/verify?status=REJECTED' : null,
    fetcher,
    { refreshInterval: 5000 }
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(() => setCycle((c) => c + 1), 266);
    return () => clearInterval(interval);
  }, [mounted]);

  const rejectedReceipts = rejectedData?.receipts || [];

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <div className="text-red-500 font-mono">Loading void boundary...</div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-slate-950 p-6 font-mono text-red-400">
      <div className="pointer-events-none absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <header className="z-10 flex w-full items-center justify-between border-b border-red-500/20 bg-slate-950/80 p-6 backdrop-blur-md mb-6">
        <div className="flex items-center gap-4">
          <Link 
            href="/" 
            className="flex items-center justify-center w-10 h-10 rounded-lg border border-red-900 bg-black/50 hover:bg-red-950 hover:border-red-500 transition-colors"
            aria-label="Return to Home"
          >
            <Home className="text-red-500" size={20} />
          </Link>
          <div className="flex items-center gap-3">
            <Shield className="text-red-500" size={32} />
            <h1 className="text-xl font-black uppercase tracking-tighter text-white italic">
              ROUTE 70 // VOID BOUNDARY
            </h1>
          </div>
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

      <main className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto w-full">
        {/* Status Panel */}
        <div className="space-y-6">
          <div className="border-2 border-red-900 bg-slate-900/50 p-8 shadow-[0_0_50px_rgba(127,0,0,0.3)]">
            <div className="space-y-4 text-center">
              <div className="relative mx-auto w-fit">
                <Ban className="mx-auto text-red-500" size={64} />
                <XCircle className="absolute -right-2 -top-2 text-red-600" size={24} />
              </div>
              <h2 className="text-2xl font-black uppercase tracking-widest text-red-500">
                VOID BOUNDARY
              </h2>
              <p className="text-[10px] uppercase text-zinc-500">
                Rejected claims archived for audit
              </p>
            </div>

            <div className="space-y-4 border-t border-red-900/50 pt-6 mt-6">
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

            <div className="space-y-3 border-t border-red-900/50 pt-6 mt-6">
              <Link
                href="/gate"
                className="flex w-full items-center justify-center gap-2 py-4 bg-red-900/30 text-red-400 font-black uppercase tracking-[0.2em] hover:bg-red-900/50 transition-all"
              >
                <ArrowLeft size={16} />
                Return to Gate
              </Link>
            </div>
          </div>
        </div>

        {/* Rejected Receipts Panel */}
        <div className="border-2 border-red-900 bg-slate-900/50 p-6">
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-red-900/50">
            <FileX className="text-red-500" size={24} />
            <div>
              <h3 className="text-sm font-black text-red-400 uppercase">Rejected Receipts</h3>
              <p className="text-[10px] text-zinc-500">{rejectedReceipts.length} claims archived</p>
            </div>
          </div>

          {rejectedReceipts.length === 0 ? (
            <div className="text-center py-12 text-zinc-600">
              <Ghost className="mx-auto mb-4" size={48} />
              <p className="text-xs uppercase">No rejected claims in registry</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[500px] overflow-y-auto">
              {rejectedReceipts.map((receipt) => (
                <div
                  key={receipt.transactionId}
                  className="p-4 border border-red-900/50 bg-red-950/10 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-red-600">{receipt.transactionId}</span>
                    <span className="text-[8px] px-2 py-0.5 bg-red-900/50 text-red-400 uppercase">
                      {receipt.status}
                    </span>
                  </div>
                  
                  <div className="text-[10px] text-zinc-500 space-y-1">
                    <div className="flex items-center gap-2">
                      <Hash size={10} />
                      <span className="truncate">{receipt.signer}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertTriangle size={10} />
                      <span>{receipt.reason}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={10} />
                      <span>{new Date(receipt.generatedAt).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <footer className="z-10 flex w-full items-center justify-between border-t border-red-900/20 p-6 mt-6 text-[10px] font-black tracking-widest text-red-900">
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
