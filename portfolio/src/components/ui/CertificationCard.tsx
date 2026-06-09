import { Award, Calendar } from 'lucide-react';
import { formatYear } from '@/lib/utils';
import type { Certification } from '@/types';

interface CertificationCardProps {
  certification: Certification;
}

export default function CertificationCard({ certification }: CertificationCardProps) {
  return (
    <div className="group rounded-xl border border-border bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
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
    </div>
  );
}
