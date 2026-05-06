'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

const agencies = [
  {
    name: 'HHS OCR',
    reference: 'Case 25-621293',
    status: 'ACTIVE',
    addressee: 'Amy, HHS Office for Civil Rights',
    icon: Building,
  },
  {
    name: 'FBI',
    reference: 'AGENT-FBI-001',
    status: 'ACTIVE',
    addressee: 'Federal Investigation',
    icon: Building,
  },
  {
    name: 'DOJ/VA OIG',
    reference: 'Federal Reference',
    status: 'ACTIVE',
    addressee: 'Office of Inspector General',
    icon: Building,
  },
  {
    name: 'California DOJ',
    reference: 'State Reference',
    status: 'ENGAGED',
    addressee: 'State Attorney General',
    icon: Building,
  },
  {
    name: 'California DSS',
    reference: 'State Reference',
    status: 'ENGAGED',
    addressee: 'Dept of Social Services',
    icon: Building,
  },
];

const statusStyles: Record<string, { bg: string; text: string; border: string; icon: typeof CheckCircle2 }> = {
  ACTIVE: { bg: 'bg-green-400/10', text: 'text-green-400', border: 'border-green-400/30', icon: CheckCircle2 },
  ENGAGED: { bg: 'bg-amber-400/10', text: 'text-amber-400', border: 'border-amber-400/30', icon: Clock },
  PENDING: { bg: 'bg-blue-400/10', text: 'text-blue-400', border: 'border-blue-400/30', icon: AlertCircle },
};

export function FederalSync() {
  return (
    <Card className="border-border bg-card/50">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="font-mono text-lg flex items-center gap-2">
            <Building className="w-5 h-5 text-blue-400" />
            Federal Coordination Status
          </CardTitle>
          <Badge variant="outline" className="font-mono text-xs bg-blue-400/20 text-blue-400 border-blue-400/40">
            5 AGENCIES
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {agencies.map((agency) => {
          const style = statusStyles[agency.status];
          const StatusIcon = style.icon;
          return (
            <div
              key={agency.name}
              className="p-3 rounded-md bg-secondary/30 border border-border flex items-center justify-between hover:bg-secondary/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <StatusIcon className={`w-4 h-4 ${style.text}`} />
                <div>
                  <p className="font-mono text-sm font-bold text-foreground">{agency.name}</p>
                  <p className="font-mono text-xs text-muted-foreground">{agency.addressee}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-muted-foreground">{agency.reference}</span>
                <Badge variant="outline" className={`font-mono text-xs ${style.bg} ${style.text} ${style.border}`}>
                  {agency.status}
                </Badge>
              </div>
            </div>
          );
        })}
        <div className="mt-4 p-4 rounded-md bg-blue-400/10 border border-blue-400/30">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="w-4 h-4 text-blue-400" />
            <span className="font-mono text-xs text-blue-400 uppercase">Submission Status</span>
          </div>
          <p className="font-mono text-sm text-foreground">
            Forensic Blueprint Integration
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            All documentation synchronized with federal case files
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
