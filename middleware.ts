import { updateSession } from '@/lib/supabase/proxy'
import { NextFetchEvent, type NextRequest, NextResponse } from 'next/server'

// ---------------------------------------------------------------------------
// Static extension skip list
// ---------------------------------------------------------------------------
const STATIC_EXTENSIONS = [
  '.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg', '.ico',
  '.css', '.js', '.map', '.txt', '.xml', '.woff', '.woff2', '.ttf',
]

const SKIP_PREFIXES = [
  '/_next',
  '/favicon.ico',
  '/robots.txt',
  '/sitemap.xml',
  '/api/valoraiplus/access-log',
]

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}

// ---------------------------------------------------------------------------
// Middleware entry point
// ---------------------------------------------------------------------------
export function middleware(request: NextRequest, event: NextFetchEvent) {
  const { pathname } = request.nextUrl

  if (shouldSkip(pathname)) {
    return NextResponse.next()
  }

  // Session update runs synchronously; telemetry is deferred via waitUntil
  const sessionPromise = updateSession(request)
  event.waitUntil(
    sessionPromise
      .then(() => recordAccessEvent(request))
      .catch(() => undefined)
  )

  return sessionPromise
}

// ---------------------------------------------------------------------------
// Skip guard
// ---------------------------------------------------------------------------
function shouldSkip(pathname: string): boolean {
  if (SKIP_PREFIXES.some((prefix) => pathname.startsWith(prefix))) return true
  const lower = pathname.toLowerCase()
  if (STATIC_EXTENSIONS.some((ext) => lower.endsWith(ext))) return true
  return false
}

// ---------------------------------------------------------------------------
// Core telemetry function — raw PII never leaves this function
// ---------------------------------------------------------------------------
async function recordAccessEvent(request: NextRequest): Promise<void> {
  const auditHashSecret = process.env.AUDIT_HASH_SECRET
  const ingestKey       = process.env.VALORAIPLUS_INGEST_KEY

  if (!auditHashSecret || !ingestKey) return

  const rawIp        = getForwardedIp(request)
  const rawUserAgent = request.headers.get('user-agent') || 'unknown'

  // HMAC-SHA256 via Web Crypto API (Edge-compatible, no Node import needed)
  const visitorHash   = await hmacSha256(rawIp, auditHashSecret)
  const userAgentHash = await hmacSha256(rawUserAgent, auditHashSecret)
  const sessionHash   = await hmacSha256(`${visitorHash}:${userAgentHash}`, auditHashSecret)

  const pathname          = request.nextUrl.pathname
  const requestCategory   = classifyRequestCategory(pathname)
  const userAgentFamily   = classifyUserAgentFamily(rawUserAgent)
  const referrerOriginVal = toOriginOnly(request.headers.get('referer') || '')
  const anomalyFlags      = buildAnomalyFlags({ pathname, requestCategory, userAgentFamily, referrerOrigin: referrerOriginVal })

  const payload = {
    occurred_at:      new Date().toISOString(),
    visitor_hash:     visitorHash,
    user_agent_hash:  userAgentHash,
    session_hash:     sessionHash,
    request_method:   request.method,
    request_path:     pathname,
    request_category: requestCategory,
    referrer_origin:  referrerOriginVal,
    country_code:     getDecodedHeader(request, 'x-vercel-ip-country'),
    region_code:      getDecodedHeader(request, 'x-vercel-ip-country-region'),
    city_name:        getDecodedHeader(request, 'x-vercel-ip-city'),
    continent_code:   getDecodedHeader(request, 'x-vercel-ip-continent'),
    vercel_id:        request.headers.get('x-vercel-id'),
    deployment_url:   request.headers.get('x-vercel-deployment-url'),
    user_agent_family: userAgentFamily,
    is_anomaly:       anomalyFlags.length > 0,
    anomaly_type:     anomalyFlags[0] ?? null,
    anomaly_flags:    anomalyFlags,
    anomaly_score:    scoreAnomalies(anomalyFlags),
    source:           'vercel_edge_middleware_phase2',
  }

  await fetch(new URL('/api/valoraiplus/access-log', request.url), {
    method  : 'POST',
    headers : {
      'content-type'             : 'application/json',
      'x-valoraiplus-ingest-key' : ingestKey,
    },
    body     : JSON.stringify(payload),
    keepalive: true,
  })
}

