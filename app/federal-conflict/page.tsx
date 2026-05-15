'use client';

export const runtime = 'edge';

import Link from 'next/link';
import { Shield, AlertTriangle, Scale, FileText, ExternalLink, Building2, Gavel } from 'lucide-react';

const VIOLATIONS = [
  {
    num: '01',
    title: 'Federal Conflict of Interest',
    statutes: ['38 C.F.R. §14.632', 'ABA Model Rule 1.7'],
    color: 'border-red-800 bg-red-950/20',
    badge: 'bg-red-800 text-red-200',
    description: 'Swords to Plowshares is the current VA-accredited representative for Donald Gillson\'s disability claims while simultaneously prosecuting an eviction that threatens his basic survival housing. Under 38 C.F.R. §14.632, accredited representatives must provide "diligent and competent assistance" and are prohibited from engaging in "unlawful or unethical" conduct. Using information gained during disability representation to facilitate an eviction is a federal ethics violation.',
    relief: 'Report to VA-OGC — puts federal accreditation at risk. Significant pressure to dismiss.',
  },
  {
    num: '02',
    title: 'Breach of Fiduciary Duty',
    statutes: ['Duty of Loyalty', 'Duty of Care'],
    color: 'border-orange-800 bg-orange-950/20',
    badge: 'bg-orange-800 text-orange-200',
    description: 'By acting as the VA representative, Swords to Plowshares owes a Duty of Loyalty and a Duty of Care. Initiating an eviction while managing the client\'s disability benefits is a direct and concurrent breach of both duties. The organization cannot be both advocate and adversary in a proceeding that threatens the same client\'s housing stability.',
    relief: 'Affirmative defense: check "Conflict of Interest / Breach of Fiduciary Duty" on UD-105 Answer.',
  },
  {
    num: '03',
    title: 'ADA / Section 504 Violations',
    statutes: ['29 U.S.C. §794 (Rehab. Act)', 'FEHA Gov. Code §12955', '42 U.S.C. §3604'],
    color: 'border-amber-800 bg-amber-950/20',
    badge: 'bg-amber-800 text-amber-200',
    description: 'As a recipient of federal funds (HUD/VA), Swords to Plowshares is strictly prohibited under Section 504 of the Rehabilitation Act from discriminating based on disability. The use of targeted surveillance (hallway camera 301A) and refusal of reasonable accommodation constitutes disparate impact. Evicting a veteran for behaviors that are clinical manifestations of the very disabilities they are paid to represent is a federal civil rights violation.',
    relief: 'Forward to HHS-OCR (Case #25-621293) and SF-HRC (Anna Moraga Archila) for parallel investigation.',
  },
  {
    num: '04',
    title: 'Signatory Fraud & Perjury',
    statutes: ['CCP §446', 'Penal Code §115', 'Penal Code §118'],
    color: 'border-rose-800 bg-rose-950/20',
    badge: 'bg-rose-800 text-rose-200',
    description: 'To bypass the legal conflict of interest optics, attorneys filed a complaint verified by Jerome Bradford, who lacks personal knowledge of the events alleged. Bradford signed verification on May 4, 2026 claiming knowledge of events on February 20, 2026. The original 3-day notice was signed by Will Landrum — a different person entirely. This "Signatory Swap" was a deliberate attempt to hide that the original notice was issued by an unlicensed agent during an active restraining order conflict.',
    relief: 'File Motion to Strike + request evidentiary hearing. Subpoena Bradford for live testimony.',
  },
];

const CASE_LAW = [
  {
    cite: 'Douglas v. Kriegsfeld Corp. (884 A.2d 1109)',
    holding: 'Landlords in federally assisted housing must grant stays of eviction as reasonable accommodation for disability-related conduct.',
    relevance: 'DIRECT — Swords to Plowshares receives HUD/VA federal funding. Stay required.',
  },
  {
    cite: 'Whittle v. City of San Francisco',
    holding: 'Organizations providing supportive services cannot engage in retaliatory or discriminatory eviction practices against the veterans they serve.',
    relevance: 'DIRECT — Swords to Plowshares is a veteran supportive services provider evicting a veteran.',
  },
];

