import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import GlobalGradientBG from "./components/GlobalGradientBG"; // 👈 our backdrop component

export const metadata: Metadata = {
  title: "ZSIDEO — Digital Content & Platforms",
  description:
    "Websites, webapps, AI agents, chatbots, SEO, hosting, and CRM portals.",
  icons: { icon: "/favicon.ico" },
};

const NAV_H = 72;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body suppressHydrationWarning className="min-h-screen bg-[#01161D] text-white">
        {/* Transparent, non-sticky header overlays hero */}
        <Navbar logoSrc="/images/logo 1.svg" logoSize={70} navHeight={NAV_H} />

        {/* Gradient only behind content */}
        <div className="relative">
          <GlobalGradientBG intensity={14} />
          <main className="relative z-10">{children}</main>
        </div>

        {/* Footer has its own clean bg */}
        <Footer />
      </body>
    </html>
  );
}
