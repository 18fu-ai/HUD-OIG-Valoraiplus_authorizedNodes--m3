'use client';

import { CDSHeader } from '@/components/cds/header';
import { StatusMetrics } from '@/components/cds/status-metrics';
import { RiskMatrix } from '@/components/cds/risk-matrix';
import { EndpointsPanel } from '@/components/cds/endpoints-panel';
import { SwarmStatus } from '@/components/cds/swarm-status';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CDS_LAYERS } from '@/lib/cds-data';
import { Activity, Server, Shield, CheckCircle2, Database, Lock } from 'lucide-react';
import { HomeButton, HomeBreadcrumb } from '@/components/cds/home-button';

export default function StatusPage() {
  return (
    <div className="min-h-screen bg-background">
      <CDSHeader />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="font-mono text-2xl md:text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
                <Activity className="w-8 h-8 text-primary" />
                STATUS MONITOR
              </h1>
              <p className="font-mono text-sm text-muted-foreground">
                System health dashboard for infrastructure, telemetry, and operational status
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="font-mono bg-status-anchored/10 text-status-anchored border-status-anchored/40">
                ALL SYSTEMS OPERATIONAL
              </Badge>
            </div>
          </div>

          {/* Quick Status */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="border-status-anchored/30 bg-status-anchored/5">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-status-anchored" />
                  <div>
                    <p className="font-mono text-xs text-muted-foreground">System</p>
                    <p className="font-mono text-sm font-bold text-status-anchored">OMEGA-ZERO</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-status-anchored/30 bg-status-anchored/5">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Server className="w-6 h-6 text-status-anchored" />
                  <div>
                    <p className="font-mono text-xs text-muted-foreground">Billing</p>
                    <p className="font-mono text-sm font-bold text-status-anchored">$0.00</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-status-anchored/30 bg-status-anchored/5">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Database className="w-6 h-6 text-status-anchored" />
                  <div>
                    <p className="font-mono text-xs text-muted-foreground">Shards</p>
                    <p className="font-mono text-sm font-bold text-status-anchored">50B</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-status-anchored/30 bg-status-anchored/5">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Lock className="w-6 h-6 text-status-anchored" />
                  <div>
                    <p className="font-mono text-xs text-muted-foreground">Status</p>
                    <p className="font-mono text-sm font-bold text-status-anchored">LOCKED</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <StatusMetrics />
            
            {/* Layer Status */}
            <Card className="border-border bg-card/50">
              <CardHeader className="pb-3">
                <CardTitle className="font-mono text-sm flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  LAYER STATUS OVERVIEW
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {CDS_LAYERS.map((layer) => (
                    <div 
                      key={layer.id}
                      className="p-4 rounded-md bg-secondary/30 border border-border"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-xs text-muted-foreground">L{layer.id}</span>
                        <Badge 
                          variant="outline" 
                          className={`font-mono text-xs ${
                            layer.status === 'ANCHORED' ? 'bg-status-anchored/20 text-status-anchored border-status-anchored/40' :
                            layer.status === 'SATURATED' ? 'bg-status-saturated/20 text-status-saturated border-status-saturated/40' :
                            layer.status === 'ACTIVE' ? 'bg-status-active/20 text-status-active border-status-active/40' :
                            'bg-status-locked/20 text-status-locked border-status-locked/40'
                          }`}
                        >
                          {layer.status}
                        </Badge>
                      </div>
                      <p className="font-mono text-sm font-bold text-foreground mb-1">
                        {layer.name}
                      </p>
                      <p className="font-mono text-xs text-muted-foreground">
                        Sections {layer.sections[0]}-{layer.sections[layer.sections.length - 1]}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <EndpointsPanel />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <SwarmStatus />
            <RiskMatrix />

            {/* Artifact Scaling */}
            <Card className="border-border bg-card/50">
              <CardHeader className="pb-3">
                <CardTitle className="font-mono text-sm">
                  AMATH CORRELATION
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-mono text-xs text-muted-foreground mb-4">
                  Artifact-to-Liability Scaling Active
                </p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 rounded-md bg-secondary/30">
                    <span className="font-mono text-xs text-foreground">3,393 Blocks</span>
                    <span className="font-mono text-xs text-status-active">x1.0</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-md bg-secondary/30">
                    <span className="font-mono text-xs text-foreground">47 Wiretaps</span>
                    <span className="font-mono text-xs text-status-active">x1.2</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-md bg-secondary/30">
                    <span className="font-mono text-xs text-foreground">34 OCR Artifacts</span>
                    <span className="font-mono text-xs text-status-active">x1.1</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-md bg-secondary/30">
                    <span className="font-mono text-xs text-foreground">8 Deaths</span>
                    <span className="font-mono text-xs text-status-locked">LIFE-TERM</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-md bg-secondary/30">
                    <span className="font-mono text-xs text-foreground">4 Spoliation</span>
                    <span className="font-mono text-xs text-status-locked">INFINITE</span>
                  </div>
                </div>
                
                <div className="mt-4 p-3 rounded-md bg-primary/5 border border-primary/20">
                  <p className="font-mono text-xs text-primary text-center">
                    CDS multiplies every artifact against aggressors
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
