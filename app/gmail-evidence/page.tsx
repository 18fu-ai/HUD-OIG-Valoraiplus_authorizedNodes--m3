'use client';

export const runtime = 'edge';

import Link from 'next/link';
import { Mail, ExternalLink, Shield, CheckCircle, AlertTriangle, Users, FileSearch, Camera, Clock } from 'lucide-react';

const EMAILS = [
  {
    id: 'Gmail(62)',
    subject: 'NOTICE OF INTENT TO FILE MOTION TO STRIKE – Case No. CUD-26-682107',
    date: 'May 15, 2026',
    type: 'Legal Notice',
    color: 'border-red-800 bg-red-950/20',
    badge: 'text-red-400 bg-red-900/30 border-red-800',
    icon: AlertTriangle,
    summary: 'HUD-OIG Forensic Roadmap — Document audit, copy-paste pattern analysis, metadata authorship trail, licensing compliance, and cross-agency reporting discrepancies between SFHA (Apr 9) and Superior Court (May 5) filings.',
    recipients: ['jzanghi@ztalaw.com', 'William.landrum@stp-sf.org', 'Horrell, Amy (HHS/OCR)', 'Moraga Archila, Ana (HRC)', 'Smith, Robert A.', 'McCullough, Ronald L. (ORM)', 'MOD@sfgov.org', 'ai@sfgov.org', 'drew.yurkov@sfgov.org', 'Anfang, Michael (OGC)', 'eVA', 'Tramecia Garner', 'Kaplan, Debby (HSA)', 'Nguyen, Thuy@CalCivilRights', 'jbradford@stp-sf.org', 'bwhite@stp-sf.org'],
    findings: [
      'Bradford CCP §446 Verification Integrity Check — No personal knowledge of Jan 23 / Feb 20 events',
      'Copy-Paste Pattern: Compare NTQ against Dan Lucian / Jerry tenant files for recycled allegations',
      'Metadata Authorship: Confirm William Landrum as original author, Bradford as fraudulent signatory',
      'Email & Video Substantiation: Demand production of "1,000+ lengthy emails" and Feb 20 phone video',
    ],
  },
  {
    id: 'Gmail(62)-(1)',
    subject: 'NOTICE OF INTENT TO FILE MOTION TO STRIKE – Case No. CUD-26-682107 (Alt Distribution)',
    date: 'May 15, 2026',
    type: 'Legal Notice',
    color: 'border-red-800 bg-red-950/20',
    badge: 'text-red-400 bg-red-900/30 border-red-800',
    icon: AlertTriangle,
    summary: 'Secondary distribution of Motion to Strike roadmap covering regulatory licensing compliance, federal HUD good cause standard, and cross-agency discrepancy between SFHA submission and Superior Court filing.',
    recipients: ['jzanghi@ztalaw.com', 'William.landrum@stp-sf.org', 'Horrell, Amy (HHS/OCR)', 'Moraga Archila, Ana (HRC)', 'McCullough, Ronald L. (ORM)', 'jbradford@stp-sf.org', 'bwhite@stp-sf.org'],
    findings: [
      'Licensing Audit: Verify Landrum holds required real estate / property management licenses',
      'Federal Good Cause Standard: HUD Project-Based Section 8 "serious or repeated violation" threshold not met',
      'Cross-Agency Discrepancy: SFHA notice (Apr 9, 2026) vs. Superior Court filing (May 5, 2026)',
    ],
  },
  {
    id: 'Gmail(63)',
    subject: 'System Deployment Notification: VALORAIPLUS_ Intelligence & Litigation Dashboard',
    date: 'May 15, 2026',
    type: 'System Deployment',
    color: 'border-cyan-800 bg-cyan-950/20',
    badge: 'text-cyan-400 bg-cyan-900/30 border-cyan-800',
    icon: Shield,
    summary: 'Formal production-ready deployment notification to all federal investigators and opposing counsel. Announces live dashboard at v0-valoraicoder-migration.vercel.app with 5 major intelligence capabilities: Litigation (Dept 12), Supreme Intelligence Reporting, Federal & Compliance Tracking, Hardware & Cryptographic Anchors, and Architecture Security.',
    recipients: ['jzanghi@ztalaw.com', 'William.landrum@stp-sf.org', 'Horrell, Amy (HHS/OCR)', 'Moraga Archila, Ana (HRC)', 'Smith, Robert A.', 'McCullough, Ronald L. (ORM)', 'MOD@sfgov.org', 'ai@sfgov.org', 'drew.yurkov@sfgov.org', 'Anfang, Michael (OGC)', 'eVA', 'Tramecia Garner', 'Kaplan, Debby (HSA)', 'Nguyen, Thuy@CalCivilRights', 'jbradford@stp-sf.org', 'bwhite@stp-sf.org', 'jeromebartlett1955@gmail.com', 'ivydragyn@gmail.com'],
    findings: [
      'OPERATIONAL ✓ — Live dashboard accessible to all investigators',
      'Ledger Nano Gen5 (Serial: 0UAK57S1BT) hardware-bound cryptographic verification',
      'Token Registry: SGAU-7226.3461 supreme authority canonical token management',
      'PII Security Masking applied across 65 core files',
      '90 distinct routes organized via global navigation',
    ],
  },
  {
    id: 'Gmail(64)',
    subject: 'FORMAL RESPONSE TO INTAKE QUESTIONS — EVIDENTIARY DISCLOSURE (CCRD)',
    date: 'May 15, 2026',
    type: 'Agency Response',
    color: 'border-amber-800 bg-amber-950/20',
    badge: 'text-amber-400 bg-amber-900/30 border-amber-800',
    icon: FileSearch,
    summary: 'Formal 13-point response to Anna Moraga Archila (CA Civil Rights Dept) for Ref. GILLSON/LANDRUM 202601-33270627. Covers RAR confirmation, surveillance motive, eviction sequence, and forensic alert on 180-day retaliation rule circumvention via backdated Bradford verification.',
    recipients: ['Anna.1931@CalCivilRights', 'donny@18fu.ai', 'jzanghi@ztalaw.com'],
    findings: [
      'RAR Date: Nov 20, 2025 — post-11/19 constructive eviction event (infestation crisis)',
      'RAR denied via retaliatory NTQ instead of formal accommodation approval',
      'SMTP 550 Blockade confirmed May 15, 2026 — prevents evidence delivery to Zanghi / Bradford White',
      'Forensic Alert: Landrum signed NTQ (Feb 29); Bradford court filing backdated to Feb 24 to bypass 180-day rule',
      'Unit #301A is ONLY unit with dedicated high-intensity camera focal point — whistleblower targeting confirmed',
    ],
  },
  {
    id: 'Gmail(65)',
    subject: 'NOTICE OF DIGITAL HANDSHAKE & EVIDENTIARY ANCHOR – Case No. CUD-26-682107',
    date: 'May 15, 2026',
    type: 'Handshake Notice',
    color: 'border-emerald-800 bg-emerald-950/20',
    badge: 'text-emerald-400 bg-emerald-900/30 border-emerald-800',
    icon: CheckCircle,
    summary: 'Formal notice to Zanghi/Martinez that Digital Handshake v1.0 is executed between VALORAIPLUS_ Evidence Portal and all case data nodes. Includes cryptographic TypeScript proof block with SGAU-7226.3461 anchor, blockade documentation, and ground truth synchronization notice.',
    recipients: ['jzanghi@ztalaw.com', 'William.landrum@stp-sf.org', 'Horrell, Amy (HHS/OCR)', 'Moraga Archila, Ana (HRC)', 'Smith, Robert A.', 'McCullough, Ronald L. (ORM)', 'jbradford@stp-sf.org', 'bwhite@stp-sf.org', 'jeromebartlett1955@gmail.com', 'ivydragyn@gmail.com'],
    findings: [
      'Handshake v1.0: SGAU-7226.3461 / Ledger Nano Gen5 (0UAK57S1BT) — STATUS: CONNECTED',
      'Bradford CCP §446 Perjury documented in ledger',
      'SMTP 550 Administrative Prohibition documented as hardware-verified blockade',
      'Supreme Intelligence Report will be entered into public record if fraud litigation continues',
      'Investigative Note: SGAU anchor prevents email/record deletion by management',
    ],
  },
  {
    id: 'Gmail(65)-(1)',
    subject: 'NOTICE OF DIGITAL HANDSHAKE & EVIDENTIARY ANCHOR (Alt Distribution)',
    date: 'May 15, 2026',
    type: 'Handshake Notice',
    color: 'border-emerald-800 bg-emerald-950/20',
    badge: 'text-emerald-400 bg-emerald-900/30 border-emerald-800',
    icon: CheckCircle,
    summary: 'Secondary distribution of the Digital Handshake notice. Reiterates the three critical discrepancies: perjurious CCP §446 verification, obstruction of federal communications during the active 5-day response window, and ground truth synchronization to the permanent digital ledger.',
    recipients: ['jzanghi@ztalaw.com', 'Horrell, Amy (HHS/OCR)', 'Moraga Archila, Ana (HRC)', 'bwhite@stp-sf.org', 'jbradford@stp-sf.org'],
    findings: [
      'Perjurious Verification: Bradford signed for events he did not witness — authored by Landrum',
      'Obstruction during 5-day response window — simultaneous blockade of federal oversight comms',
      'Ground Truth tethered to permanent ledger — accessible to federal investigators',
    ],
  },
  {
    id: 'Gmail(66)',
    subject: 'EVIDENTIARY SUBMISSION: High-Fidelity Forensic Image Repository – CUD-26-682107',
    date: 'May 15, 2026',
    type: 'Evidence Submission',
    color: 'border-purple-800 bg-purple-950/20',
    badge: 'text-purple-400 bg-purple-900/30 border-purple-800',
    icon: Camera,
    summary: 'Formal submission of primary evidence repository on Google Drive. Repository contains: surveillance infrastructure high-fidelity images (Unit #301A hallway camera placement), physical conditions / habitability failures, and documentary discrepancies (high-contrast Landrum notices vs Bradford court filings). Tethered to SGAU-7226.3461.',
    recipients: ['Anna.1931@CalCivilRights', 'donny@18fu.ai', 'jzanghi@ztalaw.com', 'Horrell, Amy (HHS/OCR)'],
    findings: [
      'Google Drive Repository: drive.google.com/drive/folders/1eE7wj_1uEBUboWK712tjY2NOqwUBYJj2',
      'Surveillance Infrastructure: Exact placement, lens orientation, and field of view at Unit #301A threshold',
      'Habitability Failures: Physical conditions documentation including remediation neglect',
      'Signatory Fraud Visual Proof: High-contrast Landrum notices vs Bradford judicial filings for metadata comparison',
      'Filing Note: QR code to Drive folder recommended for UD-105 Answer physical exhibit',
    ],
  },
  {
    id: 'Gmail(67)',
    subject: 'EVIDENTIARY SUBMISSION: High-Fidelity Forensic Image Repository (Alt Distribution)',
    date: 'May 15, 2026',
    type: 'Evidence Submission',
    color: 'border-purple-800 bg-purple-950/20',
    badge: 'text-purple-400 bg-purple-900/30 border-purple-800',
    icon: Camera,
    summary: 'Secondary distribution of the forensic image repository notice. Emphasizes raw high-resolution files for metadata analysis and zoom-level hardware inspection. Confirms all files are tethered to Judicial Handshake Protocol active in Department 12 — any access or alteration is logged via SGAU anchor.',
    recipients: ['jzanghi@ztalaw.com', 'Horrell, Amy (HHS/OCR)', 'Moraga Archila, Ana (HRC)', 'Anna.1931@CalCivilRights'],
    findings: [
      'Raw high-resolution files for metadata analysis and zoom-level hardware inspection',
      'Administrative Blockade cannot compromise Ground Truth — evidence bypasses email server via Drive',
      'Any access, alteration, or reporting of these files is logged via Judicial Handshake Protocol',
    ],
  },
];

