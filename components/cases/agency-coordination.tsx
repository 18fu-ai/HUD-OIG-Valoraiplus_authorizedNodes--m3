'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building, Users, MessageSquare, FileText, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

const agencies = [
  {
    name: 'HHS Office for Civil Rights',
    abbreviation: 'HHS OCR',
    caseRef: '25-621293',
    contact: 'Amy',
    status: 'ACTIVE',
    lastContact: '2026-05-04',
    pendingItems: 0,
    notes: 'Forensic Blueprint Integration submitted',
  },
  {
    name: 'Federal Bureau of Investigation',
    abbreviation: 'FBI',
    caseRef: 'AGENT-FBI-001',
    contact: 'Special Agent',
    status: 'ACTIVE',
    lastContact: '2026-05-04',
    pendingItems: 0,
    notes: 'Case files synchronized',
  },
  {
    name: 'Department of Justice / VA OIG',
    abbreviation: 'DOJ/VA OIG',
    caseRef: 'Federal Reference',
    contact: 'Office of Inspector General',
    status: 'ACTIVE',
    lastContact: '2026-05-04',
    pendingItems: 1,
    notes: 'Awaiting additional documentation request',
  },
  {
    name: 'California Department of Justice',
    abbreviation: 'CA DOJ',
    caseRef: 'State Reference',
    contact: 'State Attorney General',
    status: 'ENGAGED',
    lastContact: '2026-05-03',
    pendingItems: 1,
    notes: 'Initial engagement, response pending',
  },
  {
    name: 'California Dept of Social Services',
    abbreviation: 'CA DSS',
    caseRef: 'State Reference',
    contact: 'Department',
    status: 'ENGAGED',
    lastContact: '2026-05-02',
    pendingItems: 2,
    notes: 'Documentation compilation in progress',
  },
];

const statusStyles: Record<string, { bg: string; text: string; border: string; icon: typeof CheckCircle2 }> = {
  ACTIVE: { bg: 'bg-green-400/10', text: 'text-green-400', border: 'border-green-400/30', icon: CheckCircle2 },
  ENGAGED: { bg: 'bg-amber-400/10', text: 'text-amber-400', border: 'border-amber-400/30', icon: Clock },
  PENDING: { bg: 'bg-blue-400/10', text: 'text-blue-400', border: 'border-blue-400/30', icon: AlertCircle },
};

export function AgencyCoordination() {
  return (
    <Card className="border-border bg-card/50">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="font-mono text-lg flex items-center gap-2">
            <Building className="w-5 h-5 text-blue-400" />
            Agency Coordination Matrix
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="font-mono text-xs bg-green-400/20 text-green-400 border-green-400/40">
              3 ACTIVE
            </Badge>
            <Badge variant="outline" className="font-mono text-xs bg-amber-400/20 text-amber-400 border-amber-400/40">
              2 ENGAGED
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-3 font-mono text-xs text-muted-foreground uppercase">Agency</th>
                <th className="text-left p-3 font-mono text-xs text-muted-foreground uppercase">Case Ref</th>
                <th className="text-left p-3 font-mono text-xs text-muted-foreground uppercase">Contact</th>
                <th className="text-left p-3 font-mono text-xs text-muted-foreground uppercase">Status</th>
                <th className="text-left p-3 font-mono text-xs text-muted-foreground uppercase">Last Contact</th>
                <th className="text-left p-3 font-mono text-xs text-muted-foreground uppercase">Pending</th>
                <th className="text-left p-3 font-mono text-xs text-muted-foreground uppercase">Notes</th>
              </tr>
            </thead>
            <tbody>
              {agencies.map((agency) => {
                const style = statusStyles[agency.status];
                const StatusIcon = style.icon;
                return (
                  <tr key={agency.abbreviation} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="font-mono text-sm font-medium text-foreground">{agency.abbreviation}</p>
                          <p className="font-mono text-xs text-muted-foreground">{agency.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <span className="font-mono text-sm text-foreground">{agency.caseRef}</span>
                    </td>
                    <td className="p-3">
                      <span className="font-mono text-sm text-muted-foreground">{agency.contact}</span>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <StatusIcon className={`w-4 h-4 ${style.text}`} />
                        <Badge variant="outline" className={`font-mono text-xs ${style.bg} ${style.text} ${style.border}`}>
                          {agency.status}
                        </Badge>
                      </div>
                    </td>
                    <td className="p-3">
                      <span className="font-mono text-sm text-muted-foreground">{agency.lastContact}</span>
                    </td>
                    <td className="p-3">
                      {agency.pendingItems > 0 ? (
                        <Badge variant="outline" className="font-mono text-xs bg-orange-400/10 text-orange-400 border-orange-400/30">
                          {agency.pendingItems}
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="font-mono text-xs bg-green-400/10 text-green-400 border-green-400/30">
                          0
                        </Badge>
                      )}
                    </td>
                    <td className="p-3">
                      <span className="font-mono text-xs text-muted-foreground">{agency.notes}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
