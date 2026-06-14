import { Award, Calendar, ExternalLink } from 'lucide-react';
import { formatYear } from '@/lib/utils';
import type { Certification } from '@/types';

interface CertificationCardProps {
  certification: Certification;
}

export default function CertificationCard({ certification }: CertificationCardProps) {
  return (
    <div className="group rounded-xl border border-border bg-bg p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
        <Award className="h-6 w-6 text-accent" />
      </div>

      <h3 className="mt-4 font-bold text-primary group-hover:text-accent transition-colors">
        {certification.title}
      </h3>

      <p className="mt-1 text-sm text-text-muted">{certification.issuer}</p>

      <div className="mt-3 flex items-center gap-1.5 text-xs text-text-muted">
        <Calendar className="h-3.5 w-3.5" />
        <span>{formatYear(certification.issueDate)}</span>
      </div>

      {certification.skillTags && certification.skillTags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {certification.skillTags.map((tag) => (
            <span
              key={tag}
              className="inline-flex rounded-full bg-accent/5 px-2 py-0.5 text-xs font-medium text-accent"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {certification.verificationUrl && certification.verificationUrl !== '#' && (
        <a
          href={certification.verificationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-text-muted hover:text-accent transition-colors"
        >
          Verify Credential
          <ExternalLink className="h-3 w-3" />
        </a>
      )}
    </div>
  );
}
