import { MetadataRoute } from 'next'
import { routing } from '@/i18n/routing'

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

  return [
    ...localeHomes,
    {
      url: `${BASE}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]
}
