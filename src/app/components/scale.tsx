"use client";

import { useMemo } from "react";

type Props = { calendlyUrl?: string };

export default function ReadyToScaleLikeScreenshot({
  calendlyUrl = "https://calendly.com/your-org/30min",
}: Props) {
  const domain =
    typeof window !== "undefined" ? window.location.hostname : "localhost";
  const embedSrc = useMemo(
    () => `${calendlyUrl}?embed_type=Inline&embed_domain=${domain}`,
    [calendlyUrl, domain]
  );

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Left copy */}
          <div className="text-left">
            <h2 className="text-4xl font-bold leading-tight text-[#0B0F14] md:text-5xl">
              Ready To <br className="hidden sm:block" />
              <span className="text-black">Scale?</span> Let’s Talk!
            </h2>
            <p className="mt-4 max-w-md text-[16px] leading-7 text-neutral-600">
              Book a FREE Call With Our Team Below to Get Started!
            </p>

            <a
              href={calendlyUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#38BDF8] px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60"
            >
              Get Started ↗
            </a>
          </div>

          {/* Right: Calendly card with improved corner ribbon */}
          <div className="justify-self-center w-full max-w-sm md:max-w-md">
            <div className="relative overflow-hidden rounded-2xl bg-white p-3 shadow-[0_18px_45px_-12px_rgba(0,0,0,0.25)] ring-1 ring-black/5">
              {/* Corner ribbon (clipped to rounded corner) */}
              <div
                aria-hidden
                className="
                  pointer-events-none absolute right-0 top-0 h-[110px] w-[110px]
                  [mask-image:linear-gradient(to_bottom,black,transparent)]
                "
              >
                {/* diagonal band */}
                <div
                  className="
                    absolute right-[-54px] top-[18px] rotate-45
                    w-[180px] text-center text-[10px] font-semibold tracking-wide text-white
                    py-1.5 shadow-md ring-1 ring-white/30
                    bg-gradient-to-r from-sky-500 to-indigo-600
                  "
                >
                  <span className="hidden sm:inline">Powered by Calendly</span>
                  <span className="sm:hidden">Calendly</span>
                </div>
              </div>

              {/* Embed */}
              <iframe
                title="Schedule with us"
                src={embedSrc}
                className="h-[630px] w-full rounded-xl border border-neutral-200"
                scrolling="no"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
