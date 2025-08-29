// components/TestimonialGrid.tsx
"use client";

import React, { useMemo, useRef, useState } from "react";
import Image from "next/image";

type Item = {
  id: string;
  poster: string;
  src?: string;
  title?: string;
};

type Props = {
  items?: Item[];
  rowHeightClass?: string; // controls row height
};

/** Each row defines 4 custom widths (sum = 100%) */
const WIDTHS: string[][] = [
  ["20%", "35%", "15%", "30%"], // row 1
  ["30%", "20%", "35%", "15%"], // row 2
  ["25%", "15%", "40%", "20%"], // row 3
];

const DEFAULT_ITEMS: Item[] = [
  {
    id: "v1",
    poster: "/images/mobile.svg",
    src: "/videos/vid1.mp4",
    title: "Repeat",
  },
  {
    id: "v2",
    poster: "/images/mobile.svg",
    src: "/videos/vid2.mp4",
    title: "here's how",
  },
  {
    id: "v3",
    poster: "/images/mobile.svg",
    src: "/videos/vid3.mp4",
    title: "Repeat",
  },
  {
    id: "v4",
    poster: "/images/mobile.svg",
    src: "/videos/vid4.mp4",
    title: "here's how",
  },
  {
    id: "v5",
    poster: "/images/mobile.svg",
    src: "/videos/vid5.mp4",
    title: "Little Permission",
  },
  {
    id: "v6",
    poster: "/images/mobile.svg",
    src: "/videos/vid6.mp4",
    title: "Repeat",
  },
  {
    id: "v7",
    poster: "/images/mobile.svg",
    src: "/videos/vid7.mp4",
    title: "here's how",
  },
  {
    id: "v8",
    poster: "/images/mobile.svg",
    src: "/videos/vid8.mp4",
    title: "Repeat",
  },
  {
    id: "v9",
    poster: "/images/mobile.svg",
    src: "/videos/vid9.mp4",
    title: "Little Permission",
  },
  {
    id: "v10",
    poster: "/images/mobile.svg",
    src: "/videos/vid10.mp4",
    title: "here's how",
  },
  {
    id: "v11",
    poster: "/images/mobile.svg",
    src: "/videos/vid11.mp4",
    title: "Repeat",
  },
  {
    id: "v12",
    poster: "/images/mobile.svg",
    src: "/videos/vid12.mp4",
    title: "here's how",
  },
];

export default function TestimonialGrid({
  items = DEFAULT_ITEMS,
  rowHeightClass = "h-[clamp(160px,28vw,300px)]",
}: Props) {
  const twelve = useMemo(() => {
    const out: Item[] = [];
    for (let i = 0; i < 12; i++) out.push(items[i % items.length]);
    return out;
  }, [items]);

  const rows: Item[][] = [
    twelve.slice(0, 4),
    twelve.slice(4, 8),
    twelve.slice(8, 12),
  ];

  const [featured, setFeatured] = useState<number[]>([1, 2, 0]);

  // typed refs for dynamic keys
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  const play = (id: string) => {
    const v = videoRefs.current[id];
    if (v) v.play().catch(() => {});
  };
  const pause = (id: string) => {
    const v = videoRefs.current[id];
    if (v) {
      v.pause();
      v.currentTime = 0;
    }
  };

  return (
    <section className="w-full">
      {rows.map((row, rIdx) => (
        <div
          key={`row-${rIdx}`}
          className={`flex w-full ${rowHeightClass}`}
          style={{ margin: 0, padding: 0 }}
        >
          {row.map((item, cIdx) => {
            const isFeatured = featured[rIdx] === cIdx;
            const id = `${rIdx}-${cIdx}-${item.id}`;
            const width = WIDTHS[rIdx][cIdx];

            return (
              <div
                key={id}
                style={{ width, transformOrigin: "center" }}
                className={[
                  "group relative overflow-hidden",
                  "transition-transform duration-300 ease-out",
                  "will-change-transform [transform:translateZ(0)]",
                  "hover:z-20 hover:scale-[1.04] hover:shadow-xl",
                  "sm:hover:scale-[1.06]",
                ].join(" ")}
                onMouseEnter={() => play(id)}
                onMouseLeave={() => {
                  if (!isFeatured) pause(id);
                }}
                onClick={() => {
                  setFeatured((f) => {
                    const next = [...f];
                    next[rIdx] = cIdx;
                    return next;
                  });
                  play(id);
                }}
              >
                {item.src ? (
                  <video
                    ref={(el) => {
                      videoRefs.current[id] = el;
                    }}
                    className={[
                      "absolute inset-0 h-full w-full object-cover transition duration-300",
                      isFeatured ? "scale-100" : "blur-[6px]",
                      "[backface-visibility:hidden]",
                    ].join(" ")}
                    src={item.src}
                    poster={item.poster}
                    preload="metadata"
                    muted
                    loop
                    playsInline
                  />
                ) : (
                  <Image
                    src={item.poster}
                    alt={item.title || ""}
                    fill
                    sizes="25vw"
                    className={[
                      "absolute inset-0 object-cover transition duration-300",
                      isFeatured ? "scale-100" : "blur-[6px]",
                      "[backface-visibility:hidden]",
                    ].join(" ")}
                  />
                )}

                {/* subtle gradient; fade a bit on hover to “lift” the card */}
                <div
                  className={[
                    "pointer-events-none absolute inset-0",
                    "bg-gradient-to-b from-black/15 via-transparent to-black/15",
                    "transition-opacity duration-300",
                    "group-hover:opacity-80",
                  ].join(" ")}
                />

                {item.title && (
                  <span
                    className={[
                      "absolute left-3 top-3 text-white text-sm font-semibold tracking-wide",
                      "transition-opacity duration-300",
                      isFeatured
                        ? "opacity-100"
                        : "opacity-70 group-hover:opacity-100",
                      "drop-shadow",
                    ].join(" ")}
                  >
                    {item.title}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </section>
  );
}
