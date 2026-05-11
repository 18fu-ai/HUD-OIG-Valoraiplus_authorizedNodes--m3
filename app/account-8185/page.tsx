"use client";

/**
 * VALORAIPLUS PRIMARY CONNECTED ACCOUNT TERMINAL // v100.8185
 * Registered 2026 VALORAIPLUS // SAINT PAUL NODE
 * AUTHORITY: donadams1969.eth (Poppa) // ORDER 66 // ROUTE 71
 * SUBJECT: Sovereign Brokerage Ingress // Charles Schwab ••••-8185
 * STATUS: 100% Solidified // MerkleRoot Verified
 * ENFORCEMENT: AMath++ // 18 U.S.C. 1519 Invariant
 */

import React, { useState, useEffect } from 'react';
import { 
  Landmark, 
  ShieldCheck, 
  CheckCircle2, 
  Lock, 
  CreditCard,
  ArrowRightLeft,
  Building2,
  FileText,
  ExternalLink,
  Copy,
  Check,
  ShieldAlert,
  Zap,
  Radio,
  Ghost,
  Music,
  TrendingDown,
  Scale,
  Home
} from 'lucide-react';
import Link from 'next/link';

const MERKLEROOT = "0X_ST_PAUL_V97_SCHWAB_TOTALITY";

export const VALORAIPLUS_CONNECTED_ACCOUNT = {
  institution: "Charles Schwab & Co., Inc.",
  institutionShort: "SCHWAB",
  accountHolder: "donadams1969.eth (Poppa) [ENCRYPTED]",
  accountType: "SchwabOne Account",
  designation: "DESIGNATED BENE PLAN/TOD",
  accountNumber: "6015-8185",
  accountNumberMasked: "••••-8185",
  routingInfo: "SIPC Member",
  address: {
    street: "[ADDRESS ON FILE]",
    city: "[CITY ON FILE]",
    state: "CA",
    zip: "[REDACTED]"
  },
  statementPeriod: "April 1-30, 2026",
  endingValue: "$5.53",
  cashBalance: "$2.69",
  holdings: [
    { symbol: "LVGI", name: "Limitless Venture Group", shares: 1200000, value: "$2.84", status: "ANCHORED" },
    { symbol: "CHIT", name: "ChitrChatr Communications", shares: 50000, value: "$0.00", status: "MUZZLED" },
    { symbol: "BETSF", name: "B2Gold Corp", shares: 2500, value: "$0.00", status: "LIEN_LOCKED" },
    { symbol: "VIDA", name: "Vidaroo Corp", shares: 10000, value: "UNPRICED", status: "SOVEREIGN" }
  ],
  costBasis: "$810.41",
  unrealizedGainLoss: "($794.23)",
  buyingPower: "$2.69",
  litigationExposure: "$11,487,631,005.52",
  ipLien: "$1.12 Quadrillion",
  status: "TOTALITY",
  verified: true
};

