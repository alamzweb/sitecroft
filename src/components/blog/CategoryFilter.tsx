"use client";

import type { PostCategory } from "@/lib/posts";

interface CategoryFilterProps {
  categories: PostCategory[];
  active: PostCategory | "All";
  onChange: (cat: PostCategory | "All") => void;
  counts: Record<string, number>;
}

export default function CategoryFilter({
  categories,
  active,
  onChange,
  counts,
}: CategoryFilterProps) {
  const all: (PostCategory | "All")[] = ["All", ...categories];

  return (
    <div className="flex flex-wrap gap-2 mb-10">
      {all.map((cat) => {
        const isActive = active === cat;
        return (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            className="text-sm font-medium px-4 py-2 rounded-full transition-all duration-200"
            style={{
              background: isActive
                ? "linear-gradient(135deg, #3b82f6, #06b6d4)"
                : "rgba(10,16,32,0.7)",
              border: isActive
                ? "1px solid transparent"
                : "1px solid rgba(99,179,237,0.15)",
              color: isActive ? "#fff" : "rgba(148,163,184,0.9)",
              boxShadow: isActive
                ? "0 0 20px rgba(59,130,246,0.25)"
                : "none",
            }}
          >
            {cat}
            <span
              className="ml-2 text-xs opacity-60"
              style={{ fontWeight: 400 }}
            >
              {counts[cat] ?? 0}
            </span>
          </button>
        );
      })}
    </div>
  );
}