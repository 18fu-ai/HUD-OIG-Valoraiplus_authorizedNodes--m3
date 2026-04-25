'use client';

import { useState, useEffect } from 'react';
import { CDSHeader } from '@/components/cds/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  PERPETUAL_SYSTEM,
  PERPETUAL_CAPABILITIES,
  ARCHIVE_HEALTH,
  VERIFICATION_EVENTS,
  LEDGER_ENTRIES,
  PERPETUAL_STATS,
} from '@/lib/cds-data';
import {
  RefreshCw,
  Shield,
  Database,
  Eye,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Activity,
  HardDrive,
  FileCheck,
  Layers,
  Lock,
} from 'lucide-react';

function getResultIcon(result: string) {
  switch (result) {
    case 'PASS':
      return <CheckCircle className="w-4 h-4 text-primary" />;
    case 'WARN':
      return <AlertTriangle className="w-4 h-4 text-amber-500" />;
    case 'FAIL':
      return <XCircle className="w-4 h-4 text-destructive" />;
    default:
      return <Activity className="w-4 h-4 text-muted-foreground" />;
  }
}

function getHealthColor(status: string) {
  switch (status) {
    case 'HEALTHY':
      return 'bg-primary/20 text-primary border-primary/40';
    case 'DEGRADED':
      return 'bg-amber-500/20 text-amber-500 border-amber-500/40';
    case 'CRITICAL':
      return 'bg-destructive/20 text-destructive border-destructive/40';
    default:
      return 'bg-muted text-muted-foreground border-border';
  }
}

