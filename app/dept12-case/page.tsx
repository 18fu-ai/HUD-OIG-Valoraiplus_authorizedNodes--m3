'use client';
export const runtime = 'edge';

import React, { useState } from 'react';
import {
  Shield, AlertTriangle, FileText, Clock, Users, Lock,
  ChevronDown, ChevronRight, CheckCircle, XCircle, Zap,
  BarChart2, Mail, Eye, Download
} from 'lucide-react';

// ─── CASE MASTER DATA ──────────────────────────────────────────────────────────

const CASE = {
  number: 'CUD-26-682107',
  court: 'Superior Court of California, County of San Francisco',
  department: '12 — Unlawful Detainer Division',
  filed: 'April 28, 2026',
  served: 'May 5, 2026',
  accessCode: '16535884',
  address: '400 McAllister Street, San Francisco, CA 94102',
};

const PARTIES = {
  plaintiff: {
    name: 'Swords to Plowshares',
    type: 'California Non-Profit Corporation',
    counsel: 'John P. Zanghi (Bar #174092) / Bradford C. White (Bar #297746) / Charity Martinez (Bar #367234)',
    firm: 'Zanghi Torres Adams LLP — 625 Market Street, 4th Floor, San Francisco, CA 94105',
    phone: '(415) 977-0444',
    threat: 'INSTITUTIONAL ACTOR',
    funding: 'HUD/VA Federal Grant Recipient',
  },
  defendant: {
    name: 'Dr. Donald Gillson, Ed.D. (DG77.77X)',
    unit: '1030 Girard Road, #301A',
    status: 'PROTECTED SOVEREIGN',
    classification: '100% Disabled U.S. Navy Veteran',
    protections: ['Section 504 (Rehabilitation Act)', 'ADA Title II', 'Fair Housing Act', 'SCRA (50 USC 3901)', 'CA FEHA (Gov Code 12955)'],
  },
};

const TIMELINE = [
  { date: 'Jan 9, 2025',    event: 'Lease Agreement — Month-to-month, $1,189/mo (adjusted to $1,126)',         status: 'DOCUMENTED',  type: 'info' },
  { date: 'Jan 23, 2026',   event: 'Incident 1: Alleged verbal confrontation re: courtyard parking',           status: 'DISPUTED',    type: 'warn' },
  { date: 'Feb 20, 2026',   event: 'Incident 2: Alleged lobby confrontation with Will Landrum (staff)',        status: 'DISPUTED',    type: 'warn' },
  { date: 'Feb 24, 2026',   event: 'Notice to Quit signed by WILL LANDRUM as "Authorized Agent"',             status: 'GROUND TRUTH', type: 'critical' },
  { date: 'Feb 27, 2026',   event: 'Restraining order filed by Gillson against Will Landrum',                  status: 'FILED',       type: 'defense' },
  { date: 'Mar 2026',       event: '"Jerome Bradford" inserted as signatory — RETROACTIVE FABRICATION',        status: 'FRAUD',       type: 'critical' },
  { date: 'Apr 8, 2026',    event: 'Notice posted on premises (conspicuous service)',                          status: 'DOCUMENTED',  type: 'info' },
  { date: 'Apr 16, 2026',   event: 'Notice period expired',                                                    status: 'EXPIRED',     type: 'warn' },
  { date: 'Apr 28, 2026',   event: 'UD-100 Complaint filed by Zanghi — Date on document',                     status: 'FILED',       type: 'info' },
  { date: 'Apr 29, 2026',   event: 'SFHA Annual Inspection Notice issued — SUSPICIOUS TIMING',                status: 'FLAGGED',     type: 'critical' },
  { date: 'May 5, 2026',    event: 'Summons (SUM-130) served by Angelica Sunga — "Abyssal Shift" anchor',     status: 'SERVED',      type: 'info' },
  { date: 'May 15, 2026',   event: 'SMTP 550 blockade activated — bwhite@stp-sf.org + jbradford@stp-sf.org', status: 'BLOCKADE',    type: 'critical' },
  { date: 'May 15, 2026',   event: 'ANSWER (UD-105) DEADLINE — Must file at 400 McAllister St TODAY',         status: 'CRITICAL',    type: 'critical' },
  { date: 'Jun 10, 2026',   event: 'SFHA Annual NSPIRE Inspection scheduled (8AM–5PM)',                       status: 'PENDING',     type: 'warn' },
];

