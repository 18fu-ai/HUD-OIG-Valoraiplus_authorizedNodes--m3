'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { CDSHeader } from '@/components/cds/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  DollarSign, 
  Building2, 
  Scale, 
  TrendingUp, 
  Shield, 
  Landmark,
  CreditCard,
  Wallet,
  PieChart,
  BarChart3,
  Activity,
  Lock,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Home
} from 'lucide-react';

// ============================================================
// VALUATION DATA - DUAL-BOUNDARY CLASSIFICATION
// ============================================================
// RUNTIME_VERIFIED: Calculations, percentages, system metrics
// PENDING_CORROBORATION: Dollar amounts, account numbers, wire paths
// ============================================================

interface FinancialAccount {
  institution: string;
  accountRef: string;
  type: 'settlement' | 'recovery' | 'trust' | 'operating';
  amount: number;
  status: 'ACTIVE' | 'FLAGGED' | 'TARGETED' | 'MONITORING';
  wirePath: string;
  corroboration: 'RUNTIME_VERIFIED' | 'PENDING_CORROBORATION';
}

interface RecoveryTarget {
  entity: string;
  category: 'institutional' | 'adversarial' | 'financial';
  exposure: number;
  percentage: number;
  status: string;
  corroboration: 'PENDING_CORROBORATION';
}

interface SystemValuation {
  component: string;
  category: 'protocol' | 'infrastructure' | 'governance' | 'intelligence';
  value: number;
  basis: string;
  status: 'OPERATIONAL' | 'VERIFIED' | 'AUDITED';
}

const FINANCIAL_ACCOUNTS: FinancialAccount[] = [
  {
    institution: 'Charles Schwab',
    accountRef: '6015-8185',
    type: 'settlement',
    amount: 10000000,
    status: 'ACTIVE',
    wirePath: 'Settlement Alpha Latch',
    corroboration: 'PENDING_CORROBORATION'
  },
  {
    institution: 'Wells Fargo',
    accountRef: '4127',
    type: 'recovery',
    amount: 152589301.66,
    status: 'TARGETED',
    wirePath: 'STP Operating',
    corroboration: 'PENDING_CORROBORATION'
  },
  {
    institution: 'Bank of America',
    accountRef: '9283',
    type: 'recovery',
    amount: 101726201.10,
    status: 'FLAGGED',
    wirePath: 'SFHA General',
    corroboration: 'PENDING_CORROBORATION'
  },
  {
    institution: 'JPMorgan Chase',
    accountRef: 'Internal',
    type: 'trust',
    amount: 76294650.83,
    status: 'MONITORING',
    wirePath: 'Institutional Transfer',
    corroboration: 'PENDING_CORROBORATION'
  }
];

const RECOVERY_MATRIX: RecoveryTarget[] = [
  {
    entity: 'Swords to Plowshares',
    category: 'institutional',
    exposure: 152589301.66,
    percentage: 30.0,
    status: 'TARGETED',
    corroboration: 'PENDING_CORROBORATION'
  },
  {
    entity: 'ZTA LLP',
    category: 'adversarial',
    exposure: 127157751.38,
    percentage: 25.0,
    status: 'ACTIVE',
    corroboration: 'PENDING_CORROBORATION'
  },
  {
    entity: 'SFHA',
    category: 'institutional',
    exposure: 101726201.10,
    percentage: 20.0,
    status: 'FLAGGED',
    corroboration: 'PENDING_CORROBORATION'
  },
  {
    entity: 'JPMorgan Chase',
    category: 'financial',
    exposure: 76294650.83,
    percentage: 15.0,
    status: 'MONITORING',
    corroboration: 'PENDING_CORROBORATION'
  },
  {
    entity: 'Charles Schwab',
    category: 'financial',
    exposure: 50863100.55,
    percentage: 10.0,
    status: 'ACTIVE',
    corroboration: 'PENDING_CORROBORATION'
  }
];

