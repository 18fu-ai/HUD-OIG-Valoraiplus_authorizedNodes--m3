"use client";

import React from "react";

const FROZEN_FILING_COMMIT = "1b9773d";
const POST_HOLD_IMPLEMENTATION_COMMIT = "ca3dca0";
const BRANCH = "mission-creation";
const CASE_NUMBER = "CUD-26-682107";
const RELATED_CASE = "CCH-28-589086";
const DOCUMENT_READY = "Document 108";

type TimelineItem = {
  index: string;
  title: string;
  status: string;
  body: string;
  accent?: boolean;
};

type Pillar = {
  icon: string;
  title: string;
  body: string;
};

type ValuationRow = {
  label: string;
  amount: number;
  note: string;
};

const timeline: TimelineItem[] = [
  {
    index: "01",
    title: "Record Preparation",
    status: "STAGED",
    body:
      "Court-facing PDFs, repository indexes, and related-case materials are organized for review. Document count remains subject to SQL verification after database activation.",
  },
  {
    index: "02",
    title: "Database Activation Hold",
    status: "PENDING SQL",
    accent: true,
    body:
      "Supabase migrations 001–004 are prepared for ordered application. Production claims remain pending post-migration verification and receipt capture.",
  },
  {
    index: "03",
    title: "Tuesday Manual Lodging",
    status: "READY",
    body:
      "Document 108 remains ready for manual lodging. Filed status may be entered only after court, Rapid Legal, or clerk confirmation exists.",
  },
];

const pillars: Pillar[] = [
  {
    icon: "🧾",
    title: "Record Organization",
    body:
      "Indexes pleadings, declarations, exhibits, agency identifiers, repository links, and document-control records for readability and preservation.",
  },
  {
    icon: "⚖️",
    title: "Threshold Issues",
    body:
      "Preserves predicate notice, timing, authority, habitability, reasonable accommodation, retaliation, and access-to-court issues for review at the proper procedural time.",
  },
  {
    icon: "🔐",
    title: "Privacy-Preserving Audit",
    body:
      "Uses technical access-pattern review for owned infrastructure without storing raw IP addresses or raw user-agent strings in the dashboard posture.",
  },
];

const valuationRows: ValuationRow[] = [
  {
    label: "Engineering Work",
    amount: 76000,
    note: "Estimated reconstruction / implementation labor category.",
  },
  {
    label: "Compliance Structuring",
    amount: 35000,
    note: "Estimated document-control, privacy, and workflow review category.",
  },
  {
    label: "Risk Mitigation",
    amount: 120000,
    note: "Estimated value of preserving receipts, access controls, and fallback materials.",
  },
  {
    label: "Speculative Product Potential",
    amount: 2970000,
    note: "Internal valuation concept only; not a court finding, appraisal, or damages proof.",
  },
];

const totalValuation = valuationRows.reduce((sum, row) => sum + row.amount, 0);
const maxValuation = Math.max(...valuationRows.map((row) => row.amount));

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function StatusCard({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 shadow-sm">
      <div className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
        {label}
      </div>
      <div className={muted ? "mt-2 font-mono text-lg text-slate-300" : "mt-2 font-mono text-lg font-black text-amber-400"}>
        {value}
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1">
      <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
      <span className="text-[10px] font-black uppercase tracking-[0.25em] text-amber-400">
        {children}
      </span>
    </div>
  );
}

