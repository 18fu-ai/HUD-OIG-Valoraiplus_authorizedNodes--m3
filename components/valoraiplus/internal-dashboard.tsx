"use client";

import dynamic from "next/dynamic";

const AppraisalChartLight = dynamic(
  () => import("./appraisal-chart-light").then((m) => ({ default: m.AppraisalChartLight })),
  { ssr: false, loading: () => <div className="h-[350px] animate-pulse bg-slate-100 rounded-xl" /> }
);

export function InternalDashboard() {
  return (
    <div
      className="antialiased min-h-screen"
      style={{ backgroundColor: "#f8fafc", color: "#1e293b", fontFamily: "'Inter', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap');
        @keyframes pulse-amber { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        .status-pulse-amber { animation: pulse-amber 2s cubic-bezier(0.4,0,0.6,1) infinite; }
      `}</style>

      {/* DISCLAIMER BOTTOM BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-[100] px-6 py-3 bg-amber-600 text-white text-[11px] font-bold uppercase tracking-wider text-center">
        INTERNAL VISUALIZATION DASHBOARD &bull; NOT A COURT DOCKET &bull; NOT FORMAL SERVICE &bull; NOT PROOF OF FILING
      </div>

      {/* NAV */}
      <nav
        className="sticky top-0 w-full z-50 border-b border-slate-200"
        style={{ backgroundColor: "rgba(255,255,255,0.8)", backdropFilter: "blur(12px)" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-amber-600 rounded flex items-center justify-center font-bold text-white text-sm">V</div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-tight uppercase leading-none" style={{ color: "#1e293b" }}>
                ValorAI<span className="text-amber-600">+</span>
              </span>
              <span
                className="text-[9px] text-slate-500 font-bold uppercase tracking-widest"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Internal Control Layer
              </span>
            </div>
          </div>

          <div className="hidden lg:flex gap-6 text-[10px] font-bold uppercase tracking-widest text-slate-500">
            <a href="#state" className="hover:text-amber-600 transition-colors">System HUD</a>
            <a href="#staging" className="hover:text-amber-600 transition-colors">Staging Log</a>
            <a href="#valuation" className="hover:text-amber-600 transition-colors">Asset Matrix</a>
            <a href="#architecture" className="hover:text-amber-600 transition-colors">Governance</a>
          </div>

          <div className="flex items-center gap-4">
            <span className="status-pulse-amber w-2 h-2 rounded-full bg-amber-600" />
            <span
              className="text-[9px] text-slate-500 font-bold uppercase"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              INTERNAL HOLD
            </span>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12 pb-24">

        {/* SECTION 1: CLASSIFICATION */}
        <section className="mb-12">
          <div
            className="p-6 rounded-xl border border-yellow-200 border-l-4 border-l-amber-600"
            style={{ backgroundColor: "#fffbeb", color: "#92400e" }}
          >
            <h2 className="text-sm font-bold uppercase tracking-widest mb-2">Classification &amp; Purpose</h2>
            <p className="text-sm leading-relaxed">
              VALORAIPLUS is an internal case-control and privacy-preserving access-audit dashboard for owned
              infrastructure. It assists with record organization, filing-readiness tracking, document indexing,
              and technical receipt preservation.{" "}
              <strong>
                It does not replace the official court docket, filed PDFs, proofs of service, agency receipts,
                authenticated exhibits, or judicial findings.
              </strong>
            </p>
          </div>
        </section>

        {/* SECTION 2: SYSTEM HUD */}
        <section id="state" className="mb-16 scroll-mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7">
              <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 mb-6">
                Internal Case-Control <br />
                <span className="text-amber-600">Hold State.</span>
              </h1>
              <p className="text-slate-600 text-lg mb-8 leading-relaxed max-w-2xl">
                Real-time visualization of the internal staging environment. System parameters are frozen
                pending manual execution sequence on Tuesday morning.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white border border-slate-200 shadow-sm p-5 rounded-xl">
                  <span
                    className="text-[10px] text-slate-400 uppercase font-bold block mb-1"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    Frozen Filing Commit
                  </span>
                  <p className="text-xl font-bold text-amber-700" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    1b9773d
                  </p>
                </div>
                <div className="bg-white border border-slate-200 shadow-sm p-5 rounded-xl">
                  <span
                    className="text-[10px] text-slate-400 uppercase font-bold block mb-1"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    Post-Hold Implementation
                  </span>
                  <p className="text-xl font-bold text-slate-400" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    2511ad9
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div
                className="p-5 rounded-lg leading-7"
                style={{
                  backgroundColor: "#1e293b",
                  color: "#f1f5f9",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.8rem",
                }}
              >
                <p className="text-amber-500">{"// System State: Internal Hold"}</p>
                <p className="mt-2">{"> Branch: mission-creation"}</p>
                <p>{"> Phase 1 Schema: Ready"}</p>
                <p>{"> Phase 1 Seed: Count pending SQL verification"}</p>
                <p>{"> Phase 2 Telemetry: Ready (Pending database activation)"}</p>
                <p>{"> Document 108: Ready for manual lodging"}</p>
                <p className="mt-4 text-emerald-400">{">>"} Status: Staged for Tuesday Sequence</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: FILING READINESS TIMELINE */}
        <section id="staging" className="mb-24 scroll-mt-20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-3">
                Filing Readiness Tracking
              </h2>
              <p className="text-slate-500 max-w-2xl text-sm leading-relaxed">
                Tracking the lifecycle of staging materials through the holiday period. This log monitors
                internal readiness and manual lodging preparation for Department 12.
              </p>
            </div>
            <div className="px-4 py-2 bg-slate-100 rounded-lg text-center border border-slate-200 shrink-0">
              <span className="block text-xl font-bold text-slate-700">Staging</span>
              <span
                className="text-[9px] text-slate-500 uppercase font-bold"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Mode Active
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-slate-200 shadow-sm p-8 rounded-2xl relative overflow-hidden">
              <span className="absolute top-4 right-4 text-slate-100 font-black text-5xl select-none">01</span>
              <h3 className="text-lg font-bold mb-4 relative z-10 text-slate-900">Baseline Verification</h3>
              <p className="text-sm text-slate-600 leading-relaxed relative z-10">
                Review of procedural states. ADA interactive process status recorded. Preliminary staging
                and non-duplicated file audit complete.
              </p>
              <div className="mt-6 pt-6 border-t border-slate-100">
                <span
                  className="text-[10px] text-emerald-600 font-bold uppercase"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  Status: Verified Internal
                </span>
              </div>
            </div>

            <div
              className="p-8 rounded-2xl relative overflow-hidden border border-amber-100 shadow-sm"
              style={{ backgroundColor: "rgba(251,191,36,0.05)" }}
            >
              <span
                className="absolute top-4 right-4 font-black text-5xl select-none"
                style={{ color: "rgba(251,191,36,0.25)" }}
              >
                02
              </span>
              <h3 className="text-lg font-bold mb-4 relative z-10 text-amber-800">Accelerated Staging</h3>
              <p className="text-sm text-slate-600 leading-relaxed relative z-10">
                Materials staged for manual lodging. Preparation for CCRS portal ingestion. Document
                counts pending final synchronization.
              </p>
              <div className="mt-6 pt-6 border-t border-amber-100">
                <span
                  className="text-[10px] text-amber-600 font-bold uppercase animate-pulse"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  Status: In Progress
                </span>
              </div>
            </div>

            <div className="bg-white border border-slate-200 shadow-sm p-8 rounded-2xl relative overflow-hidden">
              <span className="absolute top-4 right-4 text-slate-100 font-black text-5xl select-none">03</span>
              <h3 className="text-lg font-bold mb-4 relative z-10 text-slate-900">Execution Sequence</h3>
              <p className="text-sm text-slate-600 leading-relaxed relative z-10">
                Manual lodging of Document 108 scheduled. Production activation pending final migration
                verification and administrative receipt capture.
              </p>
              <div className="mt-6 pt-6 border-t border-slate-100">
                <span
                  className="text-[10px] text-slate-400 font-bold uppercase"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  Status: Scheduled
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: ASSET VALUATION MATRIX */}
        <section id="valuation" className="mb-24 pt-12 border-t border-slate-200 scroll-mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-4">
                  Internal Asset Matrix
                </h2>
                <p className="text-slate-600 leading-relaxed text-sm">
                  A visualization of the internal valuation model ($3.2M portfolio). This matrix accounts
                  for development replacement costs, compliance premiums, and speculative SaaS enterprise
                  value. <strong>Speculative projections only — not legal claims.</strong>
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-4 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="text-sm font-bold text-slate-700">Internal Value Appraisal</span>
                  <span className="text-2xl font-extrabold text-amber-700">$3.2M</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 bg-white border border-slate-200 rounded-xl">
                    <span
                      className="text-[10px] text-slate-400 uppercase font-bold mb-1 block"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      Engineering
                    </span>
                    <span className="text-lg font-bold text-slate-800">$76K</span>
                  </div>
                  <div className="p-4 bg-white border border-slate-200 rounded-xl">
                    <span
                      className="text-[10px] text-slate-400 uppercase font-bold mb-1 block"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      Compliance
                    </span>
                    <span className="text-lg font-bold text-slate-800">$35K</span>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ height: "350px", maxHeight: "400px", position: "relative" }}>
              <AppraisalChartLight />
            </div>
          </div>
        </section>

        {/* SECTION 5: GOVERNANCE */}
        <section id="architecture" className="mb-24 py-16 bg-slate-900 rounded-[2.5rem] px-8 md:px-16 text-white scroll-mt-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight mb-4">Case-Control Governance</h2>
            <p className="text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
              Analysis of the DG77.77X framework and technical receipt preservation infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                n: "01",
                title: "Record Organization",
                body: "Establishing a systematic internal record layer using hashing and append-only database triggers to ensure internal timeline integrity.",
              },
              {
                n: "02",
                title: "Defect Identification",
                body: "Technical verification of licensing credentials and procedural timelines to identify systemic friction points in the administrative sequence.",
              },
              {
                n: "03",
                title: "Privacy Layer",
                body: "Implementation of HMAC-SHA256 privacy filters to audit access patterns without storing protected personally identifiable information (PII).",
              },
            ].map(({ n, title, body }) => (
              <div key={n} className="space-y-4">
                <div className="w-10 h-10 bg-amber-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                  {n}
                </div>
                <h4 className="text-lg font-bold">{title}</h4>
                <p className="text-sm text-slate-400 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>

          <div className="mt-20 p-8 border border-slate-700 rounded-2xl bg-slate-800/50 text-center max-w-3xl mx-auto">
            <blockquote className="text-xl font-medium italic text-slate-200">
              &ldquo;Internal case-control provides the structural clarity required to navigate institutional complexity.&rdquo;
            </blockquote>
            <p className="mt-4 text-xs font-bold uppercase tracking-[0.3em] text-amber-500">
              &mdash; DG77.77X Internal Doctrine
            </p>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-200 py-12 px-6 pb-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-slate-800 rounded flex items-center justify-center font-bold text-amber-500 text-[10px]">
              V
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
              VALORAIPLUS &copy; 2026
            </span>
          </div>

          <div className="text-center md:text-right">
            <p
              className="text-[9px] text-slate-400 mb-1 uppercase tracking-tighter"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Classification: Internal Case-Control Dashboard
            </p>
            <p
              className="text-[9px] text-slate-400 uppercase tracking-tighter"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Superior Court of California, County of San Francisco, Dept. 12 &bull; CUD-26-682107
            </p>
            <p
              className="text-[9px] text-slate-400 uppercase tracking-tighter mt-1"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Frozen Filing Commit:{" "}
              <span className="text-amber-600 font-bold">1b9773d</span>
              {" "}&bull; Post-Hold Implementation:{" "}
              <span className="text-slate-600 font-bold">2511ad9</span>
            </p>
            <p
              className="text-[8px] text-slate-400 uppercase mt-2"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Official court docket, filed PDFs, and authenticated exhibits remain controlling.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