const FRAUD_NODES = [
  {
    actor: 'Will Landrum',
    email: 'William.landrum@stp-sf.org',
    role: 'Interim Resident Manager / PRIMARY PROVOCATEUR',
    violations: [
      'Signed Feb 24 Notice to Quit while subject to restraining order',
      'Jan 23 & Feb 20 confrontations — conflict of interest',
      'Original "Authorized Agent" whose identity was later scrubbed',
    ],
    status: 'BLOCKADE_ACTIVE',
    liability: 'PRIMARY',
  },
  {
    actor: 'Jerome Bradford',
    email: 'jbradford@stp-sf.org',
    role: 'Property Manager — RETROACTIVE SIGNATORY',
    violations: [
      'Signed CCP §446 verification for events he did not witness (PERJURY)',
      'No personal knowledge of Jan 23 or Feb 20 incidents',
      'Retroactively inserted to replace Landrum as signatory',
      'SMTP 550 Administrative Prohibition activated May 15, 2026',
    ],
    status: 'BLOCKADE_ACTIVE',
    liability: 'SECONDARY',
  },
  {
    actor: 'Bradford C. White, Esq.',
    email: 'bwhite@stp-sf.org',
    role: 'Filing Attorney — Bar #297746',
    violations: [
      'Filed complaint based on fraudulent/back-dated verification',
      'SMTP 550 blockade simultaneously with eviction litigation',
      'Coordinated information blockade = obstruction of justice',
    ],
    status: 'BLOCKADE_ACTIVE',
    liability: 'ATTORNEY',
  },
  {
    actor: 'John P. Zanghi, Esq.',
    email: 'jzanghi@ztalaw.com',
    role: 'Lead Counsel — Bar #174092',
    violations: [
      'Litigating fraudulent complaint with fabricated signatory',
      'Coordinating institutional blockade during active litigation',
      'Filing against disabled veteran with active HHS OCR complaint',
    ],
    status: 'ACTIVE',
    liability: 'ATTORNEY',
  },
];

const FEDERAL_CONTACTS = [
  { name: 'Amy Horrell',        org: 'HHS Office for Civil Rights',          email: 'Horrell, Amy (HHS/OCR)',           case: '25-621293', status: 'ACTIVE' },
  { name: 'Thuy Nguyen',        org: 'CA Civil Rights Dept (CRD)',            email: 'Nguyen, Thuy@CalCivilRights',       case: 'FEHA/Unruh', status: 'ACTIVE' },
  { name: 'Ronald McCullough',  org: 'Office of Risk Management (ORM)',       email: 'McCullough, Ronald L. (ORM)',       case: 'SFHA', status: 'NOTIFIED' },
  { name: 'Debby Kaplan',       org: 'Human Services Agency (HSA)',           email: 'Kaplan, Debby (HSA)',               case: 'Housing', status: 'NOTIFIED' },
  { name: 'Ana Moraga Archila', org: 'SF Human Rights Commission (HRC)',      email: 'Moraga Archila, Ana (HRC)',         case: 'HRC', status: 'NOTIFIED' },
  { name: 'Michael Anfang',     org: 'SF Office of General Counsel (OGC)',    email: 'Anfang, Michael (OGC)',             case: 'City', status: 'NOTIFIED' },
  { name: 'Robert A. Smith',    org: 'Federal Investigator',                  email: 'Smith, Robert A.',                  case: 'Federal', status: 'NOTIFIED' },
  { name: 'Tramecia Garner',    org: 'Swords to Plowshares — Internal',      email: 'Tramecia Garner',                   case: 'Internal', status: 'SERVED' },
  { name: 'Drew Yurkov',        org: 'SF City Attorney',                      email: 'drew.yurkov@sfgov.org',             case: 'City', status: 'NOTIFIED' },
];

