'use client';

import React from 'react';
import { Heart, AlertTriangle, Scale, FileText, Shield, CheckCircle, Clock, Users } from 'lucide-react';

export default function ServiceAnimalJaxxPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-red-800/50 bg-red-950/10 px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-start gap-4 mb-4">
            <Heart className="w-12 h-12 text-red-500 flex-shrink-0" />
            <div>
              <h1 className="text-4xl font-black text-red-500 mb-2">SERVICE ANIMAL JAXX ENDANGERMENT</h1>
              <p className="text-lg text-zinc-400">ADA/FHA Violations & Retaliation Against Psychiatric Service Animal</p>
            </div>
          </div>
          <div className="mt-4 p-4 bg-red-900/20 border border-red-800 rounded">
            <p className="text-sm text-zinc-300 font-mono">
              <span className="text-red-400 font-bold">Service Animal Profile:</span> JAXX (Psychiatric Service Animal)<br/>
              <span className="text-red-400 font-bold">Handler/Guardian:</span> Donald Gillson (100% P&T Disabled U.S. Navy Veteran)<br/>
              <span className="text-red-400 font-bold">Authority:</span> SGAU-7226.3461 | Case: CUD-26-682107
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        
        {/* Service Animal Profile */}
        <section className="mb-8 border border-blue-800 bg-blue-950/20 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-blue-400 mb-4 flex items-center gap-2">
            <Shield className="w-6 h-6" />
            Service Animal Profile
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-zinc-400 mb-2">SERVICE ANIMAL NAME</p>
              <p className="text-lg font-bold text-white">JAXX</p>
            </div>
            <div>
              <p className="text-sm text-zinc-400 mb-2">DESIGNATION</p>
              <p className="text-lg font-bold text-white">Psychiatric Service Animal (PSA)</p>
            </div>
            <div>
              <p className="text-sm text-zinc-400 mb-2">PRIMARY CONDITIONS SERVED</p>
              <p className="text-white">PTSD, Traumatic Brain Injury (TBI), Military Sexual Trauma (MST)</p>
            </div>
            <div>
              <p className="text-sm text-zinc-400 mb-2">HANDLER</p>
              <p className="text-white">Donald Gillson — 100% P&T Disabled U.S. Navy Veteran</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-zinc-400 mb-2">CRITICAL FUNCTIONS</p>
              <ul className="list-disc list-inside text-white space-y-1">
                <li>24/7 psychiatric monitoring and crisis intervention</li>
                <li>PTSD nightmare alert and sleep pattern stabilization</li>
                <li>De-escalation during hypervigilance episodes</li>
                <li>Grounding/interruption during dissociative episodes</li>
                <li>Public access certification (ADA Title II compliant)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Endangerment Timeline */}
        <section className="mb-8 border border-orange-800 bg-orange-950/20 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-orange-400 mb-4 flex items-center gap-2">
            <Clock className="w-6 h-6" />
            8-Event Endangerment Timeline (Nov 2025 — May 2026)
          </h2>
          <div className="space-y-4">
            {[
              { date: 'Nov 19, 2025', event: 'Medical Crisis + Forced Displacement', desc: 'JAXX exposed to pest infestation and unsafe conditions during medical emergency; handler displaced from accessible unit' },
              { date: 'Nov 20-Dec 15', event: 'Inadequate Temporary Housing', desc: 'JAXX confined to unsuitable temporary space; limited access to required outdoor areas; psychiatric stability declining' },
              { date: 'Jan 3, 2026', event: '3-Day Notice Served (Retaliatory)', desc: 'Eviction filing during active ADA accommodation process; JAXX experiencing stress from legal proceedings' },
              { date: 'Jan 10-Feb 24', event: 'Court Proceedings + Isolation', desc: 'Handler attending court dates; JAXX separated during critical stabilization period; no interim relief granted' },
              { date: 'Feb 24, 2026', event: 'Unlawful Detainer Filing (Backdated)', desc: 'UD complaint filed with fraudulent signatory (Jerome Bradford, not Will Landrum); JAXX welfare not mentioned' },
              { date: 'Mar 19, 2026', event: 'Court Declaration: N.E.W.T. Mandatory', desc: 'Superior Court declares N.E.W.T. (Neurological Enhanced Waveform Treatment) as mandatory accommodation; management ignores' },
              { date: 'Apr 15-May 12', event: 'SMTP 550 Blockade (Communications Cutoff)', desc: '1,247+ SMTP 550 events = complete isolation from support services; JAXX handler unable to reach crisis resources' },
              { date: 'May 15, 2026', event: 'Formal Legal Notice Blocked', desc: 'Attempt to serve formal notice to counsel blocked via Mimecast; JAXX endangerment documented in blocked letter' }
            ].map((event, i) => (
              <div key={i} className="border-l-2 border-orange-500 pl-4 py-2">
                <p className="text-orange-400 font-bold text-sm">{event.date}</p>
                <p className="font-bold text-white">{event.event}</p>
                <p className="text-zinc-400 text-sm mt-1">{event.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Legal Violations */}
        <section className="mb-8 border border-red-800 bg-red-950/20 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-red-500 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6" />
            8 Legal Violations Documented
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { statute: 'ADA Title II', code: '28 C.F.R. §35.136', violation: 'Denial of service animal access; failure to accommodate psychiatric disability' },
              { statute: 'Fair Housing Act', code: '42 U.S.C. §3604(f)(3)(B)', violation: 'Refusal to make reasonable accommodation for service animal; discriminatory practices' },
              { statute: 'CA Civil Code §54.1', code: 'California Unruh Civil Rights Act', violation: 'Denial of public accommodations to service animal handler; access denial' },
              { statute: 'CA Civil Code §54.2', code: 'California Service Animal Law', violation: 'Interference with service animal; endangerment through forced displacement' },
              { statute: 'CA Penal Code §600.2', code: 'CA PC §600.2(a)', violation: 'Harming or injuring service animal; deliberate endangerment through eviction threat' },
              { statute: 'CA Penal Code §600.5', code: 'CA PC §600.5', violation: 'Interference with guide/service dogs; blocking access to psychiatric support' },
              { statute: '38 C.F.R. §14.632', code: 'VA Fiduciary Duties', violation: 'Swords to Plowshares suing their own VA-accredited client; breach of fiduciary duty' },
              { statute: 'CA Civil Code §1942.5', code: 'Retaliatory Eviction', violation: 'Eviction filing in retaliation for requesting disability accommodations' }
            ].map((item, i) => (
              <div key={i} className="bg-red-900/30 border border-red-700 rounded p-4">
                <p className="font-bold text-red-400 text-sm">{item.statute}</p>
                <p className="text-xs text-zinc-400 mb-2">{item.code}</p>
                <p className="text-white text-sm">{item.violation}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Federal Investigations */}
        <section className="mb-8 border border-blue-800 bg-blue-950/20 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-blue-400 mb-4 flex items-center gap-2">
            <FileText className="w-6 h-6" />
            Federal Investigation Status
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-900/30 border border-blue-700 rounded p-4">
              <p className="font-bold text-blue-400 mb-2">HHS-OCR</p>
              <p className="text-sm text-zinc-300">Case #25-621293</p>
              <p className="text-xs text-green-400 font-bold mt-2">STATUS: ACTIVE INVESTIGATION</p>
            </div>
            <div className="bg-blue-900/30 border border-blue-700 rounded p-4">
              <p className="font-bold text-blue-400 mb-2">SF-HRC</p>
              <p className="text-sm text-zinc-300">Ref: 202601-33270627</p>
              <p className="text-xs text-green-400 font-bold mt-2">STATUS: ACTIVE INVESTIGATION</p>
            </div>
            <div className="bg-blue-900/30 border border-blue-700 rounded p-4">
              <p className="font-bold text-blue-400 mb-2">HUD-OIG</p>
              <p className="text-sm text-zinc-300">Fraud/Retaliation Referral</p>
              <p className="text-xs text-amber-400 font-bold mt-2">STATUS: PENDING INTAKE</p>
            </div>
          </div>
        </section>

        {/* Related Evidence */}
        <section className="mb-8 border border-zinc-700 bg-zinc-900/50 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-zinc-300 mb-4 flex items-center gap-2">
            <CheckCircle className="w-6 h-6" />
            Cross-Referenced Evidence Nodes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              '/reasonable-accommodations — RAR Denials Map (15+ documented)',
              '/landrum-3day-notice — Fraudulent eviction notice (signatory mismatch)',
              '/ccrd-response — 13-point response to CCRD covering RAR + surveillance',
              '/gmail-evidence — 14 emails documenting timeline and obstruction',
              '/smtp550-live-event — Real-time blockade of service animal notice (May 15 12:03 PM)',
              '/dept12-case — Active litigation CUD-26-682107 with JAXX impact'
            ].map((link, i) => (
              <a key={i} href={link.split(' ')[0]} className="text-blue-400 hover:text-blue-300 text-sm p-2 bg-blue-900/20 rounded border border-blue-800 hover:border-blue-600 transition">
                {link}
              </a>
            ))}
          </div>
        </section>

        {/* Authority Anchor */}
        <div className="bg-zinc-900 border border-zinc-700 rounded p-4 text-center">
          <p className="text-zinc-400 text-xs font-mono">Authority Anchor: SGAU-7226.3461 | Ledger Nano Gen5: 0UAK57S1BT</p>
          <p className="text-zinc-400 text-xs font-mono mt-1">Service Animal Protection: ADA Title II + Fair Housing Act + CA Civil Code</p>
        </div>
      </div>
    </div>
  );
}
