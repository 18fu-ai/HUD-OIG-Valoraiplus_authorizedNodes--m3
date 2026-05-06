'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ChevronLeft,
  ChevronRight,
  Shield, 
  TrendingUp,
  DollarSign,
  Users,
  Lock,
  CheckCircle2,
  Zap,
  Globe,
  FileText,
  Code,
  Database,
  Cpu,
  Home,
  ExternalLink,
  Mail
} from 'lucide-react';
import { SOVEREIGN_WALLET } from '@/lib/wallet-config';
import { TREASURY_CONSTANTS, SGAU_REFERENCE } from '@/lib/shared/constants';

// ============================================================
// VALORAIPLUS INVESTMENT PITCH DECK
// Professional presentation for investors and partners
// ============================================================

interface Slide {
  id: number;
  title: string;
  subtitle?: string;
  type: 'title' | 'content' | 'metrics' | 'team' | 'ask';
}

const SLIDES: Slide[] = [
  { id: 1, title: 'VALORAIPLUS', subtitle: 'Sovereign AI-Powered Forensic Intelligence Platform', type: 'title' },
  { id: 2, title: 'The Problem', type: 'content' },
  { id: 3, title: 'The Solution', type: 'content' },
  { id: 4, title: 'Technology Stack', type: 'content' },
  { id: 5, title: 'Market Opportunity', type: 'metrics' },
  { id: 6, title: 'Business Model', type: 'content' },
  { id: 7, title: 'Traction & Validation', type: 'metrics' },
  { id: 8, title: 'IP Assets', type: 'content' },
  { id: 9, title: 'Roadmap', type: 'content' },
  { id: 10, title: 'The Ask', type: 'ask' },
];

