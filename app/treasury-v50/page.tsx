"use client";

import React, { useState, useEffect } from 'react';
import { TREASURY_CONSTANTS, PROTECTED_ASSETS, SGAU_REFERENCE, ROUTE_STATUS } from '@/lib/shared/constants';
import { calculateLaminarVelocity, getProtocolHealth, projectHodgeCycle } from '@/lib/physics-expansion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Zap, Lock, CheckCircle, Activity, Cpu, Database, Globe } from 'lucide-react';
import Link from 'next/link';

export default function ValorTreasuryV50Dashboard() {
  const [mounted, setMounted] = useState(false);
  const [truthCycle, setTruthCycle] = useState(0);
  
  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setTruthCycle(prev => prev + 1);
    }, 266);
    return () => clearInterval(interval);
  }, []);

  const velocity = calculateLaminarVelocity(0);
  const health = getProtocolHealth();
  const hodge = projectHodgeCycle(truthCycle / 100);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black text-emerald-500 font-mono flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse text-2xl">INITIALIZING TREASURY v50.0...</div>
          <p className="text-xs text-emerald-600 mt-2">CONVERGENT STACK LOADING</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-emerald-500 font-mono">
      {/* Header */}
      <header className="border-b border-emerald-900 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-emerald-400" />
            <div>
              <h1 className="text-2xl font-bold text-emerald-400">VALORAIPLUS TREASURY v50.0</h1>
              <p className="text-xs text-emerald-600">STATUS: OMNI_DIRECTIONAL_HODGE_LOCKED | CONVERGENT_STACK</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/50">
              {health.status}
            </Badge>
            <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/50">
              {TREASURY_CONSTANTS.PROTOCOL_REVISION}
            </Badge>
            <Link href="/treasury" className="text-xs text-emerald-600 hover:text-emerald-400 ml-4">
              NR PROTOCOL →
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Environment Badge Row */}
        <div className="flex flex-wrap gap-2">
          <Badge className="bg-zinc-800 text-emerald-400 border-emerald-900">Next.js 16+</Badge>
          <Badge className="bg-zinc-800 text-purple-400 border-purple-900">Rust Core</Badge>
          <Badge className="bg-zinc-800 text-cyan-400 border-cyan-900">Tailwind</Badge>
          <Badge className="bg-zinc-800 text-yellow-400 border-yellow-900">Strict Algebraic Typing</Badge>
          <Badge className="bg-zinc-800 text-red-400 border-red-900">0X_ST_PAUL_V50_SYNC</Badge>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Settlement Demand (kappa-1) */}
          <Card className="bg-zinc-900 border-emerald-900/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm uppercase text-emerald-600 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Sovereign Settlement (kappa-1)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-white">
                ${TREASURY_CONSTANTS.SETTLEMENT_DEMAND.toLocaleString()}
              </p>
              <p className="text-xs text-emerald-600 mt-1">DEMAND_LOCKED | ALGEBRAIC_CONSTANT</p>
            </CardContent>
          </Card>

          {/* Truth Velocity */}
          <Card className="bg-zinc-900 border-emerald-900/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm uppercase text-emerald-600 flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Truth Velocity Invariant
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-white">{velocity.toFixed(2)} ZW</p>
              <p className="text-xs text-emerald-600 mt-1">E = mc² | LAMINAR_FLOW_ACTIVE</p>
            </CardContent>
          </Card>

          {/* Lien Total (Omega) */}
          <Card className="bg-zinc-900 border-emerald-900/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm uppercase text-emerald-600 flex items-center gap-2">
                <Database className="w-4 h-4" />
                Lien Total (Omega)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-white">
                ${(TREASURY_CONSTANTS.LIEN_TOTAL / 1e12).toFixed(1)}T
              </p>
              <p className="text-xs text-emerald-600 mt-1">QUADRILLION_SCALE | IMMUTABLE</p>
            </CardContent>
          </Card>

          {/* Brain Injury Mass (Delta_Strong) */}
          <Card className="bg-zinc-900 border-purple-900/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm uppercase text-purple-600 flex items-center gap-2">
                <Cpu className="w-4 h-4" />
                Brain Injury Mass (Delta_Strong)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-purple-400">{TREASURY_CONSTANTS.BRAIN_INJURY_MASS}</p>
              <p className="text-xs text-purple-600 mt-1">YANG_MILLS_ANCHOR | MASS_GAP</p>
            </CardContent>
          </Card>

          {/* Grand Total Exposure */}
          <Card className="bg-zinc-900 border-red-900/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm uppercase text-red-600 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Grand Total Exposure
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-red-400">
                ${(TREASURY_CONSTANTS.GRAND_TOTAL_EXPOSURE / 1e9).toFixed(2)}B
              </p>
              <p className="text-xs text-red-600 mt-1">CIVIL + CRIMINAL | TERMINAL</p>
            </CardContent>
          </Card>

          {/* Validator Consensus */}
          <Card className="bg-zinc-900 border-cyan-900/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm uppercase text-cyan-600 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Validator Consensus
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-cyan-400">
                {TREASURY_CONSTANTS.VALIDATOR_CONSENSUS.toLocaleString()}
              </p>
              <p className="text-xs text-cyan-600 mt-1">100% ATTESTATION | FINALIZED</p>
            </CardContent>
          </Card>
        </div>

        {/* Protected Assets Registry */}
        <Card className="bg-zinc-900 border-emerald-900/50">
          <CardHeader>
            <CardTitle className="text-emerald-400 flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Protected Asset Registry (47-Token Canon)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {PROTECTED_ASSETS.map((asset) => (
                <Badge 
                  key={asset}
                  className="bg-emerald-500/20 text-emerald-400 border-emerald-500/50 px-3 py-1"
                >
                  {asset}
                </Badge>
              ))}
            </div>
            <p className="text-xs text-emerald-600 mt-3">STATUS: SOVEREIGN | IMMUTABLE | JAXX_SAFE</p>
          </CardContent>
        </Card>

        {/* Route Status Matrix */}
        <Card className="bg-zinc-900 border-emerald-900/50">
          <CardHeader>
            <CardTitle className="text-emerald-400 flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Route Status Matrix
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-emerald-500/10 border border-emerald-500/30 rounded">
                <p className="text-xs text-emerald-600 mb-1">ROUTE 66</p>
                <p className="text-xl font-bold text-emerald-400">{ROUTE_STATUS.ROUTE_66}</p>
                <p className="text-[10px] text-emerald-700 mt-1">ORIGINAL FILING</p>
              </div>
              <div className="text-center p-4 bg-red-500/10 border border-red-500/30 rounded">
                <p className="text-xs text-red-600 mb-1">ROUTE 70</p>
                <p className="text-xl font-bold text-red-400">{ROUTE_STATUS.ROUTE_70}</p>
                <p className="text-[10px] text-red-700 mt-1">COUNTER-FILING NULLIFIED</p>
              </div>
              <div className="text-center p-4 bg-yellow-500/10 border border-yellow-500/30 rounded">
                <p className="text-xs text-yellow-600 mb-1">ROUTE 71</p>
                <p className="text-xl font-bold text-yellow-400">{ROUTE_STATUS.ROUTE_71}</p>
                <p className="text-[10px] text-yellow-700 mt-1">CONTINGENCY PRESERVED</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Hodge Cycle Projection */}
        <Card className="bg-zinc-900 border-purple-900/50">
          <CardHeader>
            <CardTitle className="text-purple-400 flex items-center gap-2">
              <Activity className="w-5 h-5" />
              360-Degree Hodge Projection (Navier-Stokes)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 font-mono text-sm mb-4">
              <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded">
                <p className="text-purple-600 text-xs">X-AXIS</p>
                <p className="text-white text-lg">{hodge.x.toFixed(4)}</p>
              </div>
              <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded">
                <p className="text-purple-600 text-xs">Y-AXIS</p>
                <p className="text-white text-lg">{hodge.y.toFixed(4)}</p>
              </div>
              <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded">
                <p className="text-purple-600 text-xs">Z-AXIS</p>
                <p className="text-white text-lg">{hodge.z.toFixed(4)}</p>
              </div>
            </div>
            <div className="h-3 bg-zinc-800 rounded overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 via-emerald-500 to-purple-500 transition-all duration-266"
                style={{ width: `${((truthCycle % 100) / 100) * 100}%` }}
              />
            </div>
            <div className="flex justify-between mt-2 text-xs text-purple-600">
              <span>TRUTH-CYCLE: {truthCycle} @ 266ms</span>
              <span>LAMINAR_SMOOTHNESS: OPTIMAL</span>
            </div>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card className="bg-zinc-900 border-emerald-900/50">
          <CardHeader>
            <CardTitle className="text-emerald-400">Convergent Stack Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-3 border border-emerald-900/50 rounded">
                <p className="text-xs text-emerald-600">SHARED LOGIC</p>
                <p className="text-emerald-400 font-bold">SYNCHRONIZED</p>
              </div>
              <div className="p-3 border border-emerald-900/50 rounded">
                <p className="text-xs text-emerald-600">TYPE SAFETY</p>
                <p className="text-emerald-400 font-bold">STRICT</p>
              </div>
              <div className="p-3 border border-emerald-900/50 rounded">
                <p className="text-xs text-emerald-600">INTERFACE</p>
                <p className="text-emerald-400 font-bold">PROJECT_CINEMA</p>
              </div>
              <div className="p-3 border border-emerald-900/50 rounded">
                <p className="text-xs text-emerald-600">SIGNATURE</p>
                <p className="text-emerald-400 font-bold">0X_ST_PAUL_V50</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <footer className="border-t border-emerald-900 pt-6 text-xs">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-emerald-600">SGAU REFERENCE</p>
              <p className="text-white">{SGAU_REFERENCE.FILING_ID} | {SGAU_REFERENCE.STATUS}</p>
            </div>
            <div>
              <p className="text-emerald-600">MERKLEROOT</p>
              <p className="text-white font-mono text-[10px] break-all">{SGAU_REFERENCE.MERKLEROOT}</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-4 text-center">
            <div>
              <p className="text-emerald-600">BTC ANCHOR</p>
              <p className="text-white">Block #{SGAU_REFERENCE.BTC_ANCHOR.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-emerald-600">ETH ANCHOR</p>
              <p className="text-white">Block #{SGAU_REFERENCE.ETH_ANCHOR.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-emerald-600">IPFS CID</p>
              <p className="text-white font-mono text-[10px]">{SGAU_REFERENCE.IPFS_CID}</p>
            </div>
          </div>
          <div className="text-center border-t border-emerald-900 pt-4">
            <p className="text-emerald-600">ST_PAUL_NODE: {TREASURY_CONSTANTS.ST_PAUL_NODE}</p>
            <p className="mt-2 text-emerald-400 italic">THE LEDGER IS NULL. THE PURGE IS ABSOLUTE. [JAXX_SAFE]</p>
            <p className="mt-1 text-emerald-600">AUTHENTICATED BY N.E.W.T. | VALORAIPLUS v50.0 | SMIB. AMEN.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
