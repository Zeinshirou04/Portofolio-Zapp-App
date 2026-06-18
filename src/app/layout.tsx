import type { Metadata } from "next";
import { Montserrat, Lato } from "next/font/google";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "./globals.css";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

config.autoAddCss = false;

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Zayn — Full Stack Developer",
    template: "%s | Zayn",
  },
  description:
    "Full stack developer based in Indonesia. Building SaaS apps, REST APIs, and admin dashboards for micro businesses.",
  metadataBase: new URL("https://portfolio.zapp.web.id"),
  keywords: [
    "Farras Adhani Zayn",
    "Full Stack Developer",
    "Laravel Developer",
    "Next.js",
    "Indonesia",
    "REST API",
  ],
  authors: [
    { name: "Farras Adhani Zayn", url: "https://portfolio.zapp.web.id" },
  ],
  creator: "Farras Adhani Zayn",
  alternates: {
    canonical: "https://portfolio.zapp.web.id",
  },
  openGraph: {
    title: "Zayn — Full Stack Developer",
    description:
      "Full stack developer based in Indonesia. Building SaaS apps, REST APIs, and admin dashboards for micro businesses.",
    url: "https://portfolio.zapp.web.id",
    siteName: "Zayn Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Zayn — Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zayn — Full Stack Developer",
    description:
      "Full stack developer based in Indonesia. Building SaaS apps, REST APIs, and admin dashboards for micro businesses.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Farras Adhani Zayn",
  url: "https://portfolio.zapp.web.id",
  jobTitle: "Full Stack Developer",
  description:
    "Full Stack Developer from Indonesia specializing in Laravel, REST APIs, and web applications for businesses.",
  sameAs: [
    "https://www.linkedin.com/in/farras-zayn/",
    "https://github.com/Zeinshirou04",
  ],
  address: {
    "@type": "PostalAddress",
    addressCountry: "ID",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${lato.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body suppressHydrationWarning>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
