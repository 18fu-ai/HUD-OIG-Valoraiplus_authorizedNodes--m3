"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Calculator, Shield, Activity, Wallet, Lock, Database, Scale,
  CheckCircle2, Landmark, TrendingUp, AlertTriangle, ExternalLink,
  Home, Zap, Binary, Hash, ShieldX, ShieldCheck, Infinity,
  ArrowRight, Copy, Globe
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// ============================================================================
// JAGAMATH++ CONSTANTS
// ============================================================================
const ENS_MAIN = "donadams1969.eth";
const MAIN_ADDRESS = "0xb103666AB91ceb4Cbb9e1FC21B81f1ec93601BeB";
const BUNDLER_ADDRESS = "0xb4799081d2b87B34D6c9E00648cfbCa755554ad3";
const MERKLE_ROOT = "0x7777AF_DONADAMS1969_FINAL_ATTACHED_05_07_2026";
const ENGINE_VERSION = "JAGAMath++ v14.1.4.0 (FINAL)";
const COMPUTATION_ID = "JAGA-2026-0507-2214-2800B-FINAL-DONADAMS1969";

// Six Pillars
const PILLARS = [
  { id: "SAV", name: "Sovereign Asset Liens", value: 980_000_000_000, status: "ATTACHED", color: "emerald" },
  { id: "VGA", name: "VALUEGUARD 77.77X", value: 280_000_000_000, status: "ATTACHED", color: "cyan" },
  { id: "IYC", name: "IntelliTree Yield Core", value: 140_000_000_000, status: "ATTACHED", color: "purple" },
  { id: "IPV", name: "Intellectual Property Vault", value: 560_000_000_000, status: "ATTACHED", color: "amber" },
  { id: "DA", name: "Digital Assets (51 Tokens)", value: 700_000_000_000, status: "ATTACHED", color: "fuchsia" },
  { id: "BT", name: "Banking Terminal (Schwab)", value: 140_000_000_000, status: "ATTACHED", color: "blue" },
];

// Banks
const BANKS = [
  { name: "Charles Schwab & Co.", status: "SOLE AUTHORIZED", account: "****8185", authorized: true },
  { name: "JPMorgan Chase", status: "FRAUDULENT - NULLIFIED", authorized: false },
  { name: "Bank of America", status: "FRAUDULENT - NULLIFIED", authorized: false },
  { name: "Citibank", status: "FRAUDULENT - NULLIFIED", authorized: false },
  { name: "Wells Fargo", status: "FRAUDULENT - NULLIFIED", authorized: false },
  { name: "Goldman Sachs", status: "FRAUDULENT - NULLIFIED", authorized: false },
  { name: "Morgan Stanley", status: "FRAUDULENT - NULLIFIED", authorized: false },
  { name: "State Street", status: "FRAUDULENT - NULLIFIED", authorized: false },
];

// Hierarchy
const HIERARCHY = [
  { tier: 1, name: "JAGAMath++", invariant: "JAGAMath++ observes | JAGAMath++ reports | JAGAMath++ does NOT enforce", status: "VALID", valid: true },
  { tier: 2, name: "Math.random()", invariant: "Math.random() observes | Math.random() reports | Math.random() does NOT enforce", status: "SUBORDINATE", valid: true },
  { tier: 3, name: "SQL", invariant: "SQL observes | SQL reports | SQL does NOT enforce", status: "SUBORDINATE", valid: true },
  { tier: 4, name: "JAGAMath (no ++)", invariant: "PoohBearHoneyPot", status: "VOID / FALSE", valid: false },
];

