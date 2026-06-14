'use client';

import { ArrowUpRight, FolderCode } from 'lucide-react';
import Link from 'next/link';
import type { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <div
      className="group cursor-pointer overflow-hidden rounded-xl border border-border bg-bg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      onClick={onClick}
    >
      <div className="relative aspect-video w-full overflow-hidden bg-bg-alt">
        <div className="flex h-full w-full items-center justify-center text-text-muted">
          <FolderCode className="h-12 w-12 opacity-30" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      <div className="p-6">
        <span className="text-xs font-semibold uppercase tracking-widest text-accent">
          {project.category}
        </span>

        <h3 className="mt-1 text-lg font-bold text-primary group-hover:text-accent transition-colors">
          {project.title}
        </h3>

        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-text-muted">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="inline-flex rounded-md bg-bg-alt px-2.5 py-1 text-xs font-medium text-text-muted"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="inline-flex rounded-md bg-bg-alt px-2.5 py-1 text-xs font-medium text-text-muted">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        <div className="mt-4 flex items-center gap-3">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-accent-light transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            View Details
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
