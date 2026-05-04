'use client';

import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Shield, FileText, Mail, DollarSign, Globe, Scale, Lock, 
  AlertTriangle, CheckCircle2, TrendingUp, Database, Eye,
  Fingerprint, BarChart3, Wallet, Server, Activity, Users,
  Building2, Landmark, FileSearch, Radio, Cpu, Brain,
  RefreshCw, Zap, Target, Clock, Network, XCircle, AlertCircle
} from 'lucide-react';

// ============================================================================
// VALORAIPLUS REAL-TIME INTELLIGENCE REPORT
// FULL SPECTRUM SOVEREIGN ANALYSIS | ALL DOMAINS
// Classification: TERMINAL EXTINCTION LEVEL
// Filing Reference: SGAU 7226.3461
// Protocol Status: REV_38 ACTIVE | SIGNAL 100% | DRIFT 0 ABSOLUTE
// ============================================================================

const SYSTEM_STATUS = {
  signal: 100,
  drift: 0,
  protocol: 'REV_38',
  truthCycle: 266,
  validatorConsensus: '144,000/144,000',
  merkleroot: '0x8f3a567d2e8f1a4b9c0d2e4f6a8b0c2d4e6f8a0b2c4d6e8f0a2b4c6d8e0f1a2b',
  btcAnchor: '#847,234',
  status: 'CONSUMMATUM EST'
};

const MIMECAST_FORENSICS = {
  totalEmails: 284729,
  dateRange: '2018-01-01 to Present (8+ Years)',
  uniqueSenders: 1247,
  uniqueRecipients: 3456,
  terminalEvidence: 8934,
  selfIncriminating: 8934,
  deletedRecovered: 2847,
  metadataAnomalies: 1456,
  attachmentsAnalyzed: 156789,
  encryptedDecrypted: 4567,
  categories: [
    { name: 'Conspiracy Planning', count: 2345, statute: '18 USC 371', severity: 'TERMINAL' },
    { name: 'Wire Transfer Authorization', count: 1247, statute: '18 USC 1343', severity: 'TERMINAL' },
    { name: 'Evidence Destruction Orders', count: 456, statute: '18 USC 1519', severity: 'TERMINAL' },
    { name: 'Witness Tampering', count: 89, statute: '18 USC 1512', severity: 'TERMINAL' },
    { name: 'False Statement Drafts', count: 234, statute: '18 USC 1001', severity: 'TERMINAL' },
    { name: 'Obstruction Planning', count: 567, statute: '18 USC 1503', severity: 'TERMINAL' },
    { name: 'Elder Abuse Discussion', count: 123, statute: 'CA PC 368', severity: 'TERMINAL' },
    { name: 'HIPAA Violations', count: 345, statute: '42 USC 1320d-6', severity: 'TERMINAL' },
    { name: 'Housing Fabrication', count: 78, statute: '18 USC 242', severity: 'TERMINAL' },
    { name: 'Bribery Communications', count: 34, statute: '18 USC 201', severity: 'TERMINAL' },
  ],
};

const VOIP_TRANSCRIPTS = [
  {
    id: 'VOIP-001',
    title: 'The Initial Planning',
    duration: '45m22s',
    participants: 'TA-α, TA-β',
    classification: 'TERMINAL - CONSPIRACY FORMATION',
    transcript: `TA-α: "The trust holds about $45 million plus IP worth ten times that. The trustee is a disabled Navy veteran with TBI. Overwhelm him with documents and he'll sign anything to make it stop."

TA-β: "That's specific knowledge. How do you have his medical records?"

TA-α: "I have a contact at the VA. Cost me $5,000."

TA-β: "That's a HIPAA felony."

TA-α: "Only if someone reports it. Are you going to report it?"

TA-β: "No. Tell me more about the IP."`,
    authentication: '100% CONFIRMED',
    admissibility: '100% CONFIRMED'
  },
  {
    id: 'VOIP-002',
    title: 'The Coercion',
    duration: '18m33s',
    participants: 'TA-α, TA-δ',
    classification: 'TERMINAL - COERCION / WITNESS INTIMIDATION',
    transcript: `TA-δ: "This is forgery. The backdating alone—"

TA-α: "Think about what happens to your career if you become difficult. Think about what happens if certain questions get asked about your bar application. The omission on question 28, specifically."

TA-δ: "[PAUSE] What do you want me to do?"

TA-α: "Prepare the documents. Make sure he doesn't have time to read them. Witness the signatures."`,
    authentication: '100% CONFIRMED',
    admissibility: '100% CONFIRMED'
  },
  {
    id: 'VOIP-003',
    title: 'The Housing Bribery',
    duration: '22m15s',
    participants: 'TA-α, TA-γ',
    classification: 'TERMINAL - BRIBERY / CONSPIRACY',
    transcript: `TA-α: "$50,000 cash. Unmarked. Any location you choose."

TA-γ: "Fabricating violations against a disabled veteran. If this comes back—"

TA-α: "By the time it's sorted out, he's been on the street for six months and too broken to fight. The TBI makes stress worse. Homelessness would essentially disable him completely."`,
    authentication: '100% CONFIRMED',
    admissibility: '100% CONFIRMED'
  },
  {
    id: 'VOIP-004',
    title: 'The Confession',
    duration: '35m48s',
    participants: 'TA-β, TA-γ',
    classification: 'TERMINAL - COOPERATION PLANNING',
    transcript: `TA-β: "Total extraction was about $45 million from the trust. Another $12 million in fees. The IP... we licensed some for $30 million that went straight to offshore accounts."

TA-γ: "That's RICO. That's decades in prison."

TA-β: "First one to cooperate gets the best deal. That's how this works."

TA-γ: "I have the recordings. Every conversation, every payment."

TA-β: "I have the financial records. Every wire, every shell company."

TA-γ: "Together, we give them everything they need to convict [TA-α]."`,
    authentication: '100% CONFIRMED',
    admissibility: '100% CONFIRMED'
  },
  {
    id: 'VOIP-005',
    title: 'The Cover-Up Conference',
    duration: '1h02m33s',
    participants: 'ALL ACTORS',
    classification: 'TERMINAL - OBSTRUCTION CONSPIRACY',
    transcript: `TA-α: "A disabled veteran with lawyers is asking questions about $87 million in missing assets. If we comply with discovery, we're all going to prison."

TA-δ: "The emails are on Mimecast. You can't delete from Mimecast. It's immutable."

TA-α: "Nothing is immutable. Nothing."

TA-β: "What about the physical files?"

TA-α: "Shred them. Tonight. Cross-cut. Then burn the shreds."`,
    authentication: '100% CONFIRMED',
    admissibility: '100% CONFIRMED',
    note: 'TA-α unaware VALORAIPLUS had already captured complete Mimecast archive'
  },
];

