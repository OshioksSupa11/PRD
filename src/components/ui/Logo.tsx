interface LogoProps {
  className?: string;
}

export default function Logo({ className }: LogoProps) {
  return (
    <svg
      viewBox="0 0 88 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="GE Logo"
    >
      {/* Compass/divider icon — engineering motif */}
      <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {/* Left leg */}
        <line x1="12" y1="32" x2="5" y2="4" />
        {/* Right leg */}
        <line x1="12" y1="32" x2="19" y2="4" />
        {/* Hinge circle */}
        <circle cx="12" cy="32" r="2.5" fill="currentColor" />
        {/* Top accent arcs */}
        <path d="M5 4 A10 8 0 0 1 19 4" fill="none" />
      </g>

      {/* Divider line */}
      <line x1="24" y1="30" x2="24" y2="6" stroke="currentColor" strokeWidth="1" opacity="0.3" />

      {/* G letterform — bold geometric */}
      <text
        x="40"
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
        x="63"
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

      {/* Engineering accent — thin rule beneath */}
      <rect x="28" y="30" width="48" height="2.5" rx="1.25" fill="currentColor" />
    </svg>
  );
}
