import { Briefcase, MapPin } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import type { Experience } from '@/types';
import FadeInSection from '@/components/shared/FadeInSection';

interface TimelineItemProps {
  experience: Experience;
  index: number;
  total: number;
}

export default function TimelineItem({ experience, index, total }: TimelineItemProps) {
  const isCurrent = experience.endDate === null;
  const dateDisplay = isCurrent
    ? `${formatDate(experience.startDate)} — Present`
    : `${formatDate(experience.startDate)} — ${formatDate(experience.endDate!)}`;

  return (
    <FadeInSection delay={index * 0.15}>
      <div className="relative pl-12 pb-12 last:pb-0">
        {/* Timeline line */}
        {index < total - 1 && (
          <div className="absolute left-[19px] top-10 bottom-0 w-px bg-border" />
        )}

        {/* Timeline dot */}
        <div
          className={`absolute left-0 top-1.5 flex h-10 w-10 items-center justify-center rounded-full border-2 ${
            isCurrent
              ? 'border-accent bg-accent text-white'
              : 'border-border bg-white text-text-muted'
          }`}
        >
          <Briefcase className="h-4 w-4" />
        </div>

        <div className="rounded-xl border border-border bg-white p-6 transition-shadow duration-200 hover:shadow-md">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-lg font-bold text-primary">
              {experience.position}
            </h3>
            {isCurrent && (
              <span className="inline-flex w-fit items-center rounded-full bg-accent/10 px-3 py-0.5 text-xs font-semibold text-accent">
                Current
              </span>
            )}
          </div>

          <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-text-muted">
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {experience.company}
            </span>
            <span>{dateDisplay}</span>
          </div>

          {experience.responsibilities.length > 0 && (
            <ul className="mt-4 space-y-1.5">
              {experience.responsibilities.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-text-muted">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60" />
                  {item}
                </li>
              ))}
            </ul>
          )}

          {experience.achievements.length > 0 && (
            <div className="mt-4 border-t border-border pt-4">
              <h4 className="mb-2 text-sm font-semibold text-primary">
                Key Achievements
              </h4>
              <ul className="space-y-1.5">
                {experience.achievements.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-text-muted">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </FadeInSection>
  );
}
