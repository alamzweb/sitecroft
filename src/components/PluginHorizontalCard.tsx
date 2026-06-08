"use client";

import type { CSSProperties } from "react";

export interface PluginHorizontalCardProps {
  title: string;
  description: string;
  authors: string;
  media: { type: "image" | "video"; url: string; alt?: string }[];
  index?: number;
  onClick?: () => void;
}

export default function PluginHorizontalCard({
  title,
  description,
  authors,
  media,
  index = 0,
  onClick,
}: PluginHorizontalCardProps) {
  const hasVideo = media.some((m) => m.type === "video");
  const hasImages = media.some((m) => m.type === "image");

  const cardStyle: CSSProperties = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "18px",
    padding: "16px 20px",
    background: "#0a1020",
    border: "1px solid rgba(99,179,237,0.1)",
    borderRadius: "14px",
    cursor: "pointer",
    position: "relative",
    overflow: "hidden",
    transition: "border-color 0.3s, transform 0.3s, box-shadow 0.3s",
    width: "100%",
    boxSizing: "border-box",
  };

  const thumbStyle: CSSProperties = {
    width: "112px",
    height: "112px",
    borderRadius: "10px",
    overflow: "hidden",
    flexShrink: 0,
    position: "relative",
    background: "linear-gradient(135deg, rgba(59,130,246,0.1), rgba(6,182,212,0.05))",
    border: "1px solid rgba(99,179,237,0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div
      style={{ ...cardStyle, animationDelay: `${0.1 + index * 0.1}s` }}
      onClick={onClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(6,182,212,0.4)";
        e.currentTarget.style.transform = "translateX(4px)";
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(59,130,246,0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(99,179,237,0.1)";
        e.currentTarget.style.transform = "translateX(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      <div style={thumbStyle}>
        {media.length > 0 ? (
          media[0].type === "video" ? (
            <div style={{ width: "100%", height: "100%", background: "rgba(15,23,42,1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(99,179,237,0.6)" strokeWidth="1.5">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </div>
          ) : (
            <img src={media[0].url} alt={media[0].alt || `${title} preview`} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          )
        ) : (
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(99,179,237,0.4)" strokeWidth="1.5">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M3 9h18M9 21V9" />
          </svg>
        )}
      </div>

      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: "4px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
          <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#fff", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {title}
          </h3>
          <div style={{ display: "flex", gap: "4px", flexShrink: 0 }}>
            {hasImages && (
              <span style={{ fontSize: "9px", padding: "2px 6px", borderRadius: "4px", color: "#06b6d4", fontWeight: 600, background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.2)" }}>
                IMG
              </span>
            )}
            {hasVideo && (
              <span style={{ fontSize: "9px", padding: "2px 6px", borderRadius: "4px", color: "#06b6d4", fontWeight: 600, background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.2)" }}>
                VID
              </span>
            )}
          </div>
        </div>
        <p style={{ fontSize: "13px", color: "#64748b", lineHeight: 1.5, margin: 0, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {description}
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", color: "#64748b", marginTop: "2px" }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <span>{authors}</span>
        </div>
      </div>

      <div style={{ flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: "36px", height: "36px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(99,179,237,0.05)", border: "1px solid rgba(99,179,237,0.1)" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </div>
      </div>
    </div>
  );
}
