# Product Requirements Document (PRD): Aqua Solutions Full-Stack Web Application

## 1. Project Overview
**Product Name:** Aqua Solutions — RO Water Purifier Sales, Service & AMC Portal  
**Business Contact:** +91 96620 21602 (Direct Call & WhatsApp)  
**Target Region:** Ahmedabad & Gujarat, India  
**Language:** Bilingual (Gujarati primary UI with English technical/service labels)  
**Deployment Target:** Vercel (Unified Monorepo / Full-Stack Framework — **No Docker required**)

### 1.1 Purpose & Context
Aqua Solutions is a domestic and commercial Reverse Osmosis (RO) water purifier sales, repair, and Annual Maintenance Contract (AMC) provider. The initial static prototype (`index.html`) established the brand identity, Gujarati/English copywriting, service catalog, and AMC pricing tiers. 

This PRD defines the architecture to upgrade the static prototype into a **production-ready, full-stack web application** capable of capturing leads in a cloud database, triggering instant owner notifications, providing an admin dashboard for managing service tickets, and deploying seamlessly on Vercel from a single repository.

---

## 2. Recommended Tech Stack (Vercel-Optimized)
*Note on Docker vs. Vercel:* Vercel is a serverless platform and does **not** deploy Docker containers directly. Instead, to run both frontend and backend in a single repository/project on Vercel, use a unified full-stack framework with Serverless Functions:

* **Framework:** **Next.js 14+ (App Router)** with TypeScript (combines React frontend and Node.js Serverless API routes in one project).
* **Styling & UI:** **Tailwind CSS**, Lucide React / FontAwesome icons, Google Fonts (`Hind Vadodara` for Gujarati + `Inter` for English).
* **Database & ORM:** **Supabase (PostgreSQL)** or **Neon Postgres** paired with **Prisma ORM** (free tiers available, zero-maintenance serverless Postgres).
* **Authentication (Admin Panel):** **NextAuth.js (Auth.js)** or simple JWT/Environment-variable protected middleware for the owner's Admin Dashboard.
* **Notifications (Lead Alerts):** 
  * **Resend** or **Nodemailer** (Email alerts to business owner on new booking).
  * **WhatsApp Deep-Link Fallback + Optional Meta Cloud API / Twilio** for automated WhatsApp alerts.
* **Validation:** **Zod** (shared schema validation between frontend forms and backend API routes).

---

## 3. Core Functional Requirements

### 3.1 Public Customer Frontend (Preserving Existing Design & Copy)
1. **Top Announcement Bar & Sticky Header:**
   * Display tagline: *"સ્વચ્છ અને શુદ્ધ પાણી માટે આપનું વિશ્વસનીય નામ | Pure Water Solutions"*.
   * Click-to-call (`tel:+919662021602`) and WhatsApp (`https://wa.me/919662021602`) quick actions.
   * Responsive mobile hamburger menu.
2. **Hero Section & Quick Service Booking Widget:**
   * Bilingual headline highlighting 100% pure drinking water, 10+ years experience, 5,000+ happy customers, and 24/7 support.
   * Embedded **Quick Booking Form** (Name, 10-digit Mobile Number, Service Type dropdown, Area/Address).
3. **About & Value Proposition Section:**
   * Highlights support for major brands (Kent, Aquaguard, Pureit, Livpure, Blue Star, Custom Commercial Plants).
   * Key pillars: Original Spare Parts, Fast Doorstep Service, Reasonable Pricing, Expert Technicians.
4. **Services Catalog (4 Core Pillars):**
   * *Domestic RO Purifiers* (Sales, installation, repair).
   * *Commercial RO Plants* (50 LPH to 2000+ LPH for offices, factories, hospitals, schools).
   * *Repair & Maintenance* (Filter/membrane change, pump repair, leakage, TDS balancing).
   * *Annual Maintenance Contracts (AMC)*.
5. **AMC Plans Comparison Grid:**
   * **Basic Service AMC:** 3–4 free services/year, sediment & carbon filter change, free on-call visits (Membrane excluded).
   * **Comprehensive AMC (Most Popular):** Unlimited call attendance, all filters + RO Membrane replacement, motor/pump & SMPS electrical coverage.
   * **Commercial Plant AMC:** Monthly checkups, jumbo sediment filter change, TDS & pH testing, priority emergency support.
6. **Full Contact & Detailed Service Request Section:**
   * Detailed form capturing Name, Mobile Number, Service Category, Preferred Time Slot (Morning/Afternoon/Evening), and Full Address.
   * Business info cards (Service Area: Ahmedabad & surrounding Gujarat, Hours: 9:00 AM – 9:00 PM, Mon–Sun).
