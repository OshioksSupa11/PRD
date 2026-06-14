import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import type { BlogPostWithContent } from '@/lib/blog-data';
import { formatDate } from '@/lib/utils';

interface BlogCardProps {
  post: BlogPostWithContent;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block overflow-hidden rounded-xl border border-border bg-bg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-bg-alt">
        <div className="flex h-full w-full items-center justify-center text-text-muted">
          <span className="text-4xl font-bold opacity-10">{post.category}</span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-3 text-xs text-text-muted">
          <span className="inline-flex rounded-full bg-accent/10 px-2.5 py-0.5 font-semibold text-accent">
            {post.category}
          </span>
          {post.publishedAt && (
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formatDate(post.publishedAt)}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {post.readingTime}
          </span>
        </div>

        <h3 className="mt-3 text-lg font-bold text-primary group-hover:text-accent transition-colors line-clamp-2">
          {post.title}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-text-muted">
          {post.excerpt}
        </p>

        <div className="mt-4 flex items-center gap-1 text-sm font-medium text-accent group-hover:text-accent-light transition-colors">
          Read Article
          <ArrowRight className="h-4 w-4" />
        </div>
      </div>
    </Link>
  );
}
