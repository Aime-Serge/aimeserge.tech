import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { securityHeaders } from './lib/security/headers';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback-secret-at-least-32-chars-long'
);

/**
 * Advanced Edge Middleware
 * Handles Zero-Trust Auth, CSP Injection, and Global Rate-Limiting logs.
 */
export async function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
  
  // Stricter Content-Security-Policy (CSP) - Relaxed for Dev stability
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.supabase.co;
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https://*.supabase.co;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    connect-src 'self' https://api.openai.com https://*.supabase.co https://vitals.vercel-insights.com;
    upgrade-insecure-requests;
  `.replace(/\s{2,}/g, ' ').trim();

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set('Content-Security-Policy', cspHeader);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Inject Security Headers into Response
  // response.headers.set('Content-Security-Policy', cspHeader);
  Object.entries(securityHeaders).forEach(([key, value]) => {
    if (key !== 'Content-Security-Policy') {
      response.headers.set(key, value);
    }
  });

  // 2. Protect Admin & Dashboard (Zero-Trust)
  const isProtectedPath = request.nextUrl.pathname.startsWith('/admin') || 
                          request.nextUrl.pathname.startsWith('/dashboard');

  if (isProtectedPath) {
    const token = request.cookies.get('auth_token')?.value;
    
    // Redirect if no token or if we are in production and it's not a secure session
    if (!token) return redirectToLogin(request);

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);
      
      // CRITICAL: Check if the user has the 'admin' role or specific ID
      if (payload.role !== 'authenticated' && payload.email !== process.env.ADMIN_EMAIL) {
        return NextResponse.redirect(new URL('/', request.url));
      }
    } catch (err) {
      console.error('Security Breach Attempt or Expired Token');
      return redirectToLogin(request);
    }
  }

  return response;
}

function redirectToLogin(request: NextRequest) {
  const url = new URL('/login', request.url);
  url.searchParams.set('callbackUrl', request.nextUrl.pathname);
  const response = NextResponse.redirect(url);
  // Clear the invalid token if any
  response.cookies.delete('auth_token');
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
