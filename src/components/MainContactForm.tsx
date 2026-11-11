"use client";

import React, { useState } from "react";
import { Phone, MessageSquare, Clock, MapPin, CheckCircle2, ShieldCheck, Send } from "lucide-react";

interface ContactFormData {
  customerName: string;
  phoneNumber: string;
  serviceType: string;
  preferredTime: string;
  address: string;
}

export default function MainContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    customerName: "",
    phoneNumber: "",
    serviceType: "Comprehensive AMC Plan",
    preferredTime: "Morning (9:00 AM - 1:00 PM)",
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

    // Validate 10-digit Indian phone
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

    // Prewritten WhatsApp message as requested
    const prewrittenWhatsAppMessage = `Hi, I am ${formData.customerName}.

I would like to book an RO water purifier service with Aqua Solutions:
• Service: ${formData.serviceType}
• Mobile: +91 ${normalizedPhone}
• Preferred Time: ${formData.preferredTime}
• Full Address: ${addressText}

નમસ્તે, મારું નામ ${formData.customerName} છે. મને Aqua Solutions માંથી ${formData.serviceType} માટે સર્વિસ જોઈએ છે. કૃપા કરીને મારું બુકિંગ કન્ફર્મ કરશો.`;

    const businessPhone = "9662021602";
    const whatsappUrl = `https://wa.me/91${businessPhone}?text=${encodeURIComponent(prewrittenWhatsAppMessage)}`;

    // Try to open WhatsApp directly
    try {
      window.open(whatsappUrl, "_blank");
    } catch (e) {
      console.log("Auto-open blocked, user can click button", e);
    }

    // Save to database in background for Admin Dashboard (skips blocking mailer)
    fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customerName: formData.customerName,
        phoneNumber: normalizedPhone,
        serviceType: formData.serviceType,
        preferredTime: formData.preferredTime,
        address: formData.address,
        sourceForm: "main_contact_form",
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
    <section id="contact" className="py-16 sm:py-20 bg-slate-900 border-b border-slate-800 text-slate-100 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-ocean-400 tracking-wide uppercase mb-2">
            <span>વિસ્તૃત સર્વિસ બુકિંગ (Detailed Service Request)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            અમારી સાથે સંપર્ક કરો અથવા મુલાકાત શિડ્યુલ કરો
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2">
            તમારા અનુકૂળ સમયે ટેકનિશિયનની વિઝિટ બુક કરો. ફોર્મ ભરતાં જ બધી વિગત સાથે સીધો WhatsApp મેસેજ તૈયાર થઈ જશે.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Detailed Booking Form (7 cols) */}
          <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm">
            <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3 mb-6">
              સર્વિસ રિક્વેસ્ટ ફોર્મ (Service Booking Form)
            </h3>

            {submittedData ? (
              <div className="bg-slate-900 border border-emerald-800/80 rounded-xl p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-base font-bold text-white">
                      નમસ્તે {submittedData.customerName}, તમારો WhatsApp મેસેજ તૈયાર છે!
                    </h4>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      બધી વિગતો સાથેનો પ્રિ-રિટન મેસેજ નીચે મુજબ છે. મોકલવા માટે લીલા બટન પર ક્લિક કરો:
                    </p>
                  </div>
                </div>

                {/* Prewritten Message Preview Box */}
                <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 text-[11px] font-mono text-slate-300 whitespace-pre-wrap leading-relaxed max-h-40 overflow-y-auto">
                  {submittedData.messageText}
                </div>

                <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row gap-3">
                  <a
                    href={submittedData.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 h-11 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors shadow-md"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp માં મોકલો (Open in WhatsApp)</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setSubmittedData(null)}
                    className="px-4 h-11 border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg transition-colors"
                  >
                    બીજું ફોર્મ ભરો
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMsg && (
                  <div className="p-3 bg-red-950/50 border border-red-800 rounded-lg text-xs text-red-300">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      પૂરું નામ (Full Name) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="દા.ત. અજય પંચાલ"
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      className="w-full h-10 px-3 rounded-lg border border-slate-700 text-sm focus:border-ocean-500 focus:ring-1 focus:ring-ocean-500 bg-slate-900 text-white placeholder-slate-500"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      મોબાઈલ નંબર (10-Digit Mobile) *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-xs font-mono text-slate-500">
                        +91
                      </div>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        placeholder="98XXXXXXXX"
                        value={formData.phoneNumber}
                        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                        className="w-full h-10 pl-11 pr-3 rounded-lg border border-slate-700 text-sm font-mono focus:border-ocean-500 focus:ring-1 focus:ring-ocean-500 bg-slate-900 text-white placeholder-slate-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Service Category */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      સર્વિસ કેટેગરી (Service Category) *
                    </label>
                    <select
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      className="w-full h-10 px-3 rounded-lg border border-slate-700 text-sm focus:border-ocean-500 focus:ring-1 focus:ring-ocean-500 bg-slate-900 text-white"
                    >
                      <option value="Basic Service AMC">બેઝિક સર્વિસ AMC (Basic AMC)</option>
                      <option value="Comprehensive AMC Plan">કોમ્પ્રિહેન્સિવ AMC (Comprehensive AMC)</option>
                      <option value="Commercial Plant AMC">કોમર્શિયલ પ્લાન્ટ AMC (Commercial AMC)</option>
                      <option value="RO Filter & Membrane Change">ફિલ્ટર અને મેમ્બ્રેન ચેન્જ (Filter Change)</option>
                      <option value="RO General Repair & TDS Balance">RO રિપેરિંગ અને TDS બેલેન્સિંગ (Repair)</option>
                      <option value="New Domestic RO Purchase">નવું ડોમેસ્ટિક RO ખરીદી અને ફિટિંગ (New RO)</option>
                      <option value="Commercial Plant Inquiry (50-2000 LPH)">કોમર્શિયલ પ્લાન્ટ 50-2000 LPH ઇન્ક્વાયરી</option>
                    </select>
                  </div>

                  {/* Preferred Time Slot */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      અનુકૂળ સમય (Preferred Time Slot)
                    </label>
                    <select
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      className="w-full h-10 px-3 rounded-lg border border-slate-700 text-sm focus:border-ocean-500 focus:ring-1 focus:ring-ocean-500 bg-slate-900 text-white"
                    >
                      <option value="Morning (9:00 AM - 1:00 PM)">સવાર (Morning: 9:00 AM - 1:00 PM)</option>
                      <option value="Afternoon (1:00 PM - 5:00 PM)">બપોર (Afternoon: 1:00 PM - 5:00 PM)</option>
                      <option value="Evening (5:00 PM - 9:00 PM)">સાંજ (Evening: 5:00 PM - 9:00 PM)</option>
                    </select>
                  </div>
                </div>

                {/* Full Address */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    સંપૂર્ણ સરનામું / સોસાયટી અને વિસ્તાર (Full Address) *
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="દા.ત. ફ્લેટ નં. 402, વૃંદાવન એપાર્ટમેન્ટ, જોધપુર ક્રોસ રોડ, સેટેલાઇટ, અમદાવાદ - 380015"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full p-3 rounded-lg border border-slate-700 text-sm focus:border-ocean-500 focus:ring-1 focus:ring-ocean-500 bg-slate-900 text-white placeholder-slate-500"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-11 bg-ocean-600 hover:bg-ocean-700 disabled:opacity-70 text-white font-medium text-sm rounded-lg flex items-center justify-center gap-2 transition-colors shadow-sm active:translate-y-0.5"
                >
                  {loading ? (
                    <span>મેસેજ તૈયાર થઈ રહ્યો છે...</span>
                  ) : (
                    <>
                      <MessageSquare className="w-4 h-4" />
                      <span>WhatsApp પર સીધો મેસેજ મોકલો (Instant WhatsApp)</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Business Info & Service Area (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct Contact Card */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-sm">
              <h4 className="text-base font-bold text-white border-b border-slate-800 pb-3 mb-4">
                સીધો સંપર્ક કરો (Direct Contact)
              </h4>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-ocean-400 flex-shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">કૉલ કરો (Direct Call):</span>
                    <a
                      href="tel:+919662021602"
                      className="text-base font-bold font-mono text-white hover:text-ocean-400 transition-colors"
                    >
                      +91 96620 21602
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-emerald-400 flex-shrink-0">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">વોટ્સએપ હેલ્પલાઇન (WhatsApp):</span>
                    <a
                      href="https://wa.me/919662021602?text=Hi,%20I%20am%20interested%20in%20Aqua%20Solutions%20RO%20water%20purifier%20service."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-bold font-mono text-emerald-400 hover:text-emerald-300 transition-colors"
                    >
                      +91 96620 21602
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 flex-shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">કામકાજનો સમય (Service Hours):</span>
                    <span className="text-sm font-semibold text-slate-200">
                      9:00 AM – 9:00 PM (સોમવાર થી રવિવાર)
                    </span>
                    <span className="text-[11px] text-slate-500 block">રોજે રોજ સેવા ઉપલબ્ધ</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 flex-shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">સેવા વિસ્તાર (Coverage Area):</span>
                    <span className="text-sm font-semibold text-slate-200">
                      અમદાવાદ અને આસપાસનું ગુજરાત
                    </span>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      વસ્ત્રાપુર, બોડકદેવ, સેટેલાઇટ, બોપલ, ગોતા, ચાંદખેડા, નરોડા, મણિનગર, નિકોલ, સાણંદ અને ગાંધીનગર.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quality Commitment Card */}
            <div className="bg-slate-950 border border-slate-800 text-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="w-5 h-5 text-aqua-400" />
                <h4 className="text-sm font-bold text-white">Aqua Solutions ની ગેરંટી</h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                અમે માત્ર ૧૦૦% ઓરિજિનલ સ્પેર પાર્ટ્સનો ઉપયોગ કરીએ છીએ. દરેક સર્વિસ પછી ટેકનિશિયન તમારી હાજરીમાં TDS ટેસ્ટિંગ કરી પરિણામ દર્શાવશે.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
