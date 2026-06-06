"use client";

import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/lib/constants";

const SOCIAL_LINKS = [
  {
    href: "https://github.com/m-saad125",
    label: "GitHub",
    viewBox: "0 0 24 24",
    path: 'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22',
    isStroke: true,
  },
  {
    href: "https://x.com/msaad_alam",
    label: "X",
    viewBox: "0 0 24 24",
    path: "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z",
    isStroke: false,
  },
  {
    href: "#",
    label: "LinkedIn",
    viewBox: "0 0 24 24",
    path: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z",
    isStroke: false,
    circle: { cx: 4, cy: 4, r: 2 },
  },
  {
    href: "#",
    label: "Instagram",
    viewBox: "0 0 24 24",
    path: "",
    isStroke: true,
    isRect: true,
  },
  {
    href: "mailto:contact@dnnengineer.com",
    label: "Email",
    viewBox: "0 0 24 24",
    path: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z",
    polyline: "22,6 12,13 2,6",
    isStroke: true,
  },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo-wrap">
              <Image
                src={SITE.logo}
                alt="Sitecroft Logo"
                width={50}
                height={50}
              />
              <span>sitecroft</span>
            </div>
            <div className="footer-badge">
              <div className="footer-badge-dot" />
              <span>Available for new projects</span>
            </div>
            <p>
              Professional full-stack web development services. Clean builds,
              honest communication, and results that matter.
            </p>
          </div>

          <div className="footer-col">
            <h5>Services</h5>
            <Link href="/services#wp-standard">WordPress Site</Link>
            <Link href="/services#custom-code">Custom Code Website</Link>
            <Link href="/services#woocommerce">WooCommerce Store</Link>
            <Link href="/services#landing-page">Landing Page</Link>
            <Link href="/services#bug-fixing">Bug & Error Fixing</Link>
            <Link href="/services#maintenance">Maintenance</Link>
          </div>

          <div className="footer-col">
            <h5>Company</h5>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/services">Services</Link>
            <Link href="/faq">FAQ</Link>
            <Link href="/contact">Contact</Link>
          </div>

          <div className="footer-col">
            <h5>Legal</h5>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms-and-conditions">Terms of Service</Link>
            <Link href="/cookie-policy">Cookie Policy</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <p>2026 Sitecroft. All rights reserved.</p>
          <div className="footer-socials">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                className="social-btn"
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
              >
                {social.isRect ? (
                  <svg
                    className="stroke-icon"
                    viewBox={social.viewBox}
                    width="18"
                    height="18"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="2"
                      y="2"
                      width="20"
                      height="20"
                      rx="5"
                      ry="5"
                    />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                ) : social.circle ? (
                  <svg
                    viewBox={social.viewBox}
                    width="18"
                    height="18"
                    fill={social.isStroke ? "none" : "#64748b"}
                    stroke={social.isStroke ? "#64748b" : "none"}
                    strokeWidth={social.isStroke ? "2" : "0"}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d={social.path} />
                    <circle cx={social.circle.cx} cy={social.circle.cy} r={social.circle.r} />
                  </svg>
                ) : social.polyline ? (
                  <svg
                    className="stroke-icon"
                    viewBox={social.viewBox}
                    width="18"
                    height="18"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d={social.path} />
                    <polyline points={social.polyline} />
                  </svg>
                ) : (
                  <svg
                    viewBox={social.viewBox}
                    width="18"
                    height="18"
                    fill={social.isStroke ? "none" : "#64748b"}
                    stroke={social.isStroke ? "#64748b" : "none"}
                    strokeWidth={social.isStroke ? "2" : "0"}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d={social.path} />
                  </svg>
                )}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}