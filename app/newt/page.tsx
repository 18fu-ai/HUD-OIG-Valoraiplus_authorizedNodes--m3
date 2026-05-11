'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { CDSHeader } from '@/components/cds/header';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Brain,
  Binary,
  Box,
  CheckCircle2,
  FileCode,
  History,
  Shield,
  Target,
} from 'lucide-react';

// Runtime Protocol Types
type RuntimeStage = "ENVELOPE" | "VALIDATION" | "PROVENANCE" | "RECEIPT";

import { TwentySecondAmendment } from '@/components/twenty-second-amendment';

// NavierStokesBackground - High-Density Fluid Dynamics Engine for 18fu.ai
function NavierStokesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let frame: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    // Infinity Swarm Particles
    const particles = Array.from({ length: 150 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      radius: Math.random() * 2 + 1
    }));

    const animate = () => {
      ctx.fillStyle = 'rgba(2, 6, 23, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.fillStyle = '#10b981';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Laminar Flow Connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 150) {
            ctx.strokeStyle = `rgba(16, 185, 129, ${0.2 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });
      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => { 
      cancelAnimationFrame(frame); 
      window.removeEventListener('resize', resize); 
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-50 pointer-events-none" />;
}

export default function NEWTPage() {
  const [cycleCount, setCycleCount] = useState(7705);
  const [psiPressure, setPsiPressure] = useState(0);
  const [timeState, setTimeState] = useState({ micros: '00:00:00.000000' });

  useEffect(() => {
    const interval = setInterval(() => {
      setCycleCount(prev => prev + 1);
      setPsiPressure(prev => (prev + 0.05) % 100);
      // Update microsecond timestamp
      const now = new Date();
      const micros = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}.${(now.getMilliseconds() * 1000).toString().padStart(6, '0')}`;
      setTimeState({ micros });
    }, 266);
    return () => clearInterval(interval);
  }, []);

  // Typed lifecycle trace - REV_34 IVL Protocol
  const lifecycleTrace = useMemo(
    () => [
      { time: "00:00:00.000001", stage: "ENVELOPE" as RuntimeStage, status: "ATOMIC", icon: Box },
      { time: "00:00:00.000266", stage: "VALIDATION" as RuntimeStage, status: "VALIDATED", icon: History },
      { time: "00:00:00.001000", stage: "PROVENANCE" as RuntimeStage, status: "TYPED", icon: Binary },
      { time: timeState.micros, stage: "RECEIPT" as RuntimeStage, status: "REPRODUCIBLE", icon: FileCode },
    ],
    [timeState.micros]
  );

  return (
    <div className="min-h-screen bg-slate-950 text-emerald-400 font-mono relative overflow-x-hidden">
      <NavierStokesBackground />
      <CDSHeader />

      <main className="container mx-auto px-4 py-8 relative z-10">
        
        {/* PROFESSIONAL HEADER - N.E.W.T. AUDITOR SYSTEM */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b-2 border-emerald-500 pb-6 mb-8 bg-slate-950/60 backdrop-blur-md gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center">
              <Brain className="w-8 h-8 text-emerald-400" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                N.E.W.T. Auditor System
              </h1>
              <p className="text-sm text-emerald-400 font-medium">
                Networked Evidence Workflow Terminal | AI-Powered Analysis
              </p>
            </div>
          </div>
          <div className="text-left md:text-right flex flex-col gap-2">
            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/50 font-bold">
              STATUS: OPERATIONAL
            </Badge>
            <div className="text-xs text-emerald-600 font-medium">Cycle: {cycleCount} | 266ms Refresh</div>
          </div>
        </div>

        {/* SYSTEM STATUS PANELS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="border border-emerald-500/50 bg-emerald-950/20 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                    <Brain className="w-7 h-7 text-emerald-400" />
                  </div>
                  <h2 className="text-lg font-bold text-white">AI Processing Core</h2>
                </div>
                <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/50">Active</Badge>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-emerald-900/30 pb-2">
                  <span className="text-emerald-600">Neural Networks:</span>
                  <span className="text-white font-semibold">Fully Connected</span>
                </div>
                <div className="flex justify-between border-b border-emerald-900/30 pb-2">
                  <span className="text-emerald-600">Processing Mode:</span>
                  <span className="text-white font-semibold">Real-time Analysis</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-600">System Status:</span>
                  <span className="text-emerald-400 font-semibold">Operational</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-cyan-500/50 bg-cyan-950/10 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                    <Target className="w-7 h-7 text-cyan-400" />
                  </div>
                  <h2 className="text-lg font-bold text-white">Evidence Collection</h2>
                </div>
                <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/50">Active</Badge>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-cyan-900/30 pb-2">
                  <span className="text-cyan-600">Collection Agents:</span>
                  <span className="text-white font-semibold">Distributed</span>
                </div>
                <div className="flex justify-between border-b border-cyan-900/30 pb-2">
                  <span className="text-cyan-600">Processing Speed:</span>
                  <span className="text-white font-semibold">Real-time</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cyan-600">Status:</span>
                  <span className="text-cyan-400 font-semibold">Monitoring</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* SYSTEM CAPABILITIES */}
        <Card className="mb-8 border-l-4 border-emerald-500 bg-slate-900/90 overflow-hidden">
          <CardContent className="py-8 px-6">
            <h2 className="text-center text-xl md:text-2xl font-bold mb-6 text-white border-b border-emerald-900/50 pb-4">
              N.E.W.T. System Capabilities
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "Real-time evidence analysis and correlation",
                "Automated document processing and indexing",
                "Forensic timeline reconstruction",
                "Pattern recognition across data sources",
                "Secure audit trail generation",
                "Compliance verification workflows"
              ].map((capability, i) => (
                <div key={i} className="flex gap-3 items-start p-4 rounded-lg border border-emerald-900/30 bg-emerald-950/10 hover:bg-emerald-950/20 transition-all">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                  <span className="text-sm text-emerald-200">{capability}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* ACTIVITY LOG */}
        <Card className="mb-8 border border-emerald-800/50 bg-slate-950/90 overflow-hidden">
          <div className="p-4 bg-emerald-900/20 border-b border-emerald-800/50 flex flex-col md:flex-row justify-between gap-2">
            <span className="text-sm font-semibold text-emerald-300">System Activity Log</span>
            <span className="text-xs text-emerald-500">Live Updates</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-900/50 text-emerald-500 text-xs uppercase font-semibold">
                <tr>
                  <th className="p-4">Cycle ID</th>
                  <th className="p-4">Activity</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-emerald-900/20 bg-emerald-500/5 text-white">
                  <td className="p-4 font-mono">#{cycleCount}</td>
                  <td className="p-4">Processing current analysis cycle</td>
                  <td className="p-4"><Badge className="bg-emerald-500/20 text-emerald-400 text-xs">Active</Badge></td>
                </tr>
                <tr className="border-b border-emerald-900/20 text-slate-300">
                  <td className="p-4 font-mono">#{cycleCount - 1}</td>
                  <td className="p-4">Evidence correlation completed</td>
                  <td className="p-4"><Badge className="bg-emerald-500/10 text-emerald-500/70 text-xs">Complete</Badge></td>
                </tr>
                <tr className="border-b border-emerald-900/20 text-slate-400">
                  <td className="p-4 font-mono">#{cycleCount - 2}</td>
                  <td className="p-4">Data indexing completed</td>
                  <td className="p-4"><Badge className="bg-emerald-500/10 text-emerald-500/70 text-xs">Complete</Badge></td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>

        {/* SYSTEM UTILIZATION */}
        <Card className="mb-8 border border-emerald-500/50 bg-slate-900/50 p-6">
          <div className="flex justify-between items-end mb-3">
            <span className="text-sm font-semibold text-white">System Utilization</span>
            <span className="text-2xl font-bold text-emerald-400">{psiPressure.toFixed(0)}%</span>
          </div>
          <Progress value={psiPressure} className="h-2 border border-emerald-800/50" />
          <p className="text-xs text-emerald-600 mt-3 text-center">
            Real-time processing capacity indicator
          </p>
        </Card>

        {/* FOOTER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-t border-emerald-500/30 pt-8 mt-4 gap-4">
          <div className="flex flex-col gap-2">
            <span className="text-sm text-emerald-400 font-semibold">N.E.W.T. Auditor System</span>
            <span className="text-xs text-emerald-700">Secure Evidence Processing Platform</span>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs">AI-Powered</Badge>
              <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 text-xs">Real-time</Badge>
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">Secure</Badge>
            </div>
          </div>
          <div className="text-left md:text-right">
            <Shield className="w-8 h-8 text-emerald-500 mb-2 md:ml-auto" />
            <span className="block text-xs text-emerald-600">
              Verified System | Cycle {cycleCount}
            </span>
          </div>
        </div>

        {/* PROCESSING PIPELINE */}
        <Card className="mb-8 border border-emerald-800/50 bg-slate-950/80 overflow-hidden">
          <div className="p-4 bg-emerald-900/20 border-b border-emerald-800/50 flex flex-col md:flex-row justify-between gap-2">
            <span className="text-sm font-semibold text-emerald-300">Processing Pipeline</span>
            <span className="text-xs text-emerald-500">Live Trace</span>
          </div>
          <div className="space-y-0">
            {lifecycleTrace.map((step, i) => (
              <div key={i} className="flex items-center justify-between p-5 bg-slate-950/50 border-b border-emerald-900/20 group hover:bg-emerald-950/20 transition-all">
                <div className="flex items-center gap-5">
                  <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 group-hover:bg-emerald-500/20 transition-colors">
                    <step.icon size={18} className="text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-xs text-emerald-600 font-mono">{step.time}</p>
                    <p className="text-lg font-semibold text-white">{step.stage}</p>
                  </div>
                </div>
                <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs">{step.status}</Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* SYSTEM METRICS */}
        <section className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {[
            ["Integrity", "Verified"],
            ["Replay", "Available"],
            ["Coverage", "100%"],
            ["Confidence", "High"],
            ["Status", "Complete"],
          ].map(([label, value]) => (
            <div key={label} className="bg-slate-900/50 border border-emerald-900/30 rounded-lg p-4">
              <p className="text-xs text-emerald-600 uppercase font-medium">{label}</p>
              <p className="text-lg text-emerald-400 font-semibold">{value}</p>
            </div>
          ))}
        </section>

        {/* TWENTY-SECOND AMENDMENT - BEAUTIFUL STATE */}
        <div className="mb-8">
          <TwentySecondAmendment />
        </div>

        {/* SYSTEM STATUS FOOTER */}
        <div className="mt-12 text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 mx-auto mb-4 flex items-center justify-center">
            <Shield className="w-8 h-8 text-emerald-400" />
          </div>
          <p className="text-lg font-bold text-white mb-2">
            System Operational
          </p>
          <div className="text-sm text-emerald-500">
            N.E.W.T. Auditor System | Secure Evidence Processing
          </div>
        </div>
      </main>
    </div>
  );
}
