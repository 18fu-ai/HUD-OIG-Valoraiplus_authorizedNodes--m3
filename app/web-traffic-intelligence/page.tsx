'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Globe,
  Users,
  Eye,
  BarChart3,
  MapPin,
  ShieldAlert,
  Fingerprint,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  Tag,
  Monitor,
  Activity,
  Lock,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface AccessLog {
  id              : string
  visitor_hash    : string
  session_hash    : string | null
  request_path    : string
  request_category: string
  ua_family       : string | null
  referrer_origin : string | null
  country_code    : string | null
  region_code     : string | null
  is_anomaly      : boolean
  anomaly_type    : string | null
  anomaly_score   : number
  created_at      : string
}

interface SessionRollup {
  visitor_hash  : string
  total_requests: number
  first_seen    : string
  last_seen     : string
}

interface DashboardStats {
  total_views      : number
  unique_visitors  : number
  unique_sessions  : number
  anomaly_count    : number
  by_path          : Record<string, number>
  by_country       : Record<string, number>
  by_category      : Record<string, number>
  by_ua_family     : Record<string, number>
  by_referrer      : Record<string, number>
  by_anomaly_type  : Record<string, number>
  recent_anomalies : AccessLog[]
  sessions         : SessionRollup[]
}

// ---------------------------------------------------------------------------
// Supabase (anon key — RLS protects everything)
// ---------------------------------------------------------------------------
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL        || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY   || '',
)

