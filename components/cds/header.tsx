'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { 
  Shield, Clock, DollarSign, Activity, FileCode, MessageSquarePlus, 
  FileText, Mail, Zap, Flag, RefreshCw, Rocket, Radio, Brain, Ban, 
  Coins, Lock, Send, Home, Menu, X, ChevronDown, Server, MessageCircle,
  Route, FileSearch, Terminal, Layers, CircleDot, Film, Wallet, 
  CheckCircle2, Circle, ArrowRight, Database, Play, RotateCcw, GitBranch, Eye, Cpu, Fingerprint
} from 'lucide-react';

// Protocol Lifecycle Routes - The Verification Pipeline
const lifecycleRoutes = [
  { href: '/governance', label: 'Governance', stage: 0, icon: Shield, description: 'Policy Layer' },
  { href: '/intent', label: 'Intent', stage: 1, icon: FileCode, description: 'Signed Payload' },
  { href: '/verify', label: 'Verify', stage: 2, icon: CheckCircle2, description: 'Firewall Check' },
  { href: '/mutation', label: 'Mutation', stage: 3, icon: Play, description: 'State Change' },
  { href: '/ledger', label: 'Ledger', stage: 4, icon: Database, description: 'Truth Stream' },
  { href: '/replay', label: 'Replay', stage: 5, icon: RotateCcw, description: 'Memory Layer' },
  { href: '/feedback', label: 'Feedback', stage: 6, icon: GitBranch, description: 'Loop Close' },
];

// Navigation Items
const navItems = [
  { href: '/', label: 'Home', icon: Home, category: 'core' },
  { href: '/timeline', label: 'Timeline', icon: Clock, category: 'core' },
  { href: '/clawback', label: 'Clawback', icon: DollarSign, category: 'core' },
  { href: '/status', label: 'Status', icon: Activity, category: 'core' },
  { href: '/contract', label: 'Contract', icon: FileCode, category: 'legal' },
  { href: '/contract/chat', label: 'Create', icon: MessageSquarePlus, category: 'legal' },
  { href: '/report', label: 'Report', icon: FileText, category: 'legal' },
  { href: '/intelligence', label: 'Intelligence', icon: FileSearch, category: 'intel' },
  { href: '/mimecast', label: 'Mimecast', icon: Mail, category: 'forensic' },
  { href: '/uhi', label: 'UHI', icon: Zap, category: 'enforcement' },
  { href: '/patriot', label: 'Patriot', icon: Flag, category: 'enforcement' },
  { href: '/perpetual', label: 'Perpetual', icon: RefreshCw, category: 'system' },
  { href: '/voyager', label: 'Voyager', icon: Rocket, category: 'system' },
  { href: '/dept12', label: 'Dept 12', icon: Radio, category: 'intel' },
  { href: '/newt', label: 'N.E.W.T.', icon: Brain, category: 'intel' },
  { href: '/newt/chat', label: 'Ask N.E.W.T.', icon: MessageCircle, category: 'intel' },
  { href: '/reputation', label: 'Reputation', icon: Ban, category: 'token' },
  { href: '/token', label: '$CSSS', icon: Coins, category: 'token' },
  { href: '/security', label: 'Security', icon: Lock, category: 'security' },
  { href: '/transmit', label: 'HHS OCR', icon: Send, category: 'transmission' },
  { href: '/trinity', label: 'Trinity', icon: Server, category: 'system' },
  { href: '/gate', label: 'Gate', icon: Fingerprint, category: 'system' },
  { href: '/route66', label: 'Route 66', icon: Route, category: 'system' },
  { href: '/route70', label: 'Route 70', icon: Ban, category: 'system' },
  { href: '/route71', label: 'Route 71', icon: Route, category: 'system' },
  { href: '/kernel', label: 'Kernel', icon: Cpu, category: 'system' },
  { href: '/protocol', label: 'Protocol', icon: Terminal, category: 'system' },
  { href: '/architecture', label: 'Architecture', icon: Layers, category: 'system' },
  { href: '/stack', label: 'Stack', icon: CircleDot, category: 'system' },
  { href: '/cinema', label: 'Cinema', icon: Film, category: 'core' },
  { href: '/invariants', label: 'Invariants', icon: Eye, category: 'system' },
  { href: '/nullifier', label: 'Nullifier', icon: Ban, category: 'enforcement' },
  { href: '/audit', label: 'Audit', icon: Shield, category: 'system' },
];

