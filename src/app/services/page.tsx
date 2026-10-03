"use client";
import { useEffect } from "react";
import Link from "next/link";

const cards = [
  { title: "Standard WordPress Site", price: "$150", color: "card-blue", accent: "rgba(59,130,246,0.1)", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>, desc: "Professional websites built using optimized pre-made templates — fast to launch, fully responsive, and easy to manage." },
  { title: "Custom Code Website", price: "$300", color: "card-cyan", accent: "rgba(6,182,212,0.1)", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>, desc: "High-performance hand-coded web apps using React, Next.js, Vite, or HTML — built for extreme speed, SEO, and design freedom." },
  { title: "WooCommerce Store", price: "$250", color: "card-purple", accent: "rgba(139,92,246,0.1)", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>, desc: "Full e-commerce setup with products, payments, and everything you need to sell online confidently from day one." },
  { title: "WordPress Support & Tasks", price: "$15", color: "card-green", accent: "rgba(16,185,129,0.1)", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>, desc: "Need a plugin set up, a page added, or a blog configured? Whatever your WordPress site needs — I'll handle it fast." },
  { title: "Landing Page", price: "$60", color: "card-amber", accent: "rgba(245,158,11,0.1)", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>, desc: "A focused, conversion-driven landing page for your product, service, or campaign — built in WordPress or as custom code." },
  { title: "Custom Feature / Page Edits", price: "", priceLabel: "Based on work", color: "card-indigo", accent: "rgba(99,102,241,0.1)", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>, desc: "Modifications, new pages, layout changes, or feature expansions for existing hand-coded websites. Quoted clearly based on scope." },
  { title: "Bug & Error Fixing", price: "$25", color: "card-rose", accent: "rgba(244,63,94,0.1)", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f43f5e" strokeWidth="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>, desc: "Fast, reliable fixes for any WordPress issue — white screens, plugin conflicts, errors, and more. Message first to confirm." },
  { title: "Website Maintenance", price: "$25", priceNote: "/mo", color: "card-teal", accent: "rgba(20,184,166,0.1)", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#14b8a6" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, desc: "Keep your site updated, secure, and running smoothly with ongoing monthly support, backups, and security checks." },
  { title: "Domain & Hosting Setup", price: "$25", color: "card-pink", accent: "rgba(236,72,153,0.1)", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>, desc: "Not technical? I'll handle everything — domain registration, hosting config, WordPress install, SSL, and full handover to you." },
];

const whyCards = [
  { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>, title: "Custom Builds, Your Way", desc: "Every project is tailored specifically to you — designed and built to match your goals, not a cookie-cutter output." },
  { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>, title: "Clear Communication", desc: "Updates at every stage. You'll always know what's happening, what's next, and when to expect delivery." },
  { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>, title: "Revisions Until You're Happy", desc: "I don't consider a project done until you're genuinely satisfied with the result — no limits on feedback." },
  { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, title: "Fast Turnaround", desc: "I respond within 24 hours and keep projects moving without unnecessary delays or radio silence." },
];

const serviceDetails = [
  { id: "wp-standard", num: "Service 01", title: "Standard WordPress Site", color: "#3b82f6", bg: "#0a1020", border: "rgba(59,130,246,0.15)", checkBg: "rgba(59,130,246,0.15)", gradient: "linear-gradient(90deg,#3b82f6,#06b6d4)", priceFrom: "Starting from", priceAmount: "$150", pricePer: "— final price depends on scope", cta: "Get a Quote", includesTitle: "What's included",
    paragraphs: ["Need a professional website up and running quickly? I'll build your WordPress site using high-quality, optimised pre-made templates — customised to your brand, your content, and your goals. Fast to launch without compromising on quality.", "Perfect for businesses, blogs, portfolios, and anyone who wants a great-looking site without the wait or premium price tag of a fully custom build."],
    includes: [["Template setup & customisation","Branded to your colours, fonts, and content"],["Mobile and tablet responsive","Looks great on all screen sizes"],["Contact forms and social links","Ready for visitors to reach you"],["Basic on-page SEO setup","Meta titles, descriptions, clean structure"],["Easy-to-manage admin panel","Update content yourself with no tech skills"],["Revisions until you're satisfied","We don't stop until you're happy"]] },
  { id: "custom-code", num: "Service 02", title: "Custom Code Website", color: "#06b6d4", bg: "#060b14", border: "rgba(6,182,212,0.15)", checkBg: "rgba(6,182,212,0.12)", gradient: "linear-gradient(90deg,#06b6d4,#0284c7)", priceFrom: "Starting from", priceAmount: "$300", pricePer: "— varies by complexity", cta: "Get a Quote", includesTitle: "What's included", reverse: true,
    paragraphs: ["Want something that stands out and performs at the highest level? I build fully hand-coded websites using React, Next.js, Vite, or plain HTML/CSS/JS — no page builders, no bloat, just clean and fast code built exactly to your specification.", "These sites load faster, score better on Core Web Vitals, and give you complete design freedom. Deployed on Vercel for blazing performance. Basic on-page SEO is included at no extra charge."],
    includes: [["Fully hand-coded build","React, Next.js, Vite, or HTML — your choice"],["Vercel deployment","Lightning-fast hosting on a global CDN"],["Fully responsive design","Pixel-perfect on every device and screen"],["Basic on-page SEO — free","Meta tags, clean structure, and fast load times"],["Custom animations & interactions","Smooth, modern UI that impresses"],["Source code delivered","You own everything — full handover"]] },
  { id: "woocommerce", num: "Service 03", title: "WooCommerce Online Store", color: "#8b5cf6", bg: "#0a1020", border: "rgba(139,92,246,0.15)", checkBg: "rgba(139,92,246,0.12)", gradient: "linear-gradient(90deg,#8b5cf6,#6d28d9)", priceFrom: "Starting from", priceAmount: "$250", pricePer: "— varies by store size", cta: "Get a Quote", includesTitle: "What's included",
    paragraphs: ["Ready to sell online? I'll set up a fully functional WooCommerce store — from product listings and categories to payment gateways and checkout pages. Everything you need to start selling confidently from day one.", "Works for physical products, digital downloads, services, and more. If you need an online store, I'll build it right."],
    includes: [["Full WooCommerce setup","Products, categories, variations configured"],["Payment gateway integration","PayPal, Stripe, and more"],["Cart and checkout pages","Clean, conversion-focused flow"],["Mobile responsive store","Customers can shop from any device"],["Order and inventory management","Easy backend for you to manage"]] },
  { id: "wp-tasks", num: "Service 04", title: "WordPress Support & On-Demand Tasks", color: "#10b981", bg: "#060b14", border: "rgba(16,185,129,0.15)", checkBg: "rgba(16,185,129,0.12)", gradient: "linear-gradient(90deg,#10b981,#059669)", priceFrom: "Starting from", priceAmount: "$15", pricePer: "— based on task complexity", cta: "Describe Your Task", includesTitle: "Examples of tasks I can do", reverse: true,
    paragraphs: ["Don't need a full website build — just something done on your existing WordPress site? Whether it's setting up a plugin, adding a new page, configuring your blog, or any other WordPress task, I'll handle it quickly and professionally.", "Tell me what you need, and I'll give you a clear quote based on the work involved. No task is too small."],
    includes: [["Plugin setup & configuration","Install, activate, and configure any plugin"],["Adding new pages or posts","Custom pages, blog posts, landing pages"],["Blog setup for new sites","Full blog section configured and ready"],["Minor design tweaks","Colours, fonts, layouts, spacing"],["Anything else WordPress-related","Just ask — if it's on WordPress, I can help"]] },
  { id: "landing-page", num: "Service 05", title: "Landing Page", color: "#f59e0b", bg: "#0a1020", border: "rgba(245,158,11,0.15)", checkBg: "rgba(245,158,11,0.12)", gradient: "linear-gradient(90deg,#f59e0b,#d97706)", priceFrom: "Starting from", priceAmount: "$60", pricePer: "— based on complexity", cta: "Get a Quote", includesTitle: "What's included",
    paragraphs: ["Need a single, focused page that converts visitors into customers? I build high-quality landing pages for products, services, campaigns, events, or anything else you want to promote — designed to capture attention and drive action.", "Available as a WordPress page or a fully custom-coded standalone page — whichever fits your setup best."],
    includes: [["WordPress or custom-coded","You choose the platform that suits your needs"],["Conversion-focused design","Built to drive signups, sales, or enquiries"],["Fully mobile responsive","Looks sharp on every screen size"],["Call-to-action sections","Hero, features, testimonials, CTA — whatever you need"],["Contact form or lead capture","Ready to collect enquiries from day one"],["Revisions until you're happy","We keep refining until it's right"]] },
  { id: "custom-edits", num: "Service 06", title: "Custom Feature & Page Edits", color: "#6366f1", bg: "#060b14", border: "rgba(99,102,241,0.15)", checkBg: "rgba(99,102,241,0.12)", gradient: "linear-gradient(90deg,#6366f1,#4f46e5)", priceFrom: "Price", priceAmount: "Based on work", pricePer: "", cta: "Describe Your Project", includesTitle: "What I can help with", reverse: true, amountSmall: true,
    paragraphs: ["Already have a hand-coded website built with HTML, React, or Next.js and need changes made? I can modify layouts, add new pages, update content, swap out features, or expand functionality on any existing custom-coded site.", "Every project is quoted clearly upfront based on the scope of work — no surprises. Just reach out, describe what you need, and I'll give you an accurate price."],
    includes: [["Layout & design changes","Update the look and feel of existing pages"],["Adding new pages or sections","Expand your site without rebuilding it"],["Feature additions","New components, forms, interactions"],["Content & asset updates","Text, images, links, and media swaps"],["Works on any stack","HTML, React, Next.js, Vite — no problem"]] },
  { id: "bug-fixing", num: "Service 07", title: "WordPress Bug & Error Fixing", color: "#f43f5e", bg: "#0a1020", border: "rgba(244,63,94,0.15)", checkBg: "rgba(244,63,94,0.12)", gradient: "linear-gradient(90deg,#f43f5e,#e11d48)", priceFrom: "Starting from", priceAmount: "$25", pricePer: "— based on issue complexity", cta: "Describe Your Issue", includesTitle: "Issues I can fix",
    paragraphs: ["Is your WordPress site broken, throwing errors, or just not working right? I diagnose and fix WordPress issues quickly and reliably — from critical errors to plugin conflicts to layout breaks.", "Please message me first before ordering so I can review your issue and confirm I can fix it before you commit."],
    includes: [["White screen of death","Critical errors and fatal PHP issues"],["Plugin and theme conflicts","After updates or new installs"],["404, 500, redirect errors","Server and .htaccess related issues"],["Database and login issues","Connection errors and lockouts"],["Layout and CSS breaks","Broken menus, headers, footers"],["WooCommerce issues","Checkout, payment, and order problems"]] },
  { id: "maintenance", num: "Service 08", title: "Website Maintenance & Management", color: "#14b8a6", bg: "#060b14", border: "rgba(20,184,166,0.15)", checkBg: "rgba(20,184,166,0.12)", gradient: "linear-gradient(90deg,#14b8a6,#0d9488)", priceFrom: "Starting from", priceAmount: "$25", pricePer: "/month", cta: "Get a Quote", includesTitle: "What's included", reverse: true,
    paragraphs: ["Your website needs regular attention to stay fast, secure, and working properly. I'll handle the ongoing maintenance so you can focus on your business without worrying about your site.", "Updates, backups, security checks, and performance monitoring — all taken care of on a monthly basis."],
    includes: [["WordPress core updates","Always on the latest stable version"],["Plugin and theme updates","Safe updates with compatibility checks"],["Regular backups","Your data is always safe and recoverable"],["Security monitoring","Spam, malware, and intrusion checks"],["Minor fixes included","Small tweaks and adjustments at no extra cost"]] },
  { id: "hosting-setup", num: "Service 09", title: "Domain & Hosting Setup", color: "#ec4899", bg: "#0a1020", border: "rgba(236,72,153,0.15)", checkBg: "rgba(236,72,153,0.12)", gradient: "linear-gradient(90deg,#ec4899,#db2777)", priceFrom: "My service fee starting from", priceAmount: "$25", pricePer: "", cta: "Get Started", includesTitle: "What's included in my service",
    paragraphs: ["Not technical and don't know where to start? No problem at all. I'll handle everything — buying the domain, setting up hosting, configuring DNS, installing WordPress or deploying your React/Next.js app to Vercel, and handing you a fully ready site.", "Perfect for anyone who just wants to get started without the technical headaches."],
    disclaimer: "The $25 fee covers my setup work only. Domain registration and hosting subscription costs are <strong>paid separately by you</strong> directly to the provider. I'll recommend the best options based on your budget and needs.",
    includes: [["Domain purchase and setup","I'll register and configure your domain name"],["Hosting configuration","Traditional hosting or Vercel for custom apps"],["WordPress or app installation","Clean install ready for development"],["SSL certificate setup","Your site secured with HTTPS at no extra charge"],["Full handover to you","Admin access and everything documented clearly"]],
    footerNote: "Domain & hosting costs are not included in my fee and must be paid separately. Typical costs: domain ~$25–15/year, hosting ~$3–10/month. Vercel has a generous free tier for custom code projects." },
];

export default function ServicesPage() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).style.animationPlayState = "running";
        }
      });
    }, { threshold: 0.1 });
    const els = document.querySelectorAll(".svc-card, .why-card");
    els.forEach((el) => {
      (el as HTMLElement).style.animationPlayState = "paused";
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section className="page-hero">
        <div className="page-hero-bg" />
        <div className="page-hero-grid" />
        <div className="page-hero-inner">
          <div className="page-badge"><div className="badge-dot" />What We Offer</div>
          <h1>Full-Stack Web <span>Services</span></h1>
          <p>From blazing-fast custom-coded apps to powerful WordPress sites — every service is delivered with care, clear communication, and a focus on results.</p>
          <p className="hero-note">All prices are starting rates. Contact for a custom quote based on your project.</p>
        </div>
      </section>

      <section className="cards-section">
        <div className="cards-grid">
          {cards.map((c, i) => (
            <div key={i} className={`svc-card ${c.color}`}>
              <div className="svc-card-icon" style={{ background: c.accent }}>{c.icon}</div>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
              <div className="svc-card-footer">
                <div className="svc-price">
                  {c.price ? <>From <span>{c.price}{c.priceNote && <small style={{ fontSize: 11, color: "#64748b" }}>{c.priceNote}</small>}</span></> : <span style={{ fontSize: 15 }}>{c.priceLabel}</span>}
                </div>
                <div className="svc-arrow">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {serviceDetails.map((s, idx) => (
        <section key={s.id} className="svc-detail" id={s.id}>
          <div className={`svc-detail-inner ${s.reverse ? "reverse" : ""}`}>
            <div className="svc-detail-text">
              <div className="section-label">{s.num}</div>
              <h2>{s.title}</h2>
              {s.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
              <div className="price-tag">
                <span className="from">{s.priceFrom}</span>
                <span className="amount" style={s.amountSmall ? { fontSize: 22 } : undefined}>{s.priceAmount}</span>
                {s.pricePer && <span className="per">{s.pricePer}</span>}
              </div>
              {s.disclaimer && (
                <div className="disclaimer-box">
                  <p dangerouslySetInnerHTML={{ __html: `<strong>Please note:</strong> ${s.disclaimer}` }} />
                </div>
              )}
              <Link className="cta-small" href="/contact">{s.cta}</Link>
            </div>
            <div className="svc-detail-visual" style={{ background: s.bg, border: `1px solid ${s.border}` }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: s.gradient, borderRadius: "18px 18px 0 0" }} />
              <div className="includes-title">{s.includesTitle}</div>
              {s.includes.map(([t, d], i) => (
                <div key={i} className="include-item">
                  <div className="include-check" style={{ background: s.checkBg }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={s.color} strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                  </div>
                  <span dangerouslySetInnerHTML={{ __html: `<strong>${t}</strong>${d}` }} />
                </div>
              ))}
              {s.footerNote && (
                <div style={{ marginTop: 20, paddingTop: 16, borderTop: `1px solid ${s.color}1A` }}>
                  <p style={{ fontSize: 12, color: "#64748b", lineHeight: 1.7 }}>
                    <strong style={{ color: s.color }}>{s.footerNote.split(" are")[0]} are</strong>{s.footerNote.includes(" are") ? s.footerNote.substring(s.footerNote.indexOf(" are") + 4) : s.footerNote}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      ))}

      <section className="why-section">
        <div className="why-sitecroft-inner">
          <div className="why-sitecroft-header">
            <div className="section-label">Why Sitecroft</div>
            <h2 className="section-title">What Makes Working With Me Different</h2>
            <p className="section-sub">Every service comes with the same commitment to quality, communication, and your satisfaction.</p>
          </div>
          <div className="why-grid">
            {whyCards.map((card, i) => (
              <div key={i} className="why-card">
                <div className="why-card-icon" style={{ background: "rgba(59,130,246,0.1)" }}>{card.icon}</div>
                <div><h4>{card.title}</h4><p>{card.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta">
        <h2>Not Sure Which Service <span>You Need?</span></h2>
        <p>Just reach out and describe what you're looking for. I'll guide you to the right solution and give you a clear quote.</p>
        <div className="cta-btns">
          <Link className="btn-primary" href="/contact">Contact Me</Link>
          <Link className="btn-secondary" href="/faq">Read the FAQ</Link>
        </div>
        <p className="cta-note">No commitment required. Free consultation on every project.</p>
      </section>
    </>
  );
}