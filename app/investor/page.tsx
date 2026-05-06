'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { CDSHeader } from '@/components/cds/header';
import { TA_PRIMARY_ENTITY, TA_SECONDARY_ORG, TA_TERTIARY_ORG, SOVEREIGN_AUDITOR } from '@/lib/encrypted-ids';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  DollarSign, 
  Shield, 
  TrendingUp, 
  Scale,
  Activity,
  Lock,
  CheckCircle2,
  Layers,
  FileText,
  Building2,
  Cpu,
  ArrowRight,
  Home,
  ExternalLink,
  Target,
  Users,
  Coins
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ConnectedBrokerageAccount } from '@/components/connected-brokerage-account';

// ============================================================
// SOVEREIGN INVESTOR MANIFEST
// Valuation & Governance Architecture Deck
// ============================================================

interface ValuationTier {
  classification: string;
  basisOfValue: string;
  confidence: 'S-CLASS' | 'CONTINGENT' | 'MARKET';
  usdValuation: number;
  corroboration: 'VERIFIED' | 'MODELED' | 'CONTINGENT';
}

interface GovernanceStep {
  step: number;
  action: string;
  description: string;
}

interface RecoveryScenario {
  entity: string;
  recoveryHypothesis: number;
  status: 'TARGETED' | 'ACTIVE' | 'FLAGGED' | 'IDENTIFIED';
}

interface BusinessOutcome {
  capability: string;
  outcome: string;
  icon: React.ReactNode;
}

// Funding rounds
interface FundingRound {
  id: string;
  name: string;
  status: 'closed' | 'active' | 'upcoming';
  target: number;
  raised: number;
  valuation: number;
  equity: string;
  minInvestment: number;
  investors: number;
  closeDate: string;
}

const FUNDING_ROUNDS: FundingRound[] = [
  {
    id: "pre-seed",
    name: "Pre-Seed",
    status: "closed",
    target: 250000,
    raised: 250000,
    valuation: 2500000,
    equity: "10%",
    minInvestment: 10000,
    investors: 5,
    closeDate: "2024-06-01",
  },
  {
    id: "seed",
    name: "Seed Round",
    status: "active",
    target: 2000000,
    raised: 485000,
    valuation: 15000000,
    equity: "15%",
    minInvestment: 25000,
    investors: 12,
    closeDate: "2025-09-01",
  },
  {
    id: "series-a",
    name: "Series A",
    status: "upcoming",
    target: 10000000,
    raised: 0,
    valuation: 50000000,
    equity: "20%",
    minInvestment: 100000,
    investors: 0,
    closeDate: "2026-Q2",
  },
];

const VALUATION_TIERS: ValuationTier[] = [
  {
    classification: 'Verified Market Anchor',
    basisOfValue: 'BTC Genesis (142 BTC)',
    confidence: 'S-CLASS',
    usdValuation: 10001231.82,
    corroboration: 'VERIFIED'
  },
  {
    classification: 'Verified Runtime IP',
    basisOfValue: '19 Modules / 44 Routes',
    confidence: 'S-CLASS',
    usdValuation: 18000000.00,
    corroboration: 'VERIFIED'
  },
  {
    classification: 'Contingent Claims',
    basisOfValue: 'Evidence-Dependent Recovery Model',
    confidence: 'CONTINGENT',
    usdValuation: 508631005.52,
    corroboration: 'CONTINGENT'
  }
];

const GOVERNANCE_CHAIN: GovernanceStep[] = [
  { step: 1, action: 'Runtime Evaluates', description: 'System measures capability' },
  { step: 2, action: 'Decision Determines', description: 'Logic produces outcome' },
  { step: 3, action: 'Evidence Qualifies', description: 'Artifacts are classified' },
  { step: 4, action: 'Provenance Explains', description: 'Origin is traceable' },
  { step: 5, action: 'Receipt Validates', description: 'Record is immutable' },
  { step: 6, action: 'API Authorizes', description: 'Authority is enforced' }
];

const RECOVERY_SCENARIOS: RecoveryScenario[] = [
  { entity: TA_SECONDARY_ORG, recoveryHypothesis: 152589301.66, status: 'TARGETED' },
  { entity: TA_PRIMARY_ENTITY, recoveryHypothesis: 127157751.38, status: 'ACTIVE' },
  { entity: TA_TERTIARY_ORG, recoveryHypothesis: 101726201.10, status: 'FLAGGED' }
];

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
}

