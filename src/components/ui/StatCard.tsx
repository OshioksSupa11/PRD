import {
  Briefcase,
  Award,
  FolderCheck,
  Building2,
  LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Briefcase,
  Award,
  FolderCheck,
  Building2,
};

interface StatCardProps {
  label: string;
  value: string;
  icon: string;
}

export default function StatCard({ label, value, icon }: StatCardProps) {
  const Icon = iconMap[icon] || Award;

  return (
    <div className="flex flex-col items-center rounded-xl border border-border bg-bg p-8 text-center transition-shadow duration-200 hover:shadow-md">
      <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-accent/10">
        <Icon className="h-7 w-7 text-accent" />
      </div>
      <span className="mt-4 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
        {value}
      </span>
      <span className="mt-2 text-sm font-medium text-text-muted">
        {label}
      </span>
    </div>
  );
}
