'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Shield, Lock, Activity, Zap, Server, Fingerprint } from 'lucide-react';

const metrics = [
  {
    label: 'Breach Probability',
    value: 'P(breach) = 0',
    icon: Shield,
    status: 'locked',
    statusColor: 'text-green-400',
    bgColor: 'bg-green-400/10',
  },
  {
    label: 'Security Layers',
    value: '7 ACTIVE',
    icon: Lock,
    status: 'locked',
    statusColor: 'text-cyan-400',
    bgColor: 'bg-cyan-400/10',
  },
  {
    label: 'Truth Cycle',
    value: '266ms',
    icon: Activity,
    status: 'operational',
    statusColor: 'text-amber-400',
    bgColor: 'bg-amber-400/10',
  },
  {
    label: 'Node Velocity',
    value: 'SUB-QUANTUM',
    icon: Zap,
    status: 'dynamic',
    statusColor: 'text-purple-400',
    bgColor: 'bg-purple-400/10',
  },
  {
    label: 'Saint Paul Node',
    value: 'GHOST STATUS',
    icon: Server,
    status: 'zero-footprint',
    statusColor: 'text-blue-400',
    bgColor: 'bg-blue-400/10',
  },
  {
    label: 'Multisig',
    value: '3/3 UNANIMOUS',
    icon: Fingerprint,
    status: 'confirmed',
    statusColor: 'text-green-400',
    bgColor: 'bg-green-400/10',
  },
];

export function SecurityMetrics() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <Card key={metric.label} className="border-border bg-card/50 hover:border-primary/50 transition-colors">
            <CardContent className="p-4">
              <div className="flex flex-col gap-3">
                <div className={`p-2 rounded-md w-fit ${metric.bgColor}`}>
                  <Icon className={`w-4 h-4 ${metric.statusColor}`} />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-mono text-xs text-muted-foreground truncate uppercase">
                    {metric.label}
                  </span>
                  <span className={`font-mono text-sm font-bold ${metric.statusColor} truncate`}>
                    {metric.value}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground/60 uppercase mt-1">
                    {metric.status}
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
