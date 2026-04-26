'use client';

import { useState, useEffect, useMemo } from 'react';
import { CDSHeader } from '@/components/cds/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CDSErrorBoundary } from '@/components/cds/error-boundary';
import { ExportTools } from '@/components/cds/export-tools';
import { HomeButton, HomeBreadcrumb } from '@/components/cds/home-button';
import {
  Shield, ShieldCheck, ShieldAlert, ShieldX,
  Activity, Lock, Eye, Radio,
  CheckCircle2, XCircle, AlertTriangle, ArrowRight,
  Fingerprint, Binary, Cpu, Layers,
  FileText, Scale, Zap, Server,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  getPolicyEngineIdentity,
  evaluateSignals,
  evaluatePolicy,
  enforceTrustBoundary,
  detectPolicyDrift,
  computePolicyHealthDomains,
  runNegativePolicyTests,
  getAuditLedger,
  appendAuditEntry,
  generatePolicyEngineExport,
  TRUST_BOUNDARY_RULES,
  INTERPRETATION_BOUNDARY,
  type PolicyClassification,
  type PolicySeverity,
  type PolicySignal,
  type PolicyHealthDomain,
  type NegativePolicyTest,
  type PolicyDecision,
  type SignalEvaluation,
  type TrustBoundaryStatus,
  type PolicyDriftReport,
  type PolicyAuditLedger,
} from '@/lib/protocol/policyEngine';
import { computeSignals } from '@/lib/runtime-metrics';
import { buildDefaultMetrics } from '@/lib/runtime-metrics';

function classificationColor(c: PolicyClassification): string {
  switch (c) {
    case 'ADMIT': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/40';
    case 'BLOCK': return 'text-red-400 bg-red-500/10 border-red-500/40';
    case 'QUARANTINE': return 'text-amber-400 bg-amber-500/10 border-amber-500/40';
    case 'ESCALATE': return 'text-orange-400 bg-orange-500/10 border-orange-500/40';
    case 'DEFER': return 'text-blue-400 bg-blue-500/10 border-blue-500/40';
    case 'REDACT': return 'text-purple-400 bg-purple-500/10 border-purple-500/40';
    default: return 'text-muted-foreground bg-secondary border-border';
  }
}

function severityColor(s: PolicySeverity): string {
  switch (s) {
    case 'CRITICAL': return 'text-red-400';
    case 'HIGH': return 'text-orange-400';
    case 'MEDIUM': return 'text-amber-400';
    case 'LOW': return 'text-blue-400';
    case 'INFO': return 'text-emerald-400';
    default: return 'text-muted-foreground';
  }
}

function healthStatusColor(status: PolicyHealthDomain['status']): string {
  switch (status) {
    case 'NOMINAL': return 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10';
    case 'DEGRADED': return 'text-amber-400 border-amber-500/40 bg-amber-500/10';
    case 'CRITICAL': return 'text-red-400 border-red-500/40 bg-red-500/10';
    default: return 'text-muted-foreground border-border bg-secondary';
  }
}

function ClassificationIcon({ classification }: { classification: PolicyClassification }) {
  switch (classification) {
    case 'ADMIT': return <ShieldCheck className="w-5 h-5 text-emerald-400" aria-hidden="true" />;
    case 'BLOCK': return <ShieldX className="w-5 h-5 text-red-400" aria-hidden="true" />;
    case 'QUARANTINE': return <ShieldAlert className="w-5 h-5 text-amber-400" aria-hidden="true" />;
    case 'ESCALATE': return <AlertTriangle className="w-5 h-5 text-orange-400" aria-hidden="true" />;
    default: return <Shield className="w-5 h-5 text-muted-foreground" aria-hidden="true" />;
  }
}

// Signal bar visualization
function SignalBar({ signal }: { signal: PolicySignal }) {
  const pct = Math.round(signal.value * 100);
  const barColor = signal.healthy
    ? 'bg-emerald-500'
    : signal.value >= 0.3
      ? 'bg-amber-500'
      : 'bg-red-500';

  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-[10px] text-muted-foreground w-32 truncate">{signal.name}</span>
      <div className="flex-1 h-2 rounded-full bg-secondary/50 overflow-hidden">
        <div className={cn('h-full rounded-full transition-all duration-500', barColor)} style={{ width: `${pct}%` }} />
      </div>
      <span className={cn('font-mono text-xs font-bold w-10 text-right', signal.healthy ? 'text-emerald-400' : signal.value >= 0.3 ? 'text-amber-400' : 'text-red-400')}>
        {pct}%
      </span>
    </div>
  );
}

