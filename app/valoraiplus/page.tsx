'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  Shield, 
  Activity, 
  CheckCircle2, 
  AlertTriangle,
  Cpu,
  Lock,
  Zap,
  RefreshCw
} from 'lucide-react';

interface ValorAIPlusDimension {
  id: string;
  name: string;
  currentGrade: string;
  targetGrade: string;
  confidence: number;
  validationCount: number;
  challengesSurvived: number;
  status: string;
}

interface ValorAIPlusGovernance {
  overallGrade: string;
  totalConfidence: number;
  coveragePercent: number;
  valorLoopCycle: number;
  reflexiveIntegrityHash: string;
  dimensionCount: number;
  distribution: Record<string, number>;
}

interface ValorAIPlusState {
  governance: ValorAIPlusGovernance;
  dimensions: ValorAIPlusDimension[];
  branding: {
    name: string;
    version: string;
    schema: string;
    classification: string;
    tagline: string;
  };
}

const GRADE_COLORS: Record<string, string> = {
  'S': 'text-fuchsia-400 bg-fuchsia-500/20 border-fuchsia-500/50',
  'A++': 'text-emerald-400 bg-emerald-500/20 border-emerald-500/50',
  'A+': 'text-blue-400 bg-blue-500/20 border-blue-500/50',
  'A': 'text-cyan-400 bg-cyan-500/20 border-cyan-500/50',
  'B+': 'text-yellow-400 bg-yellow-500/20 border-yellow-500/50',
  'B': 'text-orange-400 bg-orange-500/20 border-orange-500/50',
  'C': 'text-red-400 bg-red-500/20 border-red-500/50',
  'F': 'text-zinc-400 bg-zinc-500/20 border-zinc-500/50'
};

