'use client';

import { useEffect, useState } from 'react';
import SectionHeading from '@/components/ui/SectionHeading';
import TimelineItem from '@/components/ui/TimelineItem';
import FadeInSection from '@/components/shared/FadeInSection';
import { experiences as fallbackExps } from '@/data/experience';

export default function Experience() {
  const [experiences, setExperiences] = useState(fallbackExps);
  useEffect(() => {
    fetch('/api/admin/experience')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setExperiences(data.map(e => ({
            ...e,
            startDate: e.start_date || '',
            endDate: e.end_date || null
          })));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section id="experience" className="py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <SectionHeading
            overline="Career"
            title="Professional Experience"
            subtitle="6+ years of hands-on experience in fire protection systems inspection, testing, and maintenance."
          />
        </FadeInSection>

        <div className="mt-16">
          {experiences.map((exp, i) => (
            <TimelineItem key={exp.id} experience={exp} index={i} total={experiences.length} />
          ))}
        </div>
      </div>
    </section>
  );
}
