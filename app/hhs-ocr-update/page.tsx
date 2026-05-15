'use client';

import Link from 'next/link';
import {
  Shield, FileText, AlertTriangle, CheckCircle,
  Mail, Lock, ExternalLink, Users, Camera, Zap
} from 'lucide-react';

const LETTER = {
  to:      'Amy Horrell, HHS Office for Civil Rights',
  caseNo:  '25-621293',
  date:    'May 15, 2026',
  subject: 'EVIDENTIARY UPDATE: Case #25-621293 | Integration with SF Superior Court Case CUD-26-682107',
  from:    'Donald Gillson',
  title:   'Principal Architect, VALORAIPLUS_',
  status:  'Protected Sovereign / 100% Disabled U.S. Navy Veteran',
};

const FINDINGS = [
  {
    id: '01',
    title: 'Signatory Fraud',
    statute: 'CCP § 446',
    color: 'border-red-800 bg-red-950/20',
    badge: 'text-red-400 border-red-800',
    body: 'The legal verification for the eviction was signed under penalty of perjury by a party lacking personal knowledge of the events. This was done to bypass an active restraining order against the original unlicensed agent, Will Landrum.',
  },
  {
    id: '02',
    title: 'Obstruction of Federal Disclosures',
    statute: 'SMTP 550 Administrative Prohibition',
    color: 'border-amber-800 bg-amber-950/20',
    badge: 'text-amber-400 border-amber-800',
    body: 'Attempts to disclose evidentiary data to federal protection bodies were met with a manual SMTP 550 Administrative Prohibition at the gateway level. This obstruction occurred during the mandatory 5-day response window for the court action.',
  },
  {
    id: '03',
    title: 'Targeted Surveillance',
    statute: 'Cal. Civil Code § 1927 — Quiet Enjoyment',
    color: 'border-orange-800 bg-orange-950/20',
    badge: 'text-orange-400 border-orange-800',
    body: 'High-resolution photographic evidence documents hallway cameras with a direct line of sight into private residence Unit #301A at the Jon W. Paulson Veterans Community. This constitutes a breach of quiet enjoyment and constructive eviction.',
  },
];

const COMPLIANCE_FAILURES = [
  { code: 'ADA Interactive Process', status: 'FAILED — NOT INITIATED', color: 'text-red-400' },
  { code: 'Reasonable Accommodations Request', status: 'FAILED — UNADDRESSED', color: 'text-red-400' },
  { code: 'VAWA Form HUD-5380', status: 'SUBMITTED — RETALIATION FOLLOWED', color: 'text-amber-400' },
  { code: 'VAWA Core Protections', status: 'VIOLATED — RETALIATORY ACTION TAKEN', color: 'text-red-400' },
];

