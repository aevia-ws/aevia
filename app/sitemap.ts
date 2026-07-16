import { MetadataRoute } from 'next'
import { routing } from '@/i18n/routing'
import { VS_PAGES } from '@/lib/vs-content'
import { BLOG_POSTS } from '@/lib/blog-posts'

const BASE = 'https://aevia.services'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const localeHomes: MetadataRoute.Sitemap = routing.locales.map((locale) => ({
    url: `${BASE}/${locale}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: locale === routing.defaultLocale ? 1 : 0.8,
    alternates: {
      languages: Object.fromEntries(routing.locales.map((l) => [l, `${BASE}/${l}`])),
    },
  }))

  // /[locale]/vs/[competitor] comparison pages — only generated for locales
  // that actually have copy in lib/vs-content.ts (falls back to fr elsewhere,
  // but we only want indexable URLs for locales with real translated content).
  const vsPages: MetadataRoute.Sitemap = VS_PAGES.flatMap((entry) => {
    const availableLocales = Object.keys(entry.copy) as Array<keyof typeof entry.copy>
    return availableLocales.map((locale) => ({
      url: `${BASE}/${locale}/vs/${entry.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
      alternates: {
        languages: Object.fromEntries(
          availableLocales.map((l) => [l, `${BASE}/${l}/vs/${entry.slug}`])
        ),
      },
    }))
  })

  // Blog index per locale
  const blogIndex: MetadataRoute.Sitemap = routing.locales.map((locale) => ({
    url: `${BASE}/${locale}/blog`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Blog posts — content is French, indexed under /fr/blog/[slug]
  const blogPosts: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${BASE}/fr/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    ...localeHomes,
    ...blogIndex,
    ...blogPosts,
    ...vsPages,
    {
      url: `${BASE}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]
}
