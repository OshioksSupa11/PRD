'use server';

export async function getAdminStats(): Promise<{
  projects: number;
  certifications: number;
  blogPosts: number;
  messages: number;
  error?: string;
  debug?: string;
}> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return {
      projects: 0, certifications: 0, blogPosts: 0, messages: 0,
      error: `Env vars missing. URL: ${url || '(none)'}, Key: ${key ? '(set)' : '(none)'}`,
    };
  }

  try {
    const res = await fetch(`${url}/rest/v1/projects?select=count&head=true`, {
      headers: { apikey: key },
    });

    if (!res.ok) {
      const body = await res.text();
      return {
        projects: 0, certifications: 0, blogPosts: 0, messages: 0,
        error: `HTTP ${res.status}: ${body.slice(0, 200)}`,
        debug: `URL: ${url}`,
      };
    }

    const contentRange = res.headers.get('content-range');
    const count = contentRange ? parseInt(contentRange.split('/')[1], 10) || 0 : 0;

    return { projects: count, certifications: 0, blogPosts: 0, messages: 0, debug: `OK - connected to ${url}` };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return {
      projects: 0, certifications: 0, blogPosts: 0, messages: 0,
      error: msg,
      debug: `URL: ${url}`,
    };
  }
}
