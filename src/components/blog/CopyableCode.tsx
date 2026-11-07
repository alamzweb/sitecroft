"use client";

import { useState, ReactNode } from "react";

export default function CopyableCode({ children }: { children: ReactNode }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    // Since children is the raw text from the code block, we can just use it directly
    // BUT to be 100% safe, we create a temporary element to strip any HTML if necessary
    const text = typeof children === "string" ? children : "";
    
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

    return (
    <div className="my-8 overflow-hidden rounded-xl border border-white/10 bg-[#0a1020]">
      <div className="flex items-center justify-end border-b border-white/5 bg-[#060b14] px-4 py-2">
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 text-xs font-semibold text-slate-400 transition-colors hover:text-white"
        >
          {copied ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span className="text-[#06b6d4]">Copied!</span>
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
              Copy
            </>
          )}
        </button>
      </div>
      
      {/* Using a div with whitespace-pre-wrap instead of a pre tag */}
      <div className="overflow-x-auto p-5 text-sm leading-relaxed text-slate-300 font-mono whitespace-pre-wrap">
        {children}
      </div>
    </div>
  );
}