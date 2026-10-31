import { useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { VisionMission } from "./components/VisionMission";
import { ServicesSection } from "./components/ServicesSection";
import { WhyUsSection } from "./components/WhyUsSection";
import { ProjectsGallery } from "./components/ProjectsGallery";
import { EquipmentSection } from "./components/EquipmentSection";
import { ValuesSection } from "./components/ValuesSection";
import { SafetySection } from "./components/SafetySection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { WhatsAppFloat } from "./components/WhatsAppFloat";

export default function MainSite() {
  useEffect(() => {
    document.documentElement.setAttribute("dir", "rtl");
    document.documentElement.setAttribute("lang", "ar");
    document.documentElement.setAttribute("translate", "no");
    document.documentElement.classList.add("notranslate");
    document.title = "شركة اتحاد البناء للمقاولات العامة — الدمام، المملكة العربية السعودية";
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return (
    <div className="min-h-screen notranslate" translate="no" style={{ fontFamily: "Tajawal, Noto Sans Arabic, sans-serif", overflowX: "hidden" }}>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <VisionMission />
        <ServicesSection />
        <WhyUsSection />
        <ProjectsGallery />
        <EquipmentSection />
        <ValuesSection />
        <SafetySection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
