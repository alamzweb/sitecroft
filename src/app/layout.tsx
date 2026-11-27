import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import "./globals.css";
import "./cookie-consent.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";

/* ── DM Sans Variable Font (self-hosted by next/font) ── */
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

/* ── Sitecroft Brand Metadata ── */
export const metadata: Metadata = {
  metadataBase: new URL("https://sitecroftdev.dnnengineer.com"),

  title: {
    default: "Sitecroft — High-Performance Web Solutions for Modern Brands",
    template: "%s | Sitecroft",
  },

  description:
    "Sitecroft builds fast, modern websites for businesses. WordPress, WooCommerce, custom React and Next.js development, website maintenance, bug fixes, and support.",

  applicationName: "Sitecroft",

  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },

  openGraph: {
    type: "website",
    siteName: "Sitecroft",
    title: "Sitecroft — High-Performance Web Solutions for Modern Brands",
    description:
      "Modern WordPress websites, WooCommerce stores, and custom-coded web solutions built for performance, growth, and modern brands.",
    url: "https://sitecroftdev.dnnengineer.com",
  },

  twitter: {
    card: "summary_large_image",
    title: "Sitecroft — High-Performance Web Solutions for Modern Brands",
    description:
      "Modern WordPress websites, WooCommerce stores, and custom-coded web solutions built for performance and growth.",
  },

  robots: {
    index: true,
    follow: true,
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
      <head>
        {/* Google Analytics (consent-gated via CookieConsent) */}
        <Script
          id="google-analytics-loader"
          strategy="afterInteractive"
        >
          {`
            window.dataLayer = window.dataLayer || [];
            window.gtag = window.gtag || function gtag(){dataLayer.push(arguments);};
            gtag('js', new Date());
            gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied' });
            gtag('config', 'G-28W4ZT1TLQ');

            // Listen for consent updates
            window.addEventListener('sitecroft:consent', function (e) {
              const analyticsOn = !!(e.detail && e.detail.analytics);
              gtag('consent', 'update', {
                analytics_storage: analyticsOn ? 'granted' : 'denied',
                ad_storage: analyticsOn ? 'granted' : 'denied'
              });
            });
          `}
        </Script>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-28W4ZT1TLQ"
          strategy="afterInteractive"
        />

        {/* Umami Analytics (consent-gated) */}
        <Script id="umami-loader" strategy="afterInteractive">
          {`
            window.addEventListener('sitecroft:consent', function (e) {
              if (e.detail && e.detail.analytics && !document.getElementById('umami-script')) {
                var s = document.createElement('script');
                s.id = 'umami-script';
                s.src = 'https://cloud.umami.is/script.js';
                s.defer = true;
                s.setAttribute('data-website-id', 'd2ce2db0-8fd8-443d-a870-45e917a23d49');
                document.body.appendChild(s);
              }
            });
          `}
        </Script>
        <meta
          name="impact-site-verification"
          content="edc80827-6d61-4aa0-aea3-b2fad879ced9"
        />
        <meta name="google-site-verification" content="BJnmnP8bzbi88NPe0XC1RthhOztcMmSWQWoROY8_kAg" />
      </head>
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
        <CookieConsent />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}