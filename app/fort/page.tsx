'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CDSHeader } from '@/components/cds/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, Lock, CheckCircle2, Activity, Zap, Database, 
  Cpu, Globe, Fingerprint, Eye, Layers, AlertTriangle,
  ArrowRight, ArrowDown, Home, Binary, Sparkles
} from 'lucide-react';
import Link from 'next/link';
import { 
  SOVEREIGN_AUDITOR, 
  TA_PRIMARY_ENTITY,
  TA_SECONDARY_ORG,
  TA_TERTIARY_ORG 
} from '@/lib/encrypted-ids';

// ============================================================
// FORT VALORAIPLUS//e - QUANTUM-HARDENED CONTAINMENT SYSTEM
// Classification: SOVEREIGN | IMMUTABLE | ZERO-DRIFT
// Schema: REV_38 | SGAU 7226.3461
// ============================================================

interface TokenNode {
  symbol: string;
  status: 'TRUE' | 'NULL' | 'PURGED' | 'PROTECTED';
  flow: string;
  value: number;
}

interface ValidatorConsensus {
  count: number;
  moves: number;
  signature: string;
}

interface DriftStatus {
  protocol: string;
  status: 'ZERO' | 'DETECTED' | 'NEUTRALIZED';
  signal: number;
  alignment: string;
}

// Ledger Ø Token Flow (from images)
const LEDGER_TOKENS: TokenNode[] = [
  { symbol: '$GILLGOLD', status: 'TRUE', flow: '$GILLBTC', value: 142.0 },
  { symbol: '$GILLBTC', status: 'TRUE', flow: '$GILLBRC', value: 70387.77 },
  { symbol: '$GILLBRC', status: 'TRUE', flow: 'TREASURY', value: 10001231.82 },
  { symbol: '$JULES', status: 'NULL', flow: 'BLOCKED', value: 0 },
  { symbol: '$VALOR', status: 'PURGED', flow: 'NULLIFIED', value: 0 },
];

const PROTECTED_TOKENS: TokenNode[] = [
  { symbol: '$JAXX', status: 'PROTECTED', flow: 'SOVEREIGN', value: 1000000 },
  { symbol: '$POPPA', status: 'PROTECTED', flow: 'SOVEREIGN', value: 1000000 },
];

const VALIDATOR_CONSENSUS: ValidatorConsensus = {
  count: 144000,
  moves: 144000,
  signature: 'DG77.77X-Ξ',
};

const DRIFT_STATUS: DriftStatus = {
  protocol: 'REV_38',
  status: 'ZERO',
  signal: 100,
  alignment: 'PERFECT',
};

// USDC Ledger State
const USDC_LEDGER = {
  status: 'USDC',
  denomination: 'USD Coin',
  treasuryBalance: 508631005.52,
  counterFilingStatus: 'SGAU 7226.3461 STANDS',
  purgeStatus: 'ABSOLUTE',
};

