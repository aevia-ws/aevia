import { MetadataRoute } from 'next'
import { routing } from '@/i18n/routing'
import { SOLUTIONS } from '@/lib/solutions-content'
import { VS_PAGES } from '@/lib/vs-content'

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

  return [
    ...localeHomes,
    ...solutionsIndex,
    ...solutionPages,
    ...vsPages,
    {
      url: `${BASE}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]
}
