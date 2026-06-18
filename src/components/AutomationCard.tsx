"use client";

import { useState, useRef, useCallback } from "react";

type MediaItem = { type: "image"; src: string } | { type: "video"; src: string };

interface AutomationCardProps {
  title: string;
  description: string;
  techStack: string[];
  /** Array of media items (images/videos) for the gallery carousel */
  media?: MediaItem[];
  downloadUrl: string;
  guideUrl?: string;
  index?: number;
}

export default function AutomationCard({
  title,
  description,
  techStack,
  media = [],
  downloadUrl,
  guideUrl,
  index = 0,
}: AutomationCardProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [playingVideoIndex, setPlayingVideoIndex] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const current = media[activeIndex];
  const hasMultiple = media.length > 1;

  const goTo = useCallback((i: number) => {
    if (i < 0) i = media.length - 1;
    if (i >= media.length) i = 0;
    setPlayingVideoIndex(null);
    setActiveIndex(i);
  }, [media.length]);

  const handleVideoPlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPlayingVideoIndex(activeIndex);
    // Small delay to let the video element mount and start playing
    setTimeout(() => {
      videoRef.current?.play();
    }, 50);
  };

  return (
    <div
      className="svc-card"
      style={{
        animationDelay: `${0.1 + index * 0.1}s`,
        position: "relative",
      }}
    >
      {/* Media Area */}
      <div
        className="w-full rounded-lg mb-5 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(59,130,246,0.1), rgba(6,182,212,0.05))",
          border: "1px solid rgba(99,179,237,0.1)",
          height: "220px",
          position: "relative",
        }}
      >
        {/* Render the active media item */}
        {!current ? (
          <div className="w-full h-full flex items-center justify-center">
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
              <span className="text-xs text-slate-500">Workflow Preview</span>
            </div>
          </div>
        ) : current.type === "video" && playingVideoIndex === activeIndex ? (
          <video
            ref={videoRef}
            src={current.src}
            controls
            className="w-full h-full"
            style={{ objectFit: "cover", display: "block" }}
            onEnded={() => setPlayingVideoIndex(null)}
          />
        ) : current.type === "video" ? (
          <>
            {/* Show a gradient + play button overlay for inactive video slides */}
            <div
              className="w-full h-full flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, rgba(59,130,246,0.2), rgba(6,182,212,0.1))",
              }}
            >
              <button
                onClick={handleVideoPlay}
                aria-label="Play video"
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  border: "2px solid rgba(6,182,212,0.6)",
                  background: "rgba(6,182,212,0.15)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s",
                  backdropFilter: "blur(4px)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(6,182,212,0.3)";
                  e.currentTarget.style.transform = "scale(1.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(6,182,212,0.15)";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="#06b6d4"
                  stroke="none"
                >
                  <polygon points="6,3 20,12 6,21" />
                </svg>
              </button>
            </div>
            {/* Small label */}
            <span
              style={{
                position: "absolute",
                bottom: "8px",
                right: "10px",
                fontSize: "10px",
                color: "rgba(148,163,184,0.7)",
                background: "rgba(0,0,0,0.5)",
                padding: "2px 8px",
                borderRadius: "4px",
                pointerEvents: "none",
              }}
            >
              Video
            </span>
          </>
        ) : (
          <img
            src={current.src}
            alt={`${title} preview ${activeIndex + 1}`}
            className="w-full h-full"
            style={{
              objectFit: "contain",
              display: "block",
              transition: "opacity 0.3s ease",
            }}
          />
        )}

        {/* Navigation arrows (visible on hover via the parent) */}
        {hasMultiple && current && (
          <>
            {/* Left Arrow */}
            <button
              onClick={(e) => { e.stopPropagation(); goTo(activeIndex - 1); }}
              aria-label="Previous media"
              className="media-arrow media-arrow-left"
              style={{
                position: "absolute",
                left: "6px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                border: "1px solid rgba(99,179,237,0.3)",
                background: "rgba(0,0,0,0.55)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#e2e8f0",
                opacity: 0,
                transition: "opacity 0.2s ease, background 0.2s",
                zIndex: 5,
                padding: 0,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(6,182,212,0.3)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(0,0,0,0.55)"; }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            {/* Right Arrow */}
            <button
              onClick={(e) => { e.stopPropagation(); goTo(activeIndex + 1); }}
              aria-label="Next media"
              className="media-arrow media-arrow-right"
              style={{
                position: "absolute",
                right: "6px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                border: "1px solid rgba(99,179,237,0.3)",
                background: "rgba(0,0,0,0.55)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#e2e8f0",
                opacity: 0,
                transition: "opacity 0.2s ease, background 0.2s",
                zIndex: 5,
                padding: 0,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(6,182,212,0.3)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(0,0,0,0.55)"; }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Dot indicators */}
      {hasMultiple && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "6px",
            marginBottom: "14px",
          }}
        >
          {media.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to media ${i + 1}`}
              style={{
                width: activeIndex === i ? "18px" : "6px",
                height: "6px",
                borderRadius: "3px",
                border: "none",
                cursor: "pointer",
                background: activeIndex === i ? "#06b6d4" : "rgba(99,179,237,0.25)",
                transition: "all 0.3s",
                padding: 0,
              }}
            />
          ))}
        </div>
      )}

      {/* Category Label */}
      <div
        className="inline-block text-[11px] font-semibold text-brand-cyan uppercase tracking-wider px-2 py-1 rounded-md mb-3"
        style={{
          background: "rgba(6,182,212,0.08)",
          border: "1px solid rgba(6,182,212,0.15)",
        }}
      >
        Automation
      </div>

      {/* Title */}
      <h3 className="text-base font-bold text-white mb-2">{title}</h3>

      {/* Description */}
      <p className="text-sm text-text-muted leading-relaxed mb-4">{description}</p>

      {/* Tech Stack Badges */}
      <div className="flex flex-wrap gap-2 mb-4">
        {techStack.map((tech) => (
          <span key={tech} className="project-tag">
            {tech}
          </span>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 mt-auto">
        <a
          href={downloadUrl}
          download
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-cyan hover:opacity-80 transition-opacity"
        >
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
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Download Workflow
        </a>

        {guideUrl && (
          <a
            href={guideUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-400 hover:text-brand-cyan transition-colors"
          >
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
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
            View Guide
          </a>
        )}
      </div>

      {/* Hover style for arrows */}
      <style>{`
        .svc-card:hover .media-arrow {
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
}