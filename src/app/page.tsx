// src/app/page.tsx
import HeroSection from "./components/HeroSection";
import JourneyHowItWorks, { type JourneyStep } from "./components/HowItWorks";
import EditingForImpact from "./components/EditingForImpact";
import ReadyToScaleSection from "./components/scale";


const steps: JourneyStep[] = [
  {
    id: "1",
    eyebrow: "01",
    title: "Get on Camera",
    subtitle: "We prep, you perform",
    body:
      "We script high-performing ideas and coach delivery so you just show up and record—no friction, all signal.",
    imageSrc: "/images/1.jpg",
    ctaText: "See sample session",
    ctaHref: "#samples",
  },
  {
    id: "2",
    eyebrow: "02",
    title: "We Edit The Videos",
    subtitle: "Long + short at scale",
    body:
      "Our editors convert one recording day into weeks of content—cutdowns, captions, hooks, and packaging.",
    imageSrc: "/images/2.jpg",
  },
  {
    id: "3",
    eyebrow: "03",
    title: "Publish Everywhere",
    subtitle: "Assistant QA built-in",
    body:
      "A Creative Assistant checks every post—copy, hashtags, covers—so you ship daily without mistakes.",
    imageSrc: "/images/3.jpg",
    ctaText: "View distribution map",
    ctaHref: "#distribution",
  },
];

export default function Page() {
  return (
    <>
      <HeroSection />
      <JourneyHowItWorks
        heading="How it works"
        subheading="A guided journey—record once, publish everywhere."
        steps={steps}
        accentFrom="#8B5CF6"
        accentTo="#60A5FA"
      />
      <EditingForImpact />
      <ReadyToScaleSection />
    </>
  );
}
