'use client';

import { useState, useEffect, useCallback } from 'react';
import { CDSHeader } from '@/components/cds/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Shield,
  AlertTriangle,
  Activity,
  Zap,
  Radio,
  Eye,
  FileText,
  Users,
  Clock,
  Target,
  Lock,
  CheckCircle,
  XCircle,
  ArrowUpRight,
  RefreshCw,
  Wifi,
  Database,
  Scale,
  Building2,
  Globe,
  Layers,
  TrendingUp,
  AlertCircle,
  CircleDot,
  Network,
  Radar,
  Crosshair,
} from 'lucide-react';
import Link from 'next/link';
import {
  CASE_DOCUMENTS,
  CASE_INFO,
  STACK_DESCRIPTIONS,
  RAPIDLEGAL_UPLOAD_ORDER,
  getRecordSummary,
} from '@/lib/case-documents';
import {
  INVESTIGATIONS,
  THREAT_ACTORS,
  CLAWBACK_TARGETS,
  INFRASTRUCTURE_METRICS,
  SYSTEM_PROPERTIES,
  formatCurrency,
  TOTAL_RECOVERY,
} from '@/lib/cds-data';

// Mission phases
const MISSION_PHASES = [
  { id: 1, name: 'EVIDENCE LOCK', status: 'complete', progress: 100 },
  { id: 2, name: 'FEDERAL ANCHOR', status: 'complete', progress: 100 },
  { id: 3, name: 'COURT FILING', status: 'active', progress: 78 },
  { id: 4, name: 'AGENCY SYNC', status: 'pending', progress: 45 },
  { id: 5, name: 'RESOLUTION', status: 'pending', progress: 0 },
] as const;

// Threat actors with expanded data
const THREAT_MATRIX = [
  { id: 'TA-001', name: 'Will Landrum', role: 'PRIMARY PROVOCATEUR', threat: 98, liability: 45000000, status: 'ACTIVE', actions: 5 },
  { id: 'TA-002', name: 'Jerome Bradford', role: 'PERJURY NODE', threat: 85, liability: 12000000, status: 'ACTIVE', actions: 3 },
  { id: 'TA-003', name: 'John P. Zanghi', role: 'LEGAL COORDINATOR', threat: 92, liability: 28000000, status: 'ACTIVE', actions: 4 },
  { id: 'TA-004', name: 'Bradford C. White', role: 'FILING ATTORNEY', threat: 78, liability: 8000000, status: 'MONITORING', actions: 2 },
  { id: 'TA-005', name: 'Swords to Plowshares', role: 'INSTITUTIONAL', threat: 95, liability: 90000000, status: 'ACTIVE', actions: 8 },
];

// Agency sync status
const AGENCY_SYNC = [
  { agency: 'HHS-OCR', caseId: '25-621293', status: 'ACTIVE', lastSync: '2026-05-22', response: 'PENDING' },
  { agency: 'CRD', caseId: '202601-33270627', status: 'ACTIVE', lastSync: '2026-05-20', response: 'ACKNOWLEDGED' },
  { agency: 'CalVCB', caseId: 'A26-10224054', status: 'ACTIVE', lastSync: '2026-05-18', response: 'PROCESSING' },
  { agency: 'VA-OIG', caseId: 'PENDING', status: 'REFERRED', lastSync: '2026-05-21', response: 'INTAKE' },
  { agency: 'FBI-SF', caseId: 'Doc 106', status: 'NOTIFIED', lastSync: '2026-05-24', response: 'RECEIVED' },
  { agency: 'SFDA', caseId: 'PENDING', status: 'REFERRED', lastSync: '2026-05-22', response: 'REVIEW' },
];

// Critical deadlines
const DEADLINES = [
  { date: '2026-06-01', event: '10-Day Cure Period Expires (Doc 091-R2)', priority: 'CRITICAL', daysRemaining: 8 },
  { date: '2026-06-03', event: 'Trial Date (Dept 12)', priority: 'CRITICAL', daysRemaining: 10 },
  { date: '2026-06-15', event: 'Agency Response Window', priority: 'HIGH', daysRemaining: 22 },
  { date: '2026-07-01', event: 'Discovery Cut-off', priority: 'MEDIUM', daysRemaining: 38 },
];

