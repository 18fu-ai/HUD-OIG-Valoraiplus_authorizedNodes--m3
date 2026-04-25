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
  Eye,
  Key,
  Fingerprint,
  Database,
  RotateCcw,
  Settings,
  ArrowDown,
  RefreshCw,
  Shield,
  Zap,
  Lock,
  Activity,
  CheckCircle2,
  Layers,
  XCircle,
  AlertTriangle
} from 'lucide-react';
import {
  INVARIANT_RULES,
  runAdmissionPipeline,
  createRuntimeClaim,
  generatePolicyExport,
  type RuntimeClaim,
  type AdmissionPipelineResult
} from '@/lib/protocol/client';

// Protocol Invariants Data
const INVARIANTS = [
  {
    id: 1,
    name: 'State Is Observable',
    code: 'every mutation produces visibility',
    icon: Eye,
    color: 'primary',
    meaning: [
      'State transitions are externally inspectable',
      'Replay can reconstruct chronology',
      'Lifecycle progression is visible',
      'Attribution is preserved'
    ],
    implications: 'No hidden state changes. Every protocol mutation emits observable evidence that can be indexed, queried, and reconstructed.'
  },
  {
    id: 2,
    name: 'Authority Is Explicit',
    code: 'authorization != transaction sender',
    icon: Key,
    color: 'accent',
    meaning: [
      'Signed intent',
      'Verification rules',
      'Signer lineage',
      'Protocol roles'
    ],
    implications: 'Separates execution from authorization. The transaction submitter is not necessarily the authority - cryptographic proof determines permission.'
  },
  {
    id: 3,
    name: 'Mutation Is Deterministic',
    code: 'same input → same protocol outcome',
    icon: Fingerprint,
    color: 'chart-3',
    meaning: [
      'Reproducibility',
      'Auditability',
      'Replay integrity',
      'Predictable state transitions'
    ],
    implications: 'Given identical inputs and state, the protocol will produce identical outputs. This enables formal verification and trust.'
  },
  {
    id: 4,
    name: 'Ledger Is Canonical',
    code: 'events are truth source',
    icon: Database,
    color: 'chart-4',
    meaning: [
      'Replay reconstructs protocol memory',
      'Events become protocol chronology',
      'Indexing becomes secondary truth access'
    ],
    implications: 'The event ledger is the single source of truth. All state can be derived from replaying the event stream.'
  },
  {
    id: 5,
    name: 'Replay Is First-Class',
    code: 'replay becomes runtime memory',
    icon: RotateCcw,
    color: 'chart-5',
    meaning: [
      'State reconstruction',
      'Signer lineage validation',
      'Mutation ordering',
      'Governance introspection'
    ],
    implications: 'Replay is not debugging - it is the primary mechanism for state recovery, audit, and verification.'
  }
];

const RUNTIME_LAYERS = [
  { name: 'Frontend', role: 'visibility', icon: Eye },
  { name: 'Backend', role: 'enforcement', icon: Shield },
  { name: 'Contract', role: 'commitment', icon: Lock },
  { name: 'Ledger', role: 'memory', icon: Database },
  { name: 'Replay', role: 'reconstruction', icon: RotateCcw },
  { name: 'Governance', role: 'adaptation', icon: Settings }
];

const LIFECYCLE_FLOW = [
  'Intent',
  'Verification',
  'Mutation',
  'Ledger',
  'Replay',
  'Governance'
];

// Sample runtime claims for enforcement demonstration
const SAMPLE_CLAIMS: RuntimeClaim[] = [
  createRuntimeClaim('PLCB-001', 'Protocol Lifecycle Command Bar deployed', 'header', 'components/cds/header.tsx', 0.95, 0.92, 0.935, 'IMPLEMENTED', 'PROVEN'),
  createRuntimeClaim('EIP712-001', 'EIP-712 signature verification active', 'protocol', 'lib/protocol/eip712.ts', 0.98, 0.95, 0.965, 'IMPLEMENTED', 'PROVEN'),
  createRuntimeClaim('MC-001', 'Mimecast 142 events captured', 'forensic', 'lib/cds-data.ts', 0.99, 0.97, 0.98, 'IMPLEMENTED', 'PROVEN'),
  createRuntimeClaim('REC-001', '$508M recovery target tracked', 'financial', 'lib/cds-data.ts', 0.92, 0.89, 0.905, 'IMPLEMENTED', 'INFERRED'),
  createRuntimeClaim('AUDIT-001', 'Two-tier validation model active', 'audit', 'lib/protocol/auditEngine.ts', 0.96, 0.94, 0.95, 'IMPLEMENTED', 'PROVEN'),
  createRuntimeClaim('NULL-001', 'Ghost nullifier contract deployed', 'enforcement', 'contracts/VALORAIPLUS_NULL_GHOST.sol', 0.90, 0.85, 0.875, 'IMPLEMENTED', 'PROVEN'),
  createRuntimeClaim('STUB-001', 'Witness notification system', 'communication', undefined, 0.50, 0.45, 0.475, 'STUBBED', 'PENDING'),
  createRuntimeClaim('PLAN-001', 'Cross-chain bridge integration', 'system', undefined, 0.30, 0.25, 0.275, 'PLANNED', 'NEEDS_SOURCE'),
];

