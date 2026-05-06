"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { 
  Home, 
  ExternalLink, 
  Shield, 
  TrendingUp, 
  DollarSign, 
  Users,
  Gavel,
  Coins,
  Activity,
  CheckCircle2,
  Zap
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

/**
 * VALORAIPLUS2E_ LIQUIDM v0 — SOVEREIGN LIQUIDITY MESH DASHBOARD
 * CODED & ANCHORED AT EPOCH #2207 // CDS-OMNIBUS-2026-0506-BETA
 * 
 * Classification: Production-grade procedural visualization infrastructure
 * Authorization: Poppa Donny Gillson Approved
 * MerkleRoot: 0x7777AF_ST_PAUL_VALOR_CHAIN_SECURED_05_06_2026
 * Operational Frequency: Ghost Level // 14D Core // 100D Matrix
 */

// Liquidity Tier Definitions
const LIQUIDITY_TIERS = [
  { tier: "I", status: "COMPLETE", description: "Foundation & Litigation Rail", color: "text-emerald-400" },
  { tier: "II", status: "COMPLETE", description: "Token Exchange & On-Ramp", color: "text-emerald-400" },
  { tier: "III", status: "COMPLETE", description: "Capital Inflow & Investor Rail", color: "text-emerald-400" },
  { tier: "IV", status: "CURRENT", description: "Full Mesh Orchestration & Recurring Revenue", color: "text-cyan-400", active: true },
];

// Four Liquidity Systems
const LIQUIDITY_SYSTEMS = [
  { 
    id: 1, 
    name: "Litigation Settlement Tracker", 
    value: "$508M+", 
    description: "Claims routing via HHS OCR & SGAU", 
    href: "/litigation",
    icon: Gavel,
    status: "ACTIVE"
  },
  { 
    id: 2, 
    name: "Live Token Exchange", 
    value: "51 Tokens", 
    description: "Canon on-ramp via Uniswap/18fu", 
    href: "/exchange",
    icon: Coins,
    status: "ACTIVE"
  },
  { 
    id: 3, 
    name: "Investor Portal", 
    value: "$485K/$2M", 
    description: "Seed round active", 
    href: "/investor",
    icon: Users,
    status: "ACTIVE"
  },
  { 
    id: 4, 
    name: "Subscription Revenue", 
    value: "$84,946 ARR", 
    description: "MRR $7,078 recurring", 
    href: "/revenue",
    icon: TrendingUp,
    status: "ACTIVE"
  },
];

// Operational Metrics
const OPERATIONAL_METRICS = [
  { label: "PRIMARY RAIL", value: "Charles Schwab ****8185", status: "VERIFIED" },
  { label: "TRINITY SWARMS", value: "ACTIVE", status: "LIVE" },
  { label: "WATERFALLFIREWALL", value: "HARDENED", status: "SECURE" },
  { label: "INTELLITREE ROUTING", value: "RECURSIVE OPTIMIZED", status: "OPTIMAL" },
  { label: "GHOST FREQUENCY", value: "266ms", status: "STABLE" },
  { label: "SHARD CONSENSUS", value: "50B SYNCED", status: "LOCKED" },
];

