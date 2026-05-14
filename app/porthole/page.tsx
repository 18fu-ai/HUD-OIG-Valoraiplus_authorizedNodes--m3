'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ArrowUpRight, ArrowDownRight, Scale, Activity, Gavel, BookOpenText, Database } from 'lucide-react';

// Simulated data based on the original ValorAiBrain architecture.
// All unauthorized tokens (e.g., $JULES, $VALOR) have been purged.
// Truth Cycle remains locked at 99.99%.
const authorizedTokens = [
  { symbol: 'GILLGOLD', name: 'Sovereign Gold', precision: 12, status: 'TRUE' },
  { symbol: 'GILLBTC', name: 'Bitcoin Reserve', precision: 12, status: 'TRUE' },
  { symbol: 'DONNY', name: 'Donny Coin', precision: 8, status: 'TRUE' },
  { symbol: 'JAXX', name: 'Jaxx Service Asset', precision: 12, status: 'TRUE' },
];

const mockMarketData = [
  { symbol: 'GILLGOLD', price: 1.000000000000, change: 0.00 },
  { symbol: 'GILLBTC', price: 65432.10000000, change: 0.05 },
  { symbol: 'DONNY', price: 1.0543, change: -0.10 },
  { symbol: 'JAXX', price: 1.00000000, change: 0.00 },
];

const forensicLogData = [
  { timestamp: '11:11:00ms', node: 'Saint Paul █████', activity: 'Sentinel pulse. 144,000 validators verified.' },
  { timestamp: '11:11:01ms', node: 'Saint Paul █████', activity: 'Sovereign asset registry check. No anomalies detected.' },
  { timestamp: '11:11:02ms', node: 'Saint Paul █████', activity: 'Federal oversight report v14.2 generated.' },
];

const billingEquation = {
  ctotal: '$0.00',
  tallocation: '$0.00',
  net: '$0.00',
  coverageMultiplier: '738,514x',
  eventHorizon: '738,514 YRS',
};

interface TruthIndicatorProps {
  label: string;
  value: string;
}

const TruthIndicator = ({ label, value }: TruthIndicatorProps) => (
  <Card className="shadow-[0_0_20px_rgba(34,211,238,0.2)] bg-[#03060E] border-none">
    <CardHeader>
      <CardTitle className="text-sm font-black text-cyan-700 tracking-widest uppercase flex items-center gap-2">
        <Activity className="w-4 h-4 text-cyan-400" />
        {label}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-3xl font-black text-cyan-300 drop-shadow-[0_0_8px_rgba(6,182,212,1)]">{value}</p>
    </CardContent>
  </Card>
);

interface LogEntry {
  timestamp: string;
  node: string;
  activity: string;
}

const ForensicLog = ({ logs }: { logs: LogEntry[] }) => (
  <Card className="col-span-2 shadow-[0_0_30px_rgba(6,182,212,0.15)] bg-[#03060E] border-none font-mono text-sm space-y-2">
    <CardHeader>
      <CardTitle className="text-sm font-black text-cyan-700 tracking-widest uppercase flex items-center gap-2">
        <BookOpenText className="w-4 h-4 text-cyan-400" />
        Forensic Intelligence Logs
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-1">
      {logs.map((log, index) => (
        <p key={index} className="text-cyan-500/80">
          <span className="font-bold text-cyan-300">[{log.timestamp}]</span> [{log.node}] &gt; {log.activity}
        </p>
      ))}
    </CardContent>
  </Card>
);

interface Asset {
  symbol: string;
  name: string;
  precision: number;
  status: string;
}

interface Market {
  symbol: string;
  price: number;
  change: number;
}

