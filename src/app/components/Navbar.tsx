"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";

type NavbarProps = {
  logoSrc?: string;
  logoAlt?: string;
  /** Logo height in px (width auto). Example: 36 */
  logoSize?: number;
  /** Navbar height in px. Example: 72 */
  navHeight?: number;
};

export default function Navbar({
  logoSrc = "/images/logo 1.svg",
  logoAlt = "ZSIDEO",
  logoSize = 36,
  navHeight = 72,
}: NavbarProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const linkBase =
    "relative transition text-white/80 hover:text-white after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full";
  const isActive = (href: string) => pathname.startsWith(href);
  const linkClass = (href: string) =>
    `${linkBase} ${isActive(href) ? "text-white after:w-full" : ""}`;

  return (
    <nav
      className="absolute inset-x-0 top-5 z-50 bg-transparent"
      style={{ height: navHeight }}
      aria-label="Primary"
    >
      <div className="mx-auto max-w-screen-2xl px-6 md:px-10 lg:px-16 h-full">
        <div className="flex h-full items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2" aria-label="Home">
            <Image
              src={logoSrc}
              alt={logoAlt}
              width={logoSize}
              height={logoSize}
              style={{ height: logoSize, width: "auto" }}
              priority
            />
          </Link>

          {/* Center links */}
          <div className="hidden md:flex items-center gap-10 text-base font-medium ml-auto mr-8">
            <Link
              href="/testimonials"
              className={linkClass("/testimonials")}
              aria-current={isActive("/testimonials") ? "page" : undefined}
            >
              Testimonials
            </Link>
            <Link
              href="/Portfolio"
              className={linkClass("/portfolio")}
              aria-current={isActive("/portfolio") ? "page" : undefined}
            >
              Portfolio – Our Work
            </Link>
          </div>

          {/* Right side: CTA (desktop) + Hamburger (mobile) */}
          <div className="flex items-center gap-3">
            <Link
              href="/get-started"
              className="hidden sm:inline-flex group items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-[#01161D] shadow-lg shadow-black/20 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              <span>Get Started</span>
              <ArrowRight
                size={18}
                className="-rotate-12 transition-transform group-hover:translate-x-0.5 group-hover:-rotate-6"
              />
            </Link>

            <button
              className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/30"
              aria-label="Toggle menu"
              onClick={() => setOpen((s) => !s)}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden absolute inset-x-0 top-full px-6 pt-2">
          <div className="mx-auto max-w-screen-2xl rounded-2xl border border-white/15 bg-[#0E2A33]/90 backdrop-blur-md shadow-[0_20px_60px_-20px_rgba(0,0,0,.6)]">
            <div className="flex flex-col divide-y divide-white/10">
              <Link
                href="/testimonials"
                className="px-5 py-4 text-sm text-white/90 hover:bg-white/5"
                onClick={() => setOpen(false)}
                aria-current={isActive("/testimonials") ? "page" : undefined}
              >
                Testimonials
              </Link>
              <Link
                href="/portfolio"
                className="px-5 py-4 text-sm text-white/90 hover:bg-white/5"
                onClick={() => setOpen(false)}
                aria-current={isActive("/portfolio") ? "page" : undefined}
              >
                Portfolio – Our Work
              </Link>
              <Link
                href="/get-started"
                className="px-5 py-4 text-sm font-medium text-[#01161D] bg-white rounded-b-2xl hover:opacity-95"
                onClick={() => setOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