function InvariantsContent() {
  const [activeTab, setActiveTab] = useState('invariants');
  const [selectedInvariant, setSelectedInvariant] = useState<number | null>(null);
  const [cycleStep, setCycleStep] = useState(0);
  const [pipelineResult, setPipelineResult] = useState<AdmissionPipelineResult | null>(null);

  // Run admission pipeline on mount
  useEffect(() => {
    const result = runAdmissionPipeline(SAMPLE_CLAIMS);
    setPipelineResult(result);
  }, []);

  // Animate lifecycle flow
  useEffect(() => {
    const interval = setInterval(() => {
      setCycleStep(prev => (prev + 1) % (LIFECYCLE_FLOW.length + 1));
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const getColorClass = (color: string) => {
    const colors: Record<string, { bg: string; text: string; border: string }> = {
      'primary': { bg: 'bg-primary/10', text: 'text-primary', border: 'border-primary/40' },
      'accent': { bg: 'bg-accent/10', text: 'text-accent', border: 'border-accent/40' },
      'chart-3': { bg: 'bg-chart-3/10', text: 'text-chart-3', border: 'border-chart-3/40' },
      'chart-4': { bg: 'bg-chart-4/10', text: 'text-chart-4', border: 'border-chart-4/40' },
      'chart-5': { bg: 'bg-chart-5/10', text: 'text-chart-5', border: 'border-chart-5/40' }
    };
    return colors[color] || colors['primary'];
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <CDSHeader />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="font-mono text-2xl md:text-3xl font-bold text-foreground">
                Protocol Invariants
              </h1>
              <p className="font-mono text-sm text-muted-foreground mt-1">
                Self-Reconstructing Verification Runtime
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="font-mono bg-primary/10 text-primary border-primary/40">
                PROTOCOL_GUARANTEES
              </Badge>
              <Badge variant="outline" className="font-mono bg-chart-3/10 text-chart-3 border-chart-3/40 animate-pulse">
                RUNTIME_ACTIVE
              </Badge>
              <ExportTools 
                data={{
                  type: 'protocol',
                  title: 'VALORAIPLUS Protocol Invariants',
                  timestamp: new Date().toISOString(),
                  content: { invariants: INVARIANTS, layers: RUNTIME_LAYERS },
                  metadata: { classification: 'Self-Reconstructing Verification Runtime' }
                }}
                variant="outline"
                size="sm"
              />
            </div>
          </div>
        </div>

        {/* Protocol Equation Banner */}
        <Card className="mb-8 border-primary/30 bg-gradient-to-r from-primary/5 via-background to-accent/5">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="font-mono text-xs text-muted-foreground mb-2">HIGHEST-LEVEL CLASSIFICATION</p>
              <p className="font-mono text-xl md:text-2xl font-bold text-primary">
                Protocol Runtime with Observable State
              </p>
              <p className="font-mono text-sm text-muted-foreground mt-2">
                The architecture is defined by protocol invariants, not technology choices
              </p>
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-secondary/50">
            <TabsTrigger value="invariants" className="font-mono text-xs" aria-pressed={activeTab === 'invariants'}>
              Invariants
            </TabsTrigger>
            <TabsTrigger value="enforcement" className="font-mono text-xs" aria-pressed={activeTab === 'enforcement'}>
              Enforcement
            </TabsTrigger>
            <TabsTrigger value="runtime" className="font-mono text-xs" aria-pressed={activeTab === 'runtime'}>
              Runtime
            </TabsTrigger>
            <TabsTrigger value="lifecycle" className="font-mono text-xs" aria-pressed={activeTab === 'lifecycle'}>
              Lifecycle
            </TabsTrigger>
            <TabsTrigger value="compression" className="font-mono text-xs" aria-pressed={activeTab === 'compression'}>
              Compression
            </TabsTrigger>
          </TabsList>

          {/* Invariants Tab */}
          <TabsContent value="invariants" className="space-y-6">
            <div className="grid gap-4">
              {INVARIANTS.map((invariant) => {
                const Icon = invariant.icon;
                const colors = getColorClass(invariant.color);
                const isSelected = selectedInvariant === invariant.id;
                
                return (
                  <Card 
                    key={invariant.id}
                    className={`cursor-pointer transition-all duration-300 ${colors.border} ${isSelected ? colors.bg : 'hover:bg-secondary/30'}`}
                    onClick={() => setSelectedInvariant(isSelected ? null : invariant.id)}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg ${colors.bg} border ${colors.border} flex items-center justify-center`}>
                            <Icon className={`w-5 h-5 ${colors.text}`} />
                          </div>
                          <div>
                            <CardTitle className="font-mono text-lg">
                              {invariant.id}. {invariant.name}
                            </CardTitle>
                            <code className={`font-mono text-xs ${colors.text}`}>
                              {invariant.code}
                            </code>
                          </div>
                        </div>
                        <Badge variant="outline" className={`font-mono text-xs ${colors.border} ${colors.text}`}>
                          INVARIANT_{invariant.id}
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    {isSelected && (
                      <CardContent className="pt-4 border-t border-border/50">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <p className="font-mono text-xs text-muted-foreground mb-2">MEANING</p>
                            <ul className="space-y-1">
                              {invariant.meaning.map((item, idx) => (
                                <li key={idx} className="flex items-center gap-2">
                                  <CheckCircle2 className={`w-3 h-3 ${colors.text}`} />
                                  <span className="font-mono text-sm">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="font-mono text-xs text-muted-foreground mb-2">IMPLICATIONS</p>
                            <p className="font-mono text-sm text-muted-foreground">
                              {invariant.implications}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Enforcement Tab - Machine-Enforced Runtime */}
          <TabsContent value="enforcement" className="space-y-6">
            {pipelineResult && (
              <>
                {/* Pipeline Status Banner */}
                <Card className={`border-2 ${
                  pipelineResult.pipelineStatus === 'HEALTHY' ? 'border-emerald-500/50 bg-emerald-500/5' :
                  pipelineResult.pipelineStatus === 'DEGRADED' ? 'border-amber-500/50 bg-amber-500/5' :
                  'border-red-500/50 bg-red-500/5'
                }`}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          pipelineResult.pipelineStatus === 'HEALTHY' ? 'bg-emerald-500/20' :
                          pipelineResult.pipelineStatus === 'DEGRADED' ? 'bg-amber-500/20' :
                          'bg-red-500/20'
                        }`}>
                          {pipelineResult.pipelineStatus === 'HEALTHY' ? (
                            <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                          ) : pipelineResult.pipelineStatus === 'DEGRADED' ? (
                            <AlertTriangle className="w-6 h-6 text-amber-400" />
                          ) : (
                            <XCircle className="w-6 h-6 text-red-400" />
                          )}
                        </div>
                        <div>
                          <p className="font-mono text-lg font-bold">
                            Pipeline Status: {pipelineResult.pipelineStatus}
                          </p>
                          <p className="font-mono text-xs text-muted-foreground">
                            Machine-Enforced Verification Runtime
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline" className={`font-mono ${
                        pipelineResult.pipelineStatus === 'HEALTHY' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' :
                        pipelineResult.pipelineStatus === 'DEGRADED' ? 'bg-amber-500/20 text-amber-400 border-amber-500/40' :
                        'bg-red-500/20 text-red-400 border-red-500/40'
                      }`}>
                        {pipelineResult.pipelineStatus}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Admission Statistics */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  <Card className="border-primary/30">
                    <CardContent className="p-3 text-center">
                      <p className="font-mono text-[10px] text-muted-foreground">TOTAL CLAIMS</p>
                      <p className="font-mono text-xl font-bold text-primary">{pipelineResult.totalClaims}</p>
                    </CardContent>
                  </Card>
                  <Card className="border-emerald-500/30 bg-emerald-500/5">
                    <CardContent className="p-3 text-center">
                      <p className="font-mono text-[10px] text-muted-foreground">ADMITTED</p>
                      <p className="font-mono text-xl font-bold text-emerald-400">{pipelineResult.admitted}</p>
                    </CardContent>
                  </Card>
                  <Card className="border-red-500/30 bg-red-500/5">
                    <CardContent className="p-3 text-center">
                      <p className="font-mono text-[10px] text-muted-foreground">BLOCKED</p>
                      <p className="font-mono text-xl font-bold text-red-400">{pipelineResult.blocked}</p>
                    </CardContent>
                  </Card>
                  <Card className="border-amber-500/30 bg-amber-500/5">
                    <CardContent className="p-3 text-center">
                      <p className="font-mono text-[10px] text-muted-foreground">WARNED</p>
                      <p className="font-mono text-xl font-bold text-amber-400">{pipelineResult.warned}</p>
                    </CardContent>
                  </Card>
                  <Card className="border-chart-3/30 bg-chart-3/5">
                    <CardContent className="p-3 text-center">
                      <p className="font-mono text-[10px] text-muted-foreground">EXPORT ELIGIBLE</p>
                      <p className="font-mono text-xl font-bold text-chart-3">{pipelineResult.exportEligible}</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Admission Pipeline Model */}
                <Card className="border-primary/30">
                  <CardHeader className="pb-2">
                    <CardTitle className="font-mono text-sm flex items-center gap-2">
                      <Zap className="w-4 h-4 text-primary" />
                      Runtime Admission Model
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap items-center justify-center gap-2 py-4">
                      {['Claim', 'Evidence', 'Proof', 'Validation', 'Invariant', 'Policy', 'Visibility'].map((step, idx, arr) => (
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
                    <p className="font-mono text-xs text-muted-foreground text-center mt-2">
                      visibility = consequence of enforcement (not storage)
                    </p>
                  </CardContent>
                </Card>

                {/* Invariant Health */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="font-mono text-sm flex items-center gap-2">
                      <Shield className="w-4 h-4 text-primary" />
                      Invariant Health Matrix
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {INVARIANT_RULES.map(rule => {
                        const violations = pipelineResult.violationLedger.violations.filter(
                          v => v.invariantId === rule.id
                        ).length;
                        const passRate = pipelineResult.totalClaims > 0
                          ? ((pipelineResult.totalClaims - violations) / pipelineResult.totalClaims * 100)
                          : 100;
                        
                        return (
                          <div key={rule.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border">
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded flex items-center justify-center ${
                                violations === 0 ? 'bg-emerald-500/20' : rule.enforcement === 'HARD' ? 'bg-red-500/20' : 'bg-amber-500/20'
                              }`}>
                                {violations === 0 ? (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                ) : rule.enforcement === 'HARD' ? (
                                  <XCircle className="w-4 h-4 text-red-400" />
                                ) : (
                                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                                )}
                              </div>
                              <div>
                                <p className="font-mono text-sm font-bold">{rule.name}</p>
                                <p className="font-mono text-xs text-muted-foreground">{rule.enforcement} enforcement</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="text-right">
                                <p className="font-mono text-sm">{violations} violations</p>
                                <p className="font-mono text-xs text-muted-foreground">{passRate.toFixed(1)}% pass rate</p>
                              </div>
                              <Badge variant="outline" className={`font-mono text-xs ${
                                violations === 0 ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' :
                                rule.enforcement === 'HARD' ? 'bg-red-500/20 text-red-400 border-red-500/40' :
                                'bg-amber-500/20 text-amber-400 border-amber-500/40'
                              }`}>
                                {violations === 0 ? 'PASSING' : rule.enforcement === 'HARD' ? 'BLOCKING' : 'WARNING'}
                              </Badge>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* Claim Admission Results */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="font-mono text-sm flex items-center gap-2">
                      <Database className="w-4 h-4 text-primary" />
                      Claim Admission Ledger
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full font-mono text-xs">
                        <thead>
                          <tr className="border-b border-border text-left">
                            <th className="p-2 text-muted-foreground">Claim ID</th>
                            <th className="p-2 text-muted-foreground">Statement</th>
                            <th className="p-2 text-muted-foreground text-right">Validation</th>
                            <th className="p-2 text-muted-foreground text-center">Admission</th>
                            <th className="p-2 text-muted-foreground text-center">Export</th>
                          </tr>
                        </thead>
                        <tbody>
                          {pipelineResult.results.map(result => (
                            <tr key={result.claim.id} className="border-b border-border/50 hover:bg-muted/30">
                              <td className="p-2 text-foreground">{result.claim.id}</td>
                              <td className="p-2 text-foreground max-w-[200px] truncate">{result.claim.statement}</td>
                              <td className="p-2 text-right">{result.claim.validationScore.toFixed(3)}</td>
                              <td className="p-2 text-center">
                                <Badge variant="outline" className={`text-[10px] ${
                                  result.admissionStatus === 'ADMITTED' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' :
                                  result.admissionStatus === 'WARNED' ? 'bg-amber-500/20 text-amber-400 border-amber-500/40' :
                                  'bg-red-500/20 text-red-400 border-red-500/40'
                                }`}>
                                  {result.admissionStatus}
                                </Badge>
                              </td>
                              <td className="p-2 text-center">
                                {result.exportEligible ? (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" />
                                ) : (
                                  <XCircle className="w-4 h-4 text-red-400 mx-auto" />
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                {/* Core Principle */}
                <Card className="border-chart-3/30 bg-chart-3/5">
                  <CardContent className="p-6 text-center">
                    <p className="font-mono text-xs text-muted-foreground mb-2">CORE PRINCIPLE</p>
                    <p className="font-mono text-lg font-bold text-chart-3">
                      claims must earn visibility
                    </p>
                    <p className="font-mono text-xs text-muted-foreground mt-2">
                      The runtime decides what is permitted to exist as valid output
                    </p>
                  </CardContent>
                </Card>
              </>
            )}
          </TabsContent>

          {/* Runtime Tab */}
          <TabsContent value="runtime" className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="font-mono text-lg flex items-center gap-2">
                  <Layers className="w-5 h-5 text-primary" />
                  Protocol Runtime Abstraction
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-mono text-sm text-muted-foreground mb-6">
                  The entire system compresses into a single abstraction: Protocol Runtime
                </p>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {RUNTIME_LAYERS.map((layer, idx) => {
                    const Icon = layer.icon;
                    return (
                      <Card key={idx} className="border-border bg-secondary/20">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
                              <Icon className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-mono text-sm font-bold">{layer.name}</p>
                              <p className="font-mono text-xs text-muted-foreground">= {layer.role}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Layer Mapping */}
            <Card className="border-primary/30">
              <CardHeader>
                <CardTitle className="font-mono text-lg">Layer Mapping</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className="font-mono w-24 justify-center">Header</Badge>
                    <span className="font-mono text-sm text-muted-foreground">=</span>
                    <span className="font-mono text-sm">Protocol Brainstem (tracks state, cadence, health)</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className="font-mono w-24 justify-center">Pages</Badge>
                    <span className="font-mono text-sm text-muted-foreground">=</span>
                    <span className="font-mono text-sm">Functional Organs (lifecycle-specific operations)</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className="font-mono w-24 justify-center">Backend</Badge>
                    <span className="font-mono text-sm text-muted-foreground">=</span>
                    <span className="font-mono text-sm">Verification Cortex (intent validation, receipts)</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className="font-mono w-24 justify-center">Contract</Badge>
                    <span className="font-mono text-sm text-muted-foreground">=</span>
                    <span className="font-mono text-sm">Mutation Spine (state transitions)</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className="font-mono w-24 justify-center">Ledger</Badge>
                    <span className="font-mono text-sm text-muted-foreground">=</span>
                    <span className="font-mono text-sm">Memory Stream (event indexing)</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className="font-mono w-24 justify-center">Replay</Badge>
                    <span className="font-mono text-sm text-muted-foreground">=</span>
                    <span className="font-mono text-sm">Historical Recall (auditability)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Lifecycle Tab */}
          <TabsContent value="lifecycle" className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="font-mono text-lg flex items-center gap-2">
                  <RefreshCw className="w-5 h-5 text-primary" />
                  System Compression Model
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center py-8">
                  {LIFECYCLE_FLOW.map((step, idx) => {
                    const isActive = cycleStep === idx;
                    const isPast = cycleStep > idx;
                    const isLast = idx === LIFECYCLE_FLOW.length - 1;
                    
                    return (
                      <div key={step} className="flex flex-col items-center">
                        <div className={`
                          px-6 py-3 rounded-lg font-mono text-sm font-bold transition-all duration-300
                          ${isActive 
                            ? 'bg-primary text-primary-foreground scale-110' 
                            : isPast 
                            ? 'bg-chart-3/20 text-chart-3 border border-chart-3/40' 
                            : 'bg-secondary/50 text-muted-foreground border border-border'}
                        `}>
                          {step}
                        </div>
                        {!isLast && (
                          <ArrowDown className={`w-5 h-5 my-2 ${isPast ? 'text-chart-3' : 'text-muted-foreground/50'}`} />
                        )}
                        {isLast && (
                          <div className="flex items-center gap-2 mt-4">
                            <RefreshCw className={`w-5 h-5 ${cycleStep === LIFECYCLE_FLOW.length ? 'text-primary animate-spin' : 'text-muted-foreground/50'}`} />
                            <span className="font-mono text-xs text-muted-foreground">(feedback loop)</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                
                <div className="text-center mt-6 border-t border-border pt-6">
                  <p className="font-mono text-xs text-muted-foreground mb-2">ARCHITECTURAL INSIGHT</p>
                  <p className="font-mono text-sm text-foreground">
                    Everything else becomes implementation detail.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Compression Tab */}
          <TabsContent value="compression" className="space-y-6">
            <Card className="border-chart-3/30 bg-chart-3/5">
              <CardHeader>
                <CardTitle className="font-mono text-lg text-chart-3">Most Important Insight</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-mono text-sm text-muted-foreground mb-4">
                  The strongest property in this model is not immutability. It is:
                </p>
                <div className="bg-background rounded-lg p-6 border border-chart-3/30 text-center">
                  <code className="font-mono text-2xl font-bold text-chart-3">
                    protocol continuity
                  </code>
                </div>
                <div className="mt-6 space-y-2">
                  <p className="font-mono text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-chart-3" />
                    Every layer speaks the same lifecycle
                  </p>
                  <p className="font-mono text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-chart-3" />
                    Every layer exposes the same state model
                  </p>
                  <p className="font-mono text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-chart-3" />
                    Every layer contributes to replayability
                  </p>
                  <p className="font-mono text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-chart-3" />
                    Every layer reinforces attribution
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/30">
              <CardHeader>
                <CardTitle className="font-mono text-lg">Why This Architecture Is Cohesive</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-mono text-sm text-muted-foreground mb-4">
                  Because the same language repeats everywhere:
                </p>
                <div className="flex flex-wrap gap-2">
                  {['intent', 'verification', 'mutation', 'ledger', 'replay', 'feedback'].map((word) => (
                    <Badge key={word} variant="outline" className="font-mono bg-primary/10 text-primary border-primary/40">
                      {word}
                    </Badge>
                  ))}
                </div>
                <p className="font-mono text-sm text-muted-foreground mt-6">
                  The files are not merely related. They are expressing a shared runtime model.
                  That is what gives the architecture conceptual integrity.
                </p>
              </CardContent>
            </Card>

            {/* Classification Upgrade */}
            <Card className="border-accent/30">
              <CardHeader>
                <CardTitle className="font-mono text-lg">Classification Upgrade</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="font-mono text-xs text-muted-foreground mb-2">INSTEAD OF:</p>
                    <code className="font-mono text-sm text-muted-foreground line-through">
                      App + Backend + Contract
                    </code>
                  </div>
                  <div>
                    <p className="font-mono text-xs text-muted-foreground mb-2">YOU NOW HAVE:</p>
                    <code className="font-mono text-lg font-bold text-primary">
                      Protocol Runtime with Observable State
                    </code>
                  </div>
                  <div>
                    <p className="font-mono text-xs text-muted-foreground mb-2">OR MORE PRECISELY:</p>
                    <code className="font-mono text-lg font-bold text-chart-3">
                      Self-Reconstructing Verification Runtime
                    </code>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-secondary/20 mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-mono text-xs text-muted-foreground">
              VALORAIPLUS Protocol Invariants | Self-Reconstructing Verification Runtime
            </p>
            <div className="flex items-center gap-2">
              <Activity className="w-3 h-3 text-chart-3 animate-pulse" />
              <span className="font-mono text-xs text-chart-3">PROTOCOL_CONTINUITY_ACTIVE</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function InvariantsPage() {
  return (
    <CDSErrorBoundary module="Protocol Invariants" showDetails>
      <InvariantsContent />
    </CDSErrorBoundary>
  );
}
