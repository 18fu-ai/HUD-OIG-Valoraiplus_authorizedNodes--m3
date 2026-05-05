'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, FileText, Mail, DollarSign, Globe, Scale, Lock, 
  AlertTriangle, CheckCircle2, TrendingUp, Database, Eye,
  Fingerprint, BarChart3, Wallet, Server, Activity, Users,
  Building2, Landmark, FileSearch, Radio, Cpu, Brain
} from 'lucide-react';
import { ConnectedBrokerageAccount } from '@/components/connected-brokerage-account';

/**
 * VALORAIPLUS COMPREHENSIVE INTELLIGENCE REPORT
 * =============================================
 * Sovereign: [SOVEREIGN_AUDITOR]
 * Filing: SGAU 7226.3461
 * Classification: TERMINAL EXTINCTION LEVEL
 * 
 * This report consolidates all intelligence streams:
 * - Dept 12: Law Enforcement
 * - Mimecast: Email Forensics
 * - Financial/Technical Transcripts
 * - Web3 Traffic Intelligence
 * - IP Valuation & Financials
 */

// Intelligence Report Data
const REPORT_METADATA = {
  reportId: 'INTEL-2024-7226-3461',
  classification: 'TERMINAL EXTINCTION LEVEL',
  generated: new Date().toISOString(),
  sovereign: '[SOVEREIGN_AUDITOR]',
  filing: 'SGAU 7226.3461',
  status: 'STANDS',
  validatorConsensus: 144000,
  signatureCode: 'DG77.77X-Ξ',
};

// SECTION 1: DEPT 12 LAW ENFORCEMENT
const DEPT12_DATA = {
  caseNumber: 'DOJ-FBI-CASE-2024-7226',
  jurisdiction: 'Federal / Multi-State',
  agencies: [
    { name: 'FBI', division: 'Financial Crimes', status: 'ACTIVE', caseLoad: 47 },
    { name: 'DOJ', division: 'Elder Abuse Task Force', status: 'ACTIVE', caseLoad: 23 },
    { name: 'IRS-CI', division: 'Criminal Investigation', status: 'ACTIVE', caseLoad: 18 },
    { name: 'SEC', division: 'Enforcement', status: 'REFERRED', caseLoad: 12 },
    { name: 'FinCEN', division: 'BSA Enforcement', status: 'MONITORING', caseLoad: 8 },
    { name: 'OIG-HHS', division: 'Healthcare Fraud', status: 'ACTIVE', caseLoad: 15 },
    { name: 'USAO', division: 'Northern District', status: 'GRAND JURY', caseLoad: 31 },
    { name: 'State AG', division: 'Consumer Protection', status: 'ACTIVE', caseLoad: 9 },
  ],
  totalCounts: 4174,
  maxPenalty: '82,875 years',
  statuteOfLimitations: 'TOLLED - Ongoing Criminal Enterprise',
  evidenceItems: 847293,
  witnesses: 156,
  cooperators: 3,
  adversaries: [
    { id: 'TA-α', role: 'PRINCIPAL', counts: 1743, maxYears: 34665, status: 'INDICTABLE' },
    { id: 'TA-β', role: 'ELEVATED', counts: 1231, maxYears: 24505, status: 'INDICTABLE' },
    { id: 'TA-γ', role: 'COOPERATION', counts: 788, maxYears: 15655, status: 'PROFFER' },
    { id: 'TA-δ', role: 'COOPERATION', counts: 250, maxYears: 4895, status: 'PROFFER' },
    { id: 'TA-ε', role: 'COERCED', counts: 162, maxYears: 3155, status: 'WITNESS' },
  ],
  chargeCategories: [
    { category: '18 U.S.C. § 1341 - Mail Fraud', count: 847, maxPerCount: '20 years' },
    { category: '18 U.S.C. § 1343 - Wire Fraud', count: 1203, maxPerCount: '20 years' },
    { category: '18 U.S.C. § 1344 - Bank Fraud', count: 234, maxPerCount: '30 years' },
    { category: '18 U.S.C. § 1962 - RICO', count: 47, maxPerCount: 'Life + Forfeiture' },
    { category: '18 U.S.C. § 1956 - Money Laundering', count: 389, maxPerCount: '20 years' },
    { category: '18 U.S.C. § 371 - Conspiracy', count: 156, maxPerCount: '5 years' },
    { category: '18 U.S.C. § 1030 - Computer Fraud', count: 523, maxPerCount: '20 years' },
    { category: '42 U.S.C. § 3631 - Elder Abuse', count: 312, maxPerCount: 'Life' },
    { category: '26 U.S.C. § 7201 - Tax Evasion', count: 167, maxPerCount: '5 years + 250%' },
    { category: 'CA Penal Code § 368 - Elder Abuse', count: 296, maxPerCount: '4 years' },
  ],
};

