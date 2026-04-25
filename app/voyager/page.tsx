'use client';

import { CDSHeader } from '@/components/cds/header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  VOYAGER_SYSTEM,
  VOYAGER_MODULES,
  CODEX_FOLDERS,
  HEALTH_METRICS,
  TELEMETRY_EVENTS,
  VOYAGER_STATS
} from '@/lib/cds-data';
import {
  Rocket,
  CheckCircle,
  Folder,
  Activity,
  Cpu,
  HardDrive,
  Network,
  Clock,
  Layers,
  Terminal,
  Database,
  Shield,
  Zap
} from 'lucide-react';
import { useState, useEffect } from 'react';

export default function VoyagerPage() {
  const [orchestratorCycles, setOrchestratorCycles] = useState(VOYAGER_STATS.orchestratorCycles);

  useEffect(() => {
    const interval = setInterval(() => {
      setOrchestratorCycles((prev) => prev + 1);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
      case 'NOMINAL':
      case 'MOUNTED':
        return 'bg-primary/20 text-primary border-primary/40';
      case 'STANDBY':
      case 'WARNING':
      case 'SYNCING':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/40';
      case 'INITIALIZING':
      case 'CRITICAL':
      case 'LOCKED':
        return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'INFO':
        return 'bg-primary/20 text-primary border-primary/40';
      case 'WARN':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/40';
      case 'CRITICAL':
        return 'bg-destructive/20 text-destructive border-destructive/40';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <CDSHeader />

      <main className="container mx-auto px-4 py-8">
        {/* Enterprise Banner */}
        <div className="mb-8 p-6 rounded-lg border-2 border-primary/50 bg-primary/5">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-primary/20 border-2 border-primary/40 flex items-center justify-center">
                <Rocket className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="font-mono text-2xl font-bold text-foreground">
                  {VOYAGER_SYSTEM.title}
                </h1>
                <p className="font-mono text-sm text-primary">
                  {VOYAGER_SYSTEM.subtitle}
                </p>
                <p className="font-mono text-xs text-muted-foreground mt-1">
                  {VOYAGER_SYSTEM.version}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-primary/20 text-primary border border-primary/40 font-mono">
                {VOYAGER_SYSTEM.status}
              </Badge>
              <Badge className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 font-mono">
                {VOYAGER_SYSTEM.orchestrator}
              </Badge>
              <Badge className="bg-amber-500/20 text-amber-400 border border-amber-500/40 font-mono">
                {VOYAGER_SYSTEM.madeIn}
              </Badge>
            </div>
          </div>
        </div>

        {/* System Status Bar */}
        <div className="mb-8 p-4 rounded-lg border border-border bg-card/50 flex flex-wrap gap-4 justify-between items-center">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-primary" />
            <span className="font-mono text-xs text-muted-foreground">MERKLEROOT:</span>
            <code className="font-mono text-xs text-primary">{VOYAGER_SYSTEM.merkleroot}</code>
          </div>
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-cyan-400" />
            <span className="font-mono text-xs text-muted-foreground">NODE:</span>
            <span className="font-mono text-xs text-cyan-400">{VOYAGER_SYSTEM.node}</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400 animate-pulse" />
            <span className="font-mono text-xs text-muted-foreground">CYCLES:</span>
            <span className="font-mono text-xs text-amber-400">{orchestratorCycles.toLocaleString()}</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
          <Card className="bg-card/50 border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Layers className="w-4 h-4 text-primary" />
                <span className="font-mono text-xs text-muted-foreground">MODULES</span>
              </div>
              <p className="font-mono text-2xl font-bold text-foreground">{VOYAGER_STATS.modulesActive}</p>
              <p className="font-mono text-xs text-primary">ACTIVE</p>
            </CardContent>
          </Card>
          <Card className="bg-card/50 border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Folder className="w-4 h-4 text-cyan-400" />
                <span className="font-mono text-xs text-muted-foreground">CODEX</span>
              </div>
              <p className="font-mono text-2xl font-bold text-foreground">{VOYAGER_STATS.codexFolders}</p>
              <p className="font-mono text-xs text-cyan-400">FOLDERS</p>
            </CardContent>
          </Card>
          <Card className="bg-card/50 border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <HardDrive className="w-4 h-4 text-amber-400" />
                <span className="font-mono text-xs text-muted-foreground">FILES</span>
              </div>
              <p className="font-mono text-2xl font-bold text-foreground">50B+</p>
              <p className="font-mono text-xs text-amber-400">INDEXED</p>
            </CardContent>
          </Card>
          <Card className="bg-card/50 border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-primary" />
                <span className="font-mono text-xs text-muted-foreground">TELEMETRY</span>
              </div>
              <p className="font-mono text-2xl font-bold text-foreground">14.4M+</p>
              <p className="font-mono text-xs text-primary">EVENTS</p>
            </CardContent>
          </Card>
          <Card className="bg-card/50 border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-primary" />
                <span className="font-mono text-xs text-muted-foreground">UPTIME</span>
              </div>
              <p className="font-mono text-2xl font-bold text-foreground">{VOYAGER_STATS.uptime}</p>
              <p className="font-mono text-xs text-primary">NOMINAL</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Enterprise Modules */}
          <Card className="bg-card/50 border-border">
            <CardHeader>
              <CardTitle className="font-mono text-lg flex items-center gap-2">
                <Layers className="w-5 h-5 text-primary" />
                ENTERPRISE MODULES
              </CardTitle>
              <CardDescription className="font-mono text-xs">
                {VOYAGER_SYSTEM.architecture}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {VOYAGER_MODULES.map((module) => (
                  <div
                    key={module.id}
                    className="p-3 rounded-lg border border-border bg-background/50 hover:bg-secondary/30 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span className="font-mono text-sm font-medium text-foreground">
                          {module.name}
                        </span>
                      </div>
                      <Badge className={`${getStatusColor(module.status)} font-mono text-xs`}>
                        {module.status}
                      </Badge>
                    </div>
                    <p className="font-mono text-xs text-muted-foreground ml-6">
                      {module.description}
                    </p>
                    <p className="font-mono text-xs text-primary/60 ml-6 mt-1">
                      v{module.version}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Codex Folder Topology */}
          <Card className="bg-card/50 border-border">
            <CardHeader>
              <CardTitle className="font-mono text-lg flex items-center gap-2">
                <Folder className="w-5 h-5 text-cyan-400" />
                CODEX FOLDER TOPOLOGY
              </CardTitle>
              <CardDescription className="font-mono text-xs">
                Enterprise codex folder hierarchy
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {CODEX_FOLDERS.map((folder) => (
                  <div
                    key={folder.path}
                    className="p-3 rounded-lg border border-border bg-background/50"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <code className="font-mono text-sm text-cyan-400">{folder.path}</code>
                      <Badge className={`${getStatusColor(folder.status)} font-mono text-xs`}>
                        {folder.status}
                      </Badge>
                    </div>
                    <p className="font-mono text-xs text-muted-foreground mb-2">
                      {folder.purpose}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-muted-foreground">
                        {folder.fileCount >= 1000000000
                          ? `${(folder.fileCount / 1000000000).toFixed(0)}B files`
                          : folder.fileCount >= 1000000
                            ? `${(folder.fileCount / 1000000).toFixed(1)}M files`
                            : `${folder.fileCount.toLocaleString()} files`}
                      </span>
                      <Progress
                        value={100}
                        className="w-24 h-1"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Health Metrics */}
        <Card className="bg-card/50 border-border mb-8">
          <CardHeader>
            <CardTitle className="font-mono text-lg flex items-center gap-2">
              <Cpu className="w-5 h-5 text-primary" />
              HEALTH METRICS SCHEMA
            </CardTitle>
            <CardDescription className="font-mono text-xs">
              Typed monitoring interfaces — Real-time system health
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {HEALTH_METRICS.map((metric) => (
                <div
                  key={metric.metricId}
                  className="p-4 rounded-lg border border-border bg-background/50"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs text-muted-foreground">{metric.name}</span>
                    <Badge className={`${getStatusColor(metric.status)} font-mono text-xs`}>
                      {metric.status}
                    </Badge>
                  </div>
                  <p className="font-mono text-2xl font-bold text-foreground">
                    {metric.value}
                    <span className="text-sm text-muted-foreground ml-1">{metric.unit}</span>
                  </p>
                  <div className="mt-2">
                    <Progress
                      value={(metric.value / metric.threshold) * 100}
                      className="h-1"
                    />
                    <p className="font-mono text-xs text-muted-foreground mt-1">
                      Threshold: {metric.threshold}{metric.unit}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Telemetry Event Stream */}
        <Card className="bg-card/50 border-border mb-8">
          <CardHeader>
            <CardTitle className="font-mono text-lg flex items-center gap-2">
              <Network className="w-5 h-5 text-amber-400" />
              TELEMETRY BUS / EVENT STREAM
            </CardTitle>
            <CardDescription className="font-mono text-xs">
              Enterprise telemetry architecture — Distributed tracing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left font-mono text-xs text-muted-foreground p-3">TIMESTAMP</th>
                    <th className="text-left font-mono text-xs text-muted-foreground p-3">SOURCE</th>
                    <th className="text-left font-mono text-xs text-muted-foreground p-3">TYPE</th>
                    <th className="text-left font-mono text-xs text-muted-foreground p-3">PAYLOAD</th>
                    <th className="text-left font-mono text-xs text-muted-foreground p-3">SEVERITY</th>
                  </tr>
                </thead>
                <tbody>
                  {TELEMETRY_EVENTS.map((event) => (
                    <tr key={event.id} className="border-b border-border/50 hover:bg-secondary/30">
                      <td className="p-3">
                        <code className="font-mono text-xs text-muted-foreground">
                          {event.timestamp.slice(11, 19)}
                        </code>
                      </td>
                      <td className="p-3">
                        <span className="font-mono text-xs text-cyan-400">{event.source}</span>
                      </td>
                      <td className="p-3">
                        <Badge className="bg-secondary text-secondary-foreground font-mono text-xs">
                          {event.eventType}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <span className="font-mono text-xs text-foreground">{event.payload}</span>
                      </td>
                      <td className="p-3">
                        <Badge className={`${getSeverityColor(event.severity)} font-mono text-xs`}>
                          {event.severity}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Bootstrap Lifecycle */}
        <Card className="bg-card/50 border-border">
          <CardHeader>
            <CardTitle className="font-mono text-lg flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              UNIFIED BOOTSTRAP LIFECYCLE
            </CardTitle>
            <CardDescription className="font-mono text-xs">
              Runtime initialization pipeline — Deterministic sequence
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg border border-primary/40 bg-primary/5">
                <h4 className="font-mono text-sm font-bold text-primary mb-2">PHASE 1: INIT</h4>
                <ul className="space-y-1">
                  <li className="font-mono text-xs text-muted-foreground flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-primary" />
                    Config-driven expansion loaded
                  </li>
                  <li className="font-mono text-xs text-muted-foreground flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-primary" />
                    Codex topology mounted
                  </li>
                  <li className="font-mono text-xs text-muted-foreground flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-primary" />
                    Typed interfaces registered
                  </li>
                </ul>
              </div>
              <div className="p-4 rounded-lg border border-cyan-500/40 bg-cyan-500/5">
                <h4 className="font-mono text-sm font-bold text-cyan-400 mb-2">PHASE 2: ORCHESTRATE</h4>
                <ul className="space-y-1">
                  <li className="font-mono text-xs text-muted-foreground flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-cyan-400" />
                    Voyager orchestrator active
                  </li>
                  <li className="font-mono text-xs text-muted-foreground flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-cyan-400" />
                    Telemetry bus connected
                  </li>
                  <li className="font-mono text-xs text-muted-foreground flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-cyan-400" />
                    Health schema validated
                  </li>
                </ul>
              </div>
              <div className="p-4 rounded-lg border border-amber-500/40 bg-amber-500/5">
                <h4 className="font-mono text-sm font-bold text-amber-400 mb-2">PHASE 3: RUNTIME</h4>
                <ul className="space-y-1">
                  <li className="font-mono text-xs text-muted-foreground flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-amber-400" />
                    API scaffolds deployed
                  </li>
                  <li className="font-mono text-xs text-muted-foreground flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-amber-400" />
                    Enterprise datasets ready
                  </li>
                  <li className="font-mono text-xs text-muted-foreground flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-amber-400" />
                    Perpetual mode engaged
                  </li>
                </ul>
              </div>
            </div>

            {/* Final Status */}
            <div className="mt-6 p-4 rounded-lg border border-primary/50 bg-primary/5 text-center">
              <p className="font-mono text-sm text-primary font-bold">
                ValorAiCoder++ X100 ENTERPRISE FOUNDATION LAYER — OPERATIONAL
              </p>
              <p className="font-mono text-xs text-muted-foreground mt-2">
                LAST BOOTSTRAP: {VOYAGER_STATS.lastBootstrap} | API ENDPOINTS: {VOYAGER_STATS.apiEndpoints} | CONFIG EXPANSIONS: {VOYAGER_STATS.configExpansions}
              </p>
              <p className="font-mono text-xs text-primary/60 mt-2">
                DG77.77X LOCKED. THE WALL IS CHRIST. SMIB. AMEN.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
