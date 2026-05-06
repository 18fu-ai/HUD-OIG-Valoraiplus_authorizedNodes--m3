'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Users, Calendar, AlertTriangle, Building, Scale } from 'lucide-react';

const caseInfo = {
  primaryCase: 'SGAU 7226.3461',
  hhrOcr: '25-621293',
  status: 'ACTIVE',
  priority: 'HIGH',
  daysActive: '2,207+',
  evidenceItems: '284K+',
  agenciesInvolved: 5,
  pendingActions: 3,
};

const stats = [
  {
    label: 'Primary Case ID',
    value: caseInfo.primaryCase,
    icon: FileText,
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-400/10',
  },
  {
    label: 'HHS OCR Reference',
    value: caseInfo.hhrOcr,
    icon: Building,
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10',
  },
  {
    label: 'Days Active',
    value: caseInfo.daysActive,
    icon: Calendar,
    color: 'text-amber-400',
    bgColor: 'bg-amber-400/10',
  },
  {
    label: 'Evidence Items',
    value: caseInfo.evidenceItems,
    icon: FileText,
    color: 'text-green-400',
    bgColor: 'bg-green-400/10',
  },
  {
    label: 'Agencies Involved',
    value: caseInfo.agenciesInvolved.toString(),
    icon: Users,
    color: 'text-purple-400',
    bgColor: 'bg-purple-400/10',
  },
  {
    label: 'Pending Actions',
    value: caseInfo.pendingActions.toString(),
    icon: AlertTriangle,
    color: 'text-orange-400',
    bgColor: 'bg-orange-400/10',
  },
];

export function CaseOverview() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label} className="border-border bg-card/50 hover:border-primary/50 transition-colors">
            <CardContent className="p-4">
              <div className="flex flex-col gap-3">
                <div className={`p-2 rounded-md w-fit ${stat.bgColor}`}>
                  <Icon className={`w-4 h-4 ${stat.color}`} />
                </div>
                <div>
                  <span className="font-mono text-xs text-muted-foreground uppercase block">
                    {stat.label}
                  </span>
                  <span className={`font-mono text-lg font-bold ${stat.color}`}>
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
