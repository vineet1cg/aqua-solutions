import React from "react";
import { Factory, Layers } from "lucide-react";

interface BrandItem {
  name: string;
  subtext: string;
  models: string;
  category: "Domestic" | "Commercial";
}

const brands: BrandItem[] = [
  {
    name: "Kent RO",
    subtext: "ગ્રાન્ડ પ્લસ, પ્રાઇમ, પર્લ",
    models: "Grand+, Prime TC, Pearl",
    category: "Domestic",
  },
  {
    name: "Aquaguard",
    subtext: "યુરેકા ફોર્બ્સ સિરીઝ",
    models: "Geneus, Enhance, Reviva",
    category: "Domestic",
  },
  {
    name: "Pureit",
    subtext: "હિન્દુસ્તાન યુનિલીવર",
    models: "Mineral RO, Copper+, Marvella",
    category: "Domestic",
  },
  {
    name: "Livpure",
    subtext: "પ્લેટિનો અને ગ્લો સિરીઝ",
    models: "Platino, Glo, Touch 2000",
    category: "Domestic",
  },
  {
    name: "Blue Star",
    subtext: "સ્ટેલા અને એરિસ્ટો સિરીઝ",
    models: "Stella, Aristo, Majesto",
    category: "Domestic",
  },
  {
    name: "Custom Commercial Plants",
    subtext: "50 LPH થી 2000+ LPH",
    models: "FRP & SS Vessels, Industrial Plants",
    category: "Commercial",
  },
];

export default function BrandStrip() {
  return (
    <section id="brands" className="py-14 bg-black border-b border-neutral-900 text-white transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Strip Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block">
              મલ્ટી-બ્રાન્ડ સપોર્ટ (Multi-Brand Support)
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              તમામ અગ્રણી વોટર પ્યુરિફાયર બ્રાન્ડ્સમાં ઓરિજિનલ સર્વિસ
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-md">
            તમારું RO કોઈપણ કંપનીનું હોય, અમારી પાસે તેના ઓરિજિનલ સ્પેર પાર્ટ્સ અને પ્રમાણિત ફિલ્ટર કીટ તાત્કાલિક ઉપલબ્ધ છે.
          </p>
        </div>

        {/* Brand Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {brands.map((b, i) => (
            <div
              key={i}
              className={`border rounded-xl p-4 flex flex-col justify-between transition-colors ${
                b.category === "Commercial"
                  ? "bg-[#141414] border-neutral-700"
                  : "bg-[#0a0a0a] border-neutral-800 hover:border-neutral-700"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                    {b.category}
                  </span>
                  {b.category === "Commercial" ? (
                    <Factory className="w-3.5 h-3.5 text-white" />
                  ) : (
                    <Layers className="w-3.5 h-3.5 text-neutral-400" />
                  )}
                </div>
                <div className="text-sm sm:text-base font-bold text-white">
                  {b.name}
                </div>
                <div className="text-[11px] text-neutral-300 font-medium mt-0.5">
                  {b.subtext}
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-neutral-800">
                <span className="text-[10px] text-neutral-400 font-mono block truncate">
                  {b.models}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
