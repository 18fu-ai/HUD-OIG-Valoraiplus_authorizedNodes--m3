'use client';

import { useState, useEffect, useCallback } from 'react';
import { CDSHeader } from '@/components/cds/header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Activity, Globe, Eye,
  RefreshCw, CheckCircle2, Shield,
  BarChart3, Zap, Server, GitBranch, Link2,
  AlertTriangle, Loader2
} from 'lucide-react';

interface LiveReport {
  status: string;
  timestamp: string;
  corroboration: string;
  schema: string;
  project: {
    id: string;
    name: string;
    framework: string;
    nodeVersion: string;
    updatedAt: string | null;
    analytics: {
      enabled: boolean;
      speedInsights: boolean;
    };
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
  };
  domains: {
    total: number;
    list: Array<{
      name: string;
      verified: boolean;
      configured: boolean;
    }>;
  };
  runtime: {
    routes: string[];
    schema: string;
    protocolConfidence: number;
    evidenceType: string;
    spoliationDefense: string;
    forensicBlocks: number;
    poppaGBlock: string;
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

export default function TrafficDashboardPage() {
  const [mounted, setMounted] = useState(false);
  const [liveReport, setLiveReport] = useState<LiveReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<string>('');
  const [refreshCount, setRefreshCount] = useState(0);

  const fetchLiveData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/traffic/live');
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || `API returned ${res.status}`);
      }
      const data = await res.json();
      setLiveReport(data);
      setLastRefresh(new Date().toLocaleTimeString());
      setRefreshCount(prev => prev + 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch live data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    fetchLiveData();
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchLiveData, 30000);
    return () => clearInterval(interval);
  }, [fetchLiveData]);

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
            <Badge variant="outline" className="border-emerald-700 text-emerald-500 text-xs">
              Refreshes: {refreshCount}
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchLiveData}
              disabled={loading}
              className="border-emerald-700 text-emerald-400 hover:bg-emerald-950"
            >
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
            {/* Project Overview */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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

              <Card className="border-emerald-800 bg-slate-900/50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Shield className="w-5 h-5 text-fuchsia-500" />
                    <Badge variant="outline" className="border-emerald-500 text-emerald-400 bg-emerald-950/40 text-xs">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      100%
                    </Badge>
                  </div>
                  <div className="text-lg font-black text-white">Protocol</div>
                  <div className="text-xs text-emerald-600">{liveReport.runtime.schema} | {liveReport.runtime.evidenceType}</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 mb-6">
              {/* Latest Deployment */}
              <Card className="border-emerald-800 bg-slate-900/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white flex items-center gap-2">
                    <GitBranch className="w-5 h-5 text-emerald-400" />
                    Latest Deployment
                  </CardTitle>
                  <CardDescription className="text-emerald-600">
                    Most recent production deployment
                  </CardDescription>
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
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-emerald-600">URL</span>
                        <span className="text-xs text-emerald-400 truncate max-w-48">{latestDeploy.url}</span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-emerald-600">No deployments found</p>
                  )}
                </CardContent>
              </Card>

              {/* Domains */}
              <Card className="border-emerald-800 bg-slate-900/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white flex items-center gap-2">
                    <Link2 className="w-5 h-5 text-emerald-400" />
                    Active Domains
                  </CardTitle>
                  <CardDescription className="text-emerald-600">
                    Connected endpoints and verification status
                  </CardDescription>
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
                          <div className="flex gap-2">
                            <Badge variant="outline" className={`text-xs ${domain.verified ? 'border-emerald-500 text-emerald-400' : 'border-amber-500 text-amber-400'}`}>
                              {domain.verified ? 'Verified' : 'Pending'}
                            </Badge>
                          </div>
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
                <CardTitle className="text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-emerald-400" />
                  Recent Deployments
                </CardTitle>
                <CardDescription className="text-emerald-600">
                  Last {liveReport.deployments.recent.length} deployments from Vercel API
                </CardDescription>
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

            {/* Runtime Architecture Status */}
            <Card className="border-emerald-800 bg-slate-900/50 mb-6">
              <CardHeader className="pb-2">
                <CardTitle className="text-white flex items-center gap-2">
                  <Shield className="w-5 h-5 text-emerald-400" />
                  Runtime Architecture Status
                </CardTitle>
                <CardDescription className="text-emerald-600">
                  REV_34 Protocol Enforcement Matrix
                </CardDescription>
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

                <div className="border-t border-emerald-900 pt-3">
                  <div className="text-xs text-emerald-600 mb-2">Active Routes ({liveReport.runtime.routes.length})</div>
                  <div className="flex flex-wrap gap-2">
                    {liveReport.runtime.routes.map((route) => (
                      <Badge key={route} variant="outline" className="border-emerald-700 text-emerald-500 text-xs">
                        {route}
                      </Badge>
                    ))}
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

            {/* Analytics Status */}
            <Card className="border-emerald-800 bg-slate-900/50 mb-6">
              <CardHeader className="pb-2">
                <CardTitle className="text-white flex items-center gap-2">
                  <Eye className="w-5 h-5 text-emerald-400" />
                  Analytics Collection Status
                </CardTitle>
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
