'use client';

import { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Download, CheckCircle2, Clock, Database } from 'lucide-react';
import type { MetricSnapshot } from '@/lib/runtime-metrics';

interface SnapshotExportProps {
  snapshot: MetricSnapshot;
  className?: string;
}

/**
 * SnapshotExport — Exportable runtime snapshot with provenance tagging.
 * Generates a JSON snapshot of all runtime metrics, drift state,
 * signal model, and provenance tags for external audit consumption.
 */
export function SnapshotExport({ snapshot, className }: SnapshotExportProps) {
  const [exported, setExported] = useState(false);
  const [lastExportTime, setLastExportTime] = useState<string | null>(null);

  const handleExport = useCallback(() => {
    const exportData = {
      ...snapshot,
      exportMeta: {
        exportedAt: new Date().toISOString(),
        format: 'CDS-RUNTIME-SNAPSHOT-V1',
        schemaRev: snapshot.schemaRev,
        metricsCount: snapshot.metrics.length,
        driftsClear: snapshot.driftReport.systemHealthy,
        signalAvg: Object.values(snapshot.signals).reduce((a, b) => a + b, 0) / 7,
      },
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cds-runtime-snapshot-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setExported(true);
    setLastExportTime(new Date().toISOString());
    setTimeout(() => setExported(false), 3000);
  }, [snapshot]);

  return (
    <Card className={cn('border-border bg-card/50', className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="font-mono text-sm flex items-center gap-2">
            <Database className="w-4 h-4 text-primary" aria-hidden="true" />
            RUNTIME SNAPSHOT
          </CardTitle>
          <Badge variant="outline" className="font-mono text-[10px] bg-primary/10 text-primary border-primary/40">
            {snapshot.schemaRev}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Snapshot Summary */}
        <div className="grid grid-cols-2 gap-2">
          <div className="p-2 rounded bg-secondary/30">
            <p className="font-mono text-[10px] text-muted-foreground">Metrics</p>
            <p className="font-mono text-sm font-bold text-foreground">{snapshot.metrics.length}</p>
          </div>
          <div className="p-2 rounded bg-secondary/30">
            <p className="font-mono text-[10px] text-muted-foreground">Truth Cycle</p>
            <p className="font-mono text-sm font-bold text-primary">{snapshot.truthCycle.toLocaleString()}</p>
          </div>
          <div className="p-2 rounded bg-secondary/30">
            <p className="font-mono text-[10px] text-muted-foreground">Drift Events</p>
            <p className={cn(
              'font-mono text-sm font-bold',
              snapshot.driftReport.totalDrifts === 0 ? 'text-status-anchored' : 'text-status-active'
            )}>
              {snapshot.driftReport.totalDrifts}
            </p>
          </div>
          <div className="p-2 rounded bg-secondary/30">
            <p className="font-mono text-[10px] text-muted-foreground">Healthy</p>
            <p className={cn(
              'font-mono text-sm font-bold',
              snapshot.driftReport.systemHealthy ? 'text-status-anchored' : 'text-status-locked'
            )}>
              {snapshot.driftReport.systemHealthy ? 'YES' : 'NO'}
            </p>
          </div>
        </div>

        {/* Export Button */}
        <Button 
          onClick={handleExport} 
          variant="outline"
          className="w-full font-mono text-xs gap-2"
          aria-label="Export runtime snapshot as JSON"
        >
          {exported ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-status-anchored" />
              <span className="text-status-anchored">EXPORTED</span>
            </>
          ) : (
            <>
              <Download className="w-3.5 h-3.5" />
              EXPORT SNAPSHOT
            </>
          )}
        </Button>

        {/* Last Export */}
        {lastExportTime && (
          <div className="flex items-center gap-1.5 justify-center">
            <Clock className="w-3 h-3 text-muted-foreground" aria-hidden="true" />
            <span className="font-mono text-[9px] text-muted-foreground">
              Last export: {new Date(lastExportTime).toLocaleTimeString()}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
