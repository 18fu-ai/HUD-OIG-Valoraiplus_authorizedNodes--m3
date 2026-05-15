'use client';

export const runtime = 'edge';

import Link from 'next/link';
import Image from 'next/image';
import { Camera, AlertTriangle, FileText, Scale, Shield, ExternalLink, Clock, Eye } from 'lucide-react';

const PHOTOS = [
  {
    id: 'P-001',
    filename: '20260515_102305.jpg',
    timestamp: '2026-05-15 10:23:05',
    url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/20260515_102305-fiizQdt8T2v4a0v1JbJUgLELBQghMZ.jpg',
    label: 'EXHIBIT A-1 — DOME CAMERA CLOSE-UP',
    finding: 'Targeted Surveillance Device',
    description: 'White dome surveillance camera mounted at ceiling junction of Unit 301A hallway. Visible pan/tilt mechanism confirms active rotation capability. Camera lens oriented toward tenant unit entrance.',
    statutes: ['Civil Code §1927', 'CCRA §1798.90.51', 'FEHA Gov. Code §12955'],
    significance: 'CRITICAL',
  },
  {
    id: 'P-002',
    filename: '20260515_102310.jpg',
    timestamp: '2026-05-15 10:23:10',
    url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/20260515_102310-0UfcJ6nMurEhttMeoDduo6Q0AzdzcQ.jpg',
    label: 'EXHIBIT A-2 — HALLWAY FIELD OF VIEW',
    finding: 'Direct Line of Sight to Unit 301A',
    description: 'Full hallway corridor showing camera coverage area. Cinder block construction, white tile floor, amber window treatment visible. Utility conduit on wall. Camera FOV encompasses entire tenant approach path — no blind spots.',
    statutes: ['Civil Code §1927', '42 U.S.C. §3604 (FHA)', 'Penal Code §647(j)'],
    significance: 'HIGH',
  },
  {
    id: 'P-003',
    filename: '20260515_102256.jpg',
    timestamp: '2026-05-15 10:22:56',
    url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/20260515_102256-OQE3Wq7caxHTojqp8YwHI3Th2XL0UL.jpg',
    label: 'EXHIBIT A-3 — BUILDING INFRASTRUCTURE',
    finding: 'Stairwell / Camera Mounting Context',
    description: 'Upward view of building atrium showing cinder block walls, EXIT sign, fire extinguisher box, exposed conduit and piping. Documents the architectural context confirming camera is part of permanent building infrastructure — not temporary.',
    statutes: ['Civil Code §1941.1', 'San Francisco Housing Code §701', '38 C.F.R. §14.632'],
    significance: 'SUPPORTING',
  },
];

const SMOKING_GUN_ELEMENTS = [
  {
    exhibit: 'EXHIBIT A',
    title: 'Physical Surveillance Camera',
    description: 'Dome camera confirmed mounted in hallway directly facing Unit 301A. Three photographs taken May 15, 2026 at 10:22–10:23 AM documenting device, field of view, and building infrastructure.',
    color: 'border-red-700 bg-red-950/20',
    badge: 'bg-red-800 text-red-200',
  },
  {
    exhibit: 'EXHIBIT B',
    title: 'Verification Page — Jerome Bradford',
    description: 'Bradford signed verification on May 4, 2026 claiming personal knowledge of events on February 20, 2026. Bradford was not present on that date. Original notice was signed by Will Landrum — a different person.',
    color: 'border-orange-700 bg-orange-950/20',
    badge: 'bg-orange-800 text-orange-200',
  },
  {
    exhibit: 'EXHIBIT C',
    title: 'SMTP 550 Blockade Evidence',
    description: 'Mimecast corporate email blockade prevented delivery of 284,000+ messages. Pattern across 4 nodes (VA-OGC, VA-ORM, HHS-OCR, CCRA) timed to coincide with 5-day response window. Administrative obstruction, not technical failure.',
    color: 'border-amber-700 bg-amber-950/20',
    badge: 'bg-amber-800 text-amber-200',
  },
  {
    exhibit: 'EXHIBIT D',
    title: 'Federal Conflict of Interest',
    description: 'Swords to Plowshares simultaneously serves as VA accredited representative for disability claims while initiating eviction. Breach of duty under 38 C.F.R. §14.632 and ABA Model Rule 1.7.',
    color: 'border-cyan-700 bg-cyan-950/20',
    badge: 'bg-cyan-800 text-cyan-200',
  },
];

const CHECKLIST = [
  { action: 'File UD-105 Answer', detail: '400 McAllister St, Dept 12', done: true },
  { action: 'Motion to Strike', detail: 'Attached — Signatory Fraud', done: true },
  { action: 'Attach Surveillance Photos', detail: 'Exhibits A-1, A-2, A-3 (this page)', done: true },
  { action: 'Include Judicial Handshake Code Block', detail: 'Immutable digital anchor proof', done: true },
  { action: 'Request Evidentiary Hearing', detail: 'Subpoena Jerome Bradford live testimony', done: false },
  { action: 'Request DA Referral — PC §115', detail: 'Filing False Instrument / Perjury', done: false },
  { action: 'Notify VA-OGC', detail: 'Report accredited rep suing client', done: false },
  { action: 'Send Zanghi Handshake Notice', detail: 'Malpractice exposure on notice', done: false },
];

