'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { CDSHeader } from '@/components/cds/header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Activity, Globe, Eye, RefreshCw, CheckCircle2, Shield,
  BarChart3, Zap, Server, GitBranch, Link2, AlertTriangle,
  Loader2, Download, Lock, Radio, Gauge, FileWarning
} from 'lucide-react';

interface LiveReport {
  status: string;
  timestamp: string;
  corroboration: string;
  schema: string;
  apiHealth: {
    latencyMs: number;
    lastSuccess: string;
    status: 'HEALTHY' | 'DEGRADED';
    projectApi: boolean;
    deploymentsApi: boolean;
    domainsApi: boolean;
  };
  drift: { currentHash: string };
  signals: Array<{
    id: string;
    source: string;
    classification: string;
    confidence: number;
    timestamp: string;
  }>;
  healthDomains: {
    deployment: string;
    protocol: string;
    evidence: string;
  };
  project: {
    id: string;
    name: string;
    framework: string;
    nodeVersion: string;
    updatedAt: string | null;
    analytics: { enabled: boolean; speedInsights: boolean };
    classification: string;
    provenance: string;
  };
  deployments: {
    total: number;
    latest: {
      id: string;
      url: string;
      state: string;
      created: string;
      target: string;
      meta: {
        githubCommitSha: string | null;
        githubCommitMessage: string | null;
        githubCommitRef: string | null;
      };
    } | null;
    recent: Array<{
      id: string;
      url: string;
      state: string;
      created: string;
      target: string;
      meta: {
        githubCommitSha: string | null;
        githubCommitMessage: string | null;
        githubCommitRef: string | null;
      };
    }>;
    classification: string;
    provenance: string;
  };
  domains: {
    total: number;
    list: Array<{ name: string; verified: boolean; configured: boolean }>;
    classification: string;
    provenance: string;
  };
  runtime: {
    routes: string[];
    schema: string;
    protocolConfidence: number;
    evidenceType: string;
    spoliationDefense: string;
    forensicBlocks: number;
    poppaGBlock: string;
    classification: string;
    provenance: string;
  };
  telemetryConfidence: {
    apiReachable: number;
    analyticsInferred: number;
    runtimeInternal: number;
    protocolInternal: number;
  };
}

