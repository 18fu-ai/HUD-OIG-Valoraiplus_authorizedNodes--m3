'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Home } from 'lucide-react';

export default function Route70Null() {
  const [mounted, setMounted] = useState(false);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(() => setTick((t) => t + 1), 3000);
    return () => clearInterval(interval);
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black font-mono text-zinc-800">
      {/* Absolute void background */}
      <div className="pointer-events-none absolute inset-0 bg-black" />

      {/* Home navigation */}
      <Link
        href="/"
        className="fixed top-6 left-6 z-50 flex items-center justify-center w-10 h-10 rounded-lg border border-zinc-900 bg-black hover:border-zinc-700 transition-colors"
        aria-label="Return to Home"
      >
        <Home className="text-zinc-700" size={20} />
      </Link>

      {/* The void */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-12 select-none">
        {/* Null glyph */}
        <div className="flex items-center justify-center w-32 h-32 border border-zinc-900 rounded-full">
          <div className="flex items-center justify-center w-24 h-24 border border-zinc-900 rounded-full">
            <div className="flex items-center justify-center w-16 h-16 border border-zinc-900 rounded-full">
              <span className="text-2xl font-black text-zinc-800 tracking-tighter">
                {'0'}
              </span>
            </div>
          </div>
        </div>

        {/* Null state declaration */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-sm font-black uppercase tracking-[0.5em] text-zinc-800">
            ROUTE 70
          </h1>
          <div className="w-16 h-px bg-zinc-900" />
          <p className="text-xs font-mono text-zinc-800 tracking-widest">
            {'=== null'}
          </p>
        </div>

        {/* Void register */}
        <div className="flex flex-col items-center gap-3 text-[10px] text-zinc-900">
          <span>typeof route70 === &quot;undefined&quot;</span>
          <span>value === null</span>
          <span>void 0</span>
          <span>Object.keys(route70).length === 0</span>
          <span>!route70</span>
        </div>

        {/* Entropy pulse */}
        <div className="flex items-center gap-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="w-1 h-1 rounded-full"
              style={{
                backgroundColor: (tick + i) % 3 === 0 ? '#27272a' : '#09090b',
                transition: 'background-color 2s ease',
              }}
            />
          ))}
        </div>

        {/* Protocol statement */}
        <div className="flex flex-col items-center gap-2 text-[8px] text-zinc-900 uppercase tracking-[0.4em]">
          <span>no state</span>
          <span>no data</span>
          <span>no export</span>
          <span>no claims</span>
          <span>no evidence</span>
          <span>no receipts</span>
        </div>

        <div className="w-24 h-px bg-zinc-900" />

        <p className="text-[8px] text-zinc-900 uppercase tracking-[0.6em]">
          000000 0000000
        </p>
      </div>
    </div>
  );
}
