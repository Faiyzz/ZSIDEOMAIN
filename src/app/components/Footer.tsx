// components/Footer.tsx
import Image from "next/image";
import Link from "next/link";
import React from "react";

type CSSVars = React.CSSProperties & Record<string, string | number>;

type FooterProps = {
  bgImage?: string;
  logoSrc?: string;
  logoWidth?: number;
  logoHeight?: number;
};

export default function Footer({
  bgImage = "/images/scroler.svg",
  logoSrc = "/images/logo 1.svg",
  logoWidth = 280,
  logoHeight = 88,
}: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative isolate overflow-hidden text-white min-h-[clamp(320px,42vh,560px)]"
      style={
        {
          "--footer-curve-height": "120px",
          "--footer-curve-fill": "#FFFFFF",
        } as CSSVars
      }
    >
      {/* BG image */}
      <div className="absolute inset-0 -z-20">
        <Image src={bgImage} alt="" fill priority className="object-cover" />
      </div>

      {/* Brand tint overlay */}
      <div className="absolute inset-0 -z-10 bg-[#00151C]/78" />

      {/* Four-corner radial vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: [
            "radial-gradient(40% 40% at 0% 0%, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 70%)",
            "radial-gradient(40% 40% at 100% 0%, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 70%)",
            "radial-gradient(40% 40% at 0% 100%, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 70%)",
            "radial-gradient(40% 40% at 100% 100%, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 70%)",
          ].join(", "),
        }}
      />

      {/* TOP CURVE */}
      <div className="absolute inset-x-0 top-0 z-10 pointer-events-none select-none">
        <svg
          width="100%"
          height="var(--footer-curve-height)"
          viewBox="0 0 1440 150"
          preserveAspectRatio="none"
          aria-hidden="true"
          style={{ display: "block" }}
        >
          <path
            d="M0,40 C320,100 1120,100 1440,40 L1440,0 L0,0 Z"
            fill="var(--footer-curve-fill)"
          />
        </svg>
      </div>

      {/* CONTENT */}
      <div
        className={[
          "relative mx-auto w-full max-w-screen-xl",
          "px-[clamp(12px,4vw,32px)]",
          // ↓↓↓ Push content down from the curved top for ALL screens
          "pt-[calc(var(--footer-curve-height)*0.40+clamp(28px,7vw,88px))]",
          // Bottom padding (overall footer height feel)
          "pb-[clamp(32px,7vw,84px)]",
        ].join(" ")}
      >
        <div className="grid grid-cols-[auto,1fr] items-center gap-x-4 gap-y-3 min-w-0">
          {/* Logo */}
          <div className="flex min-w-0 items-start">
            <Image
              src={logoSrc}
              alt="ZSIDEO"
              width={logoWidth}
              height={logoHeight}
              style={{ width: "clamp(120px, 18vw, 200px)", height: "auto" }}
              className="block select-none"
              priority
            />
          </div>

          {/* Tagline + nav */}
          <div className="min-w-0">
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-center">
              <p
                className="text-white/85"
                style={{
                  fontSize: "clamp(12px, 1.7vw, 16px)",
                  lineHeight: 1.4,
                }}
              >
                Crafting growth-driven digital content &amp; platforms.
              </p>

              <span className="hidden sm:inline-block h-4 w-px bg-white/20" />

              <ul
                className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2"
                style={{ fontSize: "clamp(11px, 1.6vw, 15px)" }}
              >
                <li>
                  <Link
                    href="#services"
                    aria-current="page"
                    className="text-[#16B4D2] font-medium hover:opacity-90"
                  >
                    Our Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="#recording"
                    className="text-white/85 hover:text-white"
                  >
                    Recording
                  </Link>
                </li>
                <li>
                  <Link
                    href="#editing"
                    className="text-white/85 hover:text-white"
                  >
                    Editing
                  </Link>
                </li>
                <li>
                  <Link
                    href="#websites"
                    className="text-white/85 hover:text-white"
                  >
                    Websites
                  </Link>
                </li>
                <li>
                  <Link
                    href="#ai-cloning"
                    className="text-white/85 hover:text-white"
                  >
                    AI Cloning
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-[clamp(16px,4vw,28px)] h-px w-full bg-white/15" />

        {/* Copyright */}
        <div className="mt-[clamp(10px,2.6vw,16px)] text-center">
          <p
            className="text-white/70"
            style={{ fontSize: "clamp(10px, 1.4vw, 12px)" }}
          >
            © {year} ZSIDEO. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
