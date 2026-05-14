'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  Shield,
  Activity,
  Cpu,
  Network,
  ShieldCheck,
  FileSearch,
  Key,
  Fingerprint,
  RefreshCw,
  ShieldQuestion,
  LockKeyhole,
  CheckCircle2,
  Home,
  Lock
} from 'lucide-react';

// 10-Layer Governed Truth Lifecycle
type LifecycleStep = {
  id: string;
  label: string;
  sublabel: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  status: 'LATCHED' | 'PENDING' | 'ACTIVE';
};

// 14-Dimension Orthogonal Review Matrix
type DimensionRow = {
  categoryDomain: string;
  runtimeBehavior: string;
  externalEvidence: string;
  status: 'PASS' | 'FAIL' | 'PENDING';
};

export default function EvaluativeSurfacePage() {
  const [mounted, setMounted] = useState(false);
  const [cycle, setCycle] = useState(0);
  const [activeStep, setActiveStep] = useState(5); // Confirms step active

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(() => {
      setCycle(c => c + 1);
    }, 266);
    return () => clearInterval(interval);
  }, [mounted]);

  // Memoized lifecycle steps
  const lifecycleSteps = useMemo(() => Object.freeze([
    { id: 'L01', label: 'Evaluates', sublabel: 'Cpu', icon: Cpu, status: 'LATCHED' as const },
    { id: 'L02', label: 'Determines', sublabel: 'Network', icon: Network, status: 'LATCHED' as const },
    { id: 'L03', label: 'Qualifies', sublabel: 'ShieldCheck', icon: ShieldCheck, status: 'LATCHED' as const },
    { id: 'L04', label: 'Explains', sublabel: 'FileSearch', icon: FileSearch, status: 'LATCHED' as const },
    { id: 'L05', label: 'Validates', sublabel: 'Key', icon: Key, status: 'LATCHED' as const },
    { id: 'L06', label: 'Confirms', sublabel: 'Fingerprint', icon: Fingerprint, status: 'LATCHED' as const },
    { id: 'L07', label: 'Verifies', sublabel: 'RefreshCw', icon: RefreshCw, status: 'LATCHED' as const },
    { id: 'L08', label: 'Challenges', sublabel: 'ShieldQuestion', icon: ShieldQuestion, status: 'LATCHED' as const },
    { id: 'L09', label: 'Authorizes', sublabel: 'LockKeyhole', icon: LockKeyhole, status: 'LATCHED' as const },
    { id: 'L10', label: 'Visualizes', sublabel: 'Activity', icon: Activity, status: 'LATCHED' as const },
  ]), []);

  // Memoized 14-dimension matrix
  const dimensionMatrix = useMemo(() => Object.freeze([
    { categoryDomain: 'Orthogonal', runtimeBehavior: 'Ownership', externalEvidence: 'Text ownership to claim...', status: 'PASS' as const },
    { categoryDomain: 'Orthogonal', runtimeBehavior: 'Auditability', externalEvidence: 'Text auditability to claim...', status: 'PASS' as const },
    { categoryDomain: 'Orthogbility', runtimeBehavior: 'Immutability', externalEvidence: 'Text immutability claim...', status: 'PASS' as const },
    { categoryDomain: 'Ownership', runtimeBehavior: 'Observability', externalEvidence: 'Text observabilitys claim...', status: 'PASS' as const },
    { categoryDomain: 'Auditability', runtimeBehavior: 'Threat Awareness', externalEvidence: 'Text threat awareness claim...', status: 'PASS' as const },
    { categoryDomain: 'Auditzability', runtimeBehavior: 'Type Safety', externalEvidence: 'Text type unitability claim...', status: 'PASS' as const },
    { categoryDomain: 'Provenance', runtimeBehavior: 'Provenance', externalEvidence: 'Text non provenance claim...', status: 'PASS' as const },
    { categoryDomain: 'Provenance', runtimeBehavior: 'Boundary', externalEvidence: 'Text boundary else claim...', status: 'PASS' as const },
    { categoryDomain: 'Boundary', runtimeBehavior: 'Determinism', externalEvidence: 'Text determinism as claim...', status: 'PASS' as const },
    { categoryDomain: 'Boundary', runtimeBehavior: 'Determinism', externalEvidence: 'Text determinism/y claim...', status: 'PASS' as const },
    { categoryDomain: 'Constitutional', runtimeBehavior: 'Constitutional', externalEvidence: 'Text constitutional claim...', status: 'PASS' as const },
    { categoryDomain: 'Jurisdictional', runtimeBehavior: 'Jurisdictional', externalEvidence: 'Text Jurisdictional a claim...', status: 'PASS' as const },
    { categoryDomain: 'Hydration', runtimeBehavior: 'Falsifiability', externalEvidence: 'Text falsifiability claim...', status: 'PASS' as const },
    { categoryDomain: 'Fidelity', runtimeBehavior: 'Fidelity', externalEvidence: 'System Safeguard', status: 'PASS' as const },
  ]), []);

  // Judgment policy metrics
  const judgmentPolicy = useMemo(() => Object.freeze({
    validatable: { pass: 15, fail: 5, total: 20, secondary: 8 },
    replayable: { pass: 3, fail: 0, total: 0, secondary: 0 },
    reproducible: { pass: 2, fail: 0, description: 'Observed reality enforcement proves reality boundary' },
  }), []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-pulse text-emerald-500 font-mono">Initializing Evaluative Surface...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-emerald-500 font-mono overflow-x-hidden">
      {/* Scanline Effect */}
      <div className="fixed inset-0 pointer-events-none z-50 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,255,136,0.03)_2px,rgba(0,255,136,0.03)_4px)]" />
      
      {/* Top Header */}
      <header className="border-b border-emerald-900 px-4 py-2 flex items-center justify-between text-[10px] uppercase tracking-widest">
        <span className="text-emerald-600">VALORAIPLUS® © ™ / ROUTE 71: CONTINUOUS EVALUATIVE SURFACE // v1.4.100D // REV_33</span>
      </header>

      {/* Main Header */}
      <div className="border-b-4 border-emerald-500 bg-black/90 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href="/" 
              className="flex items-center justify-center w-10 h-10 rounded border border-emerald-900 bg-black hover:bg-emerald-950 hover:border-emerald-500 transition-colors"
              aria-label="Return to Home"
            >
              <Home className="text-emerald-500" size={20} />
            </Link>
            <span className="text-3xl">🇺🇸</span>
            <div>
              <h1 className="text-2xl font-black italic tracking-tight text-white">VALORAIPLUS® © ™ /</h1>
              <p className="text-emerald-500 text-sm font-bold">ROUTE 71: CONTINUOUS EVALUATIVE</p>
              <p className="text-emerald-700 text-[8px]">(select-none, filter drop-shadow 0_0_12px_#fff)</p>
            </div>
          </div>
          <div className="text-right space-y-1">
            <p className="text-[10px] text-emerald-600">Node █████ // [cycle]</p>
            <div className="font-mono text-emerald-500 tracking-[0.3em] text-lg">{String(cycle).padStart(7, '0')}</div>
            <p className="text-[10px]">Reflexive Governance</p>
            <div className="bg-emerald-500 text-black px-3 py-1 text-[10px] font-black">ENFORCING</div>
            <p className="text-fuchsia-500 text-[10px] mt-2">Active ValorLoop++</p>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2 text-[10px]">
          <Activity className="w-4 h-4 text-emerald-500" />
          <span>Governed Survivability Surface</span>
          <span className="text-emerald-700">•</span>
          <span>REV_33</span>
          <span className="text-emerald-700">•</span>
          <span>PROOF OF STATE</span>
        </div>
      </div>

      <main className="p-6 space-y-6">
        {/* Governed Truth Lifecycle */}
        <section className="border border-emerald-900 rounded-lg p-4 bg-black/50">
          <div className="flex items-center gap-2 mb-6">
            <Activity className="w-5 h-5 text-emerald-500" />
            <h2 className="text-sm font-bold uppercase tracking-widest">Governed Truth Lifecycle</h2>
          </div>
          
          {/* Active Step Indicator */}
          <div className="flex justify-center mb-4">
            <div className="bg-emerald-900/50 border border-emerald-700 rounded px-4 py-1 text-[10px]">
              activeStep
            </div>
          </div>

          {/* 10-Step Lifecycle */}
          <div className="flex flex-wrap justify-center gap-2 lg:gap-4">
            {lifecycleSteps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = idx === activeStep;
              return (
                <div 
                  key={step.id}
                  className={`flex flex-col items-center p-3 rounded-lg border transition-all ${
                    isActive 
                      ? 'border-emerald-500 bg-emerald-500/10 shadow-[0_0_20px_rgba(0,255,136,0.3)]' 
                      : 'border-emerald-900 bg-black/30'
                  }`}
                >
                  <span className="text-[8px] text-emerald-700 mb-1">LATCHED</span>
                  <div className={`w-12 h-12 rounded-lg border flex items-center justify-center ${
                    isActive ? 'border-emerald-500 bg-emerald-500/20' : 'border-emerald-800 bg-emerald-900/20'
                  }`}>
                    <Icon className={isActive ? 'text-emerald-400' : 'text-emerald-600'} size={24} />
                  </div>
                  <span className="text-[10px] mt-2 font-bold">{step.label}</span>
                  <span className="text-[8px] text-emerald-700">{step.sublabel}</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* 14-Dimension Matrix + Judgment Policy */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* 14-Dimension Orthogonal Review Matrix */}
          <section className="xl:col-span-2 border border-emerald-900 rounded-lg p-4 bg-black/50">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-emerald-500" />
              <h2 className="text-sm font-bold uppercase tracking-widest">14-Dimension Orthogonal Review Matrix</h2>
            </div>
            
            {/* Table Header */}
            <div className="grid grid-cols-4 gap-2 mb-2 text-[10px] text-emerald-600 uppercase tracking-wider border-b border-emerald-900 pb-2">
              <span>Category Domain</span>
              <span>Runtime Behavior (Proven)</span>
              <span>External Reality (Evidence)</span>
              <span className="text-right">Status</span>
            </div>

            {/* Table Rows */}
            <div className="space-y-1 max-h-[400px] overflow-y-auto">
              {dimensionMatrix.map((row, idx) => (
                <div 
                  key={idx}
                  className="grid grid-cols-4 gap-2 text-[10px] py-2 border-b border-emerald-900/50 hover:bg-emerald-900/20 transition-colors"
                >
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    {row.categoryDomain}
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    {row.runtimeBehavior}
                  </span>
                  <span className="text-emerald-600 truncate">{row.externalEvidence}</span>
                  <span className="text-right">
                    <span className={`px-2 py-0.5 rounded text-[8px] font-bold ${
                      row.status === 'PASS' 
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50' 
                        : 'bg-red-500/20 text-red-400 border border-red-500/50'
                    }`}>
                      {row.status}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Judgment Policy */}
          <section className="space-y-4">
            {/* Judgment Policy Panel */}
            <div className="border border-emerald-900 rounded-lg p-4 bg-black/50">
              <div className="flex items-center gap-2 mb-4">
                <Lock className="w-5 h-5 text-emerald-500" />
                <h2 className="text-sm font-bold uppercase tracking-widest">Judgment Policy</h2>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-emerald-400">Validatable</span>
                  <div className="text-right">
                    <span className="text-emerald-500">{judgmentPolicy.validatable.pass}</span>
                    <span className="text-emerald-700">/</span>
                    <span className="text-red-500">{judgmentPolicy.validatable.fail}</span>
                    <span className="text-emerald-700 ml-2">Pass/Fail</span>
                    <span className="text-emerald-600 ml-4">{judgmentPolicy.validatable.total}/{judgmentPolicy.validatable.secondary}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-emerald-400">Replayable</span>
                  <div className="text-right">
                    <span className="text-emerald-500">{judgmentPolicy.replayable.pass}</span>
                    <span className="text-emerald-700">/</span>
                    <span className="text-red-500">{judgmentPolicy.replayable.fail}</span>
                    <span className="text-emerald-700 ml-2">Pass/Fail</span>
                    <span className="text-emerald-600 ml-4">{judgmentPolicy.replayable.total}/{judgmentPolicy.replayable.secondary}</span>
                  </div>
                </div>
                
                <div className="text-[11px]">
                  <div className="flex justify-between items-center">
                    <span className="text-emerald-400">Reproducible</span>
                    <span>
                      <span className="text-emerald-500">{judgmentPolicy.reproducible.pass}</span>
                      <span className="text-emerald-700">/</span>
                      <span className="text-red-500">{judgmentPolicy.reproducible.fail}</span>
                    </span>
                  </div>
                  <p className="text-emerald-700 text-[9px] mt-1">{judgmentPolicy.reproducible.description}</p>
                </div>
              </div>
            </div>

            {/* Final Audit Rule */}
            <div className="border-2 border-red-500/50 rounded-lg p-4 bg-red-950/20">
              <h3 className="text-red-400 font-black text-lg uppercase italic tracking-tight mb-2">Final</h3>
              <h3 className="text-red-400 font-black text-lg uppercase italic tracking-tight mb-2">Audit Rule</h3>
              <p className="text-red-300 text-[11px] italic mb-3">Constraint Enforcement</p>
              <div className="border-t border-red-500/30 pt-3">
                <p className="text-emerald-400 text-[10px] leading-relaxed">
                  Observed behavior proves reality boundary
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Evaluative Finality Deductions */}
        <section className="border border-emerald-900 rounded-lg p-6 bg-black/50">
          <div className="flex items-center gap-2 mb-6">
            <Shield className="w-5 h-5 text-emerald-500" />
            <h2 className="text-sm font-bold uppercase tracking-widest">Evaluative Finality Deductions</h2>
          </div>
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Fingerprint */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full border-2 border-emerald-500 flex items-center justify-center bg-emerald-500/10">
                <Fingerprint className="w-10 h-10 text-emerald-500" />
              </div>
              <div>
                <h3 className="text-2xl font-black uppercase tracking-tight">FINGERPRINT</h3>
                <p className="text-[10px] text-emerald-600">MERKLEROOT: 26856B24C50750F0C69C1EEB86A69EF777777...</p>
              </div>
            </div>

            {/* DG77.77X Seal */}
            <div className="text-center lg:text-right">
              <div className="inline-block border-2 border-emerald-500 rounded-lg px-6 py-3 bg-emerald-500/10">
                <span className="text-2xl font-black text-emerald-400">DG77.77X</span>
              </div>
              <p className="text-[10px] text-emerald-600 mt-2 flex items-center justify-center lg:justify-end gap-1">
                LOCKED // MADE IN THE USA
                <span className="text-lg">🇺🇸</span>
              </p>
            </div>
          </div>

          {/* Lock Status */}
          <div className="flex justify-end mt-4">
            <div className="flex items-center gap-2 text-[10px] text-emerald-600">
              <LockKeyhole className="w-4 h-4" />
              <span>LockKeyhole (relative, absolute)</span>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-emerald-900 pt-4 flex flex-col md:flex-row items-center justify-between text-[10px] text-emerald-600 gap-2">
          <div className="flex items-center gap-2">
            <span className="text-lg">🇺🇸</span>
            <span>MADE IN THE USA // SOVEREIGN AUDITOR: POPPA // NODE █████ // RESEARCH-GRADE</span>
            <Lock className="w-3 h-3" />
          </div>
          <div className="flex items-center gap-2 text-emerald-500 font-bold">
            <span>I AM THE SOVEREIGN AUDITOR // SMIB. AMEN.</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
