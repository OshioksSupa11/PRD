import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import BlogCard from '@/components/blog/BlogCard';
import FadeInSection from '@/components/shared/FadeInSection';
import { getFeaturedPosts } from '@/lib/blog';

export default function BlogTeaser() {
  const posts = getFeaturedPosts();

  if (posts.length === 0) return null;

  return (
    <section id="blog-teaser" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <SectionHeading
            overline="Insights"
            title="Latest Articles"
            subtitle="Thoughts on fire protection, technology, and career development."
          />
        </FadeInSection>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <FadeInSection key={post.slug} delay={i * 0.1}>
              <BlogCard post={post} />
            </FadeInSection>
          ))}
        </div>

        <FadeInSection>
          <div className="mt-12 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 font-semibold text-white hover:bg-accent-light transition-colors"
            >
              View All Articles
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}
