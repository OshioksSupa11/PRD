import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { cn, formatDate } from '@/lib/utils';
import { getAllPosts, getPostBySlug, getRelatedPosts } from '@/lib/blog';
import { ArticleSchema } from '@/components/seo/JsonLd';
import ShareButton from '@/components/blog/ShareButton';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import type { Components } from 'react-markdown';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Godsgrace Edem Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt || undefined,
      tags: post.tags,
    },
  };
}

function extractTOC(markdown: string): { id: string; text: string; level: number }[] {
  const headings = markdown.match(/^(#{2,3})\s+(.+)$/gm);
  if (!headings) return [];
  return headings.map((h) => {
    const level = h.startsWith('###') ? 3 : 2;
    const text = h.replace(/^#{2,3}\s+/, '');
    const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    return { id, text, level };
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const related = getRelatedPosts(slug, 3);
  const toc = extractTOC(post.content);

  const markdownComponents: Components = {
    code({ className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      const codeStr = String(children).replace(/\n$/, '');
      if (match) {
        return (
          <SyntaxHighlighter
            style={oneDark}
            language={match[1]}
            PreTag="div"
          >
            {codeStr}
          </SyntaxHighlighter>
        );
      }
      return (
        <code className={cn('rounded bg-bg-alt px-1.5 py-0.5 text-sm', className)} {...props}>
          {children}
        </code>
      );
    },
  };

  return (
    <>
      <ArticleSchema
        title={post.title}
        description={post.excerpt}
        publishedAt={post.publishedAt}
        slug={post.slug}
        tags={post.tags}
      />
      <section className="bg-primary pt-24 pb-12 sm:pt-32 sm:pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            All Articles
          </Link>

          <span className="inline-flex rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold text-accent-light">
            {post.category}
          </span>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            {post.title}
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/80">
            {post.excerpt}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/60">
            {post.publishedAt && (
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {formatDate(post.publishedAt)}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {post.readingTime}
            </span>
          </div>

          {post.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/70"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex gap-12">
          <article className="prose prose-slate max-w-none flex-1">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={markdownComponents}
            >
              {post.content}
            </ReactMarkdown>

            <div className="mt-12 pt-8 border-t border-border">
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-muted">
                  Share this article
                </span>
                <div className="flex items-center gap-3">
                  <ShareButton
                    url={`https://godsgrace-edem.vercel.app/blog/${post.slug}`}
                  />
                </div>
              </div>
            </div>
          </article>

          {toc.length > 0 && (
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-24">
                <h4 className="text-sm font-semibold text-primary mb-4">
                  Table of Contents
                </h4>
                <nav className="space-y-2">
                  {toc.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={cn(
                        'block text-sm text-text-muted hover:text-accent transition-colors',
                        item.level === 3 && 'pl-4'
                      )}
                    >
                      {item.text}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>
          )}
        </div>

        {related.length > 0 && (
          <div className="mt-20 pt-12 border-t border-border">
            <h2 className="text-2xl font-bold text-primary mb-8">
              Related Articles
            </h2>
            <div className="grid gap-6 sm:grid-cols-3">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group block rounded-xl border border-border bg-bg p-5 transition-shadow hover:shadow-md"
                >
                  <span className="text-xs font-semibold text-accent">
                    {p.category}
                  </span>
                  <h3 className="mt-2 font-bold text-primary group-hover:text-accent transition-colors line-clamp-2">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm text-text-muted line-clamp-2">
                    {p.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
