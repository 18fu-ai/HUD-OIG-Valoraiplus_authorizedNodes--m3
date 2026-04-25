'use client';

import { useState, useEffect } from 'react';
import { CDSHeader } from '@/components/cds/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CDSErrorBoundary } from '@/components/cds/error-boundary';
import { ExportTools } from '@/components/cds/export-tools';
import { HomeButton, HomeBreadcrumb } from '@/components/cds/home-button';
import {
  Shield,
  FileSignature,
  ShieldCheck,
  Cpu,
  Database,
  RotateCcw,
  GitBranch,
  ArrowDown,
  ArrowRight,
  RefreshCw,
  CheckCircle2,
  Zap,
  Lock,
  Eye,
  Activity,
  Layers,
  Server,
  Radio
} from 'lucide-react';

// Protocol Layer Definitions
const PROTOCOL_LAYERS = [
  {
    id: 'L0',
    name: 'Governance Layer',
    classification: 'Protocol Constitution',
    icon: Shield,
    color: 'amber',
    responsibilities: [
      'Trust assumptions',
      'Authority domains', 
      'Signer classes',
      'Verification philosophy',
      'Mutation policy',
      'Protocol invariants'
    ],
    status: 'SOVEREIGN',
    metrics: { policies: 12, signerClasses: 4, invariants: 8 }
  },
  {
    id: 'L1',
    name: 'Intent Layer',
    classification: 'Intent Construction Interface',
    icon: FileSignature,
    color: 'blue',
    responsibilities: [
      'Typed payload creation',
      'Signer preparation',
      'Nonce preview',
      'Mutation preview',
      'Replay simulation',
      'Signature visibility'
    ],
    status: 'ACTIVE',
    metrics: { intentsToday: 847, pending: 12, signed: 835 }
  },
  {
    id: 'L2',
    name: 'Verification Layer',
    classification: 'Intent Firewall',
    icon: ShieldCheck,
    color: 'green',
    responsibilities: [
      'Schema validation',
      'Signature recovery',
      'Replay prevention',
      'Expiration enforcement',
      'Signer authority validation',
      'Policy enforcement'
    ],
    status: 'ENFORCING',
    metrics: { verified: 835, rejected: 12, latency: '14ms' }
  },
  {
    id: 'L3',
    name: 'Execution Layer',
    classification: 'Deterministic Mutation Engine',
    icon: Cpu,
    color: 'purple',
    responsibilities: [
      'Immutable transitions',
      'Revision mutation',
      'Nonce consumption',
      'Authority enforcement',
      'State commitment'
    ],
    status: 'EXECUTING',
    metrics: { mutations: 823, revisions: 1847, committed: '99.8%' }
  },
  {
    id: 'L4',
    name: 'Ledger Layer',
    classification: 'Protocol Truth Stream',
    icon: Database,
    color: 'cyan',
    responsibilities: [
      'State reconstruction',
      'Attribution lineage',
      'Revision chronology',
      'Forensic replay',
      'External indexing'
    ],
    status: 'STREAMING',
    metrics: { events: 24847, indexed: '100%', latency: '8ms' }
  },
  {
    id: 'L5',
    name: 'Replay Layer',
    classification: 'Protocol Intelligence',
    icon: RotateCcw,
    color: 'orange',
    responsibilities: [
      'Reconstructing history',
      'Validating chronology',
      'Replaying mutations',
      'Proving signer authority',
      'Rebuilding protocol state'
    ],
    status: 'RECONSTRUCTING',
    metrics: { replays: 147, validated: 147, divergence: '0%' }
  },
  {
    id: 'L6',
    name: 'Governance Feedback',
    classification: 'Protocol Evolution',
    icon: GitBranch,
    color: 'rose',
    responsibilities: [
      'Friction detection',
      'Signer behavior analysis',
      'Mutation trust inference',
      'Policy adaptation',
      'Evidence-based evolution'
    ],
    status: 'LEARNING',
    metrics: { insights: 23, adaptations: 4, confidence: '94%' }
  }
];

