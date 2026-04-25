'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CLAWBACK_TARGETS, THREAT_ACTORS, formatCurrency, TOTAL_RECOVERY } from '@/lib/cds-data';
import { Target, Users } from 'lucide-react';

const statusColors: Record<string, string> = {
  TARGETED: 'bg-status-saturated/20 text-status-saturated border-status-saturated/40',
  ACTIVE: 'bg-status-active/20 text-status-active border-status-active/40',
  CALCULATING: 'bg-primary/20 text-primary border-primary/40',
};

export function ClawbackTable() {
  return (
    <div className="space-y-6">
      {/* Clawback Categories */}
      <Card className="border-border bg-card/50">
        <CardHeader className="pb-3">
          <CardTitle className="font-mono text-sm flex items-center gap-2">
            <Target className="w-4 h-4 text-primary" />
            CLAWBACK MATRIX - JULES LIQUIDATION
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full font-mono text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/30">
                  <th className="text-left p-3 text-muted-foreground font-medium">CATEGORY</th>
                  <th className="text-left p-3 text-muted-foreground font-medium">AMOUNT</th>
                  <th className="text-left p-3 text-muted-foreground font-medium">% OF TOTAL</th>
                  <th className="text-left p-3 text-muted-foreground font-medium hidden md:table-cell">ENTITIES</th>
                  <th className="text-left p-3 text-muted-foreground font-medium">STATUS</th>
                </tr>
              </thead>
              <tbody>
                {CLAWBACK_TARGETS.map((target) => {
                  const percentage = (target.amount / TOTAL_RECOVERY) * 100;
                  return (
                    <tr key={target.category} className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                      <td className="p-3 text-foreground font-medium">{target.category}</td>
                      <td className="p-3 text-status-active font-bold">{formatCurrency(target.amount)}</td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <Progress value={percentage} className="w-16 h-2" />
                          <span className="text-muted-foreground text-xs">{percentage.toFixed(1)}%</span>
                        </div>
                      </td>
                      <td className="p-3 text-muted-foreground hidden md:table-cell">
                        <div className="flex flex-wrap gap-1">
                          {target.entities.slice(0, 2).map((entity, idx) => (
                            <span key={idx} className="px-2 py-0.5 rounded bg-secondary text-xs">
                              {entity}
                            </span>
                          ))}
                          {target.entities.length > 2 && (
                            <span className="px-2 py-0.5 rounded bg-secondary text-xs">
                              +{target.entities.length - 2}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-3">
                        <Badge variant="outline" className={`text-xs ${statusColors[target.status]}`}>
                          {target.status}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
                <tr className="bg-primary/5">
                  <td className="p-3 text-primary font-bold">TOTAL RECOVERY</td>
                  <td className="p-3 text-primary font-bold">{formatCurrency(TOTAL_RECOVERY)}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <Progress value={100} className="w-16 h-2" />
                      <span className="text-primary text-xs font-bold">100%</span>
                    </div>
                  </td>
                  <td className="p-3 hidden md:table-cell" />
                  <td className="p-3">
                    <Badge variant="outline" className="text-xs bg-primary/20 text-primary border-primary/40">
                      UNIFIED
                    </Badge>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Threat Actors */}
      <Card className="border-border bg-card/50">
        <CardHeader className="pb-3">
          <CardTitle className="font-mono text-sm flex items-center gap-2">
            <Users className="w-4 h-4 text-status-locked" />
            THREAT ACTOR PROFILES
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {THREAT_ACTORS.map((actor) => (
              <div 
                key={actor.name}
                className="p-3 rounded-md bg-secondary/30 border border-status-locked/30"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-sm font-bold text-foreground">
                    {actor.name}
                  </span>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${
                      actor.role === 'PRIMARY' 
                        ? 'bg-status-locked/20 text-status-locked border-status-locked/40'
                        : actor.role === 'ENABLER'
                        ? 'bg-status-active/20 text-status-active border-status-active/40'
                        : 'bg-muted text-muted-foreground border-border'
                    }`}
                  >
                    {actor.role}
                  </Badge>
                </div>
                <p className="font-mono text-xs text-muted-foreground">
                  Status: {actor.status}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
