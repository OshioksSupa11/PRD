interface LogoProps {
  className?: string;
}

export default function Logo({ className }: LogoProps) {
  return (
    <svg
      viewBox="0 0 96 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="GE Logo"
    >
      {/* Shield outline */}
      <path
        d="M18 2L5 7V17C5 24.5 11.5 31 18 34C24.5 31 31 24.5 31 17V7L18 2Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />

      {/* Flame — outer */}
      <path
        d="M18 9C13 14 11 18 11 21C11 24.5 14 28 18 28C22 28 25 24.5 25 21C25 18 23 14 18 9Z"
        fill="currentColor"
        opacity="0.35"
      />

      {/* Flame — inner core */}
      <path
        d="M18 13C15 16.5 14 19 14 21C14 23.5 16 26 18 26C20 26 22 23.5 22 21C22 19 21 16.5 18 13Z"
        fill="currentColor"
        opacity="0.7"
      />

      {/* Divider */}
      <line x1="37" y1="30" x2="37" y2="6" stroke="currentColor" strokeWidth="1" opacity="0.25" />

      {/* G letterform */}
      <text
        x="54"
        y="26"
        textAnchor="middle"
        fill="currentColor"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="28"
        fontWeight="800"
        letterSpacing="-1"
      >
        G
      </text>

      {/* E letterform */}
      <text
        x="78"
        y="26"
        textAnchor="middle"
        fill="currentColor"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="28"
        fontWeight="800"
        letterSpacing="-1"
      >
        E
      </text>

      {/* Accent bar */}
      <rect x="40" y="30" width="51" height="2.5" rx="1.25" fill="currentColor" />
    </svg>
  );
}