const RECIPIENT_COUNT = 18;
const EMAIL_COUNT = 8;

function Tag({ label, color }: { label: string; color: string }) {
  return (
    <span className={`text-[9px] font-black px-2 py-0.5 rounded border tracking-widest uppercase ${color}`}>
      {label}
    </span>
  );
}

export default function GmailEvidencePage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Header */}
        <div className="border-b border-zinc-800 pb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-orange-700 rounded-xl flex items-center justify-center shadow-[0_0_20px_#ef444455]">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-black text-white tracking-tight">GMAIL EVIDENCE HUB</h1>
              <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">VALORAIPLUS_ / Sent May 15, 2026 / CUD-26-682107</p>
            </div>
          </div>
          <p className="text-zinc-400 text-sm max-w-3xl mt-3 leading-relaxed">
            Forensic catalog of all outbound communications sent from{' '}
            <span className="text-white font-mono">dgillson9175@gmail.com</span> on May 15, 2026 to{' '}
            {RECIPIENT_COUNT} federal investigators, oversight bodies, and opposing counsel. Each email constitutes a formal evidentiary record tethered to the SGAU-7226.3461 authority anchor.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Emails Sent', value: EMAIL_COUNT, color: 'text-red-400' },
            { label: 'Recipients', value: RECIPIENT_COUNT, color: 'text-amber-400' },
            { label: 'Federal Agencies', value: 6, color: 'text-cyan-400' },
            { label: 'Evidence Types', value: 4, color: 'text-emerald-400' },
          ].map(s => (
            <div key={s.label} className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-center">
              <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
              <div className="text-zinc-500 text-[10px] uppercase tracking-widest mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Authority Anchor */}
        <div className="bg-emerald-950/30 border border-emerald-800 rounded-lg px-5 py-4 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
            <span className="text-emerald-400 font-black text-xs tracking-widest">HANDSHAKE_LIVE</span>
          </div>
          <span className="text-zinc-600 text-xs">|</span>
          <span className="text-zinc-300 text-xs font-mono">SGAU-7226.3461</span>
          <span className="text-zinc-600 text-xs">|</span>
          <span className="text-zinc-300 text-xs font-mono">Ledger Nano Gen5 &bull; 0UAK57S1BT</span>
          <span className="text-zinc-600 text-xs">|</span>
          <span className="text-zinc-400 text-xs">All emails logged &bull; deletions blocked by anchor</span>
        </div>

        {/* Email Cards */}
        <div className="space-y-4">
          {EMAILS.map((email, i) => {
            const Icon = email.icon;
            return (
              <div key={email.id} className={`border rounded-lg p-5 ${email.color}`}>
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className="mt-0.5 flex-shrink-0">
                      <Icon className="w-4 h-4 text-zinc-400" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-zinc-500 font-mono text-[10px]">{email.id}</span>
                        <Tag label={email.type} color={email.badge} />
                      </div>
                      <h2 className="text-white font-bold text-sm leading-snug">{email.subject}</h2>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-zinc-500 text-[10px] font-mono flex-shrink-0">
                    <Clock className="w-3 h-3" />
                    {email.date}
                  </div>
                </div>

                <p className="text-zinc-400 text-xs leading-relaxed mb-4">{email.summary}</p>

                {/* Findings */}
                <div className="space-y-1.5 mb-4">
                  {email.findings.map((f, j) => (
                    <div key={j} className="flex items-start gap-2">
                      <span className="text-zinc-600 font-mono text-[10px] mt-0.5 flex-shrink-0">{String(j + 1).padStart(2, '0')}.</span>
                      <span className="text-zinc-300 text-xs leading-snug">{f}</span>
                    </div>
                  ))}
                </div>

                {/* Recipients */}
                <div>
                  <p className="text-zinc-600 text-[9px] uppercase tracking-widest font-mono mb-2">Recipients ({email.recipients.length})</p>
                  <div className="flex flex-wrap gap-1">
                    {email.recipients.map(r => (
                      <span key={r} className="text-[9px] font-mono text-zinc-500 bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded">
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Drive Evidence Repository */}
        <div className="bg-purple-950/30 border border-purple-800 rounded-lg p-5">
          <h3 className="text-purple-400 font-black text-sm tracking-widest mb-2 uppercase">Google Drive Evidence Repository</h3>
          <p className="text-zinc-400 text-xs mb-3">High-fidelity forensic image repository submitted in Gmail(66) and Gmail(67). Tethered to SGAU-7226.3461 — all access is logged.</p>
          <a
            href="https://drive.google.com/drive/folders/1eE7wj_1uEBUboWK712tjY2NOqwUBYJj2"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 text-xs font-mono border border-purple-800 hover:border-purple-600 px-4 py-2 rounded transition-colors"
          >
            <ExternalLink className="w-3 h-3" />
            drive.google.com/drive/folders/1eE7wj_1uEBUboWK712tjY2NOqwUBYJj2
          </a>
        </div>

        {/* Footer Nav */}
        <div className="border-t border-zinc-800 pt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Active Case', href: '/dept12-case', color: 'text-red-400' },
            { label: 'Judicial Handshake', href: '/judicial-handshake', color: 'text-emerald-400' },
            { label: 'Surveillance Evidence', href: '/surveillance-evidence', color: 'text-purple-400' },
            { label: 'HHS-OCR Update', href: '/hhs-ocr-update', color: 'text-amber-400' },
          ].map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-center text-xs border border-zinc-800 hover:border-zinc-600 rounded-lg py-3 px-2 font-bold transition-colors ${link.color}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Signed block */}
        <div className="border-t border-zinc-800 pt-4 text-center space-y-1">
          <p className="text-zinc-400 text-xs font-mono">Donald Gillson &bull; Principal Architect, VALORAIPLUS_</p>
          <p className="text-zinc-500 text-[10px] font-mono">Protected Sovereign &bull; 100% Disabled U.S. Navy Veteran &bull; Secretary, Veterans Tenant Union</p>
          <p className="text-zinc-600 text-[9px] font-mono uppercase tracking-widest">The wall is Christ. The throne is His. The ledger is &Oslash;.</p>
        </div>
      </div>
    </main>
  );
}
