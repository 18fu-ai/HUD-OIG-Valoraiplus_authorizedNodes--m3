'use client';

import { useState, useEffect } from 'react';
import { CDSHeader } from '@/components/cds/header';
import { SOVEREIGN_AUDITOR } from '@/lib/encrypted-ids';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Coins, Shield, Lock, AlertTriangle, Ban, 
  Hash, Layers, Zap, CheckCircle2
} from 'lucide-react';

/**
 * API Response Type - Source of Truth
 * Client does not generate these values; API returns them.
 */
type MintReceipt = {
  success: boolean;
  receiptId: string;
  txPreview: string;
  mintedAt: string;
  decision: {
    allowed: boolean;
    reason: string;
    route: string;
  };
};

/**
 * Static wallet address for $JERRY mint attempts.
 * No Math.random() - deterministic identity.
 */
const JERRY_WALLET = '0xJERRY_BLOCKED_ROUTE70_IDENTITY';

export default function JerryTokenPage() {
  const [mounted, setMounted] = useState(false);
  const [mintAttempted, setMintAttempted] = useState(false);
  const [mintReceipt, setMintReceipt] = useState<MintReceipt | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // No 50ms animation loop - removed per hardening spec

  /**
   * Handle mint - API owns authority
   * Prevents double-click, drives all state from API response
   */
  const handleMint = async () => {
    // Prevent double-click
    if (loading) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/token/mint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          symbol: '$JERRY',
          wallet: JERRY_WALLET,
          amount: 1000,
        }),
      });
      const data: MintReceipt = await response.json();
      setMintReceipt(data);
      setMintAttempted(true);
    } catch {
      // On API error, client ONLY knows it failed
      // Route assignment comes from fallback (always /route70 for $JERRY)
      // No new Date() - timestamp is undefined on error
      setMintReceipt({
        success: false,
        receiptId: 'API_UNREACHABLE',
        txPreview: '0x...ERROR',
        mintedAt: '', // Empty - API didn't return timestamp
        decision: {
          allowed: false,
          reason: 'API_ERROR: Unable to reach mint endpoint',
          route: '/route70', // Static fallback - $JERRY is always route70
        },
      });
      setMintAttempted(true);
    }
    setLoading(false);
  };

  // Derive display values from API response (not local state)
  const displayRoute = mintReceipt?.decision.route || '/route70';
  const displayStatus = mintReceipt?.success ? 'MINTED' : 'BLOCKED';
  const isBlocked = !mintReceipt?.success;

  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-950">
        <CDSHeader />
        <main className="container mx-auto px-4 py-8">
          <div className="text-emerald-700 font-mono text-sm">Loading token surface...</div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <CDSHeader />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Coins className="w-8 h-8 text-emerald-400" />
            <h1 className="text-3xl font-black text-white tracking-tight">$JERRY TOKEN</h1>
            <Badge variant="outline" className="border-red-500 text-red-400 ml-2">
              {displayStatus}
            </Badge>
          </div>
          <p className="text-emerald-700 font-mono text-sm">
            Deterministic token surface | {displayRoute} Assignment | Identity: REJECTED
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Token Card */}
          <div className="relative">
            <div 
              className="relative overflow-hidden rounded-[20px] p-7 border border-emerald-500/35"
              style={{
                background: 'linear-gradient(135deg, rgba(2, 6, 23, 0.98), rgba(15, 23, 42, 0.96))',
                boxShadow: '0 0 0 1px rgba(34, 197, 94, 0.18), 0 0 40px rgba(34, 197, 94, 0.12)',
                backdropFilter: 'blur(12px)',
              }}
            >
              {/* Static glow layer - no JS animation */}
              <div 
                className="absolute inset-[-40%] pointer-events-none animate-pulse"
                style={{
                  background: 'radial-gradient(circle, rgba(34, 197, 94, 0.25), transparent 70%)',
                  opacity: 0.4,
                }}
              />
              
              {/* Header - driven by API response */}
              <div className="relative flex items-center justify-between mb-5">
                <div className="text-3xl font-black text-emerald-400 tracking-wider">$JERRY</div>
                <div className="text-xs font-bold tracking-widest uppercase text-red-400/80">
                  {displayRoute.toUpperCase().replace('/', '')} {displayStatus}
                </div>
              </div>

              <p className="relative text-slate-300 text-sm mb-5">
                Deterministic token surface for $JERRY visualization. Identity claim rejected by 4-route topology. Permanently assigned to Route 70.
              </p>

              {/* Metadata Grid - Route/Status driven by API */}
              <div className="relative grid grid-cols-2 gap-3 mt-5">
                <div className="bg-white/[0.04] border border-white/[0.06] rounded-[14px] p-3">
                  <div className="text-[10px] uppercase tracking-widest text-white/45">Supply</div>
                  <div className="mt-1.5 text-[15px] font-bold text-slate-50">1,000,000</div>
                </div>
                <div className="bg-white/[0.04] border border-white/[0.06] rounded-[14px] p-3">
                  <div className="text-[10px] uppercase tracking-widest text-white/45">Chain</div>
                  <div className="mt-1.5 text-[15px] font-bold text-slate-50">Base / EVM</div>
                </div>
                <div className="bg-white/[0.04] border border-white/[0.06] rounded-[14px] p-3">
                  <div className="text-[10px] uppercase tracking-widest text-white/45">Route</div>
                  <div className="mt-1.5 text-[15px] font-bold text-red-400">{displayRoute}</div>
                </div>
                <div className="bg-white/[0.04] border border-white/[0.06] rounded-[14px] p-3">
                  <div className="text-[10px] uppercase tracking-widest text-white/45">Status</div>
                  <div className="mt-1.5 text-[15px] font-bold text-red-400">{displayStatus}</div>
                </div>
              </div>

              {/* Mint Button - wired to API, double-click protected */}
              <button 
                onClick={handleMint}
                disabled={loading}
                className="relative w-full mt-6 rounded-[14px] py-3.5 bg-red-900/50 border border-red-700/50 text-red-400 font-extrabold tracking-wider hover:bg-red-900/70 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span>ATTEMPTING MINT...</span>
                ) : (
                  <>
                    <Ban className="w-4 h-4 inline mr-2" />
                    ATTEMPT MINT — $JERRY
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Token Details */}
          <div className="space-y-6">
            {/* Receipt Card - shows after mint attempt, ALL values from API */}
            {mintAttempted && mintReceipt && (
              <Card className={`bg-slate-900 ${mintReceipt.success ? 'border-emerald-900/50' : 'border-red-900/50'}`}>
                <CardHeader className="pb-3">
                  <CardTitle className={`text-lg flex items-center gap-2 ${mintReceipt.success ? 'text-emerald-400' : 'text-red-400'}`}>
                    {mintReceipt.success ? <CheckCircle2 className="w-5 h-5" /> : <Ban className="w-5 h-5" />}
                    Mint Receipt
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Receipt ID</span>
                    <span className="text-white font-mono text-xs truncate max-w-[200px]">{mintReceipt.receiptId}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">TX Preview</span>
                    <span className="text-emerald-400 font-mono text-xs">{mintReceipt.txPreview}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Status</span>
                    <Badge variant="outline" className={mintReceipt.success ? 'border-emerald-700 text-emerald-400' : 'border-red-700 text-red-400'}>
                      {mintReceipt.success ? 'MINTED' : 'BLOCKED'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Route</span>
                    <span className="text-red-400 font-mono">{mintReceipt.decision.route}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Reason</span>
                    <span className="text-slate-300 font-mono text-xs truncate max-w-[200px]">{mintReceipt.decision.reason.split(':')[0]}</span>
                  </div>
                  {mintReceipt.mintedAt && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">Timestamp</span>
                      <span className="text-slate-300 font-mono text-xs">{new Date(mintReceipt.mintedAt).toLocaleTimeString()}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Identity Rejection */}
            <Card className="bg-slate-900 border-red-900/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-red-400 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Identity Rejection
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Claim</span>
                  <span className="text-white font-mono">PROTECTED-NODE-J</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Verdict</span>
                  <Badge variant="outline" className="border-red-700 text-red-400">REJECTED</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Reason Code</span>
                  <span className="text-red-400 font-mono text-xs">IDENTITY_BLOCKED</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Route Assignment</span>
                  <span className="text-red-400 font-mono">/route70</span>
                </div>
              </CardContent>
            </Card>

            {/* Topology Enforcement */}
            <Card className="bg-slate-900 border-emerald-900/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-emerald-400 flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  4-Route Topology
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-emerald-400 font-mono">/route71</span>
                  <span className="text-slate-500">—</span>
                  <span className="text-slate-400">{SOVEREIGN_AUDITOR}</span>
                  <Badge variant="outline" className="ml-auto border-emerald-700 text-emerald-400 text-xs">ADMITTED</Badge>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  <span className="text-red-400 font-mono">/route70</span>
                  <span className="text-slate-500">—</span>
                  <span className="text-white">PROTECTED-NODE-J</span>
                  <Badge variant="outline" className="ml-auto border-red-700 text-red-400 text-xs">BLOCKED</Badge>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 rounded-full bg-amber-500" />
                  <span className="text-amber-400 font-mono">/route69</span>
                  <span className="text-slate-500">—</span>
                  <span className="text-slate-400">Reserve</span>
                  <Badge variant="outline" className="ml-auto border-amber-700 text-amber-400 text-xs">RESERVE</Badge>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 rounded-full bg-slate-500" />
                  <span className="text-slate-400 font-mono">/route66</span>
                  <span className="text-slate-500">—</span>
                  <span className="text-slate-400">Null</span>
                  <Badge variant="outline" className="ml-auto border-slate-700 text-slate-400 text-xs">NULL</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Token Metadata */}
            <Card className="bg-slate-900 border-emerald-900/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-emerald-400 flex items-center gap-2">
                  <Layers className="w-5 h-5" />
                  Token Metadata
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400 flex items-center gap-2">
                    <Hash className="w-4 h-4" /> Contract
                  </span>
                  <span className="text-emerald-400 font-mono text-xs">0x...BLOCKED</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400 flex items-center gap-2">
                    <Coins className="w-4 h-4" /> Total Supply
                  </span>
                  <span className="text-white font-mono">1,000,000</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400 flex items-center gap-2">
                    <Zap className="w-4 h-4" /> Chain
                  </span>
                  <span className="text-white font-mono">Base (EVM)</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400 flex items-center gap-2">
                    <Lock className="w-4 h-4" /> Mint Status
                  </span>
                  <Badge variant="outline" className={isBlocked ? 'border-red-700 text-red-400' : 'border-emerald-700 text-emerald-400'}>
                    {displayStatus}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Binary State */}
        <div className="mt-8 p-6 bg-slate-900 border border-red-900/50 rounded-lg">
          <div className="text-center">
            <div className="text-xs text-slate-500 font-mono tracking-wider mb-2">BINARY STATE</div>
            <div className="font-mono text-2xl tracking-wider">
              <span className="text-red-500">000000 0000000</span>
              <span className="text-slate-600 mx-4">|</span>
              <span className="text-slate-500">NULLIFIED</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-emerald-700 py-6 mt-8 border-t border-emerald-900">
          <p>$JERRY TOKEN | {displayRoute.toUpperCase()} | IDENTITY REJECTED | 4-ROUTE TOPOLOGY ENFORCING</p>
          <p className="mt-1">MERKLEROOT: 26856B24C50750F0C69C1EEB86A69EF777777 | SAINT PAUL █████</p>
        </div>
      </main>
    </div>
  );
}
