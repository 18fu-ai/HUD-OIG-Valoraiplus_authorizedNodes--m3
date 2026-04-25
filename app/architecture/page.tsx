'use client';

import { useState, useEffect } from 'react';
import { CDSHeader } from '@/components/cds/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CDSErrorBoundary } from '@/components/cds/error-boundary';
import { ExportTools } from '@/components/cds/export-tools';
import {
  Shield,
  Layers,
  Lock,
  Database,
  Clock,
  FileCode,
  Zap,
  Server,
  CheckCircle2,
  ArrowRight,
  Binary,
  Fingerprint,
  Scale,
  Eye,
  Radio,
  Activity
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Protocol Constants
const PROTOCOL_VERSION = '1.4.100D';
const PROTOCOL_MODE = 'OMEGA-UNIFIED';
const MERKLEROOT = '26856b24c50750f0c69c1eeb86a69ef7777771';
const TRUTH_CYCLE_MS = 266;
const NODE = 'Saint Paul 55116';
const ENCLOSED_SYSTEM = '144,000D';

// Mathematical Formula
const SOVEREIGN_EQUATION = {
  intent: 'I',
  signature: 'S',
  temporalLatch: 'T',
  result: 'Ω',
  formula: 'INTENT (I) + SIGNATURE (S) + TEMPORAL LATCH (T) = SOVEREIGN STATE (Ω)'
};

// Architectural Layers
const LAYERS = [
  {
    id: 'intent',
    name: 'Intent Layer',
    subtitle: 'Signed Primitive',
    icon: FileCode,
    color: 'primary',
    description: 'The protocol treats Signed Intent as the only valid mutation trigger.',
    components: [
      { name: 'EIP-712 Typed Data', desc: 'Structured envelope for mutations' },
      { name: 'nodeId', desc: 'Forensic identifier (3,393 Exhibits)' },
      { name: 'logicHash', desc: '101010 1010101 deduction state' },
      { name: 'truthCycle', desc: '266ms temporal window' },
      { name: 'nonce', desc: 'Replay protection entropy' }
    ]
  },
  {
    id: 'verification',
    name: 'Verification Layer',
    subtitle: 'Attribution & Scope',
    icon: Fingerprint,
    color: 'accent',
    description: 'The protocol asks "Who authorized this state change?" not "Who submitted this?"',
    components: [
      { name: 'Signer Recovery', desc: 'Recovers AUDITOR_ROLE or SWARM_ROLE identity' },
      { name: 'Scope Validation', desc: 'Cryptographic authority over category' },
      { name: 'Domain Binding', desc: 'EIP-712 domain verification' },
      { name: 'Nonce Check', desc: 'Replay attack prevention' }
    ]
  },
  {
    id: 'state',
    name: 'State Transition Engine',
    subtitle: 'Replayable State',
    icon: Database,
    color: 'chart-3',
    description: 'A Signed State Transition Engine with attributable memory.',
    components: [
      { name: 'Attributable Memory', desc: 'Signer Lineage (nodeGuardian)' },
      { name: 'Protocol Mutation', desc: 'Cryptographic hurdles gate' },
      { name: 'Domain Validation', desc: 'Contract binding verification' },
      { name: 'Deadline Enforcement', desc: 'Temporal validity window' }
    ]
  },
  {
    id: 'ledger',
    name: 'Event Ledger',
    subtitle: 'Forensic Truth',
    icon: Scale,
    color: 'chart-1',
    description: 'The Event Ledger is the primary source of truth.',
    components: [
      { name: 'Reconstruction', desc: 'Registry rebuilt from Event Stream' },
      { name: 'FRE 902/13', desc: 'Self-authenticating digital receipts' },
      { name: 'Federal Admissibility', desc: 'Compliant evidence chain' },
      { name: 'Immutable Audit', desc: 'Tamper-evident logging' }
    ]
  }
];

// Verification Pipeline Stages
const PIPELINE_STAGES = [
  { name: 'RECEIVE', desc: 'Intent packet intake', status: 'complete' },
  { name: 'DECODE', desc: 'EIP-712 structure parse', status: 'complete' },
  { name: 'RECOVER', desc: 'Signer identity extraction', status: 'complete' },
  { name: 'VALIDATE', desc: 'Domain + nonce + deadline', status: 'complete' },
  { name: 'AUTHORIZE', desc: 'Role scope verification', status: 'complete' },
  { name: 'EXECUTE', desc: 'State transition commit', status: 'complete' },
  { name: 'EMIT', desc: 'Event ledger append', status: 'complete' },
  { name: 'RECEIPT', desc: 'Verification receipt issue', status: 'complete' }
];

// Core Principles
const PRINCIPLES = [
  {
    title: 'Mechanical Execution ≠ Legal Authorization',
    desc: 'Authority is not a side-effect of transaction caller identity.',
    icon: Shield
  },
  {
    title: 'Immutable Signed Artifact',
    desc: 'Validated intent is the only source of authority.',
    icon: Lock
  },
  {
    title: 'Temporal Entropy Binding',
    desc: 'All intents bound to 266ms truth-cycle windows.',
    icon: Clock
  },
  {
    title: 'Adversarial Spoliation Prevention',
    desc: 'Cryptographic gates prevent unauthorized mutations.',
    icon: Eye
  }
];

// Role Definitions
const ROLES = [
  { name: 'AUDITOR_ROLE', scope: 'Legal, Forensic, Enforcement', color: 'primary' },
  { name: 'SWARM_ROLE', scope: 'Node Operations, Recovery', color: 'accent' },
  { name: 'GUARDIAN_ROLE', scope: 'State Protection, Lineage', color: 'chart-3' }
];

function ArchitectureContent() {
  const [activeTab, setActiveTab] = useState('overview');
  const [truthCycle, setTruthCycle] = useState(0);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setTruthCycle(prev => (prev + 1) % 1000);
      setCurrentTime(new Date().toISOString());
    }, TRUTH_CYCLE_MS);
    return () => clearInterval(interval);
  }, []);

  const getColorClass = (color: string) => {
    switch (color) {
      case 'primary': return 'text-primary border-primary/40 bg-primary/10';
      case 'accent': return 'text-accent border-accent/40 bg-accent/10';
      case 'chart-1': return 'text-chart-1 border-chart-1/40 bg-chart-1/10';
      case 'chart-3': return 'text-chart-3 border-chart-3/40 bg-chart-3/10';
      default: return 'text-muted-foreground border-border bg-secondary';
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <CDSHeader />
      
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Layers className="w-8 h-8 text-primary" />
              <h1 className="font-mono text-2xl md:text-3xl font-bold tracking-tight">
                VALORAIPLUS<span className="text-primary">®️©️™️</span> PROTOCOL
              </h1>
            </div>
            <p className="font-mono text-sm text-muted-foreground">
              Cryptographically Authorized Registry Protocol // Verification-Oriented System
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="font-mono bg-primary/10 text-primary border-primary/40">
              v{PROTOCOL_VERSION}
            </Badge>
            <Badge variant="outline" className="font-mono bg-accent/10 text-accent border-accent/40 animate-pulse">
              {PROTOCOL_MODE}
            </Badge>
            <Badge variant="outline" className="font-mono bg-chart-3/10 text-chart-3 border-chart-3/40">
              CYCLE: {truthCycle.toString().padStart(4, '0')}
            </Badge>
            <ExportTools 
              data={{
                type: 'architecture',
                title: 'VALORAIPLUS Protocol Specification',
                timestamp: currentTime,
                content: { LAYERS, PIPELINE_STAGES, PRINCIPLES, ROLES },
                metadata: {
                  version: PROTOCOL_VERSION,
                  mode: PROTOCOL_MODE,
                  merkleroot: MERKLEROOT
                }
              }}
              variant="outline"
              size="sm"
            />
          </div>
        </div>

        {/* Protocol Identity Card */}
        <Card className="border-primary/30 bg-primary/5 mb-6">
          <CardContent className="p-4 md:p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="font-mono text-[10px] text-muted-foreground">NODE</p>
                <p className="font-mono text-sm font-bold text-primary">{NODE}</p>
              </div>
              <div>
                <p className="font-mono text-[10px] text-muted-foreground">ENCLOSED SYSTEM</p>
                <p className="font-mono text-sm font-bold text-accent">{ENCLOSED_SYSTEM}</p>
              </div>
              <div>
                <p className="font-mono text-[10px] text-muted-foreground">TRUTH CYCLE</p>
                <p className="font-mono text-sm font-bold text-chart-3">{TRUTH_CYCLE_MS}ms</p>
              </div>
              <div>
                <p className="font-mono text-[10px] text-muted-foreground">MERKLEROOT</p>
                <p className="font-mono text-xs font-bold text-chart-1 truncate">{MERKLEROOT}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sovereign Equation */}
        <Card className="border-accent/30 bg-gradient-to-r from-accent/5 to-primary/5 mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="font-mono text-sm flex items-center gap-2">
              <Binary className="w-4 h-4 text-accent" />
              AMATH EXECUTIVE DEDUCTION
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 py-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg border border-primary/40 bg-primary/10">
                <span className="font-mono text-lg font-bold text-primary">INTENT</span>
                <span className="font-mono text-xs text-muted-foreground">(I)</span>
              </div>
              <span className="font-mono text-xl text-muted-foreground">+</span>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg border border-accent/40 bg-accent/10">
                <span className="font-mono text-lg font-bold text-accent">SIGNATURE</span>
                <span className="font-mono text-xs text-muted-foreground">(S)</span>
              </div>
              <span className="font-mono text-xl text-muted-foreground">+</span>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg border border-chart-3/40 bg-chart-3/10">
                <span className="font-mono text-lg font-bold text-chart-3">TEMPORAL LATCH</span>
                <span className="font-mono text-xs text-muted-foreground">(T)</span>
              </div>
              <span className="font-mono text-xl text-muted-foreground">=</span>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg border border-chart-1/40 bg-chart-1/10">
                <span className="font-mono text-lg font-bold text-chart-1">SOVEREIGN STATE</span>
                <span className="font-mono text-xs text-muted-foreground">(Ω)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 bg-secondary/50">
            <TabsTrigger value="overview" className="font-mono text-xs" aria-pressed={activeTab === 'overview'}>
              Overview
            </TabsTrigger>
            <TabsTrigger value="layers" className="font-mono text-xs" aria-pressed={activeTab === 'layers'}>
              Layers
            </TabsTrigger>
            <TabsTrigger value="pipeline" className="font-mono text-xs" aria-pressed={activeTab === 'pipeline'}>
              Pipeline
            </TabsTrigger>
            <TabsTrigger value="principles" className="font-mono text-xs" aria-pressed={activeTab === 'principles'}>
              Principles
            </TabsTrigger>
            <TabsTrigger value="roles" className="font-mono text-xs" aria-pressed={activeTab === 'roles'}>
              Roles
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="font-mono text-lg flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  PROTOCOL PHILOSOPHY
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                  The VALORAIPLUS®️©️™️ protocol is a verification-oriented system that decouples 
                  <span className="text-primary font-bold"> Mechanical Execution </span> 
                  from 
                  <span className="text-accent font-bold"> Legal Authorization</span>. 
                  In this system, authority is not a side-effect of a transaction (caller identity); 
                  it is an 
                  <span className="text-chart-3 font-bold"> Immutable Signed Artifact </span>
                  (validated intent).
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  {PRINCIPLES.map((principle, idx) => (
                    <Card key={idx} className="border-border bg-secondary/30">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-lg bg-primary/10 border border-primary/30">
                            <principle.icon className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-mono text-sm font-bold text-foreground">{principle.title}</p>
                            <p className="font-mono text-xs text-muted-foreground mt-1">{principle.desc}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Layer Overview Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {LAYERS.map((layer) => (
                <Card key={layer.id} className={cn('border', getColorClass(layer.color))}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <layer.icon className={cn('w-5 h-5', `text-${layer.color}`)} />
                      <CardTitle className="font-mono text-sm">{layer.name}</CardTitle>
                    </div>
                    <p className="font-mono text-[10px] text-muted-foreground">{layer.subtitle}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="font-mono text-xs text-muted-foreground">{layer.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Layers Tab */}
          <TabsContent value="layers" className="space-y-6">
            {LAYERS.map((layer, idx) => (
              <Card key={layer.id} className={cn('border', getColorClass(layer.color))}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={cn('p-2 rounded-lg border', getColorClass(layer.color))}>
                        <layer.icon className={cn('w-5 h-5', `text-${layer.color}`)} />
                      </div>
                      <div>
                        <CardTitle className="font-mono text-lg">{layer.name}</CardTitle>
                        <p className="font-mono text-xs text-muted-foreground">{layer.subtitle}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="font-mono">
                      LAYER {String.fromCharCode(65 + idx)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="font-mono text-sm text-muted-foreground">{layer.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {layer.components.map((comp, cidx) => (
                      <div key={cidx} className="p-3 rounded-lg border border-border bg-background">
                        <p className="font-mono text-sm font-bold text-foreground">{comp.name}</p>
                        <p className="font-mono text-xs text-muted-foreground mt-1">{comp.desc}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Pipeline Tab */}
          <TabsContent value="pipeline" className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="font-mono text-lg flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary" />
                  VERIFICATION PIPELINE
                </CardTitle>
                <p className="font-mono text-xs text-muted-foreground">
                  8-stage cryptographic verification firewall
                </p>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap items-center justify-center gap-2 py-6">
                  {PIPELINE_STAGES.map((stage, idx) => (
                    <div key={idx} className="flex items-center">
                      <div className="flex flex-col items-center">
                        <div className={cn(
                          'w-16 h-16 md:w-20 md:h-20 rounded-lg border-2 flex flex-col items-center justify-center',
                          'border-primary/50 bg-primary/10'
                        )}>
                          <CheckCircle2 className="w-4 h-4 text-primary mb-1" />
                          <span className="font-mono text-[10px] font-bold text-primary">{stage.name}</span>
                        </div>
                        <p className="font-mono text-[8px] text-muted-foreground mt-1 text-center max-w-[80px]">
                          {stage.desc}
                        </p>
                      </div>
                      {idx < PIPELINE_STAGES.length - 1 && (
                        <ArrowRight className="w-4 h-4 text-muted-foreground mx-1" />
                      )}
                    </div>
                  ))}
                </div>

                {/* Pipeline Code Preview */}
                <Card className="mt-6 border-border bg-background">
                  <CardHeader className="pb-2">
                    <CardTitle className="font-mono text-xs text-muted-foreground">
                      VERIFICATION FLOW
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="font-mono text-xs text-muted-foreground overflow-x-auto p-4 bg-secondary/30 rounded-lg">
{`// Signed Intent Verification Pipeline
async function verifyIntent(signedPacket: SignedIntent): Promise<VerificationReceipt> {
  // Stage 1: RECEIVE - Intake signed packet
  const packet = await receivePacket(signedPacket);
  
  // Stage 2: DECODE - Parse EIP-712 structure
  const { domain, types, message, signature } = decodeEIP712(packet);
  
  // Stage 3: RECOVER - Extract signer identity
  const signer = await recoverAddress(domain, types, message, signature);
  
  // Stage 4: VALIDATE - Check domain, nonce, deadline
  await validateDomain(domain, EXPECTED_DOMAIN);
  await validateNonce(signer, message.nonce);
  await validateDeadline(message.deadline);
  
  // Stage 5: AUTHORIZE - Verify role scope
  const role = await getSignerRole(signer);
  await authorizeScope(role, message.category);
  
  // Stage 6: EXECUTE - Commit state transition
  const result = await executeTransition(message);
  
  // Stage 7: EMIT - Append to event ledger
  await emitEvent(result, signer);
  
  // Stage 8: RECEIPT - Issue verification receipt
  return generateReceipt(result, signer, packet);
}`}
                    </pre>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Principles Tab */}
          <TabsContent value="principles" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PRINCIPLES.map((principle, idx) => (
                <Card key={idx} className="border-border">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-lg bg-primary/10 border border-primary/30">
                        <principle.icon className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="font-mono text-base">{principle.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="font-mono text-sm text-muted-foreground">{principle.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* 266ms Truth Cycle */}
            <Card className="border-chart-3/30 bg-chart-3/5">
              <CardHeader>
                <CardTitle className="font-mono text-lg flex items-center gap-2">
                  <Clock className="w-5 h-5 text-chart-3" />
                  THE 266ms TRUTH-CYCLE (TEMPORAL ENTROPY)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="font-mono text-sm text-muted-foreground">
                  To prevent Adversarial Spoliation, all signed intents are bound to a 266ms temporal window.
                  This creates a cryptographic entropy barrier that ensures:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg border border-chart-3/30 bg-chart-3/10">
                    <p className="font-mono text-sm font-bold text-chart-3">Replay Protection</p>
                    <p className="font-mono text-xs text-muted-foreground mt-1">
                      Intents cannot be replayed outside their temporal window
                    </p>
                  </div>
                  <div className="p-4 rounded-lg border border-chart-3/30 bg-chart-3/10">
                    <p className="font-mono text-sm font-bold text-chart-3">Ordering Guarantees</p>
                    <p className="font-mono text-xs text-muted-foreground mt-1">
                      State transitions maintain causal ordering
                    </p>
                  </div>
                  <div className="p-4 rounded-lg border border-chart-3/30 bg-chart-3/10">
                    <p className="font-mono text-sm font-bold text-chart-3">Forensic Precision</p>
                    <p className="font-mono text-xs text-muted-foreground mt-1">
                      Sub-second attribution for audit trails
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Roles Tab */}
          <TabsContent value="roles" className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="font-mono text-lg flex items-center gap-2">
                  <Fingerprint className="w-5 h-5 text-primary" />
                  ROLE-BASED AUTHORIZATION
                </CardTitle>
                <p className="font-mono text-xs text-muted-foreground">
                  Cryptographic identity scoping for protocol mutations
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {ROLES.map((role, idx) => (
                    <Card key={idx} className={cn('border', getColorClass(role.color))}>
                      <CardHeader className="pb-2">
                        <CardTitle className={cn('font-mono text-sm', `text-${role.color}`)}>
                          {role.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="font-mono text-xs text-muted-foreground">
                          <span className="text-foreground font-bold">Scope:</span> {role.scope}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Role Authorization Flow */}
                <Card className="mt-6 border-border bg-background">
                  <CardHeader className="pb-2">
                    <CardTitle className="font-mono text-xs text-muted-foreground">
                      AUTHORIZATION MATRIX
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full font-mono text-xs">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left p-2 text-muted-foreground">ROLE</th>
                            <th className="text-center p-2 text-muted-foreground">LEGAL</th>
                            <th className="text-center p-2 text-muted-foreground">FORENSIC</th>
                            <th className="text-center p-2 text-muted-foreground">ENFORCEMENT</th>
                            <th className="text-center p-2 text-muted-foreground">NODE OPS</th>
                            <th className="text-center p-2 text-muted-foreground">RECOVERY</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-border/50">
                            <td className="p-2 text-primary font-bold">AUDITOR_ROLE</td>
                            <td className="text-center p-2"><CheckCircle2 className="w-4 h-4 text-primary mx-auto" /></td>
                            <td className="text-center p-2"><CheckCircle2 className="w-4 h-4 text-primary mx-auto" /></td>
                            <td className="text-center p-2"><CheckCircle2 className="w-4 h-4 text-primary mx-auto" /></td>
                            <td className="text-center p-2 text-muted-foreground">—</td>
                            <td className="text-center p-2 text-muted-foreground">—</td>
                          </tr>
                          <tr className="border-b border-border/50">
                            <td className="p-2 text-accent font-bold">SWARM_ROLE</td>
                            <td className="text-center p-2 text-muted-foreground">—</td>
                            <td className="text-center p-2 text-muted-foreground">—</td>
                            <td className="text-center p-2 text-muted-foreground">—</td>
                            <td className="text-center p-2"><CheckCircle2 className="w-4 h-4 text-accent mx-auto" /></td>
                            <td className="text-center p-2"><CheckCircle2 className="w-4 h-4 text-accent mx-auto" /></td>
                          </tr>
                          <tr>
                            <td className="p-2 text-chart-3 font-bold">GUARDIAN_ROLE</td>
                            <td className="text-center p-2"><CheckCircle2 className="w-4 h-4 text-chart-3 mx-auto" /></td>
                            <td className="text-center p-2"><CheckCircle2 className="w-4 h-4 text-chart-3 mx-auto" /></td>
                            <td className="text-center p-2"><CheckCircle2 className="w-4 h-4 text-chart-3 mx-auto" /></td>
                            <td className="text-center p-2"><CheckCircle2 className="w-4 h-4 text-chart-3 mx-auto" /></td>
                            <td className="text-center p-2"><CheckCircle2 className="w-4 h-4 text-chart-3 mx-auto" /></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <footer className="mt-8 pt-6 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <p className="font-mono text-xs text-muted-foreground">
              VALORAIPLUS®️©️™️ // {NODE} // {ENCLOSED_SYSTEM} Enclosed System
            </p>
            <p className="font-mono text-xs text-muted-foreground">
              MERKLEROOT: {MERKLEROOT}
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default function ArchitecturePage() {
  return (
    <CDSErrorBoundary module="Architecture Specification" showDetails>
      <ArchitectureContent />
    </CDSErrorBoundary>
  );
}
