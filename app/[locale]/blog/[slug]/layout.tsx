import type { Metadata } from "next";
import { getBlogPost } from "@/lib/blog-posts";

const BASE = "https://aevia.services";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Article introuvable" };
  const url = `${BASE}/${locale}/blog/${slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: url },
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
  const post = getBlogPost(slug);
  const jsonLd = post
    ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        dateModified: post.date,
        articleSection: post.category,
        inLanguage: locale,
        mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE}/${locale}/blog/${slug}` },
        author: { "@type": "Organization", name: "Aevia", url: BASE },
        publisher: {
          "@type": "Organization",
          name: "Aevia",
          url: BASE,
          logo: { "@type": "ImageObject", url: `${BASE}/icon.png` },
        },
        image: `${BASE}/og.png`,
      }
    : null;

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