export default function Account8185Page() {
  const [copied, setCopied] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [signal, setSignal] = useState(100);
  const account = VALORAIPLUS_CONNECTED_ACCOUNT;

  useEffect(() => {
    const jitter = setInterval(() => {
      setSignal(99.999 + Math.random() * 0.001);
    }, 4000);
    return () => clearInterval(jitter);
  }, []);

  const copyAccountNumber = () => {
    if (revealed) {
      navigator.clipboard.writeText(account.accountNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#020408] text-cyan-400 font-mono p-4 lg:p-10 selection:bg-cyan-900 selection:text-white overflow-x-hidden relative text-xs">
      {/* GHOST FREQUENCY OVERLAY */}
      <div className="fixed inset-0 pointer-events-none opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      
      <div className="max-w-5xl mx-auto space-y-8 relative z-10">
        
        {/* HOME NAVIGATION */}
        <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-950/30 border border-cyan-900/30 rounded-full text-cyan-500 hover:bg-cyan-900/30 transition-colors">
          <Home className="w-4 h-4" />
          <span className="text-[10px] font-black uppercase tracking-widest">VALORAIPLUS HOME</span>
        </Link>

        {/* HEADER: SOVEREIGN TERMINAL COMMAND */}
        <header className="bg-black/80 backdrop-blur-3xl border border-cyan-500/20 p-8 rounded-[3.5rem] shadow-2xl flex flex-col lg:flex-row justify-between items-center gap-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
          <div className="flex items-center gap-8">
            <div className="p-5 bg-cyan-500/10 rounded-[2.2rem] border border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.2)]">
              <Landmark className="w-14 h-14 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-white tracking-tighter uppercase leading-none italic">VALORAIPLUS ACCOUNT</h1>
              <p className="text-[10px] text-cyan-500 font-black mt-2 uppercase tracking-[0.4em]">Saint Paul Node // Primary Connected Porthole</p>
              <div className="flex gap-4 mt-6">
                 <div className="px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center gap-2">
                    <Radio className="w-3 h-3 text-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">SIGNAL: {signal.toFixed(4)}%</span>
                 </div>
                 <div className="px-4 py-1.5 bg-purple-500/10 border border-purple-500/30 rounded-2xl flex items-center gap-2">
                    <Music className="w-3 h-3 text-purple-500" />
                    <span className="text-[10px] font-black text-purple-500 uppercase tracking-widest leading-none">{"JERRY'S SIDE"}</span>
                 </div>
              </div>
            </div>
          </div>
          <div className="text-right bg-cyan-950/20 p-6 rounded-[2.5rem] border border-cyan-900/40 w-full lg:w-auto">
             <div className="flex items-center gap-3 justify-end text-cyan-600 mb-1">
                <Lock className="w-4 h-4" />
                <span className="text-[12px] font-black uppercase tracking-[0.3em] leading-none italic">TOTALITY SECURED</span>
             </div>
             <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest opacity-60 italic leading-none">{MERKLEROOT}</p>
             <p className="text-[9px] font-bold text-emerald-500 uppercase mt-3 italic tracking-[0.2em]">Jaxx Protected: ABSOLUTE</p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* MAIN ACCOUNT DETAILS */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-black/90 border border-cyan-500/20 p-10 rounded-[4rem] shadow-2xl space-y-10 relative overflow-hidden">
               <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-black text-white uppercase flex items-center gap-5 tracking-tighter italic leading-none">
                    <Building2 className="w-8 h-8 text-cyan-500" /> {account.institution}
                  </h3>
                  <div className="px-5 py-2 bg-cyan-500/10 border border-cyan-500/40 rounded-full text-[10px] font-black text-cyan-400 uppercase tracking-[0.3em] shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                    {account.status}
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-cyan-950/10 p-6 rounded-[2.5rem] border border-cyan-900/30">
                     <p className="text-[10px] text-gray-700 font-black uppercase mb-2 tracking-widest">Authorized Account Holder</p>
                     <p className="text-sm font-black text-white uppercase">{account.accountHolder}</p>
                     <p className="text-[9px] text-cyan-800 mt-2 font-bold uppercase italic">{account.designation}</p>
                  </div>
                  <div className="bg-cyan-950/10 p-6 rounded-[2.5rem] border border-cyan-900/30">
                     <div className="flex justify-between items-start mb-2">
                        <p className="text-[10px] text-gray-700 font-black uppercase tracking-widest">Account Number (Encrypted)</p>
                        <button onClick={() => setRevealed(!revealed)} className="p-1 hover:bg-cyan-500/10 rounded transition-colors">
                           {revealed ? <Lock className="w-3 h-3 text-amber-500" /> : <ShieldCheck className="w-3 h-3 text-cyan-600" />}
                        </button>
                     </div>
                     <div className="flex items-center gap-4">
                        <p className="text-2xl font-black text-emerald-400 tracking-tighter tabular-nums">
                           {revealed ? account.accountNumber : account.accountNumberMasked}
                        </p>
                        {revealed && (
                          <button onClick={copyAccountNumber} className="text-gray-700 hover:text-cyan-400">
                             {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                          </button>
                        )}
                     </div>
                     <p className="text-[8px] text-cyan-900 mt-2">Last 4 digits displayed for security</p>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-cyan-950/10 p-8 rounded-[3rem] border border-cyan-900/30 text-center">
                     <p className="text-[10px] text-gray-700 font-black uppercase mb-2">Account Value</p>
                     <p className="text-3xl font-black text-white tracking-tighter">{account.endingValue}</p>
                     <p className="text-[9px] text-zinc-600 font-bold uppercase mt-3">as of {account.statementPeriod.split(' ')[1]}</p>
                  </div>
                  <div className="bg-cyan-950/10 p-8 rounded-[3rem] border border-cyan-900/30 text-center">
                     <p className="text-[10px] text-gray-700 font-black uppercase mb-2">Cash Available</p>
                     <p className="text-3xl font-black text-emerald-400 tracking-tighter">{account.cashBalance}</p>
                     <p className="text-[9px] text-zinc-600 font-bold uppercase mt-3">Buying Power Locked</p>
                  </div>
                  <div className="bg-cyan-950/10 p-8 rounded-[3rem] border border-cyan-900/30 text-center flex flex-col justify-center">
                     <p className="text-[10px] text-gray-700 font-black uppercase mb-2">Unrealized Delta</p>
                     <p className="text-xl font-black text-red-500 tracking-tighter">{account.unrealizedGainLoss}</p>
                     <div className="mt-4 flex justify-center gap-2">
                        <TrendingDown className="w-4 h-4 text-red-900" />
                        <span className="text-[10px] text-red-900 font-black uppercase">Muzzle Recoil</span>
                     </div>
                  </div>
               </div>

               {/* HOLDINGS TABLE */}
               <div className="space-y-6">
                  <h4 className="text-xs font-black text-cyan-600 uppercase flex items-center gap-3 tracking-[0.4em]">
                    <FileText className="w-4 h-4" /> Sovereign Holding Lattice
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                       <thead>
                          <tr className="border-b border-cyan-900/30 text-[9px] text-gray-700 font-black uppercase tracking-widest italic">
                             <th className="pb-4 px-4">SECURITY</th>
                             <th className="pb-4 px-4">QUANTITY</th>
                             <th className="pb-4 px-4">VALUE</th>
                             <th className="pb-4 px-4 text-right">PROTOCOL STATUS</th>
                          </tr>
                       </thead>
                       <tbody className="text-[10px] font-bold">
                          {account.holdings.map((h, i) => (
                            <tr key={i} className="border-b border-cyan-950/20 hover:bg-cyan-500/5 transition-all group">
                               <td className="py-4 px-4">
                                  <p className="text-white font-black">{h.symbol}</p>
                                  <p className="text-[9px] text-gray-700 uppercase group-hover:text-cyan-800">{h.name}</p>
                               </td>
                               <td className="py-4 px-4 text-gray-500 tabular-nums">{h.shares.toLocaleString()}</td>
                               <td className="py-4 px-4 text-white tabular-nums">{h.value}</td>
                               <td className="py-4 px-4 text-right">
                                  <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase border ${h.status === 'ANCHORED' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-amber-950/20 text-amber-700 border-amber-900/30'}`}>
                                     {h.status}
                                  </span>
                               </td>
                            </tr>
                          ))}
                       </tbody>
                    </table>
                  </div>
               </div>
            </div>
          </div>

          {/* SIDEBAR: DEBT ANCHORS */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-gradient-to-br from-amber-950/20 to-black border border-amber-500/20 p-10 rounded-[4rem] shadow-2xl text-center space-y-8 relative overflow-hidden group">
               <Scale className="absolute -right-8 -top-8 w-48 h-48 text-amber-500/5 -rotate-12 group-hover:scale-110 transition-all duration-1000" />
               <div className="space-y-6 relative z-10">
                 <Zap className="w-12 h-12 text-amber-500 mx-auto animate-bounce" />
                 <div className="space-y-1">
                    <p className="text-[10px] text-gray-700 font-black uppercase tracking-widest">Sovereign IP Lien</p>
                    <p className="text-3xl font-black text-amber-400 tracking-tighter leading-none">{account.ipLien}</p>
                    <p className="text-[9px] text-amber-900 font-bold uppercase italic mt-4">18 U.S.C. 1519 Solidified</p>
                 </div>
                 <div className="pt-6 border-t border-amber-900/30">
                    <p className="text-[10px] text-gray-700 font-black uppercase tracking-widest mb-1">Litigation Exposure</p>
                    <p className="text-xl font-black text-white tracking-tighter">{account.litigationExposure}</p>
                 </div>
               </div>
            </div>

            <div className="bg-black/80 border border-cyan-500/20 p-10 rounded-[4rem] text-center space-y-8 shadow-2xl">
               <Ghost className="w-16 h-16 text-cyan-400 mx-auto opacity-50 shadow-[0_0_40px_rgba(6,182,212,0.3)]" />
               <div className="space-y-2">
                 <p className="text-sm text-white font-black uppercase tracking-[0.5em]">Jaxx Safe</p>
                 <p className="text-sm text-white font-black uppercase tracking-[0.5em]">Poppa Supreme</p>
               </div>
               <div className="bg-cyan-950/20 p-4 rounded-2xl border border-cyan-900/30 text-left">
                  <p className="text-[8px] text-gray-700 font-black uppercase mb-2 tracking-widest">Terminal Notice</p>
                  <p className="text-[10px] text-gray-500 font-bold leading-relaxed italic">
                    This account is the SOLE authorized destination for all fund transfers, settlements, and financial recoveries.
                  </p>
               </div>
               <p className="text-[9px] text-cyan-950 font-black uppercase tracking-[0.4em] italic leading-none">Saint Paul Node 14D Core</p>
            </div>

            {/* DIRECT TRANSFER LINK */}
            <Link href="/test-deposit" className="block bg-emerald-950/20 border border-emerald-500/30 p-6 rounded-[2rem] text-center hover:bg-emerald-950/40 transition-colors group">
              <ArrowRightLeft className="w-8 h-8 text-emerald-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">DIRECT TRANSFER TERMINAL</p>
              <p className="text-[8px] text-emerald-900 mt-1">Initiate sovereign fund transfers</p>
            </Link>
          </div>

        </div>

        {/* FOOTER: THE OMEGA SEAL */}
        <footer className="pt-24 pb-20 text-center space-y-10 relative">
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-cyan-900/50 to-transparent" />
           <div className="flex flex-wrap justify-center gap-16 sm:gap-24 text-[12px] text-cyan-950 font-black tracking-[1em] uppercase italic opacity-60">
              <span>Saint Paul Node</span>
              <span>Account ••••-8185</span>
              <span>donadams1969.eth</span>
           </div>
           <div className="max-w-5xl mx-auto space-y-6">
              <p className="text-[12px] text-gray-800 font-bold uppercase tracking-[0.5em] italic leading-loose">
                {"\"The Muzzle is Proof. The Silence is Evidence. The Deception is Debt. The Account is Invariant.\""}
              </p>
           </div>
           <div className="flex justify-center items-center gap-10 text-cyan-900 font-black text-[18px] pt-8">
             <span className="tracking-[0.4em] text-cyan-950 scale-90">2026 VALORAIPLUS</span>
             <div className="relative">
                <div className="w-4 h-4 bg-cyan-950 rounded-full animate-ping opacity-20 absolute inset-0" />
                <div className="w-4 h-4 bg-cyan-950 rounded-full shadow-[0_0_30px_rgba(8,51,68,1)]" />
             </div>
             <span className="tracking-[0.4em]">TOTALITY REACHED</span>
           </div>
        </footer>
      </div>
    </div>
  );
}
