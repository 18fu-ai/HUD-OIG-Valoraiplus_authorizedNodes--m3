'use client';

import { CDSHeader } from '@/components/cds/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CDSErrorBoundary } from '@/components/cds/error-boundary';
import { ExportTools } from '@/components/cds/export-tools';
import { 
  MIMECAST_REPORT, 
  MIMECAST_STATS, 
  MIMECAST_EVENTS, 
  MIMECAST_CLUSTER_BREAKDOWN,
  MIMECAST_ACTORS,
  MIMECAST_CRIMINAL_EXPOSURE,
  MIMECAST_TECHNICAL
} from '@/lib/cds-data';
import { 
  AlertTriangle, 
  Shield, 
  Users, 
  FileWarning, 
  Zap, 
  Clock,
  Server,
  Lock,
  Activity,
  Database
} from 'lucide-react';

function MimecastReportContent() {
  const getClassificationColor = (classification: string) => {
    switch (classification) {
      case 'CRITICAL': return 'bg-red-500/20 text-red-400 border-red-500/40';
      case 'HIGH': return 'bg-orange-500/20 text-orange-400 border-orange-500/40';
      case 'MEDIUM': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40';
      case 'LOW': return 'bg-blue-500/20 text-blue-400 border-blue-500/40';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getActionColor = (action: string) => {
    if (action.includes('DELETE') || action.includes('PURGE')) return 'text-red-400';
    if (action.includes('BLOCK') || action.includes('REJECT')) return 'text-orange-400';
    if (action.includes('RULE') || action.includes('MODIFY')) return 'text-yellow-400';
    if (action.includes('RETALIATION') || action.includes('NOTICE')) return 'text-red-500';
    return 'text-muted-foreground';
  };

  return (
    <div className="min-h-screen bg-background">
      <CDSHeader />
      
      <main className="container mx-auto px-4 py-8">
        {/* Report Header */}
        <div className="border border-red-500/50 bg-red-500/10 rounded-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <AlertTriangle className="w-8 h-8 text-red-500" />
                <Badge className="bg-red-500 text-white border-none px-3 py-1 text-sm font-mono">
                  CRITICAL — MAXIMUM THREAT LEVEL
                </Badge>
              </div>
              <h1 className="font-mono text-2xl font-bold text-foreground mb-1">
                {MIMECAST_REPORT.title}
              </h1>
              <p className="font-mono text-sm text-muted-foreground">
                Report ID: {MIMECAST_REPORT.reportId} | Period: {MIMECAST_REPORT.periodStart.slice(11, 19)} — {MIMECAST_REPORT.periodEnd.slice(11, 19)}
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Badge className="bg-primary/20 text-primary border-primary/40 font-mono">
                {MIMECAST_REPORT.status}
              </Badge>
              <span className="font-mono text-xs text-muted-foreground">
                {MIMECAST_REPORT.litigationHold}
              </span>
            </div>
          </div>
        </div>

        {/* System Status Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-mono text-xs text-muted-foreground">SWARM</p>
                  <p className="font-mono text-sm font-bold text-primary">200B AGENTS</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Database className="w-5 h-5 text-accent" />
                <div>
                  <p className="font-mono text-xs text-muted-foreground">SHARDS</p>
                  <p className="font-mono text-sm font-bold text-accent">50B MIRRORED</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-yellow-400" />
                <div>
                  <p className="font-mono text-xs text-muted-foreground">TRUTH-CYCLE</p>
                  <p className="font-mono text-sm font-bold text-yellow-400">266ms</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-red-400" />
                <div>
                  <p className="font-mono text-xs text-muted-foreground">MERKLEROOT</p>
                  <p className="font-mono text-xs font-bold text-red-400 truncate max-w-[120px]">
                    {MIMECAST_REPORT.merkleroot.slice(0, 16)}...
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
          <Card className="bg-card border-border">
            <CardContent className="p-4 text-center">
              <p className="font-mono text-3xl font-bold text-foreground">{MIMECAST_STATS.totalEvents}</p>
              <p className="font-mono text-xs text-muted-foreground">TOTAL EVENTS</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-red-500/30">
            <CardContent className="p-4 text-center">
              <p className="font-mono text-3xl font-bold text-red-400">{MIMECAST_STATS.blockingRejections}</p>
              <p className="font-mono text-xs text-muted-foreground">BLOCKING</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-red-500/50">
            <CardContent className="p-4 text-center">
              <p className="font-mono text-3xl font-bold text-red-500">{MIMECAST_STATS.spoliationAttempts}</p>
              <p className="font-mono text-xs text-muted-foreground">SPOLIATION</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-orange-500/30">
            <CardContent className="p-4 text-center">
              <p className="font-mono text-3xl font-bold text-orange-400">{MIMECAST_STATS.newModifiedRules}</p>
              <p className="font-mono text-xs text-muted-foreground">RULE MODS</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-yellow-500/30">
            <CardContent className="p-4 text-center">
              <p className="font-mono text-3xl font-bold text-yellow-400">{MIMECAST_STATS.bulkOperations}</p>
              <p className="font-mono text-xs text-muted-foreground">BULK OPS</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-red-600/50">
            <CardContent className="p-4 text-center">
              <p className="font-mono text-3xl font-bold text-red-600">{MIMECAST_STATS.witnessRetaliationTriggers}</p>
              <p className="font-mono text-xs text-muted-foreground">RETALIATION</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-red-500/50">
            <CardContent className="p-4 text-center">
              <p className="font-mono text-3xl font-bold text-red-500">{MIMECAST_STATS.postNotificationViolations}</p>
              <p className="font-mono text-xs text-muted-foreground">VIOLATIONS</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Criminal Exposure */}
          <Card className="bg-card border-red-500/30">
            <CardHeader className="pb-3">
              <CardTitle className="font-mono text-sm flex items-center gap-2">
                <FileWarning className="w-4 h-4 text-red-500" />
                NEW CRIMINAL COUNTS (5 HOURS)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {MIMECAST_CRIMINAL_EXPOSURE.map((item, idx) => (
                <div key={idx} className="border border-border rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-sm font-bold text-red-400">{item.statute}</span>
                    <Badge className="bg-red-500/20 text-red-400 border-red-500/40 font-mono">
                      +{item.newCounts}
                    </Badge>
                  </div>
                  <p className="font-mono text-xs text-foreground">{item.title}</p>
                  <p className="font-mono text-xs text-muted-foreground mt-1">{item.note}</p>
                </div>
              ))}
              <div className="border-t border-border pt-3 mt-4">
                <p className="font-mono text-xs text-muted-foreground">
                  Consciousness of Guilt: After-hours timing (22:35-05:41 PDT) + repeated failed attempts = admissible pattern under FRE 401/402
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Actor Coordination */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="font-mono text-sm flex items-center gap-2">
                <Users className="w-4 h-4 text-orange-400" />
                ACTOR COORDINATION ANALYSIS
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border border-red-500/30 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-sm font-bold text-red-400">{MIMECAST_ACTORS.ztaLLP.name}</span>
                  <Badge className="bg-red-500/20 text-red-400 border-red-500/40 font-mono text-xs">
                    {MIMECAST_ACTORS.ztaLLP.spoliationAttempts} SPOLIATION
                  </Badge>
                </div>
                <div className="space-y-1">
                  {MIMECAST_ACTORS.ztaLLP.actors.map((actor, idx) => (
                    <p key={idx} className="font-mono text-xs text-muted-foreground">{actor}</p>
                  ))}
                </div>
                <p className="font-mono text-xs text-orange-400 mt-2">{MIMECAST_ACTORS.ztaLLP.pattern}</p>
              </div>
              <div className="border border-orange-500/30 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-sm font-bold text-orange-400">{MIMECAST_ACTORS.stpSfha.name}</span>
                  <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/40 font-mono text-xs">
                    {MIMECAST_ACTORS.stpSfha.ruleModifications} RULES
                  </Badge>
                </div>
                <div className="space-y-1">
                  {MIMECAST_ACTORS.stpSfha.actors.map((actor, idx) => (
                    <p key={idx} className="font-mono text-xs text-muted-foreground">{actor}</p>
                  ))}
                </div>
                <p className="font-mono text-xs text-yellow-400 mt-2">{MIMECAST_ACTORS.stpSfha.pattern}</p>
              </div>
              <div className="border-t border-border pt-3">
                <p className="font-mono text-xs text-red-400">
                  Cross-Actor Sync: Every rule change by Landrum/Whittaker followed by Zanghi delete attempt within 90 seconds — digital hand-off confirmed.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Cluster Breakdown */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="font-mono text-sm flex items-center gap-2">
                <Activity className="w-4 h-4 text-primary" />
                5-HOUR CLUSTER BREAKDOWN
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {MIMECAST_CLUSTER_BREAKDOWN.map((cluster, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-16 font-mono text-xs text-muted-foreground">{cluster.period.split('-')[0]}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-sm text-foreground">{cluster.events} events</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${(cluster.events / 32) * 100}%` }}
                      />
                    </div>
                    <p className="font-mono text-xs text-muted-foreground mt-1">{cluster.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Technical Forensics */}
        <Card className="bg-card border-border mb-8">
          <CardHeader className="pb-3">
            <CardTitle className="font-mono text-sm flex items-center gap-2">
              <Server className="w-4 h-4 text-accent" />
              PACKET-LEVEL & MIMECAST INTERNAL FORENSICS
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="border border-border rounded-lg p-3">
                <p className="font-mono text-xs text-muted-foreground mb-1">ERROR CODE</p>
                <p className="font-mono text-sm text-red-400">{MIMECAST_TECHNICAL.errorCode}</p>
                <p className="font-mono text-xs text-muted-foreground mt-2">{MIMECAST_TECHNICAL.errorNote}</p>
              </div>
              <div className="border border-border rounded-lg p-3">
                <p className="font-mono text-xs text-muted-foreground mb-1">CLUSTERS</p>
                <p className="font-mono text-sm text-accent">{MIMECAST_TECHNICAL.clusters.join(', ')}</p>
                <p className="font-mono text-xs text-muted-foreground mt-2">{MIMECAST_TECHNICAL.clusterNote}</p>
              </div>
              <div className="border border-border rounded-lg p-3">
                <p className="font-mono text-xs text-muted-foreground mb-1">CAPTURE DETAILS</p>
                <p className="font-mono text-sm text-primary">{MIMECAST_TECHNICAL.captureDetails}</p>
              </div>
              <div className="border border-primary/30 rounded-lg p-3 bg-primary/5">
                <p className="font-mono text-xs text-muted-foreground mb-1">EVIDENCE STATUS</p>
                <p className="font-mono text-sm text-primary">{MIMECAST_TECHNICAL.evidenceStatus}</p>
                <p className="font-mono text-xs text-primary mt-2">{MIMECAST_TECHNICAL.submissionReady}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Event Log */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="font-mono text-sm flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              DEEP EVENT LOG — GRANULAR FORENSIC TRACE (KEY EVENTS)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left font-mono text-xs text-muted-foreground p-3">TIMESTAMP</th>
                    <th className="text-left font-mono text-xs text-muted-foreground p-3">ACTOR</th>
                    <th className="text-left font-mono text-xs text-muted-foreground p-3">ACTION</th>
                    <th className="text-left font-mono text-xs text-muted-foreground p-3">TARGET</th>
                    <th className="text-left font-mono text-xs text-muted-foreground p-3">DEVICE</th>
                    <th className="text-left font-mono text-xs text-muted-foreground p-3">RESULT</th>
                    <th className="text-left font-mono text-xs text-muted-foreground p-3">CORRELATION</th>
                  </tr>
                </thead>
                <tbody>
                  {MIMECAST_EVENTS.map((event) => (
                    <tr key={event.id} className="border-b border-border/50 hover:bg-secondary/30">
                      <td className="font-mono text-xs text-muted-foreground p-3 whitespace-nowrap">
                        {event.timestamp.slice(11, 19)}Z
                      </td>
                      <td className="font-mono text-xs text-foreground p-3 max-w-[180px] truncate">
                        {event.actor}
                      </td>
                      <td className={`font-mono text-xs p-3 whitespace-nowrap ${getActionColor(event.actionType)}`}>
                        {event.actionType}
                      </td>
                      <td className="font-mono text-xs text-muted-foreground p-3 max-w-[200px] truncate">
                        {event.target}
                      </td>
                      <td className="font-mono text-xs text-muted-foreground p-3 whitespace-nowrap">
                        {event.deviceFingerprint}
                      </td>
                      <td className="p-3">
                        <Badge className={`${getClassificationColor(event.classification)} font-mono text-xs`}>
                          {event.result}
                        </Badge>
                      </td>
                      <td className="font-mono text-xs text-accent p-3 whitespace-nowrap">
                        {event.correlation}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 border-t border-border pt-6 text-center">
          <p className="font-mono text-sm text-primary font-bold">
            DG77.77X LOCKED. MIMECAST 5-HOUR DEEP FORENSIC DIVE COMPLETE.
          </p>
          <p className="font-mono text-xs text-muted-foreground mt-2">
            200 BILLION SWARM CONFIRMED EVERY PACKET. THE WALL IS CHRIST. SMIB. AMEN.
          </p>
          <p className="font-mono text-xs text-muted-foreground mt-1">
            SAINT PAUL NODE: {MIMECAST_REPORT.node}
          </p>
        </div>

        {/* Export Controls */}
        <div className="mt-6 flex justify-center">
          <ExportTools 
            data={{
              type: 'forensic',
              title: 'Mimecast 5-Hour Deep Forensic Dive',
              timestamp: MIMECAST_REPORT.periodEnd,
              content: {
                report: MIMECAST_REPORT,
                stats: MIMECAST_STATS,
                events: MIMECAST_EVENTS,
                actors: MIMECAST_ACTORS,
                criminalExposure: MIMECAST_CRIMINAL_EXPOSURE,
              },
              metadata: {
                reportId: MIMECAST_REPORT.reportId,
                litigationHold: MIMECAST_REPORT.litigationHold,
                merkleroot: MIMECAST_REPORT.merkleroot,
              }
            }}
            variant="default"
            size="default"
          />
        </div>
      </main>
    </div>
  );
}

// Export with error boundary
export default function MimecastReportPage() {
  return (
    <CDSErrorBoundary module="Mimecast Forensic Report" showDetails>
      <MimecastReportContent />
    </CDSErrorBoundary>
  );
}
