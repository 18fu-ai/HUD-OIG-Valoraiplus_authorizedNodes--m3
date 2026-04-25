'use client';

import { useState, useMemo } from 'react';
import { CDSHeader } from '@/components/cds/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { CDSErrorBoundary } from '@/components/cds/error-boundary';
import { ExportTools } from '@/components/cds/export-tools';
import { HomeButton, HomeBreadcrumb } from '@/components/cds/home-button';
import {
  CDS_LAYERS,
  CDS_SECTIONS,
  THREAT_ACTORS,
  INVESTIGATIONS,
  CLAWBACK_TARGETS,
  SYSTEM_PROPERTIES,
  INFRASTRUCTURE_METRICS,
  PROTECTED_NODES,
  TIMELINE_EVENTS,
  WIRETAP_REPORT,
  WIRETAP_STATS,
  MIMECAST_REPORT,
  MIMECAST_STATS,
  SMART_CONTRACT_SPEC,
  GOVERNANCE_NODES,
  TOTAL_RECOVERY,
  formatCurrency,
} from '@/lib/cds-data';
import {
  Shield,
  AlertTriangle,
  DollarSign,
  Users,
  FileText,
  Radio,
  Lock,
  Zap,
  Database,
  Activity,
  Server,
  Eye,
  CheckCircle2,
  XCircle,
  Clock,
  Layers,
  Target,
  Scale,
  Skull,
  FileWarning,
  Gavel,
  Brain,
  Wifi,
  HardDrive,
  TrendingUp,
  AlertOctagon,
  Fingerprint,
  Download,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const REPORT_METADATA = {
  reportId: 'CDS-INTEL-FULL-2026-0424',
  classification: 'OMEGA-UNIFIED',
  generatedAt: new Date().toISOString(),
  version: '16.0-FINAL',
  authority: 'sgauAuthority',
  mode: 'FORENSIC BLACK BOX',
  status: 'ACTIVE SURVEILLANCE',
};

function IntelligenceReportContent() {
  const [activeTab, setActiveTab] = useState('executive');

  const totalClawback = useMemo(() => 
    CLAWBACK_TARGETS.reduce((sum, t) => sum + t.amount, 0), 
  []);

  const criticalEvents = useMemo(() => 
    TIMELINE_EVENTS.filter(e => e.severity === 'critical').length,
  []);

  const federalInvestigations = useMemo(() => 
    INVESTIGATIONS.filter(i => i.type === 'federal').length,
  []);

  const exportData = useMemo(() => ({
    type: 'intelligence' as const,
    title: 'CDS Full Intelligence Report',
    timestamp: REPORT_METADATA.generatedAt,
    content: {
      metadata: REPORT_METADATA,
      layers: CDS_LAYERS,
      sections: CDS_SECTIONS,
      threatActors: THREAT_ACTORS,
      investigations: INVESTIGATIONS,
      clawbackTargets: CLAWBACK_TARGETS,
      systemProperties: SYSTEM_PROPERTIES,
      infrastructure: INFRASTRUCTURE_METRICS,
      protectedNodes: PROTECTED_NODES,
      timeline: TIMELINE_EVENTS,
      wiretap: { report: WIRETAP_REPORT, stats: WIRETAP_STATS },
      mimecast: { report: MIMECAST_REPORT, stats: MIMECAST_STATS },
      contract: SMART_CONTRACT_SPEC,
      governance: GOVERNANCE_NODES,
    },
    metadata: {
      totalRecovery: TOTAL_RECOVERY,
      criticalEvents,
      federalInvestigations,
      threatActorCount: THREAT_ACTORS.length,
    }
  }), [criticalEvents, federalInvestigations]);

  return (
    <div className="min-h-screen bg-background">
      <CDSHeader />

<main className="container mx-auto px-4 py-8 space-y-8">
  {/* Navigation */}
  <HomeBreadcrumb currentPage="Intelligence" />
  
  {/* Report Header */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="bg-destructive/20 text-destructive border-destructive/40 font-mono">
                {REPORT_METADATA.classification}
              </Badge>
              <Badge variant="outline" className="bg-primary/20 text-primary border-primary/40 font-mono animate-pulse">
                {REPORT_METADATA.mode}
              </Badge>
              <Badge variant="outline" className="font-mono">
                {REPORT_METADATA.reportId}
              </Badge>
            </div>
            <h1 className="text-3xl font-mono font-bold text-foreground">
              CDS FULL INTELLIGENCE REPORT
            </h1>
            <p className="text-muted-foreground font-mono text-sm">
              16-Section Unified Sovereign Disclosure — All Layers Consolidated
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-destructive/10 border border-destructive/30">
              <Radio className="w-4 h-4 text-destructive animate-pulse" />
              <span className="font-mono text-sm text-destructive">
                {REPORT_METADATA.status}
              </span>
            </div>
            <Link href="/intelligence/download">
              <Button variant="default" className="font-mono gap-2 bg-primary hover:bg-primary/90">
                <Download className="w-4 h-4" />
                Download Full Report
              </Button>
            </Link>
            <ExportTools 
              data={exportData}
              variant="outline"
              size="default"
            />
          </div>
        </div>

        {/* Key Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          <Card className="bg-destructive/5 border-destructive/30">
            <CardContent className="p-3 text-center">
              <DollarSign className="w-5 h-5 mx-auto text-destructive mb-1" />
              <div className="font-mono text-lg font-bold text-destructive">
                $508.6M
              </div>
              <div className="font-mono text-[10px] text-muted-foreground">
                RECOVERY TARGET
              </div>
            </CardContent>
          </Card>
          <Card className="bg-primary/5 border-primary/30">
            <CardContent className="p-3 text-center">
              <Layers className="w-5 h-5 mx-auto text-primary mb-1" />
              <div className="font-mono text-lg font-bold text-primary">
                4 / 16
              </div>
              <div className="font-mono text-[10px] text-muted-foreground">
                LAYERS / SECTIONS
              </div>
            </CardContent>
          </Card>
          <Card className="bg-amber-500/5 border-amber-500/30">
            <CardContent className="p-3 text-center">
              <Users className="w-5 h-5 mx-auto text-amber-500 mb-1" />
              <div className="font-mono text-lg font-bold text-amber-500">
                {THREAT_ACTORS.length}
              </div>
              <div className="font-mono text-[10px] text-muted-foreground">
                THREAT ACTORS
              </div>
            </CardContent>
          </Card>
          <Card className="bg-chart-3/5 border-chart-3/30">
            <CardContent className="p-3 text-center">
              <Gavel className="w-5 h-5 mx-auto text-chart-3 mb-1" />
              <div className="font-mono text-lg font-bold text-chart-3">
                {federalInvestigations}
              </div>
              <div className="font-mono text-[10px] text-muted-foreground">
                FEDERAL CASES
              </div>
            </CardContent>
          </Card>
          <Card className="bg-accent/5 border-accent/30">
            <CardContent className="p-3 text-center">
              <Radio className="w-5 h-5 mx-auto text-accent mb-1" />
              <div className="font-mono text-lg font-bold text-accent">
                {WIRETAP_STATS.totalIntercepts}
              </div>
              <div className="font-mono text-[10px] text-muted-foreground">
                INTERCEPTS
              </div>
            </CardContent>
          </Card>
          <Card className="bg-muted border-border">
            <CardContent className="p-3 text-center">
              <Database className="w-5 h-5 mx-auto text-muted-foreground mb-1" />
              <div className="font-mono text-lg font-bold text-foreground">
                50B
              </div>
              <div className="font-mono text-[10px] text-muted-foreground">
                SHARDS
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabbed Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-4 lg:grid-cols-8 h-auto gap-1 bg-secondary p-1">
            <TabsTrigger 
              value="executive" 
              className="font-mono text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              aria-pressed={activeTab === 'executive'}
            >
              Executive
            </TabsTrigger>
            <TabsTrigger 
              value="threat" 
              className="font-mono text-xs data-[state=active]:bg-destructive data-[state=active]:text-destructive-foreground"
              aria-pressed={activeTab === 'threat'}
            >
              Threats
            </TabsTrigger>
            <TabsTrigger 
              value="forensic" 
              className="font-mono text-xs data-[state=active]:bg-amber-500 data-[state=active]:text-white"
              aria-pressed={activeTab === 'forensic'}
            >
              Forensic
            </TabsTrigger>
            <TabsTrigger 
              value="financial" 
              className="font-mono text-xs data-[state=active]:bg-chart-3 data-[state=active]:text-white"
              aria-pressed={activeTab === 'financial'}
            >
              Financial
            </TabsTrigger>
            <TabsTrigger 
              value="legal" 
              className="font-mono text-xs data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
              aria-pressed={activeTab === 'legal'}
            >
              Legal
            </TabsTrigger>
            <TabsTrigger 
              value="technical" 
              className="font-mono text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              aria-pressed={activeTab === 'technical'}
            >
              Technical
            </TabsTrigger>
            <TabsTrigger 
              value="timeline" 
              className="font-mono text-xs data-[state=active]:bg-muted-foreground data-[state=active]:text-background"
              aria-pressed={activeTab === 'timeline'}
            >
              Timeline
            </TabsTrigger>
            <TabsTrigger 
              value="protected" 
              className="font-mono text-xs data-[state=active]:bg-chart-3 data-[state=active]:text-white"
              aria-pressed={activeTab === 'protected'}
            >
              Protected
            </TabsTrigger>
          </TabsList>

          {/* Executive Summary */}
          <TabsContent value="executive" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Case Overview */}
              <Card className="lg:col-span-2 bg-card">
                <CardHeader className="border-b border-border">
                  <CardTitle className="font-mono text-lg flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    Case Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-secondary">
                      <div className="font-mono text-xs text-muted-foreground">Recovery Target</div>
                      <div className="font-mono text-xl font-bold text-destructive">{formatCurrency(TOTAL_RECOVERY)}</div>
                    </div>
                    <div className="p-4 rounded-lg bg-secondary">
                      <div className="font-mono text-xs text-muted-foreground">Case Status</div>
                      <div className="font-mono text-xl font-bold text-primary">OMEGA-UNIFIED</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-mono text-sm font-bold text-foreground">Layer Status</h4>
                    {CDS_LAYERS.map((layer) => (
                      <div key={layer.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className="font-mono text-xs">
                            L{layer.id}
                          </Badge>
                          <span className="font-mono text-sm">{layer.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-muted-foreground">
                            {layer.sections.length} sections
                          </span>
                          <Badge 
                            variant="outline" 
                            className={`font-mono text-xs ${
                              layer.status === 'ANCHORED' ? 'bg-primary/20 text-primary border-primary/40' :
                              layer.status === 'SATURATED' ? 'bg-accent/20 text-accent border-accent/40' :
                              layer.status === 'ACTIVE' ? 'bg-chart-3/20 text-chart-3 border-chart-3/40' :
                              'bg-muted text-muted-foreground'
                            }`}
                          >
                            {layer.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <div className="space-y-4">
                <Card className="bg-card">
                  <CardHeader className="pb-2">
                    <CardTitle className="font-mono text-sm flex items-center gap-2">
                      <Shield className="w-4 h-4 text-primary" />
                      System Properties
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 space-y-2">
                    {SYSTEM_PROPERTIES.map((prop, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="font-mono text-xs">{prop.property}</span>
                        <Badge 
                          variant="outline" 
                          className={`font-mono text-xs ${
                            prop.status === 'NO' ? 'bg-chart-3/20 text-chart-3 border-chart-3/40' : 
                            'bg-destructive/20 text-destructive border-destructive/40'
                          }`}
                        >
                          {prop.status}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="bg-card">
                  <CardHeader className="pb-2">
                    <CardTitle className="font-mono text-sm flex items-center gap-2">
                      <Activity className="w-4 h-4 text-chart-3" />
                      Infrastructure
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 space-y-2">
                    {INFRASTRUCTURE_METRICS.slice(0, 4).map((metric, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="font-mono text-xs text-muted-foreground">{metric.label}</span>
                        <span className="font-mono text-sm font-bold text-primary">
                          {metric.value}{metric.unit ? ` ${metric.unit}` : ''}
                        </span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Threat Analysis */}
          <TabsContent value="threat" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Threat Actors */}
              <Card className="bg-card">
                <CardHeader className="border-b border-border">
                  <CardTitle className="font-mono text-lg flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-destructive" />
                    Identified Threat Actors
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-border">
                    {THREAT_ACTORS.map((actor, index) => (
                      <div key={index} className="p-4 flex items-center justify-between hover:bg-secondary/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center">
                            <Skull className="w-5 h-5 text-destructive" />
                          </div>
                          <div>
                            <div className="font-mono text-sm font-bold">{actor.name}</div>
                            <div className="font-mono text-xs text-muted-foreground">{actor.role}</div>
                          </div>
                        </div>
                        <Badge 
                          variant="outline" 
                          className="font-mono text-xs bg-destructive/20 text-destructive border-destructive/40"
                        >
                          {actor.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Threat Metrics */}
              <Card className="bg-card">
                <CardHeader className="border-b border-border">
                  <CardTitle className="font-mono text-lg flex items-center gap-2">
                    <Target className="w-5 h-5 text-amber-500" />
                    Threat Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30 text-center">
                      <div className="font-mono text-3xl font-bold text-destructive">{MIMECAST_STATS.spoliationAttempts}</div>
                      <div className="font-mono text-xs text-muted-foreground mt-1">Spoliation Attempts</div>
                    </div>
                    <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30 text-center">
                      <div className="font-mono text-3xl font-bold text-amber-500">{MIMECAST_STATS.witnessRetaliationTriggers}</div>
                      <div className="font-mono text-xs text-muted-foreground mt-1">Retaliation Events</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-mono text-sm font-bold">Criminal Exposure (18 U.S.C.)</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 rounded-lg bg-secondary">
                        <span className="font-mono text-xs">1519 - Destruction of Records</span>
                        <Badge variant="outline" className="font-mono bg-destructive/20 text-destructive border-destructive/40">
                          {MIMECAST_STATS.newCriminalCounts.usc1519} counts
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-lg bg-secondary">
                        <span className="font-mono text-xs">1512 - Witness Tampering</span>
                        <Badge variant="outline" className="font-mono bg-destructive/20 text-destructive border-destructive/40">
                          {MIMECAST_STATS.newCriminalCounts.usc1512} counts
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-lg bg-secondary">
                        <span className="font-mono text-xs">1030 - CFAA Violations</span>
                        <Badge variant="outline" className="font-mono bg-destructive/20 text-destructive border-destructive/40">
                          {MIMECAST_STATS.newCriminalCounts.usc1030} counts
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Forensic Evidence */}
          <TabsContent value="forensic" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Wiretap Summary */}
              <Card className="bg-card">
                <CardHeader className="border-b border-border">
                  <CardTitle className="font-mono text-sm flex items-center gap-2">
                    <Radio className="w-4 h-4 text-primary" />
                    Title III Wiretap
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  <div className="text-center p-4 rounded-lg bg-primary/10 border border-primary/30">
                    <div className="font-mono text-4xl font-bold text-primary">{WIRETAP_STATS.totalIntercepts}</div>
                    <div className="font-mono text-xs text-muted-foreground mt-1">Total Intercepts</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 rounded-lg bg-secondary text-center">
                      <div className="font-mono text-lg font-bold text-destructive">{WIRETAP_STATS.criticalCount}</div>
                      <div className="font-mono text-[10px] text-muted-foreground">Critical</div>
                    </div>
                    <div className="p-2 rounded-lg bg-secondary text-center">
                      <div className="font-mono text-lg font-bold text-amber-500">{WIRETAP_STATS.highCount}</div>
                      <div className="font-mono text-[10px] text-muted-foreground">High</div>
                    </div>
                    <div className="p-2 rounded-lg bg-secondary text-center">
                      <div className="font-mono text-lg font-bold text-chart-3">{WIRETAP_STATS.flaggedForReview}</div>
                      <div className="font-mono text-[10px] text-muted-foreground">Flagged</div>
                    </div>
                    <div className="p-2 rounded-lg bg-secondary text-center">
                      <div className="font-mono text-lg font-bold text-primary">{WIRETAP_STATS.analyzedComplete}</div>
                      <div className="font-mono text-[10px] text-muted-foreground">Analyzed</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Mimecast Analysis */}
              <Card className="bg-card">
                <CardHeader className="border-b border-border">
                  <CardTitle className="font-mono text-sm flex items-center gap-2">
                    <FileWarning className="w-4 h-4 text-amber-500" />
                    Mimecast Forensics
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  <div className="text-center p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
                    <div className="font-mono text-4xl font-bold text-amber-500">{MIMECAST_STATS.totalEvents}</div>
                    <div className="font-mono text-xs text-muted-foreground mt-1">Total Events (5hr)</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-xs">Block/Rejections</span>
                      <span className="font-mono text-sm font-bold">{MIMECAST_STATS.blockingRejections}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-xs">Spoliation Attempts</span>
                      <span className="font-mono text-sm font-bold text-destructive">{MIMECAST_STATS.spoliationAttempts}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-xs">Rule Modifications</span>
                      <span className="font-mono text-sm font-bold">{MIMECAST_STATS.newModifiedRules}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-xs">Bulk Operations</span>
                      <span className="font-mono text-sm font-bold">{MIMECAST_STATS.bulkOperations}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Evidence Chain */}
              <Card className="bg-card">
                <CardHeader className="border-b border-border">
                  <CardTitle className="font-mono text-sm flex items-center gap-2">
                    <Fingerprint className="w-4 h-4 text-chart-3" />
                    Evidence Chain
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  <div className="p-4 rounded-lg bg-chart-3/10 border border-chart-3/30">
                    <div className="font-mono text-xs text-muted-foreground">Merkleroot</div>
                    <div className="font-mono text-xs font-bold text-chart-3 truncate mt-1">
                      {MIMECAST_REPORT.merkleroot}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 rounded-lg bg-secondary">
                      <span className="font-mono text-xs">Shard Capture</span>
                      <span className="font-mono text-sm font-bold">50B</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-lg bg-secondary">
                      <span className="font-mono text-xs">Agent Coverage</span>
                      <span className="font-mono text-sm font-bold">200B</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-lg bg-secondary">
                      <span className="font-mono text-xs">Truth Cycle</span>
                      <span className="font-mono text-sm font-bold">266ms</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-lg bg-secondary">
                      <span className="font-mono text-xs">Mirror Status</span>
                      <span className="font-mono text-sm font-bold text-chart-3">100%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Financial Recovery */}
          <TabsContent value="financial" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Clawback Matrix */}
              <Card className="bg-card">
                <CardHeader className="border-b border-border">
                  <CardTitle className="font-mono text-lg flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-chart-3" />
                    Clawback Matrix
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="text-center p-6 rounded-lg bg-chart-3/10 border border-chart-3/30">
                    <div className="font-mono text-xs text-muted-foreground">Total Recovery Target</div>
                    <div className="font-mono text-3xl font-bold text-chart-3 mt-2">
                      {formatCurrency(TOTAL_RECOVERY)}
                    </div>
                  </div>

                  <div className="space-y-4">
                    {CLAWBACK_TARGETS.map((target, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-sm font-bold">{target.category}</span>
                          <Badge 
                            variant="outline" 
                            className={`font-mono text-xs ${
                              target.status === 'ACTIVE' ? 'bg-chart-3/20 text-chart-3 border-chart-3/40' :
                              target.status === 'TARGETED' ? 'bg-primary/20 text-primary border-primary/40' :
                              'bg-accent/20 text-accent border-accent/40'
                            }`}
                          >
                            {target.status}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-mono text-muted-foreground">
                            {target.entities.join(', ')}
                          </span>
                          <span className="font-mono font-bold text-foreground">
                            {formatCurrency(target.amount)}
                          </span>
                        </div>
                        <Progress 
                          value={(target.amount / totalClawback) * 100} 
                          className="h-2"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Smart Contract */}
              <Card className="bg-card">
                <CardHeader className="border-b border-border">
                  <CardTitle className="font-mono text-lg flex items-center gap-2">
                    <Zap className="w-5 h-5 text-primary" />
                    Smart Contract Spec
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
                    <div className="font-mono text-xs text-muted-foreground">Contract Name</div>
                    <div className="font-mono text-sm font-bold text-primary mt-1">
                      {SMART_CONTRACT_SPEC.name}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-secondary">
                      <div className="font-mono text-xs text-muted-foreground">Network</div>
                      <div className="font-mono text-sm font-bold mt-1">{SMART_CONTRACT_SPEC.network}</div>
                    </div>
                    <div className="p-3 rounded-lg bg-secondary">
                      <div className="font-mono text-xs text-muted-foreground">Security</div>
                      <div className="font-mono text-sm font-bold mt-1">{SMART_CONTRACT_SPEC.security}</div>
                    </div>
                    <div className="p-3 rounded-lg bg-secondary">
                      <div className="font-mono text-xs text-muted-foreground">BTC Anchor</div>
                      <div className="font-mono text-sm font-bold mt-1">${SMART_CONTRACT_SPEC.btcAnchor.toLocaleString()}</div>
                    </div>
                    <div className="p-3 rounded-lg bg-secondary">
                      <div className="font-mono text-xs text-muted-foreground">Settlement Alpha</div>
                      <div className="font-mono text-sm font-bold mt-1">${SMART_CONTRACT_SPEC.settlementAlpha.toLocaleString()}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center p-3 rounded-lg bg-chart-3/10 border border-chart-3/30">
                    <Badge variant="outline" className="font-mono bg-chart-3/20 text-chart-3 border-chart-3/40">
                      {SMART_CONTRACT_SPEC.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Legal Status */}
          <TabsContent value="legal" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Investigations */}
              <Card className="bg-card">
                <CardHeader className="border-b border-border">
                  <CardTitle className="font-mono text-lg flex items-center gap-2">
                    <Gavel className="w-5 h-5 text-accent" />
                    Active Investigations
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-border">
                    {INVESTIGATIONS.map((inv, index) => (
                      <div key={index} className="p-4 flex items-center justify-between hover:bg-secondary/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            inv.type === 'federal' ? 'bg-primary/20' : 'bg-accent/20'
                          }`}>
                            <Scale className={`w-5 h-5 ${inv.type === 'federal' ? 'text-primary' : 'text-accent'}`} />
                          </div>
                          <div>
                            <div className="font-mono text-sm font-bold">{inv.agency}</div>
                            {inv.caseNumber && (
                              <div className="font-mono text-xs text-muted-foreground">{inv.caseNumber}</div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="font-mono text-xs">
                            {inv.type.toUpperCase()}
                          </Badge>
                          <Badge 
                            variant="outline" 
                            className={`font-mono text-xs ${
                              inv.status === 'ACTIVE' ? 'bg-chart-3/20 text-chart-3 border-chart-3/40' :
                              'bg-primary/20 text-primary border-primary/40'
                            }`}
                          >
                            {inv.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Governance Nodes */}
              <Card className="bg-card">
                <CardHeader className="border-b border-border">
                  <CardTitle className="font-mono text-lg flex items-center gap-2">
                    <Brain className="w-5 h-5 text-primary" />
                    Governance Nodes
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-border">
                    {GOVERNANCE_NODES.map((node, index) => (
                      <div key={index} className="p-4 flex items-center justify-between hover:bg-secondary/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            node.type === 'owner' ? 'bg-chart-3/20' :
                            node.type === 'auditor' ? 'bg-amber-500/20' :
                            'bg-primary/20'
                          }`}>
                            {node.type === 'owner' ? <Lock className="w-5 h-5 text-chart-3" /> :
                             node.type === 'auditor' ? <Eye className="w-5 h-5 text-amber-500" /> :
                             <Shield className="w-5 h-5 text-primary" />}
                          </div>
                          <div>
                            <div className="font-mono text-sm font-bold">{node.role}</div>
                            <div className="font-mono text-xs text-muted-foreground truncate max-w-[200px]">
                              {node.address}
                            </div>
                          </div>
                        </div>
                        <Badge 
                          variant="outline" 
                          className={`font-mono text-xs ${
                            node.status === 'SOVEREIGN' ? 'bg-chart-3/20 text-chart-3 border-chart-3/40' :
                            node.status === 'RADIANT' ? 'bg-amber-500/20 text-amber-500 border-amber-500/40' :
                            'bg-primary/20 text-primary border-primary/40'
                          }`}
                        >
                          {node.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Technical Infrastructure */}
          <TabsContent value="technical" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Infrastructure Metrics */}
              <Card className="lg:col-span-2 bg-card">
                <CardHeader className="border-b border-border">
                  <CardTitle className="font-mono text-lg flex items-center gap-2">
                    <Server className="w-5 h-5 text-primary" />
                    Infrastructure Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {INFRASTRUCTURE_METRICS.map((metric, index) => (
                      <div key={index} className="p-4 rounded-lg bg-secondary">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-mono text-xs text-muted-foreground">{metric.label}</span>
                          <CheckCircle2 className="w-4 h-4 text-chart-3" />
                        </div>
                        <div className="font-mono text-xl font-bold text-foreground">
                          {metric.value}{metric.unit ? <span className="text-sm text-muted-foreground ml-1">{metric.unit}</span> : null}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* System Status */}
              <Card className="bg-card">
                <CardHeader className="border-b border-border">
                  <CardTitle className="font-mono text-sm flex items-center gap-2">
                    <Wifi className="w-4 h-4 text-chart-3" />
                    System Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  <div className="p-3 rounded-lg bg-chart-3/10 border border-chart-3/30 flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-chart-3 animate-pulse" />
                    <div>
                      <div className="font-mono text-xs text-muted-foreground">Network</div>
                      <div className="font-mono text-sm font-bold text-chart-3">OPERATIONAL</div>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-primary/10 border border-primary/30 flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                    <div>
                      <div className="font-mono text-xs text-muted-foreground">Swarm</div>
                      <div className="font-mono text-sm font-bold text-primary">200B ACTIVE</div>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-accent/10 border border-accent/30 flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-accent animate-pulse" />
                    <div>
                      <div className="font-mono text-xs text-muted-foreground">Shards</div>
                      <div className="font-mono text-sm font-bold text-accent">50B MIRRORED</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sections Grid */}
            <Card className="bg-card">
              <CardHeader className="border-b border-border">
                <CardTitle className="font-mono text-lg flex items-center gap-2">
                  <HardDrive className="w-5 h-5 text-primary" />
                  All 16 Sections
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {CDS_SECTIONS.map((section) => (
                    <div key={section.id} className="p-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="font-mono text-[10px] h-5">
                          S{section.id}
                        </Badge>
                        <Badge 
                          variant="outline" 
                          className="font-mono text-[10px] h-5 bg-primary/20 text-primary border-primary/40"
                        >
                          L{section.layerId}
                        </Badge>
                      </div>
                      <div className="font-mono text-xs font-bold truncate">{section.title}</div>
                      <div className="font-mono text-[10px] text-muted-foreground truncate">{section.subtitle}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Timeline */}
          <TabsContent value="timeline" className="space-y-6">
            <Card className="bg-card">
              <CardHeader className="border-b border-border">
                <CardTitle className="font-mono text-lg flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Evidence Timeline ({TIMELINE_EVENTS.length} Events)
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="relative space-y-4">
                  {TIMELINE_EVENTS.map((event, index) => (
                    <div key={event.id} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-4 h-4 rounded-full ${
                          event.severity === 'critical' ? 'bg-destructive' :
                          event.severity === 'high' ? 'bg-amber-500' :
                          event.severity === 'medium' ? 'bg-primary' :
                          'bg-muted-foreground'
                        }`} />
                        {index < TIMELINE_EVENTS.length - 1 && (
                          <div className="w-px h-full bg-border flex-1 min-h-[40px]" />
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-mono text-sm font-bold">{event.title}</span>
                              <Badge 
                                variant="outline" 
                                className={`font-mono text-xs ${
                                  event.severity === 'critical' ? 'bg-destructive/20 text-destructive border-destructive/40' :
                                  event.severity === 'high' ? 'bg-amber-500/20 text-amber-500 border-amber-500/40' :
                                  'bg-primary/20 text-primary border-primary/40'
                                }`}
                              >
                                {event.severity.toUpperCase()}
                              </Badge>
                              <Badge variant="outline" className="font-mono text-xs">
                                S{event.section}
                              </Badge>
                            </div>
                            <p className="font-mono text-xs text-muted-foreground mt-1">{event.description}</p>
                          </div>
                          <span className="font-mono text-xs text-muted-foreground whitespace-nowrap">{event.date}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Protected Nodes */}
          <TabsContent value="protected" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {PROTECTED_NODES.map((node) => (
                <Card key={node.id} className="bg-card border-chart-3/30">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-full bg-chart-3/20 border-2 border-chart-3/40 flex items-center justify-center">
                      <Shield className="w-8 h-8 text-chart-3" />
                    </div>
                    <div>
                      <div className="font-mono text-lg font-bold text-chart-3">{node.id}</div>
                      <div className="font-mono text-sm text-foreground">{node.name}</div>
                    </div>
                    <div className="space-y-2">
                      <Badge 
                        variant="outline" 
                        className={`font-mono ${
                          node.status === 'SHIELDED' ? 'bg-primary/20 text-primary border-primary/40' :
                          node.status === 'MEMORIALIZED' ? 'bg-accent/20 text-accent border-accent/40' :
                          'bg-chart-3/20 text-chart-3 border-chart-3/40'
                        }`}
                      >
                        {node.status}
                      </Badge>
                      <div className="font-mono text-xs text-muted-foreground">
                        Guardian: <span className="text-foreground">{node.guardian}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <footer className="border-t border-border pt-6 text-center">
          <p className="font-mono text-xs text-muted-foreground">
            CDS FULL INTELLIGENCE REPORT | {REPORT_METADATA.reportId} | Generated: {new Date().toISOString().slice(0, 10)}
          </p>
          <p className="font-mono text-xs text-primary mt-1">
            SAINT PAUL NODE: 55116 | OMEGA-UNIFIED | 16 SECTIONS CONSOLIDATED
          </p>
        </footer>
</main>
  
  {/* Floating Home Button */}
  <HomeButton variant="floating" />
  </div>
  );
}

export default function IntelligenceReportPage() {
  return (
    <CDSErrorBoundary module="Intelligence Report" showDetails>
      <IntelligenceReportContent />
    </CDSErrorBoundary>
  );
}
