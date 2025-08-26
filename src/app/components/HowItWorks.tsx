"use client";

import Image from "next/image";

export default function HowItWorks() {
  return (
    <section className="relative py-20 bg-white">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/public/images/g1.svg" // 🔹 replace with your background
          alt="How It Works Background"
          fill
          className="w-full h-full object-cover"
        />
      </div>

      {/* Container */}
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          Here’s How It Works
        </h2>
        <p className="text-gray-600 text-lg mb-12">
          Simple 3-Step Process – it’s really that easy
        </p>

        {/* Step cards */}
        <div className="flex flex-col gap-8">
          <div className="flex justify-center">
            <Image
              src="/images/g1.svg" // 🔹 your step card 1
              alt="Step 1 - Get On Camera"
              width={900}
              height={160}
              className="w-full max-w-4xl"
            />
          </div>
          <div className="flex justify-center">
            <Image
              src="/images/g2.svg" // 🔹 your step card 2
              alt="Step 2 - We Edit The Videos"
              width={900}
              height={160}
              className="w-full max-w-4xl"
            />
          </div>
          <div className="flex justify-center">
            <Image
              src="/images/g3.svg" // 🔹 your step card 3
              alt="Step 3 - Upload To Any Platform"
              width={900}
              height={160}
              className="w-full max-w-4xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
