import { NextRequest, NextResponse } from 'next/server';
import config from '@/config';

// Named export for POST method
export async function POST(req: NextRequest) {
  const request = await req.json();
  console.log(`${config.apiUrl}/signup`)

  try {
    const response = await fetch(`${config.apiUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: data }, { status: response.status });
    }

    // Prepare the NextResponse with the data
    const nextRes = NextResponse.json(data);

    // Attach Set-Cookie header if present
    const setCookieHeader = response.headers.get('Set-Cookie');
    if (setCookieHeader) {
      nextRes.headers.set('Set-Cookie', setCookieHeader);
    }

    return nextRes;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// Adjust the default handler to use NextResponse for method not allowed
export function handler(req: NextRequest) {
  if (req.method !== 'POST') {
    const res = NextResponse.next();
    res.headers.set('Allow', 'POST');
    return NextResponse.rewrite(new URL('/api/not-allowed', req.url));
  }
  return POST(req);
}