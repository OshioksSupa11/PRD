'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ProjectCard from '@/components/ui/ProjectCard';
import { cn } from '@/lib/utils';
import { projects } from '@/data/projects';
import type { ProjectType } from '@/types';

const typeFilters: { label: string; value: ProjectType | 'All' }[] = [
  { label: 'All', value: 'All' },
  { label: 'Engineering', value: 'engineering' },
  { label: 'Software', value: 'software' },
  { label: 'Hybrid', value: 'hybrid' },
];

export default function ProjectsPage() {
  const [activeType, setActiveType] = useState<ProjectType | 'All'>('All');
  const [search, setSearch] = useState('');

  const publishedOnly = projects.filter((p) => p.published !== false);

  const filtered = publishedOnly.filter((p) => {
    const typeMatch = activeType === 'All' || p.type === activeType || (activeType === 'engineering' && !p.type);
    const searchMatch =
      search === '' ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.technologies.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return typeMatch && searchMatch;
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
            Projects
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/80">
            Engineering case studies and software projects demonstrating technical
            expertise across fire protection, system design, and technology building.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-12">
            <div className="flex flex-wrap gap-2">
              {typeFilters.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setActiveType(f.value)}
                  className={cn(
                    'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                    activeType === f.value
                      ? 'bg-accent text-white'
                      : 'bg-bg-alt text-text-muted hover:text-text'
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects..."
              className="rounded-lg border border-border bg-bg-alt px-4 py-2 text-sm text-text placeholder:text-text-muted/60 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/20 sm:w-64"
            />
          </div>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-text-muted">
              <p className="text-lg">No projects match your search.</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((project) => (
                <Link key={project.id} href={`/projects/${project.slug}`} className="block">
                  <ProjectCard project={project} />
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
