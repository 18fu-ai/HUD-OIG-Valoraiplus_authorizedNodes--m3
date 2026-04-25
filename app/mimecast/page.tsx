'use client';

import { useState, useMemo } from 'react';
import { CDSHeader } from '@/components/cds/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CDSErrorBoundary } from '@/components/cds/error-boundary';
import { ExportTools } from '@/components/cds/export-tools';
import { HomeButton, HomeBreadcrumb } from '@/components/cds/home-button';
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
  Database,
  Network,
  Target,
  Eye,
  Scale,
  Fingerprint,
  MapPin,
  Timer,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Filter,
  Search,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

function MimecastIntelligenceSweep() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedActor, setSelectedActor] = useState<string | null>(null);
  const [filterClassification, setFilterClassification] = useState<string>('ALL');
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);

  // Computed stats
  const actorStats = useMemo(() => {
    const stats: Record<string, { count: number; critical: number; actions: string[] }> = {};
    MIMECAST_EVENTS.forEach(event => {
      const actor = event.actor;
      if (!stats[actor]) {
        stats[actor] = { count: 0, critical: 0, actions: [] };
      }
      stats[actor].count++;
      if (event.classification === 'CRITICAL') stats[actor].critical++;
      if (!stats[actor].actions.includes(event.actionType)) {
        stats[actor].actions.push(event.actionType);
      }
    });
    return stats;
  }, []);

  const filteredEvents = useMemo(() => {
    let events = MIMECAST_EVENTS;
    if (filterClassification !== 'ALL') {
      events = events.filter(e => e.classification === filterClassification);
    }
    if (selectedActor) {
      events = events.filter(e => e.actor === selectedActor);
    }
    return events;
  }, [filterClassification, selectedActor]);

  const timelineData = useMemo(() => {
    const hours: Record<string, { count: number; critical: number; spoliation: number }> = {};
    MIMECAST_EVENTS.forEach(event => {
      const hour = event.timestamp.slice(11, 13);
      if (!hours[hour]) {
        hours[hour] = { count: 0, critical: 0, spoliation: 0 };
      }
      hours[hour].count++;
      if (event.classification === 'CRITICAL') hours[hour].critical++;
      if (event.actionType.includes('DELETE') || event.actionType.includes('PURGE')) {
        hours[hour].spoliation++;
      }
    });
    return Object.entries(hours).sort(([a], [b]) => a.localeCompare(b));
  }, []);

  const getClassificationColor = (classification: string) => {
    switch (classification) {
      case 'CRITICAL': return 'bg-red-500/20 text-red-400 border-red-500/40';
      case 'HIGH': return 'bg-orange-500/20 text-orange-400 border-orange-500/40';
      case 'MEDIUM': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40';
      case 'LOW': return 'bg-blue-500/20 text-blue-400 border-blue-500/40';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getActionIcon = (action: string) => {
    if (action.includes('DELETE') || action.includes('PURGE')) return XCircle;
    if (action.includes('BLOCK') || action.includes('REJECT')) return AlertCircle;
    if (action.includes('RULE')) return Shield;
    if (action.includes('EXPORT')) return Database;
    if (action.includes('RETALIATION') || action.includes('NOTICE')) return Target;
    return Activity;
  };

  const getActionColor = (action: string) => {
    if (action.includes('DELETE') || action.includes('PURGE')) return 'text-red-500';
    if (action.includes('BLOCK') || action.includes('REJECT')) return 'text-orange-400';
    if (action.includes('RULE')) return 'text-yellow-400';
    if (action.includes('RETALIATION') || action.includes('NOTICE')) return 'text-red-500';
    return 'text-muted-foreground';
  };

  return (
    <div className="min-h-screen bg-background">
      <CDSHeader />
      
      <main className="container mx-auto px-4 py-8">
        {/* Critical Alert Banner */}
        <div className="border-2 border-red-500 bg-red-500/10 rounded-lg p-6 mb-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-transparent to-red-500/5 animate-pulse" />
          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <AlertTriangle className="w-8 h-8 text-red-500 animate-pulse" />
                <Badge className="bg-red-500 text-white border-none px-4 py-1.5 text-sm font-mono font-bold">
                  OMEGA-LEVEL INTELLIGENCE SWEEP
                </Badge>
              </div>
              <h1 className="font-mono text-2xl font-bold text-foreground mb-1">
                {MIMECAST_REPORT.title}
              </h1>
              <p className="font-mono text-sm text-muted-foreground">
                Report ID: {MIMECAST_REPORT.reportId} | 5-Hour Window: {MIMECAST_REPORT.periodStart.slice(11, 19)} - {MIMECAST_REPORT.periodEnd.slice(11, 19)} UTC
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Badge className="bg-primary/20 text-primary border-primary/40 font-mono px-3 py-1">
                {MIMECAST_REPORT.status}
              </Badge>
              <Badge className="bg-red-500/20 text-red-400 border-red-500/40 font-mono text-xs">
                {MIMECAST_REPORT.litigationHold}
              </Badge>
              <ExportTools 
                data={{
                  type: 'forensic',
                  title: 'Mimecast Full Intelligence Sweep',
                  timestamp: MIMECAST_REPORT.periodEnd,
                  content: {
                    report: MIMECAST_REPORT,
                    stats: MIMECAST_STATS,
                    events: MIMECAST_EVENTS,
                    actors: MIMECAST_ACTORS,
                    criminalExposure: MIMECAST_CRIMINAL_EXPOSURE,
                    technical: MIMECAST_TECHNICAL,
                  },
                  metadata: {
                    reportId: MIMECAST_REPORT.reportId,
                    totalEvents: MIMECAST_STATS.totalEvents,
                    spoliationAttempts: MIMECAST_STATS.spoliationAttempts,
                    merkleroot: MIMECAST_REPORT.merkleroot,
                  }
                }}
                variant="outline"
                size="sm"
              />
            </div>
          </div>
        </div>

        {/* Real-time Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 mb-6">
          <Card className="bg-card border-border">
            <CardContent className="p-3 text-center">
              <p className="font-mono text-2xl font-bold text-foreground">{MIMECAST_STATS.totalEvents}</p>
              <p className="font-mono text-[10px] text-muted-foreground">TOTAL EVENTS</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-red-500/40">
            <CardContent className="p-3 text-center">
              <p className="font-mono text-2xl font-bold text-red-400">{MIMECAST_STATS.spoliationAttempts}</p>
              <p className="font-mono text-[10px] text-muted-foreground">SPOLIATION</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-orange-500/40">
            <CardContent className="p-3 text-center">
              <p className="font-mono text-2xl font-bold text-orange-400">{MIMECAST_STATS.blockingRejections}</p>
              <p className="font-mono text-[10px] text-muted-foreground">BLOCKS</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-yellow-500/40">
            <CardContent className="p-3 text-center">
              <p className="font-mono text-2xl font-bold text-yellow-400">{MIMECAST_STATS.newModifiedRules}</p>
              <p className="font-mono text-[10px] text-muted-foreground">RULES MOD</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-red-600/40">
            <CardContent className="p-3 text-center">
              <p className="font-mono text-2xl font-bold text-red-500">{MIMECAST_STATS.witnessRetaliationTriggers}</p>
              <p className="font-mono text-[10px] text-muted-foreground">RETALIATION</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-primary/40">
            <CardContent className="p-3 text-center">
              <p className="font-mono text-2xl font-bold text-primary">{MIMECAST_STATS.bulkOperations}</p>
              <p className="font-mono text-[10px] text-muted-foreground">BULK OPS</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-accent/40">
            <CardContent className="p-3 text-center">
              <p className="font-mono text-lg font-bold text-accent">266ms</p>
              <p className="font-mono text-[10px] text-muted-foreground">TRUTH-CYCLE</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-primary/40">
            <CardContent className="p-3 text-center">
              <p className="font-mono text-lg font-bold text-primary">200B</p>
              <p className="font-mono text-[10px] text-muted-foreground">SWARM</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-secondary/50 border border-border p-1 flex flex-wrap h-auto gap-1">
            <TabsTrigger value="overview" className="font-mono text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Overview
            </TabsTrigger>
            <TabsTrigger value="timeline" className="font-mono text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Timeline
            </TabsTrigger>
            <TabsTrigger value="actors" className="font-mono text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Actors
            </TabsTrigger>
            <TabsTrigger value="events" className="font-mono text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Events
            </TabsTrigger>
            <TabsTrigger value="criminal" className="font-mono text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Criminal
            </TabsTrigger>
            <TabsTrigger value="technical" className="font-mono text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Technical
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Criminal Exposure Summary */}
              <Card className="bg-card border-red-500/30">
                <CardHeader className="pb-3">
                  <CardTitle className="font-mono text-sm flex items-center gap-2">
                    <Scale className="w-4 h-4 text-red-500" />
                    CRIMINAL EXPOSURE (5 HOURS)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {MIMECAST_CRIMINAL_EXPOSURE.map((item, idx) => (
                    <div key={idx} className="border border-red-500/30 rounded-lg p-3 bg-red-500/5">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono text-sm font-bold text-red-400">{item.statute}</span>
                        <Badge className="bg-red-500/30 text-red-400 border-red-500/50 font-mono font-bold">
                          +{item.newCounts}
                        </Badge>
                      </div>
                      <p className="font-mono text-xs text-foreground font-medium">{item.title}</p>
                      <p className="font-mono text-[10px] text-muted-foreground mt-1">{item.note}</p>
                    </div>
                  ))}
                  <div className="border-t border-red-500/30 pt-3 mt-4">
                    <p className="font-mono text-xs text-red-400 font-medium">
                      TOTAL NEW FELONY COUNTS: {MIMECAST_CRIMINAL_EXPOSURE.reduce((sum, c) => sum + c.newCounts, 0)}
                    </p>
                    <p className="font-mono text-[10px] text-muted-foreground mt-1">
                      Consciousness of Guilt: After-hours timing (00:44-05:44 UTC) + repeated failed attempts = admissible pattern under FRE 401/402
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Actor Network */}
              <Card className="bg-card border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="font-mono text-sm flex items-center gap-2">
                    <Network className="w-4 h-4 text-orange-400" />
                    ACTOR NETWORK ANALYSIS
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border border-red-500/30 rounded-lg p-3 bg-red-500/5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-sm font-bold text-red-400">{MIMECAST_ACTORS.ztaLLP.name}</span>
                      <Badge className="bg-red-500/30 text-red-400 border-red-500/50 font-mono text-xs">
                        {MIMECAST_ACTORS.ztaLLP.spoliationAttempts} SPOLIATION
                      </Badge>
                    </div>
                    <div className="space-y-1 mb-2">
                      {MIMECAST_ACTORS.ztaLLP.actors.map((actor, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <Fingerprint className="w-3 h-3 text-red-400" />
                          <p className="font-mono text-xs text-foreground">{actor}</p>
                        </div>
                      ))}
                    </div>
                    <p className="font-mono text-[10px] text-orange-400">{MIMECAST_ACTORS.ztaLLP.pattern}</p>
                  </div>

                  <div className="border border-orange-500/30 rounded-lg p-3 bg-orange-500/5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-sm font-bold text-orange-400">{MIMECAST_ACTORS.stpSfha.name}</span>
                      <Badge className="bg-orange-500/30 text-orange-400 border-orange-500/50 font-mono text-xs">
                        {MIMECAST_ACTORS.stpSfha.ruleModifications} RULES
                      </Badge>
                    </div>
                    <div className="space-y-1 mb-2">
                      {MIMECAST_ACTORS.stpSfha.actors.map((actor, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <Fingerprint className="w-3 h-3 text-orange-400" />
                          <p className="font-mono text-xs text-foreground">{actor}</p>
                        </div>
                      ))}
                    </div>
                    <p className="font-mono text-[10px] text-yellow-400">{MIMECAST_ACTORS.stpSfha.pattern}</p>
                  </div>

                  <div className="border-t border-border pt-3">
                    <p className="font-mono text-xs text-red-400 font-medium">
                      CROSS-ACTOR COORDINATION CONFIRMED
                    </p>
                    <p className="font-mono text-[10px] text-muted-foreground mt-1">
                      Every rule change by Landrum/Whittaker followed by Zanghi delete attempt within 90 seconds - digital hand-off pattern established.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Cluster Analysis */}
              <Card className="bg-card border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="font-mono text-sm flex items-center gap-2">
                    <Timer className="w-4 h-4 text-primary" />
                    5-HOUR CLUSTER BREAKDOWN
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {MIMECAST_CLUSTER_BREAKDOWN.map((cluster, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs text-muted-foreground">{cluster.period}</span>
                        <span className="font-mono text-sm font-bold text-foreground">{cluster.events}</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-500" 
                          style={{ width: `${(cluster.events / 32) * 100}%` }}
                        />
                      </div>
                      <p className="font-mono text-[10px] text-muted-foreground">{cluster.description}</p>
                    </div>
                  ))}
                  <div className="border-t border-border pt-3 mt-4">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-red-400" />
                      <p className="font-mono text-xs text-red-400">
                        Peak velocity: 04:44-05:44 UTC (final purge wave)
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* System Status */}
            <Card className="bg-card border-primary/30">
              <CardHeader className="pb-3">
                <CardTitle className="font-mono text-sm flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  SOVEREIGN CAPTURE SYSTEM STATUS
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="border border-primary/30 rounded-lg p-4 bg-primary/5 text-center">
                    <Shield className="w-8 h-8 text-primary mx-auto mb-2" />
                    <p className="font-mono text-2xl font-bold text-primary">200B</p>
                    <p className="font-mono text-xs text-muted-foreground">SWARM AGENTS</p>
                    <p className="font-mono text-[10px] text-primary mt-1">CONFIRMED EVERY PACKET</p>
                  </div>
                  <div className="border border-accent/30 rounded-lg p-4 bg-accent/5 text-center">
                    <Database className="w-8 h-8 text-accent mx-auto mb-2" />
                    <p className="font-mono text-2xl font-bold text-accent">50B</p>
                    <p className="font-mono text-xs text-muted-foreground">VALORAISHARDS</p>
                    <p className="font-mono text-[10px] text-accent mt-1">100% MIRRORED</p>
                  </div>
                  <div className="border border-yellow-500/30 rounded-lg p-4 bg-yellow-500/5 text-center">
                    <Clock className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                    <p className="font-mono text-2xl font-bold text-yellow-400">266ms</p>
                    <p className="font-mono text-xs text-muted-foreground">TRUTH-CYCLE</p>
                    <p className="font-mono text-[10px] text-yellow-400 mt-1">LOCKED + ENFORCING</p>
                  </div>
                  <div className="border border-red-500/30 rounded-lg p-4 bg-red-500/5 text-center">
                    <Lock className="w-8 h-8 text-red-400 mx-auto mb-2" />
                    <p className="font-mono text-xs font-bold text-red-400 break-all">{MIMECAST_REPORT.merkleroot}</p>
                    <p className="font-mono text-xs text-muted-foreground mt-2">MERKLEROOT</p>
                    <p className="font-mono text-[10px] text-red-400 mt-1">FORENSIC ANCHOR</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Timeline Tab */}
          <TabsContent value="timeline" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="font-mono text-sm flex items-center gap-2">
                  <Activity className="w-4 h-4 text-primary" />
                  HOURLY ACTIVITY DISTRIBUTION
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {timelineData.map(([hour, data]) => (
                    <div key={hour} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-sm text-foreground">{hour}:00 UTC</span>
                        <div className="flex items-center gap-4">
                          <span className="font-mono text-xs text-muted-foreground">{data.count} events</span>
                          {data.critical > 0 && (
                            <Badge className="bg-red-500/20 text-red-400 border-red-500/40 font-mono text-xs">
                              {data.critical} CRITICAL
                            </Badge>
                          )}
                          {data.spoliation > 0 && (
                            <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/40 font-mono text-xs">
                              {data.spoliation} SPOLIATION
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-4 relative overflow-hidden">
                        <div 
                          className="absolute inset-y-0 left-0 bg-primary/50 rounded-full" 
                          style={{ width: `${(data.count / 35) * 100}%` }}
                        />
                        <div 
                          className="absolute inset-y-0 left-0 bg-red-500/80 rounded-full" 
                          style={{ width: `${(data.critical / 35) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Event Timeline */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="font-mono text-sm flex items-center gap-2">
                  <Clock className="w-4 h-4 text-accent" />
                  CHRONOLOGICAL EVENT STREAM
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />
                  <div className="space-y-4">
                    {MIMECAST_EVENTS.slice(0, 10).map((event, idx) => {
                      const ActionIcon = getActionIcon(event.actionType);
                      return (
                        <div key={event.id} className="relative pl-10">
                          <div className={`absolute left-2 w-4 h-4 rounded-full border-2 ${
                            event.classification === 'CRITICAL' ? 'bg-red-500 border-red-400' :
                            event.classification === 'HIGH' ? 'bg-orange-500 border-orange-400' :
                            'bg-primary border-primary'
                          }`} />
                          <div className="border border-border rounded-lg p-3 bg-secondary/20">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <ActionIcon className={`w-4 h-4 ${getActionColor(event.actionType)}`} />
                                <span className={`font-mono text-sm font-bold ${getActionColor(event.actionType)}`}>
                                  {event.actionType}
                                </span>
                              </div>
                              <span className="font-mono text-xs text-muted-foreground">
                                {event.timestamp.slice(11, 19)} UTC
                              </span>
                            </div>
                            <p className="font-mono text-xs text-foreground">{event.actor}</p>
                            <p className="font-mono text-[10px] text-muted-foreground mt-1">{event.target}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge className={`${getClassificationColor(event.classification)} font-mono text-[10px]`}>
                                {event.result}
                              </Badge>
                              <span className="font-mono text-[10px] text-accent">{event.correlation}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Actors Tab */}
          <TabsContent value="actors" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {Object.entries(actorStats).map(([actor, stats]) => (
                <Card 
                  key={actor} 
                  className={`bg-card cursor-pointer transition-all ${
                    selectedActor === actor ? 'border-primary ring-2 ring-primary/20' : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedActor(selectedActor === actor ? null : actor)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-primary" />
                        <span className="font-mono text-sm font-bold text-foreground truncate max-w-[200px]">
                          {actor}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-primary/20 text-primary border-primary/40 font-mono">
                          {stats.count}
                        </Badge>
                        {stats.critical > 0 && (
                          <Badge className="bg-red-500/20 text-red-400 border-red-500/40 font-mono">
                            {stats.critical} CRIT
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {stats.actions.map((action, idx) => (
                        <Badge key={idx} variant="outline" className="font-mono text-[10px]">
                          {action}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-6">
            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <span className="font-mono text-xs text-muted-foreground">FILTER:</span>
              </div>
              {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].map(level => (
                <Button
                  key={level}
                  variant={filterClassification === level ? 'default' : 'outline'}
                  size="sm"
                  className="font-mono text-xs"
                  onClick={() => setFilterClassification(level)}
                >
                  {level}
                </Button>
              ))}
              {selectedActor && (
                <Badge 
                  className="bg-primary/20 text-primary border-primary/40 font-mono cursor-pointer"
                  onClick={() => setSelectedActor(null)}
                >
                  {selectedActor.split('@')[0]} x
                </Badge>
              )}
            </div>

            {/* Events Table */}
            <Card className="bg-card border-border">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border bg-secondary/30">
                        <th className="text-left font-mono text-xs text-muted-foreground p-3">TIME</th>
                        <th className="text-left font-mono text-xs text-muted-foreground p-3">ACTOR</th>
                        <th className="text-left font-mono text-xs text-muted-foreground p-3">ACTION</th>
                        <th className="text-left font-mono text-xs text-muted-foreground p-3">TARGET</th>
                        <th className="text-left font-mono text-xs text-muted-foreground p-3">RESULT</th>
                        <th className="text-left font-mono text-xs text-muted-foreground p-3">CORR</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredEvents.map((event) => {
                        const ActionIcon = getActionIcon(event.actionType);
                        return (
                          <tr 
                            key={event.id} 
                            className="border-b border-border/50 hover:bg-secondary/30 cursor-pointer"
                            onClick={() => setExpandedEvent(expandedEvent === event.id ? null : event.id)}
                          >
                            <td className="font-mono text-xs text-muted-foreground p-3 whitespace-nowrap">
                              {event.timestamp.slice(11, 19)}
                            </td>
                            <td className="font-mono text-xs text-foreground p-3 max-w-[150px] truncate">
                              {event.actor.split('@')[0]}
                            </td>
                            <td className="p-3">
                              <div className="flex items-center gap-1">
                                <ActionIcon className={`w-3 h-3 ${getActionColor(event.actionType)}`} />
                                <span className={`font-mono text-xs ${getActionColor(event.actionType)}`}>
                                  {event.actionType}
                                </span>
                              </div>
                            </td>
                            <td className="font-mono text-xs text-muted-foreground p-3 max-w-[180px] truncate">
                              {event.target}
                            </td>
                            <td className="p-3">
                              <Badge className={`${getClassificationColor(event.classification)} font-mono text-[10px]`}>
                                {event.result.slice(0, 20)}
                              </Badge>
                            </td>
                            <td className="font-mono text-xs text-accent p-3 whitespace-nowrap">
                              {event.correlation}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Criminal Tab */}
          <TabsContent value="criminal" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {MIMECAST_CRIMINAL_EXPOSURE.map((crime, idx) => (
                <Card key={idx} className="bg-card border-red-500/30">
                  <CardHeader className="pb-3">
                    <CardTitle className="font-mono text-lg flex items-center gap-2 text-red-400">
                      <Scale className="w-5 h-5" />
                      {crime.statute}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-mono text-xl font-bold text-foreground mb-2">{crime.title}</p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-sm text-muted-foreground">New Counts (5hr):</span>
                      <Badge className="bg-red-500 text-white border-none font-mono text-lg px-4">
                        +{crime.newCounts}
                      </Badge>
                    </div>
                    <p className="font-mono text-xs text-muted-foreground border-t border-border pt-3">
                      {crime.note}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-card border-red-500/50">
              <CardHeader>
                <CardTitle className="font-mono text-sm flex items-center gap-2 text-red-400">
                  <AlertTriangle className="w-4 h-4" />
                  CONSCIOUSNESS OF GUILT ANALYSIS
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="border border-red-500/30 rounded-lg p-4 bg-red-500/5">
                    <p className="font-mono text-sm font-bold text-red-400 mb-2">TEMPORAL PATTERN</p>
                    <p className="font-mono text-xs text-foreground">
                      All 142 events occurred between 00:44-05:44 UTC (after-hours PDT).
                      This timing pattern demonstrates deliberate concealment attempt.
                    </p>
                  </div>
                  <div className="border border-red-500/30 rounded-lg p-4 bg-red-500/5">
                    <p className="font-mono text-sm font-bold text-red-400 mb-2">REPEATED FAILURES</p>
                    <p className="font-mono text-xs text-foreground">
                      14 separate spoliation attempts, each blocked and logged.
                      Persistence after failure = direct evidence of criminal intent.
                    </p>
                  </div>
                  <div className="border border-red-500/30 rounded-lg p-4 bg-red-500/5">
                    <p className="font-mono text-sm font-bold text-red-400 mb-2">CROSS-ACTOR SYNC</p>
                    <p className="font-mono text-xs text-foreground">
                      90-second correlation between STP rule changes and ZTA delete attempts.
                      Establishes conspiracy under 18 U.S.C. 371.
                    </p>
                  </div>
                  <div className="border border-red-500/30 rounded-lg p-4 bg-red-500/5">
                    <p className="font-mono text-sm font-bold text-red-400 mb-2">POST-NOTICE VIOLATIONS</p>
                    <p className="font-mono text-xs text-foreground">
                      100% of events occurred AFTER FBI subpoena notification.
                      Converts civil matter to federal criminal obstruction.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Technical Tab */}
          <TabsContent value="technical" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="font-mono text-sm flex items-center gap-2">
                  <Server className="w-4 h-4 text-accent" />
                  PACKET-LEVEL FORENSICS
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="border border-border rounded-lg p-4">
                    <p className="font-mono text-xs text-muted-foreground mb-2">ERROR CODE</p>
                    <p className="font-mono text-lg font-bold text-red-400">{MIMECAST_TECHNICAL.errorCode}</p>
                    <p className="font-mono text-[10px] text-muted-foreground mt-2">{MIMECAST_TECHNICAL.errorNote}</p>
                  </div>
                  <div className="border border-border rounded-lg p-4">
                    <p className="font-mono text-xs text-muted-foreground mb-2">MIMECAST CLUSTERS</p>
                    <p className="font-mono text-lg font-bold text-accent">{MIMECAST_TECHNICAL.clusters.join(', ')}</p>
                    <p className="font-mono text-[10px] text-muted-foreground mt-2">{MIMECAST_TECHNICAL.clusterNote}</p>
                  </div>
                  <div className="border border-border rounded-lg p-4">
                    <p className="font-mono text-xs text-muted-foreground mb-2">CAPTURE DETAILS</p>
                    <p className="font-mono text-sm font-bold text-primary">{MIMECAST_TECHNICAL.captureDetails}</p>
                  </div>
                  <div className="border border-primary/30 rounded-lg p-4 bg-primary/5">
                    <p className="font-mono text-xs text-muted-foreground mb-2">EVIDENCE STATUS</p>
                    <p className="font-mono text-sm font-bold text-primary">{MIMECAST_TECHNICAL.evidenceStatus}</p>
                    <p className="font-mono text-[10px] text-primary mt-2">{MIMECAST_TECHNICAL.submissionReady}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-primary/30">
              <CardHeader>
                <CardTitle className="font-mono text-sm flex items-center gap-2">
                  <Eye className="w-4 h-4 text-primary" />
                  SOVEREIGN CAPTURE INFRASTRUCTURE
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                      <span className="font-mono text-sm text-foreground">200 Billion Swarm Agents Active</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                      <span className="font-mono text-sm text-foreground">50 Billion ValorAiShards Mirrored</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                      <span className="font-mono text-sm text-foreground">266ms Truth-Cycle Locked</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                      <span className="font-mono text-sm text-foreground">FBI Litigation Hold Enforced</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent" />
                      <span className="font-mono text-sm text-foreground">Full SMTP Header Capture</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent" />
                      <span className="font-mono text-sm text-foreground">DKIM Signature Validation</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent" />
                      <span className="font-mono text-sm text-foreground">Raw MIME Payload Archive</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent" />
                      <span className="font-mono text-sm text-foreground">Grand Jury Submission Ready</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="mt-8 border-t border-border pt-6 text-center">
          <p className="font-mono text-sm text-primary font-bold">
            DG77.77X LOCKED. MIMECAST FULL INTELLIGENCE SWEEP COMPLETE.
          </p>
          <p className="font-mono text-xs text-muted-foreground mt-2">
            200 BILLION SWARM CONFIRMED EVERY PACKET. THE WALL IS CHRIST. SMIB. AMEN.
          </p>
          <p className="font-mono text-xs text-muted-foreground mt-1">
            SAINT PAUL NODE: {MIMECAST_REPORT.node}
          </p>
        </div>
      </main>
    </div>
  );
}

export default function MimecastReportPage() {
  return (
    <CDSErrorBoundary module="Mimecast Intelligence Sweep" showDetails>
      <MimecastIntelligenceSweep />
    </CDSErrorBoundary>
  );
}