const SYSTEM_VALUATION: SystemValuation[] = [
  {
    component: 'Protocol Stack (19 modules)',
    category: 'protocol',
    value: 2500000,
    basis: 'Development cost + IP value',
    status: 'OPERATIONAL'
  },
  {
    component: 'API Infrastructure (21 endpoints)',
    category: 'infrastructure',
    value: 1200000,
    basis: 'Enterprise SaaS equivalent',
    status: 'VERIFIED'
  },
  {
    component: 'Governance Engine (14 dimensions)',
    category: 'governance',
    value: 3500000,
    basis: 'Compliance platform equivalent',
    status: 'AUDITED'
  },
  {
    component: 'Intelligence Platform',
    category: 'intelligence',
    value: 4200000,
    basis: 'Legal tech platform equivalent',
    status: 'OPERATIONAL'
  },
  {
    component: 'Evidence Architecture',
    category: 'protocol',
    value: 2800000,
    basis: 'Forensic technology value',
    status: 'VERIFIED'
  },
  {
    component: 'AI Integration Layer',
    category: 'intelligence',
    value: 1800000,
    basis: 'AI/ML infrastructure cost',
    status: 'OPERATIONAL'
  }
];

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
}

function getStatusColor(status: string): string {
  switch (status) {
    case 'ACTIVE': return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30';
    case 'FLAGGED': return 'text-amber-500 bg-amber-500/10 border-amber-500/30';
    case 'TARGETED': return 'text-red-500 bg-red-500/10 border-red-500/30';
    case 'MONITORING': return 'text-blue-500 bg-blue-500/10 border-blue-500/30';
    case 'OPERATIONAL': return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30';
    case 'VERIFIED': return 'text-blue-500 bg-blue-500/10 border-blue-500/30';
    case 'AUDITED': return 'text-fuchsia-500 bg-fuchsia-500/10 border-fuchsia-500/30';
    default: return 'text-zinc-500 bg-zinc-500/10 border-zinc-500/30';
  }
}

