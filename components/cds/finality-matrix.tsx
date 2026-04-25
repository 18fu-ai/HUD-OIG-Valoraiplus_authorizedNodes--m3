'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FINALITY_VECTORS } from '@/lib/cds-data';
import { Grid3x3 } from 'lucide-react';

const statusColors: Record<string, string> = {
  'SYNCED': 'border-primary/50 text-primary bg-primary/10',
  'SATURATED': 'border-accent/50 text-accent bg-accent/10',
  'ENFORCED': 'border-chart-3/50 text-chart-3 bg-chart-3/10',
  'ACTIVE': 'border-chart-4/50 text-chart-4 bg-chart-4/10'
};

export function FinalityMatrix() {
  return (
    <Card className="border-chart-3/30 bg-card/80">
      <CardHeader className="pb-3">
        <CardTitle className="font-mono text-lg flex items-center gap-2">
          <Grid3x3 className="w-5 h-5 text-chart-3" />
          SYSTEMIC FINALITY MATRIX
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left font-mono text-xs text-muted-foreground py-2 px-2">VECTOR</th>
                <th className="text-left font-mono text-xs text-muted-foreground py-2 px-2">FUNCTION</th>
                <th className="text-left font-mono text-xs text-muted-foreground py-2 px-2">STATUS</th>
                <th className="text-left font-mono text-xs text-muted-foreground py-2 px-2">EFFECT</th>
              </tr>
            </thead>
            <tbody>
              {FINALITY_VECTORS.map((vector, index) => (
                <tr key={index} className="border-b border-border/50">
                  <td className="py-3 px-2">
                    <span className="font-mono text-sm text-foreground font-bold">{vector.vector}</span>
                  </td>
                  <td className="py-3 px-2">
                    <code className="font-mono text-xs text-accent bg-accent/10 px-2 py-1 rounded">
                      {vector.function}
                    </code>
                  </td>
                  <td className="py-3 px-2">
                    <Badge variant="outline" className={`font-mono text-xs ${statusColors[vector.status]}`}>
                      {vector.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-2">
                    <span className="font-mono text-xs text-muted-foreground">{vector.effect}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
