"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowRight,
  PhoneCall,
  Clock,
  CalendarCheck,
  MessageCircle,
  UtensilsCrossed,
  Wine,
  Truck,
  Gem,
  Zap,
  Users,
  type LucideIcon,
} from "lucide-react";
import { SOLUTIONS, getSolutionCopy, type IconKey } from "@/lib/solutions-content";

const ICONS: Record<IconKey, LucideIcon> = {
  "phone-ring": PhoneCall,
  clock: Clock,
  "calendar-check": CalendarCheck,
  "message-circle": MessageCircle,
  utensils: UtensilsCrossed,
  wine: Wine,
  truck: Truck,
  gem: Gem,
  zap: Zap,
  users: Users,
};

const INDEX_T: Record<string, { badge: string; title1: string; title2: string; sub: string }> = {
  fr: {
    badge: "Solutions restaurant",
    title1: "Une IA différente",
    title2: "selon votre type d'établissement",
    sub: "Un bistrot, un fast-casual et un restaurant gastronomique n'ont pas les mêmes problèmes. Choisissez votre profil pour voir concrètement comment Aevia s'y adapte.",
  },
  en: {
    badge: "Restaurant solutions",
    title1: "A different AI setup",
    title2: "depending on your type of restaurant",
    sub: "A bistro, a fast-casual spot, and a fine dining room don't have the same problems. Pick your profile to see exactly how Aevia adapts to it.",
  },
};

export function SolutionsIndexView() {
  const pathname = usePathname();
  const locale = pathname.split("/")[1] ?? "fr";
  const t = INDEX_T[locale] ?? INDEX_T.fr;

  return (
    <div className="min-h-screen">
      <section className="relative pt-40 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-violet-600/8 blur-[120px]" />
          <div className="absolute top-40 -left-32 w-[400px] h-[400px] rounded-full bg-cyan-600/5 blur-[100px]" />
        </div>
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-2 mb-6">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 ring-1 ring-violet-500/20 text-violet-300 text-xs font-medium">
              {t.badge}
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white leading-[1.1] mb-4 max-w-3xl">
            {t.title1} <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">{t.title2}</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl leading-relaxed">{t.sub}</p>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-5xl grid grid-cols-1 sm:grid-cols-2 gap-5">
          {SOLUTIONS.map((entry, i) => {
            const copy = getSolutionCopy(entry.slug, locale);
            if (!copy) return null;
            const Icon = ICONS[entry.iconKey];
            return (
              <motion.div
                key={entry.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
              >
                <Link
                  href={`/${locale}/solutions/${entry.slug}`}
                  className={`group block h-full p-7 rounded-2xl border border-zinc-800 bg-zinc-900/50 hover:border-zinc-600 hover:-translate-y-1 hover:shadow-2xl ${entry.glow} transition-all duration-300`}
                >
                  <div
                    className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${entry.accentFrom}/20 ${entry.accentTo}/10 border border-white/5 text-white mb-5`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <h2 className="text-white font-bold text-xl mb-2">{copy.label}</h2>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6">{copy.heroSubtitle}</p>
                  <div
                    className={`inline-flex items-center gap-2 text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r ${entry.accentFrom} ${entry.accentTo}`}
                  >
                    <span className="text-zinc-300 group-hover:text-white transition-colors">
                      {locale === "en" ? "See how it works" : "Voir comment ça marche"}
                    </span>
                    <ArrowRight className="w-4 h-4 text-zinc-300 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
