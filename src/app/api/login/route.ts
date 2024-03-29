import { NextRequest, NextResponse } from 'next/server';
import config from '@/config';

export async function POST(req: NextRequest) {
  const request = await req.json();

    try {
      const response = await fetch(`${config.apiUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      const data = await response.json();

      if (!response.ok) {
        // Correctly return the error using NextResponse
        return NextResponse.json({ error: data }, { status: response.status });
      }

      const nextRes = NextResponse.json(data);

      // Forward the Set-Cookie header from the backend response
      const backendSetCookie = response.headers.get('Set-Cookie');
      if (backendSetCookie) {
        nextRes.headers.set('Set-Cookie', backendSetCookie);
      }

      return nextRes;
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export default function handler(req: NextRequest) {
  if (req.method === 'POST') {
    return POST(req);
  } else {
    const res = NextResponse.next();
    res.headers.set('Allow', 'POST');
    return NextResponse.rewrite(new URL('/api/not-allowed', req.url));
  }
}