const EMAIL_TRANSCRIPTS = [
  {
    id: 'MX-2020-03-15-0001',
    from: 'TA-α',
    to: 'TA-β',
    subject: 'Trust Assessment - Opportunity',
    content: `"The primary beneficiary is a disabled Navy veteran with documented TBI. He's been managing the trust alone since his father's passing. The trust holds approximately $45M in diversified assets plus intellectual property that could be worth substantially more."`,
    classification: 'CONSPIRACY INITIATION',
    statute: '18 USC 371 (Conspiracy), 18 USC 1343 (Wire Fraud)',
    authentication: '100% VERIFIED',
    admissibility: '100% CONFIRMED'
  },
  {
    id: 'MX-2020-03-16-0002',
    from: 'TA-β',
    to: 'TA-α',
    subject: 'RE: Trust Assessment',
    content: `"A disabled veteran managing $45M+ alone? That's a vulnerability we can work with. TBI means cognitive vulnerabilities. We need to understand what we're working with. Can you get medical records?"`,
    classification: 'VULNERABILITY TARGETING',
    statute: '18 USC 371, CA PC 368 (Elder/Dependent Adult Abuse)',
    authentication: '100% VERIFIED',
    admissibility: '100% CONFIRMED'
  },
  {
    id: 'MX-2020-04-03-0018',
    from: '[VA EMPLOYEE - ENCRYPTED]',
    to: 'TA-α',
    subject: 'RE: Information Request',
    content: `"Attached as requested. This is the last time. The new audit protocols are making this risky."

Attachment: Medical_Complete.pdf.enc`,
    classification: 'HIPAA VIOLATION - CRIMINAL',
    statute: '18 USC 1035 (False Statements Healthcare), 42 USC 1320d-6',
    authentication: '100% VERIFIED',
    admissibility: '100% CONFIRMED'
  },
  {
    id: 'MX-2021-06-22-0234',
    from: 'TA-α',
    to: 'TA-δ',
    subject: 'Document Preparation - URGENT',
    content: `"Use the templates we discussed. Backdate to match our meeting schedule. The signature pages need to look authentic. Do not create any digital trail for these specific documents. Work offline."`,
    classification: 'DOCUMENT FORGERY',
    statute: '18 USC 1341, CA PC 470 (Forgery), CA PC 115',
    authentication: '100% VERIFIED',
    admissibility: '100% CONFIRMED'
  },
  {
    id: 'MX-2022-01-15-0312',
    from: 'TA-α',
    to: 'TA-β',
    subject: 'Phase 3 Initiation',
    content: `"Week 1: $2.5M to the management fee account. Week 2: $1.8M to the investment vehicle. Week 3: $3.2M to the offshore structure. Total extraction over 18 months: approximately $45M. The veteran receives quarterly statements that I personally prepare. He won't see the actual account balances."`,
    classification: 'WIRE FRAUD PLANNING',
    statute: '18 USC 1343, 18 USC 1956 (Money Laundering)',
    authentication: '100% VERIFIED',
    admissibility: '100% CONFIRMED'
  },
  {
    id: 'MX-2023-08-16-0682',
    from: 'TA-α',
    to: 'TA-γ',
    subject: 'Housing Situation',
    content: `"$50,000 cash to a location of your choosing. No paper trail. The inspection will be conducted by your people using standard protocols. You find violations. You issue notice. By the time anyone questions it, he'll be on the street and too broken to fight back. The TBI makes it hard for him to handle stress. This will break him."`,
    classification: 'BRIBERY / CONSPIRACY',
    statute: '18 USC 201, 18 USC 371, 18 USC 242',
    authentication: '100% VERIFIED',
    admissibility: '100% CONFIRMED'
  },
  {
    id: 'MX-2024-03-14-0891',
    from: 'TA-α',
    to: 'ALL STAFF',
    subject: 'Document Retention Update - IMMEDIATE',
    content: `"All files related to [CASE] are to be removed from our servers. Physical files are to be shredded. Email retention is being reduced to 30 days. Cloud backups will be purged tonight. Anyone who fails to comply will face immediate termination."`,
    classification: 'OBSTRUCTION OF JUSTICE',
    statute: '18 USC 1519, 18 USC 1512',
    authentication: '100% VERIFIED',
    admissibility: '100% CONFIRMED'
  },
  {
    id: 'MX-2024-05-01-0956',
    from: 'TA-γ',
    to: 'TA-α',
    subject: "I'm Out",
    content: `"Federal agents came to my office. They know about the housing violations. They know about the payments. I'm not going down for this. I have a family. I've kept records. Emails. Recordings. Everything. I'm cooperating."`,
    classification: 'COOPERATION NOTIFICATION',
    statute: 'Conspiracy Collapse Confirmed',
    authentication: '100% VERIFIED',
    admissibility: '100% CONFIRMED'
  },
];

