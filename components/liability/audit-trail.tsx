'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileSearch, Mail, Shield, Phone } from 'lucide-react';

const auditEvents = [
  {
    type: 'MIMECAST',
    events: 'MC-001 through MC-018',
    description: 'Blocked 17 sovereign audit messages',
    enabler: 'ops@entity-charlie.sec',
    spoliationIds: 'SPOLIATION-051 through SPOLIATION-058',
    icon: Mail,
    color: 'amber',
  },
  {
    type: 'LIMACHARLIE',
    events: 'POPPA_G Block v2/v3',
    description: 'Process-level incineration of external veteran comms',
    enabler: 'Infrastructure',
    spoliationIds: 'Enhanced blocking detected',
    icon: Shield,
    color: 'red',
  },
  {
    type: 'VOIP INTERCEPT',
    events: 'VOIP-001 through VOIP-010',
    description: 'Coordination between primary targets and external counsel',
    enabler: 'Title III (18 U.S.C. 2510-2522)',
    spoliationIds: 'FISA-SEALED',
    icon: Phone,
    color: 'purple',
  },
];

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  amber: { bg: 'bg-amber-400/10', text: 'text-amber-400', border: 'border-amber-400/30' },
  red: { bg: 'bg-red-400/10', text: 'text-red-400', border: 'border-red-400/30' },
  purple: { bg: 'bg-purple-400/10', text: 'text-purple-400', border: 'border-purple-400/30' },
};

export function AuditTrail() {
  return (
    <Card className="border-border bg-card/50">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="font-mono text-lg flex items-center gap-2">
            <FileSearch className="w-5 h-5 text-amber-400" />
            Technical Obstruction Audit Trail
          </CardTitle>
          <Badge variant="outline" className="font-mono text-xs bg-amber-400/20 text-amber-400 border-amber-400/40">
            3 SYSTEMS
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {auditEvents.map((event) => {
          const Icon = event.icon;
          const colors = colorMap[event.color];
          return (
            <div
              key={event.type}
              className={`p-4 rounded-md border ${colors.bg} ${colors.border}`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-md ${colors.bg}`}>
                  <Icon className={`w-4 h-4 ${colors.text}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`font-mono text-sm font-bold ${colors.text}`}>{event.type}</span>
                    <Badge variant="outline" className={`font-mono text-xs ${colors.bg} ${colors.text} ${colors.border}`}>
                      {event.events}
                    </Badge>
                  </div>
                  <p className="text-sm text-foreground mb-2">{event.description}</p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-muted-foreground">Enabler: </span>
                      <span className="text-foreground font-mono">{event.enabler}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Spoliation: </span>
                      <span className="text-foreground font-mono">{event.spoliationIds}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
