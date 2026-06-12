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

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "backdrop-blur-xl bg-white/85 shadow-lg border-b border-[rgba(232,160,32,0.2)]" : "bg-transparent"
      }`}
      style={{ direction: "rtl" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
        >
          <Logo size="sm" />
        </button>

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
                color: "#1A1A2E",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              {link.label}
              {link.href === "#projects" && (
                <span
                  className="absolute -bottom-0.5 right-0 left-0 h-0.5 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                  style={{ background: "linear-gradient(90deg, #E8A020, #C47B1A)" }}
                />
              )}
            </button>
          ))}
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
          style={{ color: "#1A1A2E", background: "none", border: "none", cursor: "pointer" }}
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
            className="lg:hidden backdrop-blur-xl bg-white/95 border-t border-[rgba(232,160,32,0.2)]"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className="py-3 text-right border-b border-gray-100 last:border-0 hover:text-[#E8A020] transition-colors"
                  style={{
                    fontFamily: "Tajawal, sans-serif",
                    fontWeight: link.href === "#projects" ? 700 : 500,
                    fontSize: "16px",
                    color: link.href === "#projects" ? "#C47B1A" : "#1A1A2E",
                    background: "none",
                    border: "none",
                    borderBottom: "1px solid #f3f3f3",
                    cursor: "pointer",
                    textAlign: "right",
                  }}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
