import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

const RATE_LIMIT = 60; // requests per IP per minute
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export function middleware(request: NextRequest) {
  const nonce = Buffer.from(uuidv4()).toString('base64');

  // Derive IP — Vercel sets x-forwarded-for; fall back to a static tag for local dev
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    'anonymous';

  const now = Date.now();
  const record = rateLimitMap.get(ip) ?? { count: 0, resetTime: now + 60_000 };

  if (now > record.resetTime) {
    record.count = 0;
    record.resetTime = now + 60_000;
  }
  record.count++;
  rateLimitMap.set(ip, record);

  if (record.count > RATE_LIMIT) {
    return new NextResponse('Too Many Requests', {
      status: 429,
      headers: { 'Retry-After': '60' },
    });
  }

  const response = NextResponse.next();
  response.headers.set('x-nonce', nonce);
  return response;
}

export const config = {
  matcher: [
    '/api/intake/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
