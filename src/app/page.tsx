import React from "react";
import Navbar from "@/components/Navbar";
import HeroBookingForm from "@/components/HeroBookingForm";
import ValuePillars from "@/components/ValuePillars";
import BrandStrip from "@/components/BrandStrip";
import ServicesSection from "@/components/ServicesSection";
import AmcPlans from "@/components/AmcPlans";
import MainContactForm from "@/components/MainContactForm";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col bg-white text-black dark:bg-black dark:text-white transition-colors">
      {/* 1. Header & Navigation with Theme Toggle */}
      <Navbar />

      {/* 2. Hero Section with Quick Booking Form & Instant WhatsApp */}
      <HeroBookingForm />

      {/* 3. 4 Value Pillars */}
      <ValuePillars />

      {/* 4. Multi-Brand Strip */}
      <BrandStrip />

      {/* 5. 4 Service Categories */}
      <ServicesSection />

      {/* 6. AMC Plans Comparison Grid */}
      <AmcPlans />

      {/* 7. Detailed Service Booking Form & Direct WhatsApp Dispatch */}
      <MainContactForm />

      {/* 8. Footer */}
      <Footer />

      {/* 9. Floating Call & WhatsApp Actions */}
      <FloatingActions />
    </main>
  );
}
