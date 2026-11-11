"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Phone, MessageSquare, Menu, X, Droplet } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* 1. Top Announcement Bar */}
      <div className="bg-black text-neutral-300 text-xs sm:text-sm py-2 px-4 sm:px-6 border-b border-neutral-900">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          {/* Tagline */}
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span className="inline-block w-2 h-2 rounded-full bg-neutral-400"></span>
            <span className="font-medium tracking-tight text-neutral-300">
              સ્વચ્છ અને શુદ્ધ પાણી માટે આપનું વિશ્વસનીય નામ | Pure Water Solutions
            </span>
          </div>

          {/* Direct Contact Actions */}
          <div className="flex items-center gap-4 text-xs font-mono">
            <a
              href="tel:+919662021602"
              className="inline-flex items-center gap-1.5 text-neutral-300 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-neutral-400" />
              <span>+91 96620 21602</span>
            </a>
            <span className="text-neutral-700">|</span>
            <a
              href="https://wa.me/919662021602?text=Hi,%20I%20need%20RO%20water%20purifier%20service%20details%20from%20Aqua%20Solutions."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Chat</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Sticky Main Header */}
      <header className="sticky top-0 z-40 bg-black/95 backdrop-blur-md border-b border-neutral-900 shadow-sm transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-lg bg-white text-black flex items-center justify-center font-bold text-lg shadow-sm">
              <Droplet className="w-5 h-5 fill-black text-black" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-white group-hover:text-neutral-300 transition-colors">
                Aqua Solutions
              </span>
              <span className="hidden sm:block text-[11px] text-neutral-400 font-medium -mt-1">
                RO Sales, Service & AMC • Ahmedabad
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-6 text-sm font-medium text-neutral-300">
            <a href="#hero" className="hover:text-white transition-colors">
              મુખ્ય પેજ (Home)
            </a>
            <a href="#pillars" className="hover:text-white transition-colors">
              વિશેષતાઓ (Pillars)
            </a>
            <a href="#brands" className="hover:text-white transition-colors">
              બ્રાન્ડ્સ (Brands)
            </a>
            <a href="#services" className="hover:text-white transition-colors">
              સર્વિસીસ (Services)
            </a>
            <a href="#amc-plans" className="hover:text-white transition-colors">
              AMC પ્લાન્સ
            </a>
            <a href="#contact" className="hover:text-white transition-colors">
              સંપર્ક (Contact)
            </a>
            <Link
              href="/admin"
              className="text-xs text-neutral-400 hover:text-white transition-colors border border-neutral-800 rounded px-2 py-1 bg-neutral-950"
            >
              Admin
            </Link>
          </nav>

          {/* Header Action Button & Theme Toggle */}
          <div className="hidden sm:flex items-center gap-3">
            <ThemeToggle />
            <a
              href="#quick-booking"
              className="h-10 px-4 bg-white hover:bg-neutral-200 text-black text-sm font-semibold rounded-lg inline-flex items-center gap-2 transition-colors shadow-sm active:translate-y-0.5"
            >
              <span>સર્વિસ બુક કરો</span>
            </a>
          </div>

          {/* Mobile Menu Button & Theme Toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <ThemeToggle />
            <a
              href="tel:+919662021602"
              className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300"
              aria-label="Call Now"
            >
              <Phone className="w-4 h-4 text-white" />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black border-b border-neutral-900 px-4 pt-3 pb-5 space-y-3">
            <nav className="flex flex-col space-y-2 text-sm font-medium text-neutral-300">
              <a
                href="#hero"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-md hover:bg-neutral-900 hover:text-white transition-colors"
              >
                મુખ્ય પેજ (Home)
              </a>
              <a
                href="#pillars"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-md hover:bg-neutral-900 hover:text-white transition-colors"
              >
                વિશેષતાઓ (Pillars)
              </a>
              <a
                href="#brands"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-md hover:bg-neutral-900 hover:text-white transition-colors"
              >
                બ્રાન્ડ્સ (Brands)
              </a>
              <a
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-md hover:bg-neutral-900 hover:text-white transition-colors"
              >
                સર્વિસીસ (Services)
              </a>
              <a
                href="#amc-plans"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-md hover:bg-neutral-900 hover:text-white transition-colors"
              >
                AMC પ્લાન્સ (AMC Plans)
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-md hover:bg-neutral-900 hover:text-white transition-colors"
              >
                સંપર્ક અને બુકિંગ (Contact)
              </a>
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-md text-neutral-400 hover:bg-neutral-900 hover:text-white transition-colors"
              >
                Admin Dashboard
              </Link>
            </nav>
            <div className="pt-2 border-t border-neutral-900 flex flex-col gap-2">
              <a
                href="#quick-booking"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full h-10 bg-white hover:bg-neutral-200 text-black text-sm font-semibold rounded-lg flex items-center justify-center transition-colors"
              >
                સર્વિસ બુક કરો (Book Service)
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
