import logoImg from "@/assets/logo.png";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  dark?: boolean;
}

export function Logo({ size = "md", dark = false }: LogoProps) {
  const dims = { sm: 38, md: 48, lg: 64 };
  const d = dims[size];
  const textColor = dark ? "#F8F5F0" : "#1A1A2E";
  const subColor = dark ? "#8A9BB0" : "#4A4A6A";

  return (
    <div className="flex items-center gap-3">
      {/* Mark */}
      <img
        src={logoImg}
        alt="شعار شركة اتحاد البناء للمقاولات العامة"
        style={{
          width: d,
          height: d,
          objectFit: "contain",
          filter: dark
            ? "drop-shadow(0 2px 8px rgba(232,160,32,0.25))"
            : "drop-shadow(0 2px 4px rgba(0,0,0,0.06))",
        }}
        className="transition-transform duration-300 hover:scale-105 flex-shrink-0"
      />

      {/* Text */}
      <div>
        <div
          style={{
            fontFamily: "maghfira, Tajawal, sans-serif",
            fontWeight: 800,
            fontSize: size === "sm" ? "16px" : size === "md" ? "20px" : "26px",
            color: textColor,
            lineHeight: 1.2,
          }}
        >
          اتحاد البناء
        </div>
        <div
          style={{
            fontFamily: "ThmanyahSerifText-Medium, Tajawal, sans-serif",
            fontWeight: 600,
            fontSize: size === "sm" ? "10px" : size === "md" ? "12px" : "14px",
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
    <img
      src={logoImg}
      alt="شعار شركة اتحاد البناء"
      style={{
        width: size,
        height: size,
        objectFit: "contain",
        display: "inline-block",
      }}
    />
  );
}
