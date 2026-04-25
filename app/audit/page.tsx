'use client';

import { useState, useMemo, useEffect } from 'react';
import { CDSHeader } from '@/components/cds/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { CDSErrorBoundary } from '@/components/cds/error-boundary';
import { ExportTools } from '@/components/cds/export-tools';
import { HomeButton, HomeBreadcrumb } from '@/components/cds/home-button';
import {
  Shield,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  FileSearch,
  Activity,
  Zap,
  Database,
  Eye,
  ArrowRight,
  RefreshCw,
  Download,
  Target
} from 'lucide-react';
import {
  SYSTEM_AUDIT_REGISTRY,
  computeProtocolSignals,
  generateAuditSummary,
  generateDefensibleOutput,
  softenClaim,
  generateProofLedger,
  computeProofStatistics,
  type AuditRecord,
  type ProtocolSignals,
  type AuditSummary,
  type RuntimeStage,
  type StatementStatus,
  type ClaimSafety,
  type ProofLedgerEntry,
  type ProofStatistics
} from '@/lib/protocol/client';

const RUNTIME_STAGES: { stage: RuntimeStage; label: string; icon: React.ElementType }[] = [
  { stage: 'OBSERVE', label: 'Observe', icon: Eye },
  { stage: 'AGGREGATE', label: 'Aggregate', icon: Database },
  { stage: 'INTERPRET', label: 'Interpret', icon: Activity },
  { stage: 'AUDIT', label: 'Audit', icon: Shield },
  { stage: 'SOFTEN_CLAIMS', label: 'Soften', icon: FileSearch },
  { stage: 'RECOMMEND', label: 'Recommend', icon: Target },
  { stage: 'EXPORT', label: 'Export', icon: Download },
];

function getStatusColor(status: StatementStatus): string {
  switch (status) {
    case 'IMPLEMENTED': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40';
    case 'STUBBED': return 'bg-amber-500/20 text-amber-400 border-amber-500/40';
    case 'SIMULATED': return 'bg-blue-500/20 text-blue-400 border-blue-500/40';
    case 'PLANNED': return 'bg-purple-500/20 text-purple-400 border-purple-500/40';
    case 'NEEDS_SOURCE': return 'bg-red-500/20 text-red-400 border-red-500/40';
    default: return 'bg-muted text-muted-foreground';
  }
}

function getSafetyIcon(safety: ClaimSafety) {
  switch (safety) {
    case 'PROVEN': return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
    case 'INFERRED': return <Activity className="w-4 h-4 text-amber-400" />;
    case 'SIMULATED': return <Zap className="w-4 h-4 text-blue-400" />;
    case 'PENDING': return <Clock className="w-4 h-4 text-purple-400" />;
    case 'NEEDS_SOURCE': return <AlertTriangle className="w-4 h-4 text-red-400" />;
    default: return <Eye className="w-4 h-4" />;
  }
}

