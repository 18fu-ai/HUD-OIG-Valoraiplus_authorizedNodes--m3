'use client'

import { useMemo } from 'react'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type RequestCategory = 'page' | 'pdf' | 'api' | 'asset' | 'document' | 'search' | 'unknown'

export type AccessSummaryRow = {
  hour_bucket:      string
  request_category: RequestCategory
  country_code:     string | null
  total_hits:       number
  pdf_hits:         number
  bot_like_hits:    number
  anomaly_hits:     number
}

export type CategoryBreakdownRow = {
  request_category: RequestCategory
  total_hits:       number
  anomaly_hits:     number
  bot_like_hits:    number
  first_seen:       string | null
  last_seen:        string | null
}

type Props = {
  summaryRows:    AccessSummaryRow[]
  categoryRows:   CategoryBreakdownRow[]
  refreshSeconds?: number
}

// ---------------------------------------------------------------------------
// Category badge colours
// ---------------------------------------------------------------------------
const CATEGORY_COLORS: Record<RequestCategory, string> = {
  page:     'bg-blue-900/40 text-blue-300 border-blue-700/40',
  pdf:      'bg-amber-900/40 text-amber-300 border-amber-700/40',
  api:      'bg-emerald-900/40 text-emerald-300 border-emerald-700/40',
  asset:    'bg-slate-800/60 text-slate-400 border-slate-600/40',
  document: 'bg-purple-900/40 text-purple-300 border-purple-700/40',
  search:   'bg-cyan-900/40 text-cyan-300 border-cyan-700/40',
  unknown:  'bg-slate-800/60 text-slate-500 border-slate-600/40',
}

