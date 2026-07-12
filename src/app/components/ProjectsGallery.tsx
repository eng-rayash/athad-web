import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { X, ZoomIn, ChevronRight, ChevronLeft, ArrowLeft } from "lucide-react";
import { getProjectImages, type ProjectImage } from "../../lib/store";

import img14 from "../../imports/________________1__14.jpg";
import img15 from "../../imports/________________1__15.jpg";
import img16 from "../../imports/________________1__16.jpg";
import img17 from "../../imports/________________1__17.jpg";
import img18 from "../../imports/________________1__18.jpg";
import img19 from "../../imports/________________1__19.jpg";

const STATIC_PROJECTS: ProjectImage[] = [
  { id: "s1", url: img14 as unknown as string, title: "أعمال الأساسات والحديد", category: "الأساسات والخوازيق", desc: "أعمال حديد التسليح وتشكيل القواعد الخرسانية لمشاريع متعددة في الدمام", uploadedAt: "" },
  { id: "s2", url: img15 as unknown as string, title: "أعمال الخرسانة والهياكل", category: "الهياكل الخرسانية", desc: "صب الخرسانة وتنفيذ الهياكل الرئيسية بمعدات ضخ حديثة", uploadedAt: "" },
  { id: "s3", url: img16 as unknown as string, title: "الهياكل المعدنية", category: "الهياكل المعدنية", desc: "تصنيع وتركيب الهياكل المعدنية للمستودعات والمنشآت الصناعية", uploadedAt: "" },
  { id: "s4", url: img17 as unknown as string, title: "الأعمدة والمباني السكنية", category: "مباني سكنية", desc: "تنفيذ أعمال الأعمدة الخرسانية وإنشاء المباني السكنية", uploadedAt: "" },
  { id: "s5", url: img18 as unknown as string, title: "المباني التجارية والمستودعات", category: "مباني تجارية", desc: "إنشاء المباني التجارية ومحطات الوقود والمستودعات", uploadedAt: "" },
  { id: "s6", url: img19 as unknown as string, title: "الفلل والوحدات السكنية", category: "مباني سكنية", desc: "تشييد فلل ووحدات سكنية متكاملة من الهيكل حتى التسليم", uploadedAt: "" },
];

/* ---------- Main Gallery (Homepage Preview) ---------- */
export function ProjectsGallery() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeCategory, setActiveCategory] = useState("الكل");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [displayProjects, setDisplayProjects] = useState<ProjectImage[]>(STATIC_PROJECTS);

  useEffect(() => {
    const load = () => {
      const adminImgs = getProjectImages();
      setDisplayProjects(adminImgs.length > 0 ? adminImgs : STATIC_PROJECTS);
    };
    load();
    const handler = (e: StorageEvent) => { if (e.key === "ub_project_images") load(); };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  const availCats = ["الكل", ...Array.from(new Set(displayProjects.map((p) => p.category)))];

  const filtered = (activeCategory === "الكل"
    ? displayProjects
    : displayProjects.filter((p) => p.category === activeCategory)
  ).slice(0, 6); // Max 6 items on home

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
            نماذج من مشاريعنا المنجزة في مجال الإنشاءات والبناء والتشطيبات
          </motion.p>
        </div>

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {availCats.slice(0, 7).map((cat) => (
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
                src={project.url}
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

        {/* View All Gallery CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="text-center mt-10"
        >
          <a
            href="/#/gallery"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            style={{
              background: "linear-gradient(135deg, #1A1A2E, #0D0D1A)",
              color: "white",
              fontFamily: "Tajawal, sans-serif",
              fontWeight: 700,
              fontSize: "16px",
              textDecoration: "none",
              border: "1px solid rgba(232,160,32,0.3)",
              boxShadow: "0 8px 32px rgba(26,26,46,0.2)",
            }}
          >
            <span>عرض معرض الأعمال كاملاً</span>
            <ArrowLeft size={18} color="#E8A020" style={{ transform: "rotate(180deg)" }} />
          </a>
          <p style={{ fontFamily: "Noto Sans Arabic, sans-serif", fontSize: "13px", color: "#8A9BB0", marginTop: "10px" }}>
            {displayProjects.length > 6 ? `${displayProjects.length - 6} مشروع إضافي في المعرض` : "تصفح جميع التصنيفات والمشاريع"}
          </p>
        </motion.div>

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
              <img src={filtered[lightboxIndex].url} alt={filtered[lightboxIndex].title} className="w-full rounded-2xl" style={{ maxHeight: "75vh", objectFit: "contain" }} />
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
