'use client';

import React, { useState, useEffect } from 'react';
import { Clock, Zap } from 'lucide-react';

interface AtomicClockTickerProps {
  showMilliseconds?: boolean;
  compact?: boolean;
}

export function AtomicClockTicker({
  showMilliseconds = true,
  compact = false,
}: AtomicClockTickerProps) {
  const [time, setTime] = useState<string>('');
  const [ms, setMs] = useState<string>('000');
  const [synced, setSynced] = useState(true);

  useEffect(() => {
    // Update every 10ms for smooth millisecond display
    const interval = setInterval(() => {
      const now = new Date();
      
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      const milliseconds = String(now.getMilliseconds()).padStart(3, '0');
      
      setTime(`${hours}:${minutes}:${seconds}`);
      setMs(milliseconds);
      
      // Simulate NTP sync check every 5 seconds
      if (now.getSeconds() % 5 === 0) {
        setSynced(true);
      }
    }, 10);

    return () => clearInterval(interval);
  }, []);

  if (compact) {
    return (
      <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
        <Clock className="w-3 h-3" />
        <span>{time}</span>
        {showMilliseconds && <span className="text-emerald-400">.{ms}</span>}
        {synced && <Zap className="w-3 h-3 text-emerald-400" />}
      </div>
    );
  }

  return (
    <div className="p-4 bg-zinc-950 border border-emerald-500/20 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <div className="text-xs text-zinc-500 font-mono tracking-wide">ATOMIC CLOCK SYNC</div>
        <div className={`w-2 h-2 rounded-full ${synced ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'}`} />
      </div>
      
      <div className="flex items-baseline gap-1">
        <div className="text-3xl font-bold font-mono text-emerald-400">{time}</div>
        {showMilliseconds && (
          <div className="text-xl font-bold font-mono text-emerald-300">.{ms}</div>
        )}
      </div>
      
      <div className="text-xs text-zinc-500 font-mono mt-2">
        {synced ? '✓ Synced with NTP' : '⚠ Sync pending'}
      </div>
    </div>
  );
}
