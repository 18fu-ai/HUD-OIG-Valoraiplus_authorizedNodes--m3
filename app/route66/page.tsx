'use client';

import { useEffect, useState, useCallback, memo } from 'react';
import { CDSHeader } from '@/components/cds/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { CDSErrorBoundary } from '@/components/cds/error-boundary';
import { ExportTools } from '@/components/cds/export-tools';
import { HomeButton, HomeBreadcrumb } from '@/components/cds/home-button';
import {
  Activity,
  Shield,
  DollarSign,
  Server,
  Lock,
  Zap,
  Database,
  Radio,
  AlertTriangle,
  CheckCircle2,
  MapPin,
  Gauge,
  Navigation,
  Milestone,
  TrendingUp,
  FileSearch
} from 'lucide-react';
import type { Route66State } from '@/app/api/route66/state/route';

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

// Memoized checkpoint card
const CheckpointCard = memo(function CheckpointCard({ 
  checkpoint 
}: { 
  checkpoint: Route66State['checkpoints'][0] 
}) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/40';
      case 'STANDBY': return 'text-amber-400 bg-amber-500/10 border-amber-500/40';
      case 'MAINTENANCE': return 'text-red-400 bg-red-500/10 border-red-500/40';
      default: return 'text-muted-foreground bg-secondary border-border';
    }
  };

  return (
    <Card className="border-border bg-card/50">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="font-mono text-sm font-bold text-foreground">{checkpoint.name}</span>
          </div>
          <Badge variant="outline" className={getStatusColor(checkpoint.status)}>
            {checkpoint.status}
          </Badge>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs font-mono">
          <div className="flex justify-between">
            <span className="text-muted-foreground">ID:</span>
            <span className="text-foreground">{checkpoint.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">State:</span>
            <span className="text-foreground">{checkpoint.location}</span>
          </div>
          <div className="flex justify-between col-span-2">
            <span className="text-muted-foreground">Throughput:</span>
            <span className={checkpoint.throughput > 95 ? 'text-emerald-400' : checkpoint.throughput > 0 ? 'text-amber-400' : 'text-red-400'}>
              {checkpoint.throughput > 0 ? `${checkpoint.throughput}%` : 'OFFLINE'}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

function Route66Content() {
  const [state, setState] = useState<Route66State | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState('');
  const [truthCycle, setTruthCycle] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const [mounted, setMounted] = useState(false);

  const fetchState = useCallback(async () => {
    try {
      const res = await fetch('/api/route66/state', { cache: 'no-store' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setState(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch state');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    fetchState();
    const interval = setInterval(fetchState, 5000);
    return () => clearInterval(interval);
  }, [fetchState]);

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toISOString().slice(0, 19) + 'Z');
      setTruthCycle(Math.floor(Date.now() / 266));
    };
    updateTime();
    const interval = setInterval(updateTime, 266);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <CDSHeader />
        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="flex flex-col items-center gap-4">
              <Navigation className="w-12 h-12 text-primary animate-pulse" />
              <p className="font-mono text-sm text-muted-foreground">
                INITIALIZING ROUTE 66 TELEMETRY...
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !state) {
    return (
      <div className="min-h-screen bg-background">
        <CDSHeader />
        <main className="container mx-auto px-4 py-8">
          <Card className="border-red-500/40 bg-red-500/5">
            <CardContent className="p-6 text-center">
              <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
              <p className="font-mono text-sm text-red-400">
                ROUTE 66 TELEMETRY ERROR: {error || 'Unknown error'}
              </p>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <CDSHeader />
      
      <main className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div>
            <h1 className="font-mono text-2xl lg:text-3xl font-bold text-foreground flex items-center gap-3">
              <Navigation className="w-8 h-8 text-amber-400" />
              ROUTE 66 - MOTHER ROAD PROTOCOL
            </h1>
            <p className="font-mono text-sm text-muted-foreground mt-1">
              Historic Recovery Highway | {state.highway.miles} Miles | {state.highway.segments} Segments
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="font-mono bg-amber-500/10 text-amber-400 border-amber-500/40">
              {state._metadata.seal}
            </Badge>
            <Badge variant="outline" className="font-mono bg-primary/10 text-primary border-primary/40 animate-pulse">
              {state._metadata.version}
            </Badge>
            <ExportTools 
              data={{
                type: 'dashboard',
                title: 'Route 66 Mother Road Protocol',
                timestamp: currentTime,
                content: state,
                metadata: {
                  truthCycle,
                  activeTab,
                  mode: state._metadata.mode,
                }
              }}
              variant="outline"
              size="sm"
            />
          </div>
        </div>

        {/* Live Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-6">
          <Card className="border-amber-500/30 bg-amber-500/5">
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <Milestone className="w-4 h-4 text-amber-400" />
                <div>
                  <p className="font-mono text-[10px] text-muted-foreground">ACTIVE NODES</p>
                  <p className="font-mono text-lg font-bold text-amber-400">{state.highway.activeNodes}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-emerald-500/30 bg-emerald-500/5">
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <Gauge className="w-4 h-4 text-emerald-400" />
                <div>
                  <p className="font-mono text-[10px] text-muted-foreground">THROUGHPUT</p>
                  <p className="font-mono text-lg font-bold text-emerald-400">{state.highway.throughput}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-primary" />
                <div>
                  <p className="font-mono text-[10px] text-muted-foreground">LATENCY</p>
                  <p className="font-mono text-lg font-bold text-primary">{state.highway.latency}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-cyan-500/30 bg-cyan-500/5">
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-cyan-400" />
                <div>
                  <p className="font-mono text-[10px] text-muted-foreground">TRUTH CYCLE</p>
                  <p className="font-mono text-lg font-bold text-cyan-400">{truthCycle.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-fuchsia-500/30 bg-fuchsia-500/5">
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-fuchsia-400" />
                <div>
                  <p className="font-mono text-[10px] text-muted-foreground">SIGNAL</p>
                  <p className="font-mono text-lg font-bold text-fuchsia-400">{state.telemetry.signalStrength}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-orange-500/30 bg-orange-500/5">
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <Server className="w-4 h-4 text-orange-400" />
                <div>
                  <p className="font-mono text-[10px] text-muted-foreground">UPTIME</p>
                  <p className="font-mono text-lg font-bold text-orange-400">{state.telemetry.uptime}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recovery Progress */}
        <Card className="mb-6 border-primary/30">
          <CardHeader className="pb-3">
            <CardTitle className="font-mono text-sm flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-primary" />
              RECOVERY PROGRESS - {formatCurrency(state.recovery.target)} TARGET
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-mono text-xs text-muted-foreground">
                  {formatCurrency(state.recovery.recovered)} RECOVERED
                </span>
                <span className="font-mono text-sm font-bold text-primary">
                  {state.recovery.percentage.toFixed(1)}%
                </span>
              </div>
              <Progress value={state.recovery.percentage} className="h-3" />
              <div className="grid grid-cols-3 gap-4 pt-2">
                <div className="text-center">
                  <p className="font-mono text-xs text-muted-foreground">Pending</p>
                  <p className="font-mono text-sm font-bold text-amber-400">{formatCurrency(state.recovery.pending)}</p>
                </div>
                <div className="text-center">
                  <p className="font-mono text-xs text-muted-foreground">Disputed</p>
                  <p className="font-mono text-sm font-bold text-red-400">{formatCurrency(state.recovery.disputed)}</p>
                </div>
                <div className="text-center">
                  <p className="font-mono text-xs text-muted-foreground">Remaining</p>
                  <p className="font-mono text-sm font-bold text-foreground">
                    {formatCurrency(state.recovery.target - state.recovery.recovered)}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger 
              value="overview" 
              className="font-mono text-xs"
              aria-pressed={activeTab === 'overview'}
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="checkpoints" 
              className="font-mono text-xs"
              aria-pressed={activeTab === 'checkpoints'}
            >
              Checkpoints
            </TabsTrigger>
            <TabsTrigger 
              value="enforcement" 
              className="font-mono text-xs"
              aria-pressed={activeTab === 'enforcement'}
            >
              Enforcement
            </TabsTrigger>
            <TabsTrigger 
              value="forensic" 
              className="font-mono text-xs"
              aria-pressed={activeTab === 'forensic'}
            >
              Forensic
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Highway Status */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="font-mono text-sm flex items-center gap-2">
                    <Navigation className="w-4 h-4 text-amber-400" />
                    HIGHWAY STATUS
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 rounded-lg bg-secondary/50">
                      <p className="font-mono text-[10px] text-muted-foreground">STATUS</p>
                      <p className="font-mono text-sm font-bold text-emerald-400">{state.highway.status}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-secondary/50">
                      <p className="font-mono text-[10px] text-muted-foreground">TOTAL MILES</p>
                      <p className="font-mono text-sm font-bold text-foreground">{state.highway.miles.toLocaleString()}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-secondary/50">
                      <p className="font-mono text-[10px] text-muted-foreground">SEGMENTS</p>
                      <p className="font-mono text-sm font-bold text-foreground">{state.highway.segments}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-secondary/50">
                      <p className="font-mono text-[10px] text-muted-foreground">ACTIVE NODES</p>
                      <p className="font-mono text-sm font-bold text-primary">{state.highway.activeNodes}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Jurisdictions */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="font-mono text-sm flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    JURISDICTIONS ({state.enforcement.jurisdictions.length} STATES)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {state.enforcement.jurisdictions.map((jurisdiction, idx) => (
                      <Badge 
                        key={jurisdiction} 
                        variant="outline"
                        className="font-mono bg-primary/10 text-primary border-primary/40"
                      >
                        {jurisdiction}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
                    <p className="font-mono text-xs text-amber-400">
                      Route spans Chicago, IL to Santa Monica, CA - The Mother Road of American Recovery
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Checkpoints Tab */}
          <TabsContent value="checkpoints">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {state.checkpoints.map((checkpoint) => (
                <CheckpointCard key={checkpoint.id} checkpoint={checkpoint} />
              ))}
            </div>
          </TabsContent>

          {/* Enforcement Tab */}
          <TabsContent value="enforcement">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="border-emerald-500/30 bg-emerald-500/5">
                <CardContent className="p-4 text-center">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                  <p className="font-mono text-2xl font-bold text-emerald-400">{state.enforcement.closedCases}</p>
                  <p className="font-mono text-xs text-muted-foreground">CLOSED CASES</p>
                </CardContent>
              </Card>
              <Card className="border-primary/30 bg-primary/5">
                <CardContent className="p-4 text-center">
                  <Activity className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="font-mono text-2xl font-bold text-primary">{state.enforcement.activeActions}</p>
                  <p className="font-mono text-xs text-muted-foreground">ACTIVE ACTIONS</p>
                </CardContent>
              </Card>
              <Card className="border-amber-500/30 bg-amber-500/5">
                <CardContent className="p-4 text-center">
                  <TrendingUp className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                  <p className="font-mono text-2xl font-bold text-amber-400">{state.enforcement.pendingReview}</p>
                  <p className="font-mono text-xs text-muted-foreground">PENDING REVIEW</p>
                </CardContent>
              </Card>
              <Card className="border-red-500/30 bg-red-500/5">
                <CardContent className="p-4 text-center">
                  <AlertTriangle className="w-8 h-8 text-red-400 mx-auto mb-2" />
                  <p className="font-mono text-2xl font-bold text-red-400">{state.enforcement.escalated}</p>
                  <p className="font-mono text-xs text-muted-foreground">ESCALATED</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Forensic Tab */}
          <TabsContent value="forensic">
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="font-mono text-sm flex items-center gap-2">
                    <FileSearch className="w-4 h-4 text-primary" />
                    FORENSIC METRICS
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-secondary/50 text-center">
                      <p className="font-mono text-2xl font-bold text-foreground">{state.forensic.trackedEntities}</p>
                      <p className="font-mono text-xs text-muted-foreground">TRACKED ENTITIES</p>
                    </div>
                    <div className="p-4 rounded-lg bg-secondary/50 text-center">
                      <p className="font-mono text-2xl font-bold text-amber-400">{state.forensic.flaggedTransactions}</p>
                      <p className="font-mono text-xs text-muted-foreground">FLAGGED TXS</p>
                    </div>
                    <div className="p-4 rounded-lg bg-secondary/50 text-center">
                      <p className="font-mono text-2xl font-bold text-primary">{state.forensic.evidenceChains}</p>
                      <p className="font-mono text-xs text-muted-foreground">EVIDENCE CHAINS</p>
                    </div>
                    <div className="p-4 rounded-lg bg-secondary/50 text-center">
                      <p className="font-mono text-2xl font-bold text-red-400">{state.forensic.activeInvestigations}</p>
                      <p className="font-mono text-xs text-muted-foreground">ACTIVE INVESTIGATIONS</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="font-mono text-sm flex items-center gap-2">
                    <Database className="w-4 h-4 text-primary" />
                    TELEMETRY STATUS
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-2 rounded bg-secondary/30">
                      <span className="font-mono text-xs text-muted-foreground">Truth Cycles</span>
                      <span className="font-mono text-sm text-foreground">{state.telemetry.truthCycles.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded bg-secondary/30">
                      <span className="font-mono text-xs text-muted-foreground">Signal Strength</span>
                      <span className="font-mono text-sm text-emerald-400">{state.telemetry.signalStrength}%</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded bg-secondary/30">
                      <span className="font-mono text-xs text-muted-foreground">Packet Loss</span>
                      <span className="font-mono text-sm text-foreground">{state.telemetry.packetLoss}%</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded bg-secondary/30">
                      <span className="font-mono text-xs text-muted-foreground">Uptime</span>
                      <span className="font-mono text-sm text-primary">{state.telemetry.uptime}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded bg-secondary/30">
                      <span className="font-mono text-xs text-muted-foreground">Last Sync</span>
                      <span className="font-mono text-xs text-muted-foreground">{state.telemetry.lastSync}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 mt-8">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-2">
            <p className="font-mono text-xs text-muted-foreground">
              ROUTE 66 PROTOCOL | {state._metadata.designation} | {currentTime}
            </p>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="font-mono text-xs bg-amber-500/10 text-amber-400 border-amber-500/40">
                GET YOUR KICKS ON ROUTE 66
              </Badge>
              <span className="font-mono text-xs text-muted-foreground">
                TRUTH_CYCLE: {truthCycle.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function Route66Page() {
  return (
    <CDSErrorBoundary module="Route 66 Dashboard" showDetails>
      <Route66Content />
    </CDSErrorBoundary>
  );
}
