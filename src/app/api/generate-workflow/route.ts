import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

export async function POST(request: Request) {
  try {
    const { userId } = await auth(); // Added await
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // User is authenticated, proceed with the API logic
    // console.log('Authenticated userId:', userId); // Optional: for server-side logging

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
