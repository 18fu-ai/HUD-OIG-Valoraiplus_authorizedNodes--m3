'use client';

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import Link from 'next/link';
import { CDSHeader } from '@/components/cds/header';
import { LayerCard } from '@/components/cds/layer-card';
import { StatsOverview } from '@/components/cds/stats-overview';
import { SystemProperties } from '@/components/cds/system-properties';
import { ProtectedNodes } from '@/components/cds/protected-nodes';
import { RuntimeBar } from '@/components/cds/runtime-bar';
import { TrustBoundary } from '@/components/cds/trust-boundary';
import { DriftMonitor } from '@/components/cds/drift-monitor';
import { HealthDomains } from '@/components/cds/health-domains';
import { SnapshotExport } from '@/components/cds/snapshot-export';
import { CDS_LAYERS, CDS_SECTIONS } from '@/lib/cds-data';
import { 
  buildDefaultMetrics, 
  computeHealthDomains, 
  computeSignals, 
  detectDrift, 
  buildRuntimeSnapshot,
  createSafeInterval,
  TRUTH_CYCLE_MS,
} from '@/lib/runtime-metrics';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, Lock, Shield, Clock, DollarSign, Mail, Brain, Radio, 
  Coins, Send, Flag, Rocket, RefreshCw, Zap, Ban, Activity, Server,
  MessageCircle, FileCode, MessageSquarePlus, Navigation, FileSearch, Terminal, Layers, CircleDot, Film, Eye,
  Fingerprint, Scale, Cpu, TrendingUp, Wallet, Monitor
} from 'lucide-react';

