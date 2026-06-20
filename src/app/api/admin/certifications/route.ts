import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  const supabase = await createClient();
  const { data } = await supabase.from('certifications').select('*').order('issue_date', { ascending: false });
  return NextResponse.json(data || []);
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const body = await request.json();
  const { data, error } = await supabase.from('certifications').insert(body).select();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}

export async function PUT(request: NextRequest) {
  const supabase = await createClient();
  const { id, ...body } = await request.json();
  const { error } = await supabase.from('certifications').update(body).eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ success: true });
}

export async function DELETE(request: NextRequest) {
  const supabase = await createClient();
  const id = request.nextUrl.searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  const { error } = await supabase.from('certifications').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ success: true });
}
