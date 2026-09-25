"use client";

import Link from "next/link";
import { useEffect } from "react";

const meta = {
  client: "Nimbus Essence",
  tagline: "A brand site & future storefront for a new beauty venture",
  category: "Client Work",
  liveUrl: "https://nimbusessence.org",
};

const stats = [
  { label: "Project Type", value: "Client Work" },
  { label: "Timeline", value: "~1 month" },
  { label: "Website Build", value: "1 week" },
  { label: "Platform", value: "WordPress + WooCommerce" },
];

const stack = ["WordPress", "WooCommerce", "HTML", "CSS", "Custom AI Chatbot"];

const built = [
  {
    title: "Brand site from scratch",
    body: "A fresh build — no recycled look. Started from a template but reshaped the layout, typography, colour system, product structure, and content so it felt like Nimbus Essence, not a generic beauty theme.",
  },
  {
    title: "WooCommerce configured end-to-end",
    body: "Product taxonomy, category structure, tax settings, and checkout flow set up and ready. The client chose to defer payment processing until their product line was ready — but when they flip the switch, the store is built to sell.",
  },
  {
    title: "Standalone product page",
    body: "A dedicated product page for their flagship shampoo — giving the brand a real product presence while the wider WooCommerce catalogue waits for future SKUs.",
  },
  {
    title: "Custom AI chatbot, trained on their data",
    body: "An on-site assistant trained on Nimbus Essence's own product and brand information. Visitors can ask about the brand, the ingredients, or the products and get accurate answers instantly — no human in the loop. Gives a small team an always-on customer service layer from day one.",
  },
];

const timeline = [
  { label: "Week 1", body: "Full website build delivered" },
  { label: "Weeks 2–4", body: "Refinements, content polish, WooCommerce configuration, chatbot training & integration" },
  { label: "Launch", body: "Site live, WooCommerce ready for future sales" },
];

