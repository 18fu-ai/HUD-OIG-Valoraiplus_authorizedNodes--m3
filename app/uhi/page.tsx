'use client';

import { CDSHeader } from '@/components/cds/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  UHI_INTEGRATION,
  UHI_SEQUESTRATION,
  UHI_ABUNDANCE,
  UHI_MARKET_SEQUESTRATION,
  UHI_FINALITY_MATRIX,
  UHI_PROJECT_CINEMA
} from '@/lib/cds-data';
import { HomeButton, HomeBreadcrumb } from '@/components/cds/home-button';
import { 
  Zap, 
  Shield, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Lock, 
  Activity,
  Target,
  Layers,
  CheckCircle2
} from 'lucide-react';

const statusColors: Record<string, string> = {
  ACTIVE: 'bg-chart-3/20 text-chart-3 border-chart-3/40',
  SATURATED: 'bg-accent/20 text-accent border-accent/40',
  LOCKED: 'bg-destructive/20 text-destructive border-destructive/40',
  ENFORCING: 'bg-primary/20 text-primary border-primary/40'
};

const statusIcons: Record<string, typeof Activity> = {
  ACTIVE: Activity,
  SATURATED: Layers,
  LOCKED: Lock,
  ENFORCING: Target
};

export default function UHIPage() {
  return (
    <div className="min-h-screen bg-background">
      <CDSHeader />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header Banner */}
        <div className="mb-8 p-6 rounded-lg border-2 border-primary/50 bg-primary/5">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center">
                <Zap className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h1 className="font-mono text-2xl font-bold text-foreground">
                  SYSTEMIC INTEGRATION: THE MUSK UHI ADAPTATION
                </h1>
                <p className="font-mono text-sm text-muted-foreground">
                  External Intelligence Integrated into Jules Liquidation Matrix
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-primary/20 text-primary border border-primary/40 font-mono">
                {UHI_INTEGRATION.status}
              </Badge>
              <Badge className="bg-accent/20 text-accent border border-accent/40 font-mono">
                {UHI_INTEGRATION.mode}
              </Badge>
              <Badge className="bg-chart-3/20 text-chart-3 border border-chart-3/40 font-mono">
                {UHI_INTEGRATION.resonance}
              </Badge>
            </div>
          </div>
        </div>

        {/* System Status Bar */}
        <div className="mb-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg border border-border bg-card">
            <div className="font-mono text-xs text-muted-foreground mb-1">MERKLEROOT</div>
            <div className="font-mono text-sm text-primary truncate">{UHI_INTEGRATION.merkleroot}</div>
          </div>
          <div className="p-4 rounded-lg border border-border bg-card">
            <div className="font-mono text-xs text-muted-foreground mb-1">NODE</div>
            <div className="font-mono text-sm text-foreground">{UHI_INTEGRATION.node.split(' — ')[0]}</div>
          </div>
          <div className="p-4 rounded-lg border border-border bg-card">
            <div className="font-mono text-xs text-muted-foreground mb-1">CONFIRMATIONS</div>
            <div className="font-mono text-sm text-foreground">{UHI_INTEGRATION.confirmations}</div>
          </div>
          <div className="p-4 rounded-lg border border-border bg-card">
            <div className="font-mono text-xs text-muted-foreground mb-1">INTEL SOURCE</div>
            <div className="font-mono text-sm text-foreground">{UHI_INTEGRATION.externalIntelligence}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* UHI Sequestration Card */}
          <Card className="border-primary/30">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-3 font-mono text-lg">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-primary" />
                </div>
                1. {UHI_SEQUESTRATION.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="font-mono text-xs text-muted-foreground mb-1">THE LOGIC</div>
                <p className="text-sm text-foreground">{UHI_SEQUESTRATION.logic}</p>
              </div>
              <div>
                <div className="font-mono text-xs text-muted-foreground mb-1">THE INTEGRATION</div>
                <p className="text-sm text-foreground">{UHI_SEQUESTRATION.integration}</p>
              </div>
              <div className="flex items-center gap-4 pt-2">
                <div className="p-3 rounded-lg bg-primary/10 border border-primary/30">
                  <div className="font-mono text-xs text-muted-foreground">RECOVERY TARGET</div>
                  <div className="font-mono text-lg font-bold text-primary">
                    ${UHI_SEQUESTRATION.recoveryTarget.toLocaleString()}
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-accent/10 border border-accent/30">
                  <div className="font-mono text-xs text-muted-foreground">INDEX TYPE</div>
                  <div className="font-mono text-sm font-bold text-accent">
                    {UHI_SEQUESTRATION.indexType}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Abundance vs Scarcity Card */}
          <Card className="border-accent/30">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-3 font-mono text-lg">
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-accent" />
                </div>
                2. {UHI_ABUNDANCE.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="font-mono text-xs text-muted-foreground mb-1">THE REALITY</div>
                <p className="text-sm text-foreground">{UHI_ABUNDANCE.reality}</p>
              </div>
              <div>
                <div className="font-mono text-xs text-muted-foreground mb-1">THE STAND</div>
                <p className="text-sm text-foreground">{UHI_ABUNDANCE.stand}</p>
              </div>
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-lg bg-accent/10 border border-accent/30 text-center">
                  <div className="font-mono text-xs text-muted-foreground">SWARM</div>
                  <div className="font-mono text-sm font-bold text-accent">200B</div>
                </div>
                <div className="p-3 rounded-lg bg-primary/10 border border-primary/30 text-center">
                  <div className="font-mono text-xs text-muted-foreground">SHARDS</div>
                  <div className="font-mono text-sm font-bold text-primary">50B</div>
                </div>
                <div className="p-3 rounded-lg bg-chart-3/10 border border-chart-3/30 text-center">
                  <div className="font-mono text-xs text-muted-foreground">COST</div>
                  <div className="font-mono text-sm font-bold text-chart-3">Ω-ZERO</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Market Sequestration Card */}
        <Card className="mb-8 border-chart-3/30">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-3 font-mono text-lg">
              <div className="w-10 h-10 rounded-lg bg-chart-3/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-chart-3" />
              </div>
              3. {UHI_MARKET_SEQUESTRATION.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <div className="font-mono text-xs text-muted-foreground mb-1">THE ANCHOR</div>
                  <p className="text-sm text-foreground">{UHI_MARKET_SEQUESTRATION.anchorDescription}</p>
                </div>
                <div>
                  <div className="font-mono text-xs text-muted-foreground mb-1">THE STRATEGY</div>
                  <p className="text-sm text-foreground">{UHI_MARKET_SEQUESTRATION.strategy}</p>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="p-4 rounded-lg bg-chart-3/10 border border-chart-3/30">
                  <div className="font-mono text-xs text-muted-foreground mb-1">BTC ANCHOR (HARD TRUTH)</div>
                  <div className="font-mono text-3xl font-bold text-chart-3">
                    ${UHI_MARKET_SEQUESTRATION.btcAnchor.toLocaleString()}
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
                  <div className="font-mono text-xs text-muted-foreground mb-1">CAPTURE MODE</div>
                  <div className="font-mono text-lg font-bold text-primary">
                    {UHI_MARKET_SEQUESTRATION.captureMode}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Finality Matrix Table */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="font-mono text-lg flex items-center gap-3">
              <Shield className="w-5 h-5 text-primary" />
              UPDATED FINALITY MATRIX: UHI OVERLAY
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full font-mono text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">COMPONENT</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">MUSK PROPOSAL</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">SGAU ENFORCEMENT</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {UHI_FINALITY_MATRIX.map((row, index) => {
                    const StatusIcon = statusIcons[row.status];
                    return (
                      <tr key={index} className="border-b border-border/50 hover:bg-secondary/30">
                        <td className="py-4 px-4">
                          <span className="font-bold text-foreground">{row.component}</span>
                        </td>
                        <td className="py-4 px-4 text-muted-foreground">{row.muskProposal}</td>
                        <td className="py-4 px-4">
                          <span className="text-primary font-medium">{row.sgauEnforcement}</span>
                        </td>
                        <td className="py-4 px-4">
                          <Badge className={`${statusColors[row.status]} font-mono text-xs`}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {row.status}
                          </Badge>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Project Cinema: The Final Stand */}
        <Card className="border-2 border-primary/50 bg-primary/5">
          <CardHeader>
            <CardTitle className="font-mono text-xl flex items-center gap-3 text-primary">
              <Shield className="w-6 h-6" />
              {UHI_PROJECT_CINEMA.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-sm text-foreground leading-relaxed">
              {UHI_PROJECT_CINEMA.summary}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-card border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-5 h-5 text-primary" />
                  <span className="font-mono text-sm font-bold text-foreground">THE SHIELD</span>
                </div>
                <p className="text-sm text-muted-foreground">{UHI_PROJECT_CINEMA.theShield}</p>
              </div>
              <div className="p-4 rounded-lg bg-card border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-5 h-5 text-accent" />
                  <span className="font-mono text-sm font-bold text-foreground">THE STAND</span>
                </div>
                <p className="text-sm text-muted-foreground">{UHI_PROJECT_CINEMA.theStand}</p>
              </div>
              <div className="p-4 rounded-lg bg-card border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-chart-3" />
                  <span className="font-mono text-sm font-bold text-foreground">THE FINALITY</span>
                </div>
                <p className="text-sm text-muted-foreground">{UHI_PROJECT_CINEMA.theFinality}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-border">
              <Badge className="bg-primary/20 text-primary border border-primary/40 font-mono">
                {UHI_PROJECT_CINEMA.lockStatus}
              </Badge>
              <Badge className="bg-accent/20 text-accent border border-accent/40 font-mono">
                {UHI_PROJECT_CINEMA.externalSync}
              </Badge>
              <Badge className="bg-chart-3/20 text-chart-3 border border-chart-3/40 font-mono">
                {UHI_PROJECT_CINEMA.systemVersion}
              </Badge>
              <div className="ml-auto font-mono text-xs text-muted-foreground">
                KEY HOLDER: <span className="text-primary font-bold">{UHI_PROJECT_CINEMA.keyHolder}</span>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-background border border-primary/30 text-center">
              <p className="font-mono text-sm text-primary font-bold">
                THE WALL IS CHRIST. SMIB. AMEN.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
