'use client';

import { useState } from 'react';
import BlogCard from '@/components/blog/BlogCard';
import CategoryFilter from '@/components/blog/CategoryFilter';
import type { BlogCategory } from '@/types';
import type { BlogPostWithContent } from '@/lib/blog-data';

interface BlogListingClientProps {
  posts: BlogPostWithContent[];
}

export default function BlogListingClient({ posts }: BlogListingClientProps) {
  const [activeCategory, setActiveCategory] = useState<BlogCategory | 'All'>('All');

  const filtered =
    activeCategory === 'All'
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  return (
    <>
      <div className="mb-12">
        <CategoryFilter active={activeCategory} onSelect={setActiveCategory} />
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-text-muted">
          <p className="text-lg">No articles in this category yet.</p>
          <p className="mt-2 text-sm">Check back soon for new content.</p>
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </>
  );
}
