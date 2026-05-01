'use client';

import { useEffect, useRef, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { TRUTH_CYCLE_MS, createSafeInterval } from '@/lib/runtime-metrics';
import { useAuthority } from '@/hooks/use-authority';

interface RuntimeBarProps {
  className?: string;
}

/**
 * RuntimeBar — Backend Authority-Driven Telemetry Strip
 * ======================================================
 * CRITICAL: Dashboard reads greenAllowed and runtimeSignal from backend authority.
 * Dashboard MUST NOT recompute greenAllowed locally.
 * 
 * Core Lock:
 *   greenAllowed = ancestryComplete && zeroDrift && optimumSignal && assuranceClean && maturationComplete
 */
export function RuntimeBar({ className }: RuntimeBarProps) {
  const [currentTime, setCurrentTime] = useState('');
  const [mounted, setMounted] = useState(false);
  const intervalRef = useRef<(() => void) | null>(null);
  
  // BACKEND AUTHORITY - Single source of truth
  const { authority, isLoading } = useAuthority(1000);

  useEffect(() => {
    setMounted(true);
    const safeTimer = createSafeInterval(() => {
      setCurrentTime(new Date().toISOString().slice(0, 19) + 'Z');
    }, 1000);
    intervalRef.current = safeTimer.start();
    return () => {
      if (intervalRef.current) intervalRef.current();
    };
  }, []);

  if (!mounted) return null;

  // READ FROM BACKEND AUTHORITY - DO NOT RECOMPUTE LOCALLY
  const { greenAllowed, runtimeSignal, signalPercent, driftCriticalCount, truthCycle, protocolRev } = authority;

  // Signal color derived from backend runtimeSignal
  const signalColor = 
    runtimeSignal === 'OPTIMUM' ? 'text-emerald-400' :
    runtimeSignal === 'NOMINAL' ? 'text-status-anchored' :
    runtimeSignal === 'DEGRADED' ? 'text-status-active' : 'text-status-locked';

  // Drift status derived from backend
  const driftClear = driftCriticalCount === 0 && greenAllowed;

  return (
    <div 
      className={cn(
        'flex flex-wrap items-center gap-4 p-4 rounded-lg bg-card/50 border border-border',
        className,
      )}
      role="status"
      aria-label="System runtime status bar"
      aria-live="polite"
    >
      {/* Live Indicator */}
      <div className="flex items-center gap-2">
        <span className="relative flex h-2 w-2" aria-hidden="true">
          <span className={cn(
            "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
            greenAllowed ? "bg-emerald-500" : "bg-primary"
          )} />
          <span className={cn(
            "relative inline-flex rounded-full h-2 w-2",
            greenAllowed ? "bg-emerald-500" : "bg-primary"
          )} />
        </span>
        <span className={cn(
          "font-mono text-xs",
          greenAllowed ? "text-emerald-400" : "text-primary"
        )}>
          {isLoading ? 'SYNC' : 'LIVE'}
        </span>
      </div>

      {/* Truth Cycle */}
      <div className="font-mono text-xs text-muted-foreground">
        <span className="sr-only">Truth cycle count:</span>
        TRUTH-CYCLE:{' '}
        <span className={greenAllowed ? "text-emerald-400" : "text-primary"} aria-label={`${truthCycle} cycles at ${TRUTH_CYCLE_MS}ms`}>
          {truthCycle.toLocaleString()}
        </span>{' '}
        @ {TRUTH_CYCLE_MS}ms
      </div>

      {/* Timestamp */}
      <div className="font-mono text-xs text-muted-foreground">
        <span className="sr-only">Current timestamp:</span>
        TIMESTAMP: <span className="text-foreground">{currentTime}</span>
      </div>

      {/* Signal Summary - FROM BACKEND AUTHORITY */}
      <div className="font-mono text-xs text-muted-foreground">
        SIGNAL:{' '}
        <span className={signalColor}>
          {runtimeSignal} ({signalPercent.toFixed(1)}%)
        </span>
      </div>

      {/* Drift Status - FROM BACKEND AUTHORITY */}
      <div className="font-mono text-xs text-muted-foreground">
        DRIFT:{' '}
        {driftClear ? (
          <span className="text-emerald-400">0 ABSOLUTE</span>
        ) : (
          <Badge variant="outline" className="font-mono text-[10px] bg-status-locked/20 text-status-locked border-status-locked/40">
            {driftCriticalCount} CRITICAL
          </Badge>
        )}
      </div>

      {/* Green Allowed Status */}
      {greenAllowed && (
        <Badge variant="outline" className="font-mono text-[10px] bg-emerald-500/20 text-emerald-400 border-emerald-500/40">
          GREEN_RENDER_ALLOWED
        </Badge>
      )}

      {/* Schema Rev */}
      <Badge variant="outline" className={cn(
        "font-mono text-[10px]",
        greenAllowed 
          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/40"
          : "bg-primary/10 text-primary border-primary/40"
      )}>
        {protocolRev}
      </Badge>
    </div>
  );
}
