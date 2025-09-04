"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";

type NavbarProps = {
  logoSrc?: string;
  logoAlt?: string;
  /** Logo height in px (width auto) */
  logoSize?: number;
  /** Navbar height in px (desktop) */
  navHeight?: number;
};

export default function Navbar({
  logoSrc = "/image/",
  logoAlt = "ZSIDEO",
  logoSize = 36,
  navHeight = 72,
}: NavbarProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() || "";
  useLayoutEffect(() => {
    const h = `${navHeight}px`;
    document.documentElement.style.setProperty("--nav-h", h);
  }, [navHeight]);
  // add this helper type near the top (below NavbarProps)
  type CSSVars = React.CSSProperties & { ["--nav-row-h"]?: string };

  // Close menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock background scroll when menu is open
  useEffect(() => {
    const original = document.body.style.overflow;
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = original || "";
    return () => {
      document.body.style.overflow = original || "";
    };
  }, [open]);

  const isActive = (href: string) => pathname.startsWith(href);

  const linkBase =
    "relative transition text-white/80 hover:text-white after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full";
  const linkClass = (href: string) =>
    `${linkBase} ${isActive(href) ? "text-white after:w-full" : ""}`;
  // inside the component, before `return`
  const rowStyle: CSSVars = { "--nav-row-h": `${navHeight}px` };

  return (
    <nav
      className="fixed inset-x-0 top-4 z-50 bg-transparent"
      style={{ height: `calc(${navHeight}px + env(safe-area-inset-top))` }}
      aria-label="Primary"
      role="navigation"
    >
      {/* Padded container for breathing room */}
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 md:px-10 lg:px-16">
        {/* Flex on mobile (logo left, burger right). Grid on md+ (true center links). */}
        <div
          className="flex h-[--nav-row-h] items-center justify-between md:grid md:grid-cols-3"
          style={rowStyle}        >
          {/* Left: Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              aria-label="Go to homepage"
              className="inline-flex items-center gap-2"
            >
              <h1>ZSIDEO</h1>
            </Link>
          </div>

          {/* Center: Links (desktop only) */}
          <div className="hidden md:flex items-center justify-center gap-10 text-base font-medium">
            <Link
              href="/testimonials"
              className={linkClass("/testimonials")}
              aria-current={isActive("/testimonials") ? "page" : undefined}
            >
              Testimonials
            </Link>
            <Link
              href="/portfolio"
              className={linkClass("/portfolio")}
              aria-current={isActive("/portfolio") ? "page" : undefined}
            >
              Portfolio
            </Link>
          </div>

          {/* Right: CTA (desktop) + Hamburger (mobile) */}
          <div className="flex items-center justify-end gap-3">
            <Link
              href="/get-started"
              className="hidden lg:inline-flex group items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-[#01161D] shadow-lg hover:shadow-xl"
            >
              <span>Get Started</span>
            </Link>

            {/* Mobile menu toggle (stays on the right) */}
            <button
              className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white"
              aria-label="Toggle menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((s) => !s)}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown (simple, solid bg, padded) */}
      {open && (
        <div className="md:hidden absolute inset-x-0 top-full px-4 sm:px-6 md:px-10 lg:px-16">
          <div
            id="mobile-menu"
            className="mx-auto max-w-screen-2xl rounded-2xl bg-[#0E2A33] shadow-[0_20px_60px_-20px_rgba(0,0,0,.6)]"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex flex-col divide-y divide-white/10">
              <Link
                href="/testimonials"
                className="px-5 py-4 text-base text-white/90 hover:bg-white/5 active:bg-white/10"
                onClick={() => setOpen(false)}
                aria-current={isActive("/testimonials") ? "page" : undefined}
              >
                Testimonials
              </Link>
              <Link
                href="/portfolio"
                className="px-5 py-4 text-base text-white/90 hover:bg-white/5 active:bg-white/10"
                onClick={() => setOpen(false)}
                aria-current={isActive("/portfolio") ? "page" : undefined}
              >
                Portfolio
              </Link>
              <Link
                href="/get-started"
                className="px-5 py-4 text-base font-semibold text-[#01161D] bg-white rounded-b-2xl hover:opacity-95"
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
