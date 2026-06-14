'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import CertificationCard from '@/components/ui/CertificationCard';
import { certifications } from '@/data/certifications';
import { cn } from '@/lib/utils';

export default function CertificationsPage() {
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    certifications.forEach((c) => c.skillTags?.forEach((t) => tags.add(t)));
    return Array.from(tags).sort();
  }, []);

  const filtered = certifications.filter((c) => {
    const searchMatch =
      search === '' ||
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.issuer.toLowerCase().includes(search.toLowerCase()) ||
      c.skillTags?.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const tagMatch = !activeTag || c.skillTags?.includes(activeTag);
    return searchMatch && tagMatch;
  });

  return (
    <>
      <section className="bg-primary pt-24 pb-16 sm:pt-32 sm:pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Portfolio
          </Link>

          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Certifications
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/80">
            Industry-recognized certifications demonstrating expertise and commitment
            to professional development in fire protection and engineering.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between mb-12">
            <div className="flex flex-wrap gap-2 max-w-lg">
              <button
                onClick={() => setActiveTag(null)}
                className={cn(
                  'rounded-full px-3 py-1.5 text-xs font-medium transition-colors',
                  !activeTag
                    ? 'bg-accent text-white'
                    : 'bg-bg-alt text-text-muted hover:text-text'
                )}
              >
                All
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={cn(
                    'rounded-full px-3 py-1.5 text-xs font-medium transition-colors',
                    activeTag === tag
                      ? 'bg-accent text-white'
                      : 'bg-bg-alt text-text-muted hover:text-text'
                  )}
                >
                  {tag}
                </button>
              ))}
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search certifications..."
              className="rounded-lg border border-border bg-bg-alt px-4 py-2 text-sm text-text placeholder:text-text-muted/60 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/20 sm:w-64"
            />
          </div>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-text-muted">
              <p className="text-lg">No certifications match your search.</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {filtered.map((cert) => (
                <CertificationCard key={cert.id} certification={cert} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
