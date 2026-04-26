'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { 
  TRUTH_CYCLE_MS,
  createSafeInterval,
  type ProtocolSignals,
  type DriftReport,
} from '@/lib/runtime-metrics';

interface RuntimeBarProps {
  signals: ProtocolSignals;
  driftReport: DriftReport;
  truthCycle: number;
  className?: string;
}

/**
 * RuntimeBar — Performance-safe live telemetry strip.
 * Uses requestAnimationFrame-gated timing for the truth cycle counter,
 * preventing unnecessary re-renders when tab is backgrounded.
 * Displays: LIVE indicator, truth cycle, timestamp, signal summary, drift status.
 */
export function RuntimeBar({ signals, driftReport, truthCycle, className }: RuntimeBarProps) {
  const [currentTime, setCurrentTime] = useState('');
  const [mounted, setMounted] = useState(false);
  const intervalRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    setMounted(true);
    // Performance-safe 1s clock using RAF gating
    const safeTimer = createSafeInterval(() => {
      setCurrentTime(new Date().toISOString().slice(0, 19) + 'Z');
    }, 1000);
    intervalRef.current = safeTimer.start();
    return () => {
      if (intervalRef.current) intervalRef.current();
    };
  }, []);

  const signalAvg = useCallback(() => {
    const vals = Object.values(signals);
    return vals.length > 0 ? vals.reduce((a, b) => a + b, 0) / vals.length : 0;
  }, [signals]);

  if (!mounted) return null;

  const avg = signalAvg();
  const signalStatus = avg >= 0.85 ? 'NOMINAL' : avg >= 0.6 ? 'DEGRADED' : 'CRITICAL';
  const signalColor = avg >= 0.85 
    ? 'text-status-anchored' 
    : avg >= 0.6 
      ? 'text-status-active' 
      : 'text-status-locked';

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
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
        </span>
        <span className="font-mono text-xs text-primary">LIVE</span>
      </div>

      {/* Truth Cycle */}
      <div className="font-mono text-xs text-muted-foreground">
        <span className="sr-only">Truth cycle count:</span>
        TRUTH-CYCLE:{' '}
        <span className="text-primary" aria-label={`${truthCycle} cycles at ${TRUTH_CYCLE_MS}ms`}>
          {truthCycle.toLocaleString()}
        </span>{' '}
        @ {TRUTH_CYCLE_MS}ms
      </div>

      {/* Timestamp */}
      <div className="font-mono text-xs text-muted-foreground">
        <span className="sr-only">Current timestamp:</span>
        TIMESTAMP: <span className="text-foreground">{currentTime}</span>
      </div>

      {/* Signal Summary */}
      <div className="font-mono text-xs text-muted-foreground">
        SIGNAL:{' '}
        <span className={signalColor}>
          {signalStatus} ({(avg * 100).toFixed(1)}%)
        </span>
      </div>

      {/* Drift Status */}
      <div className="font-mono text-xs text-muted-foreground">
        DRIFT:{' '}
        {driftReport.systemHealthy ? (
          <span className="text-status-anchored">CLEAR</span>
        ) : (
          <Badge variant="outline" className="font-mono text-[10px] bg-status-locked/20 text-status-locked border-status-locked/40">
            {driftReport.criticalDrifts} CRITICAL
          </Badge>
        )}
      </div>

      {/* Schema Rev */}
      <Badge variant="outline" className="font-mono text-[10px] bg-primary/10 text-primary border-primary/40">
        REV_38
      </Badge>
    </div>
  );
}
