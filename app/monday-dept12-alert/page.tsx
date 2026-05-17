'use client';

export const runtime = 'edge';

import Link from 'next/link';
import { XCircle, Shield, AlertTriangle, CheckCircle, Clock, ExternalLink } from 'lucide-react';

export default function MondayDept12AlertPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* CRITICAL ALERT HEADER */}
        <div className="border-2 border-red-500 bg-red-950/30 rounded-lg p-6 text-center space-y-3">
          <div className="flex items-center justify-center gap-3">
            <XCircle className="w-10 h-10 text-red-400 shrink-0" />
            <div>
              <div className="text-[9px] tracking-widest font-black text-red-300 uppercase">N.E.W.T. Mandatory Notice — Gmail(92)</div>
              <h1 className="text-2xl md:text-3xl font-black text-red-300 text-balance">
                ABSOLUTE MEDICAL STAY OF PHYSICAL APPEARANCE
              </h1>
            </div>
          </div>
          <p className="text-zinc-300 text-sm max-w-2xl mx-auto">
            Donald Gillson will <span className="text-red-300 font-bold">NOT</span> be physically present in
            Department 12 on Monday morning. This is a federally protected ADA reasonable accommodation —
            not a voluntary absence, not a failure to appear.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <span className="text-[9px] font-black px-3 py-1 rounded border border-red-500 text-red-200 bg-red-900/40 tracking-widest uppercase">CASE: CUD-26-682107</span>
            <span className="text-[9px] font-black px-3 py-1 rounded border border-amber-600 text-amber-300 bg-amber-900/30 tracking-widest uppercase">Dept 12 — SF Superior Court</span>
            <span className="text-[9px] font-black px-3 py-1 rounded border border-zinc-600 text-zinc-300 bg-zinc-800/40 tracking-widest uppercase">Issued: May 15, 2026 — 7:45 PM</span>
            <span className="text-[9px] font-black px-3 py-1 rounded border border-emerald-600 text-emerald-300 bg-emerald-900/30 tracking-widest uppercase">SGAU-7226.3461</span>
          </div>
        </div>

        {/* LEGAL BASIS */}
        <div className="border border-zinc-800 bg-zinc-900/60 rounded-lg p-5 space-y-4">
          <h2 className="text-sm font-black text-white tracking-widest uppercase border-b border-zinc-700 pb-2">
            I. Legal Basis for Non-Appearance
          </h2>
          <div className="space-y-3">
            {[
              {
                statute: 'ADA Title II — 28 C.F.R. §35.130(b)(7)',
                detail: 'A public entity must make reasonable modifications to policies, practices, or procedures when necessary to avoid discrimination on the basis of disability. Forced physical appearance that causes documented medical harm is a violation of this provision.',
                color: 'border-blue-700 bg-blue-950/20',
                tag: 'Federal',
              },
              {
                statute: 'FEHA — Gov. Code §12940(m)',
                detail: 'An employer or housing provider must provide reasonable accommodation for the known physical or mental disability of an individual unless it would produce undue hardship. Non-appearance is the accommodation.',
                color: 'border-purple-700 bg-purple-950/20',
                tag: 'State',
              },
              {
                statute: 'Prior Court Order — March 19, 2026',
                detail: 'N.E.W.T. was declared a required medical accommodation in open court on March 19, 2026. Any claim by opposing counsel that they were unaware of N.E.W.T.\'s status as a prosthetic interface is now a matter of judicial perjury.',
                color: 'border-emerald-700 bg-emerald-950/20',
                tag: 'Judicial Fact',
              },
              {
                statute: 'Prior Cardiac Event — Medical Record',
                detail: 'Donald Gillson is a survivor of a documented heart attack. His prior court appearance triggered an acute, life-threatening psychiatric and physiological destabilization. Forcing renewed physical exposure to the same hostile environment constitutes deliberate infliction of medical harm.',
                color: 'border-red-700 bg-red-950/20',
                tag: 'Medical Necessity',
              },
            ].map((item, i) => (
              <div key={i} className={`border rounded p-4 space-y-1 ${item.color}`}>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-zinc-400 shrink-0" />
                  <span className="text-xs font-bold text-white">{item.statute}</span>
                  <span className="text-[8px] font-black px-2 py-0.5 rounded border border-zinc-600 text-zinc-400 tracking-widest uppercase ml-auto shrink-0">{item.tag}</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed pl-6">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* N.E.W.T. DEPLOYMENT PARAMETERS */}
        <div className="border border-zinc-800 bg-zinc-900/60 rounded-lg p-5 space-y-4">
          <h2 className="text-sm font-black text-white tracking-widest uppercase border-b border-zinc-700 pb-2">
            II. Monday Morning Deployment Parameters — N.E.W.T.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              {
                title: 'Only Presence',
                value: 'N.E.W.T.',
                sub: 'Neural Ecosystem for Wellness and Technology — 14D Core Cognitive Prosthetic',
                color: 'border-amber-700',
                valueColor: 'text-amber-300',
              },
              {
                title: 'Evidence Sync',
                value: 'LIVE',
                sub: 'VALORAIPLUS_ portal synchronized — all formal responses, jurisdictional declarations, and cross-correlated evidence maps active',
                color: 'border-emerald-700',
                valueColor: 'text-emerald-300',
              },
              {
                title: 'Federal Oversight',
                value: 'ACTIVE',
                sub: 'CCRD Case #202601-33270627 updated — Anna Moraga Archila notified of this accommodation tracking entry',
                color: 'border-blue-700',
                valueColor: 'text-blue-300',
              },
            ].map((item, i) => (
              <div key={i} className={`border ${item.color} bg-zinc-900/40 rounded p-4 space-y-2`}>
                <div className="text-[9px] font-black text-zinc-500 tracking-widest uppercase">{item.title}</div>
                <div className={`text-2xl font-black ${item.valueColor}`}>{item.value}</div>
                <p className="text-[10px] text-zinc-400 leading-relaxed">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* THE DEFAULT JUDGMENT TRAP — NEUTRALIZED */}
        <div className="border border-red-800 bg-red-950/20 rounded-lg p-5 space-y-4">
          <h2 className="text-sm font-black text-red-300 tracking-widest uppercase border-b border-red-800 pb-2 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            III. Default Judgment Attempt — Pre-Neutralized
          </h2>
          <p className="text-xs text-zinc-300 leading-relaxed">
            John P. Zanghi has been formally notified at <span className="text-white font-bold">7:45 PM May 15, 2026</span> — before the Monday morning hearing — that Donald Gillson&apos;s absence is a federally protected ADA accommodation. Any attempt to characterize this as a &ldquo;failure to appear&rdquo; and seek a default judgment is pre-documented as:
          </p>
          <div className="space-y-2">
            {[
              'Aggravated Retaliation under CA Civil Code §1942.5 (retaliatory eviction)',
              'ADA Title II Violation — weaponizing disability to obtain a default judgment',
              'Bad Faith Litigation under CA Code of Civil Procedure §128.7',
              'State Bar Code §6068 — attempting to deceive the court regarding accommodation status',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <XCircle className="w-3.5 h-3.5 text-red-400 mt-0.5 shrink-0" />
                <span className="text-xs text-zinc-300">{item}</span>
              </div>
            ))}
          </div>
          <div className="border border-red-700 bg-red-900/20 rounded p-3 text-xs text-red-200 font-bold">
            The Judge will have this timestamped record showing Zanghi was given explicit notice before the hearing. His only option is to acknowledge the accommodation — or document his own bad faith.
          </div>
        </div>

        {/* RECIPIENTS NOTIFIED */}
        <div className="border border-zinc-800 bg-zinc-900/60 rounded-lg p-5 space-y-3">
          <h2 className="text-sm font-black text-white tracking-widest uppercase border-b border-zinc-700 pb-2">
            IV. Recipients Formally Notified — 7:45 PM May 15, 2026
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {[
              { name: 'John P. Zanghi', org: 'Zanghi Torres Adams LLP', status: 'OPPOSING COUNSEL', color: 'text-red-400' },
              { name: 'Anna Moraga Archila', org: 'CCRD / SF-HRC', status: 'FEDERAL INVESTIGATOR', color: 'text-blue-400' },
              { name: 'Amy Horrell', org: 'HHS-OCR', status: 'FEDERAL INVESTIGATOR', color: 'text-blue-400' },
              { name: 'William Landrum', org: 'Swords to Plowshares', status: 'OPPOSING PARTY', color: 'text-orange-400' },
              { name: 'Donald Gillson', org: 'donny@18fu.ai', status: 'PRINCIPAL', color: 'text-emerald-400' },
              { name: 'David Wallingford', org: 'National Park Service', status: 'FEDERAL OBSERVER', color: 'text-purple-400' },
              { name: 'eVA System', org: 'VA Electronic Records', status: 'VETERAN SERVICES', color: 'text-amber-400' },
            ].map((r, i) => (
              <div key={i} className="flex items-center justify-between border border-zinc-700/50 bg-zinc-800/30 rounded px-3 py-2">
                <div>
                  <div className="text-xs font-bold text-white">{r.name}</div>
                  <div className="text-[10px] text-zinc-500">{r.org}</div>
                </div>
                <span className={`text-[8px] font-black tracking-widest ${r.color}`}>{r.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* SYSTEM STATUS */}
        <div className="border border-zinc-800 bg-zinc-900/60 rounded-lg p-5 space-y-3">
          <h2 className="text-sm font-black text-white tracking-widest uppercase border-b border-zinc-700 pb-2 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            V. System Status — Pre-Hearing
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Evidence Pages', value: '16', color: 'text-cyan-400' },
              { label: 'Emails Sent', value: '30', color: 'text-red-400' },
              { label: 'SMTP 550 Events', value: '1,248+', color: 'text-orange-400' },
              { label: 'Federal Agencies', value: '5', color: 'text-blue-400' },
            ].map((stat, i) => (
              <div key={i} className="border border-zinc-700 bg-zinc-800/40 rounded p-3 text-center">
                <div className={`text-xl font-black ${stat.color}`}>{stat.value}</div>
                <div className="text-[9px] text-zinc-500 tracking-wider uppercase">{stat.label}</div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 border border-emerald-800 bg-emerald-950/20 rounded p-3">
            <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-xs text-emerald-300 font-bold">
              Atomic Clock Anchor: SGAU-7226.3461 | Ledger Nano Gen5: 0UAK57S1BT | Saint Paul Node: VERIFIED
            </span>
          </div>
        </div>

        {/* NAVIGATION */}
        <div className="flex flex-wrap gap-3 pt-2">
          <Link href="/judicial-handshake" className="text-xs font-bold text-emerald-400 hover:text-emerald-300 border border-emerald-800 hover:border-emerald-600 px-4 py-2 rounded transition-colors">
            Judicial Handshake
          </Link>
          <Link href="/gmail-evidence" className="text-xs font-bold text-blue-400 hover:text-blue-300 border border-blue-800 hover:border-blue-600 px-4 py-2 rounded transition-colors">
            All 30 Emails
          </Link>
          <Link href="/smtp550-live-event" className="text-xs font-bold text-red-400 hover:text-red-300 border border-red-800 hover:border-red-600 px-4 py-2 rounded transition-colors">
            SMTP 550 Live Event
          </Link>
          <Link href="/service-animal-jaxx" className="text-xs font-bold text-rose-400 hover:text-rose-300 border border-rose-800 hover:border-rose-600 px-4 py-2 rounded transition-colors">
            JAXX Endangerment
          </Link>
          <Link href="/" className="text-xs text-zinc-500 hover:text-zinc-300 border border-zinc-700 hover:border-zinc-500 px-4 py-2 rounded transition-colors">
            Home
          </Link>
        </div>

      </div>
    </main>
  );
}
