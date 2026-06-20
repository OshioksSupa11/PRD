import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getSession();
    return NextResponse.json({ authenticated: !!data.session });
  } catch {
    return NextResponse.json({ authenticated: false });
  }
}
