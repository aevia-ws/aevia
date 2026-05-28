import { MetadataRoute } from 'next'
import { BLOG_POSTS } from '@/lib/blog-posts'
import { projects } from '@/lib/projects'

const BASE_URL = 'https://valentin-milliand.vercel.app'
const LOCALES = ['fr', 'en', 'es', 'de', 'pt'] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const rootRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/projects`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  ]

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${BASE_URL}/projects/${project.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.85,
  }))

  const localeRoutes: MetadataRoute.Sitemap = LOCALES.flatMap((locale) => [
    {
      url: `${BASE_URL}/${locale}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: locale === 'fr' ? 0.98 : 0.88,
    },
    {
      url: `${BASE_URL}/${locale}/templates`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
  ])

  // Blog is only indexed in French (content is not translated)
  const blogListRoute: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/fr/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
  ]

  const blogPostRoutes: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${BASE_URL}/fr/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.72,
  }))

  return [
    ...rootRoutes,
    ...projectRoutes,
    ...localeRoutes,
    ...blogListRoute,
    ...blogPostRoutes,
  ]
}
