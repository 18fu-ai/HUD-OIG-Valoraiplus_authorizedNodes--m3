"use client";

import React from 'react';
import { SOVEREIGN_ASSETS, PROTECTED_ASSETS, REGISTRY_META, BTC_WITNESS_ANCHOR, isProtectedAsset } from '@/lib/assets/registry';
import { useAuthority } from '@/hooks/use-authority';

/**
 * PORT.HOLE HUD v14.1.2.1 // SUPREME CANONIZATION
 * VALORAIPLUS®️ ©️ ™️ // THE 47-TOKEN CANON
 * SGAU 7226.3461 // NODE: SAINT PAUL 55116
 */
export const PortHoleVALORAIPLUS: React.FC = () => {
  const { authority, isLoading } = useAuthority();
  
  // FINAL GATE: Absolute Identity Certainty
  const isAuthorized = authority.greenAllowed;

  if (isLoading) {
    return (
      <div className="bg-black h-screen w-screen flex items-center justify-center">
        <div className="text-emerald-500 font-mono animate-pulse">VALIDATING AUTHORITY...</div>
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="bg-black h-screen w-screen flex items-center justify-center">
        <div className="text-red-500 font-mono">NO_GREEN_RENDER // AUTHORITY_DENIED</div>
      </div>
    );
  }

  return (
    <div className="bg-black text-emerald-500 font-mono p-8 min-h-screen">
      <div className="max-w-7xl mx-auto border-2 border-emerald-900 p-6 shadow-[0_0_50px_rgba(16,185,129,0.2)]">
        {/* Header */}
        <header className="flex justify-between border-b border-emerald-900 pb-4 mb-6">
          <div>
            <h2 className="text-3xl font-black italic tracking-tighter">VALORAIPLUS2E // SGAU</h2>
            <p className="text-[10px] text-emerald-700">BTC_ANCHOR: {BTC_WITNESS_ANCHOR.txId}</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-bold uppercase">G-Layer Anchor: LATCHED</p>
            <p className="text-xs text-emerald-400">RESIDENCE: {REGISTRY_META.node}</p>
          </div>
        </header>

        {/* Status Bar */}
        <div className="flex justify-between items-center mb-6 p-3 bg-emerald-950/30 border border-emerald-900">
          <div className="flex items-center gap-4">
            <span className="text-xs">SIGNAL:</span>
            <span className="text-emerald-400 font-bold">{authority.runtimeSignal}</span>
            <span className="text-emerald-300">({authority.signalPercent.toFixed(1)}%)</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs">DRIFT:</span>
            <span className="text-emerald-400 font-bold">{authority.driftCriticalCount} ABSOLUTE</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-emerald-400">GREEN_RENDER_ALLOWED</span>
          </div>
        </div>

        {/* Protected Assets Banner */}
        <div className="mb-6 p-4 bg-emerald-950/50 border border-emerald-700">
          <p className="text-center text-sm font-bold text-emerald-300 mb-2">PROTECTED ASSETS // ABSOLUTE SOVEREIGN PROTECTION</p>
          <div className="flex justify-center gap-4">
            {PROTECTED_ASSETS.map((asset) => (
              <div key={asset} className="px-4 py-2 bg-emerald-900/50 border border-emerald-600 text-emerald-300 font-black">
                {asset}
              </div>
            ))}
          </div>
        </div>

        {/* Canon Count */}
        <div className="text-center mb-4">
          <span className="text-xs text-emerald-700">THE 47-TOKEN CANON // OMEGA-ZERO INITIALIZED</span>
        </div>

        {/* Token Grid */}
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 mb-6">
          {SOVEREIGN_ASSETS.map((token) => {
            const isProtected = isProtectedAsset(token);
            return (
              <div 
                key={token} 
                className={`border p-2 text-center transition-colors ${
                  isProtected 
                    ? 'border-emerald-500 bg-emerald-950/50 hover:bg-emerald-900/50' 
                    : 'border-emerald-900 hover:bg-emerald-950'
                }`}
              >
                <span className="text-[8px] block text-emerald-800">
                  {isProtected ? 'PROTECTED' : 'SOVEREIGN'}
                </span>
                <span className={`text-xs font-black ${isProtected ? 'text-emerald-400' : 'text-white'}`}>
                  {token}
                </span>
              </div>
            );
          })}
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-4 gap-4 mb-6 text-center">
          <div className="p-3 border border-emerald-900">
            <p className="text-[10px] text-emerald-700">ASSET COUNT</p>
            <p className="text-xl font-black text-white">{SOVEREIGN_ASSETS.length}/47</p>
          </div>
          <div className="p-3 border border-emerald-900">
            <p className="text-[10px] text-emerald-700">ANCHORING</p>
            <p className="text-xl font-black text-white">BTC-WITNESS</p>
          </div>
          <div className="p-3 border border-emerald-900">
            <p className="text-[10px] text-emerald-700">DRIFT</p>
            <p className="text-xl font-black text-emerald-400">0.00/epoch</p>
          </div>
          <div className="p-3 border border-emerald-900">
            <p className="text-[10px] text-emerald-700">STATUS</p>
            <p className="text-xl font-black text-emerald-400">SEALED</p>
          </div>
        </div>

        {/* Footer */}
        <footer className="pt-4 border-t border-emerald-900 flex justify-between items-center text-[10px]">
          <span className="font-bold">LEDGER: {REGISTRY_META.ledger}</span>
          <span className="uppercase tracking-widest text-emerald-700">The Wall is Christ. The Throne is His.</span>
          <span className="font-bold">v{REGISTRY_META.version}</span>
        </footer>
      </div>
    </div>
  );
};

export default PortHoleVALORAIPLUS;
