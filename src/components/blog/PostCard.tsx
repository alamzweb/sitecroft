import Link from "next/link";
import type { Post } from "@/lib/posts";

interface PostCardProps {
  post: Post;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block h-full rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={{
        background: "rgba(10,16,32,0.7)",
        border: "1px solid rgba(99,179,237,0.1)",
      }}
    >
      {post.coverImage && (
        <div className="w-full aspect-[16/9] overflow-hidden bg-[#0a1020]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}

      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <span
            className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
            style={{
              background: "rgba(6,182,212,0.08)",
              border: "1px solid rgba(6,182,212,0.2)",
              color: "#67e8f9",
              letterSpacing: "0.3px",
            }}
          >
            {post.category}
          </span>
          <span className="text-xs text-slate-500">
            {post.readingTime}
          </span>
        </div>

        <h3 className="text-lg font-semibold text-white mb-2 leading-snug group-hover:text-brand-cyan transition-colors">
          {post.title}
        </h3>

        <p className="text-sm text-slate-400 leading-relaxed line-clamp-3 mb-4">
          {post.description}
        </p>

        <div className="flex items-center justify-between text-xs text-slate-500 pt-4 border-t border-white/5">
          <span>{formatDate(post.date)}</span>
          <span
            className="inline-flex items-center gap-1 font-semibold transition-transform group-hover:translate-x-0.5"
            style={{ color: "#67e8f9" }}
          >
            Read
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}