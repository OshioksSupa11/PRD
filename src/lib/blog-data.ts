import type { BlogPost, BlogCategory } from '@/types';

export interface BlogPostWithContent extends BlogPost {
  content: string;
  readingTime: string;
}

export const blogCategories: { label: string; value: BlogCategory }[] = [
  { label: 'Fire Protection', value: 'Fire Protection' },
  { label: 'Engineering', value: 'Engineering' },
  { label: 'Software Development', value: 'Software Development' },
  { label: 'Artificial Intelligence', value: 'Artificial Intelligence' },
  { label: 'Career Development', value: 'Career Development' },
];