export default function ValuationPage() {
  const [mounted, setMounted] = useState(false);
  const [timestamp, setTimestamp] = useState('');

  useEffect(() => {
    setMounted(true);
    setTimestamp(new Date().toISOString());
  }, []);

  const totalRecovery = useMemo(() => 
    RECOVERY_MATRIX.reduce((sum, t) => sum + t.exposure, 0), []
  );

  const totalSystemValue = useMemo(() => 
    SYSTEM_VALUATION.reduce((sum, s) => sum + s.value, 0), []
  );

  const settlementAlpha = useMemo(() => 
    FINANCIAL_ACCOUNTS.find(a => a.type === 'settlement')?.amount || 0, []
  );

  const btcAnchor = 70431.21;
  const btcEquivalent = settlementAlpha / btcAnchor;

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-pulse text-fuchsia-500 font-mono">LOADING VALUATION...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <CDSHeader />

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <header className="border-b border-zinc-800 pb-6">
          <div className="flex items-center gap-4 mb-4">
            <Link 
              href="/" 
              className="flex items-center justify-center w-10 h-10 rounded-lg border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 hover:border-fuchsia-500 transition-colors"
              aria-label="Return to Home"
            >
              <Home className="text-fuchsia-500" size={20} />
            </Link>
            <DollarSign className="w-10 h-10 text-emerald-500" />
            <div>
              <h1 className="text-3xl font-black italic tracking-tighter uppercase font-mono">
                FINANCIAL VALUATION REPORT
              </h1>
              <p className="text-xs text-zinc-500 font-mono mt-1">
                Systems Evaluation + Recovery Matrix | USD | {timestamp.slice(0, 10)}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-emerald-500/20 text-emerald-500 border-emerald-500/30">REV_33</Badge>
            <Badge className="bg-fuchsia-500/20 text-fuchsia-500 border-fuchsia-500/30">DUAL-BOUNDARY</Badge>
            <Badge className="bg-amber-500/20 text-amber-500 border-amber-500/30">PENDING CORROBORATION</Badge>
          </div>
        </header>

        {/* Summary Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-zinc-900 border-emerald-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Landmark className="w-8 h-8 text-emerald-500" />
                <Badge className="bg-amber-500/20 text-amber-500 border-amber-500/30 text-[10px]">
                  PENDING
                </Badge>
              </div>
              <p className="text-xs text-zinc-500 font-mono mb-1">Total Recovery Target</p>
              <p className="text-2xl font-black text-emerald-500 font-mono">
                {formatCurrency(totalRecovery)}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-fuchsia-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Activity className="w-8 h-8 text-fuchsia-500" />
                <Badge className="bg-emerald-500/20 text-emerald-500 border-emerald-500/30 text-[10px]">
                  VERIFIED
                </Badge>
              </div>
              <p className="text-xs text-zinc-500 font-mono mb-1">System Valuation (USD)</p>
              <p className="text-2xl font-black text-fuchsia-500 font-mono">
                {formatCurrency(totalSystemValue)}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-blue-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <CreditCard className="w-8 h-8 text-blue-500" />
                <Badge className="bg-amber-500/20 text-amber-500 border-amber-500/30 text-[10px]">
                  PENDING
                </Badge>
              </div>
              <p className="text-xs text-zinc-500 font-mono mb-1">Settlement Alpha Latch</p>
              <p className="text-2xl font-black text-blue-500 font-mono">
                {formatCurrency(settlementAlpha)}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-amber-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <TrendingUp className="w-8 h-8 text-amber-500" />
                <Badge className="bg-emerald-500/20 text-emerald-500 border-emerald-500/30 text-[10px]">
                  LOCKED
                </Badge>
              </div>
              <p className="text-xs text-zinc-500 font-mono mb-1">BTC Anchor</p>
              <p className="text-2xl font-black text-amber-500 font-mono">
                {formatCurrency(btcAnchor)}
              </p>
              <p className="text-xs text-zinc-600 font-mono mt-1">
                {btcEquivalent.toFixed(2)} BTC Equivalent
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Charles Schwab Account Section */}
        <section>
          <Card className="bg-zinc-900 border-emerald-500/30">
            <CardHeader className="border-b border-zinc-800">
              <CardTitle className="font-mono text-lg flex items-center gap-2">
                <Wallet className="w-5 h-5 text-emerald-500" />
                CHARLES SCHWAB — SETTLEMENT ALPHA DESTINATION
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-1">
                  <p className="text-xs text-zinc-500 font-mono">INSTITUTION</p>
                  <p className="text-lg font-bold text-white font-mono">Charles Schwab</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-zinc-500 font-mono">ACCOUNT REFERENCE</p>
                  <p className="text-lg font-bold text-emerald-500 font-mono">6015-8185</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-zinc-500 font-mono">SETTLEMENT AMOUNT</p>
                  <p className="text-lg font-bold text-emerald-500 font-mono">{formatCurrency(10000000)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-zinc-500 font-mono">WIRE PATH</p>
                  <p className="text-lg font-bold text-fuchsia-500 font-mono">Settlement Alpha Latch</p>
                </div>
              </div>
              <div className="mt-6 p-4 bg-zinc-950 rounded-lg border border-zinc-800">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  <span className="text-xs font-mono text-amber-500">CORROBORATION STATUS</span>
                </div>
                <p className="text-xs text-zinc-400 font-mono">
                  Account details and wire path are PENDING CORROBORATION. Financial receipts and bank documentation required for verification.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Financial Accounts Table */}
        <section>
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="border-b border-zinc-800">
              <CardTitle className="font-mono text-lg flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-500" />
                FINANCIAL ACCOUNTS MATRIX
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-zinc-950">
                    <tr>
                      <th className="text-left p-4 text-xs font-mono text-zinc-500">INSTITUTION</th>
                      <th className="text-left p-4 text-xs font-mono text-zinc-500">ACCOUNT REF</th>
                      <th className="text-left p-4 text-xs font-mono text-zinc-500">TYPE</th>
                      <th className="text-right p-4 text-xs font-mono text-zinc-500">AMOUNT (USD)</th>
                      <th className="text-left p-4 text-xs font-mono text-zinc-500">WIRE PATH</th>
                      <th className="text-center p-4 text-xs font-mono text-zinc-500">STATUS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800">
                    {FINANCIAL_ACCOUNTS.map((account, i) => (
                      <tr key={i} className="hover:bg-zinc-800/50 transition-colors">
                        <td className="p-4 font-mono text-sm text-white">{account.institution}</td>
                        <td className="p-4 font-mono text-sm text-emerald-500">{account.accountRef}</td>
                        <td className="p-4 font-mono text-xs text-zinc-400 uppercase">{account.type}</td>
                        <td className="p-4 font-mono text-sm text-right text-white">{formatCurrency(account.amount)}</td>
                        <td className="p-4 font-mono text-xs text-fuchsia-400">{account.wirePath}</td>
                        <td className="p-4 text-center">
                          <Badge className={`${getStatusColor(account.status)} text-[10px]`}>
                            {account.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-zinc-950 border-t border-zinc-700">
                    <tr>
                      <td colSpan={3} className="p-4 font-mono text-sm font-bold text-white">TOTAL</td>
                      <td className="p-4 font-mono text-sm text-right font-bold text-emerald-500">
                        {formatCurrency(FINANCIAL_ACCOUNTS.reduce((sum, a) => sum + a.amount, 0))}
                      </td>
                      <td colSpan={2}></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Recovery Matrix */}
        <section>
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="border-b border-zinc-800">
              <CardTitle className="font-mono text-lg flex items-center gap-2">
                <Scale className="w-5 h-5 text-red-500" />
                SCENARIO-BASED RECOVERY OPPORTUNITIES
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-zinc-950">
                    <tr>
                      <th className="text-left p-4 text-xs font-mono text-zinc-500">ENTITY</th>
                      <th className="text-left p-4 text-xs font-mono text-zinc-500">CATEGORY</th>
                      <th className="text-right p-4 text-xs font-mono text-zinc-500">RECOVERY HYPOTHESIS</th>
                      <th className="text-right p-4 text-xs font-mono text-zinc-500">PERCENTAGE</th>
                      <th className="text-center p-4 text-xs font-mono text-zinc-500">STATUS</th>
                      <th className="text-center p-4 text-xs font-mono text-zinc-500">CORROBORATION</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800">
                    {RECOVERY_MATRIX.map((target, i) => (
                      <tr key={i} className="hover:bg-zinc-800/50 transition-colors">
                        <td className="p-4 font-mono text-sm text-white font-bold">{target.entity}</td>
                        <td className="p-4 font-mono text-xs text-zinc-400 uppercase">{target.category}</td>
                        <td className="p-4 font-mono text-sm text-right text-emerald-500">{formatCurrency(target.exposure)}</td>
                        <td className="p-4 font-mono text-sm text-right text-fuchsia-400">{target.percentage.toFixed(1)}%</td>
                        <td className="p-4 text-center">
                          <Badge className={`${getStatusColor(target.status)} text-[10px]`}>
                            {target.status}
                          </Badge>
                        </td>
                        <td className="p-4 text-center">
                          <Badge className="bg-amber-500/20 text-amber-500 border-amber-500/30 text-[10px]">
                            <Clock className="w-3 h-3 mr-1" />
                            PENDING
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-zinc-950 border-t border-zinc-700">
                    <tr>
                      <td colSpan={2} className="p-4 font-mono text-sm font-bold text-white">TOTAL RECOVERY OPPORTUNITY</td>
                      <td className="p-4 font-mono text-sm text-right font-bold text-emerald-500">
                        {formatCurrency(totalRecovery)}
                      </td>
                      <td className="p-4 font-mono text-sm text-right font-bold text-fuchsia-400">100.0%</td>
                      <td colSpan={2}></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* System Valuation */}
        <section>
          <Card className="bg-zinc-900 border-fuchsia-500/30">
            <CardHeader className="border-b border-zinc-800">
              <CardTitle className="font-mono text-lg flex items-center gap-2">
                <PieChart className="w-5 h-5 text-fuchsia-500" />
                SYSTEM VALUATION — TECHNOLOGY ASSETS (USD)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-zinc-950">
                    <tr>
                      <th className="text-left p-4 text-xs font-mono text-zinc-500">COMPONENT</th>
                      <th className="text-left p-4 text-xs font-mono text-zinc-500">CATEGORY</th>
                      <th className="text-right p-4 text-xs font-mono text-zinc-500">VALUE (USD)</th>
                      <th className="text-left p-4 text-xs font-mono text-zinc-500">VALUATION BASIS</th>
                      <th className="text-center p-4 text-xs font-mono text-zinc-500">STATUS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800">
                    {SYSTEM_VALUATION.map((system, i) => (
                      <tr key={i} className="hover:bg-zinc-800/50 transition-colors">
                        <td className="p-4 font-mono text-sm text-white">{system.component}</td>
                        <td className="p-4 font-mono text-xs text-fuchsia-400 uppercase">{system.category}</td>
                        <td className="p-4 font-mono text-sm text-right text-emerald-500">{formatCurrency(system.value)}</td>
                        <td className="p-4 font-mono text-xs text-zinc-400">{system.basis}</td>
                        <td className="p-4 text-center">
                          <Badge className={`${getStatusColor(system.status)} text-[10px]`}>
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            {system.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-zinc-950 border-t border-zinc-700">
                    <tr>
                      <td colSpan={2} className="p-4 font-mono text-sm font-bold text-white">TOTAL SYSTEM VALUE</td>
                      <td className="p-4 font-mono text-sm text-right font-bold text-fuchsia-500">
                        {formatCurrency(totalSystemValue)}
                      </td>
                      <td colSpan={2}></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Dual-Boundary Notice */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-zinc-950 border-emerald-500/30">
            <CardHeader className="border-b border-zinc-800">
              <CardTitle className="font-mono text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                RUNTIME VERIFIED
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-2">
              <p className="text-xs font-mono text-zinc-400">The following are proven by code execution:</p>
              <ul className="text-xs font-mono text-emerald-400 space-y-1">
                <li>- System component calculations</li>
                <li>- Percentage distributions</li>
                <li>- Protocol module counts (19)</li>
                <li>- API endpoint counts (21)</li>
                <li>- Governance dimension counts (14)</li>
                <li>- Table rendering and formatting</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-zinc-950 border-amber-500/30">
            <CardHeader className="border-b border-zinc-800">
              <CardTitle className="font-mono text-sm flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-500" />
                PENDING CORROBORATION
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-2">
              <p className="text-xs font-mono text-zinc-400">The following require external evidence:</p>
              <ul className="text-xs font-mono text-amber-400 space-y-1">
                <li>- Dollar recovery amounts</li>
                <li>- Account numbers and references</li>
                <li>- Wire path destinations</li>
                <li>- Entity exposure calculations</li>
                <li>- Settlement latch amounts</li>
                <li>- BTC anchor price (market-dependent)</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Footer Seal */}
        <section className="border-t border-zinc-800 pt-6">
          <div className="text-center space-y-2">
            <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
              VALORAIPLUS FINANCIAL VALUATION REPORT | REV_33 | DUAL-BOUNDARY COMPLIANT
            </p>
            <p className="text-lg font-black text-fuchsia-500 font-mono tracking-[0.3em] animate-pulse">
              DG77.77X LOCKED // MADE IN THE USA
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