export default function NimbusEssencePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden pt-28 pb-16 px-6">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(59,130,246,0.18), transparent 70%), radial-gradient(ellipse 60% 40% at 50% 100%, rgba(6,182,212,0.06), transparent 70%)",
          }}
        />
        <div className="max-w-5xl mx-auto relative">
          <div className="flex items-center gap-3 mb-8 flex-wrap">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-sm transition-colors hover:text-white"
              style={{ color: "rgba(148,163,184,0.8)" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to work
            </Link>
            <div className="page-badge">
              <div className="badge-dot" />
              {meta.category}
            </div>
          </div>

          <h1
            className="text-5xl md:text-7xl font-bold leading-[1.02] mb-6 tracking-tight"
            style={{ color: "#fff" }}
          >
            {meta.client}
          </h1>

          <p
            className="text-lg md:text-xl leading-relaxed max-w-2xl mb-10"
            style={{ color: "rgba(148,163,184,0.9)" }}
          >
            {meta.tagline}
          </p>

          <a
            href={meta.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Visit live site
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <path d="M15 3h6v6M10 14L21 3" />
            </svg>
          </a>
        </div>
      </section>

      {/* ============ AT A GLANCE ============ */}
      <section className="px-6 pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-xl p-5 md:p-6"
                style={{
                  background: "rgba(10,16,32,0.7)",
                  border: "1px solid rgba(99,179,237,0.1)",
                }}
              >
                <div
                  className="text-[11px] mb-2.5 font-medium"
                  style={{
                    color: "rgba(148,163,184,0.65)",
                    letterSpacing: "0.6px",
                    textTransform: "uppercase",
                  }}
                >
                  {s.label}
                </div>
                <div className="text-base font-semibold leading-snug" style={{ color: "#fff" }}>
                  {s.value}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mt-6">
            {stack.map((t) => (
              <span
                key={t}
                className="project-tag"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============ THE BRIEF ============ */}
      <section className="px-6 pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="section-label mb-4">The Brief</div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 max-w-3xl">
            A new brand needed a real online presence.
          </h2>
          <div
            className="space-y-5 text-base md:text-[17px] leading-relaxed max-w-3xl"
            style={{ color: "rgba(148,163,184,0.88)" }}
          >
            <p>
              Nimbus Essence is a haircare, skincare, and personal care brand
              preparing to launch their own line of beauty products. They had a
              strong product in development and a clear brand vision — but no
              website to represent it.
            </p>
            <p>
              They needed more than a placeholder page. They needed a professional,
              trustworthy site that would represent the brand today, showcase their
              flagship product, and be ready to grow into a full direct-to-consumer
              store as their catalogue expanded. The build needed to feel premium,
              match the clean beauty identity, and be built on infrastructure they
              could actually run themselves.
            </p>
          </div>
        </div>
      </section>

      {/* ============ WHAT I BUILT ============ */}
      <section className="px-6 pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="section-label mb-4">What I Built</div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
            From scratch, end to end.
          </h2>

          <div className="space-y-4">
            {built.map((item, i) => (
              <div
                key={i}
                className="rounded-xl p-6 md:p-7 flex items-start gap-5"
                style={{
                  background: "rgba(10,16,32,0.7)",
                  border: "1px solid rgba(99,179,237,0.1)",
                }}
              >
                <div
                  className="flex-shrink-0 flex items-center justify-center text-sm font-bold"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                    background: "linear-gradient(135deg, rgba(59,130,246,0.2), rgba(6,182,212,0.15))",
                    border: "1px solid rgba(99,179,237,0.25)",
                    color: "#67e8f9",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="flex-1 min-w-0">
                  <h3
                    className="text-lg font-semibold mb-2.5 leading-snug"
                    style={{ color: "#fff" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-[15px] leading-[1.7]"
                    style={{ color: "rgba(148,163,184,0.85)" }}
                  >
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ STANDOUT FEATURE ============ */}
      <section className="px-6 pb-16">
        <div className="max-w-5xl mx-auto">
          <div
            className="rounded-2xl p-7 md:p-10 relative overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(59,130,246,0.1), rgba(6,182,212,0.05))",
              border: "1px solid rgba(6,182,212,0.2)",
            }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{
                background: "linear-gradient(90deg, #3b82f6, #06b6d4)",
              }}
            />
            <div className="section-label mb-4">Standout Feature</div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 max-w-3xl">
              A custom AI chatbot, trained on the brand.
            </h2>
            <div
              className="space-y-4 text-base md:text-[17px] leading-relaxed max-w-3xl"
              style={{ color: "rgba(148,163,184,0.9)" }}
            >
              <p>
                Most small brands can't afford round-the-clock customer support.
                Nimbus Essence is a two-person team preparing to launch — every
                unanswered question is a lost customer.
              </p>
              <p>
                So I built them an on-site chatbot trained on their own product
                data, brand story, and ingredient information. Visitors can ask
                questions about the products, the brand's values, or how to use
                the shampoo, and get accurate, brand-voice answers in seconds —
                automatically, without a human involved.
              </p>
              <p>
                It runs silently in the background. When sales open, it becomes
                their first line of customer service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ TIMELINE ============ */}
      <section className="px-6 pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="section-label mb-4">Timeline</div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
            Built fast, refined carefully.
          </h2>

          <div className="max-w-3xl space-y-6">
            {timeline.map((t, i) => (
              <div key={i} className="flex items-start gap-6">
                <div
                  className="flex-shrink-0 text-xs font-semibold"
                  style={{
                    color: "#67e8f9",
                    letterSpacing: "0.5px",
                    paddingTop: "6px",
                    minWidth: "90px",
                  }}
                >
                  {t.label}
                </div>
                <div
                  className="flex-1 pb-6"
                  style={{
                    borderBottom:
                      i < timeline.length - 1
                        ? "1px solid rgba(99,179,237,0.08)"
                        : "none",
                  }}
                >
                  <p
                    className="text-[15px] leading-[1.7]"
                    style={{ color: "rgba(148,163,184,0.9)" }}
                  >
                    {t.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ OUTCOME ============ */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="section-label mb-4">Outcome</div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 max-w-3xl">
            Launched, live, ready to sell.
          </h2>
          <div
            className="space-y-4 text-base md:text-[17px] leading-relaxed max-w-3xl"
            style={{ color: "rgba(148,163,184,0.88)" }}
          >
            <p>
              Nimbus Essence launched with a professional brand presence, a live
              product page, WooCommerce infrastructure configured and ready,
              and an AI chatbot handling enquiries autonomously.
            </p>
            <p>
              The client's roadmap is to enable payment processing and add their
              full product line over time. When they're ready, the site needs no
              rework — just products and a switch flipped.
            </p>
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="px-6 pb-24">
        <div className="max-w-5xl mx-auto">
          <div
            className="rounded-2xl p-8 md:p-12 text-center"
            style={{
              background:
                "linear-gradient(135deg, rgba(59,130,246,0.08), rgba(6,182,212,0.04))",
              border: "1px solid rgba(99,179,237,0.15)",
            }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Have a similar project?
            </h2>
            <p
              className="text-base mb-8 max-w-xl mx-auto"
              style={{ color: "rgba(148,163,184,0.85)" }}
            >
              I build brand sites, stores, and custom web tools. Let's talk.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/contact" className="btn-primary">
                Get in Touch
              </Link>
              <Link href="/work" className="btn-secondary">
                Back to Work
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}