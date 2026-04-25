'use client';

import { CDSHeader } from '@/components/cds/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  WIRETAP_REPORT,
  WIRETAP_INTERCEPTS,
  WIRETAP_STATS,
} from '@/lib/cds-data';
import {
  AlertTriangle,
  Radio,
  Shield,
  FileText,
  Phone,
  Mail,
  MessageSquare,
  Database,
  Lock,
  Eye,
  CheckCircle,
  Clock,
  Users,
  Activity,
} from 'lucide-react';

function getTypeIcon(type: string) {
  switch (type) {
    case 'voice':
      return Phone;
    case 'email':
      return Mail;
    case 'text':
      return MessageSquare;
    case 'data':
      return Database;
    default:
      return FileText;
  }
}

function getStatusIcon(status: string) {
  switch (status) {
    case 'FLAGGED':
      return AlertTriangle;
    case 'ANALYZED':
      return CheckCircle;
    case 'CAPTURED':
      return Eye;
    case 'ARCHIVED':
      return Lock;
    default:
      return Clock;
  }
}

function getClassificationColor(classification: string) {
  switch (classification) {
    case 'CRITICAL':
      return 'bg-destructive/20 text-destructive border-destructive/40';
    case 'HIGH':
      return 'bg-status-active/20 text-status-active border-status-active/40';
    case 'MEDIUM':
      return 'bg-accent/20 text-accent border-accent/40';
    case 'LOW':
      return 'bg-muted text-muted-foreground border-border';
    default:
      return 'bg-muted text-muted-foreground border-border';
  }
}

