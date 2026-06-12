'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

interface FadeInSectionProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
  duration?: number;
  once?: boolean;
}

const directionMap = {
  up: { y: 40 },
  down: { y: -40 },
  left: { x: 40 },
  right: { x: -40 },
  none: { x: 0, y: 0 },
};

export default function FadeInSection({
  children,
  className,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  once = true,
}: FadeInSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: '-80px 0px' });

  return (
    <motion.div
      ref={ref}
      initial={{ ...directionMap[direction], opacity: 0 }}
      animate={
        isInView
          ? { x: 0, y: 0, opacity: 1 }
          : { ...directionMap[direction], opacity: 0 }
      }
      transition={{ duration, delay, ease: 'easeOut' }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
