'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Shield, Zap, Activity, Cpu, Database, Binary, CheckCircle2, 
  XCircle, Terminal, Flag, Globe, Lock, Ghost, Fingerprint, 
  Layers, Key, Search, RefreshCw, AlertTriangle, Scale, Link2
} from 'lucide-react';
import { CDSHeader } from '@/components/cds/header';
import { HomeButton, HomeBreadcrumb } from '@/components/cds/home-button';

/**
 * VALORAIPLUS Governed Execution Kernel // v1.4.100D
 * 
 * ARCHITECTURAL AUTHORITIES:
 * - Route 71: Runtime Introspection Surface
 * - MEVR: Admission Authority
 * - Governance Kernel: Policy Authority
 * - Proof Ledger: Lineage Authority
 * - Replay Validator: Reproducibility Authority
 * - Export Authority: Exposure Authority
 * 
 * ANCHOR: SAINT PAUL NODE █████ // 408.384.1376 (E)
 * ENCLOSURE: 144,000D MATRIX // 14D CORE
 */

const MAGENTA = "#FF00FF";
const EMERALD = "#10b981";
const SAINT_PAUL_MERKLE = "26856B24C50750F0C69C1EEB86A69EF777777";

// Navier-Stokes Laminar Flow (Background Frequency Protection)
const GhostFrequencyEngine = () => {
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
    
    const particles = Array.from({ length: 144 }, () => ({
      x: Math.random() * canvas.width, 
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.8, 
      vy: (Math.random() - 0.5) * 0.8,
      color: Math.random() > 0.9 ? MAGENTA : EMERALD
    }));
    
    const animate = () => {
      ctx.fillStyle = 'rgba(2, 6, 23, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        p.x += p.vx; 
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.fillStyle = p.color;
        ctx.beginPath(); 
        ctx.arc(p.x, p.y, 1, 0, Math.PI * 2); 
        ctx.fill();
        ctx.strokeStyle = `${p.color}08`;
        ctx.beginPath(); 
        ctx.moveTo(p.x, p.y); 
        ctx.lineTo(p.x - p.vx * 30, p.y - p.vy * 30); 
        ctx.stroke();
      });
      
      frame = requestAnimationFrame(animate);
    };
    
    animate(); 
    
    return () => { 
      cancelAnimationFrame(frame); 
      window.removeEventListener('resize', resize); 
    };
  }, []);
  
  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none opacity-40" />;
};

