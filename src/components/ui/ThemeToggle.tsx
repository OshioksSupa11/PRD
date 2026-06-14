'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { useEffect, useState, useCallback } from 'react';
import { trackEvent, AnalyticsEvents } from '@/lib/analytics';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hydration mismatch avoidance pattern
    setMounted(true);
  }, []);

  const toggle = useCallback(() => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    trackEvent(AnalyticsEvents.THEME_TOGGLE, { theme: next });
  }, [theme, setTheme]);

  if (!mounted) {
    return (
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg" aria-hidden="true" />
    );
  }

  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggle}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:bg-bg-alt text-text-muted hover:text-text"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}
