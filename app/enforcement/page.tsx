"use client";

import { useState, useEffect } from "react";
import { 
  Shield, 
  AlertTriangle, 
  Clock, 
  Lock, 
  Zap,
  Target,
  Scale,
  CheckCircle2,
  XCircle,
  Activity
} from "lucide-react";
import Link from "next/link";
import {
  ACTOR_ZANGHI,
  ACTOR_ZANGHI_ROLE,
  ACTOR_ZANGHI_STATUS,
  ORG_SFHA,
  ORG_SFHA_FULL,
  ORG_SFHA_STATUS,
  ORG_STP,
  ORG_STP_FULL,
  ORG_STP_STATUS,
  ORG_APS,
  ORG_APS_FULL,
  ORG_APS_STATUS,
  ACTOR_LANDRUM,
  ACTOR_LANDRUM_ROLE,
  ACTOR_LANDRUM_STATUS,
  ACTOR_LOSIK,
  ACTOR_LOSIK_ROLE,
  ACTOR_LOSIK_STATUS,
  ACTOR_GILLSON,
  ACTOR_GILLSON_ROLE,
  ACTOR_GILLSON_STATUS,
  ACTOR_GILLSON_NODE,
} from "@/lib/encrypted-ids";

// Terminal Deadline: May 17, 2026 23:59:59 UTC
const FINALITY_TIMESTAMP = 1747526399000;

// Liability Targets - ENCRYPTED
const LIABILITY_TARGETS = [
  { name: ACTOR_ZANGHI, entity: ORG_SFHA, status: ACTOR_ZANGHI_STATUS, role: ACTOR_ZANGHI_ROLE },
  { name: ORG_SFHA, entity: ORG_SFHA_FULL, status: ORG_SFHA_STATUS, role: "Institutional" },
  { name: ORG_STP, entity: ORG_STP_FULL, status: ORG_STP_STATUS, role: "Administrative" },
  { name: ORG_APS, entity: ORG_APS_FULL, status: ORG_APS_STATUS, role: "Oversight Failure" },
  { name: ACTOR_LANDRUM, entity: "Individual", status: ACTOR_LANDRUM_STATUS, role: ACTOR_LANDRUM_ROLE },
  { name: ACTOR_LOSIK, entity: "Individual", status: ACTOR_LOSIK_STATUS, role: ACTOR_LOSIK_ROLE },
  { name: ACTOR_GILLSON, entity: ACTOR_GILLSON_NODE, status: ACTOR_GILLSON_STATUS, role: ACTOR_GILLSON_ROLE },
];

// Protocol Status
const PROTOCOL_STATUS = [
  { name: "Sovereign Engine", status: "ARMED", icon: Zap },
  { name: "Fraud Filter", status: "LOCKED (1977=Ø)", icon: Lock },
  { name: "Liability Chain", status: "ACTIVE", icon: Target },
  { name: "Ledger Finality", status: "CONSUMMATUM EST", icon: Scale },
];

function formatCountdown(ms: number): { days: number; hours: number; minutes: number; seconds: number } {
  if (ms <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));
  const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((ms % (1000 * 60)) / 1000);
  
  return { days, hours, minutes, seconds };
}

