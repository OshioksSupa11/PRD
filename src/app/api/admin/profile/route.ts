import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  const supabase = await createClient();
  const { data } = await supabase.from('profiles').select('*').limit(1).single();
  return NextResponse.json(data || null);
}

export async function PUT(request: NextRequest) {
  const supabase = await createClient();
  const body = await request.json();
  const { data: existing } = await supabase.from('profiles').select('id').limit(1).single();
  if (existing) {
    const { error } = await supabase.from('profiles').update(body).eq('id', existing.id);
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  } else {
    const { error } = await supabase.from('profiles').insert(body);
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  }
  return NextResponse.json({ success: true });
}