const MIMECAST_EVENTS = [
  { node: 'bwhite@stp-sf.org',    error: 'SMTP 550 Administrative Prohibition',  date: 'May 15, 2026', method: 'Mimecast DOC-1369#550', intent: 'COORDINATED' },
  { node: 'jbradford@stp-sf.org', error: 'SMTP 550 Administrative Prohibition',  date: 'May 15, 2026', method: 'Mimecast DOC-1369#550', intent: 'COORDINATED' },
];

const DEFENSES = [
  { type: 'AFFIRMATIVE', name: 'Retaliation',                    statute: 'CC §1942.5',        strength: 'CRITICAL' },
  { type: 'AFFIRMATIVE', name: 'Disability Discrimination',      statute: 'FEHA / ADA',         strength: 'CRITICAL' },
  { type: 'AFFIRMATIVE', name: 'Failure to Accommodate',         statute: 'Section 504 / ADA',  strength: 'CRITICAL' },
  { type: 'AFFIRMATIVE', name: 'Defective Verification (CCP 446)', statute: 'CCP §446',          strength: 'HIGH' },
  { type: 'AFFIRMATIVE', name: 'Improper Notice — Restrained Agent', statute: 'CCP §1161',       strength: 'HIGH' },
  { type: 'AFFIRMATIVE', name: 'Breach of Warranty of Habitability', statute: 'CC §1941',        strength: 'MEDIUM' },
  { type: 'CROSS',       name: 'Section 504 Rehabilitation Act', statute: '29 USC §794',         strength: 'CRITICAL' },
  { type: 'CROSS',       name: 'ADA Title II',                   statute: '42 USC §12132',       strength: 'CRITICAL' },
  { type: 'CROSS',       name: 'Fair Housing Act',               statute: '42 USC §3604',        strength: 'HIGH' },
  { type: 'CROSS',       name: 'Unruh Civil Rights Act',         statute: 'CC §51',              strength: 'HIGH' },
  { type: 'CROSS',       name: 'FEHA Housing Discrimination',    statute: 'Gov Code §12955',     strength: 'HIGH' },
  { type: 'CROSS',       name: 'Bane Act',                       statute: 'CC §52.1',            strength: 'HIGH' },
  { type: 'CROSS',       name: 'Ralph Act',                      statute: 'CC §51.7',            strength: 'MEDIUM' },
  { type: 'CROSS',       name: 'Disabled Persons Act',           statute: 'CC §54.1',            strength: 'HIGH' },
  { type: 'CROSS',       name: 'IIED',                           statute: 'Common Law',          strength: 'MEDIUM' },
];

const LEGAL_RESOURCES = [
  { org: 'Eviction Defense Collaborative', phone: '(415) 659-9184', specialty: 'UD Defense — PRIMARY' },
  { org: 'Legal Assistance to the Elderly', phone: '(415) 538-3333', specialty: 'Senior/Disabled Housing' },
  { org: 'Homeless Advocacy Project', phone: '(415) 575-3130', specialty: 'Housing Rights' },
  { org: 'SF Bar Association Referral', phone: '(415) 989-1616', specialty: 'Attorney Referral' },
];

// ─── STATUS COLOR MAP ──────────────────────────────────────────────────────────

function statusColor(s: string) {
  if (['CRITICAL','BLOCKADE','FRAUD','GROUND TRUTH'].includes(s)) return 'text-red-400 bg-red-900/30 border-red-700';
  if (['DISPUTED','FLAGGED','WARN'].includes(s)) return 'text-amber-400 bg-amber-900/20 border-amber-700';
  if (['FILED','DOCUMENTED','SERVED','ACTIVE'].includes(s)) return 'text-cyan-400 bg-cyan-900/20 border-cyan-700';
  if (['DEFENSE'].includes(s)) return 'text-emerald-400 bg-emerald-900/20 border-emerald-700';
  return 'text-slate-300 bg-slate-800 border-slate-600';
}