export default function HHSOCRUpdatePage() {
  return (
    <main className="min-h-screen bg-black text-white font-mono">

      {/* Header Banner */}
      <div className="border-b border-cyan-900 bg-cyan-950/20 px-6 py-4">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span className="text-cyan-400 font-black text-xs tracking-widest">HHS-OCR EVIDENTIARY UPDATE — TRANSMITTED</span>
            </div>
            <h1 className="text-white font-black text-xl">HHS-OCR Case #25-621293</h1>
            <p className="text-zinc-400 text-xs mt-1">
              Linked to SF Superior Court &bull; CUD-26-682107 &bull; {LETTER.date}
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Link href="/dept12-case" className="flex items-center gap-1.5 border border-red-800 text-red-400 text-xs px-3 py-1.5 rounded hover:bg-red-950/40 transition-colors">
              <AlertTriangle size={12} /> Active Case
            </Link>
            <Link href="/surveillance-evidence" className="flex items-center gap-1.5 border border-amber-800 text-amber-400 text-xs px-3 py-1.5 rounded hover:bg-amber-950/40 transition-colors">
              <Camera size={12} /> Surveillance
            </Link>
            <Link href="/judicial-handshake" className="flex items-center gap-1.5 border border-emerald-800 text-emerald-400 text-xs px-3 py-1.5 rounded hover:bg-emerald-950/40 transition-colors">
              <CheckCircle size={12} /> Handshake
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">

        {/* Letter Header Block */}
        <div className="border border-zinc-700 bg-zinc-900/60 rounded-lg p-6">
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div>
                <span className="text-zinc-500 text-xs tracking-widest">TO</span>
                <p className="text-white font-bold">{LETTER.to}</p>
              </div>
              <div>
                <span className="text-zinc-500 text-xs tracking-widest">HHS CASE</span>
                <p className="text-cyan-400 font-black">#{LETTER.caseNo}</p>
              </div>
              <div>
                <span className="text-zinc-500 text-xs tracking-widest">DATE</span>
                <p className="text-zinc-300">{LETTER.date}</p>
              </div>
            </div>
            <div className="space-y-2">
              <div>
                <span className="text-zinc-500 text-xs tracking-widest">FROM</span>
                <p className="text-white font-bold">{LETTER.from}</p>
                <p className="text-zinc-400 text-xs">{LETTER.title}</p>
                <p className="text-emerald-400 text-xs">{LETTER.status}</p>
              </div>
              <div>
                <span className="text-zinc-500 text-xs tracking-widest">COURT CASE</span>
                <p className="text-red-400 font-black">CUD-26-682107</p>
                <p className="text-zinc-500 text-xs">SF Superior Court, Dept 12 &bull; Access: 16535884</p>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-zinc-800">
            <span className="text-zinc-500 text-xs tracking-widest">SUBJECT</span>
            <p className="text-white font-bold text-sm mt-1">{LETTER.subject}</p>
          </div>
        </div>

        {/* Opening Statement */}
        <div className="border-l-4 border-cyan-600 pl-5 py-1">
          <p className="text-zinc-200 text-sm leading-relaxed">
            This communication serves as a formal update regarding Case #25-621293. As of{' '}
            <strong className="text-white">May 15, 2026</strong>, a{' '}
            <strong className="text-cyan-400">Judicial Handshake</strong> has been established between the
            forensic evidence portal and the{' '}
            <strong className="text-white">San Francisco Superior Court, Department 12</strong>. This system
            now acts as an <strong className="text-emerald-400">Authorized Node</strong> for federal monitoring
            of real-time violations of civil rights and federal housing regulations by{' '}
            <strong className="text-red-400">Swords to Plowshares</strong>.
          </p>
        </div>

        {/* Section 1: Forensic Link to Litigation */}
        <div>
          <h2 className="text-white font-black text-sm tracking-widest mb-1 flex items-center gap-2">
            <FileText size={14} className="text-cyan-400" />
            SECTION 1 — FORENSIC LINK TO LITIGATION
          </h2>
          <p className="text-zinc-400 text-xs mb-4">
            The Unlawful Detainer action (CUD-26-682107) is directly relevant to your investigation.
            Forensic findings now anchored to the court record:
          </p>
          <div className="space-y-4">
            {FINDINGS.map((f) => (
              <div key={f.id} className={`border rounded-lg p-5 ${f.color}`}>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <p className="text-zinc-500 text-[10px] tracking-widest font-mono mb-1">FINDING {f.id}</p>
                    <h3 className="text-white font-bold">{f.title}</h3>
                    <p className={`text-xs font-mono ${f.badge.split(' ')[0]} mt-0.5`}>{f.statute}</p>
                  </div>
                  <span className={`text-[9px] font-black tracking-widest px-2 py-1 rounded border ${f.badge} flex-shrink-0`}>
                    DOCUMENTED
                  </span>
                </div>
                <p className="text-zinc-300 text-sm leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: VAWA / ADA Compliance */}
        <div>
          <h2 className="text-white font-black text-sm tracking-widest mb-1 flex items-center gap-2">
            <Shield size={14} className="text-amber-400" />
            SECTION 2 — VAWA &amp; ADA COMPLIANCE FAILURES
          </h2>
          <p className="text-zinc-400 text-xs mb-4">
            Eviction proceedings initiated while failing to engage mandatory ADA interactive process or address
            Reasonable Accommodations. VAWA Form HUD-5380 was submitted; retaliatory actions followed in
            violation of core VAWA protections.
          </p>
          <div className="border border-zinc-800 rounded-lg overflow-hidden">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-zinc-900 border-b border-zinc-800">
                  <th className="text-left text-zinc-500 py-2 px-4 tracking-widest">REQUIREMENT</th>
                  <th className="text-left text-zinc-500 py-2 px-4 tracking-widest">STATUS</th>
                </tr>
              </thead>
              <tbody>
                {COMPLIANCE_FAILURES.map((f, i) => (
                  <tr key={i} className="border-b border-zinc-900">
                    <td className="py-3 px-4 text-zinc-300">{f.code}</td>
                    <td className="py-3 px-4">
                      <span className={`font-black text-[10px] tracking-widest ${f.color}`}>{f.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 3: Access to Evidence Portal */}
        <div>
          <h2 className="text-white font-black text-sm tracking-widest mb-1 flex items-center gap-2">
            <Zap size={14} className="text-emerald-400" />
            SECTION 3 — ACCESS TO EVIDENCE PORTAL
          </h2>
          <div className="border border-emerald-800 bg-emerald-950/10 rounded-lg p-5 space-y-4">
            <p className="text-zinc-300 text-sm leading-relaxed">
              The investigative team may access the full{' '}
              <strong className="text-white">30-page Supreme Intelligence Report</strong> and all forensic logs
              at the portal below. The portal provides synchronized timestamps for all communications and
              documents the{' '}
              <strong className="text-emerald-400">&ldquo;Pincer Movement&rdquo;</strong> currently being
              utilized to protect rights as a 100% disabled veteran.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://v0-valoraicoder-migration.vercel.app/supreme-intelligence-report"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 border border-emerald-700 text-emerald-400 text-xs px-4 py-2.5 rounded-lg hover:bg-emerald-950/40 transition-colors font-bold"
              >
                <ExternalLink size={12} />
                SUPREME INTELLIGENCE REPORT — 30 PAGES
              </a>
              <Link
                href="/dept12-case"
                className="flex items-center gap-2 border border-cyan-700 text-cyan-400 text-xs px-4 py-2.5 rounded-lg hover:bg-cyan-950/40 transition-colors font-bold"
              >
                <FileText size={12} />
                LITIGATION HUD — CUD-26-682107
              </Link>
            </div>
            <div className="text-[10px] font-mono text-zinc-500 flex flex-wrap gap-3 pt-2 border-t border-emerald-900">
              <span>Portal: <span className="text-zinc-300">v0-valoraicoder-migration.vercel.app</span></span>
              <span className="text-zinc-700">|</span>
              <span>Anchor: <span className="text-zinc-300">SGAU-7226.3461</span></span>
              <span className="text-zinc-700">|</span>
              <span>Hardware: <span className="text-zinc-300">0UAK57S1BT</span></span>
            </div>
          </div>
        </div>

        {/* Request */}
        <div className="border border-cyan-800 bg-cyan-950/10 rounded-lg p-5">
          <p className="text-cyan-400 font-black text-xs tracking-widest mb-3">FORMAL REQUEST</p>
          <p className="text-zinc-200 text-sm leading-relaxed">
            I request that this update and the associated portal data be{' '}
            <strong className="text-white">formally integrated into Case #25-621293</strong> to ensure a
            comprehensive federal review of these systemic failures. The Judicial Handshake now provides
            Department 12 and federal investigators synchronized, tamper-evident access to all forensic
            timestamps and documentary evidence in real time.
          </p>
        </div>

        {/* Signature */}
        <div className="border border-zinc-800 bg-zinc-900/40 rounded-lg p-6">
          <p className="text-zinc-500 text-xs tracking-widest mb-3">RESPECTFULLY SUBMITTED</p>
          <p className="text-white font-black text-lg">{LETTER.from}</p>
          <p className="text-emerald-400 text-xs font-mono mt-1">{LETTER.title}</p>
          <p className="text-amber-400 text-xs font-mono">{LETTER.status}</p>
          <div className="mt-4 pt-4 border-t border-zinc-800 flex flex-wrap gap-4 text-[10px] font-mono text-zinc-500">
            <span>HHS Case: <strong className="text-zinc-300">#25-621293</strong></span>
            <span className="text-zinc-700">|</span>
            <span>Court Case: <strong className="text-red-400">CUD-26-682107</strong></span>
            <span className="text-zinc-700">|</span>
            <span>Date: <strong className="text-zinc-300">{LETTER.date}</strong></span>
            <span className="text-zinc-700">|</span>
            <span>Anchor: <strong className="text-emerald-400">SGAU-7226.3461</strong></span>
          </div>
        </div>

        {/* Footer Nav */}
        <div className="grid sm:grid-cols-4 gap-3 pt-4 border-t border-zinc-900">
          <Link href="/dept12-case" className="border border-zinc-800 rounded-lg p-4 hover:bg-zinc-900 transition-colors">
            <p className="text-red-400 font-bold text-xs mb-1">ACTIVE CASE</p>
            <p className="text-zinc-500 text-[11px]">CUD-26-682107</p>
          </Link>
          <Link href="/surveillance-evidence" className="border border-zinc-800 rounded-lg p-4 hover:bg-zinc-900 transition-colors">
            <p className="text-amber-400 font-bold text-xs mb-1">SURVEILLANCE</p>
            <p className="text-zinc-500 text-[11px]">Unit 301A Evidence</p>
          </Link>
          <Link href="/judicial-handshake" className="border border-zinc-800 rounded-lg p-4 hover:bg-zinc-900 transition-colors">
            <p className="text-emerald-400 font-bold text-xs mb-1">HANDSHAKE</p>
            <p className="text-zinc-500 text-[11px]">Dept 12 Protocol</p>
          </Link>
          <Link href="/mimecast" className="border border-zinc-800 rounded-lg p-4 hover:bg-zinc-900 transition-colors">
            <p className="text-orange-400 font-bold text-xs mb-1">MIMECAST</p>
            <p className="text-zinc-500 text-[11px]">SMTP 550 Blockade</p>
          </Link>
        </div>

      </div>
    </main>
  );
}
