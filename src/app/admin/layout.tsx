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
  Wrench,
  Briefcase,
  Star,
  Quote,
  Clock,
  Target,
  User,
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Overview', href: '/admin', icon: LayoutDashboard },
  { label: 'Projects', href: '/admin/projects', icon: FolderOpen },
  { label: 'Certifications', href: '/admin/certifications', icon: Award },
  { label: 'Blog Posts', href: '/admin/blog', icon: FileText },
  { label: 'Skills', href: '/admin/skills', icon: Wrench },
  { label: 'Experience', href: '/admin/experience', icon: Briefcase },
  { label: 'Achievements', href: '/admin/achievements', icon: Star },
  { label: 'Testimonials', href: '/admin/testimonials', icon: Quote },
  { label: 'Timeline', href: '/admin/timeline', icon: Clock },
  { label: 'Focus', href: '/admin/focus', icon: Target },
  { label: 'Profile', href: '/admin/profile', icon: User },
  { label: 'Messages', href: '/admin/messages', icon: MessageSquare },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [session, setSession] = useState<boolean | null>(null);

  useEffect(() => {
    fetch('/api/auth/session')
      .then((res) => res.json())
      .then((data) => {
        if (!data.authenticated) {
          router.push('/admin/login');
        } else {
          setSession(true);
        }
      })
      .catch(() => {
        setSession(true);
      });
  }, [router]);

  const handleSignOut = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  if (pathname === '/admin/login') return <>{children}</>;
  if (session === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-alt">
        <div className="flex items-center gap-3 text-text-muted">
          <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span className="text-sm">Loading...</span>
        </div>
      </div>
    );
  }

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
