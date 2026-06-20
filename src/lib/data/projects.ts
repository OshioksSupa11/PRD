import 'server-only';

import { createClient } from '@/lib/supabase/server';
import type { Project } from '@/types';

export async function getProjects(): Promise<Project[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from('projects')
    .select('*')
    .order('project_date', { ascending: false });

  if (!data) return [];

  return data.map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    description: p.description,
    image: p.image_url || '/images/projects/placeholder.jpg',
    technologies: p.technologies || [],
    techStack: p.tech_stack || [],
    category: p.category || '',
    type: p.type,
    projectDate: p.project_date || '',
    externalLink: p.external_link || undefined,
    featured: p.featured || false,
    published: p.published || false,
    attachments: p.attachments as Project['attachments'],
    problem: p.problem,
    research: p.research,
    solution: p.solution,
    designDecisions: p.design_decisions,
    challenges: p.challenges,
    results: p.results,
    lessonsLearned: p.lessons_learned,
    demoUrl: p.demo_url,
    githubUrl: p.github_url,
    screenshots: p.screenshots || [],
    readTimeMinutes: p.read_time_minutes,
  }));
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!data) return null;

  return {
    id: data.id,
    title: data.title,
    slug: data.slug,
    description: data.description,
    image: data.image_url || '/images/projects/placeholder.jpg',
    technologies: data.technologies || [],
    techStack: data.tech_stack || [],
    category: data.category || '',
    type: data.type,
    projectDate: data.project_date || '',
    externalLink: data.external_link || undefined,
    featured: data.featured || false,
    published: data.published || false,
    attachments: data.attachments as Project['attachments'],
    problem: data.problem,
    research: data.research,
    solution: data.solution,
    designDecisions: data.design_decisions,
    challenges: data.challenges,
    results: data.results,
    lessonsLearned: data.lessons_learned,
    demoUrl: data.demo_url,
    githubUrl: data.github_url,
    screenshots: data.screenshots || [],
    readTimeMinutes: data.read_time_minutes,
  };
}
