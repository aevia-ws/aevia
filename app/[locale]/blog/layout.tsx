import type { Metadata } from 'next';

const BASE_URL = 'https://valentin-milliand.vercel.app';

const LOCALE_BLOG_META: Record<string, { title: string; description: string; ogLocale: string }> = {
  fr: {
    title: 'Blog Aevia — Web, Sécurité & CRM pour TPE/PME',
    description: 'Conseils pratiques sur la création de site web, la sécurité informatique et la gestion client pour les indépendants et petites entreprises. Guides actionnables, sans jargon.',
    ogLocale: 'fr_FR',
  },
  en: {
    title: 'Aevia Blog — Web, Security & CRM for Small Business',
    description: 'Practical guides on website creation, cybersecurity and customer management for small businesses. Actionable tips, no jargon.',
    ogLocale: 'en_US',
  },
  es: {
    title: 'Blog Aevia — Web, Seguridad & CRM para PYMES',
    description: 'Guías prácticas sobre creación de sitios web, ciberseguridad y gestión de clientes para pequeñas empresas.',
    ogLocale: 'es_ES',
  },
  de: {
    title: 'Aevia Blog — Web, Sicherheit & CRM für KMU',
    description: 'Praktische Anleitungen zu Website-Erstellung, Cybersicherheit und Kundenmanagement für kleine Unternehmen.',
    ogLocale: 'de_DE',
  },
  pt: {
    title: 'Blog Aevia — Web, Segurança & CRM para PMEs',
    description: 'Guias práticos sobre criação de sites, segurança cibernética e gestão de clientes para pequenas empresas.',
    ogLocale: 'pt_BR',
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const meta = LOCALE_BLOG_META[locale] ?? LOCALE_BLOG_META.fr;

  return {
    title: meta.title,
    description: meta.description,
    keywords: [
      'blog web marketing', 'conseils site web PME', 'sécurité site web',
      'CRM PME conseils', 'WhatsApp business guide', 'RGPD site web',
      'audit sécurité', 'présence digitale entreprise', 'tunnel de conversion',
      'vitesse site web', 'avis clients Google',
    ],
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: 'website',
      locale: meta.ogLocale,
      url: `${BASE_URL}/${locale}/blog`,
      siteName: 'Aevia',
      images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Blog Aevia' }],
    },
    alternates: {
      canonical: `${BASE_URL}/fr/blog`,
      languages: {
        fr: `${BASE_URL}/fr/blog`,
        en: `${BASE_URL}/en/blog`,
        es: `${BASE_URL}/es/blog`,
        de: `${BASE_URL}/de/blog`,
        pt: `${BASE_URL}/pt/blog`,
        'x-default': `${BASE_URL}/fr/blog`,
      },
    },
  };
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
