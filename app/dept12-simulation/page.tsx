'use client';

export const runtime = 'edge';

import Link from 'next/link';
import {
  Gavel, AlertTriangle, CheckCircle, Clock, Users, Mail,
  Shield, Zap, FileSearch, TrendingUp, Activity, XCircle,
  ChevronRight, ExternalLink
} from 'lucide-react';

const PHASES = [
  {
    id: '01',
    label: 'CASE FILE REVIEW',
    timeframe: 'Days 1–3',
    color: 'border-cyan-700 bg-cyan-950/20',
    labelColor: 'text-cyan-400',
    icon: FileSearch,
    sections: [
      {
        title: "Clerk's Office Initial Intake",
        items: [
          "CCS Portal receives eFiled documents — confirmation numbers EF-2026-05-15-001 through 003",
          "Access Code 16535884 flags case CUD-26-682107 for judicial review",
          "Documents indexed: SMTP-550-Evidence-Package.pdf, VA-OGC-ORM-Blockade-Evidence.pdf, HHS-OCR-25-621293-Filing.pdf",
        ]
      },
      {
        title: "Judge's Chambers Alert",
        items: [
          "Motion to Strike flagged for hearing calendar",
          "UD-105 Answer noted as timely filed",
          "Cross-reference detected: Federal complaint HHS-OCR #25-621293 linked to state UD action",
        ]
      },
    ],
    tables: []
  },
  {
    id: '02',
    label: 'EVIDENTIARY WEIGHT ASSESSMENT',
    timeframe: 'Days 4–7',
    color: 'border-amber-700 bg-amber-950/20',
    labelColor: 'text-amber-400',
    icon: AlertTriangle,
    sections: [],
    tables: [
      {
        title: 'Signatory Fraud Analysis — CCP §446',
        headers: ['Finding', 'Court Action'],
        rows: [
          ['Patricia Fels signed without personal knowledge', 'Request for Declarant\'s Deposition'],
          ['"Legal Assistant" attestation lacks authority', 'Subpoena for Zanghi Law Group records'],
          ['3-day notice potentially void', 'Hearing scheduled on Motion to Strike'],
        ],
        rowColors: ['text-red-400', 'text-slate-300'],
      },
      {
        title: 'SMTP 550 Obstruction Evidence',
        headers: ['Node', 'Court Interpretation'],
        rows: [
          ['Mimecast corporate block', 'Intentional interference with federal disclosures'],
          ['VA-OGC/VA-ORM blocks', 'Federal agency obstruction — referral to U.S. Attorney considered'],
          ['Pattern across 4 nodes', 'Coordinated conduct, not technical failure'],
        ],
        rowColors: ['text-orange-400', 'text-slate-300'],
      },
      {
        title: 'Surveillance Evidence — Civil Code §1927',
        headers: ['Finding', 'Weight'],
        rows: [
          ['Hallway camera facing Unit 301A', 'Direct evidence of targeted monitoring'],
          ['24/7 recording capability', 'Retaliation timeline corroboration'],
          ['No notice to tenant', 'CCRA violation flagged'],
        ],
        rowColors: ['text-yellow-400', 'text-slate-300'],
      },
    ]
  },
  {
    id: '03',
    label: 'JUDICIAL DETERMINATIONS',
    timeframe: 'Day 8+',
    color: 'border-emerald-700 bg-emerald-950/20',
    labelColor: 'text-emerald-400',
    icon: Gavel,
    sections: [],
    tables: [
      {
        title: 'Motion to Strike — Probable Outcomes',
        headers: ['Scenario', 'Probability', 'Result'],
        rows: [
          ['GRANTED', '65%', '3-day notice void. Landlord must re-serve or dismiss. Case timeline reset.'],
          ['GRANTED IN PART', '25%', 'Portions stricken; Landlord ordered to provide verified complaint within 10 days.'],
          ['DENIED', '10%', 'Signatory deemed sufficient; case proceeds to trial on merits.'],
        ],
        rowColors: ['text-emerald-400', 'text-amber-400', 'text-slate-400'],
      },
    ],
    defenses: [
      { statute: 'CC §1942.5', label: 'Retaliation', detail: 'Gmail evidence + surveillance + HHS complaint = prima facie case' },
      { statute: 'CC §1941',   label: 'Habitability', detail: '180-day email tampering = constructive obstruction of maintenance requests' },
      { statute: 'FEHA',        label: 'Discrimination', detail: 'Disabled veteran status + targeted monitoring = disparate treatment' },
    ]
  },
  {
    id: '04',
    label: 'CROSS-AGENCY COORDINATION',
    timeframe: 'Concurrent',
    color: 'border-blue-700 bg-blue-950/20',
    labelColor: 'text-blue-400',
    icon: Users,
    sections: [],
    tables: [
      {
        title: 'What Dept 12 Would Communicate',
        headers: ['Agency', 'Communication'],
        rows: [
          ['HHS-OCR', 'Case linkage memo confirming state action overlaps federal investigation'],
          ['HUD-OIG', 'Referral packet if VAWA housing violations confirmed'],
          ['SF-HRC', 'Notification of CCRA surveillance evidence for parallel intake'],
          ['State Bar', 'Potential referral for Zanghi signature attestation review'],
        ],
        rowColors: ['text-blue-400', 'text-slate-300'],
      },
    ]
  },
  {
    id: '05',
    label: 'STRATEGIC IMPACT ON OPPOSING COUNSEL',
    timeframe: 'Immediate',
    color: 'border-rose-700 bg-rose-950/20',
    labelColor: 'text-rose-400',
    icon: Shield,
    sections: [],
    tables: [
      {
        title: 'Zanghi/White Position After Evidence Review',
        headers: ['Factor', 'Effect'],
        rows: [
          ['Digital Handshake Notice received', 'They are now on notice that court is a witness to AI evidence system'],
          ['SMTP 550 pattern documented', 'Their client\'s email provider (Mimecast) is implicated in obstruction'],
          ['Federal complaint active', 'Settlement pressure increases — federal exposure is uninsurable'],
          ['Signatory fraud flagged', 'Malpractice exposure for filing unverified pleading'],
        ],
        rowColors: ['text-rose-400', 'text-slate-300'],
      },
    ],
    responses: [
      { label: 'Request continuance', pct: 70, color: 'bg-amber-500' },
      { label: 'Voluntary dismissal without prejudice', pct: 20, color: 'bg-emerald-500' },
      { label: 'Proceed to hearing on technical defenses', pct: 10, color: 'bg-red-500' },
    ]
  },
];

