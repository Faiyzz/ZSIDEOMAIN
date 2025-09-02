// components/TestimonialsReelGrid.tsx
"use client";

import Image from "next/image";
import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";

type Item = { id: string; poster: string; src?: string };
type Props = { items?: Item[]; maxWidth?: string };

const DEFAULT_ITEMS: Item[] = [
  {
    id: "v1",
    poster: "/images/Mobile.svg",
    src: "https://vimeo.com/1089303592",
  }, // poster only
  {
    id: "v2",
    poster: "/images/Mobile.svg",
    src: "https://vimeo.com/1089303851",
  }, // Vimeo
  { id: "v3", poster: "/images/Mobile.svg", src: "/videos/sample3.mp4" },
  { id: "v4", poster: "/images/Mobile.svg", src: "/videos/sample4.mp4" },
  { id: "v5", poster: "/images/Mobile.svg", src: "/videos/sample5.mp4" },
  { id: "v6", poster: "/images/Mobile.svg", src: "/videos/sample6.mp4" },
  { id: "v7", poster: "/images/Mobile.svg", src: "/videos/sample7.mp4" },
  { id: "v8", poster: "/images/Mobile.svg", src: "/videos/sample8.mp4" },
  { id: "v9", poster: "/images/Mobile.svg", src: "/videos/sample9.mp4" },
];

/** Detect direct video files (usable by <video>) */
const isVideoFile = (src?: string) =>
  !!src && /\.(mp4|webm|mov|m4v)$/i.test(src);

/** Detect vimeo links (need iframe) */
const isVimeo = (src?: string) => !!src && /vimeo\.com\/\d+/.test(src);

/** Build Vimeo embed URL; toggles autoplay based on active state */
const getVimeoEmbed = (url: string, autoplay: boolean) => {
  const idMatch = url.match(/vimeo\.com\/(\d+)/);
  const id = idMatch?.[1];
  if (!id) return url;
  const params = new URLSearchParams({
    autoplay: autoplay ? "1" : "0",
    loop: "1",
    muted: "1",
    background: "1", // hides controls, optimized for background/cover
    dnt: "1",
    playsinline: "1",
  });
  return `https://player.vimeo.com/video/${id}?${params.toString()}`;
};

export default function TestimonialsReelGrid({
  items = DEFAULT_ITEMS,
  maxWidth = "max-w-6xl",
}: Props) {
  const defaultCenter = useMemo(
    () => Math.floor(items.length / 2),
    [items.length]
  );

  const [selected, setSelected] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const active = hovered ?? selected ?? defaultCenter;

  // Keep refs for HTMLVideoElements only
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  useEffect(() => {
    videoRefs.current = Array(items.length).fill(null);
  }, [items.length]);

  const setVideoRef = useCallback(
    (i: number) => (el: HTMLVideoElement | null) => {
      videoRefs.current[i] = el;
    },
    []
  );

  // Play/pause local videos based on active tile
  useEffect(() => {
    videoRefs.current.forEach((vid, i) => {
      if (!vid) return;
      if (i === active) {
        const p = vid.play();
        if (p && typeof p.catch === "function") p.catch(() => {});
      } else {
        vid.pause();
      }
    });
  }, [active]);

  const offsetClass = (i: number) => {
    const col = i % 3;
    return col === 1
      ? "translate-y-4 sm:translate-y-6"
      : "-translate-y-3 sm:-translate-y-4";
  };

  return (
    <section
      className="relative overflow-hidden bg-white pt-0"
      aria-label="Client testimonial reels"
    >
      <div
        className={`relative mx-auto ${maxWidth} px-2 sm:px-4 lg:px-6 py-10 sm:py-14`}
      >
        <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          {items.map((item, i) => {
            const activeTile = i === active;
            const showVideoFile = isVideoFile(item.src);
            const showVimeo = isVimeo(item.src);
            return (
              <div key={item.id} className={offsetClass(i)}>
                <button
                  type="button"
                  className={[
                    "group relative aspect-[9/16] w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[340px]",
                    "overflow-hidden rounded-2xl shadow-[0_14px_40px_-10px_rgba(0,0,0,.35)]",
                    "ring-1 ring-white/10 bg-[#0A1215]",
                    "transition-transform duration-300 will-change-transform",
                    activeTile ? "scale-[1.04]" : "scale-100",
                  ].join(" ")}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered((h) => (h === i ? null : h))}
                  onClick={() => setSelected(i)}
                  aria-pressed={activeTile}
                >
                  {/* Media */}
                  <div className="absolute inset-0">
                    {showVideoFile ? (
                      <video
                        ref={setVideoRef(i)}
                        className={[
                          "h-full w-full object-cover transition-all duration-300",
                          activeTile
                            ? "blur-0 brightness-100 saturate-100 scale-100"
                            : "blur-[2px] brightness-[.65] saturate-[.85] scale-[1.03]",
                        ].join(" ")}
                        src={item.src}
                        poster={item.poster}
                        muted
                        playsInline
                        loop
                        preload="metadata"
                      />
                    ) : showVimeo ? (
                      <iframe
                        key={activeTile ? "vimeo-active" : "vimeo-idle"} // force param refresh on state change
                        src={getVimeoEmbed(item.src!, activeTile)}
                        className="h-full w-full"
                        style={{ display: "block" }}
                        title="Vimeo video"
                        loading="lazy"
                        frameBorder={0}
                        allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <Image
                        src={item.poster}
                        alt=""
                        fill
                        className={[
                          "object-cover transition-all duration-300",
                          activeTile
                            ? "blur-0 brightness-100 saturate-100 scale-100"
                            : "blur-[2px] brightness-[.65] saturate-[.85] scale-[1.03]",
                        ].join(" ")}
                        priority={i === defaultCenter}
                      />
                    )}
                  </div>

                  {/* Tint overlay */}
                  <div
                    className={[
                      "pointer-events-none absolute inset-0 transition-opacity duration-300",
                      activeTile ? "opacity-0" : "opacity-70",
                      "bg-[rgba(6,48,60,0.55)]",
                    ].join(" ")}
                  />

                  {/* Focus ring */}
                  <div
                    className={[
                      "pointer-events-none absolute inset-0 rounded-2xl",
                      "ring-2 ring-cyan-300/40 transition-opacity duration-300",
                      activeTile ? "opacity-100" : "opacity-0",
                    ].join(" ")}
                  />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
