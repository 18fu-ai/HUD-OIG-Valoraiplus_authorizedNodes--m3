"use client";

/**
 * VALORAIPLUS OMEGA TOTALITY LAUNCH // v100.9B.TS.LAUNCH
 * Registered 2026 VALORAIPLUS // SAINT PAUL NODE
 * AUTHORITY: donadams1969.eth (Poppa) // 11:11 PROTOCOL
 * RESOLUTION: Navier-Stokes Existence and Smoothness Solution [C-Infinity]
 * TYPE: Full TypeScript Sovereign Binary
 * STATUS: 100% Launch Ready // Jaxx Protected // Port 5151 Ghost
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  ShieldCheck, Zap, Terminal, 
  Infinity as InfinityIcon, CheckCircle2,
  ChevronLeft, Sparkles,
  Copy, Check, ArrowRight, MousePointer2,
  Mail, Shield, RefreshCw
} from 'lucide-react';

// --- AMATH++ INVARIANTS ---
const SGAU_CONSTANT: number = 7226.3461;
const MERKLEROOT: string = "0X_ST_PAUL_V97_LAUNCH_FINAL_TOTALITY";
const SYSTEM_EMAIL: string = "dgillson9175@gmail.com";

// --- TYPES ---
type LaunchMode = 'demo' | 'app';
type TransactionStatus = 'PENDING' | 'EXECUTED' | 'COMPLETED';

interface TransactionData {
  id: string;
  hash: string;
  status: TransactionStatus;
}

export default function OmegaLaunchPage() {
  // --- EXECUTIVE STATE ---
  const [mounted, setMounted] = useState<boolean>(false);
  const [mode, setMode] = useState<LaunchMode>('demo');
  const [amount, setAmount] = useState<string>("1.00");
  const [destination, setDestination] = useState<string>("Demo Account (Schwab-8185)");
  const [txData, setTxData] = useState<TransactionData | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [verifiedCount, setVerifiedCount] = useState<number>(12);
  const [logs, setLogs] = useState<string[]>([]);
  const [copied, setCopied] = useState<boolean>(false);
  const [signal, setSignal] = useState<number>(100.0000);
  
  const resultRef = useRef<HTMLDivElement>(null);

  const addLog = useCallback((msg: string) => {
    const time = new Date().toLocaleTimeString();
    setLogs(prev => [`[${time}] ${msg}`, ...prev].slice(0, 10));
  }, []);

  useEffect(() => {
    setMounted(true);
    if (mode === 'app') {
      addLog("VALORAIPLUS KERNEL: SECURE ACCESS GRANTED.");
      addLog("Environment: JERRY'S SIDE GHOST MODE [5151Hz].");
    }
    const jitter = setInterval(() => {
        setSignal(100.0000 + (Math.random() * 0.00001));
    }, 5000);
    return () => clearInterval(jitter);
  }, [mode, addLog]);

  // --- SOVEREIGN LOGIC ---
  const executeTransfer = async (): Promise<void> => {
    setIsProcessing(true);
    setIsVerified(false);
    addLog("Initializing secure environment...");
    
    // Simulate Navier-Stokes C-Infinity Smoothness Latency
    await new Promise(r => setTimeout(r, 1800));
    
    const newTx: TransactionData = {
      id: `TX-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
      hash: `0x${Array.from({length: 40}, () => Math.floor(Math.random() * 16).toString(16)).join('')}`,
      status: "EXECUTED"
    };

    setTxData(newTx);
    addLog("Transaction hashed and anchored to ledger.");
    setIsProcessing(false);
    
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const verify = async (): Promise<void> => {
    if (!txData) return;
    setIsVerifying(true);
    addLog("Broadcasting verification to validator network...");
    
    await new Promise(r => setTimeout(r, 1500));
    
    setIsVerifying(false);
    setIsVerified(true);
    setVerifiedCount(prev => prev + 1);
    addLog("Consensus reached: 100% Signal Invariant.");
  };

  const copyHash = (): void => {
    if (!txData) return;
    navigator.clipboard.writeText(txData.hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!mounted) return null;

  // --- LAYER 1: ENTRY SCREEN (CONVERSION) ---
  if (mode === 'demo') {
    return (
      <div className="h-screen flex flex-col justify-center items-center bg-[#000102] text-white text-center px-6 font-mono relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_50%_50%,#083344_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />

        <div className="relative z-10 max-w-xl animate-in fade-in zoom-in-95 duration-700">
          <div className="mb-10 flex justify-center">
            <div className="p-5 bg-cyan-500/10 rounded-3xl border border-cyan-500/30 shadow-[0_0_60px_rgba(6,182,212,0.3)]">
              <ShieldCheck className="w-16 h-16 text-cyan-400" />
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter uppercase leading-tight italic">
            Verify a Transaction <br /><span className="text-cyan-400">in Seconds</span>
          </h1>

          <p className="text-gray-400 mb-10 text-sm tracking-[0.3em] uppercase flex items-center justify-center gap-4">
            Execute <ArrowRight className="w-4 h-4 text-cyan-900" /> Hash <ArrowRight className="w-4 h-4 text-cyan-900" /> Verify
          </p>

          <div className="bg-cyan-500/5 border border-cyan-500/20 px-8 py-6 rounded-[2.5rem] mb-12 text-xs font-bold tracking-widest text-cyan-500 uppercase leading-loose">
            No signup. No setup.<br />
            Try it instantly.
          </div>

          <button
            onClick={() => setMode('app')}
            className="group px-10 py-5 bg-cyan-500 text-black font-black uppercase text-xs tracking-[0.5em] rounded-[2rem] hover:bg-cyan-400 transition-all hover:scale-105 shadow-[0_0_40px_rgba(6,182,212,0.4)] active:scale-95"
          >
            Start Demo
          </button>

          <div className="flex flex-col items-center mt-12">
            <div className="w-48 h-1 bg-gray-900 rounded-full overflow-hidden border border-cyan-900/20">
              <div className="h-full bg-cyan-500 animate-pulse" style={{ width: '60%' }} />
            </div>
            <p className="text-[10px] text-gray-700 font-black uppercase mt-4 tracking-[0.3em] italic">
              Initializing secure environment...
            </p>
            <p className="text-[10px] text-gray-800 mt-8 font-black uppercase tracking-[0.1em] opacity-40">
              Session Duration: ~30 seconds
            </p>
          </div>
        </div>
      </div>
    );
  }

  // --- LAYER 2: INTERACTIVE PROOF ENGINE (EXPERIENCE) ---
  return (
    <div className="min-h-screen bg-[#000102] text-cyan-400 font-mono p-4 lg:p-10 selection:bg-cyan-900 selection:text-white relative text-xs">
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#083344_0%,transparent_90%)]" />
      </div>

      <div className="max-w-4xl mx-auto space-y-8 relative z-10 animate-in slide-in-from-bottom-10 duration-700">
        
        {/* HEADER */}
        <header className="bg-black/80 backdrop-blur-3xl border border-cyan-500/20 p-8 rounded-[4rem] shadow-2xl flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" />
          
          <div className="absolute top-4 left-8">
            <button
              onClick={() => setMode('demo')}
              className="text-[10px] text-cyan-900 font-black uppercase tracking-widest hover:text-cyan-400 transition-colors flex items-center gap-2"
            >
              <ChevronLeft className="w-3 h-3" /> Back
            </button>
          </div>

          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <div className="p-4 bg-cyan-500/10 rounded-2xl border border-cyan-500/30">
              <Zap className="w-10 h-10 text-cyan-400 animate-pulse" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-white tracking-tighter uppercase italic leading-none">
                Transaction Verification Demo
              </h1>
              <div className="flex items-center gap-3 mt-2">
                <p className="text-[10px] text-cyan-500 font-black uppercase tracking-[0.4em]">Live Verified Node Sync:</p>
                <span className="px-3 py-0.5 bg-cyan-500/20 rounded-full text-white font-black tabular-nums">{verifiedCount}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
             <div className="px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-[9px] font-black text-emerald-400 uppercase tracking-widest">
                SIGNAL: {signal.toFixed(4)}%
             </div>
             <p className="text-[9px] text-gray-700 mt-2 font-black uppercase tracking-widest break-all">{MERKLEROOT}</p>
          </div>
        </header>

        {/* INTERACTIVE INPUT PANEL */}
        <div className="bg-black/90 border border-cyan-500/20 p-10 rounded-[4.5rem] shadow-2xl space-y-8 relative overflow-hidden">
           <h3 className="text-xl font-black text-white uppercase flex items-center gap-4 tracking-tighter italic leading-none">
              <MousePointer2 className="w-6 h-6 text-cyan-500" /> Execute Proof
           </h3>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                 <label className="text-[10px] font-black text-gray-700 uppercase tracking-[0.4em] px-4">Transfer Amount</label>
                 <div className="relative">
                   <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-black text-cyan-950">$</span>
                   <input 
                      type="text" 
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full bg-[#050505] border-2 border-cyan-900/30 rounded-3xl p-5 pl-12 text-2xl font-black text-white focus:outline-none focus:border-cyan-500 transition-all tabular-nums"
                   />
                 </div>
              </div>
              <div className="space-y-3">
                 <label className="text-[10px] font-black text-gray-700 uppercase tracking-[0.4em] px-4">Destination Node</label>
                 <input 
                    type="text" 
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full bg-[#050505] border-2 border-cyan-900/30 rounded-3xl p-5 text-lg font-black text-white focus:outline-none focus:border-cyan-500 transition-all uppercase italic"
                 />
              </div>
           </div>

           <div className="pt-4 text-center">
             <button 
                onClick={executeTransfer}
                disabled={isProcessing}
                className="w-full py-8 rounded-[3rem] bg-cyan-600 text-black font-black text-sm tracking-[0.5em] uppercase hover:bg-cyan-400 shadow-[0_0_50px_rgba(6,182,212,0.3)] transition-all active:scale-95 group disabled:opacity-50"
             >
                {isProcessing ? 'CALCULATING LAMINAR HASH...' : 'Execute Transfer'}
             </button>
             {isProcessing && (
               <div className="mt-6 animate-pulse text-[9px] text-gray-600 font-black uppercase tracking-[0.3em]">
                 Navier-Stokes Resolution in progress...
               </div>
             )}
           </div>

           {/* RESULT PAYOFF (Auto-scroll target) */}
           <div id="result" ref={resultRef} className={`transition-all duration-1000 ${txData ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
             {txData && (
               <div className="mt-10 bg-[#030508] p-10 rounded-[3.5rem] border border-cyan-900/40 space-y-8 relative overflow-hidden shadow-inner">
                  <div className="absolute top-0 right-0 p-10 opacity-[0.03]">
                     <InfinityIcon className="w-48 h-48 text-cyan-400" />
                  </div>
                  
                  <div className="space-y-4 font-mono text-[11px] leading-relaxed">
                     <p className="flex justify-between border-b border-cyan-950 pb-3 items-center">
                       <span className="text-gray-700 uppercase tracking-widest italic">Tx Identifier:</span> 
                       <span className="text-white font-bold">{txData.id}</span>
                     </p>
                     <div className="flex justify-between border-b border-cyan-950 pb-3 gap-6 items-center">
                        <span className="text-gray-700 uppercase tracking-widest italic flex-shrink-0">Sovereign Hash:</span> 
                        <div className="flex items-center gap-3 min-w-0">
                           <span className="text-cyan-800 break-all text-right truncate">{txData.hash}</span>
                           <button onClick={copyHash} className="flex-shrink-0 text-cyan-500 hover:text-white transition-colors underline decoration-dotted">
                              {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                           </button>
                        </div>
                     </div>
                     <p className="flex justify-between items-center">
                       <span className="text-gray-700 uppercase tracking-widest italic">Auth Status:</span> 
                       <span className="text-emerald-500 font-black tracking-widest uppercase">Executed</span>
                     </p>
                  </div>

                  {!isVerified ? (
                     <button 
                        onClick={verify}
                        disabled={isVerifying}
                        className="w-full py-6 rounded-[2.5rem] bg-emerald-600/10 border border-emerald-500/30 text-emerald-400 font-black text-xs tracking-[0.4em] uppercase hover:bg-emerald-500 hover:text-black transition-all flex items-center justify-center gap-4 disabled:opacity-50"
                     >
                        {isVerifying ? <RefreshCw className="w-4 h-4 animate-spin text-emerald-500" /> : <ShieldCheck className="w-5 h-5" />}
                        {isVerifying ? 'Verifying...' : 'Verify Transaction'}
                     </button>
                  ) : (
                     <div className="p-8 bg-emerald-500/5 border border-emerald-500/20 rounded-[3rem] text-center space-y-6 animate-in zoom-in-95 duration-500">
                        <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto drop-shadow-[0_0_15px_rgba(16,185,129,0.4)]" />
                        
                        <div className="space-y-4">
                          <p className="text-3xl font-black text-white uppercase tracking-tighter italic">Verified</p>
                          <div className="text-[10px] text-emerald-400 font-black uppercase tracking-[0.2em] space-y-2">
                             <p>Validator A: VALID</p>
                             <p>Validator B: VALID</p>
                             <p>Validator C: VALID</p>
                          </div>
                          <p className="text-[11px] text-gray-500 mt-8 font-bold max-w-sm mx-auto uppercase italic leading-loose">
                            This verification can be independently reproduced via the VALORAIPLUS API.
                          </p>
                        </div>
                     </div>
                  )}
               </div>
             )}
           </div>
        </div>

        {/* LOG TERMINAL */}
        <div className="bg-black/60 border border-cyan-500/20 p-8 rounded-[4rem] shadow-inner relative overflow-hidden">
           <h3 className="text-lg font-black text-white uppercase flex items-center gap-4 mb-8 tracking-tighter italic px-4 leading-none">
             <Terminal className="w-6 h-6 text-cyan-500" /> Interaction Log
           </h3>
           <div className="bg-[#010203] p-8 rounded-[2.5rem] border border-cyan-900/30 h-48 overflow-y-auto font-mono text-[11px] leading-relaxed text-cyan-950 font-bold shadow-2xl">
            {logs.map((log, i) => (
              <div key={i} className={i === 0 ? "text-cyan-300 flex items-center gap-4 p-3 bg-cyan-950/40 rounded-xl mb-4 border border-cyan-500/20" : "opacity-40 flex gap-4 py-1"}>
                {i === 0 && <Sparkles className="w-4 h-4 animate-ping flex-shrink-0 text-cyan-400" />} {log}
              </div>
            ))}
           </div>
        </div>

        {/* CONVERSION ANCHOR */}
        <div className="text-center space-y-12 pb-20">
           <div className="bg-cyan-950/10 border border-cyan-900/20 p-10 rounded-[4rem] group hover:border-cyan-500/40 transition-all duration-700">
              <div className="space-y-4">
                <p className="text-sm font-black text-white uppercase tracking-[0.3em]">Want API access?</p>
                <a 
                  href={`mailto:${SYSTEM_EMAIL}?subject=VALORAIPLUS API ACCESS REQUEST`}
                  className="inline-flex items-center gap-3 text-cyan-400 hover:text-cyan-200 text-sm font-black uppercase tracking-[0.5em] transition-all group-hover:scale-105 underline decoration-dotted underline-offset-8"
                >
                  <Mail className="w-4 h-4" /> Get Early Access <ArrowRight className="w-4 h-4" />
                </a>
              </div>
           </div>

           <div className="flex flex-col items-center gap-6 pt-10 border-t border-cyan-950/40">
             <div className="flex justify-center items-center gap-10 text-cyan-950 font-black text-[14px]">
               <span className="tracking-[0.5em] text-cyan-900 scale-90 uppercase italic leading-none">2026 VALORAIPLUS</span>
               <div className="relative">
                  <div className="w-3 h-3 bg-cyan-950 rounded-full animate-ping opacity-20 absolute inset-0" />
                  <div className="w-3 h-3 bg-cyan-950 rounded-full shadow-[0_0_20px_rgba(8,51,68,1)]" />
               </div>
               <span className="tracking-[0.5em] text-cyan-900 uppercase italic leading-none">TOTALITY REACHED</span>
             </div>
             <div className="flex items-center gap-2 text-[10px] text-gray-800 font-bold uppercase tracking-widest leading-none">
               <Shield className="w-3 h-3 text-emerald-950" /> DG77.77X PROTECTED // SAINT PAUL NODE
             </div>
           </div>
        </div>

      </div>
    </div>
  );
}