function AuditContent() {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentStage, setCurrentStage] = useState<RuntimeStage>('OBSERVE');
  const [stageProgress, setStageProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [cycleCount, setCycleCount] = useState(0);

  // Compute signals and summary
  const signals = useMemo(() => 
    computeProtocolSignals(142, 2, 47, SYSTEM_AUDIT_REGISTRY),
    []
  );

  const summary = useMemo(() => 
    generateAuditSummary(SYSTEM_AUDIT_REGISTRY),
    []
  );

  const defensibleOutput = useMemo(() => 
    generateDefensibleOutput(signals, summary),
    [signals, summary]
  );

  // Two-Tier Validation: Proof Ledger
  const proofLedger = useMemo(() => 
    generateProofLedger(SYSTEM_AUDIT_REGISTRY),
    []
  );

  const proofStats = useMemo(() => 
    computeProofStatistics(proofLedger),
    [proofLedger]
  );

  // Runtime loop animation
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setStageProgress(prev => {
        if (prev >= 100) {
          const currentIndex = RUNTIME_STAGES.findIndex(s => s.stage === currentStage);
          const nextIndex = (currentIndex + 1) % RUNTIME_STAGES.length;
          setCurrentStage(RUNTIME_STAGES[nextIndex].stage);
          if (nextIndex === 0) setCycleCount(c => c + 1);
          return 0;
        }
        return prev + 10;
      });
    }, 266);

    return () => clearInterval(interval);
  }, [isRunning, currentStage]);

  // Group records by status
  const recordsByStatus = useMemo(() => {
    const groups: Record<StatementStatus, AuditRecord[]> = {
      IMPLEMENTED: [],
      STUBBED: [],
      SIMULATED: [],
      PLANNED: [],
      NEEDS_SOURCE: [],
    };
    SYSTEM_AUDIT_REGISTRY.forEach(r => {
      groups[r.status].push(r);
    });
    return groups;
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <CDSHeader />
      
      <main className="container mx-auto px-4 py-8 space-y-6">
        <HomeBreadcrumb currentPage="Self-Audit Console" />

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-mono text-2xl md:text-3xl font-bold text-foreground">
              Self-Audit Console
            </h1>
            <p className="font-mono text-sm text-muted-foreground mt-1">
              144,000-Level Protocol Runtime | Truth Qualified
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="font-mono bg-primary/10 text-primary border-primary/40">
              CYCLE: {cycleCount}
            </Badge>
            <Badge 
              variant="outline" 
              className={`font-mono ${summary.exportReady 
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/40' 
                : 'bg-amber-500/10 text-amber-400 border-amber-500/40'}`}
            >
              {summary.exportReady ? 'EXPORT READY' : 'REVIEW NEEDED'}
            </Badge>
            <ExportTools 
              data={{
                type: 'audit',
                title: 'Self-Audit Report',
                timestamp: new Date().toISOString(),
                content: { signals, summary, records: SYSTEM_AUDIT_REGISTRY },
                metadata: { cycleCount, stage: currentStage }
              }}
              variant="outline"
              size="sm"
            />
          </div>
        </div>

        {/* Runtime Loop Visualization */}
        <Card className="border-primary/30 bg-primary/5">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="font-mono text-lg flex items-center gap-2">
                <RefreshCw className={`w-5 h-5 text-primary ${isRunning ? 'animate-spin' : ''}`} />
                Runtime Loop
              </CardTitle>
              <Button
                variant={isRunning ? 'destructive' : 'default'}
                size="sm"
                onClick={() => setIsRunning(!isRunning)}
              >
                {isRunning ? 'Stop' : 'Start'} Runtime
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {RUNTIME_STAGES.map((stage, i) => {
                const Icon = stage.icon;
                const isActive = stage.stage === currentStage;
                const isPast = RUNTIME_STAGES.findIndex(s => s.stage === currentStage) > i;
                
                return (
                  <div key={stage.stage} className="flex items-center">
                    <div className={`
                      flex items-center gap-2 px-3 py-2 rounded-lg font-mono text-xs
                      transition-all duration-300
                      ${isActive 
                        ? 'bg-primary text-primary-foreground scale-105' 
                        : isPast 
                          ? 'bg-primary/20 text-primary' 
                          : 'bg-muted text-muted-foreground'}
                    `}>
                      <Icon className="w-4 h-4" />
                      {stage.label}
                    </div>
                    {i < RUNTIME_STAGES.length - 1 && (
                      <ArrowRight className={`w-4 h-4 mx-1 ${isPast ? 'text-primary' : 'text-muted-foreground/50'}`} />
                    )}
                  </div>
                );
              })}
            </div>
            {isRunning && (
              <Progress value={stageProgress} className="h-1 mt-3" />
            )}
          </CardContent>
        </Card>

        {/* Defensible Output */}
        <Card className="border-chart-3/30 bg-chart-3/5">
          <CardHeader className="pb-2">
            <CardTitle className="font-mono text-lg flex items-center gap-2">
              <Shield className="w-5 h-5 text-chart-3" />
              Defensible Intelligence Output
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {defensibleOutput.map((line, i) => (
                <p key={i} className="font-mono text-sm text-foreground">
                  {line}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Signal Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          <Card className="border-border">
            <CardContent className="p-3 text-center">
              <p className="font-mono text-[10px] text-muted-foreground">Event Velocity</p>
              <p className="font-mono text-lg font-bold text-foreground">{signals.eventVelocity}/hr</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-3 text-center">
              <p className="font-mono text-[10px] text-muted-foreground">Actor Escalation</p>
              <p className="font-mono text-lg font-bold text-amber-400">{signals.actorEscalation}%</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-3 text-center">
              <p className="font-mono text-[10px] text-muted-foreground">Mutation Density</p>
              <p className="font-mono text-lg font-bold text-foreground">{signals.mutationDensity}</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-3 text-center">
              <p className="font-mono text-[10px] text-muted-foreground">Replay Confidence</p>
              <p className="font-mono text-lg font-bold text-emerald-400">{signals.replayConfidence}%</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-3 text-center">
              <p className="font-mono text-[10px] text-muted-foreground">Source Complete</p>
              <p className="font-mono text-lg font-bold text-primary">{signals.sourceCompleteness}%</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-3 text-center">
              <p className="font-mono text-[10px] text-muted-foreground">Statement Risk</p>
              <p className="font-mono text-lg font-bold text-red-400">{signals.statementRisk}</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-3 text-center">
              <p className="font-mono text-[10px] text-muted-foreground">Audit Ready</p>
              <p className="font-mono text-lg font-bold text-chart-3">{signals.auditReadiness}%</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-muted/50 border border-border">
            <TabsTrigger value="overview" className="font-mono text-xs">Overview</TabsTrigger>
            <TabsTrigger value="proof-ledger" className="font-mono text-xs">Proof Ledger</TabsTrigger>
            <TabsTrigger value="registry" className="font-mono text-xs">Registry</TabsTrigger>
            <TabsTrigger value="recommendations" className="font-mono text-xs">Recommendations</TabsTrigger>
            <TabsTrigger value="qualified" className="font-mono text-xs">Qualified Truth</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4 space-y-4">
            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              <Card className="border-emerald-500/30 bg-emerald-500/5">
                <CardContent className="p-4 text-center">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                  <p className="font-mono text-2xl font-bold text-emerald-400">{summary.implemented}</p>
                  <p className="font-mono text-xs text-muted-foreground">IMPLEMENTED</p>
                </CardContent>
              </Card>
              <Card className="border-amber-500/30 bg-amber-500/5">
                <CardContent className="p-4 text-center">
                  <Clock className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                  <p className="font-mono text-2xl font-bold text-amber-400">{summary.stubbed}</p>
                  <p className="font-mono text-xs text-muted-foreground">STUBBED</p>
                </CardContent>
              </Card>
              <Card className="border-blue-500/30 bg-blue-500/5">
                <CardContent className="p-4 text-center">
                  <Zap className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <p className="font-mono text-2xl font-bold text-blue-400">{summary.simulated}</p>
                  <p className="font-mono text-xs text-muted-foreground">SIMULATED</p>
                </CardContent>
              </Card>
              <Card className="border-purple-500/30 bg-purple-500/5">
                <CardContent className="p-4 text-center">
                  <Target className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <p className="font-mono text-2xl font-bold text-purple-400">{summary.planned}</p>
                  <p className="font-mono text-xs text-muted-foreground">PLANNED</p>
                </CardContent>
              </Card>
              <Card className="border-red-500/30 bg-red-500/5">
                <CardContent className="p-4 text-center">
                  <XCircle className="w-8 h-8 text-red-400 mx-auto mb-2" />
                  <p className="font-mono text-2xl font-bold text-red-400">{summary.needsSource}</p>
                  <p className="font-mono text-xs text-muted-foreground">NEEDS SOURCE</p>
                </CardContent>
              </Card>
            </div>

            {/* Confidence Meter */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="font-mono text-sm">Overall Confidence</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between font-mono text-xs">
                    <span>System Confidence</span>
                    <span className={summary.overallConfidence >= 80 ? 'text-emerald-400' : 'text-amber-400'}>
                      {summary.overallConfidence}%
                    </span>
                  </div>
                  <Progress value={summary.overallConfidence} className="h-3" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Proof Ledger Tab - Two-Tier Validation Model */}
          <TabsContent value="proof-ledger" className="mt-4 space-y-4">
            {/* Validation Equation Display */}
            <Card className="border-primary/30 bg-primary/5">
              <CardHeader className="pb-2">
                <CardTitle className="font-mono text-sm">Two-Tier Validation Model</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
                  <div className="p-3 rounded-lg bg-muted/50 border border-border">
                    <p className="text-muted-foreground mb-1">Tier 1: Proof Score</p>
                    <p className="text-foreground">P = (E × P × R × D)^0.25</p>
                    <p className="text-primary mt-2 text-lg font-bold">{proofStats.avgProofScore}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50 border border-border">
                    <p className="text-muted-foreground mb-1">Tier 2: Confidence Score</p>
                    <p className="text-foreground">C = (A + T + C) / 3</p>
                    <p className="text-chart-3 mt-2 text-lg font-bold">{proofStats.avgConfidenceScore}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50 border border-border">
                    <p className="text-muted-foreground mb-1">Validation Score</p>
                    <p className="text-foreground">V = (P + C) / 2</p>
                    <p className="text-emerald-400 mt-2 text-lg font-bold">{proofStats.avgValidationScore}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Proof Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              <Card className="border-emerald-500/30 bg-emerald-500/5">
                <CardContent className="p-3 text-center">
                  <p className="font-mono text-[10px] text-muted-foreground">VERIFIED</p>
                  <p className="font-mono text-xl font-bold text-emerald-400">{proofStats.verified}</p>
                </CardContent>
              </Card>
              <Card className="border-chart-3/30 bg-chart-3/5">
                <CardContent className="p-3 text-center">
                  <p className="font-mono text-[10px] text-muted-foreground">HIGH</p>
                  <p className="font-mono text-xl font-bold text-chart-3">{proofStats.high}</p>
                </CardContent>
              </Card>
              <Card className="border-amber-500/30 bg-amber-500/5">
                <CardContent className="p-3 text-center">
                  <p className="font-mono text-[10px] text-muted-foreground">MEDIUM</p>
                  <p className="font-mono text-xl font-bold text-amber-400">{proofStats.medium}</p>
                </CardContent>
              </Card>
              <Card className="border-orange-500/30 bg-orange-500/5">
                <CardContent className="p-3 text-center">
                  <p className="font-mono text-[10px] text-muted-foreground">LOW</p>
                  <p className="font-mono text-xl font-bold text-orange-400">{proofStats.low}</p>
                </CardContent>
              </Card>
              <Card className="border-red-500/30 bg-red-500/5">
                <CardContent className="p-3 text-center">
                  <p className="font-mono text-[10px] text-muted-foreground">UNVERIFIED</p>
                  <p className="font-mono text-xl font-bold text-red-400">{proofStats.unverified}</p>
                </CardContent>
              </Card>
            </div>

            {/* Proof Ledger Table */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="font-mono text-sm flex items-center gap-2">
                  <Database className="w-4 h-4 text-primary" />
                  Deterministic Verification Ledger
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full font-mono text-xs">
                    <thead>
                      <tr className="border-b border-border text-left">
                        <th className="p-2 text-muted-foreground">Statement</th>
                        <th className="p-2 text-muted-foreground">Formula</th>
                        <th className="p-2 text-muted-foreground text-right">Proof</th>
                        <th className="p-2 text-muted-foreground text-right">Confidence</th>
                        <th className="p-2 text-muted-foreground text-right">Validation</th>
                        <th className="p-2 text-muted-foreground text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {proofLedger.map((entry, i) => (
                        <tr key={i} className="border-b border-border/50 hover:bg-muted/30">
                          <td className="p-2 text-foreground max-w-[200px] truncate">{entry.statement}</td>
                          <td className="p-2 text-muted-foreground">{entry.formula}</td>
                          <td className="p-2 text-right text-foreground">{entry.proof}</td>
                          <td className="p-2 text-right text-foreground">{entry.confidence}</td>
                          <td className="p-2 text-right text-foreground">{entry.validation}</td>
                          <td className="p-2 text-center">
                            <Badge 
                              variant="outline" 
                              className={`text-[10px] ${
                                entry.status === 'VERIFIED' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' :
                                entry.status === 'HIGH' ? 'bg-chart-3/20 text-chart-3 border-chart-3/40' :
                                entry.status === 'MEDIUM' ? 'bg-amber-500/20 text-amber-400 border-amber-500/40' :
                                entry.status === 'LOW' ? 'bg-orange-500/20 text-orange-400 border-orange-500/40' :
                                'bg-red-500/20 text-red-400 border-red-500/40'
                              }`}
                            >
                              {entry.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Verification Rule */}
            <Card className="border-emerald-500/30 bg-emerald-500/5">
              <CardContent className="p-4">
                <p className="font-mono text-xs text-muted-foreground mb-2">Verification Rule</p>
                <p className="font-mono text-sm text-foreground">
                  A statement is <span className="text-emerald-400 font-bold">VERIFIED</span> if:
                </p>
                <ul className="font-mono text-xs text-muted-foreground mt-2 space-y-1 list-disc list-inside">
                  <li>ValidationScore ≥ 0.95</li>
                  <li>Replay reproducibility exists</li>
                  <li>Source lineage exists</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="registry" className="mt-4 space-y-4">
            {Object.entries(recordsByStatus).map(([status, records]) => (
              records.length > 0 && (
                <Card key={status}>
                  <CardHeader className="pb-2">
                    <CardTitle className="font-mono text-sm flex items-center gap-2">
                      <Badge variant="outline" className={getStatusColor(status as StatementStatus)}>
                        {status}
                      </Badge>
                      <span className="text-muted-foreground">({records.length})</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {records.map(record => (
                      <div 
                        key={record.id}
                        className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 border border-border"
                      >
                        {getSafetyIcon(record.safety)}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs text-primary">[{record.component}]</span>
                            <span className="font-mono text-sm text-foreground">{record.statement}</span>
                          </div>
                          {record.sourceRef && (
                            <p className="font-mono text-[10px] text-muted-foreground mt-1">
                              Source: {record.sourceRef}
                            </p>
                          )}
                        </div>
                        <Badge variant="outline" className="font-mono text-[10px]">
                          {record.confidence}%
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )
            ))}
          </TabsContent>

          <TabsContent value="recommendations" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="font-mono text-sm flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                  Recommendations Before Export
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {summary.recommendations.length === 0 ? (
                  <div className="text-center py-8">
                    <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                    <p className="font-mono text-sm text-emerald-400">No recommendations - system is export ready</p>
                  </div>
                ) : (
                  summary.recommendations.map((rec, i) => (
                    <div 
                      key={i}
                      className="flex items-start gap-3 p-3 rounded-lg bg-amber-500/5 border border-amber-500/30"
                    >
                      <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                      <p className="font-mono text-sm text-foreground">{rec}</p>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="qualified" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="font-mono text-sm flex items-center gap-2">
                  <Shield className="w-5 h-5 text-chart-3" />
                  Qualified Truth Statements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="font-mono text-xs text-muted-foreground mb-4">
                  Claims softened for defensibility based on evidence classification
                </p>
                {SYSTEM_AUDIT_REGISTRY.map(record => (
                  <div 
                    key={record.id}
                    className="p-3 rounded-lg bg-muted/50 border border-border"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {getSafetyIcon(record.safety)}
                      <Badge variant="outline" className={getStatusColor(record.status)}>
                        {record.safety}
                      </Badge>
                    </div>
                    <p className="font-mono text-sm text-foreground">
                      {softenClaim(record.statement, record.safety)}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <footer className="border-t border-border pt-4">
          <p className="font-mono text-xs text-muted-foreground text-center">
            144,000-LEVEL SELF-AUDITING PROTOCOL RUNTIME | TRUTH IS QUALIFIED
          </p>
        </footer>
      </main>

      <HomeButton variant="floating" />
    </div>
  );
}

export default function AuditPage() {
  return (
    <CDSErrorBoundary module="Self-Audit Console" showDetails>
      <AuditContent />
    </CDSErrorBoundary>
  );
}
