import React from "react";
import { Check, X, ShieldAlert, ArrowRight } from "lucide-react";

interface AmcTier {
  id: string;
  nameGu: string;
  nameEn: string;
  badge?: string;
  priceEstimate: string;
  priceNote: string;
  targetAudience: string;
  deliverables: { text: string; included: boolean }[];
  exclusionNote?: string;
  isPopular?: boolean;
}

const amcTiers: AmcTier[] = [
  {
    id: "basic",
    nameGu: "બેઝિક સર્વિસ પ્લાન",
    nameEn: "Basic Service AMC",
    priceEstimate: "વાર્ષિક વ્યાજબી પેકેજ",
    priceNote: "સરળ ઘરેલું ઉપયોગ માટે",
    targetAudience: "જેમના RO માં મેમ્બ્રેન સારી સ્થિતિમાં છે તેવા ઘરો માટે",
    deliverables: [
      { text: "વર્ષમાં ૩ થી ૪ નિયમિત શિડ્યુલ સર્વિસિંગ (Scheduled Visits)", included: true },
      { text: "સેડિમેન્ટ અને કાર્બન પ્રી-ફિલ્ટર બદલવાનો સમાવેશ", included: true },
      { text: "અનલિમિટેડ ફ્રી ઓન-કોલ બ્રેકડાઉન વિઝિટ્સ", included: true },
      { text: "દરેક મુલાકાતે ડિજિટલ TDS અને પાઇપ લીકેજ ચેકઅપ", included: true },
      { text: "RO મેમ્બ્રેન રિપ્લેસમેન્ટ (RO Membrane)", included: false },
      { text: "બૂસ્ટર મોટર પંપ અને SMPS એડેપ્ટર (Electricals)", included: false },
    ],
    exclusionNote:
      "સ્પષ્ટ નોંધ / Important Exclusion: આ બેઝિક પ્લાનમાં RO મેમ્બ્રેન અને ઇલેક્ટ્રિકલ પાર્ટ્સ (મોટર/SMPS) નો સમાવેશ થતો નથી. જરૂર પડે તો પાર્ટ્સનો ચાર્જ અલગ રહેશે.",
    isPopular: false,
  },
  {
    id: "comprehensive",
    nameGu: "કોમ્પ્રિહેન્સિવ પ્લાન",
    nameEn: "Comprehensive AMC",
    badge: "સૌથી લોકપ્રિય (Most Popular)",
    priceEstimate: "ઓલ-ઇન્ક્લુઝિવ વાર્ષિક રક્ષણ",
    priceNote: "ઝીરો ચિંતા — ૧૦૦% પાર્ટ્સ કવર્ડ",
    targetAudience: "સંપૂર્ણ સુરક્ષા અને અણધાર્યા ખર્ચથી મુક્તિ ઇચ્છતા પરિવારો માટે",
    deliverables: [
      { text: "વર્ષમાં ૩ થી ૪ નિયમિત પ્રિવેન્ટિવ સર્વિસિંગ", included: true },
      { text: "તમામ સેડિમેન્ટ, પ્રી-કાર્બન અને પોસ્ટ-કાર્બન ફિલ્ટર્સ સામેલ", included: true },
      { text: "૧૦૦% ઓરિજિનલ RO મેમ્બ્રેન બદલવાનો સમાવેશ (Membrane Included)", included: true },
      { text: "બૂસ્ટર મોટર પંપ અને SMPS પાવર સપ્લાયનું સંપૂર્ણ કવરેજ", included: true },
      { text: "અનલિમિટેડ ઇમરજન્સી બ્રેકડાઉન કોલ એટેન્ડન્સ", included: true },
      { text: "ઝીરો સર્વિસ ચાર્જ અને ઝીરો પાર્ટ્સ કોસ્ટ", included: true },
    ],
    isPopular: true,
  },
  {
    id: "commercial",
    nameGu: "કોમર્શિયલ પ્લાન્ટ પ્લાન",
    nameEn: "Commercial Plant AMC",
    badge: "ઔદ્યોગિક & સંસ્થાઓ માટે",
    priceEstimate: "કસ્ટમ પ્લાન્ટ કેપેસિટી મુજબ",
    priceNote: "50 LPH થી 2000+ LPH પ્લાન્ટ્સ",
    targetAudience: "ફેક્ટરીઓ, ઓફિસો, હોસ્પિટલો, શાળાઓ અને હોટેલ્સ માટે",
    deliverables: [
      { text: "દર મહિને ૧ ફરજિયાત ઇન્સ્પેક્શન (વર્ષમાં ૧૨ વિઝિટ્સ)", included: true },
      { text: "હાઇ-ફ્લો જમ્બો સેડિમેન્ટ કાર્ટ્રિજ બદલવી", included: true },
      { text: "દર મહિને લેબોરેટરી સ્ટાન્ડર્ડ TDS અને pH વોટર ટેસ્ટિંગ", included: true },
      { text: "FRP વેસલ મલ્ટીપોર્ટ વાલ્વ બેકવોશ અને રિન્સિંગ", included: true },
      { text: "હાઈ-પ્રેશર વર્ટિકલ મોટર પંપ અને સેન્સર મોનિટરિંગ", included: true },
      { text: "પ્રાયોરિટી ઇમરજન્સી બ્રેકડાઉન રિસ્પોન્સ (૨ થી ૪ કલાકમાં)", included: true },
    ],
    isPopular: false,
  },
];

