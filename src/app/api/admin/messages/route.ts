import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  const supabase = await createClient();
  const { data } = await supabase.from('messages').select('*').order('created_at', { ascending: false });
  return NextResponse.json(data || []);
}

export async function PUT(request: NextRequest) {
  const supabase = await createClient();
  const { id, ...body } = await request.json();
  const { error } = await supabase.from('messages').update(body).eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ success: true });
}

export async function DELETE(request: NextRequest) {
  const supabase = await createClient();
  const id = request.nextUrl.searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  const { error } = await supabase.from('messages').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ success: true });
}
