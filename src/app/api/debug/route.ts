import { NextResponse } from 'next/server';

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const keyLength = key ? key.length : 0;

  const result: Record<string, unknown> = {
    supabaseUrl: url || '(missing)',
    supabaseKey: key ? `(set, ${keyLength} chars)` : '(missing)',
  };

  if (!url || !key) {
    return NextResponse.json({ ...result, error: 'Env vars not set' }, { status: 500 });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    const res = await fetch(`${url}/rest/v1/projects?select=count`, {
      headers: { apikey: key, Prefer: 'count=exact' },
      signal: controller.signal,
    });

    clearTimeout(timeout);

    result.httpStatus = res.status;
    result.httpOk = res.ok;

    if (!res.ok) {
      const body = await res.text();
      result.error = body.slice(0, 300);
      return NextResponse.json(result, { status: 500 });
    }

    const body = await res.json();
    const parsed = body as unknown[];
    result.count = Array.isArray(parsed) && parsed[0] ? (parsed[0] as Record<string, unknown>).count : 0;
    return NextResponse.json(result);
  } catch (err) {
    result.error = err instanceof Error ? err.message : String(err);
    return NextResponse.json(result, { status: 500 });
  }
}
