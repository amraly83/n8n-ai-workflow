import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { updateSession } from '@/utils/supabase/middleware'; // Import the helper
import { createServerClient } from '@supabase/ssr'; // Still need this for a new client instance after updateSession

export async function middleware(req: NextRequest) {
  // First, run updateSession to handle session refresh and cookie updates.
  // updateSession returns a response object that should be used for subsequent operations.
  const res = await updateSession(req);

  // To check the session *after* updateSession has potentially refreshed it,
  // we need a Supabase client instance that can read the (potentially updated) request cookies
  // and is associated with the response object `res` that `updateSession` returned.
  // The `updateSession` itself calls `supabase.auth.getUser()` which handles the refresh.
  // For redirect logic, we need to get the session state *after* this refresh.
  
  // Create a new Supabase client instance for the purpose of checking the session state
  // This client is configured with the request (which might have been updated by updateSession if it cloned headers)
  // and the response (which updateSession definitely updates with new cookies).
  
  // Log cookies on `res` after `updateSession`
  console.log('[Middleware] Cookies on `res` (after updateSession):', res.cookies.getAll().map(c => c.name));

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          // Read cookies from the `res` object returned by `updateSession`,
          // as it contains any cookies potentially set or updated by the session refresh.
          const cookieStore = res.cookies;
          return cookieStore.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options: import('@supabase/ssr').CookieOptions }[]) { // Corrected options type
          // This client instance is primarily for reading session.
          // If this `setAll` is called for any reason, it should operate on `res.cookies`.
          cookiesToSet.forEach(({ name, value, options }) => res.cookies.set(name, value, options));
        }
        // get(name: string) {
        //   // Reading from res.cookies
        //   return res.cookies.get(name)?.value;
        // },
        // set(name: string, value: string, options) {
        //   res.cookies.set({ name, value, ...options });
        // },
        // remove(name: string, options) {
        //   res.cookies.set({ name, value: '', ...options });
        // },
      },
    }
  );

  const { data: { session } } = await supabase.auth.getSession();
  console.log('[Middleware] Session status:', session ? 'Active session' : 'No session');
  console.log('[Middleware] Request URL:', req.nextUrl.pathname);

  const protectedPaths = ['/dashboard'];
  const isProtectedPath = protectedPaths.some(path => req.nextUrl.pathname.startsWith(path));

  if (isProtectedPath) {
    console.log('[Middleware] Path is protected.');
    if (!session) {
      console.log('[Middleware] No session, redirecting to /');
      // If no session and trying to access a protected path, redirect to homepage
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = '/';
      redirectUrl.searchParams.set('redirectedFrom', req.nextUrl.pathname); // Optional: for UX
      return NextResponse.redirect(redirectUrl); // Restore redirect logic
    } else {
      console.log('[Middleware] Session found, allowing access.');
    }
  } else {
    console.log('[Middleware] Path is not protected.');
  }


  return res;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|api/auth/callback|auth/confirm).*)',
    // Added api/auth/callback and auth/confirm to exclude from matcher,
    // as these are Supabase specific auth routes that should not be blocked by middleware if unauthenticated.
    // Also, any public API routes should be excluded if necessary.
  ],
};
