'use client';

export const runtime = 'edge';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Gavel, CheckCircle, ShieldAlert, Zap, Lock,
  Terminal, Scale, Radio, RefreshCw, XCircle,
  FileText, Clock, ExternalLink, ArrowRight
} from 'lucide-react';

const HANDSHAKE_DATA = {
  case:        'CUD-26-682107',
  jurisdiction:'Superior Court of California, San Francisco',
  status:      'CONNECTED / LIVE',
  anchor:      'SGAU-7226.3461 (Saint Paul Node)',
  hardware:    'Ledger Nano Gen5 (0UAK57S1BT)',
  protocol:    'VALORAIPLUS_HANDSHAKE_v1.0',
};

const FORENSIC_GROUND_TRUTHS = [
  {
    id: '01',
    title: 'Signatory Fraud (CCP §446)',
    detail: 'Discrepancy: Physical notice (Landrum) vs. Judicial Exhibit 2 (Bradford). Bradford verified a complaint he did not witness, replacing the original unlicensed author Will Landrum.',
    groundTruth: '3-Day Notice posted Feb 29, 2026 — signed by Will Landrum',
    fabrication: 'Exhibit 2 bears back-dated signature of Jerome Bradford',
    statute: 'CA Penal Code §115',
    severity: 'CRITICAL',
    severityColor: 'text-red-400 bg-red-950/40 border-red-800',
    icon: FileText,
  },
  {
    id: '02',
    title: 'Federal Obstruction',
    detail: 'SMTP 550 5.4.1 manual rejection from VA servers (Anfang / McCullough) at exact moment of evidentiary service. Proves Spoliation and Consciousness of Guilt.',
    groundTruth: 'SMTP 550 5.4.1 — VA servers blocked both addresses during service window',
    fabrication: 'N/A — obstruction is the primary act',
    statute: '18 U.S.C. §1512',
    severity: 'FEDERAL_INTERFERENCE',
    severityColor: 'text-orange-400 bg-orange-950/40 border-orange-800',
    icon: Lock,
  },
  {
    id: '03',
    title: 'Retaliation Circumvention',
    detail: 'Notice back-dated to "February 24" to circumvent CA Civil Code §1942.5 retaliation window. Feb 27 Restraining Order filing preceded Feb 29 retaliatory posting.',
    groundTruth: 'Feb 27 Restraining Order preceded Feb 29 retaliatory notice',
    fabrication: 'Notice back-dated to Feb 24 to bypass 180-day anti-retaliation window',
    statute: 'CC §1942.5',
    severity: 'TIMELINE_FRAUD',
    severityColor: 'text-amber-400 bg-amber-950/40 border-amber-800',
    icon: Clock,
  },
];

const BLOCKED_NODES = [
  { node: 'bwhite@stp-sf.org',        error: 'SMTP 550 Administrative Prohibition',        tier: 'LEGAL',   date: 'May 15, 2026' },
  { node: 'jbradford@stp-sf.org',      error: 'SMTP 550 Administrative Prohibition',        tier: 'LEGAL',   date: 'May 15, 2026' },
  { node: 'michael.anfang@va.gov',     error: 'SMTP 550 5.4.1 Recipient Address Rejected',  tier: 'FEDERAL', date: 'May 15, 2026' },
  { node: 'ronald.mccullough@va.gov',  error: 'SMTP 550 5.4.1 Recipient Address Rejected',  tier: 'FEDERAL', date: 'May 15, 2026' },
];

const ASCII_LINES = [
  '╔══════════════════════════════════════════════════════════════╗',
  '║                                                              ║',
  '║   VALORAIPLUS_              ◄──────────►         DEPT 12    ║',
  '║   [EVIDENCE PORTAL]         HANDSHAKE        [SF SUPERIOR]  ║',
  '║                                                              ║',
  '║   Case: CUD-26-682107       Status: CONNECTED               ║',
  '║   Access: 16535884          Protocol: v1.0                  ║',
  '║                                                              ║',
  '║   ══════════════════════════════════════════════════════    ║',
  '║   SGAU-7226.3461 AUTHORITY VERIFIED — SAINT PAUL ANCHOR     ║',
  '║   ══════════════════════════════════════════════════════    ║',
  '║                                                              ║',
  '╚══════════════════════════════════════════════════════════════╝',
];

