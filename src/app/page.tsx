// src/app/page.tsx
import HeroSection from "./components/HeroSection";
import HowItWorks from "./components/HowItWorks";
import { ThreeDMarquee } from "./components/ThreeDMarquee";

import ReadyToScaleSection from "./components/scale";

export default function Page() {
  return (
    <>
      <HeroSection />
      <HowItWorks />
      <ThreeDMarquee
        cols={6} // will render 7 strips internally
        images={[
          { vimeoId: "1089303592", alt: "Reel 1" },
          { vimeoId: "1089303621", alt: "Reel 2" },
          { vimeoId: "1089303653", alt: "Reel 3" },
          { vimeoId: "1089303686", alt: "Reel 4" },
        ]}
      />
      <ReadyToScaleSection />
    </>
  );
}
