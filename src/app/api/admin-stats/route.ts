import { NextResponse } from 'next/server';

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return NextResponse.json({ error: 'Supabase config missing' }, { status: 500 });
  }

  const fetchCount = async (table: string): Promise<number> => {
    const res = await fetch(`${url}/rest/v1/${table}?select=count`, {
      headers: { apikey: key, Prefer: 'count=exact' },
    });
    if (!res.ok) return 0;
    const data = await res.json();
    return (Array.isArray(data) && data[0]?.count) ? (data[0].count as number) : 0;
  };

  try {
    const [projects, certs, blog, msgs] = await Promise.allSettled([
      fetchCount('projects'),
      fetchCount('certifications'),
      fetchCount('blog_posts'),
      fetchCount('messages'),
    ]);

    return NextResponse.json({
      projects: projects.status === 'fulfilled' ? projects.value : 0,
      certifications: certs.status === 'fulfilled' ? certs.value : 0,
      blogPosts: blog.status === 'fulfilled' ? blog.value : 0,
      messages: msgs.status === 'fulfilled' ? msgs.value : 0,
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed' },
      { status: 500 }
    );
  }
}