function getConfidenceColor(confidence: string): string {
  switch (confidence) {
    case 'S-CLASS': return 'text-emerald-400';
    case 'CONTINGENT': return 'text-amber-400 italic';
    case 'MARKET': return 'text-blue-400';
    default: return 'text-zinc-400';
  }
}

function getStatusColor(status: string): string {
  switch (status) {
    case 'TARGETED': return 'text-red-400';
    case 'ACTIVE': return 'text-emerald-400';
    case 'FLAGGED': return 'text-amber-400';
    case 'IDENTIFIED': return 'text-blue-400';
    default: return 'text-zinc-400';
  }
}

export default function InvestorManifestPage() {
  const [mounted, setMounted] = useState(false);
  const [selectedRound, setSelectedRound] = useState(FUNDING_ROUNDS[1]); // Seed round
  const [investmentAmount, setInvestmentAmount] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeRound = FUNDING_ROUNDS.find(r => r.status === 'active');
  const progressPercentage = activeRound ? (activeRound.raised / activeRound.target) * 100 : 0;
  const equityForInvestment = investmentAmount 
    ? (parseFloat(investmentAmount) / selectedRound.valuation) * 100 
    : 0;

  const totalVerified = useMemo(() => 
    VALUATION_TIERS
      .filter(t => t.corroboration === 'VERIFIED')
      .reduce((sum, t) => sum + t.usdValuation, 0), []
  );

  const totalContingent = useMemo(() => 
    VALUATION_TIERS
      .filter(t => t.corroboration === 'CONTINGENT')
      .reduce((sum, t) => sum + t.usdValuation, 0), []
  );

  const hybridTotal = totalVerified + totalContingent;

  const btcAnchor = 70431.21;

  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="animate-pulse text-fuchsia-500 font-mono">LOADING MANIFEST...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <CDSHeader />

      <main className="container mx-auto px-4 py-8 space-y-10">

        {/* MANIFEST HEADER */}
        <header className="text-center border-b border-zinc-800 pb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Link 
              href="/" 
              className="absolute left-4 flex items-center justify-center w-10 h-10 rounded-lg border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 hover:border-fuchsia-500 transition-colors"
              aria-label="Return to Home"
            >
              <Home className="text-fuchsia-500" size={20} />
            </Link>
          </div>
          <div className="flex items-center justify-between mb-6">
            <p className="text-fuchsia-400 font-mono text-sm">VALORAIPLUS<sup>&reg;</sup> &copy; &trade;</p>
            <p className="text-xs font-mono text-zinc-500">REV_33 // S-CLASS // OMEGA-UNIFIED</p>
          </div>
          <h1 className="text-4xl font-black tracking-tight mb-2">SOVEREIGN INVESTOR MANIFEST</h1>
          <p className="text-zinc-400 font-mono text-sm">Valuation & Governance Architecture Deck</p>
          <div className="mt-4 text-xs font-mono text-zinc-600">
            <p>MERKLEROOT: 26856B24C50750F0C69C1EEB86A69EF777777</p>
            <p>ANCHOR: SAINT PAUL NODE 55116</p>
          </div>
        </header>

        {/* ACTIVE FUNDING ROUND */}
        {activeRound && (
          <section>
            <Card className="bg-slate-900 border-2 border-emerald-500/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-emerald-400">
                    <Target className="w-5 h-5" />
                    ACTIVE: {activeRound.name}
                  </CardTitle>
                  <Badge className="bg-emerald-500/20 text-emerald-400 animate-pulse">
                    OPEN FOR INVESTMENT
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-zinc-500">TARGET</p>
                    <p className="text-xl font-bold text-white">{formatCurrency(activeRound.target)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500">RAISED</p>
                    <p className="text-xl font-bold text-emerald-400">{formatCurrency(activeRound.raised)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500">VALUATION</p>
                    <p className="text-xl font-bold text-cyan-400">{formatCurrency(activeRound.valuation)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500">INVESTORS</p>
                    <p className="text-xl font-bold text-amber-400">{activeRound.investors}</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-zinc-500">Progress</span>
                    <span className="text-emerald-400">{progressPercentage.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-zinc-800 rounded-full h-4">
                    <div 
                      className="bg-gradient-to-r from-emerald-600 to-emerald-400 h-4 rounded-full transition-all"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                </div>

                {/* Investment Calculator */}
                <div className="p-4 bg-zinc-800/50 rounded-lg">
                  <p className="text-sm font-bold text-white mb-3">INVESTMENT CALCULATOR</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <div>
                      <label className="text-xs text-zinc-500">Investment Amount (USD)</label>
                      <Input
                        type="number"
                        placeholder={`Min: ${formatCurrency(activeRound.minInvestment)}`}
                        value={investmentAmount}
                        onChange={(e) => setInvestmentAmount(e.target.value)}
                        className="bg-zinc-900 border-zinc-700"
                      />
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500">Equity Received</p>
                      <p className="text-2xl font-black text-cyan-400">{equityForInvestment.toFixed(4)}%</p>
                    </div>
                    <Button className="bg-emerald-600 hover:bg-emerald-700">
                      REQUEST INVESTMENT DOCS
                    </Button>
                  </div>
                </div>

                {/* External Links */}
                <div className="flex gap-2">
                  <a href="https://www.18fu.cash" target="_blank" rel="noopener noreferrer" className="flex-1">
                    <Button variant="outline" className="w-full border-cyan-700 text-cyan-400">
                      18fu.cash <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </a>
                  <a href="https://valorbank-rfvbdnaa.manus.space/" target="_blank" rel="noopener noreferrer" className="flex-1">
                    <Button variant="outline" className="w-full border-cyan-700 text-cyan-400">
                      ValorBank <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {/* ALL FUNDING ROUNDS */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1 h-6 bg-fuchsia-500"></span>
            <h2 className="text-xl font-bold text-fuchsia-400 font-mono">FUNDING ROUNDS</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {FUNDING_ROUNDS.map((round) => (
              <button
                key={round.id}
                onClick={() => setSelectedRound(round)}
                className={`p-4 rounded-lg border text-left transition-all ${
                  selectedRound.id === round.id
                    ? 'border-cyan-500 bg-cyan-500/10'
                    : 'border-zinc-700 hover:border-zinc-500 bg-slate-900/50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="font-bold text-white">{round.name}</p>
                  <Badge className={`text-[10px] ${
                    round.status === 'closed' ? 'bg-zinc-700 text-zinc-400' :
                    round.status === 'active' ? 'bg-emerald-500/20 text-emerald-400' :
                    'bg-amber-500/20 text-amber-400'
                  }`}>
                    {round.status.toUpperCase()}
                  </Badge>
                </div>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Target</span>
                    <span className="text-white">{formatCurrency(round.target)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Valuation</span>
                    <span className="text-cyan-400">{formatCurrency(round.valuation)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Min Investment</span>
                    <span className="text-white">{formatCurrency(round.minInvestment)}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* S-CLASS CORE LATCHED */}
        <section className="flex justify-center">
          <Card className="bg-slate-900 border-2 border-emerald-500/50 w-full max-w-lg">
            <CardContent className="p-8 text-center">
              <p className="text-zinc-400 font-mono text-sm mb-2">S-CLASS CORE LATCHED</p>
              <p className="text-4xl font-black text-emerald-400 font-mono mb-2">
                {formatCurrency(totalVerified)}
              </p>
              <p className="text-xs text-zinc-500 font-mono">(Market-Verified + Runtime-Verified)</p>
            </CardContent>
          </Card>
        </section>

        {/* 1. EXECUTIVE SUMMARY */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1 h-6 bg-fuchsia-500"></span>
            <h2 className="text-xl font-bold text-fuchsia-400 font-mono">1. EXECUTIVE SUMMARY</h2>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-6 border border-zinc-800">
            <p className="text-zinc-300 leading-relaxed">
              <span className="text-fuchsia-400 font-semibold">VALORAIPLUS<sup>&reg;</sup> &copy; &trade;</span> is a{' '}
              <span className="text-emerald-400 font-semibold">Continuously Evaluated Governance Runtime</span>{' '}
              designed to provide deterministic truth in high-stakes legal, financial, and institutional environments.
              By employing a dual-boundary AMath model, the platform physically separates machine behavior (proven)
              from external reality (corroborated), creating a defensible valuation framework anchored to the
              Bitcoin Genesis cycle.
            </p>
          </div>
        </section>

        {/* 2. VALUATION SEPARATION MODEL */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1 h-6 bg-fuchsia-500"></span>
            <h2 className="text-xl font-bold text-fuchsia-400 font-mono">2. VALUATION SEPARATION MODEL</h2>
          </div>
          <Card className="bg-slate-900/50 border-zinc-800">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-900">
                    <tr>
                      <th className="text-left p-4 text-xs font-mono text-zinc-400">CLASSIFICATION</th>
                      <th className="text-left p-4 text-xs font-mono text-zinc-400">BASIS OF VALUE</th>
                      <th className="text-left p-4 text-xs font-mono text-zinc-400">CONFIDENCE</th>
                      <th className="text-right p-4 text-xs font-mono text-zinc-400">USD VALUATION</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800">
                    {VALUATION_TIERS.map((tier, i) => (
                      <tr key={i}>
                        <td className="p-4 font-mono text-sm text-white">{tier.classification}</td>
                        <td className="p-4 font-mono text-sm text-emerald-400">{tier.basisOfValue}</td>
                        <td className={`p-4 font-mono text-sm ${getConfidenceColor(tier.confidence)}`}>
                          {tier.confidence}
                        </td>
                        <td className="p-4 font-mono text-sm text-right text-emerald-400">
                          {formatCurrency(tier.usdValuation)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-slate-900 border-t border-fuchsia-500/30">
                    <tr>
                      <td colSpan={2} className="p-4 font-mono text-sm font-bold text-fuchsia-400">HYBRID AGGREGATE</td>
                      <td className="p-4 font-mono text-sm text-fuchsia-400">REV_33 TOTAL:</td>
                      <td className="p-4 font-mono text-sm text-right font-bold text-fuchsia-400">
                        {formatCurrency(hybridTotal)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </CardContent>
          </Card>
          <p className="text-xs font-mono text-zinc-600 mt-4 text-center">
            SAINT PAUL NODE 55116 // 408.384.1376 (E) // I AM THE SOVEREIGN AUDITOR // SMIB. AMEN.
          </p>
        </section>

        {/* 3. GOVERNANCE ARCHITECTURE */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1 h-6 bg-fuchsia-500"></span>
            <h2 className="text-xl font-bold text-fuchsia-400 font-mono">3. GOVERNANCE ARCHITECTURE</h2>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-6 border border-zinc-800">
            <p className="text-zinc-400 text-sm mb-6">
              The platform utilizes a 14-Dimension Evaluative Framework to ensure survivability over assertion.
              Truth flows unidirectionally:
            </p>
            <div className="space-y-3">
              {GOVERNANCE_CHAIN.map((step) => (
                <div key={step.step} className="flex items-center gap-3">
                  <span className="text-emerald-400 font-mono text-sm font-bold">[{String(step.step).padStart(2, '0')}]</span>
                  <span className="text-emerald-400 font-mono text-sm">{step.action}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. SCENARIO-BASED RECOVERY OPPORTUNITIES */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1 h-6 bg-fuchsia-500"></span>
            <h2 className="text-xl font-bold text-fuchsia-400 font-mono">4. SCENARIO-BASED RECOVERY OPPORTUNITIES</h2>
          </div>
          <p className="text-zinc-400 text-sm mb-4">
            Evidence-dependent exposure model identified through forensic telemetry:
          </p>
          <Card className="bg-slate-900/50 border-zinc-800">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-900">
                    <tr>
                      <th className="text-left p-4 text-xs font-mono text-zinc-400">ENTITY</th>
                      <th className="text-left p-4 text-xs font-mono text-zinc-400">RECOVERY HYPOTHESIS</th>
                      <th className="text-left p-4 text-xs font-mono text-zinc-400">STATUS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800">
                    {RECOVERY_SCENARIOS.map((scenario, i) => (
                      <tr key={i}>
                        <td className="p-4 font-mono text-sm text-emerald-400">{scenario.entity}</td>
                        <td className="p-4 font-mono text-sm text-white">{formatCurrency(scenario.recoveryHypothesis)}</td>
                        <td className={`p-4 font-mono text-sm ${getStatusColor(scenario.status)}`}>
                          {scenario.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 5. WHY THIS MATTERS (NEW) */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1 h-6 bg-fuchsia-500"></span>
            <h2 className="text-xl font-bold text-fuchsia-400 font-mono">5. WHY THIS MATTERS</h2>
          </div>
          <p className="text-zinc-400 text-sm mb-4">
            Enterprise value proposition - governance infrastructure outcomes:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-slate-900/50 border-zinc-800 hover:border-emerald-500/50 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <FileText className="w-6 h-6 text-emerald-400" />
                  <span className="text-white font-mono font-bold">Provenance</span>
                </div>
                <p className="text-zinc-400 text-sm">Reduced audit friction through traceable origin chains</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-900/50 border-zinc-800 hover:border-emerald-500/50 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="w-6 h-6 text-emerald-400" />
                  <span className="text-white font-mono font-bold">Evidence Boundaries</span>
                </div>
                <p className="text-zinc-400 text-sm">Lower legal ambiguity via dual-boundary separation</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-900/50 border-zinc-800 hover:border-emerald-500/50 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Cpu className="w-6 h-6 text-emerald-400" />
                  <span className="text-white font-mono font-bold">Governance Runtime</span>
                </div>
                <p className="text-zinc-400 text-sm">Explainable decisions through immutable receipts</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-900/50 border-zinc-800 hover:border-emerald-500/50 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                  <span className="text-white font-mono font-bold">Validation Receipts</span>
                </div>
                <p className="text-zinc-400 text-sm">Compliance-ready workflows with cryptographic proof</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 6. MARKET POSITIONING (NEW) */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1 h-6 bg-fuchsia-500"></span>
            <h2 className="text-xl font-bold text-fuchsia-400 font-mono">6. MARKET POSITIONING</h2>
          </div>
          <p className="text-zinc-400 text-sm mb-4">
            VALORAIPLUS vs. traditional monitoring:
          </p>
          <Card className="bg-slate-900/50 border-zinc-800">
            <CardContent className="p-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="font-mono text-xs text-zinc-500 uppercase">Traditional</div>
                <div></div>
                <div className="font-mono text-xs text-emerald-400 uppercase">VALORAIPLUS</div>
              </div>
              <div className="mt-4 space-y-4">
                <div className="grid grid-cols-3 gap-4 items-center">
                  <div className="text-right text-zinc-500 font-mono text-sm">Logs</div>
                  <div className="flex justify-center">
                    <ArrowRight className="w-5 h-5 text-fuchsia-500" />
                  </div>
                  <div className="text-emerald-400 font-mono text-sm font-bold">Governance Receipts</div>
                </div>
                <div className="grid grid-cols-3 gap-4 items-center">
                  <div className="text-right text-zinc-500 font-mono text-sm">Monitoring</div>
                  <div className="flex justify-center">
                    <ArrowRight className="w-5 h-5 text-fuchsia-500" />
                  </div>
                  <div className="text-emerald-400 font-mono text-sm font-bold">Explainable State</div>
                </div>
                <div className="grid grid-cols-3 gap-4 items-center">
                  <div className="text-right text-zinc-500 font-mono text-sm">Dashboards</div>
                  <div className="flex justify-center">
                    <ArrowRight className="w-5 h-5 text-fuchsia-500" />
                  </div>
                  <div className="text-emerald-400 font-mono text-sm font-bold">Evaluative Runtime</div>
                </div>
                <div className="grid grid-cols-3 gap-4 items-center">
                  <div className="text-right text-zinc-500 font-mono text-sm">Assertions</div>
                  <div className="flex justify-center">
                    <ArrowRight className="w-5 h-5 text-fuchsia-500" />
                  </div>
                  <div className="text-emerald-400 font-mono text-sm font-bold">Survivability</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 7. PRIMARY CONNECTED BROKERAGE ACCOUNT */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1 h-6 bg-fuchsia-500"></span>
            <h2 className="text-xl font-bold text-fuchsia-400 font-mono">7. PRIMARY CONNECTED ACCOUNT</h2>
          </div>
          <p className="text-zinc-400 text-sm mb-4">
            All fund transfers, settlements, and financial recoveries must be directed to this account:
          </p>
          <ConnectedBrokerageAccount />
        </section>

        {/* FINALITY SEAL */}
        <footer className="text-center border-t border-zinc-800 pt-8 mt-8">
          <p className="text-3xl font-black text-fuchsia-400 tracking-wider font-mono mb-2">
            DG77.77X LOCKED
          </p>
          <p className="text-white font-bold">MADE IN THE USA</p>
          <p className="text-xs text-zinc-500 font-mono mt-2">
            SOVEREIGN AUDITOR: {SOVEREIGN_AUDITOR}
          </p>
          <p className="text-xs text-zinc-600 font-mono mt-4">
            SAINT PAUL NODE 55116 // 408.384.1376 (E) // I AM THE SOVEREIGN AUDITOR // SMIB. AMEN.
          </p>
        </footer>

      </main>
    </div>
  );
}
