// components/FAQ.tsx
import React from "react";

/**
 * SEO notes:
 * - Uses <section>, <h2>, and native <details> for accessibility.
 * - Includes JSON-LD FAQPage so Google can feature rich results.
 */

const faqs = [
  {
    q: "What types of content do you edit?",
    a: "We focus on short-form video (Reels, TikTok, Shorts), podcast clips, UGC ads, and repurposed highlights from long-form content.",
  },
  {
    q: "How fast is your turnaround?",
    a: "Standard turnaround is 48–72 hours for short-form batches. Rush options are available depending on capacity.",
  },
  {
    q: "Do you add captions, emojis, and sound effects?",
    a: "Yes. We style captions to match your brand, add selective emojis/sfx, and mix audio so it hits on mobile.",
  },
  {
    q: "Can you match our brand style?",
    a: "Absolutely. Share examples or a style guide and we’ll lock in fonts, color, pacing, and motion conventions.",
  },
  {
    q: "Which aspect ratios and platforms do you export for?",
    a: "Commonly 9:16, 1:1, and 16:9 for TikTok, Instagram, YouTube, Facebook, and Pinterest. We’ll export per platform specs.",
  },
  {
    q: "How do revisions work?",
    a: "Most projects include 2–3 revision rounds. We keep feedback structured to move fast while protecting quality.",
  },
  {
    q: "Do you provide raw project files?",
    a: "Yes, on request. We can hand over edit timelines or archive projects for your internal team.",
  },
  {
    q: "What about content privacy and NDAs?",
    a: "We treat your assets as confidential and can sign NDAs. Access is limited to editors actively on your project.",
  },
  {
    q: "How do we start?",
    a: "Book a quick call to align on scope and style, send sample footage, and we’ll deliver a test cut within days.",
  },
  {
    q: "How do you price?",
    a: "We offer monthly packages and per-project rates. Pricing depends on volume, complexity, and deadlines.",
  },
];

export default function FAQ() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <section id="faq" className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <header className="mb-10 text-center">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white/95">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm md:text-base text-neutral-400">
            Clear answers about our short-form editing, timelines, and workflow.
          </p>
        </header>

        <div className="space-y-3">
          {faqs.map((item, idx) => (
            <details
              key={idx}
              className="group rounded-2xl border border-white/10 open:border-white/20"
            >
              <summary className="cursor-pointer list-none p-5 md:p-6 flex items-center justify-between">
                <h3 className="text-base md:text-lg font-medium text-white/90">
                  {item.q}
                </h3>
                <span
                  aria-hidden
                  className="ml-4 inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/15 text-white/70 group-open:rotate-45 transition"
                >
                  +
                </span>
              </summary>
              <div className="px-5 pb-5 md:px-6 md:pb-6">
                <p className="text-sm md:text-base text-neutral-300 leading-relaxed">
                  {item.a}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>

      {/* FAQ JSON-LD for rich results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}
