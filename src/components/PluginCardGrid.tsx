"use client";

import { useRef, type MouseEvent } from "react";

export interface PluginCardGridProps {
  title: string;
  description: string;
  authors: string;
  media: { type: "image" | "video"; url: string; alt?: string }[];
  index?: number;
  onClick?: () => void;
}

export default function PluginCardGrid({
  title,
  description,
  authors,
  media,
  index = 0,
  onClick,
}: PluginCardGridProps) {
  const hasVideo = media.some((m) => m.type === "video");
  const hasImages = media.some((m) => m.type === "image");
  const cardRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--mx", `${x}%`);
    el.style.setProperty("--my", `${y}%`);
  };

  return (
    <div
      ref={cardRef}
      className="svc-card plugin-grid-card"
      onClick={onClick}
      onMouseMove={handleMouseMove}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
      style={{
        animationDelay: `${0.1 + index * 0.1}s`,
        position: "relative",
        cursor: "pointer",
        background: "#0a1020",
        border: "1px solid rgba(99,179,237,0.1)",
        borderRadius: "16px",
        padding: "28px",
        overflow: "hidden",
        transition: "transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
        display: "flex",
        flexDirection: "column",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-8px)";
        e.currentTarget.style.borderColor = "rgba(6,182,212,0.4)";
        e.currentTarget.style.boxShadow = "0 20px 50px rgba(59,130,246,0.2), 0 0 0 1px rgba(6,182,212,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.borderColor = "rgba(99,179,237,0.1)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Mouse-tracking glow - inline via CSS vars */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(500px circle at var(--mx,50%) var(--my,50%), rgba(6,182,212,0.12), transparent 45%)",
          opacity: 0,
          transition: "opacity 0.3s",
          pointerEvents: "none",
        }}
        className="card-glow"
      />

      {/* Shine sweep */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "-100%",
          width: "100%",
          height: "100%",
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
          transition: "left 0.7s ease",
          pointerEvents: "none",
        }}
        className="card-shine"
      />

      {/* Top gradient bar (shows on hover) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: "linear-gradient(90deg,#3b82f6,#06b6d4)",
          opacity: 0,
          transition: "opacity 0.3s",
        }}
        className="card-topbar"
      />

      <style>{`
        .plugin-grid-card:hover .card-glow { opacity: 1 !important; }
        .plugin-grid-card:hover .card-shine { left: 100% !important; }
        .plugin-grid-card:hover .card-topbar { opacity: 1 !important; }
      `}</style>

      {/* Media Container */}
      <div
        style={{
          width: "100%",
          height: "192px",
          borderRadius: "10px",
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          position: "relative",
          background: "linear-gradient(135deg, rgba(59,130,246,0.1), rgba(6,182,212,0.05))",
          border: "1px solid rgba(99,179,237,0.1)",
        }}
      >
        {media.length > 0 ? (
          media[0].type === "video" ? (
            <div style={{ width: "100%", height: "100%", background: "rgba(15,23,42,1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(99,179,237,0.6)" strokeWidth="1.5">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </div>
          ) : (
            <img src={media[0].url} alt={media[0].alt || `${title} preview`} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          )
        ) : (
          <div style={{ textAlign: "center" }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(99,179,237,0.4)" strokeWidth="1.5" style={{ margin: "0 auto 8px" }}>
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M3 9h18M9 21V9" />
            </svg>
            <span style={{ fontSize: "12px", color: "#64748b" }}>Plugin Preview</span>
          </div>
        )}

        {(hasVideo || hasImages) && (
          <div style={{ position: "absolute", top: "8px", right: "8px", display: "flex", gap: "4px" }}>
            {hasImages && (
              <span style={{ fontSize: "10px", padding: "2px 6px", borderRadius: "4px", color: "#06b6d4", fontWeight: 600, background: "rgba(0,0,0,0.5)", border: "1px solid rgba(6,182,212,0.3)" }}>
                IMG
              </span>
            )}
            {hasVideo && (
              <span style={{ fontSize: "10px", padding: "2px 6px", borderRadius: "4px", color: "#06b6d4", fontWeight: 600, background: "rgba(0,0,0,0.5)", border: "1px solid rgba(6,182,212,0.3)" }}>
                VID
              </span>
            )}
          </div>
        )}
      </div>

      <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#fff", marginBottom: "8px" }}>{title}</h3>
      <p style={{ fontSize: "13px", color: "#64748b", lineHeight: 1.65, marginBottom: "16px" }}>{description}</p>

      <div style={{ marginTop: "auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", paddingTop: "12px", borderTop: "1px solid rgba(99,179,237,0.08)" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <span style={{ fontSize: "12px", color: "#64748b" }}>{authors}</span>
        </div>
      </div>
    </div>
  );
}
