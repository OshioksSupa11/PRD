'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

export async function updateMessageStatus(id: string, status: 'read' | 'replied' | 'unread') {
  const supabase = await createClient();

  const { error } = await supabase
    .from('messages')
    .update({ status })
    .eq('id', id);

  if (error) return { success: false, error: error.message };

  revalidatePath('/admin/messages');
  return { success: true };
}

export async function deleteMessage(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from('messages').delete().eq('id', id);

  if (error) return { success: false, error: error.message };

  revalidatePath('/admin/messages');
  return { success: true };
}
