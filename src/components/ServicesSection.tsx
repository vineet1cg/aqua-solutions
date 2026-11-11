import React from "react";
import { Home, Factory, Wrench, Shield, CheckCircle, ArrowRight } from "lucide-react";

interface ServiceCard {
  icon: React.ElementType;
  titleGu: string;
  titleEn: string;
  summaryGu: string;
  features: string[];
  specs: string;
  serviceKey: string;
}

const serviceCatalog: ServiceCard[] = [
  {
    icon: Home,
    titleGu: "૧. ડોમેસ્ટિક RO પ્યુરિફાયર",
    titleEn: "Domestic RO Purifiers",
    summaryGu:
      "ઘર અને ફ્લેટ માટે નવા RO મશીનનું વેચાણ, વોલ-માઉન્ટ ઇન્સ્ટોલેશન, રીલોકેશન અને સંપૂર્ણ સર્વિસિંગ.",
    features: [
      "નવા RO વોટર પ્યુરિફાયરનું વેચાણ અને વોરંટી",
      "વોલ માઉન્ટિંગ અને પાઇપિંગ ફિટિંગ",
      "RO + UV + UF + મિનરલ ટેક્નોલોજી સપોર્ટ",
      "બધા મોડલનું TDS લેવલ સેટિંગ",
    ],
    specs: "કેપેસિટી: 10 - 15 LPH | હોમ અને ફ્લેટ્સ માટે આદર્શ",
    serviceKey: "નવા RO પ્યુરિફાયરનું ઇન્સ્ટોલેશન (New RO)",
  },
  {
    icon: Factory,
    titleGu: "૨. કોમર્શિયલ RO પ્લાન્ટ્સ (50 - 2000+ LPH)",
    titleEn: "Commercial RO Plants",
    summaryGu:
      "ફેક્ટરીઓ, હોસ્પિટલો, શાળાઓ, હોટેલ્સ અને ઓફિસો માટે હેવી-ડ્યુટી કસ્ટમાઇઝ્ડ વોટર પ્યુરિફિકેશન પ્લાન્ટ્સ.",
    features: [
      "50 LPH, 100 LPH, 250 LPH, 500 LPH, 1000 LPH થી 2000+ LPH",
      "FRP વેસલ્સ અને સ્ટેનલેસ સ્ટીલ (SS 304/316) સ્ટ્રક્ચર",
      "હાઇ-પ્રેશર મલ્ટીસ્ટેજ વર્ટિકલ પંપ",
      "૩૦૦૦+ હાઈ TDS બોરવેલ પાણી માટે ખાસ ડિઝાઇન",
    ],
    specs: "કેપેસિટી: 50 LPH થી 2000+ LPH | ઔદ્યોગિક પ્લાન્ટ્સ",
    serviceKey: "કોમર્શિયલ RO પ્લાન્ટ (50-2000 LPH)",
  },
  {
    icon: Wrench,
    titleGu: "૩. રિપેરિંગ અને મેન્ટેનન્સ",
    titleEn: "Repair & Maintenance",
    summaryGu:
      "ફિલ્ટર ચેન્જ, મેમ્બ્રેન ચોકિંગ, પાણીનું લીકેજ, મોટર ફોલ્ટ અને TDS વધવા જેવી સમસ્યાઓનું સ્થળ પર નિરાકરણ.",
    features: [
      "ઓરિજિનલ RO મેમ્બ્રેન અને કાર્બન ફિલ્ટર ચેન્જ",
      "બૂસ્ટર પંપ રિપેરિંગ અને SMPS એડેપ્ટર બદલવું",
      "પાઇપલાઇન લીકેજ અને ઓટો-કટ સ્વિચ સમારકામ",
      "ડિજિટલ TDS મીટર દ્વારા સચોટ વોટર ટેસ્ટિંગ",
    ],
    specs: "તમામ બ્રાન્ડ્સનું ઝડપી ડોરસ્ટેપ સમારકામ",
    serviceKey: "પાણીનું લીકેજ અથવા મોટર રિપેરિંગ (Repair)",
  },
  {
    icon: Shield,
    titleGu: "૪. એન્યુઅલ મેન્ટેનન્સ કોન્ટ્રાક્ટ (AMC)",
    titleEn: "Annual Maintenance Contracts (AMC)",
    summaryGu:
      "વર્ષભર શુદ્ધ પાણીની ખાતરી આપતા વાર્ષિક જાળવણી પ્લાન. અણધાર્યા ખર્ચ વગર સમયસર સર્વિસિંગ અને સ્પેર પાર્ટ્સ કવરેજ.",
    features: [
      "વર્ષમાં ૩ થી ૪ નિયમિત શિડ્યુલ સર્વિસિંગ",
      "અનલિમિટેડ બ્રેકડાઉન ઓન-કોલ વિઝિટ્સ",
      "ફિલ્ટર કીટ અને ઇલેક્ટ્રિકલ પાર્ટ્સ બદલવાનો સમાવેશ",
      "ઘર અને કોમર્શિયલ બંને માટે ખાસ AMC પ્લાન્સ",
    ],
    specs: "બેઝિક, કોમ્પ્રિહેન્સિવ અને કોમર્શિયલ વાર્ષિક પેકેજ",
    serviceKey: "વાર્ષિક AMC મેન્ટેનન્સ પ્લાન (AMC Plan)",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-16 sm:py-20 bg-neutral-50 dark:bg-black border-b border-neutral-200 dark:border-neutral-900 text-black dark:text-white transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-600 dark:text-neutral-400 tracking-wide uppercase mb-2">
            <span>સર્વિસ કેટાલોગ (Service Catalog)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-black dark:text-white">
            અમારી ૪ મુખ્ય સર્વિસ કેટેગરીઝ
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mt-2">
            Aqua Solutions ઘરેલું અને ઔદ્યોગિક બંને ક્ષેત્રો માટે સંપૂર્ણ વોટર પ્યુરિફિકેશન સોલ્યુશન્સ પ્રદાન કરે છે.
          </p>
        </div>

        {/* 4 Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {serviceCatalog.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-[#0a0a0a] border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:border-neutral-400 dark:hover:border-neutral-700 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-lg bg-neutral-100 dark:bg-[#141414] border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-black dark:text-white">
                      <Icon className="w-5 h-5" strokeWidth={1.75} />
                    </div>
                    <span className="text-xs font-mono font-medium text-neutral-600 dark:text-neutral-400 bg-neutral-100 dark:bg-black border border-neutral-200 dark:border-neutral-800 px-2.5 py-1 rounded">
                      Category 0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-black dark:text-white">
                    {service.titleGu}
                  </h3>
                  <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400 block mb-3">
                    {service.titleEn}
                  </span>

                  <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed mb-5">
                    {service.summaryGu}
                  </p>

                  {/* Feature Checklist */}
                  <div className="space-y-2 mb-6">
                    {service.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs text-neutral-700 dark:text-neutral-300">
                        <CheckCircle className="w-3.5 h-3.5 text-black dark:text-white mt-0.5 flex-shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <span className="text-[11px] font-mono text-neutral-600 dark:text-neutral-400 block">
                    {service.specs}
                  </span>

                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-white bg-black hover:bg-neutral-800 dark:text-black dark:bg-white dark:hover:bg-neutral-200 px-3.5 py-2 rounded-lg transition-colors shadow-sm"
                  >
                    <span>આ સર્વિસ બુક કરો</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
