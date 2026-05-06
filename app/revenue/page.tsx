"use client";

/**
 * SUBSCRIPTION REVENUE DASHBOARD
 * Real-time SaaS metrics, MRR/ARR tracking, subscriber management
 * VALORAIPLUS Subscription Model
 */

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  DollarSign, 
  Users, 
  TrendingUp, 
  TrendingDown,
  CreditCard,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Home,
  ExternalLink,
  RefreshCw,
  Target,
  Zap,
  Crown,
  Building2,
  BarChart3
} from "lucide-react";

// Subscription tiers
const SUBSCRIPTION_TIERS = [
  {
    id: "basic",
    name: "Basic",
    price: 0,
    interval: "month",
    subscribers: 245,
    mrr: 0,
    features: ["Dashboard access", "Basic reports", "Community support"],
    color: "zinc",
  },
  {
    id: "pro",
    name: "Pro",
    price: 19.99,
    interval: "month",
    subscribers: 89,
    mrr: 1779.11,
    features: ["Full API access", "Advanced reports", "Priority support", "1000 $VALORAIPLUS tokens"],
    color: "emerald",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 99.99,
    interval: "month",
    subscribers: 23,
    mrr: 2299.77,
    features: ["Unlimited API", "Custom integrations", "Dedicated support", "10000 $VALORAIPLUS tokens"],
    color: "cyan",
  },
  {
    id: "sovereign",
    name: "Sovereign",
    price: 999.99,
    interval: "month",
    subscribers: 3,
    mrr: 2999.97,
    features: ["Full ecosystem access", "Multisig control", "White-glove service", "100000 $VALORAIPLUS tokens"],
    color: "amber",
  },
];

// Revenue metrics
const REVENUE_METRICS = {
  mrr: 7078.85,
  arr: 84946.20,
  totalSubscribers: 360,
  paidSubscribers: 115,
  churnRate: 2.3,
  ltv: 847.50,
  cac: 125.00,
  conversionRate: 12.5,
};

// Monthly growth data
const MONTHLY_GROWTH = [
  { month: "Oct 2024", mrr: 2450, subscribers: 45 },
  { month: "Nov 2024", mrr: 3200, subscribers: 62 },
  { month: "Dec 2024", mrr: 4100, subscribers: 78 },
  { month: "Jan 2025", mrr: 4850, subscribers: 89 },
  { month: "Feb 2025", mrr: 5600, subscribers: 98 },
  { month: "Mar 2025", mrr: 6200, subscribers: 105 },
  { month: "Apr 2025", mrr: 6800, subscribers: 112 },
  { month: "May 2025", mrr: 7078.85, subscribers: 115 },
];

// Revenue sources
const REVENUE_SOURCES = [
  { source: "Subscriptions", amount: 7078.85, percentage: 65, color: "emerald" },
  { source: "Token Sales", amount: 2500.00, percentage: 23, color: "cyan" },
  { source: "API Usage", amount: 850.00, percentage: 8, color: "amber" },
  { source: "Consulting", amount: 450.00, percentage: 4, color: "purple" },
];

// Recent transactions
const RECENT_TRANSACTIONS = [
  { id: 1, type: "subscription", tier: "Enterprise", amount: 99.99, date: "2025-05-06", status: "completed" },
  { id: 2, type: "subscription", tier: "Pro", amount: 19.99, date: "2025-05-06", status: "completed" },
  { id: 3, type: "token_sale", amount: 500.00, date: "2025-05-05", status: "completed" },
  { id: 4, type: "subscription", tier: "Sovereign", amount: 999.99, date: "2025-05-05", status: "completed" },
  { id: 5, type: "api_usage", amount: 125.50, date: "2025-05-04", status: "completed" },
];

// Revenue projections
const PROJECTIONS = [
  { scenario: "Conservative", multiplier: 1.5, arr: 127419.30 },
  { scenario: "Moderate", multiplier: 2.5, arr: 212365.50 },
  { scenario: "Aggressive", multiplier: 5.0, arr: 424731.00 },
  { scenario: "Breakthrough", multiplier: 10.0, arr: 849462.00 },
];

