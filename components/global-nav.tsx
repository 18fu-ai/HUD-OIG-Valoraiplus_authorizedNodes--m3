'use client';

export const runtime = 'edge';

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
  ChevronDown, Send, AlertTriangle, ExternalLink, CheckCircle, Camera
} from 'lucide-react';

// Complete Quick Links Registry — DEPT 12 SUPREME PRIORITY
const QUICK_LINKS = {
  dept12: {
    label: 'DEPT 12',
    icon: Gavel,
    color: 'text-red-500',
    items: [
      { name: 'HANDSHAKE',      href: '/judicial-handshake',          icon: CheckCircle,   description: 'Dept 12 Live Handshake' },
      { name: 'ACTIVE CASE',    href: '/dept12-case',                 icon: AlertTriangle, description: 'CUD-26-682107 Live Intel' },
      { name: 'SURVEILLANCE',   href: '/surveillance-evidence',       icon: Camera,        description: 'Unit 301A — Hallway Camera Docs' },
      { name: 'COURT HUB',      href: '/dept12',                      icon: Gavel,         description: 'SF Superior Court Hub' },
      { name: 'BRIEFING',       href: '/dept12-briefing',             icon: Shield,        description: 'Federal Brief' },
      { name: 'SUPREME REPORT', href: '/supreme-intelligence-report', icon: FileSearch,    description: '30-Page Intel PDF' },
      { name: 'COMPLIANCE',     href: '/compliance-intelligence',     icon: Scale,         description: 'HHS OCR / CCRA / Mimecast' },
      { name: 'MIMECAST',       href: '/mimecast',                    icon: Mail,          description: '284K Emails / SMTP 550 Blockade' },
      { name: 'CLAWBACK',       href: '/clawback',                    icon: Gavel,         description: '$11.487B Recovery Matrix' },
      { name: 'VELOCITY',       href: '/velocity-doctrine',           icon: Zap,           description: '550 Doctrine' },
      { name: 'TIMELINE',       href: '/timeline',                    icon: Clock,         description: '2,207+ Days Documented' },
    ]
  },
  portals: {
    label: 'Portals',
    icon: Home,
    color: 'text-cyan-400',
    items: [
      { name: 'OMEGA RECOVERY', href: '/',                       icon: Home,        description: 'Main System Entry' },
      { name: 'PORTHOLE HUD',   href: '/porthole-hud',           icon: MonitorPlay, description: 'Real-Time HUD' },
      { name: 'MAINFRAME',      href: '/mainframe',              icon: Server,      description: '14D Core' },
      { name: 'NEXUS',          href: '/nexus',                  icon: Network,     description: 'Neural Hub' },
      { name: 'GATE',           href: '/gate',                   icon: Lock,        description: 'Access Control' },
      { name: 'APEX',           href: '/apex',                   icon: Crown,       description: 'Apex Control' },
      { name: 'OMEGA LAUNCH',   href: '/omega-launch',           icon: Zap,         description: 'TX Verification' },
      { name: 'TOTALITY',       href: '/totality-explorer',      icon: Infinity,    description: 'System Explorer' },
    ]
  },
  intelligence: {
    label: 'Intelligence',
    icon: Brain,
    color: 'text-amber-400',
    items: [
      { name: 'REALTIME INTEL', href: '/realtime-intelligence',  icon: Activity,   description: 'Live Feed' },
      { name: 'INTEL REPORT',   href: '/intelligence-report',    icon: FileSearch, description: 'Full Dossier' },
      { name: 'FORENSIC FEED',  href: '/forensic-feed',          icon: Radio,      description: 'Live Data' },
      { name: 'EVIDENCE MAP',   href: '/terminal-evidence-map',  icon: Map,        description: 'Mapping' },
    ]
  },
  financial: {
    label: 'Treasury',
    icon: Wallet,
    color: 'text-green-400',
    items: [
      { name: 'ACCOUNT 8185',    href: '/account-8185',          icon: Landmark,   description: 'Primary Schwab' },
      { name: 'TREASURY',        href: '/treasury',              icon: Wallet,     description: 'Assets' },
      { name: 'VALUATION',       href: '/valuation',             icon: TrendingUp, description: '$1.12Q IP' },
      { name: 'MINT',            href: '/mint',                  icon: Zap,        description: 'Minting' },
    ]
  },
  ai: {
    label: 'AI',
    icon: Brain,
    color: 'text-pink-400',
    items: [
      { name: 'NEWT',            href: '/newt',                  icon: Brain,      description: 'N.E.W.T. Core' },
      { name: 'VALORAI+',        href: '/valoraiplus',           icon: Zap,        description: 'Sovereign AI' },
      { name: 'OMEGA DASH',      href: '/valoraiplus-omega',     icon: Wallet,     description: 'Treasury Dashboard' },
      { name: 'TRINITY',         href: '/trinity',               icon: Shield,     description: 'Unified' },
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
          <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-orange-700 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-[0_0_20px_#ef444455] flex-shrink-0">
            V
          </div>
          <div className="hidden sm:block">
            <div className="flex items-center gap-1 leading-none">
              <span className="font-bold text-slate-200 text-sm">ValorAiPlus_</span>
              <span className="text-zinc-600 text-xs">|</span>
              <span className="font-black text-red-500 text-sm tracking-tighter hidden md:inline">DEPT 12</span>
            </div>
            <div className="text-[9px] font-mono text-emerald-400 tracking-widest flex items-center gap-1 uppercase">
              NODE 2207 &bull; AUTHORIZED &bull; <span className="text-white">US</span>
            </div>
          </div>
        </Link>

        {/* Navigation Menu */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            {Object.entries(QUICK_LINKS).map(([key, category]) => {
              const CategoryIcon = category.icon;
              const isDept12 = key === 'dept12';
              return (
                <NavigationMenuItem key={key}>
                  <NavigationMenuTrigger className={cn(
                    "bg-transparent data-[state=open]:bg-zinc-900 transition-colors",
                    isDept12
                      ? "hover:bg-red-950/40 data-[state=open]:bg-red-950/40 text-red-500 font-black border border-red-900 rounded-md px-3"
                      : `hover:bg-zinc-900 ${category.color}`
                  )}>
                    {isDept12 && (
                      <span className="relative flex h-2 w-2 mr-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                      </span>
                    )}
                    <CategoryIcon className="w-4 h-4 mr-1" />
                    {category.label}
                    {isDept12 && (
                      <span className="ml-2 text-[9px] bg-red-500 text-white font-black px-1.5 py-0.5 rounded tracking-widest">
                        ACTIVE
                      </span>
                    )}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className={cn(
                      "grid gap-1 p-2 bg-zinc-950",
                      isDept12
                        ? "w-[420px] md:w-[560px] md:grid-cols-2 border-2 border-red-900 rounded-lg shadow-[0_0_30px_-10px_#ef4444]"
                        : "w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px] border-zinc-800"
                    )}>
                      {isDept12 && (
                        <li className="col-span-2 mb-1">
                          <div className="bg-red-950/50 border border-red-800 rounded-md px-4 py-3">
                            <p className="text-red-500 font-black text-xs tracking-widest flex items-center gap-2">DEPARTMENT 12 — ACTIVE LITIGATION</p>
                            <p className="text-zinc-400 text-[10px] font-mono mt-1">Case No. CUD-26-682107 &bull; SF Superior Court &bull; Access Code: 16535884</p>
                            <p className="text-zinc-500 text-[9px] font-mono uppercase tracking-tighter mt-0.5">Signatory Fraud &amp; Surveillance Evidence Portal Activated</p>
                          </div>
                        </li>
                      )}
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
                                  isDept12 && "hover:bg-red-900/40 border border-transparent hover:border-red-800",
                                  isActive ? "bg-zinc-800 text-white" : "text-zinc-400"
                                )}
                              >
                                <div className="flex items-center gap-2">
                                  <ItemIcon className={cn("w-4 h-4", category.color)} />
                                  <div className="text-sm font-bold leading-none uppercase tracking-tighter">{item.name}</div>
                                </div>
                                <p className="line-clamp-1 text-[10px] text-zinc-500 mt-1 uppercase font-mono italic">
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

        {/* Global Action HUD */}
        <div className="flex items-center ml-auto gap-3">
          <div className="hidden xl:flex items-center gap-3 text-[10px] font-mono text-zinc-500 border-x border-zinc-800 px-4">
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
              <span className="text-emerald-500">HANDSHAKE_LIVE</span>
            </div>
            <span className="text-zinc-700">|</span>
            <span>ST. PAUL ANCHOR</span>
          </div>
          <Link
            href="/dept12-case"
            className="hidden lg:inline-flex bg-gradient-to-r from-red-600 to-orange-700 hover:from-red-500 hover:to-orange-600 text-white font-black px-4 py-2 rounded-lg text-[10px] tracking-widest transition-all shadow-[0_0_20px_-4px_#ef4444]"
          >
            LITIGATION HUD
          </Link>
          <div className="flex lg:hidden">
            <MobileNav />
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
              const isDept12 = key === 'dept12';
              return (
                <div key={key} className={cn(
                  "border-b last:border-b-0",
                  isDept12 ? "border-red-900 bg-red-950/20" : "border-zinc-800"
                )}>
                  <div className={cn(
                    "px-4 py-2 flex items-center gap-2",
                    isDept12 ? "bg-red-950/40" : "bg-zinc-900",
                    category.color
                  )}>
                    {isDept12 && (
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                      </span>
                    )}
                    <CategoryIcon className="w-4 h-4" />
                    <span className="font-semibold text-sm">{category.label}</span>
                    {isDept12 && (
                      <span className="ml-auto text-[9px] bg-red-500 text-white font-black px-1.5 py-0.5 rounded tracking-widest">
                        ACTIVE
                      </span>
                    )}
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
                            isDept12 && "hover:bg-red-950/60",
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
