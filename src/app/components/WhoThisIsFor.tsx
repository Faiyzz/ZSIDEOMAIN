// components/WhoThisIsFor.tsx
"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  ShoppingBag,
  GraduationCap,
  Building2,
  Home,
  Rocket,
} from "lucide-react";

type Persona = {
  title: string;
  blurb: string;
  bullets: string[];
  icon: React.ReactNode;
};

const personas: Persona[] = [
  {
    title: "Influencers & Creators",
    blurb:
      "Turn raw footage into binge-worthy short-form that boosts watch time and follows.",
    bullets: [
      "Hook-first cuts that stop the scroll",
      "On-brand captions & emojis",
      "Platform-ready exports (9:16, 1:1, 16:9)",
    ],
    icon: <Sparkles className="h-5 w-5" />,
  },
  {
    title: "DTC & E-Commerce Brands",
    blurb:
      "Scale creatives that actually convert—UGC, product explainers, offers, and more.",
    bullets: [
      "Conversion-driven edits for ads",
      "Variant testing made simple",
      "Speedy refresh cycles",
    ],
    icon: <ShoppingBag className="h-5 w-5" />,
  },
  {
    title: "Coaches & Online Educators",
    blurb:
      "Distill long videos into crisp carousels, shorts, and lesson highlights.",
    bullets: [
      "Story-first pacing",
      "Readable captions & callouts",
      "Repurposing across platforms",
    ],
    icon: <GraduationCap className="h-5 w-5" />,
  },
  {
    title: "Agencies & Media Teams",
    blurb:
      "Reliable white-label editing with deadlines you can set your reputation on.",
    bullets: [
      "Scalable, consistent output",
      "Style guides honored",
      "Private, NDA-friendly",
    ],
    icon: <Building2 className="h-5 w-5" />,
  },
  {
    title: "Real Estate & Local Service Pros",
    blurb:
      "Show, don’t tell—snappy property tours and authority-building shorts.",
    bullets: [
      "Geo-tagged hooks",
      "Map & text overlays",
      "Lead-gen CTAs baked in",
    ],
    icon: <Home className="h-5 w-5" />,
  },
  {
    title: "SaaS Founders & Startups",
    blurb:
      "Explain complex value simply—feature demos, changelogs, and founder shorts.",
    bullets: [
      "Clear UI callouts",
      "Feature highlight loops",
      "Asset library management",
    ],
    icon: <Rocket className="h-5 w-5" />,
  },
];

type Props = {
  /** milliseconds to show skeletons before animating in (set 0 to disable) */
  initialLoadingMs?: number;
};

export default function WhoThisIsFor({ initialLoadingMs = 600 }: Props) {
  const [loading, setLoading] = useState(initialLoadingMs > 0);

  useEffect(() => {
    if (!initialLoadingMs) return;
    const t = setTimeout(() => setLoading(false), initialLoadingMs);
    return () => clearTimeout(t);
  }, [initialLoadingMs]);

  // framer-motion variants for staggered fade-up
  const container = {
    hidden: { opacity: 1 },
    visible: {
      transition: { staggerChildren: 0.08, delayChildren: 0.05 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section id="who-this-is-for" className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <header className="mb-12 text-center">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white/95">
            Who This Is For
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm md:text-base text-neutral-400">
            We specialize in short-form video editing and content repurposing
            that drives attention, retention, and conversions.
          </p>
        </header>

        {/* Skeleton state */}
        {loading ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <li
                key={i}
                className="rounded-2xl border border-white/10 p-7 animate-pulse"
              >
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl border border-white/10" />
                  <div className="h-5 w-44 rounded bg-white/10" />
                </div>
                <div className="mt-3 h-4 w-3/4 rounded bg-white/10" />
                <div className="mt-2 h-4 w-1/2 rounded bg-white/10" />
                <div className="mt-5 space-y-2">
                  <div className="h-3 w-2/3 rounded bg-white/10" />
                  <div className="h-3 w-1/2 rounded bg-white/10" />
                  <div className="h-3 w-3/5 rounded bg-white/10" />
                </div>
                <div className="mt-6 h-4 w-32 rounded bg-white/10" />
              </li>
            ))}
          </ul>
        ) : (
          <motion.ul
            aria-label="Audience personas"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6"
          >
            {personas.map((p) => (
              <motion.li
                key={p.title}
                variants={item}
                className="group relative rounded-2xl border border-white/10 transition-all
                           hover:border-white/20 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.08)]
                           focus-within:border-white/20"
              >
                <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-white/0 via-white/30 to-white/0" />
                <article className="h-full p-7">
                  <div className="flex items-center gap-3">
                    <motion.span
                      whileHover={{ scale: 1.06 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-xl
                                 border border-white/10 text-white/80
                                 group-hover:border-white/20 group-hover:text-white
                                 transition"
                      aria-hidden
                    >
                      {p.icon}
                    </motion.span>
                    <h3 className="text-lg md:text-xl font-medium text-white/90">
                      {p.title}
                    </h3>
                  </div>

                  <p className="mt-3 text-sm text-neutral-400">{p.blurb}</p>

                  <ul className="mt-5 space-y-2">
                    {p.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span
                          aria-hidden
                          className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-white/40 group-hover:bg-white/60 transition"
                        />
                        <span className="text-sm text-neutral-300">{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6">
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors"
                    >
                      See if we’re a fit <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </article>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </div>
    </section>
  );
}
