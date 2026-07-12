import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const navLinks = [
  { href: "#about", label: "من نحن" },
  { href: "#vision", label: "رؤيتنا" },
  { href: "#services", label: "خدماتنا" },
  { href: "#whyus", label: "ما يميزنا" },
  { href: "#projects", label: "مشاريعنا" },
  { href: "#safety", label: "السلامة" },
  { href: "#contact", label: "تواصل معنا" },
];

/** dark prop: used when Navbar is placed on a dark background (gallery page) */
export function Navbar({ dark = false }: { dark?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isGalleryPage = typeof window !== "undefined" && window.location.hash.startsWith("#/gallery");

  const handleNav = (href: string) => {
    setMenuOpen(false);
    if (isGalleryPage) {
      // Navigate back to home then scroll
      window.location.href = `/#/${href}`;
      return;
    }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const textColor = dark && !scrolled ? "#F8F5F0" : "#1A1A2E";
  const bgScrolled = dark
    ? "backdrop-blur-xl bg-[rgba(10,10,22,0.92)] shadow-lg border-b border-[rgba(232,160,32,0.15)]"
    : "backdrop-blur-xl bg-white/85 shadow-lg border-b border-[rgba(232,160,32,0.2)]";

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? bgScrolled : "bg-transparent"}`}
      style={{ direction: "rtl" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <a
          href="/#/"
          style={{ background: "none", border: "none", cursor: "pointer", padding: 0, textDecoration: "none" }}
        >
          <Logo size="sm" dark={dark && !scrolled} />
        </a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-5">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className="relative group transition-colors duration-200 hover:text-[#E8A020]"
              style={{
                fontFamily: "Tajawal, sans-serif",
                fontWeight: 600,
                fontSize: "14px",
                color: textColor,
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              {link.label}
            </button>
          ))}
          {/* Gallery page link */}
          <a
            href="/#/gallery"
            className="relative flex items-center gap-1 px-3 py-1.5 rounded-lg transition-all duration-200"
            style={{
              fontFamily: "Tajawal, sans-serif",
              fontWeight: 700,
              fontSize: "13px",
              color: "#E8A020",
              textDecoration: "none",
              background: "rgba(232,160,32,0.1)",
              border: "1px solid rgba(232,160,32,0.25)",
            }}
          >
            ✦ معرض الأعمال
          </a>
        </div>

        {/* CTA */}
        <button
          onClick={() => handleNav("#contact")}
          className="hidden lg:block px-5 py-2 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105"
          style={{
            background: "linear-gradient(135deg, #E8A020, #C47B1A)",
            color: "white",
            fontFamily: "Tajawal, sans-serif",
            fontWeight: 700,
            fontSize: "14px",
            border: "none",
            cursor: "pointer",
          }}
        >
          تواصل معنا
        </button>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 rounded-lg"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ color: textColor, background: "none", border: "none", cursor: "pointer" }}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t"
            style={{
              backdropFilter: "blur(24px)",
              background: dark ? "rgba(10,10,22,0.97)" : "rgba(255,255,255,0.97)",
              borderColor: dark ? "rgba(232,160,32,0.15)" : "rgba(232,160,32,0.2)",
            }}
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className="py-3 text-right hover:text-[#E8A020] transition-colors"
                  style={{
                    fontFamily: "Tajawal, sans-serif",
                    fontWeight: 500,
                    fontSize: "16px",
                    color: dark ? "#D0D0E0" : "#1A1A2E",
                    background: "none",
                    border: "none",
                    borderBottom: dark ? "1px solid rgba(255,255,255,0.06)" : "1px solid #f3f3f3",
                    cursor: "pointer",
                    textAlign: "right",
                  }}
                >
                  {link.label}
                </button>
              ))}
              <a
                href="/#/gallery"
                onClick={() => setMenuOpen(false)}
                className="py-3 text-right hover:text-[#E8A020] transition-colors"
                style={{
                  fontFamily: "Tajawal, sans-serif",
                  fontWeight: 700,
                  fontSize: "16px",
                  color: "#E8A020",
                  textDecoration: "none",
                  display: "block",
                  borderTop: "1px solid rgba(232,160,32,0.2)",
                  paddingTop: "12px",
                  marginTop: "4px",
                }}
              >
                ✦ معرض الأعمال
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
