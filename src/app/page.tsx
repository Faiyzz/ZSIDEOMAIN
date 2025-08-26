import HeroSection from "./components/Home";
import HowItWorks from "./components/HowItWorks";
import EditingForImpact from "./components/EditingForImpact";
import ReadyToScaleSection from "./components/scale";
import CurvedTopImageSection from "./components/Footer";

export default function Page() {
  return (
    <main className="bg-black text-white">
      <HeroSection />
      <HowItWorks />
      <EditingForImpact />
      <ReadyToScaleSection />
      <CurvedTopImageSection />
    </main>
  );
}
