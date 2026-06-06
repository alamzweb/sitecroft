import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

/* ── DM Sans Variable Font (self-hosted by next/font) ── */
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

/* ── Sitecroft Brand Metadata ── */
export const metadata: Metadata = {
  title: {
    default: "Sitecroft — High-Performance Web Solutions for Modern Brands",
    template: "%s — Sitecroft",
  },
  description:
    "WordPress services and custom-coded websites. From WordPress sites, bug fixes, and support to hand-coded React, Next.js, and HTML builds.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}