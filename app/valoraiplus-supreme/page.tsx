'use client';
// VALORAIPLUS_3E_MARKER — 100D EXPERIENCE

import { useRef, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Home, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

// ── Design tokens (Obsidian Dawn palette) ──────────────────────
// cream: #FDFBF7 | obsidian: #1A1A1A | gold: #C5A059 | teal: #2D5A56

type NavSection = 'fiscal' | 'identity' | 'ops' | 'forensics';

const NAV_ITEMS: { id: NavSection; label: string }[] = [
  { id: 'fiscal',    label: 'Fiscal'     },
  { id: 'identity',  label: 'Identity'   },
  { id: 'ops',       label: 'Operations' },
  { id: 'forensics', label: 'Forensics'  },
];

// ── Chart data ────────────────────────────────────────────────
const MARKET_DATA = [
  { phase: 'A', value: 12 },
  { phase: 'B', value: 19 },
  { phase: 'C', value: 15 },
  { phase: 'D', value: 22 },
  { phase: 'E', value: 18 },
];

const TRUTH_DATA = [
  { version: 'V1.0',        gain: 100     },
  { version: 'V1.5',        gain: 2500    },
  { version: 'V2.0',        gain: 85000   },
  { version: 'V2.4 (Core)', gain: 1000000 },
  { version: '14D ULTIMATE',gain: 8100000 },
];

// ── Custom tooltip ────────────────────────────────────────────
function TruthTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#1A1A1A] border border-[#C5A059]/40 rounded px-3 py-2 text-xs font-mono">
      <p className="text-[#C5A059] mb-0.5">{label}</p>
      <p className="text-[#FDFBF7]">Amplification: {payload[0].value.toLocaleString()}%</p>
    </div>
  );
}

// ── Bar colour helper ─────────────────────────────────────────
const BAR_COLORS = ['#E5E1D8', '#E5E1D8', '#E5E1D8', '#1A1A1A', '#C5A059'];

