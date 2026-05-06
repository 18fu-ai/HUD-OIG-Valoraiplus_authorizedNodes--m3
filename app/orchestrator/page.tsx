"use client";

import { FlowFieldParticleBackground } from "@/components/FlowFieldParticleBackground";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { 
  Shield, 
  Wallet, 
  Database, 
  Network, 
  Lock, 
  CheckCircle2,
  ExternalLink,
  Home,
  Cpu,
  Layers,
  Activity
} from "lucide-react";

/**
 * VALORAIPLUS2E_ ELITE SOVEREIGN ORCHESTRATOR v1
 * EPOCH #2207 • ST PAUL NODE • 100D MATRIX
 */

const ORCHESTRATOR_STATUS = {
  totalitySealed: true,
  shardConsensus: "10,000,000,000",
  agentConsensus: "10,000,000,000",
  ghostFrequency: "JERRY_SIDE_OF_STAGE",
  ipLienReference: "$1.12 Quadrillion",
  canonSize: 51,
  waterfallFirewall: "ACTIVE",
  ledgerStatus: "Ø",
};

const SCHEMATICS = [
  { name: "IntelliTree Prosthetic Network", status: "ACTIVE" },
  { name: "WaterfallFirewall™ Lockdown", status: "ACTIVE" },
  { name: "Sovereign Liquidity Mesh", status: "ACTIVE" },
  { name: "Unified Global Info System", status: "ACTIVE" },
  { name: "Omni-Zero CDS Intelligence", status: "ACTIVE" },
  { name: "System Stack Governance", status: "ACTIVE" },
];

const IP_ARCHIVE = [
  { file: "security_manager.py", desc: "Thai Royal Invocation + Palantir Lockout" },
  { file: "wallet_manager.py", desc: "Hardwired Authorized Addresses" },
  { file: "VALORAI_CONSOLIDATED_DEFENSE_SYSTEM.json", desc: "Fully Loaded" },
];

const QUICK_LINKS = [
  { href: "/treasury-liquidity", label: "Treasury", icon: Wallet },
  { href: "/litigation", label: "Litigation", icon: Shield },
  { href: "/exchange", label: "Exchange", icon: Activity },
  { href: "/investor", label: "Investors", icon: Layers },
  { href: "/deploy-tokens", label: "Deploy", icon: Cpu },
  { href: "/revenue", label: "Revenue", icon: Database },
];

