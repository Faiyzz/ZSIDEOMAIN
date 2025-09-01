"use client";

import React from "react";
import Image from "next/image";
import { Camera, ScissorsSquare as EditIcon, Share2 } from "lucide-react";
import type { SVGProps } from "react";
import { motion } from "framer-motion";

/**
 * HowItWorks Section
 * Adds scroll-triggered animations for heading, cards, and SVG thread
 */
export default function HowItWorks() {
  const steps: StepCardProps[] = [
    {
      title: "Get On Camera",
      step: "Step · 01",
      description:
        "Set aside some time to record. We’ll prep ideas & scripts and coach best practices to look and sound great.",
      icon: Camera,
    },
    {
      title: "We Edit The Videos",
      step: "Step · 02",
      description:
        "Our team transforms your recordings into high-performing short and long-form edits tailored to your goals.",
      icon: EditIcon,
    },
    {
      title: "Upload To Any Platform",
      step: "Step · 03",
      description:
        "Publish everywhere. Sit back, relax, and watch views and conversions roll in—quality-checked by our team.",
      icon: Share2,
    },
  ];

  return (
    <section
      className="relative isolate overflow-hidden bg-white px-4 py-20 sm:px-6 lg:px-8"
      aria-labelledby="how-it-works-title"
    >
      {/* Background image */}
      <div className="-mt-10 z-20">
        <Image
          src="/images/background.svg"
          alt="How it works background"
          fill
          priority
          className="pointer-events-none object-cover"
        />
      </div>

      {/* Heading */}
      <motion.div
        className="relative z-10 mx-auto max-w-3xl text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <h2
          id="how-it-works-title"
          className="font-semibold tracking-tight text-3xl sm:text-4xl lg:text-5xl"
        >
          <span className="bg-[radial-gradient(120%_120%_at_50%_20%,#4b4b4b_0%,#272727_45%,#111111_100%)] bg-clip-text text-transparent">
            Here’s How It Works
          </span>
        </h2>
        <p className="mt-4 text-base sm:text-lg text-neutral-600">
          Simple 3-Step Process — it’s really that easy
        </p>
      </motion.div>

      {/* Cards + Thread */}
      <div className="relative z-100 mx-auto mt-12 max-w-6xl">
        <motion.div
          className="absolute inset-0 -z-10"
          initial={{ opacity: 0, pathLength: 0 }}
          whileInView={{ opacity: 1, pathLength: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <ThreadUnderlay />
        </motion.div>

        <div className="flex flex-col gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.6,
                delay: i * 0.2,
                ease: "easeOut",
              }}
            >
              <StepCard {...s} index={i} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------ */
/* Card                                 */
/* ------------------------------------ */

function StepCard({
  title,
  description,
  step,
  icon: Icon,
  index = 0,
}: StepCardProps) {
  const flip = index % 2 === 1;

  return (
    <article
      className="relative w-full rounded-2xl border bg-white/90 shadow-[0_10px_30px_rgba(0,0,0,0.06)] backdrop-blur-sm transition-transform duration-300 hover:-translate-y-0.5 px-5 sm:px-7 py-4 sm:py-5"
      style={{
        borderColor: "#3AC4EC",
        backgroundImage:
          "radial-gradient(150%_120%_at_50%_-10%,rgba(2,132,199,0.06),rgba(255,255,255,0))",
      }}
    >
      <div
        className={[
          "flex items-center gap-5 sm:gap-6",
          "min-h-[92px] sm:min-h-[100px]",
          flip ? "md:flex-row-reverse" : "md:flex-row",
        ].join(" ")}
      >
        {/* Bigger Icon */}
        <div
          className="grid h-16 w-16 place-items-center rounded-xl bg-sky-500/10 ring-1 ring-inset ring-sky-500/20 shrink-0"
          aria-hidden
        >
          <Icon className="h-8 w-8 text-sky-600" />
        </div>

        <div className={`min-w-0 flex-1 ${flip ? "text-right" : "text-left"}`}>
          <p className="text-xs font-medium tracking-wide text-neutral-500">
            {step}
          </p>
          <h3 className="mt-0.5 text-lg font-semibold text-sky-700">{title}</h3>
          <p className="mt-1.5 text-sm leading-6 text-neutral-600">
            {description}
          </p>
        </div>
      </div>
    </article>
  );
}

interface StepCardProps {
  title: string;
  description: string;
  step: string;
  icon: React.ComponentType<SVGProps<SVGSVGElement>>;
  index?: number;
}

/* ------------------------------------ */
/* Thread Underlay (SVG)                */
/* ------------------------------------ */

function ThreadUnderlay({ className = "" }: { className?: string }) {
  const W = 1200;
  const H = 420;
  const cx = W / 2;
  const nodePercents = [0.16, 0.5, 0.84];
  const yAt = (p: number) => p * H;

  return (
    <svg
      className={`pointer-events-none ${className}`}
      viewBox={`0 0 ${W} ${H}`}
      fill="none"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <filter id="thread-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="10" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="thread-stroke" x1={cx} y1="0" x2={cx} y2={H}>
          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.8" />
          <stop offset="60%" stopColor="#22D3EE" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="thread-halo" x1={cx} y1="0" x2={cx} y2={H}>
          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.15" />
        </linearGradient>
      </defs>

      {/* Dashed halo */}
      <path
        d={`M ${cx} 10
            C ${cx - 120} ${H * 0.15}, ${cx + 160} ${H * 0.25}, ${cx} ${
          H * 0.33
        }
            S ${cx - 160} ${H * 0.5}, ${cx} ${H * 0.62}
            S ${cx + 120} ${H * 0.78}, ${cx} ${H - 10}`}
        stroke="url(#thread-halo)"
        strokeWidth="5"
        strokeDasharray="10 14"
        filter="url(#thread-glow)"
      />

      {/* Solid main thread */}
      <path
        d={`M ${cx} 10
            C ${cx - 120} ${H * 0.15}, ${cx + 160} ${H * 0.25}, ${cx} ${
          H * 0.33
        }
            S ${cx - 160} ${H * 0.5}, ${cx} ${H * 0.62}
            S ${cx + 120} ${H * 0.78}, ${cx} ${H - 10}`}
        stroke="url(#thread-stroke)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Step markers */}
      {nodePercents.map((p, i) => (
        <g key={i} filter="url(#thread-glow)">
          <circle
            cx={cx}
            cy={yAt(p)}
            r="11"
            fill="none"
            stroke="url(#thread-halo)"
            strokeWidth="2"
          />
          <circle cx={cx} cy={yAt(p)} r="4.5" fill="url(#thread-stroke)" />
        </g>
      ))}
    </svg>
  );
}
