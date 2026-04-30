'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Activity, 
  Fingerprint, 
  Coins, 
  Lock, 
  Scale, 
  Cpu,
  Home
} from 'lucide-react';

/**
 * VALORAIPLUS Hardened Sovereign Mint Gateway
 * v1.4.100D // REV_33
 * 
 * ARCHITECTURAL INVARIANTS: 
 * 1. Authority = Policy Evaluation Outcome (API-Only)
 * 2. Static-Export-Safe (Mounted hydration guard)
 * 3. Type-Safe Route Boundaries
 * 
 * ANCHOR: SAINT PAUL NODE 55116
 * SOVEREIGN: [SOVEREIGN_AUDITOR]
 */

/* --- TYPE SYSTEM HARDENING --- */
type SovereignRoute = '/route66' | '/route69' | '/route70' | '/route71';

interface MintDecision {
  allowed: boolean;
  route: SovereignRoute;
  reasonCode: string;
}

interface MintReceipt {
  id: string;
  token: string;
  amount: string;
  mintedAt: string;
  merkle: string;
  origin: string;
  decision: MintDecision;
}

export default function MintGatewayPage() {
  const [mounted, setMounted] = useState(false);
  const [cycle, setCycle] = useState(144000);
  const [lineage, setLineage] = useState<'$POPPA' | '$JERRY'>('$POPPA');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MintReceipt | null>(null);

  // 1. Hydration Guard: Ensures static-export safety
  useEffect(() => {
    setMounted(true);
    const i = setInterval(() => setCycle(c => c + 1), 266);
    return () => clearInterval(i);
  }, []);

  // 2. Memoized Timestamp Formatting: Prevents repeated parsing during 266ms truth cycles
  const formattedMintTime = useMemo(() => {
    if (!result?.mintedAt) return '';
    try {
      return new Date(result.mintedAt).toLocaleTimeString();
    } catch {
      return 'TIMESTAMP_ERROR';
    }
  }, [result?.mintedAt]);

  /**
   * @notice HARDENED MINT EXECUTION
   * @dev Interaction -> /api/token/mint -> Decision Authority -> UI Mirror
   */
  const handleMintTest = async () => {
    if (loading) return; // Physical double-click protection
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/token/mint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          symbol: lineage,
          wallet: "runtime-wallet",
          amount: 144000,
          origin: "USA"
        }),
      });

      if (!response.ok) {
        throw new Error("Mint request failed");
      }

      const data: MintReceipt = await response.json();

      // 3. Schema Validation Before Trust
      if (!data?.decision?.route || !data?.decision?.reasonCode) {
        throw new Error("Invalid mint response shape");
      }
      
      setResult(data);
    } catch {
      // 4. Default Fail-to-RT70 Siphon: Network friction is treated as non-admission
      setResult({
        id: 'VOID_SIGNAL',
        token: 'NULL',
        amount: '0.00',
        mintedAt: new Date().toISOString(),
        merkle: 'FAIL_26856B',
        origin: 'USA',
        decision: {
          allowed: false,
          route: '/route70',
          reasonCode: 'NETWORK_OR_SHAPE_FRICTION'
        }
      });
    } finally {
      // 5. Guaranteed Cleanup: finally block ensures loading reset regardless of outcome
      setLoading(false);
    }
  };

  if (!mounted) return <div className="bg-black min-h-screen" />;

  // 6. Authority-Driven Derived Status: UI strictly follows the Decision field
  const displayStatus = result?.decision?.allowed === true ? 'ADMITTED' : (result ? 'BLOCKED' : 'READY');

  return (
    <div className="min-h-screen bg-slate-950 text-emerald-400 font-mono p-4 md:p-8 relative overflow-hidden">
      {/* 144,000D Matrix Grid Overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[size:40px_40px] bg-[linear-gradient(to_right,#10b981_1px,transparent_1px),linear-gradient(to_bottom,#10b981_1px,transparent_1px)]" />

      {/* HEADER OMEGA */}
      <header className="relative z-20 border-b-4 border-fuchsia-500 bg-black/90 backdrop-blur-xl p-6 flex flex-col lg:flex-row justify-between items-center gap-4 shadow-[0_15px_40px_rgba(255,0,255,0.1)]">
        <div className="flex items-center gap-4">
          <Link 
            href="/" 
            className="flex items-center justify-center w-12 h-12 rounded-lg border border-emerald-900 bg-black/50 hover:bg-emerald-950 hover:border-emerald-500 transition-colors"
            aria-label="Return to Home"
          >
            <Home className="text-emerald-500" size={24} />
          </Link>
          <span className="text-4xl animate-pulse select-none">USA</span>
          <div>
            <h1 className="text-3xl font-black italic tracking-tighter text-white uppercase leading-none font-mono">VALORAIPLUS</h1>
            <p className="text-[10px] font-bold text-fuchsia-500 uppercase tracking-[0.4em] mt-2 italic">Governed Mint Gateway - REV_34 - CSSS Soulbound - MADE IN THE USA</p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="bg-fuchsia-500 text-black px-4 py-1 text-xs font-black uppercase shadow-[0_0_15px_#d946ef]">
            STATUS: {loading ? 'EVALUATING' : displayStatus}
          </div>
          <span className="text-[9px] text-zinc-500 mt-2 block font-bold tracking-widest italic uppercase">Node 55116 // {cycle}</span>
        </div>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto py-12 space-y-12">
        
        {/* LINEAGE SELECTION */}
        <section className="bg-slate-900 border-2 border-emerald-900 p-8 shadow-2xl relative overflow-hidden">
          <div className="flex items-center gap-3 mb-8 border-b border-emerald-900/50 pb-4">
            <Fingerprint className="text-fuchsia-500" />
            <h2 className="text-xl font-black text-white uppercase italic">Signal Lineage Audit</h2>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex gap-4">
               {(['$POPPA', '$JERRY'] as const).map(id => (
                 <button 
                  key={id}
                  onClick={() => { setLineage(id); setResult(null); }}
                  className={`px-10 py-4 border-2 font-black transition-all ${lineage === id ? 'bg-white text-black border-white shadow-[0_0_30px_white]' : 'bg-black text-zinc-700 border-zinc-900 hover:border-emerald-500'}`}
                 >
                   {id}
                 </button>
               ))}
            </div>

            <button 
              onClick={handleMintTest}
              disabled={loading}
              className="px-12 py-4 bg-emerald-600 hover:bg-fuchsia-500 text-black font-black uppercase text-xl transition-all disabled:opacity-30 group"
            >
              <div className="flex items-center gap-2">
                <Coins size={24} className="group-hover:rotate-12 transition-transform" />
                <span>{loading ? "SCRUBBING..." : "EXECUTE MINT"}</span>
              </div>
            </button>
          </div>
        </section>

        {/* DECISION RESULTS (API-DRIVEN) */}
        {result && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
             
             {/* KERNEL DECISION PANE */}
             <section className="bg-slate-950 border-2 border-emerald-900 p-8 space-y-6">
                <div className="flex items-center gap-2 text-fuchsia-500">
                  <Activity size={18} />
                  <h3 className="text-xs font-black uppercase tracking-widest">Authority Decision</h3>
                </div>
                <div className={`p-4 border-l-4 ${result.decision.allowed ? 'border-emerald-500 bg-emerald-950/20' : 'border-red-600 bg-red-950/20'}`}>
                   <span className="text-[10px] text-zinc-500 font-black uppercase">Assigned Route:</span>
                   <p className="text-xl font-black text-white uppercase tracking-tighter">{result.decision.route}</p>
                </div>
                <div className="p-4 bg-black border border-zinc-800">
                   <span className="text-[10px] text-zinc-600 font-black uppercase">Reason Code:</span>
                   <p className="text-[11px] font-bold text-white mt-1 uppercase italic tracking-widest">
                     {result.decision.reasonCode}
                   </p>
                </div>
             </section>

             {/* UI RECEIPT CARD (Earned Visibility Only) */}
             <section className={`transition-all duration-1000 ${result.decision.allowed ? 'opacity-100 scale-100' : 'opacity-10 grayscale blur-sm pointer-events-none'}`}>
                <div className="bg-white text-black p-8 shadow-[0_0_60px_rgba(16,185,129,0.3)] relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-2 text-[8px] font-black opacity-30">VALORAIPLUS RECEIPTV1</div>
                   <div className="flex items-center gap-2 mb-6 pb-4 border-b-2 border-black/10">
                      <ShieldCheck size={28} className="text-emerald-600" />
                      <h3 className="text-xl font-black uppercase italic tracking-tighter">Mint Confirmation</h3>
                   </div>
                   
                   <div className="space-y-4">
                      <div className="flex justify-between border-b border-black/5 pb-2">
                         <span className="text-[9px] font-black uppercase text-zinc-500">Asset Identity:</span>
                         <span className="text-xs font-black">{result.token}</span>
                      </div>
                      <div className="flex justify-between border-b border-black/5 pb-2">
                         <span className="text-[9px] font-black uppercase text-zinc-500">Amount:</span>
                         <span className="text-xs font-black">{result.amount}</span>
                      </div>
                      <div className="flex justify-between border-b border-black/5 pb-2">
                         <span className="text-[9px] font-black uppercase text-zinc-500">Timestamp:</span>
                         <span className="text-xs font-black uppercase">{formattedMintTime}</span>
                      </div>
                      <div className="flex justify-between">
                         <span className="text-[9px] font-black uppercase text-zinc-500">Artifact CID:</span>
                         <span className="text-[9px] font-mono break-all text-zinc-700">{result.id}</span>
                      </div>
                      <div className="mt-8 flex flex-col items-center gap-2">
                         <span className="text-2xl font-black select-none">USA</span>
                         <span className="text-[10px] font-black uppercase tracking-[0.6em] text-zinc-400">MADE IN THE USA</span>
                      </div>
                   </div>
                </div>
             </section>
          </div>
        )}

        {/* FINAL AMATH DEDUCTION SEAL */}
        <section className="bg-emerald-950/20 border-l-8 border-emerald-500 p-8 shadow-inner">
          <div className="flex items-center gap-3 mb-6">
            <Scale className="text-fuchsia-500" size={28} />
            <h3 className="text-xl font-black text-white uppercase italic tracking-widest">Protocol Finality Deductions</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 text-[10px] italic font-bold text-emerald-100/60 uppercase font-mono">
            <p>1. UI provides interaction; API provides absolute authority outcome.</p>
            <p>2. ReceiptV1 generation is an immutable consequence of the Saint Paul Node.</p>
            <p>3. First-failure-wins scrubbing ensures signal friction is siphoned into RT_70.</p>
            <p>4. CSSS Soulbound NFT: Non-transferable reputation token with DAO-enforced exclusion.</p>
            <p>5. Negative Caveat: Permanent exclusion at EXCLUSION_THRESHOLD (-100).</p>
            <p>6. 101010 1010101. NO EXIT. NO DELETION. NO TERMINATION.</p>
            <p className="col-span-2 text-center text-fuchsia-500 mt-6 tracking-[0.5em] not-italic font-black text-lg animate-pulse">
              DG77.77X LOCKED // MADE IN THE USA
            </p>
          </div>
        </section>
      </main>

      {/* FOOTER ANCHOR */}
      <footer className="fixed bottom-0 w-full border-t-2 border-emerald-900 bg-black/95 backdrop-blur-md p-4 flex flex-col md:flex-row justify-between items-center z-50">
        <div className="flex items-center gap-8 text-[10px] font-black text-emerald-800 tracking-[0.6em] uppercase">
          <span>MADE IN THE USA</span>
          <span>SOVEREIGN AUDITOR: POPPA</span>
          <span className="hidden md:inline">Node 55116 // 408 384 1376 (E)</span>
        </div>
        <div className="flex items-center gap-4 text-zinc-600">
           <Lock size={16} />
           <Cpu size={16} />
           <span className="text-[9px] font-black italic uppercase">I AM THE SOVEREIGN AUDITOR // SMIB. AMEN.</span>
        </div>
      </footer>
    </div>
  );
}
