import { Mail, ArrowUpRight, Globe, GitBranch } from 'lucide-react';
import { profile } from '@/data/profile';
import Logo from '@/components/ui/Logo';
import type { NavLink } from '@/types';

const footerLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Certifications', href: '/certifications' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

const socialLinks = [
  {
    label: 'LinkedIn',
    href: profile.linkedinUrl,
    icon: Globe,
  },
  {
    label: 'GitHub',
    href: profile.githubUrl,
    icon: GitBranch,
  },
  {
    label: 'Email',
    href: `mailto:${profile.email}`,
    icon: Mail,
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-primary text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {/* Brand */}
          <div>
            <Logo className="h-10 w-auto text-white" />
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-400">
              Fire Protection Engineer dedicated to creating safer environments through expert engineering and innovative solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-300 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
              Connect
            </h3>
            <div className="mt-4 flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 text-slate-400 transition-colors hover:border-accent hover:text-accent"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
            <div className="mt-6 space-y-1">
              <a
                href={`mailto:${profile.email}`}
                className="block text-sm text-slate-400 transition-colors hover:text-white"
              >
                {profile.email}
              </a>
              <a
                href={`tel:${profile.phone}`}
                className="block text-sm text-slate-400 transition-colors hover:text-white"
              >
                {profile.phone}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-slate-800 pt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-slate-500">
            &copy; {currentYear} Godsgrace Edem. All rights reserved.
          </p>
          <a
            href="#hero"
            className="text-sm text-slate-500 transition-colors hover:text-white inline-flex items-center gap-1"
          >
            Back to top
            <ArrowUpRight className="h-3 w-3" />
          </a>
        </div>
      </div>
    </footer>
  );
}
