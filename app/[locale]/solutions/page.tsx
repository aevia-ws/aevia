import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { SolutionsIndexView } from "@/components/solutions/SolutionsIndexView";

const LOCALES = routing.locales as readonly string[];
const BASE = "https://aevia.services";

const TITLES: Record<string, string> = {
  fr: "Solutions pour restaurants — Aevia",
  en: "Restaurant solutions — Aevia",
};
const DESCS: Record<string, string> = {
  fr: "Bistrot, fast-casual, gastronomique, food truck, bar à cocktails : découvrez comment l'IA d'Aevia s'adapte aux problèmes concrets de chaque type de restaurant.",
  en: "Bistro, fast-casual, fine dining, food truck, cocktail bar: see how Aevia's AI adapts to the concrete problems of each type of restaurant.",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const lang = LOCALES.includes(locale) ? locale : "fr";
  const title = TITLES[lang] ?? TITLES.fr;
  const description = DESCS[lang] ?? DESCS.fr;
  const url = `${BASE}/${lang}/solutions`;
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: Object.fromEntries(routing.locales.map((l) => [l, `${BASE}/${l}/solutions`])),
    },
    openGraph: { type: "website", url, siteName: "Aevia", title, description },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function SolutionsIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!LOCALES.includes(locale)) notFound();
  return <SolutionsIndexView />;
}