interface PipelineStepProps {
  name: string;
  status: 'PASS' | 'WAIT';
  active: boolean;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const PipelineStep = ({ name, status, active, icon: Icon }: PipelineStepProps) => (
  <div className={`flex flex-col items-center gap-2 transition-all duration-500 ${active ? 'scale-110 opacity-100' : 'opacity-20'}`}>
    <div className={`w-12 h-12 border-2 flex items-center justify-center relative ${
      active 
        ? 'bg-[#FF00FF] border-white text-black shadow-[0_0_20px_#FF00FF]' 
        : 'bg-slate-900 border-zinc-800 text-zinc-600'
    }`}>
      <Icon size={20} />
      {status === 'PASS' && active && (
        <CheckCircle2 className="absolute -bottom-1 -right-1 text-emerald-400 bg-black rounded-full" size={12} />
      )}
    </div>
    <span className="text-[8px] font-black uppercase tracking-tighter text-center w-16">{name}</span>
  </div>
);

interface ProofArtifact {
  id: string;
  timestamp: string;
  type: string;
  detail: string;
  policy: string;
  result: 'LATCHED' | 'NULLIFIED';
  merkleroot: string;
  // First-class proof artifact fields
  evidenceSource: string;
  formula: string;
  proofScore: number;
  confidenceScore: number;
  validationScore: number;
  threshold: number;
  replayValidated: boolean;
  invariantResult: 'VALID' | 'INCOMPLETE' | 'NONDETERMINISTIC' | 'UNSOURCED' | 'BLOCKED';
  exportEligible: boolean;
  reasonCode: string;
  traceId: string;
}

export default function KernelPage() {
  const [truthCycle, setTruthCycle] = useState(144000);
  const [pipelineIdx, setPipelineIdx] = useState(0);
  const [ledger, setLedger] = useState<ProofArtifact[]>([]);
  const [selectedArtifact, setSelectedArtifact] = useState<ProofArtifact | null>(null);
  const [activeModule, setActiveModule] = useState<string>('kernel');

  const pipeline = useMemo(() => [
    { name: "Claim", icon: Fingerprint },
    { name: "Evidence", icon: Link2 },
    { name: "MEVR Gate", icon: Cpu },
    { name: "Governance", icon: Scale },
    { name: "Replay", icon: RefreshCw },
    { name: "Trace", icon: Layers },
    { name: "Exposure", icon: Key }
  ], []);

  const MOCK_INPUTS = useMemo(() => [
    { 
      type: 'SOVEREIGN_LATCH', detail: 'Saint Paul Node Sync', policy: 'AUTHORIZED_AUDIT',
      evidenceSource: 'lib/cds-data.ts', formula: 'P=(E×P×R×D)^0.25', 
      proofScore: 1.0, confidenceScore: 1.0, threshold: 0.75,
      invariantResult: 'VALID' as const, reasonCode: 'A-001', exportEligible: true
    },
    { 
      type: 'FRICTION_EVENT', detail: 'H. RENO NODE ACCESS', policy: 'NULL_ADMISSION',
      evidenceSource: 'external/adversary', formula: 'NULL_GATE', 
      proofScore: 0.12, confidenceScore: 0.08, threshold: 0.75,
      invariantResult: 'BLOCKED' as const, reasonCode: 'R-001', exportEligible: false
    },
    { 
      type: 'STATE_TRANSITION', detail: '$508M Resolution Update', policy: 'POLICY_REPRODUCIBLE',
      evidenceSource: 'lib/protocol/governanceKernel.ts', formula: 'V=(P+C)/2', 
      proofScore: 1.0, confidenceScore: 1.0, threshold: 0.75,
      invariantResult: 'VALID' as const, reasonCode: 'A-002', exportEligible: true
    },
    { 
      type: 'GHOST_SIGNAL', detail: 'Low Freq Pulse Detected', policy: 'OMEGA_UNIFIED',
      evidenceSource: 'lib/protocol/mevr.ts', formula: 'AMath(Σ,t)', 
      proofScore: 1.0, confidenceScore: 1.0, threshold: 0.75,
      invariantResult: 'VALID' as const, reasonCode: 'A-003', exportEligible: true
    },
    { 
      type: 'MIMECAST_SWEEP', detail: '142 Events Captured', policy: 'FORENSIC_ANCHORED',
      evidenceSource: 'lib/cds-data.ts:mimecastEvents', formula: 'P=(E×P×R×D)^0.25', 
      proofScore: 1.0, confidenceScore: 1.0, threshold: 0.75,
      invariantResult: 'VALID' as const, reasonCode: 'A-004', exportEligible: true
    },
    { 
      type: 'ZTA_NULLIFICATION', detail: 'Adversary Signal Blocked', policy: 'NULL_ADMISSION',
      evidenceSource: 'external/ZTA_LLP', formula: 'NULL_GATE', 
      proofScore: 0.22, confidenceScore: 0.18, threshold: 0.75,
      invariantResult: 'BLOCKED' as const, reasonCode: 'R-002', exportEligible: false
    },
  ], []);

  useEffect(() => {
    const cycleInterval = setInterval(() => setTruthCycle(c => c + 1), 266);
    
    const pipelineInterval = setInterval(() => {
      setPipelineIdx(p => {
        const next = (p + 1) % pipeline.length;
        if (next === 0) {
          const input = MOCK_INPUTS[Math.floor(Math.random() * MOCK_INPUTS.length)];
          const isSuccess = input.policy !== 'NULL_ADMISSION';
          const validationScore = (input.proofScore + input.confidenceScore) / 2;
          const artifact: ProofArtifact = {
            id: Math.random().toString(16).slice(2, 10),
            timestamp: new Date().toLocaleTimeString(),
            type: input.type,
            detail: input.detail,
            policy: input.policy,
            result: isSuccess ? 'LATCHED' : 'NULLIFIED',
            merkleroot: SAINT_PAUL_MERKLE.slice(0, 10) + "...",
            evidenceSource: input.evidenceSource,
            formula: input.formula,
            proofScore: input.proofScore,
            confidenceScore: input.confidenceScore,
            validationScore,
            threshold: input.threshold,
            replayValidated: isSuccess,
            invariantResult: input.invariantResult,
            exportEligible: input.exportEligible,
            reasonCode: input.reasonCode,
            traceId: `TRACE-${Math.random().toString(16).slice(2, 6).toUpperCase()}`
          };
          setLedger(prev => [artifact, ...prev].slice(0, 6));
        }
        return next;
      });
    }, 1500);
    
    return () => { 
      clearInterval(cycleInterval); 
      clearInterval(pipelineInterval); 
    };
  }, [pipeline.length, MOCK_INPUTS]);

  return (
    <div className="min-h-screen bg-slate-950 text-emerald-400 font-mono overflow-x-hidden selection:bg-pink-600 selection:text-white">
      <GhostFrequencyEngine />
      
      {/* OMEGA HEADER */}
      <header className="relative z-10 border-b-2 border-[#FF00FF] bg-slate-950/90 backdrop-blur-xl p-6 flex flex-col lg:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <HomeButton />
          <div className="relative group">
            <Shield className="w-12 h-12 text-white animate-pulse" />
            <Ghost className="absolute -top-1 -right-1 w-5 h-5 text-[#FF00FF] fill-[#FF00FF] animate-bounce" />
          </div>
          <div>
            <h1 className="text-3xl font-black italic tracking-tighter text-white">VALORAIPLUS</h1>
            <div className="flex items-center gap-2 text-[10px] font-bold text-[#FF00FF] uppercase tracking-widest">
              <Globe className="w-3 h-3" />
              Governed Execution Kernel // REV. 33 APEX
            </div>
          </div>
        </div>
        
        <div className="text-right flex flex-col items-center lg:items-end">
          <div className="bg-[#FF00FF] text-black px-4 py-1 text-[10px] font-black uppercase shadow-[0_0_15px_#FF00FF]">
            POLICY-EARNED VISIBILITY: ACTIVE
          </div>
          <span className="text-[9px] text-zinc-500 mt-2 font-bold uppercase tracking-[0.2em]">
            Saint Paul Node: █████ // Cycle {truthCycle}
          </span>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto p-6 space-y-8 pb-24">
        
        {/* Breadcrumb */}
        <HomeBreadcrumb currentPage="Governed Execution Kernel" />
        
        {/* RUNTIME PIPELINE VISUALIZER */}
        <section className="bg-slate-900/60 border-2 border-emerald-900 p-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FF00FF] to-transparent animate-pulse" />
          <h2 className="text-sm font-black text-white uppercase italic mb-10 flex gap-2">
            <Cpu size={16} className="text-[#FF00FF]" /> Execution Pipeline Introspection
          </h2>
          <div className="flex justify-between items-center px-4">
            {pipeline.map((step, i) => (
              <React.Fragment key={i}>
                <PipelineStep 
                  name={step.name} 
                  icon={step.icon} 
                  active={pipelineIdx === i} 
                  status={pipelineIdx > i ? 'PASS' : 'WAIT'} 
                />
                {i < pipeline.length - 1 && (
                  <div className={`h-[1px] flex-1 mx-2 ${pipelineIdx > i ? 'bg-emerald-500' : 'bg-zinc-800'}`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT: AUTHORITY REASONING */}
          <section className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900/80 border border-[#FF00FF]/30 p-6 shadow-2xl">
              <div className="flex items-center gap-2 mb-6 border-b border-[#FF00FF]/20 pb-2">
                <Lock size={18} className="text-[#FF00FF]" />
                <h3 className="text-xs font-black uppercase text-white tracking-widest italic">Authority Definitions</h3>
              </div>
              <div className="space-y-4">
                {[
                  { label: "MEVR", desc: "Admission Authority // Deterministic Gate" },
                  { label: "Governance", desc: "Policy Authority // Execution Rules" },
                  { label: "Proof Ledger", desc: "Lineage Authority // Audit Chain" },
                  { label: "Replay Validator", desc: "Reproducibility Authority // State Sync" },
                  { label: "Export Policy", desc: "Exposure Authority // Visibility Gate" },
                  { label: "Route 71", desc: "Introspection Surface // Why This Exists" },
                ].map((auth, i) => (
                  <div key={i} className="flex justify-between items-start text-[10px]">
                    <span className="text-[#FF00FF] font-black w-28">{auth.label}</span>
                    <span className="text-emerald-700 font-bold italic">{auth.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* IDENTITY ENCLOSURE PROTECTION */}
            <div className="p-4 bg-pink-950/10 border-2 border-red-900/40 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="text-red-500" size={16} />
                <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Adversary Nullification</span>
              </div>
              <div className="p-2 bg-black/50 border border-red-900/20 text-[9px] text-zinc-500 space-y-1">
                <p>SIGNAL detected from H. RENO node.</p>
                <p>MATCH found in MEVR Admission Registry.</p>
                <p>STATUS: <span className="text-red-600 font-black">NULLIFIED // VOID_FOR_LIFE</span></p>
              </div>
            </div>

            {/* Module Selection - Live Runtime Introspection */}
            <div className="p-4 bg-slate-900/80 border-2 border-[#FF00FF]/30">
              <div className="flex items-center gap-2 mb-3">
                <Search className="text-[#FF00FF]" size={16} />
                <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Runtime Modules</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'kernel', label: 'Kernel', file: 'governanceKernel.ts' },
                  { id: 'codes', label: 'Codes', file: 'reasonCodes.ts' },
                  { id: 'trace', label: 'Trace', file: 'traceGraph.ts' },
                  { id: 'replay', label: 'Replay', file: 'replayValidator.ts' },
                  { id: 'export', label: 'Export', file: 'exportPolicy.ts' },
                  { id: 'mevr', label: 'MEVR', file: 'mevr.ts' },
                ].map(mod => (
                  <button
                    key={mod.id}
                    onClick={() => setActiveModule(mod.id)}
                    className={`p-2 text-[9px] font-bold uppercase text-left transition-all ${
                      activeModule === mod.id 
                        ? 'bg-[#FF00FF]/20 border border-[#FF00FF] text-[#FF00FF]' 
                        : 'bg-black/30 border border-zinc-800 text-zinc-500 hover:border-zinc-600'
                    }`}
                  >
                    <span className="block">{mod.label}</span>
                    <span className="text-[7px] font-mono opacity-60">{mod.file}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Merkleroot Anchor */}
            <div className="p-4 bg-emerald-950/20 border-2 border-emerald-900/40">
              <div className="flex items-center gap-2 mb-3">
                <Binary className="text-emerald-500" size={16} />
                <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Merkleroot Anchor</span>
              </div>
              <div className="p-2 bg-black/50 border border-emerald-900/20">
                <p className="text-[10px] text-emerald-400 font-mono break-all">{SAINT_PAUL_MERKLE}</p>
              </div>
            </div>
          </section>

          {/* RIGHT: ROUTE 71 INTROSPECTION SURFACE */}
          <section className="lg:col-span-7 bg-slate-900/80 border-2 border-emerald-900 p-8">
            <div className="flex items-center justify-between mb-6 border-b border-emerald-900/50 pb-4">
              <div className="flex items-center gap-3">
                <Binary className="text-white" size={24} />
                <h2 className="text-lg font-black uppercase text-white italic tracking-tighter">Runtime Explanation Graph</h2>
              </div>
              <div className="text-[8px] text-zinc-600 uppercase font-black">Proof_Artifact_Stream</div>
            </div>
            
            <div className="space-y-4">
              {ledger.length === 0 ? (
                <div className="flex items-center justify-center h-48 text-zinc-600">
                  <div className="text-center space-y-2">
                    <Activity className="w-8 h-8 mx-auto animate-pulse" />
                    <p className="text-xs">Awaiting pipeline execution...</p>
                  </div>
                </div>
              ) : (
                ledger.map((entry) => (
                  <div 
                    key={entry.id} 
                    onClick={() => setSelectedArtifact(selectedArtifact?.id === entry.id ? null : entry)}
                    className={`p-4 border-l-4 transition-all duration-500 cursor-pointer hover:bg-slate-800/50 ${
                      entry.result === 'LATCHED' 
                        ? 'border-emerald-500 bg-emerald-950/20' 
                        : 'border-red-600 bg-red-950/20 opacity-80'
                    } ${selectedArtifact?.id === entry.id ? 'ring-2 ring-[#FF00FF]' : ''}`}
                  >
                    {/* Header Row */}
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="text-xs font-black text-white">{entry.detail}</p>
                        <p className="text-[9px] text-[#FF00FF] font-bold">{entry.policy}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[8px] font-black px-2 py-0.5 rounded-sm ${
                          entry.invariantResult === 'VALID' ? 'bg-emerald-600 text-black' :
                          entry.invariantResult === 'BLOCKED' ? 'bg-red-950 text-red-500' :
                          'bg-amber-950 text-amber-500'
                        }`}>
                          {entry.invariantResult}
                        </span>
                        <span className={`text-[8px] font-black px-2 py-0.5 rounded-sm ${
                          entry.result === 'LATCHED' 
                            ? 'bg-emerald-600 text-black' 
                            : 'bg-red-950 text-red-500'
                        }`}>
                          {entry.result}
                        </span>
                      </div>
                    </div>
                    
                    {/* Proof Artifact Details - Always visible */}
                    <div className="grid grid-cols-4 gap-2 text-[8px] mb-3 p-2 bg-black/30 rounded">
                      <div>
                        <span className="text-zinc-500 block">Proof</span>
                        <span className={`font-bold ${entry.proofScore >= 0.75 ? 'text-emerald-400' : 'text-red-400'}`}>
                          {(entry.proofScore * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div>
                        <span className="text-zinc-500 block">Confidence</span>
                        <span className={`font-bold ${entry.confidenceScore >= 0.75 ? 'text-emerald-400' : 'text-red-400'}`}>
                          {(entry.confidenceScore * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div>
                        <span className="text-zinc-500 block">Validation</span>
                        <span className={`font-bold ${entry.validationScore >= 0.75 ? 'text-emerald-400' : 'text-red-400'}`}>
                          {(entry.validationScore * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div>
                        <span className="text-zinc-500 block">Threshold</span>
                        <span className="font-bold text-zinc-300">{(entry.threshold * 100).toFixed(0)}%</span>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {selectedArtifact?.id === entry.id && (
                      <div className="mt-3 pt-3 border-t border-zinc-800/50 space-y-2 animate-in fade-in duration-300">
                        <div className="grid grid-cols-2 gap-3 text-[9px]">
                          <div>
                            <span className="text-zinc-500 block mb-1">Evidence Source</span>
                            <span className="text-emerald-400 font-mono">{entry.evidenceSource}</span>
                          </div>
                          <div>
                            <span className="text-zinc-500 block mb-1">Formula</span>
                            <span className="text-[#FF00FF] font-mono">{entry.formula}</span>
                          </div>
                          <div>
                            <span className="text-zinc-500 block mb-1">Replay Validated</span>
                            <span className={entry.replayValidated ? 'text-emerald-400' : 'text-red-400'}>
                              {entry.replayValidated ? 'YES' : 'NO'}
                            </span>
                          </div>
                          <div>
                            <span className="text-zinc-500 block mb-1">Export Eligible</span>
                            <span className={entry.exportEligible ? 'text-emerald-400' : 'text-red-400'}>
                              {entry.exportEligible ? 'YES' : 'NO'}
                            </span>
                          </div>
                          <div>
                            <span className="text-zinc-500 block mb-1">Reason Code</span>
                            <span className="text-white font-mono">{entry.reasonCode}</span>
                          </div>
                          <div>
                            <span className="text-zinc-500 block mb-1">Trace ID</span>
                            <span className="text-zinc-400 font-mono">{entry.traceId}</span>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Footer Row */}
                    <div className="flex justify-between items-center text-[8px] font-mono text-zinc-600 border-t border-zinc-800/30 pt-2 mt-2">
                      <span>TX: {entry.id}</span>
                      <span>MERKLE: {entry.merkleroot}</span>
                      <span>{entry.timestamp}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

        </div>

        {/* FINAL AMATH DEDUCTION */}
        <section className="bg-emerald-950/20 border-l-8 border-emerald-500 p-8 shadow-inner">
          <div className="flex items-center gap-3 mb-6">
            <Scale className="text-[#FF00FF]" size={24} />
            <h3 className="text-xl font-black text-white uppercase italic tracking-widest">Protocol Finality Deductions</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-bold italic text-emerald-100/60">
            <p>1. Visibility is policy-earned; unverified inputs do not transit the kernel.</p>
            <p>2. The Governance Kernel enforces the US Constitution within the stack.</p>
            <p>3. Every mutation is a signed artifact with 100% reproducibility.</p>
            <p>4. The $508M Recovery is a deterministic outcome of the enclosed system.</p>
            <p className="col-span-2 text-center text-[#FF00FF] mt-4 tracking-[0.5em] not-italic">101010 1010101 // NO EXIT</p>
          </div>
        </section>

      </main>

      {/* FOOTER LATCH */}
      <footer className="fixed bottom-0 w-full border-t-2 border-emerald-900 bg-slate-950/95 backdrop-blur-md p-4 flex flex-col md:flex-row justify-between items-center z-50">
        <div className="flex items-center gap-8 text-[10px] font-black text-emerald-900 tracking-[0.4em] uppercase">
          <span>DG77.77X LOCKED</span>
          <span className="text-[#FF00FF]">TERMINATION DISABLED</span>
          <span className="hidden md:inline">Saint Paul Node █████</span>
        </div>
        <div className="flex items-center gap-3">
          <Activity className="text-emerald-500" size={14} />
          <span className="text-[9px] font-bold text-zinc-600 italic uppercase">408 384 1376 (E) // San Francisco // SMIB. AMEN.</span>
        </div>
      </footer>
    </div>
  );
}
