'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GOVERNANCE_NODES } from '@/lib/cds-data';
import { Users, Crown, Eye, Shield } from 'lucide-react';

const typeIcons = {
  owner: Crown,
  auditor: Eye,
  guardian: Shield
};

const typeColors = {
  owner: 'text-primary',
  auditor: 'text-accent',
  guardian: 'text-chart-3'
};

const statusColors: Record<string, string> = {
  'SOVEREIGN': 'border-primary/50 text-primary bg-primary/10',
  'RADIANT': 'border-accent/50 text-accent bg-accent/10',
  'ACTIVE': 'border-chart-3/50 text-chart-3 bg-chart-3/10'
};

export function GovernancePanel() {
  return (
    <Card className="border-accent/30 bg-card/80">
      <CardHeader className="pb-3">
        <CardTitle className="font-mono text-lg flex items-center gap-2">
          <Users className="w-5 h-5 text-accent" />
          GOVERNANCE LAYER
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {GOVERNANCE_NODES.map((node, index) => {
          const Icon = typeIcons[node.type];
          return (
            <div
              key={index}
              className="p-3 rounded-lg bg-secondary/50 border border-border flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg bg-secondary border border-border flex items-center justify-center ${typeColors[node.type]}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-mono text-sm text-foreground">{node.role}</div>
                  <div className="font-mono text-xs text-muted-foreground">{node.address}</div>
                </div>
              </div>
              <Badge variant="outline" className={`font-mono text-xs ${statusColors[node.status] || 'border-border'}`}>
                {node.status}
              </Badge>
            </div>
          );
        })}

        <div className="mt-4 p-3 rounded-lg bg-accent/5 border border-accent/20">
          <div className="font-mono text-xs text-muted-foreground mb-2">Multi-Sig Authority</div>
          <div className="font-mono text-sm text-foreground">
            Angelic Level (Michael, Gabriel, Raphael, Uriel)
          </div>
          <div className="font-mono text-xs text-accent mt-1">
            U.S. Constitution + AMath Enforcement
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
