import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Layers, Building2, Paintbrush, ClipboardList } from "lucide-react";

const services = [
  {
    icon: Layers,
    title: "البنية التحتية",
    description: "تنفيذ مشاريع البنية التحتية بكافة أنواعها من طرق وشبكات مياه وصرف صحي وكهرباء وفق أعلى المعايير الهندسية.",
    color: "#E8A020",
    gradient: "linear-gradient(135deg, rgba(232,160,32,0.12), rgba(196,123,26,0.06))",
    border: "rgba(232,160,32,0.3)",
  },
  {
    icon: Building2,
    title: "إنشاء المباني",
    description: "بناء وتشييد المباني السكنية والتجارية والصناعية بجودة هندسية عالية وبمواد بناء ممتازة.",
    color: "#1A1A2E",
    gradient: "linear-gradient(135deg, rgba(26,26,46,0.08), rgba(74,74,106,0.04))",
    border: "rgba(26,26,46,0.15)",
  },
  {
    icon: Paintbrush,
    title: "التشطيبات",
    description: "خدمات التشطيبات الداخلية والخارجية بأعلى جودة باستخدام أحدث المواد والأساليب الحديثة.",
    color: "#B5956A",
    gradient: "linear-gradient(135deg, rgba(181,149,106,0.12), rgba(181,149,106,0.06))",
    border: "rgba(181,149,106,0.3)",
  },
  {
    icon: ClipboardList,
    title: "إدارة المشاريع",
    description: "إدارة المشاريع الإنشائية لضمان تنفيذها بكفاءة ودقة وفق الجداول الزمنية والميزانيات المحددة.",
    color: "#8A9BB0",
    gradient: "linear-gradient(135deg, rgba(138,155,176,0.12), rgba(138,155,176,0.06))",
    border: "rgba(138,155,176,0.3)",
  },
];

export function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-24 relative overflow-hidden" style={{ background: "#EDE8E0" }}>
      {/* Background decoration */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(232,160,32,0.04) 0%, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto px-6" style={{ direction: "rtl" }} ref={ref}>
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{
              background: "rgba(232,160,32,0.1)",
              border: "1px solid rgba(232,160,32,0.25)",
            }}
          >
            <span style={{ fontFamily: "Tajawal, sans-serif", fontSize: "13px", color: "#C47B1A", fontWeight: 600 }}>
              ما نقدمه
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
              marginBottom: "1rem",
            }}
          >
            خدماتنا
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontFamily: "Noto Sans Arabic, sans-serif",
              fontSize: "16px",
              color: "#4A4A6A",
              maxWidth: "500px",
              margin: "0 auto",
            }}
          >
            نقدم مجموعة متكاملة من خدمات البناء والإنشاء بأعلى معايير الجودة
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.12 }}
                whileHover={{ y: -6, scale: 1.01 }}
                className="relative rounded-3xl p-8 group overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.75)",
                  backdropFilter: "blur(20px)",
                  border: `1px solid ${service.border}`,
                  boxShadow: "0 8px 32px rgba(26,26,46,0.08), inset 0 1px 0 rgba(255,255,255,0.9)",
                  cursor: "default",
                }}
              >
                {/* Top gradient border */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
                  style={{ background: `linear-gradient(90deg, ${service.color}, transparent)` }}
                />

                {/* Background gradient on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
                  style={{ background: service.gradient }}
                />

                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 15 }}
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                    style={{
                      background: service.gradient,
                      border: `1px solid ${service.border}`,
                    }}
                  >
                    <Icon size={28} color={service.color} />
                  </motion.div>

                  <h3
                    style={{
                      fontFamily: "Tajawal, sans-serif",
                      fontWeight: 800,
                      fontSize: "1.3rem",
                      color: "#1A1A2E",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {service.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: "Noto Sans Arabic, sans-serif",
                      fontSize: "15px",
                      lineHeight: 1.8,
                      color: "#4A4A6A",
                    }}
                  >
                    {service.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
