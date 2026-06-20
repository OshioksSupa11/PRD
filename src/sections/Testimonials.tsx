'use client';

import { useEffect, useState } from 'react';
import { Quote } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import FadeInSection from '@/components/shared/FadeInSection';

interface TestimonialData {
  name: string;
  role: string;
  company: string;
  content: string;
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<TestimonialData[]>([
    {
      name: 'James Adewale',
      role: 'Lead Engineer',
      company: 'SafetyFirst Nigeria Ltd',
      content:
        'Godsgrace is an exceptional fire protection engineer. His meticulous approach to safety systems design and NFPA compliance saved our project months of rework. I would recommend him without reservation for any fire protection project.',
    },
    {
      name: 'Dr. Amara Okafor',
      role: 'Head of Engineering',
      company: 'Nigerian National Petroleum Corporation',
      content:
        'I had the privilege of working with Godsgrace on a large-scale fire and gas detection system. His technical depth, especially in hazardous area classification and suppression system design, was outstanding. A true professional who delivers results.',
    },
    {
      name: 'Michael Chen',
      role: 'Construction Project Manager',
      company: 'Urban Development Group',
      content:
        'What sets Godsgrace apart is his ability to bridge the gap between engineering design and practical field implementation. On our hospital retrofit, he kept the fire protection scope on track despite challenging operational constraints.',
    },
  ]);

  useEffect(() => {
    fetch('/api/admin/testimonials')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setTestimonials(data);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section id="testimonials" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <SectionHeading
            overline="Testimonials"
            title="What Colleagues Say"
            subtitle="Trusted by engineering leaders, project managers, and industry professionals."
          />
        </FadeInSection>

        <div className="mt-16 grid gap-8 sm:grid-cols-3">
          {testimonials.map((t, i) => (
            <FadeInSection key={t.name} delay={i * 0.15}>
              <div className="relative rounded-xl border border-border bg-bg p-6 transition-shadow duration-200 hover:shadow-md h-full flex flex-col">
                <Quote className="h-8 w-8 text-accent/20 absolute top-4 left-4" />

                <blockquote className="mt-6 text-sm leading-relaxed text-text-muted italic flex-1">
                  &ldquo;{t.content}&rdquo;
                </blockquote>

                <div className="mt-6 pt-4 border-t border-border flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-sm font-bold text-accent">
                    {t.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-primary">
                      {t.name}
                    </div>
                    <div className="text-xs text-text-muted">
                      {t.role}, {t.company}
                    </div>
                  </div>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}
