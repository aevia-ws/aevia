import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { buildSolutionMetadata } from "@/lib/solutions-content";
import { SolutionPageView } from "@/components/solutions/SolutionPageView";

const SLUG = "food-truck-traiteur";
const LOCALES = routing.locales as readonly string[];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const meta = buildSolutionMetadata(SLUG, locale);
  if (!meta) return {};
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: meta.url, languages: meta.languages },
    openGraph: {
      type: "website",
      url: meta.url,
      siteName: "Aevia",
      title: meta.title,
      description: meta.description,
    },
    twitter: { card: "summary_large_image", title: meta.title, description: meta.description },
  };
}

export default async function FoodTruckTraiteurPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!LOCALES.includes(locale)) notFound();
  return <SolutionPageView slug={SLUG} />;
}