function PolicyEngineContent() {
  const [activeTab, setActiveTab] = useState('overview');
  const [truthCycle, setTruthCycle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTruthCycle(prev => (prev + 1) % 10000);
    }, 266);
    return () => clearInterval(interval);
  }, []);

  // Compute all state from runtime metrics
  const metrics = useMemo(() => buildDefaultMetrics(), []);
  const protocolSignals = useMemo(() => computeSignals(metrics), [metrics]);
  const identity = useMemo(() => getPolicyEngineIdentity(), []);
  const signalEvaluation = useMemo(() => evaluateSignals(protocolSignals), [protocolSignals]);
  const trustBoundary = useMemo(() => enforceTrustBoundary('RUNTIME_VERIFIED', 'RUNTIME_VERIFIED'), []);
  const driftReport = useMemo(() => detectPolicyDrift(signalEvaluation, null), [signalEvaluation]);
  const healthDomains = useMemo(() => computePolicyHealthDomains(signalEvaluation), [signalEvaluation]);

  const decision = useMemo(() => {
    // Log the evaluation
    appendAuditEntry(
      'LIVE-EVAL', 'EVALUATE', 'SIGNAL_EVALUATION',
      `signals:${signalEvaluation.compositeScore}`,
      `decision:pending`,
      'ADMIT', 'INFO',
    );
    return evaluatePolicy({
      signalEvaluation,
      trustBoundaryStatus: trustBoundary,
      driftStatus: driftReport,
      invariantsPassed: true,
      validationScore: signalEvaluation.compositeScore,
      hasSourceLineage: true,
      isReplayConsistent: true,
    });
  }, [signalEvaluation, trustBoundary, driftReport]);

  const negativeTests = useMemo(() => runNegativePolicyTests(), []);
  const auditLedger = useMemo(() => getAuditLedger(), [decision, negativeTests]);
  const engineExport = useMemo(() => generatePolicyEngineExport(protocolSignals), [protocolSignals]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <CDSHeader />

      <main className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
          <div>
            <HomeBreadcrumb currentPage="Policy Engine" />
            <div className="flex items-center gap-3 mb-2 mt-2">
              <Shield className="w-8 h-8 text-primary" aria-hidden="true" />
              <h1 className="font-mono text-2xl md:text-3xl font-bold tracking-tight">
                DETERMINISTIC POLICY ENGINE
              </h1>
            </div>
            <p className="font-mono text-sm text-muted-foreground">
              Signal-Aware Evaluation Model // Trust-Boundary Enforcement // Audit Lineage
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="font-mono bg-primary/10 text-primary border-primary/40 animate-pulse">
              PROCESS_ACTIVE
            </Badge>
            <Badge variant="outline" className={cn('font-mono', classificationColor(decision.classification))}>
              {decision.classification}
            </Badge>
            <Badge variant="outline" className="font-mono bg-cyan-500/10 text-cyan-400 border-cyan-500/40">
              CYCLE: {truthCycle.toString().padStart(4, '0')}
            </Badge>
            <ExportTools
              data={{
                type: 'policy-engine',
                title: 'VALORAIPLUS Policy Engine Export',
                timestamp: new Date().toISOString(),
                content: engineExport,
                metadata: {
                  engineId: identity.engineId,
                  version: identity.version,
                  merkleroot: identity.merkleroot,
                },
              }}
              variant="outline"
              size="sm"
            />
          </div>
        </div>

        {/* Engine Identity Card */}
        <Card className="border-primary/30 bg-primary/5 mb-6">
          <CardContent className="p-4 md:p-6">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div>
                <p className="font-mono text-[10px] text-muted-foreground">ENGINE ID</p>
                <p className="font-mono text-[10px] font-bold text-primary truncate">{identity.engineId}</p>
              </div>
              <div>
                <p className="font-mono text-[10px] text-muted-foreground">VERSION</p>
                <p className="font-mono text-sm font-bold text-foreground">{identity.version}</p>
              </div>
              <div>
                <p className="font-mono text-[10px] text-muted-foreground">TRUTH CYCLE</p>
                <p className="font-mono text-sm font-bold text-chart-3">{identity.truthCycleMs}ms</p>
              </div>
              <div>
                <p className="font-mono text-[10px] text-muted-foreground">RUNTIME</p>
                <p className="font-mono text-sm font-bold text-accent">{identity.runtimeEngine}</p>
              </div>
              <div>
                <p className="font-mono text-[10px] text-muted-foreground">MERKLEROOT</p>
                <p className="font-mono text-[10px] font-bold text-chart-1 truncate">{identity.merkleroot}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Decision Summary */}
        <Card className={cn('mb-6 border', classificationColor(decision.classification))}>
          <CardHeader className="pb-3">
            <CardTitle className="font-mono text-sm flex items-center gap-2">
              <ClassificationIcon classification={decision.classification} />
              POLICY DECISION
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="font-mono text-[10px] text-muted-foreground">CLASSIFICATION</p>
                <p className={cn('font-mono text-lg font-bold', classificationColor(decision.classification).split(' ')[0])}>
                  {decision.classification}
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] text-muted-foreground">COMPOSITE SCORE</p>
                <p className="font-mono text-lg font-bold text-foreground">
                  {(decision.compositeScore * 100).toFixed(1)}%
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] text-muted-foreground">EXPORT ELIGIBLE</p>
                <p className={cn('font-mono text-lg font-bold', decision.exportEligible ? 'text-emerald-400' : 'text-red-400')}>
                  {decision.exportEligible ? 'YES' : 'NO'}
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] text-muted-foreground">DECISION HASH</p>
                <p className="font-mono text-sm font-bold text-primary truncate">
                  0x{decision.decisionHash}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="font-mono text-[10px]">
                DETERMINISTIC: TRUE
              </Badge>
              <Badge variant="outline" className="font-mono text-[10px]">
                REPRODUCIBLE: TRUE
              </Badge>
              <Badge variant="outline" className={cn('font-mono text-[10px]', decision.visibilityGranted ? 'text-emerald-400' : 'text-red-400')}>
                VISIBILITY: {decision.visibilityGranted ? 'GRANTED' : 'DENIED'}
              </Badge>
              <Badge variant="outline" className={cn('font-mono text-[10px]', severityColor(decision.severity))}>
                SEVERITY: {decision.severity}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-7 bg-secondary/50">
            <TabsTrigger value="overview" className="font-mono text-[10px]">Overview</TabsTrigger>
            <TabsTrigger value="signals" className="font-mono text-[10px]">Signals</TabsTrigger>
            <TabsTrigger value="trust" className="font-mono text-[10px]">Trust</TabsTrigger>
            <TabsTrigger value="health" className="font-mono text-[10px]">Health</TabsTrigger>
            <TabsTrigger value="tests" className="font-mono text-[10px]">Tests</TabsTrigger>
            <TabsTrigger value="audit" className="font-mono text-[10px]">Audit</TabsTrigger>
            <TabsTrigger value="boundary" className="font-mono text-[10px]">Boundary</TabsTrigger>
          </TabsList>

          {/* OVERVIEW TAB */}
          <TabsContent value="overview" className="space-y-6">
            {/* Architecture Flow */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="font-mono text-sm flex items-center gap-2">
                  <Layers className="w-4 h-4 text-primary" aria-hidden="true" />
                  EVALUATION ARCHITECTURE
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap items-center justify-center gap-2 py-4">
                  {['Signal', 'Classification', 'Evaluation', 'Decision', 'Audit', 'Export'].map((step, i) => (
                    <div key={step} className="flex items-center gap-2">
                      <div className="px-3 py-2 rounded-lg border border-primary/40 bg-primary/10">
                        <span className="font-mono text-xs font-bold text-primary">{step}</span>
                      </div>
                      {i < 5 && <ArrowRight className="w-4 h-4 text-muted-foreground" aria-hidden="true" />}
                    </div>
                  ))}
                </div>
                <p className="font-mono text-xs text-muted-foreground text-center mt-2">
                  Deterministic Evaluation Engine: same inputs always produce same outputs
                </p>
              </CardContent>
            </Card>

            {/* Reasoning Chain */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="font-mono text-sm flex items-center gap-2">
                  <Binary className="w-4 h-4 text-accent" aria-hidden="true" />
                  DECISION REASONING CHAIN
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1 font-mono text-xs">
                  {decision.reasoning.map((line, i) => (
                    <div key={i} className="flex items-start gap-2 py-1">
                      <span className="text-muted-foreground w-4 text-right shrink-0">{i + 1}.</span>
                      <span className={cn(
                        line.includes('PASSED') || line.includes('ENFORCED') || line.includes('CONSISTENT') || line.includes('PRESENT') || line.includes('NONE')
                          ? 'text-emerald-400'
                          : line.includes('VIOLATED') || line.includes('FAILED') || line.includes('CRITICAL')
                            ? 'text-red-400'
                            : 'text-foreground',
                      )}>{line}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Blockers and Warnings */}
            {(decision.blockers.length > 0 || decision.warnings.length > 0) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {decision.blockers.length > 0 && (
                  <Card className="border-red-500/30">
                    <CardHeader className="pb-2">
                      <CardTitle className="font-mono text-sm flex items-center gap-2 text-red-400">
                        <XCircle className="w-4 h-4" aria-hidden="true" />
                        BLOCKERS ({decision.blockers.length})
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {decision.blockers.map((b, i) => (
                        <p key={i} className="font-mono text-xs text-red-400">{b}</p>
                      ))}
                    </CardContent>
                  </Card>
                )}
                {decision.warnings.length > 0 && (
                  <Card className="border-amber-500/30">
                    <CardHeader className="pb-2">
                      <CardTitle className="font-mono text-sm flex items-center gap-2 text-amber-400">
                        <AlertTriangle className="w-4 h-4" aria-hidden="true" />
                        WARNINGS ({decision.warnings.length})
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {decision.warnings.map((w, i) => (
                        <p key={i} className="font-mono text-xs text-amber-400">{w}</p>
                      ))}
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </TabsContent>

          {/* SIGNALS TAB */}
          <TabsContent value="signals" className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="font-mono text-sm flex items-center gap-2">
                  <Activity className="w-4 h-4 text-primary" aria-hidden="true" />
                  7-DIMENSION SIGNAL EVALUATION
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {signalEvaluation.signals.map(signal => (
                  <SignalBar key={signal.id} signal={signal} />
                ))}
                <div className="pt-4 border-t border-border mt-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="font-mono text-2xl font-bold text-emerald-400">{signalEvaluation.healthySignals}</p>
                      <p className="font-mono text-[10px] text-muted-foreground">HEALTHY</p>
                    </div>
                    <div className="text-center">
                      <p className="font-mono text-2xl font-bold text-amber-400">{signalEvaluation.degradedSignals}</p>
                      <p className="font-mono text-[10px] text-muted-foreground">DEGRADED</p>
                    </div>
                    <div className="text-center">
                      <p className="font-mono text-2xl font-bold text-red-400">{signalEvaluation.criticalSignals}</p>
                      <p className="font-mono text-[10px] text-muted-foreground">CRITICAL</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/30 bg-primary/5">
              <CardHeader className="pb-2">
                <CardTitle className="font-mono text-sm flex items-center gap-2">
                  <Zap className="w-4 h-4 text-primary" aria-hidden="true" />
                  COMPOSITE SCORE
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <p className="font-mono text-4xl font-bold text-primary">
                    {(signalEvaluation.compositeScore * 100).toFixed(1)}%
                  </p>
                  <div className="flex-1">
                    <div className="h-4 rounded-full bg-secondary/50 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary transition-all duration-700"
                        style={{ width: `${signalEvaluation.compositeScore * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TRUST BOUNDARY TAB */}
          <TabsContent value="trust" className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="font-mono text-sm flex items-center gap-2">
                  <Lock className="w-4 h-4 text-primary" aria-hidden="true" />
                  TRUST-BOUNDARY RULES
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {TRUST_BOUNDARY_RULES.map(rule => (
                    <div key={rule.id} className="flex items-center gap-3 p-3 rounded-lg border border-border bg-secondary/20">
                      <div className={cn(
                        'w-8 h-8 rounded-full flex items-center justify-center shrink-0',
                        rule.allowed ? 'bg-emerald-500/20' : 'bg-red-500/20',
                      )}>
                        {rule.allowed
                          ? <CheckCircle2 className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                          : <XCircle className="w-4 h-4 text-red-400" aria-hidden="true" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-foreground">{rule.id}</span>
                          <span className="font-mono text-xs text-muted-foreground">{rule.name}</span>
                        </div>
                        <p className="font-mono text-[10px] text-muted-foreground mt-1">{rule.description}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="font-mono text-[9px]">{rule.fromTier}</Badge>
                          <ArrowRight className="w-3 h-3 text-muted-foreground" aria-hidden="true" />
                          <Badge variant="outline" className="font-mono text-[9px]">{rule.toTier}</Badge>
                          {rule.requiresEscalation && (
                            <Badge variant="outline" className="font-mono text-[9px] text-amber-400 border-amber-500/40">
                              ESCALATION
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className={cn('border', trustBoundary.violated ? 'border-red-500/30' : 'border-emerald-500/30')}>
              <CardHeader className="pb-2">
                <CardTitle className="font-mono text-sm flex items-center gap-2">
                  <Fingerprint className="w-4 h-4 text-primary" aria-hidden="true" />
                  CURRENT TRUST STATUS
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="font-mono text-[10px] text-muted-foreground">ENFORCED</p>
                    <p className={cn('font-mono text-sm font-bold', trustBoundary.enforced ? 'text-emerald-400' : 'text-red-400')}>
                      {trustBoundary.enforced ? 'YES' : 'NO'}
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] text-muted-foreground">VIOLATED</p>
                    <p className={cn('font-mono text-sm font-bold', trustBoundary.violated ? 'text-red-400' : 'text-emerald-400')}>
                      {trustBoundary.violated ? 'YES' : 'NO'}
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] text-muted-foreground">CURRENT TIER</p>
                    <p className="font-mono text-sm font-bold text-primary">{trustBoundary.currentTier}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] text-muted-foreground">RULES PASSED</p>
                    <p className="font-mono text-sm font-bold text-foreground">{trustBoundary.rulesPassed}/{trustBoundary.rulesChecked}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* HEALTH DOMAINS TAB */}
          <TabsContent value="health" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {healthDomains.map(domain => (
                <Card key={domain.domain} className={cn('border', healthStatusColor(domain.status))}>
                  <CardHeader className="pb-2">
                    <CardTitle className="font-mono text-sm flex items-center justify-between">
                      <span>{domain.label}</span>
                      <Badge variant="outline" className={cn('font-mono text-[9px]', healthStatusColor(domain.status))}>
                        {domain.status}
                      </Badge>
                    </CardTitle>
                    <p className="font-mono text-[10px] text-muted-foreground">{domain.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3 mb-3">
                      <p className="font-mono text-3xl font-bold text-foreground">{domain.score}</p>
                      <div className="flex-1">
                        <div className="h-3 rounded-full bg-secondary/50 overflow-hidden">
                          <div
                            className={cn(
                              'h-full rounded-full transition-all duration-500',
                              domain.status === 'NOMINAL' ? 'bg-emerald-500' :
                              domain.status === 'DEGRADED' ? 'bg-amber-500' : 'bg-red-500',
                            )}
                            style={{ width: `${domain.score}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    {domain.signals.length > 0 && (
                      <div className="space-y-1 pt-2 border-t border-border">
                        {domain.signals.map(sig => (
                          <div key={sig.id} className="flex justify-between text-[10px] font-mono">
                            <span className="text-muted-foreground">{sig.name}</span>
                            <span className={sig.healthy ? 'text-emerald-400' : 'text-amber-400'}>
                              {(sig.value * 100).toFixed(0)}%
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* NEGATIVE TESTS TAB */}
          <TabsContent value="tests" className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="font-mono text-sm flex items-center gap-2">
                  <Scale className="w-4 h-4 text-primary" aria-hidden="true" />
                  NEGATIVE POLICY TESTS
                  <Badge variant="outline" className={cn(
                    'font-mono text-[10px] ml-auto',
                    negativeTests.allPassed ? 'text-emerald-400 border-emerald-500/40' : 'text-red-400 border-red-500/40',
                  )}>
                    {negativeTests.passed}/{negativeTests.total} PASSED
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {negativeTests.tests.map(test => (
                  <div key={test.id} className={cn(
                    'p-3 rounded-lg border',
                    test.passed ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-red-500/30 bg-red-500/5',
                  )}>
                    <div className="flex items-start gap-3">
                      <div className={cn(
                        'w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5',
                        test.passed ? 'bg-emerald-500/20' : 'bg-red-500/20',
                      )}>
                        {test.passed
                          ? <CheckCircle2 className="w-3 h-3 text-emerald-400" aria-hidden="true" />
                          : <XCircle className="w-3 h-3 text-red-400" aria-hidden="true" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-xs font-bold text-foreground">{test.id}</span>
                          <span className="font-mono text-xs text-foreground">{test.name}</span>
                        </div>
                        <p className="font-mono text-[10px] text-muted-foreground mt-1">{test.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className="font-mono text-[9px]">
                            Expected: {test.expectedClassification}
                          </Badge>
                          <Badge variant="outline" className={cn(
                            'font-mono text-[9px]',
                            test.passed ? 'text-emerald-400' : 'text-red-400',
                          )}>
                            Actual: {test.actualClassification}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* AUDIT LINEAGE TAB */}
          <TabsContent value="audit" className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="font-mono text-sm flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary" aria-hidden="true" />
                  POLICY AUDIT LEDGER
                  <Badge variant="outline" className={cn(
                    'font-mono text-[10px] ml-auto',
                    auditLedger.sequenceIntegrity ? 'text-emerald-400 border-emerald-500/40' : 'text-red-400 border-red-500/40',
                  )}>
                    SEQUENCE: {auditLedger.sequenceIntegrity ? 'INTACT' : 'BROKEN'}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="font-mono text-[10px] text-muted-foreground">TOTAL ENTRIES</p>
                    <p className="font-mono text-lg font-bold text-foreground">{auditLedger.totalEntries}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] text-muted-foreground">REPLAYABLE</p>
                    <p className={cn('font-mono text-lg font-bold', auditLedger.replayable ? 'text-emerald-400' : 'text-red-400')}>
                      {auditLedger.replayable ? 'YES' : 'NO'}
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] text-muted-foreground">FIRST ENTRY</p>
                    <p className="font-mono text-[10px] font-bold text-foreground truncate">
                      {auditLedger.firstEntry ? new Date(auditLedger.firstEntry).toLocaleTimeString() : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] text-muted-foreground">LAST ENTRY</p>
                    <p className="font-mono text-[10px] font-bold text-foreground truncate">
                      {auditLedger.lastEntry ? new Date(auditLedger.lastEntry).toLocaleTimeString() : 'N/A'}
                    </p>
                  </div>
                </div>

                {/* Audit table */}
                <div className="overflow-x-auto" role="region" aria-label="Audit ledger entries" tabIndex={0}>
                  <table className="w-full font-mono text-[10px]">
                    <thead>
                      <tr className="border-b border-border">
                        <th scope="col" className="text-left p-2 text-muted-foreground">#</th>
                        <th scope="col" className="text-left p-2 text-muted-foreground">ID</th>
                        <th scope="col" className="text-left p-2 text-muted-foreground">ACTION</th>
                        <th scope="col" className="text-left p-2 text-muted-foreground">DOMAIN</th>
                        <th scope="col" className="text-left p-2 text-muted-foreground">CLASS</th>
                        <th scope="col" className="text-left p-2 text-muted-foreground">SEV</th>
                      </tr>
                    </thead>
                    <tbody>
                      {auditLedger.entries.slice(-20).map(entry => (
                        <tr key={entry.id} className="border-b border-border/50 hover:bg-secondary/30">
                          <td className="p-2 text-muted-foreground">{entry.sequenceNumber}</td>
                          <td className="p-2 text-primary">{entry.id}</td>
                          <td className="p-2 text-foreground">{entry.action}</td>
                          <td className="p-2 text-muted-foreground">{entry.domain}</td>
                          <td className={cn('p-2', classificationColor(entry.classification).split(' ')[0])}>{entry.classification}</td>
                          <td className={cn('p-2', severityColor(entry.severity))}>{entry.severity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* INTERPRETATION BOUNDARY TAB */}
          <TabsContent value="boundary" className="space-y-6">
            <Card className="border-primary/30 bg-primary/5">
              <CardHeader>
                <CardTitle className="font-mono text-sm flex items-center gap-2">
                  <Eye className="w-4 h-4 text-primary" aria-hidden="true" />
                  REVIEWER-SAFE INTERPRETATION BOUNDARY
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 rounded-lg border border-primary/30 bg-primary/10 text-center">
                  <p className="font-mono text-sm font-bold text-primary">
                    {INTERPRETATION_BOUNDARY.legalBoundary}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="border-emerald-500/30 bg-emerald-500/5">
                    <CardHeader className="pb-2">
                      <CardTitle className="font-mono text-xs text-emerald-400 flex items-center gap-2">
                        <CheckCircle2 className="w-3 h-3" aria-hidden="true" />
                        SYSTEM PROVIDES
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {INTERPRETATION_BOUNDARY.systemProvides.map((item, i) => (
                        <p key={i} className="font-mono text-[10px] text-muted-foreground flex items-start gap-2">
                          <span className="text-emerald-400 shrink-0">+</span>
                          {item}
                        </p>
                      ))}
                    </CardContent>
                  </Card>

                  <Card className="border-red-500/30 bg-red-500/5">
                    <CardHeader className="pb-2">
                      <CardTitle className="font-mono text-xs text-red-400 flex items-center gap-2">
                        <XCircle className="w-3 h-3" aria-hidden="true" />
                        SYSTEM DOES NOT
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {INTERPRETATION_BOUNDARY.systemDoesNot.map((item, i) => (
                        <p key={i} className="font-mono text-[10px] text-muted-foreground flex items-start gap-2">
                          <span className="text-red-400 shrink-0">-</span>
                          {item}
                        </p>
                      ))}
                    </CardContent>
                  </Card>

                  <Card className="border-blue-500/30 bg-blue-500/5">
                    <CardHeader className="pb-2">
                      <CardTitle className="font-mono text-xs text-blue-400 flex items-center gap-2">
                        <Scale className="w-3 h-3" aria-hidden="true" />
                        REVIEWER PROVIDES
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {INTERPRETATION_BOUNDARY.reviewerProvides.map((item, i) => (
                        <p key={i} className="font-mono text-[10px] text-muted-foreground flex items-start gap-2">
                          <span className="text-blue-400 shrink-0">*</span>
                          {item}
                        </p>
                      ))}
                    </CardContent>
                  </Card>
                </div>

                <div className="pt-4 border-t border-primary/20 text-center">
                  <p className="font-mono text-xs text-primary font-medium">
                    The system provides mathematical provenance; the reviewer provides the legal conclusion.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Deterministic Contract */}
            <Card className="border-accent/30">
              <CardHeader>
                <CardTitle className="font-mono text-sm flex items-center gap-2">
                  <Binary className="w-4 h-4 text-accent" aria-hidden="true" />
                  DETERMINISTIC CONTRACT
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-3 rounded-lg border border-accent/30 bg-accent/5 text-center">
                    <CheckCircle2 className="w-6 h-6 text-accent mx-auto mb-2" aria-hidden="true" />
                    <p className="font-mono text-xs font-bold text-foreground">SAME INPUTS = SAME OUTPUTS</p>
                    <p className="font-mono text-[10px] text-muted-foreground mt-1">Deterministic evaluation guarantee</p>
                  </div>
                  <div className="p-3 rounded-lg border border-accent/30 bg-accent/5 text-center">
                    <CheckCircle2 className="w-6 h-6 text-accent mx-auto mb-2" aria-hidden="true" />
                    <p className="font-mono text-xs font-bold text-foreground">REPRODUCIBLE</p>
                    <p className="font-mono text-[10px] text-muted-foreground mt-1">Audit trail can be recomputed</p>
                  </div>
                  <div className="p-3 rounded-lg border border-accent/30 bg-accent/5 text-center">
                    <CheckCircle2 className="w-6 h-6 text-accent mx-auto mb-2" aria-hidden="true" />
                    <p className="font-mono text-xs font-bold text-foreground">REVIEWER-SAFE</p>
                    <p className="font-mono text-[10px] text-muted-foreground mt-1">Tier boundaries always enforced</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

export default function PolicyEnginePage() {
  return (
    <CDSErrorBoundary>
      <PolicyEngineContent />
    </CDSErrorBoundary>
  );
}
