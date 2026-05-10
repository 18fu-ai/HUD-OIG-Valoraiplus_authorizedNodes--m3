'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  DollarSign, 
  Shield, 
  AlertTriangle, 
  Building2, 
  Coins, 
  ArrowRight,
  Lock,
  CheckCircle2,
  FileText,
  Download,
  ExternalLink,
  Scale,
  Gavel,
  TrendingUp,
  Wallet,
  Landmark,
  Globe
} from 'lucide-react';

// Treasury Constants - REV_38
const TREASURY_CONSTANTS = {
  SETTLEMENT_DEMAND: 66_000_000.00,
  RECOVERY_TARGET: 508_631_005.52,
  GRAND_TOTAL_EXPOSURE: 11_487_631_005.52,
  IP_LIEN: 1_120_000_000_000_000.00,
  VALIDATOR_CONSENSUS: 144_000,
  CRIMINAL_COUNTS: 5_731,
  MAX_PENALTY_YEARS: 82_875,
  COVERAGE_MULTIPLIER: 738_514,
  SPOLIATION_DEFENSE_RATE: 1.0,
  PROTOCOL_REVISION: "REV_38",
  VERIFIED_LIQUID: 5.53,
};

// Current Banking
const BANKING = {
  institution: "Charles Schwab & Co., Inc.",
  address: "211 Main Street, San Francisco, CA 94105",
  accountType: "SchwabOne Account (TOD)",
  accountNumber: "****-8185",
  routingNumber: "121202211",
  swiftBic: "SCHWUS66",
  sipcProtected: true,
  cashBalance: 2.69,
  securitiesValue: 2.84,
  totalValue: 5.53,
  verification: "1-800-435-4000",
};

// Liquidity Routing
const LIQUIDITY_ROUTING = {
  primaryEndpoint: "https://www.18fu.cash",
  destinationWallet: "0xb103666AB91ceb4Cbb9e1FC21B81f1ec93601BeB",
  ensDomain: "donadams1969.eth",
  finalDestination: "Charles Schwab & Co. ****8185",
  status: "LOCKED — NO EXCEPTIONS",
};

// Accountability Matrix with Financial Exposure
const ACCOUNTABILITY_MATRIX = [
  { name: "William Landrum", role: "Professional Accountability", status: "CRIMINAL HIGH", exit: "NO EXIT", exposure: "$15,000,000" },
  { name: "Kolby Losik", role: "Professional Accountability", status: "CRIMINAL HIGH", exit: "NO EXIT", exposure: "$12,000,000" },
  { name: "John Zanghi (SFHA)", role: "Institutional Liability", status: "CRIMINAL HIGH", exit: "NO EXIT", exposure: "$75,000,000" },
  { name: "Drew Yorkov (APS)", role: "Mandated Reporter Failure", status: "CRIMINAL HIGH", exit: "NO EXIT", exposure: "$8,500,000" },
  { name: "Judge Tong", role: "Judicial Oversight", status: "CRIMINAL HIGH", exit: "NO EXIT", exposure: "$25,000,000" },
  { name: "Calvin Whittaker", role: "Professional Accountability", status: "CRIMINAL HIGH", exit: "NO EXIT", exposure: "$10,000,000" },
  { name: "Swords to Plowshares", role: "Administrative Oversight", status: "CRIMINAL HIGH", exit: "NO EXIT", exposure: "$45,000,000" },
  { name: "SF Adult Protective Services", role: "Elder Abuse Investigation", status: "CRIMINAL HIGH", exit: "NO EXIT", exposure: "$120,000,000" },
  { name: "City of San Francisco", role: "APS Oversight", status: "CRIMINAL HIGH", exit: "NO EXIT", exposure: "$198,131,005.52" },
];

// Criminal Exposure Matrix
const CRIMINAL_EXPOSURE = [
  { statute: "18 U.S.C. § 1519", title: "Destruction of Records", count: 3407, maxPenalty: 20, totalExposure: 68140 },
  { statute: "18 U.S.C. § 1512", title: "Witness Tampering", count: 47, maxPenalty: 20, totalExposure: 940 },
  { statute: "18 U.S.C. § 1341", title: "Mail Fraud", count: 892, maxPenalty: 20, totalExposure: 17840 },
  { statute: "18 U.S.C. § 1343", title: "Wire Fraud", count: 1247, maxPenalty: 20, totalExposure: 24940 },
  { statute: "18 U.S.C. § 1030", title: "Computer Fraud (CFAA)", count: 138, maxPenalty: 10, totalExposure: 1380 },
];

