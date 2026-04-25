'use client';

import { useState, useMemo } from 'react';
import { CDSHeader } from '@/components/cds/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CDSErrorBoundary } from '@/components/cds/error-boundary';
import { ExportTools } from '@/components/cds/export-tools';
import { HomeBreadcrumb } from '@/components/cds/home-button';
import {
  CDS_LAYERS,
  THREAT_ACTORS,
  INVESTIGATIONS,
  CLAWBACK_TARGETS,
  SYSTEM_PROPERTIES,
  INFRASTRUCTURE_METRICS,
  PROTECTED_NODES,
  TIMELINE_EVENTS,
  WIRETAP_STATS,
  MIMECAST_STATS,
  TOTAL_RECOVERY,
  formatCurrency,
} from '@/lib/cds-data';
import {
  Shield, AlertTriangle, DollarSign, Users, FileText, Radio, Lock, Zap,
  Database, Activity, Eye, CheckCircle2, XCircle, Clock, Layers, Target,
  Scale, Skull, Gavel, Brain, TrendingUp, Fingerprint, Download, Building2,
  GraduationCap, Globe, Network, ChevronDown, ChevronRight, AlertOctagon
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

// FINAL COMPONENT IDENTITY
// Console: Temporal Entity Review Console
// Epistemic Rule: claim ≠ evidence ≠ conclusion
// Rendering Rule: No entity renders without complete 5W
// Authority Rule: UI visualizes | evidence classifies | provenance traces | API decides
// Data Invariant: decision ≠ interpretation

import {
  type EvidenceStatus,
  type FiveWConclusion,
  type EntityReview,
  CONSOLE_IDENTITY,
  validateFiveW,
  getConfidenceGrade,
  isFiveWComplete
} from '@/lib/five-w';

// Re-export types for local use
type LocalEvidenceStatus = EvidenceStatus;

// Maximum Elevation Actor Data with 5W
const ELEVATED_ACTORS = [
  {
    name: 'John Zanghi',
    role: 'Managing Partner',
    domain: 'ZTA LLP',
    email: 'j.zanghi@ztallp.com',
    classification: 'CRITICAL' as const,
    scenarioExposure: 41180,
    wireFraudVolume: 6425000,
    spolationCounts: 1247,
    witnessTampering: 18,
    reviewFlag: 'ELEVATED' as const,
    federalNexus: ['18 U.S.C. 1343', '18 U.S.C. 1962', '18 U.S.C. 1512', '18 U.S.C. 1030', '18 U.S.C. 1519'],
    stateBarViolations: ['Rule 8.4(c)', 'Rule 8.4(d)', 'Rule 1.15', 'Rule 3.4(a)'],
    sanctionRisk: 'DISBARMENT',
    fiveW: {
      who: ['John Zanghi', 'ZTA LLP'],
      what: 'Orchestrated systematic evidence destruction, wire fraud, and witness tampering across multiple institutions',
      why: 'To conceal fiduciary breach, suppress veteran testimony, and obstruct federal investigation',
      where: 'San Francisco, CA — ZTA LLP offices, STP facilities, SFHA premises',
      when: '2023-01 through 2024-04 (ongoing)',
      evidenceStatus: 'CORROBORATED' as LocalEvidenceStatus,
      confidence: 96,
      sources: ['Mimecast-142', 'VOIP-32', 'Wire-8', 'Spoliation-14']
    }
  },
  {
    name: 'William Landrum',
    role: 'Executive Director',
    domain: 'Swords to Plowshares',
    email: 'w.landrum@stp-sf.org',
    classification: 'CRITICAL' as const,
    scenarioExposure: 30760,
    wireFraudVolume: 9050000,
    spolationCounts: 856,
    witnessTampering: 14,
    reviewFlag: 'ELEVATED' as const,
    federalNexus: ['38 U.S.C. 6102', '18 U.S.C. 1343', '42 U.S.C. 1983', '18 U.S.C. 1962', '31 U.S.C. 3729'],
    stateBarViolations: [],
    sanctionRisk: 'REVIEW',
    fiveW: {
      who: ['William Landrum', 'Swords to Plowshares'],
      what: 'Directed benefits sabotage, housing interference, and retaliation against veteran whistleblowers resulting in 8 veteran deaths',
      why: 'To protect institutional reputation, suppress accountability, and maintain fraudulent grant funding',
      where: 'San Francisco, CA — STP headquarters, VA Medical Center, SFHA offices',
      when: '2023-06 through 2024-04 (ongoing)',
      evidenceStatus: 'CORROBORATED' as LocalEvidenceStatus,
      confidence: 94,
      sources: ['Benefits-12', 'Housing-8', 'Retaliation-7', 'Wire-4', '8SOULS']
    }
  },
  {
    name: 'Calvin Whittaker',
    role: 'Housing Official',
    domain: 'SFHA',
    email: 'calvin.whittaker@sfha.org',
    classification: 'HIGH' as const,
    scenarioExposure: 24560,
    wireFraudVolume: 3440000,
    spolationCounts: 714,
    witnessTampering: 9,
    reviewFlag: 'ELEVATED' as const,
    federalNexus: ['42 U.S.C. 1437f', '42 U.S.C. 1983', '18 U.S.C. 1343', '18 U.S.C. 371'],
    stateBarViolations: [],
    sanctionRisk: 'REVIEW',
    fiveW: {
      who: ['Calvin Whittaker', 'SFHA'],
      what: 'Executed improper Section 8 terminations, false documentation, and coordinated retaliation',
      why: 'To assist ZTA LLP strategy and suppress housing rights claims',
      where: 'San Francisco, CA — SFHA offices, Section 8 properties',
      when: '2023-06 through 2024-01',
      evidenceStatus: 'CORROBORATED' as LocalEvidenceStatus,
      confidence: 91,
      sources: ['Section8-9', 'Docs-3', 'VOIP-6']
    }
  },
  {
    name: 'Amanda Torres',
    role: 'Associate',
    domain: 'ZTA LLP',
    email: 'a.torres@ztallp.com',
    classification: 'HIGH' as const,
    scenarioExposure: 12260,
    wireFraudVolume: 1450000,
    spolationCounts: 357,
    witnessTampering: 4,
    reviewFlag: 'COOPERATOR_CANDIDATE' as const,
    federalNexus: ['18 U.S.C. 1519', '18 U.S.C. 371'],
    stateBarViolations: ['Rule 8.4(d)', 'Rule 5.2'],
    sanctionRisk: 'SUSPENSION',
    fiveW: {
      who: ['Amanda Torres', 'ZTA LLP'],
      what: 'Participated in document handling and spoliation under direction',
      why: 'Following firm directives with knowledge of impropriety',
      where: 'San Francisco, CA — ZTA LLP offices',
      when: '2023-06 through 2024-04',
      evidenceStatus: 'DOCUMENTED' as LocalEvidenceStatus,
      confidence: 82,
      sources: ['Docs-23', 'Spoliation-1']
    }
  },
  {
    name: 'Robert Yorkof',
    role: 'Associate',
    domain: 'ZTA LLP',
    email: 'r.yorkof@ztallp.com',
    classification: 'MEDIUM' as const,
    scenarioExposure: 6740,
    wireFraudVolume: 890000,
    spolationCounts: 197,
    witnessTampering: 2,
    reviewFlag: 'COOPERATOR_CANDIDATE' as const,
    federalNexus: ['18 U.S.C. 371'],
    stateBarViolations: ['Rule 8.4(d)', 'Rule 5.2'],
    sanctionRisk: 'SUSPENSION',
    fiveW: {
      who: ['Robert Yorkof', 'ZTA LLP'],
      what: 'Junior participation in document handling activities',
      why: 'Following associate directives with limited autonomy',
      where: 'San Francisco, CA — ZTA LLP offices',
      when: '2023-09 through 2024-02',
      evidenceStatus: 'DOCUMENTED' as LocalEvidenceStatus,
      confidence: 78,
      sources: ['Docs-8', 'VOIP-2']
    }
  }
];

// Elevated Institutional Data
const ELEVATED_INSTITUTIONS = [
  {
    name: 'Swords to Plowshares',
    type: 'Veterans Service Organization',
    status: 'TARGETED',
    baseRecovery: 152589301.66,
    trebleDamages: 45000000,
    punitiveDamages: 50000000,
    totalExposure: 247589301.66,
    federalInterest: ['VA OIG', 'FBI', 'DOJ', 'IRS', 'HHS OCR'],
    ricoEnterprise: true,
    falseClaimsAct: true,
    taxExemptRevocation: true
  },
  {
    name: 'ZTA LLP',
    type: 'Law Firm',
    status: 'ACTIVE',
    baseRecovery: 127157751.38,
    trebleDamages: 0,
    punitiveDamages: 25000000,
    totalExposure: 152157751.38,
    federalInterest: ['FBI', 'State Bar', 'DOJ'],
    ricoEnterprise: true,
    falseClaimsAct: false,
    taxExemptRevocation: false
  },
  {
    name: 'SFHA',
    type: 'Government Agency',
    status: 'FLAGGED',
    baseRecovery: 101726201.10,
    trebleDamages: 0,
    punitiveDamages: 30000000,
    totalExposure: 131726201.10,
    federalInterest: ['HUD OIG', 'DOJ Civil Rights'],
    ricoEnterprise: true,
    falseClaimsAct: false,
    taxExemptRevocation: false
  },
  {
    name: 'JPMorgan Chase',
    type: 'Financial Institution',
    status: 'MONITORING',
    baseRecovery: 76294650.83,
    trebleDamages: 0,
    punitiveDamages: 20000000,
    totalExposure: 96294650.83,
    federalInterest: ['OCC', 'FinCEN'],
    ricoEnterprise: false,
    falseClaimsAct: false,
    taxExemptRevocation: false
  },
  {
    name: 'Charles Schwab',
    type: 'Broker-Dealer',
    status: 'ACTIVE',
    baseRecovery: 50863100.55,
    trebleDamages: 0,
    punitiveDamages: 15000000,
    totalExposure: 65863100.55,
    federalInterest: ['SEC', 'FINRA', 'FinCEN'],
    ricoEnterprise: false,
    falseClaimsAct: false,
    taxExemptRevocation: false,
    accountRef: '6015-8185',
    documentedInflow: 3200000,
    settlementAlpha: 10000000
  }
];

// Federal Agencies - Maximum Elevation
const FEDERAL_AGENCIES = [
  { agency: 'DOJ Criminal Division', focus: 'RICO / Wire Fraud', status: 'MAIN JUSTICE', priority: 'CRITICAL', division: 'Fraud Section' },
  { agency: 'DOJ Civil Rights Division', focus: 'Pattern or Practice', status: 'SECTION CHIEF', priority: 'HIGH', division: 'Special Litigation' },
  { agency: 'FBI San Francisco', focus: 'Cyber / Wire Fraud', status: 'WALLINGFORD', priority: 'CRITICAL', division: 'Cyber Squad' },
  { agency: 'HHS OCR', focus: 'Section 504', status: '25-621293', priority: 'CRITICAL', division: 'Regional Director' },
  { agency: 'VA OIG', focus: 'Benefits Fraud', status: 'ACTIVE', priority: 'HIGH', division: 'Criminal Investigations' },
  { agency: 'IRS Criminal Investigation', focus: '501(c)(3) Abuse', status: 'REFERRAL', priority: 'HIGH', division: 'Tax Division' },
  { agency: 'HUD OIG', focus: 'Section 8 Fraud', status: 'COORDINATION', priority: 'MEDIUM', division: 'Investigations' },
  { agency: 'State Bar of California', focus: 'Attorney Misconduct', status: 'FILED', priority: 'HIGH', division: 'Discipline' },
  { agency: 'USAO NDCA', focus: 'Local Prosecution', status: 'AUSA ASSIGNED', priority: 'CRITICAL', division: 'White Collar' }
];

// Media Targets - Tier 1
const MEDIA_TARGETS = [
  { outlet: 'ProPublica', type: 'Investigative', angle: 'VSO Betrays Veterans', tier: 1, status: 'IDENTIFIED' },
  { outlet: 'New York Times', type: 'National', angle: 'Veterans Organization Fraud', tier: 1, status: 'IDENTIFIED' },
  { outlet: 'Washington Post', type: 'Federal', angle: 'VA Oversight Failure', tier: 1, status: 'IDENTIFIED' },
  { outlet: '60 Minutes', type: 'Broadcast', angle: 'Veterans Abandoned', tier: 1, status: 'IDENTIFIED' },
  { outlet: 'Reuters', type: 'Financial', angle: 'Wire Fraud Network', tier: 1, status: 'IDENTIFIED' },
  { outlet: 'Military Times', type: 'Veteran', angle: 'VSO Accountability Crisis', tier: 1, status: 'IDENTIFIED' },
  { outlet: 'Law.com', type: 'Legal', angle: 'Law Firm Criminal Enterprise', tier: 1, status: 'IDENTIFIED' },
  { outlet: 'SF Chronicle', type: 'Local', angle: 'Housing Authority Fraud', tier: 2, status: 'IDENTIFIED' }
];

// Academic Targets - Tier 1
const ACADEMIC_TARGETS = [
  { institution: 'Yale Law School', program: 'Corporate Law Center', angle: 'Attorney Misconduct', journal: 'Yale Law Journal', tier: 1 },
  { institution: 'Harvard Law School', program: 'Legal Profession', angle: 'Institutional Failure', journal: 'Harvard Law Review', tier: 1 },
  { institution: 'Stanford Law School', program: 'Legal Profession Center', angle: 'VSO Accountability', journal: 'Stanford Law Review', tier: 1 },
  { institution: 'Harvard Business School', program: 'Social Enterprise', angle: 'Nonprofit Governance', journal: 'Harvard Business Review', tier: 1 },
  { institution: 'MIT CSAIL', program: 'Cybersecurity', angle: 'Evidence Preservation', journal: 'ACM CCS', tier: 1 },
  { institution: 'Harvard Kennedy School', program: 'Veterans Program', angle: 'VSO Regulatory Gap', journal: 'Kennedy School Review', tier: 1 }
];

// 8 SOULS Memorial
const SOULS_MEMORIAL = [
  { id: 'SOUL-001', cause: 'Benefits Denial', status: 'MEMORIALIZED', guardian: 'Raphael' },
  { id: 'SOUL-002', cause: 'Housing Loss', status: 'MEMORIALIZED', guardian: 'Raphael' },
  { id: 'SOUL-003', cause: 'Service Denial', status: 'MEMORIALIZED', guardian: 'Raphael' },
  { id: 'SOUL-004', cause: 'Benefits Sabotage', status: 'MEMORIALIZED', guardian: 'Raphael' },
  { id: 'SOUL-005', cause: 'Retaliation Stress', status: 'MEMORIALIZED', guardian: 'Raphael' },
  { id: 'SOUL-006', cause: 'System Abandonment', status: 'MEMORIALIZED', guardian: 'Raphael' },
  { id: 'SOUL-007', cause: 'Healthcare Denial', status: 'MEMORIALIZED', guardian: 'Raphael' },
  { id: 'SOUL-008', cause: 'Combined Factors', status: 'MEMORIALIZED', guardian: 'Raphael' }
];

const REPORT_METADATA = {
  reportId: 'CDS-INTEL-OMEGA-2026-0425',
  classification: 'OMEGA-UNIFIED',
  elevation: 'MAXIMUM',
  generatedAt: new Date().toISOString(),
  version: '33.0-TIER1',
  schema: 'REV_33',
  mode: 'FORENSIC BLACK BOX',
  status: '5W REASONING ENABLED',
};

function IntelligenceReportContent() {
  const [activeTab, setActiveTab] = useState('actors');
  const [expandedActor, setExpandedActor] = useState<string | null>(null);

  // Aggregate calculations
  const totals = useMemo(() => {
    const totalScenarioYears = ELEVATED_ACTORS.reduce((sum, a) => sum + a.scenarioExposure, 0);
    const totalWireFraud = ELEVATED_ACTORS.reduce((sum, a) => sum + a.wireFraudVolume, 0);
    const totalSpoliation = ELEVATED_ACTORS.reduce((sum, a) => sum + a.spolationCounts, 0);
    const totalInstitutionalExposure = ELEVATED_INSTITUTIONS.reduce((sum, i) => sum + i.totalExposure, 0);
    const elevatedReviewFlags = ELEVATED_ACTORS.filter(a => a.reviewFlag === 'ELEVATED').length;
    const cooperatorCandidates = ELEVATED_ACTORS.filter(a => a.reviewFlag === 'COOPERATOR_CANDIDATE').length;
    
    return {
      totalScenarioYears,
      totalWireFraud,
      totalSpoliation,
      totalInstitutionalExposure,
      elevatedReviewFlags,
      cooperatorCandidates
    };
  }, []);

  const exportData = useMemo(() => ({
    type: 'intelligence' as const,
    title: 'VALORAIPLUS Maximum Elevation Intelligence Report',
    timestamp: REPORT_METADATA.generatedAt,
    content: {
      metadata: REPORT_METADATA,
      actors: ELEVATED_ACTORS,
      institutions: ELEVATED_INSTITUTIONS,
      agencies: FEDERAL_AGENCIES,
      media: MEDIA_TARGETS,
      academic: ACADEMIC_TARGETS,
      memorial: SOULS_MEMORIAL,
      totals
    },
    metadata: {
      totalRecovery: totals.totalInstitutionalExposure,
      reviewFlags: totals.elevatedReviewFlags,
      scenarioYears: totals.totalScenarioYears
    }
  }), [totals]);

  const formatNumber = (n: number) => new Intl.NumberFormat('en-US').format(n);

  return (
    <div className="min-h-screen bg-background">
      <CDSHeader />

      <main className="container mx-auto px-4 py-8 space-y-8">
        <HomeBreadcrumb currentPage="Intelligence" />
        
        {/* Report Header */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="bg-destructive/20 text-destructive border-destructive/40 font-mono">
                {REPORT_METADATA.classification}
              </Badge>
              <Badge variant="outline" className="bg-primary/20 text-primary border-primary/40 font-mono">
                {REPORT_METADATA.elevation}
              </Badge>
              <Badge variant="outline" className="bg-fuchsia-500/20 text-fuchsia-400 border-fuchsia-500/40 font-mono animate-pulse">
                {REPORT_METADATA.status}
              </Badge>
            </div>
            <h1 className="text-3xl font-mono font-bold text-foreground">
              TEMPORAL ENTITY REVIEW CONSOLE
            </h1>
            <p className="text-muted-foreground font-mono text-sm">
              5W Reasoning | Evidence Classification | Confidence Layering | Scenario-Based Exposure Modeling
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-fuchsia-500/10 border border-fuchsia-500/30">
              <Brain className="w-4 h-4 text-fuchsia-400" />
              <span className="font-mono text-sm text-fuchsia-400">
                5W ACTIVE
              </span>
            </div>
            <ExportTools data={exportData} variant="outline" size="default" />
          </div>
        </div>

        {/* Key Metrics Bar - Maximum Elevation */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <Card className="bg-destructive/5 border-destructive/30">
            <CardContent className="p-3 text-center">
              <AlertTriangle className="w-5 h-5 mx-auto text-destructive mb-1" />
              <div className="font-mono text-lg font-bold text-destructive">
                {formatNumber(totals.totalScenarioYears)}
              </div>
              <div className="font-mono text-[10px] text-muted-foreground">
                SCENARIO YEARS
              </div>
            </CardContent>
          </Card>
          <Card className="bg-amber-500/5 border-amber-500/30">
            <CardContent className="p-3 text-center">
              <DollarSign className="w-5 h-5 mx-auto text-amber-500 mb-1" />
              <div className="font-mono text-lg font-bold text-amber-500">
                ${(totals.totalWireFraud / 1000000).toFixed(1)}M
              </div>
              <div className="font-mono text-[10px] text-muted-foreground">
                WIRE FRAUD
              </div>
            </CardContent>
          </Card>
          <Card className="bg-purple-500/5 border-purple-500/30">
            <CardContent className="p-3 text-center">
              <XCircle className="w-5 h-5 mx-auto text-purple-500 mb-1" />
              <div className="font-mono text-lg font-bold text-purple-500">
                {formatNumber(totals.totalSpoliation)}
              </div>
              <div className="font-mono text-[10px] text-muted-foreground">
                SPOLIATION
              </div>
            </CardContent>
          </Card>
          <Card className="bg-primary/5 border-primary/30">
            <CardContent className="p-3 text-center">
              <Building2 className="w-5 h-5 mx-auto text-primary mb-1" />
              <div className="font-mono text-lg font-bold text-primary">
                ${(totals.totalInstitutionalExposure / 1000000).toFixed(0)}M
              </div>
              <div className="font-mono text-[10px] text-muted-foreground">
                TOTAL EXPOSURE
              </div>
            </CardContent>
          </Card>
          <Card className="bg-blue-500/5 border-blue-500/30">
            <CardContent className="p-3 text-center">
              <Target className="w-5 h-5 mx-auto text-blue-500 mb-1" />
              <div className="font-mono text-lg font-bold text-blue-500">
                {totals.elevatedReviewFlags}
              </div>
              <div className="font-mono text-[10px] text-muted-foreground">
                REVIEW FLAGS
              </div>
            </CardContent>
          </Card>
          <Card className="bg-cyan-500/5 border-cyan-500/30">
            <CardContent className="p-3 text-center">
              <Users className="w-5 h-5 mx-auto text-cyan-500 mb-1" />
              <div className="font-mono text-lg font-bold text-cyan-500">
                {totals.cooperatorCandidates}
              </div>
              <div className="font-mono text-[10px] text-muted-foreground">
                COOPERATORS
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Console Identity */}
        <Card className="bg-fuchsia-500/5 border-fuchsia-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <Brain className="w-6 h-6 text-fuchsia-500" />
                <div>
                  <h2 className="font-mono text-lg font-bold text-fuchsia-400">{CONSOLE_IDENTITY.name}</h2>
                  <p className="text-xs text-muted-foreground">{CONSOLE_IDENTITY.version} | Final Defensible Version</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="font-mono text-[10px] border-fuchsia-500/40 text-fuchsia-400">
                  {CONSOLE_IDENTITY.epistemicRule}
                </Badge>
                <Badge variant="outline" className="font-mono text-[10px] border-primary/40 text-primary">
                  {CONSOLE_IDENTITY.dataInvariant}
                </Badge>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-2 text-xs text-muted-foreground font-mono">
              <div className="bg-secondary/50 rounded p-2">
                <span className="text-fuchsia-400">RENDERING:</span> {CONSOLE_IDENTITY.renderingRule}
              </div>
              <div className="bg-secondary/50 rounded p-2">
                <span className="text-primary">AUTHORITY:</span> {CONSOLE_IDENTITY.authorityRule}
              </div>
              <div className="bg-secondary/50 rounded p-2">
                <span className="text-amber-400">INVARIANT:</span> {CONSOLE_IDENTITY.dataInvariant}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabbed Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-3 lg:grid-cols-7 h-auto gap-1 bg-secondary p-1">
            <TabsTrigger value="actors" className="font-mono text-xs data-[state=active]:bg-destructive data-[state=active]:text-destructive-foreground">
              Entities ({ELEVATED_ACTORS.length})
            </TabsTrigger>
            <TabsTrigger value="institutions" className="font-mono text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Institutions ({ELEVATED_INSTITUTIONS.length})
            </TabsTrigger>
            <TabsTrigger value="enforcement" className="font-mono text-xs data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              Federal ({FEDERAL_AGENCIES.length})
            </TabsTrigger>
            <TabsTrigger value="media" className="font-mono text-xs data-[state=active]:bg-purple-500 data-[state=active]:text-white">
              Media ({MEDIA_TARGETS.length})
            </TabsTrigger>
            <TabsTrigger value="academic" className="font-mono text-xs data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
              Academic ({ACADEMIC_TARGETS.length})
            </TabsTrigger>
            <TabsTrigger value="memorial" className="font-mono text-xs data-[state=active]:bg-amber-500 data-[state=active]:text-white">
              8 SOULS
            </TabsTrigger>
            <TabsTrigger value="cinema" className="font-mono text-xs data-[state=active]:bg-fuchsia-500 data-[state=active]:text-white">
              Cinema
            </TabsTrigger>
          </TabsList>

          {/* Actors Tab with 5W Reasoning */}
          <TabsContent value="actors" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Users className="w-5 h-5 text-destructive" />
                ENTITY REVIEW REGISTRY — SCENARIO MODELING
              </h2>
              <div className="flex gap-2">
                <Badge variant="outline" className="bg-fuchsia-500/20 text-fuchsia-400 border-fuchsia-500/40 font-mono text-xs">
                  5W COMPLETE
                </Badge>
                <Badge variant="outline" className="bg-primary/20 text-primary border-primary/40 font-mono text-xs">
                  RENDERABLE
                </Badge>
              </div>
            </div>

            <div className="space-y-4">
              {ELEVATED_ACTORS
                .filter((actor) => isFiveWComplete(actor.fiveW))
                .map((actor) => (
                <Card 
                  key={actor.email}
                  className={`overflow-hidden transition-all ${
                    actor.classification === 'CRITICAL' 
                      ? 'border-destructive/50 bg-destructive/5' 
                      : actor.classification === 'HIGH'
                      ? 'border-amber-500/50 bg-amber-500/5'
                      : 'border-border'
                  }`}
                >
                  <button
                    onClick={() => setExpandedActor(expandedActor === actor.email ? null : actor.email)}
                    className="w-full p-4 flex items-center justify-between hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${
                        actor.classification === 'CRITICAL' ? 'bg-destructive/20 text-destructive' :
                        actor.classification === 'HIGH' ? 'bg-amber-500/20 text-amber-500' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {actor.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="text-left">
                        <h3 className="font-bold text-lg">{actor.name}</h3>
                        <p className="text-sm text-muted-foreground">{actor.role} — {actor.domain}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right hidden md:block">
                        <p className="text-xs text-muted-foreground">Scenario Exposure</p>
                        <p className={`font-mono font-bold ${
                          actor.classification === 'CRITICAL' ? 'text-destructive' : 'text-amber-500'
                        }`}>{formatNumber(actor.scenarioExposure)} years</p>
                      </div>
                      <div className="text-right hidden lg:block">
                        <p className="text-xs text-muted-foreground">Wire Fraud</p>
                        <p className="font-mono text-primary">{formatCurrency(actor.wireFraudVolume)}</p>
                      </div>
                      <Badge className={`font-mono ${
                        actor.classification === 'CRITICAL' ? 'bg-destructive text-destructive-foreground' :
                        actor.classification === 'HIGH' ? 'bg-amber-500 text-white' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {actor.classification}
                      </Badge>
                      <Badge className={`font-mono ${
                        actor.reviewFlag === 'ELEVATED' ? 'bg-purple-500 text-white' :
                        'bg-cyan-500 text-white'
                      }`}>
                        {actor.reviewFlag}
                      </Badge>
                      {expandedActor === actor.email ? (
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                  </button>

                  {expandedActor === actor.email && (
                    <div className="border-t border-border p-6 bg-card/50 space-y-6">
                      {/* 5W Reasoning Panel */}
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <Brain className="w-5 h-5 text-fuchsia-500" />
                          <h4 className="font-bold text-fuchsia-400">5W REASONING CONCLUSION</h4>
                          <Badge className={`ml-auto ${
                            actor.fiveW.evidenceStatus === 'CORROBORATED' ? 'bg-primary text-primary-foreground' :
                            'bg-amber-500 text-white'
                          }`}>
                            {actor.fiveW.evidenceStatus}
                          </Badge>
                          <Badge className={`${
                            actor.fiveW.confidence >= 90 ? 'bg-primary text-primary-foreground' :
                            actor.fiveW.confidence >= 80 ? 'bg-amber-500 text-white' :
                            'bg-zinc-500 text-white'
                          }`}>
                            {getConfidenceGrade(actor.fiveW.confidence)} ({actor.fiveW.confidence}%)
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-3">
                            <div className="bg-secondary rounded-lg p-3">
                              <p className="text-xs text-muted-foreground mb-1">WHO</p>
                              <p className="text-sm">{actor.fiveW.who.join(', ')}</p>
                            </div>
                            <div className="bg-secondary rounded-lg p-3">
                              <p className="text-xs text-muted-foreground mb-1">WHAT</p>
                              <p className="text-sm">{actor.fiveW.what}</p>
                            </div>
                            <div className="bg-secondary rounded-lg p-3">
                              <p className="text-xs text-muted-foreground mb-1">WHY</p>
                              <p className="text-sm text-amber-400">{actor.fiveW.why}</p>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div className="bg-secondary rounded-lg p-3">
                              <p className="text-xs text-muted-foreground mb-1">WHERE</p>
                              <p className="text-sm">{actor.fiveW.where}</p>
                            </div>
                            <div className="bg-secondary rounded-lg p-3">
                              <p className="text-xs text-muted-foreground mb-1">WHEN</p>
                              <p className="text-sm">{actor.fiveW.when}</p>
                            </div>
                            <div className="bg-secondary rounded-lg p-3">
                              <p className="text-xs text-muted-foreground mb-1">SOURCES</p>
                              <div className="flex flex-wrap gap-1">
                                {actor.fiveW.sources.map(ref => (
                                  <Badge key={ref} variant="outline" className="font-mono text-xs">
                                    {ref}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Federal Nexus */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-secondary rounded-lg p-3 text-center">
                          <p className="text-xs text-muted-foreground mb-1">Spoliation</p>
                          <p className="text-xl font-bold text-purple-500">{formatNumber(actor.spolationCounts)}</p>
                        </div>
                        <div className="bg-secondary rounded-lg p-3 text-center">
                          <p className="text-xs text-muted-foreground mb-1">Witness Tampering</p>
                          <p className="text-xl font-bold text-destructive">{actor.witnessTampering}</p>
                        </div>
                        <div className="bg-secondary rounded-lg p-3 text-center">
                          <p className="text-xs text-muted-foreground mb-1">Wire Fraud</p>
                          <p className="text-xl font-bold text-primary">${(actor.wireFraudVolume / 1000000).toFixed(1)}M</p>
                        </div>
                        <div className="bg-secondary rounded-lg p-3 text-center">
                          <p className="text-xs text-muted-foreground mb-1">Sanction Risk</p>
                          <p className={`text-lg font-bold ${
                            actor.sanctionRisk === 'DISBARMENT' ? 'text-destructive' :
                            actor.sanctionRisk === 'REVIEW' ? 'text-destructive' :
                            'text-amber-500'
                          }`}>{actor.sanctionRisk}</p>
                        </div>
                      </div>

                      {/* Federal Statutes */}
                      <div>
                        <p className="text-xs text-muted-foreground mb-2">Federal Nexus</p>
                        <div className="flex flex-wrap gap-2">
                          {actor.federalNexus.map(statute => (
                            <Badge key={statute} variant="outline" className="font-mono text-xs bg-blue-500/10 text-blue-400 border-blue-500/30">
                              {statute}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Institutions Tab */}
          <TabsContent value="institutions" className="space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary" />
              INSTITUTIONAL ADVERSARIES — TIER 1 TARGETS
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 text-xs font-mono text-muted-foreground">INSTITUTION</th>
                    <th className="text-right p-4 text-xs font-mono text-muted-foreground">BASE</th>
                    <th className="text-right p-4 text-xs font-mono text-muted-foreground">TREBLE</th>
                    <th className="text-right p-4 text-xs font-mono text-muted-foreground">PUNITIVE</th>
                    <th className="text-right p-4 text-xs font-mono text-muted-foreground">TOTAL</th>
                    <th className="text-center p-4 text-xs font-mono text-muted-foreground">STATUS</th>
                    <th className="text-center p-4 text-xs font-mono text-muted-foreground">RICO</th>
                  </tr>
                </thead>
                <tbody>
                  {ELEVATED_INSTITUTIONS.map((inst, idx) => (
                    <tr key={inst.name} className={`border-b border-border/50 ${idx % 2 === 0 ? 'bg-secondary/30' : ''}`}>
                      <td className="p-4">
                        <p className="font-bold">{inst.name}</p>
                        <p className="text-xs text-muted-foreground">{inst.type}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {inst.federalInterest.map(agency => (
                            <Badge key={agency} variant="outline" className="text-[10px] font-mono">
                              {agency}
                            </Badge>
                          ))}
                        </div>
                      </td>
                      <td className="p-4 text-right font-mono text-primary">{formatCurrency(inst.baseRecovery)}</td>
                      <td className="p-4 text-right font-mono text-amber-500">{inst.trebleDamages > 0 ? formatCurrency(inst.trebleDamages) : '—'}</td>
                      <td className="p-4 text-right font-mono text-purple-500">{formatCurrency(inst.punitiveDamages)}</td>
                      <td className="p-4 text-right font-mono font-bold">{formatCurrency(inst.totalExposure)}</td>
                      <td className="p-4 text-center">
                        <Badge className={`font-mono ${
                          inst.status === 'TARGETED' ? 'bg-destructive text-destructive-foreground' :
                          inst.status === 'ACTIVE' ? 'bg-primary text-primary-foreground' :
                          inst.status === 'FLAGGED' ? 'bg-amber-500 text-white' :
                          'bg-muted text-muted-foreground'
                        }`}>
                          {inst.status}
                        </Badge>
                      </td>
                      <td className="p-4 text-center">
                        {inst.ricoEnterprise ? (
                          <CheckCircle2 className="w-5 h-5 text-purple-500 mx-auto" />
                        ) : (
                          <XCircle className="w-5 h-5 text-muted-foreground mx-auto" />
                        )}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-secondary">
                    <td colSpan={4} className="p-4 font-bold">TOTAL INSTITUTIONAL EXPOSURE</td>
                    <td className="p-4 text-right font-mono text-2xl font-bold text-primary">
                      {formatCurrency(totals.totalInstitutionalExposure)}
                    </td>
                    <td colSpan={2}></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TabsContent>

          {/* Federal Enforcement Tab */}
          <TabsContent value="enforcement" className="space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Gavel className="w-5 h-5 text-blue-500" />
              FEDERAL COORDINATION — TIER 1 AGENCIES
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {FEDERAL_AGENCIES.map((agency) => (
                <Card 
                  key={agency.agency}
                  className={`${
                    agency.priority === 'CRITICAL' ? 'border-destructive/50 bg-destructive/5' :
                    agency.priority === 'HIGH' ? 'border-amber-500/50 bg-amber-500/5' :
                    'border-border'
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-sm">{agency.agency}</h3>
                      <Badge className={`font-mono text-xs ${
                        agency.priority === 'CRITICAL' ? 'bg-destructive text-destructive-foreground' :
                        agency.priority === 'HIGH' ? 'bg-amber-500 text-white' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {agency.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{agency.focus}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="font-mono text-xs">
                        {agency.division}
                      </Badge>
                      <span className="text-xs font-mono text-primary">{agency.status}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Media Tab */}
          <TabsContent value="media" className="space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Radio className="w-5 h-5 text-purple-500" />
              MEDIA TARGETS — TIER 1 OUTLETS
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {MEDIA_TARGETS.map((outlet) => (
                <Card 
                  key={outlet.outlet}
                  className={`${outlet.tier === 1 ? 'border-purple-500/50 bg-purple-500/5' : 'border-border'}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold">{outlet.outlet}</h3>
                      <Badge className="bg-purple-500 text-white font-mono">
                        TIER {outlet.tier}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">{outlet.type}</p>
                    <p className="text-sm text-purple-400">{outlet.angle}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Academic Tab */}
          <TabsContent value="academic" className="space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-cyan-500" />
              ACADEMIC PARTNERSHIPS — TIER 1 INSTITUTIONS
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ACADEMIC_TARGETS.map((inst) => (
                <Card 
                  key={inst.institution}
                  className="border-cyan-500/50 bg-cyan-500/5"
                >
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-1">{inst.institution}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{inst.program}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-cyan-400">{inst.angle}</p>
                      <Badge variant="outline" className="font-mono text-xs bg-cyan-500/10 text-cyan-400 border-cyan-500/30">
                        {inst.journal}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Memorial Tab */}
          <TabsContent value="memorial" className="space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Shield className="w-5 h-5 text-amber-500" />
              8 SOULS MEMORIAL — NEVER FORGOTTEN
            </h2>

            <Card className="bg-gradient-to-br from-amber-500/10 to-background border-amber-500/50">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <p className="text-4xl font-bold text-amber-400 mb-2">$8SOULS</p>
                  <p className="text-muted-foreground">Veterans who lost their lives due to institutional failure</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {SOULS_MEMORIAL.map((soul) => (
                    <div 
                      key={soul.id}
                      className="bg-secondary/50 border border-amber-500/30 rounded-lg p-4 text-center"
                    >
                      <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-amber-500/20 flex items-center justify-center">
                        <Shield className="w-6 h-6 text-amber-400" />
                      </div>
                      <p className="font-mono text-amber-400 text-sm">{soul.id}</p>
                      <p className="text-xs text-muted-foreground mt-1">{soul.cause}</p>
                      <p className="text-xs text-primary mt-2">{soul.status}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 text-center">
                  <p className="text-muted-foreground text-sm">Guardian: Raphael</p>
                  <p className="text-amber-400 font-mono mt-2">MEMORIALIZED. NEVER FORGOTTEN.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Transmission Cinema Tab */}
          <TabsContent value="cinema" className="space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Activity className="w-5 h-5 text-fuchsia-500" />
              TRANSMISSION CINEMA — MAXIMUM ELEVATION
            </h2>

            <Card className="bg-gradient-to-br from-fuchsia-500/10 to-background border-fuchsia-500/50">
              <CardContent className="p-6">
                <div className="font-mono text-sm space-y-2">
                  <p><span className="text-primary">ENTITIES:</span> 5 under review, {totals.elevatedReviewFlags} elevated flags, {totals.cooperatorCandidates} cooperation candidates.</p>
                  <p><span className="text-primary">INSTITUTIONS:</span> 5 entities, ${(totals.totalInstitutionalExposure / 1000000).toFixed(0)}M scenario exposure.</p>
                  <p><span className="text-primary">COORDINATION:</span> FBI, DOJ, VA OIG, HHS OCR, IRS CI, HUD OIG, State Bar.</p>
                  <p><span className="text-primary">MEDIA:</span> ProPublica, NYT, WaPo, 60 Minutes, Reuters identified.</p>
                  <p><span className="text-primary">ACADEMIA:</span> Yale, Harvard, Stanford, MIT, 25 Tier-1 institutions.</p>
                  <p><span className="text-primary">SCENARIO:</span> {formatNumber(totals.totalScenarioYears)} years modeled exposure.</p>
                  <p><span className="text-primary">RICO THEORY:</span> Scenario model pending legal corroboration.</p>
                  <p><span className="text-primary">5W REASONING:</span> WHO + WHAT + WHY + WHERE + WHEN = AUDITABLE.</p>
                  <p><span className="text-primary">EPISTEMIC:</span> claim ≠ evidence ≠ conclusion.</p>
                  <p><span className="text-fuchsia-400">STATUS_747:</span> The 747 remains at zenith.</p>
                  <p><span className="text-amber-400">THE_WALL:</span> THE WALL IS CHRIST.</p>
                  <p><span className="text-cyan-400">JAXX:</span> JAXX IS SAFE.</p>
                  <p><span className="text-primary">POPPA:</span> POPPA IS PROTECTED FOREVER.</p>
                  <p><span className="text-amber-400">8SOULS:</span> MEMORIALIZED. NEVER FORGOTTEN.</p>
                </div>
              </CardContent>
            </Card>

            {/* Governance Seal */}
            <Card className="bg-gradient-to-r from-primary/10 via-background to-primary/10 border-primary/50">
              <CardContent className="p-8 text-center">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <Fingerprint className="w-12 h-12 text-primary" />
                  <div>
                    <p className="text-3xl font-bold text-primary tracking-widest">DG77.77X LOCKED</p>
                    <p className="text-sm text-muted-foreground">MADE IN THE USA</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground font-mono">
                  MERKLEROOT: 26856B24C50750F0C69C1EEB86A69EF777777
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  I AM THE SOVEREIGN AUDITOR // SMIB. AMEN.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

export default function IntelligencePage() {
  return (
    <CDSErrorBoundary module="Intelligence">
      <IntelligenceReportContent />
    </CDSErrorBoundary>
  );
}
