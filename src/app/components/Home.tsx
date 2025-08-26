"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#001f2b] to-[#003342] text-white flex flex-col">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 md:px-12 py-4">
        {/* Logo */}
        <Image
          src="/images/logo 1.svg"
          alt="ZSIDEO Logo"
          width={120}
          height={40}
          className="object-contain"
        />

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
          <a href="#testimonials" className="hover:text-gray-300 transition">
            Testimonials
          </a>
          <a href="#portfolio" className="hover:text-gray-300 transition">
            Portfolio – Our Work
          </a>
          <a
            href="#get-started"
            className="px-5 py-2 rounded-full border-2 border-transparent font-medium flex items-center gap-2
              bg-gradient-to-r from-white to-white text-black hover:bg-opacity-90 transition"
          >
            Get Started <ArrowRight size={16} />
          </a>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="flex flex-1 flex-col md:flex-row items-center justify-between px-6 md:px-12 py-12 gap-12">
        {/* Left Content */}
        <div className="max-w-xl text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-hero font-bold leading-tight">
            ZSIDEO Builds <br />
            <span className="text-gray-300">
              The Future With Code, Cameras & Creativity
            </span>
          </h1>

          {/* CTA button */}
          <a
            href="#get-started"
            className="mt-8 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold
              border-2 border-transparent bg-transparent text-white 
              bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-border hover:opacity-90 transition"
          >
            Get Started
          </a>
        </div>

        {/* Right Cards */}
        <div className="flex gap-6 relative">
          {/* Card Data */}
          {[
            {
              id: 1,
              src: "/images/Mobile.svg",
              label: "Short/Long Form Videos",
              position: "translate-y-4",
              labelPos: "-bottom-10",
              rotate: "-rotate-6",
            },
            {
              id: 2,
              src: "/images/Mobile.svg",
              label: "High Quality",
              position: "-translate-y-4",
              labelPos: "-top-10",
              rotate: "rotate-6",
            },
            {
              id: 3,
              src: "/images/Mobile.svg",
              label: "Fast Turnaround Time",
              position: "translate-y-4",
              labelPos: "-bottom-10",
              rotate: "-rotate-6",
            },
          ].map((card) => (
            <motion.div
              key={card.id}
              whileHover={{ scale: 1.05 }}
              className={`relative rounded-xl overflow-hidden w-32 sm:w-36 h-56 sm:h-64 shadow-md ${card.position}`}
            >
              <Image
                src={card.src}
                alt={card.label}
                fill
                className="object-cover"
              />

              <div
                className={`absolute ${card.labelPos} left-1/2 -translate-x-1/2`}
              >
                <span
                  className={`inline-flex items-center px-3 py-1 text-[10px] sm:text-xs rounded-full border border-transparent 
                    bg-gradient-to-r from-teal-400 to-blue-500 text-white ${card.rotate}`}
                >
                  {card.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
