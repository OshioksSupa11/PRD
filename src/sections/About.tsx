'use client';

import { useEffect, useState } from 'react';
import SectionHeading from '@/components/ui/SectionHeading';
import FadeInSection from '@/components/shared/FadeInSection';
import { Shield, Target, Lightbulb, Users } from 'lucide-react';
import { profile as fallbackProfile } from '@/data/profile';

const values = [
  {
    icon: Shield,
    title: 'Safety First',
    description:
      'Every decision prioritizes the protection of lives and assets above all else.',
  },
  {
    icon: Target,
    title: 'Technical Excellence',
    description:
      'Continuous learning and rigorous standards ensure the highest quality outcomes.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description:
      'Leveraging modern tools and methods to solve complex fire protection challenges.',
  },
  {
    icon: Users,
    title: 'Integrity',
    description:
      'Honest communication and ethical practice form the foundation of every engagement.',
  },
];

export default function About() {
  const [profile, setProfile] = useState(fallbackProfile);
  useEffect(() => {
    fetch('/api/admin/profile')
      .then(r => r.json())
      .then(data => {
        if (data && data.name) {
          setProfile(data);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <SectionHeading
            overline="About"
            title="Professional Background"
            subtitle="A career built on technical expertise, dedication to safety, and a passion for engineering excellence."
          />
        </FadeInSection>

        <div className="mt-16 grid gap-12 lg:grid-cols-5 lg:gap-16">
          {/* Bio */}
          <FadeInSection className="lg:col-span-3" delay={0.1}>
            <div className="prose prose-slate max-w-none">
              <p className="text-lg leading-relaxed text-text-muted whitespace-pre-line">
                {profile.bio}
              </p>
            </div>
          </FadeInSection>

          {/* Values */}
          <FadeInSection className="lg:col-span-2" delay={0.2}>
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
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}