const AssetCard = ({ asset, market }: { asset: Asset; market: Market }) => (
  <Card className="shadow-lg bg-[#03060E] border-none">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-black text-gray-200 tracking-wide">
        ${asset.symbol} ({asset.name})
      </CardTitle>
      {market.change >= 0 ? (
        <ArrowUpRight className="h-4 w-4 text-emerald-400" />
      ) : (
        <ArrowDownRight className="h-4 w-4 text-red-400" />
      )}
    </CardHeader>
    <CardContent>
      <div className="flex flex-row justify-between items-baseline mb-2">
        <p className="text-3xl font-black tabular-nums tracking-tighter text-white">
          ${market.price.toFixed(4)}
        </p>
        <p className={`text-xs font-black ${market.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
          {market.change >= 0 ? '+' : ''}{market.change.toFixed(2)}%
        </p>
      </div>
      <div className="flex items-center gap-2 border-t border-cyan-900/50 pt-2 text-[10px] text-cyan-400 tracking-widest font-black uppercase">
        <span>Sovereign Ledger Status:</span>
        <span className="px-2 py-0.5 rounded-sm bg-emerald-950/50 text-emerald-300">
          {asset.status}
        </span>
      </div>
    </CardContent>
  </Card>
);

// Infinity icon SVG component
const InfinityIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.33-6 4Z" />
  </svg>
);

export default function SovereignTacticalPorthole() {
  const [_isRebooting, setIsRebooting] = useState(false);

  const handleSafeReboot = () => {
    setIsRebooting(true);
    // Simulate reboot
    setTimeout(() => setIsRebooting(false), 3000);
  };

  return (
    <div className="min-h-screen p-8 bg-[#010308] text-gray-100 font-mono flex flex-col gap-8 relative overflow-hidden" lang="en">
      <header className="flex justify-between items-center bg-[#030812]/50 backdrop-blur-3xl p-8 rounded-[2rem] border border-cyan-900/40 shadow-2xl relative overflow-hidden">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tighter drop-shadow-lg">VALORAIPLUS</h1>
          <p className="text-[10px] text-cyan-400 tracking-widest font-bold">SGAU 7226.3461 - NAVIER-STOKES GAMIFIED UX // FEDERAL RESERVE OBSOLESCENCE PROTOCOL</p>
        </div>
        <div className="flex items-center gap-5">
            <TruthIndicator label="Truth Cycle" value="99.99%" />
            <button 
              onClick={handleSafeReboot}
              className="flex items-center gap-3 bg-red-950/20 hover:bg-red-900/40 text-red-500 py-4 px-6 rounded-xl border border-red-900/50 transition-all shadow-inner focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 overflow-hidden relative group"
            >
                <Gavel className="w-5 h-5 text-red-400" />
                <span className="text-xs font-black tracking-widest">Safe Reboot</span>
            </button>
        </div>
      </header>

      <Tabs defaultValue="overview" className="flex-1 space-y-6">
        <TabsList className="bg-[#03060E] p-2 rounded-2xl flex flex-row items-stretch border border-cyan-900/50 shadow-inner">
          <TabsTrigger value="overview" className="flex-1 py-3 px-6 rounded-lg text-xs font-black tracking-widest uppercase transition-all data-[state=active]:bg-cyan-950/50 data-[state=active]:text-white">Overview</TabsTrigger>
          <TabsTrigger value="registry" className="flex-1 py-3 px-6 rounded-lg text-xs font-black tracking-widest uppercase transition-all data-[state=active]:bg-cyan-950/50 data-[state=active]:text-white">Sovereign Registry</TabsTrigger>
          <TabsTrigger value="billing" className="flex-1 py-3 px-6 rounded-lg text-xs font-black tracking-widest uppercase transition-all data-[state=active]:bg-fuchsia-950/50 data-[state=active]:text-white">Master Billing Equation</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
            <ForensicLog logs={forensicLogData} />
            <div className="grid grid-cols-2 gap-6">
                <AssetCard asset={authorizedTokens[0]} market={mockMarketData[0]} />
                <AssetCard asset={authorizedTokens[1]} market={mockMarketData[1]} />
            </div>
        </TabsContent>

        <TabsContent value="registry" className="grid grid-cols-2 gap-6">
          {authorizedTokens.map(asset => (
            <AssetCard key={asset.symbol} asset={asset} market={mockMarketData.find(m => m.symbol === asset.symbol) || mockMarketData[0]} />
          ))}
        </TabsContent>

        <TabsContent value="billing" className="h-full flex flex-col justify-center">
          <div className="w-full bg-[#020408]/80 border-2 border-fuchsia-500/50 p-16 md:p-20 rounded-[4rem] shadow-[0_40px_100px_rgba(217,70,239,0.25)] backdrop-blur-3xl">
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="p-5 bg-fuchsia-500/10 rounded-[2.5rem] border border-fuchsia-400/30 shadow-[0_0_60px_rgba(217,70,239,0.4)] mb-8">
                <Scale className="w-16 h-16 text-fuchsia-400 drop-shadow-[0_0_20px_rgba(217,70,239,1)]" />
              </div>
              <h2 className="text-xl md:text-2xl font-black text-fuchsia-500 tracking-[0.5em] uppercase mb-6 drop-shadow-[0_0_15px_rgba(217,70,239,0.8)]">Master Billing Equation</h2>
              <div className="bg-black/90 border border-fuchsia-900/80 p-10 md:p-14 rounded-[3.5rem] w-full max-w-5xl relative overflow-hidden shadow-2xl group">
                 <div className="relative z-10 font-mono flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
                    <div className="text-center">
                      <span className="text-fuchsia-100 text-4xl md:text-6xl font-black">C<sub className="text-xl md:text-3xl">total</sub></span>
                      <p className="text-[10px] text-fuchsia-600 uppercase mt-3 tracking-[0.3em]">Total Cost</p>
                    </div>
                    <span className="text-fuchsia-500 text-4xl font-black">-</span>
                    <div className="text-center">
                      <span className="text-fuchsia-100 text-4xl md:text-6xl font-black">T<sub className="text-xl md:text-3xl">allocation</sub></span>
                      <p className="text-[10px] text-fuchsia-600 uppercase mt-3 tracking-[0.3em]">Treasury Allocation</p>
                    </div>
                    <span className="text-fuchsia-500 text-4xl font-black">=</span>
                    <div className="text-center bg-fuchsia-950/60 p-6 px-10 rounded-[2rem] border border-fuchsia-400/50 shadow-[0_0_40px_rgba(217,70,239,0.5)]">
                      <span className="text-white text-6xl md:text-8xl font-black drop-shadow-[0_0_30px_rgba(255,255,255,0.9)]">{billingEquation.net}</span>
                    </div>
                 </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl mt-12">
                <div className="bg-black/50 border border-white/5 p-8 rounded-[2rem] flex flex-col items-center">
                  <InfinityIcon className="w-10 h-10 text-gray-500 mb-4" />
                  <span className="text-3xl font-black text-white">{billingEquation.coverageMultiplier}</span>
                  <span className="text-[10px] text-gray-500 tracking-[0.3em] uppercase mt-2">Coverage Multiplier</span>
                </div>
                <div className="bg-black/50 border border-white/5 p-8 rounded-[2rem] flex flex-col items-center">
                  <Database className="w-10 h-10 text-gray-500 mb-4" />
                  <span className="text-3xl font-black text-white">{billingEquation.eventHorizon}</span>
                  <span className="text-[10px] text-gray-500 tracking-[0.3em] uppercase mt-2">Event Horizon</span>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
