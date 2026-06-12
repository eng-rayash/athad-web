import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Users, Award, Cpu, TrendingUp } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "فريق عمل متميز",
    description: "نمتلك فريقاً من المهندسين والمشرفين والعمال تم اختيارهم بعناية فائقة لضمان أعلى مستويات الكفاءة والاحترافية.",
    number: "01",
  },
  {
    icon: Award,
    title: "الجودة والالتزام",
    description: "نلتزم بأعلى معايير الجودة والشفافية في جميع مشاريعنا، مع احترام تام للمواعيد والمواصفات الفنية المتفق عليها.",
    number: "02",
  },
  {
    icon: Cpu,
    title: "التطور والابتكار",
    description: "نتبنى أحدث التقنيات والمعدات الحديثة في عالم الإنشاءات، مما يتيح لنا تقديم حلول مبتكرة وفعّالة.",
    number: "03",
  },
  {
    icon: TrendingUp,
    title: "الخبرة الطويلة",
    description: "خبرة واسعة تتيح لنا تنفيذ المشاريع بكفاءة ودقة عالية، مع القدرة على التعامل مع المشاريع المعقدة والمتنوعة.",
    number: "04",
  },
];

export function WhyUsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="whyus" className="py-24 relative overflow-hidden" style={{ background: "#F8F5F0" }}>
      {/* Architectural grid pattern */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]">
          {Array.from({ length: 15 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={`${(i / 14) * 100}%`} x2="100%" y2={`${(i / 14) * 100}%`} stroke="#E8A020" strokeWidth="1" />
          ))}
          {Array.from({ length: 20 }).map((_, i) => (
            <line key={`v${i}`} x1={`${(i / 19) * 100}%`} y1="0" x2={`${(i / 19) * 100}%`} y2="100%" stroke="#E8A020" strokeWidth="1" />
          ))}
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10" style={{ direction: "rtl" }} ref={ref}>
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{ background: "rgba(232,160,32,0.1)", border: "1px solid rgba(232,160,32,0.25)" }}
          >
            <span style={{ fontFamily: "Tajawal, sans-serif", fontSize: "13px", color: "#C47B1A", fontWeight: 600 }}>
              تميزنا
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              fontFamily: "Tajawal, sans-serif",
              fontWeight: 900,
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "#1A1A2E",
            }}
          >
            ما يميزنا
          </motion.h2>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.12 }}
                whileHover={{ y: -8 }}
                className="relative rounded-3xl p-7 group overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.8)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(232,160,32,0.15)",
                  boxShadow: "0 4px 24px rgba(26,26,46,0.07)",
                }}
              >
                {/* Number badge */}
                <div
                  className="absolute top-5 left-5"
                  style={{
                    fontFamily: "JetBrains Mono, monospace",
                    fontWeight: 700,
                    fontSize: "11px",
                    color: "rgba(232,160,32,0.4)",
                  }}
                >
                  {feat.number}
                </div>

                {/* Gold top border */}
                <div
                  className="absolute top-0 left-0 right-0 h-0.5 rounded-t-3xl transition-all duration-500 group-hover:h-1"
                  style={{ background: "linear-gradient(90deg, #E8A020, #C47B1A)" }}
                />

                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                  style={{
                    background: "linear-gradient(135deg, rgba(232,160,32,0.12), rgba(196,123,26,0.06))",
                    border: "1px solid rgba(232,160,32,0.2)",
                    transition: "transform 0.3s",
                  }}
                >
                  <Icon size={24} color="#E8A020" />
                </div>

                <h3
                  style={{
                    fontFamily: "Tajawal, sans-serif",
                    fontWeight: 800,
                    fontSize: "1.1rem",
                    color: "#1A1A2E",
                    marginBottom: "0.75rem",
                  }}
                >
                  {feat.title}
                </h3>

                <p
                  style={{
                    fontFamily: "Noto Sans Arabic, sans-serif",
                    fontSize: "14px",
                    lineHeight: 1.8,
                    color: "#4A4A6A",
                  }}
                >
                  {feat.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
