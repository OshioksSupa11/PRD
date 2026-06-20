'use client';

import { useEffect, useState } from 'react';
import SectionHeading from '@/components/ui/SectionHeading';
import SkillBadge from '@/components/ui/SkillBadge';
import FadeInSection from '@/components/shared/FadeInSection';
import { skills as fallbackSkills, skillCategories } from '@/data/skills';

export default function Skills() {
  const [skills, setSkills] = useState(fallbackSkills);
  useEffect(() => {
    fetch('/api/admin/skills')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setSkills(data);
        }
      })
      .catch(() => {});
  }, []);
  const groupedSkills = skillCategories.map((cat) => ({
    ...cat,
    items: skills.filter((s) => s.category === cat.name),
  }));

  return (
    <section id="skills" className="py-24 sm:py-32 bg-bg-alt">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <SectionHeading
            overline="Skills"
            title="Technical & Professional Competencies"
            subtitle="Expertise spanning fire protection engineering, mechanical systems, and professional practice."
          />
        </FadeInSection>

        <div className="mt-16 grid gap-10 sm:grid-cols-2">
          {groupedSkills.map((group, gi) => (
            <FadeInSection key={group.name} delay={gi * 0.1}>
              <div className="rounded-xl border border-border bg-bg p-6 sm:p-8">
                <h3 className="text-lg font-bold text-primary">{group.name}</h3>
                <p className="mt-1 text-sm text-text-muted">
                  {group.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <SkillBadge key={skill.id} skill={skill} />
                  ))}
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}
