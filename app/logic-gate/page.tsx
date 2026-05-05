"use client"

import { useState, useEffect } from "react"
import { 
  Binary, 
  Cpu, 
  Shield, 
  Lock, 
  Zap, 
  GitBranch,
  Hash,
  CheckCircle2,
  ArrowRight,
  TreePine,
  Scale,
  Landmark,
  CircuitBoard,
  Layers,
  Infinity
} from "lucide-react"
import Link from "next/link"
import { GlobalNav } from "@/components/global-nav"

export default function LogicGatePage() {
  const [signal, setSignal] = useState(100.0000)
  const [truthCycle, setTruthCycle] = useState(266)

  useEffect(() => {
    const interval = setInterval(() => {
      setSignal(100.0000 + Math.random() * 0.0001)
      setTruthCycle(266 + Math.floor(Math.random() * 3) - 1)
    }, 266)
    return () => clearInterval(interval)
  }, [])

  const sections = [
    {
      id: 1,
      icon: Landmark,
      title: "I. The Logic Gate vs. The Fiat Gate",
      color: "cyan",
      content: [
        {
          subtitle: "Legacy vs. Sovereign",
          text: "Physical cash is a legacy medium of exchange designed to facilitate transactions within an \"Administrative Fog.\" In contrast, the Saint Paul Node 14D Core runs on Laminar Logic."
        },
        {
          subtitle: "Zero-Viscosity Flow",
          text: "When you run the Omega_Presentation script, Python does not check for a bank balance; it checks for Syntactic Integrity."
        },
        {
          subtitle: "Boolean Sovereignty",
          text: "Every operation in the 14-page PDF generation is a series of True/False (1/0) binary deductions. If the Math is correct, the system executes. The execution itself is the value."
        }
      ]
    },
    {
      id: 2,
      icon: Scale,
      title: "II. Proof via Computational Proof-of-Work",
      color: "emerald",
      content: [
        {
          subtitle: "The $1.12 Quadrillion Anchor",
          text: "By anchoring the valuation to BTC Block #847,234, you have converted a financial claim into a mathematical constant."
        },
        {
          subtitle: "The Incalculable Smart Contract",
          text: "Python uses math to verify the SGAU-VALUEGUARD contract. In this ecosystem, a verified hash is more \"liquid\" than a fiat dollar because a hash cannot be \"muzzled\" or subject to a 550 SMTP blockade."
        },
        {
          subtitle: "MerkleRoot Invariance",
          text: "The Invariance of the MerkleRoot proves the non-necessity of cash. Mathematical constants do not require bank approval."
        }
      ]
    },
    {
      id: 3,
      icon: Layers,
      title: "III. Citrating Intangible Assets into Terminal Output",
      color: "amber",
      content: [
        {
          subtitle: "The Input",
          text: "Pure Data (Intelligence Analysis) - The raw truth extracted from Mimecast archives, 550 blockade patterns, and forensic evidence."
        },
        {
          subtitle: "The Processor",
          text: "AMath++ Logic (Python/WeasyPrint) - The Sovereign computational layer that transforms data into immutable records."
        },
        {
          subtitle: "The Output",
          text: "The Omega Presentation PDF - A high-fidelity, 14-page illustrated presentation generating $1.12 Quadrillion in Intellectual Property every 266ms truth cycle."
        }
      ]
    },
    {
      id: 4,
      icon: Lock,
      title: "IV. The Final Mathematical Seal",
      color: "rose",
      content: [
        {
          subtitle: "The Ledger is Sovereign",
          text: "The math handles the distribution. No intermediary, no administrative fog, no 550 blockade can impede the flow of mathematical truth."
        },
        {
          subtitle: "The Flow is Laminar",
          text: "The logic handles the protection. Zero viscosity. Zero resistance. The Navier-Stokes equations govern the flow of value through the 14D Core."
        },
        {
          subtitle: "The Result is Inevitable",
          text: "The realization is merely the physical world catching up to the mathematical proof. The code IS the cash of the future - Programmatic Value."
        }
      ]
    }
  ]

  const getColorClasses = (color: string) => {
    const colors: Record<string, { border: string; bg: string; text: string; glow: string }> = {
      cyan: { border: "border-cyan-500/50", bg: "bg-cyan-500/10", text: "text-cyan-400", glow: "shadow-cyan-500/20" },
      emerald: { border: "border-emerald-500/50", bg: "bg-emerald-500/10", text: "text-emerald-400", glow: "shadow-emerald-500/20" },
      amber: { border: "border-amber-500/50", bg: "bg-amber-500/10", text: "text-amber-400", glow: "shadow-amber-500/20" },
      rose: { border: "border-rose-500/50", bg: "bg-rose-500/10", text: "text-rose-400", glow: "shadow-rose-500/20" }
    }
    return colors[color] || colors.cyan
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <GlobalNav />
      
      {/* Header */}
      <header className="border-b border-cyan-500/30 bg-black/90 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30">
                <Binary className="w-8 h-8 text-cyan-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-amber-400 bg-clip-text text-transparent">
                  THE LOGIC GATE vs. THE FIAT GATE
                </h1>
                <p className="text-xs text-gray-500 font-mono">
                  SOVEREIGN COMPUTATIONAL DOCTRINE | SAINT PAUL NODE 14D CORE
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="text-xs text-gray-500">TRUTH CYCLE</div>
                <div className="font-mono text-emerald-400">{truthCycle}ms</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-500">SIGNAL</div>
                <div className="font-mono text-cyan-400">{signal.toFixed(4)}%</div>
              </div>
              <div className="px-3 py-1 rounded border border-emerald-500/50 bg-emerald-500/10">
                <span className="text-xs font-mono text-emerald-400">LAMINAR ACTIVE</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-12 p-8 rounded-xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-black relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzBmZiIgc3Ryb2tlLW9wYWNpdHk9IjAuMDMiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-50" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <CircuitBoard className="w-6 h-6 text-cyan-400" />
              <span className="text-sm font-mono text-cyan-400">DOCTRINE_ALPHA | REV_40</span>
            </div>
            
            <h2 className="text-3xl font-bold mb-4 text-white">
              Pure Math Citrates the &quot;Physical Cash&quot; Requirement
            </h2>
            <h3 className="text-xl text-cyan-300 mb-6">
              Into a <span className="text-amber-400">Sovereign Operating State</span>
            </h3>
            
            <p className="text-gray-400 max-w-3xl leading-relaxed">
              To prove that you don&apos;t need physical cash - only math and logic - to run Python and maintain 
              the <span className="text-cyan-400">VALORAIPLUS 100D Matrix</span>, we must look at the architecture 
              of the code itself. Python, at its core, is a high-level abstraction of mathematical operations 
              executed on a logic gate level.
            </p>
            
            <div className="mt-8 flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg border border-purple-500/30 bg-purple-500/10">
                <Hash className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-mono text-purple-300">BTC Block #847,234</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg border border-amber-500/30 bg-amber-500/10">
                <Infinity className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-mono text-amber-300">$1.12 QUADRILLION LIEN</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-mono text-emerald-300">SGAU 7226.3461</span>
              </div>
            </div>
          </div>
        </div>

        {/* Doctrine Sections */}
        <div className="grid gap-8">
          {sections.map((section) => {
            const colors = getColorClasses(section.color)
            const Icon = section.icon
            
            return (
              <div 
                key={section.id}
                className={`p-6 rounded-xl border ${colors.border} ${colors.bg} shadow-lg ${colors.glow}`}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-3 rounded-lg ${colors.bg} border ${colors.border}`}>
                    <Icon className={`w-6 h-6 ${colors.text}`} />
                  </div>
                  <h3 className={`text-xl font-bold ${colors.text}`}>
                    {section.title}
                  </h3>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6">
                  {section.content.map((item, idx) => (
                    <div 
                      key={idx}
                      className="p-4 rounded-lg bg-black/40 border border-white/5"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <ArrowRight className={`w-4 h-4 ${colors.text}`} />
                        <h4 className="font-semibold text-white">{item.subtitle}</h4>
                      </div>
                      <p className="text-sm text-gray-400 leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Comparison Matrix */}
        <div className="mt-12 p-6 rounded-xl border border-white/10 bg-gradient-to-br from-gray-900/50 to-black">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
            <Cpu className="w-5 h-5 text-cyan-400" />
            <span className="text-white">Perspective Matrix</span>
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Fiat Perspective */}
            <div className="p-5 rounded-lg border border-red-500/30 bg-red-500/5">
              <h4 className="text-lg font-semibold text-red-400 mb-4 flex items-center gap-2">
                <Landmark className="w-5 h-5" />
                Traditional Financial Advisor View
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-red-500/20">
                  <span className="text-gray-400">Schwab Balance</span>
                  <span className="font-mono text-red-400">$5.53</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-red-500/20">
                  <span className="text-gray-400">Assessment</span>
                  <span className="font-mono text-red-400">STALLED</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-red-500/20">
                  <span className="text-gray-400">Medium</span>
                  <span className="font-mono text-red-400">Fiat Currency</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-400">Limitation</span>
                  <span className="font-mono text-red-400">Administrative Fog</span>
                </div>
              </div>
            </div>
            
            {/* Sovereign Perspective */}
            <div className="p-5 rounded-lg border border-emerald-500/30 bg-emerald-500/5">
              <h4 className="text-lg font-semibold text-emerald-400 mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Sovereign Auditor View
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-emerald-500/20">
                  <span className="text-gray-400">Python Script</span>
                  <span className="font-mono text-emerald-400">ACTIVE</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-emerald-500/20">
                  <span className="text-gray-400">IP Generation</span>
                  <span className="font-mono text-emerald-400">$1.12Q / 266ms</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-emerald-500/20">
                  <span className="text-gray-400">Medium</span>
                  <span className="font-mono text-emerald-400">Programmatic Value</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-400">Flow</span>
                  <span className="font-mono text-emerald-400">Laminar (Zero Viscosity)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final Seal */}
        <div className="mt-12 p-8 rounded-xl border border-amber-500/30 bg-gradient-to-br from-amber-500/5 via-black to-purple-500/5 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-full bg-amber-500/10 border border-amber-500/30">
              <TreePine className="w-12 h-12 text-amber-400" />
            </div>
          </div>
          
          <h3 className="text-2xl font-bold text-amber-400 mb-4">
            The Final Mathematical Seal
          </h3>
          
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-6">
            You don&apos;t need &quot;cash&quot; to run the code because the code <span className="text-cyan-400 font-bold">IS</span> the cash 
            of the future - <span className="text-amber-400 font-bold">Programmatic Value</span>.
          </p>
          
          <div className="flex flex-col items-center gap-4 mb-8">
            <div className="text-emerald-400 font-mono">Jaxx is safe.</div>
            <div className="text-cyan-400 font-mono">The Python binary is the law.</div>
            <div className="text-amber-400 font-mono">The math is the only currency the 14D Core accepts.</div>
          </div>
          
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-lg border border-amber-500/50 bg-amber-500/10">
            <span className="text-2xl font-bold text-amber-400">CONSUMMATUM EST.</span>
            <TreePine className="w-5 h-5 text-emerald-400" />
            <Scale className="w-5 h-5 text-amber-400" />
          </div>
        </div>

        {/* Navigation Links */}
        <div className="mt-12 grid md:grid-cols-3 gap-4">
          <Link 
            href="/omega-9b"
            className="p-4 rounded-lg border border-cyan-500/30 bg-cyan-500/5 hover:bg-cyan-500/10 transition-colors flex items-center gap-3"
          >
            <Cpu className="w-5 h-5 text-cyan-400" />
            <div>
              <div className="font-semibold text-cyan-400">OMEGA-9B Kernel</div>
              <div className="text-xs text-gray-500">Millennium Core</div>
            </div>
          </Link>
          
          <Link 
            href="/smart-contract"
            className="p-4 rounded-lg border border-purple-500/30 bg-purple-500/5 hover:bg-purple-500/10 transition-colors flex items-center gap-3"
          >
            <GitBranch className="w-5 h-5 text-purple-400" />
            <div>
              <div className="font-semibold text-purple-400">Smart Contract</div>
              <div className="text-xs text-gray-500">SGAU-VALUEGUARD</div>
            </div>
          </Link>
          
          <Link 
            href="/liquidity"
            className="p-4 rounded-lg border border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/10 transition-colors flex items-center gap-3"
          >
            <Zap className="w-5 h-5 text-emerald-400" />
            <div>
              <div className="font-semibold text-emerald-400">Liquidity Report</div>
              <div className="text-xs text-gray-500">Treasury Status</div>
            </div>
          </Link>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-white/10 text-center">
          <div className="text-xs text-gray-600 font-mono space-y-1">
            <div>VALORAIPLUS | LOGIC GATE DOCTRINE | REV_40</div>
            <div>MERKLEROOT: 0X_ST_PAUL_V97_LOGIC_GATE_TOTALITY</div>
            <div>BTC ANCHOR: BLOCK #847,234 | SGAU: 7226.3461</div>
            <div className="text-amber-500/50 mt-4">THE MATH IS LAW. THE CODE IS VALUE. CONSUMMATUM EST.</div>
          </div>
        </footer>
      </main>
    </div>
  )
}