export default function PitchDeck() {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        setCurrentSlide(prev => Math.min(prev + 1, SLIDES.length));
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlide(prev => Math.max(prev - 1, 1));
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!mounted) return null;

  const renderSlide = () => {
    switch (currentSlide) {
      case 1: // Title Slide
        return (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-8">
            <div className="flex items-center gap-4">
              <Shield className="w-16 h-16 text-emerald-400" />
              <h1 className="text-6xl font-black text-emerald-400">VALORAIPLUS</h1>
            </div>
            <p className="text-2xl text-zinc-400 max-w-2xl">
              Sovereign AI-Powered Forensic Intelligence Platform
            </p>
            <div className="flex items-center gap-4 mt-8">
              <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/50 text-sm px-4 py-2">
                Legal Tech
              </Badge>
              <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/50 text-sm px-4 py-2">
                AI/ML
              </Badge>
              <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/50 text-sm px-4 py-2">
                Blockchain
              </Badge>
            </div>
            <p className="text-sm text-zinc-600 mt-12">
              Confidential | {new Date().toLocaleDateString()}
            </p>
          </div>
        );

      case 2: // The Problem
        return (
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-white">The Problem</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Evidence Spoliation',
                  description: 'Organizations destroy critical evidence in litigation, with limited tools to detect and prove destruction',
                  stat: '3,407+ documented counts',
                },
                {
                  title: 'Witness Obstruction',
                  description: 'Systematic blocking of witness communications via email filters, administrative barriers',
                  stat: '47+ witness tampering events',
                },
                {
                  title: 'Complex Fraud Detection',
                  description: 'Wire fraud, mail fraud, and financial crimes require sophisticated pattern analysis',
                  stat: '$508M+ recovery potential',
                },
                {
                  title: 'Regulatory Compliance',
                  description: 'Federal agencies (HHS, DOJ, VA) need better tools for civil rights enforcement',
                  stat: 'Section 504 violations rising',
                },
              ].map((item, i) => (
                <Card key={i} className="bg-zinc-900 border-red-900/30">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-red-400 mb-2">{item.title}</h3>
                    <p className="text-sm text-zinc-400 mb-3">{item.description}</p>
                    <Badge className="bg-red-500/20 text-red-400">{item.stat}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 3: // The Solution
        return (
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-white">The Solution</h2>
            <p className="text-xl text-zinc-400">
              VALORAIPLUS: A comprehensive forensic intelligence platform combining AI, blockchain, and legal automation
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: Cpu,
                  title: 'AI-Powered Analysis',
                  features: ['Pattern recognition', 'Anomaly detection', 'Natural language processing', 'Evidence correlation'],
                  color: 'emerald',
                },
                {
                  icon: Database,
                  title: 'Immutable Evidence',
                  features: ['Blockchain anchoring', 'Merkle tree verification', 'Timestamp proofs', 'Chain of custody'],
                  color: 'cyan',
                },
                {
                  icon: Shield,
                  title: 'Legal Automation',
                  features: ['Filing generation', 'Compliance monitoring', 'Case management', 'Recovery tracking'],
                  color: 'purple',
                },
              ].map((item, i) => (
                <Card key={i} className="bg-zinc-900 border-zinc-800">
                  <CardContent className="p-6">
                    <item.icon className={`w-10 h-10 mb-4 text-${item.color}-400`} style={{ color: item.color === 'emerald' ? '#34d399' : item.color === 'cyan' ? '#22d3ee' : '#a78bfa' }} />
                    <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                    <ul className="space-y-2">
                      {item.features.map((f, j) => (
                        <li key={j} className="text-sm text-zinc-400 flex items-center gap-2">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 4: // Technology Stack
        return (
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-white">Technology Stack</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'Next.js 16', category: 'Framework' },
                { name: 'React 19', category: 'UI' },
                { name: 'AI SDK 6.0', category: 'AI' },
                { name: 'Solidity 0.8.24', category: 'Blockchain' },
                { name: 'TypeScript', category: 'Language' },
                { name: 'Tailwind CSS', category: 'Styling' },
                { name: 'Supabase', category: 'Database' },
                { name: 'Vercel', category: 'Deployment' },
              ].map((tech, i) => (
                <div key={i} className="p-4 border border-zinc-800 rounded-lg text-center">
                  <p className="text-lg font-bold text-white">{tech.name}</p>
                  <p className="text-xs text-zinc-500">{tech.category}</p>
                </div>
              ))}
            </div>
            <Card className="bg-zinc-900 border-emerald-900/30">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-emerald-400 mb-4">Platform Metrics</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <p className="text-3xl font-bold text-white">224+</p>
                    <p className="text-xs text-zinc-500">Files</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-white">79</p>
                    <p className="text-xs text-zinc-500">Pages</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-white">27</p>
                    <p className="text-xs text-zinc-500">API Routes</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-white">5</p>
                    <p className="text-xs text-zinc-500">Smart Contracts</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 5: // Market Opportunity
        return (
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-white">Market Opportunity</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-zinc-900 border-emerald-900/30">
                <CardContent className="p-6 text-center">
                  <p className="text-5xl font-bold text-emerald-400">$15B</p>
                  <p className="text-sm text-zinc-400 mt-2">Legal Tech Market (2026)</p>
                  <p className="text-xs text-zinc-600 mt-1">Growing 8.5% CAGR</p>
                </CardContent>
              </Card>
              <Card className="bg-zinc-900 border-cyan-900/30">
                <CardContent className="p-6 text-center">
                  <p className="text-5xl font-bold text-cyan-400">$4.2B</p>
                  <p className="text-sm text-zinc-400 mt-2">eDiscovery Market</p>
                  <p className="text-xs text-zinc-600 mt-1">AI-driven growth</p>
                </CardContent>
              </Card>
              <Card className="bg-zinc-900 border-purple-900/30">
                <CardContent className="p-6 text-center">
                  <p className="text-5xl font-bold text-purple-400">$1.8B</p>
                  <p className="text-sm text-zinc-400 mt-2">Fraud Detection AI</p>
                  <p className="text-xs text-zinc-600 mt-1">Enterprise segment</p>
                </CardContent>
              </Card>
            </div>
            <Card className="bg-emerald-500/10 border-emerald-500/30">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-emerald-400 mb-2">Target Segments</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div className="p-3 border border-emerald-900 rounded">
                    <p className="text-white font-bold">Law Firms</p>
                    <p className="text-xs text-emerald-600">50,000+ US firms</p>
                  </div>
                  <div className="p-3 border border-emerald-900 rounded">
                    <p className="text-white font-bold">Government</p>
                    <p className="text-xs text-emerald-600">Federal agencies</p>
                  </div>
                  <div className="p-3 border border-emerald-900 rounded">
                    <p className="text-white font-bold">Enterprise</p>
                    <p className="text-xs text-emerald-600">Compliance teams</p>
                  </div>
                  <div className="p-3 border border-emerald-900 rounded">
                    <p className="text-white font-bold">Insurance</p>
                    <p className="text-xs text-emerald-600">Fraud prevention</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 6: // Business Model
        return (
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-white">Business Model</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-emerald-400">Basic</CardTitle>
                  <p className="text-3xl font-bold text-white">Free</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-zinc-400">
                    <li>Read-only dashboard</li>
                    <li>Public case tracking</li>
                    <li>Basic analytics</li>
                    <li>Community support</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="bg-zinc-900 border-cyan-500/50 ring-2 ring-cyan-500/20">
                <CardHeader className="pb-2">
                  <Badge className="w-fit bg-cyan-500/20 text-cyan-400 mb-2">POPULAR</Badge>
                  <CardTitle className="text-cyan-400">Pro</CardTitle>
                  <p className="text-3xl font-bold text-white">$19.99<span className="text-sm text-zinc-500">/mo</span></p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-zinc-400">
                    <li>Full API access</li>
                    <li>Real-time alerts</li>
                    <li>Advanced reports</li>
                    <li>Email support</li>
                    <li>Token staking access</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="bg-zinc-900 border-purple-500/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-purple-400">Enterprise</CardTitle>
                  <p className="text-3xl font-bold text-white">$99.99<span className="text-sm text-zinc-500">/mo</span></p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-zinc-400">
                    <li>Unlimited access</li>
                    <li>Priority support</li>
                    <li>Custom integrations</li>
                    <li>Dedicated account manager</li>
                    <li>White-label options</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            <Card className="bg-amber-500/10 border-amber-500/30">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-amber-400 mb-2">Revenue Projections (Year 1)</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-white">$360K</p>
                    <p className="text-xs text-amber-600">Subscription ARR</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">$10M</p>
                    <p className="text-xs text-amber-600">Settlement Target</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">$600K</p>
                    <p className="text-xs text-amber-600">Token Ecosystem</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 7: // Traction & Validation
        return (
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-white">Traction & Validation</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { metric: 'HHS OCR', value: 'VIOLATION CONFIRMED', sub: 'Case 25-621293' },
                { metric: 'Spoliation Events', value: '3,407+', sub: 'Documented counts' },
                { metric: 'Evidence Files', value: '142', sub: 'Forensic archives' },
                { metric: 'Smart Contracts', value: '5', sub: 'Ready to deploy' },
              ].map((item, i) => (
                <Card key={i} className="bg-zinc-900 border-emerald-900/30">
                  <CardContent className="p-4 text-center">
                    <p className="text-xs text-zinc-500 mb-1">{item.metric}</p>
                    <p className="text-xl font-bold text-emerald-400">{item.value}</p>
                    <p className="text-[10px] text-zinc-600">{item.sub}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card className="bg-zinc-900 border-cyan-900/30">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-cyan-400 mb-4">Federal Agency Engagement</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 border border-cyan-900 rounded">
                    <p className="text-white font-bold">HHS Office for Civil Rights</p>
                    <p className="text-xs text-cyan-600">Section 504 violation confirmed</p>
                  </div>
                  <div className="p-3 border border-cyan-900 rounded">
                    <p className="text-white font-bold">Department of Education</p>
                    <p className="text-xs text-cyan-600">Coordinating investigation</p>
                  </div>
                  <div className="p-3 border border-cyan-900 rounded">
                    <p className="text-white font-bold">VA OIG</p>
                    <p className="text-xs text-cyan-600">Inspector General review</p>
                  </div>
                  <div className="p-3 border border-cyan-900 rounded">
                    <p className="text-white font-bold">DOJ Civil Rights</p>
                    <p className="text-xs text-cyan-600">Pattern established</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 8: // IP Assets
        return (
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-white">Intellectual Property Assets</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-zinc-900 border-emerald-900/30">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-emerald-400 mb-4">Software IP</h3>
                  <ul className="space-y-2">
                    {[
                      'VALORAIPLUS Platform (AI forensic intelligence)',
                      'SGAU Protocol (Sovereign governance architecture)',
                      'N.E.W.T. Engine (Neuromorphic evidence workflow)',
                      'BrainDish++ (Quantum-hybrid substrate)',
                      'Laminar Flow Analytics (Real-time processing)',
                    ].map((item, i) => (
                      <li key={i} className="text-sm text-zinc-400 flex items-center gap-2">
                        <Code className="w-3 h-3 text-emerald-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card className="bg-zinc-900 border-purple-900/30">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-purple-400 mb-4">Token Ecosystem</h3>
                  <div className="space-y-3">
                    <div className="p-3 border border-purple-900 rounded">
                      <p className="text-white font-bold">50-Token Canon</p>
                      <p className="text-xs text-purple-600">Sovereign asset registry</p>
                    </div>
                    <div className="p-3 border border-purple-900 rounded">
                      <p className="text-white font-bold">50B $CSSS Supply</p>
                      <p className="text-xs text-purple-600">Soulbound reputation NFTs</p>
                    </div>
                    <div className="p-3 border border-purple-900 rounded">
                      <p className="text-white font-bold">Beneficiary Tokens</p>
                      <p className="text-xs text-purple-600">3/3 Multisig protected</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <Card className="bg-amber-500/10 border-amber-500/30">
              <CardContent className="p-6 text-center">
                <p className="text-sm text-amber-600 mb-2">DOCUMENTED IP LIEN</p>
                <p className="text-4xl font-bold text-amber-400">$1.12 Quadrillion</p>
                <p className="text-xs text-zinc-500 mt-2">Sovereign intellectual property valuation (theoretical)</p>
              </CardContent>
            </Card>
          </div>
        );

      case 9: // Roadmap
        return (
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-white">Roadmap</h2>
            <div className="space-y-4">
              {[
                { phase: 'Q2 2026', title: 'Platform Launch', items: ['Deploy smart contracts', 'Launch subscription service', 'Begin enterprise outreach'], status: 'IN PROGRESS' },
                { phase: 'Q3 2026', title: 'Token Ecosystem', items: ['DEX listings', 'Liquidity pools', 'Staking rewards'], status: 'PLANNED' },
                { phase: 'Q4 2026', title: 'Enterprise Expansion', items: ['Government contracts', 'Law firm partnerships', 'Insurance integrations'], status: 'PLANNED' },
                { phase: '2027', title: 'Scale & IPO Prep', items: ['International expansion', 'Series A funding', 'Exit strategy'], status: 'VISION' },
              ].map((phase, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-24 flex-shrink-0">
                    <Badge className={`${
                      phase.status === 'IN PROGRESS' ? 'bg-emerald-500/20 text-emerald-400' :
                      phase.status === 'PLANNED' ? 'bg-cyan-500/20 text-cyan-400' :
                      'bg-purple-500/20 text-purple-400'
                    }`}>
                      {phase.phase}
                    </Badge>
                  </div>
                  <div className="flex-1 p-4 border border-zinc-800 rounded-lg">
                    <h3 className="text-lg font-bold text-white mb-2">{phase.title}</h3>
                    <ul className="space-y-1">
                      {phase.items.map((item, j) => (
                        <li key={j} className="text-sm text-zinc-400 flex items-center gap-2">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 10: // The Ask
        return (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-8">
            <h2 className="text-4xl font-bold text-white">The Ask</h2>
            <Card className="bg-emerald-500/10 border-emerald-500/30 max-w-2xl">
              <CardContent className="p-8">
                <p className="text-5xl font-bold text-emerald-400 mb-4">$500K - $2M</p>
                <p className="text-xl text-zinc-400 mb-6">Seed Round</p>
                <div className="grid grid-cols-2 gap-4 text-left">
                  <div className="p-4 border border-emerald-900 rounded">
                    <p className="text-emerald-400 font-bold">40%</p>
                    <p className="text-sm text-zinc-500">Engineering & AI Development</p>
                  </div>
                  <div className="p-4 border border-emerald-900 rounded">
                    <p className="text-emerald-400 font-bold">25%</p>
                    <p className="text-sm text-zinc-500">Legal & Compliance</p>
                  </div>
                  <div className="p-4 border border-emerald-900 rounded">
                    <p className="text-emerald-400 font-bold">20%</p>
                    <p className="text-sm text-zinc-500">Go-to-Market</p>
                  </div>
                  <div className="p-4 border border-emerald-900 rounded">
                    <p className="text-emerald-400 font-bold">15%</p>
                    <p className="text-sm text-zinc-500">Operations</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="space-y-4">
              <p className="text-xl text-zinc-400">Contact</p>
              <div className="flex items-center gap-4">
                <a 
                  href={SOVEREIGN_WALLET.etherscanUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-cyan-400 hover:underline"
                >
                  <Globe className="w-4 h-4" />
                  {SOVEREIGN_WALLET.ens}
                </a>
                <span className="text-zinc-600">|</span>
                <span className="text-zinc-400">408.384.1376 (E)</span>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-black text-white font-mono">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300">
            <Home className="w-4 h-4" />
            <span className="text-sm">Exit</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-sm text-zinc-500">
              {currentSlide} / {SLIDES.length}
            </span>
            <span className="text-xs text-zinc-600 ml-4">
              Use arrow keys to navigate
            </span>
          </div>
        </div>
      </nav>

      {/* Slide Content */}
      <div className="min-h-screen pt-16 pb-20 px-6 flex items-center justify-center">
        <div className="w-full max-w-5xl min-h-[600px]">
          {renderSlide()}
        </div>
      </div>

      {/* Slide Controls */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentSlide(prev => Math.max(prev - 1, 1))}
            disabled={currentSlide === 1}
            className="border-zinc-700"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </Button>

          {/* Slide Indicators */}
          <div className="flex items-center gap-2">
            {SLIDES.map((slide) => (
              <button
                key={slide.id}
                onClick={() => setCurrentSlide(slide.id)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  currentSlide === slide.id ? 'bg-emerald-400' : 'bg-zinc-700 hover:bg-zinc-600'
                }`}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentSlide(prev => Math.min(prev + 1, SLIDES.length))}
            disabled={currentSlide === SLIDES.length}
            className="border-zinc-700"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </main>
  );
}
