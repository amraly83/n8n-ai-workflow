import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { type NextRequest, NextResponse } from 'next/server';

export async function updateSession(request: NextRequest) {
  console.log('[updateSession] Incoming request cookies:', request.cookies.getAll().map(c => c.name));

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
          cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
        }
        // The get, set, and remove methods are deprecated as per user feedback.
        // Supabase client with ssr v0.6.1 might still work with them but prefers getAll/setAll.
        // If only getAll/setAll are strictly supported, then individual get/set/remove might not be called.
        // For safety, we can provide the old ones too, or rely on ssr to use getAll/setAll primarily.
        // Let's try with only getAll and setAll first as per the deprecation message.
        // get(name: string) {
        //   return request.cookies.get(name)?.value;
        // },
        // set(name: string, value: string, options: CookieOptions) {
        //   response.cookies.set({ name, value, ...options });
        // },
        // remove(name: string, options: CookieOptions) {
        //   response.cookies.set({ name, value: '', ...options });
        // },
      },
    }
  );

  // Refresh session if expired - This will refresh the session if needed,
  // and the set/remove cookie handlers above will be called.
  const { data: { user } } = await supabase.auth.getUser();
  console.log('[updateSession] User from supabase.auth.getUser():', user ? user.id : 'No user');
  console.log('[updateSession] Cookies on outgoing response (before return):', response.cookies.getAll().map(c => c.name));


  return response;
}