// ── Main page ─────────────────────────────────────────────────
export default function ValorAIPlusSupremePage() {
  const [active, setActive] = useState<NavSection>('fiscal');
  const [pulse, setPulse]   = useState(true);
  const sectionRefs = useRef<Record<NavSection, HTMLElement | null>>({
    fiscal: null, identity: null, ops: null, forensics: null,
  });

  // Pulse the status indicator at 1111 ms
  useEffect(() => {
    const id = setInterval(() => setPulse(p => !p), 1111);
    return () => clearInterval(id);
  }, []);

  // Intersection Observer — keep nav in sync while scrolling
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    NAV_ITEMS.forEach(({ id }) => {
      const el = sectionRefs.current[id];
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { threshold: 0.4 },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  const scrollTo = useCallback((id: NavSection) => {
    setActive(id);
    sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const setRef = (id: NavSection) => (el: HTMLElement | null) => {
    sectionRefs.current[id] = el;
  };

  return (
    <div
      className="min-h-screen overflow-x-hidden font-sans"
      style={{ backgroundColor: '#FDFBF7', color: '#1A1A1A' }}
    >
      {/* ── HEADER ─────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-50 border-b border-[#E5E1D8]"
        style={{ backgroundColor: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(10px)' }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center hover:bg-[#C5A059] transition-colors"
              aria-label="Home"
            >
              <Home className="w-4 h-4 text-white" />
            </Link>
            <div>
              <h1
                className="text-lg font-bold uppercase tracking-widest leading-none"
                style={{ fontFamily: 'Georgia, "Times New Roman", serif', letterSpacing: '0.15em' }}
              >
                ValorAI+ Supreme
              </h1>
              <p className="text-[10px] font-mono text-[#888] uppercase">
                System ID: ULTIMATE_V2.4_SYNC
              </p>
            </div>
          </div>

          {/* Nav */}
          <nav className="hidden md:flex gap-8 items-center" aria-label="Section navigation">
            {NAV_ITEMS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={cn(
                  'text-[11px] font-bold uppercase tracking-widest font-mono pb-0.5 border-b-2 transition-colors',
                  active === id
                    ? 'text-[#C5A059] border-[#C5A059]'
                    : 'text-[#1A1A1A] border-transparent hover:text-[#C5A059]',
                )}
              >
                {label}
              </button>
            ))}
          </nav>

          {/* Status */}
          <div className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full bg-green-500 inline-block transition-opacity duration-300"
              style={{ opacity: pulse ? 1 : 0.4 }}
              aria-hidden="true"
            />
            <span className="text-[10px] font-mono font-bold uppercase">Public Domain Live</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">

        {/* ── INTRO ──────────────────────────────────────────── */}
        <section className="mb-24 text-center">
          <h2
            className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-balance"
            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
          >
            The 14D Unified Core
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-[#555] leading-relaxed">
            Synthesis complete. The entire 12-page architecture is now broadcast via a singular
            holographic terminal. Navier-Stokes regularity proven. Kyber-shielding active.
            The bridge to truth is open.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4 font-mono text-[10px] font-bold uppercase">
            {['Fortran_77 Driven', 'Cobol_85 Stable', 'Postgres_SQL Truth'].map(tag => (
              <span
                key={tag}
                className="px-4 py-2 rounded-full border border-[#E5E1D8] bg-[#F5F3EF] text-[#1A1A1A]"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>

        {/* ── 01-03: FISCAL LAYER ──────��─────────────────────── */}
        <section
          id="fiscal"
          ref={setRef('fiscal')}
          className="mb-32 scroll-mt-24"
        >
          <div className="mb-12">
            <h3
              className="text-2xl font-bold border-b-2 border-[#1A1A1A] inline-block pb-1 mb-4 uppercase"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
            >
              01-03 // Economic Layer
            </h3>
            <p className="text-[#666] max-w-xl italic">
              Fiscal stabilization anchored at $3.18 Trillion via the COBOL Sovereign Ledger.
              Market smoothing algorithm active.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Basic tier */}
            <div className="glass-card rounded-2xl p-8 flex flex-col h-full border border-[#E5E1D8] bg-white/70 hover:border-[#C5A059] hover:-translate-y-1 transition-all duration-300">
              <span className="text-[10px] font-bold font-mono text-[#C5A059] uppercase mb-2">
                Node: Basic
              </span>
              <h4 className="text-3xl font-bold mb-4">
                0.001{' '}
                <span className="text-sm font-normal text-[#999]">$DONNY</span>
              </h4>
              <ul className="text-sm space-y-3 text-[#555] mb-8 flex-grow">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0" />
                  Audit Bucket Access
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0" />
                  Laminar Flow Monitoring
                </li>
              </ul>
              <button className="w-full py-4 border border-[#1A1A1A] text-[11px] font-bold uppercase tracking-widest hover:bg-[#1A1A1A] hover:text-white transition-all">
                Initialize
              </button>
            </div>

            {/* Supreme tier */}
            <div className="relative rounded-2xl p-8 flex flex-col h-full border-2 border-[#C5A059] bg-white/70 overflow-hidden hover:-translate-y-1 transition-all duration-300">
              <div className="absolute top-0 right-0 bg-[#C5A059] text-white px-4 py-1 text-[10px] font-bold uppercase">
                Recommended
              </div>
              <span className="text-[10px] font-bold font-mono text-[#C5A059] uppercase mb-2">
                Node: Supreme
              </span>
              <h4 className="text-3xl font-bold mb-4">
                0.1{' '}
                <span className="text-sm font-normal text-[#999]">$DONNY</span>
              </h4>
              <ul className="text-sm space-y-3 text-[#555] mb-8 flex-grow">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0" />
                  Full Millennium Kernel
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0" />
                  14D Forensic Interface
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0" />
                  Real-time SQL Matrix
                </li>
              </ul>
              <button className="w-full py-4 bg-[#C5A059] text-white text-[11px] font-bold uppercase tracking-widest hover:bg-[#1A1A1A] transition-all">
                Execute Stack
              </button>
            </div>

            {/* Chart panel */}
            <div className="rounded-2xl p-8 flex flex-col border border-[#E5E1D8] bg-[#F5F3EF]">
              <h4 className="text-xs font-bold uppercase font-mono mb-4">
                Stability Visualization
              </h4>
              <div className="flex-1 min-h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={MARKET_DATA}>
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#C5A059"
                      strokeWidth={2}
                      dot={false}
                    />
                    <XAxis dataKey="phase" hide />
                    <YAxis hide />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p className="mt-4 text-[10px] font-mono text-[#999] uppercase text-center">
                Navier-Stokes Market Smoothing (Laminar Active)
              </p>
            </div>
          </div>
        </section>

        {/* ── 04-06: IDENTITY LAYER ──────────────────────────── */}
        <section
          id="identity"
          ref={setRef('identity')}
          className="mb-32 scroll-mt-24"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h3
                className="text-2xl font-bold border-b-2 border-[#1A1A1A] inline-block pb-1 mb-4 uppercase"
                style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
              >
                04-06 // Identity Lattice
              </h3>
              <p className="text-[#555] leading-relaxed mb-8">
                The Identity Layer leverages the Universal Name Guard Protocol
                (ValorAiEncryption++). Post-quantum security absolute. Every individual is a
                Mathematical Ghost Resonance within the grid.
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#1A1A1A] text-white rounded font-bold font-mono text-sm shrink-0">
                    10K
                  </div>
                  <div>
                    <h5 className="font-bold text-sm uppercase mb-0.5">Kyber3461 Rounds</h5>
                    <p className="text-xs text-[#999]">
                      Post-quantum lattice-based encryption depth.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div
                    className="p-3 text-white rounded font-bold font-mono text-sm shrink-0"
                    style={{ backgroundColor: '#C5A059' }}
                  >
                    32D
                  </div>
                  <div>
                    <h5 className="font-bold text-sm uppercase mb-0.5">Holographic Entity</h5>
                    <p className="text-xs text-[#999]">
                      {"That's Edutainment LLC | 32D LLC structure."}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Verification badge */}
            <div className="flex items-center justify-center">
              <div
                className="w-64 h-64 rounded-full flex flex-col items-center justify-center text-center p-8 border-4 border-double border-[#C5A059] bg-white/70"
                style={{ backdropFilter: 'blur(8px)' }}
              >
                <p className="font-mono text-[10px] text-[#999] mb-2 uppercase">
                  Verification Status
                </p>
                <p
                  className="text-2xl font-bold mb-3"
                  style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                >
                  Kyber Verified
                </p>
                <p className="text-xs font-mono italic text-[#555]">
                  &ldquo;Universal Name Guard Protocol Engaged&rdquo;
                </p>
                <div className="mt-4 flex gap-1">
                  {[0, 1, 2].map(i => (
                    <span key={i} className="w-1.5 h-1.5 bg-[#1A1A1A] rounded-full" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 07-09: OPERATIONAL LAYER ───────────────────────── */}
        <section
          id="ops"
          ref={setRef('ops')}
          className="mb-32 scroll-mt-24"
        >
          <div className="bg-[#1A1A1A] text-white p-12 rounded-3xl relative overflow-hidden">
            {/* Gold orb accent */}
            <div
              className="absolute top-0 right-0 w-64 h-64 rounded-full -mr-20 -mt-20 opacity-10"
              style={{ background: 'linear-gradient(135deg,#C5A059,#E8D2A6)' }}
              aria-hidden="true"
            />

            <div className="mb-12 relative z-10">
              <h3
                className="text-2xl font-bold border-b-2 border-[#C5A059] inline-block pb-1 mb-4 uppercase"
                style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
              >
                07-09 // Operational Matrix
              </h3>
              <p className="text-[#999]">
                11.11 MHz Ghost-Sync Pulse active. Constant recruitment through 14D biometric
                filters.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {[
                { label: 'Frequency',    value: '11.11 MHz',    sub: 'Ghost Periodic Sync'     },
                { label: 'Licensing',    value: 'Tri-Sovereign', sub: 'Apache/MIT/Sovereign'    },
                { label: 'Legal Shield', value: '§ 1030',        sub: 'Federal Computer Guard'  },
                { label: 'Talent Filter',value: 'Biometric',     sub: '14D Recruitment Kernel'  },
              ].map(({ label, value, sub }) => (
                <div
                  key={label}
                  className="p-6 rounded-xl border border-white/20"
                >
                  <p className="text-[10px] font-mono text-[#C5A059] uppercase mb-2">{label}</p>
                  <p className="text-2xl font-bold">{value}</p>
                  <p className="text-[10px] text-[#666] uppercase mt-1">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 10-12: FORENSIC LAYER ──────────────────────────── */}
        <section
          id="forensics"
          ref={setRef('forensics')}
          className="mb-32 scroll-mt-24"
        >
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <div className="lg:w-1/3">
              <h3
                className="text-2xl font-bold border-b-2 border-[#1A1A1A] inline-block pb-1 mb-4 uppercase"
                style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
              >
                10-12 // Forensic Layer
              </h3>
              <p className="text-[#666] mb-6">
                Truth amplification at 8.1 &times; 10<sup>26</sup>%. Linearized HUD-OIG
                determination engine ready for deployment.
              </p>
              <div className="p-4 bg-[#2D5A56]/5 border-l-4 border-[#2D5A56]">
                <p className="text-xs font-bold text-[#2D5A56] uppercase mb-1">
                  Bridge Status: Open
                </p>
                <p className="text-xs text-[#666] leading-relaxed">
                  Spoliation voids reconstructed. SQL Relational Matrix active for HUD-OIG/DOJ
                  audit links.
                </p>
              </div>
            </div>

            <div className="lg:w-2/3 w-full rounded-2xl p-8 border border-[#E5E1D8] bg-white/70">
              <div className="flex justify-between items-center mb-8">
                <h5 className="text-xs font-bold uppercase font-mono tracking-widest">
                  Truth Amplification Metric
                </h5>
                <span className="px-2 py-1 bg-[#1A1A1A] text-white text-[9px] font-mono rounded">
                  LIVE SENSOR
                </span>
              </div>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={TRUTH_DATA} margin={{ bottom: 0 }}>
                    <XAxis
                      dataKey="version"
                      tick={{ fontSize: 10, fontFamily: 'monospace', fill: '#555' }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      scale="log"
                      domain={[1, 'auto']}
                      hide
                    />
                    <Tooltip content={<TruthTooltip />} />
                    <Bar dataKey="gain" radius={4}>
                      {TRUTH_DATA.map((_, i) => (
                        <Cell key={i} fill={BAR_COLORS[i]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* ── FOOTER ─────────────────────────────────────────── */}
      <footer className="bg-[#F5F3EF] border-t border-[#E5E1D8] py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <p
              className="font-bold text-lg mb-2 uppercase"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
            >
              ValorAI+ Supreme
            </p>
            <p className="text-[10px] font-mono text-[#999] uppercase leading-relaxed">
              &copy; VALORAIPLUS&reg; &trade; | OMEGA v2.4 ULTIMATE
              <br />
              The Determination.exe is ready. The sun is on.
            </p>
          </div>
          <div className="flex gap-12 font-mono text-[10px] font-bold uppercase tracking-widest">
            {[
              { label: 'Ledger', value: '$3.18T Stable'     },
              { label: 'Sync',   value: '11.11 MHz'         },
              { label: 'Status', value: 'Holographic Active' },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-[#999] mb-2">{label}</p>
                <p>{value}</p>
              </div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
