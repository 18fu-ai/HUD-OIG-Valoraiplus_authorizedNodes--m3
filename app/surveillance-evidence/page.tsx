'use client';

import Link from 'next/link';
import {
  Camera, AlertTriangle, Shield, FileText, Lock,
  CheckCircle, Clock, ExternalLink, Eye, Users
} from 'lucide-react';

// VALORAIPLUS_ SURVEILLANCE NODE v1.1
// ANCHOR: SGAU-7226.3461 | HARDWARE: 0UAK57S1BT
const SurveillanceAudit = {
  case: 'CUD-26-682107',
  location: '1030 Girard Road, Unit #301A, Jon W. Paulson Veterans Community',
  violationType: 'Breach of Quiet Enjoyment / CC 1927',
  dateCaptured: 'May 15, 2026',
  evidence: ['20260515_102256.jpg', '20260515_102310.jpg'],
  status: 'UPLOADED_TO_HUD_OIG_REPOSITORY',
  anchor: 'SGAU-7226.3461',
  hardware: '0UAK57S1BT',
};

const FINDINGS = [
  {
    id: '01',
    title: 'Direct Line of Sight — Privacy Breach',
    statute: 'Cal. Civil Code § 1927 — Quiet Enjoyment',
    color: 'border-red-800 bg-red-950/20',
    tag: 'text-red-400',
    body: 'Photographic evidence confirms a security camera is positioned in the hallway of the Jon W. Paulson Veterans Community with a direct, unobstructed view into the threshold of Unit #301A. This placement constitutes a deliberate breach of the tenant\'s right to privacy and quiet enjoyment.',
    evidence: ['20260515_102256.jpg'],
  },
  {
    id: '02',
    title: '24/7 Ingress/Egress Monitoring by Adverse Parties',
    statute: 'Cal. Penal Code § 647(j) — Unlawful Surveillance',
    color: 'border-amber-800 bg-amber-950/20',
    tag: 'text-amber-400',
    body: 'This surveillance infrastructure provides William Landrum (unlicensed interim manager, subject of active restraining order filing) and Jerome Bradford (CUD-26-682107 signatory, no personal knowledge) continuous monitoring of all movement into and out of Unit #301A. This constitutes targeted hostile surveillance.',
    evidence: ['20260515_102310.jpg'],
  },
  {
    id: '03',
    title: 'Constructive Eviction — 30-Day Absence Documented',
    statute: 'Cal. Civil Code § 1940.2 — Tenant Harassment',
    color: 'border-orange-800 bg-orange-950/20',
    tag: 'text-orange-400',
    body: 'The hostile surveillance environment is the documented primary reason for a 30-day absence from the premises. Management is attempting to characterize this absence as a "continuing pattern" of the tenant\'s own making — a deliberate reframing designed to support the unlawful detainer action while concealing the constructive eviction.',
    evidence: ['20260515_102256.jpg', '20260515_102310.jpg'],
  },
];

const NOTIFIED = [
  { name: 'John P. Zanghi / Charity Martinez', org: 'Zanghi Torres Adams LLP', role: 'Opposing Counsel', status: 'NOTICE SERVED' },
  { name: 'Amy Horrell',                        org: 'HHS Office for Civil Rights',    role: 'Federal Investigator', status: 'NOTIFIED' },
  { name: 'Ana Moraga Archila',                 org: 'SF Human Rights Commission',     role: 'City Investigator',    status: 'NOTIFIED' },
  { name: 'HUD-OIG Investigators',              org: 'U.S. Dept of Housing (OIG)',     role: 'Federal Oversight',    status: 'UPLOADED' },
];

