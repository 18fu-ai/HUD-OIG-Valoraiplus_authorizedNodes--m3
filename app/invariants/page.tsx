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
  Layers
} from 'lucide-react';

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

function InvariantsContent() {
  const [activeTab, setActiveTab] = useState('invariants');
  const [selectedInvariant, setSelectedInvariant] = useState<number | null>(null);
  const [cycleStep, setCycleStep] = useState(0);

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
          <TabsList className="grid w-full grid-cols-4 bg-secondary/50">
            <TabsTrigger value="invariants" className="font-mono text-xs" aria-pressed={activeTab === 'invariants'}>
              Invariants
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