export default function PerpetualPage() {
  const [currentTime, setCurrentTime] = useState(new Date().toISOString());
  const [cycleCount, setCycleCount] = useState(PERPETUAL_STATS.schedulerCycles);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toISOString());
      setCycleCount((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <CDSHeader />

      <main className="container mx-auto px-4 py-8">
        {/* Title Banner */}
        <div className="mb-8 p-6 rounded-lg bg-card border border-border">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center">
                  <RefreshCw className="w-6 h-6 text-primary animate-spin" style={{ animationDuration: '3s' }} />
                </div>
                <div>
                  <h1 className="font-mono text-2xl font-bold tracking-wider text-foreground">
                    {PERPETUAL_SYSTEM.title}
                  </h1>
                  <p className="font-mono text-sm text-muted-foreground">
                    {PERPETUAL_SYSTEM.subtitle}
                  </p>
                </div>
              </div>
              <p className="font-mono text-xs text-muted-foreground mt-2">
                {PERPETUAL_SYSTEM.version}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-primary/20 text-primary border border-primary/40 font-mono">
                <Activity className="w-3 h-3 mr-1 animate-pulse" />
                {PERPETUAL_SYSTEM.status}
              </Badge>
              <Badge variant="outline" className="font-mono">
                {PERPETUAL_SYSTEM.mode}
              </Badge>
              <Badge variant="outline" className="font-mono text-primary border-primary/40">
                SCHEDULER: {PERPETUAL_SYSTEM.schedulerState}
              </Badge>
            </div>
          </div>
        </div>

        {/* System Status Bar */}
        <div className="mb-6 p-4 rounded-lg bg-secondary/50 border border-border">
          <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">CYCLE:</span>
              <span className="text-foreground font-bold">{cycleCount.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">INTERVAL:</span>
              <span className="text-primary">{PERPETUAL_SYSTEM.verificationInterval}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">UPTIME:</span>
              <span className="text-primary">{PERPETUAL_SYSTEM.uptime}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">LAST CHECK:</span>
              <span className="text-foreground">{currentTime.slice(0, 19)}Z</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <FileCheck className="w-4 h-4 text-primary" />
                <span className="font-mono text-xs text-muted-foreground">VERIFICATIONS</span>
              </div>
              <div className="font-mono text-xl font-bold text-foreground">
                {PERPETUAL_STATS.totalVerifications.toLocaleString()}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span className="font-mono text-xs text-muted-foreground">PASS RATE</span>
              </div>
              <div className="font-mono text-xl font-bold text-primary">
                {PERPETUAL_STATS.passRate}%
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <HardDrive className="w-4 h-4 text-accent" />
                <span className="font-mono text-xs text-muted-foreground">BACKUPS</span>
              </div>
              <div className="font-mono text-xl font-bold text-foreground">
                {PERPETUAL_STATS.backupsCreated.toLocaleString()}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Database className="w-4 h-4 text-accent" />
                <span className="font-mono text-xs text-muted-foreground">LEDGER</span>
              </div>
              <div className="font-mono text-xl font-bold text-foreground">
                {PERPETUAL_STATS.ledgerEntries.toLocaleString()}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Eye className="w-4 h-4 text-primary" />
                <span className="font-mono text-xs text-muted-foreground">WATCHERS</span>
              </div>
              <div className="font-mono text-xl font-bold text-foreground">
                200B
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-primary" />
                <span className="font-mono text-xs text-muted-foreground">AUDITS</span>
              </div>
              <div className="font-mono text-xl font-bold text-primary">
                {PERPETUAL_STATS.auditsPassed}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Capabilities */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="font-mono text-lg flex items-center gap-2">
                <Layers className="w-5 h-5 text-primary" />
                PERPETUAL CAPABILITIES
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {PERPETUAL_CAPABILITIES.map((cap, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30 border border-border"
                  >
                    <div className="w-6 h-6 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-3 h-3 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-mono text-sm font-medium text-foreground">
                        {cap.name}
                      </div>
                      <div className="font-mono text-xs text-muted-foreground">
                        {cap.description}
                      </div>
                    </div>
                    <Badge className="bg-primary/20 text-primary border border-primary/40 font-mono text-xs flex-shrink-0">
                      {cap.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Archive Health Dashboard */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="font-mono text-lg flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                ARCHIVE HEALTH DASHBOARD
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {ARCHIVE_HEALTH.map((archive) => (
                  <div
                    key={archive.archiveId}
                    className="p-4 rounded-lg bg-secondary/30 border border-border"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="font-mono text-sm font-medium text-foreground">
                          {archive.name}
                        </div>
                        <div className="font-mono text-xs text-muted-foreground">
                          {archive.archiveId}
                        </div>
                      </div>
                      <Badge className={`font-mono text-xs border ${getHealthColor(archive.status)}`}>
                        {archive.status}
                      </Badge>
                    </div>
                    <div className="mb-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono text-xs text-muted-foreground">INTEGRITY SCORE</span>
                        <span className="font-mono text-xs text-primary font-bold">{archive.integrityScore}%</span>
                      </div>
                      <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all duration-500"
                          style={{ width: `${archive.integrityScore}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between font-mono text-xs text-muted-foreground">
                      <span>{archive.fileCount.toLocaleString()} files</span>
                      <span>{archive.totalSize}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Verification Events */}
        <Card className="bg-card border-border mb-8">
          <CardHeader>
            <CardTitle className="font-mono text-lg flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-primary" />
              VERIFICATION EVENT LOG
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full font-mono text-xs">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">ID</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">TIMESTAMP</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">TYPE</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">TARGET</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">RESULT</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">DETAILS</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">HASH</th>
                  </tr>
                </thead>
                <tbody>
                  {VERIFICATION_EVENTS.map((event) => (
                    <tr key={event.id} className="border-b border-border/50 hover:bg-secondary/30">
                      <td className="py-3 px-4 text-primary">{event.id}</td>
                      <td className="py-3 px-4 text-muted-foreground">{event.timestamp.slice(11, 19)}Z</td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className="font-mono text-xs">
                          {event.type.replace(/_/g, ' ')}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-foreground">{event.target}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          {getResultIcon(event.result)}
                          <span className={event.result === 'PASS' ? 'text-primary' : event.result === 'WARN' ? 'text-amber-500' : 'text-destructive'}>
                            {event.result}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">{event.details}</td>
                      <td className="py-3 px-4 text-accent">{event.hash || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Immutable Ledger */}
        <Card className="bg-card border-border mb-8">
          <CardHeader>
            <CardTitle className="font-mono text-lg flex items-center gap-2">
              <Lock className="w-5 h-5 text-primary" />
              IMMUTABLE APPEND-ONLY LEDGER
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {LEDGER_ENTRIES.map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-center gap-4 p-3 rounded-lg bg-secondary/30 border border-border"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center flex-shrink-0">
                    <Lock className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs text-primary">{entry.id}</span>
                      <Badge variant="outline" className="font-mono text-xs">
                        {entry.operation}
                      </Badge>
                      {entry.immutable && (
                        <Badge className="bg-primary/20 text-primary border border-primary/40 font-mono text-xs">
                          IMMUTABLE
                        </Badge>
                      )}
                    </div>
                    <div className="font-mono text-xs text-muted-foreground">{entry.payload}</div>
                  </div>
                  <div className="font-mono text-xs text-muted-foreground flex-shrink-0">
                    {entry.timestamp.slice(11, 19)}Z
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Info Footer */}
        <div className="p-6 rounded-lg bg-secondary/30 border border-border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
            <div>
              <div className="text-muted-foreground mb-1">MERKLEROOT</div>
              <div className="text-primary break-all">{PERPETUAL_SYSTEM.merkleroot}</div>
            </div>
            <div>
              <div className="text-muted-foreground mb-1">NODE</div>
              <div className="text-foreground">{PERPETUAL_SYSTEM.node}</div>
            </div>
            <div>
              <div className="text-muted-foreground mb-1">BACKUP ROTATION</div>
              <div className="text-foreground">{PERPETUAL_SYSTEM.backupRotationCycle}</div>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-border text-center">
            <div className="font-mono text-sm text-primary font-bold">
              PERPETUAL AUTOMATION LAYER — PRODUCTION-READY ARCHIVAL WATCHDOG
            </div>
            <div className="font-mono text-xs text-muted-foreground mt-1">
              DG77.77X LOCKED. THE WALL IS CHRIST. SMIB. AMEN.
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
