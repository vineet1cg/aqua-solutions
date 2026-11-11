# Design System: Aqua Solutions (Unslop Visual System)

> **License & Credit:** Guided by the [unslop](https://github.com/heydamir/unslop.git) craft framework by Damir Sokolovsky ([@heydamir](https://x.com/heydamir), CC BY 4.0).
> **Purpose:** A credible, grounded, and high-trust digital presence for Aqua Solutions — an established RO water purifier sales, repair, and AMC service provider based in Ahmedabad, Gujarat.

---

## 1. Product Direction

* **Product:** Dependable domestic and commercial RO water purifier sales, rapid doorstep repairs, and structured Annual Maintenance Contracts (AMC) for households, offices, and factories across Ahmedabad and surrounding Gujarat.
* **Character:** *Grounded, dependable, responsive.* Honest local service craft without SaaS veneer, gimmicky animations, or generic corporate fluff.
* **World:** Ahmedabad local utility and water engineering: high-grade stainless steel filter housings, poly-spun sediment cartridges, reverse osmosis membrane pressure vessels, digital TDS & pH meters, brass fittings, technician tool rolls, and clean Gujarat municipal drinking water.
* **Moments:**
  1. *The Purity Verification & Service Dispatch Card:* A grounded, tangible TDS readout comparison (`કાચું પાણી Raw: 850+ ppm` vs `શુદ્ધ પાણી Pure RO: 40-70 ppm`) paired with live technician dispatch metrics (30-minute response in Ahmedabad).
  2. *The Transparent AMC Contract Sheet:* An industrial-style comparison sheet with unequivocal service deliverables and unambiguous exclusions (specifically highlighting the membrane exclusion on the Basic tier, full electrical/membrane coverage on Comprehensive, and monthly factory testing on Commercial).
* **Signature Detail:** A calibrated TDS status seal (`● TDS પ્રમાણિત | 100% શુદ્ધ પાણી`) and quiet status badge in the header and booking cards, reflecting real water quality testing.

---

## 2. Unslop Rules Applied & Audit Decisions

| Slop Pattern (AI/Template Tells) | Unslop Fix Applied for Aqua Solutions |
| :--- | :--- |
| **Hue gradients & neon glows** (e.g., violet-to-blue, cyan glowing cards, gradient text) | **Flat, opaque surfaces with 1px neutral hairlines.** Primary brand ocean (`#0284c7`) and aqua (`#0d9488`) used with high contrast; absolutely zero gradient text, zero radial color blobs. |
| **Decorative emojis in labels & cards** (💧, ✨, 🚀, 🔧 in titles or badges) | **Strict 1.5-stroke Lucide line icons** at 16px/18px, colored strictly according to text role (secondary or muted). Zero emojis in interface chrome. |
| **Pill-shaped everything** (pills for cards, search, tags, badges) | **Mathematically nested radii**: Outer panel `16px`, Card `12px`, Input/Button `8px`, Tag/Badge `6px`. Formula: `R_inner = R_outer - padding`. |
| **Heavy bold text & all-caps tracking** (`NAVBAR`, `AMC PLANS`, 800/900 weights) | **Sentence case typography.** Font weights restricted to 400 (regular) and 500 (medium), with 600 reserved strictly for key metrics. Tracking is 0 on body and slightly open on captions. |
| **Bouncy animations, floating loops, and hover scales** (`hover:scale-105`, `animate-pulse`) | **Restrained, purposeful micro-transitions.** Single cubic curve `cubic-bezier(0.22, 1, 0.36, 1)`. Durations 120ms–180ms for interactions. No floating elements. |
| **Vague SaaS copy & fake hype** ("Transform your water experience", "AI-powered hydration") | **Direct, local Gujarati service copy with English technical terms** (AMC, TDS, LPH, RO, pH, SMPS). Factual verifiable figures: 10+ years, 5,000+ customers, 24/7 emergency support. |
| **Template-default grey without character** | **Cool ink-tinted steel neutral ramp** that evokes water purification equipment and stainless steel fixtures (`#0f172a`, `#1e293b`, `#334155`, `#e2e8f0`, `#f8fafc`). |

---

## 3. Design Tokens

### 3.1 Color Palette & Themes

```css
/* Default Black/Dark Theme (Default: Rich Ink/Slate-950) */
--surface-bg:        #030712;  /* Slate-950 deepest black canvas */
--surface-card:      #0b0f19;  /* Dark ink card surface */
--surface-raised:    #111827;  /* Slate-900 for inputs, active rows */
--surface-sunken:    #030712;  /* Deep black containers */
--border-hairline:   #1e293b;  /* Slate-800 hairline */

/* Text Roles (Dark Theme) */
--text-primary:      #f8fafc;  /* Crisp white high contrast */
--text-secondary:    #94a3b8;  /* Slate-400 bilingual body text */
--text-muted:        #64748b;  /* Slate-500 captions and meta */

/* Light Theme (Toggled via Theme Switcher) */
/*
--surface-bg:        #f8fafc;
--surface-card:      #ffffff;
--surface-raised:    #f1f5f9;
--border-hairline:   #cbd5e1;
--text-primary:      #0f172a;
--text-secondary:    #334155;
--text-muted:        #64748b;
*/

/* Brand & Accents */
--brand-ocean:       #0284c7;  /* Ocean Blue (Primary brand tone, CTAs) */
--brand-ocean-hover: #38bdf8;  /* Sky-400 */
--brand-aqua:        #0d9488;  /* Aqua / Teal (Verified tags, WhatsApp) */
--brand-aqua-hover:  #2dd4bf;  /* Teal-400 */
```

### 3.1.1 Theme Switcher
* **Default Theme:** Black / Dark Ink (`class="dark"` on `<html>`).
* **Switcher:** A quiet Sun/Moon toggle (`ThemeToggle.tsx`) placed in the sticky header, mobile menu, and footer.
* **Persistence:** Preserves user selection in `localStorage('theme')` with zero flash of unstyled content via head bootstrap script.

### 3.1.2 Direct WhatsApp Pre-Written Dispatch (No Mailer Delay)
When a user submits either booking form, the application directly constructs a structured, pre-written WhatsApp message:
```text
Hi, I am [Customer Name].

I would like to book an RO water purifier service with Aqua Solutions:
• Service: [Selected Service]
• Mobile: +91 [Customer Phone]
• Preferred Time: [Selected Time]
• Address/Area: [Customer Address]

નમસ્તે, મારું નામ [Customer Name] છે. મને Aqua Solutions માંથી [Service] માટે સર્વિસ જોઈએ છે. કૃપા કરીને મારું બુકિંગ કન્ફર્મ કરશો.
```
* **Instant Action:** Launches WhatsApp immediately (`https://wa.me/919662021602?text=...`).
* **Zero Mailer Dependency:** Skips blocking mailers (Resend/SMTP) entirely while quietly recording the lead to the PostgreSQL / in-memory database in the background for the owner's Admin Dashboard.

/* Brand & Accents */
--brand-ocean:       #0284c7;  /* Sky-600 / Ocean Blue (Primary brand tone, primary CTA, badges) */
--brand-ocean-hover: #0369a1;  /* Sky-700 (Focused / hovered action) */
--brand-aqua:        #0d9488;  /* Teal-600 / Aqua (Secondary accent, certified badges, WhatsApp links) */
--brand-aqua-hover:  #0f766e;  /* Teal-700 */

/* Status Tones */
--status-pending:    #d97706;  /* Amber-600 */
--status-assigned:   #0284c7;  /* Sky-600 */
--status-completed:  #16a34a;  /* Green-600 */
--status-cancelled:  #dc2626;  /* Red-600 */
```

### 3.2 Spacing System (Strict 4px Scale)

`4px`, `8px`, `12px`, `16px`, `20px`, `24px`, `32px`, `40px`, `48px`, `64px`, `80px`, `96px`

* **Inside controls (buttons, inputs):** `h-10 (40px)`, `px-4 (16px)`, `py-2 (8px)`
* **Between related items in lists:** `gap-2 (8px)` to `gap-3 (12px)`
* **Card internal padding:** `p-5 (20px)` to `p-6 (24px)`
* **Between section blocks:** `py-16 (64px)` to `py-20 (80px)`
* **Layout container max width:** `max-w-7xl (1280px)` with `px-4 sm:px-6 lg:px-8`

### 3.3 Typography

* **Gujarati Primary UI:** `Hind Vadodara` (`sans-serif`), fallback `Noto Sans Gujarati`
* **English & Technical Metrics:** `Inter`, fallback `system-ui`
* **Tabular Figures:** Used on all phone numbers, capacities (50–2000 LPH), pricing (₹), and dates (`tabular-nums font-mono`).

| Style Role | Font | Size | Line Height | Weight | Letter Spacing |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Top Tagline** | Hind Vadodara | 13px | 18px | 500 | Normal |
| **Hero Title** | Hind Vadodara | 40px–52px | 1.15 | 600 | -0.02em |
| **Hero Subtitle** | Hind Vadodara | 18px–20px | 28px | 400 | Normal |
| **Section Title** | Hind Vadodara | 28px–32px | 36px | 600 | -0.01em |
| **Card Heading** | Hind Vadodara / Inter | 18px–20px | 26px | 600 | Normal |
| **Body Text** | Hind Vadodara | 15px–16px | 24px | 400 | Normal |
| **Metric Figure** | Inter (Tabular) | 28px–32px | 32px | 600 | -0.01em |
| **Meta / Label** | Inter / Hind Vadodara | 12px–13px | 16px | 500 | 0.01em |

### 3.4 Corner Radius & Depth

* **Controls (Input, Button):** `rounded-md (6px)` to `rounded-lg (8px)`
* **Cards (Service cards, AMC pricing tiers):** `rounded-xl (12px)` with `1px solid var(--border-hairline)`
* **Panels / Hero Widget:** `rounded-2xl (16px)`
* **Shadows:** Restrained, non-colored neutral hairlines:
  * Flat/Card: `box-shadow: 0 1px 3px rgba(15, 23, 42, 0.05), 0 1px 2px rgba(15, 23, 42, 0.03);`
  * Active/Elevated: `box-shadow: 0 4px 6px -1px rgba(15, 23, 42, 0.07), 0 2px 4px -2px rgba(15, 23, 42, 0.05);`

### 3.5 Motion & Transitions

* **Curve:** `cubic-bezier(0.22, 1, 0.36, 1)` (smooth deceleration, zero spring bounce)
* **Durations:**
  * Interactive button / link hover: `150ms`
  * Modal / dropdown appearance: `200ms`
  * Form feedback status change: `250ms`
* **Properties:** Exclusively `color`, `background-color`, `border-color`, `opacity`, `transform`. Never animate width/height or blur.

---

## 4. Component Standards

### 4.1 Top Announcement Bar & Sticky Header
* **Top Bar:** Slate-900 background (`#0f172a`), white text (`#f8fafc`). Displays bilingual tagline:
  `"સ્વચ્છ અને શુદ્ધ પાણી માટે આપનું વિશ્વસનીય નામ | Pure Water Solutions"`
  Alongside quick direct links: `+91 96620 21602` (Phone) and WhatsApp link.
* **Sticky Navbar:** Clean white background (`#ffffff`), 1px bottom border (`#e2e8f0`). Logo features crisp typographical brand mark with clean drop symbol (no glossy bubble or rainbow gradient). Clear navigation links to Services, AMC Plans, Brands, Contact, and Admin.

### 4.2 Hero Section & Quick Booking Form
* **Asymmetric split layout:** Left side contains strong Gujarati headline addressing pure drinking water for homes and businesses in Ahmedabad, verifiable credibility badges (10+ Years Experience, 5,000+ Satisfied Clients, 24/7 Emergency Support), and direct Call & WhatsApp CTAs.
* **Embedded Quick Booking Card:** Right side features a compact, high-contrast booking card (`ઝડપી સર્વિસ બુકિંગ - 30 મિનિટમાં કન્ફર્મેશન`) capturing Name, 10-digit Mobile Number, Service Category, and Area in Ahmedabad.

### 4.3 Value Proposition Pillars
Four equal-height industrial cards with crisp 1.5-stroke icons and clear, grounded value points:
1. **ઓરિજિનલ સ્પેર પાર્ટ્સ (Original Spare Parts):** Genuine membranes, heavy-duty pumps, and certified food-grade filters.
2. **ઝડપી ડોરસ્ટેપ સર્વિસ (Doorstep Service):** On-time technician visits across all areas of Ahmedabad & Gandhinagar.
3. **વ્યાજબી અને પારદર્શક ભાવ (Reasonable & Honest Pricing):** Fixed upfront estimates without hidden charges.
4. **અનુભવી ટેકનિશિયન્સ (Expert Technicians):** 10+ years of troubleshooting domestic ROs and commercial plants.

### 4.4 Brand Strip
Neutral, high-legibility monochrome-to-color brand recognition strip highlighting expertise across top manufacturers:
* Kent RO
* Aquaguard (Eureka Forbes)
* Pureit (HUL)
* Livpure
* Blue Star
* Custom Commercial RO Plants

### 4.5 Service Catalog (4 Core Pillars)
Structured cards with technical clarity and direct service booking triggers:
1. **ડોમેસ્ટિક RO વોટર પ્યુરિફાયર (Domestic RO Purifiers):** New sales, wall-mount installation, uninstallation, relocation.
2. **કોમર્શિયલ RO પ્લાન્ટ્સ (Commercial RO Plants):** Custom plants from 50 LPH, 100 LPH, 250 LPH, 500 LPH, 1000 LPH to 2000+ LPH for offices, hospitals, schools, and industrial units.
3. **રિપેરિંગ અને મેન્ટેનન્સ (Repair & Maintenance):** Filter cartridge replacement, RO membrane flushing, booster pump repair, SMPS power supply fix, TDS adjustment.
4. **એન્યુઅલ મેન્ટેનન્સ કોન્ટ્રાક્ટ (Annual Maintenance Contracts - AMC):** Preventative care and comprehensive breakdown coverage.

### 4.6 AMC Plans Comparison Grid
Three structured tiers with strict technical transparency:
1. **બેઝિક સર્વિસ પ્લાન (Basic Service AMC):**
   * 3–4 periodic scheduled services per year
   * Sediment & carbon pre-filter changes
   * Free on-call breakdown visits
   * **સ્પષ્ટ નોંધ / Important Notice:** RO મેમ્બ્રેન અને મોટર પાર્ટ્સનો સમાવેશ નથી (RO Membrane & electrical parts excluded).
2. **કોમ્પ્રિહેન્સિવ પ્લાન (Comprehensive AMC - Most Popular):**
   * Unlimited breakdown on-call visits
   * All filters + RO Membrane replacement included
   * Booster pump and SMPS power adapter coverage
   * Zero unexpected service charges
3. **કોમર્શિયલ પ્લાન્ટ પ્લાન (Commercial Plant AMC):**
   * Monthly scheduled inspections
   * High-flow jumbo cartridge replacement
   * Regular TDS & pH water quality testing
   * Priority emergency breakdown response

### 4.7 Detailed Service Booking Form & Business Contacts
* Comprehensive booking form with Name, 10-digit Mobile, Service Type, Preferred Time Slot (Morning / Afternoon / Evening), and Full Address.
* Local business information card with operating hours (9:00 AM – 9:00 PM, Mon–Sun), service areas (Ahmedabad & surrounding Gujarat), and direct contact channels.

### 4.8 Floating Contact Actions
* Fixed bottom-right buttons for immediate contact:
  * Green WhatsApp button (`https://wa.me/919662021602`)
  * Blue Call button (`tel:+919662021602`)
* High z-index, calm hover state, no distracting pulsating animation.