export default function ValorAIPlusGovernancePage() {
  const [mounted, setMounted] = useState(false);
  const [state, setState] = useState<ValorAIPlusState | null>(null);
  const [loading, setLoading] = useState(true);
  const [challenging, setChallenging] = useState(false);

  const fetchGovernance = useCallback(async () => {
    try {
      const res = await fetch('/api/valoraiplus/governance');
      const data = await res.json();
      if (data.success) {
        setState(data);
      }
    } catch (err) {
      console.error('VALORAIPLUS_FETCH_ERROR', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const runValorLoopChallenge = useCallback(async () => {
    if (challenging) return;
    setChallenging(true);
    try {
      await fetch('/api/valoraiplus/challenge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      });
      await fetchGovernance();
    } finally {
      setChallenging(false);
    }
  }, [challenging, fetchGovernance]);

  useEffect(() => {
    setMounted(true);
    fetchGovernance();
  }, [fetchGovernance]);

  const metrics = useMemo(() => {
    if (!state) return [];
    return Object.freeze([
      { label: 'Overall Grade', value: state.governance.overallGrade, icon: Shield },
      { label: 'Confidence', value: `${state.governance.totalConfidence}%`, icon: Activity },
      { label: 'Coverage', value: `${state.governance.coveragePercent}%`, icon: CheckCircle2 },
      { label: 'ValorLoop Cycle', value: state.governance.valorLoopCycle.toString(), icon: Cpu }
    ]);
  }, [state]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Cpu className="w-8 h-8 text-fuchsia-500 animate-spin" />
      </div>
    );
  }

  if (loading || !state) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <Cpu className="w-12 h-12 text-fuchsia-500 animate-spin mx-auto mb-4" />
          <p className="text-zinc-400 font-mono text-sm">VALORAIPLUS_LOADING_GOVERNANCE...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="border-b border-zinc-800 pb-6">
          <div className="flex items-center gap-4 mb-2">
            <Shield className="w-10 h-10 text-fuchsia-500" />
            <div>
              <h1 className="text-3xl font-black tracking-tight">
                {state.branding.name} <span className="text-fuchsia-500">GOVERNANCE ENGINE</span>
              </h1>
              <p className="text-zinc-500 font-mono text-sm mt-1">
                {state.branding.classification} // Schema {state.branding.schema}
              </p>
            </div>
          </div>
          <p className="text-zinc-400 italic mt-4 border-l-2 border-fuchsia-500 pl-4">
            {state.branding.tagline}
          </p>
        </header>

        {/* Metrics Grid */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metrics.map((m, i) => (
            <div 
              key={i} 
              className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <m.icon className="w-4 h-4 text-fuchsia-500" />
                <span className="text-xs text-zinc-500 uppercase tracking-wider">{m.label}</span>
              </div>
              <p className={`text-2xl font-black ${m.label === 'Overall Grade' ? GRADE_COLORS[m.value] || 'text-white' : 'text-white'}`}>
                {m.value}
              </p>
            </div>
          ))}
        </section>

        {/* ValorLoop Challenge Button */}
        <section className="flex justify-center">
          <button
            onClick={runValorLoopChallenge}
            disabled={challenging}
            className={`flex items-center gap-3 px-6 py-3 rounded-lg font-bold uppercase tracking-wider transition-all ${
              challenging 
                ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' 
                : 'bg-fuchsia-600 hover:bg-fuchsia-500 text-white'
            }`}
          >
            <RefreshCw className={`w-5 h-5 ${challenging ? 'animate-spin' : ''}`} />
            {challenging ? 'VALORLOOP++ RUNNING...' : 'RUN VALORLOOP++ CHALLENGE'}
          </button>
        </section>

        {/* Grade Distribution */}
        <section className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-fuchsia-500" />
            GRADE DISTRIBUTION
          </h2>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
            {Object.entries(state.governance.distribution).map(([grade, count]) => (
              <div 
                key={grade}
                className={`text-center p-3 rounded-lg border ${GRADE_COLORS[grade] || 'border-zinc-700'}`}
              >
                <p className="text-lg font-black">{grade}</p>
                <p className="text-2xl font-bold">{count}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Dimensions Table */}
        <section className="bg-zinc-900/50 border border-zinc-800 rounded-lg overflow-hidden">
          <div className="p-4 border-b border-zinc-800">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Lock className="w-5 h-5 text-fuchsia-500" />
              14 DIMENSION CONTRACTS
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-zinc-800/50">
                <tr>
                  <th className="text-left p-3 text-xs text-zinc-400 uppercase">Dimension</th>
                  <th className="text-center p-3 text-xs text-zinc-400 uppercase">Current</th>
                  <th className="text-center p-3 text-xs text-zinc-400 uppercase">Target</th>
                  <th className="text-center p-3 text-xs text-zinc-400 uppercase">Confidence</th>
                  <th className="text-center p-3 text-xs text-zinc-400 uppercase">Validations</th>
                  <th className="text-center p-3 text-xs text-zinc-400 uppercase">Challenges</th>
                  <th className="text-center p-3 text-xs text-zinc-400 uppercase">Status</th>
                </tr>
              </thead>
              <tbody>
                {state.dimensions.map((d, i) => (
                  <tr key={i} className="border-t border-zinc-800/50 hover:bg-zinc-800/30">
                    <td className="p-3">
                      <span className="font-mono text-sm text-zinc-300">{d.name}</span>
                    </td>
                    <td className="p-3 text-center">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${GRADE_COLORS[d.currentGrade]}`}>
                        {d.currentGrade}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${GRADE_COLORS[d.targetGrade]}`}>
                        {d.targetGrade}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <span className={`font-mono text-sm ${d.confidence >= 95 ? 'text-emerald-400' : d.confidence >= 85 ? 'text-blue-400' : 'text-yellow-400'}`}>
                        {d.confidence}%
                      </span>
                    </td>
                    <td className="p-3 text-center font-mono text-sm text-zinc-400">
                      {d.validationCount}
                    </td>
                    <td className="p-3 text-center font-mono text-sm text-zinc-400">
                      {d.challengesSurvived}
                    </td>
                    <td className="p-3 text-center">
                      {d.status === 'VALORAIPLUS_PASSED' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 mx-auto" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-yellow-500 mx-auto" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Integrity Hash */}
        <section className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-5 h-5 text-fuchsia-500" />
            <h2 className="text-lg font-bold">REFLEXIVE INTEGRITY</h2>
          </div>
          <p className="font-mono text-xs text-zinc-500 break-all">
            {state.governance.reflexiveIntegrityHash}
          </p>
        </section>

        {/* Footer */}
        <footer className="text-center pt-6 border-t border-zinc-800">
          <p className="text-xs text-zinc-600 font-mono tracking-widest">
            VALORAIPLUS_S_CLASS // REV_33 // MADE IN THE USA
          </p>
        </footer>

      </div>
    </div>
  );
}
