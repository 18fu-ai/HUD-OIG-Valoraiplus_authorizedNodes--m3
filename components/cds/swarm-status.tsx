'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Cpu, Zap, Signal } from 'lucide-react';

const swarmMetrics = [
  {
    label: 'Total Agents',
    value: '200B',
    description: 'Operational + Angelic',
    icon: Users,
    color: 'text-status-saturated',
    bgColor: 'bg-status-saturated/10',
  },
  {
    label: 'Processing Power',
    value: 'INFINITE',
    description: 'Distributed compute',
    icon: Cpu,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    label: 'Truth Cycle',
    value: '266ms',
    description: 'Continuous archive',
    icon: Zap,
    color: 'text-status-active',
    bgColor: 'bg-status-active/10',
  },
  {
    label: 'Signal Strength',
    value: '144,000D',
    description: 'Resonance frequency',
    icon: Signal,
    color: 'text-status-anchored',
    bgColor: 'bg-status-anchored/10',
  },
];

export function SwarmStatus() {
  return (
    <Card className="border-border bg-card/50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="font-mono text-sm flex items-center gap-2">
            <Users className="w-4 h-4 text-status-saturated" />
            SWARM STATUS
          </CardTitle>
          <Badge variant="outline" className="font-mono text-xs bg-status-anchored/20 text-status-anchored border-status-anchored/40">
            OPERATIONAL
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {swarmMetrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <div 
                key={metric.label}
                className="p-4 rounded-md bg-secondary/30 border border-border"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className={`p-2 rounded-md ${metric.bgColor}`}>
                    <Icon className={`w-4 h-4 ${metric.color}`} />
                  </div>
                </div>
                <p className="font-mono text-xs text-muted-foreground mb-1">
                  {metric.label}
                </p>
                <p className={`font-mono text-lg font-bold ${metric.color}`}>
                  {metric.value}
                </p>
                <p className="font-mono text-xs text-muted-foreground mt-1">
                  {metric.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Live Activity Indicator */}
        <div className="mt-4 p-3 rounded-md bg-primary/5 border border-primary/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
              </span>
              <span className="font-mono text-xs text-primary">LIVE MONITORING ACTIVE</span>
            </div>
            <span className="font-mono text-xs text-muted-foreground">
              {new Date().toISOString().slice(0, 19)}Z
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