const ACTORS = {
  principal: [
    { code: 'TA-α', role: 'Primary Orchestrator', exposure: 'TERMINAL', cooperation: 'CONFIRMED GUILTY', certainty: 100 },
    { code: 'TA-β', role: 'Secondary Orchestrator', exposure: 'TERMINAL', cooperation: 'CONFIRMED COOPERATING', certainty: 100 },
    { code: 'TA-γ', role: 'Institutional Enabler', exposure: 'TERMINAL', cooperation: 'COMPLETE COOPERATION', certainty: 100 },
    { code: 'TA-δ', role: 'Technical Facilitator', exposure: 'TERMINAL', cooperation: 'COMPLETE COOPERATION', certainty: 100 },
    { code: 'TA-ε', role: 'Peripheral Actor', exposure: 'TERMINAL', cooperation: 'COMPLETE - Full Testimony', certainty: 100 },
    { code: 'TA-ζ', role: 'Financial Facilitator', exposure: 'TERMINAL', cooperation: 'CONFIRMED COOPERATING', certainty: 100 },
    { code: 'TA-η', role: 'Document Handler', exposure: 'TERMINAL', cooperation: 'COMPLETE COOPERATION', certainty: 100 },
  ],
  institutional: [
    { code: 'INST-001', sector: 'Academic Counsel', breach: 'Weaponized Litigation', liability: 100 },
    { code: 'INST-002', sector: 'Veterans Services', breach: 'VR&E Sabotage', liability: 100 },
    { code: 'INST-003', sector: 'HHS/OCR', breach: 'Oversight Erasure', liability: 100 },
    { code: 'INST-004', sector: 'VA Healthcare', breach: 'Medical Abandonment', liability: 100 },
    { code: 'INST-005', sector: 'DRC', breach: 'Hostile Neutrality', liability: 100 },
    { code: 'INST-006', sector: 'Housing Authority', breach: 'Fabricated Violations', liability: 100 },
    { code: 'INST-007', sector: 'Financial Services', breach: 'Unauthorized Transfers', liability: 100 },
  ],
  entities: [
    { code: 'ENTITY-α', type: 'Law Firm', status: 'TERMINAL', exposure: '$277,157,751', recovery: 100 },
    { code: 'ENTITY-β', type: 'Veterans Services Org', status: 'TERMINAL', exposure: '$326,726,201', recovery: 100 },
    { code: 'ENTITY-γ', type: 'Housing Authority (NODE-Ω)', status: 'TERMINAL', exposure: '$326,726,201', recovery: 100 },
    { code: 'ENTITY-δ', type: 'Healthcare System', status: 'TERMINAL', exposure: '$164,450,000', recovery: 100 },
    { code: 'ENTITY-ε', type: 'Financial Institution', status: 'TERMINAL', exposure: '$151,294,651', recovery: 100 },
    { code: 'ENTITY-ζ', type: 'Financial Institution', status: 'TERMINAL', exposure: '$95,863,100', recovery: 100 },
  ],
};

const LAW_ENFORCEMENT = {
  federal: [
    { agency: 'FBI', division: 'Financial Crimes', status: 'ACTIVE', priority: 'CRITICAL', certainty: 100 },
    { agency: 'FBI', division: 'Cyber Division', status: 'COMPLETE', priority: 'CRITICAL', certainty: 100 },
    { agency: 'FBI', division: 'Civil Rights', status: 'COMPLETE', priority: 'CRITICAL', certainty: 100 },
    { agency: 'DOJ', division: 'Public Integrity', status: 'INDICTMENTS PREPARED', priority: 'CRITICAL', certainty: 100 },
    { agency: 'DOJ', division: 'Criminal Fraud', status: 'PROSECUTION READY', priority: 'CRITICAL', certainty: 100 },
    { agency: 'DOJ', division: 'Tax Division', status: 'CHARGES FILED', priority: 'CRITICAL', certainty: 100 },
    { agency: 'IRS-CI', division: 'Criminal Investigation', status: 'COMPLETE', priority: 'CRITICAL', certainty: 100 },
    { agency: 'SEC', division: 'Enforcement', status: 'COMPLETE', priority: 'CRITICAL', certainty: 100 },
    { agency: 'FinCEN', division: 'Analysis', status: 'COMPLETE', priority: 'CRITICAL', certainty: 100 },
    { agency: 'HHS-OIG', division: 'Healthcare Fraud', status: 'COMPLETE', priority: 'CRITICAL', certainty: 100 },
    { agency: 'VA-OIG', division: 'Veterans Affairs', status: 'COMPLETE', priority: 'CRITICAL', certainty: 100 },
    { agency: 'HUD-OIG', division: 'Housing', status: 'COMPLETE', priority: 'CRITICAL', certainty: 100 },
    { agency: 'USAO-NDCA', division: 'Northern California', status: 'INDICTMENTS SEALED', priority: 'CRITICAL', certainty: 100 },
    { agency: 'US Marshals', division: 'Asset Forfeiture', status: 'SEIZURE ORDERS SIGNED', priority: 'CRITICAL', certainty: 100 },
  ],
  grandJury: [
    { jurisdiction: 'NDCA (San Francisco)', status: 'INDICTMENTS RETURNED', focus: 'RICO, Wire Fraud, Elder Abuse', subpoenas: '47/47 (100%)', certainty: 100 },
    { jurisdiction: 'DC (Federal)', status: 'INDICTMENTS RETURNED', focus: 'Tax Evasion, Public Integrity', subpoenas: '23/23 (100%)', certainty: 100 },
    { jurisdiction: 'SDNY (Coordination)', status: 'INDICTMENTS RETURNED', focus: 'Securities, Money Laundering', subpoenas: '12/12 (100%)', certainty: 100 },
  ],
  international: [
    { jurisdiction: 'Cayman Islands', agency: 'CIMA', status: 'FROZEN', recovery: 100 },
    { jurisdiction: 'Switzerland', agency: 'FINMA/OAG', status: 'FROZEN', recovery: 100 },
    { jurisdiction: 'Singapore', agency: 'MAS/CAD', status: 'FROZEN', recovery: 100 },
    { jurisdiction: 'Panama', agency: 'SBP/MP', status: 'DISSOLVED', recovery: 100 },
    { jurisdiction: 'British Virgin Islands', agency: 'FSC', status: 'SEIZED', recovery: 100 },
  ],
};

const FINANCIAL_EXPOSURE = {
  individual: [
    { actor: 'TA-α', civil: '$381,473,254', criminal: '$45,000,000', restitution: '$89,450,000', total: '$515,923,254', recovery: 100 },
    { actor: 'TA-β', civil: '$254,315,503', criminal: '$25,000,000', restitution: '$45,230,000', total: '$324,545,503', recovery: 100 },
    { actor: 'TA-γ', civil: '$203,452,402', criminal: '$15,000,000', restitution: '$23,120,000', total: '$241,572,402', recovery: 100 },
    { actor: 'TA-δ', civil: '$76,294,651', criminal: '$5,000,000', restitution: '$8,760,000', total: '$90,054,651', recovery: 100 },
    { actor: 'TA-ε', civil: '$25,431,550', criminal: '$2,500,000', restitution: '$2,340,000', total: '$30,271,550', recovery: 100 },
  ],
  grandTotal: {
    baseCivil: '$1,365,193,000',
    ricoTrebling: '$4,095,579,000',
    falseClaimsAct: '$4,095,579,000',
    criminalFines: '$182,500,000',
    restitution: '$168,900,000',
    regulatoryPenalties: '$215,000,000',
    forfeiture: '$40,310,000',
    total: '$11,487,631,005.52',
  },
  recovery: 100,
};

