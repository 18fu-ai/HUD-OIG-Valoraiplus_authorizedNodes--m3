import { updateSession } from '@/lib/supabase/proxy'
import { type NextRequest } from 'next/server'

// ---------------------------------------------------------------------------
// Request category classifier — path only, no PII
// ---------------------------------------------------------------------------
function classifyRequest(pathname: string): string {
  if (pathname.startsWith('/api/'))             return 'API'
  if (pathname.match(/\.(pdf|docx?|xlsx?)$/i))  return 'DOCUMENT_DOWNLOAD'
  if (pathname.startsWith('/dept12')
   || pathname.startsWith('/mission-control')
   || pathname.startsWith('/case-filing')
   || pathname.startsWith('/web-traffic'))       return 'CASE_SYSTEM'
  if (pathname === '/' || pathname === '')       return 'HOME'
  return 'PAGE'
}

// ---------------------------------------------------------------------------
// UA-family extractor — returns coarse family string, never the raw UA
// ---------------------------------------------------------------------------
function uaFamily(rawUa: string): string {
  const ua = rawUa.toLowerCase()
  if (ua.includes('bot') || ua.includes('crawler') || ua.includes('spider') || ua.includes('scraper') || ua.includes('headless')) return 'BOT'
  if (ua.includes('chrome'))  return 'Chrome'
  if (ua.includes('firefox')) return 'Firefox'
  if (ua.includes('safari'))  return 'Safari'
  if (ua.includes('edge'))    return 'Edge'
  if (ua.includes('curl') || ua.includes('wget') || ua.includes('python') || ua.includes('node')) return 'SCRIPT'
  return 'Other'
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
    // Extract only what is needed — raw strings stay in memory only until hashed server-side
    const rawIp       = (request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown').split(',')[0].trim()
    const rawUa       = request.headers.get('user-agent') || 'unknown'
    const path        = request.nextUrl.pathname + request.nextUrl.search
    const method      = request.method

    // Coarse-grained safe fields — no PII
    const uaFamilyStr        = uaFamily(rawUa)
    const referrerOriginOnly = referrerOrigin(request.headers.get('referer'))
    const requestCategory    = classifyRequest(request.nextUrl.pathname)

    // Geo headers — injected by Vercel Edge Network, coarse-grained
    const country = request.headers.get('x-vercel-ip-country')       || undefined
    const region  = request.headers.get('x-vercel-ip-country-region') || undefined
    const city    = request.headers.get('x-vercel-ip-city')           || undefined

    // Fire-and-forget: non-blocking POST
    // rawIp and rawUa transmitted only to /api/valoraiplus/access-log
    // for server-side HMAC generation — never logged or stored as-is
    fetch(`${request.nextUrl.origin}/api/valoraiplus/access-log`, {
      method  : 'POST',
      headers : { 'Content-Type': 'application/json' },
      body    : JSON.stringify({
        rawIp,
        rawUa,
        path,
        method,
        uaFamily         : uaFamilyStr,
        referrerOrigin   : referrerOriginOnly,
        requestCategory,
        country,
        region,
        city,
      }),
    }).catch(() => {
      // Silently discard — telemetry must never block a user request
    })
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
