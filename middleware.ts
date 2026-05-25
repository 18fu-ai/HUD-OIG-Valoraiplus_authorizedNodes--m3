import { updateSession } from '@/lib/supabase/proxy'
import { type NextRequest } from 'next/server'
import { createHmac } from 'crypto'

// ---------------------------------------------------------------------------
// Request class classifier — maps path to typed request_class
// ---------------------------------------------------------------------------
function classifyRequest(pathname: string): "page" | "pdf" | "api" | "asset" | "unknown" {
  if (pathname.startsWith('/api/'))             return 'api'
  if (pathname.match(/\.pdf$/i))                return 'pdf'
  if (pathname.match(/\.(js|css|woff2?|ttf|ico|svg|png|jpg|jpeg|gif|webp)$/i)) return 'asset'
  if (pathname === '/' || pathname.startsWith('/dept12')
   || pathname.startsWith('/mission-control')
   || pathname.startsWith('/case-filing')
   || pathname.startsWith('/web-traffic')
   || pathname.length > 1)                      return 'page'
  return 'unknown'
}

// ---------------------------------------------------------------------------
// UA-family extractor — typed to match route's AccessPayload
// ---------------------------------------------------------------------------
function uaFamily(rawUa: string): "bot" | "mobile_browser" | "desktop_browser" | "unknown" {
  const ua = rawUa.toLowerCase()
  if (ua.includes('bot') || ua.includes('crawler') || ua.includes('spider') || ua.includes('scraper') || ua.includes('headless') || ua.includes('curl') || ua.includes('wget') || ua.includes('python') || ua.includes('node')) return 'bot'
  if (ua.includes('mobile') || ua.includes('android') || ua.includes('iphone') || ua.includes('ipad')) return 'mobile_browser'
  if (ua.includes('chrome') || ua.includes('firefox') || ua.includes('safari') || ua.includes('edge')) return 'desktop_browser'
  return 'unknown'
}

// ---------------------------------------------------------------------------
// Referrer origin extractor — strips path/query, keeps origin only
// ---------------------------------------------------------------------------
function referrerOrigin(referer: string | null): string {
  if (!referer) return 'DIRECT'
  try {
    const url = new URL(referer)
    return url.origin
  } catch {
    return 'DIRECT'
  }
}

export async function middleware(request: NextRequest) {
  // Skip telemetry for the access-log endpoint itself to prevent recursion
  const isInternalTelemetry = request.nextUrl.pathname.startsWith('/api/valoraiplus/access-log')

  // Update session (existing functionality)
  const response = await updateSession(request)

  if (!isInternalTelemetry) {
    const secret    = process.env.VALORAIPLUS_TELEMETRY_SECRET
    const ingestKey = process.env.VALORAIPLUS_INGEST_KEY

    // Skip telemetry entirely if secrets are absent
    if (secret && ingestKey) {
      const rawIp = (request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown').split(',')[0].trim()
      const rawUa = request.headers.get('user-agent') || 'unknown'
      const path  = request.nextUrl.pathname + request.nextUrl.search

      // ------------------------------------------------------------------
      // HMAC-SHA256 hashes — raw PII used only here, never transmitted
      // ------------------------------------------------------------------
      const dayBucket     = new Date().toISOString().slice(0, 10) // YYYY-MM-DD
      const visitorHash   = createHmac('sha256', secret).update(`${rawIp}-${rawUa}`).digest('hex')
      const userAgentHash = createHmac('sha256', secret).update(rawUa).digest('hex')
      const sessionHash   = createHmac('sha256', secret).update(`${rawIp}-${dayBucket}`).digest('hex')

      // ------------------------------------------------------------------
      // Anomaly flags — coarse-grained, no PII
      // ------------------------------------------------------------------
      const anomalyFlags: string[] = []
      const uaFamilyVal = uaFamily(rawUa)
      if (uaFamilyVal === 'bot') anomalyFlags.push('BOT_UA')
      if (path.includes('.env') || path.includes('.git') || path.includes('wp-admin') || path.includes('../')) anomalyFlags.push('PATH_TRAVERSAL')

      const isAnomaly   = anomalyFlags.length > 0
      const anomalyType = anomalyFlags.length > 0 ? anomalyFlags[0] : null
      const anomalyScore = isAnomaly ? (anomalyFlags.includes('PATH_TRAVERSAL') ? 95 : 75) : 0

      // Safe coarse fields
      const referrerOriginOnly = referrerOrigin(request.headers.get('referer'))
      const requestClass       = classifyRequest(request.nextUrl.pathname)
      const country            = request.headers.get('x-vercel-ip-country')        || undefined
      const region             = request.headers.get('x-vercel-ip-country-region') || undefined
      const city               = request.headers.get('x-vercel-ip-city')           || undefined

      // Fire-and-forget: non-blocking POST — only hashes transmitted, never raw PII
      fetch(`${request.nextUrl.origin}/api/valoraiplus/access-log`, {
        method  : 'POST',
        headers : {
          'Content-Type'              : 'application/json',
          'x-valoraiplus-ingest-key'  : ingestKey,
        },
        body: JSON.stringify({
          visitor_hash      : visitorHash,
          user_agent_hash   : userAgentHash,
          session_hash      : sessionHash,
          request_method    : request.method,
          request_path      : path,
          request_class     : requestClass,
          referrer_origin   : referrerOriginOnly === 'DIRECT' ? null : referrerOriginOnly,
          country_code      : country    ?? null,
          region_code       : region     ?? null,
          city_name         : city       ?? null,
          user_agent_family : uaFamilyVal,
          is_anomaly        : isAnomaly,
          anomaly_type      : anomalyType,
          anomaly_flags     : anomalyFlags,
          anomaly_score     : anomalyScore,
          source            : 'vercel_edge_middleware',
        }),
      }).catch(() => {
        // Silently discard — telemetry must never block a user request
      })
    }
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
