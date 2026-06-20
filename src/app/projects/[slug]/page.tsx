import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  Clock,
  Calendar,
  ArrowLeft,
  ExternalLink,
  GitFork,
  Tag,
  Lightbulb,
  Search,
  Wrench,
  AlertTriangle,
  CheckCircle,
  GraduationCap,
  Layers,
} from 'lucide-react';
import { getProjectBySlug, getProjects } from '@/lib/data/projects';
import { formatYear } from '@/lib/utils';
import type { Project } from '@/types';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const projects = await getProjects();
    if (projects.length === 0) {
      const { projects: fallback } = await import('@/data/projects');
      return fallback.map((project) => ({ slug: project.slug }));
    }
    return projects.map((project) => ({ slug: project.slug }));
  } catch {
    const { projects: fallback } = await import('@/data/projects');
    return fallback.map((project) => ({ slug: project.slug }));
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  let project: Project | null | undefined;
  try {
    project = await getProjectBySlug(slug);
  } catch {
    // fallback
  }
  if (!project) {
    const { projects: fallback } = await import('@/data/projects');
    project = fallback.find((p) => p.slug === slug);
  }
  if (!project) return { title: 'Project Not Found' };
  return {
    title: `${project.title} — Godsgrace Edem`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  let project: Project | null | undefined;
  try {
    project = await getProjectBySlug(slug);
  } catch {
    // fallback to hardcoded data
  }
  if (!project) {
    const { projects: fallback } = await import('@/data/projects');
    project = fallback.find((p) => p.slug === slug);
  }

  if (!project) notFound();

  const sections = [
    { key: 'problem', title: 'Problem', content: project.problem, icon: AlertTriangle },
    { key: 'research', title: 'Research & Analysis', content: project.research, icon: Search },
    { key: 'solution', title: 'Solution', content: project.solution, icon: Lightbulb },
    { key: 'designDecisions', title: 'Design Decisions', content: project.designDecisions, icon: Layers },
    { key: 'challenges', title: 'Challenges', content: project.challenges, icon: GraduationCap },
    { key: 'results', title: 'Results', content: project.results, icon: CheckCircle },
    { key: 'lessonsLearned', title: 'Lessons Learned', content: project.lessonsLearned, icon: Wrench },
  ].filter((s) => s.content);

  return (
    <>
      <section className="bg-primary pt-24 pb-16 sm:pt-32 sm:pb-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Link>

          <span className="inline-flex rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold text-accent-light">
            {project.category}
          </span>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            {project.title}
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/80">
            {project.description}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/60">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {formatYear(project.projectDate)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              Case Study
            </span>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 mb-12">
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-text-muted mr-2">
              <Tag className="h-4 w-4" />
              Technologies:
            </span>
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="inline-flex rounded-lg bg-bg-alt px-3 py-1 text-sm font-medium text-text"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="space-y-16">
            {sections.map((section) => (
              <div key={section.key}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                    <section.icon className="h-5 w-5 text-accent" />
                  </div>
                  <h2 className="text-2xl font-bold text-primary">{section.title}</h2>
                </div>
                <p className="text-base leading-relaxed text-text-muted whitespace-pre-wrap">
                  {section.content}
                </p>
              </div>
            ))}

            {project.screenshots && project.screenshots.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-primary mb-6">Screenshots</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {project.screenshots.map((url, i) => (
                    <div
                      key={i}
                      className="aspect-video rounded-xl border border-border bg-bg-alt flex items-center justify-center text-text-muted"
                    >
                      <img src={url} alt={`Screenshot ${i + 1}`} className="h-full w-full object-cover rounded-xl" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-4 pt-8 border-t border-border">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 font-semibold text-white hover:bg-accent-light transition-colors"
              >
                Discuss a Similar Project
              </Link>
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 font-semibold text-text hover:bg-bg-alt transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  Live Demo
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 font-semibold text-text hover:bg-bg-alt transition-colors"
                >
                  <GitFork className="h-4 w-4" />
                  View Code
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