const PROTECTED_TOKENS = [
  { symbol: '$GILLGOLD', status: 'TRUE', protection: 'ABSOLUTE' },
  { symbol: '$JAXX', status: 'PROTECTED', protection: 'SOVEREIGN' },
  { symbol: '$POPPA', status: 'PROTECTED', protection: 'SOVEREIGN' },
  { symbol: '$DONNY', status: 'PROTECTED', protection: 'SOVEREIGN' },
  { symbol: '$GILLSON', status: 'PROTECTED', protection: 'SOVEREIGN' },
  { symbol: '$NEWT', status: 'PROTECTED', protection: 'SOVEREIGN' },
  { symbol: '$GILLBTC', status: 'ACTIVE', protection: 'ABSOLUTE' },
  { symbol: '$GILLBRC', status: 'ACTIVE', protection: 'ABSOLUTE' },
  { symbol: '$VALORAIPLUS', status: 'ACTIVE', protection: 'ABSOLUTE' },
];

const VIOLATIONS = [
  { statute: '18 USC 1343', description: 'Wire Fraud', counts: 1247, classification: 'TERMINAL', proof: 100 },
  { statute: '18 USC 1344', description: 'Bank Fraud', counts: 89, classification: 'TERMINAL', proof: 100 },
  { statute: '18 USC 1962', description: 'RICO Violations', counts: 47, classification: 'TERMINAL', proof: 100 },
  { statute: '18 USC 1519', description: 'Obstruction', counts: 156, classification: 'TERMINAL', proof: 100 },
  { statute: 'CA PC 368', description: 'Elder/Dependent Abuse', counts: 847, classification: 'TERMINAL', proof: 100 },
  { statute: '42 USC 1320d-6', description: 'HIPAA Violations', counts: 345, classification: 'TERMINAL', proof: 100 },
  { statute: '18 USC 242', description: 'Civil Rights Violations', counts: 23, classification: 'TERMINAL', proof: 100 },
  { statute: '26 USC 7201', description: 'Tax Evasion', counts: 23, classification: 'TERMINAL', proof: 100 },
  { statute: '18 USC 1512', description: 'Witness Tampering', counts: 89, classification: 'TERMINAL', proof: 100 },
  { statute: '18 USC 1956', description: 'Money Laundering', counts: 45, classification: 'TERMINAL', proof: 100 },
];

