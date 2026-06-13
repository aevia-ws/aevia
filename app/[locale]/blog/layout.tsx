import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Conseils pratiques pour PME et indépendants : sites web, marketing, cybersécurité et relation client. Par Aevia.",
  openGraph: {
    title: "Blog — Aevia",
    description:
      "Conseils pratiques pour PME et indépendants : sites web, marketing, cybersécurité et relation client.",
    type: "website",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
