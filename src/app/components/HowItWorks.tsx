// components/JourneyHowItWorks.tsx
"use client";

import React from "react";
// add this import at the top with the others
import Image from "next/image";

import { motion, useScroll, useSpring, useTransform, useInView } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { cn } from "../../lib/utils"

/**
 * JourneyHowItWorks
 * - Sticky hero + persistent progress rail (never collapses on step exit)
 * - Alternating story steps with parallax media and soft gradient sheens
 * - Desktop: hover-expanding cards inspired by SeasonalHoverCards (but elevated)
 * - Mobile: vertically stacked with subtle parallax + snap scrolling
 * - Accessibility: keyboard focus expands a card; reduced motion friendly
 */

export type JourneyStep = {
    id: string;
    eyebrow?: string; // "01", "02" ...
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
    accentFrom?: string; // e.g. "#8B5CF6"
    accentTo?: string;   // e.g. "#60A5FA"
    stickyTopPx?: number; // default 112
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

    // Smooth progress and a persistent max-progress so the rail never shrinks when scrolling up.
    const spring = useSpring(scrollYProgress, { stiffness: 140, damping: 24, mass: 0.3 });
    const [maxSeen, setMaxSeen] = React.useState(0);
    React.useEffect(() => {
        const unsub = spring.on("change", (v) => setMaxSeen((m) => (v > m ? v : m)));
        return () => unsub();
    }, [spring]);
    const progressHeight = useTransform(() => `${Math.round(Math.max(maxSeen, 0) * 100)}%`);
    const progressWidth = progressHeight; // used for mobile top bar

    return (
        <section ref={sectionRef} className={cn("relative w-full overflow-clip bg-white", className)} aria-label="How it works">
            {/* Elevated backdrop with soft accents */}
            <div aria-hidden className="pointer-events-none absolute inset-0" style={{
                background: `radial-gradient(1200px 600px at 50% -10%, ${rgba(accentFrom, 0.18)}, transparent 60%),
                     radial-gradient(900px 420px at 90% 10%, ${rgba(accentTo, 0.16)}, transparent 70%),
                     linear-gradient(180deg, rgba(255,255,255,0.92), rgba(255,255,255,1))`,
            }} />

            {/* Mobile progress bar (top, subtle, persistent) */}
            <div className="sticky top-0 z-20 block border-b border-neutral-100 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/55 md:hidden">
                <motion.div className="h-[3px] origin-left" style={{ width: progressWidth, background: `linear-gradient(90deg, ${accentFrom}, ${accentTo})` }} />
            </div>

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <header className="relative z-10 mx-auto max-w-4xl py-16 md:py-24 text-center">
                    <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: "easeOut" }} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-neutral-900">
                        {heading}
                    </motion.h2>
                    <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: "easeOut", delay: 0.06 }} className="mx-auto mt-6 max-w-3xl text-lg sm:text-xl md:text-2xl text-neutral-600">
                        {subheading}
                    </motion.p>
                </header>

                {/* Grid with sticky rail + scenes */}
                <div className="relative grid grid-cols-12 gap-x-6 gap-y-14 md:gap-y-20 pb-24 md:pb-32">
                    {/* Sticky rail */}
                    <div className="col-span-1 md:col-span-2 lg:col-span-2 relative">
                        <div className="sticky hidden md:block" style={{ top: stickyTopPx }}>
                            <div className="relative ml-2 h-[70vh]">
                                <div className="absolute left-0 top-0 h-full rounded-full bg-neutral-200" style={{ width: 4 }} aria-hidden />
                                <motion.div className="absolute left-0 top-0 rounded-full" style={{ height: progressHeight, width: 4, background: `linear-gradient(to bottom, ${accentFrom}, ${accentTo})` }} aria-hidden />
                            </div>
                        </div>
                    </div>

                    {/* Scenes list */}
                    <ol className="col-span-12 md:col-span-10 lg:col-span-10 space-y-12 md:space-y-16">
                        {steps.map((s, i) => (
                            <SceneCard key={s.id} index={i} step={s} accentFrom={accentFrom} accentTo={accentTo} align={i % 2 === 0 ? "right" : "left"} />
                        ))}
                    </ol>
                </div>
            </div>
        </section>
    );
}

