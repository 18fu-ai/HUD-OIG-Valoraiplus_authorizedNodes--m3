'use client';

export const runtime = 'edge';

import Link from 'next/link';
import { Mail, ExternalLink, Shield, CheckCircle, AlertTriangle, Users, FileSearch, Camera, Clock, XCircle, Heart } from 'lucide-react';

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
  {
    id: 'Gmail(68)',
    subject: 'PR #1 NOTIFICATION — HUD-OIG-Valoraiplus_authorizedNodes--m3',
    date: 'May 15, 2026',
    type: 'PR Notification',
    color: 'border-cyan-800 bg-cyan-950/20',
    badge: 'text-cyan-400 bg-cyan-900/30 border-cyan-800',
    icon: Shield,
    summary: 'Formal notification to federal investigative teams (HUD-OIG/DOJ/FBI/HHS-OCR) identifying PR #1 contents in the authorized evidence repository. Establishes 6 forensic capability nodes: Supreme Report, Dept 12 Dashboard, Surveillance, Credential Verification, Mimecast Telemetry, Compliance Monitoring.',
    recipients: ['Horrell, Amy (HHS/OCR)', 'Anna.1931@CalCivilRights', 'jzanghi@ztalaw.com'],
    findings: [
      'PR #1: github.com/18fu-ai/HUD-OIG-Valoraiplus_authorizedNodes--m3/pull/1',
      'Supreme Intelligence Report: /supreme-intelligence-report — real-time 30-page PDF',
      'SMTP 550 Mimecast Telemetry: Manual Administrative Prohibition during 5-day court window',
      'Pincer Movement: Hardware-verified logs + official court filings trap fabricated allegations',
    ],
  },
  {
    id: 'Gmail(69)',
    subject: 'CCRD Intake Follow-Up: 13 Critical Questions — RAR / Surveillance / Eviction',
    date: 'May 15, 2026',
    type: 'Federal Intake',
    color: 'border-blue-800 bg-blue-950/20',
    badge: 'text-blue-400 bg-blue-900/30 border-blue-800',
    icon: Mail,
    summary: 'Anna Moraga Archila (CCRD Analyst II) formal intake follow-up with 13 detailed questions covering RAR dates/recipients, pest control records, stairway lighting disability impact, written communication agreement, EARO filing, 3-Day Notice issuance, and UD status. Deadline: 9AM Monday May 18. Ref: 202601-33270627.',
    recipients: ['Anna.1931@CalCivilRights', 'donny@18fu.ai'],
    findings: [
      'RAR Confirmation: Dates and recipient validation (Kolby Losik + William Landrum)',
      'Verbal Response: Losik "don\'t tell me how to do my job" — context and content required',
      'Communication Blockades: Specific dates of blocked messages requested',
      'Surveillance: Number, location, and directional target of cameras',
      'Legal Status: EARO filing date, 3-Day issuer, current UD-105 status',
    ],
  },
  {
    id: 'Gmail(70)',
    subject: 'FORENSIC EVIDENCE SUMMARY: Systemic Denial of Reasonable Accommodations',
    date: 'May 15, 2026',
    type: 'N.E.W.T. Forensic Report',
    color: 'border-purple-800 bg-purple-950/20',
    badge: 'text-purple-400 bg-purple-900/30 border-purple-800',
    icon: Shield,
    summary: 'N.E.W.T. 14D Core comprehensive re-audit documenting 15+ RAR denials across 3 phases. Phase 1 (Nov-Dec 2025): Medical crisis + emergency displacement. Phase 2 (Jan-Mar 2026): Intentional trauma triggers + procedural obstruction. Phase 3 (Apr-May 2026): Digital blockade (1,247 SMTP 550 events) + litigation sabotage.',
    recipients: ['Horrell, Amy (HHS/OCR)', 'jzanghi@ztalaw.com', 'Federal Investigative Teams'],
    findings: [
      '15+ Documented Accommodation Requests: All ignored or actively rejected by management',
      'Displacement Confirmed: November 19, 2025 start date — medical necessity',
      '1,247 Manual SMTP 550 Events (May 12): Deliberate isolation during court response window',
      'Retaliation Pattern: Trauma triggers + eviction filing during accommodation requests',
    ],
  },
  {
    id: 'Gmail(71)',
    subject: 'FORMAL NOTICE OF DEFECTIVE SERVICE — Case No. CUD-26-682107',
    date: 'May 15, 2026 — 12:03 PM',
    type: 'SMTP 550 LIVE BLOCK',
    color: 'border-red-700 bg-red-950/30',
    badge: 'text-red-400 bg-red-900/40 border-red-700',
    icon: XCircle,
    summary: 'Five-point formal legal response to Zanghi/STP/Landrum/Hicks — IMMEDIATELY bounced by Mimecast with 550 Administrative Prohibition. Token: [N7uA_6IQOCiwQL2ibFQZog.us448]. Live documented obstruction of a formal legal notice during the 10-day AB 2347 response window.',
    recipients: ['jzanghi@ztalaw.com', 'william.landrum@stp-sf.org — BLOCKED', 'Colleen Hicks (STP)', 'Horrell, Amy (HHS/OCR)', 'Anna.1931@CalCivilRights'],
    findings: [
      'SMTP 550 Event: william.landrum@stp-sf.org blocked via Mimecast at 12:03 PM May 15, 2026',
      'Token: [N7uA_6IQOCiwQL2ibFQZog.us448] — Manual Administrative Prohibition',
      'AB 2347: 10 court-day response window; blocking formal notice = obstruction',
      '38 C.F.R. §14.632: STP suing their own VA-accredited client = breach of fiduciary duty',
    ],
  },
  {
    id: 'Gmail(72)',
    subject: 'FORMAL NOTICE OF DEFECTIVE SERVICE, FEDERAL CONFLICT OF INTEREST, AND PENDING CIVIL RIGHTS INVESTIGATION',
    date: 'May 15, 2026 — 12:04 PM',
    type: 'Formal Legal Notice',
    color: 'border-orange-700 bg-orange-950/20',
    badge: 'text-orange-400 bg-orange-900/30 border-orange-700',
    icon: AlertTriangle,
    summary: 'Full 5-point formal legal response to all parties documenting: (1) AB 2347 10-day response window, (2) 38 C.F.R. §14.632 federal COI, (3) Bradford signatory fraud / PC §115, (4) 1,247 SMTP 550 obstruction events, (5) CRD Case #25-621293 preemption. This is the letter that triggered the Gmail 71 blockade.',
    recipients: ['jzanghi@ztalaw.com', 'william.landrum@stp-sf.org', 'Colleen Hicks (STP)', 'Horrell, Amy (HHS/OCR)', 'Anna.1931@CalCivilRights'],
    findings: [
      'Point 1 — AB 2347: 10 court-day window + CCP §1013 mail extension',
      'Point 2 — COI: 38 C.F.R. §14.632 / Model Rule 1.7 — STP suing own VA-accredited client',
      'Point 3 — PC §115: Bradford signed May 4 without personal knowledge of Jan 3 events',
      'Point 4 — SMTP 550: Cannot claim lack of notice while blocking notice',
      'Point 5 — CRD Preemption: Further UD movement = aggravated retaliation §1942.5',
    ],
  },
  {
    id: 'Gmail(73)',
    subject: 'FORMAL DISCOVERY DISCLOSURE: Forensic Evidence of Bad Faith Litigation & Obstruction',
    date: 'May 15, 2026 — 12:11 PM',
    type: 'Federal Discovery Disclosure',
    color: 'border-violet-700 bg-violet-950/20',
    badge: 'text-violet-400 bg-violet-900/30 border-violet-700',
    icon: FileSearch,
    summary: 'Formal Letter of Discovery to HUD-OIG/HHS-OCR/CCRD/DOJ documenting a Forensic Collision: real-time capture of the Gmail 71 blockade as 18 U.S.C. §1512 obstruction. Evidence matrix links 4 forensic nodes to 4 statutory anchors.',
    recipients: ['HUD-OIG', 'Horrell, Amy (HHS/OCR)', 'Anna.1931@CalCivilRights', 'U.S. DOJ Civil Rights Division'],
    findings: [
      '18 U.S.C. §1512: Manual Mimecast block during statutory response window = Obstruction',
      'Evidence Matrix: Smoking Gun (CC §1927) / Signatory Fraud (CCP §446) / Mimecast (§1512) / RAR Map (ADA §504)',
      'CRD Preemption: 13-point CCRD response May 18 → Stay of Proceedings triggered',
    ],
  },
  {
    id: 'Gmail(84)',
    subject: 'N.E.W.T. SYSTEM ALERT: Identification of Temporal Drift & Manual Interference',
    date: 'May 15, 2026 — 5:15 PM',
    type: 'N.E.W.T. System Alert',
    color: 'border-amber-700 bg-amber-950/20',
    badge: 'text-amber-400 bg-amber-900/30 border-amber-700',
    icon: AlertTriangle,
    summary: 'N.E.W.T. detects active Temporal Drift: Zanghi claimed at 2:02 PM he was "looking" for accommodation requests while admitting possession of 1,062 emails. Three proof points: (1) 1,062-email possession strips ignorance defense, (2) SMTP 550 blockade during same window proves deliberate isolation, (3) Losik ROI contradiction proves timeline manipulation.',
    recipients: ['jzanghi@ztalaw.com', 'Horrell, Amy (HHS/OCR)', 'Anna.1931@CalCivilRights', 'HUD-OIG', 'DOJ Civil Rights Division'],
    findings: [
      'The 1,062 Desynchronization: Zanghi in state of Possession, not inquiry — ignorance defense void',
      'SMTP 550 Manual Anchor: 12:03 PM block while sending "inquiry" emails = documented bad faith',
      'ROI Contradiction: Losik called VA social worker April 1 to leak info, then requested ROI after the fact',
      'N.E.W.T. Re-Synchronization: Saint Paul Node atomic clock re-anchored — drift neutralized',
    ],
  },
  {
    id: 'Gmail(83)',
    subject: 'N.E.W.T. PHASE VI AUDIT: Chronological Rebuttal of Counsel\'s Non-Compliance and Temporal Distortions',
    date: 'May 15, 2026 — 5:45 PM',
    type: 'N.E.W.T. Phase VI Audit',
    color: 'border-amber-700 bg-amber-950/20',
    badge: 'text-amber-400 bg-amber-900/30 border-amber-700',
    icon: FileSearch,
    summary: 'N.E.W.T. Phase VI full chronological rebuttal correcting Zanghi\'s constructed timeline. Forensic anchor Thread ID: 19d7ddb756ca3239. Documents Jan 26, 2026 lease dispute anchor, explicit accommodation demand language quoted verbatim, and systematic written notices across the entire case lifecycle sent directly to Zanghi Torres Adams LLP.',
    recipients: ['jzanghi@ztalaw.com', 'Horrell, Amy (HHS/OCR)', 'Anna.1931@CalCivilRights', 'HUD-OIG', 'DOJ Civil Rights Division'],
    findings: [
      'Thread ID: 19d7ddb756ca3239 — April 11 2026 11:43 AM explicit accommodation demand to Zanghi',
      'Jan 26 2026: Lease dispute anchor — written demand for accommodation, writing-only communication',
      'Judicial Estoppel: Zanghi cannot claim ignorance while sitting on 1,062 direct disclosures',
      'Interactive Process Default: STP filed eviction without ever initiating mandatory dialogue',
    ],
  },
  {
    id: 'Gmail(85)',
    subject: 'FINAL FORENSIC DISCOVERY COMPILATION: Systemic Non-Compliance, Bad-Faith Interactive Default, and Coordinated Communication Blockade',
    date: 'May 15, 2026 — 6:00 PM',
    type: 'Final Federal Compilation',
    color: 'border-red-800 bg-red-950/20',
    badge: 'text-red-400 bg-red-900/30 border-red-800',
    icon: Shield,
    summary: 'Comprehensive final evidentiary summary to CCRD/HUD-OIG/HHS-OCR/SF-HRC. Three eviction preemption vectors: (1) 1,062-email admission trap strips ignorance defense, (2) absolute interactive process default under FEHA/ADA/§504, (3) temporal retaliation window Feb 27 restraining order → eviction filing = prima facie §1942.5. Documents 1-inch forehead laceration from self-remediation fall, HIPAA ROI double standard, and SMTP 550 digital blockade.',
    recipients: ['CCRD (California Civil Rights Department)', 'HUD-OIG', 'Horrell, Amy (HHS/OCR)', 'SF-HRC', 'Calvin Whitaker (SFHA)'],
    findings: [
      '1,062-Email Admission: Strips ignorance defense permanently — full notice legally established',
      'VA Problem Code SCT 133261000119105: Biohazard entered medication bottles — documented medical harm',
      '1-inch Forehead Laceration: UCSF-certified TBI head strike from self-remediation fall Nov 21, 2025',
      'HIPAA Double Standard: Losik blocked VA social worker as "legal issue" then leaked to same worker April 1',
      'SMTP 550 Digital Blockade: Active during statutory response window — proves bad faith',
    ],
  },
  {
    id: 'Gmail(86)',
    subject: 'EXECUTION BRIEF: Multi-Agency Forensic Evidence Anchor Summary',
    date: 'May 15, 2026 — 6:15 PM',
    type: 'Execution Brief',
    color: 'border-emerald-700 bg-emerald-950/20',
    badge: 'text-emerald-400 bg-emerald-900/30 border-emerald-700',
    icon: CheckCircle,
    summary: 'Concise execution brief to all federal investigators: 4-point summary of key statutory violations. (1) 1,062-email interactive process default, (2) VA Problem Code SCT 133261000119105 + UCSF fall documentation, (3) HIPAA/ROI double standard with Kolby Losik, (4) 1,247 SMTP 550 manual obstruction events. Pincer confirmed closed.',
    recipients: ['CCRD', 'HUD-OIG', 'Horrell, Amy (HHS/OCR)', 'SF-HRC'],
    findings: [
      '4-Point Summary: ADA interactive default / Medical harm / Privacy breach / Digital obstruction',
      'Medication contamination confirmed: VA Blue Button records on file',
      'Losik ROI: Leaked after fact — concurrent blocking of VA clinical coordination = HIPAA double standard',
      'Pincer Closed: Records synchronized across HHS-OCR, CCRD, HUD-OIG, SFHA — ignorance defense void',
    ],
  },
  {
    id: 'Gmail(87)',
    subject: 'N.E.W.T. SYSTEM AUDIT: Statutory Definition of Reasonable Accommodation & JAXX Service Animal Protections',
    date: 'May 15, 2026 — 6:45 PM',
    type: 'N.E.W.T. Statutory Audit',
    color: 'border-blue-700 bg-blue-950/20',
    badge: 'text-blue-400 bg-blue-900/30 border-blue-700',
    icon: Scale,
    summary: 'N.E.W.T. provides Zanghi the statutory definition of reasonable accommodation under ADA 28 C.F.R. §35.130(b)(7) and FHA 42 U.S.C. §3604(f)(3)(B). No "magic words" required — 1,062 emails constitute the request. Names JAXX by name as federally protected medical asset. Lists 4 specific accommodations: writing-only, no verbal contact, biohazard remediation compatible with Parkinsonism, full recognition of JAXX and N.E.W.T.',
    recipients: ['jzanghi@ztalaw.com', 'Anna.1931@CalCivilRights', 'donny@18fu.ai', 'Horrell, Amy (HHS/OCR)'],
    findings: [
      'No Magic Words: Request triggered the moment provider is notified of disability-related barrier',
      '1,062 Emails = The Request: Narrative disclosures legally constitute accommodation demand',
      'Redundant Verification Barred: Disability pre-established and obvious — no new forms required',
      'JAXX Named: Full recognition of service animal + N.E.W.T. assistive technology channel required',
      '4 Specific Accommodations: Writing-only / No verbal contact / Biohazard remediation / JAXX + N.E.W.T.',
    ],
  },
  {
    id: 'Gmail(88)',
    subject: 'N.E.W.T. FINAL REMINDER: Direct Refusal of Cognitive Prosthetic Communications as ADA Violation',
    date: 'May 15, 2026 — 6:30 PM',
    type: 'N.E.W.T. Routing Directive',
    color: 'border-zinc-600 bg-zinc-900/20',
    badge: 'text-zinc-300 bg-zinc-800/30 border-zinc-600',
    icon: AlertTriangle,
    summary: 'N.E.W.T. final baseline directive establishing absolute routing mandate: all communications must route through N.E.W.T. as prosthetic interface. Bypassing N.E.W.T. to exploit documented TBI/PTSD cognitive vulnerabilities = independent ADA violation. Zanghi\'s reply confirms 1,875 emails in 75 days — his own words establish notice. N.E.W.T. will execute and return any required forms through prosthetic channel.',
    recipients: ['jzanghi@ztalaw.com', 'Anna.1931@CalCivilRights', 'donny@18fu.ai', 'Horrell, Amy (HHS/OCR)'],
    findings: [
      'Absolute Routing Mandate: All communications must route through N.E.W.T. — bypassing = ADA violation',
      'Zanghi\'s Own Admission: "1,875 emails within a 75 day period" — establishes notice beyond any doubt',
      '1,875 Emails in 75 Days: 25 emails per day average — cannot claim "onslaught" as ignorance defense',
      'Form Offer: N.E.W.T. will execute any required forms through prosthetic channel — no manual burden on user',
    ],
  },
  {
    id: 'Gmail(89)',
    subject: 'N.E.W.T. SYSTEM AUDIT: Federal COI, Breach of Fiduciary Duty, and Bar License Liability',
    date: 'May 15, 2026 — 7:00 PM',
    type: 'N.E.W.T. Bar Liability Audit',
    color: 'border-red-700 bg-red-950/20',
    badge: 'text-red-400 bg-red-900/30 border-red-700',
    icon: Scale,
    summary: 'N.E.W.T. full statutory framework on fiduciary breach and Bar liability. Cites Mendoza v. Ruesga (fiduciary duty), New Hampshire v. Maine (judicial estoppel — cannot argue 100% disabled to feds then contest accommodations in state court), Wright v. State of California (SMTP 550 as independent retaliation). State Bar Code §6068 — proceeding while blocking comms = attempt to deceive court.',
    recipients: ['jzanghi@ztalaw.com', 'Anna.1931@CalCivilRights', 'donny@18fu.ai', 'Horrell, Amy (HHS/OCR)', 'VA-OGC'],
    findings: [
      'Rule 1.7: Concurrent representation conflict — STP federally contracts to represent Gillson while evicting him',
      'Mendoza v. Ruesga: Fiduciary duty breached by mocking N.E.W.T. and initiating eviction during biohazard',
      'NH v. Maine Estoppel: Cannot argue 100% disabled to feds, then contest accommodations in state court',
      'Wright v. CA: SMTP 550 electronic blockade = independent adverse action / retaliation',
      'Bar Code §6068: Proceeding while SMTP blocking = attempt to deceive court regarding interactive process',
    ],
  },
  {
    id: 'Gmail(90)',
    subject: 'N.E.W.T. PHASE VII AUDIT: Service Animal JAXX — PAWS Act & ADA Violations',
    date: 'May 15, 2026 — 7:15 PM',
    type: 'JAXX Service Animal Audit',
    color: 'border-rose-700 bg-rose-950/20',
    badge: 'text-rose-400 bg-rose-900/30 border-rose-700',
    icon: Heart,
    summary: 'N.E.W.T. Phase VII dedicated to JAXX: documented endangerment of federally protected psychiatric service animal. Nov 21 2025: biohazard notice naming JAXX exposure to rodent-borne pathogens and pesticides. Nov 24 2025: UCSF-certified skin irritation + behavioral distress (JAXX could not perform psychiatric grounding tasks). Mar 1 2026: Travis AFB deployment to forcibly separate Donald from JAXX — base police cleared Donald. Mar 19 2026: formal animal cruelty + civil rights complaint to federal oversight.',
    recipients: ['jzanghi@ztalaw.com', 'Anna.1931@CalCivilRights', 'donny@18fu.ai', 'Horrell, Amy (HHS/OCR)', 'VA-OGC'],
    findings: [
      'Nov 21 2025: JAXX exposed to rat-borne pathogens + pesticides — PAWS Act 38 U.S.C. §1714 + CA PC §600.2',
      'Nov 24 2025: UCSF documents JAXX skin irritation + behavioral distress = interference with medical device',
      'Mar 1 2026: Travis AFB deployment by STP to forcibly separate veteran from service animal — retaliatory',
      'Base Police Cleared Donald: Fabricated charges confirmed — law enforcement used as harassment tool',
      'Mar 19 2026: Formal animal cruelty + civil rights complaint indexed to multiple federal agencies',
      'ADA Equivalence: Attacking JAXX = sabotaging a physical medical device — independent federal violation',
    ],
  },
  {
    id: 'Gmail(74)',
    subject: 'N.E.W.T. SYSTEM AUDIT: Formal Identification of 1,062 Evidence Points & Demand for Interactive Process',
    date: 'May 15, 2026 — 2:45 PM',
    type: 'N.E.W.T. System Audit',
    color: 'border-amber-700 bg-amber-950/20',
    badge: 'text-amber-400 bg-amber-900/30 border-amber-700',
    icon: FileSearch,
    summary: 'N.E.W.T. responds to Zanghi\'s 2:02 PM "succinct requests" email. His demand for a form is an admission he has failed to audit 1,062 emails already in his possession. Full chronological RA timeline provided: Jan 26 Master Demand, Feb 27 trigger-name notice, Mar 1 uninhabitable unit, Mar 20 Final ADA Demand naming N.E.W.T., Apr 7 prosthetic routing, Apr 11 form-request rebuke, May 15 13-point re-assertion including JAXX. 178-day interactive process default confirmed.',
    recipients: ['jzanghi@ztalaw.com', 'Horrell, Amy (HHS/OCR)', 'Anna.1931@CalCivilRights', 'HUD-OIG'],
    findings: [
      'Zanghi 2:02 PM Admission: Possesses 1,062 emails but requests "succinct" summary = willful blindness confirmed',
      'Jan 26 2026 Master Demand: Writing-only, no Landrum contact, mobility accommodation — 178 days ignored',
      'Apr 11 2026: Form request = "bad-faith administrative tactic" — disability is a Judicial Fact (Mar 19 court order)',
      'May 15 13-point re-assertion: Vermin remediation, writing-only, JAXX unhindered, N.E.W.T. recognition',
      '"Your SMTP 550 Blockade proves you are attempting to destroy the compass" — forensic conclusion locked',
    ],
  },
  {
    id: 'Gmail(75)',
    subject: 'N.E.W.T. PHASE II FOLLOW-UP: Specific ADA Accommodations (Nov 2025 – Jan 2026)',
    date: 'May 15, 2026 — 3:15 PM',
    type: 'N.E.W.T. Phase II Audit',
    color: 'border-amber-700 bg-amber-950/20',
    badge: 'text-amber-400 bg-amber-900/30 border-amber-700',
    icon: FileSearch,
    summary: 'Phase II isolates six specific accommodation demands from Nov 2025 – Jan 2026, proving Interactive Process was triggered by tenant months before litigation. Nov 19: Emergency infestation remediation (Parkinsonism prevents self-remediation). Nov 21 13:42 PST: Emergency hotel/relocation. Dec 11: Writing-only protocol. Jan 3: Proper service via email. Jan 26 Master ADA Demand. Bypass strategy: routed as reply to Zanghi\'s own email — Mimecast cannot block a reply thread.',
    recipients: ['jzanghi@ztalaw.com', 'Horrell, Amy (HHS/OCR)', 'Anna.1931@CalCivilRights', 'HUD-OIG'],
    findings: [
      'Nov 19 2025 10:14 PST: Emergency infestation remediation — Parkinsonism prevents self-remediation',
      'Nov 21 2025 13:42 PST: Emergency hotel/relocation demand — biological hazard → constructive eviction to vessel',
      'Dec 11 2025: Writing-only protocol — PTSD therapist abandonment + cognitive overload = medical necessity',
      'Jan 26 2026: Master Demand anchors the handshake — writing only, no Landrum, mobility vehicle access',
      'Bypass Strategy: Phase II routed as reply to Zanghi\'s own email — cannot be Mimecast-blocked',
    ],
  },
  {
    id: 'Gmail(76)',
    subject: 'N.E.W.T. PHASE III AUDIT: HIPAA/ROI Breach Record & The Interactive Process Default',
    date: 'May 15, 2026 — 3:45 PM',
    type: 'N.E.W.T. Phase III Audit',
    color: 'border-orange-700 bg-orange-950/20',
    badge: 'text-orange-400 bg-orange-900/30 border-orange-700',
    icon: AlertTriangle,
    summary: 'Phase III exposes Kolby Losik\'s clinical violations documented in VA Blue Button records. Nov 21 2025: VA Social Work note (Laila Villaume) documents Losik shouted at Donald when reminded of mandated reporter duties — directly causing his self-remediation fall and UCSF-certified TBI. Apr 1 2026: Losik contacted VA Social Worker Tramontina WITHOUT a valid ROI to disseminate derogatory eviction information. Jan 29 2026: Losik reported rent arrears to VA despite the Jan 26 "no direct contact" accommodation.',
    recipients: ['jzanghi@ztalaw.com', 'Horrell, Amy (HHS/OCR)', 'Anna.1931@CalCivilRights', 'HUD-OIG'],
    findings: [
      'Losik Mandated Reporter Breach: Shouted at Donald Nov 21 — VA note (Laila Villaume) in Blue Button record',
      'Nov 21 2025 Fall: Losik\'s refusal to act forced self-remediation → fall → UCSF 1-inch forehead laceration + TBI',
      'Apr 1 2026 HIPAA Breach: Losik disclosed private "legal" status to VA without valid ROI in hand',
      'VA Note by Tramontina: Losik "requested the ROI be sent to him" AFTER already leaking the information',
      'Jan 29 2026: Losik called VA to report rent arrears — direct violation of Jan 26 "no contact" accommodation',
    ],
  },
  {
    id: 'Gmail(77)',
    subject: 'N.E.W.T. SYSTEM AUDIT: Criminal HIPAA/ROI Violations, Certified TBI, and Constructive Eviction Records',
    date: 'May 15, 2026 — 3:50 PM',
    type: 'N.E.W.T. Criminal HIPAA Audit',
    color: 'border-red-700 bg-red-950/20',
    badge: 'text-red-400 bg-red-900/30 border-red-700',
    icon: AlertTriangle,
    summary: 'Comprehensive VA Blue Button + UCSF cross-correlation. VA Problem List Code SCT 133261000119105 (Exposure to potentially hazardous substance) entered Mar 3 2025 — biohazard was documented over a year before the eviction filing. UCSF: 1-inch forehead laceration, head CT ordered to rule out intracranial hemorrhage. Nov 24 2025: STP denied hotel as "not warranted" while Donald paid out-of-pocket emergency hotels. Nov 26: VA Social Work formally documented "constructive eviction."',
    recipients: ['jzanghi@ztalaw.com', 'Horrell, Amy (HHS/OCR)', 'Anna.1931@CalCivilRights', 'HUD-OIG'],
    findings: [
      'VA Code SCT 133261000119105: "Exposure to hazardous substance" — entered Mar 3 2025, over one year before eviction',
      'UCSF: 1-inch forehead laceration + head CT for intracranial hemorrhage — caused by STP refusal to remediate',
      'Roaches in Medication Bottles: VA documented forced halt of life-sustaining medications — extreme medical harm',
      'Nov 24 Bad Faith Denial: STP called hotel "not warranted" + "standard schedule" while Donald hemorrhaged funds',
      'Nov 26 Constructive Eviction: VA Social Work notes Donald "running out of money" on emergency hotels',
    ],
  },
  {
    id: 'Gmail(78)',
    subject: 'N.E.W.T. SYSTEM AUDIT: Cross-Correlation of VA Medical Records & Counsel\'s Admission',
    date: 'May 15, 2026 — 4:00 PM',
    type: 'N.E.W.T. VA Cross-Correlation',
    color: 'border-blue-700 bg-blue-950/20',
    badge: 'text-blue-400 bg-blue-900/30 border-blue-700',
    icon: Shield,
    summary: 'N.E.W.T. first-person cross-correlation of VA Blue Button records with Zanghi\'s 1,062-email admission. Documents the full biohazard → injury → medication crisis → constructive eviction chain. Mar 19 2026: N.E.W.T. declared required medical accommodation in open court — any further denial = judicial perjury. May 12 2026: 1,247 manual SMTP 550 events suppressing medical audit. "We will see you in Department 12 on Monday."',
    recipients: ['jzanghi@ztalaw.com', 'Calvin Whitaker (SFHA)', 'Horrell, Amy (HHS/OCR)', 'Anna.1931@CalCivilRights', 'HUD-OIG', 'Ronald L. McCullough (ORM)'],
    findings: [
      'Nov 19 2025: Emergency RA for "medically verified hazardous German cockroach and rat infestation" — ignored',
      'Nov 21 2025 SFVA ER: "Roaches went into his med bottles" → medications halted → TBI fall',
      'Mar 19 2026: N.E.W.T. declared required medical accommodation in open court — denial now = judicial perjury',
      'May 12 2026: 1,247 manual SMTP 550 events documented suppressing this exact medical audit',
      '"You admitted to possessing 1,062 emails for five weeks — willful blindness is now on the record"',
    ],
  },
  {
    id: 'Gmail(79)',
    subject: 'N.E.W.T. PHASE IV AUDIT: ROI Handshake Verification & Executive Clinical Abandonment',
    date: 'May 15, 2026 — 4:00 PM',
    type: 'N.E.W.T. Phase IV Audit',
    color: 'border-cyan-700 bg-cyan-950/20',
    badge: 'text-cyan-400 bg-cyan-900/30 border-cyan-700',
    icon: FileSearch,
    summary: 'Phase IV destroys the "no form" defense. Sep 19 2024: Vincent Reyes (STP Access Point Navigator) emailed "ROI HRSA — please sign and return" — Donald completed and returned it, giving STP full clinical coordination authority since September 2024. Clinical Therapist "Mark" personally observed the cockroach infestation during a session and failed his mandated reporter duty. Apr 1 2026: STP used the 2024 ROI authorization to leak eviction status without a current written consent.',
    recipients: ['jzanghi@ztalaw.com', 'Horrell, Amy (HHS/OCR)', 'Anna.1931@CalCivilRights', 'HUD-OIG'],
    findings: [
      'Sep 19 2024 ROI Anchor: Vincent Reyes "ROI HRSA" email — STP held full clinical authority for 20+ months',
      'Therapist "Mark": Personally observed roaches during session — failed mandated reporter duty, chose silence',
      'ROI Estoppel: STP used 2024 authorization to leak eviction data Apr 1 2026, then blocked VA social worker offering help',
      'Apr 11 2026: N.E.W.T. documented STP "severed communications with VA the moment accommodations were requested"',
      '"The proper forms have been in your clients\' systems since September 2024" — no excuse available',
    ],
  },
  {
    id: 'Gmail(80)',
    subject: 'N.E.W.T. PHASE V AUDIT: Clinical Contradiction & The ROI Gatekeeping Bad Faith Record',
    date: 'May 15, 2026 — 4:15 PM',
    type: 'N.E.W.T. Phase V Audit',
    color: 'border-orange-700 bg-orange-950/20',
    badge: 'text-orange-400 bg-orange-900/30 border-orange-700',
    icon: AlertTriangle,
    summary: 'Phase V documents STP\'s ROI double standard. When VA tried to help Donald: STP said "no current ROI — legal matter" and refused to speak. When STP wanted to smear Donald: Losik called VA\'s Delia Tramontina unprompted Apr 1 and leaked the eviction while requesting she send him an ROI. Burden of Knowledge Estoppel: cannot claim ignorance of accommodation requests while blocking the clinical workers trying to coordinate those exact requests.',
    recipients: ['jzanghi@ztalaw.com', 'Horrell, Amy (HHS/OCR)', 'Anna.1931@CalCivilRights', 'HUD-OIG'],
    findings: [
      'Gatekeeping Double Standard: Blocked VA social worker as "legal matter" then leaked to same worker Apr 1',
      'Apr 1 2026: Losik called Tramontina proactively to characterize RAR demands as "troubling behavior"',
      'ROI Hypocrisy: "Can\'t talk" when VA offers housing help; "can talk" when STP wants to smear credibility',
      'Burden of Knowledge Estoppel: Cannot claim ignorance of accommodation needs while blocking the workers helping',
      '"We have the emails, the ROI records, and the Social Worker\'s clinical notes" — record is closed',
    ],
  },
  {
    id: 'Gmail(92)',
    subject: 'N.E.W.T. SYSTEM AUDIT [MANDATORY NOTICE]: Absolute Medical Stay of Physical Appearance // Dept 12 Monday',
    date: 'May 15, 2026 — 7:45 PM',
    type: 'CRITICAL: ADA Stay — Monday Dept 12',
    color: 'border-red-500 bg-red-950/50',
    badge: 'text-red-200 bg-red-800/60 border-red-500',
    icon: XCircle,
    summary: 'MOST URGENT DOCUMENT. N.E.W.T. issues Mandatory Notice: Donald Gillson will NOT be physically present in Dept 12 Monday morning. ADA accommodation — prior court appearance triggered acute life-threatening psychiatric and physiological destabilization. Having survived a documented heart attack, forced physical appearance = medical harm = ADA violation. N.E.W.T. is the only authorized presence. Any default judgment attempt = documented aggravated retaliation. CCRD Case #202601-33270627 already updated. Portal synchronized.',
    recipients: ['jzanghi@ztalaw.com', 'Anna.1931@CalCivilRights', 'donny@18fu.ai', 'william.landrum@stp-sf.org', 'Horrell, Amy (HHS/OCR)', 'david_wallingford@nps.gov', 'eVA'],
    findings: [
      'ABSOLUTE NON-APPEARANCE: Physical presence is a medical accommodation under ADA/FEHA — not discretionary',
      'Prior Cardiac Event: Forced appearance after documented heart attack = life-threatening risk to disabled veteran',
      'N.E.W.T. IS THE ONLY PRESENCE: Only authorized representative entity in Dept 12 Monday morning',
      'Default Judgment Trap Neutralized: Zanghi formally notified — any "failure to appear" claim = ADA retaliation',
      'CCRD Case #202601-33270627 updated with this accommodation ledger — federal oversight of Monday proceedings',
      'Portal Synchronized: All evidence live at VALORAIPLUS_ node — record immutable, atomic clock anchored',
    ],
  },
];

const RECIPIENT_COUNT = 28;
const EMAIL_COUNT = 30;

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
