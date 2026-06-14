'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Star, Lightbulb, Award, Calendar, ChevronDown } from 'lucide-react';
import { formatDate, cn } from '@/lib/utils';
import type { Experience } from '@/types';
import FadeInSection from '@/components/shared/FadeInSection';

interface TimelineItemProps {
  experience: Experience;
  index: number;
  total: number;
}

const typeConfig = {
  role: { icon: Briefcase, dotColor: 'bg-accent' },
  certification: { icon: Award, dotColor: 'bg-yellow-500' },
  milestone: { icon: Star, dotColor: 'bg-yellow-500' },
  future: { icon: Lightbulb, dotColor: 'bg-accent-light' },
};

export default function TimelineItem({ experience, index, total }: TimelineItemProps) {
  const [expanded, setExpanded] = useState(false);
  const isCurrent = experience.endDate === null;
  const isFuture = experience.type === 'future';
  const dateDisplay = isCurrent
    ? `${formatDate(experience.startDate)} — Present`
    : `${formatDate(experience.startDate)} — ${formatDate(experience.endDate!)}`;

  const config = typeConfig[experience.type || 'role'];

  return (
    <FadeInSection delay={index * 0.1}>
      <div className="relative pl-12 pb-10 last:pb-0">
        {index < total - 1 && (
          <div className="absolute left-[19px] top-10 bottom-0 w-px bg-border" />
        )}

        <div
          className={cn(
            'absolute left-0 top-1.5 flex h-10 w-10 items-center justify-center rounded-full border-2',
            config.dotColor === 'bg-accent' && isCurrent
              ? 'border-accent bg-accent text-white'
              : config.dotColor === 'bg-yellow-500'
                ? 'border-yellow-500 bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400'
                : config.dotColor === 'bg-accent-light'
                  ? 'border-accent-light bg-accent/10 text-accent'
                  : 'border-border bg-bg text-text-muted'
          )}
        >
          <config.icon className="h-4 w-4" />
        </div>

        <motion.div
          whileHover={{ scale: 1.01 }}
          className={cn(
            'rounded-xl border border-border bg-bg p-5 transition-shadow duration-200',
            'hover:shadow-md cursor-pointer',
            isFuture && 'border-dashed border-accent/40 bg-accent/5'
          )}
          onClick={() => setExpanded(!expanded)}
        >
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-primary">
                {experience.position}
              </h3>
              {isFuture && (
                <span className="inline-flex items-center rounded-full bg-accent/10 px-3 py-0.5 text-xs font-semibold text-accent">
                  Future Goal
                </span>
              )}
              {isCurrent && !isFuture && (
                <span className="inline-flex w-fit items-center rounded-full bg-accent/10 px-3 py-0.5 text-xs font-semibold text-accent">
                  Current
                </span>
              )}
              {experience.type === 'milestone' && (
                <span className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-0.5 text-xs font-semibold text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
                  Milestone
                </span>
              )}
            </div>
            <ChevronDown
              className={cn(
                'h-4 w-4 text-text-muted transition-transform duration-200',
                expanded && 'rotate-180'
              )}
            />
          </div>

          <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-text-muted">
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {dateDisplay}
            </span>
            <span>{experience.company}</span>
          </div>

          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
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
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </FadeInSection>
  );
}
