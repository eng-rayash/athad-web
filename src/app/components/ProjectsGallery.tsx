import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { X, ZoomIn, ChevronRight, ChevronLeft } from "lucide-react";
import { getMarqueeImages, type MarqueeImage } from "../../lib/store";

import img14 from "../../imports/________________1__14.jpg";
import img15 from "../../imports/________________1__15.jpg";
import img16 from "../../imports/________________1__16.jpg";
import img17 from "../../imports/________________1__17.jpg";
import img18 from "../../imports/________________1__18.jpg";
import img19 from "../../imports/________________1__19.jpg";
import img20 from "../../imports/________________1__20.jpg";

const projects = [
  { id: 1, src: img14, title: "أعمال الأساسات والحديد", subtitle: "Foundation & Reinforcement Works", category: "أساسات", desc: "أعمال حديد التسليح وتشكيل القواعد الخرسانية لمشاريع متعددة في الدمام", featured: true },
  { id: 2, src: img15, title: "أعمال الخرسانة والهياكل", subtitle: "Concrete & Structural Works", category: "هياكل", desc: "صب الخرسانة وتنفيذ الهياكل الرئيسية بمعدات ضخ حديثة", featured: false },
  { id: 3, src: img16, title: "الهياكل المعدنية", subtitle: "Steel Frame Structures", category: "هياكل", desc: "تصنيع وتركيب الهياكل المعدنية للمستودعات والمنشآت الصناعية", featured: false },
  { id: 4, src: img17, title: "الأعمدة والمباني السكنية", subtitle: "Columns & Residential Buildings", category: "مباني سكنية", desc: "تنفيذ أعمال الأعمدة الخرسانية وإنشاء المباني السكنية", featured: false },
  { id: 5, src: img18, title: "المباني التجارية والمستودعات", subtitle: "Commercial Buildings & Warehouses", category: "تجاري", desc: "إنشاء المباني التجارية ومحطات الوقود والمستودعات", featured: false },
  { id: 6, src: img19, title: "الفلل والوحدات السكنية", subtitle: "Villas & Residential Units", category: "مباني سكنية", desc: "تشييد فلل ووحدات سكنية متكاملة من الهيكل حتى التسليم", featured: false },
  { id: 7, src: img20, title: "مشاريع متنوعة", subtitle: "Diverse Construction Projects", category: "متنوعة", desc: "مجموعة متنوعة من المشاريع تشمل المساجد والمباني العامة والمستودعات", featured: false },
];

const categories = ["الكل", "أساسات", "هياكل", "مباني سكنية", "تجاري", "متنوعة"];

/* ---------- Marquee ---------- */
const DEFAULT_MARQUEE_SRCS = [img14, img15, img16, img17, img18, img19, img20];

