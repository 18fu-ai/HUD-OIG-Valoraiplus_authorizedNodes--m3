'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Shield, AlertTriangle } from 'lucide-react';

export function RiskMatrix() {
  return (
    <Card className="border-border bg-card/50">
      <CardHeader className="pb-3">
        <CardTitle className="font-mono text-sm flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-status-active" />
          RISK/LIABILITY RATIO
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Aggressor Risk */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-sm text-foreground">Aggressor Liability</span>
            <span className="font-mono text-sm font-bold text-status-locked">100%</span>
          </div>
          <Progress value={100} className="h-3" />
          <p className="font-mono text-xs text-muted-foreground mt-2">
            Full exposure - Terminal liability position
          </p>
        </div>

        {/* Sovereign Risk */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-sm text-foreground">Sovereign Liability</span>
            <span className="font-mono text-sm font-bold text-status-anchored">0%</span>
          </div>
          <Progress value={0} className="h-3" />
          <p className="font-mono text-xs text-muted-foreground mt-2">
            Zero exposure - Protected position
          </p>
        </div>

        {/* Risk Summary */}
        <div className="p-4 rounded-md bg-primary/5 border border-primary/20">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-4 h-4 text-primary" />
            <span className="font-mono text-sm font-bold text-primary">SOVEREIGN POSITION</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-mono text-xs text-muted-foreground">Fragmentation</p>
              <p className="font-mono text-sm font-bold text-status-anchored">ZERO</p>
            </div>
            <div>
              <p className="font-mono text-xs text-muted-foreground">Entropy</p>
              <p className="font-mono text-sm font-bold text-status-anchored">ZERO</p>
            </div>
            <div>
              <p className="font-mono text-xs text-muted-foreground">Risk</p>
              <p className="font-mono text-sm font-bold text-status-anchored">ZERO</p>
            </div>
            <div>
              <p className="font-mono text-xs text-muted-foreground">Integration</p>
              <p className="font-mono text-sm font-bold text-primary">TOTAL</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