// Quick access modules - ALL working routes
const quickModules = [
  { href: '/timeline', label: 'Timeline', icon: Clock, color: 'text-blue-400', desc: '3,393 Events' },
  { href: '/clawback', label: 'Clawback', icon: DollarSign, color: 'text-green-400', desc: '$508M Recovery' },
  { href: '/status', label: 'Status', icon: Activity, color: 'text-teal-400', desc: 'System Health' },
  { href: '/mimecast', label: 'Mimecast', icon: Mail, color: 'text-purple-400', desc: 'Forensic Capture' },
  { href: '/dept12', label: 'Dept 12', icon: Radio, color: 'text-orange-400', desc: 'Real-Time Intel' },
  { href: '/newt', label: 'N.E.W.T.', icon: Brain, color: 'text-cyan-400', desc: 'Evolution Engine' },
  { href: '/newt/chat', label: 'Ask N.E.W.T.', icon: MessageCircle, color: 'text-cyan-300', desc: 'AI Chat' },
  { href: '/patriot', label: 'Patriot', icon: Flag, color: 'text-red-400', desc: 'Infinity Loop' },
  { href: '/token', label: '$CSSS', icon: Coins, color: 'text-yellow-400', desc: '50B Shards' },
  { href: '/transmit', label: 'HHS OCR', icon: Send, color: 'text-pink-400', desc: 'Transmission' },
  { href: '/security', label: 'Security', icon: Lock, color: 'text-emerald-400', desc: '100% Hardened' },
  { href: '/reputation', label: 'Reputation', icon: Ban, color: 'text-rose-400', desc: 'Negative Caveat' },
  { href: '/perpetual', label: 'Perpetual', icon: RefreshCw, color: 'text-indigo-400', desc: 'Groove Active' },
  { href: '/voyager', label: 'Voyager', icon: Rocket, color: 'text-amber-400', desc: 'Enterprise' },
  { href: '/trinity', label: 'Trinity', icon: Server, color: 'text-violet-400', desc: 'Rust Binary' },
  { href: '/contract', label: 'Contract', icon: FileCode, color: 'text-slate-400', desc: 'SGAU Spec' },
  { href: '/contract/chat', label: 'Create', icon: MessageSquarePlus, color: 'text-lime-400', desc: 'New Contract' },
  { href: '/uhi', label: 'UHI', icon: Zap, color: 'text-fuchsia-400', desc: 'High Income' },
  { href: '/report', label: 'Report', icon: FileText, color: 'text-sky-400', desc: 'Full Report' },
  { href: '/intelligence', label: 'Intelligence', icon: FileSearch, color: 'text-red-500', desc: 'Full Intel' },
  { href: '/route66', label: 'Route 66', icon: Navigation, color: 'text-amber-400', desc: 'Mother Road' },
  { href: '/route71', label: 'Route 71', icon: Activity, color: 'text-orange-500', desc: 'Omega-Divine' },
  { href: '/braindish', label: 'BrainDish++', icon: Cpu, color: 'text-fuchsia-500', desc: '50B Shards' },
  { href: '/protocol', label: 'Protocol', icon: Terminal, color: 'text-cyan-400', desc: 'Execution Layer' },
  { href: '/architecture', label: 'Architecture', icon: Layers, color: 'text-emerald-500', desc: 'Protocol Spec' },
  { href: '/stack', label: 'Stack', icon: CircleDot, color: 'text-rose-400', desc: 'Closed Loop' },
  { href: '/cinema', label: 'Cinema', icon: Film, color: 'text-fuchsia-500', desc: 'Presentation' },
  { href: '/invariants', label: 'Invariants', icon: Eye, color: 'text-teal-500', desc: 'Protocol Guarantees' },
  { href: '/nullifier', label: 'Nullifier', icon: Ban, color: 'text-destructive', desc: 'Ghost Null' },
  { href: '/audit', label: 'Audit', icon: Shield, color: 'text-chart-3', desc: 'Self-Audit' },
  { href: '/gate', label: 'Gate', icon: Fingerprint, color: 'text-fuchsia-400', desc: 'Identity Gating' },
  { href: '/route70', label: 'Route 70', icon: Ban, color: 'text-red-500', desc: 'Void Boundary' },
  { href: '/mint', label: 'Mint', icon: Coins, color: 'text-emerald-400', desc: 'Sovereign Mint' },
  { href: '/apex', label: 'Apex', icon: Scale, color: 'text-fuchsia-500', desc: 'Finality Monitor' },
  { href: '/valoraiplus', label: 'ValorAI+', icon: Cpu, color: 'text-fuchsia-300', desc: 'Governance Engine' },
  { href: '/maturity', label: 'Maturity', icon: Activity, color: 'text-blue-400', desc: 'System Maturity' },
  { href: '/valuation', label: 'Valuation', icon: DollarSign, color: 'text-emerald-400', desc: 'Financial Report' },
  { href: '/evaluative', label: 'Evaluative', icon: Activity, color: 'text-emerald-500', desc: 'Truth Lifecycle' },
  { href: '/investor', label: 'Investor', icon: TrendingUp, color: 'text-blue-400', desc: 'Sovereign Manifest' },
  { href: '/treasury', label: 'Treasury', icon: Wallet, color: 'text-emerald-400', desc: 'NR Protocol' },
  { href: '/automation', label: 'Automation', icon: Cpu, color: 'text-emerald-400', desc: 'Elite Engine' },
  { href: '/mainframe', label: 'Mainframe', icon: Monitor, color: 'text-cyan-400', desc: 'Unix Sovereign OS' },
  { href: '/whitepaper', label: 'White Paper', icon: FileText, color: 'text-primary', desc: 'NFT PDF' },
  { href: '/policy-engine', label: 'Policy Engine', icon: Shield, color: 'text-primary', desc: 'Deterministic' },
  { href: '/topology', label: 'Topology', icon: Server, color: 'text-emerald-400', desc: 'Node Map' },
];

// Stable random seeds for particles (avoids hydration mismatch)
const PARTICLE_SEEDS = Array.from({ length: 20 }, (_, i) => ({
  left: ((i * 37 + 13) % 100),
  top: ((i * 53 + 7) % 100),
  duration: 12 + (i % 8) * 2.5,
  delay: (i % 5) * 1.2,
}));

