import type { MDXComponents } from "mdx/types";
import Link from "next/link";

export function getMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({ children }) => (
      <h2 className="mt-12 mb-4 text-2xl md:text-3xl font-bold text-white tracking-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-10 mb-3 text-xl md:text-2xl font-semibold text-white tracking-tight">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-8 mb-2 text-lg font-semibold text-white">{children}</h4>
    ),
    p: ({ children }) => (
      <p className="my-5 text-[17px] leading-[1.75] text-slate-300">{children}</p>
    ),
    a: ({ href, children }) => (
      <Link
        href={href || "#"}
        className="text-brand-cyan underline underline-offset-4 decoration-brand-cyan/40 hover:decoration-brand-cyan transition-colors"
      >
        {children}
      </Link>
    ),
    ul: ({ children }) => (
      <ul className="my-5 ml-5 list-disc space-y-2 text-[17px] leading-[1.75] text-slate-300">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="my-5 ml-5 list-decimal space-y-2 text-[17px] leading-[1.75] text-slate-300">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="pl-1">{children}</li>,
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-2 border-brand-cyan/40 pl-5 italic text-slate-400">
        {children}
      </blockquote>
    ),
    code: ({ children }) => (
      <code className="rounded bg-white/5 border border-white/10 px-1.5 py-0.5 text-[0.9em] font-mono text-cyan-300">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="my-6 overflow-x-auto rounded-xl border border-white/10 bg-[#0a1020] p-5 text-sm leading-relaxed">
        {children}
      </pre>
    ),
    hr: () => <hr className="my-10 border-white/10" />,
    strong: ({ children }) => (
      <strong className="font-semibold text-white">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    img: ({ src, alt }) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={typeof src === "string" ? src : ""}
        alt={alt || ""}
        className="my-8 rounded-xl border border-white/10 w-full h-auto"
      />
    ),
    table: ({ children }) => (
      <div className="my-8 overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full text-sm border-collapse">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="bg-white/[0.04]">{children}</thead>
    ),
    tbody: ({ children }) => <tbody>{children}</tbody>,
    tr: ({ children }) => (
      <tr className="border-b border-white/5 last:border-b-0">
        {children}
      </tr>
    ),
    th: ({ children }) => (
      <th className="px-4 py-3 text-left text-sm font-bold text-white">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-3 text-sm text-slate-400 align-top">
        {children}
      </td>
    ),
    ...components,
  };
}