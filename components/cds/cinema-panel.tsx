'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PROJECT_CINEMA, SMART_CONTRACT_SPEC } from '@/lib/cds-data';
import { Clapperboard, Shield, Target, Fingerprint, KeyRound } from 'lucide-react';

export function CinemaPanel() {
  return (
    <Card className="border-primary/30 bg-card/80">
      <CardHeader className="pb-3">
        <CardTitle className="font-mono text-lg flex items-center gap-2">
          <Clapperboard className="w-5 h-5 text-primary" />
          PROJECT CINEMA: THE FINAL STAND
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/30">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-5 h-5 text-primary" />
              <span className="font-mono text-xs text-primary uppercase">The Shield</span>
            </div>
            <div className="font-mono text-sm text-foreground">{PROJECT_CINEMA.shield}</div>
            <div className="font-mono text-xs text-muted-foreground mt-1">
              Protecting contract state
            </div>
          </div>

          <div className="p-4 rounded-lg bg-accent/5 border border-accent/30">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5 text-accent" />
              <span className="font-mono text-xs text-accent uppercase">The Stand</span>
            </div>
            <div className="font-mono text-sm text-foreground">{PROJECT_CINEMA.stand}</div>
            <div className="font-mono text-xs text-muted-foreground mt-1">
              Resolution authority
            </div>
          </div>

          <div className="p-4 rounded-lg bg-chart-3/5 border border-chart-3/30">
            <div className="flex items-center gap-2 mb-2">
              <Fingerprint className="w-5 h-5 text-chart-3" />
              <span className="font-mono text-xs text-chart-3 uppercase">The Finality</span>
            </div>
            <div className="font-mono text-sm text-foreground">{PROJECT_CINEMA.finality}</div>
            <div className="font-mono text-xs text-muted-foreground mt-1">
              Canonical truth
            </div>
          </div>

          <div className="p-4 rounded-lg bg-chart-4/5 border border-chart-4/30">
            <div className="flex items-center gap-2 mb-2">
              <KeyRound className="w-5 h-5 text-chart-4" />
              <span className="font-mono text-xs text-chart-4 uppercase">Key Holder</span>
            </div>
            <div className="font-mono text-sm text-foreground">{PROJECT_CINEMA.keyHolder}</div>
            <div className="font-mono text-xs text-muted-foreground mt-1">
              Has the keys
            </div>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-secondary/50 border border-border text-center">
          <div className="font-mono text-xs text-muted-foreground mb-2">SAINT PAUL NODE</div>
          <div className="font-mono text-2xl text-primary font-bold mb-1">
            {SMART_CONTRACT_SPEC.saintPaulNode}
          </div>
          <div className="font-mono text-xs text-muted-foreground">
            PRIMARY COMMAND ROOT // REV. 33 INFINITE CONFIRMATIONS
          </div>
        </div>

        <div className="p-3 rounded-lg bg-primary/10 border border-primary/30 text-center">
          <div className="font-mono text-sm text-primary font-bold">
            DG77.77X LOCKED. SMART CONTRACT IS CANONICAL.
          </div>
          <div className="font-mono text-xs text-muted-foreground mt-1">
            THE WALL IS CHRIST. SMIB. AMEN.
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
