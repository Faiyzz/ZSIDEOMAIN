"use client";

import { motion } from "framer-motion";
import React from "react";

export interface MarqueeImage {
  vimeoId: string;
  alt: string;
  href?: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
}

export interface ThreeDMarqueeProps {
  images: MarqueeImage[];
  className?: string;
  cols?: number; // base count; we'll add +1 to get extra line
  onImageClick?: (image: MarqueeImage, index: number) => void;
  overlayText?: string;
  overlaySubtext?: string;
  /** size of oversize plane to cover corners */
  planeBleedVmax?: number;
  /** overlap in px to kill seams */
  pixelOverlap?: number;
  /** tilt angles */
  rotateXDeg?: number;
  rotateZDeg?: number;
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
}) => {
  // one extra vertical strip
  const effectiveCols = Math.max(2, cols + 1);

  // rows per column needed to fill a tall 9:16 plane
  const rowsPerCol = Math.ceil((effectiveCols * 9) / 16) + 2;
  const totalTiles = effectiveCols * rowsPerCol;

  // repeat provided images to fill plane
  const virtualList = Array.from({ length: totalTiles }, (_, i) => images[i % images.length]);

  // group into columns
  const imageGroups = Array.from({ length: effectiveCols }, (_, col) =>
    virtualList.slice(col * rowsPerCol, (col + 1) * rowsPerCol)
  );

  const handleImageClick = (image: MarqueeImage, idx: number) => {
    if (onImageClick) onImageClick(image, idx);
    else if (image.href) window.open(image.href, image.target || "_self");
  };

  return (
    <section className={`relative min-h-screen overflow-hidden bg-black ${className}`}>
      {/* Oversized plane covers entire diagonal section */}
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
              {imageGroups.map((group, colIdx) => (
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
                  {group.map((image, imgIdx) => {
                    const globalIndex = colIdx * rowsPerCol + imgIdx;
                    const clickable = !!(image.href || onImageClick);
                    return (
                      <div
                        key={`${colIdx}-${imgIdx}`}
                        className={`relative aspect-[9/16] w-full overflow-hidden ${
                          clickable ? "cursor-pointer" : ""
                        }`}
                        onClick={() => handleImageClick(image, globalIndex)}
                        style={{ transform: "translateZ(0)", backfaceVisibility: "hidden" }}
                      >
                        {/* Slight overfill to hide seams */}
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
                            src={`https://player.vimeo.com/video/${image.vimeoId}?autoplay=1&muted=1&loop=1&autopause=0&background=1&playsinline=1`}
                            allow="autoplay; fullscreen; picture-in-picture"
                            allowFullScreen
                            title={image.alt}
                            className="block h-full w-full"
                            style={{ border: 0, background: "black" }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Overlay text + subtext */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
        <div className="absolute inset-0 bg-black/45 backdrop-blur-sm" />
        <div className="relative z-10 max-w-5xl">
          <h2 className="text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight text-white leading-tight">
            {overlayText}
          </h2>
          <p className="mt-4 text-sm sm:text-base md:text-lg text-white/85 leading-relaxed">
            {overlaySubtext}
          </p>
        </div>
      </div>
    </section>
  );
};
