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
  { id: "v1", poster: "/images/s2.svg", src: "https://vimeo.com/1089303592" },
  {
    id: "v2",
    poster: "/images/Mobile.svg",
    src: "https://vimeo.com/1089303851",
  },
  {
    id: "v3",
    poster: "/images/Mobile.svg",
    src: "https://vimeo.com/1089303825",
  },
  {
    id: "v4",
    poster: "/images/Mobile.svg",
    src: "https://vimeo.com/1089303892",
  },
  {
    id: "v5",
    poster: "/images/Mobile.svg",
    src: "https://vimeo.com/1089414395",
  },
  {
    id: "v6",
    poster: "/images/Mobile.svg",
    src: "https://vimeo.com/1089414472",
  },
  {
    id: "v7",
    poster: "/images/Mobile.svg",
    src: "https://vimeo.com/1105053497",
  },
  {
    id: "v8",
    poster: "/images/Mobile.svg",
    src: "https://vimeo.com/1089414409",
  },
  {
    id: "v9",
    poster: "/images/Mobile.svg",
    src: "https://vimeo.com/1089414416",
  },
];

/* Helpers */
const isVideoFile = (src?: string) =>
  !!src && /\.(mp4|webm|mov|m4v)$/i.test(src);
const isVimeo = (src?: string) => !!src && /vimeo\.com\/\d+/.test(src);
const vimeoId = (url: string) => url.match(/vimeo\.com\/(\d+)/)?.[1] ?? null;
const vimeoEmbedURL = (url: string) => {
  const id = vimeoId(url);
  if (!id) return "";
  const params = new URLSearchParams({
    autoplay: "0", // we'll control via postMessage
    loop: "1",
    muted: "1", // start muted (hover preview)
    controls: "0",
    title: "0",
    byline: "0",
    portrait: "0",
    dnt: "1",
    playsinline: "1",
    pip: "1",
  });
  return `https://player.vimeo.com/video/${id}?${params.toString()}`;
};

/* postMessage to Vimeo player */
const vimeoCommand = (
  iframe: HTMLIFrameElement | null,
  method: string,
  value?: unknown
) => {
  if (!iframe?.contentWindow) return;
  const msg = JSON.stringify(
    value !== undefined ? { method, value } : { method }
  );
  iframe.contentWindow.postMessage(msg, "https://player.vimeo.com");
};

export default function TestimonialsReelGrid({
  items = DEFAULT_ITEMS,
  maxWidth = "max-w-6xl",
}: Props) {
  const defaultCenter = useMemo(
    () => Math.floor(items.length / 2),
    [items.length]
  );

  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null); // sound-on tile
  const active = hovered ?? selected ?? defaultCenter;

  /* Local <video> refs */
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  // Ensure refs array length matches items length
  useEffect(() => {
    if (videoRefs.current.length !== items.length) {
      videoRefs.current = Array(items.length).fill(null);
    }
  }, [items.length]);
  const setVideoRef = useCallback(
    (i: number) => (el: HTMLVideoElement | null) => {
      videoRefs.current[i] = el;
    },
    [items.length]
  );

  /* Vimeo iframe refs */
  const vimeoRefs = useRef<Array<HTMLIFrameElement | null>>([]);
  useEffect(() => {
    if (vimeoRefs.current.length !== items.length) {
      vimeoRefs.current = Array(items.length).fill(null);
    }
  }, [items.length]);
  const setVimeoRef = useCallback(
    (i: number) => (el: HTMLIFrameElement | null) => {
      vimeoRefs.current[i] = el;
    },
    [items.length]
  );

  /* Hover preview (muted), click = sound on (browser requires a click for audio) */
  useEffect(() => {
    items.forEach((item, i) => {
      const isFile = isVideoFile(item.src);
      const isVm = isVimeo(item.src);

      const isHovering = hovered === i;
      const isSelected = selected === i;

      if (isFile) {
        const vid = videoRefs.current[i];
        if (!vid) return;

        if (isHovering || isSelected) {
          vid.muted = !isSelected; // hover muted, click unmuted
          // small seek helps avoid black frame on some Androids
          if (vid.currentTime === 0) {
            try {
              vid.currentTime = 0.001;
            } catch {}
          }
          const p = vid.play();
          if (p && typeof p.catch === "function") p.catch(() => {});
        } else {
          vid.pause();
          vid.muted = true;
          // optional rewind
          // try { vid.currentTime = 0; } catch {}
        }
      } else if (isVm) {
        const frame = vimeoRefs.current[i];
        if (!frame) return;

        if (isHovering || isSelected) {
          // play first, then set volume (muted for hover, unmuted for selected)
          vimeoCommand(frame, "play");
          vimeoCommand(frame, "setVolume", isSelected ? 0 : 1);
        } else {
          vimeoCommand(frame, "pause");
          // Optionally seek to 0:
          // vimeoCommand(frame, "setCurrentTime", 0);
          vimeoCommand(frame, "setVolume", 1);
        }
      }
    });
  }, [hovered, selected, items]);

  const offsetClass = (i: number) => {
    const col = i % 3;
    return col === 1
      ? "translate-y-4 sm:translate-y-6"
      : "-translate-y-3 sm:-translate-y-4";
  };

  const handleClick = (i: number) => {
    setSelected((prev) => (prev === i ? null : i));
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
            const file = isVideoFile(item.src);
            const vm = isVimeo(item.src);
            const activeTile = i === active;
            const isWithSound = selected === i;

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
                  onClick={() => handleClick(i)}
                  aria-pressed={isWithSound}
                >
                  {/* Media */}
                  <div className="absolute inset-0">
                    {file ? (
                      <video
                        ref={setVideoRef(i)}
                        className={[
                          "h-full w-full object-cover transition-all duration-200",
                          activeTile
                            ? "blur-0 brightness-100 saturate-100 scale-100"
                            : "blur-[2px] brightness-[.65] saturate-[.85] scale-[1.03]",
                        ].join(" ")}
                        src={item.src}
                        poster={item.poster}
                        muted
                        playsInline
                        loop
                        preload="auto"
                      />
                    ) : vm ? (
                      <iframe
                        ref={setVimeoRef(i)}
                        src={vimeoEmbedURL(item.src!)}
                        className="h-full w-full"
                        style={{ display: "block" }}
                        title={`Vimeo ${vimeoId(item.src!) ?? ""}`}
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
                          "object-cover transition-all duration-200",
                          activeTile
                            ? "blur-0 brightness-100 saturate-100 scale-100"
                            : "blur-[2px] brightness-[.65] saturate-[.85] scale-[1.03]",
                        ].join(" ")}
                        priority={i === defaultCenter}
                      />
                    )}
                  </div>

                  {/* Tint overlay — removed on hover/active */}
                  <div
                    className={[
                      "pointer-events-none absolute inset-0 transition-opacity duration-150",
                      activeTile ? "opacity-0" : "opacity-70",
                      "bg-[rgba(6,48,60,0.55)]",
                    ].join(" ")}
                  />

                  {/* Focus ring */}
                  <div
                    className={[
                      "pointer-events-none absolute inset-0 rounded-2xl",
                      "ring-2 ring-cyan-300/40 transition-opacity duration-150",
                      activeTile ? "opacity-100" : "opacity-0",
                    ].join(" ")}
                  />

                  {/* Hint badge (optional) */}
                  {/* <div className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-[10px] text-white">
                    Hover to preview • Click for sound
                  </div> */}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
