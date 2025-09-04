// components/HeroSection.tsx
"use client";

import { useLayoutEffect, useState } from "react";
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
  const [carH, setCarH] = useState<number>(560);

  useLayoutEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const isMobile = w < 640;
      const isShort = h < 760; // common small-laptop height

      // Base target as % of viewport height
      const targetVH = isMobile ? (isShort ? 44 : 56) : (isShort ? 40 : 52);
      // Hard clamps in px to prevent “monster” carousel on small laptops
      const minPx = isMobile ? 360 : 420;
      const maxPx = isMobile ? 560 : 600;

      const px = Math.round(Math.min(maxPx, Math.max(minPx, (h * targetVH) / 100)));
      setCarH(px);
      // expose to CSS consumers
      document.documentElement.style.setProperty("--car-h", `${px}px`);
    };

    calc();
    window.addEventListener("resize", calc);
    window.addEventListener("orientationchange", calc);
    return () => {
      window.removeEventListener("resize", calc);
      window.removeEventListener("orientationchange", calc);
    };
  }, []);

  const heading = (
    <>
      <span className="block shiny-text">Attention is currency.</span>
      <span className="block sm:inline shiny-text">We mint it one short at a time.</span>
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
      {/* Reserve exact carousel height at top to prevent jump */}
      <div aria-hidden className="w-full" style={{ height: `var(--car-h, ${carH}px)` }} />

      {/* CAROUSEL LAYER */}
      <div className="absolute inset-x-0 bottom-0 z-30" style={{ height: `var(--car-h, ${carH}px)` }}>
        <div className="relative h-full pointer-events-none">
          <Carousel3DImages
            items={images}
            speedSec={24}
            overlapPx={8}
            radiusClass="rounded-xl sm:rounded-2xl"
          />
          {/* darken media for contrast – lighten on short/mobile to help text pop */}
          <div className="absolute inset-0 pointer-events-none bg-black/65 sm:bg-black/55 [@media(max-height:760px)]:bg-black/50" />
        </div>
      </div>

      {/* BACK glow headline (behind carousel for depth) */}
      <div
        className="pointer-events-none absolute inset-0 z-20 flex items-start justify-center px-4 text-center"
        style={{ paddingTop: "calc(var(--nav-h, 64px) + 1.25rem)" }}
        aria-hidden
      >
        <motion.h1
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="font-semibold leading-tight tracking-tight mt-8 text-[clamp(30px,8.5vw,74px)] max-w-[16ch] sm:max-w-[22ch] md:max-w-[28ch] text-white/10 blur-[1px]"
        >
          {heading}
        </motion.h1>
      </div>

      {/* FRONT crisp headline (always above carousel) */}
      <div
        className="pointer-events-none absolute inset-0 z-40 flex items-start justify-center px-4 text-center"
        style={{ paddingTop: "calc(var(--nav-h, 64px) + 1.25rem)" }}
      >
        <motion.h1
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          className="font-semibold leading-tight tracking-tight mt-8 text-[clamp(30px,8.5vw,74px)] max-w-[16ch] sm:max-w-[22ch] md:max-w-[28ch] text-white"
          style={{
            textShadow:
              "0 1px 0 rgba(0,0,0,.25), 0 8px 30px rgba(0,0,0,.35)",
          }}
        >
          {heading}
        </motion.h1>
      </div>

      {/* CTA */}
      {/* CTA — centered over carousel */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.25 }}
        className="pointer-events-none absolute inset-x-0 z-50 flex items-center justify-center"
        style={{ height: `var(--car-h, ${carH}px)`, bottom: 0 }}
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
