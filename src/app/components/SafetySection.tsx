import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Phone, Mail, CheckCircle2, MapPin, Users } from "lucide-react";

import imgAlAwadi from "../../imports/________________1__33.jpg";
import imgOtishan from "../../imports/________________1__35.jpg";
import imgKhabbab from "../../imports/________________1__36.jpg";

const systems = [
  { color: "#EF4444", label: "أنظمة الرش (Sprinkler)", icon: "💧" },
  { color: "#E8A020", label: "FM-200 / FE-227 غرف حساسة", icon: "🔬" },
  { color: "#3B82F6", label: "Halon 1301", icon: "🧪" },
  { color: "#374151", label: "أنظمة CO2", icon: "⚫" },
  { color: "#F97316", label: "البودرة الكيميائية الجافة", icon: "🧯" },
  { color: "#EF4444", label: "أنظمة الإنذار المبكر", icon: "🔔" },
];

const projects = [
  "مطعم ومستودعات ومحطة وقود — جامعة الدمام",
  "فندق العوضي — الأحساء",
  "برج باعشن | برج العطيشان | فندق خباب — الدمام",
  "مستودعات الغامدي — الدمام",
  "مستودعات الشاهيني — الرياض",
];

const certifications = [
  "مرخصة من إدارة الدفاع المدني — المملكة العربية السعودية",
  "وزارة التجارة — المملكة العربية السعودية",
  "NFPA Member — National Fire Protection Association (USA)",
];

