import React from "react";
import { Button } from "./ui/MovingBorders";

const workExperience = [
  {
    id: 1,
    title: "Get on Camera",
    desc: "Set aside some time to record, and we'll prepare the video ideas & scripts beforehand. Our team will coach you on the best practices for recording videos that perform and get conversions.",
    thumbnail: "/images/1.jpg",
  },
  {
    id: 2,
    title: "We Edit The Videos",
    desc: "Our team will transform your recordings into long and short-form videos. Depending on your goals, we can make as many or as few videos as you like. You'll have enough content to post once to multiple times daily.",
    thumbnail: "/images/2.jpg",
  },
  {
    id: 3,
    title: "Upload to Any Platform",
    desc: "Take your short-form or long-form videos and post them on all platforms. Sit back, relax, and watch the views and conversions come in. We provide each client with a Dedicated Creative Assistant to ensure quality.",
    thumbnail: "/images/3.jpg",
  },
  {
    id: 4,
    title: "Analyze & Optimize for Growth",
    desc: "We track performance, analyze viewer engagement, and optimize your content strategy for maximum growth. Get actionable insights on what's working, what's not, and how to boost reach, conversions, and retention.",
    thumbnail: "/images/4.jpg",
  },
];

const HowItWorks = () => {
  return (
    <div className="py-20 px-10 w-full">
      <h1 className="heading text-4xl md:text-7xl font-semibold font-sans text-center">
        How It Works
      </h1>

      <div className="w-full mt-12 grid lg:grid-cols-4 grid-cols-1 gap-10">
        {workExperience.map((card) => (
          <Button
            key={card.id}
            duration={Math.floor(Math.random() * 10000) + 10000}
            borderRadius="1.75rem"
            style={{ borderRadius: `calc(1.75rem * 0.96)` }}
            className="flex flex-col overflow-hidden text-black dark:text-white border-neutral-200 dark:border-slate-800 group"
          >
            {/* Image with overlay */}
            <div className="relative w-full overflow-hidden">
              <img
                src={card.thumbnail}
                alt={card.title}
                className="w-full h-56 object-cover filter blur-sm transition-all duration-500 ease-in-out group-hover:blur-none group-hover:scale-105"
              />
              {/* Overlay for better text readability */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all duration-500 ease-in-out" />
              
              {/* Title overlay - disappears on hover */}
              <div className="absolute inset-0 flex items-center justify-center group-hover:opacity-0 transition-opacity duration-500 ease-in-out">
                <h1 className="text-xl md:text-2xl font-bold text-white text-center px-4">
                  {card.title}
                </h1>
              </div>
            </div>

            {/* Text below image */}
            <div className="p-6 md:p-8 lg:p-10">
              <p className="text-white-100 font-semibold">{card.desc}</p>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;