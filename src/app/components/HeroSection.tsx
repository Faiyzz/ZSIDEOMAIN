// components/HeroSection.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Carousel3DImages from "./Carousel3DImages";

const images = [
  { id: 1, src: "/gallery/1.jpg", alt: "shot 1" },
  { id: 2, src: "/gallery/2.jpg", alt: "shot 2" },
  { id: 3, src: "/gallery/3.jpg", alt: "shot 3" },
  { id: 4, src: "/gallery/4.jpg", alt: "shot 4" },
  { id: 5, src: "/gallery/5.jpg", alt: "shot 5" },
  { id: 6, src: "/gallery/6.jpg", alt: "shot 6" },
  { id: 7, src: "/gallery/7.jpg", alt: "shot 7" },
  { id: 8, src: "/gallery/8.jpg", alt: "shot 8" },
  { id: 9, src: "/gallery/9.jpg", alt: "shot 9" },
  { id: 10, src: "/gallery/10.jpg", alt: "shot 10" },
];

export default function HeroSection() {
  const [cardH, setCardH] = useState(560);

  useEffect(() => {
    const calc = () => {
      const h = window.innerHeight;
      const mobile = window.innerWidth < 640;

      if (mobile) {
        // Mobile: strong presence; never tiny
        setCardH(Math.max(Math.round(h * 0.60), 380));
      } else {
        // Desktop/tablet: proportional but clamped
        setCardH(Math.min(640, Math.max(520, Math.round(h * 0.58))));
      }
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  const heading = (
    <>
      <span className="block">Attention is currency.</span>
      <span className="block sm:inline">We mint it one short at a time.</span>
    </>
  );

  return (
    <section
      className="relative w-full min-h-screen overflow-hidden bg-[#00151C]"
      style={{
        backgroundImage: `
          radial-gradient(50% 60% at 90% 10%, #0C3B49 0%, transparent 70%),
          radial-gradient(60% 70% at 90% 90%, #0C3B49 0%, transparent 70%),
          radial-gradient(65% 75% at 10% 90%, #0C3B49 0%, transparent 70%)
        `,
      }}
    >
      {/* FLOW SPACER to reserve exact carousel height -> prevents black gap */}
      <div aria-hidden className="w-full" style={{ height: cardH }} />

      {/* CAROUSEL LAYER */}
      <div className="absolute inset-x-0 bottom-0 z-30" style={{ height: cardH }}>
        <div className="relative h-full">
          <Carousel3DImages
            items={images}
            cardHeight={cardH}
            speedSec={24}
            overlapPx={8}
            radiusClass="rounded-xl sm:rounded-2xl"
            aspectClass="aspect-[9/16]"
          />
          {/* darken media for contrast */}
          <div className="absolute inset-0 bg-black/75 sm:bg-black/55" />
        </div>
      </div>

      {/* HEADING: FILLED VERSION (BEHIND CAROUSEL) */}
      <div
        className="pointer-events-none absolute inset-0 z-20 flex items-start justify-center px-4 text-center"
        style={{ paddingTop: "calc(var(--nav-h, 64px) + 1.25rem)" }}
        aria-hidden
      >
        <motion.h1
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className={[
            // Typography
            "font-semibold leading-tight tracking-tight shiny-text mt-8",
            // Size: force big + 2 lines on mobile; loosen on larger screens
            "text-[clamp(32px,9vw,84px)]",
            // Width clamp encourages wrapping ~2 lines on mobile
            "max-w-[16ch] sm:max-w-[22ch] md:max-w-[28ch]",
            // Color and subtle glow (behind layer)
           
          ].join(" ")}
        >
          {heading}
        </motion.h1>
      </div>


    

      {/* CTA (ABOVE EVERYTHING, BUT SEPARATE FROM HEADING) */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.25 }}
        className="pointer-events-none absolute inset-0 z-50 flex items-end justify-center pb-8"
        style={{ paddingTop: "calc(var(--nav-h, 64px) + 1.25rem)" }}
      >
        <a
          href="#get-started"
          className="pointer-events-auto group inline-flex items-center gap-2
                     rounded-full border border-white/60 bg-white/10
                     px-6 py-3 sm:px-8 sm:py-4
                     text-sm sm:text-lg font-semibold text-white
                     shadow-lg backdrop-blur-md
                     transition-transform duration-300
                     hover:scale-[1.04] active:scale-[0.97]"
        >
          Get Started
          <svg
            className="size-5 transition-transform group-hover:translate-x-0.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </a>
      </motion.div>
    </section>
  );
}