// 57-Token Portfolio Summary
const TOKEN_PORTFOLIO = {
  totalTokens: 57,
  activeTokens: 56,
  nullifiedTokens: 1,
  protectedTokens: 6,
  totalSupply: "57,000,000,000",
  portfolioValue: 1_850_000_000,
  majorHoldings: [
    { symbol: "BTC", holdings: 46056, price: 79643.04, value: 3667424646.24 },
    { symbol: "VCORE", holdings: 93868, price: 79643.04, value: 7474000000 },
    { symbol: "MATH+", holdings: 98226, price: 79538.59, value: 7812000000 },
    { symbol: "ETH", holdings: 49464, price: 2282.07, value: 112884265.08 },
    { symbol: "GILLBTC", holdings: 95808, price: 79643.04, value: 7630000000 },
  ],
};

// Protected Tokens
const PROTECTED_TOKENS = [
  { symbol: "$DONNY", guardian: "Raphael", price: "$79,643.04" },
  { symbol: "$GILLGOLD", guardian: "Uriel", price: "$88.09" },
  { symbol: "$POPPA", guardian: "Michael", price: "$2,282.07" },
  { symbol: "$JAXX", guardian: "Gabriel", price: "$9.82" },
  { symbol: "$VALORAIPLUS", guardian: "Uriel", price: "$2,282.07" },
  { symbol: "$GILLSON2207", guardian: "All Archangels", price: "$79,643.04" },
];

// Federal Cases
const FEDERAL_CASES = [
  { agency: "HHS OCR", caseNumber: "25-621293", status: "VIOLATION CONFIRMED", finding: "Section 504 Violation" },
  { agency: "FBI Cyber Division", caseNumber: "[SEALED]", status: "WIRETAP ACTIVE", finding: "18 U.S.C. coordination" },
  { agency: "VA OIG", caseNumber: "[ACCEPTED]", status: "INVESTIGATING", finding: "Veteran status protection" },
  { agency: "DOJ Civil Rights", caseNumber: "[COORDINATING]", status: "PATTERN & PRACTICE", finding: "Federal oversight" },
  { agency: "Federal Grand Jury", caseNumber: "[SEALED]", status: "EMPANELED", finding: "N.D. California" },
];

