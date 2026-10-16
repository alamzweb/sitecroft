"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import AutomationCard from "@/components/AutomationCard";

type ProjectStatus = "Live" | "Demo";

interface Project {
  title: string;
  description: string;
  techStack: string[];
  category: string;
  liveUrl: string;
  image: string;
  isClientProject: boolean;
  status?: ProjectStatus;
  caseStudyUrl?: string;
}

const projects: Project[] = [
  {
    title: "LinkFilo",
    description: "LinkFilo provides a straightforward way for you to upload any file and receive a unique shareable link instantly. This tool helps you share files with others quickly and easily, offering free file sharing capabilities for everyone.",
    techStack: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
    category: "SaaS",
    liveUrl: "https://linkfilo.dnnengineer.com",
    image: "/linkfilo.png",
    isClientProject: false,
    status: "Live",
  },
  {
    title: "GridLeap",
    description: "GridLeap is a zero-budget SaaS that instantly transforms static, messy CSV files into professional, mobile-friendly web dashboards to help small international organizations—like schools, clinics, and shops.",
    techStack: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
    category: "SaaS",
    liveUrl: "https://gridleap.vercel.app/",
    image: "/gridleap.png",
    isClientProject: false,
    status: "Live",
  },
  {
    title: "Nimbus Essence",
    description: "Nimbus Essence offers premium, gentle skincare and haircare products made with safe, ethical ingredients. Designed for all skin and hair types, it helps you achieve natural beauty and confidence every day.",
    techStack: ["WordPress", "WooCommerce", "HTML", "CSS"],
    category: "E-Commerce",
    liveUrl: "https://nimbusessence.org",
    image: "/nimbusessence.png",
    isClientProject: true,
    caseStudyUrl: "/work/nimbus-essence",
  },
  {
    title: "Flawless",
    description: "A premium skincare and beauty brand offering organic, natural care products with clean aesthetics and professional-grade formulations for everyday customers.",
    techStack: ["WordPress", "WooCommerce", "Elementor", "Astra"],
    category: "E-Commerce",
    liveUrl: "https://web.dnnengineer.com/cosmetics/",
    image: "/cosmetics.png",
    isClientProject: false,
    status: "Demo",
  },
  {
    title: "Plumbers Guild of America",
    description: "A professional organization connecting homeowners with 1,500+ verified plumbing contractors across all 50 states, offering directories, training, and industry resources.",
    techStack: ["WordPress", "Elementor", "bbPress", "Astra"],
    category: "Web App",
    liveUrl: "https://web.dnnengineer.com/contractors/",
    image: "/contractors.png",
    isClientProject: false,
    status: "Demo",
  },
  {
    title: "Real Estate",
    description: "A modern property platform offering a curated selection of residential and commercial listings with clean layouts and intuitive filtering for home seekers.",
    techStack: ["WordPress", "Elementor", "Astra"],
    category: "Web App",
    liveUrl: "https://web.dnnengineer.com/realestate/",
    image: "/realestate.png",
    isClientProject: false,
    status: "Demo",
  },
  {
    title: "Cosmetics",
    description: "A premium multi-brand beauty store offering authentic skincare and ethical cosmetic products with sustainable sourcing and a seamless shopping experience.",
    techStack: ["WordPress", "WooCommerce", "Elementor", "Astra"],
    category: "E-Commerce",
    liveUrl: "https://web.dnnengineer.com/cosmetics-1/",
    image: "/cosmetics-1.png",
    isClientProject: false,
    status: "Demo",
  },
  {
    title: "The Burger Bistro Pizza Studio",
    description: "A digital restaurant menu for a Karachi-based bistro offering burgers, pizzas, and broast with detailed pricing, contact info, and easy directions.",
    techStack: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
    category: "Food & Beverage",
    liveUrl: "https://bistro-studio-site.wasmer.app/",
    image: "/bistro-studio-site.png",
    isClientProject: false,
    status: "Demo",
  },
  {
    title: "NOCTE — A Night Worth Remembering",
    description: "An intimate late-night dining lounge in Karachi offering fire-forward plates, seasonal cocktails, and modern European cooking in an atmospheric, reservation-only setting.",
    techStack: ["HTML", "CSS", "JavaScript"],
    category: "Food & Beverage",
    liveUrl: "https://nocte.wasmer.app/",
    image: "/nocte.png",
    isClientProject: false,
    status: "Demo",
  },
  {
    title: "Lumière",
    description: "A premium single-page portfolio for a portrait & editorial photography studio, featuring a parallax hero, masonry gallery with filters, custom lightbox, and 3D tilt cards.",
    techStack: ["HTML", "CSS", "JavaScript"],
    category: "Portfolio",
    liveUrl: "https://lumiere.wasmer.app/",
    image: "/lumiere.png",
    isClientProject: false,
    status: "Demo",
  },
  {
    title: "Inkwell",
    description: "A warm, editorial single-page portfolio for an essayist, featuring a cinematic dark hero, layered manuscript card, drop-cap pull quotes, and an essay archive with thumbnails.",
    techStack: ["HTML", "CSS", "JavaScript"],
    category: "Portfolio",
    liveUrl: "https://ink-well.wasmer.app/",
    image: "/inkwell.png",
    isClientProject: false,
    status: "Demo",
  },
  {
    title: "Momentum",
    description: "A high-conversion course landing page with a live countdown timer, 3D feature cards, curriculum and FAQ accordions, and a three-tier pricing section.",
    techStack: ["HTML", "CSS", "JavaScript"],
    category: "Landing Page",
    liveUrl: "https://momentum1.wasmer.app",
    image: "/momentum.png",
    isClientProject: false,
    status: "Demo",
  },
  {
    title: "Orbit",
    description: "A dark, tech-forward app landing page with a CSS-only 3D phone mockup, animated timer ring, scroll reveals, and a deep navy + electric lime palette.",
    techStack: ["HTML", "CSS", "JavaScript"],
    category: "Landing Page",
    liveUrl: "https://orbit1.wasmer.app/",
    image: "/orbit.png",
    isClientProject: false,
    status: "Demo",
  },
  {
    title: "Haven",
    description: "A quiet, editorial portfolio for an architecture studio — with staggered project layouts, a label cursor, slow image reveals, and Instrument Serif typography.",
    techStack: ["HTML", "CSS", "JavaScript"],
    category: "Business",
    liveUrl: "https://haven1.wasmer.app",
    image: "/haven.png",
    isClientProject: false,
    status: "Demo",
  },
  {
    title: "Sterling & Vance",
    description: "A trust-focused site for a corporate law firm — featuring practice areas, attorney profiles, case results, and a consultation form, in a navy and gold palette.",
    techStack: ["HTML", "CSS", "JavaScript"],
    category: "Business",
    liveUrl: "https://sterling-vance.wasmer.app/",
    image: "/sterling-vance.png",
    isClientProject: false,
    status: "Demo",
  },
  {
    title: "Lumen Dental",
    description: "A friendly, modern dental clinic website with online booking, service cards, patient reviews, and a new-patient offer banner — in a soft mint and teal palette.",
    techStack: ["HTML", "CSS", "JavaScript"],
    category: "Business",
    liveUrl: "https://lumen-dental.wasmer.app/",
    image: "/lumen-dental.png",
    isClientProject: false,
    status: "Demo",
  },
  {
    title: "Northshore Medical",
    description: "A multi-specialty medical practice website with specialties, provider profiles, patient journey steps, insurance info, and a booking form — in a calm cornflower blue palette.",
    techStack: ["HTML", "CSS", "JavaScript"],
    category: "Business",
    liveUrl: "https://northshore-medical.wasmer.app",
    image: "/northshore-medical.png",
    isClientProject: false,
    status: "Demo",
  },
  {
    title: "Wellspring",
    description: "A nonprofit donation page for a clean water charity — with live impact counters, an interactive donation widget that shows real-time impact, and a transparency chart.",
    techStack: ["HTML", "CSS", "JavaScript"],
    category: "Landing Page",
    liveUrl: "https://wellspring.wasmer.app/",
    image: "/wellspring.png",
    isClientProject: false,
    status: "Demo",
  },
  {
    title: "Qovila",
    description: "A client request management portal for web agencies — with centralized project requests, status tracking, priorities, deadlines, comments, file attachments, team management, and separate client workspaces.",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    category: "SaaS",
    liveUrl: "https://qovila.vercel.app/",
    image: "/qovila.png",
    isClientProject: false,
    status: "Live",
  },
  {
    title: "Ledger",
    description: "A fully working personal expense tracker with add/edit/delete, category breakdowns, monthly navigation, daily spending chart, undo, and localStorage persistence — built with pure HTML, CSS & JavaScript.",
    techStack: ["HTML", "CSS", "JavaScript"],
    category: "App",
    liveUrl: "https://ledger1.wasmer.app/",
    image: "/ledger.png",
    isClientProject: false,
    status: "Demo",
  },
  {
    title: "Flow",
    description: "A fully working kanban board with real drag-and-drop, inline column renaming, card editing, priorities, labels, due dates, live search, and localStorage persistence — built with pure HTML, CSS & JavaScript.",
    techStack: ["HTML", "CSS", "JavaScript"],
    category: "App",
    liveUrl: "https://flow1.wasmer.app/",
    image: "/flow.png",
    isClientProject: false,
    status: "Demo",
  },
  {
    title: "Skyline",
    description: "A live weather app using the Open-Meteo API — city search with autocomplete, geolocation, hourly and 5-day forecasts, and dynamic backgrounds that change with the weather. Built with pure HTML, CSS & JavaScript.",
    techStack: ["HTML", "CSS", "JavaScript", "Open-Meteo API"],
    category: "Tool",
    liveUrl: "https://skyline.wasmer.app/",
    image: "/skyline.png",
    isClientProject: false,
    status: "Demo",
  },
  {
    title: "Quill",
    description: "A local-first markdown notes app with a hand-written markdown parser, live preview, resizable split view, formatting toolbar, task lists, export to .md, and localStorage persistence — built with pure HTML, CSS & JavaScript.",
    techStack: ["HTML", "CSS", "JavaScript"],
    category: "App",
    liveUrl: "https://quill.wasmer.app/",
    image: "/quill.png",
    isClientProject: false,
    status: "Demo",
  },
  {
    title: "Pulse",
    description: "A fully working analytics dashboard — log daily traffic and revenue, filter by date range, and see live charts, KPIs, trends, and summaries computed from real data. Export and import as JSON with localStorage persistence.",
    techStack: ["HTML", "CSS", "JavaScript"],
    category: "Dashboard",
    liveUrl: "https://pulse1.wasmer.app/",
    image: "/pulse.png",
    isClientProject: false,
    status: "Demo",
  },
];


