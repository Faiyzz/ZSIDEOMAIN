// components/Carousel3DImages.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

type ImageItem = {
  id: number | string;
  src: string;
  alt?: string;
  width?: number;
  height?: number;
};

type Props = {
  items: ImageItem[];
  /** (Optional) kept for compatibility but not used for layout anymore */
  cardHeight?: number;
  speedSec?: number;
  overlapPx?: number;
  radiusClass?: string;
  aspectClass?: string; // not needed now; we use CSS aspect-ratio 9/16
};

// CSS variables-safe type (no `any`)
type CSSVars = React.CSSProperties & {
  ["--overlap"]?: string;
  ["--speedSec"]?: string;
  ["--car-h"]?: string; // reserved if you ever want to control height from parent
};

export default function Carousel3DImages({
  items,
  cardHeight, // currently not used for layout; height comes from parent via --car-h
  speedSec = 20,
  overlapPx = 12,
  radiusClass = "rounded-2xl",
}: Props) {
  const [isInView, setIsInView] = useState(true);
  const trackRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapRef.current) return;
    const io = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.1 }
    );
    io.observe(wrapRef.current);
    return () => io.disconnect();
  }, []);

  // Duplicate for seamless loop
  const loopItems = [...items, ...items];

  const wrapStyle: CSSVars = {
    "--overlap": `${overlapPx}px`,
    "--speedSec": `${speedSec}s`,
  };

  return (
    <section id="carousel-images" className="w-screen h-full">
      <div ref={wrapRef} className="relative w-full h-full overflow-hidden" style={wrapStyle}>
        <div
          ref={trackRef}
          className="flex h-full will-change-transform"
          style={{ animation: isInView ? "scroll-x var(--speedSec) linear infinite" : "none" }}
          onMouseEnter={() => {
            if (trackRef.current) trackRef.current.style.animationPlayState = "paused";
          }}
          onMouseLeave={() => {
            if (trackRef.current) trackRef.current.style.animationPlayState = "running";
          }}
        >
          {loopItems.map((it, idx) => (
            <div
              key={`${it.id}-${idx}`}
              className="relative shrink-0 h-full"
              style={{
                aspectRatio: "9 / 16", // width auto from aspect ratio
                marginLeft: idx % items.length === 0 ? 0 : "calc(var(--overlap) * -1)",
              }}
            >
              <div className={`relative h-full w-full overflow-hidden ${radiusClass}`}>
                <Image
                  src={it.src}
                  alt={it.alt ?? ""}
                  fill
                  className="object-cover"
                  priority={idx < items.length}
                  sizes="100vw"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-x {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
