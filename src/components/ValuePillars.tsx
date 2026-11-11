import React from "react";
import Image from "next/image";
import { ShieldCheck, Truck, BadgePercent, Wrench } from "lucide-react";

interface PillarItem {
  icon: React.ElementType;
  titleGu: string;
  titleEn: string;
  descriptionGu: string;
  descriptionEn: string;
  highlight: string;
}

const pillars: PillarItem[] = [
  {
    icon: ShieldCheck,
    titleGu: "ઓરિજિનલ સ્પેર પાર્ટ્સ",
    titleEn: "Original Spare Parts",
    descriptionGu:
      "તમામ બ્રાન્ડ્સ માટે ૧૦૦% ઓરિજિનલ RO મેમ્બ્રેન, ફૂડ-ગ્રેડ ફિલ્ટર્સ, હેવી-ડ્યુટી બૂસ્ટર પંપ અને SMPS એડેપ્ટર.",
    descriptionEn: "Genuine certified membranes, sediment filters, and high-pressure pumps.",
    highlight: "100% Genuine Quality",
  },
  {
    icon: Truck,
    titleGu: "ઝડપી ડોરસ્ટેપ સર્વિસ",
    titleEn: "Fast Doorstep Service",
    descriptionGu:
      "અમદાવાદ અને ગાંધીનગરના દરેક વિસ્તારમાં તે જ દિવસે સમયસર ટેકનિશિયન વિઝિટ અને સ્થળ પર જ સમારકામ.",
    descriptionEn: "Same-day on-site doorstep repairs across all areas of Ahmedabad.",
    highlight: "Same-Day Dispatch",
  },
  {
    icon: BadgePercent,
    titleGu: "વ્યાજબી અને પારદર્શક ભાવ",
    titleEn: "Reasonable & Honest Pricing",
    descriptionGu:
      "કોઈપણ છુપા ચાર્જ વગર સ્પષ્ટ નિરીક્ષણ અને વાજબી કિંમત. કામ શરૂ કરતાં પહેલાં સચોટ અંદાજ.",
    descriptionEn: "Transparent upfront quotation with zero hidden charges or surprise costs.",
    highlight: "Zero Hidden Charges",
  },
  {
    icon: Wrench,
    titleGu: "અનુભવી ટેકનિશિયન્સ",
    titleEn: "Expert Technicians",
    descriptionGu:
      "૧૦+ વર્ષનો ટેકનિકલ અનુભવ ધરાવતા નિષ્ણાત કારીગરો દ્વારા સચોટ ફોલ્ટ ડાયગ્નોસિસ અને વોટર ટેસ્ટિંગ.",
    descriptionEn: "Over a decade of specialized field expertise in RO diagnosis and TDS balancing.",
    highlight: "10+ Years Field Experience",
  },
];

export default function ValuePillars() {
  return (
    <section id="pillars" className="py-16 bg-neutral-50 text-black border-b border-neutral-200 dark:bg-black dark:text-white dark:border-neutral-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Official Badge */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-500 dark:text-neutral-400 tracking-wide uppercase mb-2">
              <span>અમારી મુખ્ય વિશેષતાઓ (Our Value Pillars)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-black dark:text-white">
              અમદાવાદમાં Aqua Solutions શા માટે વિશ્વસનીય છે?
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mt-2">
              અમે માત્ર ફિલ્ટર બદલતા નથી, પરંતુ તમારા ઘર અને કંપનીમાં પીવાના પાણીની ૧૦૦% શુદ્ધતા સુનિશ્ચિત કરીએ છીએ.
            </p>
          </div>
          <div className="hidden sm:inline-flex items-center gap-3 bg-white dark:bg-[#0d0d0d] border border-neutral-200 dark:border-neutral-800 rounded-xl p-3 shadow-sm flex-shrink-0">
            <Image
              src="/logo-emblem.png"
              alt="Save Water Save Life"
              width={44}
              height={44}
              className="w-11 h-11 object-contain"
            />
            <div>
              <span className="text-xs font-bold text-black dark:text-white block">
                Save Water • Save Life
              </span>
              <span className="text-[11px] text-neutral-500 font-mono block">
                Aqua Solutions Certified
              </span>
            </div>
          </div>
        </div>

        {/* 4 Pillar Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white border border-neutral-200 text-black hover:border-neutral-300 dark:bg-[#0a0a0a] dark:border-neutral-800 dark:text-white dark:hover:border-neutral-700 rounded-xl p-6 flex flex-col justify-between transition-colors shadow-sm"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-neutral-100 border border-neutral-200 text-black dark:bg-[#141414] dark:border-neutral-800 dark:text-white flex items-center justify-center mb-4 shadow-sm">
                    <Icon className="w-5 h-5" strokeWidth={1.75} />
                  </div>
                  
                  <h3 className="text-base font-bold text-black dark:text-white">
                    {item.titleGu}
                  </h3>
                  <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400 block mb-2">
                    {item.titleEn}
                  </span>

                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed mb-3">
                    {item.descriptionGu}
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800">
                  <span className="text-[11px] font-mono text-neutral-700 bg-neutral-100 border border-neutral-200 dark:text-neutral-300 dark:bg-[#141414] dark:border-neutral-800 px-2 py-0.5 rounded font-medium inline-block">
                    {item.highlight}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
