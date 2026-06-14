'use client';

import {
  Code,
  Package,
  BookOpen,
} from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import FadeInSection from '@/components/shared/FadeInSection';
import { cn } from '@/lib/utils';

interface FocusItem {
  label: string;
  status: 'active' | 'progress' | 'soon';
  progress?: number;
}

interface FocusCategory {
  title: string;
  icon: React.ElementType;
  items: FocusItem[];
}

const focusData: FocusCategory[] = [
  {
    title: 'Learning',
    icon: Code,
    items: [
      { label: 'Next.js', status: 'progress', progress: 70 },
      { label: 'TypeScript', status: 'progress', progress: 85 },
      { label: 'AI Development', status: 'progress', progress: 40 },
    ],
  },
  {
    title: 'Building',
    icon: Package,
    items: [
      { label: 'Portfolio Platform', status: 'active' },
      { label: 'Future SaaS Products', status: 'soon' },
    ],
  },
  {
    title: 'Reading',
    icon: BookOpen,
    items: [
      { label: 'Engineering Journals', status: 'active' },
      { label: 'Technology Blogs', status: 'active' },
      { label: 'Entrepreneurship', status: 'active' },
    ],
  },
];

const statusBadge = {
  active: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  progress: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  soon: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
};

const statusLabel = {
  active: 'Active',
  progress: 'In Progress',
  soon: 'Coming Soon',
};

export default function CurrentFocus() {
  return (
    <section id="focus" className="py-24 sm:py-32 bg-bg-alt">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <SectionHeading
            overline="Now"
            title="What I'm Building Now"
            subtitle="Current areas of focus, learning, and development — keeping the portfolio dynamic and up to date."
          />
        </FadeInSection>

        <div className="mt-16 grid gap-8 sm:grid-cols-3">
          {focusData.map((category) => (
            <FadeInSection key={category.title}>
              <div className="rounded-xl border border-border bg-bg p-6 h-full transition-shadow duration-200 hover:shadow-md">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                    <category.icon className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="text-lg font-bold text-primary">
                    {category.title}
                  </h3>
                </div>

                <ul className="space-y-4">
                  {category.items.map((item) => (
                    <li key={item.label}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-text">
                          {item.label}
                        </span>
                        <span
                          className={cn(
                            'inline-flex rounded-full px-2 py-0.5 text-xs font-semibold',
                            statusBadge[item.status]
                          )}
                        >
                          {statusLabel[item.status]}
                        </span>
                      </div>
                      {item.progress !== undefined && (
                        <div className="h-1.5 rounded-full bg-bg-alt overflow-hidden">
                          <div
                            className="h-full rounded-full bg-accent transition-all duration-1000 ease-out"
                            style={{ width: `${item.progress}%` }}
                          />
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}
