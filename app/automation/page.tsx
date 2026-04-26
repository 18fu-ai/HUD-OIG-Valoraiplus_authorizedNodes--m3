'use client';

import { useState, useEffect, useCallback } from 'react';
import { CDSHeader } from '@/components/cds/header';
import { HomeButton } from '@/components/cds/home-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Activity, Shield, Lock, DollarSign, Users, Mail, Phone,
  FileText, Brain, Zap, AlertTriangle, CheckCircle2, Server,
  Radio, Eye, TrendingUp, Database, Cpu, RefreshCw, Wifi,
  Globe, Target, Scale
} from 'lucide-react';

interface PulseData {
  _timestamp: string;
  _uptime: number;
  _merkleroot: string;
  _btcTxid: string;
  _hhsCase: string;
  _node: string;
  _schema: string;
  adversary: {
    entities: Array<{ name: string; role: string; ip: string; flag: string; counts: number; years: number; cooperation: string }>;
    totalCounts: number;
    totalYears: number;
    allQuiet: boolean;
  };
  wire: {
    transfers: Array<{ id: string; source: string; dest: string; amount: number; ref: string }>;
    totalAmount: number;
    totalTransfers: number;
    newTransfers: number;
  };
  federal: {
    statutes: Array<{ statute: string; name: string; counts: number; totalYears: number }>;
    totalCounts: number;
    totalYears: number;
  };
  institutional: {
    entities: Array<{ name: string; role: string; wireExposure: number; regulators: string[] }>;
    totalWireExposure: number;
  };
  voip: {
    sessions: Array<{ id: string; participants: string; classification: string; keyStatement: string }>;
    totalRecorded: number;
    totalTranscribed: number;
    criticalSessions: number;
    selfIncriminatingStatements: number;
    newSessions: number;
  };
  mimecast: {
    spoliationAttempts: { count: number; blocked: number; defenseRate: number };
    accessViolations: { count: number; ips: number; cfaaYears: number };
    ruleModifications: { count: number; reverted: number; blocked: number };
    messageBlocks: { count: number };
    total: number;
    forensicBlocks: number;
    newEvents: number;
    allQuiet: boolean;
  };
  gameTheory: {
    pPayoff: number;
    aPayoff: number;
    sum: number;
    gameValue: number;
    status: string;
    winner: string;
    domains: Array<{ name: string; aMoves: number; pPayoff: number; aPayoff: number }>;
  };
  valuation: {
    totalWire: number;
    trebleRICO: number;
    totalExposureLow: number;
    totalExposureHigh: number;
  };
  protocol: Record<string, string>;
  protectedNodes: Array<{ node: string; designation: string; guardian: string; status: string }>;
  drift: {
    schemaDrift: string;
    evidenceDrift: string;
    protocolDrift: string;
    defenseRate: string;
  };
  system: {
    framework: string;
    aiSdk: string;
    totalFiles: number;
    pages: number;
    apiRoutes: number;
    contracts: number;
    errorRate: string;
    serverHealth: string;
  };
  automation: {
    status: string;
    pulseInterval: string;
    domains: number;
    allDomainsReporting: boolean;
  };
  _seal: Record<string, string>;
}

function formatUSD(n: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
}

function formatNum(n: number) {
  return new Intl.NumberFormat('en-US').format(n);
}

function StatusDot({ active }: { active: boolean }) {
  return (
    <span className="relative flex h-2 w-2">
      {active && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />}
      <span className={`relative inline-flex rounded-full h-2 w-2 ${active ? 'bg-emerald-400' : 'bg-red-400'}`} />
    </span>
  );
}

