"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useMemo, useRef, useState } from "react";
import type PlayerType from "@vimeo/player"; // gets types from @types/vimeo__player or our stub

export interface MarqueeImage {
  vimeoId: string;
  alt: string;
  poster?: string;
  href?: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
}

export interface ThreeDMarqueeProps {
  images: MarqueeImage[];
  className?: string;
  cols?: number;
  onImageClick?: (image: MarqueeImage, index: number) => void;
  overlayText?: string;
  overlaySubtext?: string;
  planeBleedVmax?: number;
  pixelOverlap?: number;
  rotateXDeg?: number;
  rotateZDeg?: number;
  ctaText?: string;
  ctaHref?: string;
}

export const ThreeDMarquee: React.FC<ThreeDMarqueeProps> = ({
  images,
  className = "",
  cols = 4,
  onImageClick,
  overlayText = "Editing For Impact",
  overlaySubtext = "We don’t just cut clips — we create rhythm, story, and punch. Every zoom, caption, and transition is optimized for attention.",
  planeBleedVmax = 160,
  pixelOverlap = 0.5,
  rotateXDeg = 50,
  rotateZDeg = 45,
  ctaText = "Create Your Impact",
  ctaHref = "#contact",
}) => {
  const effectiveCols = Math.max(2, cols + 1);
  const rowsPerCol = Math.ceil((effectiveCols * 9) / 16) + 2;
  const totalTiles = effectiveCols * rowsPerCol;

  const virtualList = useMemo(
    () => Array.from({ length: totalTiles }, (_, i) => images[i % images.length]),
    [images, totalTiles]
  );

  const [posterVisible, setPosterVisible] = useState<boolean[]>(
    () => Array.from({ length: totalTiles }, () => true)
  );

  const iframeRefs = useRef<(HTMLIFrameElement | null)[]>([]);
  const playersRef = useRef<PlayerType[]>([]);

  // autoplay queue with limited concurrency + stagger
  useEffect(() => {
    let cancelled = false;
    const cleanups: Array<() => void> = [];

    (async () => {
      let PlayerCtor: typeof PlayerType | undefined;
      try {
        const mod = await import("@vimeo/player");
        PlayerCtor = (mod as any).default || (mod as any);
      } catch {
        // @ts-ignore
        PlayerCtor = (window as any)?.Vimeo?.Player;
      }
      if (!PlayerCtor) return;

      // Create players and attach listeners
      playersRef.current = [];
      iframeRefs.current.forEach((iframe, idx) => {
        if (!iframe) return;
        const player = new PlayerCtor!(iframe);
        playersRef.current[idx] = player as unknown as PlayerType;

        const onPlay = () => {
          if (cancelled) return;
          setPosterVisible((arr) => {
            if (!arr[idx]) return arr;
            const next = arr.slice();
            next[idx] = false;
            return next;
          });
        };
        const onTimeUpdate = (data: any) => {
          if (data?.seconds > 0.2) onPlay();
        };

        player.on("play", onPlay);
        player.on("timeupdate", onTimeUpdate);
        cleanups.push(() => {
          player.off("play", onPlay);
          player.off("timeupdate", onTimeUpdate);
        });

        player.setMuted(true).catch(() => {});
        player.setLoop(true).catch(() => {});
      });

      // Build queue in row-major order (prevents all first-column starts together)
      const queue: number[] = [];
      for (let r = 0; r < rowsPerCol; r++) {
        for (let c = 0; c < effectiveCols; c++) {
          const idx = c * rowsPerCol + r;
          if (playersRef.current[idx]) queue.push(idx);
        }
      }

      const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));
      const MAX_CONCURRENT = Math.min(6, effectiveCols + 1); // keep this modest
      const maxRetries = 2;
      let active = 0;

      const startOne = async (idx: number) => {
        const player = playersRef.current[idx];
        if (!player) return;
        // base stagger by grid position
        const baseDelay = 40 * (idx % effectiveCols) + 80 * Math.floor(idx / effectiveCols);
        await wait(baseDelay);
        try { await player.ready(); } catch {}
        for (let r = 0; r < maxRetries; r++) {
          if (cancelled) return;
          try {
            await player.play();
            break;
          } catch {
            await wait(250);
          }
        }
      };

      // Respect tab visibility to avoid autoplay blocks and “spinner favicon”
      const canRun = () => document.visibilityState === "visible";
      const onVisibility = () => {
        // no-op; loop below reads visibility on each tick
      };
      document.addEventListener("visibilitychange", onVisibility);
      cleanups.push(() => document.removeEventListener("visibilitychange", onVisibility));

      // Pump queue
      (async function pump() {
        while (!cancelled && queue.length) {
          if (!canRun()) { await wait(200); continue; }
          if (active >= MAX_CONCURRENT) { await wait(50); continue; }
          const idx = queue.shift()!;
          active++;
          startOne(idx).finally(() => { active--; });
          await wait(10);
        }
      })();
    })();

    return () => {
      cancelled = true;
      cleanups.forEach((fn) => fn());
    };
  }, [virtualList.length, effectiveCols, rowsPerCol]);

  const handleImageClick = (image: MarqueeImage, idx: number) => {
    if (onImageClick) onImageClick(image, idx);
    else if (image.href) window.open(image.href, image.target || "_self");
  };

  return (
    <section className={`relative min-h-screen overflow-hidden bg-black ${className}`}>
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute left-1/2 top-1/2"
          style={{
            width: `${planeBleedVmax}vmax`,
            height: `${planeBleedVmax}vmax`,
            transform: `translate(-50%, -50%) rotateX(${rotateXDeg}deg) rotateZ(${rotateZDeg}deg)`,
            transformOrigin: "center",
            willChange: "transform",
          }}
        >
          <div className="relative h-full w-full">
            <div
              className="relative grid h-full w-full origin-center"
              style={{
                gridTemplateColumns: `repeat(${effectiveCols}, minmax(0, 1fr))`,
                gap: 0,
              }}
            >
              {Array.from({ length: effectiveCols }, (_, colIdx) => {
                const group = virtualList.slice(colIdx * rowsPerCol, (colIdx + 1) * rowsPerCol);
                return (
                  <motion.div
                    key={colIdx}
                    className="relative flex h-full flex-col items-stretch"
                    style={{ gap: 0 }}
                    animate={{ y: colIdx % 2 === 0 ? 100 : -100 }}
                    transition={{
                      duration: colIdx % 2 === 0 ? 10 : 15,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  >
                    {group.map((image, rowIdx) => {
                      const globalIndex = colIdx * rowsPerCol + rowIdx;
                      const clickable = !!(image.href || onImageClick);
                      return (
                        <div
                          key={`${colIdx}-${rowIdx}`}
                          className={`relative aspect-[9/16] w-full overflow-hidden ${
                            clickable ? "cursor-pointer" : ""
                          }`}
                          onClick={() => handleImageClick(image, globalIndex)}
                          style={{ transform: "translateZ(0)", backfaceVisibility: "hidden" }}
                        >
                          <div
                            className="absolute"
                            style={{
                              top: -pixelOverlap,
                              right: -pixelOverlap,
                              bottom: -pixelOverlap,
                              left: -pixelOverlap,
                            }}
                          >
                            <iframe
                              ref={(el) => { iframeRefs.current[globalIndex] = el; }}
                              src={`https://player.vimeo.com/video/${image.vimeoId}?autoplay=1&muted=1&loop=1&autopause=0&background=1&playsinline=1`}
                              allow="autoplay; fullscreen; picture-in-picture"
                              allowFullScreen
                              title={image.alt}
                              className="block h-full w-full"
                              style={{ border: 0, background: "black" }}
                            />
                          </div>

                          <AnimatePresence>
                            {posterVisible[globalIndex] && (
                              <motion.img
                                key="poster"
                                src={image.poster || "/placeholder-poster.jpg"}
                                alt={image.alt}
                                className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                                initial={{ opacity: 1 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.35, ease: "easeOut" }}
                                style={{
                                  top: -pixelOverlap,
                                  right: -pixelOverlap,
                                  bottom: -pixelOverlap,
                                  left: -pixelOverlap,
                                }}
                              />
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Overlay (heading, subtext, CTA) */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
        <div className="absolute inset-0 bg-black/45 backdrop-blur-sm" />
        <div className="relative z-10 max-w-5xl">
          <h2 className="text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight text-white leading-tight">
            {overlayText}
          </h2>
          {overlaySubtext ? (
            <p className="mt-4 text-sm sm:text-base md:text-lg text-white/85 leading-relaxed">
              {overlaySubtext}
            </p>
          ) : null}
          {ctaText ? (
            <div className="pointer-events-auto mt-6">
              <a
                href={ctaHref}
                className="inline-flex items-center justify-center rounded-2xl px-6 py-3 font-semibold text-black bg-white hover:bg-white/90 shadow-lg"
              >
                {ctaText}
              </a>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

