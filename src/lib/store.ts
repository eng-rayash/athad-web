import { useState, useEffect } from "react";

export interface MarqueeImage {
  id: string;
  url: string;
  caption?: string;
  uploadedAt: string;
}

export interface CompanyInfo {
  nameAr: string;
  nameEn: string;
  phone: string;
  email: string;
  address: string;
  commercialReg: string;
  whatsapp: string;
  affiliatePhone: string;
  affiliateEmail: string;
}

export interface ProjectImage {
  id: string;
  url: string;
  localKey?: string;
  title: string;
  category: string;
  desc: string;
  uploadedAt: string;
  migratedToIK?: boolean;
  order?: number;
}

/** قائمة تصنيفات أعمال المقاولات الشاملة */
export const PROJECT_CATEGORIES = [
  "الكل",
  // أعمال البنية الأساسية
  "أعمال الحفر والترابية",
  "الأساسات والخوازيق",
  "الهياكل الخرسانية",
  "الهياكل المعدنية",
  // المباني
  "مباني سكنية",
  "مباني تجارية",
  "مستودعات وصناعية",
  "مساجد ومبانٍ حكومية",
  // أعمال التشطيب والتجهيز
  "التشطيبات الداخلية",
  "الواجهات والتشطيب الخارجي",
  "أعمال الديكور",
  "الأرضيات والبلاط",
  // الأنظمة والتمديدات
  "الكهرباء والإنارة",
  "السباكة وصرف المياه",
  "التكييف والتهوية",
  "الإطفاء والإنذار",
  // الأعمال الخارجية
  "المسابح والملاحق",
  "أعمال الطرق والأرصفة",
  "تنسيق المواقع",
  // متنوع
  "صيانة وترميم",
  "أعمال متنوعة",
] as const;

export type ProjectCategory = typeof PROJECT_CATEGORIES[number];

const DEFAULT_COMPANY: CompanyInfo = {
  nameAr: "شركة اتحاد البناء للمقاولات العامة",
  nameEn: "Union Building General Contracting Company",
  phone: "0500988098",
  email: "Abutarekkk@hotmail.com",
  address: "الدمام — شارع الملك سعود",
  commercialReg: "2050125097",
  whatsapp: "966500988098",
  affiliatePhone: "0138849998",
  affiliateEmail: "UNITED.ALATEEQ.SAFETY@GMAIL.COM",
};

function readLS<T>(key: string, def: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : def;
  } catch {
    return def;
  }
}

function writeLS<T>(key: string, val: T) {
  localStorage.setItem(key, JSON.stringify(val));
}

export function useMarqueeImages() {
  const [images, setImages] = useState<MarqueeImage[]>(() =>
    readLS<MarqueeImage[]>("ub_marquee_images", [])
  );

  const save = (imgs: MarqueeImage[]) => {
    setImages(imgs);
    writeLS("ub_marquee_images", imgs);
  };

  const add = (img: Omit<MarqueeImage, "id" | "uploadedAt">) => {
    const next = [
      ...images,
      { ...img, id: crypto.randomUUID(), uploadedAt: new Date().toISOString() },
    ];
    save(next);
  };

  const remove = (id: string) => save(images.filter((i) => i.id !== id));

  return { images, add, remove, setImages: save };
}

export function useCompanyInfo() {
  const [info, setInfo] = useState<CompanyInfo>(() =>
    readLS<CompanyInfo>("ub_company_info", DEFAULT_COMPANY)
  );

  const save = (data: CompanyInfo) => {
    setInfo(data);
    writeLS("ub_company_info", data);
  };

  return { info, save, reset: () => save(DEFAULT_COMPANY) };
}

export function useProjectImages() {
  const [images, setImages] = useState<ProjectImage[]>(() =>
    readLS<ProjectImage[]>("ub_project_images", [])
  );

  const save = (imgs: ProjectImage[]) => {
    setImages(imgs);
    writeLS("ub_project_images", imgs);
  };

  const add = (img: Omit<ProjectImage, "id" | "uploadedAt">) => {
    const next = [
      ...images,
      { ...img, id: crypto.randomUUID(), uploadedAt: new Date().toISOString() },
    ];
    save(next);
  };

  const remove = (id: string) => save(images.filter((i) => i.id !== id));

  const update = (id: string, patch: Partial<ProjectImage>) =>
    save(images.map((img) => (img.id === id ? { ...img, ...patch } : img)));

  return { images, add, remove, update, setImages: save };
}

/** Simple hook for any string value in localStorage */
export function useLocalValue(key: string, def: string) {
  const [val, setVal] = useState(() => readLS<string>(key, def));
  const save = (v: string) => { setVal(v); writeLS(key, v); };
  return [val, save] as const;
}

/** Read marquee images synchronously (for non-admin components) */
export function getMarqueeImages(): MarqueeImage[] {
  return readLS<MarqueeImage[]>("ub_marquee_images", []);
}

/** Read project images synchronously (for non-admin components) */
export function getProjectImages(): ProjectImage[] {
  return readLS<ProjectImage[]>("ub_project_images", []);
}

/** Read company info synchronously */
export function getCompanyInfo(): CompanyInfo {
  return readLS<CompanyInfo>("ub_company_info", DEFAULT_COMPANY);
}

/** Listen for storage changes across tabs */
export function useStorageListener(key: string, callback: () => void) {
  useEffect(() => {
    const handler = (e: StorageEvent) => { if (e.key === key) callback(); };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, [key, callback]);
}
