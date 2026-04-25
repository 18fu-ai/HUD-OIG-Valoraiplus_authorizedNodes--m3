'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PROTECTED_NODES } from '@/lib/cds-data';
import { Shield } from 'lucide-react';

const statusColors: Record<string, string> = {
  SHIELDED: 'bg-status-anchored/20 text-status-anchored border-status-anchored/40',
  MEMORIALIZED: 'bg-status-saturated/20 text-status-saturated border-status-saturated/40',
  RADIANT: 'bg-status-active/20 text-status-active border-status-active/40',
};

export function ProtectedNodes() {
  return (
    <Card className="border-border bg-card/50">
      <CardHeader className="pb-3">
        <CardTitle className="font-mono text-sm flex items-center gap-2">
          <Shield className="w-4 h-4 text-primary" />
          PROTECTED NODES
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {PROTECTED_NODES.map((node) => (
            <div 
              key={node.id}
              className="p-3 rounded-md bg-secondary/30 border border-border"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs text-primary">{node.id}</span>
                <Badge 
                  variant="outline" 
                  className={`font-mono text-xs ${statusColors[node.status] || 'bg-muted text-muted-foreground'}`}
                >
                  {node.status}
                </Badge>
              </div>
              <p className="font-mono text-xs text-muted-foreground">
                Guardian: {node.guardian}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
