import { useRef } from "react";
import { motion, useInView } from "motion/react";

const equipment = [
  { name: "حفار (Digger)", count: 4, max: 10 },
  { name: "لورد (Loader)", count: 2, max: 10 },
  { name: "باكهولودر", count: 3, max: 10 },
  { name: "تنك مياه", count: 2, max: 10 },
  { name: "قلاب (Tipper)", count: 4, max: 10 },
  { name: "بوب كات", count: 2, max: 10 },
  { name: "رصاصة 120 كجم", count: 3, max: 10 },
  { name: "رصاصة 90 كجم", count: 7, max: 10 },
  { name: "نظام نزح مياه", count: 2, max: 10 },
  { name: "مولد 50 ك.ف", count: 1, max: 10 },
  { name: "مولد 35 ك.ف", count: 2, max: 10 },
  { name: "سيارة بيك أب", count: 7, max: 10 },
  { name: "جهاز مساحي", count: 3, max: 10 },
];

const workforce = [
  { role: "مهندس مدير مشاريع", count: 1, level: 0 },
  { role: "مهندسو موقع", count: 4, level: 1 },
  { role: "مساحون", count: 3, level: 2 },
  { role: "مراقبون", count: 4, level: 2 },
  { role: "سباكون", count: 5, level: 1 },
  { role: "سائقو معدات", count: 15, level: 1 },
  { role: "نجارون مسلحون", count: 15, level: 1 },
  { role: "حدادون مسلحون", count: 15, level: 1 },
  { role: "مليسون", count: 10, level: 1 },
  { role: "بناؤون", count: 10, level: 1 },
  { role: "مسؤولو خامات", count: 3, level: 1 },
  { role: "عمالة عادية", count: 32, level: 1 },
];

export function EquipmentSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="equipment" className="py-24 relative overflow-hidden" style={{ background: "#1A1A2E" }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at top right, rgba(232,160,32,0.06) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10" style={{ direction: "rtl" }} ref={ref}>
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{ background: "rgba(232,160,32,0.1)", border: "1px solid rgba(232,160,32,0.2)" }}
          >
            <span style={{ fontFamily: "Tajawal, sans-serif", fontSize: "13px", color: "#E8A020", fontWeight: 600 }}>
              أصولنا التشغيلية
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
            }}
          >
            المعدات والكوادر
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Equipment Table */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="rounded-3xl p-8 overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(232,160,32,0.15)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            }}
          >
            <h3
              style={{
                fontFamily: "Tajawal, sans-serif",
                fontWeight: 800,
                fontSize: "1.3rem",
                color: "#F8F5F0",
                marginBottom: "1.5rem",
              }}
            >
              قائمة المعدات
            </h3>

            <div className="space-y-4">
              {equipment.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.05 }}
                  className="flex items-center gap-4"
                >
                  <div
                    style={{
                      fontFamily: "Tajawal, sans-serif",
                      fontSize: "13px",
                      color: "#8A9BB0",
                      minWidth: "130px",
                      textAlign: "right",
                    }}
                  >
                    {item.name}
                  </div>

                  <div className="flex-1 relative h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${(item.count / item.max) * 100}%` } : { width: 0 }}
                      transition={{ duration: 1, delay: 0.4 + i * 0.05, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{ background: "linear-gradient(90deg, #E8A020, #C47B1A)" }}
                    />
                  </div>

                  <div
                    style={{
                      fontFamily: "JetBrains Mono, monospace",
                      fontWeight: 700,
                      fontSize: "14px",
                      color: "#E8A020",
                      minWidth: "24px",
                      textAlign: "center",
                    }}
                  >
                    {item.count}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Workforce */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="rounded-3xl p-8"
            style={{
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(232,160,32,0.15)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3
                style={{
                  fontFamily: "Tajawal, sans-serif",
                  fontWeight: 800,
                  fontSize: "1.3rem",
                  color: "#F8F5F0",
                }}
              >
                الكوادر البشرية
              </h3>
              <div
                className="px-3 py-1.5 rounded-xl"
                style={{ background: "rgba(232,160,32,0.15)", border: "1px solid rgba(232,160,32,0.25)" }}
              >
                <span
                  style={{
                    fontFamily: "JetBrains Mono, monospace",
                    fontWeight: 700,
                    fontSize: "16px",
                    color: "#E8A020",
                  }}
                >
                  117 متخصص
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {workforce.map((item, i) => (
                <motion.div
                  key={item.role}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.06 }}
                  className="flex items-center justify-between p-3 rounded-xl"
                  style={{
                    background: item.level === 0 ? "rgba(232,160,32,0.12)" : "rgba(255,255,255,0.04)",
                    border: item.level === 0 ? "1px solid rgba(232,160,32,0.3)" : "1px solid rgba(255,255,255,0.05)",
                    paddingRight: `${12 + item.level * 16}px`,
                  }}
                >
                  <div className="flex items-center gap-2">
                    {item.level > 0 && (
                      <div
                        className="w-1 h-1 rounded-full"
                        style={{ background: item.level === 1 ? "#E8A020" : "#8A9BB0" }}
                      />
                    )}
                    {item.level === 1 && (
                      <div className="w-3 h-px" style={{ background: "rgba(232,160,32,0.3)" }} />
                    )}
                    {item.level === 2 && (
                      <div className="w-6 h-px" style={{ background: "rgba(138,155,176,0.3)" }} />
                    )}
                    <span
                      style={{
                        fontFamily: "Tajawal, sans-serif",
                        fontSize: item.level === 0 ? "14px" : "13px",
                        fontWeight: item.level === 0 ? 700 : 500,
                        color: item.level === 0 ? "#E8A020" : item.level === 1 ? "#F8F5F0" : "#8A9BB0",
                      }}
                    >
                      {item.role}
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: "JetBrains Mono, monospace",
                      fontWeight: 600,
                      fontSize: "13px",
                      color: "#E8A020",
                    }}
                  >
                    ({item.count})
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
