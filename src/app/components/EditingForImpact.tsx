// ./src/app/components/EditingForImpact.tsx
"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

type CSSVars = React.CSSProperties & Record<string, string | number>;

export type MediaCard = {
  id: string;
  title: string;
  poster: string;
  src?: string; // supports vimeo.com/<id> or local .mp4
};

const MEDIA: MediaCard[] = [
  {
    id: "m1",
    title: "",
    poster: "/images/image 107.svg",
    src: "https://vimeo.com/1089303592",
  },
  {
    id: "m2",
    title: "",
    poster: "/images/image 107.svg",
    src: "https://vimeo.com/1089303851",
  },
  {
    id: "m3",
    title: "",
    poster: "/images/s2.svg",
    src: "https://vimeo.com/1089303825",
  },
  {
    id: "m4",
    title: "",
    poster: "/images/s3.png",
    src: "https://vimeo.com/1089303892",
  },
  {
    id: "m5",
    title: "",
    poster: "/images/Mobile.svg",
    src: "https://vimeo.com/1089414395",
  },
  {
    id: "m6",
    title: "",
    poster: "/images/s1.svg",
    src: "https://vimeo.com/1089414472",
  },
  {
    id: "m7",
    title: "",
    poster: "/images/s1.svg",
    src: "https://vimeo.com/1089414472",
  },
  {
    id: "m8",
    title: "",
    poster: "/images/s1.svg",
    src: "https://vimeo.com/1089414472",
  },
];

/* ---------- helpers ---------- */
const isVideoFile = (src?: string) =>
  !!src && /\.(mp4|webm|mov|m4v)$/i.test(src);
const isVimeo = (src?: string) => !!src && /vimeo\.com\/\d+/.test(src);
const vimeoId = (url: string) => url.match(/vimeo\.com\/(\d+)/)?.[1] ?? null;

const vimeoEmbedURL = (url: string, playerId: string) => {
  const id = vimeoId(url);
  if (!id) return "";
  const params = new URLSearchParams({
    autoplay: "0",
    muted: "0",
    loop: "1",
    controls: "0",
    title: "0",
    byline: "0",
    portrait: "0",
    dnt: "1",
    playsinline: "1",
    pip: "1",
    api: "1",
    player_id: playerId,
  });
  return `https://player.vimeo.com/video/${id}?${params.toString()}`;
};

/** postMessage control for Vimeo */
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

/** Type for Vimeo postMessage payloads */
type VimeoEventPayload = {
  event?: string;
  player_id?: string;
  // other fields can exist, we only care about these
};

function parseVimeoPayload(d: unknown): VimeoEventPayload | null {
  if (typeof d === "string") {
    try {
      const o = JSON.parse(d) as unknown;
      if (o && typeof o === "object") return o as VimeoEventPayload;
      return null;
    } catch {
      return null;
    }
  }
  if (d && typeof d === "object") {
    return d as VimeoEventPayload;
  }
  return null;
}

