// components/HeroSection.tsx
"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { CSSProperties } from "react";

/* ---------------- Types for per-chip control ---------------- */
type ChipPresets = "top-center" | "bottom-left" | "bottom-right" | "none";
type ImageFit = "cover" | "contain";

type ChipProps = {
  label: string;
  preset?: ChipPresets;
  style?: CSSProperties;
  rotateDeg?: number;
  width?: number; // px
  height?: number; // px
  sizeClass?: string;
  className?: string;
  labelClassName?: string;
};

export default function HeroSection() {
  return (
    <main
      /* Important: allow horizontal overflow to be visible on mobile so the cards don’t get clipped */
      className="pt-15 relative min-h-screen overflow-y-clip overflow-x-visible"
      style={{
        backgroundColor: "#00151C",
        backgroundImage: `
          radial-gradient(50% 60% at 90% 10%, #0C3B49 0%, rgba(12,59,73,0) 70%),
          radial-gradient(60% 70% at 90% 90%, #0C3B49 0%, rgba(12,59,73,0) 70%),
          radial-gradient(65% 75% at 10% 90%, #0C3B49 0%, rgba(12,59,73,0) 70%)
        `,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      {/* Content on top of bg */}
      <section className="relative z-20 mx-auto max-w-screen-2xl px-4 sm:px-6 md:px-10 lg:px-16 pt-14 pb-20 lg:py-24">
        <div className="pb-20 grid items-center gap-12 lg:grid-cols-2">
          {/* Left: Heading + CTA */}
          <div className="space-y-8 text-center lg:text-left">
            <h1
              className="text-balance text-3xl leading-tight sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight"
              style={{
                background:
                  "radial-gradient(120% 120% at 10% 20%, #AAB1B2 0%, #8A9193 35%, #666D6F 65%, #4A5052 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              ZSIDEO Builds The Future
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              With <span className="font-semibold">
                Code, Cameras
              </span> &amp; <span className="font-semibold">Creativity</span>
            </h1>

            <div className="flex justify-center lg:justify-start">
              <a
                href="#get-started"
                className="group inline-flex items-center gap-3 rounded-full border border-white/25 px-5 py-3 text-sm font-medium text-white/90 transition hover:border-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-300/30"
              >
                <span>Get Started</span>
                <ArrowRight
                  className="-rotate-12 transition-transform group-hover:translate-x-0.5 group-hover:-rotate-6"
                  size={18}
                />
              </a>
            </div>
          </div>

          {/* Right: Card trio */}
          <div className="relative">
            {/* row wrapper: allow the trio to fit mobile widths by scaling a bit on very small screens */}
            <div
              className="flex flex-row items-end justify-center gap-2.5 sm:gap-4 md:gap-6
                            max-[380px]:scale-[0.86] max-[420px]:scale-[0.92] sm:scale-100
                            origin-center"
            >
              {/* Left card */}
              <CardWithChip
                src="/images/Mobile.svg"
                alt="Welcome frame"
                imageFit="cover"
                className="translate-y-0.5 md:translate-y-2"
                chipProps={{
                  label: "Short/Long Form Videos",
                  preset: "bottom-left",
                  style: { bottom: -10, left: -24 },
                  rotateDeg: 14,
                  // smaller on xs so all 3 fit; bumps up on sm and md like your original
                  sizeClass:
                    "w-[96px] h-8 sm:w-[164px] sm:h-9 md:w-[184px] md:h-8",
                  labelClassName:
                    "px-2 py-0.5 text-[7px] sm:px-3 sm:py-0 sm:text-xs",
                  className:
                    "border-white/30 bg-white/14 rounded-xl sm:rounded-xl",
                }}
                highlight={false}
              />

              {/* Center card */}
              <CardWithChip
                src="/images/Mobile.svg"
                alt="Cinematographer"
                className="scale-[1.02] sm:scale-[1.06] md:scale-[1.12]"
                highlight
                chipProps={{
                  label: "High Quality",
                  preset: "top-center",
                  style: {
                    top: -25,
                    left: "50%",
                    transform: "translateX(-30%)",
                  },
                  rotateDeg: 10,
                  sizeClass:
                    "w-[92px] h-7 sm:w-[100px] sm:h-8 md:w-[120x] md:h-10",
                  labelClassName: "px-2 py-0 text-[10px] sm:text-[10px]",
                  className:
                    "border-white/35 bg-white/16 rounded-lg sm:rounded-xl",
                }}
              />

              {/* Right card */}
              <CardWithChip
                src="/images/Mobile.svg"
                alt="Welcome frame 2"
                className="translate-y-0.5 md:translate-y-2"
                chipProps={{
                  label: "Fast Turnaround Time",
                  preset: "bottom-right",
                  style: { bottom: -8, right: -50 },
                  rotateDeg: -15,
                  sizeClass:
                    "w-[102px] h-8 sm:w-[188px] sm:h-10 md:w-[196px] md:h-8",
                  labelClassName: "px-3 py-0 text-[9px] sm:text-xs",
                  className:
                    "border-white/30 bg-white/14 rounded-xl sm:rounded-xl",
                }}
              />
            </div>
          </div>
        </div>
      </section>

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
    </main>
  );
}

type CardWithChipProps = {
  src: string;
  alt: string;
  className?: string;
  highlight?: boolean;
  imageFit?: ImageFit;
  chipProps: ChipProps;
};

function CardWithChip({
  src,
  alt,
  className = "",
  highlight = false,
  imageFit = "cover",
  chipProps,
}: CardWithChipProps) {
  // ✅ Smaller default card size on xs so all three fit side-by-side.
  // Sizes scale up at sm/md to match your desktop look.
  const base =
    "relative h-[176px] w-[96px] sm:h-[240px] sm:w-[138px] md:h-[320px] md:w-[190px] lg:h-[360px] lg:w-[210px]";
  const stroke =
    "rounded-[18px] sm:rounded-[24px] md:rounded-[28px] border-2 border-white/85 shadow-[0_20px_60px_-20px_rgba(0,0,0,.65)]";
  const bg = "bg-white/5 backdrop-blur";
  const imageClass =
    imageFit === "contain" ? "object-contain p-1.5 sm:p-2" : "object-cover";

  const presetPos: Record<ChipPresets, CSSProperties> = {
    "top-center": { top: -12, left: "50%", transform: "translateX(-50%)" },
    "bottom-left": { bottom: -12, left: -24 },
    "bottom-right": { bottom: -12, right: -8 },
    none: {},
  };

  const {
    label,
    preset = "top-center",
    style,
    rotateDeg = 0,
    width,
    height,
    sizeClass,
    className: chipExtraClasses = "",
    labelClassName = "px-3 text-[11px] sm:text-xs",
  } = chipProps;

  const finalPos: CSSProperties = {
    ...(presetPos[preset] || {}),
    ...(style || {}),
  };

  return (
    <div className={`relative ${base} ${className}`}>
      <div
        className={`${stroke} ${bg} absolute inset-0 overflow-hidden flex items-center justify-center`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={highlight}
          className={imageClass}
          sizes="(max-width: 480px) 96px, (max-width: 768px) 138px, 210px"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
      </div>

      {/* CHIP */}
      <div
        className={[
          "absolute flex items-center justify-center whitespace-nowrap text-ellipsis overflow-hidden",
          "border backdrop-blur-md text-white/90 shadow-[0_10px_30px_-10px_rgba(0,0,0,.7)]",
          "border-white/30 bg-white/14 rounded-xl",
          sizeClass ?? "",
          chipExtraClasses,
        ].join(" ")}
        style={{
          ...(sizeClass ? {} : { width, height }),
          ...finalPos,
          transform: `${
            finalPos.transform ?? ""
          } rotate(${rotateDeg}deg)`.trim(),
        }}
      >
        <span className={labelClassName}>{label}</span>
      </div>
    </div>
  );
}