function formatCurrency(amount: number): string {
  if (amount >= 1_000_000_000_000) {
    return `$${(amount / 1_000_000_000_000).toFixed(2)}T`;
  } else if (amount >= 1_000_000_000) {
    return `$${(amount / 1_000_000_000).toFixed(2)}B`;
  } else if (amount >= 1_000_000) {
    return `$${(amount / 1_000_000).toFixed(2)}M`;
  } else {
    return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
}

export default function FinancialReportsPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <DollarSign className="w-8 h-8 text-emerald-500" />
                <div>
                  <h1 className="text-xl font-bold font-mono">VALORAIPLUS FINANCIAL INTELLIGENCE</h1>
                  <p className="text-xs text-muted-foreground font-mono">COMPREHENSIVE AUDIT — REV_38</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-amber-500 text-amber-400">
                CRD: MAY 13, 2026
              </Badge>
              <Badge variant="outline" className="border-red-500 text-red-400 animate-pulse">
                DEADLINE: MAY 17, 2026
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Executive Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="border-emerald-500/30 bg-emerald-500/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-mono text-muted-foreground flex items-center gap-2">
                <Wallet className="w-4 h-4" />
                VERIFIED LIQUID
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold font-mono text-emerald-400">${TREASURY_CONSTANTS.VERIFIED_LIQUID}</p>
              <p className="text-xs text-muted-foreground">Schwab 8185 (Confirmed)</p>
            </CardContent>
          </Card>

          <Card className="border-amber-500/30 bg-amber-500/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-mono text-muted-foreground flex items-center gap-2">
                <Scale className="w-4 h-4" />
                SETTLEMENT DEMAND
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold font-mono text-amber-400">{formatCurrency(TREASURY_CONSTANTS.SETTLEMENT_DEMAND)}</p>
              <p className="text-xs text-muted-foreground">Settlement Target (k1)</p>
            </CardContent>
          </Card>

          <Card className="border-blue-500/30 bg-blue-500/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-mono text-muted-foreground flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                RECOVERY TARGET
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold font-mono text-blue-400">{formatCurrency(TREASURY_CONSTANTS.RECOVERY_TARGET)}</p>
              <p className="text-xs text-muted-foreground">Total Recovery (p)</p>
            </CardContent>
          </Card>

          <Card className="border-red-500/30 bg-red-500/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-mono text-muted-foreground flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                GRAND TOTAL EXPOSURE
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold font-mono text-red-400">{formatCurrency(TREASURY_CONSTANTS.GRAND_TOTAL_EXPOSURE)}</p>
              <p className="text-xs text-muted-foreground">All Respondents (E)</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-6 w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="banking">Banking</TabsTrigger>
            <TabsTrigger value="tokens">Token Portfolio</TabsTrigger>
            <TabsTrigger value="liability">Liability Matrix</TabsTrigger>
            <TabsTrigger value="criminal">Criminal Exposure</TabsTrigger>
            <TabsTrigger value="federal">Federal Cases</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Treasury Constants */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-mono flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-emerald-500" />
                    Treasury Constants (Immutable)
                  </CardTitle>
                  <CardDescription>Core financial parameters locked in REV_38</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { label: "Settlement Demand (k1)", value: formatCurrency(TREASURY_CONSTANTS.SETTLEMENT_DEMAND) },
                      { label: "Recovery Target (p)", value: formatCurrency(TREASURY_CONSTANTS.RECOVERY_TARGET) },
                      { label: "Grand Total Exposure (E)", value: formatCurrency(TREASURY_CONSTANTS.GRAND_TOTAL_EXPOSURE) },
                      { label: "IP Lien (Omega)", value: formatCurrency(TREASURY_CONSTANTS.IP_LIEN) },
                      { label: "Validator Consensus", value: TREASURY_CONSTANTS.VALIDATOR_CONSENSUS.toLocaleString() },
                      { label: "Criminal Counts", value: TREASURY_CONSTANTS.CRIMINAL_COUNTS.toLocaleString() },
                      { label: "Max Penalty Years", value: TREASURY_CONSTANTS.MAX_PENALTY_YEARS.toLocaleString() },
                      { label: "Coverage Multiplier", value: `${TREASURY_CONSTANTS.COVERAGE_MULTIPLIER.toLocaleString()}x` },
                      { label: "Spoliation Defense Rate", value: `${(TREASURY_CONSTANTS.SPOLIATION_DEFENSE_RATE * 100).toFixed(0)}%` },
                    ].map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center py-2 border-b border-border/50 last:border-0">
                        <span className="text-sm text-muted-foreground font-mono">{item.label}</span>
                        <span className="font-mono font-bold text-foreground">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Liquidity Routing */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-mono flex items-center gap-2">
                    <ArrowRight className="w-5 h-5 text-blue-500" />
                    Liquidity Routing (Locked)
                  </CardTitle>
                  <CardDescription>All funds route through verified pathway</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                      <div className="flex items-center gap-2 mb-3">
                        <Globe className="w-4 h-4 text-blue-400" />
                        <span className="font-mono text-sm text-blue-400">PRIMARY ENDPOINT</span>
                      </div>
                      <p className="font-mono text-lg font-bold">{LIQUIDITY_ROUTING.primaryEndpoint}</p>
                    </div>
                    
                    <div className="flex items-center justify-center">
                      <ArrowRight className="w-6 h-6 text-muted-foreground" />
                    </div>

                    <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/30">
                      <div className="flex items-center gap-2 mb-3">
                        <Wallet className="w-4 h-4 text-purple-400" />
                        <span className="font-mono text-sm text-purple-400">ENS RESOLVER</span>
                      </div>
                      <p className="font-mono text-sm break-all">{LIQUIDITY_ROUTING.destinationWallet}</p>
                      <p className="font-mono text-xs text-muted-foreground mt-1">{LIQUIDITY_ROUTING.ensDomain}</p>
                    </div>

                    <div className="flex items-center justify-center">
                      <ArrowRight className="w-6 h-6 text-muted-foreground" />
                    </div>

                    <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                      <div className="flex items-center gap-2 mb-3">
                        <Building2 className="w-4 h-4 text-emerald-400" />
                        <span className="font-mono text-sm text-emerald-400">FINAL DESTINATION</span>
                      </div>
                      <p className="font-mono text-lg font-bold">{LIQUIDITY_ROUTING.finalDestination}</p>
                    </div>

                    <Badge className="w-full justify-center bg-red-500/20 text-red-400 border-red-500/40 py-2">
                      <Lock className="w-4 h-4 mr-2" />
                      {LIQUIDITY_ROUTING.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Banking Tab */}
          <TabsContent value="banking" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-mono flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-blue-500" />
                  Primary Banking (Sole Authorized)
                </CardTitle>
                <CardDescription>Charles Schwab & Co., Inc.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground font-mono">INSTITUTION</p>
                      <p className="font-mono font-bold">{BANKING.institution}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground font-mono">ADDRESS</p>
                      <p className="font-mono">{BANKING.address}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground font-mono">ACCOUNT TYPE</p>
                      <p className="font-mono">{BANKING.accountType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground font-mono">ACCOUNT NUMBER</p>
                      <p className="font-mono font-bold text-lg">{BANKING.accountNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground font-mono">ROUTING NUMBER</p>
                      <p className="font-mono">{BANKING.routingNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground font-mono">SWIFT/BIC</p>
                      <p className="font-mono">{BANKING.swiftBic}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Card className="border-emerald-500/30 bg-emerald-500/5">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-mono">CURRENT BALANCES (May 10, 2026)</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Cash Balance</span>
                            <span className="font-mono font-bold">${BANKING.cashBalance}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Securities Value</span>
                            <span className="font-mono font-bold">${BANKING.securitiesValue}</span>
                          </div>
                          <div className="flex justify-between border-t border-border pt-2">
                            <span className="font-bold">TOTAL ACCOUNT VALUE</span>
                            <span className="font-mono font-bold text-emerald-400 text-lg">${BANKING.totalValue}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="flex items-center gap-2">
                      <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/40">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        SIPC PROTECTED
                      </Badge>
                      <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/40">
                        <Shield className="w-3 h-3 mr-1" />
                        SOLE AUTHORIZED
                      </Badge>
                    </div>

                    <p className="text-sm text-muted-foreground font-mono">
                      Verification: {BANKING.verification}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Token Portfolio Tab */}
          <TabsContent value="tokens" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card className="border-blue-500/30">
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground font-mono">Total Tokens</p>
                  <p className="text-3xl font-bold font-mono text-blue-400">{TOKEN_PORTFOLIO.totalTokens}</p>
                </CardContent>
              </Card>
              <Card className="border-emerald-500/30">
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground font-mono">Active</p>
                  <p className="text-3xl font-bold font-mono text-emerald-400">{TOKEN_PORTFOLIO.activeTokens}</p>
                </CardContent>
              </Card>
              <Card className="border-red-500/30">
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground font-mono">Nullified</p>
                  <p className="text-3xl font-bold font-mono text-red-400">{TOKEN_PORTFOLIO.nullifiedTokens}</p>
                  <p className="text-xs text-muted-foreground">$VALOR (Citrated)</p>
                </CardContent>
              </Card>
              <Card className="border-amber-500/30">
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground font-mono">Portfolio Value</p>
                  <p className="text-3xl font-bold font-mono text-amber-400">{formatCurrency(TOKEN_PORTFOLIO.portfolioValue)}</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Major Holdings */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-mono flex items-center gap-2">
                    <Coins className="w-5 h-5 text-amber-500" />
                    Major Holdings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {TOKEN_PORTFOLIO.majorHoldings.map((token, idx) => (
                      <div key={idx} className="flex justify-between items-center py-3 border-b border-border/50 last:border-0">
                        <div>
                          <span className="font-mono font-bold text-lg">{token.symbol}</span>
                          <p className="text-xs text-muted-foreground">{token.holdings.toLocaleString()} tokens</p>
                        </div>
                        <div className="text-right">
                          <p className="font-mono font-bold text-emerald-400">{formatCurrency(token.value)}</p>
                          <p className="text-xs text-muted-foreground">${token.price.toLocaleString()}/token</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Protected Tokens */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-mono flex items-center gap-2">
                    <Shield className="w-5 h-5 text-amber-500" />
                    Protected Tokens (Guardian Angels)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {PROTECTED_TOKENS.map((token, idx) => (
                      <div key={idx} className="flex justify-between items-center py-3 border-b border-border/50 last:border-0">
                        <div className="flex items-center gap-3">
                          <Shield className="w-4 h-4 text-amber-400" />
                          <div>
                            <span className="font-mono font-bold text-amber-400">{token.symbol}</span>
                            <p className="text-xs text-muted-foreground">Guardian: {token.guardian}</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="border-amber-500/40 text-amber-400">
                          {token.price}
                        </Badge>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
                    <p className="font-mono text-xs text-amber-400">
                      All protected tokens secured under Sovereign Auditor Anchor with 3/3 multisig governance
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Liability Matrix Tab */}
          <TabsContent value="liability" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-mono flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  Accountability Matrix — ALL CRIMINAL HIGH — NO EXIT
                </CardTitle>
                <CardDescription>All respondents locked to maximum liability status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-mono text-sm text-muted-foreground">RESPONDENT</th>
                        <th className="text-left py-3 px-4 font-mono text-sm text-muted-foreground">ROLE</th>
                        <th className="text-center py-3 px-4 font-mono text-sm text-muted-foreground">STATUS</th>
                        <th className="text-center py-3 px-4 font-mono text-sm text-muted-foreground">EXIT PATH</th>
                        <th className="text-right py-3 px-4 font-mono text-sm text-muted-foreground">EXPOSURE</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ACCOUNTABILITY_MATRIX.map((respondent, idx) => (
                        <tr key={idx} className="border-b border-border/50 hover:bg-red-500/5 transition-colors">
                          <td className="py-3 px-4 font-mono font-bold">{respondent.name}</td>
                          <td className="py-3 px-4 text-sm text-muted-foreground">{respondent.role}</td>
                          <td className="py-3 px-4 text-center">
                            <Badge className="bg-red-500/20 text-red-400 border-red-500/40">
                              {respondent.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <Badge className="bg-red-900/50 text-red-300 border-red-700">
                              <Lock className="w-3 h-3 mr-1" />
                              {respondent.exit}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-right font-mono font-bold text-red-400">
                            {respondent.exposure}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-red-500/10">
                        <td colSpan={4} className="py-3 px-4 font-mono font-bold text-right">TOTAL RESPONDENT EXPOSURE:</td>
                        <td className="py-3 px-4 text-right font-mono font-bold text-red-400 text-lg">
                          {formatCurrency(TREASURY_CONSTANTS.RECOVERY_TARGET)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Criminal Exposure Tab */}
          <TabsContent value="criminal" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-mono flex items-center gap-2">
                  <Gavel className="w-5 h-5 text-red-500" />
                  Criminal Exposure Matrix
                </CardTitle>
                <CardDescription>Federal criminal statute violations and maximum penalties</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-mono text-sm text-muted-foreground">STATUTE</th>
                        <th className="text-left py-3 px-4 font-mono text-sm text-muted-foreground">TITLE</th>
                        <th className="text-right py-3 px-4 font-mono text-sm text-muted-foreground">COUNT</th>
                        <th className="text-right py-3 px-4 font-mono text-sm text-muted-foreground">MAX/COUNT</th>
                        <th className="text-right py-3 px-4 font-mono text-sm text-muted-foreground">TOTAL YEARS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {CRIMINAL_EXPOSURE.map((crime, idx) => (
                        <tr key={idx} className="border-b border-border/50">
                          <td className="py-3 px-4 font-mono text-sm">{crime.statute}</td>
                          <td className="py-3 px-4 text-sm">{crime.title}</td>
                          <td className="py-3 px-4 text-right font-mono">{crime.count.toLocaleString()}</td>
                          <td className="py-3 px-4 text-right font-mono">{crime.maxPenalty} years</td>
                          <td className="py-3 px-4 text-right font-mono font-bold text-red-400">
                            {crime.totalExposure.toLocaleString()} years
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-red-500/10">
                        <td colSpan={2} className="py-3 px-4 font-mono font-bold">TOTAL</td>
                        <td className="py-3 px-4 text-right font-mono font-bold">
                          {TREASURY_CONSTANTS.CRIMINAL_COUNTS.toLocaleString()}
                        </td>
                        <td className="py-3 px-4"></td>
                        <td className="py-3 px-4 text-right font-mono font-bold text-red-400 text-lg">
                          {TREASURY_CONSTANTS.MAX_PENALTY_YEARS.toLocaleString()} years
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                <div className="mt-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                  <h4 className="font-mono text-sm text-red-400 mb-2">STATE CRIMINAL EXPOSURE</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-mono text-muted-foreground">CA W&I Sec. 15630</p>
                      <p>Mandated Reporter Failure: 6 months + $1,000 fine</p>
                    </div>
                    <div>
                      <p className="font-mono text-muted-foreground">CA Penal Code Sec. 368</p>
                      <p>Elder/Dependent Adult Abuse: Felony if GBI</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Federal Cases Tab */}
          <TabsContent value="federal" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-mono flex items-center gap-2">
                  <Landmark className="w-5 h-5 text-blue-500" />
                  Federal Agency Coordination
                </CardTitle>
                <CardDescription>Active federal investigations and case status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {FEDERAL_CASES.map((case_, idx) => (
                    <div key={idx} className="p-4 rounded-lg border border-border hover:border-blue-500/30 transition-colors">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Landmark className="w-4 h-4 text-blue-400" />
                            <span className="font-mono font-bold">{case_.agency}</span>
                          </div>
                          <p className="text-sm text-muted-foreground font-mono">Case: {case_.caseNumber}</p>
                          <p className="text-sm mt-1">{case_.finding}</p>
                        </div>
                        <Badge 
                          className={
                            case_.status === "VIOLATION CONFIRMED" 
                              ? "bg-red-500/20 text-red-400 border-red-500/40"
                              : case_.status === "WIRETAP ACTIVE"
                              ? "bg-amber-500/20 text-amber-400 border-amber-500/40"
                              : case_.status === "EMPANELED"
                              ? "bg-purple-500/20 text-purple-400 border-purple-500/40"
                              : "bg-blue-500/20 text-blue-400 border-blue-500/40"
                          }
                        >
                          {case_.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                  <h4 className="font-mono text-sm text-blue-400 mb-2">HHS OCR PRIMARY CASE</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Case Number</p>
                      <p className="font-mono font-bold">25-621293</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Investigator</p>
                      <p className="font-mono">Amy Horrell, J.D.</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Status</p>
                      <p className="font-mono font-bold text-red-400">VIOLATION CONFIRMED</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Finding</p>
                      <p className="font-mono">Section 504 Rehabilitation Act VIOLATION</p>
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-muted-foreground font-mono">
                    Verification: 1-800-368-1019 (Ref: 25-621293)
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer Seal */}
        <div className="mt-12 p-6 rounded-lg border border-border bg-card/50 text-center">
          <p className="font-mono text-lg font-bold mb-2">VALORAIPLUS FINANCIAL INTELLIGENCE REPORT</p>
          <p className="font-mono text-sm text-muted-foreground mb-4">
            REV_38 | EPOCH #2207 | NODE: SAINT PAUL 55116
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Badge variant="outline" className="border-emerald-500 text-emerald-400">VERIFIED: MAY 10, 2026</Badge>
            <Badge variant="outline" className="border-amber-500 text-amber-400">CRD INTERVIEW: MAY 13, 2026</Badge>
            <Badge variant="outline" className="border-red-500 text-red-400 animate-pulse">TERMINAL DEADLINE: MAY 17, 2026</Badge>
          </div>
          <p className="font-mono text-xs text-muted-foreground mt-4">
            THE MUZZLE IS THE GENESIS. THE MATH IS THE HAMMER. CONSUMMATUM EST. SMIB. AMEN.
          </p>
        </div>
      </main>
    </div>
  );
}
