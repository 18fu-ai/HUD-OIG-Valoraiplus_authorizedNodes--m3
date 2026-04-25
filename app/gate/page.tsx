'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import {
  Shield,
  Ghost,
  Fingerprint,
  Activity,
  XCircle,
  CheckCircle2,
  ArrowRight,
  Scale,
  FileJson
} from 'lucide-react';
import type { ReceiptV1 } from '@/lib/protocol/receipt';

type GateResult = {
  status: 'ADMITTED' | 'BLOCKED' | 'QUARANTINED';
  reason: string;
  identityClaim: {
    name: string;
    status: string;
    invariantState: string;
    exportEligible: boolean;
    route: string;
    replacement?: string;
    sourceLineage?: string;
  };
  receipt: ReceiptV1;
  isReplay: boolean;
};

export default function ValoraiplusIdentityGate() {
  const [identityInput, setIdentityInput] = useState('');
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<GateResult | null>(null);
  const [cycle, setCycle] = useState(144000);

  useEffect(() => {
    const interval = setInterval(() => setCycle((c) => c + 1), 266);
    return () => clearInterval(interval);
  }, []);

  const validateIdentity = async () => {
    if (!identityInput.trim() || processing) return;

    setProcessing(true);
    setResult(null);

    try {
      const response = await fetch('/api/identity/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: identityInput }),
      });
      
      const data = await response.json();
      
      if (data.receipt) {
        setResult({
          status: data.receipt.status === 'ADMITTED' ? 'ADMITTED' : 
                  data.receipt.status === 'QUARANTINED' ? 'QUARANTINED' : 'BLOCKED',
          reason: data.receipt.reason,
          identityClaim: data.identityClaim,
          receipt: data.receipt,
          isReplay: data.isReplay,
        });
      }
    } catch (error) {
      console.error('[v0] Gate verification error:', error);
    } finally {
      setProcessing(false);
    }
  };

  const destination = result?.identityClaim?.route || (result?.status === 'ADMITTED' ? '/route71' : '/route70');

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-950 p-6 font-mono text-emerald-400">
      <div className="pointer-events-none absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <header className="absolute top-0 z-10 flex w-full items-center justify-between border-b border-fuchsia-500/20 bg-slate-950/80 p-8 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Shield className="animate-pulse text-white" size={32} />
          <h1 className="text-xl font-black uppercase tracking-tighter text-white italic">
            VALORAIPLUS // MEVR Gating
          </h1>
        </div>

        <div className="text-right">
          <div className="text-[10px] font-black uppercase tracking-widest text-fuchsia-500">
            Cycle: {cycle}
          </div>
          <div className="text-[8px] uppercase text-zinc-500">
            Saint Paul Node 55116
          </div>
        </div>
      </header>

      <main className="relative z-10 w-full max-w-md space-y-8 border-2 border-emerald-900 bg-slate-900/50 p-10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        <div className="space-y-2 text-center">
          <Fingerprint className="mx-auto text-fuchsia-500" size={48} />
          <h2 className="text-lg font-black uppercase tracking-widest text-white">
            Identity Admission
          </h2>
          <p className="text-[10px] uppercase text-zinc-500">
            Submit claim for runtime verification
          </p>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <label htmlFor="identity-claim" className="sr-only">
              Enter identity claim
            </label>
            <input
              id="identity-claim"
              type="text"
              value={identityInput}
              onChange={(e) => setIdentityInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') validateIdentity();
              }}
              placeholder="ENTER IDENTITY CLAIM..."
              className="w-full border border-emerald-900 bg-black p-4 text-sm font-black uppercase text-emerald-500 transition-colors placeholder:text-emerald-950 focus:border-fuchsia-500 focus:outline-none"
            />
            <Ghost
              className="absolute right-4 top-4 text-emerald-900 opacity-30"
              size={20}
            />
          </div>

          <button
            type="button"
            onClick={validateIdentity}
            disabled={processing || !identityInput.trim()}
            aria-busy={processing}
            className={`flex w-full items-center justify-center gap-2 py-4 font-black uppercase tracking-[0.2em] transition-all ${
              processing
                ? 'bg-zinc-800 text-zinc-600'
                : 'bg-emerald-600 text-black hover:bg-fuchsia-500 hover:text-white'
            }`}
          >
            {processing ? (
              <>
                <Activity className="animate-spin" size={20} />
                Processing
              </>
            ) : (
              'Process Claim'
            )}
          </button>
        </div>

        {result && (
          <div
            aria-live="polite"
            className={`border-l-4 p-4 ${
              result.status === 'ADMITTED'
                ? 'border-emerald-500 bg-emerald-950/20'
                : result.status === 'QUARANTINED'
                  ? 'border-amber-500 bg-amber-950/20'
                  : 'border-red-600 bg-red-950/20'
            }`}
          >
            <div className="mb-2 flex items-center justify-between">
              <span
                className={`text-xs font-black uppercase ${
                  result.status === 'ADMITTED'
                    ? 'text-emerald-500'
                    : result.status === 'QUARANTINED'
                      ? 'text-amber-500'
                      : 'text-red-500'
                }`}
              >
                {result.status}
              </span>

              {result.status === 'ADMITTED' ? (
                <CheckCircle2 size={16} className="text-emerald-500" />
              ) : (
                <XCircle size={16} className="text-red-500" />
              )}
            </div>

            <p className="mb-1 text-[10px] font-bold text-white">
              {result.reason}
            </p>
            
            {result.isReplay && (
              <p className="mb-2 text-[9px] text-cyan-400">
                REPLAY DETECTED — returning cached receipt
              </p>
            )}
            
            {result.identityClaim?.replacement && (
              <p className="mb-2 text-[9px] text-amber-400">
                Suggested: {result.identityClaim.replacement}
              </p>
            )}

            {result.identityClaim?.sourceLineage && (
              <p className="mb-2 text-[9px] text-emerald-400">
                Lineage: {result.identityClaim.sourceLineage}
              </p>
            )}
            
            {/* Receipt Card */}
            <div className="mt-3 border border-zinc-800 bg-black/50 p-3">
              <div className="mb-2 flex items-center gap-2 text-[9px] text-zinc-500">
                <FileJson size={12} />
                <span>RECEIPT v{result.receipt.receiptVersion}</span>
              </div>
              <div className="space-y-1 text-[8px]">
                <div className="flex justify-between">
                  <span className="text-zinc-600">TX_ID</span>
                  <span className="text-white">{result.receipt.transactionId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-600">SIGNER</span>
                  <span className="text-fuchsia-400">{result.receipt.signer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-600">VALIDATOR</span>
                  <span className="text-emerald-400">{result.receipt.validator}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-600">BLOCK</span>
                  <span className="text-white">{result.receipt.blockNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-600">NONCE</span>
                  <span className="text-white">{result.receipt.nonce}</span>
                </div>
              </div>
            </div>

            <Link
              href={destination}
              className="mt-3 flex items-center gap-2 text-[10px] font-black text-fuchsia-500 hover:underline"
            >
              PROCEED TO {result.status === 'ADMITTED' ? 'ROUTE 71' : 'VOID BOUNDARY'}
              <ArrowRight size={12} />
            </Link>
          </div>
        )}
      </main>

      <footer className="absolute bottom-0 flex w-full items-center justify-between border-t border-emerald-900/20 p-6 text-[10px] font-black tracking-widest text-emerald-900">
        <div className="flex gap-4">
          <span>DG77.77X LOCKED</span>
          <span>MADE IN THE USA</span>
        </div>
        <div className="flex items-center gap-2">
          <Scale size={14} />
          <span className="italic uppercase">Sovereign Auditor Verified</span>
        </div>
      </footer>
    </div>
  );
}
