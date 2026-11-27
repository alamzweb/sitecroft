
"use client";

import { useEffect } from "react";
import Link from "next/link";

const meta = {
  client: "Qovila",
  tagline: "Simple, seamless collaboration between agencies and clients.",
  category: "Personal SaaS",
  liveUrl: "https://qovila.vercel.app",
};

const stats = [
  { value: "6", label: "Core Features" },
  { value: "5", label: "Request Statuses" },
  { value: "1", label: "Shared Workspace" },
  { value: "Live", label: "Ready to Use" },
];

const stack = [
  "Next.js",
  "React",
  "TypeScript",
  "Supabase",
  "Tailwind CSS",
];

const built = [
  {
    title: "Client Request Portal",
    description:
      "A central place where clients can submit requests without relying on scattered messages and conversations.",
  },
  {
    title: "Request Tracking",
    description:
      "Every request follows a clear workflow: New, In Progress, Waiting for Client, Completed, and Closed.",
  },
  {
    title: "Priorities & Deadlines",
    description:
      "Help agencies understand what matters most and when work needs to be completed.",
  },
  {
    title: "Comments & Files",
    description:
      "Keep discussions and attachments connected to the request they belong to.",
  },
  {
    title: "Agency Team",
    description:
      "Invite team members and give everyone a shared view of client work.",
  },
  {
    title: "Client Management",
    description:
      "Organize client workspaces separately from the agency's internal team.",
  },
];

const timeline = [
  {
    phase: "01",
    title: "The Idea",
    description:
      "Recognizing the need for a simpler way for freelancers, agencies, and clients to work together.",
  },
  {
    phase: "02",
    title: "Building the Platform",
    description:
      "Turning the idea into a focused request portal with the essential tools for everyday collaboration.",
  },
  {
    phase: "03",
    title: "A Live Product",
    description:
      "Bringing Qovila online as a ready-to-use platform for organizing client requests and agency work.",
  },
];

export default function QovilaCaseStudy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-[#060b14] text-white">
      <div className="max-w-7xl mx-auto px-6 py-16 md:px-10 lg:px-16">
        {/* Hero */}
        <div className="flex flex-col items-start gap-5 mb-8">
          <Link
            href="/work"
            className="text-sm text-slate-400 hover:text-white transition-colors"
          >
            ← Back to work
          </Link>

          <div className="page-badge">
            <div className="badge-dot" />
            {meta.category}
          </div>
        </div>

        <section className="relative overflow-hidden rounded-3xl border border-[rgba(99,179,237,0.12)] bg-[rgba(10,16,32,0.7)] p-8 md:p-14">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-500/10 pointer-events-none" />

          <div className="relative max-w-4xl">
            <p className="section-label mb-5">PROJECT CASE STUDY</p>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              {meta.client}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                .
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 leading-relaxed max-w-3xl mb-8">
              {meta.tagline}
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href={meta.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Visit Qovila ↗
              </a>

              <Link href="/contact" className="btn-secondary">
                Start a project
              </Link>
            </div>
          </div>
        </section>

        {/* At a glance */}
        <section className="py-16">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
            <div>
              <p className="section-label mb-3">AT A GLANCE</p>
              <h2 className="text-3xl md:text-4xl font-bold">
                The project overview
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {stack.map((tech) => (
                <span key={tech} className="project-tag">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-[rgba(99,179,237,0.1)] bg-[rgba(10,16,32,0.7)] p-6"
              >
                <p className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-3">
                  {stat.value}
                </p>
                <p className="text-sm text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* The Brief */}
        <section className="py-12 border-t border-white/5">
          <p className="section-label mb-4">THE BRIEF</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Making collaboration simple.
          </h2>

          <div className="max-w-3xl space-y-5 text-slate-300 leading-relaxed">
            <p>
              I thought about how there wasn’t a simple platform where
              freelancers, business agencies, and clients could work together
              seamlessly without complicated options or unnecessary features.
            </p>

            <p>
              That idea became Qovila — a straightforward client request portal
              designed to bring everyday agency work into one organized place.
            </p>

            <p>
              The goal was simple: make it easier to submit requests, follow
              progress, communicate, and manage client work without adding
              complexity.
            </p>
          </div>
        </section>

        {/* What I Built */}
        <section className="py-12 border-t border-white/5">
          <p className="section-label mb-4">WHAT I BUILT</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-10">
            Everything in one workspace.
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {built.map((feature, index) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-[rgba(99,179,237,0.1)] bg-[rgba(10,16,32,0.7)] p-6"
              >
                <div className="text-sm font-mono text-cyan-400 mb-5">
                  0{index + 1}
                </div>

                <h3 className="text-xl font-semibold mb-3">
                  {feature.title}
                </h3>

                <p className="text-slate-400 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Standout Feature */}
        <section className="py-12 border-t border-white/5">
          <p className="section-label mb-4">STANDOUT FEATURE</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            A clear request workflow.
          </h2>

          <div className="rounded-3xl border border-[rgba(99,179,237,0.1)] bg-[rgba(10,16,32,0.7)] p-8 md:p-10">
            <p className="text-slate-300 leading-relaxed max-w-3xl mb-8">
              Qovila keeps every client request organized through a simple
              status system. Agencies and clients can understand where work
              stands without needing complicated project management tools.
            </p>

            <div className="flex flex-wrap gap-3">
              {[
                "New",
                "In Progress",
                "Waiting for Client",
                "Completed",
                "Closed",
              ].map((status) => (
                <span
                  key={status}
                  className="project-tag px-4 py-2"
                >
                  {status}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Development Journey */}
        <section className="py-12 border-t border-white/5">
          <p className="section-label mb-4">DEVELOPMENT JOURNEY</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-10">
            From idea to live product.
          </h2>

          <div className="space-y-6">
            {timeline.map((item) => (
              <div
                key={item.phase}
                className="flex gap-6 rounded-2xl border border-[rgba(99,179,237,0.1)] bg-[rgba(10,16,32,0.7)] p-6 md:p-8"
              >
                <div className="text-cyan-400 font-mono text-lg">
                  {item.phase}
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    {item.title}
                  </h3>

                  <p className="text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Outcome */}
        <section className="py-12 border-t border-white/5">
          <p className="section-label mb-4">THE OUTCOME</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            A simpler way to work together.
          </h2>

          <div className="max-w-3xl space-y-5 text-slate-300 leading-relaxed">
            <p>
              Qovila turned a simple idea into a live platform for smoother
              agency-client collaboration.
            </p>

            <p>
              It brings requests, communication, files, deadlines, and team
              coordination into one organized workspace — helping make
              everyday client work easier to manage.
            </p>

            <p>
              The result is a focused product built around one principle:
              collaboration should feel simple.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-12 rounded-3xl border border-[rgba(99,179,237,0.12)] bg-gradient-to-br from-blue-500/10 to-cyan-500/10 p-8 md:p-12 text-center">
          <p className="section-label mb-4">HAVE A PROJECT IN MIND?</p>

          <h2 className="text-3xl md:text-4xl font-bold mb-5">
            Let’s build something useful.
          </h2>

          <p className="text-slate-400 max-w-xl mx-auto mb-8">
            Have an idea for a website or SaaS product? Let’s turn it into
            something real.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact" className="btn-primary">
              Get in touch
            </Link>

            <Link href="/work" className="btn-secondary">
              Explore more projects
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
