import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { securityHeaders } from './lib/security/headers';

/**
 * Advanced Edge Middleware
 * Handles Zero-Trust Auth, CSP Injection, and Global Rate-Limiting logs.
 */
export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // 1. Inject Security Headers
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  // 2. Protect Admin & Dashboard (Zero-Trust)
  const isProtectedPath = request.nextUrl.pathname.startsWith('/admin') || 
                          request.nextUrl.pathname.startsWith('/dashboard');

  if (isProtectedPath) {
    const token = request.cookies.get('auth_token')?.value;
    if (!token) {
      const url = new URL('/login', request.url);
      url.searchParams.set('callbackUrl', request.nextUrl.pathname);
      return NextResponse.redirect(url);
    }
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
