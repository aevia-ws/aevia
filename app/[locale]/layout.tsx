import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { CookieBanner } from '@/components/CookieBanner';
import Script from 'next/script';

const GA_ID = 'G-9XTKCZLYVF';
const BASE = 'https://aevia.services';

const LOCALES = routing.locales as readonly string[];

const HUB_TITLES: Record<string, string> = {
  fr: 'Aevia — SaaS pour entrepreneurs ambitieux',
  en: 'Aevia — SaaS for ambitious entrepreneurs',
  es: 'Aevia — SaaS para emprendedores ambiciosos',
  de: 'Aevia — SaaS für ambitionierte Unternehmer',
  pt: 'Aevia — SaaS para empreendedores ambiciosos',
};

const HUB_DESCS: Record<string, string> = {
  fr: 'Aevia conçoit des outils SaaS pour entrepreneurs : sites web en 7 jours, inbox unifiée multi-canal, audits de sécurité instantanés. Pensés pour TPE et PME.',
  en: 'Aevia builds SaaS tools for entrepreneurs: websites in 7 days, unified multi-channel inbox, instant security audits. Built for SMBs.',
  es: 'Aevia crea herramientas SaaS para emprendedores: sitios web en 7 días, bandeja de entrada multicanal, auditorías de seguridad instantáneas.',
  de: 'Aevia entwickelt SaaS-Tools für Unternehmer: Websites in 7 Tagen, einheitlicher Multi-Kanal-Posteingang, sofortige Sicherheitsaudits.',
  pt: 'Aevia cria ferramentas SaaS para empreendedores: sites em 7 dias, caixa de entrada multicanal, auditorias de segurança instantâneas.',
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const lang = LOCALES.includes(locale) ? locale : 'fr';
  const title = HUB_TITLES[lang] ?? HUB_TITLES.fr;
  const description = HUB_DESCS[lang] ?? HUB_DESCS.fr;
  const url = `${BASE}/${lang}`;

  return {
    metadataBase: new URL(BASE),
    title,
    description,
    keywords: ['Aevia', 'SaaS France', 'outils entrepreneur', 'site web 7 jours', 'inbox unifiée', 'audit sécurité', 'AeviaLaunch', 'AeviaSecurity', 'AeviaInbox'],
    authors: [{ name: 'Valentin Milliand', url: BASE }],
    creator: 'Aevia',
    openGraph: {
      type: 'website',
      locale: lang === 'fr' ? 'fr_FR' : lang === 'en' ? 'en_US' : lang === 'es' ? 'es_ES' : lang === 'de' ? 'de_DE' : 'pt_BR',
      url,
      siteName: 'Aevia',
      title,
      description,
    },
    twitter: { card: 'summary_large_image', title, description, creator: '@aeviaio' },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
    alternates: {
      canonical: url,
      languages: Object.fromEntries(LOCALES.map(l => [l, `${BASE}/${l}`])),
    },
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!LOCALES.includes(locale)) notFound();
  const messages = (await import(`../../messages/${locale}.json`)).default;
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">{`
        window.dataLayer=window.dataLayer||[];
        function gtag(){dataLayer.push(arguments);}
        gtag('js',new Date());
        gtag('config','${GA_ID}');
      `}</Script>
      {children}
      <CookieBanner />
    </NextIntlClientProvider>
  );
}