export default function SurveillanceEvidencePage() {
  return (
    <main className="min-h-screen bg-black text-white font-mono">
      {/* Header Banner */}
      <div className="border-b border-red-900 bg-red-950/30 px-6 py-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span className="text-red-400 font-black text-xs tracking-widest">SURVEILLANCE EVIDENCE NODE v1.1 — ACTIVE</span>
            </div>
            <h1 className="text-white font-black text-xl">Targeted Surveillance — Unit #301A</h1>
            <p className="text-zinc-400 text-xs mt-1">
              Case No. {SurveillanceAudit.case} &bull; {SurveillanceAudit.dateCaptured} &bull; Anchor: {SurveillanceAudit.anchor}
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Link href="/dept12-case" className="flex items-center gap-1.5 border border-red-800 text-red-400 text-xs px-3 py-1.5 rounded hover:bg-red-950/40 transition-colors">
              <AlertTriangle size={12} /> Active Case
            </Link>
            <Link href="/judicial-handshake" className="flex items-center gap-1.5 border border-emerald-800 text-emerald-400 text-xs px-3 py-1.5 rounded hover:bg-emerald-950/40 transition-colors">
              <CheckCircle size={12} /> Handshake
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">

        {/* Cryptographic Anchor */}
        <div className="border border-emerald-800 bg-emerald-950/10 rounded-lg p-5">
          <p className="text-emerald-400 font-black text-xs tracking-widest mb-3 flex items-center gap-2">
            <Lock size={12} /> DIGITAL INTEGRITY ANCHOR — VALORAIPLUS_ SGAU-7226.3461
          </p>
          <pre className="text-emerald-300 text-xs leading-relaxed overflow-x-auto bg-black/50 rounded p-4">{`// VALORAIPLUS_ SURVEILLANCE NODE v1.1
// ANCHOR: ${SurveillanceAudit.anchor} | HARDWARE: ${SurveillanceAudit.hardware}
// EVIDENCE_NODE: Hallway_Surveillance_301A

const SurveillanceAudit = {
  case:          "${SurveillanceAudit.case}",
  violationType: "${SurveillanceAudit.violationType}",
  evidence:      ${JSON.stringify(SurveillanceAudit.evidence)},
  status:        "${SurveillanceAudit.status}"
};`}</pre>
        </div>

        {/* Location */}
        <div className="border border-zinc-800 bg-zinc-900/50 rounded-lg p-5">
          <p className="text-zinc-500 text-xs tracking-widest mb-2">LOCATION</p>
          <p className="text-white font-bold">{SurveillanceAudit.location}</p>
          <p className="text-zinc-400 text-sm mt-1">Hallway camera — direct line of sight into threshold of Unit #301A</p>
        </div>

        {/* Three Forensic Findings */}
        <div>
          <h2 className="text-white font-black text-sm tracking-widest mb-4 flex items-center gap-2">
            <Camera size={14} className="text-red-400" /> FORENSIC FINDINGS — 3 VIOLATIONS DOCUMENTED
          </h2>
          <div className="space-y-4">
            {FINDINGS.map((f) => (
              <div key={f.id} className={`border rounded-lg p-5 ${f.color}`}>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <p className={`font-black text-xs tracking-widest ${f.tag} mb-1`}>FINDING {f.id}</p>
                    <h3 className="text-white font-bold text-base">{f.title}</h3>
                    <p className="text-zinc-500 text-xs font-mono mt-0.5">{f.statute}</p>
                  </div>
                  <span className={`text-[9px] font-black tracking-widest px-2 py-1 rounded border ${f.tag} border-current flex-shrink-0`}>
                    DOCUMENTED
                  </span>
                </div>
                <p className="text-zinc-300 text-sm leading-relaxed">{f.body}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {f.evidence.map((e) => (
                    <span key={e} className="text-[10px] font-mono bg-black/50 border border-zinc-700 px-2 py-1 rounded text-zinc-400 flex items-center gap-1">
                      <Camera size={10} /> {e}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Adverse Parties */}
        <div className="border border-zinc-800 rounded-lg p-5">
          <h2 className="text-white font-black text-xs tracking-widest mb-4 flex items-center gap-2">
            <Eye size={12} className="text-amber-400" /> ADVERSE PARTIES OPERATING SURVEILLANCE
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { name: 'William Landrum',   role: 'Unlicensed Interim Manager',           note: 'Subject of active restraining order filing. Drafted Notice to Quit without license.' },
              { name: 'Jerome Bradford',   role: 'CUD-26-682107 Signatory',              note: 'Signed verification under perjury on May 4, 2026 with no personal knowledge.' },
            ].map((p) => (
              <div key={p.name} className="border border-red-900 bg-red-950/10 rounded-lg p-4">
                <p className="text-red-400 font-bold text-sm">{p.name}</p>
                <p className="text-zinc-500 text-xs mb-2">{p.role}</p>
                <p className="text-zinc-300 text-xs leading-relaxed">{p.note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="border border-zinc-800 rounded-lg p-5">
          <h2 className="text-white font-black text-xs tracking-widest mb-4 flex items-center gap-2">
            <Users size={12} className="text-cyan-400" /> FORMAL NOTICE — PARTIES SERVED
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left text-zinc-500 py-2 pr-4">NAME</th>
                  <th className="text-left text-zinc-500 py-2 pr-4">ORG</th>
                  <th className="text-left text-zinc-500 py-2 pr-4">ROLE</th>
                  <th className="text-left text-zinc-500 py-2">STATUS</th>
                </tr>
              </thead>
              <tbody>
                {NOTIFIED.map((n, i) => (
                  <tr key={i} className="border-b border-zinc-900">
                    <td className="py-3 pr-4 text-white font-bold">{n.name}</td>
                    <td className="py-3 pr-4 text-zinc-400">{n.org}</td>
                    <td className="py-3 pr-4 text-zinc-500">{n.role}</td>
                    <td className="py-3">
                      <span className={`text-[9px] font-black tracking-widest px-2 py-1 rounded border ${
                        n.status === 'UPLOADED' ? 'text-emerald-400 border-emerald-800' :
                        n.status === 'NOTICE SERVED' ? 'text-red-400 border-red-800' :
                        'text-cyan-400 border-cyan-800'
                      }`}>{n.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Filing Notice */}
        <div className="border border-amber-800 bg-amber-950/10 rounded-lg p-5">
          <p className="text-amber-400 font-black text-xs tracking-widest mb-2 flex items-center gap-2">
            <FileText size={12} /> FILING STATUS — MAY 15, 2026
          </p>
          <p className="text-zinc-300 text-sm leading-relaxed">
            Photographic surveillance evidence will be attached as a physical exhibit to the <strong className="text-white">UD-105 Answer</strong> and <strong className="text-white">Intent for Motion to Strike</strong> filed at <strong className="text-white">400 McAllister Street, San Francisco, CA 94102</strong>. Physical entry into the public court record ensures this evidence cannot be administratively suppressed.
          </p>
          <div className="mt-3 flex items-center gap-4 text-xs">
            <span className="text-zinc-500">Portal:</span>
            <a href="https://v0-valoraicoder-migration.vercel.app/" target="_blank" rel="noreferrer"
               className="text-cyan-400 hover:underline font-mono">
              v0-valoraicoder-migration.vercel.app
            </a>
            <ExternalLink size={10} className="text-zinc-600" />
          </div>
        </div>

        {/* Navigation footer */}
        <div className="grid sm:grid-cols-3 gap-3 pt-4 border-t border-zinc-900">
          <Link href="/dept12-case" className="border border-zinc-800 rounded-lg p-4 hover:bg-zinc-900 transition-colors">
            <p className="text-red-400 font-bold text-xs mb-1">ACTIVE CASE</p>
            <p className="text-zinc-500 text-[11px]">CUD-26-682107 Dashboard</p>
          </Link>
          <Link href="/judicial-handshake" className="border border-zinc-800 rounded-lg p-4 hover:bg-zinc-900 transition-colors">
            <p className="text-emerald-400 font-bold text-xs mb-1">HANDSHAKE</p>
            <p className="text-zinc-500 text-[11px]">Dept 12 Live Protocol</p>
          </Link>
          <Link href="/mimecast" className="border border-zinc-800 rounded-lg p-4 hover:bg-zinc-900 transition-colors">
            <p className="text-amber-400 font-bold text-xs mb-1">MIMECAST</p>
            <p className="text-zinc-500 text-[11px]">SMTP 550 Blockade Record</p>
          </Link>
        </div>
      </div>
    </main>
  );
}