7. **Floating Action Buttons:**
   * Fixed bottom-right floating Call and WhatsApp buttons on all viewports.

### 3.2 Backend API & Lead Processing (`/api/bookings`)
1. **POST `/api/bookings`:**
   * Validates incoming JSON payload using Zod (ensures valid 10-digit Indian phone number).
   * Saves lead into PostgreSQL (`ServiceBooking` table) with status `PENDING` and timestamp.
   * Triggers asynchronous email notification to the business owner.
   * Returns `{ success: true, bookingId, whatsappRedirectUrl }` so the frontend displays a confirmation banner AND offers a 1-click button to send details via WhatsApp (`9662021602`) if the user desires.
2. **GET / PATCH `/api/bookings` (Protected Admin Endpoints):**
   * Allows the owner to view all service requests, filter by status (`PENDING`, `ASSIGNED`, `COMPLETED`, `CANCELLED`), and add technician notes.

### 3.3 Owner Admin Dashboard (`/admin`)
* Password-protected dashboard accessible on mobile and desktop.
* View incoming leads in real time with 1-click **"Call Customer"** and **"WhatsApp Customer"** buttons.
* Update ticket status and track AMC renewals.

---

## 4. Database Schema (Prisma)

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model ServiceBooking {
  id            String   @id @default(cuid())
  customerName  String
  phoneNumber   String
  serviceType   String   // e.g., "RO Servicing", "Filter Change", "New RO", "AMC Plan", "Commercial Plant"
  preferredTime String?  // e.g., "Morning", "Afternoon", "Evening"
  address       String?
  sourceForm    String   @default("website") // "hero_quick_form" or "main_contact_form"
  status        String   @default("PENDING") // "PENDING", "CONTACTED", "COMPLETED", "CANCELLED"
  adminNotes    String?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}
```

---

## 5. Project Directory Structure (Single Unified Repo)

```text
aqua-solutions/
├── prisma/
│   └── schema.prisma          # Database schema
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── bookings/
│   │   │   │   └── route.ts   # POST (public) & GET/PATCH (admin) serverless API
│   │   │   └── auth/
│   │   │       └── route.ts   # Simple admin login handler
│   │   ├── admin/
│   │   │   └── page.tsx       # Protected Owner Dashboard
│   │   ├── layout.tsx         # Root layout with Hind Vadodara & Inter fonts
│   │   └── page.tsx           # Main bilingual landing page
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── HeroBookingForm.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── AmcPlans.tsx
│   │   ├── MainContactForm.tsx
│   │   └── FloatingActions.tsx
│   └── lib/
│       ├── prisma.ts          # Singleton Prisma client for serverless
│       ├── validations.ts     # Zod schemas
│       └── notifications.ts   # Resend/Nodemailer helper
├── .env.example               # Required environment variables
├── next.config.mjs
├── package.json
├── tailwind.config.ts
└── vercel.json                # Vercel deployment & function configuration
```

---

## 6. Vercel Deployment Configuration (`vercel.json`)
Instructions for the AI code generator: **Include a `vercel.json` file at the root of the repository** to configure build commands (ensuring Prisma Client generates during build), regional deployment (`bom1` — Mumbai, India for lowest latency in Gujarat), security headers, and serverless function timeouts.

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "framework": "nextjs",
  "regions": ["bom1"],
  "buildCommand": "npx prisma generate && next build",
  "functions": {
    "src/app/api/**/*.ts": {
      "maxDuration": 10
    }
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" }
      ]
    }
  ]
}
```

---

## 7. Environment Variables Required on Vercel
When deploying to Vercel, configure the following environment variables in **Project Settings > Environment Variables**:
* `DATABASE_URL` — PostgreSQL connection string (from Supabase or Neon).
* `ADMIN_PASSWORD` — Password for accessing `/admin`.
* `RESEND_API_KEY` — API key for sending email alerts upon new form submissions.
* `OWNER_EMAIL` — Email address where Aqua Solutions receives booking alerts.
* `NEXT_PUBLIC_BUSINESS_PHONE` — `9662021602`

---

## 8. Instructions for AI Code Generator
> **Prompt Directive:** Using this PRD, scaffold a complete, production-ready Next.js (App Router) + TypeScript + Tailwind CSS + Prisma full-stack application in a single repository. Preserve all Gujarati and English text, color palettes (`ocean` `#0284c7` and `aqua` `#0d9488`), AMC plan tiers, and the phone number `9662021602`. Ensure both booking forms submit to `POST /api/bookings`, persist data to PostgreSQL, trigger email alerts, and provide a functional `/admin` dashboard to manage leads. Include the exact `vercel.json` specified in Section 6 so the project deploys cleanly on Vercel with zero extra configuration.