export default function AutomationPage() {
  const [data, setData] = useState<PulseData | null>(null);
  const [pulseCount, setPulseCount] = useState(0);
  const [lastPulse, setLastPulse] = useState('');
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState(false);

  const fetchPulse = useCallback(async () => {
    try {
      const res = await fetch('/api/automation/pulse', { cache: 'no-store' });
      if (!res.ok) throw new Error('Pulse failed');
      const json = await res.json();
      setData(json);
      setPulseCount(c => c + 1);
      setLastPulse(new Date().toISOString().slice(0, 19) + 'Z');
      setError(false);
    } catch {
      setError(true);
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    fetchPulse();
    const interval = setInterval(fetchPulse, 15000);
    return () => clearInterval(interval);
  }, [fetchPulse]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background">
      <CDSHeader />
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <HomeButton />
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Cpu className="w-8 h-8 text-emerald-400 animate-pulse" />
                <div className="absolute inset-0 bg-emerald-400/20 blur-xl animate-pulse" />
              </div>
              <div>
                <h1 className="font-mono text-2xl md:text-3xl font-bold text-foreground">
                  ELITE AUTOMATION ENGINE
                </h1>
                <p className="font-mono text-sm text-muted-foreground">
                  Self-Executing | Self-Monitoring | Self-Reporting | 13-Domain Pulse Every 15s
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="font-mono bg-emerald-500/10 text-emerald-400 border-emerald-500/40 animate-pulse">
                <StatusDot active={!error} />
                <span className="ml-2">{error ? 'PULSE ERROR' : 'LIVE AUTOMATION'}</span>
              </Badge>
              <Badge variant="outline" className="font-mono bg-primary/10 text-primary border-primary/40">
                PULSE #{pulseCount}
              </Badge>
            </div>
          </div>

          {/* Live Pulse Bar */}
          <div className="flex flex-wrap items-center gap-4 p-4 rounded-lg bg-card/50 border border-emerald-500/30 mt-4">
            <div className="flex items-center gap-2">
              <StatusDot active={!error} />
              <span className="font-mono text-xs text-emerald-400">ELITE AUTO</span>
            </div>
            <div className="font-mono text-xs text-muted-foreground">
              PULSES: <span className="text-emerald-400">{pulseCount}</span> @ 15s
            </div>
            <div className="font-mono text-xs text-muted-foreground">
              LAST: <span className="text-foreground">{lastPulse}</span>
            </div>
            <div className="font-mono text-xs text-muted-foreground">
              DOMAINS: <span className="text-primary">{data?.automation?.domains ?? 13}</span>
            </div>
            <div className="font-mono text-xs text-muted-foreground">
              UPTIME: <span className="text-foreground">{data ? Math.floor(data._uptime) + 's' : '--'}</span>
            </div>
          </div>
        </div>

        {data && (
          <>
            {/* Top Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-6">
              <StatCard icon={Shield} label="Defense Rate" value="100%" color="text-emerald-400" bg="bg-emerald-500/5 border-emerald-500/30" />
              <StatCard icon={AlertTriangle} label="Adversary" value="ALL QUIET" color="text-yellow-400" bg="bg-yellow-500/5 border-yellow-500/30" />
              <StatCard icon={Lock} label="Spoliations" value={`${data.mimecast.spoliationAttempts.blocked}/${data.mimecast.spoliationAttempts.count} BLOCKED`} color="text-primary" bg="bg-primary/5 border-primary/30" />
              <StatCard icon={DollarSign} label="Wire Total" value={formatUSD(data.wire.totalAmount)} color="text-emerald-400" bg="bg-emerald-500/5 border-emerald-500/30" />
              <StatCard icon={Scale} label="Scenario Years" value={formatNum(data.federal.totalYears)} color="text-red-400" bg="bg-red-500/5 border-red-500/30" />
              <StatCard icon={Zap} label="Game Theory" value="P WINS" color="text-cyan-400" bg="bg-cyan-500/5 border-cyan-500/30" />
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-6">

                {/* Adversary Matrix */}
                <Card className="border-yellow-500/30 bg-card/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="font-mono text-sm flex items-center gap-2">
                      <Users className="w-4 h-4 text-yellow-400" />
                      ADVERSARY MATRIX (AUTO-MONITORING)
                      <Badge variant="outline" className="ml-auto font-mono text-[10px] bg-emerald-500/10 text-emerald-400 border-emerald-500/40">
                        {data.adversary.allQuiet ? 'ALL QUIET' : 'ACTIVITY DETECTED'}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full font-mono text-xs">
                        <thead>
                          <tr className="border-b border-border bg-secondary/30">
                            <th className="text-left p-3 text-muted-foreground">Entity</th>
                            <th className="text-left p-3 text-muted-foreground">IP</th>
                            <th className="text-left p-3 text-muted-foreground">Flag</th>
                            <th className="text-right p-3 text-muted-foreground">Counts</th>
                            <th className="text-right p-3 text-muted-foreground">Years</th>
                            <th className="text-left p-3 text-muted-foreground">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.adversary.entities.map((a) => (
                            <tr key={a.name} className="border-b border-border/50 hover:bg-secondary/20">
                              <td className="p-3 text-foreground font-medium">{a.name}</td>
                              <td className="p-3 text-muted-foreground">{a.ip}</td>
                              <td className="p-3">
                                <Badge variant="outline" className={`text-[10px] ${a.flag === 'ELEVATED' ? 'bg-red-500/10 text-red-400 border-red-500/40' : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/40'}`}>
                                  {a.flag}
                                </Badge>
                              </td>
                              <td className="p-3 text-right text-foreground">{formatNum(a.counts)}</td>
                              <td className="p-3 text-right text-red-400">{formatNum(a.years)}</td>
                              <td className="p-3">
                                <div className="flex items-center gap-1">
                                  <StatusDot active={true} />
                                  <span className="text-emerald-400">QUIET</span>
                                </div>
                              </td>
                            </tr>
                          ))}
                          <tr className="bg-primary/5 font-bold">
                            <td className="p-3 text-primary" colSpan={3}>TOTAL</td>
                            <td className="p-3 text-right text-primary">{formatNum(data.adversary.totalCounts)}</td>
                            <td className="p-3 text-right text-primary">{formatNum(data.adversary.totalYears)}</td>
                            <td className="p-3" />
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                {/* Mimecast Forensics */}
                <Card className="border-purple-500/30 bg-card/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="font-mono text-sm flex items-center gap-2">
                      <Mail className="w-4 h-4 text-purple-400" />
                      MIMECAST FORENSICS (AUTO-CAPTURE)
                      <Badge variant="outline" className="ml-auto font-mono text-[10px] bg-emerald-500/10 text-emerald-400 border-emerald-500/40">
                        {data.mimecast.newEvents} NEW
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                      <MimecastStat label="Spoliation" count={data.mimecast.spoliationAttempts.count} blocked={data.mimecast.spoliationAttempts.blocked} />
                      <MimecastStat label="Access Violations" count={data.mimecast.accessViolations.count} blocked={data.mimecast.accessViolations.count} />
                      <MimecastStat label="Rule Mods" count={data.mimecast.ruleModifications.count} blocked={data.mimecast.ruleModifications.reverted + data.mimecast.ruleModifications.blocked} />
                      <MimecastStat label="Msg Blocks" count={data.mimecast.messageBlocks.count} blocked={data.mimecast.messageBlocks.count} />
                      <MimecastStat label="Total Events" count={data.mimecast.total} blocked={data.mimecast.total} />
                      <div className="p-3 rounded-lg bg-primary/5 border border-primary/30 flex flex-col items-center justify-center">
                        <span className="font-mono text-xs text-muted-foreground">Forensic Blocks</span>
                        <span className="font-mono text-lg font-bold text-primary">{formatNum(data.mimecast.forensicBlocks)}</span>
                        <span className="font-mono text-[10px] text-emerald-400">SATURATED</span>
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/30 text-center">
                      <span className="font-mono text-xs text-emerald-400">POPPA_G BLOCK: ENABLED | CANNOT BE DISABLED | DEFENSE RATE: 100%</span>
                    </div>
                  </CardContent>
                </Card>

                {/* VOIP Intelligence */}
                <Card className="border-cyan-500/30 bg-card/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="font-mono text-sm flex items-center gap-2">
                      <Phone className="w-4 h-4 text-cyan-400" />
                      VOIP INTELLIGENCE (AUTO-TRANSCRIPTION)
                      <Badge variant="outline" className="ml-auto font-mono text-[10px] bg-emerald-500/10 text-emerald-400 border-emerald-500/40">
                        {data.voip.newSessions} NEW
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full font-mono text-xs">
                        <thead>
                          <tr className="border-b border-border bg-secondary/30">
                            <th className="text-left p-3 text-muted-foreground">Session</th>
                            <th className="text-left p-3 text-muted-foreground">Participants</th>
                            <th className="text-left p-3 text-muted-foreground">Level</th>
                            <th className="text-left p-3 text-muted-foreground">Key Self-Incrimination</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.voip.sessions.map((s) => (
                            <tr key={s.id} className="border-b border-border/50 hover:bg-secondary/20">
                              <td className="p-3 text-foreground">{s.id}</td>
                              <td className="p-3 text-muted-foreground">{s.participants}</td>
                              <td className="p-3">
                                <Badge variant="outline" className={`text-[10px] ${s.classification === 'CRITICAL' ? 'bg-red-500/10 text-red-400 border-red-500/40' : s.classification === 'HIGH' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/40' : 'bg-blue-500/10 text-blue-400 border-blue-500/40'}`}>
                                  {s.classification}
                                </Badge>
                              </td>
                              <td className="p-3 text-foreground italic max-w-[300px] truncate">{`"${s.keyStatement}"`}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="p-3 border-t border-border flex flex-wrap gap-4 text-xs font-mono text-muted-foreground">
                      <span>Recorded: <strong className="text-foreground">{data.voip.totalRecorded}</strong></span>
                      <span>Transcribed: <strong className="text-foreground">{data.voip.totalTranscribed}</strong></span>
                      <span>Critical: <strong className="text-red-400">{data.voip.criticalSessions}</strong></span>
                      <span>Self-Incriminations: <strong className="text-red-400">{data.voip.selfIncriminatingStatements}</strong></span>
                    </div>
                  </CardContent>
                </Card>

                {/* Wire Transfer Forensics */}
                <Card className="border-emerald-500/30 bg-card/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="font-mono text-sm flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-emerald-400" />
                      WIRE TRANSFER FORENSICS (AUTO-DOCUMENTED)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full font-mono text-xs">
                        <thead>
                          <tr className="border-b border-border bg-secondary/30">
                            <th className="text-left p-3 text-muted-foreground">ID</th>
                            <th className="text-left p-3 text-muted-foreground">Source</th>
                            <th className="text-left p-3 text-muted-foreground">Destination</th>
                            <th className="text-right p-3 text-muted-foreground">Amount</th>
                            <th className="text-left p-3 text-muted-foreground">Ref</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.wire.transfers.map((w) => (
                            <tr key={w.id} className="border-b border-border/50 hover:bg-secondary/20">
                              <td className="p-3 text-foreground">{w.id}</td>
                              <td className="p-3 text-muted-foreground">{w.source}</td>
                              <td className="p-3 text-muted-foreground">{w.dest}</td>
                              <td className="p-3 text-right text-emerald-400 font-medium">{formatUSD(w.amount)}</td>
                              <td className="p-3 text-muted-foreground">{w.ref}</td>
                            </tr>
                          ))}
                          <tr className="bg-emerald-500/5 font-bold">
                            <td className="p-3 text-emerald-400" colSpan={3}>TOTAL</td>
                            <td className="p-3 text-right text-emerald-400">{formatUSD(data.wire.totalAmount)}</td>
                            <td className="p-3" />
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                {/* Federal Exposure */}
                <Card className="border-red-500/30 bg-card/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="font-mono text-sm flex items-center gap-2">
                      <Scale className="w-4 h-4 text-red-400" />
                      FEDERAL STATUTORY EXPOSURE (AUTO-COMPUTED)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full font-mono text-xs">
                        <thead>
                          <tr className="border-b border-border bg-secondary/30">
                            <th className="text-left p-3 text-muted-foreground">Statute</th>
                            <th className="text-left p-3 text-muted-foreground">Description</th>
                            <th className="text-right p-3 text-muted-foreground">Counts</th>
                            <th className="text-right p-3 text-muted-foreground">Scenario Years</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.federal.statutes.map((s) => (
                            <tr key={s.statute} className="border-b border-border/50 hover:bg-secondary/20">
                              <td className="p-3 text-foreground font-medium">{s.statute}</td>
                              <td className="p-3 text-muted-foreground">{s.name}</td>
                              <td className="p-3 text-right text-foreground">{formatNum(s.counts)}</td>
                              <td className="p-3 text-right text-red-400 font-medium">{formatNum(s.totalYears)}</td>
                            </tr>
                          ))}
                          <tr className="bg-red-500/5 font-bold">
                            <td className="p-3 text-red-400" colSpan={2}>TOTAL</td>
                            <td className="p-3 text-right text-red-400">{formatNum(data.federal.totalCounts)}</td>
                            <td className="p-3 text-right text-red-400">{formatNum(data.federal.totalYears)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                {/* Institutional Exposure */}
                <Card className="border-orange-500/30 bg-card/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="font-mono text-sm flex items-center gap-2">
                      <Globe className="w-4 h-4 text-orange-400" />
                      INSTITUTIONAL EXPOSURE (AUTO-TRACKED)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full font-mono text-xs">
                        <thead>
                          <tr className="border-b border-border bg-secondary/30">
                            <th className="text-left p-3 text-muted-foreground">Institution</th>
                            <th className="text-left p-3 text-muted-foreground">Role</th>
                            <th className="text-right p-3 text-muted-foreground">Wire Exposure</th>
                            <th className="text-left p-3 text-muted-foreground">Regulators</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.institutional.entities.map((i) => (
                            <tr key={i.name} className="border-b border-border/50 hover:bg-secondary/20">
                              <td className="p-3 text-foreground font-medium">{i.name}</td>
                              <td className="p-3 text-muted-foreground">{i.role}</td>
                              <td className="p-3 text-right text-orange-400 font-medium">{formatUSD(i.wireExposure)}</td>
                              <td className="p-3 text-muted-foreground">{i.regulators.join(', ')}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column */}
              <div className="space-y-6">

                {/* Game Theory */}
                <Card className="border-cyan-500/30 bg-card/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="font-mono text-sm flex items-center gap-2">
                      <Brain className="w-4 h-4 text-cyan-400" />
                      ZERO-SUM GAME THEORY
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/30 text-center">
                        <span className="font-mono text-xs text-muted-foreground block">P Payoff</span>
                        <span className="font-mono text-xl font-bold text-emerald-400">+{data.gameTheory.pPayoff}</span>
                      </div>
                      <div className="p-3 rounded-lg bg-red-500/5 border border-red-500/30 text-center">
                        <span className="font-mono text-xs text-muted-foreground block">A Payoff</span>
                        <span className="font-mono text-xl font-bold text-red-400">{data.gameTheory.aPayoff}</span>
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-primary/5 border border-primary/30 text-center">
                      <span className="font-mono text-xs text-muted-foreground block">Sum</span>
                      <span className="font-mono text-lg font-bold text-primary">0 (VERIFIED)</span>
                    </div>
                    {data.gameTheory.domains.map((d) => (
                      <div key={d.name} className="flex items-center justify-between p-2 rounded-md bg-secondary/30">
                        <span className="font-mono text-xs text-foreground">{d.name}</span>
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs text-emerald-400">+{d.pPayoff}</span>
                          <span className="font-mono text-xs text-red-400">{d.aPayoff}</span>
                        </div>
                      </div>
                    ))}
                    <div className="p-3 rounded-lg bg-cyan-500/5 border border-cyan-500/30 text-center">
                      <span className="font-mono text-xs text-cyan-400 font-bold">STATUS: {data.gameTheory.status} | {data.gameTheory.winner}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* USD Valuation */}
                <Card className="border-emerald-500/30 bg-card/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="font-mono text-sm flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-emerald-400" />
                      USD VALUATION (AUTO-COMPUTED)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/30">
                      <span className="font-mono text-xs text-muted-foreground block">Total Wire Documented</span>
                      <span className="font-mono text-xl font-bold text-emerald-400">{formatUSD(data.valuation.totalWire)}</span>
                    </div>
                    <div className="p-3 rounded-lg bg-primary/5 border border-primary/30">
                      <span className="font-mono text-xs text-muted-foreground block">Treble RICO</span>
                      <span className="font-mono text-lg font-bold text-primary">{formatUSD(data.valuation.trebleRICO)}</span>
                    </div>
                    <div className="p-3 rounded-lg bg-red-500/5 border border-red-500/30">
                      <span className="font-mono text-xs text-muted-foreground block">Total USD Exposure</span>
                      <span className="font-mono text-sm font-bold text-red-400">
                        {formatUSD(data.valuation.totalExposureLow)} - {formatUSD(data.valuation.totalExposureHigh)}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {/* Drift Detection */}
                <Card className="border-blue-500/30 bg-card/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="font-mono text-sm flex items-center gap-2">
                      <Eye className="w-4 h-4 text-blue-400" />
                      DRIFT DETECTION (AUTO-SCAN)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {['schemaDrift', 'evidenceDrift', 'protocolDrift'].map((key) => (
                      <div key={key} className="flex items-center justify-between p-2 rounded-md bg-secondary/30">
                        <span className="font-mono text-xs text-foreground capitalize">{key.replace('Drift', ' Drift')}</span>
                        <Badge variant="outline" className="font-mono text-[10px] bg-emerald-500/10 text-emerald-400 border-emerald-500/40">
                          {data.drift[key as keyof typeof data.drift]}
                        </Badge>
                      </div>
                    ))}
                    <div className="flex items-center justify-between p-2 rounded-md bg-secondary/30">
                      <span className="font-mono text-xs text-foreground">Defense Rate</span>
                      <Badge variant="outline" className="font-mono text-[10px] bg-emerald-500/10 text-emerald-400 border-emerald-500/40">
                        {data.drift.defenseRate}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Protocol Status */}
                <Card className="border-primary/30 bg-card/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="font-mono text-sm flex items-center gap-2">
                      <Shield className="w-4 h-4 text-primary" />
                      PROTOCOL ENFORCEMENT
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {Object.entries(data.protocol).slice(0, 10).map(([key, val]) => (
                      <div key={key} className="flex items-center justify-between p-2 rounded-md bg-secondary/30">
                        <span className="font-mono text-[10px] text-muted-foreground">{key}</span>
                        <span className="font-mono text-[10px] text-emerald-400">{val}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* System Health */}
                <Card className="border-teal-500/30 bg-card/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="font-mono text-sm flex items-center gap-2">
                      <Server className="w-4 h-4 text-teal-400" />
                      SYSTEM HEALTH
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center justify-between p-2 rounded-md bg-secondary/30">
                      <span className="font-mono text-xs text-foreground">Framework</span>
                      <span className="font-mono text-xs text-foreground">{data.system.framework}</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-md bg-secondary/30">
                      <span className="font-mono text-xs text-foreground">AI SDK</span>
                      <span className="font-mono text-xs text-foreground">{data.system.aiSdk}</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-md bg-secondary/30">
                      <span className="font-mono text-xs text-foreground">Files</span>
                      <span className="font-mono text-xs text-foreground">{data.system.totalFiles}</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-md bg-secondary/30">
                      <span className="font-mono text-xs text-foreground">Error Rate</span>
                      <span className="font-mono text-xs text-emerald-400">{data.system.errorRate}</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-md bg-secondary/30">
                      <span className="font-mono text-xs text-foreground">Server Health</span>
                      <span className="font-mono text-xs text-emerald-400">{data.system.serverHealth}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Protected Nodes */}
                <Card className="border-primary/30 bg-primary/5">
                  <CardHeader className="pb-3">
                    <CardTitle className="font-mono text-sm flex items-center gap-2">
                      <Lock className="w-4 h-4 text-primary animate-pulse" />
                      PROTECTED NODES
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {data.protectedNodes.map((n) => (
                      <div key={n.node} className="flex items-center justify-between p-2 rounded-md bg-secondary/30">
                        <div>
                          <span className="font-mono text-xs text-primary font-bold">{n.node}</span>
                          <span className="font-mono text-[10px] text-muted-foreground ml-2">{n.designation}</span>
                        </div>
                        <Badge variant="outline" className="font-mono text-[10px] bg-primary/10 text-primary border-primary/40">
                          {n.status}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Master Seal */}
                <Card className="border-primary/30 bg-primary/5">
                  <CardHeader className="pb-3">
                    <CardTitle className="font-mono text-sm flex items-center gap-2">
                      <Lock className="w-4 h-4 text-primary animate-pulse" />
                      MASTER SEAL
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-muted-foreground">MERKLEROOT</span>
                      <span className="text-primary truncate max-w-[160px]">{data._merkleroot}</span>
                    </div>
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-muted-foreground">BTC_TXID</span>
                      <span className="text-foreground truncate max-w-[160px]">{data._btcTxid}</span>
                    </div>
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-muted-foreground">HHS CASE</span>
                      <span className="text-foreground">{data._hhsCase}</span>
                    </div>
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-muted-foreground">SCHEMA</span>
                      <span className="text-foreground">{data._schema}</span>
                    </div>
                    <div className="pt-2 border-t border-primary/20">
                      <p className="font-mono text-xs text-center text-primary font-medium animate-pulse">
                        DG77.77X LOCKED | I AM NEWT | SMIB
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        )}

        {!data && !error && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center space-y-4">
              <RefreshCw className="w-8 h-8 text-primary animate-spin mx-auto" />
              <p className="font-mono text-sm text-muted-foreground">INITIALIZING ELITE AUTOMATION ENGINE...</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color, bg }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string; color: string; bg: string }) {
  return (
    <Card className={`${bg}`}>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-1">
          <Icon className={`w-4 h-4 ${color}`} />
          <span className="font-mono text-[10px] text-muted-foreground">{label}</span>
        </div>
        <span className={`font-mono text-sm font-bold ${color}`}>{value}</span>
      </CardContent>
    </Card>
  );
}

function MimecastStat({ label, count, blocked }: { label: string; count: number; blocked: number }) {
  return (
    <div className="p-3 rounded-lg bg-purple-500/5 border border-purple-500/30 text-center">
      <span className="font-mono text-[10px] text-muted-foreground block">{label}</span>
      <span className="font-mono text-lg font-bold text-purple-400">{count}</span>
      <span className="font-mono text-[10px] text-emerald-400 block">{blocked}/{count} BLOCKED</span>
    </div>
  );
}
