import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://aqua-solutions-phi.vercel.app"),
  title: "Aqua Solutions — RO વોટર પ્યુરિફાયર સેલ્સ, સર્વિસ અને AMC | અમદાવાદ",
  description:
    "અમદાવાદ અને ગુજરાતમાં RO વોટર પ્યુરિફાયર રિપેરિંગ, ફિલ્ટર ચેન્જ, નવું RO ઇન્સ્ટોલેશન અને AMC વાર્ષિક કોન્ટ્રાક્ટ. ઓરિજિનલ સ્પેર પાર્ટ્સ અને ઝડપી ડોરસ્ટેપ સર્વિસ. Call: +91 96620 21602.",
  keywords: [
    "Aqua Solutions",
    "RO Service Ahmedabad",
    "RO Repair Ahmedabad",
    "RO AMC Plans Ahmedabad",
    "Commercial RO Plant Gujarat",
    "Water Purifier Service",
    "Kent Aquaguard RO repair",
    "TDS water testing Ahmedabad",
  ],
  authors: [{ name: "Aqua Solutions" }],
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "Aqua Solutions — RO વોટર પ્યુરિફાયર સેલ્સ, સર્વિસ અને AMC",
    description: "સ્વચ્છ અને શુદ્ધ પાણી માટે આપનું વિશ્વસનીય નામ | Pure Water Solutions. Call: +91 96620 21602.",
    url: "https://aqua-solutions-phi.vercel.app",
    siteName: "Aqua Solutions",
    images: [
      {
        url: "/logo.png",
        width: 1074,
        height: 294,
        alt: "Aqua Solutions Logo — Save Water Save Life",
      },
    ],
    locale: "gu_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="gu" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-white text-black dark:bg-black dark:text-white antialiased selection:bg-neutral-800 selection:text-white transition-colors duration-150">
        {children}
      </body>
    </html>
  );
}
