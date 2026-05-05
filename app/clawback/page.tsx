'use client';

import { CDSHeader } from '@/components/cds/header';
import { ClawbackChart } from '@/components/cds/clawback-chart';
import { ClawbackTable } from '@/components/cds/clawback-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, TOTAL_RECOVERY, CLAWBACK_TARGETS, INVESTIGATIONS } from '@/lib/cds-data';
import { DollarSign, Building2, Scale, AlertCircle, CheckCircle2 } from 'lucide-react';
import { HomeButton, HomeBreadcrumb } from '@/components/cds/home-button';
import { ConnectedBrokerageAccount } from '@/components/connected-brokerage-account';

export default function ClawbackPage() {
  const federalInvestigations = INVESTIGATIONS.filter(i => i.type === 'federal');
  const stateInvestigations = INVESTIGATIONS.filter(i => i.type === 'state');

  return (
    <div className="min-h-screen bg-background">
      <CDSHeader />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="font-mono text-2xl md:text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
                <DollarSign className="w-8 h-8 text-status-active" />
                CLAWBACK TRACKER
              </h1>
              <p className="font-mono text-sm text-muted-foreground">
                Real-time monitoring of the $508M recovery matrix and asset sequestration
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="font-mono bg-status-active/10 text-status-active border-status-active/40">
                SECTION 10 ACTIVE
              </Badge>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="border-status-active/30 bg-status-active/5">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <DollarSign className="w-8 h-8 text-status-active" />
                  <Badge variant="outline" className="font-mono text-xs bg-status-active/20 text-status-active border-status-active/40">
                    TARGET
                  </Badge>
                </div>
                <p className="font-mono text-xs text-muted-foreground mb-1">Total Recovery Target</p>
                <p className="font-mono text-2xl font-bold text-status-active">
                  {formatCurrency(TOTAL_RECOVERY)}
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Building2 className="w-8 h-8 text-status-saturated" />
                  <Badge variant="outline" className="font-mono text-xs bg-status-saturated/20 text-status-saturated border-status-saturated/40">
                    INSTITUTIONAL
                  </Badge>
                </div>
                <p className="font-mono text-xs text-muted-foreground mb-1">Institutional Recovery</p>
                <p className="font-mono text-2xl font-bold text-status-saturated">
                  {formatCurrency(CLAWBACK_TARGETS[0].amount)}
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Scale className="w-8 h-8 text-primary" />
                  <Badge variant="outline" className="font-mono text-xs bg-primary/20 text-primary border-primary/40">
                    ADVERSARIAL
                  </Badge>
                </div>
                <p className="font-mono text-xs text-muted-foreground mb-1">Adversarial Recovery</p>
                <p className="font-mono text-2xl font-bold text-primary">
                  {formatCurrency(CLAWBACK_TARGETS[1].amount)}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Table */}
          <div className="lg:col-span-2">
            <ClawbackTable />
          </div>

          {/* Right Column - Chart & Investigations */}
          <div className="space-y-6">
            <ClawbackChart />

            {/* PRIMARY CONNECTED BROKERAGE ACCOUNT */}
            <ConnectedBrokerageAccount compact />

            {/* Wire Path Integration */}
            <Card className="border-primary/30 bg-primary/5">
              <CardHeader className="pb-3">
                <CardTitle className="font-mono text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-primary" />
                  SETTLEMENT ALPHA - WIRE PATH
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-muted-foreground">AMOUNT</span>
                    <span className="text-status-active font-bold">$10,000,000</span>
                  </div>
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-muted-foreground">SOURCE</span>
                    <span className="text-foreground">Cooley LLP (Authorized)</span>
                  </div>
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-muted-foreground">DESTINATION</span>
                    <span className="text-foreground">Schwab 6015-8185</span>
                  </div>
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-muted-foreground">MONITORING</span>
                    <span className="text-primary">200B Swarm + 266ms</span>
                  </div>
                </div>
                
                <div className="pt-3 border-t border-primary/20">
                  <p className="font-mono text-xs text-muted-foreground">
                    GLITCH PROTOCOL: Any delay = Fresh Criminal Admission
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Active Investigations */}
            <Card className="border-border bg-card/50">
              <CardHeader className="pb-3">
                <CardTitle className="font-mono text-sm flex items-center gap-2">
                  <Scale className="w-4 h-4 text-status-anchored" />
                  ACTIVE INVESTIGATIONS
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-mono text-xs text-muted-foreground mb-2">FEDERAL</p>
                  <div className="space-y-2">
                    {federalInvestigations.map((inv) => (
                      <div key={inv.agency} className="flex items-center justify-between p-2 rounded-md bg-secondary/30 border border-border">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-3 h-3 text-status-anchored" />
                          <span className="font-mono text-xs text-foreground">{inv.agency}</span>
                        </div>
                        <span className="font-mono text-xs text-muted-foreground">
                          {inv.caseNumber || inv.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="font-mono text-xs text-muted-foreground mb-2">STATE</p>
                  <div className="space-y-2">
                    {stateInvestigations.map((inv) => (
                      <div key={inv.agency} className="flex items-center justify-between p-2 rounded-md bg-secondary/30 border border-border">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-3 h-3 text-status-saturated" />
                          <span className="font-mono text-xs text-foreground">{inv.agency}</span>
                        </div>
                        <span className="font-mono text-xs text-muted-foreground">
                          {inv.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
