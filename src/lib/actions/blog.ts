'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

export interface BlogFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image?: string;
  category?: string;
  tags?: string;
  published_at?: string;
  featured?: boolean;
}

function parseTags(value?: string): string[] {
  if (!value) return [];
  return value.split(',').map((s) => s.trim()).filter(Boolean);
}

export async function createBlogPost(formData: BlogFormData) {
  const supabase = await createClient();

  const { error } = await supabase.from('blog_posts').insert({
    title: formData.title,
    slug: formData.slug,
    excerpt: formData.excerpt,
    content: formData.content,
    cover_image: formData.cover_image || null,
    category:
      (formData.category as
        | 'Fire Protection'
        | 'Engineering'
        | 'Software Development'
        | 'Artificial Intelligence'
        | 'Career Development') || 'Engineering',
    tags: parseTags(formData.tags),
    published_at: formData.published_at || null,
    featured: formData.featured ?? false,
  });

  if (error) return { success: false, error: error.message };

  revalidatePath('/blog');
  revalidatePath('/admin/blog');
  return { success: true };
}

export async function updateBlogPost(id: string, formData: BlogFormData) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('blog_posts')
    .update({
      title: formData.title,
      slug: formData.slug,
      excerpt: formData.excerpt,
      content: formData.content,
      cover_image: formData.cover_image || null,
      category:
        (formData.category as
          | 'Fire Protection'
          | 'Engineering'
          | 'Software Development'
          | 'Artificial Intelligence'
          | 'Career Development') || 'Engineering',
      tags: parseTags(formData.tags),
      published_at: formData.published_at || null,
      featured: formData.featured ?? false,
    })
    .eq('id', id);

  if (error) return { success: false, error: error.message };

  revalidatePath('/blog');
  revalidatePath('/admin/blog');
  return { success: true };
}

export async function deleteBlogPost(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from('blog_posts').delete().eq('id', id);

  if (error) return { success: false, error: error.message };

  revalidatePath('/blog');
  revalidatePath('/admin/blog');
  return { success: true };
}
