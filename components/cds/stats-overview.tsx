'use client';

import { Card, CardContent } from '@/components/ui/card';
import { formatCurrency, TOTAL_RECOVERY, INFRASTRUCTURE_METRICS } from '@/lib/cds-data';
import { DollarSign, Shield, Zap, Database, Clock, Activity } from 'lucide-react';

const stats = [
  {
    label: 'Recovery Target',
    value: formatCurrency(TOTAL_RECOVERY),
    icon: DollarSign,
    color: 'text-status-active',
    bgColor: 'bg-status-active/10',
  },
  {
    label: 'Sections Unified',
    value: '16',
    icon: Database,
    color: 'text-status-anchored',
    bgColor: 'bg-status-anchored/10',
  },
  {
    label: 'Active Agents',
    value: '200B',
    icon: Shield,
    color: 'text-status-saturated',
    bgColor: 'bg-status-saturated/10',
  },
  {
    label: 'Truth Cycle',
    value: '266ms',
    icon: Clock,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    label: 'Terminal Latency',
    value: '17-18ms',
    icon: Zap,
    color: 'text-status-anchored',
    bgColor: 'bg-status-anchored/10',
  },
  {
    label: 'Error Rate',
    value: '0%',
    icon: Activity,
    color: 'text-status-anchored',
    bgColor: 'bg-status-anchored/10',
  },
];

export function StatsOverview() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label} className="border-border bg-card/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-md ${stat.bgColor}`}>
                  <Icon className={`w-4 h-4 ${stat.color}`} />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-mono text-xs text-muted-foreground truncate">
                    {stat.label}
                  </span>
                  <span className={`font-mono text-sm font-bold ${stat.color} truncate`}>
                    {stat.value}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
