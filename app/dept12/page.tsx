'use client';

import { useEffect, useState } from 'react';
import { CDSHeader } from '@/components/cds/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { HomeButton, HomeBreadcrumb } from '@/components/cds/home-button';
import {
  Radio,
  Phone,
  AlertTriangle,
  Shield,
  Users,
  DollarSign,
  Activity,
  Lock,
  Zap,
  Eye,
  FileWarning,
  Scale
} from 'lucide-react';
import {
  DEPT12_SYSTEM,
  DEPT12_SWEEP_PARAMS,
  VOIP_INTERCEPTS,
  FEDERAL_ANCHOR_STATUS,
  CRIMINAL_EXPOSURE,
  WITNESS_RETALIATION,
  THREAT_ACTOR_LIABILITY,
  DEPT12_CLAWBACK,
  ACTOR_COORDINATION,
  SYSTEM_FINALITY_VECTORS,
  BINARY_DEDUCTION_STATE
} from '@/lib/cds-data';

export default function Dept12Page() {
  const [timestamp, setTimestamp] = useState(new Date().toISOString());
  const [sweepCycle, setSweepCycle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimestamp(new Date().toISOString());
      setSweepCycle((prev) => prev + 1);
    }, 266); // 266ms Truth-Cycle
    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-background">
      <CDSHeader />

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Critical Banner */}
        <div className="bg-destructive/20 border border-destructive/50 rounded-lg p-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <Radio className="w-6 h-6 text-destructive animate-pulse" />
              <div>
                <h1 className="font-mono text-xl font-bold text-destructive">
                  DEPT 12 INTELLIGENCE — REAL-TIME
                </h1>
                <p className="font-mono text-sm text-destructive/80">
                  {DEPT12_SYSTEM.classification}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="destructive" className="font-mono animate-pulse">
                VOIP SWEEP ACTIVE
              </Badge>
              <Badge variant="outline" className="font-mono border-destructive/50 text-destructive">
                CYCLE: {sweepCycle.toLocaleString()}
              </Badge>
            </div>
          </div>
        </div>

        {/* System Status Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          <div className="bg-card border border-border rounded-lg p-3 text-center">
            <div className="font-mono text-xs text-muted-foreground">SWARM</div>
            <div className="font-mono text-sm font-bold text-primary">{DEPT12_SYSTEM.swarmAgents}</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-3 text-center">
            <div className="font-mono text-xs text-muted-foreground">SHARDS</div>
            <div className="font-mono text-sm font-bold text-accent">{DEPT12_SYSTEM.forensicShards}</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-3 text-center">
            <div className="font-mono text-xs text-muted-foreground">TRUTH-CYCLE</div>
            <div className="font-mono text-sm font-bold text-chart-3">{DEPT12_SYSTEM.truthCycle}</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-3 text-center">
            <div className="font-mono text-xs text-muted-foreground">INTEGRITY</div>
            <div className="font-mono text-sm font-bold text-primary">{DEPT12_SYSTEM.integrityScore}%</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-3 text-center">
            <div className="font-mono text-xs text-muted-foreground">DEDUCTION</div>
            <div className="font-mono text-sm font-bold text-chart-5">{DEPT12_SYSTEM.deductionState}</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-3 text-center">
            <div className="font-mono text-xs text-muted-foreground">TIMESTAMP</div>
            <div className="font-mono text-xs font-bold text-foreground">{timestamp.slice(11, 19)}Z</div>
          </div>
        </div>

        {/* Sweep Parameters + Federal Anchors */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* VOIP Sweep Parameters */}
          <Card className="bg-card border-destructive/30">
            <CardHeader className="pb-3">
              <CardTitle className="font-mono text-lg flex items-center gap-2 text-destructive">
                <Phone className="w-5 h-5" />
                MIMECAST VOIP SWEEP — LAST 3 HOURS
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-secondary/50 rounded-lg p-3">
                  <div className="font-mono text-xs text-muted-foreground">REAL-TIME</div>
                  <div className="font-mono text-sm text-foreground">{DEPT12_SWEEP_PARAMS.realTime.slice(11, 19)}Z (NOW)</div>
                </div>
                <div className="bg-secondary/50 rounded-lg p-3">
                  <div className="font-mono text-xs text-muted-foreground">LOOKBACK</div>
                  <div className="font-mono text-sm text-foreground">{DEPT12_SWEEP_PARAMS.lookbackStart.slice(11, 19)}Z → {DEPT12_SWEEP_PARAMS.lookbackEnd.slice(11, 19)}Z</div>
                </div>
                <div className="bg-destructive/20 rounded-lg p-3 border border-destructive/30">
                  <div className="font-mono text-xs text-destructive">TOTAL EVENTS</div>
                  <div className="font-mono text-2xl font-bold text-destructive">{DEPT12_SWEEP_PARAMS.totalEvents}</div>
                </div>
                <div className="bg-primary/20 rounded-lg p-3 border border-primary/30">
                  <div className="font-mono text-xs text-primary">VOIP INTERCEPTS</div>
                  <div className="font-mono text-2xl font-bold text-primary">{DEPT12_SWEEP_PARAMS.voipIntercepts}</div>
                </div>
                <div className="bg-chart-3/20 rounded-lg p-3 border border-chart-3/30">
                  <div className="font-mono text-xs text-chart-3">SPOLIATION</div>
                  <div className="font-mono text-2xl font-bold text-chart-3">{DEPT12_SWEEP_PARAMS.spoliationAttempts}</div>
                </div>
                <div className="bg-chart-4/20 rounded-lg p-3 border border-chart-4/30">
                  <div className="font-mono text-xs text-chart-4">WITNESS RETALIATION</div>
                  <div className="font-mono text-2xl font-bold text-chart-4">{DEPT12_SWEEP_PARAMS.witnessRetaliationTriggers}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Federal Anchor Status */}
          <Card className="bg-card border-primary/30">
            <CardHeader className="pb-3">
              <CardTitle className="font-mono text-lg flex items-center gap-2 text-primary">
                <Scale className="w-5 h-5" />
                FEDERAL ANCHOR STATUS
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {FEDERAL_ANCHOR_STATUS.map((anchor, idx) => (
                  <div
                    key={idx}
                    className="bg-secondary/50 rounded-lg p-3 border-l-4"
                    style={{
                      borderLeftColor: anchor.status.includes('VIOLATION')
                        ? 'var(--destructive)'
                        : anchor.status.includes('ACTIVE')
                        ? 'var(--primary)'
                        : 'var(--chart-3)'
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-mono text-sm font-bold text-foreground">{anchor.agency}</div>
                      <Badge
                        variant={anchor.status.includes('VIOLATION') ? 'destructive' : 'outline'}
                        className="font-mono text-xs"
                      >
                        {anchor.status}
                      </Badge>
                    </div>
                    <div className="font-mono text-xs text-muted-foreground mt-1">
                      {anchor.transactionId} | {anchor.finding}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* VOIP Intercept Log */}
        <Card className="bg-card border-accent/30">
          <CardHeader className="pb-3">
            <CardTitle className="font-mono text-lg flex items-center gap-2 text-accent">
              <Activity className="w-5 h-5" />
              VOIP INTERCEPT LOG (Last 3 Hours)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="font-mono text-xs text-muted-foreground text-left py-2 px-3">TIME (UTC)</th>
                    <th className="font-mono text-xs text-muted-foreground text-left py-2 px-3">SOURCE</th>
                    <th className="font-mono text-xs text-muted-foreground text-left py-2 px-3">TARGET</th>
                    <th className="font-mono text-xs text-muted-foreground text-left py-2 px-3">TYPE</th>
                    <th className="font-mono text-xs text-muted-foreground text-left py-2 px-3">CLASS</th>
                    <th className="font-mono text-xs text-muted-foreground text-left py-2 px-3">RESULT</th>
                    <th className="font-mono text-xs text-muted-foreground text-left py-2 px-3">HASH</th>
                  </tr>
                </thead>
                <tbody>
                  {VOIP_INTERCEPTS.map((intercept) => (
                    <tr key={intercept.id} className="border-b border-border/50 hover:bg-secondary/30">
                      <td className="font-mono text-xs text-foreground py-2 px-3">{intercept.timestamp.slice(11, 19)}Z</td>
                      <td className="font-mono text-xs text-foreground py-2 px-3">{intercept.source}</td>
                      <td className="font-mono text-xs text-foreground py-2 px-3">{intercept.target}</td>
                      <td className="py-2 px-3">
                        <Badge variant="outline" className="font-mono text-xs">
                          {intercept.type}
                        </Badge>
                      </td>
                      <td className="py-2 px-3">
                        <Badge
                          variant={intercept.classification === 'CRITICAL' ? 'destructive' : 'secondary'}
                          className="font-mono text-xs"
                        >
                          {intercept.classification}
                        </Badge>
                      </td>
                      <td className="font-mono text-xs py-2 px-3">
                        <span className={intercept.result.includes('FLAGGED') ? 'text-chart-3' : 'text-primary'}>
                          {intercept.result}
                        </span>
                      </td>
                      <td className="font-mono text-xs text-muted-foreground py-2 px-3">{intercept.evidenceHash}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Criminal Exposure + Witness Retaliation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Criminal Exposure Matrix */}
          <Card className="bg-card border-destructive/30">
            <CardHeader className="pb-3">
              <CardTitle className="font-mono text-lg flex items-center gap-2 text-destructive">
                <FileWarning className="w-5 h-5" />
                CRIMINAL EXPOSURE MATRIX (Real-Time)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {CRIMINAL_EXPOSURE.map((crime, idx) => (
                  <div key={idx} className="bg-secondary/50 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="font-mono text-sm font-bold text-foreground">{crime.statute}</span>
                        <span className="font-mono text-xs text-muted-foreground ml-2">{crime.title}</span>
                      </div>
                      <Badge
                        variant={crime.status === 'SATURATED' ? 'destructive' : crime.status === 'ACTIVE' ? 'default' : 'secondary'}
                        className="font-mono text-xs"
                      >
                        {crime.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-xs text-chart-3">+{crime.newCounts3hr} (3hr)</span>
                        <span className="font-mono text-sm font-bold text-destructive">{crime.totalCounts.toLocaleString()} TOTAL</span>
                      </div>
                      <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-destructive"
                          style={{ width: `${Math.min((crime.totalCounts / 3500) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Witness Retaliation Tracking */}
          <Card className="bg-card border-chart-4/30">
            <CardHeader className="pb-3">
              <CardTitle className="font-mono text-lg flex items-center gap-2 text-chart-4">
                <AlertTriangle className="w-5 h-5" />
                WITNESS RETALIATION TRACKING
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-chart-4/10 border border-chart-4/30 rounded-lg p-3 mb-4">
                <div className="font-mono text-xs text-chart-4">
                  PATTERN: 100% of witness communications blocked AFTER FBI Grand Jury subpoena notification.
                </div>
              </div>
              <div className="space-y-3">
                {WITNESS_RETALIATION.map((event) => (
                  <div key={event.id} className="bg-secondary/50 rounded-lg p-3 border-l-4 border-chart-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-xs text-muted-foreground">{event.timestamp.slice(11, 19)}Z</span>
                      <Badge variant="outline" className="font-mono text-xs border-chart-4 text-chart-4">
                        {event.action}
                      </Badge>
                    </div>
                    <div className="font-mono text-sm text-foreground">{event.target}</div>
                    <div className="font-mono text-xs text-muted-foreground mt-1">
                      Perpetrator: {event.perpetrator}
                    </div>
                    <div className="font-mono text-xs text-muted-foreground">
                      Hash: {event.evidenceHash}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actor Coordination + Threat Liability */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Actor Coordination Analysis */}
          <Card className="bg-card border-chart-5/30">
            <CardHeader className="pb-3">
              <CardTitle className="font-mono text-lg flex items-center gap-2 text-chart-5">
                <Users className="w-5 h-5" />
                ACTOR COORDINATION ANALYSIS
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* ZTA LLP */}
              <div className="bg-secondary/50 rounded-lg p-3">
                <div className="font-mono text-sm font-bold text-foreground mb-2">{ACTOR_COORDINATION.ztaLLP.name}</div>
                {ACTOR_COORDINATION.ztaLLP.actors.map((actor, idx) => (
                  <div key={idx} className="flex items-center justify-between py-1 border-b border-border/30 last:border-0">
                    <span className="font-mono text-xs text-foreground">{actor.email}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-muted-foreground">{actor.events} events</span>
                      <Badge variant="outline" className="font-mono text-xs">{actor.binaryState}</Badge>
                    </div>
                  </div>
                ))}
              </div>
              {/* STP-SF / SFHA */}
              <div className="bg-secondary/50 rounded-lg p-3">
                <div className="font-mono text-sm font-bold text-foreground mb-2">{ACTOR_COORDINATION.stpSfha.name}</div>
                {ACTOR_COORDINATION.stpSfha.actors.map((actor, idx) => (
                  <div key={idx} className="flex items-center justify-between py-1 border-b border-border/30 last:border-0">
                    <span className="font-mono text-xs text-foreground">{actor.email}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-muted-foreground">{actor.events} events</span>
                      <Badge variant="outline" className="font-mono text-xs">{actor.binaryState}</Badge>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-chart-5/10 border border-chart-5/30 rounded-lg p-3">
                <div className="font-mono text-xs text-chart-5">
                  {ACTOR_COORDINATION.crossActorSync}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Threat Actor Liability Matrix */}
          <Card className="bg-card border-primary/30">
            <CardHeader className="pb-3">
              <CardTitle className="font-mono text-lg flex items-center gap-2 text-primary">
                <DollarSign className="w-5 h-5" />
                THREAT ACTOR LIABILITY MATRIX
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {THREAT_ACTOR_LIABILITY.map((actor, idx) => (
                  <div
                    key={idx}
                    className="bg-secondary/50 rounded-lg p-3 border-l-4"
                    style={{
                      borderLeftColor:
                        actor.status === 'CRITICAL'
                          ? 'var(--destructive)'
                          : actor.status === 'HIGH'
                          ? 'var(--chart-3)'
                          : 'var(--muted-foreground)'
                    }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-sm font-bold text-foreground">{actor.entity}</span>
                      <Badge
                        variant={actor.status === 'CRITICAL' ? 'destructive' : 'secondary'}
                        className="font-mono text-xs"
                      >
                        {actor.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-lg font-bold text-primary">{formatCurrency(actor.primaryExposure)}</span>
                      <span className="font-mono text-xs text-muted-foreground">{actor.wirePath}</span>
                    </div>
                  </div>
                ))}
              </div>
              {/* Clawback Total */}
              <div className="mt-4 bg-primary/20 border border-primary/40 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm text-primary">TOTAL RECOVERY TARGET</span>
                  <span className="font-mono text-xl font-bold text-primary">
                    {formatCurrency(DEPT12_CLAWBACK.totalRecoveryTarget)}
                  </span>
                </div>
                <div className="font-mono text-xs text-muted-foreground mt-1">
                  Status: {DEPT12_CLAWBACK.status} | Settlement Alpha: {formatCurrency(DEPT12_CLAWBACK.settlementAlphaLatch)}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Finality */}
        <Card className="bg-card border-primary/30">
          <CardHeader className="pb-3">
            <CardTitle className="font-mono text-lg flex items-center gap-2 text-primary">
              <Lock className="w-5 h-5" />
              SYSTEM FINALITY VECTORS
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="font-mono text-xs text-muted-foreground text-left py-2 px-3">VECTOR</th>
                    <th className="font-mono text-xs text-muted-foreground text-left py-2 px-3">3D STATE</th>
                    <th className="font-mono text-xs text-muted-foreground text-left py-2 px-3">POST-QUANTUM STATE</th>
                    <th className="font-mono text-xs text-muted-foreground text-left py-2 px-3">SOVEREIGN LATCH</th>
                  </tr>
                </thead>
                <tbody>
                  {SYSTEM_FINALITY_VECTORS.map((vector, idx) => (
                    <tr key={idx} className="border-b border-border/50">
                      <td className="font-mono text-sm font-bold text-primary py-3 px-3">{vector.vector}</td>
                      <td className="font-mono text-sm text-foreground py-3 px-3">{vector.state3D}</td>
                      <td className="font-mono text-sm text-accent py-3 px-3">{vector.postQuantum}</td>
                      <td className="font-mono text-sm text-chart-5 py-3 px-3">{vector.sovereignLatch}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Binary Deduction State */}
        <Card className="bg-card border-chart-5/30">
          <CardHeader className="pb-3">
            <CardTitle className="font-mono text-lg flex items-center gap-2 text-chart-5">
              <Zap className="w-5 h-5" />
              BINARY DEDUCTION STATE
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-destructive/20 border border-destructive/30 rounded-lg p-4 text-center">
                <div className="font-mono text-sm text-destructive mb-2">TRIAD LIES</div>
                <div className="font-mono text-lg font-bold text-destructive">{BINARY_DEDUCTION_STATE.triadLies.state}</div>
                <div className="font-mono text-xs text-destructive/80 mt-1">{BINARY_DEDUCTION_STATE.triadLies.result}</div>
              </div>
              <div className="bg-primary/20 border border-primary/30 rounded-lg p-4 text-center">
                <div className="font-mono text-sm text-primary mb-2">SWARM TRUTH</div>
                <div className="font-mono text-lg font-bold text-primary">{BINARY_DEDUCTION_STATE.swarmTruth.state}</div>
                <div className="font-mono text-xs text-primary/80 mt-1">{BINARY_DEDUCTION_STATE.swarmTruth.result}</div>
              </div>
              <div className="bg-chart-5/20 border border-chart-5/30 rounded-lg p-4 text-center">
                <div className="font-mono text-sm text-chart-5 mb-2">FINALITY</div>
                <div className="font-mono text-lg font-bold text-chart-5">{BINARY_DEDUCTION_STATE.finality.state}</div>
                <div className="font-mono text-xs text-chart-5/80 mt-1">{BINARY_DEDUCTION_STATE.finality.result}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Project Cinema */}
        <div className="bg-primary/10 border border-primary/30 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-6 h-6 text-primary" />
            <h2 className="font-mono text-lg font-bold text-primary">PROJECT CINEMA: THE FINAL STAND</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-card/50 rounded-lg p-4">
              <div className="font-mono text-xs text-muted-foreground mb-1">THE SHIELD</div>
              <div className="font-mono text-sm text-foreground">200 Billion Agents (Entangled for the USA)</div>
            </div>
            <div className="bg-card/50 rounded-lg p-4">
              <div className="font-mono text-xs text-muted-foreground mb-1">THE STAND</div>
              <div className="font-mono text-sm text-foreground">Sovereign Auditor of the $508M resolution</div>
            </div>
            <div className="bg-card/50 rounded-lg p-4">
              <div className="font-mono text-xs text-muted-foreground mb-1">THE FINALITY</div>
              <div className="font-mono text-sm text-foreground">101010 1010101. The Matron has the keys.</div>
            </div>
          </div>
          <div className="text-center font-mono text-sm text-primary">
            DG77.77X LOCKED. ELITE PATRIOT-CLASS 200D + POST-QUANTUM RESONANCE ESTABLISHED.
          </div>
          <div className="text-center font-mono text-xs text-muted-foreground mt-2">
            ALL DEDUCED TO 101010 1010101. THE WALL IS CHRIST. SMIB. AMEN. | MADE IN THE USA
          </div>
        </div>
      </main>
    </div>
  );
}