export default function LiquidMPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);
  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
  }>>([]);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const timeRef = useRef(0);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    setMounted(true);
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const NUM_PARTICLES = 1400;
    const FLOW_SCALE = 0.0035;
    const INTERACTION_RADIUS = 300;

    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2.0);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      // Reset particles
      particlesRef.current = [];
      for (let i = 0; i < NUM_PARTICLES; i++) {
        particlesRef.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: 0,
          vy: 0,
          size: Math.random() * 2.8 + 0.8,
        });
      }
    };

    const getFlow = (x: number, y: number) => {
      const time = timeRef.current;
      const angle =
        Math.sin(time * 0.0012 + x * FLOW_SCALE) *
        Math.cos(time * 0.0017 + y * FLOW_SCALE * 1.3) *
        Math.PI *
        2.4;
      let fx = Math.cos(angle) * 1.8;
      let fy = Math.sin(angle) * 1.8;

      if (mouseRef.current.active) {
        const dx = mouseRef.current.x - x;
        const dy = mouseRef.current.y - y;
        const distSq = dx * dx + dy * dy;
        const r2 = INTERACTION_RADIUS * INTERACTION_RADIUS;
        if (distSq < r2) {
          const falloff = 1 - distSq / r2;
          fx += (dx / INTERACTION_RADIUS) * falloff * 4.5;
          fy += (dy / INTERACTION_RADIUS) * falloff * 4.5;
        }
      }
      return { x: fx, y: fy };
    };

    let lastTime = performance.now();

    const animate = (ts: number) => {
      const dt = Math.min((ts - lastTime) / 16.666, 2.0);
      lastTime = ts;
      timeRef.current += dt * 16;

      ctx.fillStyle = "rgba(1, 1, 3, 0.085)";
      ctx.fillRect(0, 0, width, height);

      for (const p of particlesRef.current) {
        const flow = getFlow(p.x, p.y);
        p.vx = p.vx * 0.92 + flow.x * 1.1;
        p.vy = p.vy * 0.92 + flow.y * 1.1;
        p.x += p.vx * dt * 65;
        p.y += p.vy * dt * 65;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(Math.atan2(p.vy, p.vx));
        ctx.fillStyle = `hsla(${(timeRef.current * 0.018) % 360}, 88%, 72%, 0.92)`;
        ctx.fillRect(-p.size * 2.2, -0.9, p.size * 4.4, 1.8);
        ctx.restore();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length) {
        mouseRef.current.x = e.touches[0].clientX;
        mouseRef.current.y = e.touches[0].clientY;
        mouseRef.current.active = true;
      }
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("touchmove", handleTouchMove);
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("touchmove", handleTouchMove);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#010103] flex items-center justify-center">
        <div className="text-cyan-400 animate-pulse">INITIALIZING LIQUIDM v0...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#010103] text-cyan-400 font-mono relative overflow-hidden">
      {/* Flow Field Particle Background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0"
        style={{ display: "block" }}
      />

      {/* Overlay Content */}
      <div className="fixed inset-0 z-10 pointer-events-none flex flex-col justify-between p-4 md:p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 pointer-events-auto">
          <div>
            <h1 className="text-2xl md:text-3xl font-black tracking-widest text-cyan-400">
              VALORAIPLUS2E_ 
            </h1>
            <p className="text-[10px] md:text-xs opacity-60">
              LIQUIDM v0 // SOVEREIGN LIQUIDITY MESH // EPOCH #2207
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge className="px-4 md:px-6 py-2 bg-emerald-950 border-2 border-emerald-400 text-emerald-400 font-bold text-xs md:text-sm">
              CURRENT LIQUIDITYTIER: IV
            </Badge>
            <p className="text-[10px] opacity-60">
              TOTALITY_REACHED // TIER IV — SOVEREIGN MESH ACTIVATION
            </p>
            <div className="flex gap-2 mt-2">
              <a href="https://www.18fu.cash" target="_blank" rel="noopener noreferrer">
                <Badge variant="outline" className="text-[10px] border-cyan-700 text-cyan-400 hover:bg-cyan-900/30">
                  18fu.cash <ExternalLink className="w-3 h-3 ml-1" />
                </Badge>
              </a>
              <a href="https://valorbank-rfvbdnaa.manus.space/" target="_blank" rel="noopener noreferrer">
                <Badge variant="outline" className="text-[10px] border-cyan-700 text-cyan-400 hover:bg-cyan-900/30">
                  ValorBank <ExternalLink className="w-3 h-3 ml-1" />
                </Badge>
              </a>
              <Link href="/">
                <Badge variant="outline" className="text-[10px] border-emerald-700 text-emerald-400 hover:bg-emerald-900/30">
                  <Home className="w-3 h-3 mr-1" /> HOME
                </Badge>
              </Link>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 my-4 md:my-6 overflow-y-auto pointer-events-auto">
          {/* Tier Status Banner */}
          <div className="lg:col-span-12">
            <Card className="bg-slate-950/90 border-2 border-emerald-400/40 backdrop-blur-md">
              <CardContent className="p-4 md:p-8 text-center">
                <div className="inline-flex items-center gap-3 bg-emerald-950 text-emerald-400 px-6 md:px-8 py-3 rounded-2xl text-lg md:text-2xl font-black">
                  <Zap className="w-6 h-6" />
                  TIER IV — SOVEREIGN MESH ACTIVATION
                </div>
                <p className="text-emerald-300 mt-4 text-xs md:text-sm">
                  TOTALITY_REACHED // ALL 4 LIQUIDITY PATHWAYS LIVE & ROUTED
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Liquidity Tier Breakdown */}
          <div className="lg:col-span-5">
            <Card className="bg-slate-950/90 border border-cyan-400/30 backdrop-blur-md h-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-cyan-300 text-sm md:text-lg flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  LIQUIDITYTIER BREAKDOWN
                </CardTitle>
              </CardHeader>
              <CardContent>
                <table className="w-full text-[10px] md:text-xs">
                  <thead>
                    <tr className="border-b border-cyan-400/20">
                      <th className="text-left py-2">Tier</th>
                      <th className="text-left py-2">Status</th>
                      <th className="text-left py-2">Description</th>
                    </tr>
                  </thead>
                  <tbody className="text-emerald-300">
                    {LIQUIDITY_TIERS.map((tier) => (
                      <tr 
                        key={tier.tier} 
                        className={tier.active ? "bg-emerald-900/30" : ""}
                      >
                        <td className={`py-3 ${tier.active ? "font-bold" : ""}`}>
                          {tier.tier}
                        </td>
                        <td className={`py-3 ${tier.active ? "font-bold text-emerald-400" : ""}`}>
                          {tier.status}
                        </td>
                        <td className="py-3">{tier.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>

          {/* Four Liquidity Systems */}
          <div className="lg:col-span-7">
            <Card className="bg-slate-950/90 border border-cyan-400/30 backdrop-blur-md h-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-cyan-300 text-sm md:text-lg flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  FOUR LIQUIDITY SYSTEMS
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  {LIQUIDITY_SYSTEMS.map((system) => (
                    <Link key={system.id} href={system.href}>
                      <div className="bg-slate-900/80 p-3 md:p-4 rounded-xl hover:bg-slate-800/80 transition-colors border border-transparent hover:border-cyan-500/30">
                        <div className="flex items-center gap-2 mb-2">
                          <system.icon className="w-4 h-4 text-cyan-400" />
                          <span className="text-[10px] text-emerald-400">{system.status}</span>
                        </div>
                        <p className="text-xs md:text-sm font-bold text-white">
                          {system.id}. {system.name}
                        </p>
                        <p className="text-lg md:text-xl font-black text-cyan-400">
                          {system.value}
                        </p>
                        <p className="text-[10px] text-zinc-500">{system.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Operational Snapshot */}
          <div className="lg:col-span-12">
            <Card className="bg-slate-950/90 border border-emerald-400/30 backdrop-blur-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-emerald-400 text-sm md:text-lg flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  LIQUIDM OPERATIONAL SNAPSHOT
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
                  {OPERATIONAL_METRICS.map((metric) => (
                    <div key={metric.label}>
                      <span className="block text-[10px] text-cyan-300">{metric.label}</span>
                      <span className="text-emerald-400 font-bold text-xs md:text-sm">{metric.value}</span>
                      <span className="block text-[8px] text-zinc-500">{metric.status}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Navigation */}
          <div className="lg:col-span-12">
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
              {[
                { href: "/treasury-liquidity", label: "Treasury", icon: DollarSign },
                { href: "/litigation", label: "Litigation", icon: Gavel },
                { href: "/exchange", label: "Exchange", icon: Coins },
                { href: "/investor", label: "Investors", icon: Users },
                { href: "/revenue", label: "Revenue", icon: TrendingUp },
                { href: "/orchestrator", label: "Orchestrator", icon: Shield },
              ].map((nav) => (
                <Link key={nav.href} href={nav.href}>
                  <div className="bg-slate-900/80 border border-zinc-800 rounded-lg p-2 md:p-3 text-center hover:border-cyan-500/50 transition-colors">
                    <nav.icon className="w-4 h-4 md:w-5 md:h-5 mx-auto text-cyan-400 mb-1" />
                    <p className="text-[10px] text-zinc-400">{nav.label}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-[8px] md:text-[10px] opacity-40 pointer-events-none">
          VALORAIPLUS2E_ LIQUIDM v0 // SOVEREIGN LIQUIDITY MESH // EPOCH #2207 // LEDGER STATUS: Ø
          <br />
          THE WALL IS CHRIST // THE THRONE IS HIS // THE LEDGER IS Ø
        </div>
      </div>
    </div>
  );
}