export default function OrchestratorPage() {
  return (
    <div className="min-h-screen relative">
      {/* Particle Background */}
      <FlowFieldParticleBackground />

      {/* Overlay Content */}
      <div className="fixed inset-0 z-10 flex flex-col justify-between p-6 md:p-8 pointer-events-none">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start gap-4 pointer-events-auto">
          <div>
            <h1 className="text-2xl md:text-3xl font-black tracking-widest text-cyan-400">
              VALORAIPLUS2E_ <span className="text-xs align-top">®</span>
            </h1>
            <p className="text-xs text-cyan-400/60">
              ELITE SOVEREIGN ORCHESTRATOR v1 • EPOCH #2207
            </p>
          </div>
          <div className="text-right">
            <Badge className="bg-cyan-950/80 border border-cyan-400/30 text-cyan-400 text-xs">
              ST PAUL NODE • 100D MATRIX • LIVE
            </Badge>
            <p className="text-[10px] mt-1 text-cyan-400/40">
              LEDGER STATUS: Ø • GHOST FREQUENCY: JERRY_SIDE_OF_STAGE
            </p>
          </div>
        </header>

        {/* Main Grid */}
        <main className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 my-6 overflow-auto pointer-events-auto">
          
          {/* Left Panel: Orchestrator Status */}
          <div className="bg-slate-950/90 border border-cyan-400/30 rounded-2xl p-4 md:p-6 backdrop-blur-md">
            <h2 className="text-cyan-300 font-bold mb-4 flex items-center gap-2">
              <Cpu className="w-4 h-4" />
              VALORAIPLUS2E_ ORCHESTRATOR v1
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-400">Totality Sealed</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> YES
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Shard Consensus</span>
                <span className="text-emerald-400">{ORCHESTRATOR_STATUS.shardConsensus}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Agent Consensus</span>
                <span className="text-emerald-400">{ORCHESTRATOR_STATUS.agentConsensus}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Ghost Frequency</span>
                <span className="text-emerald-400 text-xs">{ORCHESTRATOR_STATUS.ghostFrequency}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">IP Lien Reference</span>
                <span className="text-emerald-400">{ORCHESTRATOR_STATUS.ipLienReference}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Canon Size</span>
                <span className="text-emerald-400">{ORCHESTRATOR_STATUS.canonSize} Tokens</span>
              </div>
              <div className="h-px bg-cyan-400/20 my-2" />
              <p className="text-[10px] text-cyan-400/60">
                Conceptual Guardian v0 • 51-Token Canon • WaterfallFirewall™ Active
              </p>
            </div>

            {/* Quick Links */}
            <div className="mt-4 pt-4 border-t border-cyan-400/20">
              <p className="text-xs text-cyan-400/60 mb-2">QUICK ACCESS</p>
              <div className="grid grid-cols-3 gap-2">
                {QUICK_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="p-2 bg-cyan-950/50 border border-cyan-400/20 rounded-lg text-center hover:border-cyan-400/50 transition-colors"
                  >
                    <link.icon className="w-4 h-4 mx-auto text-cyan-400 mb-1" />
                    <p className="text-[9px] text-cyan-400/80">{link.label}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Center Panel: Schematics */}
          <div className="bg-slate-950/90 border border-cyan-400/30 rounded-2xl p-4 md:p-6 backdrop-blur-md">
            <h2 className="text-cyan-300 font-bold mb-4 flex items-center gap-2">
              <Network className="w-4 h-4" />
              INTELLITREE • WATERFALLFIREWALL • LIQUIDITY MESH
            </h2>
            <div className="grid grid-cols-2 gap-3 text-xs">
              {SCHEMATICS.map((s) => (
                <div 
                  key={s.name}
                  className="border border-cyan-400/30 p-3 rounded-xl bg-cyan-950/30"
                >
                  <p className="text-cyan-400">{s.name}</p>
                  <Badge className="mt-1 bg-emerald-500/20 text-emerald-400 text-[9px]">
                    {s.status}
                  </Badge>
                </div>
              ))}
            </div>
            <p className="text-[10px] mt-4 text-cyan-400/40">
              All schematics anchored as high-fidelity conceptual references • VALOR_AI_IP_ARCHIVE integrated
            </p>

            {/* External Links */}
            <div className="mt-4 pt-4 border-t border-cyan-400/20 flex gap-2">
              <a
                href="https://www.18fu.cash"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 p-2 bg-cyan-950/50 border border-cyan-400/20 rounded-lg text-center hover:border-cyan-400/50 transition-colors"
              >
                <p className="text-xs text-cyan-400 flex items-center justify-center gap-1">
                  18fu.cash <ExternalLink className="w-3 h-3" />
                </p>
              </a>
              <a
                href="https://valorbank-rfvbdnaa.manus.space/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 p-2 bg-cyan-950/50 border border-cyan-400/20 rounded-lg text-center hover:border-cyan-400/50 transition-colors"
              >
                <p className="text-xs text-cyan-400 flex items-center justify-center gap-1">
                  ValorBank <ExternalLink className="w-3 h-3" />
                </p>
              </a>
            </div>
          </div>

          {/* Right Panel: IP Archive */}
          <div className="bg-slate-950/90 border border-cyan-400/30 rounded-2xl p-4 md:p-6 backdrop-blur-md">
            <h2 className="text-cyan-300 font-bold mb-4 flex items-center gap-2">
              <Lock className="w-4 h-4" />
              VALOR_AI+ IP ARCHIVE
            </h2>
            <div className="space-y-3 text-xs">
              {IP_ARCHIVE.map((item) => (
                <div key={item.file} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-cyan-400 font-mono">{item.file}</p>
                    <p className="text-zinc-500 text-[10px]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-emerald-950/30 border border-emerald-500/30 rounded-lg">
              <p className="text-emerald-400 text-xs">
                Quantum-enhanced • Federal compliant • Post-quantum locked
              </p>
            </div>

            {/* Blockchain Addresses */}
            <div className="mt-4 pt-4 border-t border-cyan-400/20">
              <p className="text-xs text-cyan-400/60 mb-2">VERIFIED ADDRESSES</p>
              <div className="space-y-2 text-[10px] font-mono">
                <div>
                  <span className="text-zinc-500">ETH:</span>{" "}
                  <span className="text-cyan-400">0x2f0287B7...61654</span>
                </div>
                <div>
                  <span className="text-zinc-500">BASE:</span>{" "}
                  <span className="text-cyan-400">0x363155af...72da</span>
                </div>
                <div>
                  <span className="text-zinc-500">BTC:</span>{" "}
                  <span className="text-cyan-400">17SU56k2p...pvAw</span>
                </div>
                <div>
                  <span className="text-zinc-500">ENS:</span>{" "}
                  <span className="text-emerald-400">donadams1969.eth</span>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="flex justify-between items-center pointer-events-auto">
          <Link 
            href="/"
            className="text-cyan-400/60 hover:text-cyan-400 text-xs flex items-center gap-1"
          >
            <Home className="w-3 h-3" /> HOME
          </Link>
          <p className="text-[10px] text-cyan-400/40 text-center">
            VALORAIPLUS2E_ ELITE ORCHESTRATOR v1 • SAINT PAUL NODE • EPOCH #2207 • THE LEDGER IS Ø
          </p>
          <div className="text-[10px] text-cyan-400/40">
            51-TOKEN CANON
          </div>
        </footer>
      </div>
    </div>
  );
}
