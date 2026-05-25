import type { Metadata } from "next";
import { AppraisalChart } from "@/components/valoraiplus/appraisal-chart";

export const metadata: Metadata = {
  title: "VALORAIPLUS | Omega-Alpha Mission Control",
  description:
    "Forensic command center for Case CUD-26-682107 — Superior Court of California, County of San Francisco, Department 12.",
};

export default function OmegaAlphaPage() {
  return (
    <div
      className="antialiased min-h-screen"
      style={{ backgroundColor: "#020617", color: "#f8fafc", fontFamily: "'Outfit', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;900&family=JetBrains+Mono:wght@400;700&display=swap');
        .mono { font-family: 'JetBrains Mono', monospace; }
        .hover-lift { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .hover-lift:hover { transform: translateY(-4px); }
        .status-pulse { animation: pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        @keyframes pulse-ring { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #020617; }
        ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #d97706; }
      `}</style>

      {/* NAVIGATION */}
      <nav
        className="fixed top-0 w-full z-50 border-b px-6 py-4"
        style={{
          backgroundColor: "rgba(2,6,23,0.85)",
          backdropFilter: "blur(12px)",
          borderColor: "#1e293b",
        }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded flex items-center justify-center font-black text-white text-sm"
              style={{ backgroundColor: "#d97706" }}
            >
              &#937;
            </div>
            <span
              className="font-black tracking-tighter text-xl uppercase"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              ValorAI<span style={{ color: "#d97706" }}>+</span>
            </span>
          </div>

          <div className="hidden md:flex gap-8 text-slate-400" style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>
            {[
              { href: "#timeline", label: "Ingestion Log" },
              { href: "#valuation", label: "Asset Appraisal" },
              { href: "#pillars", label: "Strategic Pillars" },
              { href: "#parallel", label: "Historical Model" },
            ].map(({ href, label }) => (
              <a key={href} href={href} className="hover:text-amber-500 transition-colors">
                {label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <span
              className="status-pulse w-2 h-2 rounded-full"
              style={{ backgroundColor: "#f59e0b" }}
            />
            <span
              className="mono font-bold uppercase"
              style={{ fontSize: "10px", color: "#f59e0b" }}
            >
              Posture: DARK
            </span>
          </div>
        </div>
      </nav>

      {/* ── HERO HUD ───────────────────────────────────────────────────────── */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

            {/* Left — system state */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className="mono px-2 py-0.5 rounded font-bold text-slate-400"
                    style={{ backgroundColor: "#1e293b", fontSize: "10px" }}
                  >
                    HEAD: ca3dca0
                  </span>
                  <span
                    className="mono px-2 py-0.5 rounded font-bold border"
                    style={{
                      color: "#f59e0b",
                      backgroundColor: "rgba(120,53,15,0.3)",
                      borderColor: "rgba(217,119,6,0.3)",
                      fontSize: "10px",
                    }}
                  >
                    FROZEN RECEIPT: 1b9773d
                  </span>
                  <span
                    className="mono px-2 py-0.5 rounded font-bold border"
                    style={{
                      color: "#94a3b8",
                      backgroundColor: "rgba(30,41,59,0.5)",
                      borderColor: "#334155",
                      fontSize: "10px",
                    }}
                  >
                    CUD-26-682107
                  </span>
                </div>

                <h1
                  className="font-black tracking-tighter leading-none"
                  style={{ fontSize: "clamp(3.5rem,8vw,6rem)", fontFamily: "'Outfit', sans-serif" }}
                >
                  SOVEREIGN{" "}
                  <br />
                  <span style={{ color: "#d97706", fontStyle: "italic" }}>SHIELD.</span>
                </h1>

                <p className="text-lg max-w-2xl leading-relaxed" style={{ color: "#94a3b8" }}>
                  A comprehensive synthesis of Case CUD-26-682107. The system is
                  currently in a{" "}
                  <strong style={{ color: "#f8fafc" }}>Closed Ledger State</strong>,
                  having successfully executed a multi-channel administrative
                  encirclement during the Memorial Day freeze.
                </p>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Index State", value: "94", suffix: "Files" },
                  { label: "Telemetry", value: "HMAC" },
                  { label: "Node", value: "DARK" },
                  { label: "Ready", value: "GATE 1", highlight: true },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="p-4 rounded-xl border"
                    style={{
                      backgroundColor: "#0f172a",
                      borderColor: "#1e293b",
                      boxShadow: "0 0 20px rgba(217,119,6,0.07)",
                    }}
                  >
                    <p
                      className="mono uppercase font-bold mb-1"
                      style={{ color: "#64748b", fontSize: "10px" }}
                    >
                      {s.label}
                    </p>
                    <p
                      className="text-2xl font-black"
                      style={{ color: s.highlight ? "#f59e0b" : "#f8fafc" }}
                    >
                      {s.value}
                      {s.suffix && (
                        <span
                          className="font-normal ml-1"
                          style={{ color: "#475569", fontSize: "12px" }}
                        >
                          {s.suffix}
                        </span>
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — mission context */}
            <div
              className="lg:col-span-5 p-8 rounded-3xl border relative overflow-hidden"
              style={{ backgroundColor: "rgba(15,23,42,0.5)", borderColor: "#1e293b" }}
            >
              <div
                className="absolute -top-24 -right-24 w-64 h-64 rounded-full pointer-events-none"
                style={{ background: "rgba(217,119,6,0.1)", filter: "blur(100px)" }}
              />
              <h3
                className="mono font-bold uppercase tracking-widest mb-6"
                style={{ fontSize: "12px", color: "#64748b" }}
              >
                Mission Context
              </h3>
              <ul className="space-y-6">
                {[
                  {
                    icon: "⚖️",
                    title: "Department 12 Anchor",
                    body: "Omnibus RJN Document 108 staged for manual lodgment. Superior Court of California, County of San Francisco.",
                  },
                  {
                    icon: "🛡️",
                    title: "Privacy Middleware",
                    body: "Salted HMAC-SHA256 telemetry. No raw PII stored. One-way hashes only. Privacy-by-design architecture.",
                  },
                  {
                    icon: "⚓",
                    title: "Administrative Record",
                    body: "43-document forensic timeline preserved across CRD, HHS-OCR, CalVCB, VA-OIG, FBI-SF channels.",
                  },
                ].map((item) => (
                  <li key={item.title} className="flex items-start gap-4">
                    <div className="text-xl shrink-0">{item.icon}</div>
                    <div>
                      <p className="font-bold mb-1" style={{ color: "#e2e8f0" }}>{item.title}</p>
                      <p style={{ fontSize: "12px", color: "#64748b" }}>{item.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── SILENT INGESTION TIMELINE ──────────────────────────────────────── */}
      <section
        id="timeline"
        className="py-24 border-y px-6"
        style={{ backgroundColor: "#020617", borderColor: "#0f172a" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2
              className="font-black tracking-tight mb-4"
              style={{ fontSize: "2.25rem", fontFamily: "'Outfit', sans-serif" }}
            >
              The Silent Ingestion
            </h2>
            <p className="max-w-2xl" style={{ color: "#94a3b8" }}>
              A forensic narrative of the Memorial Day weekend data injection.
              While the courts were closed, the administrative record was being
              structured, sealed, and preserved.
            </p>
          </div>

          <div className="space-y-12 relative">
            {/* Vertical line */}
            <div
              className="absolute left-4 md:left-1/2 w-px h-full -translate-x-1/2 pointer-events-none"
              style={{ backgroundColor: "#1e293b" }}
            />

            {[
              {
                date: "MAY 22, 2026",
                label: "The Friday Baseline",
                body: "Procedural friction state. Opposing counsel pushes for dismissal. ADA interactive process stalled due to coordinator absence.",
                active: false,
                left: true,
              },
              {
                date: "MAY 23–24, 2026",
                label: "The Weekend Escalation",
                body: "Systematic restructuring. Over 40 structured PDFs staged. File hashes sealed. Document 108 finalized. Eight-gate sequence locked.",
                active: true,
                left: false,
              },
              {
                date: "MAY 26, 2026",
                label: "The Tuesday Reckoning",
                body: "Human nodes log in. Eight-gate activation sequence executes. Document 108 manually lodged with the San Francisco Superior Court clerk.",
                active: false,
                left: true,
              },
            ].map((node) => (
              <div
                key={node.date}
                className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
              >
                <div
                  className={`md:w-[45%] hover-lift p-6 rounded-2xl border ${
                    node.left ? "order-2 md:order-1" : "order-2 md:order-2"
                  }`}
                  style={{
                    backgroundColor: "#0f172a",
                    borderColor: node.active ? "rgba(217,119,6,0.35)" : "#1e293b",
                    boxShadow: node.active ? "0 0 15px rgba(217,119,6,0.1)" : undefined,
                  }}
                >
                  <h4
                    className="font-bold mb-2"
                    style={{ color: node.active ? "#f59e0b" : "#e2e8f0" }}
                  >
                    {node.label}
                  </h4>
                  <p style={{ fontSize: "14px", color: "#94a3b8" }}>{node.body}</p>
                </div>

                {/* Node dot */}
                <div
                  className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center z-10 border-4"
                  style={{
                    backgroundColor: "#020617",
                    borderColor: node.active ? "#d97706" : "#1e293b",
                    boxShadow: node.active ? "0 0 12px #d97706" : undefined,
                  }}
                >
                  <span
                    className={node.active ? "status-pulse w-2 h-2 rounded-full" : "w-2 h-2 rounded-full"}
                    style={{ backgroundColor: node.active ? "#f59e0b" : "#334155" }}
                  />
                </div>

                <div
                  className={`md:w-[45%] ${
                    node.left ? "order-1 md:order-2" : "order-1 md:order-1 text-left md:text-right"
                  }`}
                >
                  <p
                    className="mono font-bold"
                    style={{
                      fontSize: "12px",
                      color: node.active ? "#f59e0b" : "#64748b",
                    }}
                  >
                    {node.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ASSET APPRAISAL MATRIX ─────────────────────────────────────────── */}
      <section id="valuation" className="py-24 px-6" style={{ backgroundColor: "#020617" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-12">
            <div className="space-y-4">
              <h2
                className="font-black tracking-tight"
                style={{ fontSize: "2.25rem", fontFamily: "'Outfit', sans-serif" }}
              >
                Asset Appraisal Matrix
              </h2>
              <p className="max-w-xl" style={{ color: "#94a3b8" }}>
                Speculative business appraisal of VALORAIPLUS intellectual
                property across engineering, risk mitigation, and commercial
                SaaS tiers. Projections are estimates only — not legal claims.
              </p>
            </div>
            <div
              className="p-6 rounded-2xl border text-right shrink-0"
              style={{ backgroundColor: "#0f172a", borderColor: "rgba(217,119,6,0.4)" }}
            >
              <p
                className="mono font-bold mb-1"
                style={{ fontSize: "10px", color: "#f59e0b" }}
              >
                Consolidated High-End
              </p>
              <p className="font-black text-white" style={{ fontSize: "2.25rem" }}>
                $3,201,000
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative w-full" style={{ height: "320px" }}>
              <AppraisalChart />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: "Replacement Labor", value: "$76,000", note: "Principal Architect & Lead Dev market rates.", amber: false },
                { label: "Compliance Premium", value: "$35,000", note: "Privacy-by-Design HMAC auditing value.", amber: false },
                { label: "Risk Mitigation", value: "$120,000", note: "Avoidance of legal attrition and default.", amber: false },
                { label: "SaaS Speculative", value: "$2.97M", note: "5x ARR multiplier on commercialized IP.", amber: true },
              ].map((item) => (
                <div
                  key={item.label}
                  className="p-5 rounded-xl border"
                  style={{
                    backgroundColor: "#0f172a",
                    borderColor: item.amber ? "rgba(217,119,6,0.3)" : "#1e293b",
                  }}
                >
                  <h5
                    className="mono text-xs font-bold uppercase mb-2"
                    style={{ color: item.amber ? "#f59e0b" : "#64748b" }}
                  >
                    {item.label}
                  </h5>
                  <p className="text-2xl font-bold">{item.value}</p>
                  <p
                    className="mt-2"
                    style={{ fontSize: "10px", color: "#64748b" }}
                  >
                    {item.note}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PILLARS OF SOVEREIGNTY ─────────────────────────────────────────── */}
      <section
        id="pillars"
        className="py-24 border-t px-6"
        style={{ backgroundColor: "#020617", borderColor: "#0f172a" }}
      >
        <div className="max-w-7xl mx-auto">
          <h2
            className="font-black tracking-tight mb-16 text-center"
            style={{ fontSize: "2.25rem", fontFamily: "'Outfit', sans-serif" }}
          >
            The Pillars of Sovereignty
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🛡️",
                bg: "rgba(217,119,6,0.1)",
                color: "#f59e0b",
                title: "Retaliatory Shield",
                body: "Establishes the 180-day presumption of retaliation under Cal. Civ. Code § 1942.5(a). The timeline reverse-engineers the eviction attempt as a response to civil harassment filings.",
              },
              {
                icon: "⚖️",
                bg: "rgba(59,130,246,0.1)",
                color: "#3b82f6",
                title: "Licensure Nullity",
                body: "Exposes zero DRE credentials for management agents. Identifies a fundamental nullity in the 3-day notice sequence, dismantling the UD case's legal standing.",
              },
              {
                icon: "⚓",
                bg: "rgba(34,197,94,0.1)",
                color: "#22c55e",
                title: "Interactive Record",
                body: "Chronicles the failure of the ADA Coordinator to engage. Bridges local housing disputes into the jurisdiction of state and federal civil rights bodies.",
              },
            ].map((p) => (
              <div
                key={p.title}
                className="hover-lift p-8 rounded-3xl border space-y-4"
                style={{ backgroundColor: "#0f172a", borderColor: "#1e293b" }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                  style={{ backgroundColor: p.bg, color: p.color }}
                >
                  {p.icon}
                </div>
                <h3 className="text-xl font-bold">{p.title}</h3>
                <p
                  className="leading-relaxed"
                  style={{ fontSize: "14px", color: "#94a3b8" }}
                >
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── YI SUN-SHIN PARALLEL ───────────────────────────────────────────── */}
      <section id="parallel" className="py-24 px-6 overflow-hidden" style={{ backgroundColor: "#020617" }}>
        <div className="max-w-7xl mx-auto relative">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
            style={{ background: "rgba(217,119,6,0.05)", filter: "blur(120px)", zIndex: 0 }}
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
            <div className="space-y-6">
              <span
                className="mono px-3 py-1 text-white font-black tracking-widest uppercase rounded inline-block"
                style={{ backgroundColor: "#d97706", fontSize: "10px" }}
              >
                Historical Parallel
              </span>
              <h2
                className="font-black tracking-tight"
                style={{ fontSize: "3rem", fontFamily: "'Outfit', sans-serif" }}
              >
                The Architect of the{" "}
                <br />
                <span style={{ color: "#d97706" }}>Laminar Shield.</span>
              </h2>
              <p className="leading-relaxed" style={{ color: "#94a3b8" }}>
                Like Admiral Yi Sun-shin&apos;s{" "}
                <strong style={{ color: "#f8fafc" }}>Turtle Ship</strong>,
                VALORAIPLUS deflects external probing. We do not fight
                institutional numbers; we weaponize the geometry of the record
                and the reversal of administrative tides.
              </p>
              <div
                className="mono p-6 rounded-2xl border leading-relaxed"
                style={{
                  backgroundColor: "#000",
                  borderColor: "#1e293b",
                  fontSize: "12px",
                  color: "rgba(217,119,6,0.8)",
                }}
              >
                <p className="mb-2" style={{ color: "#334155" }}>{`# Myeongnyang Strategic Model`}</p>
                <p>{`IF (institutional_mass > defense_capacity) {`}</p>
                <p className="pl-4">{`  ENFORCE (narrow_channel_bottleneck);`}</p>
                <p className="pl-4" style={{ color: "#22c55e" }}>{`  TRIGGER (reversing_tide_ingestion);`}</p>
                <p>{"}"}</p>
              </div>
            </div>

            <div
              className="p-10 rounded-3xl border"
              style={{
                backgroundColor: "rgba(15,23,42,0.4)",
                borderColor: "#1e293b",
                backdropFilter: "blur(4px)",
              }}
            >
              <div className="space-y-8">
                {[
                  {
                    icon: "🐢",
                    title: "The Spiked Roof",
                    body: "HMAC-SHA256 privacy layer prevents automated scraping of pro se dockets.",
                  },
                  {
                    icon: "🌊",
                    title: "The Tidal Trap",
                    body: "State-level administrative ingestion forces the court to navigate the full record.",
                  },
                  {
                    icon: "📓",
                    title: "The War Diary",
                    body: "Immutable append-only database logs protect the timeline from spoliation.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-6">
                    <span className="text-4xl shrink-0">{item.icon}</span>
                    <div>
                      <h4 className="font-bold mb-1" style={{ color: "#e2e8f0" }}>
                        {item.title}
                      </h4>
                      <p style={{ fontSize: "14px", color: "#64748b" }}>{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer
        className="border-t py-20 px-6 text-center"
        style={{ backgroundColor: "#020617", borderColor: "#0f172a" }}
      >
        <div className="max-w-4xl mx-auto space-y-8">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-amber-600 mx-auto border"
            style={{ backgroundColor: "#0f172a", borderColor: "#1e293b" }}
          >
            &#937;
          </div>
          <p
            className="mono uppercase"
            style={{ color: "#334155", fontSize: "10px", letterSpacing: "0.3em" }}
          >
            System Head ca3dca0 // Frozen Receipt 1b9773d // Ledger Preserved
          </p>
          <p className="leading-relaxed" style={{ fontSize: "12px", color: "#64748b" }}>
            VALORAIPLUS is an organizational case-control system for Defendant
            in Case CUD-26-682107. Valuation projections are speculative
            business appraisals of intellectual property owned by
            That&apos;s Edutainment LLC &amp; 32D LLC. This system does not
            replace the official court docket, filed PDFs, proof of service,
            or agency receipts. The Court determines admissibility, weight,
            and legal effect.
          </p>
          <div
            className="mono flex justify-center gap-6 font-bold uppercase"
            style={{ fontSize: "9px", color: "#1e293b" }}
          >
            <span>Superior Court of California</span>
            <span>County of San Francisco</span>
            <span>Department 12</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