// ---------------------------------------------------------------------------
// Stat builder
// ---------------------------------------------------------------------------
function buildStats(logs: AccessLog[], sessions: SessionRollup[]): DashboardStats {
  const by_path       : Record<string, number> = {}
  const by_country    : Record<string, number> = {}
  const by_category   : Record<string, number> = {}
  const by_ua_family  : Record<string, number> = {}
  const by_referrer   : Record<string, number> = {}
  const by_anomaly_type: Record<string, number> = {}
  const recent_anomalies: AccessLog[] = []

  for (const log of logs) {
    by_path[log.request_path] = (by_path[log.request_path] || 0) + 1
    if (log.country_code)   by_country[log.country_code] = (by_country[log.country_code] || 0) + 1
    if (log.request_category) by_category[log.request_category] = (by_category[log.request_category] || 0) + 1
    if (log.ua_family)      by_ua_family[log.ua_family]  = (by_ua_family[log.ua_family]  || 0) + 1
    if (log.referrer_origin) by_referrer[log.referrer_origin] = (by_referrer[log.referrer_origin] || 0) + 1
    if (log.is_anomaly && log.anomaly_type) {
      by_anomaly_type[log.anomaly_type] = (by_anomaly_type[log.anomaly_type] || 0) + 1
      recent_anomalies.push(log)
    }
  }

  const unique_visitors = new Set(logs.map(l => l.visitor_hash)).size
  const unique_sessions = new Set(logs.map(l => l.session_hash).filter(Boolean)).size

  return {
    total_views   : logs.length,
    unique_visitors,
    unique_sessions,
    anomaly_count : recent_anomalies.length,
    by_path,
    by_country,
    by_category,
    by_ua_family,
    by_referrer,
    by_anomaly_type,
    recent_anomalies: recent_anomalies.slice(0, 12),
    sessions        : sessions.slice(0, 10),
  }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function anomalyColor(type: string | null): string {
  if (!type)                               return 'text-muted-foreground'
  if (type === 'INVALID_PATH_TRAVERSAL')   return 'text-red-500'
  if (type === 'AUTOMATED_BOT_DETECTION')  return 'text-amber-500'
  return 'text-cyan-500'
}

function anomalyBadgeVariant(score: number): 'destructive' | 'secondary' | 'outline' {
  if (score >= 0.8) return 'destructive'
  if (score >= 0.5) return 'secondary'
  return 'outline'
}

function categoryColor(cat: string): string {
  if (cat === 'CASE_SYSTEM')        return 'text-primary'
  if (cat === 'DOCUMENT_DOWNLOAD')  return 'text-amber-500'
  if (cat === 'API')                return 'text-cyan-500'
  if (cat === 'HOME')               return 'text-emerald-500'
  return 'text-muted-foreground'
}

function uaColor(family: string): string {
  if (family === 'BOT' || family === 'SCRIPT') return 'text-red-500'
  if (family === 'Chrome')  return 'text-blue-400'
  if (family === 'Firefox') return 'text-orange-400'
  if (family === 'Safari')  return 'text-sky-400'
  return 'text-muted-foreground'
}

// ---------------------------------------------------------------------------
// Bar row helper
// ---------------------------------------------------------------------------
function BarRow({ label, count, max, colorClass }: { label: string; count: number; max: number; colorClass?: string }) {
  return (
    <div className="flex items-center gap-3 p-2 rounded border border-border/50 hover:bg-secondary/20 transition-colors">
      <span className={`font-mono text-xs truncate flex-1 min-w-0 ${colorClass || 'text-foreground'}`}>{label}</span>
      <div className="flex items-center gap-2 shrink-0">
        <div className="w-20 h-1.5 bg-secondary rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full" style={{ width: `${Math.max(4, (count / max) * 100)}%` }} />
        </div>
        <span className="font-mono text-xs font-bold text-primary w-8 text-right">{count}</span>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------
export default function WebTrafficIntelligence() {
  const [stats24h, setStats24h]       = useState<DashboardStats | null>(null)
  const [stats14d, setStats14d]       = useState<DashboardStats | null>(null)
  const [loading, setLoading]         = useState(true)
  const [lastUpdated, setLastUpdated] = useState('')
  const [activeTab, setActiveTab]     = useState<'24h' | '14d'>('24h')

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const now  = new Date()
      const t24h = new Date(now.getTime() -       24 * 3600 * 1000).toISOString()
      const t14d = new Date(now.getTime() - 14 * 24 * 3600 * 1000).toISOString()

      const [r24h, r14d, rSessions] = await Promise.all([
        supabase.from('valoraiplus_access_logs').select('*').gte('created_at', t24h).order('created_at', { ascending: false }),
        supabase.from('valoraiplus_access_logs').select('*').gte('created_at', t14d).order('created_at', { ascending: false }),
        supabase.from('valoraiplus_session_rollups').select('*').order('last_seen', { ascending: false }).limit(25),
      ])

      const sessions = rSessions.data || []
      setStats24h(buildStats((r24h.data  || []) as AccessLog[], sessions as SessionRollup[]))
      setStats14d(buildStats((r14d.data  || []) as AccessLog[], sessions as SessionRollup[]))
      setLastUpdated(new Date().toLocaleTimeString())
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 60_000)
    return () => clearInterval(interval)
  }, [fetchData])

  const stats  = activeTab === '24h' ? stats24h : stats14d
  const label  = activeTab === '24h' ? 'Last 24 Hours' : 'Last 14 Days'

  return (
    <div className="space-y-6 p-6 max-w-6xl mx-auto">

      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div className="space-y-1">
          <h1 className="font-mono text-2xl font-bold text-foreground tracking-tight">
            VALORAIPLUS Web Traffic Intelligence
          </h1>
          <p className="font-mono text-xs text-muted-foreground">
            Privacy-preserving access-audit telemetry &mdash; updated: {lastUpdated || '—'}
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

      {/* Tab selector */}
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

      {/* KPI row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'UNIQUE VISITORS',  value: stats?.unique_visitors  ?? 0, icon: Users,      color: 'text-primary',      border: 'border-primary/30'     },
          { label: 'UNIQUE SESSIONS',  value: stats?.unique_sessions  ?? 0, icon: Activity,   color: 'text-cyan-500',     border: 'border-cyan-500/30'    },
          { label: 'TOTAL PAGE VIEWS', value: stats?.total_views      ?? 0, icon: Eye,        color: 'text-emerald-500',  border: 'border-emerald-500/30' },
          { label: 'ANOMALIES',        value: stats?.anomaly_count    ?? 0, icon: ShieldAlert, color: 'text-red-500',     border: 'border-red-500/30'     },
        ].map(({ label: kLabel, value, icon: Icon, color, border }) => (
          <Card key={kLabel} className={`bg-card ${border}`}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-mono text-[10px] text-muted-foreground mb-1 uppercase">{kLabel}</p>
                  <p className={`font-mono text-3xl font-bold ${color}`}>
                    {loading ? '—' : value}
                  </p>
                </div>
                <Icon className={`w-7 h-7 ${color} opacity-30`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Request Categories + UA Family */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="font-mono text-sm flex items-center gap-2">
              <Tag className="w-4 h-4" />
              REQUEST CATEGORIES — {label.toUpperCase()}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1.5">
            {Object.entries(stats?.by_category || {})
              .sort(([, a], [, b]) => b - a)
              .map(([cat, count]) => {
                const max = Math.max(...Object.values(stats?.by_category || { x: 1 }))
                return <BarRow key={cat} label={cat} count={count} max={max} colorClass={categoryColor(cat)} />
              })}
            {Object.keys(stats?.by_category || {}).length === 0 && (
              <p className="font-mono text-xs text-muted-foreground">No category data yet</p>
            )}
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="font-mono text-sm flex items-center gap-2">
              <Monitor className="w-4 h-4" />
              UA FAMILY — {label.toUpperCase()}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1.5">
            {Object.entries(stats?.by_ua_family || {})
              .sort(([, a], [, b]) => b - a)
              .map(([family, count]) => {
                const max = Math.max(...Object.values(stats?.by_ua_family || { x: 1 }))
                return <BarRow key={family} label={family} count={count} max={max} colorClass={uaColor(family)} />
              })}
            {Object.keys(stats?.by_ua_family || {}).length === 0 && (
              <p className="font-mono text-xs text-muted-foreground">No UA data yet</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Anomaly panel */}
      <Card className="bg-card border-red-500/20">
        <CardHeader className="pb-3">
          <CardTitle className="font-mono text-sm flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-500" />
            ANOMALY INTELLIGENCE — {label.toUpperCase()}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-wrap gap-2 mb-3">
            {Object.entries(stats?.by_anomaly_type || {}).map(([type, count]) => (
              <div key={type} className="flex items-center gap-1.5 px-2 py-1 rounded bg-secondary/50 border border-border/60">
                <span className={`font-mono text-[10px] font-bold ${anomalyColor(type)}`}>{type}</span>
                <span className="font-mono text-[10px] text-muted-foreground">x{count}</span>
              </div>
            ))}
            {Object.keys(stats?.by_anomaly_type || {}).length === 0 && (
              <div className="flex items-center gap-2 text-emerald-500">
                <CheckCircle2 className="w-4 h-4" />
                <span className="font-mono text-xs">No anomalies detected in this window</span>
              </div>
            )}
          </div>
          {(stats?.recent_anomalies || []).length > 0 && (
            <div className="space-y-1.5">
              <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-2">Recent Anomaly Log</p>
              {stats!.recent_anomalies.map(log => (
                <div key={log.id} className="flex items-center justify-between p-2 rounded border border-red-500/10 bg-red-500/5 text-xs">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span className="font-mono text-muted-foreground shrink-0">{new Date(log.created_at).toLocaleTimeString()}</span>
                    <span className="font-mono text-foreground truncate">{log.request_path}</span>
                    {log.ua_family && <span className={`font-mono text-[10px] shrink-0 ${uaColor(log.ua_family)}`}>{log.ua_family}</span>}
                  </div>
                  <div className="flex items-center gap-2 shrink-0 ml-2">
                    {log.country_code && <span className="font-mono text-muted-foreground">{log.country_code}</span>}
                    <Badge variant={anomalyBadgeVariant(log.anomaly_score)}>{log.anomaly_score.toFixed(2)}</Badge>
                    <span className={`font-mono text-[10px] ${anomalyColor(log.anomaly_type)}`}>{log.anomaly_type}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Top pages */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="font-mono text-sm flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            TOP PAGES — {label.toUpperCase()}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1.5">
            {Object.entries(stats?.by_path || {})
              .sort(([, a], [, b]) => b - a)
              .slice(0, 14)
              .map(([path, count]) => {
                const max = Math.max(...Object.values(stats?.by_path || { x: 1 }))
                return <BarRow key={path} label={path} count={count} max={max} />
              })}
            {Object.keys(stats?.by_path || {}).length === 0 && (
              <p className="font-mono text-xs text-muted-foreground">No page view data available yet</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Geo + Referrer Origins + Sessions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="font-mono text-sm flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              GEO DISTRIBUTION
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1.5">
            {Object.entries(stats?.by_country || {})
              .sort(([, a], [, b]) => b - a)
              .slice(0, 10)
              .map(([code, count]) => (
                <div key={code} className="flex justify-between items-center p-2 rounded border border-border/50 text-xs">
                  <div className="flex items-center gap-2">
                    <Globe className="w-3 h-3 text-cyan-500" />
                    <span className="font-mono text-foreground">{code}</span>
                  </div>
                  <span className="font-mono font-bold text-primary">{count}</span>
                </div>
              ))}
            {Object.keys(stats?.by_country || {}).length === 0 && (
              <p className="font-mono text-xs text-muted-foreground">No geo data yet</p>
            )}
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="font-mono text-sm flex items-center gap-2">
              <Activity className="w-4 h-4" />
              REFERRER ORIGINS
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1.5">
            {Object.entries(stats?.by_referrer || {})
              .sort(([, a], [, b]) => b - a)
              .slice(0, 10)
              .map(([origin, count]) => (
                <div key={origin} className="flex justify-between items-center p-2 rounded border border-border/50 text-xs">
                  <span className="font-mono text-foreground truncate max-w-[130px]">{origin}</span>
                  <span className="font-mono font-bold text-primary shrink-0 ml-2">{count}</span>
                </div>
              ))}
            {Object.keys(stats?.by_referrer || {}).length === 0 && (
              <p className="font-mono text-xs text-muted-foreground">No referrer data yet</p>
            )}
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="font-mono text-sm flex items-center gap-2">
              <Fingerprint className="w-4 h-4" />
              SESSION ROLLUPS
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1.5">
            {(stats?.sessions || []).map(session => (
              <div key={session.visitor_hash} className="flex items-center justify-between p-2 rounded border border-border/50 text-xs">
                <span className="font-mono text-muted-foreground truncate max-w-[100px]">
                  {session.visitor_hash.slice(0, 10)}…
                </span>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-mono text-foreground">{session.total_requests}r</span>
                  <span className="font-mono text-[10px] text-muted-foreground">
                    {new Date(session.last_seen).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
            {(stats?.sessions || []).length === 0 && (
              <p className="font-mono text-xs text-muted-foreground">No session data yet</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Privacy contract footer */}
      <Card className="bg-card border-border/50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Lock className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <p className="font-mono text-[10px] text-muted-foreground leading-relaxed">
              VALORAIPLUS maintains a privacy-preserving access-audit layer for owned web infrastructure.
              The system records timestamped technical access events, route paths, request categories,
              coarse hosting-provider geolocation headers, and anonymized HMAC-based visitor/session
              indicators. It does not store raw IP addresses, raw user-agent strings, private contact
              information, medical information, or confidential witness material. The system is used
              for security monitoring, access-pattern review, and evidence-preservation support only.
              All visitor identifiers are HMAC-SHA256 hashed. Auto-refresh: 60s.
            </p>
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-[10px] text-emerald-500">LIVE</span>
            </div>
          </div>
        </CardContent>
      </Card>

    </div>
  )
}
