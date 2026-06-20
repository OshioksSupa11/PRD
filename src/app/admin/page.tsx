'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';
import { FolderOpen, Award, FileText, MessageSquare } from 'lucide-react';

interface AdminStats {
  projects: number;
  certifications: number;
  blogPosts: number;
  messages: number;
}

export default function AdminPage() {
  const [stats, setStats] = useState<AdminStats>({ projects: 0, certifications: 0, blogPosts: 0, messages: 0 });
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchStats() {
      try {
        const [projectsRes, certsRes, blogRes, msgsRes] = await Promise.allSettled([
          supabase.from('projects').select('*', { count: 'exact', head: true }),
          supabase.from('certifications').select('*', { count: 'exact', head: true }),
          supabase.from('blog_posts').select('*', { count: 'exact', head: true }),
          supabase.from('messages').select('*', { count: 'exact', head: true }),
        ]);

        const rejected = [projectsRes, certsRes, blogRes, msgsRes]
          .filter((r): r is PromiseRejectedResult => r.status === 'rejected');

        if (rejected.length > 0) {
          const msg = rejected[0].reason?.message || rejected[0].reason?.toString() || 'Unknown error';
          setError(`Supabase error (${process.env.NEXT_PUBLIC_SUPABASE_URL || 'no URL set'}): ${msg}`);
        }

        setStats({
          projects: projectsRes.status === 'fulfilled' ? (projectsRes.value.count ?? 0) : 0,
          certifications: certsRes.status === 'fulfilled' ? (certsRes.value.count ?? 0) : 0,
          blogPosts: blogRes.status === 'fulfilled' ? (blogRes.value.count ?? 0) : 0,
          messages: msgsRes.status === 'fulfilled' ? (msgsRes.value.count ?? 0) : 0,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch stats');
      }
      setLoading(false);
    }
    fetchStats();
  }, []);

  const statCards = [
    { label: 'Projects', value: stats.projects, icon: FolderOpen, href: '/admin/projects' },
    { label: 'Certifications', value: stats.certifications, icon: Award, href: '/admin/certifications' },
    { label: 'Blog Posts', value: stats.blogPosts, icon: FileText, href: '/admin/blog' },
    { label: 'Messages', value: stats.messages, icon: MessageSquare, href: '/admin/messages' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary mb-8">Dashboard Overview</h1>

      {error && (
        <div className="mb-8 rounded-xl border border-red-200 bg-red-50 p-4">
          <p className="text-sm font-medium text-red-800">{error}</p>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="rounded-xl border border-border bg-bg p-6 hover:border-accent/30 hover:shadow-sm transition-all block"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-text-muted">{card.label}</span>
              <card.icon className="h-5 w-5 text-text-muted" />
            </div>
            <span className="mt-3 block text-3xl font-bold text-primary">
              {loading ? '—' : card.value}
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-12 rounded-xl border border-border bg-bg p-6">
        <h2 className="text-lg font-bold text-primary mb-4">Quick Actions</h2>
        <p className="text-sm text-text-muted">
          Use the sidebar navigation to manage projects, certifications, blog posts, and view contact messages.
          Data is stored in Supabase and changes take effect immediately on the live site.
        </p>
      </div>
    </div>
  );
}
