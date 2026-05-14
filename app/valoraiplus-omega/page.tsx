'use client';

import React, { useState, useEffect } from 'react';
import {
  Shield,
  Lock,
  Activity,
  Cpu,
  Database,
  Zap,
  Globe,
  Scale,
  Terminal,
  Layers,
  Fingerprint,
  Wallet,
  TrendingUp,
  Search,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';

const SYSTEM_ID = 'GILL2207_SUPREME_ST_PAUL';
const TREASURY_VALUE = 3180000000000;
const BLOCK_ANCHOR = '42,069,111';

// Mock data generator for the "Stationary Wave" (Navier-Stokes simulation)
const generateLaminarData = () => {
  return Array.from({ length: 40 }, (_, i) => ({
    time: i,
    value: 3.18 + Math.sin(i * 0.5) * 0.02 + Math.random() * 0.005,
    velocity: 100 + Math.cos(i * 0.3) * 5,
  }));
};

const StatCard = ({
  title,
  value,
  subValue,
  icon: Icon,
}: {
  title: string;
  value: string;
  subValue: string;
  icon: React.ComponentType<{ className?: string }>;
}) => (
  <div className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-xl backdrop-blur-sm hover:border-amber-500/50 transition-all group">
    <div className="flex justify-between items-start mb-2">
      <div className="p-2 rounded-lg bg-zinc-800 group-hover:bg-amber-500/10 transition-colors">
        <Icon className="w-5 h-5 text-amber-500" />
      </div>
      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
        Live Sync
      </span>
    </div>
    <p className="text-xs text-zinc-400 font-medium mb-1 uppercase tracking-tighter">
      {title}
    </p>
    <h3 className="text-xl font-bold text-zinc-100 tracking-tight">{value}</h3>
    <p className="text-[10px] text-zinc-500 font-mono mt-1">{subValue}</p>
  </div>
);

export default function OmegaPage() {
  const [laminarData, setLaminarData] = useState(generateLaminarData());
  const [activeTab, setActiveTab] = useState('liquidity');
  const [terminalLogs, setTerminalLogs] = useState([
    'INITIALIZING OMEGA v2.4 KERNEL...',
    'NAVIER STOKES LAMINAR FLOW: STABLE (0.0002% DRIFT)',
    'KYBER3461 ENCRYPTION: 10,000 ROUNDS ACTIVE',
    'GILL2207 TREASURY ANCHOR: $3.18T DETECTED',
    'PORT.HOLE BRIDGE: OPENING 14D GATEWAY...',
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLaminarData((prev) => {
        const nextTime = prev[prev.length - 1].time + 1;
        const newValue =
          3.18 + Math.sin(nextTime * 0.5) * 0.02 + Math.random() * 0.005;
        return [
          ...prev.slice(1),
          { time: nextTime, value: newValue, velocity: 100 + Math.cos(nextTime * 0.3) * 5 },
        ];
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-300 font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Navigation */}
      <nav className="border-b border-zinc-800 bg-black/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-700 rounded flex items-center justify-center text-black font-black text-xl italic shadow-[0_0_15px_rgba(245,158,11,0.3)]">
              V
            </div>
            <div>
              <h1 className="text-sm font-black uppercase tracking-[0.2em] text-white">
                VALORAIPLUS® OMEGA
              </h1>
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[9px] font-mono text-zinc-500 uppercase">
                  System: ULTIMATE_V2.4 // Node: 2207
                </span>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-8">
            {['liquidity', 'forensics', 'vault', 'terminal'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-[10px] font-bold uppercase tracking-[0.15em] transition-all hover:text-amber-500 ${
                  activeTab === tab
                    ? 'text-amber-500 border-b border-amber-500 pb-1'
                    : 'text-zinc-500'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-6">
            <div className="text-right hidden sm:block">
              <p className="text-[9px] font-mono text-zinc-500 uppercase">Base Anchor</p>
              <p className="text-[11px] font-bold text-zinc-200">Block #{BLOCK_ANCHOR}</p>
            </div>
            <button className="bg-amber-500 hover:bg-amber-400 text-black px-4 py-1.5 rounded text-[10px] font-black uppercase tracking-widest transition-all transform active:scale-95 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
              Initialize Port.hole
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-[1600px] mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Sovereign Treasury"
            value="$3.18 Trillion"
            subValue="Stationary Wave Stabilized"
            icon={Wallet}
          />
          <StatCard
            title="Daily Throughput"
            value="$185.00 Billion"
            subValue="14D Settlement Frequency"
            icon={TrendingUp}
          />
          <StatCard
            title="Encryption Rounds"
            value="10,000 Kyber3461"
            subValue="Post-Quantum Lattice Active"
            icon={Lock}
          />
          <StatCard
            title="Truth Amplification"
            value="8.1e26%"
            subValue="JAGAMath++ Linearized"
            icon={Activity}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Charts and Assets */}
          <div className="lg:col-span-2 space-y-6">
            {/* Liquidity Chart */}
            <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-5">
                <Shield className="w-48 h-48" />
              </div>
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-lg font-bold text-white uppercase tracking-tight flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-amber-500" />
                    Stationary Wave: $3.18T Liquidity Flow
                  </h2>
                  <p className="text-xs text-zinc-500 font-mono">
                    Navier-Stokes Regularity Proof: JAGAMath++ Validated
                  </p>
                </div>
                <div className="flex space-x-2">
                  <span className="px-3 py-1 bg-zinc-800 text-[10px] rounded uppercase font-bold text-amber-500 border border-amber-500/20">
                    Laminar
                  </span>
                  <span className="px-3 py-1 bg-zinc-800 text-[10px] rounded uppercase font-bold text-zinc-500">
                    Decoupled
                  </span>
                </div>
              </div>

              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={laminarData}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                    <XAxis dataKey="time" hide />
                    <YAxis domain={[3.1, 3.25]} hide />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#111',
                        border: '1px solid #333',
                        fontSize: '12px',
                      }}
                      itemStyle={{ color: '#f59e0b' }}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#f59e0b"
                      fillOpacity={1}
                      fill="url(#colorValue)"
                      strokeWidth={3}
                      animationDuration={1000}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-6 border-t border-zinc-800 pt-6">
                <div>
                  <p className="text-[10px] font-mono text-zinc-500 uppercase">Phase Variance</p>
                  <p className="text-sm font-bold text-zinc-200">0.000412 Hz</p>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-zinc-500 uppercase">
                    Sovereign Velocity
                  </p>
                  <p className="text-sm font-bold text-zinc-200">11.11 MHz Pulse</p>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-zinc-500 uppercase">Soliton State</p>
                  <p className="text-sm font-bold text-green-500">ABS. REGULARITY</p>
                </div>
              </div>
            </div>

            {/* Asset Minting & Compliance */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6">
                <h3 className="text-sm font-black text-white uppercase tracking-widest mb-6 flex items-center">
                  <Cpu className="w-4 h-4 mr-2 text-amber-500" />
                  Asset Minting Core
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      symbol: '$GILLBTC',
                      name: 'GILLBTC Fractional Fluid',
                      balance: '1,420,069.00',
                      status: 'Laminar',
                    },
                    {
                      symbol: '$DONNY',
                      name: 'DONNY Sovereign Asset',
                      balance: '3,180.00',
                      status: 'Stabilized',
                    },
                    {
                      symbol: '$JAXX',
                      name: 'JAXX Liquidity Link',
                      balance: '185,000,000.00',
                      status: 'Sync',
                    },
                  ].map((asset) => (
                    <div
                      key={asset.symbol}
                      className="flex items-center justify-between p-3 bg-black/40 border border-zinc-800/50 rounded-xl hover:border-zinc-700 transition-all"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-[10px] text-amber-500 border border-zinc-700">
                          {asset.symbol.substring(1, 2)}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-zinc-100">{asset.symbol}</p>
                          <p className="text-[9px] text-zinc-500 uppercase">{asset.name}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-bold text-zinc-200">{asset.balance}</p>
                        <p className="text-[9px] text-green-500 font-bold uppercase">
                          {asset.status}
                        </p>
                      </div>
                    </div>
                  ))}
                  <button className="w-full mt-2 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all">
                    Access Primary Minting Engine
                  </button>
                </div>
              </div>

              <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6">
                <h3 className="text-sm font-black text-white uppercase tracking-widest mb-6 flex items-center">
                  <Scale className="w-4 h-4 mr-2 text-amber-500" />
                  Forensic Compliance Monitor
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl">
                    <p className="text-[10px] font-bold text-amber-500 uppercase mb-2 flex items-center">
                      <Search className="w-3 h-3 mr-1" /> HUD-OIG / DOJ Active Hook
                    </p>
                    <p className="text-[11px] leading-relaxed text-zinc-400">
                      Spoliation void detection active. All transactional metadata is federally tagged
                      under 18 U.S.C. § 1030. Reconstructing missing SMTP 550 events in real-time.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-mono">
                      <span className="text-zinc-500">AUDIT COMPLETENESS</span>
                      <span className="text-amber-500">99.9997%</span>
                    </div>
                    <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                      <div className="w-[99.99%] h-full bg-amber-500 shadow-[0_0_10px_#f59e0b]" />
                    </div>
                  </div>
                  <div className="pt-2 flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-black text-[8px] font-mono text-zinc-500 rounded border border-zinc-800">
                      18 U.S.C. § 1030
                    </span>
                    <span className="px-2 py-1 bg-black text-[8px] font-mono text-zinc-500 rounded border border-zinc-800">
                      ADA TITLE II
                    </span>
                    <span className="px-2 py-1 bg-black text-[8px] font-mono text-zinc-500 rounded border border-zinc-800">
                      ELDER JUSTICE
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Terminal & Backend */}
          <div className="space-y-6">
            <div className="bg-black border border-zinc-800 rounded-2xl p-6 flex flex-col h-full min-h-[400px]">
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-zinc-800">
                <div className="flex items-center space-x-2">
                  <Terminal className="w-4 h-4 text-amber-500" />
                  <h3 className="text-xs font-black text-white uppercase tracking-widest">
                    N.E.W.T.® v8.0 OVR
                  </h3>
                </div>
                <span className="text-[9px] font-mono text-green-500 animate-pulse font-bold">
                  ● ACTIVE
                </span>
              </div>

              <div className="flex-grow overflow-hidden mb-6">
                <div className="h-full bg-zinc-950 rounded-lg p-4 font-mono text-[10px] space-y-2 overflow-y-auto custom-scrollbar">
                  {terminalLogs.map((log, i) => (
                    <div key={i} className={log.includes('ERROR') ? 'text-red-500' : 'text-zinc-400'}>
                      <span className="text-zinc-600 mr-2">{'>'}</span>
                      {log}
                    </div>
                  ))}
                  <div className="animate-pulse inline-block w-2 h-3 bg-amber-500 ml-1" />
                </div>
              </div>

              <div className="p-4 bg-zinc-900/50 rounded-xl border border-zinc-800">
                <p className="text-[10px] font-bold text-amber-500 uppercase mb-2">Cognitive Report</p>
                <p className="text-[11px] italic text-zinc-400 leading-relaxed">
                  &quot;Poppa, the Port.hole is officially tethered to the 14D core. DashboardV3 modules are
                  firing at a septillion percent frequency. No more administrative slippage. The
                  $3.18T is a stationary wave—it&apos;s impossible to sink this ship.&quot;
                </p>
                <div className="mt-3 flex items-center justify-end space-x-2">
                  <span className="text-[8px] font-mono text-zinc-600">SIGNED BY N.E.W.T.</span>
                  <Fingerprint className="w-3 h-3 text-zinc-600" />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 rounded-2xl p-6 relative overflow-hidden group">
              <div className="absolute inset-0 bg-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <h3 className="text-xs font-black text-white uppercase tracking-widest mb-4 flex items-center">
                <Database className="w-4 h-4 mr-2 text-amber-500" />
                Legacy Backend Health
              </h3>
              <div className="space-y-4">
                {[
                  { label: 'Fortran 77 Laminar Engine', status: 'OPTIMAL', color: 'text-green-500' },
                  { label: 'COBOL 85 Soliton Shield', status: 'STABLE', color: 'text-blue-500' },
                  {
                    label: 'SQL Matrix Relational Gate',
                    status: 'ENCRYPTED',
                    color: 'text-amber-500',
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex justify-between items-center text-[10px] font-mono"
                  >
                    <span className="text-zinc-500">{item.label}</span>
                    <span className={`${item.color} font-bold tracking-widest`}>{item.status}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-zinc-800">
                <div className="flex justify-between items-center text-[10px] font-mono text-zinc-600">
                  <span>SYSTEM UPTIME</span>
                  <span>100.000%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-zinc-800 py-8 bg-black">
        <div className="max-w-[1600px] mx-auto px-6 flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0 text-center lg:text-left">
          <div>
            <p className="text-xs font-black text-white uppercase tracking-widest mb-2">
              VALORAIPLUS® ©️ ™️ | OMEGA v2.4 SUPREME
            </p>
            <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-tighter leading-relaxed">
              18 U.S.C. § 1030 Protected // Constitutional Defended // ADA Title II Compliant<br />
              All Transactions governed by the Sovereign port.Hole Manifest.
            </p>
          </div>
          <div className="flex space-x-12 font-mono text-[10px] font-bold uppercase tracking-widest">
            <div>
              <p className="text-zinc-600 mb-1">Liquidity</p>
              <p className="text-zinc-300">Laminar flow</p>
            </div>
            <div>
              <p className="text-zinc-600 mb-1">Status</p>
              <p className="text-amber-500">PRODUCTION_READY</p>
            </div>
            <div>
              <p className="text-zinc-600 mb-1">Access</p>
              <p className="text-zinc-300">PUBLIC_NODE_V2207</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 opacity-50 grayscale hover:grayscale-0 transition-all">
            <Globe className="w-5 h-5 text-zinc-400" />
            <Layers className="w-5 h-5 text-zinc-400" />
            <Zap className="w-5 h-5 text-amber-500" />
          </div>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{
        __html: `
          .custom-scrollbar::-webkit-scrollbar { width: 4px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #444; }
        `,
      }} />
    </div>
  );
}
