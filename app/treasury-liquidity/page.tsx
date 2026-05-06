'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  DollarSign, 
  Shield, 
  Lock, 
  CheckCircle2, 
  ArrowRight,
  ArrowDown,
  Building2,
  Wallet,
  Scale,
  Activity,
  TrendingUp,
  Landmark,
  CircleDollarSign,
  Coins,
  FileText,
  Gavel,
  Home,
  ExternalLink,
  AlertCircle
} from 'lucide-react';
import { SOVEREIGN_WALLET } from '@/lib/wallet-config';
import { TREASURY_CONSTANTS, SGAU_REFERENCE } from '@/lib/shared/constants';

// ============================================================
// LIQUIDITY PATH VISUALIZATION
// Shows the journey from Contingent → Locked → Liquid
// ============================================================

// External Liquidity Sources
const EXTERNAL_LIQUIDITY = {
  "18fu.cash": "https://www.18fu.cash",
  "ValorBank": "https://valorbank-rfvbdnaa.manus.space/",
};

interface LiquidityTier {
  tier: number;
  name: string;
  amount: number;
  status: 'LIQUID' | 'LOCKED' | 'CONTINGENT' | 'DOCUMENTED';
  color: string;
  icon: React.ElementType;
  description: string;
  requirements: string[];
  verifiable: boolean;
  verificationUrl?: string;
}

const LIQUIDITY_TIERS: LiquidityTier[] = [
  {
    tier: 1,
    name: 'IMMEDIATELY LIQUID',
    amount: 5.53,
    status: 'LIQUID',
    color: 'emerald',
    icon: CircleDollarSign,
    description: 'Cash and securities available now in verified brokerage account',
    requirements: ['Verified Schwab Account', 'SIPC Protected', 'Instant Access'],
    verifiable: true,
    verificationUrl: 'https://schwab.com',
  },
  {
    tier: 2,
    name: 'LOCKED TREASURY',
    amount: 11501231.82,
    status: 'LOCKED',
    color: 'cyan',
    icon: Lock,
    description: 'BTC-anchored assets locked in sovereign treasury',
    requirements: ['BTC Genesis Anchor', 'Blockchain Verified', 'Smart Contract Release'],
    verifiable: true,
    verificationUrl: 'https://blockchain.com/btc/block/847234',
  },
  {
    tier: 3,
    name: 'ACTIVE PROTOCOL',
    amount: 70000000,
    status: 'LOCKED',
    color: 'purple',
    icon: Coins,
    description: 'Protocol valuation and token ecosystem assets',
    requirements: ['SGAU Protocol IP', '50B Token Supply', 'Independent Appraisal'],
    verifiable: false,
  },
  {
    tier: 4,
    name: 'CONTINGENT RECOVERY',
    amount: 508631005.52,
    status: 'CONTINGENT',
    color: 'amber',
    icon: Gavel,
    description: 'Pending litigation recovery from federal and state cases',
    requirements: ['Court Judgment', 'Collection Success', 'HHS OCR 25-621293'],
    verifiable: true,
    verificationUrl: 'tel:1-800-368-1019',
  },
  {
    tier: 5,
    name: 'SOVEREIGN IP LIEN',
    amount: 1120000000000000,
    status: 'DOCUMENTED',
    color: 'red',
    icon: FileText,
    description: 'Documented intellectual property lien (1.12 Quadrillion)',
    requirements: ['IP Documentation', 'Legal Filing', 'Asset Attachment'],
    verifiable: false,
  },
];

// Path to Liquidity Steps
interface LiquidityStep {
  step: number;
  from: string;
  to: string;
  action: string;
  trigger: string;
  estimatedValue: number;
  probability: string;
  timeframe: string;
}