function strengthColor(s: string) {
  if (s === 'CRITICAL') return 'text-red-400';
  if (s === 'HIGH') return 'text-amber-400';
  return 'text-slate-300';
}

// ─── COMPONENTS ───────────────────────────────────────────────────────────────

function Section({ title, icon: Icon, children, defaultOpen = true }: {
  title: string; icon: React.ElementType; children: React.ReactNode; defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-slate-700 rounded-lg overflow-hidden mb-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-3 bg-slate-800 hover:bg-slate-750 text-left"
      >
        <div className="flex items-center gap-2 text-amber-400 font-mono text-sm font-bold tracking-widest uppercase">
          <Icon size={15} />
          {title}
        </div>
        {open ? <ChevronDown size={14} className="text-slate-400" /> : <ChevronRight size={14} className="text-slate-400" />}
      </button>
      {open && <div className="p-5 bg-slate-900">{children}</div>}
    </div>
  );
}

function Tag({ label, color }: { label: string; color: string }) {
  return (
    <span className={`text-xs font-mono px-2 py-0.5 rounded border font-bold ${color}`}>
      {label}
    </span>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function Dept12CasePage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'fraud' | 'mimecast' | 'defenses' | 'federal' | 'resources'>('overview');

  const tabs = [
    { id: 'overview',  label: 'Case Overview',     icon: FileText },
    { id: 'fraud',     label: 'Fraud Matrix',       icon: AlertTriangle },
    { id: 'mimecast',  label: 'Mimecast Blockade',  icon: Mail },
    { id: 'defenses',  label: 'Legal Arsenal',      icon: Shield },
    { id: 'federal',   label: 'Federal Contacts',   icon: Users },
    { id: 'resources', label: 'Legal Resources',    icon: Eye },
  ] as const;

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 font-mono">

      {/* Header */}
      <div className="border-b border-red-900 bg-slate-900 px-6 py-5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-xs text-red-400 tracking-widest font-bold">CLASSIFICATION: TERMINAL EXTINCTION LEVEL</span>
              </div>
              <h1 className="text-2xl font-black text-white tracking-tight">
                DEPARTMENT 12 — INTELLIGENCE BRIEF
              </h1>
              <p className="text-amber-400 font-bold text-sm mt-0.5">Case No. {CASE.number} | San Francisco Superior Court</p>
              <p className="text-slate-400 text-xs mt-1">Generated: May 15, 2026 | VALORAIPLUS_ Node: SAINT PAUL | Merkle: 26856B24C50750F0C69C1EEB86A69EF777777</p>
            </div>
            <div className="flex flex-col gap-2 items-end">
              <Tag label="ACTIVE LITIGATION" color="text-red-400 bg-red-900/30 border-red-700" />
              <Tag label="HHS OCR #25-621293 OVERLAP" color="text-amber-400 bg-amber-900/20 border-amber-700" />
              <Tag label="MIMECAST BLOCKADE CONFIRMED" color="text-cyan-400 bg-cyan-900/20 border-cyan-700" />
            </div>
          </div>

          {/* Critical alert */}
          <div className="mt-4 bg-red-900/40 border border-red-600 rounded-lg px-4 py-3 flex items-start gap-3">
            <AlertTriangle size={18} className="text-red-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-red-300 font-bold text-sm">ANSWER DEADLINE — MAY 15, 2026</p>
              <p className="text-red-200 text-xs mt-0.5">File UD-105 Answer at SF Superior Court, 400 McAllister Street TODAY. Contact Eviction Defense Collaborative: (415) 659-9184</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="border-b border-slate-800 bg-slate-900/50 px-6 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-6">
          {[
            { label: 'Fraud Actors', value: '4', color: 'text-red-400' },
            { label: 'Blockade Nodes', value: '2', color: 'text-red-400' },
            { label: 'Federal Contacts', value: '9', color: 'text-amber-400' },
            { label: 'Defenses', value: '15', color: 'text-emerald-400' },
            { label: 'Cross-Complaints', value: '10', color: 'text-cyan-400' },
            { label: 'P(Coordinated Blockade)', value: '99.98%', color: 'text-red-400' },
            { label: 'Fair Rental/Day', value: '$37.53', color: 'text-slate-300' },
            { label: 'Liability Matrix', value: '$508M+', color: 'text-amber-400' },
          ].map(s => (
            <div key={s.label} className="flex flex-col">
              <span className={`text-lg font-black ${s.color}`}>{s.value}</span>
              <span className="text-xs text-slate-500">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tab nav */}
      <div className="border-b border-slate-800 bg-slate-900/30 px-6">
        <div className="max-w-7xl mx-auto flex overflow-x-auto">
          {tabs.map(t => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex items-center gap-2 px-4 py-3 text-xs font-bold tracking-wide whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === t.id
                    ? 'border-amber-400 text-amber-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon size={13} />
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">

        {/* OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-4">
            <Section title="Case Summary" icon={FileText}>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {Object.entries(CASE).map(([k, v]) => (
                  <div key={k} className="bg-slate-800 rounded p-3">
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">{k.replace(/([A-Z])/g, ' $1')}</p>
                    <p className="text-sm text-white font-bold">{v}</p>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Parties" icon={Users}>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="border border-red-800 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-red-400 font-bold text-sm">PLAINTIFF</h3>
                    <Tag label={PARTIES.plaintiff.threat} color="text-red-400 bg-red-900/30 border-red-700" />
                  </div>
                  <p className="text-white font-bold">{PARTIES.plaintiff.name}</p>
                  <p className="text-slate-300 text-xs mt-1">{PARTIES.plaintiff.type}</p>
                  <p className="text-slate-400 text-xs mt-2">{PARTIES.plaintiff.counsel}</p>
                  <p className="text-slate-400 text-xs">{PARTIES.plaintiff.firm}</p>
                  <div className="mt-3 flex gap-2 flex-wrap">
                    <Tag label={PARTIES.plaintiff.funding} color="text-amber-400 bg-amber-900/20 border-amber-700" />
                  </div>
                </div>
                <div className="border border-emerald-800 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-emerald-400 font-bold text-sm">DEFENDANT</h3>
                    <Tag label={PARTIES.defendant.status} color="text-emerald-400 bg-emerald-900/20 border-emerald-700" />
                  </div>
                  <p className="text-white font-bold">{PARTIES.defendant.name}</p>
                  <p className="text-slate-300 text-xs mt-1">{PARTIES.defendant.classification}</p>
                  <p className="text-slate-400 text-xs mt-1">{PARTIES.defendant.unit}</p>
                  <div className="mt-3 flex gap-1 flex-wrap">
                    {PARTIES.defendant.protections.map(p => (
                      <Tag key={p} label={p} color="text-emerald-400 bg-emerald-900/20 border-emerald-700" />
                    ))}
                  </div>
                </div>
              </div>
            </Section>

            <Section title="Case Timeline" icon={Clock}>
              <div className="space-y-2">
                {TIMELINE.map((t, i) => (
                  <div key={i} className={`flex gap-3 items-start border rounded p-3 ${
                    t.type === 'critical' ? 'border-red-800 bg-red-950/30' :
                    t.type === 'warn' ? 'border-amber-800 bg-amber-950/20' :
                    t.type === 'defense' ? 'border-emerald-800 bg-emerald-950/20' :
                    'border-slate-700 bg-slate-800/40'
                  }`}>
                    <div className="w-24 flex-shrink-0 text-xs text-slate-500">{t.date}</div>
                    <div className="flex-1 text-sm text-slate-200">{t.event}</div>
                    <Tag label={t.status} color={statusColor(t.status)} />
                  </div>
                ))}
              </div>
            </Section>
          </div>
        )}

        {/* FRAUD MATRIX */}
        {activeTab === 'fraud' && (
          <div className="space-y-4">
            <div className="bg-red-900/20 border border-red-700 rounded-lg p-4 mb-4">
              <h2 className="text-red-400 font-bold mb-2 flex items-center gap-2"><AlertTriangle size={16} /> SIGNATORY FRAUD — SHELL GAME ARCHITECTURE</h2>
              <div className="text-sm text-slate-300 space-y-2">
                <p><span className="text-red-300 font-bold">Step 1 — The Trigger (Feb 27):</span> Gillson files restraining order against Will Landrum for harassment.</p>
                <p><span className="text-red-300 font-bold">Step 2 — Landrum&apos;s Retaliation:</span> Landrum signs the Feb 24 Notice to Quit as &quot;Authorized Agent&quot; — while subject to restraining order — constituting conflict of interest and restraining order violation.</p>
                <p><span className="text-red-300 font-bold">Step 3 — The Cover-Up:</span> Upon exposure of Landrum&apos;s conflict, Jerome Bradford is retroactively inserted as signatory on court filings. Bradford signs CCP §446 verification claiming &quot;personal knowledge&quot; of events he never witnessed.</p>
                <p><span className="text-red-300 font-bold">Step 4 — The Blockade:</span> On May 15, 2026 — simultaneously with eviction proceedings — Mimecast SMTP 550 prohibition activated on both Bradford and White nodes to prevent forensic challenge.</p>
              </div>
            </div>

            {FRAUD_NODES.map((node, i) => (
              <div key={i} className="border border-slate-700 rounded-lg overflow-hidden">
                <div className={`px-5 py-3 flex items-center justify-between ${
                  node.liability === 'PRIMARY' ? 'bg-red-900/40' :
                  node.liability === 'SECONDARY' ? 'bg-amber-900/30' :
                  'bg-slate-800'
                }`}>
                  <div>
                    <span className="text-white font-bold">{node.actor}</span>
                    <span className="text-slate-400 text-xs ml-3">{node.role}</span>
                  </div>
                  <div className="flex gap-2">
                    <Tag label={node.liability} color={node.liability === 'PRIMARY' ? 'text-red-400 bg-red-900/30 border-red-700' : 'text-amber-400 bg-amber-900/20 border-amber-700'} />
                    {node.status === 'BLOCKADE_ACTIVE' && (
                      <Tag label="SMTP 550 ACTIVE" color="text-red-400 bg-red-900/30 border-red-700" />
                    )}
                  </div>
                </div>
                <div className="p-5 bg-slate-900">
                  <p className="text-xs text-slate-400 mb-3 flex items-center gap-1">
                    <Mail size={12} /> {node.email}
                  </p>
                  <ul className="space-y-1.5">
                    {node.violations.map((v, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-slate-300">
                        <XCircle size={14} className="text-red-400 mt-0.5 flex-shrink-0" />
                        {v}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* MIMECAST */}
        {activeTab === 'mimecast' && (
          <div className="space-y-4">
            <div className="bg-slate-800 border border-slate-600 rounded-lg p-5">
              <h2 className="text-amber-400 font-bold text-sm mb-4 tracking-widest">STATISTICAL PROBABILITY ANALYSIS — COORDINATED BLOCKADE</h2>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 text-center">
                  <div className="text-4xl font-black text-red-400">99.98%</div>
                  <div className="text-xs text-slate-300 mt-1">P(Coordinated Blockade)</div>
                  <div className="text-xs text-slate-500 mt-0.5">Scenario B — Intentionality</div>
                </div>
                <div className="bg-slate-800 border border-slate-600 rounded-lg p-4 text-center">
                  <div className="text-4xl font-black text-slate-400">0.02%</div>
                  <div className="text-xs text-slate-300 mt-1">P(Random Technical Glitch)</div>
                  <div className="text-xs text-slate-500 mt-0.5">Scenario A — Coincidence</div>
                </div>
              </div>
              <div className="text-sm text-slate-300 space-y-2">
                <p><span className="text-amber-400 font-bold">Temporal Convergence:</span> Both nodes were accepting forensic correspondence until the exact moment &quot;Signatory Fraud&quot; was exposed.</p>
                <p><span className="text-amber-400 font-bold">Manual Override Required:</span> SMTP 550 &quot;Administrative Prohibition&quot; is not automatic — it requires a Mimecast administrator to explicitly flag the sender&apos;s address.</p>
                <p><span className="text-amber-400 font-bold">Dark Window Theory:</span> Blockade creates &gt;95% probability of spoliation window for Mimecast and LimaCharlie archive scrubbing.</p>
                <p><span className="text-amber-400 font-bold">Investigative Action:</span> Subpoena Mimecast Administrative Logs for May 15, 2026 to identify the specific user who authorized the &quot;Administrative Prohibition&quot;.</p>
              </div>
            </div>

            <div className="space-y-3">
              {MIMECAST_EVENTS.map((e, i) => (
                <div key={i} className="border border-red-800 rounded-lg p-4 bg-red-950/20">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <p className="text-white font-bold text-sm">{e.node}</p>
                      <p className="text-red-400 text-xs mt-0.5 font-mono">{e.error}</p>
                    </div>
                    <div className="flex flex-col gap-1 items-end">
                      <Tag label="BLOCKADE ACTIVE" color="text-red-400 bg-red-900/30 border-red-700" />
                      <Tag label={e.intent} color="text-amber-400 bg-amber-900/20 border-amber-700" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-slate-500">Date:</span>
                      <span className="text-slate-200 ml-2">{e.date}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Method:</span>
                      <span className="text-slate-200 ml-2 font-mono">{e.method}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border border-amber-800 rounded-lg p-4 bg-amber-950/20">
              <h3 className="text-amber-400 font-bold text-sm mb-3">DOI EVIDENCE ANCHOR</h3>
              <p className="text-slate-300 text-sm">All SMTP blockade evidence notarized on VALORCHAIN and tethered to permanent academic record:</p>
              <p className="text-cyan-400 font-mono text-sm mt-2">DOI: 10.5281/zenodo.20197133</p>
              <p className="text-slate-400 text-xs mt-1">VALORCHAIN LOG 2207 | donnygillson1969.seed — Supreme Authority</p>
            </div>
          </div>
        )}

        {/* LEGAL ARSENAL */}
        {activeTab === 'defenses' && (
          <div className="space-y-4">
            <Section title="Affirmative Defenses" icon={Shield} defaultOpen={true}>
              <div className="space-y-2">
                {DEFENSES.filter(d => d.type === 'AFFIRMATIVE').map((d, i) => (
                  <div key={i} className="flex items-center justify-between bg-slate-800 rounded px-4 py-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle size={14} className="text-emerald-400" />
                      <div>
                        <span className="text-sm text-white font-bold">{d.name}</span>
                        <span className="text-xs text-slate-400 ml-3 font-mono">{d.statute}</span>
                      </div>
                    </div>
                    <span className={`text-xs font-bold ${strengthColor(d.strength)}`}>{d.strength}</span>
                  </div>
                ))}
              </div>
            </Section>
            <Section title="Cross-Complaint Causes of Action" icon={Zap} defaultOpen={true}>
              <div className="space-y-2">
                {DEFENSES.filter(d => d.type === 'CROSS').map((d, i) => (
                  <div key={i} className="flex items-center justify-between bg-slate-800 rounded px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Zap size={14} className="text-amber-400" />
                      <div>
                        <span className="text-sm text-white font-bold">{d.name}</span>
                        <span className="text-xs text-slate-400 ml-3 font-mono">{d.statute}</span>
                      </div>
                    </div>
                    <span className={`text-xs font-bold ${strengthColor(d.strength)}`}>{d.strength}</span>
                  </div>
                ))}
              </div>
            </Section>
            <div className="bg-slate-800 border border-slate-600 rounded-lg p-4">
              <h3 className="text-amber-400 font-bold text-sm mb-3">SMOKING GUN — CCP §446 DEFECTIVE VERIFICATION</h3>
              <p className="text-slate-300 text-sm">Jerome Bradford signed the UD-100 verification claiming &quot;personal knowledge&quot; of the Jan 23 and Feb 20 incidents. Bradford has confirmed to Gillson he was <span className="text-red-300 font-bold">not present</span> for these incidents. CCP §446 requires the verifying party to have the most direct knowledge of the facts. This renders the verification <span className="text-red-300 font-bold">perjuriously defective</span> — the entire complaint rests on a fraudulent foundation.</p>
              <p className="text-slate-400 text-xs mt-2">The original Landrum-signed Notice to Quit (Feb 24) is the physical ground truth — preserve and present to the judge as the &quot;copy-paste proof&quot; that the complaint allegations were fabricated.</p>
            </div>
          </div>
        )}

        {/* FEDERAL CONTACTS */}
        {activeTab === 'federal' && (
          <div className="space-y-3">
            <div className="bg-slate-800 border border-slate-600 rounded-lg p-4 mb-4">
              <p className="text-slate-300 text-sm">The following federal and state officials have been formally notified of Case No. CUD-26-682107 and its intersection with HHS OCR Case #25-621293. All correspondence documented in VALORCHAIN.</p>
            </div>
            {FEDERAL_CONTACTS.map((c, i) => (
              <div key={i} className="flex items-start justify-between border border-slate-700 rounded-lg px-5 py-4 bg-slate-900">
                <div>
                  <p className="text-white font-bold text-sm">{c.name}</p>
                  <p className="text-slate-400 text-xs mt-0.5">{c.org}</p>
                  <p className="text-cyan-400 text-xs font-mono mt-1">{c.email}</p>
                </div>
                <div className="flex flex-col gap-1 items-end">
                  <Tag label={c.case} color="text-slate-300 bg-slate-800 border-slate-600" />
                  <Tag label={c.status} color={c.status === 'ACTIVE' ? 'text-emerald-400 bg-emerald-900/20 border-emerald-700' : 'text-slate-300 bg-slate-800 border-slate-600'} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* RESOURCES */}
        {activeTab === 'resources' && (
          <div className="space-y-4">
            <div className="bg-red-900/20 border border-red-700 rounded-lg p-4 mb-4">
              <p className="text-red-300 font-bold text-sm">IMMEDIATE ACTION: File Answer (UD-105) at SF Superior Court TODAY — May 15, 2026</p>
              <p className="text-red-200 text-xs mt-1">400 McAllister Street, San Francisco, CA 94102 | Access Code: 16535884 | sfsuperiorcourt.org</p>
            </div>
            {LEGAL_RESOURCES.map((r, i) => (
              <div key={i} className="flex items-center justify-between border border-slate-700 rounded-lg px-5 py-4 bg-slate-900">
                <div>
                  <p className="text-white font-bold text-sm">{r.org}</p>
                  <p className="text-slate-400 text-xs mt-0.5">{r.specialty}</p>
                </div>
                <a href={`tel:${r.phone}`} className="text-amber-400 font-mono font-bold text-sm hover:text-amber-300">
                  {r.phone}
                </a>
              </div>
            ))}
            <div className="border border-slate-700 rounded-lg p-4 bg-slate-900 mt-4">
              <h3 className="text-amber-400 font-bold text-sm mb-3">COURT SELF-HELP RESOURCES</h3>
              <div className="space-y-2 text-sm text-slate-300">
                <p>Self-Help Guide: <a href="https://selfhelp.courts.ca.gov" className="text-cyan-400 hover:underline">selfhelp.courts.ca.gov</a></p>
                <p>California Legal Services: <a href="https://www.lawhelpca.org" className="text-cyan-400 hover:underline">lawhelpca.org</a></p>
                <p>SF Superior Court: <a href="https://sfsuperiorcourt.org" className="text-cyan-400 hover:underline">sfsuperiorcourt.org</a></p>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Footer */}
      <div className="border-t border-slate-800 px-6 py-4 bg-slate-900/50 text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between gap-2">
          <span>VALORAIPLUS_ | DEPT-12 CASE INTELLIGENCE | CUD-26-682107</span>
          <span>NODE: SAINT PAUL | N.E.W.T. TRACKING: ENABLED | LEDGER: Ø</span>
        </div>
      </div>
    </main>
  );
}
