'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { 
  Shield, Clock, DollarSign, Activity, FileCode, MessageSquarePlus, 
  FileText, Mail, Zap, Flag, RefreshCw, Rocket, Radio, Brain, Ban, 
  Coins, Lock, Send, Home, Menu, X, ChevronDown, Server, MessageCircle,
  Route, FileSearch, Terminal, Layers, CircleDot
} from 'lucide-react';

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
  { href: '/route66', label: 'Route 66', icon: Route, category: 'system' },
  { href: '/route71', label: 'Route 71', icon: Route, category: 'system' },
  { href: '/protocol', label: 'Protocol', icon: Terminal, category: 'system' },
  { href: '/architecture', label: 'Architecture', icon: Layers, category: 'system' },
  { href: '/stack', label: 'Stack', icon: CircleDot, category: 'system' },
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

export function CDSHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [pulsePhase, setPulsePhase] = useState(0);

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toISOString().slice(0, 19) + 'Z');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const pulseInterval = setInterval(() => {
      setPulsePhase(p => (p + 1) % 3);
    }, 266);
    return () => clearInterval(pulseInterval);
  }, []);

  return (
    <header className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-50">
      {/* Animated top border */}
      <div className="h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse" />
      
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center overflow-hidden">
              <Shield className="w-5 h-5 text-primary relative z-10 group-hover:scale-110 transition-transform" />
              <div className="absolute inset-0 bg-primary/20 animate-pulse" />
              <div 
                className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent"
                style={{ opacity: pulsePhase === 0 ? 0.8 : 0.3, transition: 'opacity 266ms' }}
              />
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-sm font-bold tracking-wider text-foreground group-hover:text-primary transition-colors">
                CDS MASTER RECORD
              </span>
              <span className="font-mono text-xs text-muted-foreground">
                v1.2 | OMEGA-UNIFIED | 144,000D
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - Scrollable */}
          <nav className="hidden lg:flex items-center gap-1 max-w-[60vw] overflow-x-auto scrollbar-hide py-2">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-1.5 rounded-md font-mono text-xs transition-all duration-200 whitespace-nowrap',
                    isActive
                      ? 'bg-primary/20 text-primary border border-primary/40 shadow-[0_0_10px_rgba(var(--primary),0.3)]'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary/80 hover:scale-105'
                  )}
                  style={{
                    animationDelay: `${index * 50}ms`
                  }}
                >
                  <Icon className={cn("w-3.5 h-3.5", isActive && "animate-pulse")} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Live Indicator */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span className="font-mono text-xs text-primary font-medium">LIVE</span>
            </div>
            
            {/* Truth Cycle */}
            <div className="hidden md:flex items-center gap-1.5 px-2 py-1 rounded bg-secondary/50">
              <span className="font-mono text-xs text-muted-foreground">266ms</span>
              <div className="flex gap-0.5">
                {[0, 1, 2].map(i => (
                  <div 
                    key={i}
                    className={cn(
                      "w-1 h-3 rounded-full transition-all duration-200",
                      pulsePhase === i ? "bg-primary h-4" : "bg-primary/30"
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Timestamp */}
            <div className="hidden sm:block font-mono text-xs text-muted-foreground bg-secondary/30 px-2 py-1 rounded">
              {currentTime}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-md hover:bg-secondary transition-colors"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Full Screen Overlay */}
        {isMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-16 bg-background/95 backdrop-blur-md z-40 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
            <nav className="container mx-auto px-4 py-6">
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
                <span className="font-bold">HOME - CDS MASTER RECORD</span>
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
                      <div className="grid grid-cols-2 gap-2">
                        {categoryItems.map((item, index) => {
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
                              style={{
                                animationDelay: `${index * 30}ms`
                              }}
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
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-muted-foreground">
                    MERKLEROOT: 26856b24...777777
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                    </span>
                    <span className="font-mono text-xs text-primary">PERPETUAL GROOVE</span>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
