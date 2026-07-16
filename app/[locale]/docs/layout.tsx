import type { Metadata } from "next";
import { DocsNav } from "@/components/DocsNav";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Documentation officielle Aevia : comment fonctionnent AeviaInbox, AeviaLaunch et AeviaSecurity, leurs fonctionnalités réelles et leurs intégrations.",
  openGraph: {
    title: "Documentation — Aevia",
    description:
      "Comment fonctionnent AeviaInbox, AeviaLaunch et AeviaSecurity : fonctionnalités, intégrations et périmètre.",
    type: "website",
  },
};

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen pt-14">
      <DocsNav />
      {children}
    </div>
  );
}
