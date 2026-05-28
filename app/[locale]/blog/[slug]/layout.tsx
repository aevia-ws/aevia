import type { Metadata } from 'next';
import { getBlogPost } from '@/lib/blog-posts';

const BASE_URL = 'https://valentin-milliand.vercel.app';

const CATEGORY_KEYWORDS: Record<string, string[]> = {
  'Web & Marketing': ['site web PME', 'marketing digital', 'présence en ligne', 'conversion site web'],
  'Cybersécurité': ['sécurité site web', 'audit sécurité', 'protection données', 'RGPD'],
  'CRM & Support': ['CRM PME', 'gestion client', 'WhatsApp business', 'support client IA'],
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  const categoryKeywords = CATEGORY_KEYWORDS[post.category] ?? [];

  return {
    title: post.title,
    description: post.excerpt,
    keywords: [post.category, ...categoryKeywords, 'Aevia blog', 'conseils TPE PME'],
    authors: [{ name: 'Valentin Milliand', url: BASE_URL }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      url: `${BASE_URL}/${locale}/blog/${slug}`,
      publishedTime: post.date,
      authors: ['Valentin Milliand'],
      section: post.category,
      locale: locale === 'fr' ? 'fr_FR' : locale === 'en' ? 'en_US' : `${locale}_${locale.toUpperCase()}`,
      siteName: 'Aevia',
      images: [{ url: '/og.png', width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: ['/og.png'],
      creator: '@valentinmilliand',
    },
    // Canonical always points to French — content is only available in French
    alternates: {
      canonical: `${BASE_URL}/fr/blog/${slug}`,
    },
  };
}

export default async function BlogPostLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  const articleSchema = post
    ? {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        dateModified: post.date,
        inLanguage: 'fr-FR',
        author: {
          '@type': 'Person',
          name: 'Valentin Milliand',
          url: BASE_URL,
          sameAs: [
            'https://github.com/Maeglin10',
            'https://linkedin.com/in/valentin-milliand',
          ],
        },
        publisher: {
          '@type': 'Organization',
          name: 'Aevia',
          url: BASE_URL,
          logo: { '@type': 'ImageObject', url: `${BASE_URL}/favicon.svg` },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${BASE_URL}/fr/blog/${slug}`,
        },
        articleSection: post.category,
        keywords: post.category,
        timeRequired: `PT${post.readingTime.replace(/\D/g, '')}M`,
      }
    : null;

  return (
    <>
      {articleSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      )}
      {children}
    </>
  );
}