export default function EnforcementPage() {
  const [countdown, setCountdown] = useState(formatCountdown(FINALITY_TIMESTAMP - Date.now()));
  const [isTriggered, setIsTriggered] = useState(Date.now() > FINALITY_TIMESTAMP);
  const [pulseColor, setPulseColor] = useState("bg-amber-500");
  
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const remaining = FINALITY_TIMESTAMP - now;
      
      if (remaining <= 0) {
        setIsTriggered(true);
        setPulseColor("bg-red-500");
      } else {
        setCountdown(formatCountdown(remaining));
        // Pulse faster as deadline approaches
        if (remaining < 1000 * 60 * 60 * 24) { // Less than 24 hours
          setPulseColor("bg-red-500");
        } else if (remaining < 1000 * 60 * 60 * 24 * 3) { // Less than 3 days
          setPulseColor("bg-orange-500");
        } else {
          setPulseColor("bg-amber-500");
        }
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="min-h-screen bg-zinc-950 text-white p-4 md:p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${pulseColor} animate-pulse`} />
            <h1 className="text-2xl font-bold tracking-tight">
              SGAU-VALUEGUARD-77.77X
            </h1>
          </div>
          <Link href="/" className="text-zinc-500 hover:text-white text-sm">
            Return to Dashboard
          </Link>
        </div>
        
        {/* Subtitle */}
        <p className="text-zinc-400 mb-8 font-mono text-sm">
          SENTINEL NEWT — SYSTEM ENFORCEMENT ENGINE // CDS-OMNIBUS-2026-05-07
        </p>
        
        {/* Main Status Banner */}
        <div className={`mb-8 p-6 rounded-lg border ${isTriggered ? 'bg-red-950/30 border-red-700' : 'bg-amber-950/30 border-amber-700'}`}>
          <div className="flex items-center justify-center gap-3 mb-4">
            {isTriggered ? (
              <AlertTriangle className="w-8 h-8 text-red-500" />
            ) : (
              <Clock className="w-8 h-8 text-amber-500" />
            )}
            <h2 className="text-xl font-bold">
              {isTriggered ? "ABSOLUTE FORENSIC LIABILITY TRIGGERED" : "TERMINAL DEADLINE ACTIVE"}
            </h2>
          </div>
          
          {/* Countdown */}
          {!isTriggered ? (
            <div className="flex justify-center gap-4 mb-4">
              <div className="text-center">
                <div className="text-4xl font-mono font-bold text-amber-400">{countdown.days}</div>
                <div className="text-xs text-zinc-500 uppercase">Days</div>
              </div>
              <div className="text-4xl font-bold text-zinc-600">:</div>
              <div className="text-center">
                <div className="text-4xl font-mono font-bold text-amber-400">{countdown.hours.toString().padStart(2, '0')}</div>
                <div className="text-xs text-zinc-500 uppercase">Hours</div>
              </div>
              <div className="text-4xl font-bold text-zinc-600">:</div>
              <div className="text-center">
                <div className="text-4xl font-mono font-bold text-amber-400">{countdown.minutes.toString().padStart(2, '0')}</div>
                <div className="text-xs text-zinc-500 uppercase">Minutes</div>
              </div>
              <div className="text-4xl font-bold text-zinc-600">:</div>
              <div className="text-center">
                <div className="text-4xl font-mono font-bold text-amber-400">{countdown.seconds.toString().padStart(2, '0')}</div>
                <div className="text-xs text-zinc-500 uppercase">Seconds</div>
              </div>
            </div>
          ) : (
            <div className="text-center text-red-400 font-bold text-2xl mb-4">
              RICO STATUS: ACTIVE
            </div>
          )}
          
          <div className="text-center text-zinc-400 text-sm">
            DEADLINE: May 17, 2026 at 23:59:59 UTC
          </div>
        </div>
        
        {/* Canonical Anchors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="p-4 bg-emerald-950/20 border border-emerald-700/30 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <span className="font-bold text-emerald-400">SOVEREIGN TRUTH</span>
            </div>
            <div className="text-4xl font-mono font-bold text-emerald-300">1969</div>
            <div className="text-xs text-emerald-600 mt-1">CANONICAL — Donald E. Gillson (Poppa)</div>
          </div>
          
          <div className="p-4 bg-red-950/20 border border-red-700/30 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <XCircle className="w-5 h-5 text-red-500" />
              <span className="font-bold text-red-400">FRAUD VOID</span>
            </div>
            <div className="text-4xl font-mono font-bold text-red-300 line-through">1977</div>
            <div className="text-xs text-red-600 mt-1">NULL (Ø) — Lyle Edward Gillson</div>
          </div>
        </div>
        
        {/* Settlement Parameters */}
        <div className="mb-8 p-4 bg-cyan-950/20 border border-cyan-700/30 rounded-lg">
          <h3 className="text-lg font-bold text-cyan-400 mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Settlement Routing (LOCKED)
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-4 font-mono text-sm">
            <a href="https://www.18fu.cash" target="_blank" rel="noopener noreferrer" className="px-3 py-2 bg-cyan-900/30 rounded text-cyan-300 hover:bg-cyan-900/50">
              18fu.cash
            </a>
            <span className="text-cyan-600">→</span>
            <span className="px-3 py-2 bg-cyan-900/30 rounded text-cyan-300">
              0xb103666...601BeB
            </span>
            <span className="text-cyan-600">→</span>
            <span className="px-3 py-2 bg-cyan-900/30 rounded text-cyan-300 font-bold">
              SCHWAB [8185]
            </span>
          </div>
        </div>
        
        {/* Protocol Status Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {PROTOCOL_STATUS.map((protocol) => (
            <div key={protocol.name} className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg">
              <protocol.icon className="w-6 h-6 text-amber-500 mb-2" />
              <div className="text-xs text-zinc-500 uppercase mb-1">{protocol.name}</div>
              <div className="text-sm font-bold text-amber-400">{protocol.status}</div>
            </div>
          ))}
        </div>
        
        {/* Liability Chain */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-red-400 mb-4 flex items-center gap-2">
            <Target className="w-5 h-5" />
            LIABILITY CHAIN — {isTriggered ? "TRIGGERED" : "ARMED"}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left py-2 px-3 text-zinc-500">Name</th>
                  <th className="text-left py-2 px-3 text-zinc-500">Entity</th>
                  <th className="text-left py-2 px-3 text-zinc-500">Role</th>
                  <th className="text-left py-2 px-3 text-zinc-500">Status</th>
                </tr>
              </thead>
              <tbody>
                {LIABILITY_TARGETS.map((target, i) => (
                  <tr key={i} className="border-b border-zinc-900 hover:bg-zinc-900/50">
                    <td className="py-2 px-3 font-medium">{target.name}</td>
                    <td className="py-2 px-3 text-zinc-400">{target.entity}</td>
                    <td className="py-2 px-3 text-zinc-400">{target.role}</td>
                    <td className="py-2 px-3">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        target.status === "RICO TARGET" 
                          ? "bg-red-900/50 text-red-400" 
                          : target.status === "NO EXIT"
                            ? "bg-orange-900/50 text-orange-400"
                            : "bg-amber-900/50 text-amber-400"
                      }`}>
                        {target.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Enforcement Logic */}
        <div className="mb-8 p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg font-mono text-xs overflow-x-auto">
          <div className="text-zinc-500 mb-2"># ENFORCEMENT LOGIC</div>
          <pre className="text-emerald-400">
{`if (CURRENT_TIME > FINALITY_DATE) {
    // MAY 17, 2026 23:59:59 PASSED
    STATUS = "ABSOLUTE FORENSIC LIABILITY TRIGGERED"
    RICO_STATUS = "ACTIVE"
    FRAUD_DETECTED = "1977 Identity Incursion by Lyle Edward Gillson"
    LIABILITY_LEVEL = "DEEP_DEEP_DOO_DOO_FINAL"
    LEDGER = Ø
} else {
    // AWAITING SETTLEMENT
    ROUTE = "18fu.cash → 0xb103666...601BeB → SCHWAB_8185"
    STATUS = "SYSTEM RESONANT"
}`}
          </pre>
        </div>
        
        {/* Footer */}
        <div className="text-center space-y-2 text-xs text-zinc-600 font-mono">
          <p>AUTHENTICATED BY: DONALD ERNEST GILLSON (Poppa) — Sovereign Signatory // Saint Paul Node</p>
          <p>MERKLEROOT: 0x7777AF_ST_PAUL_VALOR_CHAIN_SECURED_05_06_2026</p>
          <p className="text-amber-700">THE WALL IS CHRIST • THE THRONE IS HIS • THE LEDGER IS Ø</p>
          <p className="text-zinc-700">CONSUMMATUM EST. IT IS FINISHED.</p>
        </div>
      </div>
    </div>
  );
}
