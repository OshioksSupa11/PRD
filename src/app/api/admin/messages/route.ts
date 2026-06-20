import { NextRequest, NextResponse } from 'next/server';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function getHeaders(): HeadersInit {
  return key
    ? { apikey: key, 'Content-Type': 'application/json', Prefer: 'return=representation' }
    : {};
}

export async function GET() {
  if (!url || !key) return NextResponse.json([], { status: 500 });
  const res = await fetch(`${url}/rest/v1/messages?select=*&order=created_at.desc`, { headers: { apikey: key } });
  return NextResponse.json(await res.json());
}

export async function PUT(request: NextRequest) {
  if (!url || !key) return NextResponse.json({ error: 'Config missing' }, { status: 500 });
  const { id, ...body } = await request.json();
  const res = await fetch(`${url}/rest/v1/messages?id=eq.${encodeURIComponent(id)}`, { method: 'PATCH', headers: getHeaders(), body: JSON.stringify(body) });
  if (!res.ok) return NextResponse.json({ error: 'Update failed' }, { status: res.status });
  return NextResponse.json({ success: true });
}

export async function DELETE(request: NextRequest) {
  if (!url || !key) return NextResponse.json({ error: 'Config missing' }, { status: 500 });
  const id = request.nextUrl.searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  const res = await fetch(`${url}/rest/v1/messages?id=eq.${encodeURIComponent(id)}`, { method: 'DELETE', headers: { apikey: key } });
  if (!res.ok) return NextResponse.json({ error: 'Delete failed' }, { status: res.status });
  return NextResponse.json({ success: true });
}
