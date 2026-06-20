'use server';

import { createClient } from '@/lib/supabase/server';

export async function getAdminStats(): Promise<{
  projects: number;
  certifications: number;
  blogPosts: number;
  messages: number;
  error?: string;
  debug?: string;
}> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '(set)' : '(missing)';

  if (!url || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return {
      projects: 0, certifications: 0, blogPosts: 0, messages: 0,
      error: `Supabase env vars not set. URL: ${url || 'missing'}, Key: ${key}`,
    };
  }

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

    const rejected = [projectsRes, certsRes, blogRes, msgsRes]
      .filter((r): r is PromiseRejectedResult => r.status === 'rejected');

    if (rejected.length > 0) {
      const firstReason = rejected[0].reason;
      const msg = firstReason instanceof Error ? firstReason.message : String(firstReason);
      return {
        projects: 0, certifications: 0, blogPosts: 0, messages: 0,
        error: `Supabase query rejected: ${msg}`,
        debug: `URL: ${url}, Key: ${key}`,
      };
    }

    return {
      projects: getCount(projectsRes),
      certifications: getCount(certsRes),
      blogPosts: getCount(blogRes),
      messages: getCount(msgsRes),
    };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return {
      projects: 0, certifications: 0, blogPosts: 0, messages: 0,
      error: msg,
      debug: `URL: ${url}, Key: ${key}`,
    };
  }
}
