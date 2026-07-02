'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, Download, ChevronDown, FileText, FileCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import useActiveSection from '@/hooks/useActiveSection';
import Logo from '@/components/ui/Logo';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { profile } from '@/data/profile';
import { trackEvent, AnalyticsEvents } from '@/lib/analytics';
import type { NavLink } from '@/types';

const links: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Certifications', href: '/certifications' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  if (pathname?.startsWith('/admin')) return null;
  const [resumeOpen, setResumeOpen] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);
  const activeSection = useActiveSection();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onOutsideClick = (e: MouseEvent) => {
      if (resumeRef.current && !resumeRef.current.contains(e.target as Node)) {
        setResumeOpen(false);
      }
    };
    if (resumeOpen) {
      document.addEventListener('click', onOutsideClick);
    }
    return () => document.removeEventListener('click', onOutsideClick);
  }, [resumeOpen]);

  useEffect(() => {
    const timeout = setTimeout(() => setIsMobileOpen(false), 0);
    return () => clearTimeout(timeout);
  }, [activeSection]);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  const scrollTo = (href: string) => {
    if (href.startsWith('/')) {
      window.location.href = href;
      return;
    }
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownload = (url: string, format: 'designed' | 'ats' | 'docx') => {
    trackEvent(AnalyticsEvents.RESUME_DOWNLOAD, { format });
    window.open(url, '_blank');
    setResumeOpen(false);
  };

  const buttonBase = cn(
    'px-3 py-2 text-sm font-medium rounded-md transition-colors',
    isScrolled ? 'text-text-muted hover:text-text' : 'text-white/80 hover:text-white'
  );

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-bg/90 backdrop-blur-lg border-b border-border shadow-sm'
          : 'bg-transparent'
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <button
          onClick={() => scrollTo('#hero')}
          className={cn(
            'transition-colors',
            isScrolled ? 'text-primary hover:text-accent' : 'text-white hover:text-white/80'
          )}
          aria-label="Go to top"
        >
          <Logo className="h-10 w-auto" />
        </button>

        <ul className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => scrollTo(link.href)}
                className={cn(
                  'relative px-3 py-2 text-sm font-medium rounded-md transition-colors',
                  activeSection === link.href.replace('#', '')
                    ? 'text-accent'
                    : buttonBase
                )}
              >
                {link.label}
                {activeSection === link.href.replace('#', '') && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-5 rounded-full bg-accent" />
                )}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2" ref={resumeRef}>
            <div className="relative">
              <button
                onClick={() => setResumeOpen(!resumeOpen)}
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium transition-all',
                  isScrolled
                    ? 'border-border text-text hover:border-accent hover:text-accent'
                    : 'border-white/30 text-white hover:border-white/60 hover:text-white'
                )}
              >
                <Download className="h-4 w-4" />
                Resume
                <ChevronDown className={cn('h-3 w-3 transition-transform', resumeOpen && 'rotate-180')} />
              </button>
              {resumeOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl border border-border bg-bg shadow-xl py-1 z-50">
                  <button
                    onClick={() => handleDownload(profile.resumeUrlDesigned || profile.resumeUrl, 'designed')}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-text hover:bg-bg-alt transition-colors"
                  >
                    <FileCheck className="h-4 w-4 text-accent" />
                    Designed PDF
                  </button>
                  <button
                    onClick={() => handleDownload(profile.resumeUrlAts || profile.resumeUrl, 'ats')}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-text hover:bg-bg-alt transition-colors"
                  >
                    <FileText className="h-4 w-4 text-text-muted" />
                    ATS-Friendly
                  </button>
                  {profile.resumeUrlDocx && (
                    <button
                       onClick={() => handleDownload(profile.resumeUrlDocx!, 'docx')}
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-text hover:bg-bg-alt transition-colors"
                    >
                      <FileText className="h-4 w-4 text-text-muted" />
                      DOCX Format
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
          <ThemeToggle />
          <button
            className={cn(
              'inline-flex md:hidden items-center justify-center rounded-lg p-2 transition-colors',
              isScrolled
                ? 'text-text-muted hover:text-text hover:bg-bg-alt'
                : 'text-white/80 hover:text-white hover:bg-bg/10'
            )}
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileOpen}
          >
            {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {isMobileOpen && (
        <div className="md:hidden border-t border-border bg-bg">
          <ul className="flex flex-col px-4 py-4 space-y-1">
            {links.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => scrollTo(link.href)}
                  className={cn(
                    'w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors',
                    activeSection === link.href.replace('#', '')
                      ? 'bg-accent/10 text-accent'
                      : 'text-text-muted hover:bg-bg-alt hover:text-text'
                  )}
                >
                  {link.label}
                </button>
              </li>
            ))}
            <li className="border-t border-border pt-2 mt-1">
              <a
                href={profile.resumeUrlDesigned || profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 w-full text-left px-4 py-3 rounded-lg text-base font-medium text-text-muted hover:bg-bg-alt hover:text-text transition-colors"
              >
                <Download className="h-5 w-5" />
                Download Resume (Designed)
              </a>
            </li>
            <li>
              <a
                href={profile.resumeUrlAts || profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 w-full text-left px-4 py-3 rounded-lg text-base font-medium text-text-muted hover:bg-bg-alt hover:text-text transition-colors"
              >
                <FileText className="h-5 w-5" />
                Download Resume (ATS)
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
