import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { X, ZoomIn, ChevronRight, ChevronLeft, LayoutGrid, Filter } from "lucide-react";
import { getProjectImages, getMarqueeImages, type MarqueeImage, type ProjectImage } from "../../lib/store";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { WhatsAppFloat } from "./WhatsAppFloat";

import img14 from "../../imports/________________1__14.jpg";
import img15 from "../../imports/________________1__15.jpg";
import img16 from "../../imports/________________1__16.jpg";
import img17 from "../../imports/________________1__17.jpg";
import img18 from "../../imports/________________1__18.jpg";
import img19 from "../../imports/________________1__19.jpg";
import img20 from "../../imports/________________1__20.jpg";

// ---- Default static projects (fallback) ----
const STATIC_PROJECTS: ProjectImage[] = [
  { id: "s1", url: img14 as unknown as string, title: "أعمال الأساسات والحديد", category: "الأساسات والخوازيق", desc: "أعمال حديد التسليح وتشكيل القواعد الخرسانية لمشاريع متعددة في الدمام", uploadedAt: "" },
  { id: "s2", url: img15 as unknown as string, title: "أعمال الخرسانة والهياكل", category: "الهياكل الخرسانية", desc: "صب الخرسانة وتنفيذ الهياكل الرئيسية بمعدات ضخ حديثة", uploadedAt: "" },
  { id: "s3", url: img16 as unknown as string, title: "الهياكل المعدنية", category: "الهياكل المعدنية", desc: "تصنيع وتركيب الهياكل المعدنية للمستودعات والمنشآت الصناعية", uploadedAt: "" },
  { id: "s4", url: img17 as unknown as string, title: "الأعمدة والمباني السكنية", category: "مباني سكنية", desc: "تنفيذ أعمال الأعمدة الخرسانية وإنشاء المباني السكنية", uploadedAt: "" },
  { id: "s5", url: img18 as unknown as string, title: "المباني التجارية والمستودعات", category: "مباني تجارية", desc: "إنشاء المباني التجارية ومحطات الوقود والمستودعات", uploadedAt: "" },
  { id: "s6", url: img19 as unknown as string, title: "الفلل والوحدات السكنية", category: "مباني سكنية", desc: "تشييد فلل ووحدات سكنية متكاملة من الهيكل حتى التسليم", uploadedAt: "" },
  { id: "s7", url: img20 as unknown as string, title: "مشاريع متنوعة", category: "أعمال متنوعة", desc: "مجموعة متنوعة من المشاريع تشمل المساجد والمباني العامة", uploadedAt: "" },
];

