'use client';

import { useEffect, useState } from 'react';
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

  useEffect(() => {
    async function fetchStats() {
      try {
        const [projectsRes, certsRes, blogRes, msgsRes] = await Promise.allSettled([
          supabase.from('projects').select('*', { count: 'exact', head: true }),
          supabase.from('certifications').select('*', { count: 'exact', head: true }),
          supabase.from('blog_posts').select('*', { count: 'exact', head: true }),
          supabase.from('messages').select('*', { count: 'exact', head: true }),
        ]);

        setStats({
          projects: projectsRes.status === 'fulfilled' ? (projectsRes.value.count ?? 0) : 0,
          certifications: certsRes.status === 'fulfilled' ? (certsRes.value.count ?? 0) : 0,
          blogPosts: blogRes.status === 'fulfilled' ? (blogRes.value.count ?? 0) : 0,
          messages: msgsRes.status === 'fulfilled' ? (msgsRes.value.count ?? 0) : 0,
        });
      } catch {
        // Supabase may not be configured locally
      }
      setLoading(false);
    }
    fetchStats();
  }, []);

  const statCards = [
    { label: 'Projects', value: stats.projects, icon: FolderOpen },
    { label: 'Certifications', value: stats.certifications, icon: Award },
    { label: 'Blog Posts', value: stats.blogPosts, icon: FileText },
    { label: 'Messages', value: stats.messages, icon: MessageSquare },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary mb-8">Dashboard Overview</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => (
          <div key={card.label} className="rounded-xl border border-border bg-bg p-6">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-text-muted">{card.label}</span>
              <card.icon className="h-5 w-5 text-text-muted" />
            </div>
            <span className="mt-3 block text-3xl font-bold text-primary">
              {loading ? '—' : card.value}
            </span>
          </div>
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
