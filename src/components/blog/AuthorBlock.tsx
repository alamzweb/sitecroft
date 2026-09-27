import Link from "next/link";

interface AuthorBlockProps {
  author: string;
  role: string;
}

export default function AuthorBlock({ author, role }: AuthorBlockProps) {
  return (
    <div
      className="mt-14 rounded-2xl p-6 flex items-center gap-4"
      style={{
        background: "rgba(10,16,32,0.7)",
        border: "1px solid rgba(99,179,237,0.1)",
      }}
    >
      <div
        className="w-14 h-14 rounded-full flex-shrink-0 flex items-center justify-center text-lg font-bold text-white"
        style={{
          background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
        }}
      >
        {author.charAt(0).toUpperCase()}
      </div>

      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold text-white mb-0.5">
          {author}
        </div>
        <div className="text-xs text-slate-500">{role}</div>
      </div>

      <Link
        href="/about"
        className="text-xs font-semibold px-4 py-2 rounded-lg transition-colors flex-shrink-0"
        style={{
          color: "#67e8f9",
          border: "1px solid rgba(6,182,212,0.25)",
        }}
      >
        About →
      </Link>
    </div>
  );
}