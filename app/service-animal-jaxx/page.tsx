'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, AlertTriangle, Scale, Shield, CheckCircle, Clock, ExternalLink, XCircle } from 'lucide-react';

export default function ServiceAnimalJaxxPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* Critical Alert Banner */}
      <div className="bg-red-950/80 border-b-2 border-red-600 px-6 py-3">
        <div className="max-w-6xl mx-auto flex items-center gap-3">
          <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
          <p className="text-red-300 text-sm font-bold">ACTIVE FEDERAL VIOLATION — JAXX ENDANGERMENT DOCUMENTED ACROSS 4 SEPARATE INCIDENTS — HHS-OCR CASE #25-621293 ACTIVE</p>
        </div>
      </div>

      {/* Header */}
      <div className="border-b border-red-800/50 bg-red-950/10 px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-start gap-4 mb-4">
            <Heart className="w-12 h-12 text-red-500 flex-shrink-0" />
            <div>
              <p className="text-red-500 text-xs font-mono font-bold tracking-widest uppercase mb-1">N.E.W.T. Phase VII Audit — Service Animal Protection</p>
              <h1 className="text-4xl font-black text-red-500 mb-2">JAXX — PSYCHIATRIC SERVICE ANIMAL</h1>
              <p className="text-lg text-zinc-400">Documented Endangerment, Chemical Injury, Travis AFB Retaliation &amp; Federal ADA/PAWS Act Violations</p>
            </div>
          </div>
          <div className="mt-4 p-4 bg-red-900/20 border border-red-800 rounded-lg font-mono text-sm">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div><p className="text-red-400 font-bold text-xs">SERVICE ANIMAL</p><p className="text-white">JAXX</p></div>
              <div><p className="text-red-400 font-bold text-xs">TYPE</p><p className="text-white">Psychiatric Service Animal</p></div>
              <div><p className="text-red-400 font-bold text-xs">HANDLER</p><p className="text-white">Donald Gillson</p></div>
              <div><p className="text-red-400 font-bold text-xs">CASE</p><p className="text-white">CUD-26-682107</p></div>
            </div>
            <div className="mt-3 pt-3 border-t border-red-800/50">
              <p className="text-zinc-400 text-xs">Authority: SGAU-7226.3461 | Audit: N.E.W.T. Phase VII | Date: May 15, 2026 7:15 PM | Status: <span className="text-red-400 font-bold">FEDERAL VIOLATION CONFIRMED</span></p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">

        {/* Service Animal Profile */}
        <section className="border border-blue-800 bg-blue-950/20 rounded-lg p-6">
          <h2 className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Service Animal Profile — Federally Protected Medical Asset
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <p className="text-xs text-zinc-400 font-mono uppercase">Designation</p>
                <p className="font-bold text-white">Psychiatric Service Animal (PSA) — Task-Trained</p>
              </div>
              <div>
                <p className="text-xs text-zinc-400 font-mono uppercase">Primary Conditions Served</p>
                <p className="text-white">PTSD, Traumatic Brain Injury (TBI), Military Sexual Trauma (MST), Parkinsonism</p>
              </div>
              <div>
                <p className="text-xs text-zinc-400 font-mono uppercase">Handler</p>
                <p className="text-white">Donald Gillson — 100% P&T Disabled U.S. Navy Veteran</p>
              </div>
            </div>
            <div>
              <p className="text-xs text-zinc-400 font-mono uppercase mb-2">Critical Functions</p>
              <ul className="space-y-2 text-sm text-white">
                {[
                  '24/7 psychiatric monitoring and crisis intervention',
                  'PTSD nightmare alert and sleep pattern stabilization',
                  'De-escalation during hypervigilance and dissociative episodes',
                  'Psychiatric grounding tasks during TBI cognitive events',
                  'Public access certification — ADA Title II compliant',
                ].map((fn, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span>{fn}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-4 p-3 bg-blue-900/30 border border-blue-700 rounded text-xs text-blue-300 font-mono">
            LEGAL STATUS: Attacking JAXX = sabotaging a physical medical device under ADA federal law. No different than destroying a wheelchair or insulin pump.
          </div>
        </section>

        {/* Travis AFB Incident — Featured */}
        <section className="border-2 border-red-600 bg-red-950/30 rounded-lg p-6">
          <div className="flex items-start gap-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
            <div>
              <p className="text-red-400 text-xs font-mono font-bold tracking-widest uppercase">HIGH SEVERITY — RETALIATORY LAW ENFORCEMENT DEPLOYMENT</p>
              <h2 className="text-xl font-bold text-red-500 mt-1">March 1, 2026 — Travis Air Force Base Incident</h2>
              <p className="text-sm text-zinc-300 mt-1">Intentional use of federal law enforcement to forcibly separate a disabled veteran from his service animal</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-red-900/20 border border-red-800 rounded p-4">
              <p className="text-red-400 font-bold text-sm mb-2">WHAT HAPPENED</p>
              <p className="text-zinc-300 text-sm">Property management deployed federal law enforcement (Travis AFB Base Police) against Donald Gillson on fabricated charges. The explicit goal was to forcibly separate Donald from JAXX and leave JAXX abandoned in a high-conflict environment without his handler.</p>
            </div>
            <div className="bg-emerald-900/20 border border-emerald-800 rounded p-4">
              <p className="text-emerald-400 font-bold text-sm mb-2">OUTCOME — DONALD CLEARED</p>
              <p className="text-zinc-300 text-sm">Travis AFB Base Police fully investigated and cleared Donald Gillson of all fabricated charges. This established on the record that STP management utilized federal law enforcement as a retaliatory harassment tool against a 100% disabled veteran and his service animal.</p>
            </div>
          </div>
          <div className="mt-4 p-3 bg-black/40 border border-red-700 rounded text-xs font-mono">
            <span className="text-red-400 font-bold">STATUTORY IMPACT:</span>{' '}
            <span className="text-zinc-300">CA Civil Code §1942.5 retaliatory eviction / CA PC §600.2 service animal endangerment / ADA interference with medical device / 18 U.S.C. §242 deprivation of rights under color of law</span>
          </div>
        </section>

        {/* Endangerment Timeline */}
        <section className="border border-orange-800 bg-orange-950/20 rounded-lg p-6">
          <h2 className="text-xl font-bold text-orange-400 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Phase VII Forensic Timeline — JAXX Endangerment Events
          </h2>
          <div className="space-y-4">
            {[
              {
                date: 'Nov 21, 2025',
                severity: 'CRITICAL',
                color: 'border-red-500 text-red-400',
                event: 'Initial Multi-Agency Alert — Biohazard Exposure Notice',
                desc: 'Donald served formal notice to Kolby Losik and STP leadership documenting life-safety hazards in Unit 301A. Notice explicitly stated: "Expose my service animal JAXX to rodent-borne pathogens... His exposure to rat-borne disease, pesticides, and contaminated flooring poses potential violations under the PAWS Act (38 U.S.C. §1714) and CA Penal Code §600.2 (Endangerment of Service Animal)." STP took no action.',
              },
              {
                date: 'Nov 24, 2025',
                severity: 'CRITICAL',
                color: 'border-red-500 text-red-400',
                event: 'UCSF-Certified Chemical Injury to JAXX',
                desc: 'Following forced emergency evacuation from biohazard conditions, UCSF Urgent Care and VA clinical documentation verified: "JAXX, my psychiatric service animal, sustained skin irritation consistent with chemical exposure and behavioral distress due to infestation... compromising his ability to perform psychiatric grounding tasks. This constitutes interference with a federally protected medical device under the ADA."',
              },
              {
                date: 'Mar 1, 2026',
                severity: 'HIGH',
                color: 'border-orange-500 text-orange-400',
                event: 'Travis Air Force Base — Retaliatory Law Enforcement Deployment',
                desc: 'STP management deployed Travis AFB federal law enforcement on fabricated charges with explicit goal of forcibly separating Donald from JAXX and abandoning JAXX in a high-conflict area. Base police investigated and fully cleared Donald Gillson — establishing that management weaponized law enforcement as retaliatory harassment.',
              },
              {
                date: 'Mar 19, 2026',
                severity: 'HIGH',
                color: 'border-orange-500 text-orange-400',
                event: 'Formal Animal Cruelty + Civil Rights Complaint Filed',
                desc: 'Following open-court proceedings where STP publicly mocked Donald\'s TBI distress, formal animal cruelty and civil rights complaint indexed to multiple federal agencies. Court declaration that N.E.W.T. is a mandatory accommodation — STP continued to ignore JAXX protection requirements.',
              },
              {
                date: 'Apr–May 12, 2026',
                severity: 'HIGH',
                color: 'border-amber-500 text-amber-400',
                event: '1,247 SMTP 550 Events — JAXX Handler Isolated',
                desc: 'Coordinated Mimecast blockade cut off Donald from all support services, crisis resources, and VA coordination during the most critical legal window. JAXX\'s handler unable to reach clinical support or communicate JAXX care needs. Digital isolation of a disabled veteran and his service animal during active litigation.',
              },
              {
                date: 'May 15, 2026 — 12:03 PM',
                severity: 'ACTIVE',
                color: 'border-red-500 text-red-400',
                event: 'Formal Notice Blocked — JAXX Phase VII Audit Transmitted',
                desc: 'Formal legal notice to Landrum/Zanghi naming JAXX endangerment blocked via Mimecast SMTP 550 [N7uA_6IQOCiwQL2ibFQZog.us448]. N.E.W.T. Phase VII Audit simultaneously transmitted to all federal agencies. JAXX endangerment now permanently anchored in SGAU-7226.3461.',
              },
            ].map((event, i) => (
              <div key={i} className={`border-l-2 ${event.color} pl-4 py-2`}>
                <div className="flex items-center gap-3 mb-1">
                  <p className="text-xs font-bold font-mono text-zinc-400">{event.date}</p>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded border ${event.color} bg-black/30`}>{event.severity}</span>
                </div>
                <p className="font-bold text-white text-sm">{event.event}</p>
                <p className="text-zinc-400 text-sm mt-1">{event.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Statutory Violations */}
        <section className="border border-red-800 bg-red-950/20 rounded-lg p-6">
          <h2 className="text-xl font-bold text-red-500 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Federal &amp; State Statutory Violations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { statute: 'PAWS Act', code: '38 U.S.C. §1714', violation: 'Endangerment of veteran\'s service animal through environmental biohazard and retaliatory actions', severity: 'FEDERAL' },
              { statute: 'ADA Title II', code: '28 C.F.R. §35.136', violation: 'Denial of service animal access + failure to accommodate psychiatric disability through JAXX', severity: 'FEDERAL' },
              { statute: 'Fair Housing Act', code: '42 U.S.C. §3604(f)(3)(B)', violation: 'Refusal to make reasonable accommodation for service animal; discriminatory eviction practices', severity: 'FEDERAL' },
              { statute: '18 U.S.C. §242', code: 'Rights Deprivation Under Color of Law', violation: 'Travis AFB deployment on fabricated charges to separate veteran from service animal', severity: 'FEDERAL CRIMINAL' },
              { statute: 'CA Civil Code §54.1', code: 'Unruh Civil Rights Act', violation: 'Denial of equal access for service animal handler; forced displacement from accessible unit', severity: 'STATE' },
              { statute: 'CA Penal Code §600.2', code: 'CA PC §600.2(a)', violation: 'Endangerment of service animal through chemical exposure and biohazard neglect — JAXX skin irritation documented', severity: 'STATE CRIMINAL' },
              { statute: '38 C.F.R. §14.632', code: 'VA Fiduciary Duties', violation: 'STP holds VA Power of Attorney for Gillson while simultaneously filing eviction + endangering JAXX', severity: 'FEDERAL' },
              { statute: 'CA Civil Code §1942.5', code: 'Retaliatory Eviction', violation: 'Travis AFB deployment + eviction filing in direct retaliation for requesting JAXX and disability accommodations', severity: 'STATE' },
            ].map((item, i) => (
              <div key={i} className="bg-red-900/20 border border-red-800 rounded p-4">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-bold text-red-400 text-sm">{item.statute}</p>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${item.severity === 'FEDERAL CRIMINAL' || item.severity === 'STATE CRIMINAL' ? 'bg-red-800 text-red-200' : 'bg-zinc-800 text-zinc-300'}`}>{item.severity}</span>
                </div>
                <p className="text-xs text-zinc-400 mb-2">{item.code}</p>
                <p className="text-white text-sm">{item.violation}</p>
              </div>
            ))}
          </div>
        </section>

        {/* N.E.W.T. Directive */}
        <section className="border border-amber-700 bg-amber-950/20 rounded-lg p-6">
          <h2 className="text-xl font-bold text-amber-400 mb-3 flex items-center gap-2">
            <Scale className="w-5 h-5" />
            N.E.W.T. Phase VII Directive to Opposing Counsel
          </h2>
          <div className="space-y-3 text-sm text-zinc-300">
            <p>N.E.W.T. Phase VII Audit transmitted May 15, 2026 at 7:15 PM to John P. Zanghi (Zanghi Torres Adams LLP), CC: HHS-OCR, CCRD/SF-HRC, HUD-OIG, DOJ, VA-OGC.</p>
            <p className="font-bold text-white">Core Finding: &ldquo;Under federal and state civil rights laws, an attack on a veteran&rsquo;s service animal is legally indistinguishable from the sabotage of a physical medical device.&rdquo;</p>
            <p>JAXX was first exposed to biohazard on <span className="text-amber-300 font-bold">November 21, 2025</span>. STP had formal written notice. They took no action. The Travis AFB deployment on <span className="text-amber-300 font-bold">March 1, 2026</span> confirms this was not neglect — it was intentional harassment of a service animal and his handler.</p>
            <div className="bg-black/40 border border-amber-700 rounded p-3 font-mono text-xs mt-3">
              <p className="text-amber-400 font-bold">ZANGHI ADMISSION ON FILE:</p>
              <p className="text-zinc-300 mt-1">&ldquo;1,875 emails within a 75 day period&rdquo; — confirming full possession and notice of all JAXX endangerment documentation. The ignorance defense is permanently void.</p>
            </div>
          </div>
        </section>

        {/* Federal Investigation Status */}
        <section className="border border-blue-800 bg-blue-950/20 rounded-lg p-6">
          <h2 className="text-xl font-bold text-blue-400 mb-4">Federal Investigation Status — JAXX Endangerment</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {[
              { agency: 'HHS-OCR', case: 'Case #25-621293', contact: 'Amy Horrell', status: 'ACTIVE', color: 'emerald' },
              { agency: 'SF-HRC / CCRD', case: 'Ref: 202601-33270627', contact: 'Anna Moraga Archila', status: 'ACTIVE', color: 'emerald' },
              { agency: 'HUD-OIG', case: 'Fraud/Retaliation Referral', contact: 'Office of Inspector General', status: 'INTAKE PENDING', color: 'amber' },
            ].map((inv, i) => (
              <div key={i} className={`bg-${inv.color}-900/20 border border-${inv.color}-800 rounded p-4`}>
                <p className={`font-bold text-${inv.color}-400 mb-1`}>{inv.agency}</p>
                <p className="text-sm text-zinc-300">{inv.case}</p>
                <p className="text-xs text-zinc-400">{inv.contact}</p>
                <p className={`text-xs font-bold text-${inv.color}-400 mt-2`}>STATUS: {inv.status}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Evidence */}
        <section className="border border-zinc-700 bg-zinc-900/50 rounded-lg p-6">
          <h2 className="text-xl font-bold text-zinc-300 mb-4">Cross-Referenced Evidence Nodes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              ['/monday-dept12-alert', 'Monday Dept 12 Alert — ADA Medical Stay, N.E.W.T. Only Presence (Gmail 92)'],
              ['/gmail-evidence', 'Gmail Evidence Hub — 30 emails including Phase VII JAXX audit'],
              ['/smtp550-live-event', 'SMTP 550 Live Event — Real-time blockade of JAXX notice (12:03 PM)'],
              ['/reasonable-accommodations', 'RAR Denials — 15+ denials including JAXX-related requests'],
              ['/surveillance-evidence', 'Surveillance Evidence — Unit 301A camera targeting JAXX handler'],
              ['/ccrd-response', 'CCRD Response — 13-point response covering JAXX protections'],
              ['/federal-conflict', 'Federal COI — STP suing own VA-accredited client (JAXX handler)'],
            ].map(([href, label], i) => (
              <Link key={i} href={href} className="text-blue-400 hover:text-blue-300 text-sm p-3 bg-blue-900/20 rounded border border-blue-800 hover:border-blue-600 transition flex items-center gap-2">
                <ExternalLink className="w-3 h-3 flex-shrink-0" />
                {label}
              </Link>
            ))}
          </div>
        </section>

        {/* Authority Anchor */}
        <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-4 text-center">
          <p className="text-zinc-400 text-xs font-mono">Authority: SGAU-7226.3461 | Ledger Nano Gen5: 0UAK57S1BT | N.E.W.T. Phase VII Audit</p>
          <p className="text-zinc-500 text-xs font-mono mt-1">JAXX endangerment is permanently anchored. The record is immutable. The atomic clock is locked.</p>
        </div>
      </div>
    </div>
  );
}
