"use client";

import type { ReactNode } from "react";

export interface ProjectCardProps {
  /** Project title */
  title: string;
  /** Brief description of the project */
  description: string;
  /** Technology stack tags */
  techStack: string[];
  /** Category label (e.g., SaaS, E-Commerce, Custom Web App) */
  category: string;
  /** External URL to view the live site */
  liveUrl: string;
  /** Optional icon for the project */
  icon?: ReactNode;
  /** Index for animation delay */
  index?: number;
}

export default function ProjectCard({
  title,
  description,
  techStack,
  category,
  liveUrl,
  icon,
  index = 0,
}: ProjectCardProps) {
  return (
    <div
      className="svc-card"
      style={{
        animationDelay: `${0.1 + index * 0.1}s`,
      }}
    >
      {/* Image Container - Placeholder for website preview */}
      <div
        className="w-full h-48 rounded-lg mb-5 flex items-center justify-center overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(59,130,246,0.1), rgba(6,182,212,0.05))",
          border: "1px solid rgba(99,179,237,0.1)",
        }}
      >
        <div className="text-center">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(99,179,237,0.4)"
            strokeWidth="1.5"
            className="mx-auto mb-2"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M3 9h18M9 21V9" />
          </svg>
          <span className="text-xs text-slate-500">Project Preview</span>
        </div>
      </div>

      {/* Category Label */}
      <div
        className="inline-block text-[11px] font-semibold text-brand-cyan uppercase tracking-wider px-2 py-1 rounded-md mb-3"
        style={{
          background: "rgba(6,182,212,0.08)",
          border: "1px solid rgba(6,182,212,0.15)",
        }}
      >
        {category}
      </div>

      {/* Project Title */}
      <h3 className="text-base font-bold text-white mb-2">{title}</h3>

      {/* Description */}
      <p className="text-sm text-text-muted leading-relaxed mb-4">{description}</p>

      {/* Tech Stack Badges */}
      <div className="flex flex-wrap gap-2 mb-4">
        {techStack.map((tech) => (
          <span
            key={tech}
            className="project-tag"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Action Link */}
      <a
        href={liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-sm font-semibold text-brand-cyan hover:opacity-80 transition-opacity mt-auto"
      >
        View Live Site
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <path d="M15 3h6v6" />
          <path d="M10 14L21 3" />
        </svg>
      </a>
    </div>
  );
}