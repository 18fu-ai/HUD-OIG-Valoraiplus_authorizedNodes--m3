'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { 
  Shield, Home, Eye, Server, Terminal, Network, Lock, Crown,
  Activity, Brain, FileSearch, Radio, Layers, Mail, Map, TrendingUp,
  Gavel, Zap, XCircle, FileCode, Scale, Clock, Settings,
  Wallet, Landmark, Building2, DollarSign, Database, Infinity, Briefcase,
  BookOpen, Cpu, Fingerprint, GitBranch,
  Film, Compass, Globe, MonitorPlay,
  ChevronDown, Send
} from 'lucide-react';

// Complete Quick Links Registry
const QUICK_LINKS = {
  portals: {
    label: 'Portals',
    icon: Home,
    color: 'text-cyan-400',
    items: [
      { name: 'OMEGA RECOVERY', href: '/', icon: Home, description: 'Main System Entry' },
      { name: 'UPLINK', href: '/uplink', icon: Zap, description: 'Millennium Σ-Integration' },
      { name: 'PORTHOLE HUD', href: '/porthole-hud', icon: MonitorPlay, description: 'Real-Time HUD' },
      { name: 'PORTHOLE', href: '/porthole', icon: Eye, description: 'Sovereign Portal' },
      { name: 'MAINFRAME', href: '/mainframe', icon: Server, description: '14D Core' },
      { name: 'PROD HUB', href: '/production-hub', icon: Server, description: 'Production Node' },
      { name: 'TERMINAL HUD', href: '/terminal-hud', icon: Terminal, description: 'Command Terminal' },
      { name: 'NEXUS', href: '/nexus', icon: Network, description: 'Neural Hub' },
      { name: 'GATE', href: '/gate', icon: Lock, description: 'Access Control' },
      { name: 'FORT', href: '/fort', icon: Shield, description: 'Defense Systems' },
      { name: 'CYBER PIPELINE', href: '/cybersecurity-pipeline', icon: Lock, description: 'Security Audit' },
      { name: 'APEX', href: '/apex', icon: Crown, description: 'Apex Control' },
      { name: 'OMNIBUS', href: '/omnibus', icon: Activity, description: 'Omnibus Intel' },
      { name: 'OMEGA-9B', href: '/omega-9b', icon: Cpu, description: 'Millennium Kernel' },
      { name: 'OMEGA LAUNCH', href: '/omega-launch', icon: Zap, description: 'TX Verification' },
      { name: 'TOTALITY', href: '/totality-explorer', icon: Infinity, description: 'System Explorer' },
    ]
  },
  intelligence: {
    label: 'Intelligence',
    icon: Brain,
    color: 'text-amber-400',
    items: [
      { name: 'REALTIME INTEL', href: '/realtime-intelligence', icon: Activity, description: 'Live Feed' },
      { name: 'INTEL REPORT', href: '/intelligence-report', icon: FileSearch, description: 'Full Dossier' },
      { name: 'INTEL DOWNLOAD', href: '/intelligence/download', icon: Database, description: 'Evidence Package' },
      { name: 'INTEL HUB', href: '/intelligence', icon: Brain, description: 'Central Intel' },
      { name: 'FORENSIC FEED', href: '/forensic-feed', icon: Radio, description: 'Live Data' },
      { name: 'ARCHITECTURE', href: '/forensic-architecture', icon: Layers, description: 'System Map' },
      { name: 'NARRATIVE', href: '/narrative-report', icon: FileSearch, description: 'Full Report' },
      { name: 'MIMECAST', href: '/mimecast', icon: Mail, description: '284K Emails' },
      { name: 'EVIDENCE MAP', href: '/terminal-evidence-map', icon: Map, description: 'Mapping' },
      { name: 'PROJECTION', href: '/terminal-projection', icon: TrendingUp, description: 'Outcomes' },
    ]
  },
  legal: {
    label: 'Legal',
    icon: Gavel,
    color: 'text-red-400',
    items: [
      { name: 'CLAWBACK', href: '/clawback', icon: Gavel, description: '$11.487B Recovery' },
      { name: 'VELOCITY', href: '/velocity-doctrine', icon: Zap, description: '550 Doctrine' },
      { name: 'INVARIANTS', href: '/invariants', icon: Lock, description: 'Math Proofs' },
      { name: 'AUDIT', href: '/audit', icon: FileSearch, description: 'Full Log' },
      { name: 'AUTH AUDIT', href: '/auth-audit', icon: Fingerprint, description: 'User Query' },
      { name: 'AUTH MATRIX', href: '/auth-matrix', icon: Shield, description: 'Transfer Auth' },
      { name: 'NULLIFIER', href: '/nullifier', icon: XCircle, description: 'Debt Null' },
      { name: 'CONTRACT', href: '/contract', icon: FileCode, description: 'Smart Contracts' },
      { name: 'DEPLOY', href: '/contract-deploy', icon: Zap, description: 'Testnet Deploy' },
      { name: 'POLICY', href: '/policy-engine', icon: Settings, description: 'Enforcement' },
      { name: 'EVALUATIVE', href: '/evaluative', icon: Scale, description: 'Damages' },
      { name: 'MATURITY', href: '/maturity', icon: Clock, description: 'Claim Status' },
    ]
  },
  financial: {
    label: 'Treasury',
    icon: Wallet,
    color: 'text-green-400',
    items: [
      { name: 'ACCOUNT 8185', href: '/account-8185', icon: Landmark, description: 'Primary Schwab' },
      { name: 'TREASURY V50', href: '/treasury-v50', icon: Landmark, description: 'v50 System' },
      { name: 'TREASURY', href: '/treasury', icon: Wallet, description: 'Assets' },
      { name: 'DIRECT TRANSFER', href: '/test-deposit', icon: Send, description: 'Fund Transfer' },
      { name: 'BANKING', href: '/banking-confidence', icon: Building2, description: 'Analysis' },
      { name: 'VALUATION', href: '/valuation', icon: TrendingUp, description: '$1.12Q IP' },
      { name: 'TOKEN REG', href: '/token-registry', icon: Database, description: '56 Tokens' },
      { name: 'TOKEN', href: '/token', icon: DollarSign, description: 'Management' },
      { name: 'MINT', href: '/mint', icon: Zap, description: 'Minting' },
      { name: 'PERPETUAL', href: '/perpetual', icon: Infinity, description: 'Systems' },
      { name: 'INVESTOR', href: '/investor', icon: Briefcase, description: 'Portal' },
    ]
  },
  docs: {
    label: 'Docs',
    icon: BookOpen,
    color: 'text-blue-400',
    items: [
      { name: 'WHITEPAPER', href: '/whitepaper', icon: BookOpen, description: 'System Doc' },
      { name: 'API DOCS', href: '/api-docs', icon: FileCode, description: 'API Reference' },
      { name: 'PROTOCOL', href: '/protocol', icon: GitBranch, description: 'REV_40 Spec' },
      { name: 'KERNEL', href: '/kernel', icon: Cpu, description: 'N.E.W.T. Core' },
      { name: 'STACK', href: '/stack', icon: Layers, description: 'Tech Stack' },
      { name: 'IDENTITY', href: '/identity', icon: Fingerprint, description: 'ID Systems' },
      { name: 'SECURITY', href: '/security', icon: Shield, description: 'Protocols' },
    ]
  },
  operations: {
    label: 'Ops',
    icon: Activity,
    color: 'text-purple-400',
    items: [
      { name: 'DEPT 12', href: '/dept12-briefing', icon: Shield, description: 'Federal Brief' },
      { name: 'STATUS', href: '/status', icon: Activity, description: 'System Status' },
      { name: 'TRAFFIC', href: '/traffic', icon: Activity, description: 'Network' },
      { name: 'TRAFFIC HUB', href: '/traffic-hub', icon: Globe, description: 'Totality Terminal' },
      { name: 'TRANSMIT', href: '/transmit', icon: Radio, description: 'Broadcast' },
      { name: 'AUTOMATION', href: '/automation', icon: Cpu, description: 'Auto Systems' },
      { name: 'TIMELINE', href: '/timeline', icon: Clock, description: '2,207+ Days' },
    ]
  },
  ai: {
    label: 'AI',
    icon: Brain,
    color: 'text-pink-400',
    items: [
      { name: 'NEWT', href: '/newt', icon: Brain, description: 'N.E.W.T. Core' },
      { name: 'NEWT CHAT', href: '/newt/chat', icon: Terminal, description: 'Chat Interface' },
      { name: 'BRAINDISH', href: '/braindish', icon: Cpu, description: 'Neural Proc' },
      { name: 'VALORAI+', href: '/valoraiplus', icon: Zap, description: 'Sovereign AI' },
      { name: 'SUPREME', href: '/valoraiplus-supreme', icon: Zap, description: '14D Unified Core' },
      { name: 'OMEGA DASH', href: '/valoraiplus-omega', icon: Wallet, description: 'Treasury Dashboard' },
      { name: 'OMEGA ZERO', href: '/omega-zero', icon: Infinity, description: 'Protocol' },
      { name: 'TRINITY', href: '/trinity', icon: Shield, description: 'Unified' },
      { name: '5151', href: '/5151', icon: Network, description: 'Port Unison' },
    ]
  },
  media: {
    label: 'Media',
    icon: Film,
    color: 'text-orange-400',
    items: [
      { name: 'CINEMA', href: '/cinema', icon: Film, description: 'Evidence Cinema' },
      { name: 'JERRY', href: '/jerry', icon: MonitorPlay, description: 'Interface' },
      { name: 'VOYAGER', href: '/voyager', icon: Compass, description: 'Navigator' },
      { name: 'PATRIOT', href: '/patriot', icon: Shield, description: 'Memorial' },
      { name: 'UHI', href: '/uhi', icon: Globe, description: 'Health Index' },
      { name: 'ROUTE 66', href: '/route66', icon: Compass, description: 'Legacy Route' },
      { name: 'ROUTE 69', href: '/route69', icon: Compass, description: 'Recovery' },
      { name: 'ROUTE 70', href: '/route70', icon: Compass, description: 'Enforcement' },
    ]
  },
};

