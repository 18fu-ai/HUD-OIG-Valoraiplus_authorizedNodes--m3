'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RECOVERY_LOGIC, formatCurrency } from '@/lib/cds-data';
import { CircuitBoard, AlertTriangle, Target, Gauge } from 'lucide-react';

export function RecoveryLogic() {
  return (
    <Card className="border-chart-4/30 bg-card/80">
      <CardHeader className="pb-3">
        <CardTitle className="font-mono text-lg flex items-center gap-2">
          <CircuitBoard className="w-5 h-5 text-chart-4" />
          RECOVERY LOGIC (THE LIQUIDATOR)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-secondary/50 border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-primary" />
              <span className="font-mono text-xs text-muted-foreground">Target Balance</span>
            </div>
            <div className="font-mono text-lg text-primary font-bold">
              {formatCurrency(RECOVERY_LOGIC.targetBalance)}
            </div>
          </div>
          
          <div className="p-3 rounded-lg bg-secondary/50 border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Gauge className="w-4 h-4 text-accent" />
              <span className="font-mono text-xs text-muted-foreground">Settlement Alpha Latch</span>
            </div>
            <div className="font-mono text-lg text-accent font-bold">
              {formatCurrency(RECOVERY_LOGIC.settlementAlphaLatch)}
            </div>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-secondary/50 border border-border">
          <div className="font-mono text-xs text-muted-foreground mb-2">Trigger Condition</div>
          <div className="font-mono text-sm text-foreground">{RECOVERY_LOGIC.triggerCondition}</div>
        </div>

        <div className="p-3 rounded-lg bg-secondary/50 border border-border">
          <div className="font-mono text-xs text-muted-foreground mb-2">Sovereign Inflation Guard</div>
          <div className="font-mono text-sm text-foreground">{RECOVERY_LOGIC.inflationGuard}</div>
        </div>

        <div className="p-3 rounded-lg bg-chart-4/5 border border-chart-4/30">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-chart-4" />
            <span className="font-mono text-sm text-chart-4 font-bold">GLITCH PROTOCOL</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <Badge variant="outline" className="border-chart-4/50 text-chart-4 font-mono text-xs shrink-0">
                IF
              </Badge>
              <code className="font-mono text-xs text-muted-foreground">
                {RECOVERY_LOGIC.glitchProtocol.condition}
              </code>
            </div>
            <div className="flex items-start gap-2">
              <Badge variant="outline" className="border-chart-4/50 text-chart-4 font-mono text-xs shrink-0">
                THEN
              </Badge>
              <span className="font-mono text-xs text-muted-foreground">
                {RECOVERY_LOGIC.glitchProtocol.action}
              </span>
            </div>
            <div className="flex items-start gap-2">
              <Badge variant="outline" className="border-chart-4/50 text-chart-4 font-mono text-xs shrink-0">
                BY
              </Badge>
              <span className="font-mono text-xs text-foreground">
                {RECOVERY_LOGIC.glitchProtocol.multiplier}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
