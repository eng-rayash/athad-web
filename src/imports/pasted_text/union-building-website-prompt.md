# 🏗️ MASTER PROMPT — موقع شركة اتحاد البناء للمقاولات العامة
### Website Prompt v1.0 | Full Stack + Visual Identity + Animation System

---

## 🎯 PROJECT OVERVIEW

Build a **premium, cinematic, light-themed website** for **شركة اتحاد البناء للمقاولات العامة** (Union Building General Contracting Company), a Saudi Arabian general contracting firm based in Dammam.

The website must feel like a **luxury engineering brand** — authoritative, modern, and powerful — while maintaining full Arabic RTL support and bilingual content (Arabic primary / English secondary).

**Stack:** Next.js 14 (App Router) + TypeScript + Tailwind CSS  
**3D Engine:** Three.js + React Three Fiber + Drei  
**Animation:** GSAP (with ScrollTrigger) + Framer Motion  
**Smooth Scroll:** Lenis  
**Shaders:** GLSL / WebGL custom shaders  
**Design System:** Glassmorphism UI + Parallax Effects  
**Language:** RTL Arabic (Primary) | LTR English (Secondary toggle)

---

## 🎨 VISUAL IDENTITY & DESIGN SYSTEM

### Color Palette (Light Theme — Construction & Power)

```
--color-primary:       #1A1A2E   /* Deep Navy — structure, authority */
--color-accent:        #E8A020   /* Burnished Gold — premium, Saudi identity */
--color-accent-warm:   #C47B1A   /* Amber Bronze — construction steel tones */
--color-surface:       #F8F5F0   /* Warm Ivory — clean light base */
--color-surface-2:     #EDE8E0   /* Concrete White — layered depth */
--color-glass:         rgba(255, 255, 255, 0.65) /* Glassmorphism base */
--color-glass-border:  rgba(232, 160, 32, 0.25) /* Gold glass border */
--color-text-primary:  #0D0D1A   /* Near-black — readability */
--color-text-secondary:#4A4A6A   /* Muted navy — body text */
--color-steel:         #8A9BB0   /* Steel Blue — industrial accent */
--color-earth:         #B5956A   /* Desert Sand — Saudi environment */
```

### Typography

```
Display Font:    "Playfair Display" — Headlines (LTR)
                 "Tajawal" (Bold 800) — Arabic Headlines
Body Font:       "Inter" — English body
                 "Noto Sans Arabic" — Arabic body
Mono/Data Font:  "JetBrains Mono" — stats, numbers, equipment data
```

### Signature Design Element 🔥
**Animated construction grid** — A subtle, 3D perspective wireframe grid (like an architectural blueprint or building scaffold) that runs as a persistent background element throughout the site, rendered in WebGL with a golden shimmer. This is the unmistakable signature of this site.

---

## 🏛️ SITE ARCHITECTURE — PAGES & SECTIONS

### 1. HERO SECTION — الصفحة الرئيسية

**3D Scene (React Three Fiber):**
- A **3D architectural model** (building/tower under construction) rendered with Three.js
- Built in Blender, exported as `.glb`, loaded via `@react-three/drei`'s `useGLTF`
- Subtle rotation animation on scroll (GSAP ScrollTrigger)
- Particle system around the model (construction dust / sand storm effect)
- Directional golden light source simulating Saudi sunlight

**Hero Text (GSAP SplitText animation):**
```
Arabic:   "نبني المستقبل، حجراً فوق حجر"
English:  "Building the Future, Stone by Stone"
Subtitle: "شركة اتحاد البناء للمقاولات العامة — الدمام، المملكة العربية السعودية"
```

**CTA Buttons:**
- "اكتشف مشاريعنا" → Scroll to Projects
- "تواصل معنا" → Contact Section
- Buttons use glassmorphism style with gold border glow

**Background:** 
- Full-screen WebGL shader: animated golden sand particles drifting upward
- Parallax depth layers (3 layers: sky, construction site, foreground)
- Lenis smooth scroll activates on site load

---

### 2. ABOUT SECTION — من نحن

**Layout:** Split screen — 60% content / 40% 3D visual

**3D Visual:** Animated 3D blueprint/floor plan unfolding in React Three Fiber

**Content:**
```
Heading: "من نحن"

Body (Arabic):
انطلقت شركة اتحاد البناء للمقاولات العامة على أسس متينة وثابتة وعلمية 
نحو مستقبل واعد مليء بالإنجازات والمشاريع التي تدعم اقتصاد المملكة 
العربية السعودية من خلال كوادرها المميزة والخبيرة. المعيار الأساسي 
الذي تلتزم إليه الشركة هو الجودة.

تتبع الشركة استراتيجية عمل مرنة تسمح لها بالتطور والنمو دائماً بما 
يلبي حاجة السوق والعملاء وبما يتماشى مع كافة التقنيات والمعدات 
الحديثة في عالم الإنشاءات والمقاولات.
```

