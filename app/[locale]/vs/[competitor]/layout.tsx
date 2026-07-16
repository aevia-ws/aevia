import type { Metadata } from "next";
import { getVsEntry, type Locale } from "@/lib/vs-content";

const BASE = "https://aevia.services";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ competitor: string; locale: string }>;
}): Promise<Metadata> {
  const { competitor, locale } = await params;
  const entry = getVsEntry(competitor);
  const lang: Locale = locale === "en" ? "en" : "fr";
  const copy = entry?.copy[lang] ?? entry?.copy.fr;
  if (!entry || !copy) return { title: "Comparatif introuvable" };

  const url = `${BASE}/${locale}/vs/${competitor}`;
  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
    alternates: {
      canonical: url,
      languages: Object.fromEntries(
        (Object.keys(entry.copy) as Locale[]).map((l) => [l, `${BASE}/${l}/vs/${competitor}`])
      ),
    },
    openGraph: {
      type: "article",
      title: copy.metaTitle,
      description: copy.metaDescription,
      url,
      siteName: "Aevia",
    },
    twitter: {
      card: "summary_large_image",
      title: copy.metaTitle,
      description: copy.metaDescription,
    },
  };
}

export default async function VsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ competitor: string; locale: string }>;
}) {
  const { competitor, locale } = await params;
  const entry = getVsEntry(competitor);
  const lang: Locale = locale === "en" ? "en" : "fr";
  const copy = entry?.copy[lang] ?? entry?.copy.fr;

  const jsonLd = entry && copy
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: `${copy.chooseAeviaTitle}`,
            acceptedAnswer: { "@type": "Answer", text: copy.chooseAeviaPoints.join(" ") },
          },
          {
            "@type": "Question",
            name: `${copy.chooseCompetitorTitle}`,
            acceptedAnswer: { "@type": "Answer", text: copy.chooseCompetitorPoints.join(" ") },
          },
        ],
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
