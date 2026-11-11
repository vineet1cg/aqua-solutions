"use client";

import React from "react";
import { Phone, MessageSquare } from "lucide-react";

export default function FloatingActions() {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 items-end">
      {/* WhatsApp Action */}
      <a
        href="https://wa.me/919662021602?text=Hi,%20I%20am%20interested%20in%20Aqua%20Solutions%20RO%20water%20purifier%20service."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-full shadow-lg transition-colors"
      >
        <span className="max-w-0 overflow-hidden whitespace-nowrap text-xs font-semibold group-hover:max-w-xs transition-all duration-200 ease-out pl-0 group-hover:pl-1">
          WhatsApp કરો
        </span>
        <MessageSquare className="w-5 h-5" />
      </a>

      {/* Call Action - Pure White & Black Monochrome */}
      <a
        href="tel:+919662021602"
        aria-label="Call +91 96620 21602"
        className="group flex items-center gap-2 bg-white hover:bg-neutral-200 text-black p-3 rounded-full shadow-lg transition-colors border border-neutral-300"
      >
        <span className="max-w-0 overflow-hidden whitespace-nowrap text-xs font-bold group-hover:max-w-xs transition-all duration-200 ease-out pl-0 group-hover:pl-1 font-mono">
          96620 21602 કૉલ
        </span>
        <Phone className="w-5 h-5 text-black" />
      </a>
    </div>
  );
}
