import { ArrowUpRight, FolderCode } from 'lucide-react';
import type { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group overflow-hidden rounded-xl border border-border bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Image */}
      <div className="relative aspect-video w-full overflow-hidden bg-bg-alt">
        <div className="flex h-full w-full items-center justify-center text-text-muted">
          <FolderCode className="h-12 w-12 opacity-30" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      <div className="p-6">
        {/* Category */}
        <span className="text-xs font-semibold uppercase tracking-widest text-accent">
          {project.category}
        </span>

        {/* Title */}
        <h3 className="mt-1 text-lg font-bold text-primary group-hover:text-accent transition-colors">
          {project.title}
        </h3>

        {/* Description */}
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-text-muted">
          {project.description}
        </p>

        {/* Technologies */}
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

        {/* Link */}
        {project.externalLink && (
          <a
            href={project.externalLink}
            className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-accent-light transition-colors"
          >
            View Details
            <ArrowUpRight className="h-4 w-4" />
          </a>
        )}
      </div>
    </div>
  );
}
