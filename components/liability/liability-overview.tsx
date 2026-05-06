'use client';

import { Card, CardContent } from '@/components/ui/card';
import { DollarSign, Target, Building2, AlertTriangle } from 'lucide-react';

const stats = [
  {
    label: 'Total Liability',
    value: '$508,631,005.52',
    icon: DollarSign,
    color: 'text-red-400',
    bgColor: 'bg-red-400/10',
    description: 'Coordinated damages',
  },
  {
    label: 'Primary Targets',
    value: '2',
    icon: Target,
    color: 'text-amber-400',
    bgColor: 'bg-amber-400/10',
    description: '$279.7M combined',
  },
  {
    label: 'Financial Facilitators',
    value: '2',
    icon: Building2,
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10',
    description: '$127.2M combined',
  },
  {
    label: 'Spoliation Events',
    value: '8',
    icon: AlertTriangle,
    color: 'text-orange-400',
    bgColor: 'bg-orange-400/10',
    description: 'IDs 051-058',
  },
];

export function LiabilityOverview() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label} className="border-border bg-card/50 hover:border-red-400/30 transition-colors">
            <CardContent className="p-4">
              <div className="flex flex-col gap-3">
                <div className={`p-2 rounded-md w-fit ${stat.bgColor}`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div>
                  <span className="font-mono text-xs text-muted-foreground uppercase block">
                    {stat.label}
                  </span>
                  <span className={`font-mono text-xl font-bold ${stat.color}`}>
                    {stat.value}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground/60 block mt-1">
                    {stat.description}
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
