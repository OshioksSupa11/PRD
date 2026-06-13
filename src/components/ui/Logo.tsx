interface LogoProps {
  className?: string;
}

export default function Logo({ className }: LogoProps) {
  return (
    <svg
      viewBox="0 0 64 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="GE Logo"
    >
      {/* G glyph */}
      <path
        d="M36 2H22C13.163 2 6 9.163 6 18V22C6 30.837 13.163 38 22 38H23C24.657 38 26 36.657 26 35V35C26 33.343 24.657 32 23 32H22C16.477 32 12 27.523 12 22V18C12 12.477 16.477 8 22 8H35C35.552 8 36 8.448 36 9V16H36"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* E glyph */}
      <path
        d="M58 2H44C41.791 2 40 3.791 40 6V34C40 36.209 41.791 38 44 38H58"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M42 20H57"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      {/* Accent dot */}
      <circle cx="34" cy="35" r="2.5" fill="currentColor" />
    </svg>
  );
}
