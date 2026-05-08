'use client';

import Link from 'next/link';
import { ExternalLink, Home, Wallet, Gavel, Activity, Briefcase, Zap, TrendingUp, Crown, Calculator, Shield } from 'lucide-react';

const FOOTER_LINKS = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'LiquidM', href: '/liquidm', icon: Activity },
  { name: 'JAGAMATH++', href: '/jagamath', icon: Calculator },
  { name: 'Quagmire Prevention', href: '/quagmire-prevention', icon: Shield },
  { name: 'Treasury', href: '/treasury-liquidity', icon: Wallet },
  { name: 'Litigation', href: '/litigation', icon: Gavel },
  { name: 'Exchange', href: '/exchange', icon: Activity },
  { name: 'Investor', href: '/investor', icon: Briefcase },
  { name: 'Deploy', href: '/deploy-tokens', icon: Zap },
  { name: 'Revenue', href: '/revenue', icon: TrendingUp },
  { name: 'Orchestrator', href: '/orchestrator', icon: Crown },
];

const EXTERNAL_LINKS = [
  { name: '18fu.cash', href: 'https://www.18fu.cash' },
  { name: 'ValorBank', href: 'https://valorbank-rfvbdnaa.manus.space/' },
];

// Genesis Anchor - Bitcoin Block 0 (2009)
const GENESIS_ANCHOR = {
  hash: "4A5E1E4BAAB89F3A32518A88C31BC87F618F76673E2CC77AB2127B7AFDEDA33B",
  shortHash: "4A5E1E4B...DEDA33B",
};

// Primary Liquidity Routing
const LIQUIDITY_ROUTING = {
  endpoint: "https://www.18fu.cash",
  wallet: "0xb103666AB91ceb4Cbb9e1FC21B81f1ec93601BeB",
  walletShort: "0xb103666...601BeB",
  ens: "donadams1969.eth",
  final: "Schwab [8185]",
  status: "LOCKED",
};

export function FooterNav() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 mt-8">
      <div className="container mx-auto px-4 py-6">
        {/* Quick Links */}
        <div className="flex flex-wrap justify-center gap-4 mb-4">
          {FOOTER_LINKS.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-1 px-3 py-1.5 rounded bg-zinc-900 hover:bg-zinc-800 transition-colors text-xs text-zinc-400 hover:text-white"
              >
                <Icon className="w-3 h-3" />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </div>

        {/* External Links */}
        <div className="flex justify-center gap-4 mb-4">
          {EXTERNAL_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-3 py-1.5 rounded bg-cyan-900/20 hover:bg-cyan-900/40 transition-colors text-xs text-cyan-400 hover:text-cyan-300"
            >
              <span>{link.name}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          ))}
        </div>

        {/* Liquidity Routing Banner */}
        <div className="flex justify-center mb-4">
          <div className="flex flex-col items-center gap-1 px-6 py-3 rounded bg-emerald-900/20 border border-emerald-700/30">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-500 animate-pulse" />
              <span className="text-xs text-emerald-400 font-bold">ALL LIQUIDITY ROUTED THROUGH:</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 text-[10px] font-mono">
              <a href={LIQUIDITY_ROUTING.endpoint} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 underline">
                18fu.cash
              </a>
              <span className="text-emerald-600">→</span>
              <code className="text-emerald-300">{LIQUIDITY_ROUTING.walletShort}</code>
              <span className="text-emerald-600">→</span>
              <span className="text-emerald-400">{LIQUIDITY_ROUTING.final}</span>
            </div>
            <div className="text-[9px] text-emerald-500">
              ENS: {LIQUIDITY_ROUTING.ens} | STATUS: {LIQUIDITY_ROUTING.status}
            </div>
          </div>
        </div>

        {/* Genesis Anchor */}
        <div className="flex justify-center mb-4">
          <div className="flex items-center gap-2 px-4 py-2 rounded bg-amber-900/20 border border-amber-700/30">
            <Shield className="w-4 h-4 text-amber-500" />
            <span className="text-[10px] text-amber-400 font-mono">GENESIS ANCHOR LOCKED:</span>
            <code className="text-[10px] text-amber-300 font-mono">{GENESIS_ANCHOR.shortHash}</code>
            <span className="text-[10px] text-amber-600">|</span>
            <span className="text-[10px] text-amber-400">PINCER: LOCKED</span>
            <span className="text-[10px] text-amber-600">|</span>
            <span className="text-[10px] text-amber-400">EXIT: SETTLEMENT_RELEASE</span>
          </div>
        </div>

        {/* System Info */}
        <div className="text-center text-[10px] text-zinc-600 font-mono space-y-1">
          <p>VALORAIPLUS® v14.1.4.0 | 56-TOKEN CANON | REV_40 | CASE: 25-621293</p>
          <p>NODE: SAINT PAUL 55116 | SGAU 7226.3461 | MERKLE: 26856B24...777777_STRIKE_0_LOCKED</p>
          <p className="text-emerald-600">DESTINATION: 0xb103666AB91ceb4Cbb9e1FC21B81f1ec93601BeB → Schwab [8185]</p>
          <p className="text-amber-700">THE MUZZLE IS THE GENESIS. THE MATH IS THE HAMMER.</p>
          <p className="text-zinc-700">THE WALL IS CHRIST • THE THRONE IS HIS • THE LEDGER IS Ø • IT IS FINISHED</p>
        </div>
      </div>
    </footer>
  );
}