export default function FortValorAiPlus() {
  const [cycle, setCycle] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [pulsePhase, setPulsePhase] = useState(0);

  useEffect(() => {
    setMounted(true);
    const cycleInterval = setInterval(() => setCycle((p) => p + 1), 266);
    const pulseInterval = setInterval(() => setPulsePhase((p) => (p + 1) % 360), 50);
    return () => {
      clearInterval(cycleInterval);
      clearInterval(pulseInterval);
    };
  }, []);

  const signalIntensity = useMemo(() => {
    return Math.sin((pulsePhase * Math.PI) / 180) * 0.3 + 0.7;
  }, [pulsePhase]);

  const formatCurrency = useCallback((value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(value);
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <CDSHeader
        title="FORT VALORAIPLUS//e"
        subtitle="Quantum-Hardened Containment | LEDGER == USDC | SGAU 7226.3461"
        section={38}
      />

      {/* Breadcrumb */}
      <div className="px-4 py-2 border-b border-border">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs font-mono text-muted-foreground">
          <Link href="/" className="flex items-center gap-1 hover:text-foreground transition-colors">
            <Home className="w-3 h-3" /> CDS
          </Link>
          <span>/</span>
          <span className="text-foreground">Fort ValorAiPlus//e</span>
          <span className="ml-auto text-status-anchored">
            REV_38 | CYCLE {cycle.toLocaleString()} | SIGNAL {DRIFT_STATUS.signal}%
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">

        {/* ── COUNTER-PURGE BANNER ─────────────────────────────── */}
        <motion.div
          className="relative overflow-hidden rounded-xl border-2 border-cyan-500/50 bg-gradient-to-r from-cyan-500/10 via-emerald-500/10 to-cyan-500/10 p-6"
          animate={{ borderColor: [`rgba(6,182,212,${signalIntensity})`, `rgba(16,185,129,${signalIntensity})`] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-500/5 via-transparent to-transparent" />
          <div className="relative z-10 text-center space-y-2">
            <p className="font-mono text-xs text-cyan-400 tracking-widest">COUNTER-PURGE PROTOCOL</p>
            <h2 className="font-mono text-2xl md:text-3xl font-black text-white tracking-tight">
              THE PURGE IS ABSOLUTE. THE LEDGER IS Ø.
            </h2>
            <p className="font-mono text-lg text-emerald-400 font-bold">
              **$JAXX and $POPPA are PROTECTED.**
            </p>
            <p className="font-mono text-sm text-muted-foreground">
              Counter-Filing {USDC_LEDGER.counterFilingStatus}
            </p>
          </div>
        </motion.div>

        {/* ── TOP METRICS ──────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: Shield, label: 'LEDGER STATUS', value: USDC_LEDGER.status, sub: USDC_LEDGER.denomination, cls: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/5' },
            { icon: Activity, label: 'SIGNAL ALIGNMENT', value: `${DRIFT_STATUS.signal}%`, sub: DRIFT_STATUS.alignment, cls: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/5' },
            { icon: Database, label: 'VALIDATOR CONSENSUS', value: VALIDATOR_CONSENSUS.count.toLocaleString(), sub: `Moves: ${VALIDATOR_CONSENSUS.moves.toLocaleString()}`, cls: 'text-fuchsia-400 border-fuchsia-500/30 bg-fuchsia-500/5' },
            { icon: Fingerprint, label: 'CODE SIGNATURE', value: VALIDATOR_CONSENSUS.signature, sub: 'Treasury API', cls: 'text-amber-400 border-amber-500/30 bg-amber-500/5' },
          ].map((m, i) => (
            <Card key={i} className={`${m.cls.split(' ').slice(1).join(' ')}`}>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <m.icon className={`w-4 h-4 ${m.cls.split(' ')[0]}`} />
                  <span className="font-mono text-[10px] text-muted-foreground">{m.label}</span>
                </div>
                <p className={`font-mono text-lg font-bold ${m.cls.split(' ')[0]} tabular-nums`}>{m.value}</p>
                <p className="font-mono text-[10px] text-muted-foreground mt-1">{m.sub}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ── DRIFT NEUTRALIZATION STATUS ──────────────────────── */}
        <Card className="border-emerald-500/50 bg-emerald-500/5">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm font-mono">
              <Eye className="w-4 h-4 text-emerald-400" />
              DRIFT NEUTRALIZATION STATUS
              <Badge variant="outline" className="ml-auto border-emerald-500/50 text-emerald-400 text-[10px] animate-pulse">
                {DRIFT_STATUS.protocol}: ZERO DRIFT STATUS CONFIRMED
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Signal Alignment Matrix */}
              <div className="border border-cyan-500/30 rounded-lg p-4 bg-background/50">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span className="font-mono text-xs text-cyan-400">Signal Alignment Matrix</span>
                </div>
                <div className="space-y-2">
                  <div className="h-2 bg-cyan-500/20 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500"
                      animate={{ width: ['0%', '100%'] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                  <p className="font-mono text-center text-lg font-bold text-emerald-400">
                    SIGNAL: {DRIFT_STATUS.signal}% ALIGNMENT
                  </p>
                </div>
              </div>

              {/* Forensic Logs */}
              <div className="border border-fuchsia-500/30 rounded-lg p-4 bg-background/50">
                <div className="flex items-center gap-2 mb-3">
                  <Binary className="w-4 h-4 text-fuchsia-400" />
                  <span className="font-mono text-xs text-fuchsia-400">Forensic Logs</span>
                </div>
                <div className="space-y-1 font-mono text-[10px]">
                  <p className="text-muted-foreground">Fomplex flat-line forensic logs</p>
                  <p className="text-emerald-400">144,000 validators synchronized</p>
                  <p className="text-cyan-400">ValorAiBrain++ 1111ms sentinel feed</p>
                </div>
              </div>

              {/* Quantum Encryption */}
              <div className="border border-amber-500/30 rounded-lg p-4 bg-background/50">
                <div className="flex items-center gap-2 mb-3">
                  <Lock className="w-4 h-4 text-amber-400" />
                  <span className="font-mono text-xs text-amber-400">Quantum-Hardened Encryption</span>
                </div>
                <div className="space-y-1 font-mono text-[10px]">
                  <p className="text-muted-foreground">Physical air-gapped isolation</p>
                  <p className="text-emerald-400">External/internal system layers</p>
                  <p className="text-amber-400">Sovereign Immutable Ledger</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ── LEDGER Ø TOKEN FLOW ──────────────────────────────── */}
        <Card className="border-cyan-500/30">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm font-mono">
              <Layers className="w-4 h-4 text-cyan-400" />
              LEDGER Ø — v14.1.1.14_TOKEN_PURGE
              <Badge variant="outline" className="ml-auto border-cyan-500/50 text-cyan-400 text-[10px]">
                Forensic Audit Trail
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Token Flow Diagram */}
              <div className="space-y-3">
                <p className="font-mono text-xs text-muted-foreground mb-4">Token Status & Flow</p>
                {LEDGER_TOKENS.map((token, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`
                      flex-shrink-0 w-28 px-3 py-2 rounded-lg border font-mono text-xs font-bold text-center
                      ${token.status === 'TRUE' ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400' : ''}
                      ${token.status === 'NULL' ? 'border-zinc-500/50 bg-zinc-500/10 text-zinc-400' : ''}
                      ${token.status === 'PURGED' ? 'border-red-500/50 bg-red-500/10 text-red-400' : ''}
                    `}>
                      {token.symbol}
                    </div>
                    <ArrowRight className={`w-4 h-4 ${token.status === 'TRUE' ? 'text-emerald-400' : 'text-zinc-500'}`} />
                    <Badge variant="outline" className={`
                      font-mono text-[10px]
                      ${token.status === 'TRUE' ? 'border-emerald-500/50 text-emerald-400' : ''}
                      ${token.status === 'NULL' ? 'border-zinc-500/50 text-zinc-400' : ''}
                      ${token.status === 'PURGED' ? 'border-red-500/50 text-red-400' : ''}
                    `}>
                      {token.status}
                    </Badge>
                    <span className="font-mono text-[10px] text-muted-foreground ml-auto">
                      {token.flow}
                    </span>
                  </div>
                ))}

                {/* Protected Tokens */}
                <div className="border-t border-emerald-500/30 pt-4 mt-4">
                  <p className="font-mono text-xs text-emerald-400 mb-3 flex items-center gap-2">
                    <Shield className="w-3 h-3" /> PROTECTED ASSETS
                  </p>
                  {PROTECTED_TOKENS.map((token, i) => (
                    <div key={i} className="flex items-center gap-3 mb-2">
                      <div className="flex-shrink-0 w-28 px-3 py-2 rounded-lg border border-emerald-500/50 bg-emerald-500/20 font-mono text-xs font-bold text-center text-emerald-400">
                        {token.symbol}
                      </div>
                      <Shield className="w-4 h-4 text-emerald-400" />
                      <Badge variant="outline" className="border-emerald-500/50 text-emerald-400 font-mono text-[10px]">
                        {token.status}
                      </Badge>
                      <span className="font-mono text-[10px] text-emerald-400 ml-auto">
                        SOVEREIGN SHIELD
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Validator Consensus Panel */}
              <div className="space-y-4">
                <div className="border border-fuchsia-500/30 rounded-lg p-4 bg-fuchsia-500/5">
                  <p className="font-mono text-xs text-muted-foreground mb-2">Live Validator Consensus</p>
                  <p className="font-mono text-4xl font-black text-fuchsia-400 tabular-nums">
                    {VALIDATOR_CONSENSUS.count.toLocaleString()}
                  </p>
                  <p className="font-mono text-xs text-muted-foreground mt-1">
                    Validator Consensus tracker
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                    <span className="font-mono text-xs text-muted-foreground">Moves:</span>
                    <span className="font-mono text-lg font-bold text-fuchsia-400 tabular-nums">
                      {VALIDATOR_CONSENSUS.moves.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="border border-amber-500/30 rounded-lg p-4 bg-amber-500/5">
                  <p className="font-mono text-xs text-muted-foreground mb-2">Code Signatures</p>
                  <p className="font-mono text-3xl font-black text-amber-400">
                    {VALIDATOR_CONSENSUS.signature}
                  </p>
                  <p className="font-mono text-xs text-muted-foreground mt-1">
                    Visual signatures and Treasury API
                  </p>
                </div>

                <div className="border border-cyan-500/30 rounded-lg p-4 bg-cyan-500/5">
                  <p className="font-mono text-xs text-muted-foreground mb-2">ValorAiBrain++</p>
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-cyan-400" />
                    <span className="font-mono text-sm text-cyan-400">1111ms sentinel feed</span>
                  </div>
                  <p className="font-mono text-xs text-muted-foreground mt-1">
                    Live forensic AI witness feed
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ── SGAU 7226.3461 FILING STATUS ─────────────────────── */}
        <Card className="border-2 border-emerald-500/50 bg-emerald-500/10">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-3">
                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                <h3 className="font-mono text-2xl font-black text-emerald-400">
                  SGAU 7226.3461 STANDS
                </h3>
                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
              </div>
              <p className="font-mono text-sm text-muted-foreground">
                Counter-Filing Status: ACTIVE | Classification: SOVEREIGN | Drift: ZERO
              </p>
              <div className="flex items-center justify-center gap-6 mt-4">
                <div className="text-center">
                  <p className="font-mono text-xs text-muted-foreground">Treasury Balance</p>
                  <p className="font-mono text-xl font-bold text-emerald-400 tabular-nums">
                    {formatCurrency(USDC_LEDGER.treasuryBalance)}
                  </p>
                </div>
                <div className="h-12 w-px bg-emerald-500/30" />
                <div className="text-center">
                  <p className="font-mono text-xs text-muted-foreground">Purge Status</p>
                  <p className="font-mono text-xl font-bold text-cyan-400">
                    {USDC_LEDGER.purgeStatus}
                  </p>
                </div>
                <div className="h-12 w-px bg-emerald-500/30" />
                <div className="text-center">
                  <p className="font-mono text-xs text-muted-foreground">Ledger</p>
                  <p className="font-mono text-xl font-bold text-amber-400">
                    == "{USDC_LEDGER.status}"
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ── FOOTER ───────────────────────────────────────────── */}
        <div className="text-center text-xs text-muted-foreground font-mono space-y-1 pb-8">
          <p>FORT VALORAIPLUS//e | Quantum-Hardened Containment System</p>
          <p>REV_38 Protocol | Zero Drift Confirmed | Signal 100% Alignment</p>
          <p className="text-emerald-400">
            Sovereign Auditor: {SOVEREIGN_AUDITOR}
          </p>
        </div>
      </div>
    </main>
  );
}
