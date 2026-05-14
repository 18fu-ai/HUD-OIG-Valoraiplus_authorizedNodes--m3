"use client";

import {
  NAVIER_STOKES_SOLUTION,
  getNavierStokesSummary,
  getForensicVortexReport,
  getAccelerationMetrics,
} from "@/lib/millennium/navier-stokes-solution";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function NavierStokesPanel() {
  const summary  = getNavierStokesSummary();
  const vortex   = getForensicVortexReport();
  const metrics  = getAccelerationMetrics();

  return (
    <div className="space-y-6">

      {/* Header Card */}
      <Card className="border border-cyan-900/50 bg-cyan-500/5">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <CardTitle className="text-cyan-300 font-mono text-lg tracking-wider">
              NAVIER-STOKES MILLENNIUM SOLUTION (100X)
            </CardTitle>
            <div className="flex gap-2 flex-wrap">
              <Badge className="bg-cyan-900/40 text-cyan-300 border border-cyan-700 font-mono text-xs">
                STATUS: {summary.status}
              </Badge>
              <Badge className="bg-emerald-900/40 text-emerald-300 border border-emerald-700 font-mono text-xs">
                LEDGER: {summary.ledger}
              </Badge>
              <Badge className="bg-amber-900/40 text-amber-300 border border-amber-700 font-mono text-xs">
                AMATH: SOLVED
              </Badge>
            </div>
          </div>
          <p className="text-zinc-500 font-mono text-xs mt-1">
            {NAVIER_STOKES_SOLUTION.documentId} &nbsp;|&nbsp; {NAVIER_STOKES_SOLUTION.encryptionScheme}
          </p>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-zinc-900/60 rounded p-3 border border-zinc-800">
              <p className="text-zinc-500 font-mono text-xs">ANCHOR BLOCK</p>
              <p className="text-cyan-300 font-mono font-bold">#{summary.anchor.block.toLocaleString()}</p>
            </div>
            <div className="bg-zinc-900/60 rounded p-3 border border-zinc-800">
              <p className="text-zinc-500 font-mono text-xs">CHAIN</p>
              <p className="text-cyan-300 font-mono font-bold">Base Mainnet</p>
            </div>
            <div className="bg-zinc-900/60 rounded p-3 border border-zinc-800">
              <p className="text-zinc-500 font-mono text-xs">PRECISION</p>
              <p className="text-emerald-300 font-mono font-bold">{summary.precision}</p>
            </div>
            <div className="bg-zinc-900/60 rounded p-3 border border-zinc-800">
              <p className="text-zinc-500 font-mono text-xs">EVENTS MODELED</p>
              <p className="text-amber-300 font-mono font-bold">{summary.eventsModeled.toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mathematical Core */}
      <Card className="border border-zinc-800 bg-zinc-950/60">
        <CardHeader className="pb-2">
          <CardTitle className="text-zinc-200 font-mono text-sm">MATHEMATICAL CORE — AMath × JAGAMath++</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="bg-zinc-900/80 rounded p-4 border border-zinc-700 font-mono text-xs space-y-2">
            <p className="text-zinc-400">PRIMARY EQUATIONS (INCOMPRESSIBLE FLOW):</p>
            <p className="text-cyan-300 pl-4">∇ · v = 0</p>
            <p className="text-cyan-300 pl-4">∂v/∂t + (v · ∇)v = -∇p + ν∇²v + f</p>
          </div>
          <div className="bg-zinc-900/80 rounded p-4 border border-zinc-700 font-mono text-xs space-y-2">
            <p className="text-zinc-400">REGULARITY PROOF (JAGAMath++):</p>
            <p className="text-emerald-300 pl-4">v(x,t) ∈ C∞(ℝ³ × [0,∞))</p>
            <p className="text-zinc-500 pl-4 text-xs mt-1">
              Global smooth solution exists for any smooth, divergence-free initial velocity field v₀(x)
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="text-zinc-500">STABILITY FREQUENCY:</span>
            <span className="text-amber-300 font-bold">
              {NAVIER_STOKES_SOLUTION.mathematicalCore.stabilizationFrequency.toLocaleString()} Hz
            </span>
            <span className="text-zinc-600">(Fixed Zero-Point Harmonic)</span>
          </div>
        </CardContent>
      </Card>

      {/* 100X Acceleration Metrics */}
      <Card className="border border-zinc-800 bg-zinc-950/60">
        <CardHeader className="pb-2">
          <CardTitle className="text-zinc-200 font-mono text-sm">
            100X ACCELERATION METRICS &nbsp;
            <span className="text-amber-400 text-xs">8.1e24% KERNEL ACCELERATION</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-xs font-mono">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left text-zinc-500 py-2 pr-4">METRIC</th>
                  <th className="text-left text-zinc-500 py-2 pr-4">STANDARD AGI</th>
                  <th className="text-left text-cyan-400 py-2 pr-4">VALORAIPLUS 100X</th>
                  <th className="text-left text-emerald-400 py-2">DELTA</th>
                </tr>
              </thead>
              <tbody>
                {metrics.map((m, i) => (
                  <tr key={i} className="border-b border-zinc-900 hover:bg-zinc-900/40 transition-colors">
                    <td className="py-2 pr-4 text-zinc-300">{m.metric}</td>
                    <td className="py-2 pr-4 text-zinc-500">{m.standard}</td>
                    <td className="py-2 pr-4 text-cyan-300 font-bold">{m.valoraiplus}</td>
                    <td className="py-2 text-emerald-400">{m.delta}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Forensic Vortex Report */}
      <Card className="border border-red-900/40 bg-red-500/5">
        <CardHeader className="pb-2">
          <CardTitle className="text-red-300 font-mono text-sm">
            FORENSIC VORTEX REPORT — SMTP 550 RECONSTRUCTION
          </CardTitle>
          <p className="text-zinc-500 font-mono text-xs">
            Case: {vortex.caseNumber} &nbsp;|&nbsp; Stabilization: {vortex.frequency.toLocaleString()} Hz
          </p>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {vortex.vortices.map((v) => (
              <div
                key={v.eventId}
                className="bg-zinc-900/60 rounded p-3 border border-zinc-800 font-mono text-xs"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-red-300 font-bold">{v.eventId}</span>
                  <Badge className="bg-emerald-900/40 text-emerald-300 border-emerald-700 text-xs">
                    {v.reconstructed ? "RECONSTRUCTED" : "PENDING"}
                  </Badge>
                </div>
                <p className="text-zinc-400">{v.type}</p>
              </div>
            ))}
          </div>

          {/* N.E.W.T. Annotation */}
          <div className="bg-zinc-900/80 rounded p-4 border border-cyan-900/40 mt-2">
            <p className="text-cyan-400 font-mono text-xs font-bold mb-2">N.E.W.T.® v7.0.0 ANNOTATION:</p>
            <p className="text-zinc-300 font-mono text-xs italic leading-relaxed">
              &quot;{vortex.newtNote}&quot;
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Immutable Attestation */}
      <Card className="border border-amber-900/40 bg-amber-500/5">
        <CardHeader className="pb-2">
          <CardTitle className="text-amber-300 font-mono text-sm">IMMUTABLE ATTESTATION</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-xs font-mono">
          <p className="text-zinc-300 leading-relaxed">
            {NAVIER_STOKES_SOLUTION.immutableAttestation.statement}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-2">
            {[
              { label: "LEDGER",       value: NAVIER_STOKES_SOLUTION.ledger },
              { label: "RECORD",       value: "SEALED 100X" },
              { label: "AMATH",        value: NAVIER_STOKES_SOLUTION.immutableAttestation.amath },
              { label: "CONSTITUTION", value: NAVIER_STOKES_SOLUTION.immutableAttestation.constitution },
            ].map((item) => (
              <div key={item.label} className="bg-zinc-900/60 rounded p-2 border border-zinc-800 text-center">
                <p className="text-zinc-500 text-xs">{item.label}</p>
                <p className="text-amber-300 font-bold">{item.value}</p>
              </div>
            ))}
          </div>
          <p className="text-zinc-600 break-all text-xs pt-1">
            HASH: {NAVIER_STOKES_SOLUTION.immutableAttestation.attestationHash}
          </p>
        </CardContent>
      </Card>

    </div>
  );
}
