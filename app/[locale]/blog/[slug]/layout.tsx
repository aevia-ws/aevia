import type { Metadata } from "next";
import { getBlogPost, localizePost, localesForPost } from "@/lib/blog-posts";

const BASE = "https://aevia.services";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const rawPost = getBlogPost(slug);
  if (!rawPost) return { title: "Article introuvable" };
  const post = localizePost(rawPost, locale);
  const url = `${BASE}/${locale}/blog/${slug}`;
  const languages = {
    ...Object.fromEntries(localesForPost(rawPost).map((l) => [l, `${BASE}/${l}/blog/${slug}`])),
    "x-default": `${BASE}/fr/blog/${slug}`,
  };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: url, languages },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url,
      siteName: "Aevia",
      publishedTime: post.date,
      authors: ["Aevia"],
      section: post.category,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function ArticleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const rawPost = getBlogPost(slug);
  const post = rawPost ? localizePost(rawPost, locale) : undefined;
  const url = `${BASE}/${locale}/blog/${slug}`;

  const graph: object[] = [];
  if (post) {
    graph.push({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date,
      dateModified: post.date,
      articleSection: post.category,
      inLanguage: locale,
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      author: { "@type": "Organization", name: "Aevia", url: BASE },
      publisher: {
        "@type": "Organization",
        name: "Aevia",
        url: BASE,
        logo: { "@type": "ImageObject", url: `${BASE}/icon.png` },
      },
      image: `${BASE}/og.png`,
    });

    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: `${BASE}/${locale}` },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE}/${locale}/blog` },
        { "@type": "ListItem", position: 3, name: post.title, item: url },
      ],
    });

    if (post.faq && post.faq.length > 0) {
      graph.push({
        "@type": "FAQPage",
        mainEntity: post.faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      });
    }
  }

  const jsonLd = graph.length > 0 ? { "@context": "https://schema.org", "@graph": graph } : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      {children}
    </>
  );
}