function SceneCard({ index, step, accentFrom, accentTo, align = "right" }: { index: number; step: JourneyStep; accentFrom: string; accentTo: string; align?: "left" | "right"; }) {
    const ref = React.useRef<HTMLLIElement>(null);
    const inView = useInView(ref, { margin: "-25% 0px -25% 0px", amount: 0.5 });
    const [revealed, setRevealed] = React.useState(false);
    React.useEffect(() => { if (inView) setRevealed(true); }, [inView]); // persist once visible

    // Parallax on image
    const hostRef = React.useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: hostRef, offset: ["start end", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);
    const sheenX = useTransform(scrollYProgress, [0, 1], ["-20%", "120%"]);

    return (
        <li ref={ref} className={cn("group relative grid grid-cols-12 items-stretch gap-6 md:gap-8", align === "right" ? "md:grid-flow-col" : "md:grid-flow-col-dense")}>
            {/* Rail connector dot */}
            <div className="col-span-1 hidden md:block">
                <span className="relative block h-full">
                    <span className="absolute left-[-12px] top-1/2 -translate-y-1/2 rounded-full bg-white ring-neutral-200" style={{ height: 14, width: 14, boxShadow: `0 0 0 8px rgba(229,229,229,1)` }} aria-hidden />
                </span>
            </div>

            {/* Title / meta */}
            <motion.div initial={{ opacity: 0, y: 18 }} animate={revealed ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, ease: "easeOut" }} className={cn("col-span-12 md:col-span-4", align === "right" ? "md:order-1" : "md:order-2")}>
                <div className="pl-1">
                    <div className="flex items-center gap-3">
                        <span className="text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase" style={{ color: accentFrom }}>{(step.eyebrow ?? String(index + 1).padStart(2, "0")).padStart(2, "0")}</span>
                        <span className="h-[2px] w-10 bg-neutral-300" />
                    </div>
                    <h3 className="mt-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900">{step.title}</h3>
                    {step.subtitle && <p className="mt-2 text-sm sm:text-base text-neutral-500">{step.subtitle}</p>}
                </div>
            </motion.div>

            {/* Content / media card */}
            <div className={cn("col-span-12 md:col-span-7", align === "right" ? "md:order-2" : "md:order-1")}>
                <motion.article ref={hostRef} initial={{ opacity: 0, y: 18, rotate: 0 }} animate={revealed ? { opacity: 1, y: 0, rotate: 0 } : {}} transition={{ duration: 0.55, ease: "easeOut", delay: 0.05 }}
                    className={cn(
                        "relative overflow-hidden rounded-3xl border border-neutral-100",
                        "bg-gradient-to-br from-white via-white to-neutral-50",
                        "shadow-[0_12px_40px_rgba(0,0,0,0.06)] focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-neutral-200 focus-within:ring-offset-white",
                        // Hover-expand like SeasonalHoverCards (desktop)
                        "transition-[transform,box-shadow] duration-500 will-change-transform",
                        "md:group-hover:[transform:translateY(-2px)]"
                    )}
                >
                    <motion.div style={{ y }} className="relative h-[220px] sm:h-[280px] md:h-[360px] lg:h-[420px]">
                        <Image
                            src={step.imageSrc}
                            alt={step.imageAlt || step.title}
                            fill
                            className="object-cover"
                            sizes="100vw"
                            priority={index < 2} // optional: prioritize first couple for LCP
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.05),rgba(0,0,0,0.25)_60%,rgba(0,0,0,0.35))]" />
                        {/* moving sheen */}
                        <motion.div
                            style={{ left: sheenX }}
                            aria-hidden
                            className="pointer-events-none absolute top-0 h-full w-[35%] rotate-6 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        />
                        {/* gradient border accent */}
                        <div aria-hidden className="absolute inset-[1px] rounded-[calc(theme(borderRadius.3xl)-1px)] ring-1 ring-black/5" />
                    </motion.div>

                    {/* Body */}
                    <div className="px-6 py-7 sm:px-8 sm:py-9 md:px-10 md:py-10">
                        <p className="text-lg sm:text-xl md:text-2xl leading-relaxed text-neutral-700">{step.body}</p>
                        <div className="mt-6 flex items-center gap-2 text-sm sm:text-base text-neutral-500">
                            <span>Next</span>
                            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-0.5" />
                        </div>
                        <motion.span initial={{ scaleX: 0 }} animate={revealed ? { scaleX: 1 } : {}} transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }} className="mt-7 block h-[3px] origin-left rounded-full" style={{ background: `linear-gradient(90deg, ${accentFrom}, ${accentTo})` }} aria-hidden />

                        {step.ctaText && (
                            <div className="mt-6">
                                <a href={step.ctaHref || "#"} className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/70 px-4 py-2 text-sm font-semibold text-neutral-800 shadow-sm backdrop-blur transition hover:bg-white">
                                    <Play className="h-4 w-4" /> {step.ctaText}
                                </a>
                            </div>
                        )}
                    </div>
                </motion.article>
            </div>
        </li>
    );
}

/** Lightweight rgba helper (accepts hex or any css color) */
function rgba(hexOrCss: string, alpha = 1) {
    if (!hexOrCss?.startsWith?.("#")) return hexOrCss;
    const h = hexOrCss.replace("#", "");
    const isShort = h.length === 3;
    const isLong = h.length === 6 || h.length === 8;
    if (!isShort && !isLong) return hexOrCss;
    const to255 = (s: string) => parseInt(s, 16);
    let r: number, g: number, b: number;
    if (isShort) { r = to255(h[0] + h[0]); g = to255(h[1] + h[1]); b = to255(h[2] + h[2]); }
    else { r = to255(h.slice(0, 2)); g = to255(h.slice(2, 4)); b = to255(h.slice(4, 6)); }
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