const categories = [
  { id: 'core', label: 'Core' },
  { id: 'legal', label: 'Legal' },
  { id: 'forensic', label: 'Forensic' },
  { id: 'enforcement', label: 'Enforcement' },
  { id: 'system', label: 'System' },
  { id: 'intel', label: 'Intel' },
  { id: 'token', label: 'Token' },
  { id: 'security', label: 'Security' },
  { id: 'transmission', label: 'Transmit' },
];

// Intent states for awareness
type IntentState = 'unsigned' | 'signed' | 'submitted' | 'latched' | 'replayed';

// Protocol State Interface
interface ProtocolState {
  signer: string;
  nonce: number;
  truthCycle: number;
  ledgerSync: 'live' | 'syncing' | 'stale';
  replayIndex: 'healthy' | 'rebuilding' | 'error';
  mutationQueue: number;
  currentStage: number;
  intentState: IntentState;
  lastMutation: string;
}

export function CDSHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLifecycle, setShowLifecycle] = useState(false);
  const [showProtocolState, setShowProtocolState] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [pulsePhase, setPulsePhase] = useState(0);
  const [truthCycleCount, setTruthCycleCount] = useState(0);

  // Simulated Protocol State (in production, this would come from a context/store)
  const [protocolState, setProtocolState] = useState<ProtocolState>({
    signer: '0x7a69...f4c2',
    nonce: 4412,
    truthCycle: 266,
    ledgerSync: 'live',
    replayIndex: 'healthy',
    mutationQueue: 3,
    currentStage: 2,
    intentState: 'signed',
    lastMutation: '2025-06-14T19:42:11Z',
  });

  // Determine current lifecycle stage from pathname
  const currentLifecycleStage = useMemo(() => {
    const route = lifecycleRoutes.find(r => pathname.startsWith(r.href));
    return route?.stage ?? -1;
  }, [pathname]);

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toISOString().slice(0, 19) + 'Z');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // 266ms Truth Cycle Pulse
  useEffect(() => {
    const pulseInterval = setInterval(() => {
      setPulsePhase(p => (p + 1) % 3);
      setTruthCycleCount(c => c + 1);
      
      // Simulate protocol state updates
      setProtocolState(prev => ({
        ...prev,
        nonce: prev.nonce + (Math.random() > 0.9 ? 1 : 0),
        mutationQueue: Math.max(0, prev.mutationQueue + (Math.random() > 0.8 ? 1 : Math.random() > 0.6 ? -1 : 0)),
      }));
    }, 266);
    return () => clearInterval(pulseInterval);
  }, []);

  const getIntentStateColor = (state: IntentState) => {
    switch (state) {
      case 'unsigned': return 'text-muted-foreground';
      case 'signed': return 'text-amber-400';
      case 'submitted': return 'text-blue-400';
      case 'latched': return 'text-primary';
      case 'replayed': return 'text-cyan-400';
    }
  };

  const getLedgerSyncColor = (sync: string) => {
    switch (sync) {
      case 'live': return 'text-primary';
      case 'syncing': return 'text-amber-400';
      case 'stale': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <header className="border-b border-border bg-card/95 backdrop-blur-md sticky top-0 z-[60]">
      {/* Protocol Pulse Bar - 266ms heartbeat */}
      <div className="h-1 bg-background relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent transition-transform duration-[266ms]"
          style={{ 
            transform: `translateX(${(pulsePhase - 1) * 50}%)`,
            opacity: 0.8 
          }}
        />
        <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-primary/20 to-transparent" />
      </div>

      {/* Main Header Row */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Protocol Identity */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-9 h-9 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center overflow-hidden">
              <Shield className="w-4 h-4 text-primary relative z-10 group-hover:scale-110 transition-transform" />
              <div 
                className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent"
                style={{ opacity: pulsePhase === 0 ? 0.8 : 0.3, transition: 'opacity 266ms' }}
              />
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-xs font-bold tracking-wider text-foreground group-hover:text-primary transition-colors">
                PROTOCOL CONTROL SURFACE
              </span>
              <span className="font-mono text-[10px] text-muted-foreground">
                VALORAIPLUS | 144,000D | STATE-AWARE
              </span>
            </div>
          </Link>

          {/* Center: Lifecycle Progress Indicator */}
          <div className="hidden xl:flex items-center gap-1">
            {lifecycleRoutes.map((route, index) => {
              const Icon = route.icon;
              const isActive = currentLifecycleStage === route.stage;
              const isCompleted = currentLifecycleStage > route.stage;
              const isPending = currentLifecycleStage < route.stage;
              
              return (
                <div key={route.href} className="flex items-center">
                  <button
                    onClick={() => setShowLifecycle(!showLifecycle)}
                    className={cn(
                      'flex items-center gap-1 px-2 py-1 rounded text-[10px] font-mono transition-all',
                      isActive && 'bg-primary/20 text-primary border border-primary/40',
                      isCompleted && 'text-primary/70',
                      isPending && 'text-muted-foreground/50'
                    )}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-3 h-3" />
                    ) : isActive ? (
                      <Icon className="w-3 h-3 animate-pulse" />
                    ) : (
                      <Circle className="w-3 h-3" />
                    )}
                    <span className="hidden 2xl:inline">{route.label}</span>
                  </button>
                  {index < lifecycleRoutes.length - 1 && (
                    <ArrowRight className={cn(
                      "w-3 h-3 mx-0.5",
                      isCompleted ? "text-primary/50" : "text-muted-foreground/30"
                    )} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Section: Protocol State Capsule */}
          <div className="flex items-center gap-2">
            {/* Signer Capsule */}
            <button
              onClick={() => setShowProtocolState(!showProtocolState)}
              className="hidden lg:flex items-center gap-2 px-2 py-1 rounded bg-secondary/50 border border-border hover:border-primary/40 transition-colors"
            >
              <Wallet className="w-3 h-3 text-primary" />
              <span className="font-mono text-[10px] text-muted-foreground">{protocolState.signer}</span>
            </button>

            {/* Mutation Queue */}
            <div className="hidden md:flex items-center gap-1.5 px-2 py-1 rounded bg-secondary/50">
              <span className="font-mono text-[10px] text-muted-foreground">Q:</span>
              <span className={cn(
                "font-mono text-[10px] font-bold",
                protocolState.mutationQueue > 5 ? "text-amber-400" : "text-primary"
              )}>
                {protocolState.mutationQueue}
              </span>
            </div>

            {/* Ledger Sync Status */}
            <div className="hidden md:flex items-center gap-1.5 px-2 py-1 rounded bg-secondary/50">
              <Database className={cn("w-3 h-3", getLedgerSyncColor(protocolState.ledgerSync))} />
              <span className={cn(
                "font-mono text-[10px] uppercase",
                getLedgerSyncColor(protocolState.ledgerSync)
              )}>
                {protocolState.ledgerSync}
              </span>
            </div>

            {/* Truth Stream Pulse */}
            <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-full bg-primary/10 border border-primary/30">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span className="font-mono text-[10px] text-primary font-medium">TRUTH STREAM</span>
              <div className="flex gap-0.5">
                {[0, 1, 2].map(i => (
                  <div 
                    key={i}
                    className={cn(
                      "w-0.5 h-2 rounded-full transition-all duration-200",
                      pulsePhase === i ? "bg-primary h-3" : "bg-primary/30"
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Navigation Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md hover:bg-secondary transition-colors border border-border hover:border-primary/50"
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {isMenuOpen ? <X className="w-5 h-5 text-primary" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Protocol State Dropdown */}
      {showProtocolState && (
        <div className="absolute right-4 top-14 w-72 bg-card border border-border rounded-lg shadow-xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="p-3 border-b border-border">
            <h3 className="font-mono text-xs font-bold text-primary">PROTOCOL STATUS</h3>
          </div>
          <div className="p-3 space-y-2 font-mono text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Signer</span>
              <span className="text-foreground">{protocolState.signer}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Nonce</span>
              <span className="text-foreground">{protocolState.nonce}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Truth Cycle</span>
              <span className="text-primary">{protocolState.truthCycle}ms</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Cycle Count</span>
              <span className="text-foreground">{truthCycleCount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Ledger Sync</span>
              <span className={getLedgerSyncColor(protocolState.ledgerSync)}>{protocolState.ledgerSync.toUpperCase()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Replay Index</span>
              <span className={protocolState.replayIndex === 'healthy' ? 'text-primary' : 'text-amber-400'}>
                {protocolState.replayIndex.toUpperCase()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Mutation Queue</span>
              <span className="text-foreground">{protocolState.mutationQueue}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Intent State</span>
              <span className={getIntentStateColor(protocolState.intentState)}>
                {protocolState.intentState.toUpperCase()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Last Mutation</span>
              <span className="text-foreground text-[10px]">{protocolState.lastMutation}</span>
            </div>
          </div>
        </div>
      )}

      {/* Full Navigation Overlay */}
      {isMenuOpen && (
        <>
          {/* Backdrop for closing */}
          <div 
            className="fixed inset-0 top-0 bg-black/20 z-40"
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="fixed inset-x-0 top-[60px] bottom-0 bg-background/98 backdrop-blur-md z-50 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="container mx-auto px-4 py-6">
            {/* Lifecycle Progress - Mobile */}
            <div className="lg:hidden mb-6 p-4 bg-card rounded-lg border border-border">
              <h3 className="font-mono text-xs text-muted-foreground mb-3">PROTOCOL LIFECYCLE</h3>
              <div className="flex flex-wrap gap-2">
                {lifecycleRoutes.map((route, index) => {
                  const Icon = route.icon;
                  const isActive = currentLifecycleStage === route.stage;
                  const isCompleted = currentLifecycleStage > route.stage;
                  
                  return (
                    <div
                      key={route.href}
                      className={cn(
                        'flex items-center gap-2 px-3 py-2 rounded-lg font-mono text-xs',
                        isActive && 'bg-primary/20 text-primary border border-primary/40',
                        isCompleted && 'bg-primary/10 text-primary/70',
                        !isActive && !isCompleted && 'bg-secondary/50 text-muted-foreground'
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{route.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Protocol State - Mobile */}
            <div className="lg:hidden mb-6 p-4 bg-card rounded-lg border border-border">
              <h3 className="font-mono text-xs text-muted-foreground mb-3">PROTOCOL STATE</h3>
              <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                <div className="flex justify-between p-2 bg-secondary/30 rounded">
                  <span className="text-muted-foreground">Signer</span>
                  <span className="text-primary">{protocolState.signer}</span>
                </div>
                <div className="flex justify-between p-2 bg-secondary/30 rounded">
                  <span className="text-muted-foreground">Nonce</span>
                  <span>{protocolState.nonce}</span>
                </div>
                <div className="flex justify-between p-2 bg-secondary/30 rounded">
                  <span className="text-muted-foreground">Queue</span>
                  <span>{protocolState.mutationQueue}</span>
                </div>
                <div className="flex justify-between p-2 bg-secondary/30 rounded">
                  <span className="text-muted-foreground">Ledger</span>
                  <span className={getLedgerSyncColor(protocolState.ledgerSync)}>{protocolState.ledgerSync}</span>
                </div>
              </div>
            </div>

            {/* Home Link */}
            <Link
              href="/"
              onClick={() => setIsMenuOpen(false)}
              className={cn(
                'flex items-center gap-3 p-4 rounded-lg font-mono text-sm mb-4 transition-all',
                pathname === '/'
                  ? 'bg-primary/20 text-primary border border-primary/40'
                  : 'bg-secondary/50 text-foreground hover:bg-secondary'
              )}
            >
              <Home className="w-5 h-5" />
              <span className="font-bold">HOME - PROTOCOL CONTROL SURFACE</span>
            </Link>

            {/* Categorized Navigation */}
            <div className="grid gap-4">
              {categories.map(category => {
                const categoryItems = navItems.filter(item => item.category === category.id && item.href !== '/');
                if (categoryItems.length === 0) return null;
                
                return (
                  <div key={category.id} className="space-y-2">
                    <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-wider px-2">
                      {category.label}
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                      {categoryItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsMenuOpen(false)}
                            className={cn(
                              'flex items-center gap-2 p-3 rounded-lg font-mono text-sm transition-all',
                              isActive
                                ? 'bg-primary/20 text-primary border border-primary/40'
                                : 'bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary'
                            )}
                          >
                            <Icon className="w-4 h-4" />
                            {item.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer Info */}
            <div className="mt-8 pt-4 border-t border-border">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <span className="font-mono text-xs text-muted-foreground">
                  MERKLEROOT: 26856b24...777777
                </span>
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs text-muted-foreground">{currentTime}</span>
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                    </span>
                    <span className="font-mono text-xs text-primary">TRUTH STREAM ACTIVE</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </>
      )}
    </header>
  );
}