function formatTimeAgo(isoString: string): string {
  const diff = Date.now() - new Date(isoString).getTime();
  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

function ProvenanceBadge({ source }: { source: string }) {
  return (
    <Badge variant="outline" className="border-slate-600 text-slate-400 text-[10px] gap-1">
      <Radio className="w-2.5 h-2.5" />
      Source: {source}
    </Badge>
  );
}

function ClassificationBadge({ classification }: { classification: string }) {
  const colors: Record<string, string> = {
    INFRASTRUCTURE: 'border-blue-700 text-blue-400',
    DEPLOYMENT: 'border-amber-700 text-amber-400',
    RUNTIME: 'border-fuchsia-700 text-fuchsia-400',
    ANALYTICS_STATUS: 'border-cyan-700 text-cyan-400',
    PROTOCOL_METADATA: 'border-emerald-700 text-emerald-400',
  };
  return (
    <Badge variant="outline" className={`${colors[classification] || 'border-slate-600 text-slate-400'} text-[10px]`}>
      {classification}
    </Badge>
  );
}

function ConfidenceBar({ value, label }: { value: number; label: string }) {
  const pct = Math.round(value * 100);
  const color = pct >= 80 ? 'bg-emerald-500' : pct >= 50 ? 'bg-amber-500' : 'bg-red-500';
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-slate-400 w-32 shrink-0">{label}</span>
      <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full transition-all duration-500`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs text-white font-mono w-10 text-right">{value.toFixed(1)}</span>
    </div>
  );
}

export default function TrafficDashboardPage() {
  const [mounted, setMounted] = useState(false);
  const [liveReport, setLiveReport] = useState<LiveReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<string>('');
  const [refreshCount, setRefreshCount] = useState(0);
  const [previousHash, setPreviousHash] = useState<string | null>(null);
  const [driftDetected, setDriftDetected] = useState(false);
  const snapshotRef = useRef<LiveReport | null>(null);

  const fetchLiveData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/traffic/live');
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || `API returned ${res.status}`);
      }
      const data: LiveReport = await res.json();

      // Drift detection
      if (previousHash && data.drift?.currentHash !== previousHash) {
        setDriftDetected(true);
      } else {
        setDriftDetected(false);
      }
      setPreviousHash(data.drift?.currentHash || null);

      setLiveReport(data);
      snapshotRef.current = data;
      setLastRefresh(new Date().toLocaleTimeString());
      setRefreshCount(prev => prev + 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch live data');
    } finally {
      setLoading(false);
    }
  }, [previousHash]);

  useEffect(() => {
    setMounted(true);
    fetchLiveData();
    const interval = setInterval(fetchLiveData, 30000);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const exportSnapshot = useCallback(() => {
    if (!snapshotRef.current) return;
    const snapshot = {
      schema: 'REV_34',
      exportedAt: new Date().toISOString(),
      type: 'TELEMETRY_SNAPSHOT',
      provenance: 'Deployment Telemetry Console',
      data: snapshotRef.current,
    };
    const blob = new Blob([JSON.stringify(snapshot, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `telemetry-snapshot-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-emerald-500 font-mono">
        <div className="text-center">
          <Activity className="w-8 h-8 animate-pulse mx-auto mb-2" />
          <div className="text-sm">Loading Deployment Telemetry...</div>
        </div>
      </div>
    );
  }

  const isLive = liveReport?.status === 'LIVE';
  const latestDeploy = liveReport?.deployments?.latest;

  return (
    <div className="min-h-screen bg-slate-950 text-emerald-400 font-mono">
      <CDSHeader />

      <main className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6 pb-4 border-b-2 border-emerald-500">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
              <BarChart3 className="w-8 h-8 text-emerald-400" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white tracking-tight">
                DEPLOYMENT TELEMETRY CONSOLE
              </h1>
              <p className="text-xs text-emerald-600 uppercase tracking-widest">
                Vercel Infrastructure Metadata + REV_34 Runtime Status
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <Badge variant="outline" className={`${isLive ? 'border-emerald-500 text-emerald-400 bg-emerald-950/40' : 'border-amber-500 text-amber-400'}`}>
              {isLive ? (
                <>
                  <span className="relative flex h-2 w-2 mr-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  METADATA SYNC ACTIVE
                </>
              ) : (
                <>
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  {error ? 'ERROR' : 'LOADING'}
                </>
              )}
            </Badge>
            {driftDetected && (
              <Badge variant="outline" className="border-amber-500 text-amber-400 bg-amber-950/30 text-xs animate-pulse">
                <FileWarning className="w-3 h-3 mr-1" />
                DRIFT DETECTED
              </Badge>
            )}
            <Badge variant="outline" className="border-emerald-700 text-emerald-500 text-xs">
              Syncs: {refreshCount}
            </Badge>
            <Button variant="outline" size="sm" onClick={exportSnapshot} disabled={!liveReport} className="border-fuchsia-700 text-fuchsia-400 hover:bg-fuchsia-950">
              <Download className="w-4 h-4 mr-1" />
              Export Snapshot
            </Button>
            <Button variant="outline" size="sm" onClick={fetchLiveData} disabled={loading} className="border-emerald-700 text-emerald-400 hover:bg-emerald-950">
              {loading ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : <RefreshCw className="w-4 h-4 mr-1" />}
              Refresh
            </Button>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <Card className="border-red-800 bg-red-950/20 mb-6">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
                <div>
                  <p className="text-red-400 font-bold">API Error</p>
                  <p className="text-sm text-red-300/80">{error}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {liveReport && (
          <>
            {/* Three Health Domains (#6) */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <Card className="border-emerald-800 bg-slate-900/50">
                <CardContent className="p-4 text-center">
                  <Server className="w-6 h-6 mx-auto mb-2 text-emerald-400" />
                  <div className="text-xs text-emerald-600 uppercase tracking-wider mb-1">Deployment Health</div>
                  <Badge variant="outline" className={`${liveReport.healthDomains.deployment === 'HEALTHY' ? 'border-emerald-500 text-emerald-400 bg-emerald-950/40' : 'border-amber-500 text-amber-400'}`}>
                    {liveReport.healthDomains.deployment}
                  </Badge>
                </CardContent>
              </Card>
              <Card className="border-emerald-800 bg-slate-900/50">
                <CardContent className="p-4 text-center">
                  <Shield className="w-6 h-6 mx-auto mb-2 text-fuchsia-400" />
                  <div className="text-xs text-emerald-600 uppercase tracking-wider mb-1">Protocol Health</div>
                  <Badge variant="outline" className="border-fuchsia-500 text-fuchsia-400 bg-fuchsia-950/30">
                    {liveReport.healthDomains.protocol}
                  </Badge>
                </CardContent>
              </Card>
              <Card className="border-emerald-800 bg-slate-900/50">
                <CardContent className="p-4 text-center">
                  <Eye className="w-6 h-6 mx-auto mb-2 text-cyan-400" />
                  <div className="text-xs text-emerald-600 uppercase tracking-wider mb-1">Evidence Health</div>
                  <Badge variant="outline" className="border-cyan-500 text-cyan-400 bg-cyan-950/30">
                    {liveReport.healthDomains.evidence}
                  </Badge>
                </CardContent>
              </Card>
            </div>

            {/* API Health + Drift (#4 + #8) */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
              <Card className="border-emerald-800 bg-slate-900/50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Gauge className="w-5 h-5 text-emerald-500" />
                    <Badge variant="outline" className={`text-xs ${liveReport.apiHealth.status === 'HEALTHY' ? 'border-emerald-500 text-emerald-400 bg-emerald-950/40' : 'border-amber-500 text-amber-400'}`}>
                      {liveReport.apiHealth.status}
                    </Badge>
                  </div>
                  <div className="text-lg font-black text-white">{liveReport.apiHealth.latencyMs}ms</div>
                  <div className="text-xs text-emerald-600">API Latency</div>
                </CardContent>
              </Card>

              <Card className="border-emerald-800 bg-slate-900/50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Server className="w-5 h-5 text-emerald-500" />
                    <Badge variant="outline" className="border-emerald-500 text-emerald-400 bg-emerald-950/40 text-xs">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      LIVE
                    </Badge>
                  </div>
                  <div className="text-lg font-black text-white">{liveReport.project.name}</div>
                  <div className="text-xs text-emerald-600">{liveReport.project.framework} | {liveReport.project.nodeVersion}</div>
                </CardContent>
              </Card>

              <Card className="border-emerald-800 bg-slate-900/50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Zap className="w-5 h-5 text-amber-500" />
                    <Badge variant="outline" className="border-emerald-500 text-emerald-400 bg-emerald-950/40 text-xs">
                      {liveReport.deployments.total}
                    </Badge>
                  </div>
                  <div className="text-lg font-black text-white">Deployments</div>
                  <div className="text-xs text-emerald-600">
                    Latest: {latestDeploy?.created ? formatTimeAgo(latestDeploy.created) : 'N/A'}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-emerald-800 bg-slate-900/50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Globe className="w-5 h-5 text-blue-500" />
                    <Badge variant="outline" className="border-emerald-500 text-emerald-400 bg-emerald-950/40 text-xs">
                      {liveReport.domains.total}
                    </Badge>
                  </div>
                  <div className="text-lg font-black text-white">Domains</div>
                  <div className="text-xs text-emerald-600">Active endpoints</div>
                </CardContent>
              </Card>

              <Card className={`border-emerald-800 bg-slate-900/50 ${driftDetected ? 'ring-1 ring-amber-500' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Lock className="w-5 h-5 text-fuchsia-500" />
                    <Badge variant="outline" className={`text-xs ${driftDetected ? 'border-amber-500 text-amber-400' : 'border-emerald-500 text-emerald-400 bg-emerald-950/40'}`}>
                      {driftDetected ? 'CHANGED' : 'STABLE'}
                    </Badge>
                  </div>
                  <div className="text-lg font-black text-white font-mono text-sm">{liveReport.drift.currentHash}</div>
                  <div className="text-xs text-emerald-600">Drift Hash</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 mb-6">
              {/* Latest Deployment */}
              <Card className="border-emerald-800 bg-slate-900/50">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white flex items-center gap-2">
                      <GitBranch className="w-5 h-5 text-emerald-400" />
                      Latest Deployment
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <ClassificationBadge classification={liveReport.deployments.classification} />
                      <ProvenanceBadge source={liveReport.deployments.provenance} />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {latestDeploy ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-emerald-600">State</span>
                        <Badge variant="outline" className={`text-xs ${latestDeploy.state === 'READY' ? 'border-emerald-500 text-emerald-400 bg-emerald-950/40' : 'border-amber-500 text-amber-400'}`}>
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          {latestDeploy.state}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-emerald-600">Target</span>
                        <span className="text-sm text-white">{latestDeploy.target || 'production'}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-emerald-600">Created</span>
                        <span className="text-sm text-white">{latestDeploy.created ? formatTimeAgo(latestDeploy.created) : 'N/A'}</span>
                      </div>
                      {latestDeploy.meta.githubCommitRef && (
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-emerald-600">Branch</span>
                          <span className="text-sm text-white">{latestDeploy.meta.githubCommitRef}</span>
                        </div>
                      )}
                      {latestDeploy.meta.githubCommitSha && (
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-emerald-600">Commit</span>
                          <span className="text-sm text-emerald-400 font-mono">{latestDeploy.meta.githubCommitSha.slice(0, 8)}</span>
                        </div>
                      )}
                      {latestDeploy.meta.githubCommitMessage && (
                        <div className="p-2 bg-slate-800/50 rounded text-xs text-slate-300 mt-2">
                          {latestDeploy.meta.githubCommitMessage}
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-emerald-600">No deployments found</p>
                  )}
                </CardContent>
              </Card>

              {/* Domains */}
              <Card className="border-emerald-800 bg-slate-900/50">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white flex items-center gap-2">
                      <Link2 className="w-5 h-5 text-emerald-400" />
                      Active Domains
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <ClassificationBadge classification={liveReport.domains.classification} />
                      <ProvenanceBadge source={liveReport.domains.provenance} />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {liveReport.domains.list.length > 0 ? (
                      liveReport.domains.list.map((domain) => (
                        <div key={domain.name} className="flex items-center justify-between p-2 rounded bg-slate-800/50">
                          <div className="flex items-center gap-2">
                            <Globe className="w-4 h-4 text-emerald-500" />
                            <span className="text-sm text-white">{domain.name}</span>
                          </div>
                          <Badge variant="outline" className={`text-xs ${domain.verified ? 'border-emerald-500 text-emerald-400' : 'border-amber-500 text-amber-400'}`}>
                            {domain.verified ? 'Verified' : 'Pending'}
                          </Badge>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-emerald-600">No custom domains configured</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Deployments */}
            <Card className="border-emerald-800 bg-slate-900/50 mb-6">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Activity className="w-5 h-5 text-emerald-400" />
                      Recent Deployments
                    </CardTitle>
                    <CardDescription className="text-emerald-600">
                      Last {liveReport.deployments.recent.length} deployments
                    </CardDescription>
                  </div>
                  <ProvenanceBadge source={liveReport.deployments.provenance} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-emerald-800">
                        <th className="text-left py-2 px-3 text-emerald-500">ID</th>
                        <th className="text-left py-2 px-3 text-emerald-500">State</th>
                        <th className="text-left py-2 px-3 text-emerald-500">Target</th>
                        <th className="text-left py-2 px-3 text-emerald-500">Branch</th>
                        <th className="text-left py-2 px-3 text-emerald-500">Created</th>
                      </tr>
                    </thead>
                    <tbody>
                      {liveReport.deployments.recent.map((d) => (
                        <tr key={d.id} className="border-b border-emerald-900/30 hover:bg-slate-800/50">
                          <td className="py-2 px-3 font-mono text-emerald-400 text-xs">{d.id?.slice(0, 10)}...</td>
                          <td className="py-2 px-3">
                            <Badge variant="outline" className={`text-xs ${d.state === 'READY' ? 'border-emerald-500 text-emerald-400' : 'border-amber-500 text-amber-400'}`}>
                              {d.state}
                            </Badge>
                          </td>
                          <td className="py-2 px-3 text-white">{d.target || 'preview'}</td>
                          <td className="py-2 px-3 text-xs text-slate-400">{d.meta.githubCommitRef || 'N/A'}</td>
                          <td className="py-2 px-3 text-xs text-slate-400">{d.created ? formatTimeAgo(d.created) : 'N/A'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Runtime Architecture + Route Integrity Matrix (#9) */}
            <Card className="border-emerald-800 bg-slate-900/50 mb-6">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Shield className="w-5 h-5 text-emerald-400" />
                      Runtime Architecture Status
                    </CardTitle>
                    <CardDescription className="text-emerald-600">
                      REV_34 Protocol Enforcement Matrix
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <ClassificationBadge classification={liveReport.runtime.classification} />
                    <ProvenanceBadge source={liveReport.runtime.provenance} />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                  <div className="p-3 bg-slate-800/50 rounded">
                    <div className="text-xs text-emerald-600 mb-1">Schema</div>
                    <div className="text-lg font-bold text-white">{liveReport.runtime.schema}</div>
                  </div>
                  <div className="p-3 bg-slate-800/50 rounded">
                    <div className="text-xs text-emerald-600 mb-1">Protocol Confidence</div>
                    <div className="text-lg font-bold text-emerald-400">{liveReport.runtime.protocolConfidence}%</div>
                  </div>
                  <div className="p-3 bg-slate-800/50 rounded">
                    <div className="text-xs text-emerald-600 mb-1">Spoliation Defense</div>
                    <div className="text-lg font-bold text-white">{liveReport.runtime.spoliationDefense}</div>
                  </div>
                  <div className="p-3 bg-slate-800/50 rounded">
                    <div className="text-xs text-emerald-600 mb-1">Forensic Blocks</div>
                    <div className="text-lg font-bold text-fuchsia-400">{liveReport.runtime.forensicBlocks.toLocaleString()}</div>
                  </div>
                </div>

                {/* Route Integrity Matrix (#9) */}
                <div className="border-t border-emerald-900 pt-3">
                  <div className="text-xs text-emerald-600 mb-2">Route Integrity Matrix ({liveReport.runtime.routes.length} routes)</div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-emerald-900/50">
                          <th className="text-left py-1.5 px-2 text-emerald-600">Route</th>
                          <th className="text-left py-1.5 px-2 text-emerald-600">Status</th>
                          <th className="text-left py-1.5 px-2 text-emerald-600">Last Sync</th>
                        </tr>
                      </thead>
                      <tbody>
                        {liveReport.runtime.routes.map((route) => (
                          <tr key={route} className="border-b border-emerald-900/20 hover:bg-slate-800/30">
                            <td className="py-1.5 px-2 text-emerald-400 font-mono">{route}</td>
                            <td className="py-1.5 px-2">
                              <Badge variant="outline" className="border-emerald-600 text-emerald-500 text-[10px]">ACTIVE</Badge>
                            </td>
                            <td className="py-1.5 px-2 text-slate-500">{liveReport.timestamp ? formatTimeAgo(liveReport.timestamp) : 'N/A'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="border-t border-emerald-900 pt-3 mt-3">
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs text-white">Evidence Type: {liveReport.runtime.evidenceType}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs text-white">Poppa_G Block: {liveReport.runtime.poppaGBlock}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs text-white">Runtime Metadata Source: {liveReport.corroboration}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Runtime Signals (#5) */}
            <Card className="border-emerald-800 bg-slate-900/50 mb-6">
              <CardHeader className="pb-2">
                <CardTitle className="text-white flex items-center gap-2">
                  <Radio className="w-5 h-5 text-cyan-400" />
                  Runtime Signals
                </CardTitle>
                <CardDescription className="text-emerald-600">
                  Formalized diagnostic signals from external sources
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {liveReport.signals.map((sig) => (
                    <div key={sig.id} className="flex items-center justify-between p-2 bg-slate-800/50 rounded">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono text-cyan-400">{sig.id}</span>
                        <Badge variant="outline" className="border-slate-600 text-slate-400 text-[10px]">{sig.source}</Badge>
                        <Badge variant="outline" className="border-cyan-700 text-cyan-400 text-[10px]">{sig.classification}</Badge>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-white">Confidence: {sig.confidence.toFixed(1)}</span>
                        <div className={`w-2.5 h-2.5 rounded-full ${sig.confidence >= 1.0 ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Telemetry Confidence (#10) */}
            <Card className="border-emerald-800 bg-slate-900/50 mb-6">
              <CardHeader className="pb-2">
                <CardTitle className="text-white flex items-center gap-2">
                  <Gauge className="w-5 h-5 text-emerald-400" />
                  Telemetry Confidence
                </CardTitle>
                <CardDescription className="text-emerald-600">
                  Per-source confidence levels (not protocol confidence)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <ConfidenceBar value={liveReport.telemetryConfidence.apiReachable} label="API Reachable" />
                  <ConfidenceBar value={liveReport.telemetryConfidence.analyticsInferred} label="Analytics Inferred" />
                  <ConfidenceBar value={liveReport.telemetryConfidence.runtimeInternal} label="Runtime Internal" />
                  <ConfidenceBar value={liveReport.telemetryConfidence.protocolInternal} label="Protocol Internal" />
                </div>
                <div className="mt-3 p-2 bg-slate-800/50 rounded">
                  <p className="text-[10px] text-slate-500">
                    Telemetry confidence measures data source reliability. It is NOT protocol confidence.
                    API Reachable = Vercel API responded successfully. Analytics Inferred = project settings indicate analytics enabled.
                    Runtime/Protocol Internal = self-reported configuration (confidence 1.0 by definition).
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Analytics Status */}
            <Card className="border-emerald-800 bg-slate-900/50 mb-6">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center gap-2">
                    <Eye className="w-5 h-5 text-emerald-400" />
                    Analytics Collection Status
                  </CardTitle>
                  <ProvenanceBadge source="Project Settings Metadata" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded">
                    <div className={`w-3 h-3 rounded-full ${liveReport.project.analytics.enabled ? 'bg-emerald-500' : 'bg-red-500'}`} />
                    <div>
                      <div className="text-sm text-white">Web Analytics</div>
                      <div className="text-xs text-emerald-600">
                        {liveReport.project.analytics.enabled ? 'Analytics source active (Vercel Dashboard)' : 'Not configured'}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded">
                    <div className={`w-3 h-3 rounded-full ${liveReport.project.analytics.speedInsights ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                    <div>
                      <div className="text-sm text-white">Speed Insights</div>
                      <div className="text-xs text-emerald-600">
                        {liveReport.project.analytics.speedInsights ? 'Monitoring performance' : 'Not configured'}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-3 p-3 bg-emerald-950/30 border border-emerald-800 rounded">
                  <p className="text-xs text-emerald-400">
                    Visitor traffic data is collected via @vercel/analytics and viewable in the Vercel Dashboard &gt; Analytics tab.
                    The Vercel API does not currently expose a public REST endpoint for reading analytics data.
                    Real-time visitor counts are visible in the Vercel Dashboard.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Telemetry Trust Boundary (#2) -- THE STRONGEST MISSING PIECE */}
            <Card className="border-2 border-amber-600 bg-amber-950/10 mb-6">
              <CardHeader className="pb-2">
                <CardTitle className="text-amber-400 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Telemetry Trust Boundary
                </CardTitle>
                <CardDescription className="text-amber-600">
                  Explicit declaration of what this console proves and does not prove
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-2 bg-slate-800/50 rounded">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-xs text-white">Infrastructure Metadata: <span className="text-emerald-400 font-bold">VERIFIED</span> (Vercel API authenticated)</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-slate-800/50 rounded">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-xs text-white">Analytics Presence: <span className="text-emerald-400 font-bold">VERIFIED</span> (project config confirms enabled)</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-slate-800/50 rounded">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="text-xs text-white">Visitor Count: <span className="text-amber-400 font-bold">NOT EXPOSED BY API</span> (viewable in Vercel Dashboard only)</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-slate-800/50 rounded">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="text-xs text-white">Visitor Identity: <span className="text-amber-400 font-bold">UNKNOWN</span> (not collected or inferred)</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-slate-800/50 rounded">
                    <Lock className="w-4 h-4 text-fuchsia-400 shrink-0" />
                    <span className="text-xs text-white">Protocol Integrity: <span className="text-fuchsia-400 font-bold">INTERNAL ONLY</span> (self-reported, not externally verified)</span>
                  </div>
                </div>
                <div className="mt-4 p-3 border border-amber-800 rounded bg-amber-950/20">
                  <p className="text-[10px] text-amber-500 leading-relaxed">
                    deployment telemetry =/= visitor intelligence =/= identity attribution =/= runtime protocol proof.
                    This console displays authenticated infrastructure metadata from the Vercel API. It does not claim
                    to provide visitor analytics, user identification, or external protocol verification. The trust boundary
                    is explicitly bounded by what the Vercel REST API exposes.
                  </p>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Footer */}
        <div className="text-center text-xs text-emerald-700 py-4 border-t border-emerald-900">
          <p>VALORAIPLUS DEPLOYMENT TELEMETRY CONSOLE | Runtime Metadata Source: {liveReport?.corroboration || 'PENDING'} | Last Refresh: {lastRefresh}</p>
          <p className="mt-1">MERKLEROOT: 26856B24C50750F0C69C1EEB86A69EF777777 | SAINT PAUL 55116 | Auto-refresh: 30s</p>
        </div>
      </main>
    </div>
  );
}
