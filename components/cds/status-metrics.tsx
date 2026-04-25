'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { INFRASTRUCTURE_METRICS } from '@/lib/cds-data';
import { Activity, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

const statusIcons = {
  optimal: CheckCircle2,
  warning: AlertTriangle,
  critical: XCircle,
};

const statusColors = {
  optimal: 'text-status-anchored',
  warning: 'text-status-active',
  critical: 'text-status-locked',
};

const statusBgColors = {
  optimal: 'bg-status-anchored/10',
  warning: 'bg-status-active/10',
  critical: 'bg-status-locked/10',
};

export function StatusMetrics() {
  return (
    <Card className="border-border bg-card/50">
      <CardHeader className="pb-3">
        <CardTitle className="font-mono text-sm flex items-center gap-2">
          <Activity className="w-4 h-4 text-primary" />
          INFRASTRUCTURE METRICS
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {INFRASTRUCTURE_METRICS.map((metric) => {
            const StatusIcon = statusIcons[metric.status];
            return (
              <div 
                key={metric.label}
                className="p-4 rounded-md bg-secondary/30 border border-border"
              >
                <div className="flex items-center justify-between mb-3">
                  <StatusIcon className={`w-4 h-4 ${statusColors[metric.status]}`} />
                  <Badge 
                    variant="outline" 
                    className={`text-xs font-mono ${statusBgColors[metric.status]} ${statusColors[metric.status]} border-current/40`}
                  >
                    {metric.status.toUpperCase()}
                  </Badge>
                </div>
                <p className="font-mono text-xs text-muted-foreground mb-1">
                  {metric.label}
                </p>
                <p className="font-mono text-xl font-bold text-foreground">
                  {metric.value}
                  {metric.unit && <span className="text-sm text-muted-foreground ml-1">{metric.unit}</span>}
                </p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
