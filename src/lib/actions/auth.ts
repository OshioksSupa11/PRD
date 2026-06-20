'use server';

import { createClient } from '@/lib/supabase/server';

export async function adminLogin(email: string, password: string): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) return { success: false, error: error.message };
    if (!data.session) return { success: false, error: 'No session returned' };

    return { success: true };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : 'Login failed' };
  }
}
