"use client";

import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { useEffect } from "react";

/**
 * GlobalGradientBG
 * - Fixed, full-viewport gradient backdrop (behind everything)
 * - Tiny scroll & mouse parallax so the hotspots feel alive
 * - Zero pointer events; cheap to render (no filters or heavy blurs)
 */
export default function GlobalGradientBG({
  intensity = 12, // px of parallax per 100% scroll/mouse
  className = "",
}: { intensity?: number; className?: string }) {
  // Scroll parallax
  const { scrollYProgress } = useScroll();
  const sy = useSpring(scrollYProgress, { stiffness: 50, damping: 20, mass: 0.5 });
  const yShift = useTransform(sy, [0, 1], [0, intensity]); // move down slightly as we scroll

  // Mouse parallax (soft)
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const smx = useSpring(mx, { stiffness: 80, damping: 20, mass: 0.4 });
  const smy = useSpring(my, { stiffness: 80, damping: 20, mass: 0.4 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      mx.set(x);
      my.set(y);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  // compute small XY deltas from mouse for each gradient origin
  const dx = useTransform(smx, [0, 1], [-intensity, intensity]);
  const dy = useTransform(smy, [0, 1], [-intensity, intensity]);

  return (
    <motion.div
      aria-hidden
      className={[
        "fixed inset-0 -z-50 pointer-events-none",
        "bg-[#00151C]", // base
        className,
      ].join(" ")}
      style={{
        translateY: yShift, // scroll drift
        // The gradients below mirror your HeroSection palette
        backgroundImage: `
          radial-gradient(50% 60% at calc(90% + ${dx.get()}px) calc(10% + ${dy.get()}px), #0C3B49 0%, transparent 70%),
          radial-gradient(60% 70% at calc(90% - ${dx.get()/2}px) calc(90% + ${dy.get()/2}px), #0C3B49 0%, transparent 70%),
          radial-gradient(65% 75% at calc(10% + ${dx.get()/1.5}px) calc(90% - ${dy.get()/1.5}px), #0C3B49 0%, transparent 70%)
        `,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
      }}
    />
  );
}
