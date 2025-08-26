"use client";

import Image from "next/image";

export default function CurvedTopImageSection() {
  return (
    <section className="relative isolate text-white">
      {/* Background image + dark overlay */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/scroler.svg" // ← your bg
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Curved top (white) — made smoother & a bit taller */}
      <div className="pointer-events-none absolute -top-20 left-0 right-0">
        <svg
          viewBox="0 0 1440 200"
          preserveAspectRatio="none"
          className="block h-20 w-full sm:h-24 md:h-32"
          aria-hidden="true"
        >
          {/* Change fill to match your page background if not pure white */}
          <path
            d="M0,200 C480,60 960,60 1440,200 L1440,0 L0,0 Z"
            fill="#ffffff"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-8 md:px-12 py-16 md:py-24">
        <div className="flex flex-wrap items-center gap-6 md:gap-10">
          {/* Logo (slightly larger, consistent height) */}
          <div className="shrink-0">
            <Image
              src="/images/logo 1.svg"
              alt="ZSIDEO"
              width={140}
              height={40}
              className="h-10 w-auto md:h-12"
            />
          </div>

          {/* Tagline (balanced line-length, softer tint) */}
          <p className="text-white/80 max-w-xl">
            Crafting growth-driven digital content & platforms.
          </p>

          {/* Links */}
          <nav className="ml-auto flex flex-wrap items-center gap-6 text-sm">
            <a className="hover:text-sky-400" href="#">
              Our Services
            </a>
            <a className="hover:text-sky-400" href="#">
              Recording
            </a>
            <a className="hover:text-sky-400" href="#">
              Editing
            </a>
            <a className="hover:text-sky-400" href="#">
              Websites
            </a>
            <a className="hover:text-sky-400" href="#">
              AI Cloning
            </a>
          </nav>
        </div>

        {/* Divider with more breathing room */}
        <div className="mt-8 h-px w-full bg-white/15" />

        {/* Footer bottom with extra height */}
        <p className="mt-6 text-xs text-white/60">
          © 2025 ZSIDEO. All rights reserved.
        </p>
      </div>
    </section>
  );
}