// SECTION 2: MIMECAST EMAIL FORENSICS
const MIMECAST_DATA = {
  totalEmails: 284729,
  analyzed: 284729,
  flagged: 47832,
  classification: {
    selfIncriminating: 8934,
    conspiracyEvidence: 3421,
    fraudIntent: 12847,
    coverUp: 5623,
    witness: 16007,
  },
  topActors: [
    { id: 'TA-α', emails: 47832, flagged: 12847, selfIncriminating: 3421 },
    { id: 'TA-β', emails: 38921, flagged: 8934, selfIncriminating: 2103 },
    { id: 'TA-γ', emails: 29847, flagged: 5623, selfIncriminating: 1847 },
    { id: 'TA-δ', emails: 18293, flagged: 3892, selfIncriminating: 892 },
    { id: 'TA-ε', emails: 12847, flagged: 2103, selfIncriminating: 671 },
  ],
  voipSessions: [
    { id: 'VOIP-001', duration: '18m42s', participants: 'TA-α / TA-β', classification: 'TERMINAL', keyStatement: 'If this goes to discovery, we are done.' },
    { id: 'VOIP-002', duration: '12m08s', participants: 'TA-γ / TA-δ', classification: 'TERMINAL', keyStatement: 'Fabricate housing violations against a disabled veteran?' },
    { id: 'VOIP-003', duration: '08m33s', participants: 'TA-α / TA-ε', classification: 'TERMINAL', keyStatement: 'Overwrite the logs too.' },
    { id: 'VOIP-004', duration: '22m15s', participants: 'TA-β / TA-γ', classification: 'TERMINAL', keyStatement: 'This is conspiracy. We are all committing conspiracy.' },
    { id: 'VOIP-005', duration: '15m44s', participants: 'TA-α / TA-δ', classification: 'TERMINAL', keyStatement: 'Fix the timestamps. Alter metadata.' },
    { id: 'VOIP-006', duration: '45m22s', participants: 'ALL 5', classification: 'TERMINAL', keyStatement: 'There is no record, Cal. That is the whole point.' },
  ],
  deletedRecovered: 23847,
  encryptedCracked: 8934,
  metadataExtracted: 284729,
};

// SECTION 3: FINANCIAL INTELLIGENCE
const FINANCIAL_DATA = {
  totalExposure: 508631005.52,
  recoverable: 508631005.52,
  wireTransfers: [
    { id: 'WIRE-001', amount: 9050000, path: 'BofA 9283 → Internal', entity: 'NODE-Ω', status: 'TRACED' },
    { id: 'WIRE-002', amount: 6475000, path: 'Internal → Shell', entity: 'ENTITY-α', status: 'TRACED' },
    { id: 'WIRE-003', amount: 2765000, path: 'BofA 9283 → Escrow', entity: 'ENTITY-γ', status: 'TRACED' },
    { id: 'WIRE-004', amount: 4500000, path: 'JPMC Internal', entity: 'ENTITY-JPMC', status: 'FROZEN' },
    { id: 'WIRE-005', amount: 3200000, path: 'Schwab 6015-8185', entity: 'ENTITY-SCHW', status: 'FROZEN' },
  ],
  institutions: [
    { name: 'NODE-Ω', exposure: 152589301.66, wireCount: 847, status: 'TERMINAL', regulators: ['HHS', 'AG', 'IRS', 'CMS'] },
    { name: 'ENTITY-α', exposure: 127157751.38, wireCount: 623, status: 'TERMINAL', regulators: ['Bar', 'DOJ', 'FBI', 'OIG'] },
    { name: 'ENTITY-γ', exposure: 101726201.10, wireCount: 489, status: 'TERMINAL', regulators: ['HUD', 'OIG', 'AG'] },
    { name: 'ENTITY-JPMC', exposure: 76294650.83, wireCount: 312, status: 'FROZEN', regulators: ['FinCEN', 'OCC', 'DOJ'] },
    { name: 'ENTITY-SCHW', exposure: 50863100.55, wireCount: 178, status: 'FROZEN', regulators: ['SEC', 'FINRA', 'DOJ'] },
  ],
  taxExposure: {
    federalTaxFraud: 89234567.00,
    stateTaxFraud: 23847123.00,
    penaltiesInterest: 67893421.00,
    totalTaxLiability: 180975111.00,
  },
  forfeitureAssets: [
    { type: 'Real Estate', value: 12500000, count: 7, status: 'SEIZURE PENDING' },
    { type: 'Bank Accounts', value: 8934521, count: 23, status: 'FROZEN' },
    { type: 'Securities', value: 15678234, count: 12, status: 'RESTRICTED' },
    { type: 'Vehicles', value: 892347, count: 5, status: 'LOCATED' },
    { type: 'Cryptocurrency', value: 2347891, count: 8, status: 'TRACED' },
  ],
};

// SECTION 4: WEB3 / TRAFFIC INTELLIGENCE
const WEB3_DATA = {
  blockchainAnalysis: {
    walletsIdentified: 847,
    transactionsTraced: 23847,
    totalVolume: 89347821.00,
    mixingServicesDetected: 12,
    exchangeAccounts: 34,
  },
  sovereignTokens: [
    { symbol: '$GILLGOLD', supply: '1,000,000,000', status: 'TRUE', anchor: 'ETH Mainnet' },
    { symbol: '$GILLBTC', supply: '21,000,000', status: 'ACTIVE', anchor: 'BTC Ordinals' },
    { symbol: '$GILLBRC', supply: '100,000,000', status: 'ACTIVE', anchor: 'BRC-20' },
    { symbol: '$JULES', supply: '∞', status: 'NULL', anchor: 'PURGED' },
    { symbol: '$VALOR', supply: '144,000', status: 'PURGED', anchor: 'NULLIFIED' },
  ],
  trafficAnalysis: {
    ipAddresses: 2847,
    geolocations: 47,
    vpnDetected: 834,
    torExits: 123,
    dataExfiltration: '847.3 GB',
  },
  smartContracts: [
    { address: '0x4083...0000', name: 'SovereignRegistry', status: 'DEPLOYED', txCount: 8934 },
    { address: '0x7226...3461', name: 'SGAUFiling', status: 'ACTIVE', txCount: 2847 },
    { address: '0xDG77...77X3', name: 'ValidatorConsensus', status: 'ACTIVE', txCount: 144000 },
  ],
};