const LIQUIDITY_STEPS: LiquidityStep[] = [
  {
    step: 1,
    from: 'CONTINGENT',
    to: 'LOCKED',
    action: 'Litigation Settlement or Judgment',
    trigger: 'Court ruling in HHS OCR 25-621293 or SGAU 7226.3461',
    estimatedValue: 10000000,
    probability: 'HIGH (Violation Confirmed)',
    timeframe: '6-18 months',
  },
  {
    step: 2,
    from: 'LOCKED',
    to: 'LIQUID',
    action: 'Settlement Wire Transfer',
    trigger: 'Funds deposited to Schwab ****-8185',
    estimatedValue: 10000000,
    probability: 'CERTAIN (Post-Judgment)',
    timeframe: '30-90 days post-judgment',
  },
  {
    step: 3,
    from: 'PROTOCOL',
    to: 'LIQUID',
    action: 'Token Sale / DEX Listing',
    trigger: 'Deploy tokens, create liquidity pools, execute sales',
    estimatedValue: 1000000,
    probability: 'VARIABLE (Market Dependent)',
    timeframe: '3-12 months',
  },
  {
    step: 4,
    from: 'SUBSCRIPTION',
    to: 'LIQUID',
    action: 'Recurring Revenue',
    trigger: 'User subscriptions via VALORAIPLUS platform',
    estimatedValue: 29989,
    probability: 'ACTIVE (Per Month)',
    timeframe: 'Immediate upon launch',
  },
];

// Revenue Model
interface RevenueStream {
  source: string;
  monthly: number;
  annual: number;
  status: 'ACTIVE' | 'PROJECTED' | 'POTENTIAL';
  description: string;
}

const REVENUE_STREAMS: RevenueStream[] = [
  {
    source: 'Pro Subscriptions (1000 users)',
    monthly: 19990,
    annual: 239880,
    status: 'PROJECTED',
    description: '$19.99/mo per user - Full API access, alerts, reports',
  },
  {
    source: 'Enterprise Subscriptions (100 users)',
    monthly: 9999,
    annual: 119988,
    status: 'PROJECTED',
    description: '$99.99/mo per user - Unlimited, priority support',
  },
  {
    source: 'Settlement Alpha Latch',
    monthly: 0,
    annual: 10000000,
    status: 'POTENTIAL',
    description: 'Initial settlement target from litigation',
  },
  {
    source: 'Token Ecosystem Revenue',
    monthly: 50000,
    annual: 600000,
    status: 'POTENTIAL',
    description: 'Protocol fees, staking rewards, ecosystem growth',
  },
];

