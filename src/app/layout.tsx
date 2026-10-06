import type { Metadata, Viewport } from "next";
import { ActionBar } from "@/components/layout/ActionBar";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { JsonLd } from "@/components/seo/JsonLd";
import { venue } from "@/data/venue";
import { cn } from "@/lib/cn";
import { archivo, marker } from "@/lib/fonts";
import { restaurantJsonLd } from "@/lib/schema";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const defaultTitle = "OKAY Bari Social Food Club · Smash burger e cucina internazionale veloce";
const defaultDescription =
  "Social food club a Bari, quartiere Picone: smash burger, pastrami, gyoza, nachos e cheesecake. In Via Brancaccio 18, da asporto o a domicilio con l'app OkayBari.";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: defaultTitle,
    template: `%s · ${venue.shortName} Bari Social Food Club`,
  },
  description: defaultDescription,
  applicationName: venue.name,
  keywords: [
    "OKAY Bari",
    "smash burger Bari",
    "burger Bari",
    "hamburger Bari",
    "dove mangiare a Bari",
    "locali Bari",
    "Picone Bari",
    "pastrami Bari",
    "delivery Bari",
    "cucina internazionale Bari",
  ],
  category: "food",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: venue.name,
    title: defaultTitle,
    description: defaultDescription,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  themeColor: siteConfig.themeColor,
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang={siteConfig.lang}
      className={cn(archivo.variable, marker.variable)}
      suppressHydrationWarning
    >
      <head>
        {/* Enables JS-only entry animations; without JS everything is visible. */}
        <script
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }}
        />
      </head>
      <body>
        <a href="#contenuto" className="skip-link">
          Vai al contenuto
        </a>
        <Header />
        <main id="contenuto" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <ActionBar />
        <JsonLd data={restaurantJsonLd()} />
      </body>
    </html>
  );
}
