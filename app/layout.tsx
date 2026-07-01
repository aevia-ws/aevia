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
  metadataBase: new URL("https://aevia.services"),
  title: {
    default: "Aevia — Suite digitale pour entreprises ambitieuses",
    template: "%s | Aevia",
  },
  description:
    "Aevia propose une suite d'outils digitaux pour PME et indépendants : création de landing pages, sécurité web, et messagerie omnicanale. Made in France.",
  keywords: [
    "Aevia",
    "landing page",
    "sécurité web",
    "messagerie omnicanale",
    "WhatsApp Business",
    "SaaS France",
    "création site web",
    "PME digitale",
  ],
  authors: [{ name: "Aevia", url: "https://aevia.services" }],
  creator: "Aevia",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://aevia.services",
    siteName: "Aevia",
    title: "Aevia — Suite digitale pour entreprises ambitieuses",
    description:
      "Landing pages premium, sécurité web automatisée, et messagerie omnicanale. La suite complète pour développer votre business en ligne.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Aevia — Suite digitale",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aevia — Suite digitale pour entreprises ambitieuses",
    description:
      "Landing pages premium, sécurité web automatisée, et messagerie omnicanale. La suite complète pour développer votre business en ligne.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "https://aevia.services",
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Aevia',
  url: 'https://aevia.services',
  description:
    "Suite d'outils digitaux pour PME et indépendants : création de landing pages, sécurité web, et messagerie omnicanale. Made in France.",
  sameAs: [
    'https://github.com/Maeglin10',
  ],
  makesOffer: [
    { '@type': 'Offer', name: 'Aevia Launch', url: 'https://launch.aevia.services' },
    { '@type': 'Offer', name: 'Aevia Security', url: 'https://security.aevia.services' },
    { '@type': 'Offer', name: 'Aevia Inbox', url: 'https://inbox.aevia.services' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#09090b] text-white">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-violet-600 focus:text-white focus:rounded-lg focus:font-semibold">Skip to main content</a>
        <Nav />
        {children}
        {/* webchat widget moved to [locale]/layout.tsx for i18n locale injection */}
      </body>
    </html>
  );
}
