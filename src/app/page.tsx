// src/app/page.tsx
import HeroSection from "./components/HeroSection";
import { ThreeDMarquee } from "./components/ThreeDMarquee";

import FAQ from "./components/FAQ"
import ReadyToScaleSection from "./components/scale";
import WhoThisIsFor from "./components/WhoThisIsFor";



export default function Page() {
  return (
    <>
      <HeroSection />
 
<ThreeDMarquee
  cols={6}
  ctaText="Create Your Impact"
  ctaHref="/contact"
  images={[
    { vimeoId: "1089303592", alt: "Reel 1", poster: "/gallery/1.jpg" },
    { vimeoId: "1089303621", alt: "Reel 2", poster: "/gallery/2.jpg" },
    { vimeoId: "1089303653", alt: "Reel 3", poster: "/gallery/3.jpg" },
    { vimeoId: "1089303686", alt: "Reel 4", poster: "/gallery/4.jpg" },
  ]}
/>
      <WhoThisIsFor/>
      <ReadyToScaleSection />
      <FAQ/>
    </>
  );
}