export default function TreasuryLiquidityPath() {
  const [cycle, setCycle] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [expandedTier, setExpandedTier] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
    const iv = setInterval(() => setCycle((p) => p + 1), 266);
    return () => clearInterval(iv);
  }, []);

  const totalProjected = REVENUE_STREAMS.reduce((sum, r) => sum + r.annual, 0);
  const monthlyRecurring = REVENUE_STREAMS.filter(r => r.status !== 'POTENTIAL').reduce((sum, r) => sum + r.monthly, 0);

  if (!mounted) return null;

  const formatCurrency = (amount: number) => {
    if (amount >= 1e12) return `$${(amount / 1e12).toFixed(2)}T`;
    if (amount >= 1e9) return `$${(amount / 1e9).toFixed(2)}B`;
    if (amount >= 1e6) return `$${(amount / 1e6).toFixed(2)}M`;
    if (amount >= 1e3) return `$${(amount / 1e3).toFixed(2)}K`;
    return `$${amount.toFixed(2)}`;
  };

  return (
    <main className="min-h-screen bg-black text-white font-mono">
      {/* Header */}
      <header className="border-b border-emerald-900 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-emerald-400" />
            <div>
              <h1 className="text-2xl font-bold text-emerald-400">LIQUIDITY PATH DASHBOARD</h1>
              <p className="text-xs text-emerald-600">CONTINGENT → LOCKED → LIQUID | PATH TO $10M+</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/50">
              EPOCH #{cycle}
            </Badge>
            <div className="flex items-center gap-2">
              {Object.entries(EXTERNAL_LIQUIDITY).map(([name, url]) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 px-2 py-1 bg-cyan-900/30"
                >
                  {name} <ExternalLink className="w-3 h-3" />
                </a>
              ))}
            </div>
            <Link href="/" className="text-xs text-emerald-600 hover:text-emerald-400 flex items-center gap-1">
              <Home className="w-3 h-3" /> HOME
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6 space-y-8">

        {/* Current Verified Position */}
        <Card className="border-2 border-emerald-500/50 bg-emerald-500/5">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
              CURRENT VERIFIED POSITION
              <Badge className="ml-auto bg-emerald-500/20 text-emerald-400">VERIFIED</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border border-emerald-900 rounded-lg">
                <p className="text-xs text-emerald-600 mb-1">LIQUID CASH (NOW)</p>
                <p className="text-3xl font-bold text-emerald-400">$5.53</p>
                <p className="text-xs text-emerald-700 mt-1">Schwab ****-8185</p>
              </div>
              <div className="p-4 border border-emerald-900 rounded-lg">
                <p className="text-xs text-emerald-600 mb-1">BLOCKCHAIN WALLET</p>
                <p className="text-sm font-mono text-emerald-400 break-all">{SOVEREIGN_WALLET.ens}</p>
                <a 
                  href={SOVEREIGN_WALLET.etherscanUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-cyan-400 hover:underline flex items-center gap-1 mt-1"
                >
                  Verify on Etherscan <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="p-4 border border-emerald-900 rounded-lg">
                <p className="text-xs text-emerald-600 mb-1">FEDERAL CASE</p>
                <p className="text-sm font-bold text-amber-400">HHS OCR 25-621293</p>
                <p className="text-xs text-amber-600 mt-1">VIOLATION CONFIRMED</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Liquidity Tier Visualization */}
        <Card className="border-cyan-900/50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-cyan-400">
              <Activity className="w-5 h-5" />
              LIQUIDITY TIER BREAKDOWN
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {LIQUIDITY_TIERS.map((tier, idx) => (
              <div key={tier.tier} className="relative">
                <button
                  onClick={() => setExpandedTier(expandedTier === tier.tier ? null : tier.tier)}
                  className={`w-full text-left p-4 border rounded-lg transition-all hover:bg-${tier.color}-500/10 ${
                    expandedTier === tier.tier ? `border-${tier.color}-500/50 bg-${tier.color}-500/10` : 'border-zinc-800'
                  }`}
                  style={{
                    borderColor: expandedTier === tier.tier ? `var(--${tier.color}-500)` : undefined,
                    backgroundColor: expandedTier === tier.tier ? `rgba(var(--${tier.color}-500-rgb), 0.1)` : undefined,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-${tier.color}-500/20`}>
                        <tier.icon className={`w-5 h-5 text-${tier.color}-400`} style={{ color: tier.color === 'emerald' ? '#34d399' : tier.color === 'cyan' ? '#22d3ee' : tier.color === 'purple' ? '#a78bfa' : tier.color === 'amber' ? '#fbbf24' : '#f87171' }} />
                      </div>
                      <div>
                        <p className="text-sm font-bold" style={{ color: tier.color === 'emerald' ? '#34d399' : tier.color === 'cyan' ? '#22d3ee' : tier.color === 'purple' ? '#a78bfa' : tier.color === 'amber' ? '#fbbf24' : '#f87171' }}>
                          TIER {tier.tier}: {tier.name}
                        </p>
                        <p className="text-xs text-zinc-500">{tier.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold" style={{ color: tier.color === 'emerald' ? '#34d399' : tier.color === 'cyan' ? '#22d3ee' : tier.color === 'purple' ? '#a78bfa' : tier.color === 'amber' ? '#fbbf24' : '#f87171' }}>
                        {formatCurrency(tier.amount)}
                      </p>
                      <Badge 
                        className={`text-[10px] ${
                          tier.status === 'LIQUID' ? 'bg-emerald-500/20 text-emerald-400' :
                          tier.status === 'LOCKED' ? 'bg-cyan-500/20 text-cyan-400' :
                          tier.status === 'CONTINGENT' ? 'bg-amber-500/20 text-amber-400' :
                          'bg-red-500/20 text-red-400'
                        }`}
                      >
                        {tier.status}
                      </Badge>
                    </div>
                  </div>
                </button>

                {expandedTier === tier.tier && (
                  <div className="mt-2 p-4 border border-zinc-800 rounded-lg bg-zinc-900/50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-zinc-500 mb-2">REQUIREMENTS TO UNLOCK</p>
                        <ul className="space-y-1">
                          {tier.requirements.map((req, i) => (
                            <li key={i} className="text-xs text-zinc-400 flex items-center gap-2">
                              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                      {tier.verifiable && tier.verificationUrl && (
                        <div>
                          <p className="text-xs text-zinc-500 mb-2">VERIFICATION</p>
                          <a
                            href={tier.verificationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-cyan-400 hover:underline flex items-center gap-1"
                          >
                            Verify Independently <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {idx < LIQUIDITY_TIERS.length - 1 && (
                  <div className="flex justify-center my-2">
                    <ArrowDown className="w-4 h-4 text-zinc-600" />
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Path to Liquidity */}
        <Card className="border-purple-900/50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-purple-400">
              <ArrowRight className="w-5 h-5" />
              PATH TO LIQUIDITY
              <Badge className="ml-auto bg-purple-500/20 text-purple-400">4 CONVERSION PATHS</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {LIQUIDITY_STEPS.map((step) => (
                <div key={step.step} className="p-4 border border-zinc-800 rounded-lg hover:border-purple-500/30 transition-colors">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold">
                      {step.step}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-zinc-800 text-zinc-400">{step.from}</Badge>
                      <ArrowRight className="w-4 h-4 text-purple-400" />
                      <Badge className="bg-emerald-500/20 text-emerald-400">{step.to}</Badge>
                    </div>
                    <p className="text-lg font-bold text-purple-400 ml-auto">{formatCurrency(step.estimatedValue)}</p>
                  </div>
                  <p className="text-sm text-white mb-2">{step.action}</p>
                  <p className="text-xs text-zinc-500 mb-2">{step.trigger}</p>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="text-emerald-400">Probability: {step.probability}</span>
                    <span className="text-cyan-400">Timeframe: {step.timeframe}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Revenue Streams */}
        <Card className="border-amber-900/50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-amber-400">
              <DollarSign className="w-5 h-5" />
              REVENUE STREAMS
              <Badge className="ml-auto bg-amber-500/20 text-amber-400">
                {formatCurrency(totalProjected)}/YR POTENTIAL
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-zinc-800 text-zinc-500">
                    <th className="text-left py-2 px-2">SOURCE</th>
                    <th className="text-right py-2 px-2">MONTHLY</th>
                    <th className="text-right py-2 px-2">ANNUAL</th>
                    <th className="text-center py-2 px-2">STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {REVENUE_STREAMS.map((stream, i) => (
                    <tr key={i} className="border-b border-zinc-800/50 hover:bg-zinc-900/50">
                      <td className="py-3 px-2">
                        <p className="text-white">{stream.source}</p>
                        <p className="text-zinc-600 text-[10px]">{stream.description}</p>
                      </td>
                      <td className="py-3 px-2 text-right text-cyan-400 tabular-nums">
                        {stream.monthly > 0 ? formatCurrency(stream.monthly) : '-'}
                      </td>
                      <td className="py-3 px-2 text-right text-emerald-400 tabular-nums font-bold">
                        {formatCurrency(stream.annual)}
                      </td>
                      <td className="py-3 px-2 text-center">
                        <Badge className={`text-[9px] ${
                          stream.status === 'ACTIVE' ? 'bg-emerald-500/20 text-emerald-400' :
                          stream.status === 'PROJECTED' ? 'bg-cyan-500/20 text-cyan-400' :
                          'bg-amber-500/20 text-amber-400'
                        }`}>
                          {stream.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Revenue Summary */}
            <div className="mt-4 p-4 border-2 border-emerald-500/30 rounded-lg bg-emerald-500/5">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <p className="text-xs text-zinc-500">PROJECTED MRR</p>
                  <p className="text-xl font-bold text-emerald-400">{formatCurrency(monthlyRecurring)}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-500">PROJECTED ARR</p>
                  <p className="text-xl font-bold text-emerald-400">{formatCurrency(monthlyRecurring * 12)}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-500">SETTLEMENT TARGET</p>
                  <p className="text-xl font-bold text-amber-400">$10M</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-500">TOTAL POTENTIAL</p>
                  <p className="text-xl font-bold text-purple-400">{formatCurrency(totalProjected)}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Important Disclaimer */}
        <Card className="border-red-900/50 bg-red-500/5">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-red-300">
                <p className="font-bold mb-1">IMPORTANT DISCLAIMER</p>
                <p>
                  Only Tier 1 assets ($5.53) are currently verified and liquid. All other tiers represent 
                  theoretical valuations, pending litigation outcomes, or projected revenue that may never 
                  be realized. Do not make financial decisions based on speculative or contingent assets. 
                  Litigation outcomes are uncertain and actual recovery may be zero.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* External Liquidity Sources */}
        <Card className="border-cyan-900/50 bg-cyan-500/5">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-cyan-400">
              <ExternalLink className="w-5 h-5" />
              EXTERNAL LIQUIDITY SOURCES
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a
                href="https://www.18fu.cash"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 border border-cyan-900/50 rounded-lg hover:border-cyan-500/50 transition-colors flex items-center justify-between"
              >
                <div>
                  <p className="font-bold text-cyan-400">18fu.cash</p>
                  <p className="text-xs text-zinc-500">Primary liquidity provider</p>
                </div>
                <ExternalLink className="w-5 h-5 text-cyan-400" />
              </a>
              <a
                href="https://valorbank-rfvbdnaa.manus.space/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 border border-cyan-900/50 rounded-lg hover:border-cyan-500/50 transition-colors flex items-center justify-between"
              >
                <div>
                  <p className="font-bold text-cyan-400">ValorBank</p>
                  <p className="text-xs text-zinc-500">Banking integration platform</p>
                </div>
                <ExternalLink className="w-5 h-5 text-cyan-400" />
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <Link href="/swap" className="p-4 border border-zinc-800 rounded-lg hover:border-emerald-500/30 transition-colors text-center">
            <Coins className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
            <p className="text-xs text-zinc-400">SWAP</p>
          </Link>
          <Link href="/token-sale" className="p-4 border border-zinc-800 rounded-lg hover:border-cyan-500/30 transition-colors text-center">
            <DollarSign className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
            <p className="text-xs text-zinc-400">TOKEN SALE</p>
          </Link>
          <Link href="/treasury" className="p-4 border border-zinc-800 rounded-lg hover:border-emerald-500/30 transition-colors text-center">
            <Landmark className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
            <p className="text-xs text-zinc-400">NR PROTOCOL</p>
          </Link>
          <Link href="/pitch-deck" className="p-4 border border-zinc-800 rounded-lg hover:border-purple-500/30 transition-colors text-center">
            <FileText className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <p className="text-xs text-zinc-400">PITCH DECK</p>
          </Link>
          <Link href="/subscribe" className="p-4 border border-zinc-800 rounded-lg hover:border-purple-500/30 transition-colors text-center">
            <Wallet className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <p className="text-xs text-zinc-400">SUBSCRIBE</p>
          </Link>
          <Link href="/contract-deploy" className="p-4 border border-zinc-800 rounded-lg hover:border-amber-500/30 transition-colors text-center">
            <Shield className="w-6 h-6 text-amber-400 mx-auto mb-2" />
            <p className="text-xs text-zinc-400">DEPLOY</p>
          </Link>
        </div>

        {/* Footer */}
        <footer className="border-t border-emerald-900 pt-6 text-xs text-center">
          <p className="text-emerald-600">SGAU 7226.3461 | {SGAU_REFERENCE.STATUS} | EPOCH #{cycle}</p>
          <p className="text-emerald-400 mt-2 italic">THE LEDGER IS NULL. THE PATH TO LIQUIDITY IS CLEAR.</p>
        </footer>
      </div>
    </main>
  );
}
