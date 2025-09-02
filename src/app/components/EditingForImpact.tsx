"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type CSSVars = React.CSSProperties & Record<string, string | number>;

export type MediaCard = {
  id: string;
  title: string;
  poster: string;
  src?: string;
};

const MEDIA: MediaCard[] = [
  {
    id: "m1",
    title: "",
    poster: "/images/image .svg",
    src: "/images/video.mp4",
  },
  {
    id: "m2",
    title: "",
    poster: "",
    src: "/images/video.mp4",
  },
  { id: "m3", title: "", poster: "/images/s2.svg", src: "/images/Mobile.svg" },
  { id: "m4", title: "", poster: "/images/s3.png", src: "/images/Mobile.svg" },
  {
    id: "m5",
    title: "",
    poster: "/images/Mobile.svg",
    src: "/images/Mobile.svg",
  },
  { id: "m6", title: "", poster: "/images/s1.svg", src: "/images/Mobile.svg" },
];

export default function EditingForImpactSection() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [page, setPage] = useState(0);
  const PAGE_COUNT = 3;

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let raf = 0;

    const computeActive = () => {
      if (!el) return;
      const maxScroll = Math.max(0, el.scrollWidth - el.clientWidth);
      if (maxScroll === 0) setPage(0);
      else {
        const ratio = el.scrollLeft / maxScroll;
        const p = Math.round(ratio * (PAGE_COUNT - 1));
        setPage(p);
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(computeActive);
    };

    computeActive();
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

  const getCardTransform = () =>
    `transform-gpu will-change-transform transition-transform duration-500 `;

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

          /* ====== Responsive curve heights (edit these if needed) ====== */
          "--curve-top-height": "clamp(44px, 12vw, 110px)",
          "--curve-bottom-height": "clamp(48px, 12vw, 120px)",
          "--curve-top-fill": "#FFFFFF",
          "--curve-bottom-fill": "#FFFFFF",
        } as CSSVars
      }
    >
      {/* SECTION CURVE: TOP (bulges DOWN) */}
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
        {/* Heading & Subheading */}
        <header className="text-center max-w-3xl mx-auto mt-6 sm:mt-10">
          <h2
            id="editing-impact-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight mb-3 bg-clip-text text-transparent"
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

        {/* ===================== SCROLLER WITH NARROW CURVES OVERLAY ===================== */}
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
          {/* TOP curve (overlaid, NARROW width) */}
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

          {/* Soft elliptical glow behind cards */}
          <div
            aria-hidden
            className="absolute inset-x-3 sm:inset-x-6 lg:inset-x-10 top-1/2 -translate-y-1/2 h-24 sm:h-32 lg:h-36 rounded-full blur-2xl z-10"
            style={{
              background: "rgba(255,255,255,0.06)",
              filter: "blur(60px)",
              transform: "translateY(-50%) scaleY(0.65)",
            }}
          />

          {/* The horizontal track */}
          <div
            ref={trackRef}
            className="relative z-20 flex gap-3 sm:gap-4 overflow-x-auto overscroll-x-contain snap-x snap-mandatory px-2 py-2 no-scrollbar"
          >
            {MEDIA.map((m) => (
              <article
                key={m.id}
                data-card
                className={[
                  "basis-[78%] xs:basis-[68%] sm:basis-[48%] md:basis-[36%] lg:basis-[25%] ",
                  "shrink-0 grow-0 snap-center",
                  "rounded-xl border border-white/10 bg-[#0B171B] shadow-[0_8px_24px_rgba(0,0,0,0.35)]",
                  "hover:shadow-[0_12px_36px_rgba(0,0,0,0.45)] transition-shadow duration-300",
                  getCardTransform(),
                ].join(" ")}
              >
                <div className="relative aspect-[9/16] w-full overflow-hidden rounded-xl">
                  {m.src ? (
                    <video
                      className="absolute inset-0 h-full w-full object-cover"
                      poster={m.poster}
                      muted
                      playsInline
                      preload="metadata"
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
                </div>
              </article>
            ))}
          </div>

          {/* BOTTOM curve (overlaid, NARROW width) */}
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
        {/* =================== END SCROLLER WITH NARROW CURVES =================== */}

        {/* Pagination (EXACTLY 3 DOTS) + CTA */}
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
              "relative inline-flex items-center justify-center rounded-full px-5 py-2 ",
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

      {/* SECTION CURVE: BOTTOM (bulges UP) */}
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

      {/* hide native scrollbar visually for the horizontal track + iOS polish */}
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
        /* iOS-specific rendering hint for smoother edges */
        @supports (-webkit-touch-callout: none) {
          .svg-curve {
            will-change: transform;
          }
        }
      `}</style>
    </section>
  );
}
