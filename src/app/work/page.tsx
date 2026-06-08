"use client";

import { useEffect } from "react";
import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import PluginCard from "@/components/PluginCard";

// Placeholder website projects - replace with your actual projects
const placeholderProjects = [
  {
    title: "Project Title 1",
    description: "A brief description of this amazing web project. Highlight the key features, goals, and what made it unique.",
    techStack: ["Next.js", "React", "TypeScript"],
    category: "Custom Web App",
    liveUrl: "#",
  },
  {
    title: "Project Title 2",
    description: "Another impressive project showcasing modern web development techniques and clean design principles.",
    techStack: ["WordPress", "WooCommerce", "n8n"],
    category: "E-Commerce",
    liveUrl: "#",
  },
  {
    title: "Project Title 3",
    description: "A specialized solution built for performance and scalability, demonstrating expertise in modern frameworks.",
    techStack: ["React", "Vercel", "Tailwind CSS"],
    category: "SaaS",
    liveUrl: "#",
  },
];

// Placeholder featured plugins - replace with your actual plugins
const placeholderPlugins = [
  {
    title: "Plugin Name 1",
    description: "A powerful WordPress plugin that solves a specific problem. Streamline workflows and enhance functionality.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
  {
    title: "Plugin Name 2",
    description: "An automation tool designed to save time and reduce manual work through intelligent workflows.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="2">
        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
        <path d="M13 2l5 5L15 11" />
      </svg>
    ),
  },
];

export default function WorkPage() {
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

  return (
    <>
      {/* Page Header */}
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
            {placeholderProjects.map((project, i) => (
              <ProjectCard
                key={i}
                index={i}
                title={project.title}
                description={project.description}
                techStack={project.techStack}
                category={project.category}
                liveUrl={project.liveUrl}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Plugins Section */}
      <section
        className="relative py-20 px-6"
        style={{ background: "#0a1020" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="section-label mb-6">Plugins</div>
          <h2 className="section-title mb-4">Featured Plugins</h2>
          <p className="section-sub mb-12">
            Custom WordPress plugins and automation tools designed to solve real problems and streamline workflows.
          </p>

          <div className="svc-list">{placeholderPlugins.map((plugin, i) => (
            <PluginCard
              key={i}
              index={i}
              title={plugin.title}
              description={plugin.description}
              icon={plugin.icon}
            />
          ))}</div>

          {/* View All Plugins CTA */}
          <div className="mt-12 text-center">
            <Link
              href="/plugins"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-brand-blue to-brand-cyan text-white px-8 py-4 rounded-xl font-semibold text-base transition-all duration-200 hover:opacity-90 hover:transform hover:-translate-y-1"
            >
              View All Plugins
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Optional CTA Section */}
      <section
        className="relative py-20 px-6"
        style={{ background: "#060b14" }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Have a project in mind?
          </h2>
          <p className="text-base text-slate-400 mb-8">
            Let's discuss your vision and build something exceptional together.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/contact" className="btn-primary">
              Get in Touch
            </Link>
            <Link href="/services" className="btn-secondary">
              View Services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}