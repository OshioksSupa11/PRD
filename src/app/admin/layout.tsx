'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FolderOpen,
  Award,
  MessageSquare,
  FileText,
  LogOut,
} from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Overview', href: '/admin', icon: LayoutDashboard },
  { label: 'Projects', href: '/admin/projects', icon: FolderOpen },
  { label: 'Certifications', href: '/admin/certifications', icon: Award },
  { label: 'Messages', href: '/admin/messages', icon: MessageSquare },
  { label: 'Blog Posts', href: '/admin/blog', icon: FileText },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [session, setSession] = useState<boolean | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.push('/admin/login');
      } else {
        setSession(true);
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.push('/admin/login');
      }
    });

    return () => listener.subscription.unsubscribe();
  }, [router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  if (pathname === '/admin/login') return <>{children}</>;
  if (session === null) return null;

  return (
    <div className="min-h-screen flex bg-bg-alt">
      <aside className="hidden lg:flex w-64 flex-col border-r border-border bg-bg">
        <div className="p-6 border-b border-border">
          <h2 className="text-lg font-bold text-primary">Admin Dashboard</h2>
          <p className="text-xs text-text-muted mt-1">godsgrace-edem.vercel.app</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                pathname === item.href
                  ? 'bg-accent/10 text-accent'
                  : 'text-text-muted hover:bg-bg-alt hover:text-text'
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <button
            onClick={handleSignOut}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-text-muted hover:bg-bg-alt hover:text-text transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6 lg:p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
}
