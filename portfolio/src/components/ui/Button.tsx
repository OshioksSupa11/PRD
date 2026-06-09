import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-accent text-white hover:bg-accent-light active:bg-accent-dark shadow-sm',
  secondary:
    'bg-primary text-white hover:bg-primary-light shadow-sm',
  outline:
    'border-2 border-primary text-primary hover:bg-primary hover:text-white',
  ghost:
    'text-text hover:bg-bg-alt',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

type ButtonAsButton = ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    href?: undefined;
  };

type ButtonAsLink = ButtonBaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
    href: string;
  };

type ButtonAsNextLink = ButtonBaseProps & {
  href: string;
  external?: boolean;
  children: React.ReactNode;
  className?: string;
};

type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsNextLink;

export default function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    size = 'md',
    className,
    ...rest
  } = props;

  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2',
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  if ('href' in rest && rest.href) {
    const { external, children, ...linkRest } = rest as ButtonAsNextLink;
    if (external) {
      return (
        <a
          href={linkRest.href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={linkRest.href} className={classes}>
        {(rest as ButtonAsNextLink).children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonAsButton)}>
      {(rest as ButtonAsButton).children}
    </button>
  );
}
