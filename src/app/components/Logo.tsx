interface LogoProps {
  size?: "sm" | "md" | "lg";
  dark?: boolean;
}

export function Logo({ size = "md", dark = false }: LogoProps) {
  const dims = { sm: 32, md: 42, lg: 56 };
  const d = dims[size];
  const textColor = dark ? "#F8F5F0" : "#1A1A2E";
  const subColor = dark ? "#8A9BB0" : "#4A4A6A";

  return (
    <div className="flex items-center gap-3">
      {/* Mark */}
      <svg width={d} height={d} viewBox="0 0 56 56" fill="none">
        <defs>
          <linearGradient id="goldGrad" x1="0" y1="0" x2="56" y2="56" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#E8A020" />
            <stop offset="100%" stopColor="#C47B1A" />
          </linearGradient>
          <linearGradient id="darkGrad" x1="0" y1="0" x2="56" y2="56" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1A1A2E" />
            <stop offset="100%" stopColor="#0D0D1A" />
          </linearGradient>
          <clipPath id="hexClip">
            <path d="M28 2 L52 15.5 L52 40.5 L28 54 L4 40.5 L4 15.5 Z" />
          </clipPath>
        </defs>

        {/* Hexagon background */}
        <path
          d="M28 2 L52 15.5 L52 40.5 L28 54 L4 40.5 L4 15.5 Z"
          fill="url(#goldGrad)"
        />

        {/* Inner darker hex (trim) */}
        <path
          d="M28 7 L47 18 L47 38 L28 49 L9 38 L9 18 Z"
          fill="url(#darkGrad)"
          opacity="0.85"
        />

        {/* Building silhouette */}
        <g clipPath="url(#hexClip)">
          {/* Ground */}
          <rect x="12" y="42" width="32" height="2" fill="#E8A020" opacity="0.6" />
          {/* Main building body */}
          <rect x="18" y="24" width="20" height="18" fill="#E8A020" opacity="0.9" />
          {/* Tower top */}
          <rect x="22" y="16" width="12" height="10" fill="#E8A020" />
          {/* Pinnacle */}
          <polygon points="28,10 25,16 31,16" fill="#E8A020" />
          {/* Windows row 1 */}
          <rect x="21" y="27" width="4" height="4" fill="#1A1A2E" rx="0.5" />
          <rect x="31" y="27" width="4" height="4" fill="#1A1A2E" rx="0.5" />
          {/* Windows row 2 */}
          <rect x="21" y="34" width="4" height="4" fill="#1A1A2E" rx="0.5" />
          <rect x="31" y="34" width="4" height="4" fill="#1A1A2E" rx="0.5" />
          {/* Door */}
          <rect x="25" y="37" width="6" height="5" fill="#1A1A2E" rx="1" />
          {/* Small windows in tower */}
          <rect x="25" y="19" width="3" height="3" fill="#1A1A2E" rx="0.5" />
          <rect x="28" y="19" width="3" height="3" fill="#1A1A2E" rx="0.5" />
        </g>

        {/* Gold ring */}
        <path
          d="M28 2 L52 15.5 L52 40.5 L28 54 L4 40.5 L4 15.5 Z"
          fill="none"
          stroke="rgba(232,160,32,0.4)"
          strokeWidth="1"
        />
      </svg>

      {/* Text */}
      <div>
        <div
          style={{
            fontFamily: "Tajawal, sans-serif",
            fontWeight: 900,
            fontSize: size === "sm" ? "13px" : size === "md" ? "15px" : "20px",
            color: textColor,
            lineHeight: 1.2,
          }}
        >
          اتحاد البناء
        </div>
        <div
          style={{
            fontFamily: "Tajawal, sans-serif",
            fontWeight: 400,
            fontSize: size === "sm" ? "9px" : size === "md" ? "11px" : "13px",
            color: subColor,
            letterSpacing: "0.02em",
          }}
        >
          للمقاولات العامة
        </div>
      </div>
    </div>
  );
}

/** Compact icon-only logo mark */
export function LogoMark({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
      <defs>
        <linearGradient id="goldGrad2" x1="0" y1="0" x2="56" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E8A020" />
          <stop offset="100%" stopColor="#C47B1A" />
        </linearGradient>
        <linearGradient id="darkGrad2" x1="0" y1="0" x2="56" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1A1A2E" />
          <stop offset="100%" stopColor="#0D0D1A" />
        </linearGradient>
        <clipPath id="hexClip2">
          <path d="M28 2 L52 15.5 L52 40.5 L28 54 L4 40.5 L4 15.5 Z" />
        </clipPath>
      </defs>
      <path d="M28 2 L52 15.5 L52 40.5 L28 54 L4 40.5 L4 15.5 Z" fill="url(#goldGrad2)" />
      <path d="M28 7 L47 18 L47 38 L28 49 L9 38 L9 18 Z" fill="url(#darkGrad2)" opacity="0.85" />
      <g clipPath="url(#hexClip2)">
        <rect x="12" y="42" width="32" height="2" fill="#E8A020" opacity="0.6" />
        <rect x="18" y="24" width="20" height="18" fill="#E8A020" opacity="0.9" />
        <rect x="22" y="16" width="12" height="10" fill="#E8A020" />
        <polygon points="28,10 25,16 31,16" fill="#E8A020" />
        <rect x="21" y="27" width="4" height="4" fill="#1A1A2E" rx="0.5" />
        <rect x="31" y="27" width="4" height="4" fill="#1A1A2E" rx="0.5" />
        <rect x="21" y="34" width="4" height="4" fill="#1A1A2E" rx="0.5" />
        <rect x="31" y="34" width="4" height="4" fill="#1A1A2E" rx="0.5" />
        <rect x="25" y="37" width="6" height="5" fill="#1A1A2E" rx="1" />
        <rect x="25" y="19" width="3" height="3" fill="#1A1A2E" rx="0.5" />
        <rect x="28" y="19" width="3" height="3" fill="#1A1A2E" rx="0.5" />
      </g>
    </svg>
  );
}
