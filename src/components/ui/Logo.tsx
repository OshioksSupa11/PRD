interface LogoProps {
  className?: string;
}

export default function Logo({ className }: LogoProps) {
  return (
    <svg
      viewBox="0 0 72 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="GE Logo"
    >
      <rect
        x="2"
        y="2"
        width="32"
        height="32"
        rx="6"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      <text
        x="18"
        y="26"
        textAnchor="middle"
        fill="currentColor"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="20"
        fontWeight="700"
        letterSpacing="-0.5"
      >
        G
      </text>

      <rect
        x="38"
        y="2"
        width="32"
        height="32"
        rx="6"
        fill="currentColor"
      />
      <text
        x="54"
        y="26"
        textAnchor="middle"
        fill="white"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="20"
        fontWeight="700"
        letterSpacing="-0.5"
      >
        E
      </text>
    </svg>
  );
}