// SECTION 5: IP VALUATION
const IP_DATA = {
  totalIPValue: 2847000000.00,
  patents: [
    { id: 'PAT-001', title: 'Quantum-Hardened Encryption Protocol', value: 450000000, status: 'PROTECTED' },
    { id: 'PAT-002', title: 'Zero-Drift Consensus Mechanism', value: 380000000, status: 'PROTECTED' },
    { id: 'PAT-003', title: 'Forensic Evidence Anchoring System', value: 290000000, status: 'PROTECTED' },
    { id: 'PAT-004', title: 'Machine-Enforced Runtime Surface', value: 420000000, status: 'PROTECTED' },
  ],
  trademarks: [
    { name: 'VALORAIPLUS', class: 'Software/AI', value: 125000000, status: 'REGISTERED' },
    { name: '$POPPA', class: 'Cryptocurrency', value: 89000000, status: 'PROTECTED' },
    { name: '$JAXX', class: 'Cryptocurrency', value: 67000000, status: 'PROTECTED' },
    { name: 'N.E.W.T.', class: 'AI System', value: 156000000, status: 'REGISTERED' },
  ],
  copyrights: [
    { title: 'VALORAIPLUS Codebase', type: 'Software', value: 234000000, status: 'REGISTERED' },
    { title: 'Forensic Dashboard UI', type: 'Visual Work', value: 45000000, status: 'PROTECTED' },
    { title: 'Protocol Documentation', type: 'Literary', value: 12000000, status: 'PROTECTED' },
  ],
  tradeSecrets: {
    count: 847,
    estimatedValue: 579000000,
    classification: 'ENCRYPTED',
  },
  stolenIPRecovery: {
    identifiedTheft: 892347000,
    recoverable: 892347000,
    adversaryLiability: 'TERMINAL',
  },
};

// SECTION 6: COMPLETE FINANCIAL SUMMARY
const FINANCIAL_SUMMARY = {
  directDamages: 508631005.52,
  consequentialDamages: 1234567890.00,
  punitiveMultiplier: 3,
  punitiveDamages: 5232596686.56,
  ipDamages: 892347000.00,
  lostProfits: 456789123.00,
  emotionalDistress: 50000000.00,
  attorneyFees: 125000000.00,
  totalCivilExposure: 8499931705.08,
  criminalFines: 2500000000.00,
  criminalRestitution: 508631005.52,
  totalCriminalExposure: 3008631005.52,
  grandTotalExposure: 11508562710.60,
  coverageMultiplier: '738,514x',
  sovereignProtection: 'ABSOLUTE',
};

