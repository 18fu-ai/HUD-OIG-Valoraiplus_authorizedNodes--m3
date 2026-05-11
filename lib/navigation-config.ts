/**
 * VALORAIPLUS UNIFIED NAVIGATION CONFIG
 * Version 14.1.4.0
 * All routes across the system
 */

import {
  Home, Shield, Eye, Server, Terminal, Network, Lock, Crown,
  Activity, Brain, FileSearch, Radio, Layers, Mail, Map, TrendingUp,
  Gavel, Zap, XCircle, FileCode, Scale, Clock, Settings,
  Wallet, Landmark, Building2, DollarSign, Database, Infinity, Briefcase,
  BookOpen, Cpu, Fingerprint, GitBranch, Film, Compass, Globe, MonitorPlay,
  Send, Binary, Coins, ExternalLink, Target, Users, BarChart3,
  type LucideIcon
} from 'lucide-react';

export interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
  description: string;
  category?: string;
  isExternal?: boolean;
  isNew?: boolean;
}

export interface NavCategory {
  label: string;
  icon: LucideIcon;
  color: string;
  items: NavItem[];
}

// Complete Navigation Registry
export const NAVIGATION: Record<string, NavCategory> = {
  portals: {
    label: 'Portals',
    icon: Home,
    color: 'text-cyan-400',
    items: [
      { name: 'OMEGA RECOVERY', href: '/', icon: Home, description: 'Main System Entry' },
      { name: 'ORCHESTRATOR', href: '/orchestrator', icon: Crown, description: 'Elite Command', isNew: true },
      { name: 'LIQUIDM', href: '/liquidm', icon: Activity, description: 'Liquidity Mesh v0', isNew: true },
      { name: 'JAGAMATH++', href: '/jagamath', icon: Scale, description: '$2.8T Valuation', isNew: true },
      { name: 'SECURITY DASH', href: '/security-dashboard', icon: Shield, description: 'Security Status' },
      { name: 'LIABILITY MATRIX', href: '/liability-dashboard', icon: Gavel, description: 'Institutional Liability' },
      { name: 'CASE MGMT', href: '/case-management', icon: FileSearch, description: 'Federal Coordination' },
      { name: 'DOCUMENTATION', href: '/documentation', icon: Activity, description: 'Reference Portal' },
      { name: 'UPLINK', href: '/uplink', icon: Zap, description: 'Millennium Integration' },
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
      { name: 'LOGIC GATE', href: '/logic-gate', icon: Binary, description: 'Sovereign Doctrine' },
      { name: 'TOTALITY', href: '/totality-explorer', icon: Infinity, description: 'System Explorer' },
    ]
  },
  treasury: {
    label: 'Treasury',
    icon: Wallet,
    color: 'text-emerald-400',
    items: [
      { name: 'TREASURY LIQUIDITY', href: '/treasury-liquidity', icon: TrendingUp, description: 'Liquidity Path', isNew: true },
      { name: 'SOVEREIGN WALLET', href: '/wallet', icon: Wallet, description: 'donadams1969.eth' },
      { name: 'ACCOUNT 8185', href: '/account-8185', icon: Landmark, description: 'Primary Schwab' },
      { name: 'TREASURY V50', href: '/treasury-v50', icon: Landmark, description: 'v50 System' },
      { name: 'TREASURY', href: '/treasury', icon: Wallet, description: 'Assets' },
      { name: 'SWAP', href: '/swap', icon: Zap, description: 'Token Exchange', isNew: true },
      { name: 'TOKEN SALE', href: '/token-sale', icon: DollarSign, description: 'USDC Purchase', isNew: true },
      { name: 'EXCHANGE', href: '/exchange', icon: Activity, description: 'Live Trading', isNew: true },
      { name: 'REVENUE', href: '/revenue', icon: TrendingUp, description: 'Subscription ARR', isNew: true },
      { name: 'SUBSCRIBE', href: '/subscribe', icon: DollarSign, description: 'Pricing Tiers', isNew: true },
      { name: 'BANKING', href: '/banking-confidence', icon: Building2, description: 'Analysis' },
      { name: 'VALUATION', href: '/valuation', icon: TrendingUp, description: '$1.12Q IP' },
      { name: 'TOKEN REG', href: '/token-registry', icon: Database, description: '105 Tokens', isNew: true },
      { name: 'AUCTION', href: '/auction', icon: Gavel, description: 'Token Auctions', isNew: true },
      { name: 'TOKENOMICS', href: '/tokenomics-report', icon: BarChart3, description: '105-Token Report', isNew: true },
      { name: 'DEPLOY TOKENS', href: '/deploy-tokens', icon: Zap, description: 'ERC-20 Deploy', isNew: true },
      { name: 'MINT', href: '/mint', icon: Coins, description: 'Minting' },
      { name: 'PERPETUAL', href: '/perpetual', icon: Infinity, description: 'Systems' },
    ]
  },
  investment: {
    label: 'Investment',
    icon: Briefcase,
    color: 'text-amber-400',
    items: [
      { name: 'INVESTOR PORTAL', href: '/investor', icon: Briefcase, description: 'Funding Rounds', isNew: true },
      { name: 'PITCH DECK', href: '/pitch-deck', icon: Film, description: 'IP Presentation', isNew: true },
      { name: 'LITIGATION', href: '/litigation', icon: Gavel, description: 'Settlement Tracker', isNew: true },
      { name: 'VALUATION', href: '/valuation', icon: TrendingUp, description: '$1.12Q IP' },
      { name: 'REVENUE', href: '/revenue', icon: BarChart3, description: 'ARR Dashboard', isNew: true },
    ]
  },
  legal: {
    label: 'Legal',
    icon: Gavel,
    color: 'text-red-400',
    items: [
      { name: 'LITIGATION', href: '/litigation', icon: Gavel, description: 'Settlement Tracker', isNew: true },
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
  intelligence: {
    label: 'Intelligence',
    icon: Brain,
    color: 'text-purple-400',
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
    color: 'text-orange-400',
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
      { name: 'OMEGA ZERO', href: '/omega-zero', icon: Infinity, description: 'Protocol' },
      { name: 'TRINITY', href: '/trinity', icon: Shield, description: 'Unified' },
      { name: '5151', href: '/5151', icon: Network, description: 'Port Unison' },
    ]
  },
  media: {
    label: 'Media',
    icon: Film,
    color: 'text-fuchsia-400',
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
  external: {
    label: 'External',
    icon: ExternalLink,
    color: 'text-cyan-400',
    items: [
      { name: '18FU.CASH', href: 'https://www.18fu.cash', icon: ExternalLink, description: 'Primary Liquidity', isExternal: true },
      { name: 'VALORBANK', href: 'https://valorbank-rfvbdnaa.manus.space/', icon: Building2, description: 'Banking Integration', isExternal: true },
    ]
  },
};

// Quick access links for important pages
export const QUICK_LINKS = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'LiquidM', href: '/liquidm', icon: Activity },
  { name: 'JAGAMATH++', href: '/jagamath', icon: Scale },
  { name: 'Treasury', href: '/treasury-liquidity', icon: Wallet },
  { name: 'Litigation', href: '/litigation', icon: Gavel },
  { name: 'Exchange', href: '/exchange', icon: Activity },
  { name: 'Investor', href: '/investor', icon: Briefcase },
  { name: 'Deploy', href: '/deploy-tokens', icon: Zap },
  { name: 'Revenue', href: '/revenue', icon: TrendingUp },
  { name: 'Orchestrator', href: '/orchestrator', icon: Crown },
];

// Get all routes as flat array
export const getAllRoutes = (): NavItem[] => {
  return Object.values(NAVIGATION).flatMap(category => category.items);
};

// Get route by href
export const getRouteByHref = (href: string): NavItem | undefined => {
  return getAllRoutes().find(route => route.href === href);
};

// Get new routes
export const getNewRoutes = (): NavItem[] => {
  return getAllRoutes().filter(route => route.isNew);
};
