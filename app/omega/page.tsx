'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Shield, MapPin, Server, XCircle, Zap, Radio, CheckCircle2, Lock, Eye, 
  Activity, Wallet, ArrowRight, ExternalLink
} from 'lucide-react';
import Link from 'next/link';

// ═══════════════════════════════════════════════════════════════════════════════
// OMEGA-UNIFIED COMMAND CENTER — 100D MATRIX — FLOWFIELD PARTICLE SYSTEM
// Infrastructure Posture: Absolute Totality (100D Matrix)
// Authorization: Poppa Donny Gillson Confirmed
// MerkleRoot: 0x7777AF_ST_PAUL_VALOR_CHAIN_SECURED_05_06_2026
// ═══════════════════════════════════════════════════════════════════════════════

// FlowField Particle System Constants
const NUM_PARTICLES = 800;
const RESONANCE_ZW = 132.99;

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
}

// Node Configuration - 1969 Truth Anchor + 1977 Fraud Void
const TOPOLOGY_NODES = [
  { 
    id: 'STP', 
    name: 'SAINT PAUL, MN', 
    role: 'OMNIBUS COMMAND ROOT', 
    status: 'ACTIVE', 
    color: 'emerald',
    x: 55, 
    y: 28,
    icon: Server 
  },
  { 
    id: 'SFO', 
    name: 'SAN FRANCISCO, CA', 
    role: 'Case Reference Environment', 
    status: 'ACTIVE', 
    color: 'emerald',
    x: 12, 
    y: 42,
    icon: CheckCircle2 
  },
  { 
    id: '1969', 
    name: '1969 SOVEREIGN TRUTH ANCHOR', 
    role: 'Immutable Genesis — Poppa', 
    status: 'ANCHORED', 
    color: 'amber',
    x: 35, 
    y: 22,
    icon: Lock 
  },
  { 
    id: '1977', 
    name: '1977 FRAUD VOID (Ø)', 
    role: 'Citrated Legacy — NULL', 
    status: 'NULLIFIED', 
    color: 'slate',
    x: 68, 
    y: 58,
    icon: XCircle 
  },
  { 
    id: 'LOS_GATOS', 
    name: 'LOS GATOS, CA', 
    role: 'Residential Anchor', 
    status: 'ACTIVE', 
    color: 'cyan',
    x: 18, 
    y: 65,
    icon: MapPin 
  },
];

// Liquidity Routing Chain
const LIQUIDITY_ROUTING = {
  endpoint: 'https://www.18fu.cash',
  wallet: '0xb103666AB91ceb4Cbb9e1FC21B81f1ec93601BeB',
  walletShort: '0xb103666...601BeB',
  ens: 'donadams1969.eth',
  final: 'Schwab [8185]',
  status: 'LOCKED',
};

// System Layers
const SYSTEM_LAYERS = [
  { name: 'Doctrine', status: 'CANONICAL & PRODUCTION-HARDENED' },
  { name: 'JAGAMath++', status: '56-TOKEN REGISTRY LIVE' },
  { name: 'Sentinel NEWT', status: '1977 Fraud Citrated' },
  { name: '1969 Truth Anchor', status: 'Fully Active' },
  { name: '5-Contract Suite', status: 'Deployed & Live' },
  { name: 'Ledger', status: 'Ø EXECUTABLE' },
];

