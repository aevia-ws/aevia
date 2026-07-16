import { MetadataRoute } from 'next'
import { routing } from '@/i18n/routing'
import { SOLUTIONS } from '@/lib/solutions-content'

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

  const solutionsIndex: MetadataRoute.Sitemap = routing.locales.map((locale) => ({
    url: `${BASE}/${locale}/solutions`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: locale === routing.defaultLocale ? 0.8 : 0.6,
    alternates: {
      languages: Object.fromEntries(routing.locales.map((l) => [l, `${BASE}/${l}/solutions`])),
    },
  }))

  const solutionPages: MetadataRoute.Sitemap = SOLUTIONS.flatMap((solution) =>
    routing.locales.map((locale) => ({
      url: `${BASE}/${locale}/solutions/${solution.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: locale === routing.defaultLocale ? 0.8 : 0.6,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, `${BASE}/${l}/solutions/${solution.slug}`]),
        ),
      },
    })),
  )

  return [
    ...localeHomes,
    ...solutionsIndex,
    ...solutionPages,
    {
      url: `${BASE}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]
}
