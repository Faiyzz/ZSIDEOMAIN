// app/testimonials/page.tsx
"use client";

import TestimonialsReelGrid from "../components/TestimonialsReelGrid";

export default function Testimonials() {
  return (
    <main className="min-h-screen w-full bg-white">
      {/* NAV + HERO WRAPPER (shared gradient background + curved bottom) */}
      {/* HERO WRAPPER */}
      <section
        className="relative overflow-hidden text-white min-h-screen flex flex-col justify-center"
        style={{
          backgroundImage:
            "linear-gradient(135deg, #01161D 0%, #073542 55%, #0E6B7C 100%)",
        }}
      >
        {/* Subtle vignette */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(80% 60% at 20% 0%, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0) 60%), radial-gradient(80% 60% at 100% 20%, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0) 60%)",
          }}
        />

        {/* HERO */}
        <div className="relative z-10 mx-auto w-full max-w-screen-lg px-[clamp(16px,5vw,48px)] pt-[clamp(32px,8vw,80px)] pb-[clamp(48px,12vw,120px)] text-center">
          <h1
            className=" mx-auto max-w-4xl font-extrabold leading-tight tracking-tight text-transparent hero-title"
            style={{
              fontSize: "clamp(26px,5vw,64px)",
            }}
          >
            <span className="shine">
              Our Testimonials From Our
              <br className="hidden sm:block" /> Beloved Clients
            </span>
          </h1>

          <p
            className="mx-auto mt-[clamp(12px,2vw,20px)] max-w-3xl text-white/85 hero-sub"
            style={{ fontSize: "clamp(13px,1.8vw,17px)" }}
          >
            We don’t even hide them in Instagram, You can even reach them out —
            <br className="hidden sm:block" />
            No one does this in this space
          </p>
        </div>

        {/* Curved bottom */}
        <div
          className="absolute inset-x-0 bottom-0 pointer-events-none"
          style={
            {
              "--curve-height": "120px",
              "--curve-fill": "#FFFFFF",
            } as React.CSSProperties
          }
        >
          <div
            className="w-full"
            style={{ height: "calc(var(--curve-height) * 0.35)" }}
          />
          <svg
            width="100%"
            height="var(--curve-height)"
            viewBox="0 0 1440 90"
            preserveAspectRatio="none"
            aria-hidden="true"
            className="curve-rise"
          >
            <path
              d="M0,90 C320,10 1120,10 1440,90 L1440,160 L0,160 Z"
              fill="var(--curve-fill)"
            />
          </svg>
        </div>
      </section>

      {/* NEXT SECTION (white) */}
      <TestimonialsReelGrid />

      {/* Styles (scoped) */}
      <style jsx>{`
        /* Base metallic gradient for the text */
        .shine {
          background: linear-gradient(
                180deg,
                #e6e3dc 0%,
                #c9c5bc 45%,
                #9e9a91 80%
              )
              padding-box,
            /* moving highlight band for the SHINE sweep */
              linear-gradient(
                120deg,
                rgba(255, 255, 255, 0) 0%,
                rgba(255, 255, 255, 0) 42%,
                rgba(255, 255, 255, 0.95) 50%,
                rgba(255, 255, 255, 0) 58%,
                rgba(255, 255, 255, 0) 100%
              )
              padding-box;
          background-size: 100% 100%, 220% 100%;
          background-position: 0 0, -120% 0;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          /* subtle glow on the text edges */
          filter: drop-shadow(0 2px 6px rgba(255, 255, 255, 0.06));
          animation: shimmer 2.8s cubic-bezier(0.25, 0.8, 0.25, 1) infinite;
        }

        /* Pause shine on hover for a premium feel */
        .shine:hover {
          animation-play-state: paused;
        }

        @keyframes shimmer {
          0% {
            background-position: 0 0, -140% 0;
          }
          100% {
            background-position: 0 0, 240% 0;
          }
        }

        /* Entrance animation for hero text and subtext */
        .hero-title {
          opacity: 0;
          transform: translateY(10px) scale(0.99);
          animation: rise-in 700ms ease-out forwards;
        }
        .hero-sub {
          opacity: 0;
          transform: translateY(8px);
          animation: rise-in 700ms ease-out 120ms forwards;
        }
        @keyframes rise-in {
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* Gentle rise of the curve for a polished transition */
        .curve-rise {
          opacity: 0;
          transform: translateY(12px);
          animation: curveIn 600ms ease-out 180ms forwards;
        }
        @keyframes curveIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Respect reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .shine,
          .hero-title,
          .hero-sub,
          .curve-rise {
            animation: none !important;
          }
        }
      `}</style>
    </main>
  );
}
