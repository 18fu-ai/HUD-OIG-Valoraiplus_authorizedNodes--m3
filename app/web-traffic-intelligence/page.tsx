'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Globe,
  Users,
  Eye,
  Monitor,
  Smartphone,
  Tablet,
  BarChart3,
  Clock,
  MapPin,
  TrendingUp,
  ShieldAlert,
  Fingerprint,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface AccessLog {
  id: string
  visitor_hash: string
  request_path: string
  country_code: string | null
  region_code: string | null
  city_name: string | null
  referrer: string | null
  is_anomaly: boolean
  anomaly_type: string | null
  anomaly_score: number
  created_at: string
}

interface SessionRollup {
  visitor_hash: string
  total_requests: number
  first_seen: string
  last_seen: string
}

interface DashboardStats {
  total_views: number
  unique_visitors: number
  anomaly_count: number
  by_path: Record<string, number>
  by_country: Record<string, number>
  by_anomaly_type: Record<string, number>
  recent_anomalies: AccessLog[]
  sessions: SessionRollup[]
}

// ---------------------------------------------------------------------------
// Supabase (anon key — RLS protects sensitive data)
// ---------------------------------------------------------------------------

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL   || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
)

// ---------------------------------------------------------------------------
// Helper
// ---------------------------------------------------------------------------

function buildStats(logs: AccessLog[], sessions: SessionRollup[]): DashboardStats {
  const by_path: Record<string, number>         = {}
  const by_country: Record<string, number>      = {}
  const by_anomaly_type: Record<string, number> = {}
  const recent_anomalies: AccessLog[]           = []

  for (const log of logs) {
    by_path[log.request_path] = (by_path[log.request_path] || 0) + 1
    if (log.country_code) by_country[log.country_code] = (by_country[log.country_code] || 0) + 1
    if (log.is_anomaly && log.anomaly_type) {
      by_anomaly_type[log.anomaly_type] = (by_anomaly_type[log.anomaly_type] || 0) + 1
      recent_anomalies.push(log)
    }
  }

  const unique_visitors = new Set(logs.map(l => l.visitor_hash)).size

  return {
    total_views     : logs.length,
    unique_visitors,
    anomaly_count   : recent_anomalies.length,
    by_path,
    by_country,
    by_anomaly_type,
    recent_anomalies: recent_anomalies.slice(0, 10),
    sessions        : sessions.slice(0, 10),
  }
}

function anomalyColor(type: string | null) {
  if (!type) return 'text-muted-foreground'
  if (type === 'INVALID_PATH_TRAVERSAL') return 'text-red-500'
  if (type === 'AUTOMATED_BOT_DETECTION') return 'text-amber-500'
  return 'text-cyan-500'
}

