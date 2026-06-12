import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Eye, Target } from "lucide-react";

export function VisionMission() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="vision"
      className="py-24 relative overflow-hidden"
      style={{ background: "#1A1A2E" }}
      ref={ref}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(232,160,32,0.08) 0%, transparent 70%)",
            transform: "translate(30%, -30%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-80 h-80 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(138,155,176,0.06) 0%, transparent 70%)",
            transform: "translate(-30%, 30%)",
          }}
        />
        {/* Grid lines */}
        <svg className="absolute inset-0 w-full h-full opacity-5">
          {Array.from({ length: 20 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={`${i * 5}%`} x2="100%" y2={`${i * 5}%`} stroke="#E8A020" strokeWidth="1" />
          ))}
          {Array.from({ length: 20 }).map((_, i) => (
            <line key={`v${i}`} x1={`${i * 5}%`} y1="0" x2={`${i * 5}%`} y2="100%" stroke="#E8A020" strokeWidth="1" />
          ))}
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10" style={{ direction: "rtl" }}>
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{
              background: "rgba(232,160,32,0.12)",
              border: "1px solid rgba(232,160,32,0.25)",
            }}
          >
            <span
              style={{
                fontFamily: "Tajawal, sans-serif",
                fontSize: "13px",
                color: "#E8A020",
                fontWeight: 600,
              }}
            >
              توجهنا الاستراتيجي
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
              color: "#F8F5F0",
              marginBottom: "1rem",
            }}
          >
            الرؤية والرسالة
          </motion.h2>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, y: 50, rotateX: 15 }}
            animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="relative rounded-3xl p-8 group"
            style={{
              background: "rgba(255,255,255,0.06)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(232,160,32,0.2)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
              cursor: "default",
            }}
          >
            {/* Gold top border */}
            <div
              className="absolute top-0 left-0 right-0 h-0.5 rounded-t-3xl"
              style={{ background: "linear-gradient(90deg, transparent, #E8A020, transparent)" }}
            />

            <div className="flex items-center gap-4 mb-6">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: "linear-gradient(135deg, rgba(232,160,32,0.2), rgba(196,123,26,0.1))",
                  border: "1px solid rgba(232,160,32,0.3)",
                }}
              >
                <Eye size={24} color="#E8A020" />
              </div>
              <h3
                style={{
                  fontFamily: "Tajawal, sans-serif",
                  fontWeight: 800,
                  fontSize: "1.5rem",
                  color: "#F8F5F0",
                }}
              >
                رؤيتنا
              </h3>
            </div>

            <p
              style={{
                fontFamily: "Noto Sans Arabic, sans-serif",
                fontSize: "16px",
                lineHeight: 1.9,
                color: "#8A9BB0",
              }}
            >
              نطمح لأن نكون الخيار الأول للعملاء في تقديم أفضل الحلول الهندسية وجودة تنفيذية عالية، مما يسهم في تحقيق{" "}
              <span style={{ color: "#E8A020", fontWeight: 600 }}>نهضة عمرانية وبنية تحتية متكاملة</span>.
            </p>

            {/* Hover glow */}
            <div
              className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: "radial-gradient(circle at 50% 50%, rgba(232,160,32,0.04) 0%, transparent 70%)",
              }}
            />
          </motion.div>

          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, y: 50, rotateX: 15 }}
            animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.35 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="relative rounded-3xl p-8 group"
            style={{
              background: "rgba(255,255,255,0.06)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(232,160,32,0.2)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
              cursor: "default",
            }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-0.5 rounded-t-3xl"
              style={{ background: "linear-gradient(90deg, transparent, #C47B1A, transparent)" }}
            />

            <div className="flex items-center gap-4 mb-6">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: "linear-gradient(135deg, rgba(196,123,26,0.2), rgba(232,160,32,0.1))",
                  border: "1px solid rgba(196,123,26,0.3)",
                }}
              >
                <Target size={24} color="#C47B1A" />
              </div>
              <h3
                style={{
                  fontFamily: "Tajawal, sans-serif",
                  fontWeight: 800,
                  fontSize: "1.5rem",
                  color: "#F8F5F0",
                }}
              >
                رسالتنا
              </h3>
            </div>

            <p
              style={{
                fontFamily: "Noto Sans Arabic, sans-serif",
                fontSize: "16px",
                lineHeight: 1.9,
                color: "#8A9BB0",
              }}
            >
              نسعى لتطوير وتنفيذ مشاريع الإنشاءات والبنية التحتية وفقاً لأعلى المعايير والمواصفات الفنية. نركز على تقديم{" "}
              <span style={{ color: "#E8A020", fontWeight: 600 }}>حلول معمارية وإنشائية موثوقة</span> تحقق رضا عملائنا، ملتزمين بالتحسين المستمر وتوفير بيئة عمل احترافية.
            </p>

            <div
              className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: "radial-gradient(circle at 50% 50%, rgba(196,123,26,0.04) 0%, transparent 70%)",
              }}
            />
          </motion.div>
        </div>

        {/* Bottom accent */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-16 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(232,160,32,0.4), transparent)" }}
        />
      </div>
    </section>
  );
}