**Animation:** Framer Motion staggered text reveal on scroll entry

**Stats Counter (GSAP CountTo):**
```
[4]  حفارات ثقيلة
[7]  سيارات بيك أب
[15] مهندس وسائق معدات
[32] عامل متخصص
```

---

### 3. VISION & MISSION — الرؤية والرسالة

**Layout:** Full-width parallax section with glassmorphism cards

**Background:** Deep navy (#1A1A2E) section — creates visual contrast rhythm

**Cards (Glassmorphism style — `backdrop-filter: blur(20px)`):**

**رؤيتنا:**
```
نطمح لأن نكون الخيار الأول للعملاء في تقديم أفضل الحلول الهندسية 
وجودة تنفيذية عالية، مما يسهم في تحقيق نهضة عمرانية وبنية تحتية 
متكاملة.
```

**رسالتنا:**
```
نسعى لتطوير وتنفيذ مشاريع الإنشاءات والبنية التحتية وفقاً لأعلى 
المعايير والمواصفات الفنية. نركز على تقديم حلول معمارية وإنشائية 
موثوقة تحقق رضا عملائنا، ملتزمين بالتحسين المستمر وتوفير بيئة عمل 
احترافية.
```

**Animation:** Cards float upward with 3D tilt effect on hover (CSS perspective transform + GSAP)

---

### 4. SERVICES SECTION — خدماتنا

**Layout:** Bento Grid (4 cards in 2×2, responsive to 1 column on mobile)

**Each service card includes:**
- Custom 3D icon (React Three Fiber or Lottie animation)
- Gold gradient top border
- Glassmorphism background
- Hover: card lifts + background blur intensifies + icon spins

**Services:**

| Icon | الخدمة | الوصف |
|------|--------|-------|
| 🏗️ Excavator 3D | البنية التحتية | تنفيذ مشاريع البنية التحتية بكافة أنواعها |
| 🏢 Building 3D | إنشاء المباني | بناء وتشييد المباني السكنية والتجارية والصناعية |
| 🎨 Brush 3D | التشطيبات | خدمات التشطيبات الداخلية والخارجية بأعلى جودة |
| 📊 Gantt 3D | إدارة المشاريع | إدارة المشاريع لضمان تنفيذها بكفاءة ودقة |

---

### 5. WHY US SECTION — ما يميزنا

**Layout:** Horizontal scroll track (GSAP ScrollTrigger horizontal pinning)

**4 Feature Cards scroll left-to-right as user scrolls down:**

```
Card 1: فريق عمل متميز
"نمتلك فريقاً من المهندسين والمشرفين والعمال 
تم اختيارهم بعناية فائقة"
Icon: Animated 3D helmet

Card 2: الجودة والالتزام  
"نلتزم بأعلى معايير الجودة والشفافية في جميع مشاريعنا"
Icon: Animated 3D checkmark/badge

Card 3: التطور والابتكار
"نتبنى أحدث التقنيات والمعدات الحديثة في عالم الإنشاءات"
Icon: Animated 3D gear

Card 4: الخبرة الطويلة
"خبرة واسعة تتيح لنا تنفيذ المشاريع بكفاءة ودقة"
Icon: Animated 3D trophy
```

---

### 6. EQUIPMENT & WORKFORCE — المعدات والكوادر

**Layout:** Two-column interactive data display

**Left Column — Equipment Table (Interactive):**
Animated data table with GSAP stagger reveal. Rows appear one-by-one on scroll.

| المعدة | العدد | شريط المؤشر |
|--------|-------|-------------|
| حفار (Digger) | 4 | ████░░░░░░ |
| لورد (Loader) | 2 | ██░░░░░░░░ |
| باكهولودر | 3 | ███░░░░░░░ |
| تنك مياه | 2 | ██░░░░░░░░ |
| قلاب (Tipper) | 4 | ████░░░░░░ |
| بوب كات | 2 | ██░░░░░░░░ |
| رصاصة 120 كجم | 3 | ███░░░░░░░ |
| رصاصة 90 كجم | 7 | ███████░░░ |
| نظام نزح مياه | 2 | ██░░░░░░░░ |
| مولد 50 ك ف | 1 | █░░░░░░░░░ |
| مولد 35 ك ف | 2 | ██░░░░░░░░ |
| سيارة بيك أب | 7 | ███████░░░ |
| جهاز مساحي | 3 | ███░░░░░░░ |

**Right Column — Workforce Org Chart (React Three Fiber):**
Interactive 3D node graph showing workforce hierarchy. Nodes are spheres, connected by glowing lines.

```
مهندس مدير مشاريع (1)
├── مهندسو موقع (4)
│   ├── مساحون (3)
│   └── مراقبون (4)
├── سباكون (5)
├── سائقو معدات (15)
├── نجارون مسلحون (15)
├── حدادون مسلحون (15)
├── مليسون (10)
├── بناؤون (10)
├── مسؤولو خامات (3)
└── عمالة عادية (32)
```

Total animated counter: **117 متخصص**

---

### 7. OUR VALUES — قيمنا

**Layout:** Full-screen WebGL background section

**WebGL Shader:** Fluid molten gold effect (like liquid metal) animates behind frosted glass cards

**4 Value Pillars:**

```
المسؤولية والالتزام  →  Icon: Shield
الجودة العالية       →  Icon: Diamond  
الخبرة               →  Icon: Star
الاستدامة            →  Icon: Leaf/Cycle
```

**Animation:** Each card entrance uses Framer Motion `rotateY(90deg) → 0` flip effect

---

### 8. SAFETY AFFILIATE SECTION — مؤسسة العتيق للسلامة

**Layout:** Dark section break (contrast section) with red/gold accent palette

**Heading:**
```
Arabic: "شركاؤنا في السلامة"
Sub: مؤسسة العتيق المتحدة للسلامة
     UNITED AL-ATEEQ FOR SAFETY EST.
```

**Content:**
```
مجال العمل:
أنظمة مكافحة الحرائق والسلامة — تغطي القطاعات الحكومية، النفطية، 
البتروكيماوية، محطات الطاقة، المصانع، المستودعات، المدارس، 
والمباني العامة.
```

**Systems Grid (6 cards):**
```
🔴 أنظمة الرش (Sprinkler)
🟡 FM-200 / FE-227 غرف حساسة
🔵 Halon 1301
⚫ أنظمة CO2
🟠 البودرة الكيميائية الجافة
🔔 أنظمة الإنذار المبكر
```

**Certifications (Logo badges):**
```
✅ مرخصة من إدارة الدفاع المدني — المملكة العربية السعودية
✅ وزارة التجارة — المملكة العربية السعودية  
✅ NFPA Member — National Fire Protection Association (USA)
```

**Notable Projects:**
```
• مطعم ومستودعات ومحطة وقود — جامعة الدمام
• فندق العوضي — الأحساء
• برج باعشن | برج العطيشان | فندق خباب — الدمام
• مستودعات الغامدي — الدمام
• مستودعات الشاهيني — الرياض
```

**Contact:**
```
📞 0138849998
📧 UNITED.ALATEEQ.SAFETY@GMAIL.COM
```

---

### 9. CONTACT SECTION — تواصل معنا

**Layout:** Split — Left: 3D animated map pin / Right: Contact form

**3D Map:** React Three Fiber globe/map with glowing pin on Dammam, Saudi Arabia

**Contact Form (Glassmorphism):**
```
Fields:
- الاسم الكامل
- رقم الجوال
- البريد الإلكتروني
- نوع الخدمة المطلوبة (dropdown)
- تفاصيل المشروع (textarea)
- [إرسال الطلب] → CTA Button
```

**Company Info:**
```
📍 الدمام — شارع الملك سعود
📱 0500988098
📧 Abutarekkk@hotmail.com
🏢 س.ت: 2050125097
```

**WhatsApp Float Button:** Fixed bottom-right, pulsing green glow animation

---

### 10. FOOTER

**Layout:** 3-column dark footer

```
Column 1: Logo + شعار الشركة + وصف مختصر
Column 2: روابط سريعة (Quick Links)
Column 3: معلومات التواصل + Social Icons

Bottom Bar: 
جميع الحقوق محفوظة © 2025 — شركة اتحاد البناء للمقاولات العامة
```

---

## ⚙️ TECHNICAL IMPLEMENTATION SPECS

### Animation System

```javascript
// GSAP Configuration
gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin)

// Lenis Smooth Scroll Setup
const lenis = new Lenis({
  duration: 1.4,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
})

// Sync GSAP ScrollTrigger with Lenis
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => { lenis.raf(time * 1000) })
gsap.ticker.lagSmoothing(0)
```

### WebGL Hero Shader (GLSL)
```glsl
// Fragment shader — golden particle sand effect
uniform float uTime;
uniform vec2 uResolution;
uniform vec3 uColorGold;   // #E8A020
uniform vec3 uColorIvory;  // #F8F5F0

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  // Simplex noise for sand particle movement
  // Drift upward along Y axis over time
  // Gold shimmer on ivory base
}
```

### Three.js Scene Setup
```javascript
// React Three Fiber main scene
<Canvas
  camera={{ position: [0, 2, 8], fov: 50 }}
  gl={{ antialias: true, alpha: true }}
  dpr={[1, 2]}
>
  <Suspense fallback={<LoadingSpinner />}>
    <ambientLight intensity={0.4} />
    <directionalLight 
      position={[5, 10, 5]} 
      intensity={2.5} 
      color="#FFD580"  // Golden Saudi sun
    />
    <BuildingModel />    // .glb from Blender
    <ParticleSystem />   // Sand/dust particles
    <Environment preset="city" />
    <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.3} />
  </Suspense>
</Canvas>
```

### RTL / Arabic Support
```css
[dir="rtl"] {
  font-family: 'Tajawal', 'Noto Sans Arabic', sans-serif;
  text-align: right;
}

/* Flip horizontal icons and arrows for RTL */
[dir="rtl"] .arrow-icon { transform: scaleX(-1); }
[dir="rtl"] .progress-bar { direction: rtl; }
```

### Glassmorphism Component Pattern
```css
.glass-card {
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(232, 160, 32, 0.25);
  border-radius: 16px;
  box-shadow: 
    0 8px 32px rgba(26, 26, 46, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
}
```

---

## 📁 PROJECT FILE STRUCTURE

```
itihad-albina/
├── app/
│   ├── layout.tsx           # RTL meta, fonts, Lenis init
│   ├── page.tsx             # Main page composition
│   └── globals.css          # Design tokens, base styles
├── components/
│   ├── hero/
│   │   ├── HeroSection.tsx
│   │   ├── BuildingModel.tsx    # R3F 3D model
│   │   ├── ParticleSystem.tsx   # WebGL particles
│   │   └── HeroShader.glsl
│   ├── about/
│   │   └── AboutSection.tsx
│   ├── services/
│   │   └── ServicesGrid.tsx
│   ├── equipment/
│   │   ├── EquipmentTable.tsx
│   │   └── WorkforceGraph.tsx   # 3D org chart
│   ├── safety/
│   │   └── SafetySection.tsx
│   ├── contact/
│   │   ├── ContactSection.tsx
│   │   └── MapPin3D.tsx
│   └── ui/
│       ├── GlassCard.tsx
│       ├── GoldButton.tsx
│       ├── AnimatedCounter.tsx
│       └── WhatsAppFloat.tsx
├── lib/
│   ├── gsap-config.ts
│   ├── lenis-config.ts
│   └── three-utils.ts
├── public/
│   ├── models/
│   │   └── building.glb        # Blender export
│   └── fonts/
└── tailwind.config.ts
```

---

## 🚀 PERFORMANCE REQUIREMENTS

- **Lighthouse Score:** ≥ 90 (Performance, Accessibility, SEO)
- **LCP (Largest Contentful Paint):** < 2.5s
- **3D Models:** Max 5MB, LOD (Level of Detail) on mobile
- **Lazy Loading:** All Three.js scenes load after hero is visible
- **Reduced Motion:** `prefers-reduced-motion` media query disables all animations gracefully
- **Mobile:** Touch-optimized, 3D scenes simplified on low-end devices
- **RTL:** Full right-to-left layout tested on all breakpoints

---

## 🌐 SEO & META

```html
<title>شركة اتحاد البناء للمقاولات العامة — الدمام، المملكة العربية السعودية</title>
<meta name="description" content="شركة اتحاد البناء للمقاولات العامة — متخصصون في البنية التحتية وإنشاء المباني والتشطيبات وإدارة المشاريع في المملكة العربية السعودية." />
<meta name="keywords" content="مقاولات, إنشاءات, بنية تحتية, الدمام, المملكة العربية السعودية, تشطيبات, مباني" />
<meta property="og:title" content="اتحاد البناء للمقاولات العامة" />
<link rel="canonical" href="https://itihad-albina.com" />
```

---

## 📞 CONTACT DATA (Hardcoded)

```typescript
export const COMPANY_DATA = {
  name: {
    ar: "شركة اتحاد البناء للمقاولات العامة",
    en: "Union Building General Contracting Company"
  },
  address: {
    ar: "الدمام — شارع الملك سعود",
    en: "Dammam — King Saud Street, Saudi Arabia"
  },
  phone: "0500988098",
  email: "Abutarekkk@hotmail.com",
  commercialReg: "2050125097",
  whatsapp: "966500988098",
  affiliate: {
    name: "مؤسسة العتيق المتحدة للسلامة",
    phone: "0138849998",
    email: "UNITED.ALATEEQ.SAFETY@GMAIL.COM"
  }
}
```

---

*End of Master Prompt — Version 1.0*  
*صُمِّم هذا البرومبت ليكون مرجعاً شاملاً لأي مطور أو AI يبني الموقع من الصفر*
