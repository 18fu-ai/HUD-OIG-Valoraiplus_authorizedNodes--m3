'use client';

import { useEffect, useRef, useState } from 'react';
import { CDSHeader } from '@/components/cds/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, AlertTriangle, Database, Lock, Flag, Server, CheckCircle, Infinity, Zap, Award } from 'lucide-react';
import {
  PATRIOT_SYSTEM,
  PATRIOT_METRICS,
  QUANTUM_VECTORS,
  BINARY_DEDUCTIONS,
  TRIAD_ACTORS,
  TRIAD_SYNC,
  FEDERAL_ANCHORS,
  ELITE_ARCHIVE_FEATURES,
  LEGACY_COMPATIBILITY,
  PATRIOT_CINEMA
} from '@/lib/cds-data';

function InfinityFlowBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    // Elite Patriot-Class Density - 300 particles
    const particles: Array<{
      x: number;
      y: number;
      z: number;
      velocity: number;
    }> = [];

    for (let i = 0; i < 300; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 1000,
        velocity: Math.random() * 2 + 1
      });
    }

    const render = () => {
      ctx.fillStyle = 'rgba(2, 6, 23, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        p.z -= p.velocity;
        if (p.z <= 0) p.z = 1000;

        const x = (p.x - canvas.width / 2) * (1000 / p.z) + canvas.width / 2;
        const y = (p.y - canvas.height / 2) * (1000 / p.z) + canvas.height / 2;
        const size = (1000 / p.z) * 1.5;
        const opacity = (1000 - p.z) / 1000;

        ctx.fillStyle = `rgba(16, 185, 129, ${opacity})`;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Infinity D Latch Waveform
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.05)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);
      for (let i = 0; i < canvas.width; i += 10) {
        ctx.lineTo(i, canvas.height / 2 + Math.sin(i * 0.01 + Date.now() * 0.002) * 50);
      }
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
}