function MarqueeStrip() {
  const [adminImages, setAdminImages] = useState<MarqueeImage[]>([]);

  useEffect(() => {
    const load = () => setAdminImages(getMarqueeImages());
    load();
    const handler = (e: StorageEvent) => { if (e.key === "ub_marquee_images") load(); };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  const allSrcs: string[] =
    adminImages.length > 0
      ? adminImages.map((img) => img.url)
      : DEFAULT_MARQUEE_SRCS as unknown as string[];

  // Duplicate for seamless loop
  const doubled = [...allSrcs, ...allSrcs];

  return (
    <div className="mt-10 overflow-hidden rounded-2xl" style={{ position: "relative" }}>
      {/* Fade edges */}
      <div
        className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #EDE8E0, transparent)" }}
      />
      <div
        className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #EDE8E0, transparent)" }}
      />

      {/* Label */}
      <div className="flex items-center gap-3 mb-4">
        <div className="h-px flex-1" style={{ background: "rgba(232,160,32,0.3)" }} />
        <span
          style={{
            fontFamily: "Tajawal, sans-serif",
            fontSize: "12px",
            fontWeight: 700,
            color: "#C47B1A",
            letterSpacing: "0.08em",
            whiteSpace: "nowrap",
          }}
        >
          ⚡ أحدث الأعمال — يُدار عبر لوحة التحكم
        </span>
        <div className="h-px flex-1" style={{ background: "rgba(232,160,32,0.3)" }} />
      </div>

      <div
        style={{
          display: "flex",
          gap: "12px",
          animation: "marqueeScroll 28s linear infinite",
          width: "max-content",
        }}
      >
        {doubled.map((src, i) => (
          <div
            key={i}
            style={{
              width: "200px",
              height: "130px",
              borderRadius: "12px",
              overflow: "hidden",
              flexShrink: 0,
              border: "1px solid rgba(232,160,32,0.2)",
              boxShadow: "0 4px 16px rgba(26,26,46,0.08)",
            }}
          >
            <img
              src={src}
              alt={`project-${i}`}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

/* ---------- Main Gallery ---------- */
export function ProjectsGallery() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeCategory, setActiveCategory] = useState("الكل");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = activeCategory === "الكل" ? projects : projects.filter((p) => p.category === activeCategory);

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const prev = () => setLightboxIndex((i) => (i !== null ? (i - 1 + filtered.length) % filtered.length : null));
  const next = () => setLightboxIndex((i) => (i !== null ? (i + 1) % filtered.length : null));

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") next();
      if (e.key === "ArrowRight") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIndex]);

  return (
    <section id="projects" className="py-24 relative overflow-hidden" style={{ background: "#EDE8E0" }} ref={ref}>
      {/* bg pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
          {Array.from({ length: 12 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={`${(i / 11) * 100}%`} x2="100%" y2={`${(i / 11) * 100}%`} stroke="#1A1A2E" strokeWidth="1" />
          ))}
          {Array.from({ length: 16 }).map((_, i) => (
            <line key={`v${i}`} x1={`${(i / 15) * 100}%`} y1="0" x2={`${(i / 15) * 100}%`} y2="100%" stroke="#1A1A2E" strokeWidth="1" />
          ))}
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10" style={{ direction: "rtl" }}>
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{ background: "rgba(232,160,32,0.1)", border: "1px solid rgba(232,160,32,0.25)" }}
          >
            <span style={{ fontFamily: "Tajawal, sans-serif", fontSize: "13px", color: "#C47B1A", fontWeight: 600 }}>
              أعمالنا السابقة
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{ fontFamily: "Tajawal, sans-serif", fontWeight: 900, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#1A1A2E", marginBottom: "0.75rem" }}
          >
            معرض مشاريعنا
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ fontFamily: "Noto Sans Arabic, sans-serif", fontSize: "16px", color: "#4A4A6A", maxWidth: "500px", margin: "0 auto" }}
          >
            نماذج من مشاريعنا المنجزة في مجال الإنشاءات والبناء
          </motion.p>
        </div>

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-5 py-2 rounded-xl transition-all duration-300"
              style={{
                fontFamily: "Tajawal, sans-serif",
                fontWeight: 600,
                fontSize: "14px",
                border: "none",
                cursor: "pointer",
                background: activeCategory === cat ? "linear-gradient(135deg, #E8A020, #C47B1A)" : "rgba(255,255,255,0.7)",
                color: activeCategory === cat ? "white" : "#4A4A6A",
                boxShadow: activeCategory === cat ? "0 4px 16px rgba(232,160,32,0.35)" : "0 2px 8px rgba(26,26,46,0.06)",
              }}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className={`relative group overflow-hidden rounded-2xl cursor-pointer ${i === 0 ? "md:col-span-2" : ""}`}
              style={{
                aspectRatio: i === 0 ? "16/9" : "4/3",
                boxShadow: "0 8px 32px rgba(26,26,46,0.12)",
              }}
              onClick={() => openLightbox(i)}
              whileHover={{ y: -4 }}
            >
              <img
                src={project.src}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 30%, rgba(13,13,26,0.85) 100%)", opacity: 0.7 }} />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center" style={{ background: "rgba(232,160,32,0.12)", backdropFilter: "blur(2px)" }}>
                <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.2)", border: "2px solid rgba(255,255,255,0.5)", backdropFilter: "blur(8px)" }}>
                  <ZoomIn size={22} color="white" />
                </div>
              </div>
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full" style={{ background: "rgba(232,160,32,0.9)", backdropFilter: "blur(8px)" }}>
                <span style={{ fontFamily: "Tajawal, sans-serif", fontSize: "12px", fontWeight: 700, color: "white" }}>{project.category}</span>
              </div>
              <div className="absolute bottom-0 right-0 left-0 p-5">
                <h3 style={{ fontFamily: "Tajawal, sans-serif", fontWeight: 800, fontSize: i === 0 ? "1.25rem" : "1rem", color: "white", marginBottom: "4px" }}>{project.title}</h3>
                <p className="opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-2 group-hover:translate-y-0" style={{ fontFamily: "Noto Sans Arabic, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.85)", lineHeight: 1.6 }}>{project.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-10 rounded-2xl p-6 flex flex-wrap items-center justify-center gap-10"
          style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(20px)", border: "1px solid rgba(232,160,32,0.2)", boxShadow: "0 4px 24px rgba(26,26,46,0.07)" }}
        >
          {[{ num: "7+", label: "مجموعات مشاريع" }, { num: "117", label: "متخصص في الفريق" }, { num: "KSA", label: "المملكة العربية السعودية" }, { num: "100%", label: "التزام بالجودة" }].map((s) => (
            <div key={s.label} className="text-center">
              <div style={{ fontFamily: "JetBrains Mono, monospace", fontWeight: 700, fontSize: "1.8rem", background: "linear-gradient(135deg, #E8A020, #C47B1A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{s.num}</div>
              <div style={{ fontFamily: "Tajawal, sans-serif", fontSize: "13px", color: "#4A4A6A" }}>{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Marquee — last row / admin-managed */}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.7, delay: 0.7 }}>
          <MarqueeStrip />
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            style={{ background: "rgba(13,13,26,0.96)", backdropFilter: "blur(16px)" }}
            onClick={closeLightbox}
          >
            <button onClick={closeLightbox} className="absolute top-5 left-5 w-11 h-11 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", cursor: "pointer" }}>
              <X size={20} color="white" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute right-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "rgba(232,160,32,0.2)", border: "1px solid rgba(232,160,32,0.4)", cursor: "pointer" }}>
              <ChevronRight size={22} color="#E8A020" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute left-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "rgba(232,160,32,0.2)", border: "1px solid rgba(232,160,32,0.4)", cursor: "pointer" }}>
              <ChevronLeft size={22} color="#E8A020" />
            </button>
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={filtered[lightboxIndex].src} alt={filtered[lightboxIndex].title} className="w-full rounded-2xl" style={{ maxHeight: "75vh", objectFit: "contain" }} />
              <div className="mt-4 text-center rounded-xl p-4" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(232,160,32,0.2)" }}>
                <h3 style={{ fontFamily: "Tajawal, sans-serif", fontWeight: 800, fontSize: "1.2rem", color: "white", marginBottom: "4px" }}>{filtered[lightboxIndex].title}</h3>
                <p style={{ fontFamily: "Noto Sans Arabic, sans-serif", fontSize: "14px", color: "#8A9BB0" }}>{filtered[lightboxIndex].desc}</p>
              </div>
              <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full" style={{ background: "rgba(232,160,32,0.85)" }}>
                <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "12px", fontWeight: 700, color: "white" }}>{lightboxIndex + 1} / {filtered.length}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