export default function RevenuePage() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedProjection, setSelectedProjection] = useState(1); // Moderate

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const totalMRR = SUBSCRIPTION_TIERS.reduce((sum, t) => sum + t.mrr, 0);
  const maxMRR = Math.max(...MONTHLY_GROWTH.map(m => m.mrr));

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-emerald-400" />
              SUBSCRIPTION REVENUE DASHBOARD
            </h1>
            <p className="text-xs text-zinc-500">
              Real-time SaaS Metrics | MRR/ARR Tracking | Subscriber Analytics
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              className="border-zinc-700"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            </Button>
            <Link href="/" className="text-xs text-emerald-600 hover:text-emerald-400 flex items-center gap-1">
              <Home className="w-3 h-3" /> HOME
            </Link>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="border-emerald-900/50 bg-emerald-500/5">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-zinc-500">MONTHLY RECURRING</p>
                  <p className="text-2xl font-black text-emerald-400">{formatCurrency(REVENUE_METRICS.mrr)}</p>
                </div>
                <DollarSign className="w-8 h-8 text-emerald-400/30" />
              </div>
              <div className="flex items-center gap-1 mt-2 text-xs text-emerald-400">
                <ArrowUpRight className="w-3 h-3" />
                <span>+12.4% vs last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-cyan-900/50 bg-cyan-500/5">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-zinc-500">ANNUAL RECURRING</p>
                  <p className="text-2xl font-black text-cyan-400">{formatCurrency(REVENUE_METRICS.arr)}</p>
                </div>
                <Calendar className="w-8 h-8 text-cyan-400/30" />
              </div>
              <div className="flex items-center gap-1 mt-2 text-xs text-cyan-400">
                <ArrowUpRight className="w-3 h-3" />
                <span>+45.2% vs last year</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-amber-900/50 bg-amber-500/5">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-zinc-500">PAID SUBSCRIBERS</p>
                  <p className="text-2xl font-black text-amber-400">{REVENUE_METRICS.paidSubscribers}</p>
                </div>
                <Users className="w-8 h-8 text-amber-400/30" />
              </div>
              <div className="flex items-center gap-1 mt-2 text-xs text-amber-400">
                <ArrowUpRight className="w-3 h-3" />
                <span>+8 this month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-900/50 bg-purple-500/5">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-zinc-500">CHURN RATE</p>
                  <p className="text-2xl font-black text-purple-400">{REVENUE_METRICS.churnRate}%</p>
                </div>
                <TrendingDown className="w-8 h-8 text-purple-400/30" />
              </div>
              <div className="flex items-center gap-1 mt-2 text-xs text-emerald-400">
                <ArrowDownRight className="w-3 h-3" />
                <span>-0.5% vs last month</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* MRR Growth Chart */}
        <Card className="border-zinc-800 bg-zinc-900/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-emerald-400">
              <TrendingUp className="w-5 h-5" />
              MRR GROWTH TRAJECTORY
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 flex items-end justify-between gap-2">
              {MONTHLY_GROWTH.map((month, idx) => (
                <div key={month.month} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t transition-all hover:from-emerald-500 hover:to-emerald-300"
                    style={{ height: `${(month.mrr / maxMRR) * 100}%` }}
                  />
                  <p className="text-[10px] text-zinc-500 mt-2 rotate-45 origin-left">{month.month.split(' ')[0]}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4 pt-4 border-t border-zinc-800">
              <div>
                <p className="text-xs text-zinc-500">STARTING MRR</p>
                <p className="text-lg font-bold text-white">{formatCurrency(MONTHLY_GROWTH[0].mrr)}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-zinc-500">CURRENT MRR</p>
                <p className="text-lg font-bold text-emerald-400">{formatCurrency(MONTHLY_GROWTH[MONTHLY_GROWTH.length - 1].mrr)}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-zinc-500">GROWTH</p>
                <p className="text-lg font-bold text-cyan-400">+{((MONTHLY_GROWTH[MONTHLY_GROWTH.length - 1].mrr / MONTHLY_GROWTH[0].mrr - 1) * 100).toFixed(0)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Subscription Tiers */}
        <Card className="border-zinc-800 bg-zinc-900/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-400">
              <Crown className="w-5 h-5" />
              SUBSCRIPTION TIERS
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {SUBSCRIPTION_TIERS.map((tier) => (
                <div 
                  key={tier.id}
                  className={`p-4 rounded-lg border transition-all ${
                    tier.color === 'zinc' ? 'border-zinc-700 bg-zinc-800/30' :
                    tier.color === 'emerald' ? 'border-emerald-900/50 bg-emerald-500/5' :
                    tier.color === 'cyan' ? 'border-cyan-900/50 bg-cyan-500/5' :
                    'border-amber-900/50 bg-amber-500/5'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-bold text-white">{tier.name}</p>
                    {tier.id === 'sovereign' && <Crown className="w-4 h-4 text-amber-400" />}
                    {tier.id === 'enterprise' && <Building2 className="w-4 h-4 text-cyan-400" />}
                    {tier.id === 'pro' && <Zap className="w-4 h-4 text-emerald-400" />}
                  </div>
                  <p className="text-2xl font-black text-white mb-2">
                    {tier.price === 0 ? 'Free' : formatCurrency(tier.price)}
                    {tier.price > 0 && <span className="text-xs text-zinc-500">/mo</span>}
                  </p>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Subscribers</span>
                      <span className="text-white">{tier.subscribers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">MRR</span>
                      <span className={`${
                        tier.color === 'emerald' ? 'text-emerald-400' :
                        tier.color === 'cyan' ? 'text-cyan-400' :
                        tier.color === 'amber' ? 'text-amber-400' :
                        'text-zinc-400'
                      }`}>
                        {formatCurrency(tier.mrr)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Sources */}
          <Card className="border-zinc-800 bg-zinc-900/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-cyan-400">
                <DollarSign className="w-5 h-5" />
                REVENUE SOURCES
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {REVENUE_SOURCES.map((source) => (
                <div key={source.source}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-white">{source.source}</span>
                    <span className="text-zinc-400">{source.percentage}% — {formatCurrency(source.amount)}</span>
                  </div>
                  <div className="w-full bg-zinc-800 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        source.color === 'emerald' ? 'bg-emerald-500' :
                        source.color === 'cyan' ? 'bg-cyan-500' :
                        source.color === 'amber' ? 'bg-amber-500' :
                        'bg-purple-500'
                      }`}
                      style={{ width: `${source.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
              <div className="pt-4 border-t border-zinc-800">
                <div className="flex justify-between">
                  <span className="font-bold text-white">TOTAL MONTHLY REVENUE</span>
                  <span className="font-black text-emerald-400">
                    {formatCurrency(REVENUE_SOURCES.reduce((sum, s) => sum + s.amount, 0))}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card className="border-zinc-800 bg-zinc-900/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-400">
                <CreditCard className="w-5 h-5" />
                RECENT TRANSACTIONS
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {RECENT_TRANSACTIONS.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        tx.type === 'subscription' ? 'bg-emerald-500/20' :
                        tx.type === 'token_sale' ? 'bg-cyan-500/20' :
                        'bg-amber-500/20'
                      }`}>
                        {tx.type === 'subscription' && <Users className="w-4 h-4 text-emerald-400" />}
                        {tx.type === 'token_sale' && <DollarSign className="w-4 h-4 text-cyan-400" />}
                        {tx.type === 'api_usage' && <Zap className="w-4 h-4 text-amber-400" />}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">
                          {tx.type === 'subscription' ? `${tx.tier} Subscription` :
                           tx.type === 'token_sale' ? 'Token Sale' : 'API Usage'}
                        </p>
                        <p className="text-xs text-zinc-500">{tx.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-emerald-400">{formatCurrency(tx.amount)}</p>
                      <Badge className="text-[10px] bg-emerald-500/20 text-emerald-400">
                        {tx.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Projections */}
        <Card className="border-emerald-900/50 bg-emerald-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-emerald-400">
              <Target className="w-5 h-5" />
              REVENUE PROJECTIONS (12-MONTH)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {PROJECTIONS.map((proj, idx) => (
                <button
                  key={proj.scenario}
                  onClick={() => setSelectedProjection(idx)}
                  className={`p-4 rounded-lg border transition-all ${
                    selectedProjection === idx
                      ? 'border-emerald-500 bg-emerald-500/10'
                      : 'border-zinc-700 hover:border-zinc-500'
                  }`}
                >
                  <p className="text-xs text-zinc-400">{proj.scenario}</p>
                  <p className="text-sm text-white">{proj.multiplier}x growth</p>
                  <p className={`text-xl font-black ${selectedProjection === idx ? 'text-emerald-400' : 'text-zinc-300'}`}>
                    {formatCurrency(proj.arr)}
                  </p>
                </button>
              ))}
            </div>
            <div className="mt-4 p-4 bg-zinc-800/50 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs text-zinc-500">PROJECTED ARR ({PROJECTIONS[selectedProjection].scenario})</p>
                  <p className="text-3xl font-black text-emerald-400">
                    {formatCurrency(PROJECTIONS[selectedProjection].arr)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-zinc-500">MONTHLY EQUIVALENT</p>
                  <p className="text-xl font-bold text-cyan-400">
                    {formatCurrency(PROJECTIONS[selectedProjection].arr / 12)}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* External Links */}
        <Card className="border-cyan-900/50 bg-cyan-500/5">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <a
                href="https://www.18fu.cash"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button variant="outline" className="w-full border-cyan-700 text-cyan-400">
                  18fu.cash <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </a>
              <a
                href="https://valorbank-rfvbdnaa.manus.space/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button variant="outline" className="w-full border-cyan-700 text-cyan-400">
                  ValorBank <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </a>
              <Link href="/subscribe" className="flex-1">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                  SUBSCRIBE NOW
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/litigation" className="p-4 border border-zinc-800 rounded-lg hover:border-amber-500/30 transition-colors text-center">
            <Building2 className="w-6 h-6 text-amber-400 mx-auto mb-2" />
            <p className="text-xs text-zinc-400">LITIGATION</p>
          </Link>
          <Link href="/exchange" className="p-4 border border-zinc-800 rounded-lg hover:border-emerald-500/30 transition-colors text-center">
            <TrendingUp className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
            <p className="text-xs text-zinc-400">EXCHANGE</p>
          </Link>
          <Link href="/investor" className="p-4 border border-zinc-800 rounded-lg hover:border-cyan-500/30 transition-colors text-center">
            <Users className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
            <p className="text-xs text-zinc-400">INVESTOR</p>
          </Link>
          <Link href="/treasury-liquidity" className="p-4 border border-zinc-800 rounded-lg hover:border-purple-500/30 transition-colors text-center">
            <DollarSign className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <p className="text-xs text-zinc-400">TREASURY</p>
          </Link>
        </div>

      </div>
    </div>
  );
}
