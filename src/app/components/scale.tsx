
"use client";

import { useMemo } from "react";

type Props = { calendlyUrl?: string };


export default function ReadyToScaleLikeScreenshot({
  calendlyUrl = "https://calendly.com/d/cv9k-n8v-s84",
}: Props) {
  const domain =
    typeof window !== "undefined" ? window.location.hostname : "localhost";

  const embedSrc = useMemo(
    () => `${calendlyUrl}?embed_type=Inline&embed_domain=${domain}`,
    [calendlyUrl, domain]
  );
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24">
        <div className="grid items-center gap-10 sm:gap-12 lg:gap-16 grid-cols-1 md:grid-cols-2">
          {/* Left copy */}
          <div className="max-w-2xl md:max-w-none">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-black/10 bg-gradient-to-b from-white to-white/60 px-3 py-1 text-[11px] sm:text-[12px] font-medium text-neutral-700 shadow-sm">
              🚀 Limited slots this week
            </p>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight sm:leading-[1.15] text-[#0B0F14]">
              Ready To <span className="text-black">Scale?</span>
              <br className="hidden sm:block" />
              Let’s Talk!
            </h2>

            <p className="mt-4 text-[15px] sm:text-[16px] leading-7 text-neutral-600 max-w-prose">
              Book a FREE call with our team below. We’ll map your goals and
              give you a clear, actionable plan.
            </p>

            <div className="mt-6 sm:mt-7 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex justify-center items-center gap-2 rounded-full bg-[#38BDF8] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-200/50 transition hover:brightness-110 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60 w-full sm:w-auto"
              >
                Get Started 
              </a>
              <span className="text-sm text-neutral-500">
                No pressure—just a quick strategy chat.
              </span>
            </div>

            {/* Trust row / highlights */}
            <div className="mt-7 sm:mt-8 grid grid-cols-1 xs:grid-cols-2 sm:flex sm:flex-wrap gap-x-8 gap-y-3 text-sm text-neutral-500">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-500" />
                Avg. reply in &lt; 24 hours
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-sky-500" />
                Product, Web, &amp; Video Teams
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-violet-500" />
                AI &amp; Automation Ready
              </div>
            </div>
          </div>

          {/* Right: Responsive Calendly card */}
          <div className="w-full max-w-md md:max-w-lg justify-self-center md:justify-self-end">
            <div className="relative overflow-hidden rounded-2xl bg-white p-2.5 sm:p-3 shadow-[0_18px_45px_-12px_rgba(0,0,0,0.20)] ring-1 ring-black/5">
              {/* Corner ribbon (hidden on very small screens to avoid clipping) */}
              <div
                aria-hidden
                className="hidden xs:block pointer-events-none absolute right-0 top-0 h-[84px] w-[84px] sm:h-[96px] sm:w-[96px] [mask-image:linear-gradient(to_bottom,black,transparent)]"
              >
                <div
                  className="absolute right-[-46px] top-[12px] sm:right-[-50px] sm:top-[14px]
                             w-[150px] sm:w-[170px] rotate-45
                             bg-gradient-to-r from-sky-500 to-indigo-600
                             py-1.5 text-center text-[9px] sm:text-[10px] font-semibold tracking-wide text-white
                             shadow-md ring-1 ring-white/30"
                >
                  <span className="hidden sm:inline">Powered by Calendly</span>
                  <span className="sm:hidden">Calendly</span>
                </div>
              </div>

              {/* Embed – height scales by breakpoint; no horizontal overflow */}
              <iframe
                title="Schedule with us"
                src={embedSrc}
                loading="lazy"
                className="
                  block w-full rounded-xl border border-neutral-200
                  h-[460px] xs:h-[500px] sm:h-[520px] md:h-[560px] lg:h-[620px]
                "
                scrolling="no"
              />
            </div>

            {/* Secondary link */}
            <div className="mt-3 text-center">
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs sm:text-[13px] font-medium text-neutral-500 underline-offset-4 hover:underline"
              >
                Open in Calendly →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle background accents (light & responsive) */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-40 w-40 sm:h-56 sm:w-56 rounded-full bg-sky-100 blur-3xl" />
        <div className="absolute -bottom-16 -right-24 h-36 w-36 sm:h-52 sm:w-52 rounded-full bg-indigo-100 blur-3xl" />
      </div>
    </section>
  );
}
