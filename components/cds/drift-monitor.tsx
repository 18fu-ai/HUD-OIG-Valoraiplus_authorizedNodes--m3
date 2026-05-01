'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Activity, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';
import type { DriftReport, DriftEvent, ProtocolSignals } from '@/lib/runtime-metrics';

interface DriftMonitorProps {
  driftReport: DriftReport;
  signals: ProtocolSignals;
  className?: string;
}

const severityColors: Record<string, string> = {
  critical: 'text-status-locked bg-status-locked/10 border-status-locked/30',
  warning: 'text-status-active bg-status-active/10 border-status-active/30',
  info: 'text-status-saturated bg-status-saturated/10 border-status-saturated/30',
};

const driftTypeLabels: Record<string, string> = {
  SCHEMA_MISMATCH: 'Schema',
  METRIC_STALE: 'Stale',
  VALUE_DEVIATION: 'Deviation',
  BOUNDARY_VIOLATION: 'Boundary',
  CLOCK_SKEW: 'Clock',
};

/**
 * DriftMonitor — Displays drift detection results and protocol signal health.
 * Shows both the drift event log and the 7-dimension signal radar.
 */
export function DriftMonitor({ driftReport, signals, className }: DriftMonitorProps) {
  // For display, invert negative signals so 0 (optimal) shows as 100%
  // actorEscalation: 0 = good (no threats), so display as 1 - value
  // statementRisk: 0 = good (no risk), so display as 1 - value
  const signalEntries = [
    { key: 'eventVelocity', label: 'Event Velocity', value: signals.eventVelocity, inverted: false },
    { key: 'actorEscalation', label: 'Threat Contained', value: 1 - signals.actorEscalation, inverted: true },
    { key: 'mutationDensity', label: 'Mutation Density', value: signals.mutationDensity, inverted: false },
    { key: 'replayConfidence', label: 'Replay Confidence', value: signals.replayConfidence, inverted: false },
    { key: 'sourceCompleteness', label: 'Source Complete', value: signals.sourceCompleteness, inverted: false },
    { key: 'statementRisk', label: 'Statements Verified', value: 1 - signals.statementRisk, inverted: true },
    { key: 'auditReadiness', label: 'Audit Readiness', value: signals.auditReadiness, inverted: false },
  ];

  return (
    <Card className={cn('border-border bg-card/50', className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="font-mono text-sm flex items-center gap-2">
            <Activity className="w-4 h-4 text-primary" />
            DRIFT MONITOR
          </CardTitle>
          <Badge 
            variant="outline" 
            className={cn(
              'font-mono text-[10px]',
              driftReport.systemHealthy 
                ? 'bg-status-anchored/10 text-status-anchored border-status-anchored/30' 
                : 'bg-status-locked/10 text-status-locked border-status-locked/30'
            )}
          >
            {driftReport.systemHealthy ? 'HEALTHY' : `${driftReport.criticalDrifts} DRIFTS`}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Signal Bars */}
        <div className="space-y-2" role="list" aria-label="Protocol signal strengths">
          {signalEntries.map(({ key, label, value }) => {
            const pct = Math.round(value * 100);
            // ABSOLUTE_9_ZERO_DRIFT: Green at 100%, yellow 80-99%, red below 80%
            const barColor = pct >= 100 ? 'bg-emerald-500' : pct >= 95 ? 'bg-status-anchored' : pct >= 80 ? 'bg-status-active' : 'bg-status-locked';
            
            return (
              <div key={key} className="flex items-center gap-3" role="listitem">
                <span className="font-mono text-[10px] text-muted-foreground w-28 shrink-0 truncate">
                  {label}
                </span>
                <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden" aria-hidden="true">
                  <div 
                    className={cn('h-full rounded-full transition-all duration-500', barColor)}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className={cn(
                  'font-mono text-[10px] w-10 text-right tabular-nums',
                  pct >= 85 ? 'text-status-anchored' : pct >= 60 ? 'text-status-active' : 'text-status-locked'
                )}>
                  {pct}%
                </span>
              </div>
            );
          })}
        </div>

        {/* Drift Events */}
        {driftReport.events.length > 0 ? (
          <div className="space-y-2 pt-2 border-t border-border">
            <p className="font-mono text-[10px] text-muted-foreground flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" aria-hidden="true" />
              {driftReport.totalDrifts} drift event{driftReport.totalDrifts !== 1 ? 's' : ''} detected
            </p>
            <div className="max-h-32 overflow-y-auto space-y-1.5" role="log" aria-label="Drift event log">
              {driftReport.events.slice(0, 5).map((event, i) => (
                <DriftEventRow key={`${event.metricId}-${i}`} event={event} />
              ))}
              {driftReport.events.length > 5 && (
                <p className="font-mono text-[10px] text-muted-foreground text-center pt-1">
                  +{driftReport.events.length - 5} more events
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 pt-2 border-t border-border">
            <CheckCircle2 className="w-3 h-3 text-status-anchored" aria-hidden="true" />
            <span className="font-mono text-[10px] text-status-anchored">
              Zero drift events | All metrics nominal
            </span>
          </div>
        )}

        {/* Last Check */}
        <LastCheckDisplay lastCheck={driftReport.lastCheck} />
      </CardContent>
    </Card>
  );
}

function DriftEventRow({ event }: { event: DriftEvent }) {
  return (
    <div className={cn(
      'flex items-center gap-2 px-2 py-1.5 rounded text-[10px] font-mono border',
      severityColors[event.severity],
    )}>
      <Badge variant="outline" className="font-mono text-[9px] shrink-0">
        {driftTypeLabels[event.type] || event.type}
      </Badge>
      <span className="truncate">{event.message}</span>
    </div>
  );
}

/**
 * LastCheckDisplay -- Client-only time display to prevent hydration mismatch.
 * Uses suppressHydrationWarning and useEffect to ensure server/client consistency.
 */
function LastCheckDisplay({ lastCheck }: { lastCheck: string }) {
  const [timeString, setTimeString] = useState<string>('--:--:--');

  useEffect(() => {
    // Only format time on client to avoid hydration mismatch
    setTimeString(new Date(lastCheck).toLocaleTimeString());
  }, [lastCheck]);

  return (
    <div className="flex items-center gap-1 pt-1">
      <Clock className="w-3 h-3 text-muted-foreground" aria-hidden="true" />
      <span className="font-mono text-[9px] text-muted-foreground" suppressHydrationWarning>
        Last check: {timeString}
      </span>
    </div>
  );
}
