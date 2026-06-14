import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import BlogListingClient from '@/components/blog/BlogListingClient';
import { getAllPosts } from '@/lib/blog';

export default function BlogPage() {
  const allPosts = getAllPosts();

  return (
    <>
      <section className="bg-primary pt-24 pb-16 sm:pt-32 sm:pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Portfolio
          </Link>

          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Blog & Insights
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/80">
            Articles on fire protection engineering, software development, career
            growth, and the intersection of engineering and technology.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <BlogListingClient posts={allPosts} />
        </div>
      </section>
    </>
  );
}
