import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { CookieBanner } from '@/components/CookieBanner';

const LOCALES = routing.locales as readonly string[];
const BASE_URL = 'https://valentin-milliand.vercel.app';

const LOCALE_META: Record<string, {
  title: string;
  description: string;
  keywords: string[];
  ogLocale: string;
}> = {
  fr: {
    title: 'Aevia — Outils digitaux pour TPE/PME | Site web, Sécurité, CRM',
    description: 'Créez votre site web en 7 jours, auditez votre sécurité en 60 secondes et centralisez WhatsApp, Instagram et email en un seul inbox IA. Pour TPE et PME.',
    keywords: [
      'créer site web PME', 'builder site web IA', 'générateur site web IA',
      'site vitrine professionnel', 'landing page conversion',
      'audit sécurité site web', 'scanner vulnérabilités site',
      'CRM PME WhatsApp', 'inbox unifié WhatsApp Instagram email',
      'réponses automatiques WhatsApp', 'gestion client multi-canal',
      'AeviaLaunch', 'AeviaSecurity', 'AeviaInbox',
      'outils digitaux PME', 'présence digitale entreprise',
    ],
    ogLocale: 'fr_FR',
  },
  en: {
    title: 'Aevia — Digital Tools for Small Business | Website, Security, CRM',
    description: 'Build your website in 7 days, audit your security in 60 seconds, and unify WhatsApp, Instagram and email in one AI inbox. For small businesses.',
    keywords: [
      'AI website builder', 'small business website', 'professional website creator',
      'website security audit', 'security scanner', 'WhatsApp CRM',
      'unified inbox WhatsApp Instagram', 'AI customer support',
      'AeviaLaunch', 'AeviaSecurity', 'AeviaInbox', 'small business digital tools',
    ],
    ogLocale: 'en_US',
  },
  es: {
    title: 'Aevia — Herramientas Digitales para PYMES | Sitio web, Seguridad, CRM',
    description: 'Crea tu sitio web en 7 días, audita tu seguridad en 60 segundos y centraliza WhatsApp, Instagram y email en un inbox IA. Para pequeñas empresas.',
    keywords: [
      'crear sitio web empresa', 'constructor web IA', 'auditoría seguridad web',
      'CRM WhatsApp PYME', 'bandeja unificada WhatsApp Instagram',
      'AeviaLaunch', 'AeviaSecurity', 'AeviaInbox',
    ],
    ogLocale: 'es_ES',
  },
  de: {
    title: 'Aevia — Digitale Tools für KMU | Website, Sicherheit, CRM',
    description: 'Erstellen Sie Ihre Website in 7 Tagen, prüfen Sie Ihre Sicherheit in 60 Sekunden und zentralisieren Sie WhatsApp, Instagram und E-Mail in einem KI-Posteingang.',
    keywords: [
      'Website erstellen KMU', 'KI Website Builder', 'Sicherheitsaudit Website',
      'CRM WhatsApp KMU', 'einheitlicher Posteingang WhatsApp Instagram',
      'AeviaLaunch', 'AeviaSecurity', 'AeviaInbox',
    ],
    ogLocale: 'de_DE',
  },
  pt: {
    title: 'Aevia — Ferramentas Digitais para PMEs | Site, Segurança, CRM',
    description: 'Crie seu site em 7 dias, audite sua segurança em 60 segundos e centralize WhatsApp, Instagram e e-mail em uma caixa de entrada IA. Para pequenas empresas.',
    keywords: [
      'criar site empresa', 'construtor site IA', 'auditoria segurança site',
      'CRM WhatsApp PME', 'caixa unificada WhatsApp Instagram',
      'AeviaLaunch', 'AeviaSecurity', 'AeviaInbox',
    ],
    ogLocale: 'pt_BR',
  },
};

const HREFLANG_LOCALES: Record<string, string> = {
  fr: 'fr', en: 'en', es: 'es', de: 'de', pt: 'pt',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const meta = LOCALE_META[locale] ?? LOCALE_META.fr;

  const languages: Record<string, string> = {};
  for (const [loc] of Object.entries(HREFLANG_LOCALES)) {
    languages[loc] = `${BASE_URL}/${loc}`;
  }
  languages['x-default'] = `${BASE_URL}/fr`;

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: 'website',
      locale: meta.ogLocale,
      url: `${BASE_URL}/${locale}`,
      siteName: 'Aevia',
      images: [
        {
          url: '/og.png',
          width: 1200,
          height: 630,
          alt: 'Aevia — Outils digitaux pour TPE/PME',
        },
      ],
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages,
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
      {children}
      <CookieBanner />
    </NextIntlClientProvider>
  );
}
