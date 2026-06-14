'use client';

import { Share2 } from 'lucide-react';

interface ShareButtonProps {
  url: string;
}

export default function ShareButton({ url }: ShareButtonProps) {
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(url);
      }}
      className="flex items-center gap-1 text-sm text-text-muted hover:text-accent transition-colors"
    >
      <Share2 className="h-4 w-4" />
      Copy Link
    </button>
  );
}
