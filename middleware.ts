import { updateSession } from '@/lib/supabase/proxy'
import { trafficLogger } from '@/lib/traffic-logger'
import { type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const startTime = Date.now()
  
  // Extract traffic data
  const ip = request.headers.get('x-forwarded-for') || 
             request.headers.get('x-real-ip') || 
             'unknown'
  const userAgent = request.headers.get('user-agent') || 'unknown'
  const path = request.nextUrl.pathname + request.nextUrl.search
  const method = request.method
  const referer = request.headers.get('referer')

  // Update session (existing functionality)
  const response = await updateSession(request)
  
  // Calculate response time
  const responseTime = Date.now() - startTime
  const statusCode = response.status

  // Log traffic asynchronously (non-blocking)
  trafficLogger.logPageView({
    ip: ip.split(',')[0].trim(),
    userAgent,
    path,
    method,
    referer: referer || undefined,
    statusCode,
    responseTime,
  }).catch(error => {
    console.error('[Middleware] Traffic logging error:', error)
  })

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
