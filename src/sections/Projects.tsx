'use client';

import { useEffect, useState } from 'react';
import SectionHeading from '@/components/ui/SectionHeading';
import ProjectCard from '@/components/ui/ProjectCard';
import ProjectModal from '@/components/ui/ProjectModal';
import FadeInSection from '@/components/shared/FadeInSection';
import { projects as fallbackProjects } from '@/data/projects';
import type { Project } from '@/types';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState(fallbackProjects);
  useEffect(() => {
    fetch('/api/admin/projects')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data.map(p => ({ ...p, image: p.image_url || '/images/projects/placeholder.jpg', projectDate: p.project_date || '', techStack: p.tech_stack || [], externalLink: p.external_link, lessonsLearned: p.lessons_learned, designDecisions: p.design_decisions, readTimeMinutes: p.read_time_minutes, demoUrl: p.demo_url, githubUrl: p.github_url })));
        }
      })
      .catch(() => {});
  }, []);
  const featured = projects.filter((p) => p.featured);
  const other = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-24 sm:py-32 bg-bg-alt">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <SectionHeading
            overline="Portfolio"
            title="Featured Projects"
            subtitle="Selected projects demonstrating technical expertise and successful outcomes across multiple sectors. Click any card to preview, or view the full case study."
          />
        </FadeInSection>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, i) => (
            <FadeInSection key={project.id} delay={i * 0.1}>
              <ProjectCard
                project={project}
                onClick={() => setSelectedProject(project)}
              />
            </FadeInSection>
          ))}
        </div>

        {other.length > 0 && (
          <>
            <div className="mt-20">
              <FadeInSection>
                <SectionHeading
                  overline="More Work"
                  title="Additional Projects"
                />
              </FadeInSection>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {other.map((project, i) => (
                <FadeInSection key={project.id} delay={i * 0.1}>
                  <ProjectCard
                    project={project}
                    onClick={() => setSelectedProject(project)}
                  />
                </FadeInSection>
              ))}
            </div>
          </>
        )}

        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </section>
  );
}
