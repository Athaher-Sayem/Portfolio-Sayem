import type { Metadata } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import { MotionConfig } from "framer-motion";
import { siteConfig } from "@/data/siteConfig";
import { CursorGlow } from "@/components/CursorGlow";
import "./globals.css";

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${siteConfig.shortName} — ${siteConfig.role}`,
  description: siteConfig.bio,
  metadataBase: new URL("https://athaher-sayem.github.io/Portfolio-Sayem/"),
  openGraph: {
    title: `${siteConfig.shortName} — ${siteConfig.role}`,
    description: siteConfig.bio,
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.shortName} — ${siteConfig.role}`,
    description: siteConfig.bio,
  },
};

/** Inline theme bootstrap: apply stored/system theme before paint to avoid flash. */
function ThemeBootstrap() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `(()=>{try{const s=localStorage.getItem('pf:theme');const dark=s? s==='dark' : matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.toggle('light',!dark);}catch(e){}})();`,
      }}
    />
  );
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${instrument.variable} ${inter.variable} noise`}>
      <head>
        <ThemeBootstrap />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: siteConfig.name,
              jobTitle: siteConfig.role,
              email: `mailto:${siteConfig.links.email}`,
              url: "https://athaher-sayem.github.io/Portfolio-Sayem/",
              sameAs: [
                siteConfig.links.github,
                siteConfig.links.linkedin,
              ].filter(Boolean),
            }),
          }}
        />
      </head>
      <body>
        <MotionConfig reducedMotion="user">
          <CursorGlow />
          {children}
        </MotionConfig>
      </body>
    </html>
  );
}