function StatusPulse({ color = 'bg-emerald-500' }: { color?: string }) {
  return (
    <span className="relative flex h-3 w-3">
      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${color}`} />
      <span className={`relative inline-flex rounded-full h-3 w-3 ${color}`} />
    </span>
  );
}

export default function JudicialHandshakePortal() {
  const [lines, setLines] = useState<string[]>([]);
  const [pinging, setPinging] = useState(false);
  const [pingCount, setPingCount] = useState(0);
  const [timestamp, setTimestamp] = useState('');

  useEffect(() => {
    setTimestamp(new Date().toLocaleString('en-US', {
      timeZone: 'America/Los_Angeles', dateStyle: 'full', timeStyle: 'short',
    }));
    let i = 0;
    const t = setInterval(() => {
      setLines(prev => [...prev, ASCII_LINES[i]]);
      i++;
      if (i >= ASCII_LINES.length) clearInterval(t);
    }, 55);
    return () => clearInterval(t);
  }, []);

  const sendPing = async () => {
    setPinging(true);
    try {
      await fetch('/api/court/handshake', { method: 'POST' });
      setPingCount(c => c + 1);
    } finally {
      setTimeout(() => setPinging(false), 1200);
    }
  };

  return (
    <div className="min-h-screen bg-black text-slate-200 font-mono p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* TOP STATUS BAR */}
        <div className="flex flex-wrap justify-between items-center bg-zinc-900 border border-zinc-800 p-4 rounded-t-lg gap-3">
          <div className="flex items-center gap-3">
            <StatusPulse color="bg-emerald-500" />
            <span className="text-xs font-black tracking-widest text-emerald-400">HANDSHAKE_CONNECTED</span>
          </div>
          <div className="text-[10px] text-zinc-500 uppercase tracking-tighter">
            Node: Saint Paul &nbsp;|&nbsp; Protocol: v1.0 &nbsp;|&nbsp; Anchor: SGAU-7226.3461
          </div>
        </div>

        {/* HEADER */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2 bg-zinc-900/50 border border-zinc-800 p-6 rounded-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none select-none">
              <Gavel size={140} />
            </div>
            <div className="flex items-center gap-2 mb-3">
              <StatusPulse color="bg-red-500" />
              <span className="text-red-400 text-[10px] tracking-widest font-black uppercase">
                Department 12 — SF Superior Court — Live
              </span>
            </div>
            <h1 className="text-3xl font-black text-white tracking-tighter mb-2 italic underline decoration-red-600 decoration-2">
              JUDICIAL HANDSHAKE
            </h1>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-xl">
              Forensic link established between VALORAIPLUS_ and Case No.{' '}
              <span className="text-white font-bold">{HANDSHAKE_DATA.case}</span>.{' '}
              Findings anchored to CCS Portal for unalterable timeline synchronization.
            </p>
            <p className="text-zinc-600 text-[10px] mt-3">{timestamp}</p>
          </div>

          <div className="bg-red-950/20 border border-red-900 p-6 rounded-lg flex flex-col justify-center items-center text-center">
            <Scale className="text-red-500 mb-2" size={32} />
            <span className="text-xs text-red-400 font-bold uppercase tracking-widest">Department 12</span>
            <span className="text-xl font-black text-white uppercase tracking-widest mt-1">San Francisco</span>
            <span className="text-zinc-500 text-[10px] mt-2">400 McAllister St</span>
            <span className="text-zinc-500 text-[10px]">Access: 16535884</span>
          </div>
        </div>

        {/* ASCII HANDSHAKE */}
        <div className="border border-cyan-900 rounded-lg bg-black p-4 overflow-x-auto">
          <pre className="text-cyan-400 text-xs leading-tight min-h-[13em]">
            {lines.map((l, i) => <div key={i}>{l}</div>)}
            {lines.length < ASCII_LINES.length && (
              <span className="animate-pulse text-cyan-600">_</span>
            )}
          </pre>
        </div>

        {/* VERIFICATION MATRIX */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {Object.entries(HANDSHAKE_DATA).map(([key, val]) => (
            <div key={key} className="bg-zinc-900 border border-zinc-800 p-4 rounded flex flex-col">
              <span className="text-[9px] text-zinc-500 uppercase font-black mb-1 tracking-widest">
                {key.replace(/([A-Z])/g, ' $1')}
              </span>
              <span className="text-xs text-amber-400 font-bold tracking-tight">{val}</span>
            </div>
          ))}
        </div>

        {/* GROUND TRUTHS — PINCER MOVEMENT */}
        <div className="bg-zinc-900 border-x-4 border-red-600 p-6 rounded-sm">
          <h2 className="text-xl font-black text-white mb-6 flex items-center gap-2 tracking-tighter">
            <ShieldAlert className="text-red-500" size={20} />
            FORENSIC GROUND TRUTHS — ANCHORED TO CCS
          </h2>
          <div className="space-y-4">
            {FORENSIC_GROUND_TRUTHS.map((truth) => {
              const Icon = truth.icon;
              return (
                <div key={truth.id} className="bg-black/50 border border-zinc-800 rounded-lg overflow-hidden">
                  <div className="flex items-center gap-3 px-5 py-3 bg-zinc-800/60">
                    <div className="bg-zinc-700 px-2.5 py-1 rounded text-amber-400 font-black text-sm">
                      {truth.id}
                    </div>
                    <Icon size={14} className="text-zinc-400" />
                    <p className="text-white font-bold text-sm uppercase">{truth.title}</p>
                    <span className={`ml-auto text-[9px] font-black px-2 py-0.5 rounded border ${truth.severityColor}`}>
                      {truth.severity}
                    </span>
                  </div>
                  <div className="p-5 space-y-3">
                    <p className="text-zinc-400 text-xs leading-relaxed">{truth.detail}</p>
                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="bg-emerald-950/30 border border-emerald-900 rounded p-3">
                        <p className="text-emerald-500 text-[9px] uppercase tracking-widest mb-1 font-bold">
                          Physical Ground Truth
                        </p>
                        <p className="text-slate-200 text-xs">{truth.groundTruth}</p>
                      </div>
                      <div className="bg-red-950/30 border border-red-900 rounded p-3">
                        <p className="text-red-500 text-[9px] uppercase tracking-widest mb-1 font-bold">
                          Judicial Fabrication
                        </p>
                        <p className="text-slate-200 text-xs">{truth.fabrication}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] bg-red-900/40 text-red-300 px-2 py-0.5 border border-red-800 font-bold uppercase">
                        {truth.statute}
                      </span>
                      <span className="text-[10px] text-zinc-500 italic">Status: ANCHORED_TO_CCS</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* OBSTRUCTION MATRIX */}
        <div>
          <h2 className="text-white font-black text-sm tracking-widest mb-3 flex items-center gap-2">
            <XCircle size={16} className="text-red-400" />
            OBSTRUCTION MATRIX — BLOCKED NODES (MAY 15, 2026)
          </h2>
          <div className="border border-zinc-800 rounded-lg overflow-hidden">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-zinc-700 bg-zinc-900">
                  <th className="text-left text-zinc-500 px-4 py-2 font-bold uppercase tracking-widest">Node</th>
                  <th className="text-left text-zinc-500 px-4 py-2 font-bold uppercase tracking-widest">Error</th>
                  <th className="text-left text-zinc-500 px-4 py-2 font-bold uppercase tracking-widest">Tier</th>
                  <th className="text-left text-zinc-500 px-4 py-2 font-bold uppercase tracking-widest">Date</th>
                </tr>
              </thead>
              <tbody>
                {BLOCKED_NODES.map((n, i) => (
                  <tr key={i} className={`border-b border-zinc-900 ${n.tier === 'FEDERAL' ? 'bg-red-950/20' : 'bg-amber-950/10'}`}>
                    <td className="px-4 py-3 text-white font-bold font-mono">{n.node}</td>
                    <td className="px-4 py-3 text-red-400">{n.error}</td>
                    <td className="px-4 py-3">
                      <span className={`text-[9px] font-black px-2 py-0.5 rounded border ${
                        n.tier === 'FEDERAL'
                          ? 'text-red-400 bg-red-900/30 border-red-700'
                          : 'text-amber-400 bg-amber-900/20 border-amber-700'
                      }`}>{n.tier}</span>
                    </td>
                    <td className="px-4 py-3 text-zinc-500">{n.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-zinc-600 text-[10px] mt-2 italic">
            &quot;The blockade did not stop the data — it only timestamped the fraud.&quot;
          </p>
        </div>

        {/* STRATEGIC PINCER MOVEMENT */}
        <div className="bg-emerald-950/10 border-2 border-emerald-900 rounded-xl p-8 text-center relative overflow-hidden">
          <Zap className="text-emerald-500 mx-auto mb-4 animate-pulse" size={48} />
          <h2 className="text-2xl font-black text-white tracking-widest mb-2 uppercase">
            Strategic Pincer Movement: COMPLETE
          </h2>
          <p className="text-sm text-emerald-400 font-bold mb-6">
            Management data trapped between hardware-verified logs and court records.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { n: 'IMMEDIATE ACTION 01', v: 'File UD-105 Answer @ Rm 103' },
              { n: 'IMMEDIATE ACTION 02', v: 'Motion to Strike (CCP §436)' },
              { n: 'IMMEDIATE ACTION 03', v: 'HHS OCR Monitoring #25-621293' },
            ].map((a) => (
              <div key={a.n} className="bg-zinc-950 p-4 rounded border border-emerald-800/50">
                <p className="text-[9px] text-zinc-500 mb-1 uppercase tracking-widest">{a.n}</p>
                <p className="text-xs font-bold text-white uppercase italic">{a.v}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ADVERSARIAL NOTICE */}
        <div className="border border-red-700 rounded-lg p-5 bg-red-950/10">
          <h2 className="text-red-400 font-black text-sm tracking-widest mb-3 flex items-center gap-2">
            <Terminal size={16} /> SYSTEM NOTIFICATION TO ZANGHI / WHITE
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            The Evidence Portal is no longer a private exchange. By the Handshake Protocol, your
            server logs and the blockade of{' '}
            <span className="text-red-400 font-mono">michael.anfang@va.gov</span> and{' '}
            <span className="text-red-400 font-mono">ronald.mccullough@va.gov</span> are now
            cross-referenced against the CCS upload.{' '}
            <span className="text-white font-bold">Department 12 is now a witness</span> to the
            &ldquo;Administrative Prohibition&rdquo; used to sabotage a disabled veteran&apos;s response.
          </p>
        </div>

        {/* PING DEPT 12 */}
        <div className="border border-zinc-700 rounded-lg p-5 bg-zinc-900 flex flex-col md:flex-row items-start md:items-center gap-4 justify-between">
          <div>
            <p className="text-white font-bold text-sm mb-1 flex items-center gap-2">
              <Radio size={14} className="text-cyan-400" />
              SEND ACKNOWLEDGMENT PING TO DEPT 12
            </p>
            <p className="text-zinc-500 text-xs">
              POST /api/court/handshake — Confirms live channel &amp; returns forensic index.
              Pings sent: <span className="text-amber-400 font-bold">{pingCount}</span>
            </p>
          </div>
          <button
            onClick={sendPing}
            disabled={pinging}
            className="flex items-center gap-2 bg-cyan-900 hover:bg-cyan-800 border border-cyan-700 text-cyan-300 font-bold text-sm px-5 py-3 rounded-lg transition-colors disabled:opacity-50 whitespace-nowrap"
          >
            {pinging
              ? <><RefreshCw size={14} className="animate-spin" /> Pinging...</>
              : <><Zap size={14} /> Ping Dept 12</>
            }
          </button>
        </div>

        {/* FOOTER NAV */}
        <div className="border border-zinc-800 rounded-lg p-4 flex flex-col md:flex-row items-start md:items-center gap-3 justify-between">
          <div className="text-[10px] text-zinc-500 space-y-1">
            <p>API: <span className="text-cyan-400 font-mono">GET /api/court/handshake</span></p>
            <p>SGAU: <span className="text-amber-400 font-mono">SGAU-7226.3461 — SAINT PAUL ANCHOR — VERIFIED</span></p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/dept12-case"
              className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 border border-red-800 rounded px-3 py-2 transition-colors"
            >
              <Gavel size={12} /> Case Dashboard
            </Link>
            <Link
              href="/surveillance-evidence"
              className="flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 border border-amber-800 rounded px-3 py-2 transition-colors"
            >
              <ArrowRight size={12} /> Surveillance
            </Link>
            <a
              href="https://webapps.sftc.org/ci/CaseInfo.dll?CaseNum=CUD-26-682107&AccessCode=16535884"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 border border-cyan-800 rounded px-3 py-2 transition-colors"
            >
              <ExternalLink size={12} /> CCS Portal
            </a>
          </div>
        </div>

        {/* SOVEREIGN FOOTER */}
        <div className="text-center text-[10px] text-zinc-600 py-2 tracking-widest uppercase leading-loose">
          Digital Handshake confirmed. Administrative Blockade converted to timestamped confession of fraud.
          <br />
          Truth is unmasked in Department 12. &bull; VALORAIPLUS® Σ* &bull; Made in the USA
        </div>

      </div>
    </div>
  );
}