// System telemetry
const TELEMETRY = {
  swarmAgents: 200000000000,
  forensicShards: 50000000000,
  truthCycle: 266,
  integrityScore: 100,
  errorRate: 0,
  uptime: 99.99,
};

export default function MissionControlPage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedActor, setSelectedActor] = useState<string | null>(null);
  const [systemPulse, setSystemPulse] = useState(0);
  
  const recordSummary = getRecordSummary();
  
  // Real-time clock
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      setSystemPulse(prev => (prev + 1) % 100);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1e12) return `${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `${(num / 1e9).toFixed(1)}B`;
    if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M`;
    if (num >= 1e3) return `${(num / 1e3).toFixed(1)}K`;
    return num.toString();
  };

  const getThreatColor = (level: number) => {
    if (level >= 90) return 'text-red-500 bg-red-500/20 border-red-500/40';
    if (level >= 70) return 'text-orange-500 bg-orange-500/20 border-orange-500/40';
    if (level >= 50) return 'text-amber-500 bg-amber-500/20 border-amber-500/40';
    return 'text-emerald-500 bg-emerald-500/20 border-emerald-500/40';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-red-500/20 text-red-400 border-red-500/40';
      case 'MONITORING': return 'bg-amber-500/20 text-amber-400 border-amber-500/40';
      case 'COMPLETE': case 'ACKNOWLEDGED': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40';
      case 'PENDING': case 'PROCESSING': case 'REVIEW': return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40';
      case 'NOTIFIED': case 'REFERRED': return 'bg-violet-500/20 text-violet-400 border-violet-500/40';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'CRITICAL': return 'bg-red-500/20 text-red-400 border-red-500/40 animate-pulse';
      case 'HIGH': return 'bg-orange-500/20 text-orange-400 border-orange-500/40';
      case 'MEDIUM': return 'bg-amber-500/20 text-amber-400 border-amber-500/40';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <CDSHeader />
      
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Mission Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <h1 className="font-mono text-2xl font-bold text-foreground tracking-tight">
                MISSION CONTROL
              </h1>
              <Badge variant="outline" className="font-mono text-xs bg-primary/20 text-primary border-primary/40">
                DEPT 12 OPERATIONS
              </Badge>
            </div>
            <p className="font-mono text-sm text-muted-foreground mt-1">
              Case {CASE_INFO.caseNumber} | Real-Time Intelligence Command Center
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="font-mono text-xs text-muted-foreground">
              <span className="text-foreground">{currentTime.toLocaleTimeString()}</span>
              <span className="mx-2">|</span>
              <span>{currentTime.toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-xs text-emerald-500">SYSTEMS NOMINAL</span>
            </div>
          </div>
        </div>

        {/* Top Row: Mission Status + System Telemetry */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Mission Phase Tracker */}
          <Card className="bg-card border-border lg:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle className="font-mono text-sm flex items-center gap-2">
                <Layers className="w-4 h-4 text-primary" />
                MISSION PHASE TRACKER
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                {MISSION_PHASES.map((phase, idx) => (
                  <div key={phase.id} className="flex-1 relative">
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-mono text-sm font-bold ${
                        phase.status === 'complete' ? 'bg-emerald-500/20 border-emerald-500 text-emerald-500' :
                        phase.status === 'active' ? 'bg-primary/20 border-primary text-primary animate-pulse' :
                        'bg-muted border-border text-muted-foreground'
                      }`}>
                        {phase.status === 'complete' ? <CheckCircle className="w-5 h-5" /> : phase.id}
                      </div>
                      <span className={`font-mono text-[10px] mt-2 text-center ${
                        phase.status === 'active' ? 'text-primary' : 'text-muted-foreground'
                      }`}>
                        {phase.name}
                      </span>
                      {phase.status === 'active' && (
                        <span className="font-mono text-[10px] text-primary">{phase.progress}%</span>
                      )}
                    </div>
                    {idx < MISSION_PHASES.length - 1 && (
                      <div className={`absolute top-5 left-[60%] w-[80%] h-0.5 ${
                        phase.status === 'complete' ? 'bg-emerald-500' : 'bg-border'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
              
              {/* Active Phase Detail */}
              <div className="bg-secondary/30 rounded-lg p-4 border border-primary/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs text-primary font-bold">ACTIVE: COURT FILING</span>
                  <span className="font-mono text-xs text-muted-foreground">78% Complete</span>
                </div>
                <Progress value={78} className="h-2" />
                <p className="font-mono text-[10px] text-muted-foreground mt-2">
                  33-document priority tranche submitted via RapidLegal. Awaiting clerk confirmation and ADA coordinator response.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* System Telemetry */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="font-mono text-sm flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-500" />
                SYSTEM TELEMETRY
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-secondary/30 rounded p-3">
                  <div className="font-mono text-[10px] text-muted-foreground">SWARM AGENTS</div>
                  <div className="font-mono text-lg font-bold text-emerald-500">{formatNumber(TELEMETRY.swarmAgents)}</div>
                </div>
                <div className="bg-secondary/30 rounded p-3">
                  <div className="font-mono text-[10px] text-muted-foreground">FORENSIC SHARDS</div>
                  <div className="font-mono text-lg font-bold text-cyan-500">{formatNumber(TELEMETRY.forensicShards)}</div>
                </div>
                <div className="bg-secondary/30 rounded p-3">
                  <div className="font-mono text-[10px] text-muted-foreground">TRUTH CYCLE</div>
                  <div className="font-mono text-lg font-bold text-amber-500">{TELEMETRY.truthCycle}ms</div>
                </div>
                <div className="bg-secondary/30 rounded p-3">
                  <div className="font-mono text-[10px] text-muted-foreground">INTEGRITY</div>
                  <div className="font-mono text-lg font-bold text-primary">{TELEMETRY.integrityScore}%</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="font-mono text-[10px] text-muted-foreground">ERROR RATE</span>
                </div>
                <span className="font-mono text-xs text-emerald-500 font-bold">{TELEMETRY.errorRate}%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="font-mono text-[10px] text-muted-foreground">UPTIME</span>
                </div>
                <span className="font-mono text-xs text-emerald-500 font-bold">{TELEMETRY.uptime}%</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Middle Row: Threat Matrix + Agency Sync */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Threat Actor Matrix */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="font-mono text-sm flex items-center gap-2">
                <Crosshair className="w-4 h-4 text-red-500" />
                THREAT ACTOR MATRIX
                <Badge variant="outline" className="ml-auto font-mono text-[10px] bg-red-500/20 text-red-400 border-red-500/40">
                  {THREAT_MATRIX.length} ACTIVE
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {THREAT_MATRIX.map(actor => (
                <div
                  key={actor.id}
                  className={`bg-secondary/30 rounded-lg p-3 border cursor-pointer transition-all ${
                    selectedActor === actor.id ? 'border-red-500/60 bg-red-500/10' : 'border-border hover:border-red-500/30'
                  }`}
                  onClick={() => setSelectedActor(selectedActor === actor.id ? null : actor.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold border ${getThreatColor(actor.threat)}`}>
                        {actor.threat}
                      </div>
                      <div>
                        <div className="font-mono text-xs font-bold text-foreground">{actor.name}</div>
                        <div className="font-mono text-[10px] text-muted-foreground">{actor.role}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className={`font-mono text-[10px] ${getStatusColor(actor.status)}`}>
                        {actor.status}
                      </Badge>
                      <div className="font-mono text-[10px] text-red-400 mt-1">
                        {formatCurrency(actor.liability)}
                      </div>
                    </div>
                  </div>
                  {selectedActor === actor.id && (
                    <div className="mt-3 pt-3 border-t border-border grid grid-cols-3 gap-2">
                      <div className="text-center">
                        <div className="font-mono text-[10px] text-muted-foreground">ACTIONS</div>
                        <div className="font-mono text-sm font-bold text-red-400">{actor.actions}</div>
                      </div>
                      <div className="text-center">
                        <div className="font-mono text-[10px] text-muted-foreground">THREAT</div>
                        <div className="font-mono text-sm font-bold text-orange-400">{actor.threat}%</div>
                      </div>
                      <div className="text-center">
                        <div className="font-mono text-[10px] text-muted-foreground">LIABILITY</div>
                        <div className="font-mono text-sm font-bold text-amber-400">${(actor.liability / 1e6).toFixed(1)}M</div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              
              <div className="bg-red-500/10 rounded-lg p-3 border border-red-500/30 mt-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-red-400 font-bold">TOTAL LIABILITY EXPOSURE</span>
                  <span className="font-mono text-sm font-bold text-red-500">
                    {formatCurrency(THREAT_MATRIX.reduce((sum, a) => sum + a.liability, 0))}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Agency Sync Console */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="font-mono text-sm flex items-center gap-2">
                <Radio className="w-4 h-4 text-violet-500" />
                AGENCY SYNC CONSOLE
                <Badge variant="outline" className="ml-auto font-mono text-[10px] bg-violet-500/20 text-violet-400 border-violet-500/40">
                  {AGENCY_SYNC.length} CHANNELS
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {AGENCY_SYNC.map((agency, idx) => (
                <div key={idx} className="bg-secondary/30 rounded-lg p-3 border border-border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-violet-500/20 border border-violet-500/40 flex items-center justify-center">
                        <Building2 className="w-4 h-4 text-violet-400" />
                      </div>
                      <div>
                        <div className="font-mono text-xs font-bold text-foreground">{agency.agency}</div>
                        <div className="font-mono text-[10px] text-muted-foreground">
                          {agency.caseId !== 'PENDING' ? `Case: ${agency.caseId}` : 'Referral Pending'}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className={`font-mono text-[10px] ${getStatusColor(agency.status)}`}>
                        {agency.status}
                      </Badge>
                      <div className="font-mono text-[10px] text-muted-foreground mt-1">
                        {agency.lastSync}
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 pt-2 border-t border-border flex items-center justify-between">
                    <span className="font-mono text-[10px] text-muted-foreground">RESPONSE STATUS</span>
                    <Badge variant="outline" className={`font-mono text-[10px] ${getStatusColor(agency.response)}`}>
                      {agency.response}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Bottom Row: Deadlines + Document Stats + Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Critical Deadlines */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="font-mono text-sm flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-500" />
                CRITICAL DEADLINES
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {DEADLINES.map((deadline, idx) => (
                <div key={idx} className="bg-secondary/30 rounded-lg p-3 border border-border">
                  <div className="flex items-center justify-between mb-1">
                    <Badge variant="outline" className={`font-mono text-[10px] ${getPriorityColor(deadline.priority)}`}>
                      {deadline.priority}
                    </Badge>
                    <span className="font-mono text-[10px] text-muted-foreground">
                      {deadline.daysRemaining > 0 ? `${deadline.daysRemaining} days` : 'OVERDUE'}
                    </span>
                  </div>
                  <div className="font-mono text-xs text-foreground">{deadline.event}</div>
                  <div className="font-mono text-[10px] text-muted-foreground mt-1">{deadline.date}</div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Document Statistics */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="font-mono text-sm flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" />
                DOCUMENT STATISTICS
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-secondary/30 rounded p-3 text-center">
                  <div className="font-mono text-2xl font-bold text-primary">{recordSummary.total}</div>
                  <div className="font-mono text-[10px] text-muted-foreground">TOTAL DOCS</div>
                </div>
                <div className="bg-secondary/30 rounded p-3 text-center">
                  <div className="font-mono text-2xl font-bold text-emerald-500">{recordSummary.filed}</div>
                  <div className="font-mono text-[10px] text-muted-foreground">FILED</div>
                </div>
                <div className="bg-secondary/30 rounded p-3 text-center">
                  <div className="font-mono text-2xl font-bold text-amber-500">{recordSummary.pending}</div>
                  <div className="font-mono text-[10px] text-muted-foreground">PENDING</div>
                </div>
                <div className="bg-secondary/30 rounded p-3 text-center">
                  <div className="font-mono text-2xl font-bold text-cyan-500">{recordSummary.lodged}</div>
                  <div className="font-mono text-[10px] text-muted-foreground">LODGED</div>
                </div>
              </div>
              
              <div className="bg-primary/10 rounded-lg p-3 border border-primary/30">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-primary font-bold">PRIORITY TRANCHE</span>
                  <span className="font-mono text-sm font-bold text-primary">{RAPIDLEGAL_UPLOAD_ORDER.length}</span>
                </div>
                <div className="font-mono text-[10px] text-muted-foreground mt-1">
                  Judge-readable sequence submitted
                </div>
              </div>
              
              <Link href="/case-filing-index">
                <Button variant="outline" className="w-full font-mono text-xs h-8">
                  <FileText className="w-3 h-3 mr-2" />
                  VIEW FILING INDEX
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="font-mono text-sm flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                QUICK ACTIONS
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href="/dept12" className="block">
                <Button variant="outline" className="w-full justify-start font-mono text-xs h-10">
                  <Shield className="w-4 h-4 mr-2 text-emerald-500" />
                  Intelligence Dashboard
                  <ArrowUpRight className="w-3 h-3 ml-auto" />
                </Button>
              </Link>
              <Link href="/dept12-case" className="block">
                <Button variant="outline" className="w-full justify-start font-mono text-xs h-10">
                  <Scale className="w-4 h-4 mr-2 text-cyan-500" />
                  Case Dossier
                  <ArrowUpRight className="w-3 h-3 ml-auto" />
                </Button>
              </Link>
              <Link href="/dept12-briefing" className="block">
                <Button variant="outline" className="w-full justify-start font-mono text-xs h-10">
                  <Target className="w-4 h-4 mr-2 text-violet-500" />
                  Executive Briefing
                  <ArrowUpRight className="w-3 h-3 ml-auto" />
                </Button>
              </Link>
              <Link href="/dept12-simulation" className="block">
                <Button variant="outline" className="w-full justify-start font-mono text-xs h-10">
                  <Radar className="w-4 h-4 mr-2 text-amber-500" />
                  Court Simulation
                  <ArrowUpRight className="w-3 h-3 ml-auto" />
                </Button>
              </Link>
              <Link href="/veterans-tenant-union" className="block">
                <Button variant="outline" className="w-full justify-start font-mono text-xs h-10">
                  <Users className="w-4 h-4 mr-2 text-red-500" />
                  VTU Operations
                  <ArrowUpRight className="w-3 h-3 ml-auto" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Recovery Exposure Banner */}
        <Card className="bg-gradient-to-r from-red-500/10 via-orange-500/10 to-amber-500/10 border-red-500/30">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-red-500/20 border border-red-500/40 flex items-center justify-center">
                  <Target className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <div className="font-mono text-xs text-muted-foreground">TOTAL RECOVERY TARGET</div>
                  <div className="font-mono text-2xl font-bold text-red-500">{formatCurrency(TOTAL_RECOVERY)}</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                {CLAWBACK_TARGETS.map((target, idx) => (
                  <div key={idx} className="text-center">
                    <div className="font-mono text-[10px] text-muted-foreground">{target.category.toUpperCase()}</div>
                    <div className="font-mono text-sm font-bold text-foreground">{formatCurrency(target.amount)}</div>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="font-mono text-xs text-red-400">JULES LIQUIDATION ACTIVE</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="font-mono text-[10px] text-muted-foreground">
            VALORAI+ MISSION CONTROL v2.0 | OMEGA-ZERO PROTOCOL | SOVEREIGN IMMUNITY ACTIVE
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-[10px] text-emerald-500">ALL SYSTEMS OPERATIONAL</span>
          </div>
        </div>
      </main>
    </div>
  );
}