const featuredPlugins = [
  {
    id: 1,
    title: "Admin Dashboard",
    description: "Streamlined WP admin with metrics & quick controls for faster site management.",
    authors: "Saad",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  },
  {
    id: 2,
    title: "Performance Pro",
    description: "Caching, minification & DB optimization toolkit to boost site speed.",
    authors: "Saad",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
  },
  {
    id: 3,
    title: "Schema Builder",
    description: "Automated schema markup generator for rich snippets and SEO.",
    authors: "Saad",
    image: "https://images.unsplash.com/photo-1432889821006-314940b9b1d0?w=800&q=80",
  },
];

const automations = [
  {
    title: "Gmail AI Agent",
    description: "An AI-powered Gmail Agent that automatically reads unread emails, classifies them using Gemini AI, applies custom Gmail labels, and generates context-aware draft replies directly inside Gmail.",
    techStack: ["Python", "Gemini AI"],
    media: [
      { type: "image" as const, src: "/automations/images/gmail_ai_agent_screenshot.png" },
      { type: "video" as const, src: "/automations/videos/gmail_ai_agent_demo.mp4" },
    ],
    downloadUrl: "/automations/gmail_ai_agent.zip",
    guideUrl: "/automations/guides/AI_Gmail_Assistant_Guide.pdf",
  },
];

