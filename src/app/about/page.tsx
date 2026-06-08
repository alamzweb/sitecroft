"use client";

import {
  MapPin,
  Globe,
  ShoppingCart,
  Wrench,
  Shield,
  Server,
  Calendar,
  Award,
  HeartHandshake,
  CheckCircle2,
  Code,
  FileText,
} from "lucide-react";
import { motion } from "framer-motion";

/* ── Profile Data ── */
const PROFILE = {
  name: "Saad",
  role: "Web Developer & Automation Engineer",
  location: "Karachi, Pakistan",
  photo: "/image.png",
  description:
    "Based in Karachi, Pakistan. I build high-performance websites using React, Next.js, and WordPress, alongside robust automation workflows using n8n. Sitecroft is my dedicated development service — built to deliver clean, fast, and functional web solutions for businesses and individuals worldwide.",
  skills: [
    "WordPress",
    "WooCommerce",
    "HTML & CSS",
    "JS",
    "React",
    "Next.js",
    "Vite",
    "TypeScript",
    "Python",
    "n8n Automation",
    "Advanced SEO",
  ],
  links: [
    { label: "Website", href: "https://dnnengineer.com" },
    { label: "GitHub", href: "https://github.com/m-saad125" },
    { label: "X", href: "https://x.com/msaad_alam" },
  ],
};

/* ── Stats ── */
const STATS = [
  { number: "2yr+", label: "WordPress Experience" },
  { number: "5+", label: "Services Offered" },
  { number: "100%", label: "Satisfaction Goal" },
];

/* ── Timeline ── */
const TIMELINE = [
  {
    date: "The Beginning",
    title: "Started Learning WordPress",
    description:
      "I started exploring WordPress out of curiosity — building small test sites, understanding how themes and plugins work, and experimenting with different setups. What started as a hobby quickly became a skill I wanted to develop seriously.",
  },
  {
    date: "Building & Testing",
    title: "Personal Projects & Practice Sites",
    description:
      "I built many personal projects and practice sites to deepen my understanding — testing different configurations, debugging real issues, and learning how to build sites that are both visually strong and technically solid.",
  },
  {
    date: "First Client Project",
    title: "nimbusessence.org — Live & Delivered",
    description:
      "My first real client project — a full WordPress website built and delivered for a live business. Working with a real client taught me a lot about understanding requirements, managing expectations, and delivering results that matter.",
  },
  {
    date: "The Shift to Code",
    title: "Diving into React & Next.js",
    description:
      "As web standards evolved, my interest in custom-coded applications grew. I dove deeply into React, Next.js, and TypeScript. Over the past 6+ months, I have built numerous testing platforms, real SaaS projects, and modern web tools, sharpening my skills to a professional level.",
  },
  {
    date: "Today",
    title: "Sitecroft — High-Performance Web Solutions for Modern Brands",
    description:
      "Sitecroft represents the culmination of everything I've learned — a versatile web development service delivering both WordPress solutions and custom-coded applications. My mission: build exceptional websites, communicate clearly, and deliver results that clients are genuinely proud of.",
  },
];

/* ── Client Project ── */
const CLIENT_PROJECT = {
  name: "Nimbus Essence",
  type: "Client Project",
  description:
    "A full WordPress website built from scratch for a live client. The project involved custom design, responsive layout, and a clean user experience tailored to the client's brand and goals.",
  tags: ["WordPress", "Custom Design", "Responsive", "Full Build"],
  url: "https://nimbusessence.org",
};

