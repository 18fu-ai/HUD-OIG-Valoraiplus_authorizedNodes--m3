import { updateSession } from '@/lib/supabase/proxy'
import { type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Skip telemetry for the access-log endpoint itself to prevent recursion
  const isInternalTelemetry = request.nextUrl.pathname.startsWith('/api/valoraiplus/access-log')

  // Update session
  const response = await updateSession(request)

  if (!isInternalTelemetry) {
    const rawIp      = (request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown').split(',')[0].trim()
    const rawUserAgent = request.headers.get('user-agent') || 'unknown'
    const path       = request.nextUrl.pathname + request.nextUrl.search
    const referrer   = request.headers.get('referer') || 'DIRECT'

    // Geo headers injected by Vercel Edge Network
    const country    = request.headers.get('x-vercel-ip-country')      || undefined
    const region     = request.headers.get('x-vercel-ip-country-region')|| undefined
    const city       = request.headers.get('x-vercel-ip-city')          || 'UNKNOWN'

    // Fire-and-forget: non-blocking telemetry POST to hardened API route
    fetch(`${request.nextUrl.origin}/api/valoraiplus/access-log`, {
      method  : 'POST',
      headers : { 'Content-Type': 'application/json' },
      body    : JSON.stringify({ rawIp, rawUserAgent, path, country, region, city, referrer }),
    }).catch(() => {
      // Silently discard — telemetry must never block a request
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