// ---- Marquee strip ----
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

  const allSrcs: string[] = adminImages.length > 0
    ? adminImages.map((img) => img.url)
    : DEFAULT_MARQUEE_SRCS as unknown as string[];
  const doubled = [...allSrcs, ...allSrcs];

  return (
    <div className="overflow-hidden rounded-2xl relative mt-6">
      <div className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, #0D0D1A, transparent)" }} />
      <div className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, #0D0D1A, transparent)" }} />
      <div className="flex items-center gap-3 mb-4">
        <div className="h-px flex-1" style={{ background: "rgba(232,160,32,0.2)" }} />
        <span style={{ fontFamily: "Tajawal, sans-serif", fontSize: "12px", fontWeight: 700, color: "#C47B1A", whiteSpace: "nowrap" }}>
          ⚡ أحدث الأعمال
        </span>
        <div className="h-px flex-1" style={{ background: "rgba(232,160,32,0.2)" }} />
      </div>
      <div style={{ display: "flex", gap: "12px", animation: "marqueeScrollGallery 32s linear infinite", width: "max-content" }}>
        {doubled.map((src, i) => (
          <div key={i} style={{ width: "200px", height: "130px", borderRadius: "12px", overflow: "hidden", flexShrink: 0, border: "1px solid rgba(232,160,32,0.15)", boxShadow: "0 4px 16px rgba(0,0,0,0.3)" }}>
            <img src={src as unknown as string} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </div>
        ))}
      </div>
      <style>{`@keyframes marqueeScrollGallery { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>
    </div>
  );
}

// ---- Category badge color map ----
const CATEGORY_COLORS: Record<string, string> = {
  "الكل": "#E8A020",
  "أعمال الحفر والترابية": "#8B5CF6",
  "الأساسات والخوازيق": "#6366F1",
  "الهياكل الخرسانية": "#3B82F6",
  "الهياكل المعدنية": "#0EA5E9",
  "مباني سكنية": "#10B981",
  "مباني تجارية": "#F59E0B",
  "مستودعات وصناعية": "#F97316",
  "مساجد ومبانٍ حكومية": "#EAB308",
  "التشطيبات الداخلية": "#EC4899",
  "الواجهات والتشطيب الخارجي": "#F43F5E",
  "أعمال الديكور": "#A855F7",
  "الأرضيات والبلاط": "#84CC16",
  "الكهرباء والإنارة": "#FBBF24",
  "السباكة وصرف المياه": "#06B6D4",
  "التكييف والتهوية": "#22D3EE",
  "الإطفاء والإنذار": "#EF4444",
  "المسابح والملاحق": "#14B8A6",
  "أعمال الطرق والأرصفة": "#78716C",
  "تنسيق المواقع": "#22C55E",
  "صيانة وترميم": "#A78BFA",
  "أعمال متنوعة": "#94A3B8",
};

function getCatColor(cat: string) {
  return CATEGORY_COLORS[cat] ?? "#E8A020";
}

// ---- Lightbox ----
function Lightbox({ images, index, onClose, onPrev, onNext }: {
  images: ProjectImage[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const img = images[index];
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onNext();
      if (e.key === "ArrowRight") onPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [index, onClose, onPrev, onNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: "rgba(10,10,22,0.97)", backdropFilter: "blur(24px)" }}
      onClick={onClose}
    >
      {/* Close */}
      <button onClick={onClose} className="absolute top-5 left-5 w-11 h-11 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", cursor: "pointer" }}>
        <X size={20} color="white" />
      </button>

      {/* Counter */}
      <div className="absolute top-5 right-5 px-4 py-2 rounded-full" style={{ background: "rgba(232,160,32,0.15)", border: "1px solid rgba(232,160,32,0.3)" }}>
        <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "13px", fontWeight: 700, color: "#E8A020" }}>
          {index + 1} / {images.length}
        </span>
      </div>

      {/* Prev */}
      <button onClick={(e) => { e.stopPropagation(); onPrev(); }} className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "rgba(232,160,32,0.15)", border: "1px solid rgba(232,160,32,0.3)", cursor: "pointer" }}>
        <ChevronRight size={24} color="#E8A020" />
      </button>

      {/* Next */}
      <button onClick={(e) => { e.stopPropagation(); onNext(); }} className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "rgba(232,160,32,0.15)", border: "1px solid rgba(232,160,32,0.3)", cursor: "pointer" }}>
        <ChevronLeft size={24} color="#E8A020" />
      </button>

      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.92, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92 }}
        transition={{ duration: 0.25 }}
        className="relative max-w-5xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <img src={img.url} alt={img.title} className="w-full rounded-2xl" style={{ maxHeight: "72vh", objectFit: "contain", boxShadow: "0 32px 80px rgba(0,0,0,0.6)" }} />
        <div className="mt-4 rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(232,160,32,0.2)", backdropFilter: "blur(12px)" }}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 style={{ fontFamily: "Tajawal, sans-serif", fontWeight: 800, fontSize: "1.2rem", color: "white", marginBottom: "6px" }}>{img.title}</h3>
              {img.desc && <p style={{ fontFamily: "Noto Sans Arabic, sans-serif", fontSize: "14px", color: "#8A9BB0", lineHeight: 1.7 }}>{img.desc}</p>}
            </div>
            <span className="px-3 py-1.5 rounded-full flex-shrink-0" style={{ background: `${getCatColor(img.category)}20`, border: `1px solid ${getCatColor(img.category)}40`, fontFamily: "Tajawal, sans-serif", fontSize: "12px", fontWeight: 700, color: getCatColor(img.category), whiteSpace: "nowrap" }}>
              {img.category}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ---- Main Gallery Page ----
export default function GalleryPage() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  const [allProjects, setAllProjects] = useState<ProjectImage[]>([]);
  const [isUsingAdminData, setIsUsingAdminData] = useState(false);
  const [activeCategory, setActiveCategory] = useState("الكل");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const load = () => {
    const adminImgs = getProjectImages();
    if (adminImgs.length > 0) {
      setAllProjects(adminImgs.sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));
      setIsUsingAdminData(true);
    } else {
      setAllProjects(STATIC_PROJECTS);
      setIsUsingAdminData(false);
    }
  };

  useEffect(() => {
    load();
    const handler = (e: StorageEvent) => { if (e.key === "ub_project_images") load(); };
    window.addEventListener("storage", handler);
    window.scrollTo({ top: 0, behavior: "instant" });
    document.documentElement.setAttribute("dir", "rtl");
    document.documentElement.setAttribute("lang", "ar");
    document.title = "معرض الأعمال — اتحاد البناء للمقاولات العامة";
    return () => window.removeEventListener("storage", handler);
  }, []);

  const availableCats = ["الكل", ...Array.from(new Set(allProjects.map((p) => p.category)))];
  const filtered = activeCategory === "الكل" ? allProjects : allProjects.filter((p) => p.category === activeCategory);
  const totalCats = new Set(allProjects.map((p) => p.category)).size;

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const prev = () => setLightboxIndex((i) => (i !== null ? (i - 1 + filtered.length) % filtered.length : null));
  const next = () => setLightboxIndex((i) => (i !== null ? (i + 1) % filtered.length : null));

  return (
    <div className="min-h-screen" style={{ fontFamily: "Tajawal, Noto Sans Arabic, sans-serif", overflowX: "hidden", background: "#0A0A16" }}>
      <Navbar dark />

      {/* Hero Header */}
      <div ref={headerRef} className="relative pt-32 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(232,160,32,0.12) 0%, transparent 70%)" }} />
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
          <svg className="w-full h-full">
            <pattern id="gp" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#E8A020" strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#gp)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{ background: "rgba(232,160,32,0.1)", border: "1px solid rgba(232,160,32,0.25)" }}
          >
            <LayoutGrid size={14} color="#E8A020" />
            <span style={{ fontFamily: "Tajawal, sans-serif", fontSize: "13px", color: "#C47B1A", fontWeight: 600 }}>معرض أعمالنا</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{ fontFamily: "Tajawal, sans-serif", fontWeight: 900, fontSize: "clamp(2.2rem, 5vw, 3.5rem)", color: "#F8F5F0", marginBottom: "1rem", lineHeight: 1.2 }}
          >
            مشاريعنا المنجزة
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ fontFamily: "Noto Sans Arabic, sans-serif", fontSize: "17px", color: "#8A9BB0", maxWidth: "560px", margin: "0 auto 2rem", lineHeight: 1.8 }}
          >
            نماذج من أعمالنا المنجزة في مختلف مجالات البناء والإنشاءات والتجهيز والتشطيبات
          </motion.p>

          {/* Quick stats */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            {[
              { num: `${allProjects.length}+`, label: "مشروع موثّق" },
              { num: `${totalCats}`, label: "تصنيف عمل" },
              { num: isUsingAdminData ? "محدّث" : "نموذج", label: isUsingAdminData ? "تلقائياً" : "عرض" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2 px-4 py-2 rounded-xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <span style={{ fontFamily: "JetBrains Mono, monospace", fontWeight: 700, fontSize: "1.3rem", background: "linear-gradient(135deg, #E8A020, #C47B1A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{s.num}</span>
                <span style={{ fontFamily: "Tajawal, sans-serif", fontSize: "13px", color: "#4A4A6A" }}>{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Sticky Filter Bar */}
      <div className="sticky top-[64px] z-40 px-6 py-3" style={{ background: "rgba(10,10,22,0.95)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-2 lg:hidden">
            <span style={{ fontFamily: "Tajawal, sans-serif", fontSize: "14px", color: "#8A9BB0" }}>{filtered.length} مشروع</span>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
              style={{ background: "rgba(232,160,32,0.1)", border: "1px solid rgba(232,160,32,0.2)", color: "#E8A020", fontFamily: "Tajawal, sans-serif", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}
            >
              <Filter size={14} />
              تصفية
            </button>
          </div>

          <div className={`${showFilters ? "flex" : "hidden lg:flex"} flex-wrap gap-2 overflow-x-auto pb-1`} style={{ scrollbarWidth: "none" }}>
            {availableCats.map((cat) => {
              const color = getCatColor(cat);
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); setShowFilters(false); }}
                  className="flex-shrink-0 px-4 py-1.5 rounded-full transition-all duration-200"
                  style={{
                    fontFamily: "Tajawal, sans-serif",
                    fontWeight: active ? 700 : 500,
                    fontSize: "13px",
                    border: `1px solid ${active ? color : "rgba(255,255,255,0.1)"}`,
                    background: active ? `${color}20` : "rgba(255,255,255,0.04)",
                    color: active ? color : "#8A9BB0",
                    cursor: "pointer",
                    boxShadow: active ? `0 0 12px ${color}25` : "none",
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {filtered.length === 0 ? (
          <div className="text-center py-24" style={{ color: "#4A4A6A", fontFamily: "Tajawal, sans-serif" }}>
            <LayoutGrid size={48} className="mx-auto mb-4 opacity-20" />
            <p style={{ fontSize: "18px", fontWeight: 600 }}>لا توجد مشاريع في هذا التصنيف</p>
            <p style={{ fontSize: "14px", marginTop: "8px" }}>اختر تصنيفاً آخر أو ارفع صوراً من لوحة التحكم</p>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => {
                const color = getCatColor(project.category);
                const isFeatured = i === 0;
                return (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.94, y: 16 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.94 }}
                    transition={{ duration: 0.35, delay: Math.min(i * 0.05, 0.3) }}
                    className={`relative group overflow-hidden rounded-2xl cursor-pointer ${isFeatured ? "sm:col-span-2 lg:col-span-2" : ""}`}
                    style={{
                      aspectRatio: "4/3",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                    onClick={() => openLightbox(i)}
                    whileHover={{ y: -4, boxShadow: "0 16px 48px rgba(0,0,0,0.5)" }}
                  >
                    <img
                      src={project.url}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 40%, rgba(10,10,22,0.92) 100%)" }} />

                    {/* Hover overlay */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                      style={{ background: `${color}18`, backdropFilter: "blur(2px)" }}>
                      <div className="w-14 h-14 rounded-full flex items-center justify-center"
                        style={{ background: "rgba(255,255,255,0.15)", border: "2px solid rgba(255,255,255,0.4)", backdropFilter: "blur(8px)" }}>
                        <ZoomIn size={22} color="white" />
                      </div>
                    </div>

                    {/* Category badge */}
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full"
                      style={{ background: `${color}CC`, backdropFilter: "blur(8px)" }}>
                      <span style={{ fontFamily: "Tajawal, sans-serif", fontSize: "11px", fontWeight: 700, color: "white" }}>{project.category}</span>
                    </div>

                    {/* Title */}
                    <div className="absolute bottom-0 right-0 left-0 p-4">
                      <h3 style={{ fontFamily: "Tajawal, sans-serif", fontWeight: 800, fontSize: isFeatured ? "1.1rem" : "0.9rem", color: "white", marginBottom: "4px", textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}>
                        {project.title}
                      </h3>
                      {project.desc && (
                        <p className="opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-2 group-hover:translate-y-0"
                          style={{ fontFamily: "Noto Sans Arabic, sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.8)", lineHeight: 1.6 }}>
                          {project.desc}
                        </p>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

        {filtered.length > 0 && (
          <div className="text-center mt-8">
            <span style={{ fontFamily: "Tajawal, sans-serif", fontSize: "14px", color: "#4A4A6A" }}>
              عرض {filtered.length} مشروع{activeCategory !== "الكل" && ` في تصنيف "${activeCategory}"`}
            </span>
          </div>
        )}

        {/* Marquee bottom strip */}
        <div className="mt-16">
          <MarqueeStrip />
        </div>
      </main>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={filtered}
            index={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prev}
            onNext={next}
          />
        )}
      </AnimatePresence>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
