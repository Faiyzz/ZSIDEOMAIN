"use client";

import Image from "next/image";

export default function EditingForImpact() {
  return (
    <section className="relative isolate overflow-hidden bg-[#00151C] text-white">
      {/* Top concave curve */}
      <div className="pointer-events-none absolute inset-x-0 -top-10 h-24"></div>

      {/* Heading & text */}
      <div className="relative mx-auto max-w-6xl px-6 pt-16 pb-10 text-center md:pt-24">
        <h2 className="text-3xl font-bold md:text-5xl">Editing For Impact</h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-200/80 md:text-base">
          We don’t just cut clips — we create rhythm, story, and punch. Every
          zoom, caption, and transition is optimized for attention.
        </p>
      </div>

      {/* Full screen image strip */}
      <div className="relative w-screen overflow-hidden">
        <Image
          src="/images/scroler.svg"
          alt="Editing preview strip"
          width={3000}
          height={1200}
          className="w-full h-auto max-h-[650px] object-cover"
          priority
        />
      </div>

      {/* Pagination dots */}
      <div className="mt-6 flex items-center justify-center gap-2">
        <span className="h-2 w-2 rounded-full bg-white/70" />
        <span className="h-2 w-2 rounded-full bg-white/30" />
        <span className="h-2 w-2 rounded-full bg-white/30" />
      </div>

      {/* CTA */}
      <div className="flex justify-center">
        <a
          href="#portfolio"
          className="mt-6 inline-flex items-center justify-center rounded-full border border-white/70 px-5 py-2 text-sm font-medium hover:bg-white hover:text-black transition"
        >
          Explore Our Work
        </a>
      </div>

      {/* Bottom concave curve */}
      <div className="pointer-events-none absolute inset-x-0 -bottom-10 h-24"></div>
    </section>
  );
}
