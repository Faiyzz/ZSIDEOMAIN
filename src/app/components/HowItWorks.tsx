// components/JourneyHowItWorks.tsx
"use client";

import React from "react";
import Image from "next/image";
import { motion, useScroll, useSpring, useInView } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { cn } from "@/lib/utils";

export type JourneyStep = {
  id: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  body: string;
  imageSrc: string;
  imageAlt?: string;
  ctaText?: string;
  ctaHref?: string;
};

export type JourneyProps = {
  heading?: string;
  subheading?: string;
  steps: JourneyStep[];
  accentFrom?: string;
  accentTo?: string;
  stickyTopPx?: number;
  className?: string;
};

export default function JourneyHowItWorks({
  heading = "How it works",
  subheading = "A guided journey—record once, publish everywhere.",
  steps,
  accentFrom = "#8B5CF6",
  accentTo = "#60A5FA",
  stickyTopPx = 112,
  className,
}: JourneyProps) {
  const sectionRef = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start 15%", "end 85%"] });
  const spring = useSpring(scrollYProgress, { stiffness: 140, damping: 24, mass: 0.3 });

  const [maxSeen, setMaxSeen] = React.useState(0);
  React.useEffect(() => {
    const unsub = spring.on("change", (v) => setMaxSeen((m) => (v > m ? v : m)));
    return () => unsub();
  }, [spring]);

  // Hydration-safe flags: start false on server & first client render; enable after mount.
  const [mounted, setMounted] = React.useState(false);
  const [enableParallax, setEnableParallax] = React.useState(false);
  const [enableSheen, setEnableSheen] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);

    // Optional: turn these on after mount (never during SSR)
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    const wide = window.innerWidth >= 768;

    setEnableParallax(!reduced && wide); // set to false to disable entirely
    setEnableSheen(!reduced);            // set to false to disable sheen
  }, []);

  const progressPct = Math.round(Math.max(maxSeen, 0) * 100);
  const progressDim = `${progressPct}%`;

  return (
    <section
      ref={sectionRef}
      className={cn("relative w-full overflow-clip bg-white", className)}
      aria-label="How it works"
    >
      {/* Light backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(900px 420px at 80% -10%, ${rgba(accentFrom, 0.12)}, transparent 60%),
            radial-gradient(700px 360px at 10% 0%, ${rgba(accentTo, 0.10)}, transparent 65%),
            linear-gradient(180deg, rgba(255,255,255,0.96), rgba(255,255,255,1))
          `,
        }}
      />

      {/* Mobile progress bar */}
      <div className="sticky top-0 z-20 block border-b border-neutral-100 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/55 md:hidden">
        <div
          className="h-[3px] origin-left"
          style={{
            width: progressDim,
            background: `linear-gradient(90deg, ${accentFrom}, ${accentTo})`,
            transition: "width 180ms ease-out",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="relative z-10 mx-auto max-w-4xl py-12 sm:py-16 md:py-24 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-neutral-900"
          >
            {heading}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.04 }}
            className="mx-auto mt-5 sm:mt-6 max-w-3xl text-lg sm:text-xl md:text-2xl text-neutral-600"
          >
            {subheading}
          </motion.p>
        </header>

        {/* Grid: sticky rail + scenes */}
        <div className="relative grid grid-cols-12 gap-x-6 gap-y-14 md:gap-y-20 pb-20 sm:pb-24 md:pb-32">
          {/* Sticky rail */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2 relative">
            <div className="sticky hidden md:block" style={{ top: stickyTopPx }}>
              <div className="relative ml-2 h-[64vh]">
                <div className="absolute left-0 top-0 h-full rounded-full bg-neutral-200" style={{ width: 4 }} aria-hidden />
                <div
                  className="absolute left-0 top-0 rounded-full"
                  style={{
                    height: progressDim,
                    width: 4,
                    background: `linear-gradient(to bottom, ${accentFrom}, ${accentTo})`,
                    transition: "height 180ms ease-out",
                  }}
                  aria-hidden
                />
              </div>
            </div>
          </div>

          {/* Scenes */}
          <ol className="col-span-12 md:col-span-10 lg:col-span-10 space-y-12 md:space-y-16">
            {steps.map((s, i) => (
              <MemoSceneCard
                key={s.id}
                index={i}
                step={s}
                accentFrom={accentFrom}
                accentTo={accentTo}
                align={i % 2 === 0 ? "right" : "left"}
                enableParallax={enableParallax}
                enableSheen={enableSheen}
                mounted={mounted}
              />
            ))}
          </ol>
        </div>
      </div>

      {/* Scoped keyframes for sheen */}
      <style jsx>{`
        @keyframes sheen {
          0% { transform: translateX(-20%) rotate(6deg); }
          100% { transform: translateX(120%) rotate(6deg); }
        }
      `}</style>
    </section>
  );
}

type SceneCardProps = {
  index: number;
  step: JourneyStep;
  accentFrom: string;
  accentTo: string;
  align?: "left" | "right";
  enableParallax: boolean;
  enableSheen: boolean;
  mounted: boolean;
};

