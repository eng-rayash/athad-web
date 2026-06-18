import { useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router";
import {
  LayoutDashboard, Images, Sliders, Building2, Wrench, Users, Settings, LogOut, ExternalLink, Menu, X, Upload, Trash2, Plus, Save, RefreshCw, CheckCircle, AlertCircle, Phone, Mail, MapPin,
} from "lucide-react";
import { useMarqueeImages, useCompanyInfo, useProjectImages } from "../../lib/store";
import { uploadToImageKit, IK_CONFIG } from "../../lib/imagekit";
import { LogoMark } from "../components/Logo";

// ---------- helpers ----------
function Pill({ color, label }: { color: string; label: string }) {
  return (
    <span className="px-2 py-0.5 rounded-md text-xs font-semibold" style={{ background: `${color}20`, color, border: `1px solid ${color}40`, fontFamily: "JetBrains Mono, monospace" }}>
      {label}
    </span>
  );
}

function Toast({ msg, type }: { msg: string; type: "success" | "error" }) {
  return (
    <div
      className="fixed top-5 right-5 z-[200] flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl"
      style={{ background: type === "success" ? "#16a34a" : "#dc2626", color: "white", fontFamily: "Tajawal, sans-serif", fontSize: "15px", fontWeight: 600 }}
    >
      {type === "success" ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
      {msg}
    </div>
  );
}

// ---------- Sidebar ----------
const navItems = [
  { path: "/admin", icon: LayoutDashboard, label: "لوحة التحكم" },
  { path: "/admin/marquee", icon: Sliders, label: "الشريط المتحرك" },
  { path: "/admin/projects", icon: Images, label: "صور المشاريع" },
  { path: "/admin/company", icon: Building2, label: "بيانات الشركة" },
  { path: "/admin/equipment", icon: Wrench, label: "المعدات" },
  { path: "/admin/workforce", icon: Users, label: "الكوادر" },
  { path: "/admin/settings", icon: Settings, label: "الإعدادات" },
];

function Sidebar({ open, onClose, onLogout }: { open: boolean; onClose: () => void; onLogout: () => void }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      {/* Overlay mobile */}
      {open && <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={onClose} />}

      <aside
        className={`fixed top-0 right-0 h-full z-50 flex flex-col transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full lg:translate-x-0"}`}
        style={{ width: "260px", background: "#0D0D1A", borderLeft: "1px solid rgba(232,160,32,0.15)" }}
      >
        {/* Logo */}
        <div className="p-6 flex items-center justify-between border-b" style={{ borderColor: "rgba(232,160,32,0.12)" }}>
          <div className="flex items-center gap-3">
            <LogoMark size={38} />
            <div>
              <div style={{ fontFamily: "Tajawal, sans-serif", fontWeight: 800, fontSize: "13px", color: "#F8F5F0" }}>لوحة التحكم</div>
              <div style={{ fontFamily: "Tajawal, sans-serif", fontSize: "10px", color: "#4A4A6A" }}>اتحاد البناء</div>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden" style={{ background: "none", border: "none", cursor: "pointer", color: "#8A9BB0" }}>
            <X size={20} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path || (item.path !== "/admin" && location.pathname.startsWith(item.path));
            return (
              <button
                key={item.path}
                onClick={() => { navigate(item.path); onClose(); }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200"
                style={{
                  background: active ? "rgba(232,160,32,0.12)" : "transparent",
                  border: active ? "1px solid rgba(232,160,32,0.25)" : "1px solid transparent",
                  color: active ? "#E8A020" : "#8A9BB0",
                  fontFamily: "Tajawal, sans-serif",
                  fontWeight: active ? 700 : 500,
                  fontSize: "14px",
                  cursor: "pointer",
                  textAlign: "right",
                  direction: "rtl",
                }}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Footer actions */}
        <div className="p-4 border-t space-y-2" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <button
            onClick={() => window.open("/#/", "_blank")}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl"
            style={{ background: "rgba(232,160,32,0.08)", color: "#E8A020", fontFamily: "Tajawal, sans-serif", fontSize: "13px", fontWeight: 600, border: "1px solid rgba(232,160,32,0.2)", cursor: "pointer", direction: "rtl", textAlign: "right" }}
          >
            <ExternalLink size={15} />
            عرض الموقع
          </button>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl"
            style={{ background: "rgba(239,68,68,0.08)", color: "#EF4444", fontFamily: "Tajawal, sans-serif", fontSize: "13px", fontWeight: 600, border: "1px solid rgba(239,68,68,0.2)", cursor: "pointer", direction: "rtl", textAlign: "right" }}
          >
            <LogOut size={15} />
            تسجيل الخروج
          </button>
        </div>
      </aside>
    </>
  );
}

// ---------- Dashboard ----------
function Dashboard() {
  const { images: marquee } = useMarqueeImages();
  const { images: projectImgs } = useProjectImages();
  const { info } = useCompanyInfo();

  const stats = [
    { label: "صور الشريط المتحرك", value: marquee.length, icon: Sliders, color: "#E8A020" },
    { label: "صور المشاريع المرفوعة", value: projectImgs.length, icon: Images, color: "#8A9BB0" },
    { label: "رقم التواصل", value: info.phone, icon: Phone, color: "#C47B1A", small: true },
    { label: "البريد الإلكتروني", value: info.email, icon: Mail, color: "#B5956A", small: true },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 style={{ fontFamily: "Tajawal, sans-serif", fontWeight: 900, fontSize: "1.8rem", color: "#F8F5F0" }}>مرحباً بك في لوحة التحكم</h1>
        <p style={{ fontFamily: "Tajawal, sans-serif", fontSize: "14px", color: "#4A4A6A", marginTop: "4px" }}>إدارة شاملة لموقع شركة اتحاد البناء للمقاولات العامة</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${s.color}15` }}>
                  <Icon size={16} color={s.color} />
                </div>
                <span style={{ fontFamily: "Tajawal, sans-serif", fontSize: "12px", color: "#4A4A6A" }}>{s.label}</span>
              </div>
              <div style={{ fontFamily: s.small ? "JetBrains Mono, monospace" : "JetBrains Mono, monospace", fontWeight: 700, fontSize: s.small ? "13px" : "2rem", color: s.color, wordBreak: "break-all" }}>
                {s.value}
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick guide */}
      <div className="rounded-2xl p-6" style={{ background: "rgba(232,160,32,0.06)", border: "1px solid rgba(232,160,32,0.2)" }}>
        <h3 style={{ fontFamily: "Tajawal, sans-serif", fontWeight: 700, fontSize: "1rem", color: "#E8A020", marginBottom: "1rem" }}>دليل سريع</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { title: "الشريط المتحرك", desc: "ارفع صوراً جديدة لتظهر في الشريط المتحرك أسفل معرض المشاريع" },
            { title: "صور المشاريع", desc: "رفع صور المشاريع إلى ImageKit وإدارتها" },
            { title: "بيانات الشركة", desc: "تحديث معلومات الاتصال والبيانات الرئيسية للشركة" },
            { title: "المعدات والكوادر", desc: "تعديل قائمة المعدات وبيانات الكوادر البشرية" },
          ].map((item) => (
            <div key={item.title} className="flex gap-3">
              <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: "#E8A020" }} />
              <div>
                <div style={{ fontFamily: "Tajawal, sans-serif", fontWeight: 700, fontSize: "14px", color: "#F8F5F0" }}>{item.title}</div>
                <div style={{ fontFamily: "Noto Sans Arabic, sans-serif", fontSize: "13px", color: "#4A4A6A", lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------- Marquee Manager ----------
function MarqueeManager() {
  const { images, add, remove } = useMarqueeImages();
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [caption, setCaption] = useState("");

  const showToast = (msg: string, type: "success" | "error") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploading(true);
    try {
      for (const file of files) {
        const result = await uploadToImageKit(file, `marquee_${Date.now()}_${file.name}`, "marquee");
        add({ url: result.url, caption });
      }
      showToast(`تم رفع ${files.length} صورة بنجاح`, "success");
      setCaption("");
    } catch (err) {
      showToast("فشل الرفع — تحقق من الاتصال وبيانات ImageKit", "error");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div className="space-y-6">
      {toast && <Toast msg={toast.msg} type={toast.type} />}
      <div>
        <h1 style={{ fontFamily: "Tajawal, sans-serif", fontWeight: 900, fontSize: "1.6rem", color: "#F8F5F0" }}>الشريط المتحرك</h1>
        <p style={{ fontFamily: "Tajawal, sans-serif", fontSize: "14px", color: "#4A4A6A" }}>الصور المرفوعة هنا تظهر في الشريط المتحرك أسفل معرض المشاريع</p>
      </div>

      {/* Upload zone */}
      <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.04)", border: "2px dashed rgba(232,160,32,0.3)" }}>
        <div className="text-center mb-4">
          <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3" style={{ background: "rgba(232,160,32,0.1)" }}>
            <Upload size={24} color="#E8A020" />
          </div>
          <p style={{ fontFamily: "Tajawal, sans-serif", fontWeight: 700, fontSize: "15px", color: "#F8F5F0" }}>رفع صور إلى ImageKit</p>
          <p style={{ fontFamily: "Tajawal, sans-serif", fontSize: "13px", color: "#4A4A6A" }}>JPG, PNG, WebP — يمكن تحديد أكثر من ملف</p>
        </div>
        <input
          type="text"
          placeholder="وصف اختياري للصور"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="w-full px-4 py-3 rounded-xl mb-4 outline-none"
          style={{ fontFamily: "Tajawal, sans-serif", fontSize: "14px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#F8F5F0", textAlign: "right" }}
        />
        <label
          className="flex items-center justify-center gap-3 py-3 px-6 rounded-xl cursor-pointer transition-all hover:scale-[1.02]"
          style={{ background: uploading ? "rgba(232,160,32,0.3)" : "linear-gradient(135deg, #E8A020, #C47B1A)", color: "white", fontFamily: "Tajawal, sans-serif", fontWeight: 700, fontSize: "15px" }}
        >
          {uploading ? <RefreshCw size={18} className="animate-spin" /> : <Plus size={18} />}
          {uploading ? "جاري الرفع..." : "اختر الصور"}
          <input type="file" accept="image/*" multiple onChange={handleFile} className="hidden" disabled={uploading} />
        </label>
      </div>

      {/* Images grid */}
      {images.length === 0 ? (
        <div className="text-center py-12" style={{ color: "#4A4A6A", fontFamily: "Tajawal, sans-serif" }}>
          لا توجد صور بعد — ارفع صورك لتظهر في الشريط المتحرك
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img) => (
            <div key={img.id} className="relative group rounded-xl overflow-hidden" style={{ aspectRatio: "3/2", border: "1px solid rgba(232,160,32,0.15)" }}>
              <img src={img.url} alt={img.caption} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  onClick={() => remove(img.id)}
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: "#dc2626", border: "none", cursor: "pointer" }}
                >
                  <Trash2 size={16} color="white" />
                </button>
              </div>
              {img.caption && (
                <div className="absolute bottom-0 right-0 left-0 px-2 py-1" style={{ background: "rgba(0,0,0,0.7)" }}>
                  <span style={{ fontFamily: "Tajawal, sans-serif", fontSize: "11px", color: "white" }}>{img.caption}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ---------- Projects Image Manager ----------
function ProjectsManager() {
  const { images, add, remove } = useProjectImages();
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [form, setForm] = useState({ title: "", category: "مباني سكنية", desc: "" });

  const showToast = (msg: string, type: "success" | "error") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const categories = ["أساسات", "هياكل", "مباني سكنية", "تجاري", "متنوعة"];

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    if (!form.title) { showToast("أدخل عنوان المشروع أولاً", "error"); return; }
    setUploading(true);
    try {
      for (const file of files) {
        const result = await uploadToImageKit(file, `project_${Date.now()}_${file.name}`, "projects");
        add({ url: result.url, title: form.title, category: form.category, desc: form.desc, migratedToIK: true });
      }
      showToast("تم رفع صور المشروع بنجاح", "success");
      setForm({ title: "", category: "مباني سكنية", desc: "" });
    } catch {
      showToast("فشل الرفع — تحقق من الاتصال", "error");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div className="space-y-6">
      {toast && <Toast msg={toast.msg} type={toast.type} />}
      <div>
        <h1 style={{ fontFamily: "Tajawal, sans-serif", fontWeight: 900, fontSize: "1.6rem", color: "#F8F5F0" }}>صور المشاريع</h1>
        <p style={{ fontFamily: "Tajawal, sans-serif", fontSize: "14px", color: "#4A4A6A" }}>رفع وإدارة صور مشاريع الشركة عبر ImageKit</p>
      </div>

      {/* Upload form */}
      <div className="rounded-2xl p-6 space-y-4" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(232,160,32,0.2)" }}>
        <h3 style={{ fontFamily: "Tajawal, sans-serif", fontWeight: 700, fontSize: "1rem", color: "#F8F5F0" }}>رفع مشروع جديد</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label style={{ fontFamily: "Tajawal, sans-serif", fontSize: "12px", color: "#8A9BB0", display: "block", marginBottom: "6px" }}>عنوان المشروع *</label>
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-4 py-3 rounded-xl outline-none"
              style={{ fontFamily: "Tajawal, sans-serif", fontSize: "14px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#F8F5F0", textAlign: "right" }}
            />
          </div>
          <div>
            <label style={{ fontFamily: "Tajawal, sans-serif", fontSize: "12px", color: "#8A9BB0", display: "block", marginBottom: "6px" }}>التصنيف</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full px-4 py-3 rounded-xl outline-none"
              style={{ fontFamily: "Tajawal, sans-serif", fontSize: "14px", background: "#1A1A2E", border: "1px solid rgba(255,255,255,0.1)", color: "#F8F5F0", textAlign: "right", cursor: "pointer" }}
            >
              {categories.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label style={{ fontFamily: "Tajawal, sans-serif", fontSize: "12px", color: "#8A9BB0", display: "block", marginBottom: "6px" }}>وصف المشروع</label>
          <textarea
            value={form.desc}
            onChange={(e) => setForm({ ...form, desc: e.target.value })}
            rows={2}
            className="w-full px-4 py-3 rounded-xl outline-none resize-none"
            style={{ fontFamily: "Noto Sans Arabic, sans-serif", fontSize: "13px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#F8F5F0", textAlign: "right" }}
          />
        </div>
        <label
          className="inline-flex items-center gap-2 py-3 px-6 rounded-xl cursor-pointer"
          style={{ background: uploading ? "rgba(232,160,32,0.3)" : "linear-gradient(135deg, #E8A020, #C47B1A)", color: "white", fontFamily: "Tajawal, sans-serif", fontWeight: 700, fontSize: "14px" }}
        >
          {uploading ? <RefreshCw size={16} className="animate-spin" /> : <Upload size={16} />}
          {uploading ? "جاري الرفع..." : "رفع الصور"}
          <input type="file" accept="image/*" multiple onChange={handleFile} className="hidden" disabled={uploading} />
        </label>
      </div>

      {/* Uploaded images */}
      {images.length > 0 && (
        <div>
          <h3 style={{ fontFamily: "Tajawal, sans-serif", fontWeight: 700, fontSize: "1rem", color: "#F8F5F0", marginBottom: "1rem" }}>الصور المرفوعة ({images.length})</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((img) => (
              <div key={img.id} className="relative group rounded-xl overflow-hidden" style={{ border: "1px solid rgba(232,160,32,0.15)" }}>
                <img src={img.url} alt={img.title} className="w-full object-cover" style={{ aspectRatio: "4/3" }} />
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                  <Pill color="#E8A020" label={img.category} />
                  <button onClick={() => remove(img.id)} className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "#dc2626", border: "none", cursor: "pointer" }}>
                    <Trash2 size={16} color="white" />
                  </button>
                </div>
                <div className="p-2" style={{ background: "rgba(13,13,26,0.9)" }}>
                  <div style={{ fontFamily: "Tajawal, sans-serif", fontSize: "12px", fontWeight: 600, color: "#F8F5F0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{img.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ---------- Company Info ----------
function CompanyInfoPage() {
  const { info, save } = useCompanyInfo();
  const [draft, setDraft] = useState(info);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const fields = [
    { key: "nameAr", label: "اسم الشركة (عربي)", icon: Building2 },
    { key: "nameEn", label: "Company Name (English)", icon: Building2 },
    { key: "phone", label: "رقم الهاتف", icon: Phone },
    { key: "email", label: "البريد الإلكتروني", icon: Mail },
    { key: "address", label: "العنوان", icon: MapPin },
    { key: "commercialReg", label: "السجل التجاري", icon: Building2 },
    { key: "whatsapp", label: "رقم واتساب (مع رمز الدولة)", icon: Phone },
    { key: "affiliatePhone", label: "هاتف مؤسسة العتيق", icon: Phone },
    { key: "affiliateEmail", label: "بريد مؤسسة العتيق", icon: Mail },
  ] as const;

  const handleSave = () => {
    save(draft);
    setToast({ msg: "تم حفظ البيانات بنجاح", type: "success" });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="space-y-6">
      {toast && <Toast msg={toast.msg} type={toast.type} />}
      <div>
        <h1 style={{ fontFamily: "Tajawal, sans-serif", fontWeight: 900, fontSize: "1.6rem", color: "#F8F5F0" }}>بيانات الشركة</h1>
        <p style={{ fontFamily: "Tajawal, sans-serif", fontSize: "14px", color: "#4A4A6A" }}>تحديث المعلومات الأساسية للشركة</p>
      </div>

      <div className="rounded-2xl p-6 space-y-5" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(232,160,32,0.15)" }}>
        {fields.map(({ key, label, icon: Icon }) => (
          <div key={key}>
            <label className="flex items-center gap-2 mb-2" style={{ fontFamily: "Tajawal, sans-serif", fontSize: "13px", color: "#8A9BB0" }}>
              <Icon size={14} color="#E8A020" />
              {label}
            </label>
            <input
              value={draft[key]}
              onChange={(e) => setDraft({ ...draft, [key]: e.target.value })}
              className="w-full px-4 py-3 rounded-xl outline-none"
              style={{ fontFamily: key === "nameAr" || key === "address" ? "Tajawal, sans-serif" : "JetBrains Mono, monospace", fontSize: "14px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#F8F5F0", textAlign: "right" }}
            />
          </div>
        ))}

        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-3 rounded-xl"
          style={{ background: "linear-gradient(135deg, #E8A020, #C47B1A)", color: "white", fontFamily: "Tajawal, sans-serif", fontWeight: 700, fontSize: "15px", border: "none", cursor: "pointer" }}
        >
          <Save size={16} />
          حفظ التغييرات
        </button>
      </div>
    </div>
  );
}

// ---------- Equipment / Workforce pages (simple placeholders) ----------
function EquipmentPage() {
  return (
    <div className="space-y-4">
      <h1 style={{ fontFamily: "Tajawal, sans-serif", fontWeight: 900, fontSize: "1.6rem", color: "#F8F5F0" }}>المعدات</h1>
      <div className="rounded-2xl p-8 text-center" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
        <Wrench size={48} color="#E8A020" className="mx-auto mb-4" style={{ opacity: 0.5 }} />
        <p style={{ fontFamily: "Tajawal, sans-serif", fontSize: "16px", color: "#4A4A6A" }}>إدارة قائمة المعدات — قريباً</p>
        <p style={{ fontFamily: "Noto Sans Arabic, sans-serif", fontSize: "14px", color: "#2A2A3A", marginTop: "8px" }}>سيتم إضافة خاصية تعديل بيانات المعدات في التحديث القادم</p>
      </div>
    </div>
  );
}

function WorkforcePage() {
  return (
    <div className="space-y-4">
      <h1 style={{ fontFamily: "Tajawal, sans-serif", fontWeight: 900, fontSize: "1.6rem", color: "#F8F5F0" }}>الكوادر البشرية</h1>
      <div className="rounded-2xl p-8 text-center" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
        <Users size={48} color="#E8A020" className="mx-auto mb-4" style={{ opacity: 0.5 }} />
        <p style={{ fontFamily: "Tajawal, sans-serif", fontSize: "16px", color: "#4A4A6A" }}>إدارة بيانات الكوادر — قريباً</p>
      </div>
    </div>
  );
}

// ---------- Settings ----------
function SettingsPage() {
  const { info, reset } = useCompanyInfo();
  const { images: marquee, setImages: setMarquee } = useMarqueeImages();
  const { images: projects, setImages: setProjects } = useProjectImages();
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const clearAll = () => {
    setMarquee([]);
    setProjects([]);
    reset();
    setToast({ msg: "تم مسح جميع البيانات المحلية", type: "success" });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="space-y-6">
      {toast && <Toast msg={toast.msg} type={toast.type} />}
      <h1 style={{ fontFamily: "Tajawal, sans-serif", fontWeight: 900, fontSize: "1.6rem", color: "#F8F5F0" }}>الإعدادات</h1>

      {/* ImageKit info */}
      <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(232,160,32,0.15)" }}>
        <h3 style={{ fontFamily: "Tajawal, sans-serif", fontWeight: 700, fontSize: "1rem", color: "#E8A020", marginBottom: "1rem" }}>إعدادات ImageKit</h3>
        <div className="space-y-3">
          {[
            { label: "Endpoint URL", value: IK_CONFIG.urlEndpoint },
            { label: "Public Key", value: IK_CONFIG.publicKey },
            { label: "Folder (Projects)", value: "/projects" },
            { label: "Folder (Marquee)", value: "/marquee" },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.03)" }}>
              <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "12px", color: "#8A9BB0" }}>{item.value}</span>
              <span style={{ fontFamily: "Tajawal, sans-serif", fontSize: "12px", color: "#4A4A6A" }}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
        <h3 style={{ fontFamily: "Tajawal, sans-serif", fontWeight: 700, fontSize: "1rem", color: "#F8F5F0", marginBottom: "1rem" }}>إحصائيات التخزين المحلي</h3>
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: "صور الشريط", value: marquee.length },
            { label: "صور المشاريع", value: projects.length },
            { label: "البيانات المحفوظة", value: "نشطة" },
          ].map((s) => (
            <div key={s.label} className="text-center p-3 rounded-xl" style={{ background: "rgba(232,160,32,0.06)" }}>
              <div style={{ fontFamily: "JetBrains Mono, monospace", fontWeight: 700, fontSize: "1.5rem", color: "#E8A020" }}>{s.value}</div>
              <div style={{ fontFamily: "Tajawal, sans-serif", fontSize: "12px", color: "#4A4A6A" }}>{s.label}</div>
            </div>
          ))}
        </div>
        <button
          onClick={clearAll}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl"
          style={{ background: "rgba(220,38,38,0.15)", border: "1px solid rgba(220,38,38,0.3)", color: "#ef4444", fontFamily: "Tajawal, sans-serif", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}
        >
          <Trash2 size={15} />
          مسح جميع البيانات المحلية
        </button>
      </div>
    </div>
  );
}

// ---------- Root Admin App ----------
// ---------- Login Component ----------
function Login({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      if (username === "rayashalbureihi" && password === "athad@7782") {
        onLogin();
      } else {
        setError("اسم المستخدم أو كلمة المرور غير صحيحة");
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "radial-gradient(circle at center, #121225 0%, #06060f 100%)", direction: "rtl" }}>
      <div className="w-full max-w-md p-8 rounded-3xl relative overflow-hidden" style={{ background: "rgba(13, 13, 26, 0.7)", backdropFilter: "blur(20px)", border: "1px solid rgba(232, 160, 32, 0.2)", boxShadow: "0 20px 50px rgba(0, 0, 0, 0.5)" }}>
        <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full" style={{ background: "rgba(232, 160, 32, 0.08)", filter: "blur(80px)", pointerEvents: "none" }} />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full" style={{ background: "rgba(232, 160, 32, 0.05)", filter: "blur(80px)", pointerEvents: "none" }} />

        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(232, 160, 32, 0.1)", border: "1px solid rgba(232, 160, 32, 0.3)" }}>
            <LogoMark size={42} />
          </div>
          <h2 style={{ fontFamily: "Tajawal, sans-serif", fontWeight: 900, fontSize: "1.6rem", color: "#F8F5F0" }}>تسجيل الدخول لوحة التحكم</h2>
          <p style={{ fontFamily: "Tajawal, sans-serif", fontSize: "13px", color: "#4A4A6A", marginTop: "6px" }}>شركة اتحاد البناء للمقاولات العامة</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="p-4 rounded-xl flex items-center gap-3" style={{ background: "rgba(220, 38, 38, 0.1)", border: "1px solid rgba(220, 38, 38, 0.2)", color: "#ef4444", fontFamily: "Tajawal, sans-serif", fontSize: "13px" }}>
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label style={{ fontFamily: "Tajawal, sans-serif", fontSize: "13px", color: "#8A9BB0", display: "block", marginBottom: "8px" }}>اسم المستخدم</label>
            <div className="relative">
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3.5 pr-11 rounded-xl outline-none transition-all text-right"
                style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "14px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", color: "#F8F5F0" }}
                placeholder="أدخل اسم المستخدم"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2" style={{ color: "#4A4A6A" }}>
                <Users size={16} />
              </span>
            </div>
          </div>

          <div>
            <label style={{ fontFamily: "Tajawal, sans-serif", fontSize: "13px", color: "#8A9BB0", display: "block", marginBottom: "8px" }}>كلمة المرور</label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3.5 pr-11 rounded-xl outline-none transition-all text-right"
                style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "14px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", color: "#F8F5F0" }}
                placeholder="أدخل كلمة المرور"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2" style={{ color: "#4A4A6A" }}>
                <Settings size={16} />
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-3.5 px-6 rounded-xl transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
            style={{ background: "linear-gradient(135deg, #E8A020, #C47B1A)", color: "white", fontFamily: "Tajawal, sans-serif", fontWeight: 700, fontSize: "15px", border: "none", cursor: "pointer" }}
          >
            {loading ? <RefreshCw size={18} className="animate-spin" /> : null}
            {loading ? "جاري التحقق..." : "تسجيل الدخول"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ---------- Root Admin App ----------
export default function AdminApp() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return sessionStorage.getItem("admin_auth") === "true";
  });

  const handleLogin = () => {
    sessionStorage.setItem("admin_auth", "true");
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth");
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen flex" style={{ background: "#0A0A16", direction: "rtl" }}>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} onLogout={handleLogout} />

      {/* Main content */}
      <div className="flex-1 flex flex-col" style={{ marginRight: "260px" }} >
        {/* Topbar */}
        <header
          className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 border-b"
          style={{ background: "rgba(10,10,22,0.95)", backdropFilter: "blur(20px)", borderColor: "rgba(255,255,255,0.06)" }}
        >
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg"
            style={{ background: "rgba(255,255,255,0.06)", border: "none", cursor: "pointer", color: "#8A9BB0" }}
          >
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-3">
            <Pill color="#E8A020" label="Admin" />
            <span style={{ fontFamily: "Tajawal, sans-serif", fontSize: "14px", color: "#4A4A6A" }}>اتحاد البناء للمقاولات العامة</span>
          </div>
          <button
            onClick={() => window.open("/#/", "_blank")}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
            style={{ background: "rgba(232,160,32,0.1)", border: "1px solid rgba(232,160,32,0.2)", color: "#E8A020", fontFamily: "Tajawal, sans-serif", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}
          >
            <ExternalLink size={14} />
            الموقع
          </button>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/marquee" element={<MarqueeManager />} />
            <Route path="/projects" element={<ProjectsManager />} />
            <Route path="/company" element={<CompanyInfoPage />} />
            <Route path="/equipment" element={<EquipmentPage />} />
            <Route path="/workforce" element={<WorkforcePage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
      </div>

      {/* Mobile sidebar toggle fix */}
      <style>{`
        @media (max-width: 1023px) {
          .flex-1 { margin-right: 0 !important; }
        }
      `}</style>
    </div>
  );
}
