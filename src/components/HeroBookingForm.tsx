"use client";

import React, { useState } from "react";
import { Phone, MessageSquare, CheckCircle2, ShieldCheck, Clock, Activity } from "lucide-react";

interface FormState {
  customerName: string;
  phoneNumber: string;
  serviceType: string;
  address: string;
}

export default function HeroBookingForm() {
  const [formData, setFormData] = useState<FormState>({
    customerName: "",
    phoneNumber: "",
    serviceType: "RO સર્વિસ અને TDS ચેકઅપ (RO Servicing)",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<{
    whatsappUrl: string;
    messageText: string;
    customerName: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    // Validate 10-digit Indian mobile
    const cleanedPhone = formData.phoneNumber.replace(/[\s\-\(\)\+]/g, "");
    const normalizedPhone = cleanedPhone.startsWith("91") && cleanedPhone.length === 12
      ? cleanedPhone.slice(2)
      : cleanedPhone.startsWith("0") && cleanedPhone.length === 11
      ? cleanedPhone.slice(1)
      : cleanedPhone;

    if (!/^[6-9]\d{9}$/.test(normalizedPhone)) {
      setErrorMsg("કૃપા કરીને માન્ય ૧૦-અંકનો ભારતીય મોબાઈલ નંબર દાખલ કરો (Enter a valid 10-digit Indian mobile number).");
      setLoading(false);
      return;
    }

    const addressText = formData.address.trim() ? formData.address.trim() : "અમદાવાદ (Ahmedabad)";
    
    // Direct pre-written WhatsApp message
    const prewrittenWhatsAppMessage = `Hi, I am ${formData.customerName}.

I would like to book an RO water purifier service with Aqua Solutions:
• Service: ${formData.serviceType}
• Mobile: +91 ${normalizedPhone}
• Address/Area: ${addressText}

નમસ્તે, મારું નામ ${formData.customerName} છે. મને Aqua Solutions માંથી ${formData.serviceType} માટે સર્વિસ જોઈએ છે. કૃપા કરીને મારું બુકિંગ કન્ફર્મ કરશો.`;

    const businessPhone = "9662021602";
    const whatsappUrl = `https://wa.me/91${businessPhone}?text=${encodeURIComponent(prewrittenWhatsAppMessage)}`;

    try {
      window.open(whatsappUrl, "_blank");
    } catch (e) {
      console.log("Auto-open blocked, user can click button", e);
    }

    // Save to database in background
    fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customerName: formData.customerName,
        phoneNumber: normalizedPhone,
        serviceType: formData.serviceType,
        address: formData.address,
        sourceForm: "hero_quick_form",
      }),
    }).catch((err) => console.log("Background DB sync:", err));

    setSubmittedData({
      whatsappUrl,
      messageText: prewrittenWhatsAppMessage,
      customerName: formData.customerName,
    });

    setLoading(false);
  };

  return (
    <section id="hero" className="relative bg-white text-black dark:bg-black dark:text-white border-b border-neutral-200 dark:border-neutral-900 pt-10 pb-16 lg:pt-14 lg:pb-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column: Hero Copy & Trust Badges (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Direct Local Service Badge */}
            <div className="inline-flex items-center gap-2 bg-neutral-100 border border-neutral-300 text-neutral-800 dark:bg-[#0d0d0d] dark:border-neutral-800 dark:text-neutral-300 text-xs px-3 py-1.5 rounded-md font-medium transition-colors">
              <span className="w-2 h-2 rounded-full bg-black dark:bg-white"></span>
              <span>અમદાવાદ અને ગાંધીનગરમાં આજની ડોરસ્ટેપ સર્વિસ ઉપલબ્ધ</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-black dark:text-white leading-[1.18] transition-colors">
              તમારા પરિવાર અને બિઝનેસ માટે{" "}
              <span className="underline decoration-neutral-400 dark:decoration-neutral-600 decoration-2 underline-offset-4">
                ૧૦૦% શુદ્ધ પીવાનું પાણી
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl transition-colors">
              Aqua Solutions — અમદાવાદમાં Kent, Aquaguard, Pureit સહિત તમામ ડોમેસ્ટિક RO પ્યુરિફાયર અને 50 LPH થી 2000+ LPH કોમર્શિયલ પ્લાન્ટ્સનું વેચાણ, ઓરિજિનલ સ્પેર પાર્ટ્સ સાથે રીપેરિંગ અને વિશ્વસનીય AMC વાર્ષિક કોન્ટ્રાક્ટ.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="tel:+919662021602"
                className="h-11 px-5 bg-black hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-200 dark:text-black font-semibold rounded-lg inline-flex items-center gap-2 transition-colors shadow-sm"
              >
                <Phone className="w-4 h-4" />
                <span>+91 96620 21602 પર કૉલ કરો</span>
              </a>
              <a
                href="https://wa.me/919662021602?text=Hi,%20I%20am%20interested%20in%20Aqua%20Solutions%20RO%20water%20purifier%20service."
                target="_blank"
                rel="noopener noreferrer"
                className="h-11 px-5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg inline-flex items-center gap-2 transition-colors shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp પર મેસેજ કરો</span>
              </a>
            </div>

            {/* Grounded Water Purity & Operational Status */}
            <div className="bg-neutral-50 border border-neutral-200 dark:bg-[#0a0a0a] dark:border-neutral-800 rounded-xl p-4 sm:p-5 mt-6 shadow-sm transition-colors">
              <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3 mb-3">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-black dark:text-white" />
                  <span className="text-xs font-semibold text-black dark:text-white tracking-wide">
                    પાણીની ગુણવત્તા માપદંડ (TDS Quality Standard)
                  </span>
                </div>
                <span className="text-[11px] font-mono bg-white border border-neutral-200 text-neutral-700 dark:bg-black dark:text-neutral-300 dark:border-neutral-800 px-2 py-0.5 rounded">
                  IS 10500 Compliant
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div className="bg-white border border-neutral-200 dark:bg-black dark:border-neutral-800 rounded-lg p-2.5 transition-colors">
                  <span className="text-neutral-500 dark:text-neutral-400 block text-[11px]">કાચું બોરવેલ પાણી (Raw Tap)</span>
                  <span className="text-sm font-semibold text-amber-700 dark:text-neutral-200 tabular-nums">
                    650 - 1200 TDS
                  </span>
                  <span className="text-[10px] text-neutral-400 dark:text-neutral-500 block mt-0.5">હાનિકારક ક્ષારયુક્ત</span>
                </div>

                <div className="bg-neutral-100 border border-neutral-300 dark:bg-[#141414] dark:border-neutral-700 rounded-lg p-2.5 transition-colors">
                  <span className="text-black dark:text-white block text-[11px] font-medium">Aqua Solutions RO</span>
                  <span className="text-sm font-semibold text-emerald-700 dark:text-white tabular-nums">
                    40 - 70 TDS (શુદ્ધ)
                  </span>
                  <span className="text-[10px] text-neutral-600 dark:text-neutral-400 block mt-0.5">આદર્શ મિનરલ બેલેન્સ</span>
                </div>

                <div className="col-span-2 sm:col-span-1 bg-white border border-neutral-200 dark:bg-black dark:border-neutral-800 rounded-lg p-2.5 transition-colors">
                  <span className="text-neutral-500 dark:text-neutral-400 block text-[11px]">ટેકનિશિયન રિસ્પોન્સ</span>
                  <span className="text-sm font-semibold text-black dark:text-white tabular-nums">
                    30 - 45 મિનિટ
                  </span>
                  <span className="text-[10px] text-neutral-400 dark:text-neutral-500 block mt-0.5">અમદાવાદ એરિયા વાઇઝ</span>
                </div>
              </div>
            </div>

            {/* Verifiable 3 Figures (10+ Years, 5000+ Customers, 24/7 Support) */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-neutral-200 dark:border-neutral-800 transition-colors">
              <div>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-black dark:text-white tabular-nums">
                  10+
                </div>
                <div className="text-xs sm:text-sm font-medium text-neutral-800 dark:text-neutral-300 mt-0.5">
                  વર્ષનો અનુભવ
                </div>
                <div className="text-[11px] text-neutral-500">10+ Years in Ahmedabad</div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-black dark:text-white tabular-nums">
                  5,000+
                </div>
                <div className="text-xs sm:text-sm font-medium text-neutral-800 dark:text-neutral-300 mt-0.5">
                  સંતુષ્ટ ગ્રાહકો
                </div>
                <div className="text-[11px] text-neutral-500">5,000+ Happy Customers</div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-black dark:text-white tabular-nums">
                  24/7
                </div>
                <div className="text-xs sm:text-sm font-medium text-neutral-800 dark:text-neutral-300 mt-0.5">
                  સર્વિસ સપોર્ટ
                </div>
                <div className="text-[11px] text-neutral-500">Emergency Support</div>
              </div>
            </div>

          </div>

          {/* Right Column: Embedded Quick Booking Card (5 cols) */}
          <div id="quick-booking" className="lg:col-span-5">
            <div className="bg-white border border-neutral-200 text-black shadow-lg dark:bg-[#0a0a0a] dark:border-neutral-800 dark:text-white dark:shadow-2xl rounded-2xl p-6 sm:p-7 transition-colors">
              <div className="border-b border-neutral-200 dark:border-neutral-800 pb-4 mb-5">
                <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide block">
                  ત્વરિત ડોરસ્ટેપ સર્વિસ (Quick Service)
                </span>
                <h3 className="text-xl font-bold text-black dark:text-white mt-1">
                  ઝડપી સર્વિસ બુક કરો
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                  ફોર્મ સબમિટ કરતાં જ વિગતો સીધી WhatsApp માં ખૂલશે — કોઈ ઇમેઇલની રાહ જોવી નહીં પડે.
                </p>
              </div>

              {submittedData ? (
                <div className="bg-neutral-50 border border-neutral-300 dark:bg-black dark:border-neutral-700 rounded-xl p-5 space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-white mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-bold text-black dark:text-white">
                        નમસ્તે {submittedData.customerName}, તમારો WhatsApp મેસેજ તૈયાર છે!
                      </h4>
                      <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-1 leading-relaxed">
                        નીચે આપેલા બટન પર ક્લિક કરીને સીધો WhatsApp મેસેજ મોકલો:
                      </p>
                    </div>
                  </div>

                  {/* Prewritten Message Preview Box */}
                  <div className="bg-neutral-100 border border-neutral-200 text-neutral-800 dark:bg-[#121212] dark:border-neutral-800 dark:text-neutral-300 rounded-lg p-3 text-[11px] font-mono whitespace-pre-wrap leading-relaxed max-h-36 overflow-y-auto">
                    {submittedData.messageText}
                  </div>

                  <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800 flex flex-col gap-2">
                    <a
                      href={submittedData.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors shadow-md"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>WhatsApp માં મેસેજ મોકલો (Open WhatsApp Now)</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => setSubmittedData(null)}
                      className="text-xs text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white text-center py-1 transition-colors"
                    >
                      બીજી નવી સર્વિસ બુક કરો
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMsg && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-700 dark:bg-[#1a0505] dark:border-red-900 dark:text-red-300 rounded-lg text-xs">
                      {errorMsg}
                    </div>
                  )}

                  {/* Customer Name */}
                  <div>
                    <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                      તમારું પૂરું નામ (Full Name) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="દા.ત. રમેશભાઈ પટેલ"
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      className="w-full h-10 px-3 rounded-lg border border-neutral-300 bg-neutral-50 text-black placeholder-neutral-400 focus:border-black focus:ring-1 focus:ring-black dark:border-neutral-800 dark:bg-black dark:text-white dark:placeholder-neutral-600 dark:focus:border-white dark:focus:ring-1 dark:focus:ring-white text-sm"
                    />
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                      ૧૦-અંકનો મોબાઈલ નંબર (Mobile Number) *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-xs font-mono text-neutral-500">
                        +91
                      </div>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        placeholder="98XXXXXXXX"
                        value={formData.phoneNumber}
                        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                        className="w-full h-10 pl-11 pr-3 rounded-lg border border-neutral-300 bg-neutral-50 text-black placeholder-neutral-400 focus:border-black focus:ring-1 focus:ring-black dark:border-neutral-800 dark:bg-black dark:text-white dark:placeholder-neutral-600 dark:focus:border-white dark:focus:ring-1 dark:focus:ring-white text-sm font-mono"
                      />
                    </div>
                  </div>

                  {/* Service Type Dropdown */}
                  <div>
                    <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                      સર્વિસનો પ્રકાર (Service Type) *
                    </label>
                    <select
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      className="w-full h-10 px-3 rounded-lg border border-neutral-300 bg-white text-black dark:border-neutral-800 dark:bg-black dark:text-white text-sm focus:border-black dark:focus:border-white focus:ring-1 focus:ring-black dark:focus:ring-white"
                    >
                      <option value="RO સર્વિસ અને TDS ચેકઅપ (RO Servicing)">
                        RO સર્વિસ અને TDS ચેકઅપ (General Servicing)
                      </option>
                      <option value="ફિલ્ટર અને મેમ્બ્રેન ચેન્જ (Filter Change)">
                        ફિલ્ટર અને મેમ્બ્રેન ચેન્જ (Filter & Membrane Change)
                      </option>
                      <option value="પાણીનું લીકેજ અથવા મોટર રિપેરિંગ (Repair)">
                        પાણીનું લીકેજ / મોટર / SMPS રિપેરિંગ (RO Repair)
                      </option>
                      <option value="નવા RO પ્યુરિફાયરનું ઇન્સ્ટોલેશન (New RO)">
                        નવું RO પ્યુરિફાયર વેચાણ અને ફિટિંગ (New Installation)
                      </option>
                      <option value="વાર્ષિક AMC મેન્ટેનન્સ પ્લાન (AMC Plan)">
                        વાર્ષિક AMC મેન્ટેનન્સ પ્લાન (Annual Maintenance)
                      </option>
                      <option value="કોમર્શિયલ RO પ્લાન્ટ (50-2000 LPH)">
                        કોમર્શિયલ RO પ્લાન્ટ 50 થી 2000+ LPH (Commercial Plant)
                      </option>
                    </select>
                  </div>

                  {/* Area / Address */}
                  <div>
                    <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                      વિસ્તાર / સરનામું (Area in Ahmedabad)
                    </label>
                    <input
                      type="text"
                      placeholder="દા.ત. વસ્ત્રાપુર, બોડકદેવ, સેટેલાઇટ, બોપલ..."
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full h-10 px-3 rounded-lg border border-neutral-300 bg-neutral-50 text-black placeholder-neutral-400 focus:border-black focus:ring-1 focus:ring-black dark:border-neutral-800 dark:bg-black dark:text-white dark:placeholder-neutral-600 dark:focus:border-white dark:focus:ring-1 dark:focus:ring-white text-sm"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-11 bg-black hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-200 dark:text-black font-semibold text-sm rounded-lg flex items-center justify-center gap-2 transition-colors shadow-sm active:translate-y-0.5 mt-2"
                  >
                    {loading ? (
                      <span>મેસેજ તૈયાર થઈ રહ્યો છે...</span>
                    ) : (
                      <>
                        <MessageSquare className="w-4 h-4" />
                        <span>WhatsApp પર સીધો મેસેજ મોકલો</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-3 pt-2 text-[11px] text-neutral-500 dark:text-neutral-400">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-black dark:text-white" />
                      ઓરિજિનલ સ્પેર પાર્ટ્સ
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-black dark:text-white" />
                      તાત્કાલિક વોટ્સએપ કનેક્ટ
                    </span>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
