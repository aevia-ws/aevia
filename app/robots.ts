import { MetadataRoute } from 'next'

// Explicitly welcome the major AI / LLM crawlers by name (they are already
// covered by '*', but naming them removes any ambiguity and is a positive
// GEO signal). llms.txt / llms-full.txt carry the structured brand context.
const AI_CRAWLERS = [
  'GPTBot', // OpenAI (ChatGPT)
  'OAI-SearchBot', // OpenAI ChatGPT Search
  'ChatGPT-User', // ChatGPT browsing
  'ClaudeBot', // Anthropic
  'Claude-Web', // Anthropic browsing
  'anthropic-ai', // Anthropic
  'PerplexityBot', // Perplexity
  'Perplexity-User', // Perplexity browsing
  'Google-Extended', // Google Gemini / AI Overviews
  'Applebot-Extended', // Apple Intelligence
  'CCBot', // Common Crawl (feeds many LLMs)
  'Bytespider', // TikTok / ByteDance
  'Amazonbot', // Amazon
  'cohere-ai', // Cohere
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/api/'] },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: '/', disallow: ['/api/'] })),
    ],
    sitemap: 'https://aevia.services/sitemap.xml',
    host: 'https://aevia.services',
  }
}
