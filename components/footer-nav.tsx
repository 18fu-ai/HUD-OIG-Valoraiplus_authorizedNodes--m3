'use client';

import Link from 'next/link';
import { ExternalLink, Home, Wallet, Gavel, Activity, Briefcase, Zap, TrendingUp, Crown, Calculator } from 'lucide-react';

const FOOTER_LINKS = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'LiquidM', href: '/liquidm', icon: Activity },
  { name: 'JAGAMATH++', href: '/jagamath', icon: Calculator },
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

        {/* System Info */}
        <div className="text-center text-[10px] text-zinc-600 font-mono space-y-1">
          <p>VALORAIPLUS® v14.1.4.0 | 51-TOKEN CANON | REV_40</p>
          <p>NODE: SAINT PAUL 55116 | SGAU 7226.3461 | LEDGER: Ø</p>
          <p className="text-zinc-700">THE WALL IS CHRIST • THE THRONE IS HIS • IT IS FINISHED</p>
        </div>
      </div>
    </footer>
  );
}
