import React from "react";
import Link from "next/link";
import { Droplet, Phone, MessageSquare, MapPin, Clock } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Footer() {
  return (
    <footer className="bg-black text-neutral-300 border-t border-neutral-900 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center font-bold">
                <Droplet className="w-4 h-4 fill-black text-black" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Aqua Solutions
              </span>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed">
              સ્વચ્છ અને શુદ્ધ પાણી માટે આપનું વિશ્વસનીય નામ | Pure Water Solutions. અમદાવાદમાં તમામ પ્રકારના RO વોટર પ્યુરિફાયર અને કોમર્શિયલ પ્લાન્ટ્સનું વેચાણ, સર્વિસિંગ અને AMC.
            </p>

            <div className="pt-2 text-xs text-neutral-400 space-y-1">
              <div>૧૦+ વર્ષનો વિશ્વાસ • ૫,૦૦૦+ સંતુષ્ટ ગ્રાહકો</div>
              <div className="text-white font-mono">IS 10500 Water Standard</div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              ઝડપી લિંક્સ (Quick Navigation)
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#hero" className="hover:text-white transition-colors">
                  મુખ્ય પેજ (Home)
                </a>
              </li>
              <li>
                <a href="#pillars" className="hover:text-white transition-colors">
                  અમારી વિશેષતાઓ (Value Pillars)
                </a>
              </li>
              <li>
                <a href="#brands" className="hover:text-white transition-colors">
                  સપોર્ટેડ બ્રાન્ડ્સ (Brands)
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  સર્વિસ કેટાલોગ (Services)
                </a>
              </li>
              <li>
                <a href="#amc-plans" className="hover:text-white transition-colors">
                  વાર્ષિક AMC પ્લાન્સ (AMC Tiers)
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  સર્વિસ રિક્વેસ્ટ (Book Service)
                </a>
              </li>
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              સેવા વિસ્તારો (Ahmedabad Service Areas)
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed mb-3">
              અમદાવાદ અને ગાંધીનગરના તમામ મુખ્ય વિસ્તારોમાં તે જ દિવસે ડોરસ્ટેપ ટેકનિશિયન સેવા:
            </p>
            <div className="grid grid-cols-2 gap-1 text-[11px] text-neutral-400 font-mono">
              <span>• Vastrapur</span>
              <span>• Bodakdev</span>
              <span>• Satellite</span>
              <span>• Bopal / South Bopal</span>
              <span>• Prahlad Nagar</span>
              <span>• SG Highway</span>
              <span>• Gota / Chandkheda</span>
              <span>• Maninagar</span>
              <span>• Naroda / Nikol</span>
              <span>• Gandhinagar</span>
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              સંપર્ક માહિતી (Business Contact)
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-white flex-shrink-0" />
                <a href="tel:+919662021602" className="text-neutral-200 hover:text-white font-mono font-medium">
                  +91 96620 21602
                </a>
              </div>

              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a
                  href="https://wa.me/919662021602"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-200 hover:text-white font-mono"
                >
                  WhatsApp: 96620 21602
                </a>
              </div>

              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-neutral-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-neutral-200">9:00 AM – 9:00 PM</div>
                  <div className="text-[11px] text-neutral-400">સોમવાર થી રવિવાર (All 7 Days)</div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-neutral-400 flex-shrink-0 mt-0.5" />
                <div className="text-neutral-300">
                  અમદાવાદ, ગુજરાત, ભારત (Ahmedabad, Gujarat)
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 mt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            © {new Date().getFullYear()} Aqua Solutions. સર્વાધિકાર સુરક્ષિત. (All Rights Reserved).
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/admin" className="hover:text-neutral-300 transition-colors">
              ઓનર એડમિન પોર્ટલ (Owner Admin)
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