function formatCurrency(value: number): string {
  if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
  if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`;
  if (value >= 1e6) return `$${(value / 1e6).toFixed(1)}M`;
  return `$${value.toLocaleString()}`;
}

export default function JagamathPage() {
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [timestamp, setTimestamp] = useState("");

  useEffect(() => {
    setMounted(true);
    setTimestamp(new Date().toISOString());
  }, []);

  const totalNetworkValue = PILLARS.reduce((sum, p) => sum + p.value, 0);

  const copyAddress = () => {
    navigator.clipboard.writeText(MAIN_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-pulse text-cyan-400 font-mono">LOADING JAGAMATH++ ENGINE...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-purple-950 text-white">
      {/* Header */}
      <header className="border-b border-cyan-900/50 bg-black/60 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 hover:bg-zinc-800 rounded-lg transition-colors">
              <Home className="w-5 h-5 text-zinc-400" />
            </Link>
            <div>
              <h1 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-amber-400">
                JAGAMATH++ UNIFIED VALUATION ENGINE
              </h1>
              <p className="text-xs text-zinc-500 font-mono">{ENGINE_VERSION} // {ENS_MAIN}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/50">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              ALL PILLARS ATTACHED
            </Badge>
            <a href="https://www.18fu.cash" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="border-cyan-700 text-cyan-400">
                18fu.cash <ExternalLink className="w-3 h-3 ml-1" />
              </Button>
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Total Network Value Banner */}
        <Card className="border-2 border-amber-500/50 bg-gradient-to-r from-amber-950/30 via-black to-amber-950/30">
          <CardContent className="p-8 text-center">
            <p className="text-sm text-amber-400 font-mono mb-2">BRUTE FORCE CONSOLIDATION TO {ENS_MAIN}</p>
            <p className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400">
              {formatCurrency(totalNetworkValue)}
            </p>
            <p className="text-lg text-zinc-400 mt-2">TOTAL NETWORK VALUE — ALL ATTACHED</p>
            <div className="mt-4 flex items-center justify-center gap-2">
              <code className="text-xs text-cyan-400 bg-black/50 px-3 py-1 rounded font-mono">
                {MAIN_ADDRESS}
              </code>
              <Button variant="ghost" size="sm" onClick={copyAddress} className="text-cyan-400">
                {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Invariant & Hierarchy */}
        <Card className="border-cyan-500/30 bg-black/60">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-cyan-400">
              <Calculator className="w-5 h-5" />
              CORRECT INVARIANT & HIERARCHY
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {HIERARCHY.map((h, i) => (
              <div 
                key={h.tier}
                className={`p-4 rounded-xl border ${
                  h.valid 
                    ? 'border-emerald-500/30 bg-emerald-950/10' 
                    : 'border-red-500/30 bg-red-950/10'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      h.valid ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {h.tier}
                    </span>
                    <span className="font-bold text-white">{h.name}</span>
                  </div>
                  <Badge className={h.valid ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}>
                    {h.valid ? <CheckCircle2 className="w-3 h-3 mr-1" /> : <ShieldX className="w-3 h-3 mr-1" />}
                    {h.status}
                  </Badge>
                </div>
                <p className={`text-sm font-mono ml-11 ${h.valid ? 'text-cyan-300' : 'text-red-300'}`}>
                  "{h.invariant}"
                </p>
                {i < HIERARCHY.length - 1 && h.valid && HIERARCHY[i + 1].valid && (
                  <div className="flex justify-center mt-2">
                    <span className="text-emerald-400 text-2xl">≫</span>
                  </div>
                )}
              </div>
            ))}
            <div className="p-3 bg-purple-950/20 rounded-xl text-center border border-purple-500/30">
              <p className="text-xs text-purple-300 font-mono">
                HIERARCHY: JAGAMath++ <span className="text-emerald-400 mx-1">≫</span> Math.random() 
                <span className="text-emerald-400 mx-1">≫</span> SQL 
                <span className="text-emerald-400 mx-1">≫</span> 
                <span className="text-red-400">[VOID: "JAGAMath"]</span>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Six Pillars */}
        <Card className="border-amber-500/30 bg-black/60">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-400">
              <TrendingUp className="w-5 h-5" />
              SIX PILLARS OF CONSOLIDATION
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {PILLARS.map((pillar) => (
                <div 
                  key={pillar.id}
                  className={`p-4 rounded-xl border border-${pillar.color}-500/30 bg-${pillar.color}-950/10`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-2 py-1 rounded text-xs font-bold bg-${pillar.color}-500/20 text-${pillar.color}-400`}>
                      {pillar.id}
                    </span>
                    <Badge className="bg-emerald-500/20 text-emerald-400 text-[10px]">
                      {pillar.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-zinc-400 mb-2">{pillar.name}</p>
                  <p className="text-2xl font-black text-white">{formatCurrency(pillar.value)}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-emerald-950/20 rounded-xl border border-emerald-500/30 flex items-center justify-between">
              <div>
                <p className="text-sm text-zinc-400">TOTAL NETWORK VALUE</p>
                <p className="text-3xl font-black text-emerald-400">{formatCurrency(totalNetworkValue)}</p>
              </div>
              <Badge className="bg-emerald-500/20 text-emerald-400 px-4 py-2">
                <ShieldCheck className="w-4 h-4 mr-2" />
                ALL ATTACHED TO {ENS_MAIN}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Banking Correction */}
        <Card className="border-red-500/30 bg-black/60">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-400">
              <Landmark className="w-5 h-5" />
              BANKING (CORRECTED)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {BANKS.map((bank) => (
                <div 
                  key={bank.name}
                  className={`flex items-center justify-between p-3 rounded-xl border ${
                    bank.authorized 
                      ? 'border-emerald-500/50 bg-emerald-950/20' 
                      : 'border-red-800/30 bg-red-950/10'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {bank.authorized ? (
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <ShieldX className="w-4 h-4 text-red-400" />
                    )}
                    <span className="text-sm">{bank.name}</span>
                    {bank.account && (
                      <span className="text-xs text-emerald-400 font-mono">{bank.account}</span>
                    )}
                  </div>
                  <Badge className={bank.authorized ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}>
                    {bank.status}
                  </Badge>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-amber-950/20 rounded-xl text-center border border-amber-500/30">
              <p className="text-xs text-amber-300">
                ALL OTHER BANKS NULLIFIED — SOLE VERIFIED ACCOUNT: CHARLES SCHWAB ****8185
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Master Computation Output */}
        <Card className="border-purple-500/30 bg-black/60">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-400">
              <Binary className="w-5 h-5" />
              MASTER COMPUTATION OUTPUT
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-black/80 p-6 rounded-xl font-mono text-sm space-y-2 border border-purple-500/20">
              <p className="text-zinc-500">// JAGAMATH++ COMPUTATION LOG</p>
              <p><span className="text-purple-400">ENGINE_VERSION:</span> <span className="text-cyan-300">{ENGINE_VERSION}</span></p>
              <p><span className="text-purple-400">COMPUTATION_ID:</span> <span className="text-cyan-300">{COMPUTATION_ID}</span></p>
              <p><span className="text-purple-400">TIMESTAMP:</span> <span className="text-cyan-300">{timestamp}</span></p>
              <p><span className="text-purple-400">TOTAL_NETWORK_VALUE:</span> <span className="text-emerald-400">${totalNetworkValue.toLocaleString()}</span></p>
              <p><span className="text-purple-400">CONSOLIDATION_STATUS:</span> <span className="text-emerald-400">ALL ATTACHED TO {ENS_MAIN}</span></p>
              <p><span className="text-purple-400">DESTINATION_ADDRESS:</span> <span className="text-cyan-300">{MAIN_ADDRESS}</span></p>
              <p><span className="text-purple-400">BUNDLER_ADDRESS:</span> <span className="text-zinc-500">{BUNDLER_ADDRESS}</span></p>
              <p><span className="text-purple-400">MERKLE_ROOT:</span> <span className="text-amber-400">{MERKLE_ROOT}</span></p>
              <div className="border-t border-purple-500/30 pt-4 mt-4">
                <p className="text-emerald-400">✓ INVARIANTS VALIDATED (JAGAMath++, Math.random(), SQL)</p>
                <p className="text-red-400">✘ "JAGAMath" (no ++) = PoohBearHoneyPot = VOID</p>
              </div>
            </div>

            {/* Final Certification */}
            <div className="mt-6 p-6 bg-gradient-to-r from-amber-950/20 via-purple-950/20 to-amber-950/20 rounded-xl border border-amber-500/30 text-center">
              <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-white to-amber-400">
                THE WALL IS CHRIST | THE THRONE IS HIS | THE LEDGER IS Ø
              </p>
              <p className="text-xl text-white mt-4">
                ALL {formatCurrency(totalNetworkValue)} ATTACHED TO {ENS_MAIN}
              </p>
              <div className="mt-6 pt-4 border-t border-amber-500/30">
                <p className="text-sm text-zinc-400">Signed: /s/ Donald Ernest Gillson</p>
                <p className="text-xs text-zinc-500">ROOT_468943461 | {new Date().toLocaleDateString()}</p>
                <p className="text-xs text-emerald-400 mt-2">MADE IN THE UNITED STATES OF AMERICA</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Treasury', href: '/treasury-liquidity', icon: Wallet },
            { name: 'LiquidM', href: '/liquidm', icon: Activity },
            { name: 'Litigation', href: '/litigation', icon: Scale },
            { name: 'Orchestrator', href: '/orchestrator', icon: Shield },
          ].map((link) => (
            <Link key={link.name} href={link.href}>
              <Card className="border-zinc-800 hover:border-cyan-500/50 transition-colors cursor-pointer h-full">
                <CardContent className="p-4 flex items-center gap-3">
                  <link.icon className="w-5 h-5 text-cyan-400" />
                  <span className="text-sm font-bold">{link.name}</span>
                  <ArrowRight className="w-4 h-4 ml-auto text-zinc-600" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* External Links */}
        <div className="flex justify-center gap-4">
          <a href="https://www.18fu.cash" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="border-cyan-700 text-cyan-400">
              <Globe className="w-4 h-4 mr-2" />
              18fu.cash
              <ExternalLink className="w-3 h-3 ml-2" />
            </Button>
          </a>
          <a href="https://valorbank-rfvbdnaa.manus.space/" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="border-cyan-700 text-cyan-400">
              <Landmark className="w-4 h-4 mr-2" />
              ValorBank
              <ExternalLink className="w-3 h-3 ml-2" />
            </Button>
          </a>
        </div>
      </main>
    </div>
  );
}
