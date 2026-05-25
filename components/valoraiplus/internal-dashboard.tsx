"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

const AppraisalChartLight = dynamic(
  () =>
    import("./appraisal-chart-light").then((m) => ({
      default: m.AppraisalChartLight,
    })),
  { ssr: false, loading: () => <div className="h-[350px] animate-pulse bg-slate-100 rounded-xl" /> }
);

export function InternalDashboard() {
  return (
    // Light theme wrapper — overrides the global dark bg
    <div className="bg-[#f8fafc] text-[#1e293b] min-h-screen font-sans antialiased">

      {/* Bottom disclaimer bar */}
      <div className="fixed bottom-0 left-0 right-0 z-[100] px-6 py-3 bg-amber-600 text-white text-[11px] font-bold uppercase tracking-wider text-center">
        INTERNAL VISUALIZATION DASHBOARD &bull; NOT A COURT DOCKET &bull; NOT FORMAL SERVICE &bull; NOT PROOF OF FILING
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-amber-600 rounded flex items-center justify-center font-bold text-white text-sm">
              V
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-tight uppercase leading-none text-[#1e293b]">
                ValorAI<span className="text-amber-600">+</span>
              </span>
              <span className="font-mono text-[9px] text-slate-500 font-bold uppercase tracking-widest">
                Internal Control Layer
              </span>
            </div>
          </div>

          <div className="hidden lg:flex gap-6 text-[10px] font-bold uppercase tracking-widest text-slate-500">
            <a href="#state" className="hover:text-amber-600 transition-colors">System HUD</a>
            <a href="#staging" className="hover:text-amber-600 transition-colors">Staging Log</a>
            <a href="#valuation" className="hover:text-amber-600 transition-colors">Asset Matrix</a>
            <a href="#architecture" className="hover:text-amber-600 transition-colors">Architecture</a>
          </div>

          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
            <span className="font-mono text-[9px] text-slate-500 font-bold uppercase">INTERNAL HOLD</span>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12 pb-24">

        {/* Section 1 — Classification Disclaimer */}
        <section className="mb-12">
          <div className="bg-amber-50 border border-amber-200 border-l-4 border-l-amber-600 p-6 rounded-xl text-amber-900">
            <h2 className="text-sm font-bold uppercase tracking-widest mb-2">Internal Classification</h2>
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

        {/* Section 2 — System HUD */}
        <section id="state" className="mb-16 scroll-mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7">
              <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 mb-6">
                Internal Case-Control <br />
                <span className="text-amber-600">Hold State.</span>
              </h1>
              <p className="text-slate-600 text-lg mb-8 leading-relaxed max-w-2xl">
                This interface provides a real-time visualization of the internal staging environment.
                System parameters are frozen pending manual execution sequence on Tuesday.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white border border-slate-200 shadow-sm p-5 rounded-xl">
                  <span className="text-[10px] text-slate-400 uppercase font-bold font-mono block mb-1">
                    Frozen Filing Commit
                  </span>
                  <p className="text-xl font-bold font-mono text-amber-700">1b9773d</p>
                </div>
                <div className="bg-white border border-slate-200 shadow-sm p-5 rounded-xl">
                  <span className="text-[10px] text-slate-400 uppercase font-bold font-mono block mb-1">
                    Current Head Commit
                  </span>
                  <p className="text-xl font-bold font-mono text-slate-500">ca3dca0</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-[#1e293b] text-slate-100 font-mono text-[0.8rem] p-5 rounded-lg leading-6">
                <p className="text-amber-400">// System State: Internal Hold</p>
                <p className="mt-2">&gt; Branch: mission-creation</p>
                <p>&gt; Phase 1 Schema: Ready</p>
                <p>&gt; Phase 1 Seed: Exact count pending SQL verification</p>
                <p>&gt; Phase 2 Telemetry: Ready (pending database activation)</p>
                <p>&gt; Document 108: Ready for manual lodging</p>
                <p className="mt-4 text-emerald-400">&gt;&gt; Status: Pending Deployment Confirmation</p>
                <p className="text-emerald-400">&gt;&gt; Status: Receipt Capture Enabled</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3 — Filing Readiness Timeline */}
        <section id="staging" className="mb-24 scroll-mt-20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-3">
                Filing Readiness Tracking
              </h2>
              <p className="text-slate-500 max-w-2xl text-sm leading-relaxed">
                Tracking the lifecycle of staging materials. This log monitors internal readiness and
                manual lodging preparation for Superior Court of California, County of San Francisco, Dept. 12.
              </p>
            </div>
            <div className="px-4 py-2 bg-slate-100 rounded-lg text-center border border-slate-200 shrink-0">
              <span className="block text-xl font-bold text-slate-700">T-minus</span>
              <span className="text-[9px] text-slate-500 uppercase font-bold font-mono">Launch Sync</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Node 01 */}
            <div className="bg-white border border-slate-200 shadow-sm p-8 rounded-2xl relative overflow-hidden">
              <span className="absolute top-4 right-4 text-slate-100 font-black text-5xl select-none">01</span>
              <h3 className="text-lg font-bold mb-4 relative z-10 text-slate-900">Baseline Verification</h3>
              <p className="text-sm text-slate-600 leading-relaxed relative z-10">
                Review of procedural friction states. ADA interactive process status remains pending.
                Preliminary staging complete.
              </p>
              <div className="mt-6 pt-6 border-t border-slate-100">
                <span className="text-[10px] text-emerald-600 font-bold uppercase font-mono">
                  Status: Verified
                </span>
              </div>
            </div>

            {/* Node 02 */}
            <div className="bg-amber-50/30 border border-amber-100 shadow-sm p-8 rounded-2xl relative overflow-hidden">
              <span className="absolute top-4 right-4 text-amber-100/50 font-black text-5xl select-none">02</span>
              <h3 className="text-lg font-bold mb-4 relative z-10 text-amber-800">Automated Staging</h3>
              <p className="text-sm text-slate-600 leading-relaxed relative z-10">
                Materials staged for manual lodging. Preparation for CCRS portal ingestion.
                Document counts pending final SQL verification.
              </p>
              <div className="mt-6 pt-6 border-t border-amber-100">
                <span className="text-[10px] text-amber-600 font-bold uppercase font-mono animate-pulse">
                  Status: In Progress
                </span>
              </div>
            </div>

            {/* Node 03 */}
            <div className="bg-white border border-slate-200 shadow-sm p-8 rounded-2xl relative overflow-hidden">
              <span className="absolute top-4 right-4 text-slate-100 font-black text-5xl select-none">03</span>
              <h3 className="text-lg font-bold mb-4 relative z-10 text-slate-900">Execution Sequence</h3>
              <p className="text-sm text-slate-600 leading-relaxed relative z-10">
                Manual lodging of Document 108 scheduled. Production activation pending final
                migration verification and receipt capture.
              </p>
              <div className="mt-6 pt-6 border-t border-slate-100">
                <span className="text-[10px] text-slate-400 font-bold uppercase font-mono">
                  Status: Pending Gate 1
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4 — Asset Valuation Matrix */}
        <section id="valuation" className="mb-24 pt-12 border-t border-slate-200 scroll-mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-4">
                  Internal Asset Matrix
                </h2>
                <p className="text-slate-600 leading-relaxed text-sm">
                  A visualization of the internal valuation model. This matrix accounts for engineering
                  replacement costs, compliance premiums, and speculative SaaS enterprise value.{" "}
                  <strong>Speculative projections only — not legal claims.</strong>
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center p-4 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="text-sm font-bold text-slate-700">Internal Value Projection</span>
                  <span className="text-2xl font-extrabold text-amber-700">$3.2M</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 bg-white border border-slate-200 rounded-xl">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1 font-mono">Engineering</span>
                    <span className="text-lg font-bold text-slate-800">$76K</span>
                  </div>
                  <div className="p-4 bg-white border border-slate-200 rounded-xl">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1 font-mono">Compliance</span>
                    <span className="text-lg font-bold text-slate-800">$35K</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative h-[350px] max-h-[400px]">
              <AppraisalChartLight />
            </div>
          </div>
        </section>

        {/* Section 5 — Strategic Architecture */}
        <section id="architecture" className="mb-24 py-16 bg-slate-900 rounded-[2.5rem] px-8 md:px-16 text-white scroll-mt-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight mb-4">
              Case-Control Architecture
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
              Analysis of the DG77.77X framework and technical receipt preservation infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="w-10 h-10 bg-amber-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                01
              </div>
              <h4 className="text-lg font-bold">Record Organization</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Establishing a systematic internal record layer using hashing and append-only database
                triggers to ensure timeline integrity.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-10 h-10 bg-amber-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                02
              </div>
              <h4 className="text-lg font-bold">Defect Identification</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Technical verification of licensing credentials and procedural timelines to identify
                systemic friction points in the notice sequence.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-10 h-10 bg-amber-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                03
              </div>
              <h4 className="text-lg font-bold">Privacy Layer</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Implementation of HMAC-SHA256 privacy filters to audit access patterns without
                storing protected personally identifiable information (PII).
              </p>
            </div>
          </div>

          <div className="mt-20 p-8 border border-slate-700 rounded-2xl bg-slate-800/50 text-center max-w-3xl mx-auto">
            <blockquote className="text-xl font-medium italic text-slate-200">
              &ldquo;Internal case-control provides the structural clarity required to navigate institutional complexity.&rdquo;
            </blockquote>
            <p className="mt-4 text-xs font-bold uppercase tracking-[0.3em] text-amber-500">
              — DG77.77X System Doctrine
            </p>
          </div>
        </section>

      </main>

      {/* Footer */}
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

          <div className="text-center md:text-right space-y-1">
            <p className="font-mono text-[9px] text-slate-400 uppercase tracking-tighter">
              Superior Court of California, County of San Francisco, Dept. 12 &mdash; Case No. CUD-26-682107
            </p>
            <p className="font-mono text-[9px] text-slate-400 uppercase tracking-tighter">
              Classification: Internal Visualization Dashboard &mdash; Not a Court Filing
            </p>
            <p className="font-mono text-[9px] text-slate-400 uppercase tracking-tighter">
              Frozen Filing Commit:{" "}
              <span className="text-amber-600 font-bold">1b9773d</span>
              {" "}&bull; Head:{" "}
              <span className="text-slate-600 font-bold">ca3dca0</span>
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-slate-100">
          <p className="text-[9px] text-slate-400 text-center leading-relaxed font-mono uppercase tracking-wide">
            VALORAIPLUS organizes and preserves records for Defendant&apos;s litigation support only. It does not replace
            the official court docket, filed PDFs, proofs of service, agency receipts, authenticated exhibits, or
            judicial findings. The Court determines admissibility, weight, and legal effect.
          </p>
        </div>
      </footer>

    </div>
  );
}
