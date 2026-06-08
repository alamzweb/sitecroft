"use client";

import type { ReactNode } from "react";

export interface PluginCardProps {
  /** Plugin title */
  title: string;
  /** Brief description of the plugin */
  description: string;
  /** Icon element */
  icon?: ReactNode;
  /** Index for animation delay */
  index?: number;
}

export default function PluginCard({
  title,
  description,
  icon,
  index = 0,
}: PluginCardProps) {
  return (
    <div
      className="svc-item"
      style={{
        animationDelay: `${0.1 + index * 0.1}s`,
      }}
    >
      {icon && (
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            background: "rgba(59,130,246,0.1)",
            border: "1px solid rgba(59,130,246,0.2)",
          }}
        >
          {icon}
        </div>
      )}
      <div>
        <h4 className="text-[15px] font-bold text-white mb-1">{title}</h4>
        <p className="text-sm text-text-muted leading-relaxed">{description}</p>
      </div>
    </div>
  );
}