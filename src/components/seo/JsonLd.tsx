export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function PersonSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Godsgrace Edem',
    jobTitle: 'Fire Protection Engineer & Emerging Technology Builder',
    url: 'https://godsgrace-edem.vercel.app',
    email: 'edem.godsgrace.o@gmail.com',
    telephone: '+2348137229089',
    sameAs: [
      'https://linkedin.com/in/godsgrace-edem',
      'https://github.com/godsgrace-edem',
    ],
    knowsAbout: [
      'Fire Protection Engineering',
      'Fire Safety',
      'NFPA Standards',
      'Sprinkler Systems',
      'Fire Alarm Systems',
      'Software Development',
      'Next.js',
      'TypeScript',
    ],
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'Certified Fire Protection Specialist (CFPS)',
        recognizedBy: { '@type': 'Organization', name: 'NFPA' },
      },
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'Professional Engineer (PE) — Fire Protection',
        recognizedBy: { '@type': 'Organization', name: 'COREN' },
      },
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'Project Management Professional (PMP)',
        recognizedBy: { '@type': 'Organization', name: 'PMI' },
      },
    ],
  };

  return <JsonLd data={schema} />;
}

export function ArticleSchema({
  title,
  description,
  publishedAt,
  slug,
  tags,
}: {
  title: string;
  description: string;
  publishedAt: string | null;
  slug: string;
  tags: string[];
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    author: {
      '@type': 'Person',
      name: 'Godsgrace Edem',
    },
    datePublished: publishedAt,
    url: `https://godsgrace-edem.vercel.app/blog/${slug}`,
    keywords: tags.join(', '),
  };

  return <JsonLd data={schema} />;
}
