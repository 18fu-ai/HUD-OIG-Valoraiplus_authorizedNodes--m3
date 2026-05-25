'use client'

/**
 * AccessAuditDashboard
 * ---------------------------------------------------------------------------
 * Standalone embeddable component that renders the VALORAIPLUS Phase 2
 * access-audit telemetry summary. Queries the two Supabase tables directly
 * using the anon key (RLS enforces read-only admin access).
 *
 * Props:
 *   window  — '24h' | '14d' (default: '24h')
 *   title   — optional override for the card header
 */

import { useEffect, useState, useCallback } from 'react'
import { createClient }                      from '@supabase/supabase-js'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge }                             from '@/components/ui/badge'
import {
  ShieldAlert,
  CheckCircle2,
  Users,
  Eye,
  Activity,
  Globe,
  AlertTriangle,
  RefreshCw,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type WindowOption = '24h' | '14d'

interface AccessLog {
  id               : string
  visitor_hash     : string
  session_hash     : string | null
  request_path     : string
  request_category : string
  user_agent_family: string | null
  country_code     : string | null
  is_anomaly       : boolean
  anomaly_type     : string | null
  anomaly_score    : number
  created_at       : string
}

interface SessionRollup {
  visitor_hash  : string
  total_requests: number
  last_seen     : string
}

interface Summary {
  unique_visitors : number
  unique_sessions : number
  total_views     : number
  anomaly_count   : number
  top_paths       : [string, number][]
  top_countries   : [string, number][]
  by_anomaly_type : Record<string, number>
  recent_anomalies: AccessLog[]
}

// ---------------------------------------------------------------------------
// Supabase client (anon)
// ---------------------------------------------------------------------------
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL      || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
)

function msForWindow(w: WindowOption): number {
  return w === '24h' ? 24 * 3_600_000 : 14 * 24 * 3_600_000
}

function buildSummary(logs: AccessLog[], sessions: SessionRollup[]): Summary {
  const by_path       : Record<string, number> = {}
  const by_country    : Record<string, number> = {}
  const by_anomaly_type: Record<string, number> = {}
  const recent_anomalies: AccessLog[] = []

  for (const l of logs) {
    by_path[l.request_path] = (by_path[l.request_path] || 0) + 1
    if (l.country_code) by_country[l.country_code] = (by_country[l.country_code] || 0) + 1
    if (l.is_anomaly && l.anomaly_type) {
      by_anomaly_type[l.anomaly_type] = (by_anomaly_type[l.anomaly_type] || 0) + 1
      recent_anomalies.push(l)
    }
  }

  return {
    unique_visitors : new Set(logs.map(l => l.visitor_hash)).size,
    unique_sessions : new Set(logs.map(l => l.session_hash).filter(Boolean)).size,
    total_views     : logs.length,
    anomaly_count   : recent_anomalies.length,
    top_paths       : Object.entries(by_path).sort(([,a],[,b]) => b - a).slice(0, 8),
    top_countries   : Object.entries(by_country).sort(([,a],[,b]) => b - a).slice(0, 6),
    by_anomaly_type,
    recent_anomalies: recent_anomalies.slice(0, 6),
  }
}

