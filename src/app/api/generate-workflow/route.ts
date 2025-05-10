import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient'; // Reverting to the shared client

export async function POST(request: Request) {
  // =====================================================================================
  // WARNING & IMPORTANT NOTE (AGAIN):
  // This API route is reverted to using the shared/generic Supabase client
  // due to persistent TypeScript errors in your environment. These errors indicate
  // problems resolving functions from '@supabase/ssr' (like createServerClient)
  // and/or type inference issues with `cookies()` from `next/headers`
  // (e.g., `cookieStore.getAll()` failing because `cookieStore` is seen as a Promise).
  //
  // THIS IS NOT THE RECOMMENDED OR SECURE APPROACH FOR SERVER-SIDE AUTH IN API ROUTES.
  //
  // If this route returns 401 Unauthorized errors (which is likely), it's because
  // this basic client cannot correctly pick up session cookies in this server context.
  //
  // YOU MUST RESOLVE YOUR LOCAL ENVIRONMENT ISSUES (Next.js 15/React 19 compatibility
  // with @supabase/ssr@0.6.1, TypeScript setup, node_modules integrity)
  // to enable the use of `@supabase/ssr` helper functions for robust server-side auth.
  // =====================================================================================

  try {
    // =====================================================================================
    // RE-ENABLING AUTHENTICATION CHECK:
    // User status must be checked before taking any action.
    // This uses the shared Supabase client. For robust server-side auth,
    // environment issues preventing @supabase/ssr helpers must be resolved.
    // =====================================================================================
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) {
      console.error('Error getting session:', sessionError.message);
      return new NextResponse('Internal Server Error', { status: 500 });
    }
    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    // =====================================================================================

    const body = await request.json();
    const { prompt } = body;

    if (!prompt) {
      return new NextResponse('Missing prompt in request body', { status: 400 });
    }

    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;
    const n8nApiKey = process.env.N8N_API_KEY;

    if (!n8nWebhookUrl || !n8nApiKey) {
      console.error('N8N Webhook URL or API Key is not configured in environment variables.');
      return new NextResponse('Server configuration error', { status: 500 });
    }

    const response = await fetch(n8nWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${n8nApiKey}`,
      },
      body: JSON.stringify({ prompt }), // Assuming n8n webhook expects a 'prompt' field
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`Error from n8n webhook: ${response.status} ${response.statusText}`, errorBody);
      return new NextResponse(`Error from n8n service: ${errorBody || response.statusText}`, { status: response.status });
    }

    const n8nWorkflowJson = await response.json();
    return NextResponse.json(n8nWorkflowJson);

  } catch (error: unknown) { // Typed error as unknown
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error in /api/generate-workflow:', message, error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
