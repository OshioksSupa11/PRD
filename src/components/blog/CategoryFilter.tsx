'use client';

import { cn } from '@/lib/utils';
import { blogCategories } from '@/lib/blog-data';
import type { BlogCategory } from '@/types';

interface CategoryFilterProps {
  active: BlogCategory | 'All';
  onSelect: (category: BlogCategory | 'All') => void;
}

export default function CategoryFilter({ active, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelect('All')}
        className={cn(
          'rounded-full px-4 py-2 text-sm font-medium transition-colors',
          active === 'All'
            ? 'bg-accent text-white'
            : 'bg-bg-alt text-text-muted hover:text-text'
        )}
      >
        All
      </button>
      {blogCategories.map((cat) => (
        <button
          key={cat.value}
          onClick={() => onSelect(cat.value)}
          className={cn(
            'rounded-full px-4 py-2 text-sm font-medium transition-colors',
            active === cat.value
              ? 'bg-accent text-white'
              : 'bg-bg-alt text-text-muted hover:text-text'
          )}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
