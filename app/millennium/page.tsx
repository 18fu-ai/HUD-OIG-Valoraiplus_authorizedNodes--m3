"use client";

import { NavierStokesPanel } from "@/components/millennium/navier-stokes-panel";
import { AtomicClockTicker } from "@/components/wallet/atomic-clock-ticker";
import Link from "next/link";

export default function MillenniumPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Page Header */}
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <p className="text-zinc-600 font-mono text-xs mb-1">
              VALORAIPLUS® OMEGA v2.4 SUPREME &nbsp;/&nbsp; MILLENNIUM DIVISION
            </p>
            <h1 className="text-2xl font-bold font-mono text-cyan-300 tracking-widest">
              MILLENNIUM PROBLEMS
            </h1>
            <p className="text-zinc-500 font-mono text-xs mt-1">
              Case CCRS-202601-33270627 &nbsp;|&nbsp; N.E.W.T.® v7.0.0 ACTIVE
            </p>
          </div>
          <AtomicClockTicker showMilliseconds={true} compact={true} />
        </div>

        {/* Main Panel */}
        <NavierStokesPanel />

        {/* Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
          {[
            { label: "TREASURY",  href: "/treasury" },
            { label: "EXCHANGE",  href: "/exchange" },
            { label: "WALLET",    href: "/wallet" },
            { label: "DASHBOARD", href: "/dashboard" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-center bg-zinc-900/60 hover:bg-zinc-800/60 border border-zinc-800 hover:border-zinc-700 rounded p-3 font-mono text-xs text-zinc-400 hover:text-zinc-200 transition-all"
            >
              {link.label}
            </Link>
          ))}
        </div>

      </div>
    </main>
  );
}