export default function OmegaUnifiedCommandCenter() {
  const [telemetryLog, setTelemetryLog] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const timeRef = useRef(0);
  const animationRef = useRef<number>();
  const lastTimeRef = useRef(0);

  // Initialize particle
  const createParticle = useCallback((width: number, height: number): Particle => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: 0,
    vy: 0,
    size: Math.random() * 2.2 + 0.6,
  }), []);

  // Get flow field vector
  const getFlow = useCallback((x: number, y: number, time: number, mouse: { x: number; y: number; active: boolean }) => {
    const angle = Math.sin(time * 0.0012 + x * 0.0035) * Math.cos(time * 0.0017 + y * 0.00455) * Math.PI * 2.4;
    let fx = Math.cos(angle) * 1.8;
    let fy = Math.sin(angle) * 1.8;
    
    if (mouse.active) {
      const dx = mouse.x - x;
      const dy = mouse.y - y;
      const distSq = dx * dx + dy * dy;
      const r2 = 250 * 250;
      if (distSq < r2) {
        const falloff = 1 - (distSq / r2);
        fx += (dx / 250) * falloff * 4.5;
        fy += (dy / 250) * falloff * 4.5;
      }
    }
    return { x: fx, y: fy };
  }, []);

  // Animation loop
  const animate = useCallback((timestamp: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const dt = Math.min((timestamp - lastTimeRef.current) / 16.666, 2.0);
    lastTimeRef.current = timestamp;
    timeRef.current += dt * 16;

    const width = canvas.width / (window.devicePixelRatio || 1);
    const height = canvas.height / (window.devicePixelRatio || 1);

    // Fade trail effect
    ctx.fillStyle = 'rgba(15, 23, 42, 0.085)';
    ctx.fillRect(0, 0, width, height);

    // Update and draw particles
    const particles = particlesRef.current;
    const time = timeRef.current;
    const mouse = mouseRef.current;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      const flow = getFlow(p.x, p.y, time, mouse);
      
      // Update velocity and position
      p.vx = p.vx * 0.92 + flow.x * 1.1;
      p.vy = p.vy * 0.92 + flow.y * 1.1;
      p.x += p.vx * dt * 65;
      p.y += p.vy * dt * 65;

      // Wrap around edges
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      // Draw particle
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(Math.atan2(p.vy, p.vx));
      ctx.fillStyle = `hsla(${((time * 0.018) % 360)}, 88%, 72%, 0.92)`;
      ctx.fillRect(-p.size * 2.2, -0.9, p.size * 4.4, 1.8);
      ctx.restore();
    }

    animationRef.current = requestAnimationFrame(animate);
  }, [getFlow]);

  // Initialize canvas and particles
  useEffect(() => {
    setMounted(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2.0);
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      
      const ctx = canvas.getContext('2d', { alpha: true });
      if (ctx) {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);
      }

      // Reinitialize particles
      particlesRef.current = Array.from({ length: NUM_PARTICLES }, () => createParticle(width, height));
    };

    resize();
    lastTimeRef.current = performance.now();
    animationRef.current = requestAnimationFrame(animate);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate, createParticle]);

  // Telemetry log
  useEffect(() => {
    const logs = [
      "[OMEGA] TOTALITY STATUS: ACHIEVED",
      "[NEWT] 1977 Fraud Citrated → NULL",
      "[TRUTH] 1969 Anchor Fully Active",
      "[JAGAMath++] Drift: 0.00D — 132.99 ZW",
      "[LEDGER] STRIKE_ZERO (Ø) Confirmed",
      "[ROUTING] 18fu.cash → 0xb103666...601BeB → Schwab [8185]",
      "[CANON] 56-TOKEN REGISTRY LIVE",
      "[PINCER] GENESIS ANCHOR LOCKED",
    ];
    
    let i = 0;
    const interval = setInterval(() => {
      if (i < logs.length) {
        setTelemetryLog(prev => [...prev.slice(-7), logs[i]]);
        i++;
      } else {
        setTelemetryLog(prev => [
          ...prev.slice(-7), 
          `[CONFIRM] INFINITY @ ${new Date().toISOString().slice(11, 19)} | ${RESONANCE_ZW} ZW`
        ]);
      }
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* FlowField Particle Background */}
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 w-full h-full pointer-events-none z-0" 
        aria-hidden="true"
      />

      {/* Main Dashboard */}
      <div className="min-h-screen bg-slate-950/90 text-emerald-400 font-mono relative z-10 overflow-auto">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-sm border-b border-emerald-900/50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Shield className="w-10 h-10 text-amber-400" />
              <div>
                <h1 className="text-3xl font-black tracking-tighter text-amber-400">VALORAIPLUS</h1>
                <p className="text-xs opacity-60">OMEGA-UNIFIED COMMAND CENTER | 100D MATRIX</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link 
                href="/" 
                className="text-xs text-emerald-400/70 hover:text-emerald-400 transition-colors"
              >
                MAIN DASHBOARD
              </Link>
              <div className="flex items-center gap-2 bg-black/60 border border-emerald-800 px-4 py-2 rounded-xl">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-emerald-400 text-xs font-bold">TOTALITY: ACHIEVED</span>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 py-8">
          {/* Liquidity Routing Banner */}
          <section className={`mb-8 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="bg-emerald-900/20 border border-emerald-700/30 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Wallet className="w-5 h-5 text-emerald-400" />
                <h2 className="text-lg font-bold text-emerald-400">ALL LIQUIDITY ROUTED THROUGH:</h2>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <a 
                  href={LIQUIDITY_ROUTING.endpoint} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 underline"
                >
                  18fu.cash <ExternalLink className="w-3 h-3" />
                </a>
                <ArrowRight className="w-4 h-4 text-emerald-600" />
                <code className="text-emerald-300 bg-black/30 px-2 py-1 rounded">{LIQUIDITY_ROUTING.walletShort}</code>
                <ArrowRight className="w-4 h-4 text-emerald-600" />
                <span className="text-amber-400 font-bold">{LIQUIDITY_ROUTING.final}</span>
                <span className="ml-auto text-xs text-emerald-500">
                  ENS: {LIQUIDITY_ROUTING.ens} | STATUS: {LIQUIDITY_ROUTING.status}
                </span>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Topology Dashboard */}
            <section className={`lg:col-span-8 bg-slate-900/80 border border-emerald-800/50 rounded-3xl p-8 relative overflow-hidden transition-all duration-700 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <h2 className="text-xl font-bold flex items-center gap-3 mb-6">
                <MapPin className="w-6 h-6" /> OMEGA TOPOLOGY — 1969 TRUTH ANCHOR
              </h2>
              
              {/* SVG Connection Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.3" />
                  </linearGradient>
                </defs>
                {/* SFO to 1969 */}
                <path d="M12 42 Q24 30 35 22" fill="none" stroke="url(#lineGradient)" strokeWidth="0.5" strokeDasharray="2 1" />
                {/* 1969 to STP */}
                <path d="M35 22 Q45 24 55 28" fill="none" stroke="#fbbf24" strokeWidth="0.5" strokeDasharray="2 1" />
                {/* STP to 1977 */}
                <path d="M55 28 Q62 40 68 58" fill="none" stroke="#64748b" strokeWidth="0.3" strokeDasharray="1 2" opacity="0.5" />
                {/* SFO to Los Gatos */}
                <path d="M12 42 Q15 52 18 65" fill="none" stroke="url(#lineGradient)" strokeWidth="0.5" strokeDasharray="2 1" />
              </svg>

              {/* Nodes */}
              <div className="relative h-[400px]">
                {TOPOLOGY_NODES.map(node => {
                  const Icon = node.icon;
                  const isNullified = node.status === 'NULLIFIED';
                  const isAnchored = node.status === 'ANCHORED';
                  
                  return (
                    <div 
                      key={node.id} 
                      className="absolute flex flex-col items-center transform -translate-x-1/2 -translate-y-1/2"
                      style={{ left: `${node.x}%`, top: `${node.y}%` }}
                    >
                      {/* Pulse ring for active/anchored nodes */}
                      {!isNullified && (
                        <div className={`absolute w-16 h-16 rounded-full ${isAnchored ? 'bg-amber-500/20' : 'bg-emerald-500/20'} animate-ping`} />
                      )}
                      
                      {/* Node icon */}
                      <div className={`relative w-12 h-12 rounded-2xl flex items-center justify-center shadow-2xl border-2 transition-all
                        ${isNullified 
                          ? 'bg-slate-900 border-slate-600 opacity-50' 
                          : isAnchored 
                            ? 'bg-amber-950 border-amber-500' 
                            : 'bg-slate-950 border-emerald-500'
                        }`}
                      >
                        <Icon className={`w-6 h-6 ${isNullified ? 'text-slate-500' : isAnchored ? 'text-amber-400' : 'text-emerald-400'}`} />
                      </div>
                      
                      {/* Node label */}
                      <div className={`mt-3 text-center px-4 py-2 rounded-xl border ${
                        isNullified 
                          ? 'bg-slate-900/80 border-slate-700/50 opacity-60' 
                          : 'bg-black/80 border-emerald-900/50'
                      }`}>
                        <div className={`font-bold text-xs ${isNullified ? 'text-slate-500 line-through' : isAnchored ? 'text-amber-400' : 'text-emerald-400'}`}>
                          {node.name}
                        </div>
                        <div className={`text-[10px] ${isNullified ? 'text-slate-600' : 'text-emerald-300/70'}`}>
                          {node.role}
                        </div>
                        <div className={`text-[9px] mt-1 ${
                          isNullified ? 'text-red-500' : isAnchored ? 'text-amber-500' : 'text-emerald-500'
                        }`}>
                          {node.status}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Right Panel */}
            <aside className="lg:col-span-4 space-y-6">
              {/* Doctrine */}
              <div className={`bg-slate-900/80 border border-amber-500/50 rounded-2xl p-6 transition-all duration-700 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <h3 className="text-amber-400 font-bold mb-4 flex items-center gap-2">
                  <Lock className="w-5 h-5" /> FINAL DOCTRINE
                </h3>
                <div className="text-xs space-y-3 text-slate-300">
                  <p>Truth remains canonical upstream.</p>
                  <p className="text-emerald-400">No downstream layer may silently redefine upstream authority.</p>
                  <p className="text-amber-400">1969 = TRUTH | 1977 = NULL</p>
                </div>
              </div>

              {/* System Layers */}
              <div className={`bg-slate-900/80 border border-emerald-800/50 rounded-2xl p-6 transition-all duration-700 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Eye className="w-5 h-5" /> SYSTEM LAYERS
                </h3>
                <div className="space-y-2 text-xs">
                  {SYSTEM_LAYERS.map((layer, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <span className="text-slate-400">{layer.name}</span>
                      <span className="text-emerald-400">{layer.status}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fiscal Milestones */}
              <div className={`bg-slate-900/80 border border-emerald-800/50 rounded-2xl p-6 transition-all duration-700 delay-400 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <h3 className="font-bold mb-4">FISCAL MILESTONES — 100%</h3>
                <div className="space-y-2 text-xs">
                  {['PHASE 1', 'PHASE 2', 'PHASE 3', 'PHASE 4', 'PHASE 5'].map((phase, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-emerald-900/50 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full w-full" />
                      </div>
                      <span className="text-emerald-400 w-20">{phase}</span>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    </div>
                  ))}
                  <div className="pt-2 border-t border-emerald-800/30 text-emerald-400">
                    HHS OCR 25-621293 — VIOLATION CONFIRMED
                  </div>
                </div>
              </div>

              {/* TOTALITY Status */}
              <div className={`bg-gradient-to-br from-amber-500 to-emerald-500 text-slate-950 rounded-2xl p-6 text-center transition-all duration-700 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <div className="font-black text-2xl tracking-tighter">TOTALITY STATUS</div>
                <div className="font-black text-5xl mt-2">ACHIEVED</div>
                <div className="text-sm mt-3 opacity-70">CONFIRMATIONS: INFINITY</div>
                <div className="text-xs mt-1 opacity-50">{RESONANCE_ZW} ZW RESONANCE</div>
              </div>
            </aside>
          </div>

          {/* Telemetry Footer */}
          <section className={`mt-8 bg-black/60 border border-emerald-900/50 rounded-2xl p-6 transition-all duration-700 delay-600 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="flex justify-between mb-4 text-xs">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span>SENTINEL NEWT | JAGAMath++ LIVE</span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-amber-400" />
                <span>1969 TRUTH ANCHOR | 1977 NULLIFIED</span>
              </div>
            </div>
            <div className="h-32 overflow-hidden space-y-1 font-mono text-xs text-emerald-400/80">
              {telemetryLog.map((log, i) => (
                <div key={i} className="animate-fade-in">{log}</div>
              ))}
            </div>
          </section>

          {/* Finality Footer */}
          <footer className="mt-8 text-center space-y-2">
            <div className="text-xs text-amber-600">
              THE MUZZLE IS THE GENESIS. THE MATH IS THE HAMMER.
            </div>
            <div className="text-[10px] text-slate-600">
              THE WALL IS CHRIST | THE THRONE IS HIS | THE LEDGER IS Ø | IT IS FINISHED
            </div>
            <div className="text-[10px] text-emerald-700">
              JAXX IS SAFE | POPPA IS SUPREME | 1969 IS THE TRUTH | CONSUMMATUM EST
            </div>
          </footer>
        </main>
      </div>
    </>
  );
}