// Protocol Equation Components
const PROTOCOL_EQUATION = [
  { term: 'Intent', symbol: 'I', description: 'Signed state-transition request' },
  { term: 'Verification', symbol: 'V', description: 'Firewall validation pass' },
  { term: 'Mutation', symbol: 'M', description: 'Deterministic state change' },
  { term: 'Ledger', symbol: 'L', description: 'Canonical truth stream' },
  { term: 'Replay', symbol: 'R', description: 'State reconstruction proof' },
  { term: 'Governance', symbol: 'G', description: 'Feedback loop closure' }
];

// System Classification
const SYSTEM_CLASSIFICATION = {
  legacy: 'Verification-Centric Protocol Platform',
  upgraded: 'Self-Reconstructing Signed State Protocol',
  alternate: 'Closed-Loop Verification Architecture'
};

function ProtocolStackContent() {
  const [activeTab, setActiveTab] = useState('overview');
  const [activeLayer, setActiveLayer] = useState<string | null>(null);
  const [cyclePosition, setCyclePosition] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date().toISOString());

  // Animate cycle position
  useEffect(() => {
    const interval = setInterval(() => {
      setCyclePosition(prev => (prev + 1) % 7);
      setCurrentTime(new Date().toISOString());
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; border: string; text: string; badge: string }> = {
      amber: { bg: 'bg-amber-500/10', border: 'border-amber-500/40', text: 'text-amber-400', badge: 'bg-amber-500/20 text-amber-400 border-amber-500/40' },
      blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/40', text: 'text-blue-400', badge: 'bg-blue-500/20 text-blue-400 border-blue-500/40' },
      green: { bg: 'bg-green-500/10', border: 'border-green-500/40', text: 'text-green-400', badge: 'bg-green-500/20 text-green-400 border-green-500/40' },
      purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/40', text: 'text-purple-400', badge: 'bg-purple-500/20 text-purple-400 border-purple-500/40' },
      cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/40', text: 'text-cyan-400', badge: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40' },
      orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/40', text: 'text-orange-400', badge: 'bg-orange-500/20 text-orange-400 border-orange-500/40' },
      rose: { bg: 'bg-rose-500/10', border: 'border-rose-500/40', text: 'text-rose-400', badge: 'bg-rose-500/20 text-rose-400 border-rose-500/40' }
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-background">
      <CDSHeader />
      
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="font-mono text-2xl md:text-3xl font-bold text-foreground tracking-tight">
                Protocol Intelligence Stack
              </h1>
              <p className="font-mono text-sm text-muted-foreground mt-1">
                {SYSTEM_CLASSIFICATION.upgraded}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="font-mono bg-primary/10 text-primary border-primary/40 animate-pulse">
                CLOSED-LOOP
              </Badge>
              <Badge variant="outline" className="font-mono bg-green-500/10 text-green-400 border-green-500/40">
                7 LAYERS ACTIVE
              </Badge>
              <ExportTools 
                data={{
                  type: 'dashboard',
                  title: 'Protocol Intelligence Stack',
                  timestamp: currentTime,
                  content: { layers: PROTOCOL_LAYERS, equation: PROTOCOL_EQUATION, classification: SYSTEM_CLASSIFICATION },
                  metadata: { cyclePosition, activeLayer }
                }}
                variant="outline"
                size="sm"
              />
            </div>
          </div>
        </div>

        {/* Protocol Equation Banner */}
        <Card className="mb-6 border-primary/30 bg-primary/5">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                <span className="font-mono text-xs text-muted-foreground">PROTOCOL EQUATION:</span>
              </div>
              <div className="flex flex-wrap items-center gap-2 font-mono text-sm">
                {PROTOCOL_EQUATION.map((eq, idx) => (
                  <span key={eq.term} className="flex items-center gap-1">
                    <span className="text-primary font-bold">{eq.symbol}</span>
                    <span className="text-muted-foreground text-xs">({eq.term})</span>
                    {idx < PROTOCOL_EQUATION.length - 1 && (
                      <span className="text-muted-foreground mx-1">+</span>
                    )}
                  </span>
                ))}
                <span className="text-muted-foreground mx-2">=</span>
                <span className="text-green-400 font-bold">Self-Reconstructing State</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full max-w-2xl bg-secondary/50">
            <TabsTrigger value="overview" className="font-mono text-xs" aria-pressed={activeTab === 'overview'}>
              Overview
            </TabsTrigger>
            <TabsTrigger value="layers" className="font-mono text-xs" aria-pressed={activeTab === 'layers'}>
              Layers
            </TabsTrigger>
            <TabsTrigger value="cycle" className="font-mono text-xs" aria-pressed={activeTab === 'cycle'}>
              Cycle
            </TabsTrigger>
            <TabsTrigger value="metrics" className="font-mono text-xs" aria-pressed={activeTab === 'metrics'}>
              Metrics
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Classification Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-muted-foreground/30">
                <CardHeader className="pb-2">
                  <CardTitle className="font-mono text-xs text-muted-foreground">LEGACY MODEL</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-mono text-sm text-muted-foreground line-through">
                    {SYSTEM_CLASSIFICATION.legacy}
                  </p>
                </CardContent>
              </Card>
              <Card className="border-primary/40 bg-primary/5">
                <CardHeader className="pb-2">
                  <CardTitle className="font-mono text-xs text-primary">UPGRADED MODEL</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-mono text-sm text-primary font-bold">
                    {SYSTEM_CLASSIFICATION.upgraded}
                  </p>
                </CardContent>
              </Card>
              <Card className="border-green-500/40 bg-green-500/5">
                <CardHeader className="pb-2">
                  <CardTitle className="font-mono text-xs text-green-400">ALTERNATE CLASSIFICATION</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-mono text-sm text-green-400">
                    {SYSTEM_CLASSIFICATION.alternate}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Architecture Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Linear Model (Old) */}
              <Card className="border-muted-foreground/30">
                <CardHeader>
                  <CardTitle className="font-mono text-sm flex items-center gap-2">
                    <ArrowDown className="w-4 h-4 text-muted-foreground" />
                    Linear Architecture (Legacy)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {['Mission', 'Frontend', 'Backend', 'Contract', 'Events', 'Replay'].map((item, idx, arr) => (
                      <div key={item} className="flex items-center gap-2">
                        <div className="w-24 font-mono text-xs text-muted-foreground bg-secondary/50 px-2 py-1 rounded text-center">
                          {item}
                        </div>
                        {idx < arr.length - 1 && (
                          <ArrowDown className="w-3 h-3 text-muted-foreground" />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Closed Loop Model (New) */}
              <Card className="border-primary/40 bg-primary/5">
                <CardHeader>
                  <CardTitle className="font-mono text-sm flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 text-primary animate-spin" style={{ animationDuration: '8s' }} />
                    Closed-Loop Architecture (Upgraded)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {PROTOCOL_LAYERS.map((layer, idx) => {
                      const colors = getColorClasses(layer.color);
                      const isActive = idx === cyclePosition;
                      return (
                        <div key={layer.id} className="flex items-center gap-2">
                          <div className={`flex-1 font-mono text-xs px-2 py-1 rounded flex items-center gap-2 transition-all ${
                            isActive ? `${colors.bg} ${colors.border} border-2` : 'bg-secondary/50'
                          }`}>
                            <layer.icon className={`w-3 h-3 ${isActive ? colors.text : 'text-muted-foreground'}`} />
                            <span className={isActive ? colors.text : 'text-muted-foreground'}>
                              {layer.name}
                            </span>
                          </div>
                          {idx < PROTOCOL_LAYERS.length - 1 ? (
                            <ArrowDown className={`w-3 h-3 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                          ) : (
                            <RefreshCw className="w-3 h-3 text-primary" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Truth-Aware System */}
            <Card className="border-green-500/40 bg-green-500/5">
              <CardHeader>
                <CardTitle className="font-mono text-sm flex items-center gap-2">
                  <Eye className="w-4 h-4 text-green-400" />
                  Truth-Aware System
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-mono text-xs text-muted-foreground mb-4">
                  The system no longer just records truth. It becomes truth-aware:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  {[
                    { from: 'State', to: 'Verification', desc: 'informs' },
                    { from: 'Verification', to: 'Authority', desc: 'informs' },
                    { from: 'Authority', to: 'Mutation', desc: 'informs' },
                    { from: 'Mutation', to: 'Replay', desc: 'informs' },
                    { from: 'Replay', to: 'Governance', desc: 'informs' }
                  ].map((flow, idx) => (
                    <div key={idx} className="bg-secondary/50 rounded p-2 text-center">
                      <p className="font-mono text-xs text-green-400">{flow.from}</p>
                      <ArrowDown className="w-3 h-3 text-muted-foreground mx-auto my-1" />
                      <p className="font-mono text-[10px] text-muted-foreground">{flow.desc}</p>
                      <ArrowDown className="w-3 h-3 text-muted-foreground mx-auto my-1" />
                      <p className="font-mono text-xs text-primary">{flow.to}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Layers Tab */}
          <TabsContent value="layers" className="space-y-4">
            {PROTOCOL_LAYERS.map((layer) => {
              const colors = getColorClasses(layer.color);
              const isExpanded = activeLayer === layer.id;
              
              return (
                <Card 
                  key={layer.id}
                  className={`cursor-pointer transition-all ${colors.border} ${isExpanded ? colors.bg : 'hover:bg-secondary/30'}`}
                  onClick={() => setActiveLayer(isExpanded ? null : layer.id)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg ${colors.bg} ${colors.border} border flex items-center justify-center`}>
                          <layer.icon className={`w-5 h-5 ${colors.text}`} />
                        </div>
                        <div>
                          <CardTitle className="font-mono text-sm flex items-center gap-2">
                            <span className={colors.text}>{layer.id}</span>
                            <span className="text-foreground">{layer.name}</span>
                          </CardTitle>
                          <p className="font-mono text-xs text-muted-foreground">{layer.classification}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className={`font-mono text-[10px] ${colors.badge}`}>
                        {layer.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  {isExpanded && (
                    <CardContent className="pt-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                          <p className="font-mono text-xs text-muted-foreground mb-2">RESPONSIBILITIES</p>
                          <ul className="space-y-1">
                            {layer.responsibilities.map((resp, idx) => (
                              <li key={idx} className="font-mono text-xs flex items-center gap-2">
                                <CheckCircle2 className={`w-3 h-3 ${colors.text}`} />
                                <span className="text-foreground">{resp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="font-mono text-xs text-muted-foreground mb-2">METRICS</p>
                          <div className="grid grid-cols-3 gap-2">
                            {Object.entries(layer.metrics).map(([key, value]) => (
                              <div key={key} className={`${colors.bg} rounded p-2 text-center`}>
                                <p className={`font-mono text-lg font-bold ${colors.text}`}>{value}</p>
                                <p className="font-mono text-[10px] text-muted-foreground uppercase">{key}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </TabsContent>

          {/* Cycle Tab */}
          <TabsContent value="cycle" className="space-y-6">
            <Card className="border-primary/30">
              <CardHeader>
                <CardTitle className="font-mono text-sm flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-primary animate-spin" style={{ animationDuration: '14s' }} />
                  Self-Reinforcing Protocol Loop
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  {/* Circular Visualization */}
                  <div className="flex justify-center py-8">
                    <div className="relative w-80 h-80">
                      {/* Center */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-primary/20 border-2 border-primary/40 flex items-center justify-center">
                        <div className="text-center">
                          <Activity className="w-6 h-6 text-primary mx-auto" />
                          <p className="font-mono text-[10px] text-primary mt-1">PROTOCOL</p>
                          <p className="font-mono text-[10px] text-primary">STATE</p>
                        </div>
                      </div>
                      
                      {/* Layer Nodes */}
                      {PROTOCOL_LAYERS.map((layer, idx) => {
                        const angle = (idx * 360 / 7 - 90) * (Math.PI / 180);
                        const radius = 120;
                        const x = Math.cos(angle) * radius;
                        const y = Math.sin(angle) * radius;
                        const colors = getColorClasses(layer.color);
                        const isActive = idx === cyclePosition;
                        
                        return (
                          <div
                            key={layer.id}
                            className={`absolute w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                              isActive 
                                ? `${colors.bg} border-2 ${colors.border} scale-110` 
                                : 'bg-secondary/50 border border-border'
                            }`}
                            style={{
                              left: `calc(50% + ${x}px - 32px)`,
                              top: `calc(50% + ${y}px - 32px)`
                            }}
                          >
                            <div className="text-center">
                              <layer.icon className={`w-5 h-5 mx-auto ${isActive ? colors.text : 'text-muted-foreground'}`} />
                              <p className={`font-mono text-[8px] mt-1 ${isActive ? colors.text : 'text-muted-foreground'}`}>
                                {layer.id}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Current Layer Info */}
                  <div className="mt-4 text-center">
                    <Badge variant="outline" className={`font-mono ${getColorClasses(PROTOCOL_LAYERS[cyclePosition].color).badge}`}>
                      {PROTOCOL_LAYERS[cyclePosition].name}
                    </Badge>
                    <p className="font-mono text-xs text-muted-foreground mt-2">
                      {PROTOCOL_LAYERS[cyclePosition].classification}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Feedback Loop Explanation */}
            <Card className="border-rose-500/40 bg-rose-500/5">
              <CardHeader>
                <CardTitle className="font-mono text-sm flex items-center gap-2">
                  <GitBranch className="w-4 h-4 text-rose-400" />
                  Governance Feedback Layer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-mono text-xs text-muted-foreground mb-4">
                  The biggest upgrade: Replay informs future intent. Protocol learns from its own history.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { trigger: 'Detected Friction', result: 'Changes Policy' },
                    { trigger: 'Signer Behavior', result: 'Informs Authority' },
                    { trigger: 'Replay Analysis', result: 'Informs Mutation Trust' },
                    { trigger: 'Evidence', result: 'Evolves Protocol' }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-secondary/50 rounded p-3">
                      <p className="font-mono text-xs text-rose-400">{item.trigger}</p>
                      <ArrowRight className="w-3 h-3 text-muted-foreground my-1" />
                      <p className="font-mono text-xs text-foreground">{item.result}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Metrics Tab */}
          <TabsContent value="metrics" className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Total Layers', value: '7', icon: Layers, color: 'primary' },
                { label: 'Cycle Time', value: '266ms', icon: Activity, color: 'green-400' },
                { label: 'Feedback Loops', value: '∞', icon: RefreshCw, color: 'amber-400' },
                { label: 'Truth State', value: 'AWARE', icon: Eye, color: 'cyan-400' }
              ].map((metric) => (
                <Card key={metric.label} className="border-border">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <metric.icon className={`w-5 h-5 text-${metric.color}`} />
                      <div>
                        <p className="font-mono text-[10px] text-muted-foreground">{metric.label}</p>
                        <p className={`font-mono text-xl font-bold text-${metric.color}`}>{metric.value}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Layer Metrics Grid */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="font-mono text-sm flex items-center gap-2">
                  <Server className="w-4 h-4 text-primary" />
                  Layer Performance Matrix
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full font-mono text-xs">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 px-3 text-muted-foreground">LAYER</th>
                        <th className="text-left py-2 px-3 text-muted-foreground">CLASSIFICATION</th>
                        <th className="text-left py-2 px-3 text-muted-foreground">STATUS</th>
                        <th className="text-left py-2 px-3 text-muted-foreground">PRIMARY METRIC</th>
                      </tr>
                    </thead>
                    <tbody>
                      {PROTOCOL_LAYERS.map((layer) => {
                        const colors = getColorClasses(layer.color);
                        const primaryMetric = Object.entries(layer.metrics)[0];
                        return (
                          <tr key={layer.id} className="border-b border-border/50">
                            <td className="py-2 px-3">
                              <span className={colors.text}>{layer.id}</span>
                              <span className="text-foreground ml-2">{layer.name}</span>
                            </td>
                            <td className="py-2 px-3 text-muted-foreground">{layer.classification}</td>
                            <td className="py-2 px-3">
                              <Badge variant="outline" className={`text-[10px] ${colors.badge}`}>
                                {layer.status}
                              </Badge>
                            </td>
                            <td className="py-2 px-3">
                              <span className={colors.text}>{primaryMetric[1]}</span>
                              <span className="text-muted-foreground ml-1">{primaryMetric[0]}</span>
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
        </Tabs>

        {/* Footer */}
        <footer className="mt-8 text-center border-t border-border pt-4">
          <p className="font-mono text-xs text-muted-foreground">
            VALORAI+ PROTOCOL INTELLIGENCE STACK | CLOSED-LOOP ARCHITECTURE | {currentTime}
          </p>
        </footer>
      </main>
    </div>
  );
}

export default function ProtocolStackPage() {
  return (
    <CDSErrorBoundary module="Protocol Stack" showDetails>
      <ProtocolStackContent />
    </CDSErrorBoundary>
  );
}
