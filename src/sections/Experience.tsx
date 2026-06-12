import SectionHeading from '@/components/ui/SectionHeading';
import TimelineItem from '@/components/ui/TimelineItem';
import FadeInSection from '@/components/shared/FadeInSection';
import { experiences } from '@/data/experience';

export default function Experience() {
  return (
    <section id="experience" className="py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <SectionHeading
            overline="Career"
            title="Professional Experience"
            subtitle="Over a decade of progressive responsibility in fire protection and mechanical engineering."
          />
        </FadeInSection>

        <div className="mt-16">
          {experiences.map((exp, i) => (
            <TimelineItem key={exp.id} experience={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
