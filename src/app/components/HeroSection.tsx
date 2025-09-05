// components/HeroSection.tsx
"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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

  // ===== headline swap (continuous loop) =====
  const prefersReducedMotion = useReducedMotion();
  const lines = useMemo(
    () => ["Attention is currency.", "We mint it one short at a time."],
    []
  );
  const DISPLAY_MS = 4000; // ~1s per line (visible time)
  const FADE_MS = prefersReducedMotion ? 0 : 250;

  const [idx, setIdx] = useState(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const tick = () => setIdx((i) => (i + 1) % lines.length);
    // keep cadence solid even when tab is backgrounded
    const loop = () => {
      tick();
      timerRef.current = window.setTimeout(loop, DISPLAY_MS + FADE_MS);
    };
    timerRef.current = window.setTimeout(loop, DISPLAY_MS + FADE_MS);
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [lines.length, DISPLAY_MS, FADE_MS]);

  // ===== responsive carousel height + CSS var for layout =====
  useLayoutEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const isMobile = w < 640;
      const isShort = h < 760;

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
  className="relative w-full min-h-screen overflow-hidden"
  style={{
    display: "grid",
    gridTemplateRows: `1fr var(--car-h, ${carH}px)`,
  }}
>

      {/* ROW 1: Headline — no extra gap; sits flush under navbar */}
      <header className="relative z-30 mx-auto w-full max-w-6xl px-4 pt-[var(--nav-h,64px)] flex items-end">
        <h1
          className="
            w-full text-center font-semibold leading-tight tracking-tight text-white
           text-[clamp(42px,14vw,92px)]  
sm:text-[clamp(48px,10vw,104px)] 

            max-w-[18ch] sm:max-w-[22ch] md:max-w-[28ch] mx-auto
          "
          style={{ textShadow: "0 1px 0 rgba(0,0,0,.25), 0 8px 30px rgba(0,0,0,.35)" }}
          aria-live="polite"
        >
          {/* Swap container: prevents layout shift by stacking words absolutely */}
          <span className="relative inline-block align-top">
            {/* Reserve height based on the longer line */}
            <span className="invisible block">
              {lines.reduce((a, b) => (a.length > b.length ? a : b))}
            </span>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={idx}
                className="absolute inset-0"
                initial={{ y: prefersReducedMotion ? 0 : 16, opacity: prefersReducedMotion ? 1 : 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: prefersReducedMotion ? 0 : -14, opacity: prefersReducedMotion ? 1 : 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }} // 👈 slower animation
              >
                {lines[idx]}
              </motion.span>

            </AnimatePresence>
          </span>
        </h1>
      </header>

      {/* ROW 2: Carousel block */}
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

     
      </div>
    </section>
  );
}