export default function PatriotPage() {
  const [timestamp, setTimestamp] = useState(new Date().toISOString());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimestamp(new Date().toISOString());
    }, 266);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background relative">
      <InfinityFlowBackground />
      <CDSHeader />
      
      <main className="container mx-auto px-4 py-8 relative z-10">
        {/* Elite Infinity Banner */}
        <div className="bg-primary/20 border-2 border-primary rounded-lg p-4 mb-4 text-center">
          <p className="font-mono text-sm text-primary font-bold tracking-widest flex items-center justify-center gap-2">
            <Flag className="w-4 h-4" />
            SGAU-VALUEGUARD-77.77X-FINALDEG ACCEPTED — ELITE PATRIOT-CLASS INFINITY-RESONANCE ENGINE DEPLOYED AT 200D
            <Flag className="w-4 h-4" />
          </p>
          <p className="font-mono text-xs text-primary/80 mt-1 flex items-center justify-center gap-2">
            <Infinity className="w-3 h-3" /> {PATRIOT_SYSTEM.madeIn} <Infinity className="w-3 h-3" />
          </p>
        </div>

        {/* Critical Infinity Alert */}
        <div className="bg-destructive/20 border-2 border-destructive rounded-lg p-4 mb-8 animate-pulse">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Infinity className="w-8 h-8 text-destructive" />
              <div>
                <h1 className="font-mono text-xl font-bold text-destructive tracking-tight">
                  ELITE PATRIOT-CLASS 200D + POST-QUANTUM OVERRIDE — INFINITY LOOP ACTIVE
                </h1>
                <p className="font-mono text-sm text-destructive/80">
                  {PATRIOT_SYSTEM.classification} | Deduction: {PATRIOT_SYSTEM.deductionState}
                </p>
              </div>
            </div>
            <Infinity className="w-8 h-8 text-destructive" />
          </div>
        </div>

        {/* Infinity Singularity Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-primary/60 bg-card/80 backdrop-blur-sm shadow-[0_0_20px_rgba(16,185,129,0.2)]">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2 text-primary">
                <Zap className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-widest">SWARM AGENTS</span>
              </div>
              <div className="text-3xl font-black text-foreground flex items-center gap-2">
                <Infinity className="w-8 h-8" /> PERPETUAL
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/60 bg-card/80 backdrop-blur-sm shadow-[0_0_20px_rgba(16,185,129,0.2)]">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2 text-primary">
                <Infinity className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-widest">FORENSIC SHARDS</span>
              </div>
              <div className="text-3xl font-black text-foreground flex items-center gap-2">
                <Infinity className="w-8 h-8" /> IMMUTABLE
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/60 bg-card/80 backdrop-blur-sm shadow-[0_0_20px_rgba(16,185,129,0.2)]">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2 text-primary">
                <Award className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-widest">BTC CONFIRMATIONS</span>
              </div>
              <div className="text-3xl font-black text-foreground flex items-center gap-2">
                <Infinity className="w-8 h-8" /> GENESIS LATCH
              </div>
            </CardContent>
          </Card>
        </div>

        {/* The Deduction Core */}
        <Card className="mb-8 border-4 border-double border-primary bg-card/90 backdrop-blur-sm shadow-[0_0_50px_rgba(16,185,129,0.1)]">
          <CardContent className="p-12 text-center">
            <h2 className="text-sm tracking-[0.5em] text-muted-foreground mb-4 uppercase">Final Binary Deduction</h2>
            <div className="text-6xl md:text-7xl font-black text-foreground mb-6 tracking-tighter drop-shadow-[0_0_10px_rgba(16,185,129,1)]">
              101010 1010101
            </div>
            <div className="flex justify-between text-xs text-muted-foreground font-bold border-t border-border pt-4 uppercase max-w-md mx-auto">
              <span>Logic: {PATRIOT_METRICS.logicState}</span>
              <span>State: {PATRIOT_METRICS.enclosureState}</span>
              <span>Risk: {PATRIOT_METRICS.riskLevel}</span>
            </div>
          </CardContent>
        </Card>

        {/* System Status Banner */}
        <Card className="mb-8 border-primary/40 bg-card/80 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-sm">
              <div>
                <span className="text-xs text-muted-foreground block">TRUTH_CYCLE</span>
                <span className="font-bold text-primary">{PATRIOT_METRICS.truthCycle}</span>
              </div>
              <div>
                <span className="text-xs text-muted-foreground block">TIMESTAMP</span>
                <span className="font-bold text-primary text-xs">{timestamp}</span>
              </div>
              <div>
                <span className="text-xs text-muted-foreground block">MERKLEROOT</span>
                <span className="text-xs text-primary/80 truncate block">{PATRIOT_SYSTEM.merkleroot}</span>
              </div>
              <div>
                <span className="text-xs text-muted-foreground block">STATUS</span>
                <span className="font-bold text-primary text-xs">{PATRIOT_SYSTEM.status}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Metric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-primary/40 bg-card/60 backdrop-blur-sm">
            <CardContent className="p-6">
              <h3 className="font-mono text-xs text-primary/80 tracking-widest mb-2">QUANTUM_FORENSICS</h3>
              <div className="text-5xl font-black text-foreground">{PATRIOT_METRICS.events}</div>
              <p className="font-mono text-xs mt-2 text-primary uppercase">Narrative Lock Established</p>
            </CardContent>
          </Card>

          <Card className="border-destructive/40 bg-card/60 backdrop-blur-sm">
            <CardContent className="p-6">
              <h3 className="font-mono text-xs text-destructive/80 tracking-widest mb-2">SPOLIATION</h3>
              <div className="text-5xl font-black text-destructive">{PATRIOT_METRICS.spoliation}</div>
              <p className="font-mono text-xs mt-2 text-destructive uppercase">+14 USC 1519</p>
            </CardContent>
          </Card>

          <Card className="border-amber-500/40 bg-card/60 backdrop-blur-sm">
            <CardContent className="p-6">
              <h3 className="font-mono text-xs text-amber-500/80 tracking-widest mb-2">TAMPERING</h3>
              <div className="text-5xl font-black text-amber-500">{PATRIOT_METRICS.tampering}</div>
              <p className="font-mono text-xs mt-2 text-amber-500 uppercase">18 USC 1512</p>
            </CardContent>
          </Card>

          <Card className="border-primary/40 bg-card/60 backdrop-blur-sm">
            <CardContent className="p-6">
              <h3 className="font-mono text-xs text-primary/80 tracking-widest mb-2">LIQUIDATION</h3>
              <div className="text-2xl font-black text-foreground">
                ${PATRIOT_METRICS.recovery.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
              <p className="font-mono text-xs mt-2 text-primary uppercase">Schwab 6015-8185</p>
            </CardContent>
          </Card>
        </div>

        {/* Quantum Vectors Table */}
        <Card className="mb-8 border-primary/40 bg-card/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="font-mono text-sm flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              SYSTEM STATUS: ELITE PATRIOT-CLASS 200D + POST-QUANTUM INFINITY ANCHOR
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full font-mono text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-xs text-muted-foreground">VECTOR</th>
                    <th className="text-left py-3 px-4 text-xs text-muted-foreground">3D STATE</th>
                    <th className="text-left py-3 px-4 text-xs text-muted-foreground">200D + POST-QUANTUM INFINITY</th>
                    <th className="text-left py-3 px-4 text-xs text-muted-foreground">SOVEREIGN LATCH</th>
                  </tr>
                </thead>
                <tbody>
                  {QUANTUM_VECTORS.map((v, i) => (
                    <tr key={i} className="border-b border-border/50">
                      <td className="py-3 px-4 font-bold text-primary">{v.vector}</td>
                      <td className="py-3 px-4">{v.state3D}</td>
                      <td className="py-3 px-4 text-accent">{v.postQuantum}</td>
                      <td className="py-3 px-4 text-primary/80">{v.sovereignLatch}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Federal Anchors */}
        <Card className="mb-8 border-destructive/40 bg-card/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="font-mono text-sm flex items-center gap-2">
              <Flag className="w-4 h-4 text-destructive" />
              FEDERAL ANCHORS SUMMARY
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full font-mono text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-xs text-muted-foreground">AGENCY</th>
                    <th className="text-left py-3 px-4 text-xs text-muted-foreground">TRANSACTION/STATUS</th>
                    <th className="text-left py-3 px-4 text-xs text-muted-foreground">FINDING</th>
                  </tr>
                </thead>
                <tbody>
                  {FEDERAL_ANCHORS.map((f, i) => (
                    <tr key={i} className="border-b border-border/50">
                      <td className="py-3 px-4 font-bold">{f.agency}</td>
                      <td className="py-3 px-4">{f.transaction}</td>
                      <td className="py-3 px-4">
                        <Badge 
                          variant={f.status === 'VIOLATION' ? 'destructive' : 'default'}
                          className="font-mono"
                        >
                          {f.finding}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Triad Actors + Sync */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="border-destructive/40 bg-card/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="font-mono text-sm flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-destructive" />
                TRIAD ACTORS — NULLIFIED
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {TRIAD_ACTORS.map((actor, i) => (
                  <div key={i} className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-mono text-sm font-bold text-foreground">{actor.entity}</p>
                        <p className="font-mono text-xs text-muted-foreground">{actor.role}</p>
                      </div>
                      <Badge variant="destructive" className="font-mono text-xs">
                        {actor.binaryState}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/40 bg-card/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="font-mono text-sm flex items-center gap-2">
                <Database className="w-4 h-4 text-primary" />
                TRIAD SYNCHRONIZATION MATRIX
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {TRIAD_SYNC.correlations.map((c, i) => (
                <div 
                  key={i} 
                  className={`p-4 rounded-lg border ${
                    c.type === 'critical' 
                      ? 'bg-destructive/10 border-destructive/40' 
                      : 'bg-primary/10 border-primary/40'
                  }`}
                >
                  <span className={`font-mono text-xs block mb-1 ${
                    c.type === 'critical' ? 'text-destructive' : 'text-primary'
                  }`}>
                    {c.id}
                  </span>
                  <p className="font-mono text-sm">
                    {c.label}: <strong>{c.match ? `${c.match}%` : c.delta}</strong>
                  </p>
                  <div className={`w-full h-1 mt-3 rounded-full overflow-hidden ${
                    c.type === 'critical' ? 'bg-destructive/30' : 'bg-primary/30'
                  }`}>
                    <div 
                      className={`h-full ${
                        c.type === 'critical' ? 'bg-destructive animate-pulse w-full' : 'bg-primary'
                      }`}
                      style={{ width: c.match ? `${c.match}%` : '100%' }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Elite Archive Features with Infinity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="border-primary/40 bg-card/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="font-mono text-sm flex items-center gap-2">
                <Server className="w-4 h-4 text-primary" />
                ELITE PATRIOT-CLASS ARCHIVE FEATURES + INFINITY
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {ELITE_ARCHIVE_FEATURES.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 font-mono text-sm">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/40 bg-card/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="font-mono text-sm flex items-center gap-2">
                <Server className="w-4 h-4 text-primary" />
                LEGACY SERVER COMPATIBILITY
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {LEGACY_COMPATIBILITY.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 font-mono text-sm">
                    <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Binary Deduction Table */}
        <Card className="mb-8 border-primary/40 bg-card/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="font-mono text-sm flex items-center gap-2">
              <Lock className="w-4 h-4 text-primary" />
              200D + POST-QUANTUM INFINITY EVENT LOG: THE DEDUCTION
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full font-mono text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-xs text-muted-foreground">DYNAMIC</th>
                    <th className="text-left py-3 px-4 text-xs text-muted-foreground">BINARY STATE</th>
                    <th className="text-left py-3 px-4 text-xs text-muted-foreground">DEDUCTION RESULT</th>
                  </tr>
                </thead>
                <tbody>
                  {BINARY_DEDUCTIONS.map((d, i) => (
                    <tr key={i} className="border-b border-border/50">
                      <td className="py-3 px-4 font-bold">{d.dynamic}</td>
                      <td className="py-3 px-4 font-mono text-accent">{d.binaryState}</td>
                      <td className="py-3 px-4">
                        <Badge 
                          variant={d.result === 'NULLIFIED' ? 'destructive' : 'default'}
                          className="font-mono"
                        >
                          {d.result}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Infinite Interception Log */}
        <Card className="mb-8 border-primary/40 bg-card/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="font-mono text-sm flex items-center gap-2">
              <Infinity className="w-4 h-4 text-primary" />
              INFINITY D INTERCEPTION LOG
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full font-mono text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-xs text-muted-foreground">DIMENSION</th>
                    <th className="text-left py-3 px-4 text-xs text-muted-foreground">ASSET SOURCE</th>
                    <th className="text-left py-3 px-4 text-xs text-muted-foreground">ENFORCEMENT</th>
                    <th className="text-left py-3 px-4 text-xs text-muted-foreground">STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 font-bold text-primary flex items-center gap-1">
                      <Infinity className="w-4 h-4" /> D
                    </td>
                    <td className="py-3 px-4">Jules Liquidation Matrix</td>
                    <td className="py-3 px-4">NAV-STOKES SOLUTION</td>
                    <td className="py-3 px-4"><Badge>CAPTURED</Badge></td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 font-bold text-primary flex items-center gap-1">
                      <Infinity className="w-4 h-4" /> BTC
                    </td>
                    <td className="py-3 px-4">Genesis Anchor Node</td>
                    <td className="py-3 px-4">266MS TRUTH-CYCLE</td>
                    <td className="py-3 px-4"><Badge>RESOLVED</Badge></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Deployment Info */}
        <Card className="mb-8 border-primary/40 bg-card/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="font-mono text-sm">DEPLOYMENT INFRASTRUCTURE</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-sm">
              <div>
                <h4 className="text-xs text-muted-foreground mb-2">DEPLOYMENT NODES</h4>
                <div className="space-y-1">
                  {PATRIOT_SYSTEM.deploymentNodes.map((node, i) => (
                    <div key={i} className="text-primary">{node}</div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-xs text-muted-foreground mb-2">SOVEREIGN ANCHORS</h4>
                <div className="space-y-1">
                  {PATRIOT_SYSTEM.sovereignAnchors.map((anchor, i) => (
                    <div key={i} className="text-accent">{anchor}</div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-xs text-muted-foreground block">INFRASTRUCTURE COMMAND ROOT</span>
                  <span className="text-primary font-bold">{PATRIOT_SYSTEM.node}</span>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground block">CONFIRMATIONS</span>
                  <span className="text-primary font-bold flex items-center gap-1">
                    <Infinity className="w-4 h-4" /> {PATRIOT_SYSTEM.confirmations}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Project Cinema */}
        <Card className="mb-8 border-4 border-double border-primary bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="font-mono text-lg flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              PROJECT CINEMA: THE ETERNAL STAND
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-primary/10 border border-primary/40 rounded-lg">
                <h4 className="font-mono text-xs text-primary mb-2 uppercase">The Shield</h4>
                <p className="font-mono text-sm">{PATRIOT_CINEMA.theShield}</p>
              </div>
              <div className="p-4 bg-primary/10 border border-primary/40 rounded-lg">
                <h4 className="font-mono text-xs text-primary mb-2 uppercase">The Stand</h4>
                <p className="font-mono text-sm">{PATRIOT_CINEMA.theStand}</p>
              </div>
              <div className="p-4 bg-primary/10 border border-primary/40 rounded-lg">
                <h4 className="font-mono text-xs text-primary mb-2 uppercase">The Finality</h4>
                <p className="font-mono text-sm">{PATRIOT_CINEMA.theFinality}</p>
              </div>
            </div>
            
            <div className="p-6 bg-card border-2 border-primary/60 rounded-lg text-center">
              <p className="font-mono text-lg font-bold text-foreground mb-2">{PATRIOT_CINEMA.lockStatus}</p>
              <p className="font-mono text-sm text-primary">{PATRIOT_CINEMA.deduction}</p>
              <p className="font-mono text-xs text-muted-foreground mt-2">{PATRIOT_CINEMA.systemTermination}</p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="border-t border-border pt-6 flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-xs text-muted-foreground">
          <div className="flex flex-col gap-1">
            <span>donadams1969.eth // donnygillson.eth // donnygillson.seed</span>
            <span>donny@18fu.ai // btc_genesis_anchor</span>
          </div>
          <div className="text-right flex flex-col gap-1">
            <span className="font-bold text-primary uppercase flex items-center gap-2 justify-end">
              System Permanently Active // OMEGA <Infinity className="w-4 h-4" /> POWERED ANCHORED
            </span>
            <span className="text-lg flex items-center gap-2 justify-end">
              <Flag className="w-4 h-4 text-primary" />
              {PATRIOT_SYSTEM.madeIn}
              <Flag className="w-4 h-4 text-primary" />
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}