function badgeVariant(score: number): 'destructive' | 'secondary' | 'outline' {
  if (score >= 80) return 'destructive'
  if (score >= 50) return 'secondary'
  return 'outline'
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
interface AccessAuditDashboardProps {
  window? : WindowOption
  title?  : string
  compact?: boolean
}

export function AccessAuditDashboard({
  window  = '24h',
  title,
  compact = false,
}: AccessAuditDashboardProps) {
  const [summary,  setSummary]  = useState<Summary | null>(null)
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState<string | null>(null)
  const [refreshed, setRefreshed] = useState('')

  const fetch = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const since = new Date(Date.now() - msForWindow(window)).toISOString()
      const [logsRes, sessionsRes] = await Promise.all([
        supabase
          .from('valoraiplus_access_logs')
          .select('id,visitor_hash,session_hash,request_path,request_category,user_agent_family,country_code,is_anomaly,anomaly_type,anomaly_score,created_at')
          .gte('created_at', since)
          .order('created_at', { ascending: false }),
        supabase
          .from('valoraiplus_session_rollups')
          .select('visitor_hash,total_requests,last_seen')
          .order('last_seen', { ascending: false })
          .limit(20),
      ])

      if (logsRes.error) throw logsRes.error
      setSummary(buildSummary((logsRes.data || []) as AccessLog[], (sessionsRes.data || []) as SessionRollup[]))
      setRefreshed(new Date().toLocaleTimeString())
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Unknown error'
      setError(msg.includes('schema cache') || msg.includes('does not exist')
        ? 'Migration 003/004 not yet applied — run supabase migration up'
        : msg)
    } finally {
      setLoading(false)
    }
  }, [window])

  useEffect(() => {
    fetch()
    const id = setInterval(fetch, 60_000)
    return () => clearInterval(id)
  }, [fetch])

  const label = window === '24h' ? 'Last 24 Hours' : 'Last 14 Days'

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-3">
          <CardTitle className="font-mono text-sm flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-primary" />
            {title || `VALORAIPLUS ACCESS AUDIT — ${label.toUpperCase()}`}
          </CardTitle>
          <button
            onClick={fetch}
            disabled={loading}
            className="flex items-center gap-1.5 px-2 py-1 rounded border border-border bg-secondary/30 hover:bg-secondary/60 transition-colors font-mono text-[10px] text-muted-foreground disabled:opacity-40"
          >
            <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
            {refreshed || 'Refresh'}
          </button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {error ? (
          <div className="font-mono text-xs text-red-500 p-3 rounded border border-red-500/20 bg-red-500/5">
            {error}
          </div>
        ) : (
          <>
            {/* KPIs */}
            <div className={`grid gap-3 ${compact ? 'grid-cols-2' : 'grid-cols-4'}`}>
              {[
                { icon: Users,    label: 'VISITORS', value: summary?.unique_visitors ?? 0, color: 'text-primary'     },
                { icon: Activity, label: 'SESSIONS',  value: summary?.unique_sessions ?? 0, color: 'text-cyan-500'   },
                { icon: Eye,      label: 'VIEWS',     value: summary?.total_views     ?? 0, color: 'text-emerald-500' },
                { icon: AlertTriangle, label: 'ANOMALIES', value: summary?.anomaly_count ?? 0, color: 'text-red-500' },
              ].map(({ icon: Icon, label: kl, value, color }) => (
                <div key={kl} className="flex items-center gap-2 p-2 rounded border border-border/50 bg-secondary/20">
                  <Icon className={`w-4 h-4 ${color} shrink-0`} />
                  <div>
                    <p className="font-mono text-[9px] text-muted-foreground">{kl}</p>
                    <p className={`font-mono text-lg font-bold ${color}`}>{loading ? '—' : value}</p>
                  </div>
                </div>
              ))}
            </div>

            {!compact && (
              <>
                {/* Top paths */}
                {(summary?.top_paths.length ?? 0) > 0 && (
                  <div className="space-y-1">
                    <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">Top Paths</p>
                    {summary!.top_paths.map(([path, count]) => (
                      <div key={path} className="flex justify-between items-center px-2 py-1 rounded bg-secondary/20 text-xs">
                        <span className="font-mono text-foreground truncate max-w-[60%]">{path}</span>
                        <span className="font-mono font-bold text-primary shrink-0">{count}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Geo */}
                {(summary?.top_countries.length ?? 0) > 0 && (
                  <div className="space-y-1">
                    <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">Geo</p>
                    <div className="flex flex-wrap gap-1.5">
                      {summary!.top_countries.map(([code, count]) => (
                        <div key={code} className="flex items-center gap-1 px-2 py-0.5 rounded border border-border/50 text-xs">
                          <Globe className="w-3 h-3 text-cyan-500" />
                          <span className="font-mono text-foreground">{code}</span>
                          <span className="font-mono text-muted-foreground">{count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Anomaly summary */}
            <div className="space-y-1.5">
              <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">Anomaly Intelligence</p>
              {Object.keys(summary?.by_anomaly_type || {}).length === 0 ? (
                <div className="flex items-center gap-2 text-emerald-500">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span className="font-mono text-xs">No anomalies in this window</span>
                </div>
              ) : (
                <>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {Object.entries(summary!.by_anomaly_type).map(([type, count]) => (
                      <div key={type} className="flex items-center gap-1 px-2 py-0.5 rounded border border-red-500/20 bg-red-500/5 text-xs">
                        <span className="font-mono text-red-400">{type}</span>
                        <span className="font-mono text-muted-foreground">x{count}</span>
                      </div>
                    ))}
                  </div>
                  {summary!.recent_anomalies.map(log => (
                    <div key={log.id} className="flex items-center justify-between p-1.5 rounded border border-red-500/10 bg-red-500/5 text-xs gap-2">
                      <span className="font-mono text-muted-foreground shrink-0">{new Date(log.created_at).toLocaleTimeString()}</span>
                      <span className="font-mono text-foreground truncate flex-1 min-w-0">{log.request_path}</span>
                      <Badge variant={badgeVariant(log.anomaly_score)} className="shrink-0 text-[9px]">{log.anomaly_score}</Badge>
                    </div>
                  ))}
                </>
              )}
            </div>

            {/* Privacy statement */}
            <div className="flex items-start gap-2 p-2 rounded border border-border/40 bg-secondary/10">
              <ShieldAlert className="w-3 h-3 text-muted-foreground mt-0.5 shrink-0" />
              <p className="font-mono text-[9px] text-muted-foreground leading-relaxed">
                All visitor identifiers are HMAC-SHA256 hashed at the Edge before transmission.
                No raw IP addresses or user agent strings are stored.
                Raw PII does not leave transient middleware memory.
                This system constitutes a privacy-preserving access-audit layer only.
              </p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
