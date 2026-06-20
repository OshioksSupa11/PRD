'use server';

import { createClient } from '@/lib/supabase/server';

export async function getAdminStats(): Promise<{
  projects: number;
  certifications: number;
  blogPosts: number;
  messages: number;
  error?: string;
}> {
  try {
    const supabase = await createClient();

    const [projectsRes, certsRes, blogRes, msgsRes] = await Promise.allSettled([
      supabase.from('projects').select('*', { count: 'exact', head: true }),
      supabase.from('certifications').select('*', { count: 'exact', head: true }),
      supabase.from('blog_posts').select('*', { count: 'exact', head: true }),
      supabase.from('messages').select('*', { count: 'exact', head: true }),
    ]);

    const getCount = (result: PromiseSettledResult<unknown>) =>
      result.status === 'fulfilled'
        ? (result.value as { count: number | null }).count ?? 0
        : 0;

    return {
      projects: getCount(projectsRes),
      certifications: getCount(certsRes),
      blogPosts: getCount(blogRes),
      messages: getCount(msgsRes),
    };
  } catch (err) {
    return {
      projects: 0,
      certifications: 0,
      blogPosts: 0,
      messages: 0,
      error: err instanceof Error ? err.message : 'Failed to fetch stats',
    };
  }
}
