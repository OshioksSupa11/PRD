import { cn } from '@/lib/utils';
import type { Skill } from '@/types';

interface SkillBadgeProps {
  skill: Skill;
  className?: string;
}

export default function SkillBadge({ skill, className }: SkillBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-text transition-colors duration-200 hover:border-accent/30 hover:bg-accent/5',
        className
      )}
    >
      {skill.name}
    </span>
  );
}