export default function OmegaAlphaPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-slate-50">
      <nav className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500 font-black text-black">
              &#937;
            </div>
            <div>
              <div className="text-xl font-black uppercase tracking-tight">
                VALORAIPLUS<span className="text-amber-400"> / Omega-Alpha</span>
              </div>
              <div className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-slate-500">
                Internal Case-Control Reference Layer
              </div>
            </div>
          </div>

          <div className="hidden items-center gap-6 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 lg:flex">
            <a className="transition hover:text-amber-400" href="#state">State</a>
            <a className="transition hover:text-amber-400" href="#timeline">Timeline</a>
            <a className="transition hover:text-amber-400" href="#valuation">Valuation</a>
            <a className="transition hover:text-amber-400" href="#limits">Limits</a>
          </div>
        </div>
      </nav>

      {/* ── STATE HUD ─────────────────────────────────────────────────────── */}
      <section id="state" className="px-6 py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-12 lg:items-center">
          <div className="space-y-8 lg:col-span-7">
            <SectionLabel>Memorial Day Hold — Internal Status</SectionLabel>

            <div className="space-y-5">
              <h1 className="max-w-4xl text-5xl font-black leading-[0.9] tracking-tighter md:text-7xl">
                OMEGA-ALPHA <span className="text-amber-400">MISSION CONTROL</span>
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-slate-400">
                Internal dashboard for {CASE_NUMBER}. This page summarizes filing readiness,
                database activation status, system limitations, and receipt-preservation tasks.
                The frozen filing hold remains at commit {FROZEN_FILING_COMMIT}; the post-hold
                implementation reference is {POST_HOLD_IMPLEMENTATION_COMMIT}. It is not the official
                court docket and does not independently prove filing, service, liability,
                visitor identity, or judicial findings.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <StatusCard label="Frozen Filing Commit" value={FROZEN_FILING_COMMIT} />
              <StatusCard label="Post-Hold Implementation" value={POST_HOLD_IMPLEMENTATION_COMMIT} muted />
              <StatusCard label="Branch" value={BRANCH} muted />
              <StatusCard label="Court Filing" value="PENDING" muted />
              <StatusCard label="Case" value={CASE_NUMBER} muted />
              <StatusCard label="Related Case" value={RELATED_CASE} muted />
              <StatusCard label="Manual Lodging" value={DOCUMENT_READY} muted />
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-slate-800 bg-black p-6 font-mono shadow-2xl shadow-amber-500/5">
              <div className="mb-4 text-xs text-slate-500">// Internal readiness receipt</div>
              <div className="space-y-2 text-sm leading-7">
                <p><span className="text-slate-500">frozen_filing_commit:</span> <span className="text-amber-400">{FROZEN_FILING_COMMIT}</span></p>
                <p><span className="text-slate-500">post_hold_implementation:</span> <span className="text-slate-300">{POST_HOLD_IMPLEMENTATION_COMMIT}</span></p>
                <p><span className="text-slate-500">phase_1_schema:</span> READY</p>
                <p><span className="text-slate-500">phase_1_seed:</span> READY_COUNT_PENDING_SQL</p>
                <p><span className="text-slate-500">phase_2_telemetry:</span> READY_PENDING_DB_ACTIVATION</p>
                <p><span className="text-slate-500">document_108:</span> READY_FOR_MANUAL_LODGING</p>
                <p><span className="text-slate-500">court_status:</span> NOT_FILED_BY_DASHBOARD</p>
                <p className="pt-3 text-emerald-400">status: APPLICATION_READY</p>
                <p className="text-amber-300">next: SQL + DEPLOY + RECEIPTS</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FILING READINESS TIMELINE ─────────────────────────────────────── */}
      <section id="timeline" className="border-y border-slate-900 bg-slate-950 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="space-y-4">
              <SectionLabel>Execution Timeline</SectionLabel>
              <h2 className="text-4xl font-black tracking-tight">Filing-Readiness Timeline</h2>
              <p className="max-w-3xl text-slate-400">
                This timeline tracks preparation and verification tasks. Counts, filing status,
                and production state remain pending until confirmed by SQL, deployment logs,
                court/Rapid Legal receipts, or clerk confirmation.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 text-center">
              <div className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                Document Count
              </div>
              <div className="mt-1 text-2xl font-black text-amber-400">Pending SQL</div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {timeline.map((item) => (
              <article
                key={item.index}
                className={
                  item.accent
                    ? "relative overflow-hidden rounded-3xl border border-amber-500/30 bg-amber-500/5 p-8"
                    : "relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 p-8"
                }
              >
                <div className={item.accent
                  ? "absolute right-5 top-4 text-6xl font-black text-amber-500/10"
                  : "absolute right-5 top-4 text-6xl font-black text-slate-800"}>
                  {item.index}
                </div>
                <div className="relative z-10 space-y-4">
                  <h3 className={item.accent ? "text-xl font-black text-amber-400" : "text-xl font-black"}>
                    {item.title}
                  </h3>
                  <p className="text-sm leading-7 text-slate-400">{item.body}</p>
                  <div className="border-t border-slate-800 pt-4 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                    {item.status}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUATION MATRIX ──────────────────────────────────────────────── */}
      <section id="valuation" className="px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <SectionLabel>Internal Asset-Value Reference</SectionLabel>
            <h2 className="text-4xl font-black tracking-tight">Replacement-Value Working Model</h2>
            <p className="leading-8 text-slate-400">
              This panel is an internal planning model only. It is not an appraisal, damages
              finding, court determination, or independent proof of market value. Any external
              valuation must be supported by proper foundation, expert analysis, admissible
              evidence, and procedural opportunity to respond.
            </p>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <div className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                Internal total reference
              </div>
              <div className="mt-2 text-4xl font-black text-amber-400">
                {formatCurrency(totalValuation)}
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6">
            <div className="space-y-5">
              {valuationRows.map((row) => {
                const percent = Math.max(4, Math.round((row.amount / maxValuation) * 100));
                return (
                  <div key={row.label}>
                    <div className="mb-2 flex items-baseline justify-between gap-4">
                      <div>
                        <div className="text-sm font-bold">{row.label}</div>
                        <div className="text-xs text-slate-500">{row.note}</div>
                      </div>
                      <div className="shrink-0 font-mono text-sm font-bold text-amber-400">
                        {formatCurrency(row.amount)}
                      </div>
                    </div>
                    <div className="h-3 overflow-hidden rounded-full bg-slate-900">
                      <div
                        className="h-full rounded-full bg-amber-500"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── PILLARS ───────────────────────────────────────────────────────── */}
      <section id="pillars" className="border-y border-slate-900 bg-slate-950 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <SectionLabel>Review Pillars</SectionLabel>
            <h2 className="mt-4 text-4xl font-black tracking-tight">Court-Safe Review Categories</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {pillars.map((pillar) => (
              <article key={pillar.title} className="rounded-[2rem] border border-slate-800 bg-slate-900/70 p-8">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 text-3xl">
                  {pillar.icon}
                </div>
                <h3 className="mb-4 text-2xl font-black">{pillar.title}</h3>
                <p className="text-sm leading-7 text-slate-400">{pillar.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── SYSTEM LIMITS ─────────────────────────────────────────────────── */}
      <section id="limits" className="px-6 py-20">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-amber-500/20 bg-amber-500/5 p-8 md:p-12">
          <SectionLabel>System Limitation</SectionLabel>
          <h2 className="mt-5 text-3xl font-black tracking-tight">Official Record Controls</h2>
          <p className="mt-5 leading-8 text-slate-300">
            VALORAIPLUS is an organizational case-control and privacy-preserving access-audit
            system for owned infrastructure. It assists with document indexing, visibility
            separation, event tracking, and technical access-pattern review. It does not replace
            the official court docket, does not identify individual visitors, does not publish
            private information, and does not substitute telemetry for testimony, formal service,
            authentication, admission, or judicial findings.
          </p>
          <div className="mt-8 rounded-2xl border border-slate-800 bg-black p-5 font-mono text-sm leading-7 text-slate-300">
            <p>fallback_record: official court docket + filed PDFs + proofs of service + agency receipts + authenticated exhibits</p>
            <p>if_error: preserve screenshot → stop changes → use controlled corrective migration or rollback plan</p>
            <p>filed_status: only after court/Rapid Legal/clerk confirmation</p>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────────── */}
      <footer className="border-t border-slate-900 bg-black px-6 py-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 font-black text-amber-400">
              &#937;
            </div>
            <div>
              <div className="text-xs font-black uppercase tracking-[0.25em]">VALORAIPLUS &copy; 2026</div>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-600">
                Internal case-control reference layer
              </div>
            </div>
          </div>

          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-600 md:text-right">
            <div>Case: <span className="text-slate-400">{CASE_NUMBER}</span> &nbsp;|&nbsp; Related: <span className="text-slate-400">{RELATED_CASE}</span></div>
            <div>Court: Superior Court of California, County of San Francisco, Dept. 12</div>
            <div className="mt-1">Frozen filing commit: <span className="font-bold text-amber-400">{FROZEN_FILING_COMMIT}</span></div>
            <div>Post-hold implementation: <span className="font-bold text-slate-400">{POST_HOLD_IMPLEMENTATION_COMMIT}</span></div>
            <div className="mt-2 text-slate-700">
              This page is an internal organizational reference only. It does not replace the official court docket,
              constitute a filing, or establish legal rights. The Court determines admissibility, weight, and legal effect.
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