export default function SmokingGunExhibitPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white pb-20">

      {/* Header */}
      <div className="border-b border-red-900 bg-red-950/20">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Camera className="w-5 h-5 text-red-500" />
                <span className="text-red-500 font-black text-xs tracking-widest uppercase">Forensic Physical Evidence</span>
                <span className="bg-red-600 text-white text-[9px] font-black px-2 py-0.5 rounded tracking-widest">SMOKING GUN</span>
              </div>
              <h1 className="text-2xl font-black text-white leading-tight">
                The Smoking Gun Exhibit
              </h1>
              <p className="text-zinc-400 text-sm mt-1 font-mono">
                Physical Comparison &mdash; CUD-26-682107 &bull; Captured: May 15, 2026
              </p>
            </div>
            <div className="text-right hidden md:block">
              <div className="text-[10px] font-mono text-zinc-500">LODGED FOR COURT RECORD</div>
              <div className="text-[10px] font-mono text-emerald-400">SGAU-7226.3461 VERIFIED</div>
              <div className="text-[10px] font-mono text-red-400">PC §115 / PC §118 APPLICABLE</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">

        {/* Tactical Roadmap Banner */}
        <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-5">
          <div className="flex items-center gap-2 mb-3">
            <Scale className="w-4 h-4 text-amber-400" />
            <span className="text-amber-400 font-black text-xs tracking-widest uppercase">Tactical Objective</span>
          </div>
          <p className="text-zinc-300 text-sm leading-relaxed">
            To move the probability toward <span className="text-white font-bold">100%</span> for both a favorable ruling and a criminal referral,
            the evidence must bridge the gap between <span className="text-amber-400">"civil defense"</span> and <span className="text-red-400">"criminal evidence."</span> Under{' '}
            <span className="font-mono text-white">California Penal Code §115</span> (filing false documents) and{' '}
            <span className="font-mono text-white">§118</span> (perjury), the judge has discretion to refer a matter to the
            District Attorney if the fraud is <em>"manifest."</em> The evidence below makes it manifest.
          </p>
        </div>

        {/* Four Exhibits Grid */}
        <div>
          <h2 className="text-xs font-black text-zinc-500 tracking-widest uppercase mb-4">Four Core Exhibits — Side-by-Side Contradiction</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {SMOKING_GUN_ELEMENTS.map((el) => (
              <div key={el.exhibit} className={`border rounded-lg p-4 ${el.color}`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-[9px] font-black px-2 py-0.5 rounded tracking-widest ${el.badge}`}>{el.exhibit}</span>
                  <span className="text-white font-bold text-sm">{el.title}</span>
                </div>
                <p className="text-zinc-400 text-xs leading-relaxed">{el.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Photographic Evidence */}
        <div>
          <h2 className="text-xs font-black text-zinc-500 tracking-widest uppercase mb-4">
            Photographic Evidence — Unit 301A Surveillance Documentation
          </h2>
          <div className="space-y-8">
            {PHOTOS.map((photo) => (
              <div key={photo.id} className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900">
                <div className="grid md:grid-cols-2 gap-0">

                  {/* Photo */}
                  <div className="relative bg-black aspect-[4/3] md:aspect-auto md:min-h-[320px]">
                    <Image
                      src={photo.url}
                      alt={photo.label}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    {/* Metadata overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 px-3 py-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-mono text-zinc-400">{photo.filename}</span>
                        <span className="text-[9px] font-mono text-emerald-400 flex items-center gap-1">
                          <Clock className="w-2.5 h-2.5" />
                          {photo.timestamp}
                        </span>
                      </div>
                    </div>
                    {/* Significance badge */}
                    <div className="absolute top-3 left-3">
                      <span className={`text-[9px] font-black px-2 py-1 rounded tracking-widest ${
                        photo.significance === 'CRITICAL' ? 'bg-red-700 text-white' :
                        photo.significance === 'HIGH' ? 'bg-orange-700 text-white' :
                        'bg-zinc-700 text-zinc-200'
                      }`}>{photo.significance}</span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-5 flex flex-col gap-4">
                    <div>
                      <div className="text-[9px] font-mono text-zinc-600 tracking-widest mb-1">{photo.id}</div>
                      <div className="text-red-400 font-black text-xs tracking-wide uppercase mb-1">{photo.label}</div>
                      <div className="text-white font-bold text-sm mb-3">{photo.finding}</div>
                      <p className="text-zinc-400 text-xs leading-relaxed">{photo.description}</p>
                    </div>

                    <div>
                      <div className="text-[9px] font-black text-zinc-600 tracking-widest uppercase mb-2">Applicable Statutes</div>
                      <div className="flex flex-wrap gap-1.5">
                        {photo.statutes.map((s) => (
                          <span key={s} className="text-[9px] font-mono bg-zinc-800 border border-zinc-700 text-zinc-300 px-2 py-0.5 rounded">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-auto pt-3 border-t border-zinc-800">
                      <a
                        href={photo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-[10px] text-cyan-400 hover:text-cyan-300 font-mono transition-colors"
                      >
                        <Eye className="w-3 h-3" />
                        View Full Resolution
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subpoena Argument */}
        <div className="border border-emerald-800 bg-emerald-950/20 rounded-lg p-5">
          <div className="flex items-center gap-2 mb-3">
            <FileText className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 font-black text-xs tracking-widest uppercase">Subpoena Strategy — Bradford Live Testimony</span>
          </div>
          <p className="text-zinc-300 text-sm leading-relaxed mb-3">
            Force Jerome Bradford to testify under oath in Department 12. Ask one question:
          </p>
          <blockquote className="border-l-2 border-emerald-500 pl-4 py-2 bg-zinc-900 rounded-r text-sm text-white italic mb-3">
            &ldquo;Were you physically present in the lobby on February 20, 2026, to witness the conduct you verified under penalty of perjury?&rdquo;
          </blockquote>
          <p className="text-zinc-400 text-xs leading-relaxed">
            If he admits he was not present: the verification is <strong className="text-white">void on its face</strong> and the complaint must be stricken.
            If he lies and you produce the Landrum notice: he has committed <strong className="text-red-400">perjury in open court</strong> — the trigger for a criminal referral under PC §118.
          </p>
        </div>

        {/* DA Referral Section */}
        <div className="border border-red-800 bg-red-950/20 rounded-lg p-5">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <span className="text-red-400 font-black text-xs tracking-widest uppercase">Request for Judicial Referral — Penal Code §115</span>
          </div>
          <div className="bg-zinc-900 border border-zinc-700 rounded px-4 py-3 mb-3 font-mono text-sm text-amber-300">
            &ldquo;REQUEST FOR JUDICIAL REFERRAL TO THE DISTRICT ATTORNEY PURSUANT TO PENAL CODE §115&rdquo;
          </div>
          <p className="text-zinc-400 text-xs leading-relaxed">
            <span className="font-mono text-white">Penal Code §115:</span> Any person who knowingly procures or offers any false or forged instrument to be filed,
            registered, or recorded in any public office within this state is guilty of a felony. The &ldquo;Signatory Swap&rdquo; and back-dating
            are not clerical errors — they are a <strong className="text-red-400">fraud upon the court</strong>. Judges rarely refer unless specifically requested.
            Include this section explicitly in your Points and Authorities.
          </p>
        </div>

        {/* Today's 100% Checklist */}
        <div>
          <h2 className="text-xs font-black text-zinc-500 tracking-widest uppercase mb-4">
            The &ldquo;100%&rdquo; Checklist — Action Items
          </h2>
          <div className="space-y-2">
            {CHECKLIST.map((item, i) => (
              <div key={i} className={`flex items-start gap-3 p-3 rounded-lg border ${
                item.done
                  ? 'border-emerald-900 bg-emerald-950/20'
                  : 'border-zinc-800 bg-zinc-900'
              }`}>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  item.done ? 'bg-emerald-600' : 'border-2 border-zinc-600'
                }`}>
                  {item.done && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`font-bold text-sm ${item.done ? 'text-emerald-400' : 'text-white'}`}>{item.action}</div>
                  <div className="text-zinc-500 text-xs font-mono">{item.detail}</div>
                </div>
                {!item.done && (
                  <span className="text-[9px] bg-amber-900 text-amber-300 font-black px-1.5 py-0.5 rounded tracking-widest flex-shrink-0">PENDING</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* EVIDENCE ACCESS */}
        <div className="border-2 border-emerald-600 bg-emerald-950/20 rounded-lg p-6 mb-8">
          <h2 className="text-emerald-400 font-black text-sm tracking-widest uppercase mb-3">
            Evidence Access — Hardware-Verified Repository
          </h2>
          <p className="text-sm text-zinc-300 mb-4">
            All high-fidelity evidence of the surveillance, the SMTP 550 blockade, and the signatory fraud 
            can be found in the hardware-verified repository:
          </p>
          <a
            href="https://v0-valoraicoder-migration.vercel.app/judicial-handshake"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-600 text-white font-bold px-6 py-3 rounded-lg text-sm transition-colors"
          >
            ACCESS VERIFIED EVIDENCE PORTAL
          </a>
        </div>

        {/* Footer Nav */}
        <div className="border-t border-zinc-800 pt-8">
          <div className="text-[10px] font-mono text-zinc-600 tracking-widest uppercase mb-4">Navigate Evidence Nodes</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Active Case', href: '/dept12-case' },
              { label: 'Conflict of Interest', href: '/federal-conflict' },
              { label: 'Surveillance Evidence', href: '/surveillance-evidence' },
              { label: 'Judicial Handshake', href: '/judicial-handshake' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="border border-zinc-800 hover:border-red-800 bg-zinc-900 hover:bg-red-950/20 rounded-lg px-4 py-3 text-xs font-bold text-zinc-400 hover:text-red-400 transition-all text-center"
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