export default function WorkPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 = left, 1 = right

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).style.animationPlayState = "running";
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".svc-card, .svc-item");
    elements.forEach((el) => {
      (el as HTMLElement).style.animationPlayState = "paused";
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Auto-rotate the carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev === featuredPlugins.length - 1 ? 0 : prev + 1));
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const goPrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev === 0 ? featuredPlugins.length - 1 : prev - 1));
  };

  const goNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev === featuredPlugins.length - 1 ? 0 : prev + 1));
  };

  const active = featuredPlugins[activeIndex];

  return (
    <>
      <section className="page-hero">
        <div className="page-hero-bg" />
        <div className="page-hero-grid" />
        <div className="page-hero-inner">
          <div className="page-badge">
            <div className="badge-dot" />
            Portfolio
          </div>
          <h1>
            My <span>Work</span>
          </h1>
          <p>
            A showcase of high-performance web solutions, custom applications, and automation tools.
          </p>
        </div>
      </section>

      {/* Websites Section */}
      <section className="relative py-20 px-6" style={{ background: "#060b14" }}>
        <div className="max-w-6xl mx-auto">
          <div className="section-label mb-6">Websites</div>
          <h2 className="section-title mb-4">Web Development Projects</h2>
          <p className="section-sub mb-12">
            Each project is built with performance, scalability, and user experience at the core.
          </p>

          <div className="cards-grid">
            {projects.map((project, i) => (
              <ProjectCard
                key={i}
                index={i}
                title={project.title}
                description={project.description}
                techStack={project.techStack}
                category={project.category}
                liveUrl={project.liveUrl}
                image={project.image}
                isClientProject={project.isClientProject}
                status={project.status}
                caseStudyUrl={project.caseStudyUrl}
              />
            ))}
          </div>

          <p
            className="mt-8 text-center"
            style={{
              fontSize: "11px",
              color: "rgba(148,163,184,0.6)",
              letterSpacing: "0.3px",
            }}
          >
            <span style={{ fontWeight: 700, color: "rgba(148,163,184,0.8)" }}>Live</span>
            {" "}— real, deployed project ·{" "}
            <span style={{ fontWeight: 700, color: "rgba(148,163,184,0.8)" }}>Demo</span>
            {" "}— concept / personal build
          </p>

        </div>
      </section>

      {/* Automations Section */}
      <section id="automations" className="relative py-20 px-6" style={{ background: "#060b14" }}>
        <div className="max-w-6xl mx-auto">
          <div className="section-label mb-6">Automations</div>
          <h2 className="section-title mb-4">Workflow Automations</h2>
          <p className="section-sub mb-12">
            Custom automation scripts and AI-powered pipelines that streamline repetitive tasks and boost productivity.
          </p>

          <div className="cards-grid">
            {automations.map((item, i) => (
              <AutomationCard
                key={i}
                index={i}
                title={item.title}
                description={item.description}
                techStack={item.techStack}
                media={item.media}
                downloadUrl={item.downloadUrl}
                guideUrl={item.guideUrl}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Plugins Section - Single Card Carousel */}
      <section className="relative py-20 px-6" style={{ background: "#0a1020" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <div className="section-label mb-3 justify-center" style={{ display: "flex" }}>
              <span>Plugins</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Featured Plugins</h2>
            <p className="text-sm text-slate-500 mt-3 max-w-xl mx-auto">
              Custom WordPress plugins and automation tools designed to solve real problems and streamline workflows.
            </p>
          </div>

          {/* Single Card Carousel */}
          <div
            style={{
              position: "relative",
              maxWidth: "420px",
              margin: "0 auto",
              padding: "0 60px",
            }}
          >
            {/* Prev Arrow */}
            <button
              onClick={goPrev}
              aria-label="Previous plugin"
              style={{
                position: "absolute",
                left: "0",
                top: "50%",
                transform: "translateY(-50%)",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(10,16,32,0.9)",
                border: "1px solid rgba(99,179,237,0.2)",
                cursor: "pointer",
                transition: "all 0.2s",
                color: "#e2e8f0",
                zIndex: 5,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(6,182,212,0.5)";
                e.currentTarget.style.background = "rgba(6,182,212,0.12)";
                e.currentTarget.style.transform = "translateY(-50%) scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(99,179,237,0.2)";
                e.currentTarget.style.background = "rgba(10,16,32,0.9)";
                e.currentTarget.style.transform = "translateY(-50%) scale(1)";
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            {/* Next Arrow */}
            <button
              onClick={goNext}
              aria-label="Next plugin"
              style={{
                position: "absolute",
                right: "0",
                top: "50%",
                transform: "translateY(-50%)",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(10,16,32,0.9)",
                border: "1px solid rgba(99,179,237,0.2)",
                cursor: "pointer",
                transition: "all 0.2s",
                color: "#e2e8f0",
                zIndex: 5,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(6,182,212,0.5)";
                e.currentTarget.style.background = "rgba(6,182,212,0.12)";
                e.currentTarget.style.transform = "translateY(-50%) scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(99,179,237,0.2)";
                e.currentTarget.style.background = "rgba(10,16,32,0.9)";
                e.currentTarget.style.transform = "translateY(-50%) scale(1)";
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>

            {/* Active Card - centered, clickable, navigates to /plugins */}
            <Link
              key={active.id}
              href="/plugins"
              style={{
                display: "block",
                textDecoration: "none",
                color: "inherit",
                background: "#0a1020",
                border: "1px solid rgba(99,179,237,0.1)",
                borderRadius: "16px",
                padding: "20px",
                position: "relative",
                overflow: "hidden",
                cursor: "pointer",
                transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s ease, box-shadow 0.3s, border-color 0.3s",
                transform: direction > 0 ? "translateX(0)" : "translateX(0)",
                opacity: 1,
                boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                animation: "cardSlideIn 0.5s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.borderColor = "rgba(6,182,212,0.4)";
                e.currentTarget.style.boxShadow = "0 20px 50px rgba(59,130,246,0.2), 0 0 0 1px rgba(6,182,212,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "rgba(99,179,237,0.1)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.3)";
              }}
            >
              {/* Top gradient bar */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "2px",
                  background: "linear-gradient(90deg, #3b82f6, #06b6d4)",
                  opacity: 0.8,
                }}
              />

              {/* Plugin Image */}
              <div
                style={{
                  width: "100%",
                  height: "200px",
                  borderRadius: "10px",
                  overflow: "hidden",
                  marginBottom: "16px",
                  background: "linear-gradient(135deg, rgba(59,130,246,0.1), rgba(6,182,212,0.05))",
                  border: "1px solid rgba(99,179,237,0.1)",
                  position: "relative",
                }}
              >
                <img
                  src={active.image}
                  alt={active.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>

              {/* Title */}
              <h3
                style={{
                  fontSize: "17px",
                  fontWeight: 700,
                  color: "#fff",
                  marginBottom: "8px",
                  textAlign: "center",
                }}
              >
                {active.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontSize: "13px",
                  color: "#94a3b8",
                  lineHeight: 1.55,
                  marginBottom: "14px",
                  textAlign: "center",
                }}
              >
                {active.description}
              </p>

              {/* Authors */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  paddingTop: "12px",
                  borderTop: "1px solid rgba(99,179,237,0.08)",
                  fontSize: "12px",
                  color: "#64748b",
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span>{active.authors}</span>
              </div>
            </Link>

            {/* Carousel dots */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "8px",
                marginTop: "24px",
              }}
            >
              {featuredPlugins.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setDirection(i > activeIndex ? 1 : -1);
                    setActiveIndex(i);
                  }}
                  aria-label={`Go to slide ${i + 1}`}
                  style={{
                    width: activeIndex === i ? "24px" : "8px",
                    height: "8px",
                    borderRadius: "4px",
                    background: activeIndex === i ? "#06b6d4" : "rgba(99,179,237,0.3)",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.3s",
                    padding: 0,
                  }}
                />
              ))}
            </div>
          </div>

          {/* View All Plugins CTA */}
          <div className="mt-12 text-center">
            <Link
              href="/plugins"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
                color: "#ffffff",
                padding: "14px 32px",
                borderRadius: "10px",
                fontSize: "15px",
                fontWeight: 600,
                transition: "transform 0.2s, box-shadow 0.2s",
                boxShadow: "0 0 20px rgba(59,130,246,0.25)",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 0 30px rgba(59,130,246,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 0 20px rgba(59,130,246,0.25)";
              }}
            >
              <span style={{ color: "#ffffff" }}>View All Plugins</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="relative py-20 px-6" style={{ background: "#060b14" }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Have a project in mind?</h2>
          <p className="text-base text-slate-400 mb-8">
            Let's discuss your vision and build something exceptional together.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/contact" className="btn-primary">Get in Touch</Link>
            <Link href="/services" className="btn-secondary">View Services</Link>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes cardSlideIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}