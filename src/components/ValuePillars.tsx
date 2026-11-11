import React from "react";
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
    <section id="pillars" className="py-16 bg-slate-900 border-b border-slate-800 text-slate-100 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-ocean-400 tracking-wide uppercase mb-2">
            <span>અમારી મુખ્ય વિશેષતાઓ (Our Value Pillars)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            અમદાવાદમાં Aqua Solutions શા માટે વિશ્વસનીય છે?
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2">
            અમે માત્ર ફિલ્ટર બદલતા નથી, પરંતુ તમારા ઘર અને કંપનીમાં પીવાના પાણીની ૧૦૦% શુદ્ધતા સુનિશ્ચિત કરીએ છીએ.
          </p>
        </div>

        {/* 4 Pillar Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-slate-950 border border-slate-800 rounded-xl p-6 flex flex-col justify-between hover:border-slate-700 transition-colors shadow-sm"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-ocean-400 mb-4 shadow-sm">
                    <Icon className="w-5 h-5" strokeWidth={1.75} />
                  </div>
                  
                  <h3 className="text-base font-bold text-white">
                    {item.titleGu}
                  </h3>
                  <span className="text-xs font-medium text-slate-400 block mb-2">
                    {item.titleEn}
                  </span>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                    {item.descriptionGu}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800">
                  <span className="text-[11px] font-mono text-ocean-300 bg-ocean-950/60 border border-ocean-800/80 px-2 py-0.5 rounded font-medium inline-block">
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
