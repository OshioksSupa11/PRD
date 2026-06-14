import 'server-only';

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { BlogCategory } from '@/types';
import type { BlogPostWithContent } from '@/lib/blog-data';

const blogDir = path.join(process.cwd(), 'src/content/blog');

function estimateReadingTime(text: string): string {
  const wordsPerMinute = 200;
  const words = text.split(/\s+/g).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

export function getAllPosts(): BlogPostWithContent[] {
  const files = fs.readdirSync(blogDir).filter((f) => f.endsWith('.md'));

  const posts = files
    .map((filename) => {
      const filePath = path.join(blogDir, filename);
      const raw = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(raw);

      return {
        id: data.slug || filename.replace('.md', ''),
        title: data.title || '',
        slug: data.slug || filename.replace('.md', ''),
        excerpt: data.excerpt || '',
        content,
        coverImage: data.coverImage || null,
        category: data.category || 'Engineering',
        tags: data.tags || [],
        publishedAt: data.publishedAt || null,
        featured: data.featured || false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        readingTime: estimateReadingTime(content),
      } as BlogPostWithContent;
    })
    .sort(
      (a, b) =>
        new Date(b.publishedAt || '').getTime() -
        new Date(a.publishedAt || '').getTime()
    );

  return posts;
}

export function getPostBySlug(slug: string): BlogPostWithContent | null {
  const posts = getAllPosts();
  return posts.find((p) => p.slug === slug) || null;
}

export function getPostsByCategory(category: BlogCategory): BlogPostWithContent[] {
  const posts = getAllPosts();
  return posts.filter((p) => p.category === category);
}

export function getRelatedPosts(
  slug: string,
  limit: number = 3
): BlogPostWithContent[] {
  const all = getAllPosts();
  const current = all.find((p) => p.slug === slug);
  if (!current) return [];

  return all
    .filter((p) => p.slug !== slug && p.category === current.category)
    .slice(0, limit);
}

export function getFeaturedPosts(): BlogPostWithContent[] {
  return getAllPosts().filter((p) => p.featured).slice(0, 3);
}