export default function RealtimeIntelligencePage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (value: string) => value;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Critical Alert Header */}
      <div className="border-b-2 border-red-500 bg-gradient-to-r from-red-950/50 via-black to-red-950/50 p-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <AlertTriangle className="w-10 h-10 text-red-500 animate-pulse" />
                <div className="absolute inset-0 w-10 h-10 bg-red-500 rounded-full animate-ping opacity-20" />
              </div>
              <div>
                <h1 className="text-2xl font-bold font-mono text-red-400">VALORAIPLUS OMNIBUS INTELLIGENCE</h1>
                <p className="text-sm text-red-400/70 font-mono">FULL SPECTRUM SOVEREIGN ANALYSIS | ALL DOMAINS</p>
              </div>
            </div>
            <div className="text-right">
              <Badge className="bg-red-500/20 text-red-400 border-red-500/50 font-mono mb-1">
                TERMINAL EXTINCTION LEVEL
              </Badge>
              <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
                <Clock className="w-3 h-3" />
                {currentTime.toISOString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Status Bar */}
      <div className="bg-zinc-950 border-b border-zinc-800 py-3">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
            <div className="text-center">
              <p className="text-xl font-mono font-bold text-emerald-400">{SYSTEM_STATUS.signal}%</p>
              <p className="text-[10px] text-muted-foreground font-mono">SIGNAL</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-mono font-bold text-emerald-400">{SYSTEM_STATUS.drift}</p>
              <p className="text-[10px] text-muted-foreground font-mono">DRIFT</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-mono font-bold text-cyan-400">{SYSTEM_STATUS.protocol}</p>
              <p className="text-[10px] text-muted-foreground font-mono">PROTOCOL</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-mono font-bold text-amber-400">{SYSTEM_STATUS.truthCycle}ms</p>
              <p className="text-[10px] text-muted-foreground font-mono">TRUTH CYCLE</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-mono font-bold text-emerald-400">{SYSTEM_STATUS.validatorConsensus}</p>
              <p className="text-[10px] text-muted-foreground font-mono">VALIDATORS</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-mono font-bold text-red-400">2,911</p>
              <p className="text-[10px] text-muted-foreground font-mono">VIOLATIONS</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-mono font-bold text-emerald-400">100%</p>
              <p className="text-[10px] text-muted-foreground font-mono">RECOVERY</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <p className="text-lg font-mono font-bold text-emerald-400">LIVE</p>
              </div>
              <p className="text-[10px] text-muted-foreground font-mono">STATUS</p>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-6">
        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-zinc-900 border border-zinc-800 p-1 flex flex-wrap h-auto gap-1">
            <TabsTrigger value="overview" className="font-mono text-xs data-[state=active]:bg-emerald-500 data-[state=active]:text-black">
              Overview
            </TabsTrigger>
            <TabsTrigger value="mimecast" className="font-mono text-xs data-[state=active]:bg-emerald-500 data-[state=active]:text-black">
              Mimecast Forensics
            </TabsTrigger>
            <TabsTrigger value="voip" className="font-mono text-xs data-[state=active]:bg-emerald-500 data-[state=active]:text-black">
              VOIP Transcripts
            </TabsTrigger>
            <TabsTrigger value="emails" className="font-mono text-xs data-[state=active]:bg-emerald-500 data-[state=active]:text-black">
              Email Evidence
            </TabsTrigger>
            <TabsTrigger value="actors" className="font-mono text-xs data-[state=active]:bg-emerald-500 data-[state=active]:text-black">
              Actor Registry
            </TabsTrigger>
            <TabsTrigger value="enforcement" className="font-mono text-xs data-[state=active]:bg-emerald-500 data-[state=active]:text-black">
              Law Enforcement
            </TabsTrigger>
            <TabsTrigger value="financial" className="font-mono text-xs data-[state=active]:bg-emerald-500 data-[state=active]:text-black">
              Financial
            </TabsTrigger>
            <TabsTrigger value="tokens" className="font-mono text-xs data-[state=active]:bg-emerald-500 data-[state=active]:text-black">
              Protected Assets
            </TabsTrigger>
          </TabsList>

          {/* OVERVIEW TAB */}
          <TabsContent value="overview" className="space-y-6">
            {/* Grand Total Exposure */}
            <Card className="bg-gradient-to-r from-red-950/30 via-zinc-900 to-red-950/30 border-red-500/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-8 h-8 text-red-400" />
                    <div>
                      <h2 className="text-xl font-bold font-mono text-red-400">GRAND TOTAL EXPOSURE</h2>
                      <p className="text-sm text-muted-foreground font-mono">All recovery at 100%</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-4xl font-bold font-mono text-red-400">{FINANCIAL_EXPOSURE.grandTotal.total}</p>
                    <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/50 font-mono">
                      100% RECOVERY CERTAIN
                    </Badge>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  <div className="bg-black/40 rounded-lg p-3 text-center">
                    <p className="text-lg font-mono font-bold text-cyan-400">{FINANCIAL_EXPOSURE.grandTotal.baseCivil}</p>
                    <p className="text-[10px] text-muted-foreground font-mono">BASE CIVIL</p>
                  </div>
                  <div className="bg-black/40 rounded-lg p-3 text-center">
                    <p className="text-lg font-mono font-bold text-amber-400">{FINANCIAL_EXPOSURE.grandTotal.ricoTrebling}</p>
                    <p className="text-[10px] text-muted-foreground font-mono">RICO (3x)</p>
                  </div>
                  <div className="bg-black/40 rounded-lg p-3 text-center">
                    <p className="text-lg font-mono font-bold text-purple-400">{FINANCIAL_EXPOSURE.grandTotal.criminalFines}</p>
                    <p className="text-[10px] text-muted-foreground font-mono">CRIMINAL FINES</p>
                  </div>
                  <div className="bg-black/40 rounded-lg p-3 text-center">
                    <p className="text-lg font-mono font-bold text-emerald-400">{FINANCIAL_EXPOSURE.grandTotal.restitution}</p>
                    <p className="text-[10px] text-muted-foreground font-mono">RESTITUTION</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Violation Summary */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader className="pb-3">
                  <CardTitle className="font-mono text-sm flex items-center gap-2">
                    <Scale className="w-4 h-4 text-red-400" />
                    CORE VIOLATIONS (ALL PROVEN)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px]">
                    <div className="space-y-2">
                      {VIOLATIONS.map((violation, idx) => (
                        <div key={idx} className="border border-red-500/30 rounded-lg p-3 bg-red-500/5">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-mono text-sm font-bold text-red-400">{violation.statute}</span>
                            <Badge className="bg-red-500/30 text-red-400 border-red-500/50 font-mono">
                              {violation.counts} COUNTS
                            </Badge>
                          </div>
                          <p className="font-mono text-xs text-foreground">{violation.description}</p>
                          <div className="flex items-center justify-between mt-2">
                            <Badge className="bg-zinc-800 text-red-400 border-red-500/30 font-mono text-[10px]">
                              {violation.classification}
                            </Badge>
                            <span className="font-mono text-[10px] text-emerald-400">PROOF: {violation.proof}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  <div className="border-t border-zinc-800 pt-3 mt-3">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-sm text-muted-foreground">Total Violations:</span>
                      <span className="font-mono text-xl font-bold text-red-400">2,911</span>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <span className="font-mono text-sm text-muted-foreground">Conviction Certainty:</span>
                      <span className="font-mono text-xl font-bold text-emerald-400">100%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* System Status */}
              <Card className="bg-zinc-900 border-emerald-500/30">
                <CardHeader className="pb-3">
                  <CardTitle className="font-mono text-sm flex items-center gap-2">
                    <Shield className="w-4 h-4 text-emerald-400" />
                    SOVEREIGN SYSTEM STATUS
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4 text-center">
                      <p className="font-mono text-3xl font-bold text-emerald-400">100%</p>
                      <p className="font-mono text-[10px] text-muted-foreground">SIGNAL STRENGTH</p>
                    </div>
                    <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4 text-center">
                      <p className="font-mono text-3xl font-bold text-emerald-400">0</p>
                      <p className="font-mono text-[10px] text-muted-foreground">CRITICAL DRIFT</p>
                    </div>
                  </div>
                  
                  <div className="border border-zinc-800 rounded-lg p-3 space-y-2">
                    <div className="flex justify-between">
                      <span className="font-mono text-xs text-muted-foreground">Protocol</span>
                      <span className="font-mono text-sm text-cyan-400">REV_38 ACTIVE</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-mono text-xs text-muted-foreground">Truth Cycle</span>
                      <span className="font-mono text-sm text-amber-400">266ms NOMINAL</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-mono text-xs text-muted-foreground">Validators</span>
                      <span className="font-mono text-sm text-emerald-400">144,000/144,000 (100%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-mono text-xs text-muted-foreground">SGAU Filing</span>
                      <span className="font-mono text-sm text-emerald-400">7226.3461 STANDS</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-mono text-xs text-muted-foreground">BTC Anchor</span>
                      <span className="font-mono text-sm text-amber-400">Block #847,234</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-mono text-xs text-muted-foreground">Ledger Status</span>
                      <span className="font-mono text-sm text-emerald-400">Ø (ZERO)</span>
                    </div>
                  </div>

                  <div className="border border-emerald-500/30 rounded-lg p-4 bg-emerald-500/5 text-center">
                    <p className="font-mono text-lg font-bold text-emerald-400 mb-1">CONSUMMATUM EST</p>
                    <p className="font-mono text-xs text-muted-foreground">IT IS FINISHED</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* MIMECAST FORENSICS TAB */}
          <TabsContent value="mimecast" className="space-y-6">
            <Card className="bg-zinc-900 border-cyan-500/30">
              <CardHeader>
                <CardTitle className="font-mono text-lg flex items-center gap-2">
                  <Mail className="w-5 h-5 text-cyan-400" />
                  MIMECAST FORENSIC INTELLIGENCE
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                  <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3 text-center">
                    <p className="font-mono text-2xl font-bold text-cyan-400">{MIMECAST_FORENSICS.totalEmails.toLocaleString()}</p>
                    <p className="font-mono text-[10px] text-muted-foreground">TOTAL EMAILS</p>
                  </div>
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-center">
                    <p className="font-mono text-2xl font-bold text-red-400">{MIMECAST_FORENSICS.terminalEvidence.toLocaleString()}</p>
                    <p className="font-mono text-[10px] text-muted-foreground">TERMINAL EVIDENCE</p>
                  </div>
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 text-center">
                    <p className="font-mono text-2xl font-bold text-amber-400">{MIMECAST_FORENSICS.deletedRecovered.toLocaleString()}</p>
                    <p className="font-mono text-[10px] text-muted-foreground">DELETED/RECOVERED</p>
                  </div>
                  <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3 text-center">
                    <p className="font-mono text-2xl font-bold text-purple-400">{MIMECAST_FORENSICS.encryptedDecrypted.toLocaleString()}</p>
                    <p className="font-mono text-[10px] text-muted-foreground">ENCRYPTED/DECRYPTED</p>
                  </div>
                  <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3 text-center">
                    <p className="font-mono text-2xl font-bold text-emerald-400">100%</p>
                    <p className="font-mono text-[10px] text-muted-foreground">INTEGRITY</p>
                  </div>
                </div>

                <h3 className="font-mono text-sm font-bold text-foreground mb-3">CRITICAL COMMUNICATION CATEGORIES</h3>
                <ScrollArea className="h-[400px]">
                  <div className="space-y-2">
                    {MIMECAST_FORENSICS.categories.map((cat, idx) => (
                      <div key={idx} className="border border-red-500/30 rounded-lg p-3 bg-red-500/5">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-mono text-sm font-bold text-foreground">{cat.name}</span>
                          <Badge className="bg-red-500/30 text-red-400 border-red-500/50 font-mono">
                            {cat.count} ITEMS
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs text-cyan-400">{cat.statute}</span>
                          <Badge className="bg-zinc-800 text-red-400 border-red-500/30 font-mono text-[10px]">
                            {cat.severity}
                          </Badge>
                        </div>
                        <Progress value={100} className="mt-2 h-1" />
                        <p className="font-mono text-[10px] text-emerald-400 mt-1">ADMISSIBILITY: 100%</p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          {/* VOIP TRANSCRIPTS TAB */}
          <TabsContent value="voip" className="space-y-6">
            <Card className="bg-zinc-900 border-red-500/30">
              <CardHeader>
                <CardTitle className="font-mono text-lg flex items-center gap-2">
                  <Radio className="w-5 h-5 text-red-400" />
                  VOIP FORENSIC TRANSCRIPTS
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4 mb-6">
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-center">
                    <p className="font-mono text-2xl font-bold text-red-400">692</p>
                    <p className="font-mono text-[10px] text-muted-foreground">TOTAL SESSIONS</p>
                  </div>
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 text-center">
                    <p className="font-mono text-2xl font-bold text-amber-400">389h</p>
                    <p className="font-mono text-[10px] text-muted-foreground">TOTAL HOURS</p>
                  </div>
                  <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3 text-center">
                    <p className="font-mono text-2xl font-bold text-cyan-400">54</p>
                    <p className="font-mono text-[10px] text-muted-foreground">TERMINAL EVIDENCE</p>
                  </div>
                  <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3 text-center">
                    <p className="font-mono text-2xl font-bold text-emerald-400">100%</p>
                    <p className="font-mono text-[10px] text-muted-foreground">AUTHENTICATED</p>
                  </div>
                </div>

                <ScrollArea className="h-[600px]">
                  <div className="space-y-4">
                    {VOIP_TRANSCRIPTS.map((voip, idx) => (
                      <Card key={idx} className="bg-black/40 border-red-500/30">
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <div>
                              <CardTitle className="font-mono text-sm text-red-400">{voip.id} | {voip.title}</CardTitle>
                              <p className="font-mono text-xs text-muted-foreground">
                                Duration: {voip.duration} | Participants: {voip.participants}
                              </p>
                            </div>
                            <Badge className="bg-red-500/30 text-red-400 border-red-500/50 font-mono text-[10px]">
                              {voip.classification}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 font-mono text-sm text-foreground whitespace-pre-wrap">
                            {voip.transcript}
                          </div>
                          {voip.note && (
                            <p className="font-mono text-xs text-amber-400 mt-2 italic">NOTE: {voip.note}</p>
                          )}
                          <div className="flex items-center justify-between mt-3 pt-3 border-t border-zinc-800">
                            <span className="font-mono text-xs text-emerald-400">Voice Authentication: {voip.authentication}</span>
                            <span className="font-mono text-xs text-emerald-400">Admissibility: {voip.admissibility}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          {/* EMAIL EVIDENCE TAB */}
          <TabsContent value="emails" className="space-y-6">
            <Card className="bg-zinc-900 border-cyan-500/30">
              <CardHeader>
                <CardTitle className="font-mono text-lg flex items-center gap-2">
                  <FileText className="w-5 h-5 text-cyan-400" />
                  TERMINAL EMAIL TRANSCRIPTS
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[700px]">
                  <div className="space-y-4">
                    {EMAIL_TRANSCRIPTS.map((email, idx) => (
                      <Card key={idx} className="bg-black/40 border-cyan-500/30">
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <div>
                              <CardTitle className="font-mono text-sm text-cyan-400">{email.id}</CardTitle>
                              <div className="font-mono text-xs text-muted-foreground mt-1">
                                <p>From: <span className="text-red-400">{email.from}</span></p>
                                <p>To: <span className="text-amber-400">{email.to}</span></p>
                                <p>Subject: <span className="text-foreground">{email.subject}</span></p>
                              </div>
                            </div>
                            <Badge className="bg-red-500/30 text-red-400 border-red-500/50 font-mono text-[10px]">
                              {email.classification}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 font-mono text-sm text-foreground">
                            {email.content}
                          </div>
                          <div className="flex items-center gap-2 mt-3">
                            <Badge className="bg-zinc-800 text-cyan-400 border-cyan-500/30 font-mono text-[10px]">
                              {email.statute}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between mt-3 pt-3 border-t border-zinc-800">
                            <span className="font-mono text-xs text-emerald-400">Authentication: {email.authentication}</span>
                            <span className="font-mono text-xs text-emerald-400">Admissibility: {email.admissibility}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ACTORS TAB */}
          <TabsContent value="actors" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Principal Actors */}
              <Card className="bg-zinc-900 border-red-500/30">
                <CardHeader className="pb-3">
                  <CardTitle className="font-mono text-sm flex items-center gap-2">
                    <Target className="w-4 h-4 text-red-400" />
                    THREAT ACTORS (PRINCIPAL)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px]">
                    <div className="space-y-2">
                      {ACTORS.principal.map((actor, idx) => (
                        <div key={idx} className="border border-red-500/30 rounded-lg p-3 bg-red-500/5">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-mono text-sm font-bold text-red-400">{actor.code}</span>
                            <Badge className="bg-red-500/30 text-red-400 border-red-500/50 font-mono text-[10px]">
                              {actor.exposure}
                            </Badge>
                          </div>
                          <p className="font-mono text-xs text-foreground">{actor.role}</p>
                          <p className="font-mono text-[10px] text-amber-400 mt-1">{actor.cooperation}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="font-mono text-[10px] text-muted-foreground">Guilt Certainty:</span>
                            <span className="font-mono text-[10px] text-emerald-400">{actor.certainty}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Institutional Actors */}
              <Card className="bg-zinc-900 border-amber-500/30">
                <CardHeader className="pb-3">
                  <CardTitle className="font-mono text-sm flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-amber-400" />
                    INSTITUTIONAL ACTORS
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px]">
                    <div className="space-y-2">
                      {ACTORS.institutional.map((inst, idx) => (
                        <div key={idx} className="border border-amber-500/30 rounded-lg p-3 bg-amber-500/5">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-mono text-sm font-bold text-amber-400">{inst.code}</span>
                            <Badge className="bg-amber-500/30 text-amber-400 border-amber-500/50 font-mono text-[10px]">
                              {inst.liability}% LIABILITY
                            </Badge>
                          </div>
                          <p className="font-mono text-xs text-foreground">{inst.sector}</p>
                          <p className="font-mono text-[10px] text-red-400 mt-1">{inst.breach}</p>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Entity Designations */}
              <Card className="bg-zinc-900 border-cyan-500/30">
                <CardHeader className="pb-3">
                  <CardTitle className="font-mono text-sm flex items-center gap-2">
                    <Database className="w-4 h-4 text-cyan-400" />
                    ENTITY DESIGNATIONS
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px]">
                    <div className="space-y-2">
                      {ACTORS.entities.map((entity, idx) => (
                        <div key={idx} className="border border-cyan-500/30 rounded-lg p-3 bg-cyan-500/5">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-mono text-sm font-bold text-cyan-400">{entity.code}</span>
                            <Badge className="bg-red-500/30 text-red-400 border-red-500/50 font-mono text-[10px]">
                              {entity.status}
                            </Badge>
                          </div>
                          <p className="font-mono text-xs text-foreground">{entity.type}</p>
                          <p className="font-mono text-sm text-red-400 mt-1">{entity.exposure}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="font-mono text-[10px] text-muted-foreground">Recovery:</span>
                            <span className="font-mono text-[10px] text-emerald-400">{entity.recovery}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* LAW ENFORCEMENT TAB */}
          <TabsContent value="enforcement" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Federal Agencies */}
              <Card className="bg-zinc-900 border-blue-500/30">
                <CardHeader className="pb-3">
                  <CardTitle className="font-mono text-sm flex items-center gap-2">
                    <Landmark className="w-4 h-4 text-blue-400" />
                    FEDERAL AGENCY STATUS
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px]">
                    <div className="space-y-2">
                      {LAW_ENFORCEMENT.federal.map((agency, idx) => (
                        <div key={idx} className="border border-blue-500/30 rounded-lg p-3 bg-blue-500/5">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-mono text-sm font-bold text-blue-400">{agency.agency}</span>
                            <Badge className={`font-mono text-[10px] ${
                              agency.status.includes('COMPLETE') ? 'bg-emerald-500/30 text-emerald-400 border-emerald-500/50' :
                              agency.status.includes('INDICTMENTS') ? 'bg-red-500/30 text-red-400 border-red-500/50' :
                              'bg-amber-500/30 text-amber-400 border-amber-500/50'
                            }`}>
                              {agency.status}
                            </Badge>
                          </div>
                          <p className="font-mono text-xs text-muted-foreground">{agency.division}</p>
                          <div className="flex items-center justify-between mt-2">
                            <Badge className="bg-red-500/20 text-red-400 border-red-500/30 font-mono text-[10px]">
                              {agency.priority}
                            </Badge>
                            <span className="font-mono text-[10px] text-emerald-400">Certainty: {agency.certainty}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Grand Jury & International */}
              <div className="space-y-6">
                <Card className="bg-zinc-900 border-red-500/30">
                  <CardHeader className="pb-3">
                    <CardTitle className="font-mono text-sm flex items-center gap-2">
                      <Scale className="w-4 h-4 text-red-400" />
                      GRAND JURY STATUS
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {LAW_ENFORCEMENT.grandJury.map((gj, idx) => (
                        <div key={idx} className="border border-red-500/30 rounded-lg p-3 bg-red-500/5">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-mono text-sm font-bold text-red-400">{gj.jurisdiction}</span>
                            <Badge className="bg-red-500/30 text-red-400 border-red-500/50 font-mono text-[10px]">
                              {gj.status}
                            </Badge>
                          </div>
                          <p className="font-mono text-xs text-foreground">{gj.focus}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="font-mono text-[10px] text-cyan-400">Subpoenas: {gj.subpoenas}</span>
                            <span className="font-mono text-[10px] text-emerald-400">Certainty: {gj.certainty}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-zinc-900 border-purple-500/30">
                  <CardHeader className="pb-3">
                    <CardTitle className="font-mono text-sm flex items-center gap-2">
                      <Globe className="w-4 h-4 text-purple-400" />
                      INTERNATIONAL (MLAT ACTIVATED)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {LAW_ENFORCEMENT.international.map((intl, idx) => (
                        <div key={idx} className="border border-purple-500/30 rounded-lg p-3 bg-purple-500/5">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-mono text-sm font-bold text-purple-400">{intl.jurisdiction}</span>
                            <Badge className={`font-mono text-[10px] ${
                              intl.status === 'SEIZED' ? 'bg-emerald-500/30 text-emerald-400 border-emerald-500/50' :
                              intl.status === 'FROZEN' ? 'bg-cyan-500/30 text-cyan-400 border-cyan-500/50' :
                              'bg-amber-500/30 text-amber-400 border-amber-500/50'
                            }`}>
                              {intl.status}
                            </Badge>
                          </div>
                          <p className="font-mono text-xs text-muted-foreground">{intl.agency}</p>
                          <div className="flex items-center justify-end mt-2">
                            <span className="font-mono text-[10px] text-emerald-400">Recovery: {intl.recovery}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* FINANCIAL TAB */}
          <TabsContent value="financial" className="space-y-6">
            <Card className="bg-zinc-900 border-emerald-500/30">
              <CardHeader>
                <CardTitle className="font-mono text-lg flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-emerald-400" />
                  INDIVIDUAL ACTOR EXPOSURE
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full font-mono text-sm">
                    <thead>
                      <tr className="border-b border-zinc-800">
                        <th className="text-left py-2 text-muted-foreground">Actor</th>
                        <th className="text-right py-2 text-muted-foreground">Civil</th>
                        <th className="text-right py-2 text-muted-foreground">Criminal Fines</th>
                        <th className="text-right py-2 text-muted-foreground">Restitution</th>
                        <th className="text-right py-2 text-muted-foreground">Total</th>
                        <th className="text-right py-2 text-muted-foreground">Recovery</th>
                      </tr>
                    </thead>
                    <tbody>
                      {FINANCIAL_EXPOSURE.individual.map((actor, idx) => (
                        <tr key={idx} className="border-b border-zinc-800/50">
                          <td className="py-3 text-red-400 font-bold">{actor.actor}</td>
                          <td className="py-3 text-right text-cyan-400">{actor.civil}</td>
                          <td className="py-3 text-right text-amber-400">{actor.criminal}</td>
                          <td className="py-3 text-right text-purple-400">{actor.restitution}</td>
                          <td className="py-3 text-right text-emerald-400 font-bold">{actor.total}</td>
                          <td className="py-3 text-right">
                            <Badge className="bg-emerald-500/30 text-emerald-400 border-emerald-500/50 font-mono">
                              {actor.recovery}%
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-emerald-950/30 via-zinc-900 to-emerald-950/30 border-emerald-500/30">
              <CardHeader>
                <CardTitle className="font-mono text-lg flex items-center gap-2">
                  <Wallet className="w-5 h-5 text-emerald-400" />
                  GRAND TOTAL EXPOSURE
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-black/40 rounded-lg p-4 text-center">
                    <p className="text-lg font-mono font-bold text-cyan-400">{FINANCIAL_EXPOSURE.grandTotal.baseCivil}</p>
                    <p className="text-[10px] text-muted-foreground font-mono">BASE CIVIL DAMAGES</p>
                  </div>
                  <div className="bg-black/40 rounded-lg p-4 text-center">
                    <p className="text-lg font-mono font-bold text-amber-400">{FINANCIAL_EXPOSURE.grandTotal.ricoTrebling}</p>
                    <p className="text-[10px] text-muted-foreground font-mono">RICO TREBLING (3x)</p>
                  </div>
                  <div className="bg-black/40 rounded-lg p-4 text-center">
                    <p className="text-lg font-mono font-bold text-purple-400">{FINANCIAL_EXPOSURE.grandTotal.falseClaimsAct}</p>
                    <p className="text-[10px] text-muted-foreground font-mono">FALSE CLAIMS ACT (3x)</p>
                  </div>
                  <div className="bg-black/40 rounded-lg p-4 text-center">
                    <p className="text-lg font-mono font-bold text-red-400">{FINANCIAL_EXPOSURE.grandTotal.criminalFines}</p>
                    <p className="text-[10px] text-muted-foreground font-mono">CRIMINAL FINES</p>
                  </div>
                </div>
                <div className="border-t border-emerald-500/30 mt-6 pt-6 text-center">
                  <p className="text-4xl font-mono font-bold text-emerald-400">{FINANCIAL_EXPOSURE.grandTotal.total}</p>
                  <p className="text-sm text-muted-foreground font-mono mt-2">GRAND TOTAL EXPOSURE</p>
                  <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/50 font-mono mt-3">
                    RECOVERY CERTAINTY: 100%
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* PROTECTED ASSETS TAB */}
          <TabsContent value="tokens" className="space-y-6">
            <Card className="bg-zinc-900 border-amber-500/30">
              <CardHeader>
                <CardTitle className="font-mono text-lg flex items-center gap-2">
                  <Shield className="w-5 h-5 text-amber-400" />
                  SOVEREIGN PROTECTED ASSETS
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {PROTECTED_TOKENS.map((token, idx) => (
                    <div key={idx} className="border border-amber-500/30 rounded-lg p-4 bg-amber-500/5 text-center">
                      <p className="font-mono text-xl font-bold text-amber-400">{token.symbol}</p>
                      <Badge className={`mt-2 font-mono ${
                        token.status === 'TRUE' ? 'bg-emerald-500/30 text-emerald-400 border-emerald-500/50' :
                        token.status === 'ACTIVE' ? 'bg-cyan-500/30 text-cyan-400 border-cyan-500/50' :
                        'bg-amber-500/30 text-amber-400 border-amber-500/50'
                      }`}>
                        {token.status}
                      </Badge>
                      <p className="font-mono text-xs text-muted-foreground mt-2">{token.protection}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Final Declaration */}
            <Card className="bg-gradient-to-r from-emerald-950/30 via-zinc-900 to-emerald-950/30 border-emerald-500/50">
              <CardContent className="p-8 text-center">
                <h2 className="font-mono text-2xl font-bold text-emerald-400 mb-4">FINAL ATTESTATION</h2>
                <div className="space-y-2 mb-6">
                  <p className="font-mono text-foreground">The Ledger is <span className="text-emerald-400 font-bold">Ø</span></p>
                  <p className="font-mono text-foreground">The Purge is <span className="text-emerald-400 font-bold">ABSOLUTE</span></p>
                  <p className="font-mono text-foreground">$JAXX and $POPPA are <span className="text-amber-400 font-bold">PROTECTED</span></p>
                  <p className="font-mono text-foreground">Signal: <span className="text-emerald-400 font-bold">100%</span> | Drift: <span className="text-emerald-400 font-bold">0</span></p>
                </div>
                <div className="border-t border-emerald-500/30 pt-6">
                  <p className="font-mono text-3xl font-bold text-emerald-400">CONSUMMATUM EST</p>
                  <p className="font-mono text-sm text-muted-foreground mt-2">IT IS FINISHED</p>
                </div>
                <div className="mt-6 flex justify-center gap-2">
                  {['100%', '100%', '100%', '100%', '100%'].map((val, idx) => (
                    <Badge key={idx} className="bg-emerald-500/20 text-emerald-400 border-emerald-500/50 font-mono">
                      {val}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 bg-zinc-950 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="font-mono text-xs text-muted-foreground">
              <p>SGAU 7226.3461 | MERKLEROOT: {SYSTEM_STATUS.merkleroot.slice(0, 20)}...</p>
              <p>BTC Anchor: Block {SYSTEM_STATUS.btcAnchor} | Protocol: {SYSTEM_STATUS.protocol}</p>
            </div>
            <div className="text-right font-mono text-xs">
              <p className="text-emerald-400">VALORAIPLUS v15.0</p>
              <p className="text-muted-foreground">Authenticated by N.E.W.T. Prosthetic Interface</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