export default function EditingForImpact() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [page, setPage] = useState(0);
  const PAGE_COUNT = 3;

  // Refs for media elements
  const fileVideoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const vimeoRefs = useRef<Array<HTMLIFrameElement | null>>([]);

  // State
  const [playing, setPlaying] = useState<boolean[]>(() =>
    Array(MEDIA.length).fill(false)
  ); // user-click persistent play
  const [hovering, setHovering] = useState<boolean[]>(() =>
    Array(MEDIA.length).fill(false)
  ); // hover preview

  // Vimeo readiness & queued actions
  const vimeoReady = useRef<boolean[]>(Array(MEDIA.length).fill(false));
  const vimeoWantPlay = useRef<boolean[]>(Array(MEDIA.length).fill(false)); // queued CLICK play
  const vimeoWantPlayHover = useRef<boolean[]>(Array(MEDIA.length).fill(false)); // queued HOVER play (muted)

  useEffect(() => {
    fileVideoRefs.current = Array(MEDIA.length).fill(null);
    vimeoRefs.current = Array(MEDIA.length).fill(null);
  }, []);

  // ✅ Ref callbacks must return void
  const setFileVideoRef = useCallback(
    (i: number) =>
      (el: HTMLVideoElement | null): void => {
        fileVideoRefs.current[i] = el;
      },
    []
  );
  const setVimeoRef = useCallback(
    (i: number) =>
      (el: HTMLIFrameElement | null): void => {
        vimeoRefs.current[i] = el;
      },
    []
  );

  // Listen for Vimeo "ready" events and map to correct player (by player_id or source window)
  useEffect(() => {
    const idMap = new Map<string, number>(); // player_id -> index
    MEDIA.forEach((_, i) => idMap.set(`player-${i}`, i));

    const onMessage = (event: MessageEvent) => {
      if (event.origin !== "https://player.vimeo.com") return;

      const payload = parseVimeoPayload(event.data);
      if (!payload || !payload.event) return;

      // Resolve index
      let idx: number | undefined;
      const pid = String(payload.player_id ?? "");
      if (pid && idMap.has(pid)) {
        idx = idMap.get(pid)!;
      } else {
        // fallback: match by event.source window
        idx = vimeoRefs.current.findIndex(
          (ifr) => ifr?.contentWindow === event.source
        );
        if (idx < 0) return;
      }

      if (payload.event === "ready") {
        vimeoReady.current[idx] = true;

        // Prefer queued CLICK play (sound on)
        if (vimeoWantPlay.current[idx]) {
          const iframe = vimeoRefs.current[idx];
          vimeoCommand(iframe, "play");
          vimeoCommand(iframe, "setVolume", 1);
          vimeoWantPlay.current[idx] = false;
          return;
        }

        // Else queued HOVER play (muted)
        if (vimeoWantPlayHover.current[idx]) {
          const iframe = vimeoRefs.current[idx];
          vimeoCommand(iframe, "setVolume", 0);
          vimeoCommand(iframe, "play");
          // keep hover flag true until mouse leaves
        }
      }
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  // CLICK: toggle persistent play/unmute
  const handleClick = (i: number, m: MediaCard) => {
    const next = [...playing];
    const willPlay = !next[i];

    if (isVideoFile(m.src)) {
      const vid = fileVideoRefs.current[i];
      if (vid) {
        if (willPlay) {
          try {
            vid.muted = false;
            try {
              vid.currentTime = 0;
            } catch {}
            vid.play().catch(() => {
              vid.muted = true;
              vid.play().catch(() => {});
            });
          } catch {}
        } else {
          vid.pause();
          try {
            vid.currentTime = 0;
          } catch {}
          vid.muted = true;
        }
      }
    } else if (isVimeo(m.src)) {
      const iframe = vimeoRefs.current[i];
      if (!iframe) return;

      if (willPlay) {
        if (vimeoReady.current[i]) {
          vimeoCommand(iframe, "play");
          vimeoCommand(iframe, "setVolume", 1);
        } else {
          vimeoWantPlay.current[i] = true; // queue click intent
        }
      } else {
        if (vimeoReady.current[i]) {
          vimeoCommand(iframe, "pause");
          vimeoCommand(iframe, "setVolume", 0);
        } else {
          vimeoWantPlay.current[i] = false;
        }
      }
    }

    next[i] = willPlay;
    setPlaying(next);
  };

  // HOVER: muted preview start
  const handleHoverEnter = (i: number, m: MediaCard) => {
    setHovering((prev) => {
      const next = [...prev];
      next[i] = true;
      return next;
    });

    // If user already clicked to play (unmuted), keep as is
    if (playing[i]) return;

    if (isVideoFile(m.src)) {
      const vid = fileVideoRefs.current[i];
      if (vid) {
        vid.muted = true;
        try {
          vid.currentTime = 0;
        } catch {}
        vid.play().catch(() => {});
      }
    } else if (isVimeo(m.src)) {
      const iframe = vimeoRefs.current[i];
      if (!iframe) return;
      if (vimeoReady.current[i]) {
        vimeoCommand(iframe, "setVolume", 0);
        vimeoCommand(iframe, "play");
      } else {
        vimeoWantPlayHover.current[i] = true; // queue muted preview
      }
    }
  };

  // HOVER leave: stop preview unless user clicked to persist play
  const handleHoverLeave = (i: number, m: MediaCard) => {
    setHovering((prev) => {
      const next = [...prev];
      next[i] = false;
      return next;
    });

    if (playing[i]) return; // keep playing if user clicked

    if (isVideoFile(m.src)) {
      const vid = fileVideoRefs.current[i];
      if (vid) {
        vid.pause();
        try {
          vid.currentTime = 0;
        } catch {}
      }
    } else if (isVimeo(m.src)) {
      const iframe = vimeoRefs.current[i];
      if (!iframe) return;
      if (vimeoReady.current[i]) {
        vimeoCommand(iframe, "pause");
        vimeoCommand(iframe, "setVolume", 0);
      } else {
        vimeoWantPlayHover.current[i] = false; // cancel queued hover
      }
    }
  };

  // pagination logic
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let raf = 0;
    const compute = () => {
      const maxScroll = Math.max(0, el.scrollWidth - el.clientWidth);
      if (maxScroll === 0) setPage(0);
      else {
        const ratio = el.scrollLeft / maxScroll;
        setPage(Math.round(ratio * (PAGE_COUNT - 1)));
      }
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(compute);
    };
    compute();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const goToPage = (p: number) => {
    const el = trackRef.current;
    if (!el) return;
    const maxScroll = Math.max(0, el.scrollWidth - el.clientWidth);
    const left = (p / (PAGE_COUNT - 1)) * maxScroll;
    el.scrollTo({ left, behavior: "smooth" });
  };

  return (
    <section
      className="relative isolate overflow-visible"
      aria-labelledby="editing-impact-heading"
      style={
        {
          backgroundColor: "#000000ff",
          backgroundImage: [
            "radial-gradient(40% 40% at 0% 0%, rgba(9, 48, 58, 0.7) 0%, rgba(0,21,28,0) 70%)",
            "radial-gradient(40% 40% at 100% 0%, rgba(9, 48, 58, 0.7) 0%, rgba(0,21,28,0) 70%)",
            "radial-gradient(40% 40% at 0% 100%, rgba(9, 48, 58, 0.7) 0%, rgba(0,21,28,0) 70%)",
            "radial-gradient(40% 40% at 100% 100%, rgba(9, 48, 58, 0.7) 0%, rgba(0,21,28,0) 70%)",
          ].join(", "),
          "--curve-top-height": "clamp(44px, 12vw, 110px)",
          "--curve-bottom-height": "clamp(48px, 12vw, 120px)",
          "--curve-top-fill": "#FFFFFF",
          "--curve-bottom-fill": "#FFFFFF",
        } as CSSVars
      }
    >
      {/* Preconnect to speed up Vimeo */}
      <Head>
        <link rel="preconnect" href="https://player.vimeo.com" />
        <link rel="preconnect" href="https://i.vimeocdn.com" />
        <link rel="preconnect" href="https://f.vimeocdn.com" />
      </Head>

      {/* SECTION CURVE: TOP */}
      <div className="absolute inset-x-0 -top-px pointer-events-none select-none z-0">
        <svg
          className="svg-curve"
          width="100%"
          viewBox="0 0 1440 150"
          preserveAspectRatio="none"
          aria-hidden="true"
          style={{
            display: "block",
            height: "var(--curve-top-height)",
            transform: "translateZ(0)",
          }}
        >
          <path
            d="M0,40 C320,100 1120,100 1440,40 L1440,0 L0,0 Z"
            fill="var(--curve-top-fill)"
          />
        </svg>
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20 z-100">
        <header className="text-center max-w-3xl mx-auto mt-6 sm:mt-10">
          <h2
            id="editing-impact-heading"
            className="text-5xl sm:text-5xl shiny-text lg:5xl font-extrabold leading-tight tracking-tight mb-3 bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "radial-gradient(90% 120% at 50% 50%, #BDB8AC 0%, #8F8B82 35%, #6F6B62 70%, #4F4B44 100%)",
            }}
          >
            Editing <span className="font-black">For Impact</span>
          </h2>
          <p className="text-sm sm:text-base text-white/70">
            We craft edits that keep attention, communicate clearly, and move
            people to act.
          </p>
        </header>

        {/* SCROLLER */}
        <div
          className="relative mt-6 sm:mt-10 lg:mt-12 overflow-visible "
          style={
            {
              "--scroll-curve-top-height": "clamp(40px, 10vw, 90px)",
              "--scroll-curve-bottom-height": "clamp(44px, 11vw, 100px)",
              "--scroll-curve-top-fill": "#000000ff",
              "--scroll-curve-bottom-fill": "#000000ff",
              paddingTop: "calc(var(--scroll-curve-top-height) * 0.35)",
              paddingBottom: "calc(var(--scroll-curve-bottom-height) * 0.35)",
            } as CSSVars
          }
        >
          {/* TOP narrow curve */}
          <div className="absolute inset-x-0 -top-px pointer-events-none select-none z-40 mt-4 sm:mt-8">
            <svg
              className="svg-curve"
              width="100%"
              viewBox="0 0 1440 100"
              preserveAspectRatio="none"
              aria-hidden="true"
              style={{
                display: "block",
                height: "var(--scroll-curve-top-height)",
                transform: "translateZ(0)",
              }}
            >
              <path
                d="M0,0 C320,70 1120,70 1440,0 L1440,0 L0,0 Z"
                fill="var(--scroll-curve-top-fill)"
              />
            </svg>
          </div>

          {/* Glow */}
          <div
            aria-hidden
            className="absolute inset-x-3 sm:inset-x-6 lg:inset-x-10 top-1/2 -translate-y-1/2 h-24 sm:h-32 lg:h-36 rounded-full blur-2xl z-10"
            style={{
              background: "rgba(255,255,255,0.06)",
              filter: "blur(60px)",
              transform: "translateY(-50%) scaleY(0.65)",
            }}
          />

          {/* Track */}
          <div
            ref={trackRef}
            className="relative z-20 flex gap-3 sm:gap-4 overflow-x-auto overscroll-x-contain snap-x snap-mandatory px-2 py-2 no-scrollbar"
          >
            {MEDIA.map((m, i) => {
              const showFile = isVideoFile(m.src);
              const showVimeo = isVimeo(m.src);
              const isPlaying = playing[i];
              const isHovering = hovering[i];
              const isActive = isPlaying || isHovering; // hide poster overlay while active

              const playerId = `player-${i}`;

              return (
                <article
                  key={m.id}
                  className={[
                    "basis-[78%] xs:basis-[68%] sm:basis-[48%] md:basis-[36%] lg:basis-[25%]",
                    "shrink-0 grow-0 snap-center",
                    "rounded-xl border border-white/10 bg-[#0B171B] shadow-[0_8px_24px_rgba(0,0,0,0.35)]",
                    "hover:shadow-[0_12px_36px_rgba(0,0,0,0.45)] transition-shadow duration-300",
                    "group relative",
                  ].join(" ")}
                >
                  <div className="relative aspect-[9/16] w-full overflow-hidden rounded-xl">
                    {/* Media layer */}
                    {showFile ? (
                      <video
                        ref={setFileVideoRef(i)}
                        className="absolute inset-0 h-full w-full object-cover"
                        poster={m.poster}
                        muted
                        playsInline
                        loop
                        preload="metadata"
                        controls={false}
                      />
                    ) : showVimeo ? (
                      <iframe
                        ref={setVimeoRef(i)}
                        src={vimeoEmbedURL(m.src!, playerId)}
                        className="absolute inset-0 h-full w-full"
                        title={`Vimeo ${vimeoId(m.src!) ?? ""}`}
                        loading={i < 3 ? "eager" : "lazy"}
                        frameBorder={0}
                        allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <Image
                        src={m.poster}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 78vw, (max-width: 768px) 48vw, (max-width: 1024px) 36vw, 24vw"
                        className="object-cover"
                      />
                    )}

                    {/* Click/hover capture above iframe/video so events always work */}
                    <button
                      aria-label={isPlaying ? "Pause video" : "Play video"}
                      onClick={() => handleClick(i, m)}
                      onMouseEnter={() => handleHoverEnter(i, m)}
                      onMouseLeave={() => handleHoverLeave(i, m)}
                      className="absolute inset-0 z-30 cursor-pointer bg-transparent"
                    />

                    {/* Poster/Play overlay (hidden while hovering or playing) */}
                    <div
                      className={[
                        "absolute inset-0 flex items-center justify-center",
                        "transition-opacity duration-300",
                        isActive ? "opacity-0" : "opacity-100",
                        "pointer-events-none z-20",
                      ].join(" ")}
                    >
                      <Image
                        src={m.poster}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 78vw, (max-width: 768px) 48vw, (max-width: 1024px) 36vw, 24vw"
                        className="object-cover"
                      />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* BOTTOM narrow curve */}
          <div className="absolute inset-x-0 -bottom-px pointer-events-none select-none z-40 pb-6 sm:pb-10">
            <svg
              className="svg-curve"
              width="100%"
              viewBox="0 0 1440 100"
              preserveAspectRatio="none"
              aria-hidden="true"
              style={{
                display: "block",
                height: "var(--scroll-curve-bottom-height)",
                transform: "translateZ(0)",
              }}
            >
              <path
                d="M0,100 C320,10 1120,10 1440,100 L1440,160 L0,160 Z"
                fill="var(--scroll-curve-bottom-fill)"
              />
            </svg>
          </div>
        </div>

        {/* Pagination + CTA */}
        <div className="mt-5 sm:mt-8 lg:mt-10 flex flex-col items-center gap-4">
          <div
            className="flex items-center gap-2"
            role="tablist"
            aria-label="Carousel Pagination"
          >
            {Array.from({ length: PAGE_COUNT }).map((_, i) => {
              const active = i === page;
              return (
                <button
                  key={i}
                  onClick={() => goToPage(i)}
                  role="tab"
                  aria-selected={active}
                  aria-controls={`page-${i}`}
                  className={[
                    "h-2 rounded-full transition-all duration-300",
                    active ? "w-7 bg-white/90" : "w-2 bg-white/35",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50",
                  ].join(" ")}
                />
              );
            })}
          </div>

          <Link
            href="#work"
            className={[
              "relative inline-flex items-center justify-center rounded-full px-5 py-2",
              "font-semibold text-white text-sm sm:text-base",
              "border border-white/18 bg-white/10 backdrop-blur-[2px]",
              "shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06),0_2px_12px_rgba(0,0,0,0.35)]",
              "hover:bg-white/15 active:scale-[0.98] transition",
            ].join(" ")}
          >
            Explore Our Work
          </Link>
        </div>

        <div className="h-6 sm:h-8 lg:h-10" />
      </div>

      {/* SECTION CURVE: BOTTOM */}
      <div className="absolute inset-x-0 -bottom-px pointer-events-none select-none z-10">
        <svg
          className="svg-curve"
          width="100%"
          viewBox="0 0 1440 95"
          preserveAspectRatio="none"
          aria-hidden="true"
          style={{
            display: "block",
            height: "var(--curve-bottom-height)",
            transform: "translateZ(0)",
          }}
        >
          <path
            d="M0,90 C320,10 1120,10 1440,90 L1440,160 L0,160 Z"
            fill="var(--curve-bottom-fill)"
          />
        </svg>
      </div>

      {/* hide native scrollbar */}
      <style jsx global>{`
        .no-scrollbar {
          scrollbar-width: none;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        @media (min-width: 420px) {
          .xs\\:basis-\\[68\\%\\] {
            flex-basis: 68% !important;
          }
        }
        @supports (-webkit-touch-callout: none) {
          .svg-curve {
            will-change: transform;
          }
        }
      `}</style>
    </section>
  );
}
