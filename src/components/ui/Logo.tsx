interface LogoProps {
  className?: string;
}

export default function Logo({ className }: LogoProps) {
  return (
    <svg
      viewBox="0 0 56 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="GE Logo"
    >
      {/* G — outer ring + horizontal bar */}
      <path
        d="M22 2H13C7.477 2 3 6.477 3 12V24C3 29.523 7.477 34 13 34H14"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 34H23C25.761 34 28 31.761 28 29V29C28 26.239 25.761 24 23 24H22"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M23 2H21C18.239 2 16 4.239 16 7V7C16 9.761 18.239 12 21 12H28"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* E — vertical bar + three horizontals */}
      <path
        d="M54 2H42C39.791 2 38 3.791 38 6V30C38 32.209 39.791 34 42 34H54"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M42 12H51"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M42 24H51"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
