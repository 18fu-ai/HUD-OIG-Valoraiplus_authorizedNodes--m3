import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { createHmac } from 'crypto'

// ---------------------------------------------------------------------------
// Service-role Supabase client — bypasses RLS for telemetry inserts
// Constructed once at module load; null-safe if env vars are absent
// ---------------------------------------------------------------------------
const supabaseUrl        = process.env.NEXT_PUBLIC_SUPABASE_URL    || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY   || ''

const supabase = supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey, { auth: { persistSession: false } })
  : null

// ---------------------------------------------------------------------------
// Table-missing error detection (PGRST205 = table not in schema cache)
// ---------------------------------------------------------------------------
function isTableMissingError(err: unknown): boolean {
  const e = err as { code?: string; message?: string }
  return (
    e?.code    === 'PGRST205' ||
    e?.code    === 'PGRST204' ||
    e?.code    === 'PGRST116' ||
    e?.code    === '42P01'    ||
    e?.message?.includes('schema cache')    ||
    e?.message?.includes('does not exist')  ||
    e?.message?.includes('relation')        ||
    false
  )
}

// ---------------------------------------------------------------------------
// Anomaly classifier
// ---------------------------------------------------------------------------
interface AnomalyResult {
  isAnomaly   : boolean
  anomalyType : string | null
  anomalyScore: number
}

function classifyAnomaly(uaFamily: string, path: string, referrerOrigin: string): AnomalyResult {
  // Bot/automated agent detection
  if (uaFamily === 'BOT' || uaFamily === 'SCRIPT') {
    return { isAnomaly: true, anomalyType: 'AUTOMATED_BOT_DETECTION', anomalyScore: 0.75 }
  }

  // Path traversal / scanning
  if (
    path.includes('.env')      ||
    path.includes('.git')      ||
    path.includes('wp-admin')  ||
    path.includes('phpMyAdmin')||
    path.includes('../')       ||
    path.includes('etc/passwd')
  ) {
    return { isAnomaly: true, anomalyType: 'INVALID_PATH_TRAVERSAL', anomalyScore: 0.95 }
  }

  // Direct deep-link (no referrer, non-root path) — low-signal anomaly
  if (referrerOrigin === 'DIRECT' && path !== '/' && path !== '') {
    return { isAnomaly: true, anomalyType: 'UNEXPECTED_ENTRY_FLOW', anomalyScore: 0.30 }
  }

  return { isAnomaly: false, anomalyType: null, anomalyScore: 0.00 }
}

// ---------------------------------------------------------------------------
// POST handler
// ---------------------------------------------------------------------------
export async function POST(req: NextRequest) {
  try {
    if (!supabase) {
      return NextResponse.json({ status: 'SKIPPED', reason: 'Supabase not configured' }, { status: 200 })
    }

    const secret = process.env.VALORAIPLUS_TELEMETRY_SECRET
    if (!secret) {
      return NextResponse.json({ status: 'SKIPPED', reason: 'Telemetry secret not configured' }, { status: 200 })
    }

    const {
      rawIp,
      rawUa,
      path,
      method,
      uaFamily,
      referrerOrigin,
      requestCategory,
      country,
      region,
      city,
    } = await req.json()

    // ------------------------------------------------------------------
    // HMAC-SHA256 hashing — raw PII used only here, then discarded
    // ------------------------------------------------------------------
    const visitorHash = createHmac('sha256', secret)
      .update(`${rawIp}-${rawUa}`)
      .digest('hex')

    const userAgentHash = createHmac('sha256', secret)
      .update(rawUa || 'unknown')
      .digest('hex')

    // Session hash: visitor + day bucket (rotates daily for privacy)
    const dayBucket = new Date().toISOString().slice(0, 10) // YYYY-MM-DD
    const sessionHash = createHmac('sha256', secret)
      .update(`${rawIp}-${dayBucket}`)
      .digest('hex')

    // ------------------------------------------------------------------
    // Anomaly classification — uses safe coarse-grained fields only
    // ------------------------------------------------------------------
    const { isAnomaly, anomalyType, anomalyScore } = classifyAnomaly(
      uaFamily        || 'Other',
      path            || '/',
      referrerOrigin  || 'DIRECT',
    )

    // ------------------------------------------------------------------
    // Insert into Supabase — no raw PII fields
    // ------------------------------------------------------------------
    const { error } = await supabase
      .from('valoraiplus_access_logs')
      .insert([{
        visitor_hash    : visitorHash,
        user_agent_hash : userAgentHash,
        session_hash    : sessionHash,
        request_path    : path,
        request_method  : method   || 'GET',
        request_category: requestCategory || 'PAGE',
        ua_family       : uaFamily || 'Other',
        referrer_origin : referrerOrigin === 'DIRECT' ? null : referrerOrigin,
        country_code    : country  || null,
        region_code     : region   || null,
        city_name       : city     || null,
        is_anomaly,
        anomaly_type    : anomalyType,
        anomaly_score   : anomalyScore,
      }])

    if (error) {
      if (isTableMissingError(error)) {
        return NextResponse.json({ status: 'SKIPPED', reason: 'Table not yet created' }, { status: 200 })
      }
      throw error
    }

    return NextResponse.json({ status: 'SUCCESS' }, { status: 200 })

  } catch (err: unknown) {
    if (isTableMissingError(err)) {
      return NextResponse.json({ status: 'SKIPPED', reason: 'Table not yet created' }, { status: 200 })
    }
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('[valoraiplus/access-log] Unexpected error:', message)
    return NextResponse.json({ status: 'SKIPPED', reason: 'Internal error' }, { status: 200 })
  }
}
