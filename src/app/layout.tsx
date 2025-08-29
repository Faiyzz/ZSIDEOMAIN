import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

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
      <body className="min-h-screen bg-[#01161D] text-white">
        {/* Transparent, non-sticky header overlays hero */}
        <Navbar logoSrc="/images/logo 1.svg" logoSize={70} navHeight={NAV_H} />

        {/* Remove the top padding since nav is NOT fixed/sticky */}
        <main>{children}</main>

        <Footer />
      </body>
    </html>
  );
}
