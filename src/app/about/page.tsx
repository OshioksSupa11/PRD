import Link from 'next/link';
import { ArrowLeft, Shield, Target, Lightbulb, Users } from 'lucide-react';
import { profile } from '@/data/profile';

const values = [
  {
    icon: Shield,
    title: 'Safety First',
    description: 'Every decision prioritizes the protection of lives and assets above all else.',
  },
  {
    icon: Target,
    title: 'Technical Excellence',
    description: 'Continuous learning and rigorous standards ensure the highest quality outcomes.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'Leveraging modern tools and methods to solve complex fire protection challenges.',
  },
  {
    icon: Users,
    title: 'Integrity',
    description: 'Honest communication and ethical practice form the foundation of every engagement.',
  },
];

export default function AboutPage() {
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
            About Godsgrace Edem
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/80">
            A career built on technical expertise, dedication to safety, and a passion
            for engineering excellence — now expanding into technology building.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-bold text-primary mb-6">
                Professional Background
              </h2>
              <div className="prose prose-slate max-w-none">
                <p className="text-lg leading-relaxed text-text-muted whitespace-pre-line">
                  {profile.bio}
                </p>
              </div>
            </div>

            <div className="lg:col-span-2">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-accent">
                Professional Values
              </h3>
              <div className="mt-6 space-y-6">
                {values.map((value) => (
                  <div key={value.title} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                      <value.icon className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary">{value.title}</h4>
                      <p className="mt-1 text-sm leading-relaxed text-text-muted">
                        {value.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
