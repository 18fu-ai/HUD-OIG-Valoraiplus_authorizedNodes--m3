"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Eye, EyeOff } from "lucide-react";

/**
 * VALORAIPLUS // PORT.HOLE HUD
 * THE ONE TRUE LAW OF THE MATRIX // OMEGA-ZERO
 * 
 * Architectural Invariants:
 * 1. Optical Shielding: 100px backdrop blur obscures DOM from unauthorized observation
 * 2. The Singularity: Center pulse at exactly 1111ms
 * 3. Warp-Key Toggle: isDeRefracted only modifiable if donadams1969.eth detected
 * 4. $864B Baseline: Hard-coded sovereign valuation, atomic fact
 */

interface PortHoleProps {
  authority: {
    root: string;
    greenAllowed: boolean;
  };
  auditStatus?: {
    complete: boolean;
    percentage: number;
  };
}

export default function PortHole({ authority, auditStatus }: PortHoleProps) {
  const [isDeRefracted, setIsDeRefracted] = useState(false);
  const [pulse, setPulse] = useState(0);

  // 1111ms Heartbeat Sync - The Sovereign Pulse
  useEffect(() => {
    const heartbeat = setInterval(() => setPulse(p => p + 1), 1111);
    return () => clearInterval(heartbeat);
  }, []);

  // Priority 1 access check - donadams1969.eth warp-key
  const isPriority1 = authority.root === "donadams1969.eth";

  return (
    <div className="relative w-full h-[400px] bg-black border-2 border-zinc-900 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(139,92,246,0.1)]">
      
      {/* THE NANOMIRROR SHIELDING LAYER */}
      <AnimatePresence>
        {!isDeRefracted && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 backdrop-blur-[100px] bg-zinc-950/80 flex flex-col items-center justify-center p-12 text-center"
          >
            <Shield className="w-16 h-16 text-zinc-800 mb-4" />
            <h2 className="text-zinc-600 font-black tracking-[0.2em] uppercase text-xs">
              Optical Shielding Active // DG77.77X Armament
            </h2>
            <p className="text-zinc-800 text-[9px] mt-2 font-mono">
              UNAUTHORIZED ACCESS WILL TRIGGER 77.77X REFLECTION
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* THE SOVEREIGN CORE VIEW */}
      <div className="absolute inset-0 p-8 flex flex-col justify-between">
        
        {/* TOP BAR: SYSTEM STATUS */}
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isPriority1 ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : 'bg-red-500'}`} />
              <span className="text-[10px] font-black text-white uppercase tracking-widest">
                Node: Saint Paul 55116 // status: {isPriority1 ? 'Supercritical' : 'Lockdown'}
              </span>
            </div>
            <p className="text-[8px] text-zinc-600 mt-1 font-mono uppercase">
              Merkle Root: 0X_ST_PAUL_V55_INFINITY
            </p>
          </div>

          <button 
            onClick={() => isPriority1 && setIsDeRefracted(!isDeRefracted)}
            disabled={!isPriority1}
            className={`p-2 rounded-full transition-colors ${
              isDeRefracted 
                ? 'bg-purple-600 text-white' 
                : 'bg-zinc-900 text-zinc-600'
            } ${!isPriority1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-purple-700'}`}
          >
            {isDeRefracted ? <Eye size={18} /> : <EyeOff size={18} />}
          </button>
        </div>

        {/* CENTER: THE SINGULARITY PULSE */}
        <div className="flex flex-col items-center">
          <motion.div 
            animate={{ 
              scale: [1, 1.05, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 1.111, repeat: Infinity }}
            className="w-32 h-32 rounded-full border-2 border-purple-500/30 flex items-center justify-center"
          >
            <div className="text-5xl font-black text-white">Ø</div>
          </motion.div>
          <span className="text-[10px] text-zinc-500 font-black mt-4 tracking-[0.5em] uppercase">
            Ledger Zero Drift
          </span>
          <span className="text-[8px] text-zinc-700 font-mono mt-1">
            PULSE: {pulse} @ 1111ms
          </span>
        </div>

        {/* BOTTOM: THE $864B BASELINE & RECKONING AUDIT */}
        <div className="grid grid-cols-2 gap-4 border-t border-zinc-900 pt-6">
          <div>
            <span className="text-[9px] text-zinc-600 uppercase block">Treasury Valuation</span>
            <span className="text-xl font-black text-emerald-500 tracking-tighter">
              $864,000,000,000.00
            </span>
          </div>
          <div className="text-right">
            <span className="text-[9px] text-zinc-600 uppercase block">Reckoning Audit</span>
            <span className="text-xl font-black text-white">
              {auditStatus?.percentage ?? 100}% COMPLETE
            </span>
          </div>
        </div>
      </div>

      {/* SCANLINE OVERLAY - CRT Effect */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
    </div>
  );
}
