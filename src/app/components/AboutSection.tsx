import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";

interface CounterProps {
  end: number;
  label: string;
  suffix?: string;
}

function AnimatedCounter({ end, label, suffix = "" }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const step = end / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end]);

  return (
    <div ref={ref} className="text-center">
      <div
        style={{
          fontFamily: "JetBrains Mono, monospace",
          fontWeight: 700,
          fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
          background: "linear-gradient(135deg, #E8A020, #C47B1A)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          lineHeight: 1,
        }}
      >
        {count}{suffix}
      </div>
      <div
        style={{
          fontFamily: "Tajawal, sans-serif",
          fontWeight: 600,
          fontSize: "14px",
          color: "#4A4A6A",
          marginTop: "8px",
        }}
      >
        {label}
      </div>
    </div>
  );
}

export function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 relative overflow-hidden" style={{ background: "#F8F5F0" }}>
      {/* Decorative background */}
      <div
        className="absolute top-0 left-0 w-72 h-72 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(232,160,32,0.06) 0%, transparent 70%)",
          transform: "translate(-30%, -30%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6" style={{ direction: "rtl" }}>
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-4"
          ref={ref}
        >
          <div
            className="h-0.5 w-12"
            style={{ background: "linear-gradient(90deg, #E8A020, transparent)" }}
          />
          <span
            style={{
              fontFamily: "Tajawal, sans-serif",
              fontWeight: 600,
              fontSize: "14px",
              color: "#E8A020",
              letterSpacing: "0.1em",
            }}
          >
            تعرّف علينا
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content — 60% */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              style={{
                fontFamily: "Tajawal, sans-serif",
                fontWeight: 900,
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "#1A1A2E",
                marginBottom: "1.5rem",
                lineHeight: 1.2,
              }}
            >
              من نحن
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              style={{
                fontFamily: "Noto Sans Arabic, sans-serif",
                fontSize: "16px",
                lineHeight: 1.9,
                color: "#4A4A6A",
                marginBottom: "1.5rem",
              }}
            >
              انطلقت شركة اتحاد البناء للمقاولات العامة على أسس متينة وثابتة وعلمية نحو مستقبل واعد مليء بالإنجازات والمشاريع التي تدعم اقتصاد المملكة العربية السعودية من خلال كوادرها المميزة والخبيرة. المعيار الأساسي الذي تلتزم إليه الشركة هو{" "}
              <span style={{ color: "#E8A020", fontWeight: 700 }}>الجودة</span>.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.35 }}
              style={{
                fontFamily: "Noto Sans Arabic, sans-serif",
                fontSize: "16px",
                lineHeight: 1.9,
                color: "#4A4A6A",
                marginBottom: "2rem",
              }}
            >
              تتبع الشركة استراتيجية عمل مرنة تسمح لها بالتطور والنمو دائماً بما يلبي حاجة السوق والعملاء وبما يتماشى مع كافة التقنيات والمعدات الحديثة في عالم الإنشاءات والمقاولات.
            </motion.p>

            {/* Features list */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="space-y-3"
            >
              {[
                "جودة تنفيذية عالية في كل مرحلة",
                "معدات حديثة وكوادر متخصصة",
                "التزام بالمواعيد والمواصفات الفنية",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, #E8A020, #C47B1A)" }}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span style={{ fontFamily: "Tajawal, sans-serif", color: "#1A1A2E", fontSize: "15px" }}>
                    {item}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Visual — 40% */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Blueprint visual */}
            <div
              className="relative rounded-3xl p-8 overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.65)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(232,160,32,0.25)",
                boxShadow: "0 8px 32px rgba(26,26,46,0.12), inset 0 1px 0 rgba(255,255,255,0.8)",
              }}
            >
              <svg viewBox="0 0 400 320" className="w-full" style={{ opacity: 0.9 }}>
                {/* Blueprint grid */}
                {Array.from({ length: 8 }).map((_, i) => (
                  <line key={`h${i}`} x1="0" y1={i * 45} x2="400" y2={i * 45} stroke="rgba(232,160,32,0.15)" strokeWidth="1" />
                ))}
                {Array.from({ length: 10 }).map((_, i) => (
                  <line key={`v${i}`} x1={i * 44} y1="0" x2={i * 44} y2="320" stroke="rgba(232,160,32,0.15)" strokeWidth="1" />
                ))}
                {/* Building outline */}
                <rect x="80" y="60" width="240" height="240" fill="none" stroke="#1A1A2E" strokeWidth="2" />
                <rect x="120" y="100" width="60" height="80" fill="rgba(232,160,32,0.1)" stroke="#E8A020" strokeWidth="1.5" />
                <rect x="220" y="100" width="60" height="80" fill="rgba(232,160,32,0.1)" stroke="#E8A020" strokeWidth="1.5" />
                <rect x="155" y="200" width="90" height="100" fill="rgba(26,26,46,0.05)" stroke="#1A1A2E" strokeWidth="1.5" />
                {/* Roof */}
                <path d="M 80 60 L 200 20 L 320 60" fill="none" stroke="#E8A020" strokeWidth="2" />
                {/* Dimensions */}
                <line x1="80" y1="320" x2="320" y2="320" stroke="#8A9BB0" strokeWidth="1" markerEnd="url(#arrow)" />
                <text x="200" y="315" textAnchor="middle" fill="#8A9BB0" fontSize="10" fontFamily="JetBrains Mono">24.0 م</text>
                <text x="30" y="190" textAnchor="middle" fill="#8A9BB0" fontSize="10" fontFamily="JetBrains Mono" transform="rotate(-90, 30, 190)">16.0 م</text>
                {/* Labels */}
                <text x="150" y="145" textAnchor="middle" fill="#E8A020" fontSize="9" fontFamily="Tajawal">غرفة</text>
                <text x="250" y="145" textAnchor="middle" fill="#E8A020" fontSize="9" fontFamily="Tajawal">غرفة</text>
                <text x="200" y="255" textAnchor="middle" fill="#1A1A2E" fontSize="9" fontFamily="Tajawal">مدخل</text>
                {/* Compass */}
                <circle cx="360" cy="40" r="20" fill="none" stroke="#E8A020" strokeWidth="1" />
                <text x="360" y="35" textAnchor="middle" fill="#E8A020" fontSize="10" fontWeight="bold">N</text>
                <line x1="360" y1="22" x2="360" y2="30" stroke="#E8A020" strokeWidth="2" />
              </svg>

              {/* Badge */}
              <div
                className="absolute bottom-4 left-4 px-3 py-1.5 rounded-lg"
                style={{
                  background: "rgba(232,160,32,0.1)",
                  border: "1px solid rgba(232,160,32,0.3)",
                }}
              >
                <span
                  style={{
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: "11px",
                    color: "#C47B1A",
                    fontWeight: 600,
                  }}
                >
                  Blueprint v2.0
                </span>
              </div>
            </div>

            {/* Floating card */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-4 px-4 py-3 rounded-2xl shadow-lg"
              style={{
                background: "rgba(255,255,255,0.9)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(232,160,32,0.25)",
              }}
            >
              <div style={{ fontFamily: "Tajawal, sans-serif", fontSize: "13px", color: "#1A1A2E", fontWeight: 700 }}>
                س.ت: 2050125097
              </div>
              <div style={{ fontFamily: "Tajawal, sans-serif", fontSize: "11px", color: "#8A9BB0" }}>
                مسجّلة رسمياً
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { end: 4, label: "حفارات ثقيلة" },
            { end: 7, label: "سيارات بيك أب" },
            { end: 15, label: "مهندس وسائق معدات" },
            { end: 32, label: "عامل متخصص" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl p-6"
              style={{
                background: "rgba(255,255,255,0.65)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(232,160,32,0.2)",
                boxShadow: "0 4px 16px rgba(26,26,46,0.06)",
              }}
            >
              <AnimatedCounter end={stat.end} label={stat.label} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
