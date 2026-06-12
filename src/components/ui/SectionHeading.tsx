import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  overline?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export default function SectionHeading({
  overline,
  title,
  subtitle,
  align = 'center',
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'max-w-2xl',
        align === 'center' ? 'mx-auto text-center' : 'text-left',
        className
      )}
    >
      {overline && (
        <span className="text-sm font-semibold uppercase tracking-widest text-accent">
          {overline}
        </span>
      )}
      <h2
        className={cn(
          'text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl',
          overline && 'mt-2'
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg leading-relaxed text-text-muted">
          {subtitle}
        </p>
      )}
    </div>
  );
}