/* ── Services List ── */
const SERVICES_LIST = [
  {
    icon: Globe,
    color: "rgba(59,130,246,0.1)",
    stroke: "#3b82f6",
    title: "WordPress Development",
    description:
      "Custom WordPress websites built from scratch — responsive, fast, and tailored to your goals.",
  },
  {
    icon: Code,
    color: "rgba(34,197,94,0.1)",
    stroke: "#22c55e",
    title: "Custom Code Website",
    description:
      "High-performance websites using React, Next.js, and modern stacks — built for speed and scalability.",
  },
  {
    icon: ShoppingCart,
    color: "rgba(6,182,212,0.1)",
    stroke: "#06b6d4",
    title: "WooCommerce Store",
    description:
      "Complete e-commerce setup so you can start selling online confidently.",
  },
  {
    icon: FileText,
    color: "rgba(236,72,153,0.1)",
    stroke: "#ec4899",
    title: "Landing Page",
    description:
      "Conversion-focused landing pages designed to maximize leads and sales.",
  },
  {
    icon: Wrench,
    color: "rgba(139,92,246,0.1)",
    stroke: "#8b5cf6",
    title: "Bug & Error Fixing",
    description:
      "Fast, reliable fixes for any WordPress issue — errors, conflicts, white screens and more.",
  },
  {
    icon: Shield,
    color: "rgba(16,185,129,0.1)",
    stroke: "#10b981",
    title: "Website Maintenance",
    description:
      "Keep your site updated, secure, and performing well with ongoing support.",
  },
  {
    icon: Server,
    color: "rgba(245,158,11,0.1)",
    stroke: "#f59e0b",
    title: "Domain & Hosting Setup",
    description:
      "Full done-for-you setup — I buy, configure, and launch your hosting and domain.",
  },
];