function anomalyBadgeVariant(score: number): 'destructive' | 'secondary' | 'outline' {
  if (score >= 0.8) return 'destructive'
  if (score >= 0.5) return 'secondary'
  return 'outline'
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function WebTrafficIntelligence() {
  const [stats24h, setStats24h]       = useState<DashboardStats | null>(null)
  const [stats14d, setStats14d]       = useState<DashboardStats | null>(null)
  const [loading, setLoading]         = useState(true)
  const [lastUpdated, setLastUpdated] = useState('')
  const [activeTab, setActiveTab]     = useState<'24h' | '14d'>('24h')

  const fetchData = async () => {
    setLoading(true)
    try {
      const now   = new Date()
      const t24h  = new Date(now.getTime() - 24  * 3600 * 1000).toISOString()
      const t14d  = new Date(now.getTime() - 14 * 24 * 3600 * 1000).toISOString()

      const [logs24hRes, logs14dRes, sessionsRes] = await Promise.all([
        supabase
          .from('valoraiplus_access_logs')
          .select('*')
          .gte('created_at', t24h)
          .order('created_at', { ascending: false }),
        supabase
          .from('valoraiplus_access_logs')
          .select('*')
          .gte('created_at', t14d)
          .order('created_at', { ascending: false }),
        supabase
          .from('valoraiplus_session_rollups')
          .select('*')
          .order('last_seen', { ascending: false })
          .limit(25),
      ])

      const sessions = sessionsRes.data || []
      setStats24h(buildStats(logs24hRes.data || [], sessions))
      setStats14d(buildStats(logs14dRes.data || [], sessions))
      setLastUpdated(new Date().toLocaleTimeString())
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 60_000)
    return () => clearInterval(interval)
  }, [])

  const stats = activeTab === '24h' ? stats24h : stats14d

  return (
    <div className="space-y-6 p-6 max-w-6xl mx-auto">

      {/* ---------------------------------------------------------------- Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h1 className="font-mono text-2xl font-bold text-foreground tracking-tight">
            VALORAIPLUS Web Traffic Intelligence
          </h1>
          <p className="font-mono text-xs text-muted-foreground">
            HMAC-SHA256 privacy-preserving visitor telemetry &mdash; Last updated: {lastUpdated || '—'}
          </p>
        </div>
        <button
          onClick={fetchData}
          disabled={loading}
          className="flex items-center gap-2 px-3 py-1.5 rounded border border-border bg-secondary/40 hover:bg-secondary/70 transition-colors font-mono text-xs text-foreground disabled:opacity-50"
        >
          <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* ---------------------------------------------------------------- Tab selector */}
      <div className="flex gap-2">
        {(['24h', '14d'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded font-mono text-xs border transition-colors ${
              activeTab === tab
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-secondary/30 text-muted-foreground border-border hover:bg-secondary/60'
            }`}
          >
            {tab === '24h' ? 'Last 24 Hours' : 'Last 14 Days'}
          </button>
        ))}
      </div>

      {/* ---------------------------------------------------------------- KPI row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-card border-primary/30">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-mono text-xs text-muted-foreground mb-1">UNIQUE VISITORS</p>
                <p className="font-mono text-3xl font-bold text-primary">
                  {loading ? '—' : (stats?.unique_visitors ?? 0)}
                </p>
              </div>
              <Users className="w-8 h-8 text-primary/40" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-emerald-500/30">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-mono text-xs text-muted-foreground mb-1">TOTAL PAGE VIEWS</p>
                <p className="font-mono text-3xl font-bold text-emerald-500">
                  {loading ? '—' : (stats?.total_views ?? 0)}
                </p>
              </div>
              <Eye className="w-8 h-8 text-emerald-500/40" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-red-500/30">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-mono text-xs text-muted-foreground mb-1">ANOMALIES DETECTED</p>
                <p className="font-mono text-3xl font-bold text-red-500">
                  {loading ? '—' : (stats?.anomaly_count ?? 0)}
                </p>
              </div>
              <ShieldAlert className="w-8 h-8 text-red-500/40" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ---------------------------------------------------------------- Anomaly panel */}
      <Card className="bg-card border-red-500/20">
        <CardHeader className="pb-3">
          <CardTitle className="font-mono text-sm flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-500" />
            ANOMALY INTELLIGENCE — {activeTab.toUpperCase()}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Anomaly type breakdown */}
          <div className="flex flex-wrap gap-2 mb-3">
            {Object.entries(stats?.by_anomaly_type || {}).map(([type, count]) => (
              <div
                key={type}
                className="flex items-center gap-1.5 px-2 py-1 rounded bg-secondary/50 border border-border/60"
              >
                <span className={`font-mono text-[10px] font-bold ${anomalyColor(type)}`}>{type}</span>
                <span className="font-mono text-[10px] text-muted-foreground">×{count}</span>
              </div>
            ))}
            {Object.keys(stats?.by_anomaly_type || {}).length === 0 && (
              <div className="flex items-center gap-2 text-emerald-500">
                <CheckCircle2 className="w-4 h-4" />
                <span className="font-mono text-xs">No anomalies detected in this window</span>
              </div>
            )}
          </div>

          {/* Recent anomaly log */}
          {(stats?.recent_anomalies || []).length > 0 && (
            <div className="space-y-1.5">
              <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-2">Recent Anomaly Log</p>
              {stats!.recent_anomalies.map(log => (
                <div
                  key={log.id}
                  className="flex items-center justify-between p-2 rounded border border-red-500/10 bg-red-500/5 text-xs"
                >
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span className="font-mono text-muted-foreground shrink-0">
                      {new Date(log.created_at).toLocaleTimeString()}
                    </span>
                    <span className="font-mono text-foreground truncate">{log.request_path}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 ml-2">
                    {log.country_code && (
                      <span className="font-mono text-muted-foreground">{log.country_code}</span>
                    )}
                    <Badge variant={anomalyBadgeVariant(log.anomaly_score)}>
                      {log.anomaly_score.toFixed(2)}
                    </Badge>
                    <span className={`font-mono text-[10px] ${anomalyColor(log.anomaly_type)}`}>
                      {log.anomaly_type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* ---------------------------------------------------------------- Top pages */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="font-mono text-sm flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            TOP PAGES — {activeTab.toUpperCase()}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1.5">
            {Object.entries(stats?.by_path || {})
              .sort(([, a], [, b]) => b - a)
              .slice(0, 12)
              .map(([path, count]) => {
                const max = Math.max(...Object.values(stats?.by_path || {}))
                return (
                  <div
                    key={path}
                    className="flex items-center gap-3 p-2 rounded border border-border/50 hover:bg-secondary/30 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <span className="font-mono text-xs text-foreground truncate block">{path}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <div className="w-24 h-1.5 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${(count / max) * 100}%` }}
                        />
                      </div>
                      <span className="font-mono text-xs font-bold text-primary w-8 text-right">{count}</span>
                    </div>
                  </div>
                )
              })}
            {Object.keys(stats?.by_path || {}).length === 0 && (
              <p className="font-mono text-xs text-muted-foreground">No page view data available yet</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* ---------------------------------------------------------------- Country + Sessions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="font-mono text-sm flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              GEOGRAPHIC DISTRIBUTION
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1.5">
            {Object.entries(stats?.by_country || {})
              .sort(([, a], [, b]) => b - a)
              .slice(0, 10)
              .map(([code, count]) => (
                <div
                  key={code}
                  className="flex justify-between items-center p-2 rounded border border-border/50 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <Globe className="w-3 h-3 text-cyan-500" />
                    <span className="font-mono text-foreground">{code}</span>
                  </div>
                  <span className="font-mono font-bold text-primary">{count}</span>
                </div>
              ))}
            {Object.keys(stats?.by_country || {}).length === 0 && (
              <p className="font-mono text-xs text-muted-foreground">No geo data available yet</p>
            )}
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="font-mono text-sm flex items-center gap-2">
              <Fingerprint className="w-4 h-4" />
              SESSION ROLLUPS (TOP 10)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1.5">
            {(stats?.sessions || []).slice(0, 10).map(session => (
              <div
                key={session.visitor_hash}
                className="flex items-center justify-between p-2 rounded border border-border/50 text-xs"
              >
                <span className="font-mono text-muted-foreground truncate max-w-[120px]">
                  {session.visitor_hash.slice(0, 12)}…
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-foreground">{session.total_requests} reqs</span>
                  <span className="font-mono text-[10px] text-muted-foreground">
                    {new Date(session.last_seen).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
            {(stats?.sessions || []).length === 0 && (
              <p className="font-mono text-xs text-muted-foreground">No session data available yet</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* ---------------------------------------------------------------- Status bar */}
      <div className="pt-4 border-t border-border flex items-center justify-between">
        <p className="font-mono text-[10px] text-muted-foreground">
          VALORAIPLUS® Phase 2 Safe Access Audit Layer — All visitor identifiers HMAC-SHA256 hashed. No raw IP addresses stored. Auto-refreshes every 60 seconds.
        </p>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono text-[10px] text-emerald-500">LIVE</span>
        </div>
      </div>
    </div>
  )
}
