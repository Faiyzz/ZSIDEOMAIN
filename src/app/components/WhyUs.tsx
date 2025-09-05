"use client";

import { motion } from "framer-motion";

export default function ContentCreationVision() {
  return (
    <section
      id="vision"
      className="relative isolate flex min-h-[92vh] items-center text-white"
      aria-label="Vision"
    >
      <div className="mx-auto w-full max-w-7xl px-6 py-28 md:py-36">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-5 text-s font-semibold uppercase tracking-[0.2em] text-white/60"
        >
          Content Creation
        </motion.div>

        {/* Big hero text */}
        <div className="max-w-[1200px]">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.2, 1, 0.2, 1] }}
            className="leading-[0.95] font-semibold tracking-[-0.02em]"
          >
            <span className="block text-[clamp(2.6rem,7vw,6.2rem)]">
              Creating{" "}
              <span className="text-blue-400 drop-shadow-[0_0_12px_rgba(59,130,246,0.8)]">
                extraordinary
              </span>{" "}
              content that
            </span>
            <span className="block text-[clamp(2.6rem,7vw,6.2rem)]">
              captivates audiences with{" "}
              <span className="text-blue-400 drop-shadow-[0_0_12px_rgba(59,130,246,0.8)]">
                professional editing
              </span>
              .
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mt-6 max-w-2xl text-base md:text-lg text-white/70"
          >
            Creator first. We transform your vision into compelling content through 
            expert editing, creative storytelling, and seamless post-production that 
            makes your brand stand out.
          </motion.p>

          {/* Why Choose Us - Key Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl"
          >
            <div className="rounded-xl border border-white/12 bg-white/[0.03] p-6">
              <div className="mb-3 text-blue-400 text-2xl">⚡</div>
              <h3 className="mb-2 text-lg font-semibold">Lightning Fast Delivery</h3>
              <p className="text-sm text-white/60">
                24-48 hour turnaround on most projects. Your content schedule never misses a beat.
              </p>
            </div>

            <div className="rounded-xl border border-white/12 bg-white/[0.03] p-6">
              <div className="mb-3 text-blue-400 text-2xl">🎯</div>
              <h3 className="mb-2 text-lg font-semibold">Audience-Focused Editing</h3>
              <p className="text-sm text-white/60">
                We study your audience data to create content that drives engagement and conversions.
              </p>
            </div>

            <div className="rounded-xl border border-white/12 bg-white/[0.03] p-6">
              <div className="mb-3 text-blue-400 text-2xl">🏆</div>
              <h3 className="mb-2 text-lg font-semibold">Award-Winning Quality</h3>
              <p className="text-sm text-white/60">
                Professional editors with 10+ years experience in viral content and brand storytelling.
              </p>
            </div>
          </motion.div>

          {/* How We Do It */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-12 rounded-2xl border border-white/12 bg-white/[0.03] p-8"
          >
            <h3 className="mb-6 text-2xl font-semibold">How We Transform Your Content</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="mb-3 mx-auto w-12 h-12 rounded-full bg-blue-400/20 flex items-center justify-center">
                  <span className="text-blue-400 font-bold">1</span>
                </div>
                <h4 className="mb-2 font-medium">Content Analysis</h4>
                <p className="text-sm text-white/60">We analyze your raw footage and identify the most engaging moments</p>
              </div>

              <div className="text-center">
                <div className="mb-3 mx-auto w-12 h-12 rounded-full bg-blue-400/20 flex items-center justify-center">
                  <span className="text-blue-400 font-bold">2</span>
                </div>
                <h4 className="mb-2 font-medium">Strategic Editing</h4>
                <p className="text-sm text-white/60">Craft compelling narratives with pacing that keeps viewers hooked</p>
              </div>

              <div className="text-center">
                <div className="mb-3 mx-auto w-12 h-12 rounded-full bg-blue-400/20 flex items-center justify-center">
                  <span className="text-blue-400 font-bold">3</span>
                </div>
                <h4 className="mb-2 font-medium">Visual Enhancement</h4>
                <p className="text-sm text-white/60">Add graphics, effects, and color grading that matches your brand</p>
              </div>

              <div className="text-center">
                <div className="mb-3 mx-auto w-12 h-12 rounded-full bg-blue-400/20 flex items-center justify-center">
                  <span className="text-blue-400 font-bold">4</span>
                </div>
                <h4 className="mb-2 font-medium">Final Delivery</h4>
                <p className="text-sm text-white/60">Multiple formats optimized for each platform's requirements</p>
              </div>
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <a
              href="#portfolio"
              className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.07] px-5 py-3 text-sm font-medium transition hover:bg-white/[0.12]"
            >
              View Our Work
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-5 py-3 text-sm font-medium transition hover:bg-white/[0.07]"
            >
              Start Your Project
            </a>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-4 py-2 text-xs uppercase tracking-widest text-white/60">
              500+ Creators Served
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}