/* ── Core Values ── */
const VALUES = [
  {
    icon: CheckCircle2,
    color: "rgba(59,130,246,0.1)",
    stroke: "#3b82f6",
    title: "Quality First",
    description:
      "Every site I build is crafted with attention to detail. Clean code, clean design, and clean results — no cutting corners.",
  },
  {
    icon: HeartHandshake,
    color: "rgba(6,182,212,0.1)",
    stroke: "#06b6d4",
    title: "Honest Communication",
    description:
      "I keep you informed at every step. If there's a challenge, I tell you. If there's a better way, I suggest it.",
  },
  {
    icon: Award,
    color: "rgba(16,185,129,0.1)",
    stroke: "#10b981",
    title: "Client Satisfaction",
    description:
      "Your satisfaction is the only metric that matters. Revisions continue until you're genuinely happy with the result.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ── Page Hero ── */}
      <section className="page-hero">
        <div className="page-hero-bg" />
        <div className="page-hero-grid" />
        <div className="page-hero-inner">
          <div className="page-badge">
            <div className="badge-dot" />
            About Sitecroft
          </div>
          <h1>
            The Person Behind <span>Your Website</span>
          </h1>
          <p>
            I'm a Web Developer who believes in building websites the right way — with care, precision, and honest communication throughout. I develop high-quality websites in WordPress as well as modern custom stacks like HTML/CSS/JS and React/Next.js.
          </p>
        </div>
      </section>

      {/* ── Intro / Profile Card ── */}
      <section className="intro">
        <div className="intro-inner">
          <div className="profile-card">
            <img
              className="profile-photo"
              src={PROFILE.photo}
              alt={PROFILE.name}
            />
            <div className="profile-info">
              <h3>{PROFILE.name}</h3>
              <div className="profile-role">{PROFILE.role}</div>
              <div className="profile-location">
                <MapPin size={12} />
                {PROFILE.location}
              </div>
              <p className="profile-desc">{PROFILE.description}</p>
              <div className="profile-skills">
                {PROFILE.skills.map((skill) => (
                  <span key={skill} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
              <div className="profile-links">
                {PROFILE.links.map((link) => (
                  <a
                    key={link.label}
                    className="profile-link"
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── Who I Am ── */}
          <div className="who-section">
            <div className="section-label">Who I Am</div>
            <h2 className="section-title">
              Modern Web Development With a Personal Touch
            </h2>
            <div className="who-grid">
              <div className="who-text-col">
                <p>
                  Hi, I'm Saad — a Web Developer based in Karachi, Pakistan. Sitecroft is my dedicated development service, built around one goal: helping businesses and individuals get websites that actually work, perform exceptionally, and look great. Along with my deep WordPress background, I bring 6+ months of dedicated experience building fully custom-coded websites.
                </p>
                <p>
                  I've spent 2+ years working hands-on with WordPress —
                  building, testing, and refining personal projects and live
                  client sites. I understand how WordPress works from the inside
                  out, which means I can build things right and fix things fast.
                </p>
                <p>
                  I also work with automation workflows using n8n, so if your
                  project ever needs more than just a website, I have experience on
                  that side too. Whatever your project needs, I approach it with
                  the same care and attention to detail.
                </p>
                <div className="who-btns">
                  <a className="btn-primary" href="/services">
                    See My Services
                  </a>
                  <a className="btn-secondary" href="/contact">
                    Get In Touch
                  </a>
                </div>
              </div>
              <div className="who-stats">
                {STATS.map((stat, i) => (
                  <div
                    key={stat.label}
                    className="who-stat-card"
                    style={{ animationDelay: `${0.1 * (i + 1)}s` }}
                  >
                    <div className="who-stat-num">{stat.number}</div>
                    <div className="who-stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── My Journey / Timeline ── */}
      <section className="story">
        <div className="story-inner">
          <div className="section-label">My Journey</div>
          <h2 className="section-title">How Sitecroft Came to Be</h2>
          <div className="timeline">
            {TIMELINE.map((item, i) => (
              <div
                key={item.date}
                className="timeline-item"
                style={{ animationDelay: `${0.1 * (i + 1)}s` }}
              >
                <div className="timeline-date">{item.date}</div>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Client Work ── */}
      <section className="client-work">
        <div className="client-work-inner">
          <div className="section-label">Client Work</div>
          <h2 className="section-title">Real Projects, Real Results</h2>
          <p className="section-sub">
            A live project built for a real client — delivered with full attention to
            detail.
          </p>
          <div className="project-card">
            <div className="project-icon">
              <Globe size={28} />
            </div>
            <div className="project-info">
              <div className="project-type">{CLIENT_PROJECT.type}</div>
              <h4>{CLIENT_PROJECT.name}</h4>
              <p>{CLIENT_PROJECT.description}</p>
              <div className="project-tags">
                {CLIENT_PROJECT.tags.map((tag) => (
                  <span key={tag} className="project-tag">
                    {tag}
                  </span>
                ))}
              </div>
              <a
                className="project-link"
                href={CLIENT_PROJECT.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit {CLIENT_PROJECT.name}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services Overview ── */}
      <section className="services-overview">
        <div className="services-overview-inner">
          <div className="section-label">What I Do</div>
          <h2 className="section-title">Services at a Glance</h2>
          <p className="section-sub">
            A full range of web development services — from WordPress to custom React/Next.js solutions.
          </p>
          <div className="svc-list">
            {SERVICES_LIST.map((svc, i) => (
              <motion.div
                key={svc.title}
                className="svc-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
              >
                <div
                  className="svc-item-icon"
                  style={{ background: svc.color }}
                >
                  <svc.icon size={22} style={{ color: svc.stroke }} />
                </div>
                <div>
                  <h4>{svc.title}</h4>
                  <p>{svc.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div style={{ marginTop: "36px" }}>
            <a className="btn-primary" href="/services">
              View All Services
            </a>
          </div>
        </div>
      </section>

      {/* ── Core Values ── */}
      <section className="values">
        <div className="values-inner">
          <div className="section-label">Core Values</div>
          <h2 className="section-title">What Drives Every Project</h2>
          <div className="values-grid">
            {VALUES.map((value, i) => (
              <div
                key={value.title}
                className="value-card"
                style={{ animationDelay: `${0.1 * (i + 1)}s` }}
              >
                <div
                  className="value-icon"
                  style={{ background: value.color }}
                >
                  <value.icon size={26} style={{ color: value.stroke }} />
                </div>
                <h4>{value.title}</h4>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta">
        <h2>
          Let's Build Something <span>Together</span>
        </h2>
        <p>Ready to get started? Reach out and I'll get back to you within 24 hours.</p>
        <div className="cta-btns">
          <a className="btn-primary" href="/contact">
            Start a Project
          </a>
          <a className="btn-secondary" href="/services">
            View Services
          </a>
        </div>
        <p className="cta-note">
          No commitment required. Free consultation on every project.
        </p>
      </section>
    </>
  );
}