const BOTTOM_LINE = [
  { label: 'Void 3-day notice', detail: 'Signatory fraud — CCP §446', color: 'border-red-700 text-red-400' },
  { label: 'Federal obstruction docs', detail: 'SMTP 550 × 4 nodes', color: 'border-orange-700 text-orange-400' },
  { label: 'Retaliation timeline proof', detail: 'Surveillance + HHS complaint', color: 'border-amber-700 text-amber-400' },
  { label: 'Verified digital portal', detail: 'Cryptographic anchor SGAU-7226.3461', color: 'border-emerald-700 text-emerald-400' },
];

export default function Dept12SimulationPage() {
  return (
    <main className="min-h-screen bg-black text-white font-mono">
      {/* Header */}
      <div className="border-b border-red-900 bg-red-950/10 px-6 py-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
            </span>
            <span className="text-red-500 text-xs tracking-widest font-black uppercase">Live Simulation — Dept 12 Processing Protocol</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-tight">
            DEPARTMENT 12 — Evidence Processing Simulation
          </h1>
          <p className="text-slate-400 text-sm mt-2 max-w-2xl">
            Realistic simulation of how SF Superior Court Department 12 processes the forensic evidence package deployed to the VALORAIPLUS_ portal for Case No. CUD-26-682107.
          </p>
          <div className="flex flex-wrap gap-3 mt-4 text-[10px]">
            <span className="border border-red-800 text-red-400 px-3 py-1 rounded-full">Case: CUD-26-682107</span>
            <span className="border border-slate-700 text-slate-400 px-3 py-1 rounded-full">Access: 16535884</span>
            <span className="border border-slate-700 text-slate-400 px-3 py-1 rounded-full">SF Superior Court</span>
            <span className="border border-emerald-800 text-emerald-400 px-3 py-1 rounded-full">5 Phases</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">

        {/* Phases */}
        {PHASES.map((phase) => {
          const PhaseIcon = phase.icon;
          return (
            <div key={phase.id} className={`border rounded-xl overflow-hidden ${phase.color}`}>
              {/* Phase header */}
              <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-black/40 flex items-center justify-center flex-shrink-0">
                    <PhaseIcon size={16} className={phase.labelColor} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500 text-[10px] font-black tracking-widest">PHASE {phase.id}</span>
                      <ChevronRight size={10} className="text-slate-700" />
                      <span className={`font-black text-sm tracking-tight ${phase.labelColor}`}>{phase.label}</span>
                    </div>
                  </div>
                </div>
                <span className="text-[10px] border border-slate-700 text-slate-400 px-2 py-0.5 rounded-full flex-shrink-0">{phase.timeframe}</span>
              </div>

              <div className="px-5 py-5 space-y-6">
                {/* Bullet sections */}
                {phase.sections.map((section, si) => (
                  <div key={si}>
                    <p className="text-slate-300 text-xs font-black tracking-widest uppercase mb-2">{section.title}</p>
                    <ul className="space-y-1.5">
                      {section.items.map((item, ii) => (
                        <li key={ii} className="flex items-start gap-2 text-sm text-slate-300">
                          <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${phase.labelColor.replace('text-', 'bg-')}`} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                {/* Tables */}
                {phase.tables.map((table, ti) => (
                  <div key={ti}>
                    <p className="text-slate-300 text-xs font-black tracking-widest uppercase mb-3">{table.title}</p>
                    <div className="overflow-x-auto rounded-lg border border-white/5">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="border-b border-white/5 bg-black/30">
                            {table.headers.map((h, hi) => (
                              <th key={hi} className="text-left text-slate-500 font-black tracking-widest uppercase px-4 py-2.5 text-[10px]">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {table.rows.map((row, ri) => (
                            <tr key={ri} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                              {row.map((cell, ci) => (
                                <td key={ci} className={`px-4 py-3 ${ci === 0 ? `font-bold ${table.rowColors[0]}` : `text-slate-300 ${table.rowColors[1] || ''}`}`}>
                                  {/* probability bar for scenario column */}
                                  {table.headers[ci] === 'Probability' ? (
                                    <div className="flex items-center gap-2">
                                      <span className={`font-black text-sm ${cell === '65%' ? 'text-emerald-400' : cell === '25%' ? 'text-amber-400' : 'text-slate-500'}`}>{cell}</span>
                                      <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                        <div
                                          className={`h-full rounded-full ${cell === '65%' ? 'bg-emerald-500' : cell === '25%' ? 'bg-amber-500' : 'bg-slate-600'}`}
                                          style={{ width: cell }}
                                        />
                                      </div>
                                    </div>
                                  ) : cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}

                {/* Affirmative defenses */}
                {'defenses' in phase && phase.defenses && (
                  <div>
                    <p className="text-slate-300 text-xs font-black tracking-widest uppercase mb-3">Affirmative Defenses Now Active</p>
                    <div className="grid sm:grid-cols-3 gap-3">
                      {phase.defenses.map((d, di) => (
                        <div key={di} className="border border-emerald-800/50 rounded-lg p-3 bg-emerald-950/20">
                          <div className="flex items-center gap-2 mb-1">
                            <CheckCircle size={12} className="text-emerald-400 flex-shrink-0" />
                            <span className="text-[9px] text-emerald-400 font-black tracking-widest">{d.statute}</span>
                          </div>
                          <p className="text-white font-bold text-xs mb-1">{d.label}</p>
                          <p className="text-slate-400 text-[10px] leading-relaxed">{d.detail}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Probable responses */}
                {'responses' in phase && phase.responses && (
                  <div>
                    <p className="text-slate-300 text-xs font-black tracking-widest uppercase mb-3">Probable Opposing Counsel Response</p>
                    <div className="space-y-2">
                      {phase.responses.map((r, ri) => (
                        <div key={ri} className="flex items-center gap-3">
                          <span className={`text-xs font-black w-9 flex-shrink-0 ${r.pct >= 50 ? 'text-amber-400' : r.pct >= 20 ? 'text-emerald-400' : 'text-slate-500'}`}>{r.pct}%</span>
                          <div className="flex-1 bg-slate-900 rounded-full h-2 overflow-hidden">
                            <div className={`h-full rounded-full ${r.color}`} style={{ width: `${r.pct}%` }} />
                          </div>
                          <span className="text-slate-300 text-xs w-64 text-right hidden sm:block">{r.label}</span>
                        </div>
                      ))}
                      <div className="space-y-1 sm:hidden mt-2">
                        {phase.responses.map((r, ri) => (
                          <p key={ri} className="text-slate-400 text-xs">{r.pct}% — {r.label}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Bottom Line */}
        <div className="border-2 border-red-900 rounded-xl bg-red-950/10 overflow-hidden">
          <div className="px-5 py-4 border-b border-red-900/50 flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
            </span>
            <span className="text-red-500 font-black tracking-widest text-sm">BOTTOM LINE — PINCER COMPLETE</span>
          </div>
          <div className="px-5 py-5">
            <div className="grid sm:grid-cols-2 gap-3 mb-5">
              {BOTTOM_LINE.map((item, i) => (
                <div key={i} className={`border rounded-lg px-4 py-3 bg-black/30 ${item.color}`}>
                  <p className={`font-black text-sm mb-0.5 ${item.color.split(' ').find(c => c.startsWith('text-'))}`}>{item.label}</p>
                  <p className="text-slate-400 text-xs">{item.detail}</p>
                </div>
              ))}
            </div>
            <div className="bg-black/40 border border-slate-800 rounded-lg px-4 py-3 text-sm text-slate-300 leading-relaxed">
              The <span className="text-white font-bold">pincer movement</span> is complete: federal pressure from above (HHS-OCR, HUD-OIG), state court pressure from the side (Dept 12 Motion to Strike), and documented evidence below (VALORAIPLUS_ immutable record).
            </div>
            <div className="mt-4 bg-amber-950/30 border border-amber-800 rounded-lg px-4 py-3">
              <p className="text-amber-400 font-black text-xs tracking-widest mb-1">NEXT COURT ACTION</p>
              <p className="text-white text-sm">Hearing on Motion to Strike — signatory fraud and obstruction evidence will be presented for judicial ruling.</p>
            </div>
          </div>
        </div>

        {/* Footer nav */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 pb-8">
          {[
            { label: 'Active Case', href: '/dept12-case', color: 'border-red-800 text-red-400' },
            { label: 'Judicial Handshake', href: '/judicial-handshake', color: 'border-emerald-800 text-emerald-400' },
            { label: 'Gmail Evidence', href: '/gmail-evidence', color: 'border-blue-800 text-blue-400' },
            { label: 'Surveillance', href: '/surveillance-evidence', color: 'border-amber-800 text-amber-400' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`border rounded-lg px-3 py-2.5 text-center text-xs font-bold hover:bg-white/5 transition-colors ${link.color}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
