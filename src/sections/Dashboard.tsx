'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Briefcase,
  Award,
  FolderCheck,
  Code,
  BookOpen,
  FileText,
} from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import { cn } from '@/lib/utils';

interface DashboardMetric {
  label: string;
  target: number;
  suffix: string;
  icon: React.ElementType;
}

const metrics: DashboardMetric[] = [
  { label: 'Years of Experience', target: 6, suffix: '+', icon: Briefcase },
  { label: 'Certifications', target: 8, suffix: '', icon: Award },
  { label: 'Projects Completed', target: 45, suffix: '+', icon: FolderCheck },
  { label: 'Technical Skills', target: 32, suffix: '', icon: Code },
  { label: 'Courses Completed', target: 10, suffix: '+', icon: BookOpen },
  { label: 'Articles Published', target: 0, suffix: '', icon: FileText },
];

function AnimatedNumber({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px 0px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1500;
    const steps = 30;
    const increment = target / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(interval);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function Dashboard() {
  return (
    <section id="dashboard" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          overline="Dashboard"
          title="Professional Growth at a Glance"
          subtitle="Real-time metrics reflecting continuous learning and career development."
        />

        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 lg:gap-6">
          {metrics.map((metric) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px 0px' }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center rounded-xl border border-border bg-bg p-6 text-center transition-shadow duration-200 hover:shadow-md"
            >
              <div className={cn(
                'flex h-12 w-12 items-center justify-center rounded-lg',
                'bg-accent/10'
              )}>
                <metric.icon className="h-6 w-6 text-accent" />
              </div>
              <span className="mt-4 text-3xl font-bold tracking-tight text-primary">
                <AnimatedNumber target={metric.target} suffix={metric.suffix} />
              </span>
              <span className="mt-2 text-xs font-medium text-text-muted leading-tight">
                {metric.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