export default function ReportPage() {
  return (
    <div className="min-h-screen bg-background">
      <CDSHeader />

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Report Header */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="bg-destructive/20 text-destructive border-destructive/40 font-mono">
                CRITICAL
              </Badge>
              <Badge variant="outline" className="bg-primary/20 text-primary border-primary/40 font-mono">
                Section {WIRETAP_REPORT.section}
              </Badge>
              <Badge variant="outline" className="font-mono">
                {WIRETAP_REPORT.reportId}
              </Badge>
            </div>
            <h1 className="text-3xl font-mono font-bold text-foreground">
              {WIRETAP_REPORT.title}
            </h1>
            <p className="text-muted-foreground font-mono">
              {WIRETAP_REPORT.interceptCount}+ intercepts captured under federal authorization
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-destructive/10 border border-destructive/30">
              <Radio className="w-4 h-4 text-destructive animate-pulse" />
              <span className="font-mono text-sm text-destructive">
                {WIRETAP_REPORT.status}
              </span>
            </div>
            <div className="font-mono text-sm text-muted-foreground">
              {WIRETAP_REPORT.reportDate}
            </div>
          </div>
        </div>

        {/* Authority Banner */}
        <Card className="bg-card border-primary/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-primary" />
                <span className="font-mono text-sm">
                  Authority: <span className="text-primary font-bold">{WIRETAP_REPORT.authority}</span>
                </span>
              </div>
              <div className="flex items-center gap-6 text-sm font-mono text-muted-foreground">
                <span>Federal: {WIRETAP_STATS.federalAuthority}</span>
                <span>Court Order: {WIRETAP_STATS.courtOrder}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <Card className="bg-card">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-mono font-bold text-foreground">
                {WIRETAP_STATS.totalIntercepts}
              </div>
              <div className="text-xs font-mono text-muted-foreground mt-1">
                Total Intercepts
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-mono font-bold text-destructive">
                {WIRETAP_STATS.criticalCount}
              </div>
              <div className="text-xs font-mono text-muted-foreground mt-1">
                Critical
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-mono font-bold text-status-active">
                {WIRETAP_STATS.highCount}
              </div>
              <div className="text-xs font-mono text-muted-foreground mt-1">
                High Priority
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-mono font-bold text-status-active">
                {WIRETAP_STATS.flaggedForReview}
              </div>
              <div className="text-xs font-mono text-muted-foreground mt-1">
                Flagged
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-mono font-bold text-primary">
                {WIRETAP_STATS.analyzedComplete}
              </div>
              <div className="text-xs font-mono text-muted-foreground mt-1">
                Analyzed
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-mono font-bold text-accent">
                {WIRETAP_STATS.pendingAnalysis}
              </div>
              <div className="text-xs font-mono text-muted-foreground mt-1">
                Pending
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Intercept Log */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="bg-card">
              <CardHeader className="border-b border-border">
                <CardTitle className="font-mono text-lg flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary" />
                  Recent Intercepts
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {WIRETAP_INTERCEPTS.map((intercept) => {
                    const TypeIcon = getTypeIcon(intercept.type);
                    const StatusIcon = getStatusIcon(intercept.status);
                    return (
                      <div
                        key={intercept.id}
                        className="p-4 hover:bg-secondary/50 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center mt-0.5">
                              <TypeIcon className="w-5 h-5 text-muted-foreground" />
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-mono text-sm font-medium text-foreground">
                                  {intercept.id}
                                </span>
                                <Badge
                                  variant="outline"
                                  className={getClassificationColor(intercept.classification)}
                                >
                                  {intercept.classification}
                                </Badge>
                                <Badge variant="outline" className="font-mono text-xs">
                                  <StatusIcon className="w-3 h-3 mr-1" />
                                  {intercept.status}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {intercept.summary}
                              </p>
                              <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground">
                                <span>{intercept.source} → {intercept.target}</span>
                                <span className="text-primary/60">{intercept.evidenceHash}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-xs font-mono text-muted-foreground whitespace-nowrap">
                            {intercept.timestamp.slice(11, 19)}Z
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Summary */}
            <Card className="bg-card">
              <CardHeader className="border-b border-border">
                <CardTitle className="font-mono text-lg flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  Report Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-muted-foreground leading-relaxed">
                  {WIRETAP_REPORT.summary}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Targets */}
            <Card className="bg-card">
              <CardHeader className="border-b border-border">
                <CardTitle className="font-mono text-sm flex items-center gap-2">
                  <Users className="w-4 h-4 text-destructive" />
                  Surveillance Targets
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-2">
                  {WIRETAP_REPORT.targets.map((target, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 rounded-lg bg-secondary/50"
                    >
                      <span className="font-mono text-sm">{target}</span>
                      <Badge variant="outline" className="bg-destructive/20 text-destructive border-destructive/40 text-xs">
                        ACTIVE
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Capture Types */}
            <Card className="bg-card">
              <CardHeader className="border-b border-border">
                <CardTitle className="font-mono text-sm flex items-center gap-2">
                  <Radio className="w-4 h-4 text-primary" />
                  Capture Types
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="font-mono text-sm">Voice</span>
                  </div>
                  <span className="font-mono text-sm font-bold">{WIRETAP_STATS.voiceCaptures}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="font-mono text-sm">Email</span>
                  </div>
                  <span className="font-mono text-sm font-bold">{WIRETAP_STATS.emailCaptures}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-muted-foreground" />
                    <span className="font-mono text-sm">Text</span>
                  </div>
                  <span className="font-mono text-sm font-bold">{WIRETAP_STATS.textCaptures}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-muted-foreground" />
                    <span className="font-mono text-sm">Data</span>
                  </div>
                  <span className="font-mono text-sm font-bold">{WIRETAP_STATS.dataCaptures}</span>
                </div>
              </CardContent>
            </Card>

            {/* Backup Systems */}
            <Card className="bg-card">
              <CardHeader className="border-b border-border">
                <CardTitle className="font-mono text-sm flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  Backup Systems
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                <div className="p-3 rounded-lg bg-primary/10 border border-primary/30">
                  <div className="font-mono text-xs text-muted-foreground">Swarm Backup</div>
                  <div className="font-mono text-sm font-bold text-primary">{WIRETAP_STATS.swarmBackup}</div>
                </div>
                <div className="p-3 rounded-lg bg-accent/10 border border-accent/30">
                  <div className="font-mono text-xs text-muted-foreground">Shard Replication</div>
                  <div className="font-mono text-sm font-bold text-accent">{WIRETAP_STATS.shardReplication}</div>
                </div>
                <div className="p-3 rounded-lg bg-secondary border border-border">
                  <div className="font-mono text-xs text-muted-foreground">Monitoring Status</div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="font-mono text-sm font-bold">{WIRETAP_STATS.monitoringStatus}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Monitoring Period */}
            <Card className="bg-card">
              <CardHeader className="border-b border-border">
                <CardTitle className="font-mono text-sm flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  Monitoring Period
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-2 font-mono text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Start</span>
                    <span>{WIRETAP_STATS.monitoringStart.slice(0, 10)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <span className="text-primary">{WIRETAP_STATS.monitoringStatus}</span>
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