// ---------------------------------------------------------------------------
// Main dashboard component
// ---------------------------------------------------------------------------
export default function AccessAuditDashboard({
  summaryRows,
  categoryRows,
  refreshSeconds = 60,
}: Props) {
  const totals = useMemo(() => {
    return summaryRows.reduce(
      (acc, row) => {
        acc.hits      += Number(row.total_hits    || 0)
        acc.pdfs      += Number(row.pdf_hits      || 0)
        acc.bots      += Number(row.bot_like_hits || 0)
        acc.anomalies += Number(row.anomaly_hits  || 0)
        return acc
      },
      { hits: 0, pdfs: 0, bots: 0, anomalies: 0 }
    )
  }, [summaryRows])

  return (
    <section className="space-y-4 rounded-2xl border border-slate-700/50 bg-slate-900/80 p-5 shadow-lg">
      {/* Header */}
      <header className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-slate-100">
            VALORAIPLUS Access Audit
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Privacy-preserving access audit for owned infrastructure. Auto-refreshes every{' '}
            {refreshSeconds}s.
          </p>
        </div>
        <span className="flex items-center gap-1.5 rounded-full border border-emerald-700/40 bg-emerald-900/30 px-3 py-1 text-xs font-medium text-emerald-400">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          LIVE
        </span>
      </header>

      {/* Privacy posture statement */}
      <div className="rounded-xl border border-slate-700/40 bg-slate-800/50 p-3 text-xs leading-relaxed text-slate-400">
        <strong className="text-slate-300">Privacy posture:</strong> This panel displays
        aggregate technical access events, request categories, coarse hosting-provider geo
        fields, and anonymized HMAC-based visitor/session indicators. It does not display
        raw IP addresses, raw user-agent strings, private contact information, protected
        medical details, or confidential witness material. It does not identify individual
        visitors. All visitor identifiers are HMAC-SHA256 hashed before storage.
        Hashing uses <code className="text-slate-300">AUDIT_HASH_SECRET</code> — a secret
        not accessible from the client or stored in any database column.
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Metric label="Total events"  value={totals.hits}      color="text-slate-100" />
        <Metric label="PDF events"    value={totals.pdfs}      color="text-amber-400" />
        <Metric label="Bot-like"      value={totals.bots}      color="text-orange-400" />
        <Metric label="Anomalies"     value={totals.anomalies} color="text-red-400" />
      </div>

      {/* Category breakdown + hourly summary */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <CategoryBreakdownPanel rows={categoryRows} />
        <HourlySummaryPanel rows={summaryRows} />
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------
function Metric({
  label,
  value,
  color,
}: {
  label: string
  value: number
  color: string
}) {
  return (
    <div className="rounded-xl border border-slate-700/50 bg-slate-800/60 p-3">
      <div className="text-xs uppercase tracking-wide text-slate-500">{label}</div>
      <div className={`mt-1 text-2xl font-bold tabular-nums ${color}`}>{value}</div>
    </div>
  )
}

function CategoryBreakdownPanel({ rows }: { rows: CategoryBreakdownRow[] }) {
  if (rows.length === 0) {
    return (
      <div className="flex items-center justify-center rounded-xl border border-slate-700/50 bg-slate-800/40 p-6 text-sm text-slate-500">
        No category data yet — awaiting first requests.
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-slate-700/50 bg-slate-800/40 p-4">
      <h3 className="mb-3 text-sm font-semibold text-slate-300">Request category breakdown</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-700/50 text-xs uppercase tracking-wide text-slate-500">
              <th className="pb-2 pr-4">Category</th>
              <th className="pb-2 pr-4 text-right">Hits</th>
              <th className="pb-2 pr-4 text-right">Anomaly</th>
              <th className="pb-2 text-right">Bot-like</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.request_category} className="border-b border-slate-700/30 last:border-0">
                <td className="py-2 pr-4">
                  <span className={`inline-block rounded border px-2 py-0.5 text-xs font-medium ${CATEGORY_COLORS[row.request_category] ?? CATEGORY_COLORS.unknown}`}>
                    {row.request_category}
                  </span>
                </td>
                <td className="py-2 pr-4 text-right tabular-nums text-slate-200">{row.total_hits}</td>
                <td className="py-2 pr-4 text-right tabular-nums text-red-400">{row.anomaly_hits}</td>
                <td className="py-2 text-right tabular-nums text-orange-400">{row.bot_like_hits}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function HourlySummaryPanel({ rows }: { rows: AccessSummaryRow[] }) {
  if (rows.length === 0) {
    return (
      <div className="flex items-center justify-center rounded-xl border border-slate-700/50 bg-slate-800/40 p-6 text-sm text-slate-500">
        No hourly data yet — awaiting first requests.
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-slate-700/50 bg-slate-800/40 p-4">
      <h3 className="mb-3 text-sm font-semibold text-slate-300">Recent hourly summary</h3>
      <div className="max-h-80 overflow-y-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-700/50 text-xs uppercase tracking-wide text-slate-500">
              <th className="pb-2 pr-4">Hour</th>
              <th className="pb-2 pr-4">Category</th>
              <th className="pb-2 pr-4">Country</th>
              <th className="pb-2 text-right">Hits</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr
                key={`${row.hour_bucket}-${row.request_category}-${row.country_code ?? 'xx'}-${index}`}
                className="border-b border-slate-700/30 last:border-0"
              >
                <td className="py-2 pr-4 text-xs text-slate-400">
                  {new Date(row.hour_bucket).toLocaleString(undefined, {
                    month: '2-digit', day: '2-digit',
                    hour: '2-digit',  minute: '2-digit',
                  })}
                </td>
                <td className="py-2 pr-4">
                  <span className={`inline-block rounded border px-1.5 py-0.5 text-xs ${CATEGORY_COLORS[row.request_category] ?? CATEGORY_COLORS.unknown}`}>
                    {row.request_category}
                  </span>
                </td>
                <td className="py-2 pr-4 text-xs text-slate-400">{row.country_code ?? '—'}</td>
                <td className="py-2 text-right tabular-nums text-slate-200">{row.total_hits}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
