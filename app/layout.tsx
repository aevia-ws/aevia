import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://valentin-milliand.vercel.app"),
  title: {
    default: "Aevia — Outils digitaux pour TPE/PME | Site web, Sécurité, CRM",
    template: "%s | Aevia",
  },
  description:
    "Créez votre site web en 7 jours, auditez votre sécurité en 60 secondes et centralisez WhatsApp, Instagram et email en un seul inbox. Outils digitaux IA pour TPE et PME.",
  keywords: [
    "Aevia",
    "AeviaLaunch",
    "AeviaSecurity",
    "AeviaInbox",
    "créer site web PME",
    "builder site web IA",
    "audit sécurité site web",
    "CRM multi-canal PME",
    "inbox WhatsApp Instagram",
    "outils digitaux entreprise",
    "site vitrine professionnel",
    "générateur site web IA",
    "AI website builder",
    "website security audit",
    "Valentin Milliand",
    "NestJS",
    "Next.js",
    "TypeScript",
    "Anthropic Claude",
    "SaaS",
  ],
  authors: [{ name: "Valentin Milliand", url: "https://valentin-milliand.vercel.app" }],
  creator: "Valentin Milliand",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    alternateLocale: ["en_US", "es_ES", "de_DE", "pt_BR"],
    url: "https://valentin-milliand.vercel.app",
    siteName: "Aevia",
    title: "Aevia — Outils digitaux pour TPE/PME",
    description:
      "Créez votre site web en 7 jours, auditez votre sécurité en 60 secondes et centralisez vos messages clients. Outils digitaux IA pour petites entreprises.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Aevia — Outils digitaux pour TPE/PME : site web, sécurité, CRM",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aevia — Outils digitaux pour TPE/PME",
    description:
      "Créez votre site web en 7 jours, auditez votre sécurité en 60 secondes et centralisez vos messages clients.",
    images: ["/og.png"],
    creator: "@valentinmilliand",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://valentin-milliand.vercel.app",
    languages: {
      "fr": "https://valentin-milliand.vercel.app/fr",
      "en": "https://valentin-milliand.vercel.app/en",
      "es": "https://valentin-milliand.vercel.app/es",
      "de": "https://valentin-milliand.vercel.app/de",
      "pt": "https://valentin-milliand.vercel.app/pt",
      "x-default": "https://valentin-milliand.vercel.app/fr",
    },
  },
};

const BASE_URL = 'https://valentin-milliand.vercel.app'

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${BASE_URL}/#person`,
  name: 'Valentin Milliand',
  url: BASE_URL,
  jobTitle: 'Full Stack Engineer & AI Builder',
  description:
    'Full Stack Engineer specializing in NestJS, Next.js, TypeScript, and Anthropic Claude. Building production-ready AI products for small businesses.',
  sameAs: [
    'https://github.com/Maeglin10',
    'https://linkedin.com/in/valentin-milliand',
  ],
  knowsAbout: [
    'NestJS', 'Next.js', 'TypeScript', 'PostgreSQL',
    'Anthropic Claude', 'AI product development', 'SaaS',
    'website builder', 'security audit', 'CRM',
  ],
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${BASE_URL}/#organization`,
  name: 'Aevia',
  url: BASE_URL,
  description: 'Outils digitaux pour TPE et PME — création de site web, audit de sécurité, CRM multi-canal et gestion client par IA.',
  founder: { '@id': `${BASE_URL}/#person` },
  sameAs: [
    'https://github.com/Maeglin10',
    'https://linkedin.com/in/valentin-milliand',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Produits Aevia',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'SoftwareApplication',
          name: 'AeviaLaunch',
          description: 'Créateur de site web IA — 181 templates, contenu généré par Claude AI en moins de 5 secondes',
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Web',
          url: 'https://aevia-launch.vercel.app',
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'SoftwareApplication',
          name: 'AeviaSecurity',
          description: 'Audit de sécurité automatisé — scan DNS, SSL, headers HTTP, score 0-100 en moins de 60 secondes',
          applicationCategory: 'SecurityApplication',
          operatingSystem: 'Web',
          url: 'https://aevia-security.vercel.app',
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'SoftwareApplication',
          name: 'AeviaInbox',
          description: 'CRM multi-canal — WhatsApp, Instagram et email unifiés avec réponses IA automatiques pour PME',
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Web',
        },
      },
    ],
  },
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${BASE_URL}/#website`,
  url: BASE_URL,
  name: 'Aevia',
  description: 'Outils digitaux pour TPE/PME — site web, sécurité, CRM',
  publisher: { '@id': `${BASE_URL}/#organization` },
  inLanguage: ['fr-FR', 'en-US', 'es-ES', 'de-DE', 'pt-BR'],
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${BASE_URL}/fr/blog?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#09090b] text-white">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-violet-600 focus:text-white focus:rounded-lg focus:font-semibold">Skip to main content</a>
        <Nav />
        {children}
        {/* Aevia Inbox webchat widget — production test */}
        <script
          async
          src="https://skybot-inbox-ui.onrender.com/webchat/widget.js"
          data-widget-id="wid_ce9571d1dd824e3704a48013699b3e91"
          data-api-url="https://skybot-inbox.onrender.com/api"
        />
      </body>
    </html>
  );
}
