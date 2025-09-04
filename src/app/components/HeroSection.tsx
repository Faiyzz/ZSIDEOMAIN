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
      const isShort = h < 760; // small-laptop height

      const targetVH = isMobile ? (isShort ? 44 : 56) : (isShort ? 40 : 52);
      const minPx = isMobile ? 360 : 420;
      const maxPx = isMobile ? 560 : 600;

      const px = Math.round(Math.min(maxPx, Math.max(minPx, (h * targetVH) / 100)));
      setCarH(px);
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

  return (
    <section
      className="relative w-full min-h-screen overflow-hidden bg-[#00151C]"
      style={{
        // 2-row grid: top flexible, bottom fixed to carousel height
        display: "grid",
        gridTemplateRows: `1fr var(--car-h, ${carH}px)`,
        backgroundImage: `
          radial-gradient(50% 60% at 90% 10%, #0C3B49 0%, transparent 70%),
          radial-gradient(60% 70% at 90% 90%, #0C3B49 0%, transparent 70%),
          radial-gradient(65% 75% at 10% 90%, #0C3B49 0%, transparent 70%)
        `,
      }}
    >
      {/* ROW 1: Headline — aligned to the bottom so it hugs the carousel */}
      <header className="relative z-30 mx-auto w-full max-w-6xl px-4 pt-[calc(var(--nav-h,64px)+0.25rem)] flex items-end">
        <motion.h1
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="
  w-full text-center font-semibold leading-tight tracking-tight text-white
  text-[clamp(36px,12vw,74px)]   /* mobile base bigger */
  sm:text-[clamp(42px,8vw,84px)] /* larger at ≥640px */
  max-w-[18ch] sm:max-w-[22ch] md:max-w-[28ch] mx-auto shiny-text
"

          style={{ textShadow: "0 1px 0 rgba(0,0,0,.25), 0 8px 30px rgba(0,0,0,.35)" }}
        >
          Attention is currency. We mint it one short at a time.
        </motion.h1>
      </header>

      {/* ROW 2: Carousel block (normal flow, fixed height via grid) */}
      <div className="relative z-20">
        <div className="relative h-full pointer-events-none">
          <Carousel3DImages
            items={images}
            speedSec={24}
            overlapPx={8}
            radiusClass="rounded-xl sm:rounded-2xl"
          />
          {/* Contrast overlay */}
          <div className="absolute inset-0 pointer-events-none bg-black/65 sm:bg-black/55 [@media(max-height:760px)]:bg-black/50" />
        </div>

        {/* CTA — centered vertically inside the carousel row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.25 }}
          className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center"
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
      </div>
    </section>
  );
}
