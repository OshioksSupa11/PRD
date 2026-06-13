'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import useActiveSection from '@/hooks/useActiveSection';
import Logo from '@/components/ui/Logo';
import type { NavLink } from '@/types';

const links: NavLink[] = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const activeSection = useActiveSection();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu on section change without extra render
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
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/90 backdrop-blur-lg border-b border-border shadow-sm'
          : 'bg-transparent'
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <button
          onClick={() => scrollTo('#hero')}
          className={cn(
            'transition-colors',
            isScrolled
              ? 'text-primary hover:text-accent'
              : 'text-white hover:text-white/80'
          )}
          aria-label="Go to top"
        >
          <Logo className="h-10 w-auto" />
        </button>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => scrollTo(link.href)}
                className={cn(
                  'relative px-3 py-2 text-sm font-medium rounded-md transition-colors',
                  activeSection === link.href.replace('#', '')
                    ? 'text-accent'
                    : isScrolled
                      ? 'text-text-muted hover:text-text'
                      : 'text-white/80 hover:text-white'
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

        {/* Mobile Toggle */}
        <button
          className={cn(
            'inline-flex md:hidden items-center justify-center rounded-lg p-2 transition-colors',
            isScrolled
              ? 'text-text-muted hover:text-text hover:bg-bg-alt'
              : 'text-white/80 hover:text-white hover:bg-white/10'
          )}
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileOpen}
        >
          {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="md:hidden border-t border-border bg-white">
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
          </ul>
        </div>
      )}
    </header>
  );
}