export function GlobalNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/80">
      <div className="container flex h-14 max-w-screen-2xl items-center px-4">
        {/* Logo/Brand */}
        <Link href="/" className="flex items-center gap-2 mr-6">
          <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-600 rounded-xl flex items-center justify-center text-black font-black text-lg shadow-[0_0_20px_#f59e0b55] flex-shrink-0">
            V
          </div>
          <div className="hidden sm:block">
            <div className="flex items-center gap-1 leading-none">
              <span className="font-bold text-amber-400 text-sm">ValorAiPlus_</span>
              <span className="text-zinc-600 text-xs">|</span>
              <span className="font-bold text-amber-400 text-sm hidden md:inline">ValorAiPlus2e_</span>
              <span className="text-zinc-600 text-xs hidden md:inline">|</span>
              <span className="font-bold text-amber-400 text-sm hidden lg:inline">ValorAiPlus3e_</span>
            </div>
            <div className="text-[9px] font-mono text-emerald-400 tracking-widest flex items-center gap-1">
              OMEGA v2.4 &bull; NODE 2207 &bull; <span className="text-white">&#127482;&#127480;</span>
            </div>
          </div>
        </Link>

        {/* Navigation Menu */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            {Object.entries(QUICK_LINKS).map(([key, category]) => {
              const CategoryIcon = category.icon;
              return (
                <NavigationMenuItem key={key}>
                  <NavigationMenuTrigger className={cn(
                    "bg-transparent hover:bg-zinc-900 data-[state=open]:bg-zinc-900",
                    category.color
                  )}>
                    <CategoryIcon className="w-4 h-4 mr-1" />
                    {category.label}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-1 p-2 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-zinc-950 border-zinc-800">
                      {category.items.map((item) => {
                        const ItemIcon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                          <li key={item.href}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={item.href}
                                className={cn(
                                  "block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors",
                                  "hover:bg-zinc-800 hover:text-white focus:bg-zinc-800",
                                  isActive ? "bg-zinc-800 text-white" : "text-zinc-400"
                                )}
                              >
                                <div className="flex items-center gap-2">
                                  <ItemIcon className={cn("w-4 h-4", category.color)} />
                                  <div className="text-sm font-medium leading-none">{item.name}</div>
                                </div>
                                <p className="line-clamp-1 text-xs leading-snug text-zinc-500 mt-1">
                                  {item.description}
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        );
                      })}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden ml-auto">
          <MobileNav />
        </div>

        {/* PORT.HOLE CTA */}
        <div className="hidden lg:flex items-center ml-4">
          <Link
            href="/porthole-hud"
            className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-black font-bold px-4 py-1.5 rounded-lg text-xs tracking-widest transition-all shadow-[0_0_20px_-4px_#f59e0b]"
          >
            <Lock className="w-3 h-3 mr-1.5 inline" />
            PORT.HOLE
          </Link>
        </div>

        {/* Right side status */}
        <div className="hidden lg:flex items-center gap-4 ml-auto">
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-green-400">BLOCK #42,069,111</span>
            <span className="text-zinc-600">|</span>
            <span className="text-zinc-400">ST. PAUL ANCHOR</span>
            <span className="text-zinc-600">|</span>
            <span className="text-amber-400">100D LIVE</span>
            <span className="text-zinc-600">|</span>
            <span className="text-emerald-400">N.E.W.T. v8.0</span>
          </div>
        </div>
      </div>
    </header>
  );
}

// Mobile Navigation Component
function MobileNav() {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-zinc-400 hover:text-white"
      >
        <span className="text-sm">Menu</span>
        <ChevronDown className={cn("w-4 h-4 transition-transform", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-[90vw] max-w-md bg-zinc-950 border border-zinc-800 rounded-lg shadow-xl z-50 max-h-[80vh] overflow-y-auto">
            {Object.entries(QUICK_LINKS).map(([key, category]) => {
              const CategoryIcon = category.icon;
              return (
                <div key={key} className="border-b border-zinc-800 last:border-b-0">
                  <div className={cn("px-4 py-2 flex items-center gap-2 bg-zinc-900", category.color)}>
                    <CategoryIcon className="w-4 h-4" />
                    <span className="font-semibold text-sm">{category.label}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1 p-2">
                    {category.items.map((item) => {
                      const ItemIcon = item.icon;
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className={cn(
                            "flex items-center gap-2 px-3 py-2 rounded text-xs",
                            "hover:bg-zinc-800 transition-colors",
                            isActive ? "bg-zinc-800 text-white" : "text-zinc-400"
                          )}
                        >
                          <ItemIcon className={cn("w-3 h-3", category.color)} />
                          <span>{item.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
