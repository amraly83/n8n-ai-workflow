import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from 'next/server';

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',        // Protects all routes under /dashboard
  '/api/generate-workflow' // Protect the specific API route
  // Add other API routes that need protection here, e.g., '/api/user-data'
  // Public API routes should NOT be listed here.
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) {
    // auth.protect() will throw a NextResponse error or redirect to sign-in if unauthenticated.
    // If authenticated, it allows the request to proceed.
    auth.protect();
  }
  // For public routes, or if auth.protect() did not throw/redirect for a protected route,
  // allow the request to proceed.
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
