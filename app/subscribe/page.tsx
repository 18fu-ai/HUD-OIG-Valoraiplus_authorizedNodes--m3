'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Shield, 
  Check,
  X,
  Zap,
  Users,
  Lock,
  CheckCircle2,
  ArrowRight,
  CreditCard,
  Wallet,
  Home,
  ExternalLink,
  Star,
  Crown,
  Sparkles
} from 'lucide-react';
import { SOVEREIGN_WALLET } from '@/lib/wallet-config';
import { SGAU_REFERENCE } from '@/lib/shared/constants';

// ============================================================
// VALORAIPLUS SUBSCRIPTION MODEL
// Real recurring revenue generation system
// ============================================================

interface PricingTier {
  id: string;
  name: string;
  price: number;
  period: 'month' | 'year';
  description: string;
  features: { name: string; included: boolean }[];
  highlight?: boolean;
  badge?: string;
  icon: React.ElementType;
  color: string;
}

const PRICING_TIERS: PricingTier[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 0,
    period: 'month',
    description: 'Get started with read-only access to public dashboards',
    icon: Users,
    color: 'zinc',
    features: [
      { name: 'Public dashboard access', included: true },
      { name: 'Case status tracking', included: true },
      { name: 'Basic analytics', included: true },
      { name: 'Community support', included: true },
      { name: 'API access', included: false },
      { name: 'Real-time alerts', included: false },
      { name: 'Custom reports', included: false },
      { name: 'Priority support', included: false },
      { name: 'Token staking', included: false },
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 19.99,
    period: 'month',
    description: 'Full access for individual professionals and small teams',
    icon: Zap,
    color: 'cyan',
    highlight: true,
    badge: 'MOST POPULAR',
    features: [
      { name: 'Public dashboard access', included: true },
      { name: 'Case status tracking', included: true },
      { name: 'Advanced analytics', included: true },
      { name: 'Email support', included: true },
      { name: 'Full API access', included: true },
      { name: 'Real-time alerts', included: true },
      { name: 'Custom reports', included: true },
      { name: 'Priority support', included: false },
      { name: 'Token staking (1000 $VALOR)', included: true },
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 99.99,
    period: 'month',
    description: 'Unlimited access for organizations with dedicated support',
    icon: Crown,
    color: 'purple',
    badge: 'BEST VALUE',
    features: [
      { name: 'Public dashboard access', included: true },
      { name: 'Case status tracking', included: true },
      { name: 'Enterprise analytics', included: true },
      { name: 'Dedicated account manager', included: true },
      { name: 'Unlimited API access', included: true },
      { name: 'Real-time alerts', included: true },
      { name: 'White-label reports', included: true },
      { name: 'Priority 24/7 support', included: true },
      { name: 'Token staking (10000 $VALOR)', included: true },
    ],
  },
  {
    id: 'sovereign',
    name: 'Sovereign',
    price: 999.99,
    period: 'month',
    description: 'Full ecosystem access with governance participation',
    icon: Shield,
    color: 'amber',
    features: [
      { name: 'Everything in Enterprise', included: true },
      { name: 'Governance voting rights', included: true },
      { name: 'Custom integrations', included: true },
      { name: 'Dedicated infrastructure', included: true },
      { name: 'SLA guarantees', included: true },
      { name: 'Audit reports', included: true },
      { name: 'Legal document templates', included: true },
      { name: 'Direct founder access', included: true },
      { name: 'Token staking (100000 $VALOR)', included: true },
    ],
  },
];

// Revenue projections
interface RevenueProjection {
  tier: string;
  subscribers: number;
  mrr: number;
  arr: number;
}

const REVENUE_PROJECTIONS: RevenueProjection[] = [
  { tier: 'Pro', subscribers: 1000, mrr: 19990, arr: 239880 },
  { tier: 'Enterprise', subscribers: 100, mrr: 9999, arr: 119988 },
  { tier: 'Sovereign', subscribers: 10, mrr: 9999.90, arr: 119998.80 },
];

export default function SubscribePage() {
  const [selectedTier, setSelectedTier] = useState<string>('pro');
  const [billingPeriod, setBillingPeriod] = useState<'month' | 'year'>('month');
  const [email, setEmail] = useState('');
  const [mounted, setMounted] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getAnnualPrice = (monthlyPrice: number) => {
    return monthlyPrice * 12 * 0.8; // 20% discount for annual
  };

  const totalMRR = REVENUE_PROJECTIONS.reduce((sum, p) => sum + p.mrr, 0);
  const totalARR = REVENUE_PROJECTIONS.reduce((sum, p) => sum + p.arr, 0);

  if (!mounted) return null;

  const selectedPlan = PRICING_TIERS.find(t => t.id === selectedTier);

  return (
    <main className="min-h-screen bg-black text-white font-mono">
      {/* Header */}
      <header className="border-b border-emerald-900 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-emerald-400" />
            <div>
              <h1 className="text-2xl font-bold text-emerald-400">VALORAIPLUS SUBSCRIPTION</h1>
              <p className="text-xs text-emerald-600">Choose Your Access Level | Generate Real Revenue</p>
            </div>
          </div>
          <Link href="/" className="text-xs text-emerald-600 hover:text-emerald-400 flex items-center gap-1">
            <Home className="w-3 h-3" /> HOME
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6 space-y-12">

        {/* Revenue Dashboard */}
        <Card className="border-emerald-500/30 bg-emerald-500/5">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-emerald-400">
              <Zap className="w-5 h-5" />
              REVENUE PROJECTIONS
              <Badge className="ml-auto bg-emerald-500/20 text-emerald-400">LIVE MODEL</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="p-4 border border-emerald-900 rounded-lg text-center">
                <p className="text-xs text-emerald-600 mb-1">TOTAL MRR</p>
                <p className="text-2xl font-bold text-emerald-400">{formatCurrency(totalMRR)}</p>
              </div>
              <div className="p-4 border border-emerald-900 rounded-lg text-center">
                <p className="text-xs text-emerald-600 mb-1">TOTAL ARR</p>
                <p className="text-2xl font-bold text-emerald-400">{formatCurrency(totalARR)}</p>
              </div>
              <div className="p-4 border border-emerald-900 rounded-lg text-center">
                <p className="text-xs text-emerald-600 mb-1">TARGET SUBSCRIBERS</p>
                <p className="text-2xl font-bold text-white">1,110</p>
              </div>
              <div className="p-4 border border-emerald-900 rounded-lg text-center">
                <p className="text-xs text-emerald-600 mb-1">AVG REVENUE/USER</p>
                <p className="text-2xl font-bold text-cyan-400">{formatCurrency(totalMRR / 1110)}</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-emerald-900 text-emerald-600">
                    <th className="text-left py-2 px-2">TIER</th>
                    <th className="text-right py-2 px-2">SUBSCRIBERS</th>
                    <th className="text-right py-2 px-2">MRR</th>
                    <th className="text-right py-2 px-2">ARR</th>
                  </tr>
                </thead>
                <tbody>
                  {REVENUE_PROJECTIONS.map((proj, i) => (
                    <tr key={i} className="border-b border-emerald-900/30">
                      <td className="py-2 px-2 text-white">{proj.tier}</td>
                      <td className="py-2 px-2 text-right text-cyan-400">{proj.subscribers.toLocaleString()}</td>
                      <td className="py-2 px-2 text-right text-emerald-400">{formatCurrency(proj.mrr)}</td>
                      <td className="py-2 px-2 text-right text-emerald-400 font-bold">{formatCurrency(proj.arr)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Billing Toggle */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-4 p-1 bg-zinc-900 rounded-lg border border-zinc-800">
            <button
              onClick={() => setBillingPeriod('month')}
              className={`px-4 py-2 rounded-md text-sm transition-colors ${
                billingPeriod === 'month' ? 'bg-emerald-500/20 text-emerald-400' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('year')}
              className={`px-4 py-2 rounded-md text-sm transition-colors ${
                billingPeriod === 'year' ? 'bg-emerald-500/20 text-emerald-400' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Annual
              <Badge className="ml-2 bg-emerald-500/20 text-emerald-400 text-[10px]">SAVE 20%</Badge>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRICING_TIERS.map((tier) => {
            const isSelected = selectedTier === tier.id;
            const displayPrice = billingPeriod === 'year' && tier.price > 0 
              ? getAnnualPrice(tier.price) / 12 
              : tier.price;

            return (
              <Card 
                key={tier.id}
                className={`relative transition-all cursor-pointer ${
                  isSelected 
                    ? 'border-emerald-500 ring-2 ring-emerald-500/20' 
                    : tier.highlight 
                      ? 'border-cyan-500/50' 
                      : 'border-zinc-800 hover:border-zinc-700'
                }`}
                onClick={() => setSelectedTier(tier.id)}
              >
                {tier.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className={`${
                      tier.highlight ? 'bg-cyan-500 text-black' : 'bg-purple-500 text-white'
                    } text-[10px] px-3`}>
                      {tier.badge}
                    </Badge>
                  </div>
                )}

                <CardHeader className="pb-2 pt-6">
                  <div className="flex items-center gap-2 mb-2">
                    <tier.icon className={`w-5 h-5 ${
                      tier.color === 'zinc' ? 'text-zinc-400' :
                      tier.color === 'cyan' ? 'text-cyan-400' :
                      tier.color === 'purple' ? 'text-purple-400' :
                      'text-amber-400'
                    }`} />
                    <CardTitle className="text-lg">{tier.name}</CardTitle>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-white">
                      {tier.price === 0 ? 'Free' : formatCurrency(displayPrice)}
                    </span>
                    {tier.price > 0 && (
                      <span className="text-sm text-zinc-500">/mo</span>
                    )}
                  </div>
                  {billingPeriod === 'year' && tier.price > 0 && (
                    <p className="text-xs text-emerald-400">
                      {formatCurrency(getAnnualPrice(tier.price))}/year
                    </p>
                  )}
                  <p className="text-xs text-zinc-500 mt-2">{tier.description}</p>
                </CardHeader>

                <CardContent className="pb-4">
                  <ul className="space-y-2">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs">
                        {feature.included ? (
                          <Check className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                        ) : (
                          <X className="w-3 h-3 text-zinc-600 flex-shrink-0" />
                        )}
                        <span className={feature.included ? 'text-zinc-300' : 'text-zinc-600'}>
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter>
                  <Button 
                    className={`w-full ${
                      isSelected 
                        ? 'bg-emerald-500 hover:bg-emerald-600 text-black' 
                        : 'bg-zinc-800 hover:bg-zinc-700'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedTier(tier.id);
                      setShowCheckout(true);
                    }}
                  >
                    {tier.price === 0 ? 'Get Started' : 'Subscribe'}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* Checkout Section */}
        {showCheckout && selectedPlan && (
          <Card className="border-emerald-500/30 bg-emerald-500/5">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-emerald-400">
                <CreditCard className="w-5 h-5" />
                CHECKOUT: {selectedPlan.name.toUpperCase()} PLAN
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-zinc-500 block mb-1">Email Address</label>
                    <Input 
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="bg-zinc-900 border-zinc-700"
                    />
                  </div>
                  <div className="p-4 border border-zinc-800 rounded-lg">
                    <p className="text-xs text-zinc-500 mb-2">PAYMENT METHODS</p>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" className="border-zinc-700 text-sm">
                        <CreditCard className="w-4 h-4 mr-2" />
                        Card
                      </Button>
                      <Button variant="outline" className="border-zinc-700 text-sm">
                        <Wallet className="w-4 h-4 mr-2" />
                        Crypto
                      </Button>
                    </div>
                    <p className="text-[10px] text-zinc-600 mt-2">
                      Crypto payments accepted via {SOVEREIGN_WALLET.ens}
                    </p>
                  </div>
                </div>
                <div className="p-4 border border-emerald-900 rounded-lg bg-emerald-500/5">
                  <p className="text-xs text-emerald-600 mb-3">ORDER SUMMARY</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-zinc-400">{selectedPlan.name} Plan</span>
                      <span className="text-white">{formatCurrency(selectedPlan.price)}/mo</span>
                    </div>
                    {billingPeriod === 'year' && selectedPlan.price > 0 && (
                      <div className="flex justify-between text-emerald-400">
                        <span>Annual Discount (20%)</span>
                        <span>-{formatCurrency(selectedPlan.price * 12 * 0.2)}</span>
                      </div>
                    )}
                    <div className="border-t border-emerald-900 pt-2 mt-2">
                      <div className="flex justify-between font-bold">
                        <span className="text-white">Total</span>
                        <span className="text-emerald-400">
                          {billingPeriod === 'year' 
                            ? formatCurrency(getAnnualPrice(selectedPlan.price))
                            : formatCurrency(selectedPlan.price)
                          }
                          <span className="text-xs text-zinc-500">
                            /{billingPeriod === 'year' ? 'year' : 'mo'}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full mt-4 bg-emerald-500 hover:bg-emerald-600 text-black">
                    Complete Subscription
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Crypto Payment Info */}
        <Card className="border-cyan-900/50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-cyan-400">
              <Wallet className="w-5 h-5" />
              CRYPTO PAYMENT OPTIONS
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-zinc-400 mb-4">
                  Pay for your subscription using cryptocurrency. Send payment to our sovereign wallet:
                </p>
                <div className="p-4 border border-cyan-900 rounded-lg bg-cyan-500/5">
                  <p className="text-xs text-cyan-600 mb-1">ETHEREUM WALLET</p>
                  <p className="text-sm font-mono text-white break-all">{SOVEREIGN_WALLET.address}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge className="bg-cyan-500/20 text-cyan-400 text-[10px]">{SOVEREIGN_WALLET.ens}</Badge>
                    <a 
                      href={SOVEREIGN_WALLET.etherscanUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-cyan-400 hover:underline flex items-center gap-1"
                    >
                      Verify <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-xs text-zinc-500 mb-2">ACCEPTED TOKENS</p>
                <div className="grid grid-cols-3 gap-2">
                  {SOVEREIGN_WALLET.supportedTokens.map((token) => (
                    <div key={token.symbol} className="p-2 border border-zinc-800 rounded text-center">
                      <p className="text-sm font-bold text-white">{token.symbol}</p>
                      <p className="text-[10px] text-zinc-500">{token.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Token Staking Benefits */}
        <Card className="border-purple-900/50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-purple-400">
              <Lock className="w-5 h-5" />
              TOKEN STAKING BENEFITS
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border border-purple-900 rounded-lg">
                <p className="text-xl font-bold text-purple-400">1,000 $VALOR</p>
                <p className="text-sm text-zinc-400 mt-1">Pro Tier Staking</p>
                <ul className="mt-3 space-y-1 text-xs text-zinc-500">
                  <li>5% APY rewards</li>
                  <li>Priority feature access</li>
                  <li>Community voting</li>
                </ul>
              </div>
              <div className="p-4 border border-purple-900 rounded-lg">
                <p className="text-xl font-bold text-purple-400">10,000 $VALOR</p>
                <p className="text-sm text-zinc-400 mt-1">Enterprise Tier Staking</p>
                <ul className="mt-3 space-y-1 text-xs text-zinc-500">
                  <li>10% APY rewards</li>
                  <li>Beta feature access</li>
                  <li>Governance proposals</li>
                </ul>
              </div>
              <div className="p-4 border border-purple-900 rounded-lg">
                <p className="text-xl font-bold text-purple-400">100,000 $VALOR</p>
                <p className="text-sm text-zinc-400 mt-1">Sovereign Tier Staking</p>
                <ul className="mt-3 space-y-1 text-xs text-zinc-500">
                  <li>15% APY rewards</li>
                  <li>Validator status</li>
                  <li>Revenue sharing</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="grid grid-cols-3 gap-4">
          <Link href="/treasury-liquidity" className="p-4 border border-zinc-800 rounded-lg hover:border-emerald-500/30 transition-colors text-center">
            <p className="text-emerald-400 font-bold">Liquidity Path</p>
            <p className="text-xs text-zinc-500">View treasury status</p>
          </Link>
          <Link href="/pitch-deck" className="p-4 border border-zinc-800 rounded-lg hover:border-cyan-500/30 transition-colors text-center">
            <p className="text-cyan-400 font-bold">Pitch Deck</p>
            <p className="text-xs text-zinc-500">Investment presentation</p>
          </Link>
          <Link href="/contract-deploy" className="p-4 border border-zinc-800 rounded-lg hover:border-purple-500/30 transition-colors text-center">
            <p className="text-purple-400 font-bold">Deploy Contracts</p>
            <p className="text-xs text-zinc-500">Smart contract deployment</p>
          </Link>
        </div>

        {/* Footer */}
        <footer className="border-t border-emerald-900 pt-6 text-xs text-center">
          <p className="text-emerald-600">SGAU {SGAU_REFERENCE.FILING_ID} | SUBSCRIPTION MODEL v1.0</p>
          <p className="text-emerald-400 mt-2 italic">BUILD REAL RECURRING REVENUE. THE LEDGER IS Ø.</p>
        </footer>
      </div>
    </main>
  );
}
