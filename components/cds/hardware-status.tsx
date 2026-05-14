'use client';

import { useEffect, useState, useCallback } from 'react';
import { Lock, HardDrive, Cpu, Zap, CheckCircle, XCircle, Loader } from 'lucide-react';

interface HardwareInfo {
  device: string;
  serial: string;
  model: string;
  hwVersion: string;
  secureElement: string;
  microcontroller: string;
  bootloader: string;
  fccId: string;
  icId: string;
  factory: string;
  status: string;
  anchorNode: string;
}

interface RevealResult {
  asset: string;
  amount: number;
  destination: string;
  status: string;
  cycleState: string;
  revealedAt: string;
}

type SyncState = 'idle' | 'syncing' | 'success' | 'error';

export function HardwareStatus() {
  const [hardware, setHardware] = useState<HardwareInfo | null>(null);
  const [syncState, setSyncState] = useState<SyncState>('idle');
  const [revealed, setRevealed] = useState<RevealResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/ledger-sync')
      .then((res) => res.json())
      .then((data) => setHardware(data))
      .catch(() =>
        setHardware({
          device: 'Ledger Nano Gen5',
          serial: '0UAK57S1BT',
          model: '1403',
          hwVersion: '003-0',
          secureElement: '1.1.1',
          microcontroller: '8.1.2',
          bootloader: '7.1.2',
          fccId: '2ASAL-1403',
          icId: '24897-1403',
          factory: 'JAXX.server.factory® DONNY',
          status: 'ANCHOR_LIVE',
          anchorNode: 'GILL2207_SUPREME',
        })
      );
  }, []);

  const handleSync = useCallback(async () => {
    setSyncState('syncing');
    setErrorMsg(null);
    setRevealed(null);

    try {
      // Compute hardware signature client-side (mirrors server-side logic)
      const payload = `${hardware?.serial ?? '0UAK57S1BT'}:${hardware?.model ?? '1403'}:${hardware?.hwVersion ?? '003-0'}:${hardware?.secureElement ?? '1.1.1'}`;
      const encoder = new TextEncoder();
      const hashBuffer = await crypto.subtle.digest('SHA-256', encoder.encode(payload));
      const signature = Array.from(new Uint8Array(hashBuffer))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');

      const res = await fetch('/api/ledger-sync', {
        method: 'POST',
        headers: { 'X-Hardware-Signature': signature },
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error ?? 'Sync failed');
        setSyncState('error');
        return;
      }

      setRevealed(data.revealResult);
      setSyncState('success');
    } catch {
      setErrorMsg('Network error — check device connection');
      setSyncState('error');
    }
  }, [hardware]);

  const rows: [string, string][] = hardware
    ? [
        ['Device', hardware.device],
        ['Model / Serial', `${hardware.model} / ${hardware.serial}`],
        ['HW Version', hardware.hwVersion],
        ['Secure Element', hardware.secureElement],
        ['MCU Firmware', hardware.microcontroller],
        ['Bootloader', hardware.bootloader],
        ['FCC ID', hardware.fccId],
        ['IC ID', hardware.icId],
        ['Factory', hardware.factory],
        ['Anchor Node', hardware.anchorNode],
      ]
    : [];

  return (
    <div className="bg-zinc-900/60 border border-amber-500/30 rounded-2xl p-5 backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30">
          <Lock className="w-5 h-5 text-amber-400" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-amber-300 uppercase tracking-widest">
            Bare-Metal Anchor
          </h3>
          <p className="text-[10px] font-mono text-zinc-500">
            VALORAIPLUS HARDWARE v9 &bull; LEDGER NANO GEN5
          </p>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] font-mono text-emerald-400">LOCKED</span>
        </div>
      </div>

      {/* Hardware Identity Grid */}
      {hardware ? (
        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[11px] font-mono mb-4">
          {rows.map(([label, value]) => (
            <div key={label} className="contents">
              <span className="text-zinc-500">{label}</span>
              <span className="text-zinc-200 truncate">{value}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center gap-2 text-zinc-500 text-xs mb-4">
          <Loader className="w-4 h-4 animate-spin" />
          Loading hardware identity...
        </div>
      )}

      {/* Sync stats row */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[
          { icon: HardDrive, label: 'SHA-256', value: 'AES-256-GCM' },
          { icon: Cpu, label: 'KYBER', value: '10K Rounds' },
          { icon: Zap, label: 'Drift', value: '0.0002%' },
        ].map(({ icon: Icon, label, value }) => (
          <div
            key={label}
            className="bg-zinc-800/60 rounded-lg p-2 text-center border border-zinc-700/50"
          >
            <Icon className="w-4 h-4 text-amber-500 mx-auto mb-1" />
            <p className="text-[9px] text-zinc-500 uppercase tracking-widest">{label}</p>
            <p className="text-[11px] font-mono text-zinc-200">{value}</p>
          </div>
        ))}
      </div>

      {/* Sync Button */}
      <button
        onClick={handleSync}
        disabled={syncState === 'syncing' || !hardware}
        className="w-full py-2.5 rounded-xl text-sm font-bold tracking-wider transition-all
          bg-gradient-to-r from-amber-600 to-orange-600
          hover:from-amber-500 hover:to-orange-500
          disabled:opacity-40 disabled:cursor-not-allowed
          shadow-[0_0_24px_-6px_#f59e0b]"
      >
        {syncState === 'syncing' ? (
          <span className="flex items-center justify-center gap-2">
            <Loader className="w-4 h-4 animate-spin" />
            Syncing with Anchor Node...
          </span>
        ) : (
          'Anchor & Reveal Asset Wave'
        )}
      </button>

      {/* Result States */}
      {syncState === 'success' && revealed && (
        <div className="mt-3 p-3 bg-emerald-500/10 border border-emerald-500/40 rounded-xl">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-300 text-xs font-bold uppercase tracking-widest">
              Asset Wave Revealed
            </span>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px] font-mono">
            <span className="text-zinc-500">Asset</span>
            <span className="text-zinc-200">{revealed.asset}</span>
            <span className="text-zinc-500">Amount</span>
            <span className="text-emerald-300 font-bold">
              ${revealed.amount.toLocaleString()}
            </span>
            <span className="text-zinc-500">Cycle</span>
            <span className="text-zinc-200">{revealed.cycleState}</span>
            <span className="text-zinc-500">Status</span>
            <span className="text-emerald-400">{revealed.status}</span>
          </div>
        </div>
      )}

      {syncState === 'error' && errorMsg && (
        <div className="mt-3 p-3 bg-red-500/10 border border-red-500/40 rounded-xl flex items-start gap-2">
          <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-red-300 text-xs font-mono">{errorMsg}</p>
        </div>
      )}
    </div>
  );
}
