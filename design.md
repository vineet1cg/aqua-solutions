# Design System: Aqua Solutions (Pure Jet Black & Monochrome Carbon Visual System)

> **License & Credit:** Guided by the [unslop](https://github.com/heydamir/unslop.git) craft framework by Damir Sokolovsky ([@heydamir](https://x.com/heydamir), CC BY 4.0).
> **Rule Requirement:** Strict Pure Black (`#000000`) and carbon shades. Absolutely zero blue, sky, or slate tones.

---

## 1. Product Direction

* **Product:** Dependable domestic and commercial RO water purifier sales, rapid doorstep repairs, and structured Annual Maintenance Contracts (AMC) for households, offices, and factories across Ahmedabad and surrounding Gujarat.
* **Character:** *Grounded, dependable, high-contrast, pure black.* Industrial utility craft with pure black `#000000` depth, crisp monochrome hierarchy, and zero gimmicks.
* **World:** Ahmedabad water engineering & equipment: stainless steel filter housings, heavy-duty industrial pumps, precision TDS/pH meters, black pressure vessels, technician tool rolls, and pure drinking water.
* **Moments:**
  1. *TDS Purity Readout:* Pure black industrial comparison card (`કાચું પાણી Raw: 850+ ppm` vs `Aqua Solutions RO: 40-70 ppm`) with live 30–45 minute technician response metrics.
  2. *Transparent AMC Contract Sheet:* Specification-driven comparison highlighting the membrane exclusion on Basic, full coverage on Comprehensive, and monthly factory testing on Commercial.
* **Signature Detail:** High-contrast pure white/black verification seal (`● TDS પ્રમાણિત | 100% શુદ્ધ પાણી`).

---

## 2. Monochrome Color System (Zero Blue)

```css
/* Pure Jet Black (#000000) & Neutral Carbon Shades */
--surface-bg:        #000000;  /* 100% Pure Jet Black Canvas */
--surface-card:      #0a0a0a;  /* Deepest carbon black card surface */
--surface-raised:    #141414;  /* Raised surface for inputs & active elements */
--surface-sunken:    #050505;  /* Sunken containers */
--border-hairline:   #262626;  /* Neutral carbon border (1px hairline) */

/* Text Roles */
--text-primary:      #ffffff;  /* 100% Crisp White */
--text-secondary:    #a3a3a3;  /* Neutral-400 for descriptive Gujarati & English body */
--text-muted:        #737373;  /* Neutral-500 for captions and technical units */

/* Action Tones */
--action-primary:    #ffffff;  /* High-contrast solid white buttons with black text */
--action-hover:      #e5e5e5;  /* Subtle off-white hover */
--action-dark:       #141414;  /* Carbon secondary button */
```

---

## 3. Pre-Written WhatsApp Flow (Skipping Mailer)

When the user submits either booking form, the application directly opens WhatsApp with a complete, structured message:
```text
Hi, I am [Customer Name].

I would like to book an RO water purifier service with Aqua Solutions:
• Service: [Selected Service]
• Mobile: +91 [Customer 10-digit Phone]
• Preferred Time: [Selected Time Slot]
• Full Address: [Customer Address / Area in Ahmedabad]

નમસ્તે, મારું નામ [Customer Name] છે. મને Aqua Solutions માંથી [Service] માટે સર્વિસ જોઈએ છે. કૃપા કરીને મારું બુકિંગ કન્ફર્મ કરશો.
```
* **Instant WhatsApp Launch:** `https://wa.me/919662021602?text=...` opens in one click.
* **Zero Mailer Delays:** Completely eliminates mailer errors or waiting.
* **Background Sync:** Still quietly synchronizes to `/api/bookings` for the owner's Admin Dashboard (`/admin`).
