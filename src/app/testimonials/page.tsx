// app/testimonials/page.tsx
import TestimonialsReelGrid from "../components/TestimonialsReelGrid";

export default function Testimonials() {
  return (
    <main className="min-h-screen w-full bg-white">
      {/* NAV + HERO WRAPPER (shared gradient background + curved bottom) */}
      <section
        className="relative overflow-hidden text-white"
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
            className="mx-auto max-w-4xl font-extrabold leading-tight tracking-tight bg-clip-text text-transparent"
            style={{
              fontSize: "clamp(26px,5vw,64px)",
              backgroundImage:
                "linear-gradient(180deg, #E6E3DC 0%, #C9C5BC 45%, #9E9A91 80%)",
            }}
          >
            Our Testimonials From Our
            <br className="hidden sm:block" /> Beloved Clients
          </h1>

          <p
            className="mx-auto mt-[clamp(12px,2vw,20px)] max-w-3xl text-white/85"
            style={{ fontSize: "clamp(13px,1.8vw,17px)" }}
          >
            We don’t even hide them in Instagram, You can even reach them out —
            <br className="hidden sm:block" />
            No one does this in this space
          </p>
        </div>
        <div
          className="absolute inset-x-0 bottom-0 pointer-events-none "
          style={
            {
              "--curve-height": "120px", // total height of the SVG container
              "--curve-fill": "#FFFFFF", // the color of the curve
            } as React.CSSProperties
          }
        >
          {/* Spacer so your content doesn't overlap the curve */}
          <div
            className="w-full "
            style={{ height: "calc(var(--curve-height) * 0.35)" }}
          />
          {/* SVG wrapper */}
          <svg
            width="100%"
            height="var(--curve-height)"
            viewBox="0 0 1440 90"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M0,90 C320,10 1120,10 1440,90 L1440,160 L0,160 Z"
              fill="var(--curve-fill)"
            />
          </svg>
        </div>
        {/* === CURVED BOTTOM EDGE === */}
      </section>

      {/* NEXT SECTION (white) */}
      <TestimonialsReelGrid />
    </main>
  );
}
