import StatCard from '@/components/ui/StatCard';
import FadeInSection from '@/components/shared/FadeInSection';
import { stats } from '@/data/profile';

export default function Highlights() {
  return (
    <section id="highlights" className="relative -mt-16 z-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-6">
            {stats.map((stat) => (
              <StatCard
                key={stat.label}
                label={stat.label}
                value={stat.value}
                icon={stat.icon}
              />
            ))}
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}
