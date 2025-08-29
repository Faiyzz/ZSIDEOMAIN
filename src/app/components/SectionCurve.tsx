// Tailwind + Next.js
export default function SectionCurve({
  position = "bottom", // "top" | "bottom"
  from = "#041E24", // dark/upper section color
  to = "#FFFFFF", // light/lower section color
  height = 140, // curve height in px
}: {
  position?: "top" | "bottom";
  from?: string;
  to?: string;
  height?: number;
}) {
  // Flip the curve when used at the top of a section
  const flip = position === "top" ? "rotate-180" : "";
  return (
    <div className={`relative h-[${height}px] pointer-events-none`}>
      {/* upper color (behind the curve) */}
      <div
        className="absolute inset-0"
        style={{ background: from }}
        aria-hidden
      />
      {/* curve to lower color */}
      <svg
        className={`absolute inset-x-0 ${flip}`}
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        width="100%"
        height={height}
        aria-hidden
      >
        {/* soft top shading like your screenshot */}
        <defs>
          <linearGradient id="curveShade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(0,0,0,0.25)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </linearGradient>
        </defs>

        {/* dark cap above the curve */}
        <rect width="1440" height="200" fill={from} />

        {/* white/lower section via path */}
        <path d="M0,120 Q720,0 1440,120 L1440,200 L0,200 Z" fill={to} />

        {/* subtle inner highlight on the crest */}
        <path
          d="M0,122 Q720,2 1440,122"
          fill="none"
          stroke="url(#curveShade)"
          strokeWidth="6"
        />
      </svg>
    </div>
  );
}
