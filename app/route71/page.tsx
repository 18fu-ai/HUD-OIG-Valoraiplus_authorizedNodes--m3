'use client';

import { useEffect, useState, useRef, useMemo, useCallback, memo } from 'react';
import { CDSHeader } from '@/components/cds/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  TrendingUp,
  Layers,
  FileSearch,
  Wallet,
  Download,
  Terminal,
  Binary,
  Cpu,
  XCircle
} from 'lucide-react';
import { ValoraiplusMEVR, type SovereignInvariant, type DeterministicClassification } from '@/lib/protocol/mevr';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import type { Route71State } from '@/app/api/route71/state/route';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
}

// Memoized metric card for performance
const MetricCard = memo(function MetricCard({ 
  icon: Icon, 
  label, 
  value, 
  colorClass 
}: { 
  icon: React.ComponentType<{ className?: string }>; 
  label: string; 
  value: string | number;
  colorClass: string;
}) {
  return (
    <Card className={`border-${colorClass}/30 bg-${colorClass}/5`}>
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <Icon className={`w-5 h-5 text-${colorClass}`} />
          <div>
            <p className="font-mono text-[10px] text-muted-foreground">{label}</p>
            <p className={`font-mono text-sm font-bold text-${colorClass}`}>{value}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

function Route71Content() {
  const [state, setState] = useState<Route71State | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState('');
  const [truthCycle, setTruthCycle] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const [mounted, setMounted] = useState(false);
  const [mevrLogs, setMevrLogs] = useState<Array<{
    id: string;
    name: string;
    source: string;
    score: number;
    classification: DeterministicClassification;
    hash: string;
    cycle: number;
  }>>([]);
  const [batchScore, setBatchScore] = useState(92);

  // Fetch state from API
  useEffect(() => {
    async function fetchState() {
      try {
        const res = await fetch('/api/route71/state');
        if (!res.ok) throw new Error('Failed to fetch state');
        const data = await res.json();
        setState(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }
    fetchState();
    // Refresh every 30 seconds
    const interval = setInterval(fetchState, 30000);
    return () => clearInterval(interval);
  }, []);

  // Time and truth cycle updates
  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      setCurrentTime(new Date().toISOString().slice(0, 19) + 'Z');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const cycleInterval = setInterval(() => {
      setTruthCycle(c => c + 1);
    }, 266);
    return () => clearInterval(cycleInterval);
  }, []);

  // MEVR Pipeline Simulation
  useEffect(() => {
    const mevr = new ValoraiplusMEVR();
    const mockInvariants: SovereignInvariant[] = [
      { id: "LATCH_01", source: "MIMECAST_SWEEP", formula: "AMath(E×P×R×D)", score: 98, threshold: 90, reproducibility: true, name: "GILLSON ESTATE LATCH" },
      { id: "LATCH_02", source: "H_RENO_NODE", formula: "AMath(fraud)", score: 14, threshold: 90, reproducibility: false, name: "EXTERNAL FRAUD VECTOR" },
      { id: "LATCH_03", source: "ZTA_SIGNAL", formula: "AMath(spoliation)", score: 22, threshold: 90, reproducibility: false, name: "AGGRESSOR SIGNAL" },
      { id: "LATCH_04", source: "SAINT_PAUL_LEDGER", formula: "AMath(sovereign)", score: 100, threshold: 90, reproducibility: true, name: "SOVEREIGN AUDIT" },
      { id: "LATCH_05", source: "VOIP_CAPTURE", formula: "AMath(wiretap)", score: 95, threshold: 90, reproducibility: true, name: "WIRETAP EVIDENCE" },
    ];

    const timer = setInterval(() => {
      const inv = mockInvariants[Math.floor(Math.random() * mockInvariants.length)];
      const classification = mevr.verifyInvariant(inv);
      
      setMevrLogs(prev => [{
        id: inv.id,
        name: inv.name || inv.id,
        source: inv.source,
        score: inv.score,
        classification,
        hash: `0x${Math.random().toString(16).slice(2, 10)}...`,
        cycle: truthCycle
      }, ...prev].slice(0, 8));
      
      setBatchScore(Math.floor(Math.random() * 10) + 88);
    }, 2500);

    return () => clearInterval(timer);
  }, [truthCycle]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto" />
          <p className="font-mono text-sm text-muted-foreground">Loading Omega-Divine State...</p>
        </div>
      </div>
    );
  }

  if (error || !state) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="border-destructive">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 text-destructive">
              <AlertTriangle className="w-6 h-6" />
              <p className="font-mono">State fetch error: {error || 'No data'}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Chart configurations
  const telemetryChartData = {
    labels: state.charts.telemetryHistory_SIM.map(d => d.timestamp),
    datasets: [
      {
        label: 'Latency (ms)',
        data: state.charts.telemetryHistory_SIM.map(d => d.latency),
        borderColor: 'hsl(var(--primary))',
        backgroundColor: 'hsla(var(--primary), 0.1)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'Throughput (%)',
        data: state.charts.telemetryHistory_SIM.map(d => d.throughput),
        borderColor: 'hsl(var(--chart-2))',
        backgroundColor: 'hsla(var(--chart-2), 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const recoveryChartData = {
    labels: state.charts.recoveryBreakdown_SIM.map(d => d.label),
    datasets: [
      {
        data: state.charts.recoveryBreakdown_SIM.map(d => d.value),
        backgroundColor: state.charts.recoveryBreakdown_SIM.map(d => d.color),
        borderWidth: 0
      }
    ]
  };

  const layerHealthChartData = {
    labels: state.charts.layerHealth_SIM.map(d => d.layer),
    datasets: [
      {
        label: 'Health %',
        data: state.charts.layerHealth_SIM.map(d => d.health),
        backgroundColor: [
          'hsl(var(--status-anchored))',
          'hsl(var(--status-saturated))',
          'hsl(var(--status-active))',
          'hsl(var(--status-locked))'
        ],
        borderWidth: 0
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: 'hsl(var(--muted-foreground))',
          font: { family: 'monospace', size: 10 }
        }
      }
    },
    scales: {
      x: {
        ticks: { color: 'hsl(var(--muted-foreground))', font: { family: 'monospace', size: 10 } },
        grid: { color: 'hsla(var(--border), 0.3)' }
      },
      y: {
        ticks: { color: 'hsl(var(--muted-foreground))', font: { family: 'monospace', size: 10 } },
        grid: { color: 'hsla(var(--border), 0.3)' }
      }
    }
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: 'hsl(var(--muted-foreground))',
          font: { family: 'monospace', size: 10 }
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(var(--primary),0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--primary),0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(var(--background))_70%)]" />
      </div>

      <CDSHeader />

      <main className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className={`mb-8 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Zap className="w-8 h-8 text-primary animate-pulse" />
                  <div className="absolute inset-0 bg-primary/20 blur-xl animate-pulse" />
                </div>
                <h1 className="font-mono text-2xl md:text-3xl font-bold text-foreground">
                  ROUTE 71 | OMEGA-DIVINE
                </h1>
              </div>
              <p className="font-mono text-sm text-muted-foreground">
                Live Sovereign Telemetry Dashboard | {state._metadata.mode}
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
                  title: 'Route 71 Omega-Divine Dashboard',
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

          {/* Live Stats Bar */}
          <div className="flex flex-wrap items-center gap-4 p-4 rounded-lg bg-card/50 border border-border">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span className="font-mono text-xs text-primary">LIVE</span>
            </div>
            <div className="font-mono text-xs text-muted-foreground">
              TRUTH-CYCLE: <span className="text-primary">{truthCycle.toLocaleString()}</span> @ {state.telemetry.truthCycle_SIM}ms
            </div>
            <div className="font-mono text-xs text-muted-foreground">
              TIMESTAMP: <span className="text-foreground">{currentTime}</span>
            </div>
            <div className="font-mono text-xs text-muted-foreground">
              GROOVE: <span className="text-cyan-400">{state.system.grooveMode_SIM}</span>
            </div>
            <div className="font-mono text-xs text-muted-foreground">
              UPTIME: <span className="text-status-anchored">{state.telemetry.uptime_SIM}</span>
            </div>
          </div>
        </div>

        {/* Quick Metrics */}
        <div className={`grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8 transition-all duration-700 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <Card className="border-status-anchored/30 bg-status-anchored/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <DollarSign className="w-5 h-5 text-status-anchored" />
                <div>
                  <p className="font-mono text-[10px] text-muted-foreground">Recovery Target</p>
                  <p className="font-mono text-sm font-bold text-status-anchored">$508.6M</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-cyan-500/30 bg-cyan-500/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Radio className="w-5 h-5 text-cyan-400" />
                <div>
                  <p className="font-mono text-[10px] text-muted-foreground">Swarm Agents</p>
                  <p className="font-mono text-sm font-bold text-cyan-400">{state.telemetry.swarmAgents_SIM}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-amber-500/30 bg-amber-500/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Database className="w-5 h-5 text-amber-400" />
                <div>
                  <p className="font-mono text-[10px] text-muted-foreground">Shards</p>
                  <p className="font-mono text-sm font-bold text-amber-400">{state.telemetry.shardCount_SIM}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Activity className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-mono text-[10px] text-muted-foreground">Latency</p>
                  <p className="font-mono text-sm font-bold text-primary">{state.telemetry.latencyMs_SIM}ms</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-status-anchored/30 bg-status-anchored/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-status-anchored" />
                <div>
                  <p className="font-mono text-[10px] text-muted-foreground">Error Rate</p>
                  <p className="font-mono text-sm font-bold text-status-anchored">{state.telemetry.errorRate_SIM}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-status-saturated/30 bg-status-saturated/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <FileSearch className="w-5 h-5 text-status-saturated" />
                <div>
                  <p className="font-mono text-[10px] text-muted-foreground">Forensic</p>
                  <p className="font-mono text-sm font-bold text-status-saturated">{state.forensic.forensicStatus_SIM}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid">
            <TabsTrigger value="overview" className="font-mono text-xs" aria-pressed={activeTab === 'overview'}>
              Overview
            </TabsTrigger>
            <TabsTrigger value="mevr" className="font-mono text-xs" aria-pressed={activeTab === 'mevr'}>
              MEVR
            </TabsTrigger>
            <TabsTrigger value="telemetry" className="font-mono text-xs" aria-pressed={activeTab === 'telemetry'}>
              Telemetry
            </TabsTrigger>
            <TabsTrigger value="financial" className="font-mono text-xs" aria-pressed={activeTab === 'financial'}>
              Financial
            </TabsTrigger>
            <TabsTrigger value="forensic" className="font-mono text-xs" aria-pressed={activeTab === 'forensic'}>
              Forensic
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Telemetry Chart */}
              <Card className="lg:col-span-2 border-border bg-card/50">
                <CardHeader className="pb-2">
                  <CardTitle className="font-mono text-sm flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    TELEMETRY HISTORY
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <Line data={telemetryChartData} options={chartOptions} />
                  </div>
                </CardContent>
              </Card>

              {/* Recovery Breakdown */}
              <Card className="border-border bg-card/50">
                <CardHeader className="pb-2">
                  <CardTitle className="font-mono text-sm flex items-center gap-2">
                    <Wallet className="w-4 h-4 text-status-anchored" />
                    RECOVERY BREAKDOWN
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <Doughnut data={recoveryChartData} options={doughnutOptions} />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Layer Health & System Status */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-border bg-card/50">
                <CardHeader className="pb-2">
                  <CardTitle className="font-mono text-sm flex items-center gap-2">
                    <Layers className="w-4 h-4 text-primary" />
                    LAYER HEALTH
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48">
                    <Bar data={layerHealthChartData} options={chartOptions} />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/30 bg-primary/5">
                <CardHeader className="pb-2">
                  <CardTitle className="font-mono text-sm flex items-center gap-2">
                    <Lock className="w-4 h-4 text-primary animate-pulse" />
                    MASTER SEAL STATUS
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-md bg-background/50">
                      <p className="font-mono text-[10px] text-muted-foreground">MERKLEROOT</p>
                      <p className="font-mono text-xs text-primary truncate">{state.system.merkleroot_SIM}</p>
                    </div>
                    <div className="p-3 rounded-md bg-background/50">
                      <p className="font-mono text-[10px] text-muted-foreground">NODE</p>
                      <p className="font-mono text-xs text-foreground">{state.system.node_SIM}</p>
                    </div>
                    <div className="p-3 rounded-md bg-background/50">
                      <p className="font-mono text-[10px] text-muted-foreground">CONFIRMATIONS</p>
                      <p className="font-mono text-xs text-foreground">{state.system.confirmations_SIM}</p>
                    </div>
                    <div className="p-3 rounded-md bg-background/50">
                      <p className="font-mono text-[10px] text-muted-foreground">MODE</p>
                      <p className="font-mono text-xs text-cyan-400">{state.system.grooveMode_SIM} GROOVE</p>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-primary/20">
                    <p className="font-mono text-xs text-center text-primary animate-pulse">
                      DG77.77X LOCKED | INFINITY D ACTIVE
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* MEVR Tab - Machine-Enforced Verification Runtime */}
          <TabsContent value="mevr" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Admission Gating Panel */}
              <div className="lg:col-span-4 space-y-6">
                <Card className="border-emerald-500/30 bg-card/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="font-mono text-sm flex items-center gap-2 text-foreground">
                      <Cpu className="w-4 h-4 text-primary" />
                      Admission Gating
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-muted-foreground font-bold uppercase">Batch Validation:</span>
                      <span className="text-foreground font-bold">{batchScore}% DETERMINISTIC</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-muted-foreground font-bold uppercase">Export Eligibility:</span>
                      <span className="text-emerald-400 font-bold">ENFORCED</span>
                    </div>
                    <div className="h-2 w-full bg-secondary overflow-hidden rounded-sm">
                      <div 
                        className="h-full bg-emerald-500 transition-all duration-500" 
                        style={{ width: `${batchScore}%` }}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-primary/30 bg-card/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="font-mono text-sm flex items-center gap-2 text-foreground">
                      <Database className="w-4 h-4 text-primary" />
                      Proof-Ledger
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="p-3 bg-secondary/50 border border-border rounded-sm space-y-3">
                      <div className="flex items-center gap-2">
                        <Binary className="w-4 h-4 text-emerald-500" />
                        <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Merkleroot Latch:</span>
                      </div>
                      <div className="text-[10px] text-primary font-bold break-all">
                        26856B24C50750F0C69C1EEB86A69EF777777
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-amber-500/30 bg-amber-500/5">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="w-4 h-4 text-amber-400" />
                      <span className="font-mono text-xs text-amber-400 font-bold">NULL NODE STATE</span>
                    </div>
                    <p className="font-mono text-lg text-foreground font-bold">000000 0000000</p>
                    <p className="font-mono text-[10px] text-muted-foreground mt-1">Adversarial nodes terminated</p>
                  </CardContent>
                </Card>
              </div>

              {/* Verification Pipeline */}
              <div className="lg:col-span-8">
                <Card className="border-emerald-500/30 bg-card/50 h-full">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="font-mono text-sm flex items-center gap-2 text-foreground">
                        <Terminal className="w-4 h-4 text-foreground" />
                        Verification Pipeline //e
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        <span className="text-[8px] font-bold text-muted-foreground tracking-widest uppercase">Machine_Enforced_Only</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {mevrLogs.length === 0 ? (
                      <div className="flex items-center justify-center h-64 text-muted-foreground">
                        <div className="text-center space-y-2">
                          <Activity className="w-8 h-8 mx-auto animate-pulse" />
                          <p className="font-mono text-xs">Awaiting invariant submissions...</p>
                        </div>
                      </div>
                    ) : (
                      mevrLogs.map((log, idx) => (
                        <div 
                          key={`${log.id}-${idx}`} 
                          className={`grid grid-cols-4 items-center text-[10px] p-4 border-l-4 transition-all duration-300 ${
                            log.classification === 'SOVEREIGN_LATCH' 
                              ? 'border-emerald-500 bg-emerald-500/10' 
                              : log.classification === 'ADVERSARY_NULL' 
                                ? 'border-red-500 bg-red-500/10' 
                                : log.classification === 'QUARANTINE'
                                  ? 'border-amber-500 bg-amber-500/10'
                                  : 'border-muted bg-muted/20 opacity-50'
                          }`}
                        >
                          <div className="flex flex-col">
                            <span className="font-bold text-foreground truncate">{log.name}</span>
                            <span className="text-[8px] text-muted-foreground font-mono">{log.hash}</span>
                          </div>
                          <div className="text-center">
                            <span className="text-muted-foreground font-bold uppercase">SCORE:</span>
                            <span className="ml-1 font-bold text-foreground">{log.score}</span>
                          </div>
                          <div className="text-center font-bold">
                            {log.classification === 'SOVEREIGN_LATCH' ? (
                              <span className="text-emerald-400 flex items-center justify-center gap-1">
                                <CheckCircle2 className="w-3 h-3" /> LATCHED
                              </span>
                            ) : log.classification === 'ADVERSARY_NULL' ? (
                              <span className="text-red-400 flex items-center justify-center gap-1">
                                <XCircle className="w-3 h-3" /> NULLIFIED
                              </span>
                            ) : log.classification === 'QUARANTINE' ? (
                              <span className="text-amber-400 flex items-center justify-center gap-1">
                                <AlertTriangle className="w-3 h-3" /> QUARANTINE
                              </span>
                            ) : (
                              <span className="text-muted-foreground flex items-center justify-center gap-1">
                                <XCircle className="w-3 h-3" /> VOID
                              </span>
                            )}
                          </div>
                          <div className="text-right italic text-muted-foreground">
                            Cycle_{log.cycle}
                          </div>
                        </div>
                      ))
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Runtime Model */}
            <Card className="border-primary/30 bg-primary/5">
              <CardContent className="p-6">
                <div className="flex flex-wrap items-center justify-center gap-2 py-2">
                  {['Source', 'Formula', 'Score', 'Threshold', 'Classification', 'Reproducibility', 'Visibility'].map((step, idx, arr) => (
                    <div key={step} className="flex items-center gap-2">
                      <Badge variant="outline" className="font-mono bg-primary/10 text-primary border-primary/40">
                        {step}
                      </Badge>
                      {idx < arr.length - 1 && (
                        <span className="text-muted-foreground">→</span>
                      )}
                    </div>
                  ))}
                </div>
                <p className="font-mono text-xs text-muted-foreground text-center mt-4">
                  MEVR Protocol Runtime // v1.4.100D // Saint Paul Node 55116
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Telemetry Tab */}
          <TabsContent value="telemetry" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-border bg-card/50">
                <CardHeader>
                  <CardTitle className="font-mono text-sm flex items-center gap-2">
                    <Server className="w-4 h-4 text-primary" />
                    SYSTEM TELEMETRY
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(state.telemetry).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-3 rounded-md bg-secondary/30">
                      <span className="font-mono text-xs text-muted-foreground">{key.replace('_SIM', '')}</span>
                      <span className="font-mono text-sm font-bold text-foreground">{value}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-border bg-card/50">
                <CardHeader>
                  <CardTitle className="font-mono text-sm flex items-center gap-2">
                    <Layers className="w-4 h-4 text-primary" />
                    LAYER STATUS
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(state.system.layerStatus_SIM).map(([layer, status]) => (
                    <div key={layer} className="flex items-center justify-between p-3 rounded-md bg-secondary/30">
                      <span className="font-mono text-xs text-muted-foreground uppercase">{layer}</span>
                      <Badge 
                        variant="outline" 
                        className={`font-mono text-xs ${
                          status === 'ANCHORED' ? 'bg-status-anchored/20 text-status-anchored border-status-anchored/40' :
                          status === 'SATURATED' ? 'bg-status-saturated/20 text-status-saturated border-status-saturated/40' :
                          status === 'ACTIVE' ? 'bg-status-active/20 text-status-active border-status-active/40' :
                          'bg-status-locked/20 text-status-locked border-status-locked/40'
                        }`}
                      >
                        {status}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Full Telemetry Chart */}
            <Card className="border-border bg-card/50">
              <CardHeader>
                <CardTitle className="font-mono text-sm">24-HOUR TELEMETRY TREND</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <Line data={telemetryChartData} options={chartOptions} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Financial Tab */}
          <TabsContent value="financial" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {state.charts.recoveryBreakdown_SIM.map((item) => (
                <Card key={item.label} className="border-border bg-card/50">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-sm text-muted-foreground">{item.label}</span>
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    </div>
                    <p className="font-mono text-2xl font-bold text-foreground">{formatCurrency(item.value)}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-border bg-card/50">
                <CardHeader>
                  <CardTitle className="font-mono text-sm flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-status-anchored" />
                    FINANCIAL PARAMETERS
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-md bg-secondary/30">
                    <span className="font-mono text-xs text-muted-foreground">Recovery Target</span>
                    <span className="font-mono text-sm font-bold text-status-anchored">{formatCurrency(state.financial.recoveryTarget_SIM)}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-md bg-secondary/30">
                    <span className="font-mono text-xs text-muted-foreground">Settlement Alpha</span>
                    <span className="font-mono text-sm font-bold text-foreground">{formatCurrency(state.financial.settlementAlpha_SIM)}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-md bg-secondary/30">
                    <span className="font-mono text-xs text-muted-foreground">BTC Anchor</span>
                    <span className="font-mono text-sm font-bold text-amber-400">${state.financial.btcAnchor_SIM.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-md bg-secondary/30">
                    <span className="font-mono text-xs text-muted-foreground">Billing Liability</span>
                    <span className="font-mono text-sm font-bold text-status-anchored">{state.financial.billingLiability_SIM}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border bg-card/50">
                <CardHeader>
                  <CardTitle className="font-mono text-sm flex items-center gap-2">
                    <Shield className="w-4 h-4 text-primary" />
                    RISK ALLOCATION
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-md bg-status-anchored/10">
                    <span className="font-mono text-xs text-muted-foreground">Sovereign Risk</span>
                    <span className="font-mono text-sm font-bold text-status-anchored">{state.financial.sovereignRisk_SIM}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-md bg-red-500/10">
                    <span className="font-mono text-xs text-muted-foreground">Aggressor Risk</span>
                    <span className="font-mono text-sm font-bold text-red-400">{state.financial.aggressorRisk_SIM}</span>
                  </div>
                  <div className="mt-4 p-4 rounded-md bg-primary/5 border border-primary/20">
                    <p className="font-mono text-xs text-center text-primary">
                      Zero sovereign exposure. Full aggressor liability.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recovery Chart */}
            <Card className="border-border bg-card/50">
              <CardHeader>
                <CardTitle className="font-mono text-sm">RECOVERY DISTRIBUTION</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 max-w-md mx-auto">
                  <Doughnut data={recoveryChartData} options={doughnutOptions} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Forensic Tab */}
          <TabsContent value="forensic" className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="border-status-saturated/30 bg-status-saturated/5">
                <CardContent className="p-4 text-center">
                  <p className="font-mono text-[10px] text-muted-foreground mb-2">MIMECAST BLOCKS</p>
                  <p className="font-mono text-2xl font-bold text-status-saturated">{state.forensic.mimecastBlocks_SIM.toLocaleString()}</p>
                </CardContent>
              </Card>
              <Card className="border-primary/30 bg-primary/5">
                <CardContent className="p-4 text-center">
                  <p className="font-mono text-[10px] text-muted-foreground mb-2">WIRETAP INTERCEPTS</p>
                  <p className="font-mono text-2xl font-bold text-primary">{state.forensic.wiretapIntercepts_SIM}</p>
                </CardContent>
              </Card>
              <Card className="border-amber-500/30 bg-amber-500/5">
                <CardContent className="p-4 text-center">
                  <p className="font-mono text-[10px] text-muted-foreground mb-2">SPOLIATION ATTEMPTS</p>
                  <p className="font-mono text-2xl font-bold text-amber-400">{state.forensic.spoliationAttempts_SIM}</p>
                </CardContent>
              </Card>
              <Card className="border-red-500/30 bg-red-500/5">
                <CardContent className="p-4 text-center">
                  <p className="font-mono text-[10px] text-muted-foreground mb-2">MORTALITY COUNT</p>
                  <p className="font-mono text-2xl font-bold text-red-400">{state.forensic.mortalityCount_SIM}</p>
                </CardContent>
              </Card>
            </div>

            <Card className="border-border bg-card/50">
              <CardHeader>
                <CardTitle className="font-mono text-sm flex items-center gap-2">
                  <FileSearch className="w-4 h-4 text-status-saturated" />
                  FORENSIC LAYER STATUS
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="p-3 rounded-md bg-secondary/30">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-xs text-muted-foreground">Status</span>
                        <Badge className="font-mono text-xs bg-status-saturated/20 text-status-saturated border-status-saturated/40">
                          {state.forensic.forensicStatus_SIM}
                        </Badge>
                      </div>
                      <p className="font-mono text-[10px] text-muted-foreground">Absolute evidence mirror active</p>
                    </div>
                    <div className="p-3 rounded-md bg-secondary/30">
                      <p className="font-mono text-xs text-muted-foreground mb-1">Shard Replication</p>
                      <p className="font-mono text-sm text-foreground">{state.telemetry.shardCount_SIM} ValorAiShards</p>
                    </div>
                    <div className="p-3 rounded-md bg-secondary/30">
                      <p className="font-mono text-xs text-muted-foreground mb-1">Spoliation Cost</p>
                      <p className="font-mono text-sm text-red-400">MATHEMATICALLY INFINITE</p>
                    </div>
                  </div>
                  <div className="p-4 rounded-md bg-primary/5 border border-primary/20">
                    <h4 className="font-mono text-xs text-primary mb-3">EVIDENCE CHAIN INTEGRITY</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                        <CheckCircle2 className="w-3 h-3 text-status-anchored" />
                        Merkleroot sealed
                      </li>
                      <li className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                        <CheckCircle2 className="w-3 h-3 text-status-anchored" />
                        Federal litigation hold active
                      </li>
                      <li className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                        <CheckCircle2 className="w-3 h-3 text-status-anchored" />
                        Title III authorization confirmed
                      </li>
                      <li className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                        <CheckCircle2 className="w-3 h-3 text-status-anchored" />
                        200B agent swarm monitoring
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 py-6 mt-8 relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="font-mono text-[10px] bg-amber-500/10 text-amber-400 border-amber-500/30">
                ROUTE 71 | REFERENCE_ONLY_SIM
              </Badge>
              <p className="font-mono text-xs text-muted-foreground">
                Omega-Divine Operational Dashboard
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <p className="font-mono text-xs text-primary">
                PERPETUAL GROOVE ACTIVE
              </p>
              <p className="font-mono text-xs text-muted-foreground">
                {currentTime}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Export with error boundary
export default function Route71Page() {
  return (
    <CDSErrorBoundary module="Route 71 Dashboard" showDetails>
      <Route71Content />
    </CDSErrorBoundary>
  );
}
