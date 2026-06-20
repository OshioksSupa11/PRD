'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

export interface ProjectFormData {
  title: string;
  slug: string;
  description: string;
  image_url?: string;
  technologies?: string;
  tech_stack?: string;
  category?: string;
  type?: string;
  project_date?: string;
  external_link?: string;
  featured?: boolean;
  published?: boolean;
  problem?: string;
  research?: string;
  solution?: string;
  design_decisions?: string;
  challenges?: string;
  results?: string;
  lessons_learned?: string;
  demo_url?: string;
  github_url?: string;
}

function parseArray(value?: string): string[] {
  if (!value) return [];
  return value.split(',').map((s) => s.trim()).filter(Boolean);
}

export async function createProject(formData: ProjectFormData) {
  const supabase = await createClient();

  const { error } = await supabase.from('projects').insert({
    title: formData.title,
    slug: formData.slug,
    description: formData.description,
    image_url: formData.image_url || null,
    technologies: parseArray(formData.technologies),
    tech_stack: parseArray(formData.tech_stack),
    category: formData.category || null,
    type: (formData.type as 'engineering' | 'software' | 'hybrid') || 'engineering',
    project_date: formData.project_date || null,
    external_link: formData.external_link || null,
    featured: formData.featured ?? false,
    published: formData.published ?? false,
    problem: formData.problem || null,
    research: formData.research || null,
    solution: formData.solution || null,
    design_decisions: formData.design_decisions || null,
    challenges: formData.challenges || null,
    results: formData.results || null,
    lessons_learned: formData.lessons_learned || null,
    demo_url: formData.demo_url || null,
    github_url: formData.github_url || null,
  });

  if (error) return { success: false, error: error.message };

  revalidatePath('/');
  revalidatePath('/admin/projects');
  return { success: true };
}

export async function updateProject(id: string, formData: ProjectFormData) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('projects')
    .update({
      title: formData.title,
      slug: formData.slug,
      description: formData.description,
      image_url: formData.image_url || null,
      technologies: parseArray(formData.technologies),
      tech_stack: parseArray(formData.tech_stack),
      category: formData.category || null,
      type: (formData.type as 'engineering' | 'software' | 'hybrid') || 'engineering',
      project_date: formData.project_date || null,
      external_link: formData.external_link || null,
      featured: formData.featured ?? false,
      published: formData.published ?? false,
      problem: formData.problem || null,
      research: formData.research || null,
      solution: formData.solution || null,
      design_decisions: formData.design_decisions || null,
      challenges: formData.challenges || null,
      results: formData.results || null,
      lessons_learned: formData.lessons_learned || null,
      demo_url: formData.demo_url || null,
      github_url: formData.github_url || null,
    })
    .eq('id', id);

  if (error) return { success: false, error: error.message };

  revalidatePath('/');
  revalidatePath('/admin/projects');
  return { success: true };
}

export async function deleteProject(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from('projects').delete().eq('id', id);

  if (error) return { success: false, error: error.message };

  revalidatePath('/');
  revalidatePath('/admin/projects');
  return { success: true };
}
