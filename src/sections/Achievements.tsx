import { Award, Briefcase, Shield, Code } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import FadeInSection from '@/components/shared/FadeInSection';
import { formatDate } from '@/lib/utils';

const iconMap: Record<string, React.ElementType> = {
  Award,
  Briefcase,
  Shield,
  Code,
};

interface AchievementsData {
  title: string;
  description: string;
  achievementDate: string;
  icon: string;
}

const achievements: AchievementsData[] = [
  {
    title: 'NFPA Certified Fire Protection Specialist',
    description: 'Earned NFPA certification demonstrating comprehensive knowledge of fire protection systems, codes, and standards.',
    achievementDate: '2023-09-15',
    icon: 'Award',
  },
  {
    title: '45+ Major Engineering Projects Completed',
    description: 'Successfully delivered fire protection and life safety projects across commercial, industrial, healthcare, and residential sectors.',
    achievementDate: '2025-06-01',
    icon: 'Briefcase',
  },
  {
    title: 'Fire Safety Compliance Program Lead',
    description: 'Designed and implemented a comprehensive fire safety compliance program adopted across 6 industrial facilities.',
    achievementDate: '2024-03-10',
    icon: 'Shield',
  },
  {
    title: 'Software Development Milestone',
    description: 'Transitioned into technology building, learning full-stack development with Next.js, TypeScript, and modern tooling.',
    achievementDate: '2026-01-01',
    icon: 'Code',
  },
];

export default function Achievements() {
  return (
    <section id="achievements" className="py-24 sm:py-32 bg-bg-alt">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <SectionHeading
            overline="Milestones"
            title="Key Achievements"
            subtitle="Professional accomplishments that define my career journey and growth."
          />
        </FadeInSection>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {achievements.map((achievement, i) => {
            const Icon = iconMap[achievement.icon] || Award;
            return (
              <FadeInSection key={achievement.title} delay={i * 0.1}>
                <div className="rounded-xl border border-border bg-bg p-6 transition-shadow duration-200 hover:shadow-md h-full">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 mb-4">
                    <Icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-bold text-primary">{achievement.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">
                    {achievement.description}
                  </p>
                  <span className="mt-4 inline-block text-xs font-medium text-text-muted">
                    {formatDate(achievement.achievementDate)}
                  </span>
                </div>
              </FadeInSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
