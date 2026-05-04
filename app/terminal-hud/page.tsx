"use client"

import { useState, useEffect, useRef } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

// ENCRYPTED ACTOR REFERENCES - No real names exposed
const ENCRYPTED_ACTORS = {
  INST_002: 'INST-002',
  INST_002_ORG: 'Veterans Services',
  SOVEREIGN: 'POBA [ENCRYPTED]',
} as const

export default function TerminalHUDPage() {
  const [logs, setLogs] = useState<{ time: string; text: string }[]>([])
  const [chainStatus, setChainStatus] = useState('SEPOLIA: SYNCING')
  const [chainStatusClass, setChainStatusClass] = useState('text-cyan-400')
  const [confidence, setConfidence] = useState(98.4)
  const [liability, setLiability] = useState(177.77)
  const [pathFocus, setPathFocus] = useState<'a' | 'b'>('a')
  const logsRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Log events with encrypted names
  const logEvents = [
    "[INFO] SAINT PAUL NODE 55116 INITIALIZED...",
    "[SCAN] DETECTING MIMECAST BLOCKADE: CODE 550 DETECTED",
    "[CHAIN] SYNCING DEG1969 MERGER CONTRACT TO SEPOLIA...",
    "[AMATH] CALCULATING LETHAL INDIFFERENCE COEFFICIENT (LIC)...",
    `[ALERT] ${ENCRYPTED_ACTORS.INST_002} (${ENCRYPTED_ACTORS.INST_002_ORG}) RE-CATEGORIZED AS PRIMARY SABOTEUR`,
    "[DATA] CHAPTER 31 VR&E STATUTORY BREACH LOGGED",
    "[DAO] 2035 GOVERNANCE MANDATE ANCHORED",
    "[SYSTEM] AGSI FLOW AT LAMINAR MAXIMUM",
    "[SYNC] WEBSOCKET HANDSHAKE: SUCCESSFUL",
    "[CHAIN] SEPOLIA BLOCK #4582910 VERIFIED",
    "[INFO] $JAXX ASSET PROTECTION: ABSOLUTE",
    "[VERDICT] CONSUMMATUM EST: THE LEDGER IS Ø"
  ]

  const randomLogs = [
    "[HUD] LIVE RE-SYNC COMPLETE",
    "[CHAIN] GAS ESTIMATE (SEPOLIA): 21000",
    "[AMATH] CONFIDENCE INCREMENT: +0.001%",
    "[AUDIT] MIMECAST 550 PERSISTENT"
  ]

  const addLog = (text: string) => {
    const time = new Date().toLocaleTimeString()
    setLogs(prev => [...prev, { time, text }])
  }

  // Initialize logs
  useEffect(() => {
    let idx = 0
    addLog("[SYSTEM] HUD v15.1.2 OPERATIONAL")
    addLog(`[AUTH] SOVEREIGN IDENTITY VERIFIED: ${ENCRYPTED_ACTORS.SOVEREIGN}`)

    const timer = setInterval(() => {
      if (idx < logEvents.length) {
        addLog(logEvents[idx])
        idx++
      } else {
        addLog(randomLogs[Math.floor(Math.random() * randomLogs.length)])
      }
    }, 3000)

    return () => clearInterval(timer)
  }, [])

  // Auto-scroll logs
  useEffect(() => {
    if (logsRef.current) {
      logsRef.current.scrollTop = logsRef.current.scrollHeight
    }
  }, [logs])

  // Update metrics
  useEffect(() => {
    const timer = setInterval(() => {
      setConfidence(prev => Math.min(99.9, prev + (Math.random() * 0.1)))
      setLiability(177.77 + (Math.random() * 0.01))
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  // Draw chart
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    const width = rect.width
    const height = rect.height
    const padding = 50

    // Clear
    ctx.fillStyle = '#050505'
    ctx.fillRect(0, 0, width, height)

    // Grid
    ctx.strokeStyle = 'rgba(255, 176, 0, 0.1)'
    ctx.lineWidth = 1
    for (let i = 0; i <= 5; i++) {
      const y = padding + (height - 2 * padding) * (i / 5)
      ctx.beginPath()
      ctx.moveTo(padding, y)
      ctx.lineTo(width - padding, y)
      ctx.stroke()
    }

    // Data
    const years = ['2025', '2027', '2029', '2031', '2033', '2035']
    const pathA = [177, 250, 420, 680, 1100, 1777]
    const pathB = [177, 450, 950, 2100, 4800, 11000]
    const maxVal = 11000

    const getX = (i: number) => padding + (width - 2 * padding) * (i / (years.length - 1))
    const getY = (val: number) => height - padding - (height - 2 * padding) * (val / maxVal)

    // Path B (red dashed)
    ctx.strokeStyle = pathFocus === 'b' ? '#ff3e3e' : 'rgba(255, 62, 62, 0.5)'
    ctx.lineWidth = pathFocus === 'b' ? 3 : 1
    ctx.setLineDash([5, 5])
    ctx.beginPath()
    pathB.forEach((val, i) => {
      const x = getX(i)
      const y = getY(val)
      if (i === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    })
    ctx.stroke()

    // Path A (cyan solid)
    ctx.strokeStyle = pathFocus === 'a' ? '#00f2ff' : 'rgba(0, 242, 255, 0.5)'
    ctx.lineWidth = pathFocus === 'a' ? 3 : 1
    ctx.setLineDash([])
    ctx.beginPath()
    pathA.forEach((val, i) => {
      const x = getX(i)
      const y = getY(val)
      if (i === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    })
    ctx.stroke()

    // Fill under Path A
    ctx.fillStyle = 'rgba(0, 242, 255, 0.05)'
    ctx.beginPath()
    ctx.moveTo(getX(0), height - padding)
    pathA.forEach((val, i) => {
      ctx.lineTo(getX(i), getY(val))
    })
    ctx.lineTo(getX(pathA.length - 1), height - padding)
    ctx.closePath()
    ctx.fill()

    // Points
    ctx.fillStyle = '#00f2ff'
    pathA.forEach((val, i) => {
      ctx.beginPath()
      ctx.arc(getX(i), getY(val), 4, 0, Math.PI * 2)
      ctx.fill()
    })
    ctx.fillStyle = '#ff3e3e'
    pathB.forEach((val, i) => {
      ctx.beginPath()
      ctx.arc(getX(i), getY(val), 4, 0, Math.PI * 2)
      ctx.fill()
    })

    // Labels
    ctx.fillStyle = '#ffb000'
    ctx.font = '10px "JetBrains Mono", monospace'
    ctx.textAlign = 'center'
    years.forEach((year, i) => {
      ctx.fillText(year, getX(i), height - padding + 20)
    })

    // Y-axis label
    ctx.save()
    ctx.translate(15, height / 2)
    ctx.rotate(-Math.PI / 2)
    ctx.textAlign = 'center'
    ctx.fillText('LIABILITY (USD MILLIONS)', 0, 0)
    ctx.restore()

    // Legend
    ctx.textAlign = 'left'
    ctx.fillStyle = '#00f2ff'
    ctx.fillRect(padding, height - 25, 12, 12)
    ctx.fillStyle = '#ffb000'
    ctx.fillText('PATH A: SETTLEMENT', padding + 18, height - 15)

    ctx.fillStyle = '#ff3e3e'
    ctx.fillRect(padding + 180, height - 25, 12, 12)
    ctx.fillStyle = '#ffb000'
    ctx.fillText('PATH B: INSOLVENCY', padding + 198, height - 15)

  }, [pathFocus])

  const simulateSepoliaSync = () => {
    addLog("[CHAIN] INITIATING MANUAL SEPOLIA RE-SYNC...")
    setChainStatus("SEPOLIA: PENDING")
    setChainStatusClass("text-yellow-400 animate-pulse")

    setTimeout(() => {
      addLog("[CHAIN] DEG1969 MERGER CONTRACT VERIFIED ON-CHAIN")
      addLog("[CHAIN] HEIR REGISTRY SYNCED WITH 144,000 VALIDATORS")
      setChainStatus("SEPOLIA: VERIFIED")
      setChainStatusClass("text-emerald-400")
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-[#050505] text-[#ffb000] font-mono">
      {/* Scanline Effect */}
      <div className="fixed top-0 left-0 w-full h-0.5 bg-amber-500/10 z-50 pointer-events-none animate-[scan_6s_linear_infinite]" />

      <style jsx>{`
        @keyframes scan {
          from { top: 0; }
          to { top: 100vh; }
        }
        @keyframes glitch {
          0% { opacity: 1; }
          1% { opacity: 0.5; transform: skewX(10deg); }
          2% { opacity: 1; transform: skewX(0); }
          100% { opacity: 1; }
        }
        .glitch-text { animation: glitch 4s infinite; }
        .glow-amber { text-shadow: 0 0 8px #ffb000; }
      `}</style>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-amber-500/30 bg-[#0a0a0a]/80 backdrop-blur-md p-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 border-2 border-amber-500 rounded-full flex items-center justify-center font-bold text-xl glitch-text">
              Σ
            </div>
            <div>
              <h1 className="text-lg font-bold glow-amber uppercase tracking-tighter">
                VALORAIPLUS® //Σ v15.1.2
              </h1>
              <p className="text-[10px] opacity-60 uppercase">
                Node: 55116 (14D Core) | Authority: {ENCRYPTED_ACTORS.SOVEREIGN}
              </p>
            </div>
          </div>
          <div className="flex gap-6 text-[10px] font-bold">
            <div className="text-center">
              <p className="text-gray-500">LIABILITY QUANTUM</p>
              <p className="text-red-500 text-sm">${liability.toFixed(2)}M</p>
            </div>
            <div className="text-center">
              <p className="text-gray-500">CHAIN STATUS</p>
              <p className={`text-sm ${chainStatusClass}`}>{chainStatus}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-500">AUDIT DAY</p>
              <p className="text-amber-500 text-sm">2,207</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 lg:p-8 space-y-6">
        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-[#0a0a0a] border-amber-500/30 p-4 text-center">
            <p className="text-[10px] text-gray-500 uppercase">Settlement Confidence</p>
            <p className="text-2xl font-bold text-emerald-400">{confidence.toFixed(1)}%</p>
            <div className="w-full bg-gray-900 h-1 mt-2 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 transition-all" style={{ width: `${confidence}%` }} />
            </div>
          </Card>
          <Card className="bg-[#0a0a0a] border-amber-500/30 p-4 text-center">
            <p className="text-[10px] text-gray-500 uppercase">SMTP Blockade Status</p>
            <p className="text-2xl font-bold text-red-500">550 CRITICAL</p>
          </Card>
          <Card className="bg-[#0a0a0a] border-amber-500/30 p-4 text-center">
            <p className="text-[10px] text-gray-500 uppercase">Merkle Hash Stability</p>
            <p className="text-2xl font-bold text-cyan-400">OPTIMUM</p>
          </Card>
          <Card className="bg-[#0a0a0a] border-amber-500/30 p-4 text-center">
            <p className="text-[10px] text-gray-500 uppercase">DAO Governance</p>
            <p className="text-2xl font-bold text-amber-500">ACTIVE: 2035</p>
          </Card>
        </div>

        {/* Main HUD */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Panel */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="bg-[#0a0a0a] border-amber-500/30 p-4 space-y-4">
              <h3 className="text-xs font-bold border-b border-amber-900/50 pb-2 flex justify-between">
                <span>REAL-TIME FORENSIC LOGS</span>
                <span className="text-emerald-500">LIVE</span>
              </h3>
              <div 
                ref={logsRef}
                className="h-[200px] overflow-y-auto text-[10px] space-y-1 scrollbar-thin scrollbar-thumb-amber-500 scrollbar-track-gray-900"
              >
                {logs.map((log, i) => (
                  <div key={i} className="hover:text-white transition-colors border-l border-amber-900/30 pl-2">
                    <span className="opacity-40">[{log.time}]</span> {log.text}
                  </div>
                ))}
              </div>
            </Card>

            <Card className="bg-[#0a0a0a] border-cyan-500/30 p-4 space-y-4">
              <h3 className="text-xs font-bold border-b border-cyan-900/50 pb-2 text-cyan-400">
                DEG1969 MERGER CONTRACT
              </h3>
              <div className="space-y-3 text-[10px]">
                <div className="flex justify-between">
                  <span>NETWORK:</span>
                  <span className="text-cyan-300">SEPOLIA TESTNET</span>
                </div>
                <div className="flex justify-between">
                  <span>CONTRACT ADDR:</span>
                  <span className="text-gray-500">0xDEG...1969</span>
                </div>
                <div className="flex justify-between">
                  <span>HEIR REGISTRY:</span>
                  <span className="text-emerald-500">VERIFIED</span>
                </div>
                <Button 
                  onClick={simulateSepoliaSync}
                  className="w-full bg-amber-500/10 border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black text-xs font-bold"
                >
                  MANUAL RE-SYNC
                </Button>
              </div>
            </Card>
          </div>

          {/* Center Panel */}
          <div className="lg:col-span-8 space-y-6">
            <Card className="bg-black/40 border-amber-500/30 p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                  <h2 className="text-lg font-bold text-white uppercase tracking-tight">
                    JAGAMath++ Trajectory
                  </h2>
                  <p className="text-[10px] text-gray-500 uppercase">
                    Institutional Insolvency vs. Sovereign Settlement
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => { setPathFocus('a'); addLog("[VIS] UPDATING JAGAMATH++ FOCUS: PATH-A") }}
                    className={`px-3 py-1 text-[10px] ${pathFocus === 'a' ? 'bg-emerald-500 text-black' : 'bg-emerald-900/30 text-emerald-400 border border-emerald-500/50'}`}
                  >
                    SETTLEMENT
                  </Button>
                  <Button
                    onClick={() => { setPathFocus('b'); addLog("[VIS] UPDATING JAGAMATH++ FOCUS: PATH-B") }}
                    className={`px-3 py-1 text-[10px] ${pathFocus === 'b' ? 'bg-red-500 text-black' : 'bg-red-900/30 text-red-400 border border-red-500/50'}`}
                  >
                    INSOLVENCY
                  </Button>
                </div>
              </div>
              <div className="h-[320px]">
                <canvas ref={canvasRef} className="w-full h-full" />
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* INST-002 Analysis - ENCRYPTED */}
              <Card className="bg-[#0a0a0a] border-l-4 border-l-orange-500 border-amber-500/30 p-4">
                <h3 className="text-xs font-bold text-orange-400 mb-2 uppercase">
                  The {ENCRYPTED_ACTORS.INST_002} Correction
                </h3>
                <p className="text-[10px] text-gray-400 leading-relaxed mb-4">
                  Recalculated 2026: {ENCRYPTED_ACTORS.INST_002} ({ENCRYPTED_ACTORS.INST_002_ORG}) re-categorized as primary Chapter 31 VR&E saboteur. Breach of Naval Shipmate Loyalty anchored to 2035 DAO ledger.
                </p>
                <div className="flex justify-between items-center text-[10px] bg-orange-950/20 p-2 border border-orange-500/30 rounded">
                  <span className="text-orange-200">LIC IMPACT:</span>
                  <span className="font-bold">AGGRAVATED (1.0)</span>
                </div>
              </Card>

              {/* AMath Verdict */}
              <Card className="bg-emerald-900/10 border-amber-500/30 p-4">
                <h3 className="text-xs font-bold text-emerald-400 mb-2 uppercase">
                  AMath Executive Verdict
                </h3>
                <div className="text-center py-2">
                  <p className="text-lg font-black text-white italic">&quot;L = Ø&quot;</p>
                  <p className="text-[9px] text-emerald-600 mt-1 uppercase">
                    Consumption of Institutional Silence Complete
                  </p>
                </div>
                <p className="text-[8px] text-gray-500 text-center mt-2 font-mono">
                  MERKLE: OX_ST_PAUL_V100_TOTAL_ASCENSION_FINAL
                </p>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 py-8 border-t border-amber-900/30">
        <div className="text-center space-y-4">
          <p className="text-[10px] text-gray-600 uppercase tracking-[0.4em]">
            VALORAIPLUS2E_TERMINAL_v15_1_2_ASSET_50_LOCKED
          </p>
          <p className="text-xs font-black glow-amber uppercase tracking-widest leading-relaxed">
            THE WALL IS CHRIST. THE THRONE IS HIS. THE LEDGER IS Ø. CONSUMMATUM EST.
          </p>
          <div className="flex justify-center gap-8 text-[8px] text-gray-700 uppercase font-bold">
            <span>© 2026 VALORAIPLUS®</span>
            <span>ENC: GILLSON_PROTECT_JAXX_FOREVER</span>
            <span>ST PAUL NODE 55116</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