// ---------------------------------------------------------------------------
// IP extraction — prefers Vercel's forwarded header
// ---------------------------------------------------------------------------
function getForwardedIp(request: NextRequest): string {
  const forwarded =
    request.headers.get('x-vercel-forwarded-for') ||
    request.headers.get('x-forwarded-for')        ||
    request.headers.get('x-real-ip')              ||
    'unknown'
  return forwarded.split(',')[0]?.trim() || 'unknown'
}

// ---------------------------------------------------------------------------
// Header decoder — handles percent-encoded city names safely
// ---------------------------------------------------------------------------
function getDecodedHeader(request: NextRequest, name: string): string | null {
  const value = request.headers.get(name)
  if (!value) return null
  try { return decodeURIComponent(value) } catch { return value }
}

// ---------------------------------------------------------------------------
// Referrer → origin only (strips path + query)
// ---------------------------------------------------------------------------
function toOriginOnly(referrer: string): string | null {
  if (!referrer) return null
  try { return new URL(referrer).origin } catch { return null }
}

// ---------------------------------------------------------------------------
// Request category classifier
// ---------------------------------------------------------------------------
type RequestCategory = 'page' | 'pdf' | 'api' | 'asset' | 'document' | 'search' | 'unknown'

function classifyRequestCategory(pathname: string): RequestCategory {
  const lower = pathname.toLowerCase()
  if (lower.startsWith('/api/'))                                  return 'api'
  if (lower.endsWith('.pdf'))                                     return 'pdf'
  if (lower.endsWith('.doc') || lower.endsWith('.docx'))         return 'document'
  if (lower.includes('search') || lower.includes('query'))       return 'search'
  if (STATIC_EXTENSIONS.some((ext) => lower.endsWith(ext)))      return 'asset'
  if (lower === '/' || !lower.includes('.'))                     return 'page'
  return 'unknown'
}

// ---------------------------------------------------------------------------
// UA family classifier
// ---------------------------------------------------------------------------
type UserAgentFamily = 'bot' | 'mobile_browser' | 'desktop_browser' | 'unknown'

function classifyUserAgentFamily(userAgent: string): UserAgentFamily {
  const ua = userAgent.toLowerCase()
  if (!ua || ua === 'unknown') return 'unknown'
  if (/(bot|spider|crawler|scrape|curl|wget|python|headless|httpclient|go-http-client|node-fetch|axios)/i.test(ua)) return 'bot'
  if (/(mobile|android|iphone|ipad)/i.test(ua))                  return 'mobile_browser'
  if (/(chrome|safari|firefox|edge|edg|opera|brave)/i.test(ua)) return 'desktop_browser'
  return 'unknown'
}

// ---------------------------------------------------------------------------
// Anomaly flag builder
// ---------------------------------------------------------------------------
function buildAnomalyFlags(input: {
  pathname:        string
  requestCategory: RequestCategory
  userAgentFamily: UserAgentFamily
  referrerOrigin:  string | null
}): string[] {
  const flags: string[] = []
  if (input.userAgentFamily === 'bot')         flags.push('bot_like_user_agent')
  if (input.requestCategory === 'pdf')         flags.push('pdf_access_event')
  if (input.pathname.length > 250)             flags.push('long_path')
  if (input.pathname.includes('..'))           flags.push('path_traversal_pattern')
  return flags
}

// ---------------------------------------------------------------------------
// Anomaly score (0–100)
// ---------------------------------------------------------------------------
function scoreAnomalies(flags: string[]): number {
  if (flags.length === 0) return 0
  let score = 0
  for (const flag of flags) {
    if (flag === 'bot_like_user_agent')   score += 40
    else if (flag === 'path_traversal_pattern') score += 60
    else if (flag === 'long_path')        score += 20
    else if (flag === 'pdf_access_event') score += 10
    else score += 10
  }
  return Math.max(0, Math.min(100, score))
}

// ---------------------------------------------------------------------------
// HMAC-SHA256 via Web Crypto API — Edge runtime compatible
// ---------------------------------------------------------------------------
async function hmacSha256(value: string, secret: string): Promise<string> {
  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(value))
  return [...new Uint8Array(signature)]
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}
