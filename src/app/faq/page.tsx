"use client";
import { useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";

const faqData = [
  {
    category: "General",
    items: [
      { q: "What services does Sitecroft offer?", a: "Sitecroft offers a full range of web development services — from custom-coded apps built with React, Next.js, and Vite to powerful WordPress sites, WooCommerce stores, landing pages, bug fixing, maintenance, and domain/hosting setup. Whether you need a hand-coded performance-first website or a managed WordPress solution, I've got you covered." },
      { q: "Who is behind Sitecroft?", a: "Sitecroft is run by Saad — a full-stack web developer and automation engineer based in Karachi, Pakistan. Every project is handled personally with full attention and care, from initial consultation to final delivery." },
      { q: "Do you work with international clients?", a: "Yes, absolutely. Sitecroft works with clients globally. Communication happens online and projects are delivered remotely regardless of your location." },
      { q: "How do I get started?", a: "Simply go to the Contact page, describe what you need, and I'll get back to you within 24 hours with a plan and quote. No commitment required to reach out." },
      { q: "Do you build both custom-coded and WordPress sites?", a: "Yes. I build high-performance hand-coded websites using React, Next.js, Vite, or plain HTML/CSS/JS deployed on Vercel. I also build professional WordPress sites using optimised templates. You choose the approach that fits your needs best." },
    ],
  },
  {
    category: "Website Development",
    items: [
      { q: "Do you build websites from scratch or use templates?", a: "For custom-coded projects, every line of code is written by hand — no page builders, no bloat. For WordPress sites, I use high-quality optimised templates customised to your brand, colours, and content. Both approaches deliver a fully tailored result." },
      { q: "How long does it take to build a website?", a: "It depends on complexity. A simple landing page or WordPress site can be ready in 2–5 days. A custom-coded multi-page website or WooCommerce store typically takes 1–3 weeks. I always provide a clear timeline before we begin." },
      { q: "Will my website be mobile friendly?", a: "Yes — every website I build is fully responsive and tested across phones, tablets, and desktops. Mobile-friendliness is a standard part of every project, not an add-on." },
      { q: "Can I update the website myself after it's built?", a: "For WordPress sites, yes — you get an easy-to-use admin panel to update text, images, and content without technical knowledge. For custom-coded sites, I can set up a headless CMS or provide guidance on making content changes. I'll walk you through everything after delivery." },
      { q: "What types of websites can you build?", a: "Business websites, portfolios, blogs, online stores (WooCommerce), landing pages, SaaS dashboards, web applications, and more — on either WordPress or as custom-coded React/Next.js apps." },
      { q: "Can you redesign my existing website?", a: "I focus on building new projects from scratch rather than reskinning existing sites. If you want a better website, we start fresh — whether that's on WordPress or as a custom-coded build." },
    ],
  },
  {
    category: "Custom Code & Performance",
    items: [
      { q: "What does a custom-code website include?", a: "A fully hand-coded website using your choice of React, Next.js, Vite, or plain HTML/CSS/JS. It includes Vercel deployment on a global CDN, fully responsive design, custom animations and interactions, basic on-page SEO, and complete source code delivery." },
      { q: "Why choose a custom-code site over WordPress?", a: "Custom-coded sites load faster, score higher on Core Web Vitals, give you complete design freedom without template limitations, and are deployed on Vercel for blazing performance. They're ideal for brands that need maximum speed, flexibility, and a unique online presence." },
      { q: "Can I get a landing page as custom code or WordPress?", a: "Both options are available. I build conversion-driven landing pages in WordPress or as standalone custom-coded pages — whichever fits your setup best. Prices start from $20." },
      { q: "Do you handle hosting and deployment for custom sites?", a: "Yes. Custom-coded sites are deployed on Vercel (which has a generous free tier). I handle the full deployment process — domain configuration, SSL setup, and launch. Ongoing maintenance packages are also available." },
    ],
  },
  {
    category: "Pricing & Payment",
    items: [
      { q: "How much does a website cost?", a: "Prices vary based on scope and complexity: Standard WordPress sites from $50, Custom-coded websites from $100, WooCommerce stores from $80, Landing pages from $20, Bug fixing from $10, and Maintenance from $10/month. Contact me with your requirements for an accurate quote." },
      { q: "Do you offer refunds?", a: "Refund availability depends on the project stage and service type. I work with revisions until you're satisfied to avoid this situation. Please review the Terms of Service for full details." },
      { q: "How many revisions do I get?", a: "I offer revisions until you're genuinely satisfied with the result. The goal is for you to be happy with what's delivered — not to limit your feedback." },
    ],
  },
  {
    category: "After Delivery",
    items: [
      { q: "What happens after the website is launched?", a: "I stay available after launch for any small fixes or adjustments needed. For ongoing support, I also offer monthly maintenance packages to keep your site updated, secure, and running smoothly." },
      { q: "Do you offer ongoing maintenance?", a: "Yes. Monthly maintenance packages start from $10/month and include WordPress updates (for WP sites), plugin updates, backups, security checks, and minor fixes." },
      { q: "Can I contact you if something breaks after delivery?", a: "Absolutely. If something I built breaks shortly after delivery due to my work, I'll fix it at no extra charge. For issues caused by third-party changes or external updates, my bug fixing service applies." },
    ],
  },
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (catIdx: number, itemIdx: number) => {
    const key = `${catIdx}-${itemIdx}`;
    setOpenItems((prev) => {
      const next: Record<string, boolean> = {};
      // Close all others, toggle this one
      Object.keys(prev).forEach((k) => { next[k] = false; });
      next[key] = !prev[key];
      return next;
    });
  };

  return (
    <>
      <section className="page-hero">
        <div className="page-hero-bg" />
        <div className="page-hero-grid" />
        <div className="page-hero-inner">
          <div className="page-badge"><div className="badge-dot" />Got Questions?</div>
          <h1>Frequently Asked <span>Questions</span></h1>
          <p>Everything you need to know before getting started. Can't find the answer? Just reach out directly.</p>
        </div>
      </section>

      <section className="faq-section">
        <div className="faq-inner">
          {faqData.map((cat, catIdx) => (
            <div key={cat.category} className="faq-category">
              <div className="faq-cat-label">{cat.category}</div>
              {cat.items.map((item, itemIdx) => {
                const key = `${catIdx}-${itemIdx}`;
                const isOpen = openItems[key];
                return (
                  <div key={itemIdx} className={`faq-item ${isOpen ? "open" : ""}`}>
                    <div className="faq-question" onClick={() => toggleItem(catIdx, itemIdx)}>
                      <h4>{item.q}</h4>
                      <div className="faq-icon">
                        <Plus size={14} stroke={isOpen ? "#06b6d4" : "#64748b"} />
                      </div>
                    </div>
                    <div className={`faq-answer ${isOpen ? "open" : ""}`}>
                      <p dangerouslySetInnerHTML={{ __html: item.a }} />
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </section>

      <section className="cta">
        <h2>Still Have a <span>Question?</span></h2>
        <p>Just reach out directly and I'll get back to you within 24 hours.</p>
        <div className="cta-btns">
          <Link className="btn-primary" href="/contact">Contact Me</Link>
          <Link className="btn-secondary" href="/services">View Services</Link>
        </div>
      </section>
    </>
  );
}