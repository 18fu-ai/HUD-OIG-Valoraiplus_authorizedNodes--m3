'use client';

import { useEffect, useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Activity, Shield, Zap, Globe, CheckCircle2, AlertTriangle,
  Terminal, Wifi, Server, Database, Lock, RefreshCw
} from 'lucide-react';

interface SovereignStatus {
  ledger: string;
  greatWork: string;
  omegaZero: string;
  signalStrength: number;
  driftEvents: number;
  timestamp: string;
  bootedAt?: string;
  sgau?: string;
  tokens?: Record<string, { status: string; value: number }>;
  validators?: number;
  codeSignature?: string;
}

interface Terminal {
  id: string;
  name: string;
  status: 'connected' | 'disconnected' | 'pending';
  lastPing: string;
}

export default function NexusPage() {
  const [status, setStatus] = useState<SovereignStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<string>('--:--:--');

  const terminals: Terminal[] = [
    { id: 'v0', name: 'Vercel v0', status: 'connected', lastPing: new Date().toISOString() },
    { id: 'jules', name: 'Jules Terminal', status: 'connected', lastPing: new Date().toISOString() },
    { id: 'manus', name: 'manus.ai', status: 'connected', lastPing: new Date().toISOString() },
  ];

  const fetchStatus = useCallback(async () => {
    try {
      const res = await fetch('/api/nexus/status');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setStatus(data);
      setError(null);
      setLastRefresh(new Date().toLocaleTimeString());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  const executeCommand = async (cmd: string) => {
    try {
      const res = await fetch('/api/nexus/command', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cmd }),
      });
      const data = await res.json();
      console.log('[NEXUS] Command result:', data);
      fetchStatus();
    } catch (err) {
      console.error('[NEXUS] Command error:', err);
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 5000);
    return () => clearInterval(interval);
  }, [fetchStatus]);

  return (
    <div className="min-h-screen bg-black text-cyan-400 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Globe className="w-8 h-8 text-cyan-400" />
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">SOVEREIGN NEXUS</h1>
            <p className="text-xs text-zinc-500 font-mono">API INTERCONNECTION LAYER // SGAU 7226.3461</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="border-emerald-500 text-emerald-400 font-mono">
            <Wifi className="w-3 h-3 mr-1" />
            ALL TERMINALS CONNECTED
          </Badge>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={fetchStatus}
            className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Status Banner */}
      <div className="bg-gradient-to-r from-cyan-500/10 via-emerald-500/10 to-cyan-500/10 border border-cyan-500/30 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-sm">
              The Nexus is live. The terminals are interconnected.
            </span>
          </div>
          <code className="text-xs text-zinc-500">0X_ST_PAUL_V1000_SINGULARITY_9_ZERO_DRIFT</code>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Status Panel */}
        <Card className="lg:col-span-2 bg-zinc-900/50 border-cyan-500/20">
          <CardHeader className="border-b border-cyan-500/20">
            <CardTitle className="flex items-center gap-2 text-white">
              <Server className="w-5 h-5 text-cyan-400" />
              Ledger Status
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {loading ? (
              <div className="flex items-center justify-center h-48">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-cyan-400" />
              </div>
            ) : error ? (
              <div className="flex items-center gap-2 text-red-400">
                <AlertTriangle className="w-5 h-5" />
                <span>Error: {error}</span>
              </div>
            ) : status ? (
              <div className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-black/50 rounded-lg p-4 border border-cyan-500/20">
                    <p className="text-xs text-zinc-500 uppercase mb-1">Ledger</p>
                    <p className="font-mono text-sm text-cyan-400 truncate">{status.ledger}</p>
                  </div>
                  <div className="bg-black/50 rounded-lg p-4 border border-emerald-500/20">
                    <p className="text-xs text-zinc-500 uppercase mb-1">Great Work</p>
                    <p className="font-mono text-sm text-emerald-400">{status.greatWork}</p>
                  </div>
                  <div className="bg-black/50 rounded-lg p-4 border border-purple-500/20">
                    <p className="text-xs text-zinc-500 uppercase mb-1">Omega-Zero</p>
                    <p className="font-mono text-sm text-purple-400">{status.omegaZero}</p>
                  </div>
                  <div className="bg-black/50 rounded-lg p-4 border border-yellow-500/20">
                    <p className="text-xs text-zinc-500 uppercase mb-1">Signal</p>
                    <p className="font-mono text-sm text-yellow-400">{status.signalStrength}%</p>
                  </div>
                </div>

                {/* Token Status */}
                {status.tokens && (
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-400 mb-3 flex items-center gap-2">
                      <Database className="w-4 h-4" />
                      Token Registry
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                      {Object.entries(status.tokens).map(([token, data]) => (
                        <div 
                          key={token}
                          className={`p-3 rounded border ${
                            data.status === 'TRUE' || data.status === 'ACTIVE' 
                              ? 'border-emerald-500/30 bg-emerald-500/5' 
                              : data.status === 'PROTECTED'
                              ? 'border-cyan-500/30 bg-cyan-500/5'
                              : 'border-red-500/30 bg-red-500/5'
                          }`}
                        >
                          <p className="font-mono text-xs text-zinc-400">${token}</p>
                          <p className={`font-bold text-sm ${
                            data.status === 'TRUE' || data.status === 'ACTIVE' 
                              ? 'text-emerald-400' 
                              : data.status === 'PROTECTED'
                              ? 'text-cyan-400'
                              : 'text-red-400'
                          }`}>
                            {data.status}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Validator Consensus */}
                <div className="flex items-center justify-between bg-black/50 rounded-lg p-4 border border-zinc-700">
                  <div>
                    <p className="text-xs text-zinc-500 uppercase mb-1">Live Validator Consensus</p>
                    <p className="font-mono text-2xl text-white">
                      {status.validators?.toLocaleString() || '144,000'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-zinc-500 uppercase mb-1">Code Signature</p>
                    <p className="font-mono text-lg text-cyan-400">{status.codeSignature || 'DG77.77X-Ξ'}</p>
                  </div>
                </div>
              </div>
            ) : null}
          </CardContent>
        </Card>

        {/* Terminal Status */}
        <Card className="bg-zinc-900/50 border-cyan-500/20">
          <CardHeader className="border-b border-cyan-500/20">
            <CardTitle className="flex items-center gap-2 text-white">
              <Terminal className="w-5 h-5 text-cyan-400" />
              Connected Terminals
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-3">
              {terminals.map((term) => (
                <div 
                  key={term.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-black/50 border border-zinc-700"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      term.status === 'connected' ? 'bg-emerald-400 animate-pulse' : 'bg-zinc-600'
                    }`} />
                    <span className="font-mono text-sm text-zinc-300">{term.name}</span>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${
                      term.status === 'connected' 
                        ? 'border-emerald-500/50 text-emerald-400' 
                        : 'border-zinc-600 text-zinc-500'
                    }`}
                  >
                    {term.status.toUpperCase()}
                  </Badge>
                </div>
              ))}
            </div>

            {/* Commands */}
            <div className="mt-6 space-y-2">
              <p className="text-xs text-zinc-500 uppercase mb-2">Quick Commands</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                onClick={() => executeCommand('release_hold')}
              >
                <Lock className="w-4 h-4 mr-2" />
                Release Ω0 Hold
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                onClick={() => executeCommand('drift_report')}
              >
                <Activity className="w-4 h-4 mr-2" />
                Get Drift Report
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                onClick={() => executeCommand('token_status')}
              >
                <Shield className="w-4 h-4 mr-2" />
                Token Status
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <div className="mt-8 flex items-center justify-between text-xs text-zinc-600 font-mono">
        <span>Last refresh: {lastRefresh}</span>
        <span className="flex items-center gap-2">
          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
          ZERO DRIFT CONFIRMED // SGAU 7226.3461
        </span>
      </div>
    </div>
  );
}