const SceneCard = ({
  index,
  step,
  accentFrom,
  accentTo,
  align = "right",
  enableParallax,
  enableSheen,
  mounted,
}: SceneCardProps) => {
  const ref = React.useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { margin: "-25% 0px -25% 0px", amount: 0.5 });
  const [revealed, setRevealed] = React.useState(false);
  React.useEffect(() => { if (inView) setRevealed(true); }, [inView]);

  // Parallax: never during SSR/first client render. Only apply after mount.
  const hostRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (!mounted || !enableParallax || !hostRef.current) return;
    const el = hostRef.current;

    // Simple rAF scroll handler (cheap)
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight || 1;
        const t = Math.min(1, Math.max(0, 1 - (rect.top + rect.height) / (vh + rect.height))); // 0..1
        const y = (t * 8) - 4; // -4%..+4%
        el.style.transform = `translate3d(0, ${y}%, 0)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [mounted, enableParallax]);

  return (
    <li
      ref={ref}
      className={cn(
        "group relative grid grid-cols-12 items-stretch gap-6 md:gap-8",
        align === "right" ? "md:grid-flow-col" : "md:grid-flow-col-dense"
      )}
    >
      {/* Rail dot */}
      <div className="col-span-1 hidden md:block">
        <span className="relative block h-full">
          <span
            className="absolute left-[-12px] top-1/2 -translate-y-1/2 rounded-full bg-white ring-neutral-200"
            style={{ height: 14, width: 14, boxShadow: `0 0 0 8px rgba(229,229,229,1)` }}
            aria-hidden
          />
        </span>
      </div>

      {/* Meta */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={revealed ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className={cn("col-span-12 md:col-span-4", align === "right" ? "md:order-1" : "md:order-2")}
      >
        <div className="pl-1">
          <div className="flex items-center gap-3">
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase" style={{ color: accentFrom }}>
              {(step.eyebrow ?? String(index + 1).padStart(2, "0")).padStart(2, "0")}
            </span>
            <span className="h-[2px] w-10 bg-neutral-300" />
          </div>
          <h3 className="mt-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900">
            {step.title}
          </h3>
          {step.subtitle && <p className="mt-2 text-sm sm:text-base text-neutral-500">{step.subtitle}</p>}
        </div>
      </motion.div>

      {/* Media card */}
      <div className={cn("col-span-12 md:col-span-7", align === "right" ? "md:order-2" : "md:order-1")}>
        <motion.article
          initial={{ opacity: 0, y: 18 }}
          animate={revealed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
          className={cn(
            "relative overflow-hidden rounded-3xl border border-neutral-100",
            "bg-gradient-to-br from-white via-white to-neutral-50",
            "shadow-[0_12px_40px_rgba(0,0,0,0.06)] focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-neutral-200 focus-within:ring-offset-white",
            "transition-[transform,box-shadow] duration-500 will-change-transform",
            "md:group-hover:[transform:translateY(-2px)]"
          )}
        >
          <div
            ref={hostRef}
            // IMPORTANT: no style prop during SSR/first render. Only CSS class.
            className="relative h-[200px] sm:h-[260px] md:h-[340px] lg:h-[420px] will-change-transform"
          >
            <Image
              src={step.imageSrc}
              alt={step.imageAlt || step.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 720px"
              priority={index < 2}
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04),rgba(0,0,0,0.22)_60%,rgba(0,0,0,0.32))]" />
            {enableSheen && (
              <div
                aria-hidden
                className="pointer-events-none absolute top-0 h-full w-[28%] rotate-6 bg-gradient-to-r from-transparent via-white/16 to-transparent"
                style={{ animation: "sheen 2.8s linear infinite" }}
              />
            )}
            <div aria-hidden className="absolute inset-[1px] rounded-[calc(theme(borderRadius.3xl)-1px)] ring-1 ring-black/5" />
          </div>

          {/* Body */}
          <div className="px-6 py-7 sm:px-8 sm:py-9 md:px-10 md:py-10">
            <p className="text-base sm:text-lg md:text-xl leading-relaxed text-neutral-700">{step.body}</p>
            <div className="mt-6 flex items-center gap-2 text-sm sm:text-base text-neutral-500">
              <span>Next</span>
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-0.5" />
            </div>
            <span
              className="mt-7 block h-[3px] origin-left rounded-full"
              style={{ background: `linear-gradient(90deg, ${accentFrom}, ${accentTo})` }}
              aria-hidden
            />
            {step.ctaText && (
              <div className="mt-6">
                <a
                  href={step.ctaHref || "#"}
                  className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/70 px-4 py-2 text-sm font-semibold text-neutral-800 shadow-sm backdrop-blur transition hover:bg-white"
                >
                  <Play className="h-4 w-4" /> {step.ctaText}
                </a>
              </div>
            )}
          </div>
        </motion.article>
      </div>
    </li>
  );
};

const MemoSceneCard = React.memo(SceneCard);

/** rgba helper */
function rgba(hexOrCss: string, alpha = 1) {
  if (!hexOrCss?.startsWith?.("#")) return hexOrCss;
  const h = hexOrCss.replace("#", "");
  const to255 = (s: string) => parseInt(s, 16);
  const short = h.length === 3;
  if (short) {
    return `rgba(${to255(h[0] + h[0])}, ${to255(h[1] + h[1])}, ${to255(h[2] + h[2])}, ${alpha})`;
  }
  return `rgba(${to255(h.slice(0, 2))}, ${to255(h.slice(2, 4))}, ${to255(h.slice(4, 6))}, ${alpha})`;
}
