import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Shield, Diamond, Star, Leaf } from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "المسؤولية والالتزام",
    description: "نتحمل كامل المسؤولية تجاه عملائنا وشركائنا، ونلتزم بكل ما نعد به في كل مشروع.",
    color: "#E8A020",
  },
  {
    icon: Diamond,
    title: "الجودة العالية",
    description: "الجودة ليست خياراً بل هي جوهر عملنا في كل مرحلة من مراحل التنفيذ.",
    color: "#8A9BB0",
  },
  {
    icon: Star,
    title: "الخبرة",
    description: "خبرة متراكمة في قطاع الإنشاءات تمنحنا القدرة على مواجهة أعقد التحديات.",
    color: "#C47B1A",
  },
  {
    icon: Leaf,
    title: "الاستدامة",
    description: "نؤمن بالبناء المسؤول الذي يحترم البيئة ويسهم في تنمية مستدامة للمجتمع.",
    color: "#B5956A",
  },
];

export function ValuesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{ background: "#EDE8E0" }}
      ref={ref}
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 20% 50%, rgba(232,160,32,0.06) 0%, transparent 50%), radial-gradient(ellipse at 80% 50%, rgba(181,149,106,0.06) 0%, transparent 50%)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10" style={{ direction: "rtl" }}>
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
              مبادؤنا الأساسية
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
            قيمنا
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, i) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, rotateY: 90 }}
                animate={inView ? { opacity: 1, rotateY: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.12, type: "spring", stiffness: 80 }}
                whileHover={{ y: -8, scale: 1.03 }}
                className="relative rounded-3xl p-8 text-center overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.75)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(232,160,32,0.15)",
                  boxShadow: "0 8px 32px rgba(26,26,46,0.08), inset 0 1px 0 rgba(255,255,255,0.9)",
                }}
              >
                {/* Top border */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
                  style={{ background: `linear-gradient(90deg, ${value.color}80, ${value.color}, ${value.color}80)` }}
                />

                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                  style={{
                    background: `${value.color}15`,
                    border: `2px solid ${value.color}30`,
                  }}
                >
                  <Icon size={28} color={value.color} />
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
                  {value.title}
                </h3>

                <p
                  style={{
                    fontFamily: "Noto Sans Arabic, sans-serif",
                    fontSize: "14px",
                    lineHeight: 1.8,
                    color: "#4A4A6A",
                  }}
                >
                  {value.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