const AGENCIES = [
  { name: 'HHS-OCR', contact: 'Amy Horrell', case: 'Case #25-621293', action: 'Federal intervention to halt state proceedings' },
  { name: 'SF-HRC', contact: 'Anna Moraga Archila', case: 'Parallel intake', action: 'CCRA surveillance + discriminatory eviction' },
  { name: 'VA-OGC', contact: 'Office of the General Counsel', case: 'Accreditation complaint', action: 'Accredited rep suing own client — immediate referral' },
  { name: 'HUD-OIG', contact: 'Federal Inspector General', case: 'VAWA housing violations', action: 'Referral if VAWA violations confirmed' },
];

export default function FederalConflictPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white pb-20">

      {/* Header */}
      <div className="border-b border-orange-900 bg-orange-950/20">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Scale className="w-5 h-5 text-orange-400" />
                <span className="text-orange-400 font-black text-xs tracking-widest uppercase">Federal Civil Rights Filing</span>
                <span className="bg-orange-700 text-white text-[9px] font-black px-2 py-0.5 rounded tracking-widest">CONFLICT OF INTEREST</span>
              </div>
              <h1 className="text-2xl font-black text-white leading-tight">
                The Federal Conflict of Interest
              </h1>
              <p className="text-zinc-400 text-sm mt-1 font-mono">
                Swords to Plowshares — VA Representative &amp; Adverse Plaintiff &bull; CUD-26-682107
              </p>
            </div>
            <div className="text-right hidden md:block">
              <div className="text-[10px] font-mono text-zinc-500">TO: Amy Horrell, HHS-OCR</div>
              <div className="text-[10px] font-mono text-zinc-500">TO: Anna Moraga Archila, SF-HRC</div>
              <div className="text-[10px] font-mono text-amber-400">DATE: May 15, 2026</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">

        {/* Formal Letter Opening */}
        <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-6">
          <div className="grid md:grid-cols-2 gap-6 mb-5 pb-5 border-b border-zinc-800 text-xs font-mono">
            <div className="space-y-1.5">
              <div className="text-zinc-500">TO:</div>
              <div className="text-white">Amy Horrell — HHS Office for Civil Rights</div>
              <div className="text-white">Anna Moraga Archila — SF Human Rights Commission</div>
            </div>
            <div className="space-y-1.5">
              <div className="flex gap-3"><span className="text-zinc-500">FROM:</span><span className="text-white">Donald Gillson — 100% Disabled U.S. Navy Veteran</span></div>
              <div className="flex gap-3"><span className="text-zinc-500">CASE:</span><span className="text-amber-400">HHS-OCR #25-621293 / CUD-26-682107</span></div>
              <div className="flex gap-3"><span className="text-zinc-500">DATE:</span><span className="text-white">May 15, 2026</span></div>
            </div>
          </div>
          <p className="text-zinc-300 text-sm leading-relaxed">
            I am writing to formally document an egregious and unlawful conflict of interest being perpetrated by{' '}
            <strong className="text-white">Swords to Plowshares</strong> and their legal counsel,{' '}
            <strong className="text-white">John P. Zanghi</strong> and <strong className="text-white">Bradford C. White</strong>.
            As a 100% disabled U.S. Navy Veteran, I am a protected sovereign under federal law.{' '}
            <span className="text-red-400 font-bold">Swords to Plowshares currently serves as my authorized representative for my VA disability claims.</span>{' '}
            Simultaneously, this same organization has initiated an Unlawful Detainer action (Case No. CUD-26-682107) to evict me from my residence.
          </p>
        </div>

        {/* Four Violations */}
        <div>
          <h2 className="text-xs font-black text-zinc-500 tracking-widest uppercase mb-4">Four Federal Violations on Record</h2>
          <div className="space-y-4">
            {VIOLATIONS.map((v) => (
              <div key={v.num} className={`border rounded-lg p-5 ${v.color}`}>
                <div className="flex items-start gap-3 mb-3">
                  <span className={`text-[9px] font-black px-2 py-1 rounded tracking-widest flex-shrink-0 mt-0.5 ${v.badge}`}>§{v.num}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-white font-bold text-sm">{v.title}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {v.statutes.map((s) => (
                        <span key={s} className="text-[9px] font-mono bg-zinc-900 border border-zinc-700 text-zinc-300 px-2 py-0.5 rounded">{s}</span>
                      ))}
                    </div>
                    <p className="text-zinc-400 text-xs leading-relaxed mb-3">{v.description}</p>
                    <div className="bg-zinc-900/60 border border-zinc-700 rounded px-3 py-2">
                      <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Relief: </span>
                      <span className="text-xs text-zinc-300">{v.relief}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Case Law */}
        <div>
          <h2 className="text-xs font-black text-zinc-500 tracking-widest uppercase mb-4">Controlling Case Law</h2>
          <div className="space-y-3">
            {CASE_LAW.map((c) => (
              <div key={c.cite} className="border border-blue-900 bg-blue-950/20 rounded-lg p-4">
                <div className="text-blue-300 font-mono text-xs font-bold mb-1 italic">{c.cite}</div>
                <p className="text-zinc-300 text-xs leading-relaxed mb-2"><span className="text-zinc-500">Holding: </span>{c.holding}</p>
                <p className="text-xs"><span className="text-emerald-500 font-bold text-[9px] tracking-widest uppercase">Relevance: </span><span className="text-zinc-400">{c.relevance}</span></p>
              </div>
            ))}
          </div>
        </div>

        {/* Agency Notification Table */}
        <div>
          <h2 className="text-xs font-black text-zinc-500 tracking-widest uppercase mb-4">Agency Notification Matrix</h2>
          <div className="border border-zinc-800 rounded-lg overflow-hidden">
            <div className="grid grid-cols-4 bg-zinc-900 border-b border-zinc-800 px-4 py-2 text-[9px] font-black text-zinc-500 tracking-widest uppercase">
              <div>Agency</div>
              <div>Contact</div>
              <div>Case</div>
              <div>Action Required</div>
            </div>
            {AGENCIES.map((a, i) => (
              <div key={a.name} className={`grid grid-cols-4 px-4 py-3 text-xs gap-2 ${i % 2 === 0 ? 'bg-zinc-950' : 'bg-zinc-900/50'}`}>
                <div className="font-black text-amber-400">{a.name}</div>
                <div className="text-zinc-300">{a.contact}</div>
                <div className="font-mono text-zinc-400">{a.case}</div>
                <div className="text-zinc-400">{a.action}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Formal Request */}
        <div className="border border-red-900 bg-red-950/20 rounded-lg p-5">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <span className="text-red-400 font-black text-xs tracking-widest uppercase">Formal Relief Requested</span>
          </div>
          <p className="text-zinc-300 text-sm leading-relaxed">
            I am requesting <strong className="text-white">immediate federal intervention</strong> to halt the state court proceedings
            (Case No. CUD-26-682107) until this conflict of interest and the associated civil rights violations are fully investigated.
            All high-fidelity evidence of the surveillance, the SMTP 550 blockade, and the signatory fraud is available at the
            hardware-verified evidence portal:
          </p>
          <a
            href="/judicial-handshake"
            className="inline-flex items-center gap-1.5 mt-3 text-cyan-400 hover:text-cyan-300 font-mono text-sm transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            /judicial-handshake — Immutable Evidence Node
          </a>
        </div>

        {/* Signed Block */}
        <div className="border border-zinc-700 bg-zinc-900 rounded-lg p-5">
          <div className="text-xs font-mono text-zinc-500 mb-3 tracking-widest uppercase">Respectfully Submitted</div>
          <div className="text-white font-black text-sm">Donald Gillson</div>
          <div className="text-zinc-400 text-xs font-mono">Principal Architect, VALORAIPLUS_</div>
          <div className="text-amber-400 text-xs font-mono">100% Disabled U.S. Navy Veteran</div>
          <div className="text-zinc-500 text-xs font-mono mt-1">SGAU-7226.3461 &bull; Nano Gen5 (0UAK57S1BT) &bull; May 15, 2026</div>
        </div>

        {/* Footer Nav */}
        <div className="border-t border-zinc-800 pt-8">
          <div className="text-[10px] font-mono text-zinc-600 tracking-widest uppercase mb-4">Evidence Navigation</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Active Case', href: '/dept12-case' },
              { label: 'Smoking Gun Exhibit', href: '/smoking-gun-exhibit' },
              { label: 'HHS-OCR Update', href: '/hhs-ocr-update' },
              { label: 'Judicial Handshake', href: '/judicial-handshake' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="border border-zinc-800 hover:border-orange-800 bg-zinc-900 hover:bg-orange-950/20 rounded-lg px-4 py-3 text-xs font-bold text-zinc-400 hover:text-orange-400 transition-all text-center"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