export function SafetySection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="safety"
      className="py-24 relative overflow-hidden"
      style={{ background: "#0D0D1A" }}
      ref={ref}
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(239,68,68,0.06) 0%, transparent 70%)",
            transform: "translate(30%, -30%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-64 h-64 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(232,160,32,0.08) 0%, transparent 70%)",
            transform: "translate(-30%, 30%)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10" style={{ direction: "rtl" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)" }}
          >
            <span style={{ fontFamily: "Tajawal, sans-serif", fontSize: "13px", color: "#EF4444", fontWeight: 600 }}>
              شراكة استراتيجية
            </span>
          </div>

          <h2
            style={{
              fontFamily: "Tajawal, sans-serif",
              fontWeight: 900,
              fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
              color: "#8A9BB0",
              marginBottom: "0.5rem",
            }}
          >
            شركاؤنا في السلامة
          </h2>
          <h3
            style={{
              fontFamily: "Tajawal, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              color: "#F8F5F0",
              marginBottom: "0.5rem",
            }}
          >
            مؤسسة العتيق المتحدة للسلامة
          </h3>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "14px",
              color: "#8A9BB0",
              letterSpacing: "0.05em",
            }}
          >
            UNITED AL-ATEEQ FOR SAFETY EST.
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Fire Systems */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-2 rounded-3xl p-8"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(239,68,68,0.15)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            }}
          >
            <h4
              style={{
                fontFamily: "Tajawal, sans-serif",
                fontWeight: 700,
                fontSize: "1.1rem",
                color: "#F8F5F0",
                marginBottom: "1.5rem",
              }}
            >
              أنظمة مكافحة الحرائق والسلامة
            </h4>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {systems.map((sys, i) => (
                <motion.div
                  key={sys.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.07 }}
                  className="flex items-center gap-3 p-3 rounded-xl"
                  style={{
                    background: `${sys.color}10`,
                    border: `1px solid ${sys.color}25`,
                  }}
                >
                  <span style={{ fontSize: "18px" }}>{sys.icon}</span>
                  <span
                    style={{
                      fontFamily: "Tajawal, sans-serif",
                      fontSize: "13px",
                      color: "#D0D0E0",
                      fontWeight: 500,
                    }}
                  >
                    {sys.label}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Sectors */}
            <div
              className="rounded-2xl p-5"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <p
                style={{
                  fontFamily: "Tajawal, sans-serif",
                  fontWeight: 600,
                  fontSize: "13px",
                  color: "#E8A020",
                  marginBottom: "8px",
                }}
              >
                مجال العمل:
              </p>
              <p
                style={{
                  fontFamily: "Noto Sans Arabic, sans-serif",
                  fontSize: "14px",
                  lineHeight: 1.8,
                  color: "#8A9BB0",
                }}
              >
                أنظمة مكافحة الحرائق والسلامة — تغطي القطاعات الحكومية، النفطية، البتروكيماوية، محطات الطاقة، المصانع، المستودعات، المدارس، والمباني العامة.
              </p>
            </div>
          </motion.div>

          {/* Side column */}
          <div className="space-y-6">
            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="rounded-3xl p-6"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(232,160,32,0.15)",
              }}
            >
              <h4
                style={{
                  fontFamily: "Tajawal, sans-serif",
                  fontWeight: 700,
                  fontSize: "1rem",
                  color: "#F8F5F0",
                  marginBottom: "1rem",
                }}
              >
                الاعتمادات والتراخيص
              </h4>
              <div className="space-y-3">
                {certifications.map((cert, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={16} color="#E8A020" className="flex-shrink-0 mt-0.5" />
                    <span
                      style={{
                        fontFamily: "Noto Sans Arabic, sans-serif",
                        fontSize: "12px",
                        lineHeight: 1.7,
                        color: "#8A9BB0",
                      }}
                    >
                      {cert}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Projects */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="rounded-3xl p-6"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(232,160,32,0.15)",
              }}
            >
              <h4
                style={{
                  fontFamily: "Tajawal, sans-serif",
                  fontWeight: 700,
                  fontSize: "1rem",
                  color: "#F8F5F0",
                  marginBottom: "1rem",
                }}
              >
                مشاريع بارزة
              </h4>
              <div className="space-y-2">
                {projects.map((proj, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 py-1.5 border-b last:border-0"
                    style={{ borderColor: "rgba(255,255,255,0.05)" }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#E8A020" }} />
                    <span
                      style={{
                        fontFamily: "Tajawal, sans-serif",
                        fontSize: "12px",
                        color: "#8A9BB0",
                      }}
                    >
                      {proj}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="rounded-3xl p-6"
              style={{
                background: "rgba(239,68,68,0.06)",
                border: "1px solid rgba(239,68,68,0.2)",
              }}
            >
              <div className="space-y-3">
                <a
                  href="tel:0138849998"
                  className="flex items-center gap-3 group"
                  style={{ textDecoration: "none" }}
                >
                  <Phone size={16} color="#EF4444" />
                  <span
                    style={{
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: "14px",
                      color: "#D0D0E0",
                      fontWeight: 600,
                    }}
                  >
                    0138849998
                  </span>
                </a>
                <a
                  href="mailto:UNITED.ALATEEQ.SAFETY@GMAIL.COM"
                  className="flex items-center gap-3"
                  style={{ textDecoration: "none" }}
                >
                  <Mail size={16} color="#EF4444" />
                  <span
                    style={{
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: "11px",
                      color: "#8A9BB0",
                      wordBreak: "break-all",
                    }}
                  >
                    UNITED.ALATEEQ.SAFETY@GMAIL.COM
                  </span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Executed Projects — Visual Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-14"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, transparent, rgba(232,160,32,0.3))" }} />
            <h4
              style={{
                fontFamily: "Tajawal, sans-serif",
                fontWeight: 800,
                fontSize: "1.15rem",
                color: "#F8F5F0",
                whiteSpace: "nowrap",
              }}
            >
              مشاريع السلامة المنجزة
            </h4>
            <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, rgba(232,160,32,0.3), transparent)" }} />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                img: imgAlAwadi,
                name: "فندق العوضي",
                nameEn: "Al-Awadi Hotel",
                location: "الأحساء",
                owner: "إبراهيم العوضي",
                floors: "بيسمنت + Ground + Mezzanine + 10 أدوار",
                consultant: "Reef Consultant",
              },
              {
                img: imgOtishan,
                name: "برج العطيشان 1 و 2",
                nameEn: "Otishan Tower 1, 2",
                location: "الدمام",
                owner: "عبدالرحمن العطيشان",
                floors: "بيسمنت + Ground + Mezzanine + 5 أدوار",
                consultant: "Reef Consultant",
              },
              {
                img: imgKhabbab,
                name: "فندق خباب",
                nameEn: "Khabbab Hotel",
                location: "الدمام",
                owner: "خباب القحطاني",
                floors: "Ground + Mezzanine + 4 أدوار",
                consultant: "Reef Consultant",
              },
            ].map((proj, i) => (
              <motion.div
                key={proj.nameEn}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + i * 0.12 }}
                whileHover={{ y: -6 }}
                className="relative rounded-2xl overflow-hidden group"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(232,160,32,0.15)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                }}
              >
                {/* Project image */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={proj.img}
                    alt={proj.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(180deg, transparent 40%, rgba(13,13,26,0.9) 100%)" }}
                  />
                  {/* Safety badge */}
                  <div
                    className="absolute top-3 right-3 px-2.5 py-1 rounded-lg flex items-center gap-1.5"
                    style={{ background: "rgba(239,68,68,0.85)", backdropFilter: "blur(6px)" }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", color: "white", fontWeight: 700 }}>
                      FIRE SAFETY
                    </span>
                  </div>
                  {/* Project name overlay */}
                  <div className="absolute bottom-3 right-3 left-3">
                    <div style={{ fontFamily: "Tajawal, sans-serif", fontWeight: 800, fontSize: "1rem", color: "white" }}>
                      {proj.name}
                    </div>
                    <div style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.65)" }}>
                      {proj.nameEn}
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-2">
                    <MapPin size={13} color="#E8A020" />
                    <span style={{ fontFamily: "Tajawal, sans-serif", fontSize: "13px", color: "#8A9BB0" }}>
                      {proj.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={13} color="#E8A020" />
                    <span style={{ fontFamily: "Tajawal, sans-serif", fontSize: "13px", color: "#8A9BB0" }}>
                      {proj.owner}
                    </span>
                  </div>
                  <div
                    className="pt-2 border-t"
                    style={{ borderColor: "rgba(255,255,255,0.06)" }}
                  >
                    <span
                      style={{
                        fontFamily: "Tajawal, sans-serif",
                        fontSize: "12px",
                        color: "#4A4A6A",
                        lineHeight: 1.6,
                        display: "block",
                      }}
                    >
                      {proj.floors}
                    </span>
                  </div>

                  {/* Systems badge row */}
                  <div className="flex flex-wrap gap-1.5">
                    {["Sprinkler", "FM-200", "Fire Alarm"].map((s) => (
                      <span
                        key={s}
                        className="px-2 py-0.5 rounded-md"
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "10px",
                          fontWeight: 600,
                          color: "#EF4444",
                          background: "rgba(239,68,68,0.1)",
                          border: "1px solid rgba(239,68,68,0.2)",
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
