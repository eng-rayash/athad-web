import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { MapPin, Phone, Mail, Building2, MessageCircle } from "lucide-react";

export function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="contact"
      className="py-24 relative overflow-hidden"
      style={{ background: "#F8F5F0" }}
      ref={ref}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at bottom left, rgba(232,160,32,0.06) 0%, transparent 60%)" }}
      />

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
              نحن هنا لمساعدتك
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
            تواصل معنا
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div
              className="relative rounded-3xl overflow-hidden h-72 flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #1A1A2E, #0D0D1A)", border: "1px solid rgba(232,160,32,0.2)" }}
            >
              <svg viewBox="0 0 400 280" className="absolute inset-0 w-full h-full opacity-20">
                {Array.from({ length: 10 }).map((_, i) => (
                  <line key={`h${i}`} x1="0" y1={i * 28} x2="400" y2={i * 28} stroke="#E8A020" strokeWidth="0.5" />
                ))}
                {Array.from({ length: 14 }).map((_, i) => (
                  <line key={`v${i}`} x1={i * 30} y1="0" x2={i * 30} y2="280" stroke="#E8A020" strokeWidth="0.5" />
                ))}
                <line x1="200" y1="0" x2="200" y2="280" stroke="#E8A020" strokeWidth="2" />
                <line x1="0" y1="140" x2="400" y2="140" stroke="#E8A020" strokeWidth="2" />
                <line x1="100" y1="0" x2="180" y2="280" stroke="#E8A020" strokeWidth="1" />
                <line x1="300" y1="0" x2="220" y2="280" stroke="#E8A020" strokeWidth="1" />
              </svg>
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 flex flex-col items-center"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center shadow-2xl"
                  style={{ background: "linear-gradient(135deg, #E8A020, #C47B1A)", boxShadow: "0 0 40px rgba(232,160,32,0.5)" }}
                >
                  <MapPin size={28} color="white" />
                </div>
                <div className="mt-3 px-4 py-1.5 rounded-lg" style={{ background: "rgba(232,160,32,0.9)" }}>
                  <span style={{ fontFamily: "Tajawal, sans-serif", fontSize: "13px", color: "white", fontWeight: 700 }}>
                    الدمام — شارع الملك سعود
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Contact info */}
            <div className="space-y-3">
              {[
                { icon: MapPin, label: "العنوان", value: "الدمام — شارع الملك سعود", color: "#E8A020", href: undefined },
                { icon: Phone, label: "رقم الجوال", value: "0500988098", color: "#8A9BB0", href: "tel:0500988098" },
                { icon: Mail, label: "البريد الإلكتروني", value: "Abutarekkk@hotmail.com", color: "#C47B1A", href: "mailto:Abutarekkk@hotmail.com" },
                { icon: Building2, label: "السجل التجاري", value: "2050125097", color: "#B5956A", href: undefined },
              ].map((item) => {
                const Icon = item.icon;
                const inner = (
                  <div
                    className="flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 hover:shadow-md"
                    style={{
                      background: "rgba(255,255,255,0.8)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(232,160,32,0.15)",
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${item.color}15`, border: `1px solid ${item.color}30` }}
                    >
                      <Icon size={18} color={item.color} />
                    </div>
                    <div>
                      <div style={{ fontFamily: "Tajawal, sans-serif", fontSize: "12px", color: "#8A9BB0" }}>{item.label}</div>
                      <div
                        style={{
                          fontFamily: ["رقم الجوال", "السجل التجاري"].includes(item.label) ? "JetBrains Mono, monospace" : "Tajawal, sans-serif",
                          fontSize: "15px",
                          fontWeight: 600,
                          color: "#1A1A2E",
                        }}
                      >
                        {item.value}
                      </div>
                    </div>
                  </div>
                );
                return item.href ? (
                  <a key={item.label} href={item.href} style={{ textDecoration: "none", display: "block" }}>{inner}</a>
                ) : (
                  <div key={item.label}>{inner}</div>
                );
              })}
            </div>
          </motion.div>

          {/* CTA Panel */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col gap-6"
          >
            {/* Headline card */}
            <div
              className="rounded-3xl p-8"
              style={{
                background: "rgba(255,255,255,0.75)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(232,160,32,0.2)",
                boxShadow: "0 8px 32px rgba(26,26,46,0.1), inset 0 1px 0 rgba(255,255,255,0.9)",
              }}
            >
              <h3
                style={{
                  fontFamily: "Tajawal, sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(1.4rem, 3vw, 2rem)",
                  color: "#1A1A2E",
                  marginBottom: "1rem",
                  lineHeight: 1.3,
                }}
              >
                هل تبحث عن شريك موثوق في الإنشاءات؟
              </h3>
              <p
                style={{
                  fontFamily: "Noto Sans Arabic, sans-serif",
                  fontSize: "16px",
                  lineHeight: 1.9,
                  color: "#4A4A6A",
                  marginBottom: "2rem",
                }}
              >
                فريقنا من المهندسين والمتخصصين جاهز للإجابة على استفساراتك ومناقشة تفاصيل مشروعك. تواصل معنا الآن عبر الهاتف أو واتساب.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col gap-4">
                {/* Phone CTA */}
                <a
                  href="tel:0500988098"
                  className="flex items-center justify-center gap-3 py-4 px-6 rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                  style={{
                    background: "linear-gradient(135deg, #1A1A2E, #2A2A4E)",
                    color: "white",
                    fontFamily: "Tajawal, sans-serif",
                    fontWeight: 700,
                    fontSize: "18px",
                    textDecoration: "none",
                    boxShadow: "0 8px 24px rgba(26,26,46,0.3)",
                  }}
                >
                  <Phone size={22} color="#E8A020" />
                  <span>اتصل بنا الآن</span>
                  <span
                    style={{
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: "16px",
                      color: "#E8A020",
                    }}
                  >
                    0500988098
                  </span>
                </a>

                {/* WhatsApp CTA */}
                <a
                  href="https://wa.me/966500988098"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 py-4 px-6 rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                  style={{
                    background: "linear-gradient(135deg, #25D366, #128C7E)",
                    color: "white",
                    fontFamily: "Tajawal, sans-serif",
                    fontWeight: 700,
                    fontSize: "18px",
                    textDecoration: "none",
                    boxShadow: "0 8px 24px rgba(37,211,102,0.35)",
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  <span>تواصل عبر واتساب</span>
                </a>
              </div>
            </div>

            {/* Working hours card */}
            <div
              className="rounded-3xl p-6"
              style={{
                background: "rgba(232,160,32,0.07)",
                border: "1px solid rgba(232,160,32,0.2)",
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <MessageCircle size={18} color="#E8A020" />
                <span style={{ fontFamily: "Tajawal, sans-serif", fontWeight: 700, fontSize: "15px", color: "#1A1A2E" }}>
                  ساعات العمل
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { day: "الأحد — الخميس", time: "8:00 ص – 5:00 م" },
                  { day: "الجمعة — السبت", time: "عطلة رسمية" },
                ].map((item) => (
                  <div key={item.day}>
                    <div style={{ fontFamily: "Tajawal, sans-serif", fontSize: "12px", color: "#8A9BB0" }}>{item.day}</div>
                    <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "13px", fontWeight: 600, color: "#1A1A2E" }}>{item.time}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