export default function AmcPlans() {
  return (
    <section id="amc-plans" className="py-16 sm:py-20 bg-black border-b border-neutral-900 text-white transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-400 tracking-wide uppercase mb-2">
            <span>વાર્ષિક મેન્ટેનન્સ કોન્ટ્રાક્ટ (AMC Comparison)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            તમારા બજેટ અને જરૂરિયાત મુજબ યોગ્ય AMC પ્લાન પસંદ કરો
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 mt-2">
            કોઈ છુપી શરતો નહીં. અમે દરેક પ્લાનમાં શું મળશે અને શું બાકાત રહેશે તે અગાઉથી સ્પષ્ટ જણાવીએ છીએ.
          </p>
        </div>

        {/* 3 Tiers Comparison Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {amcTiers.map((tier) => (
            <div
              key={tier.id}
              className={`rounded-xl p-6 sm:p-7 flex flex-col justify-between transition-colors ${
                tier.isPopular
                  ? "bg-[#121212] border-2 border-white shadow-2xl relative"
                  : "bg-[#0a0a0a] border border-neutral-800 shadow-sm"
              }`}
            >
              <div>
                {/* Popular Badge */}
                {tier.badge && (
                  <div className="mb-4">
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded inline-block ${
                        tier.isPopular
                          ? "bg-white text-black"
                          : "bg-[#171717] text-neutral-300 border border-neutral-700"
                      }`}
                    >
                      {tier.badge}
                    </span>
                  </div>
                )}

                {/* Plan Title */}
                <h3 className="text-xl font-bold text-white">
                  {tier.nameGu}
                </h3>
                <span className="text-xs font-medium text-neutral-400 block mb-3">
                  {tier.nameEn}
                </span>

                <div className="py-3 border-y border-neutral-800 my-4">
                  <div className="text-lg font-bold text-white">
                    {tier.priceEstimate}
                  </div>
                  <div className="text-xs text-neutral-400">
                    {tier.priceNote}
                  </div>
                </div>

                <p className="text-xs text-neutral-300 mb-5">
                  <strong className="text-white">લાયક:</strong> {tier.targetAudience}
                </p>

                {/* Deliverables List */}
                <div className="space-y-3 mb-6">
                  {tier.deliverables.map((item, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2.5 text-xs text-neutral-200">
                      {item.included ? (
                        <Check className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                      ) : (
                        <X className="w-4 h-4 text-neutral-600 mt-0.5 flex-shrink-0" />
                      )}
                      <span className={item.included ? "font-normal" : "text-neutral-500 line-through"}>
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Clear Exclusion Notice on Basic Tier */}
                {tier.exclusionNote && (
                  <div className="bg-[#141414] border border-neutral-700 rounded-lg p-3 text-[11px] text-neutral-300 leading-relaxed mb-6">
                    <div className="flex items-start gap-1.5 font-semibold mb-0.5 text-white">
                      <ShieldAlert className="w-3.5 h-3.5 text-white mt-0.5 flex-shrink-0" />
                      <span>બાકાત સૂચના (Exclusion Notice)</span>
                    </div>
                    {tier.exclusionNote}
                  </div>
                )}
              </div>

              {/* Action Link to Booking Form */}
              <div className="pt-4 border-t border-neutral-800">
                <a
                  href="#contact"
                  className={`w-full h-10 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                    tier.isPopular
                      ? "bg-white hover:bg-neutral-200 text-black shadow-sm"
                      : "bg-[#141414] hover:bg-[#1f1f1f] text-white border border-neutral-700"
                  }`}
                >
                  <span>આ પ્લાન માટે પૂછપરછ કરો</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
