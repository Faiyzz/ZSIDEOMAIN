// src/app/page.tsx
import HeroSection from "./components/Home";
import HowItWorks from "./components/HowItWorks";
import EditingForImpact from "./components/EditingForImpact";
import ReadyToScaleSection from "./components/scale";

export default function Page() {
  return (
    <>
      <HeroSection />
      <HowItWorks />
      <EditingForImpact />
      <ReadyToScaleSection />
    </>
  );
}