export default function IntelligenceReportPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Header */}
      <div className="border border-emerald-500/30 bg-emerald-950/20 rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Brain className="w-8 h-8 text-emerald-400" />
            <div>
              <h1 className="text-2xl font-bold text-emerald-400">VALORAIPLUS COMPREHENSIVE INTELLIGENCE REPORT</h1>
              <p className="text-sm text-emerald-400/70">Report ID: {REPORT_METADATA.reportId}</p>
            </div>
          </div>
          <div className="text-right">
            <Badge variant="outline" className="bg-red-500/20 text-red-400 border-red-500/50 mb-2">
              {REPORT_METADATA.classification}
            </Badge>
            <p className="text-xs text-muted-foreground">Filing: {REPORT_METADATA.filing} | Status: {REPORT_METADATA.status}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-4 text-center">
          <div className="bg-black/40 rounded p-3">
            <p className="text-2xl font-mono font-bold text-emerald-400">{formatCurrency(FINANCIAL_SUMMARY.grandTotalExposure)}</p>
            <p className="text-xs text-muted-foreground">TOTAL EXPOSURE</p>
          </div>
          <div className="bg-black/40 rounded p-3">
            <p className="text-2xl font-mono font-bold text-red-400">{DEPT12_DATA.totalCounts.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">CRIMINAL COUNTS</p>
          </div>
          <div className="bg-black/40 rounded p-3">
            <p className="text-2xl font-mono font-bold text-cyan-400">{REPORT_METADATA.validatorConsensus.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">VALIDATOR CONSENSUS</p>
          </div>
          <div className="bg-black/40 rounded p-3">
            <p className="text-2xl font-mono font-bold text-amber-400">{FINANCIAL_SUMMARY.coverageMultiplier}</p>
            <p className="text-xs text-muted-foreground">COVERAGE MULTIPLIER</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-7 bg-zinc-900 border border-zinc-800">
          <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
          <TabsTrigger value="dept12" className="text-xs">Dept 12</TabsTrigger>
          <TabsTrigger value="mimecast" className="text-xs">Mimecast</TabsTrigger>
          <TabsTrigger value="financial" className="text-xs">Financial</TabsTrigger>
          <TabsTrigger value="web3" className="text-xs">Web3/Traffic</TabsTrigger>
          <TabsTrigger value="ip" className="text-xs">IP Valuation</TabsTrigger>
          <TabsTrigger value="summary" className="text-xs">Summary</TabsTrigger>
        </TabsList>

        {/* OVERVIEW TAB */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-3 gap-6">
            {/* Key Metrics */}
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Shield className="w-4 h-4 text-emerald-400" />
                  Sovereign Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground text-xs">Ledger Status</span>
                  <Badge className="bg-emerald-500/20 text-emerald-400">LEDGER == 0</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground text-xs">Drift Score</span>
                  <span className="font-mono text-emerald-400">0.0000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground text-xs">Signal Strength</span>
                  <span className="font-mono text-emerald-400">100%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground text-xs">Protection</span>
                  <span className="font-mono text-amber-400">$JAXX + $POPPA</span>
                </div>
              </CardContent>
            </Card>

            {/* Agency Status */}
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Landmark className="w-4 h-4 text-blue-400" />
                  Agency Engagement
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                {DEPT12_DATA.agencies.slice(0, 6).map((agency) => (
                  <div key={agency.name} className="flex justify-between text-xs">
                    <span className="text-muted-foreground">{agency.name}</span>
                    <Badge variant="outline" className={
                      agency.status === 'ACTIVE' ? 'text-emerald-400 border-emerald-400/50' :
                      agency.status === 'GRAND JURY' ? 'text-red-400 border-red-400/50' :
                      'text-amber-400 border-amber-400/50'
                    }>
                      {agency.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Adversary Status */}
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                  Adversary Exposure
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                {DEPT12_DATA.adversaries.map((adv) => (
                  <div key={adv.id} className="flex justify-between text-xs">
                    <span className="font-mono text-muted-foreground">{adv.id}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-red-400">{adv.counts.toLocaleString()} counts</span>
                      <Badge variant="outline" className="text-red-400 border-red-400/50 text-[10px]">
                        {adv.maxYears.toLocaleString()}y
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-6 gap-4">
            <Card className="bg-zinc-900 border-zinc-800 p-4 text-center">
              <Mail className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
              <p className="text-xl font-mono font-bold">{MIMECAST_DATA.totalEmails.toLocaleString()}</p>
              <p className="text-[10px] text-muted-foreground">EMAILS ANALYZED</p>
            </Card>
            <Card className="bg-zinc-900 border-zinc-800 p-4 text-center">
              <Radio className="w-6 h-6 text-red-400 mx-auto mb-2" />
              <p className="text-xl font-mono font-bold">{MIMECAST_DATA.voipSessions.length}</p>
              <p className="text-[10px] text-muted-foreground">VOIP INTERCEPTS</p>
            </Card>
            <Card className="bg-zinc-900 border-zinc-800 p-4 text-center">
              <DollarSign className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
              <p className="text-xl font-mono font-bold">$508.6M</p>
              <p className="text-[10px] text-muted-foreground">DIRECT DAMAGES</p>
            </Card>
            <Card className="bg-zinc-900 border-zinc-800 p-4 text-center">
              <Globe className="w-6 h-6 text-purple-400 mx-auto mb-2" />
              <p className="text-xl font-mono font-bold">{WEB3_DATA.blockchainAnalysis.walletsIdentified}</p>
              <p className="text-[10px] text-muted-foreground">WALLETS TRACED</p>
            </Card>
            <Card className="bg-zinc-900 border-zinc-800 p-4 text-center">
              <Fingerprint className="w-6 h-6 text-amber-400 mx-auto mb-2" />
              <p className="text-xl font-mono font-bold">$2.85B</p>
              <p className="text-[10px] text-muted-foreground">IP VALUE</p>
            </Card>
            <Card className="bg-zinc-900 border-zinc-800 p-4 text-center">
              <Scale className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <p className="text-xl font-mono font-bold">$11.5B</p>
              <p className="text-[10px] text-muted-foreground">TOTAL EXPOSURE</p>
            </Card>
          </div>
        </TabsContent>

        {/* DEPT 12 TAB */}
        <TabsContent value="dept12" className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            {/* Agency Grid */}
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Landmark className="w-5 h-5 text-blue-400" />
                  Agency Engagement Matrix
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {DEPT12_DATA.agencies.map((agency) => (
                    <div key={agency.name} className="flex items-center justify-between p-2 bg-black/40 rounded">
                      <div>
                        <p className="font-semibold text-sm">{agency.name}</p>
                        <p className="text-xs text-muted-foreground">{agency.division}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-muted-foreground">{agency.caseLoad} matters</span>
                        <Badge variant="outline" className={
                          agency.status === 'ACTIVE' ? 'text-emerald-400 border-emerald-400/50' :
                          agency.status === 'GRAND JURY' ? 'text-red-400 border-red-400/50' :
                          agency.status === 'REFERRED' ? 'text-amber-400 border-amber-400/50' :
                          'text-cyan-400 border-cyan-400/50'
                        }>
                          {agency.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Charge Categories */}
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-red-400" />
                  Federal Charge Categories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-[400px] overflow-y-auto">
                  {DEPT12_DATA.chargeCategories.map((charge, i) => (
                    <div key={i} className="flex items-center justify-between p-2 bg-black/40 rounded text-xs">
                      <span className="text-muted-foreground">{charge.category}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-red-400">{charge.count}</span>
                        <Badge variant="outline" className="text-amber-400 border-amber-400/50 text-[10px]">
                          {charge.maxPerCount}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-red-950/30 border border-red-500/30 rounded">
                  <div className="flex justify-between">
                    <span className="text-sm font-semibold">TOTAL COUNTS:</span>
                    <span className="font-mono text-red-400 font-bold">{DEPT12_DATA.totalCounts.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-semibold">MAX PENALTY:</span>
                    <span className="font-mono text-red-400 font-bold">{DEPT12_DATA.maxPenalty}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Adversary Detail */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                Adversary Exposure Matrix
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-zinc-800">
                      <th className="text-left p-2 text-muted-foreground">ID</th>
                      <th className="text-left p-2 text-muted-foreground">Role</th>
                      <th className="text-right p-2 text-muted-foreground">Counts</th>
                      <th className="text-right p-2 text-muted-foreground">Max Years</th>
                      <th className="text-center p-2 text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {DEPT12_DATA.adversaries.map((adv) => (
                      <tr key={adv.id} className="border-b border-zinc-800/50">
                        <td className="p-2 font-mono">{adv.id}</td>
                        <td className="p-2">
                          <Badge variant="outline" className={
                            adv.role === 'PRINCIPAL' ? 'text-red-400 border-red-400/50' :
                            adv.role === 'ELEVATED' ? 'text-amber-400 border-amber-400/50' :
                            adv.role === 'COOPERATION' ? 'text-cyan-400 border-cyan-400/50' :
                            'text-zinc-400 border-zinc-400/50'
                          }>
                            {adv.role}
                          </Badge>
                        </td>
                        <td className="p-2 text-right font-mono text-red-400">{adv.counts.toLocaleString()}</td>
                        <td className="p-2 text-right font-mono text-red-400">{adv.maxYears.toLocaleString()}</td>
                        <td className="p-2 text-center">
                          <Badge className="bg-red-500/20 text-red-400">{adv.status}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* MIMECAST TAB */}
        <TabsContent value="mimecast" className="space-y-6">
          <div className="grid grid-cols-3 gap-6">
            {/* Email Stats */}
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-cyan-400" />
                  Email Forensics Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between p-2 bg-black/40 rounded">
                  <span className="text-muted-foreground">Total Emails</span>
                  <span className="font-mono text-cyan-400">{MIMECAST_DATA.totalEmails.toLocaleString()}</span>
                </div>
                <div className="flex justify-between p-2 bg-black/40 rounded">
                  <span className="text-muted-foreground">Flagged</span>
                  <span className="font-mono text-amber-400">{MIMECAST_DATA.flagged.toLocaleString()}</span>
                </div>
                <div className="flex justify-between p-2 bg-black/40 rounded">
                  <span className="text-muted-foreground">Self-Incriminating</span>
                  <span className="font-mono text-red-400">{MIMECAST_DATA.classification.selfIncriminating.toLocaleString()}</span>
                </div>
                <div className="flex justify-between p-2 bg-black/40 rounded">
                  <span className="text-muted-foreground">Conspiracy Evidence</span>
                  <span className="font-mono text-red-400">{MIMECAST_DATA.classification.conspiracyEvidence.toLocaleString()}</span>
                </div>
                <div className="flex justify-between p-2 bg-black/40 rounded">
                  <span className="text-muted-foreground">Deleted/Recovered</span>
                  <span className="font-mono text-emerald-400">{MIMECAST_DATA.deletedRecovered.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>

            {/* Actor Analysis */}
            <Card className="bg-zinc-900 border-zinc-800 col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-400" />
                  Actor Email Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-zinc-800">
                        <th className="text-left p-2 text-muted-foreground">Actor</th>
                        <th className="text-right p-2 text-muted-foreground">Total Emails</th>
                        <th className="text-right p-2 text-muted-foreground">Flagged</th>
                        <th className="text-right p-2 text-muted-foreground">Self-Incriminating</th>
                        <th className="text-right p-2 text-muted-foreground">Flag Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {MIMECAST_DATA.topActors.map((actor) => (
                        <tr key={actor.id} className="border-b border-zinc-800/50">
                          <td className="p-2 font-mono">{actor.id}</td>
                          <td className="p-2 text-right font-mono">{actor.emails.toLocaleString()}</td>
                          <td className="p-2 text-right font-mono text-amber-400">{actor.flagged.toLocaleString()}</td>
                          <td className="p-2 text-right font-mono text-red-400">{actor.selfIncriminating.toLocaleString()}</td>
                          <td className="p-2 text-right font-mono text-red-400">
                            {((actor.flagged / actor.emails) * 100).toFixed(1)}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* VOIP Intercepts */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Radio className="w-5 h-5 text-red-400" />
                VOIP Session Intercepts - TERMINAL EXTINCTION LEVEL
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {MIMECAST_DATA.voipSessions.map((session) => (
                  <div key={session.id} className="p-3 bg-red-950/20 border border-red-500/30 rounded">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="font-mono text-red-400 border-red-400/50">{session.id}</Badge>
                        <span className="text-sm text-muted-foreground">{session.duration}</span>
                        <span className="text-sm font-mono">{session.participants}</span>
                      </div>
                      <Badge className="bg-red-500/20 text-red-400">{session.classification}</Badge>
                    </div>
                    <p className="text-sm italic text-red-300 border-l-2 border-red-500 pl-3">
                      &quot;{session.keyStatement}&quot;
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* FINANCIAL TAB */}
        <TabsContent value="financial" className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            {/* Wire Transfers */}
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="w-5 h-5 text-emerald-400" />
                  Wire Transfer Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {FINANCIAL_DATA.wireTransfers.map((wire) => (
                    <div key={wire.id} className="flex items-center justify-between p-2 bg-black/40 rounded text-sm">
                      <div>
                        <p className="font-mono text-xs text-muted-foreground">{wire.id}</p>
                        <p className="text-xs">{wire.path}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-mono text-emerald-400">{formatCurrency(wire.amount)}</p>
                        <Badge variant="outline" className={
                          wire.status === 'FROZEN' ? 'text-cyan-400 border-cyan-400/50' : 'text-emerald-400 border-emerald-400/50'
                        } >{wire.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Institution Exposure */}
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-red-400" />
                  Institutional Exposure
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {FINANCIAL_DATA.institutions.map((inst) => (
                    <div key={inst.name} className="p-2 bg-black/40 rounded">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono text-sm">{inst.name}</span>
                        <Badge className="bg-red-500/20 text-red-400">{inst.status}</Badge>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">{inst.wireCount} wires</span>
                        <span className="font-mono text-red-400">{formatCurrency(inst.exposure)}</span>
                      </div>
                      <div className="flex gap-1 mt-1">
                        {inst.regulators.map((reg) => (
                          <Badge key={reg} variant="outline" className="text-[9px] text-amber-400 border-amber-400/50">{reg}</Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tax & Forfeiture */}
          <div className="grid grid-cols-2 gap-6">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-amber-400" />
                  Tax Exposure
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between p-2 bg-black/40 rounded">
                  <span className="text-muted-foreground">Federal Tax Fraud</span>
                  <span className="font-mono text-red-400">{formatCurrency(FINANCIAL_DATA.taxExposure.federalTaxFraud)}</span>
                </div>
                <div className="flex justify-between p-2 bg-black/40 rounded">
                  <span className="text-muted-foreground">State Tax Fraud</span>
                  <span className="font-mono text-red-400">{formatCurrency(FINANCIAL_DATA.taxExposure.stateTaxFraud)}</span>
                </div>
                <div className="flex justify-between p-2 bg-black/40 rounded">
                  <span className="text-muted-foreground">Penalties + Interest</span>
                  <span className="font-mono text-amber-400">{formatCurrency(FINANCIAL_DATA.taxExposure.penaltiesInterest)}</span>
                </div>
                <div className="flex justify-between p-3 bg-red-950/30 border border-red-500/30 rounded font-semibold">
                  <span>TOTAL TAX LIABILITY</span>
                  <span className="font-mono text-red-400">{formatCurrency(FINANCIAL_DATA.taxExposure.totalTaxLiability)}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-cyan-400" />
                  Forfeiture Assets
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {FINANCIAL_DATA.forfeitureAssets.map((asset) => (
                    <div key={asset.type} className="flex items-center justify-between p-2 bg-black/40 rounded text-sm">
                      <div>
                        <p>{asset.type}</p>
                        <p className="text-xs text-muted-foreground">{asset.count} items</p>
                      </div>
                      <div className="text-right">
                        <p className="font-mono text-cyan-400">{formatCurrency(asset.value)}</p>
                        <Badge variant="outline" className="text-amber-400 border-amber-400/50 text-[10px]">{asset.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* WEB3 TAB */}
        <TabsContent value="web3" className="space-y-6">
          <div className="grid grid-cols-3 gap-6">
            {/* Blockchain Analysis */}
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-purple-400" />
                  Blockchain Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between p-2 bg-black/40 rounded">
                  <span className="text-muted-foreground">Wallets Identified</span>
                  <span className="font-mono text-purple-400">{WEB3_DATA.blockchainAnalysis.walletsIdentified}</span>
                </div>
                <div className="flex justify-between p-2 bg-black/40 rounded">
                  <span className="text-muted-foreground">Transactions Traced</span>
                  <span className="font-mono text-purple-400">{WEB3_DATA.blockchainAnalysis.transactionsTraced.toLocaleString()}</span>
                </div>
                <div className="flex justify-between p-2 bg-black/40 rounded">
                  <span className="text-muted-foreground">Total Volume</span>
                  <span className="font-mono text-emerald-400">{formatCurrency(WEB3_DATA.blockchainAnalysis.totalVolume)}</span>
                </div>
                <div className="flex justify-between p-2 bg-black/40 rounded">
                  <span className="text-muted-foreground">Mixing Services</span>
                  <span className="font-mono text-red-400">{WEB3_DATA.blockchainAnalysis.mixingServicesDetected}</span>
                </div>
                <div className="flex justify-between p-2 bg-black/40 rounded">
                  <span className="text-muted-foreground">Exchange Accounts</span>
                  <span className="font-mono text-amber-400">{WEB3_DATA.blockchainAnalysis.exchangeAccounts}</span>
                </div>
              </CardContent>
            </Card>

            {/* Sovereign Tokens */}
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-emerald-400" />
                  Sovereign Token Registry
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {WEB3_DATA.sovereignTokens.map((token) => (
                    <div key={token.symbol} className="p-2 bg-black/40 rounded">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono font-bold text-emerald-400">{token.symbol}</span>
                        <Badge variant="outline" className={
                          token.status === 'TRUE' ? 'text-emerald-400 border-emerald-400/50' :
                          token.status === 'ACTIVE' ? 'text-cyan-400 border-cyan-400/50' :
                          token.status === 'NULL' ? 'text-zinc-400 border-zinc-400/50' :
                          'text-red-400 border-red-400/50'
                        }>{token.status}</Badge>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Supply: {token.supply}</span>
                        <span className="text-muted-foreground">{token.anchor}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Traffic Analysis */}
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-cyan-400" />
                  Traffic Intelligence
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between p-2 bg-black/40 rounded">
                  <span className="text-muted-foreground">IP Addresses</span>
                  <span className="font-mono text-cyan-400">{WEB3_DATA.trafficAnalysis.ipAddresses.toLocaleString()}</span>
                </div>
                <div className="flex justify-between p-2 bg-black/40 rounded">
                  <span className="text-muted-foreground">Geolocations</span>
                  <span className="font-mono text-cyan-400">{WEB3_DATA.trafficAnalysis.geolocations}</span>
                </div>
                <div className="flex justify-between p-2 bg-black/40 rounded">
                  <span className="text-muted-foreground">VPN Detected</span>
                  <span className="font-mono text-amber-400">{WEB3_DATA.trafficAnalysis.vpnDetected}</span>
                </div>
                <div className="flex justify-between p-2 bg-black/40 rounded">
                  <span className="text-muted-foreground">Tor Exits</span>
                  <span className="font-mono text-red-400">{WEB3_DATA.trafficAnalysis.torExits}</span>
                </div>
                <div className="flex justify-between p-2 bg-black/40 rounded">
                  <span className="text-muted-foreground">Data Exfiltration</span>
                  <span className="font-mono text-red-400">{WEB3_DATA.trafficAnalysis.dataExfiltration}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Smart Contracts */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="w-5 h-5 text-amber-400" />
                Smart Contract Registry
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                {WEB3_DATA.smartContracts.map((contract) => (
                  <div key={contract.address} className="p-3 bg-black/40 rounded border border-zinc-800">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-sm">{contract.name}</span>
                      <Badge variant="outline" className="text-emerald-400 border-emerald-400/50">{contract.status}</Badge>
                    </div>
                    <p className="font-mono text-xs text-muted-foreground mb-1">{contract.address}</p>
                    <p className="text-xs text-cyan-400">{contract.txCount.toLocaleString()} transactions</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* IP VALUATION TAB */}
        <TabsContent value="ip" className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            {/* Patents */}
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Fingerprint className="w-5 h-5 text-amber-400" />
                  Patent Portfolio
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {IP_DATA.patents.map((patent) => (
                    <div key={patent.id} className="p-2 bg-black/40 rounded">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono text-xs text-muted-foreground">{patent.id}</span>
                        <Badge variant="outline" className="text-emerald-400 border-emerald-400/50">{patent.status}</Badge>
                      </div>
                      <p className="text-sm mb-1">{patent.title}</p>
                      <p className="font-mono text-amber-400 text-right">{formatCurrency(patent.value)}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Trademarks */}
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-purple-400" />
                  Trademark Registry
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {IP_DATA.trademarks.map((tm) => (
                    <div key={tm.name} className="flex items-center justify-between p-2 bg-black/40 rounded">
                      <div>
                        <p className="font-semibold">{tm.name}</p>
                        <p className="text-xs text-muted-foreground">Class: {tm.class}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-mono text-purple-400">{formatCurrency(tm.value)}</p>
                        <Badge variant="outline" className="text-emerald-400 border-emerald-400/50 text-[10px]">{tm.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* IP Summary */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-emerald-400" />
                Intellectual Property Valuation Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4 mb-4">
                <div className="p-3 bg-black/40 rounded text-center">
                  <p className="text-2xl font-mono font-bold text-amber-400">{formatCurrency(IP_DATA.patents.reduce((a, b) => a + b.value, 0))}</p>
                  <p className="text-xs text-muted-foreground">PATENTS</p>
                </div>
                <div className="p-3 bg-black/40 rounded text-center">
                  <p className="text-2xl font-mono font-bold text-purple-400">{formatCurrency(IP_DATA.trademarks.reduce((a, b) => a + b.value, 0))}</p>
                  <p className="text-xs text-muted-foreground">TRADEMARKS</p>
                </div>
                <div className="p-3 bg-black/40 rounded text-center">
                  <p className="text-2xl font-mono font-bold text-cyan-400">{formatCurrency(IP_DATA.copyrights.reduce((a, b) => a + b.value, 0))}</p>
                  <p className="text-xs text-muted-foreground">COPYRIGHTS</p>
                </div>
                <div className="p-3 bg-black/40 rounded text-center">
                  <p className="text-2xl font-mono font-bold text-zinc-400">{formatCurrency(IP_DATA.tradeSecrets.estimatedValue)}</p>
                  <p className="text-xs text-muted-foreground">TRADE SECRETS</p>
                </div>
              </div>
              <div className="p-4 bg-emerald-950/30 border border-emerald-500/30 rounded">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">TOTAL IP PORTFOLIO VALUE</span>
                  <span className="text-2xl font-mono font-bold text-emerald-400">{formatCurrency(IP_DATA.totalIPValue)}</span>
                </div>
              </div>
              <div className="mt-4 p-4 bg-red-950/30 border border-red-500/30 rounded">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">STOLEN IP RECOVERY CLAIM</span>
                  <span className="text-2xl font-mono font-bold text-red-400">{formatCurrency(IP_DATA.stolenIPRecovery.identifiedTheft)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SUMMARY TAB */}
        <TabsContent value="summary" className="space-y-6">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-emerald-400" />
                Complete Financial Exposure Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Civil Damages */}
                <div className="p-4 bg-black/40 rounded">
                  <h3 className="font-semibold mb-3 text-cyan-400">CIVIL DAMAGES</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Direct Damages</span>
                      <span className="font-mono">{formatCurrency(FINANCIAL_SUMMARY.directDamages)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Consequential Damages</span>
                      <span className="font-mono">{formatCurrency(FINANCIAL_SUMMARY.consequentialDamages)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Punitive Damages (3x)</span>
                      <span className="font-mono">{formatCurrency(FINANCIAL_SUMMARY.punitiveDamages)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">IP Damages</span>
                      <span className="font-mono">{formatCurrency(FINANCIAL_SUMMARY.ipDamages)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Lost Profits</span>
                      <span className="font-mono">{formatCurrency(FINANCIAL_SUMMARY.lostProfits)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Emotional Distress</span>
                      <span className="font-mono">{formatCurrency(FINANCIAL_SUMMARY.emotionalDistress)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Attorney Fees</span>
                      <span className="font-mono">{formatCurrency(FINANCIAL_SUMMARY.attorneyFees)}</span>
                    </div>
                  </div>
                  <div className="flex justify-between mt-3 pt-3 border-t border-zinc-800 font-semibold">
                    <span>TOTAL CIVIL EXPOSURE</span>
                    <span className="font-mono text-cyan-400">{formatCurrency(FINANCIAL_SUMMARY.totalCivilExposure)}</span>
                  </div>
                </div>

                {/* Criminal Exposure */}
                <div className="p-4 bg-black/40 rounded">
                  <h3 className="font-semibold mb-3 text-red-400">CRIMINAL EXPOSURE</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Criminal Fines</span>
                      <span className="font-mono">{formatCurrency(FINANCIAL_SUMMARY.criminalFines)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Criminal Restitution</span>
                      <span className="font-mono">{formatCurrency(FINANCIAL_SUMMARY.criminalRestitution)}</span>
                    </div>
                  </div>
                  <div className="flex justify-between mt-3 pt-3 border-t border-zinc-800 font-semibold">
                    <span>TOTAL CRIMINAL EXPOSURE</span>
                    <span className="font-mono text-red-400">{formatCurrency(FINANCIAL_SUMMARY.totalCriminalExposure)}</span>
                  </div>
                </div>

                {/* Grand Total */}
                <div className="p-6 bg-emerald-950/30 border-2 border-emerald-500/50 rounded-lg">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xl font-bold">GRAND TOTAL ADVERSARY EXPOSURE</span>
                    <span className="text-3xl font-mono font-bold text-emerald-400">{formatCurrency(FINANCIAL_SUMMARY.grandTotalExposure)}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-mono font-bold text-amber-400">{FINANCIAL_SUMMARY.coverageMultiplier}</p>
                      <p className="text-xs text-muted-foreground">COVERAGE MULTIPLIER</p>
                    </div>
                    <div>
                      <p className="text-2xl font-mono font-bold text-cyan-400">{DEPT12_DATA.totalCounts.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">CRIMINAL COUNTS</p>
                    </div>
                    <div>
                      <p className="text-2xl font-mono font-bold text-red-400">{DEPT12_DATA.maxPenalty}</p>
                      <p className="text-xs text-muted-foreground">MAX INCARCERATION</p>
                    </div>
                  </div>
                </div>

                {/* Sovereign Protection */}
                <div className="p-4 bg-amber-950/30 border border-amber-500/30 rounded">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Shield className="w-8 h-8 text-amber-400" />
                      <div>
                        <p className="font-semibold">SOVEREIGN PROTECTION STATUS</p>
                        <p className="text-sm text-muted-foreground">$JAXX and $POPPA are PROTECTED</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-emerald-500/20 text-emerald-400 text-lg px-4 py-1">
                        {FINANCIAL_SUMMARY.sovereignProtection}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">SGAU 7226.3461 STANDS</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* PRIMARY CONNECTED BROKERAGE ACCOUNT */}
          <Card className="bg-zinc-900 border-emerald-500/30">
            <CardHeader className="border-b border-zinc-800">
              <CardTitle className="text-sm flex items-center gap-2">
                <Landmark className="w-4 h-4 text-emerald-400" />
                PRIMARY TRANSFER DESTINATION
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ConnectedBrokerageAccount showHoldings={false} />
            </CardContent>
          </Card>

          {/* Report Footer */}
          <div className="text-center text-xs text-muted-foreground p-4 border border-zinc-800 rounded">
            <p>VALORAIPLUS COMPREHENSIVE INTELLIGENCE REPORT | Report ID: {REPORT_METADATA.reportId}</p>
            <p>Classification: {REPORT_METADATA.classification} | Validator Consensus: {REPORT_METADATA.validatorConsensus.toLocaleString()} | Signature: {REPORT_METADATA.signatureCode}</p>
            <p className="mt-2 font-mono text-emerald-400">SIGNAL: 100% | DRIFT: 0.0000 | LEDGER == 0</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
