"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ExternalLink,
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
import { getSolution, getSolutionCopy, type IconKey } from "@/lib/solutions-content";

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

export function SolutionPageView({ slug }: { slug: string }) {
  const pathname = usePathname();
  const locale = pathname.split("/")[1] ?? "fr";

  const entry = getSolution(slug);
  const copy = getSolutionCopy(slug, locale);

  if (!entry || !copy) return null;

  const HeroIcon = ICONS[entry.iconKey];

  return (
    <div className="min-h-screen">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-40 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div
            className={`absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full bg-gradient-to-br ${entry.accentFrom}/10 ${entry.accentTo}/5 blur-[140px]`}
          />
          <div className="absolute top-40 -left-32 w-[400px] h-[400px] rounded-full bg-zinc-700/10 blur-[100px]" />
        </div>
        <div className="mx-auto max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${entry.accentFrom}/10 ${entry.accentTo}/10 ring-1 ring-white/10 text-sm font-medium mb-6`}
            >
              <HeroIcon className="w-4 h-4 text-white" />
              <span className="text-zinc-200">{copy.badge}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-6 max-w-3xl">
              {copy.heroTitleA}{" "}
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${entry.accentFrom} ${entry.accentTo}`}>
                {copy.heroTitleHighlight}
              </span>{" "}
              {copy.heroTitleB}
            </h1>

            <p className="text-zinc-400 text-lg max-w-2xl leading-relaxed mb-10">{copy.heroSubtitle}</p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#solution"
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r ${entry.accentFrom} ${entry.accentTo} text-white text-sm font-semibold hover:opacity-90 transition-opacity`}
              >
                {copy.ctaPrimary}
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="https://inbox.aevia.services"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-zinc-700 text-zinc-300 text-sm font-semibold hover:border-zinc-500 hover:text-white transition-colors"
              >
                {copy.ctaSecondary}
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Pain point ───────────────────────────────────────────────────── */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start"
          >
            <div className="lg:col-span-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">{copy.painTitle}</h2>
              <p className="text-zinc-400 leading-relaxed">{copy.painBody}</p>
            </div>
            <div className="lg:col-span-3 space-y-3">
              {copy.painPoints.map((point) => (
                <div
                  key={point}
                  className="flex items-start gap-3 p-4 rounded-xl border border-zinc-800 bg-zinc-900/40"
                >
                  <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 bg-gradient-to-r ${entry.accentFrom} ${entry.accentTo}`} />
                  <p className="text-zinc-300 text-sm leading-relaxed">{point}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Solution / features ──────────────────────────────────────────── */}
      <section id="solution" className="relative px-6 py-20 overflow-hidden scroll-mt-20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-zinc-950/70" />
          <div
            className={`absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] rounded-full bg-gradient-to-br ${entry.accentFrom}/5 ${entry.accentTo}/5 blur-[120px]`}
          />
        </div>
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 tracking-tight">{copy.solutionTitle}</h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">{copy.solutionSubtitle}</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {copy.features.map((feature, i) => {
              const Icon = ICONS[feature.icon];
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/50 hover:border-zinc-700 transition-colors"
                >
                  <div
                    className={`inline-flex p-2.5 rounded-xl bg-gradient-to-br ${entry.accentFrom}/20 ${entry.accentTo}/10 border border-white/5 text-white mb-4`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-white font-bold text-base mb-2">{feature.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{feature.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Day in the life ──────────────────────────────────────────────── */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">{copy.dayTitle}</h2>
            <p className="text-zinc-500 text-sm">{copy.daySubtitle}</p>
          </motion.div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 sm:p-8">
            <ol className="space-y-5">
              {copy.daySteps.map((step, i) => (
                <motion.li
                  key={`${step.time}-${i}`}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="flex gap-4 items-start"
                >
                  <span
                    className={`shrink-0 mt-0.5 text-xs font-mono font-semibold px-2 py-1 rounded-md bg-gradient-to-r ${entry.accentFrom}/15 ${entry.accentTo}/10 text-zinc-200 ring-1 ring-white/5 w-[4.5rem] text-center`}
                  >
                    {step.time}
                  </span>
                  <p className="text-zinc-300 text-sm leading-relaxed pt-0.5">{step.text}</p>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="px-6 py-16 pb-24">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-900/50 p-10 text-center relative overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br ${entry.accentFrom}/5 ${entry.accentTo}/5 rounded-2xl`} />
              <div className="relative z-10">
                <h2 className="text-2xl font-bold text-white mb-3">{copy.ctaTitle}</h2>
                <p className="text-zinc-400 max-w-md mx-auto mb-8">{copy.ctaBody}</p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Link
                    href="/contact"
                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r ${entry.accentFrom} ${entry.accentTo} text-white text-sm font-semibold hover:opacity-90 transition-opacity`}
                  >
                    {copy.ctaButton}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
