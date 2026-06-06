"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { SITE } from "@/lib/constants";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
] as const;

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav>
        <div className="nav-logo">
          <Link href="/">
            <Image
              src={SITE.logo}
              alt="Sitecroft Logo"
              width={50}
              height={50}
              priority
            />
          </Link>
          <span className="nav-logo-text">sitecroft</span>
        </div>
        <div className="nav-links">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
        <button
          className="md:hidden text-slate-300 hover:text-white transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <a className="nav-cta hidden md:inline-block" href="/contact">
          Let's Talk →
        </a>
      </nav>

      {mobileOpen && (
        <div
          className="fixed top-[78px] left-0 right-0 z-50 bg-[#0a1020] border-t border-white/5 px-6 py-6 space-y-4 md:hidden"
          style={{ animation: "fadeDown 0.3s ease both" }}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block text-slate-400 text-sm font-medium hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="block text-center bg-gradient-to-r from-brand-blue to-brand-cyan text-white px-6 py-3 rounded-lg text-sm font-semibold"
          >
            Let's Talk
          </Link>
        </div>
      )}
    </>
  );
}