export default function DashboardPage() {
  const [expandedLayer, setExpandedLayer] = useState<number | null>(null);
  const [truthCycle, setTruthCycle] = useState(0);
  const [mounted, setMounted] = useState(false);
  
  // Runtime metrics state - refresh on each truth cycle to keep timestamps fresh
  const metrics = useMemo(() => buildDefaultMetrics(), [truthCycle]);
  
  // Derived state via useMemo (no re-render churn)
  const healthDomains = useMemo(() => computeHealthDomains(metrics), [metrics]);
  const signals = useMemo(() => computeSignals(metrics), [metrics]);
  const driftReport = useMemo(() => detectDrift(metrics, 'REV_38'), [metrics]);
  const snapshot = useMemo(
    () => buildRuntimeSnapshot(metrics, truthCycle),
    [metrics, truthCycle],
  );

  // Performance-safe truth cycle via RAF gating
  useEffect(() => {
    setMounted(true);
    const safeCycle = createSafeInterval(() => {
      setTruthCycle(c => c + 1);
    }, TRUTH_CYCLE_MS);
    const cleanup = safeCycle.start();
    return cleanup;
  }, []);

  const toggleLayer = useCallback((layerId: number) => {
    setExpandedLayer(prev => prev === layerId ? null : layerId);
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background — deterministic seeds for SSR safety */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(var(--primary),0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--primary),0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
        
        {mounted && PARTICLE_SEEDS.map((seed, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/30"
            style={{
              left: `${seed.left}%`,
              top: `${seed.top}%`,
              animation: `float ${seed.duration}s ease-in-out infinite`,
              animationDelay: `${seed.delay}s`,
            }}
          />
        ))}
        
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(var(--background))_70%)]" />
      </div>

      <CDSHeader />
      
      <main className="container mx-auto px-4 py-8 relative z-10" role="main">
        {/* Hero Section */}
        <section 
          className={`mb-8 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          aria-label="System overview"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Shield className="w-8 h-8 text-primary animate-pulse" aria-hidden="true" />
                  <div className="absolute inset-0 bg-primary/20 blur-xl animate-pulse" aria-hidden="true" />
                </div>
                <h1 className="font-mono text-2xl md:text-3xl font-bold text-foreground text-balance">
                  CONSOLIDATED DOCUMENT SPACE
                </h1>
              </div>
              <p className="font-mono text-sm text-muted-foreground">
                16-Sections Collapsed into Omega-Unified Forensic Black Box | ELITE PATRIOT-CLASS 200D
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2" role="list" aria-label="System status badges">
              <Badge variant="outline" className="font-mono bg-primary/10 text-primary border-primary/40 animate-pulse" role="listitem">
                OMEGA-UNIFIED
              </Badge>
              <Badge variant="outline" className="font-mono bg-status-anchored/10 text-status-anchored border-status-anchored/40" role="listitem">
                144,000D RESONANCE
              </Badge>
              <Badge variant="outline" className="font-mono bg-cyan-500/10 text-cyan-400 border-cyan-500/40" role="listitem">
                PERPETUAL GROOVE
              </Badge>
            </div>
          </div>

          {/* Runtime Bar — Backend Authority Driven */}
          <RuntimeBar className="mb-6" />

          {/* Stats Overview */}
          <StatsOverview />
        </section>

        {/* Health Domains — 4-domain separation with provenance tags */}
        <section 
          className={`mb-8 transition-all duration-700 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          aria-label="System health by domain"
        >
          <h2 className="font-mono text-lg font-bold text-foreground flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-primary" aria-hidden="true" />
            HEALTH DOMAINS
          </h2>
          <HealthDomains domains={healthDomains} />
        </section>

        {/* Quick Access Modules Grid */}
        <section 
          className={`mb-8 transition-all duration-700 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          aria-label="Quick access navigation"
        >
          <h2 className="font-mono text-lg font-bold text-foreground flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-primary" aria-hidden="true" />
            QUICK ACCESS MODULES
          </h2>
          <nav aria-label="Module navigation">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
              {quickModules.map((module) => {
                const Icon = module.icon;
                return (
                  <Link
                    key={module.href}
                    href={module.href}
                    className="group p-4 rounded-lg bg-card/50 border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(var(--primary),0.2)]"
                  >
                    <div className="flex flex-col items-center gap-2 text-center">
                      <div className={`p-2 rounded-lg bg-secondary/50 group-hover:bg-primary/20 transition-colors ${module.color}`}>
                        <Icon className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <span className="font-mono text-xs font-medium text-foreground">{module.label}</span>
                      <span className="font-mono text-[10px] text-muted-foreground">{module.desc}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </nav>
        </section>

        {/* Main Content Grid — Layers + Right Column */}
        <section 
          className={`grid grid-cols-1 lg:grid-cols-3 gap-8 transition-all duration-700 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          aria-label="Layer architecture and system status"
        >
          {/* Left Column - Layers */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-mono text-lg font-bold text-foreground flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" aria-hidden="true" />
                CDS LAYER ARCHITECTURE
              </h2>
              <span className="font-mono text-xs text-muted-foreground">
                Click to expand
              </span>
            </div>
            
            {CDS_LAYERS.map((layer) => {
              const layerSections = CDS_SECTIONS.filter(
                (section) => section.layerId === layer.id
              );
              return (
                <div key={layer.id} className="transition-all duration-500">
                  <LayerCard
                    layer={layer}
                    sections={layerSections}
                    isExpanded={expandedLayer === layer.id}
                    onToggle={() => toggleLayer(layer.id)}
                  />
                </div>
              );
            })}
          </div>

          {/* Right Column - Properties, Nodes, Trust, Drift, Snapshot */}
          <div className="space-y-6">
            <SystemProperties />
            <ProtectedNodes />
            
            {/* Trust Boundary — 3-tier reviewer-safe framing */}
            <TrustBoundary />
            
            {/* Drift Monitor — 7-signal model + event log */}
            <DriftMonitor driftReport={driftReport} signals={signals} />
            
            {/* Snapshot Export — downloadable runtime state */}
            <SnapshotExport snapshot={snapshot} />
            
            {/* Master Record Seal */}
            <Card className="border-primary/30 bg-primary/5 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent animate-pulse" aria-hidden="true" />
              <CardHeader className="pb-3 relative">
                <CardTitle className="font-mono text-sm flex items-center gap-2">
                  <Lock className="w-4 h-4 text-primary animate-pulse" aria-hidden="true" />
                  MASTER RECORD SEAL
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 relative">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-muted-foreground">MERKLEROOT</span>
                    <span className="text-primary font-medium truncate max-w-[180px]">
                      26856b24c50750f0c69c1eeb86a69ef777777
                    </span>
                  </div>
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-muted-foreground">NODE</span>
                    <span className="text-foreground">SAINT PAUL 55116</span>
                  </div>
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-muted-foreground">CONFIRMATIONS</span>
                    <span className="text-foreground">INFINITY</span>
                  </div>
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-muted-foreground">MODE</span>
                    <span className="text-cyan-400">PERPETUAL GROOVE</span>
                  </div>
                </div>
                
                <div className="pt-3 border-t border-primary/20">
                  <p className="font-mono text-xs text-center text-primary font-medium animate-pulse">
                    DG77.77X LOCKED | INFINITY D ACTIVE
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* N.E.W.T. Status */}
            <Card className="border-cyan-500/30 bg-cyan-500/5 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent" aria-hidden="true" />
              <CardHeader className="pb-3 relative">
                <CardTitle className="font-mono text-sm flex items-center gap-2">
                  <Brain className="w-4 h-4 text-cyan-400 animate-pulse" aria-hidden="true" />
                  N.E.W.T. STATUS
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 relative">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-muted-foreground">VERSION</span>
                  <span className="text-cyan-400">//e v2.1 TRANSCENDENT</span>
                </div>
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-muted-foreground">STATE</span>
                  <span className="text-foreground">SOVEREIGN AUDITOR</span>
                </div>
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-muted-foreground">GROOVE</span>
                  <span className="text-primary">PERPETUAL</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Operational Matrix */}
        <section 
          className={`mt-8 transition-all duration-700 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          aria-label="Operational integrity matrix"
        >
          <Card className="border-border bg-card/50 overflow-hidden">
            <CardHeader className="pb-3">
              <CardTitle className="font-mono text-sm">
                CDS OPERATIONAL INTEGRITY MATRIX
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto" role="region" aria-label="Layer status table" tabIndex={0}>
                <table className="w-full font-mono text-sm">
                  <thead>
                    <tr className="border-b border-border bg-secondary/30">
                      <th scope="col" className="text-left p-3 text-muted-foreground font-medium">LAYER</th>
                      <th scope="col" className="text-left p-3 text-muted-foreground font-medium">SECTIONS</th>
                      <th scope="col" className="text-left p-3 text-muted-foreground font-medium">STATUS</th>
                      <th scope="col" className="text-left p-3 text-muted-foreground font-medium">SOVEREIGN EFFECT</th>
                    </tr>
                  </thead>
                  <tbody>
                    {CDS_LAYERS.map((layer) => (
                      <tr 
                        key={layer.id} 
                        className="border-b border-border/50 hover:bg-secondary/20 transition-colors"
                      >
                        <td className="p-3 text-foreground">{layer.name}</td>
                        <td className="p-3 text-muted-foreground">{layer.sections[0]} - {layer.sections[layer.sections.length - 1]}</td>
                        <td className="p-3">
                          <Badge 
                            variant="outline" 
                            className={`font-mono text-xs ${
                              layer.status === 'ANCHORED' ? 'bg-status-anchored/20 text-status-anchored border-status-anchored/40' :
                              layer.status === 'SATURATED' ? 'bg-status-saturated/20 text-status-saturated border-status-saturated/40' :
                              layer.status === 'ACTIVE' ? 'bg-status-active/20 text-status-active border-status-active/40' :
                              'bg-status-locked/20 text-status-locked border-status-locked/40'
                            }`}
                          >
                            {layer.status}
                          </Badge>
                        </td>
                        <td className="p-3 text-muted-foreground">{layer.sovereignEffect}</td>
                      </tr>
                    ))}
                    <tr className="bg-primary/5">
                      <td className="p-3 text-primary font-bold">TOTAL</td>
                      <td className="p-3 text-primary">16</td>
                      <td className="p-3">
                        <Badge variant="outline" className="font-mono text-xs bg-primary/20 text-primary border-primary/40 animate-pulse">
                          UNIFIED
                        </Badge>
                      </td>
                      <td className="p-3 text-primary font-bold">OMEGA-ZERO FINALITY</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 py-6 mt-8 relative z-10" role="contentinfo">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <p className="font-mono text-xs text-muted-foreground">
                CDS MASTER RECORD IS CANONICAL | THE WALL IS CHRIST | SMIB
              </p>
              <Badge variant="outline" className="font-mono text-[10px] bg-primary/10 text-primary border-primary/30">
                MADE IN THE USA
              </Badge>
            </div>
            <div className="flex items-center gap-4">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <p className="font-mono text-xs text-primary">
                PERPETUAL GROOVE ACTIVE
              </p>
              <p className="font-mono text-xs text-muted-foreground">
                REV_38
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
          25% { transform: translateY(-20px) translateX(10px); opacity: 0.6; }
          50% { transform: translateY(-10px) translateX(-10px); opacity: 0.4; }
          75% { transform: translateY(-30px) translateX(5px); opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
