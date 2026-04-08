import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility for merging Tailwind classes safely.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Security Headers Configuration
 * Demonstrating advanced Web Application Hardening (CSP, HSTS, XSS Protection).
 */
export const securityHeaders = {
  "Content-Security-Policy":
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data:; font-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; upgrade-insecure-requests;",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
};
