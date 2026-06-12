import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
}

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: Particle[] = [];
    const goldColors = ["#E8A020", "#C47B1A", "#FFD580", "#B5956A", "#F0C060"];

    for (let i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 0.5,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: -(Math.random() * 0.8 + 0.2),
        opacity: Math.random() * 0.7 + 0.1,
        color: goldColors[Math.floor(Math.random() * goldColors.length)],
      });
    }

    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw grid lines (blueprint effect)
      ctx.save();
      const gridSize = 60;
      ctx.strokeStyle = "rgba(232, 160, 32, 0.06)";
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      ctx.restore();

      // Animate particles (golden sand drifting upward)
      particles.forEach((p) => {
        p.x += p.speedX + Math.sin(t * 0.01 + p.y * 0.01) * 0.3;
        p.y += p.speedY;
        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;

        ctx.save();
        ctx.globalAlpha = p.opacity * (0.5 + 0.5 * Math.sin(t * 0.02 + p.x));
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      t++;
      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  const scrollToAbout = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToProjects = () => {
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #F8F5F0 0%, #EDE8E0 40%, #F0EBE0 100%)" }}
    >
      {/* Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(248,245,240,0) 0%, rgba(232,160,32,0.04) 50%, rgba(26,26,46,0.08) 100%)",
          zIndex: 1,
        }}
      />

      {/* 3D Architectural accent shape */}
      <div className="absolute right-0 top-0 w-1/2 h-full pointer-events-none" style={{ zIndex: 1 }}>
        <svg viewBox="0 0 600 800" className="w-full h-full opacity-5" preserveAspectRatio="xMidYMid slice">
          <polygon points="100,100 500,50 580,700 150,750" fill="none" stroke="#E8A020" strokeWidth="2" />
          <polygon points="150,150 450,100 530,650 200,700" fill="none" stroke="#E8A020" strokeWidth="1" />
          <line x1="100" y1="100" x2="150" y2="150" stroke="#E8A020" strokeWidth="1" />
          <line x1="500" y1="50" x2="450" y2="100" stroke="#E8A020" strokeWidth="1" />
          <line x1="580" y1="700" x2="530" y2="650" stroke="#E8A020" strokeWidth="1" />
          <line x1="150" y1="750" x2="200" y2="700" stroke="#E8A020" strokeWidth="1" />
          {/* Building scaffold lines */}
          {Array.from({ length: 8 }).map((_, i) => (
            <line
              key={i}
              x1="100"
              y1={100 + i * 80}
              x2="580"
              y2={50 + i * 80}
              stroke="#E8A020"
              strokeWidth="0.5"
            />
          ))}
        </svg>
      </div>

      {/* Content */}
      <div
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
        style={{ direction: "rtl" }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
          style={{
            background: "rgba(232,160,32,0.12)",
            border: "1px solid rgba(232,160,32,0.3)",
            backdropFilter: "blur(10px)",
          }}
        >
          <span
            style={{
              fontFamily: "Tajawal, sans-serif",
              fontSize: "13px",
              color: "#C47B1A",
              fontWeight: 600,
            }}
          >
            🏗️ الدمام — المملكة العربية السعودية
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
          style={{
            fontFamily: "Tajawal, sans-serif",
            fontWeight: 900,
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            color: "#1A1A2E",
            lineHeight: 1.15,
            marginBottom: "1rem",
          }}
        >
          نبني المستقبل،{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #E8A020, #C47B1A)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            حجراً فوق حجر
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          style={{
            fontFamily: "Playfair Display, serif",
            fontStyle: "italic",
            fontSize: "clamp(1rem, 2.5vw, 1.4rem)",
            color: "#4A4A6A",
            marginBottom: "0.5rem",
          }}
        >
          Building the Future, Stone by Stone
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          style={{
            fontFamily: "Tajawal, sans-serif",
            fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
            color: "#8A9BB0",
            marginBottom: "3rem",
          }}
        >
          شركة اتحاد البناء للمقاولات العامة — الدمام، المملكة العربية السعودية
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={scrollToProjects}
            className="px-8 py-4 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl"
            style={{
              background: "linear-gradient(135deg, #E8A020, #C47B1A)",
              color: "white",
              fontFamily: "Tajawal, sans-serif",
              fontWeight: 700,
              fontSize: "16px",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 8px 32px rgba(232,160,32,0.35)",
            }}
          >
            اكتشف مشاريعنا
          </button>

          <button
            onClick={scrollToContact}
            className="px-8 py-4 rounded-2xl transition-all duration-300 hover:scale-105"
            style={{
              background: "rgba(255,255,255,0.65)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(232,160,32,0.35)",
              color: "#1A1A2E",
              fontFamily: "Tajawal, sans-serif",
              fontWeight: 700,
              fontSize: "16px",
              cursor: "pointer",
              boxShadow: "0 8px 32px rgba(26,26,46,0.08), inset 0 1px 0 rgba(255,255,255,0.8)",
            }}
          >
            تواصل معنا
          </button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.4 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-8"
        >
          {[
            { num: "4", label: "حفارات ثقيلة" },
            { num: "15+", label: "مهندس ومشغّل" },
            { num: "117", label: "متخصص" },
            { num: "32", label: "عامل متخصص" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontWeight: 600,
                  fontSize: "2rem",
                  background: "linear-gradient(135deg, #E8A020, #C47B1A)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {stat.num}
              </div>
              <div
                style={{
                  fontFamily: "Tajawal, sans-serif",
                  fontSize: "13px",
                  color: "#4A4A6A",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{ background: "none", border: "none", cursor: "pointer", zIndex: 10 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1"
        >
          <span style={{ fontFamily: "Tajawal, sans-serif", fontSize: "12px", color: "#8A9BB0" }}>
            اكتشف المزيد
          </span>
          <ChevronDown size={20} color="#E8A020" />
        </motion.div>
      </motion.button>
    </section>
  );
}
