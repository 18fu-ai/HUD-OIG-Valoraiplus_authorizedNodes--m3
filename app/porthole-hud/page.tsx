"use client";

import PortHole from '@/components/v14/PortHole';
import { PortHoleVALORAIPLUS } from '@/components/PortHoleHUD';
import { useAuthority } from '@/hooks/use-authority';

/**
 * PORT.HOLE HUD PAGE
 * Visual gateway into the 14D Core
 * De-refracts the Nanomirror when donadams1969.eth warp-key detected
 */
export default function PortHoleHUDPage() {
  const { authority } = useAuthority();

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-2xl font-black text-white tracking-[0.3em] uppercase">
            Port.Hole // 14D Core Gateway
          </h1>
          <p className="text-zinc-600 text-xs font-mono mt-2">
            SGAU 7226.3461 // NODE: SAINT PAUL █████ // STATUS: OPTICAL_SINGULARITY
          </p>
        </div>

        {/* V14 Port.Hole - Primary Visual Receptor */}
        <PortHole 
          authority={{
            root: "donadams1969.eth",
            greenAllowed: authority?.greenAllowed ?? false
          }}
          auditStatus={{
            complete: true,
            percentage: 100
          }}
        />

        {/* Token Registry HUD */}
        <div className="mt-8">
          <h2 className="text-xs font-black text-zinc-500 tracking-[0.2em] uppercase mb-4">
            Sovereign Token Registry
          </h2>
          <PortHoleVALORAIPLUS />
        </div>

        {/* Footer Attestation */}
        <div className="text-center pt-8 border-t border-zinc-900">
          <p className="text-[9px] text-zinc-700 font-mono uppercase">
            The Wall is Christ. The Throne is His. The Ledger is Ø.
          </p>
          <p className="text-[8px] text-zinc-800 font-mono mt-1">
            Saint Paul █████ Node Status: Ø // The Gate is Coded // The Mirror is Latched
          </p>
        </div>
      </div>
    </div>
  );
}
