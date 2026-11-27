
"use client";

import Link from "next/link";
import { useEffect } from "react";

const meta = {
  client: "LinkFilo",
  tagline: "Simple, ad-free file sharing — without the wait timers.",
  category: "Personal SaaS",
  liveUrl: "https://linkfilo.vercel.app",
};

const stats = [
  { label: "Project Type", value: "Personal SaaS" },
  { label: "Origin", value: "A spontaneous idea" },
  { label: "Core Feature", value: "File Sharing" },
  { label: "Platform", value: "Next.js + Supabase" },
];

const stack = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Supabase",
  "Vercel",
];

const built = [
  {
    title: "Simple file sharing",
    body: "Upload files and generate shareable links. LinkFilo was designed to make sharing straightforward, without the ad-filled pages and frustrating wait timers common on other file-sharing websites.",
  },
  {
    title: "Public profiles",
    body: "Users can create public profiles to give their shared files a recognizable home. It adds a personal identity to the sharing experience instead of making every link feel disconnected.",
  },
  {
    title: "Access control for shared links",
    body: "File owners can revoke access to a shared link whenever they need to — useful if a file was shared accidentally or should no longer be available.",
  },
  {
    title: "Built-in file preview",
    body: "A file viewer lets people preview supported files before downloading them, helping them check the content first rather than downloading blindly.",
  },
];

const timeline = [
  {
    label: "The Idea",
    body: "A spontaneous experiment inspired by frustration with ad-heavy file-sharing websites and wait timers.",
  },
  {
    label: "Core Build",
    body: "The file-sharing experience came together, with authentication and account handling becoming a major learning process.",
  },
  {
    label: "Feature Expansion",
    body: "Public profiles, link revocation, file previews, and download activity tracking helped turn the experiment into a more complete product.",
  },
];

export default function LinkFiloPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden pt-28 pb-16 px-6">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(59,130,246,0.18), transparent 70%), radial-gradient(ellipse 60% 40% at 50% 100%, rgba(6,182,212,0.06), transparent 70%)",
          }}
        />
        <div className="max-w-5xl mx-auto relative">
          <div className="flex flex-col items-start gap-5 mb-8">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-sm transition-colors hover:text-white"
              style={{ color: "rgba(148,163,184,0.8)" }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to work
            </Link>
            <div className="page-badge">
              <div className="badge-dot" />
              {meta.category}
            </div>
          </div>

          <h1
            className="text-5xl md:text-7xl font-bold leading-[1.02] mb-6 tracking-tight"
            style={{ color: "#fff" }}
          >
            {meta.client}
          </h1>

          <p
            className="text-lg md:text-xl leading-relaxed max-w-2xl mb-10"
            style={{ color: "rgba(148,163,184,0.9)" }}
          >
            {meta.tagline}
          </p>

          <a
            href={meta.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Visit live site
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <path d="M15 3h6v6M10 14L21 3" />
            </svg>
          </a>
        </div>
      </section>

      {/* ============ AT A GLANCE ============ */}
      <section className="px-6 pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-xl p-5 md:p-6"
                style={{
                  background: "rgba(10,16,32,0.7)",
                  border: "1px solid rgba(99,179,237,0.1)",
                }}
              >
                <div
                  className="text-[11px] mb-2.5 font-medium"
                  style={{
                    color: "rgba(148,163,184,0.65)",
                    letterSpacing: "0.6px",
                    textTransform: "uppercase",
                  }}
                >
                  {s.label}
                </div>
                <div
                  className="text-base font-semibold leading-snug"
                  style={{ color: "#fff" }}
                >
                  {s.value}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mt-6">
            {stack.map((t) => (
              <span key={t} className="project-tag">
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============ THE BRIEF ============ */}
      <section className="px-6 pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="section-label mb-4">The Brief</div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 max-w-3xl">
            A small frustration turned into a product.
          </h2>
          <div
            className="space-y-5 text-base md:text-[17px] leading-relaxed max-w-3xl"
            style={{ color: "rgba(148,163,184,0.88)" }}
          >
            <p>
              LinkFilo started almost randomly. I wasn't following a detailed
              business plan or trying to build a big product from day one. The
              idea came from a simple frustration: many file-sharing websites
              were filled with ads, waiting periods, and unnecessary steps.
            </p>
            <p>
              I wanted to experiment with a more straightforward alternative —
              somewhere people could upload a file, share a link, and let others
              access it without the usual distractions. What began as a small
              experiment gradually became a more complete file-sharing platform
              with accounts, public profiles, and tools to manage shared files.
            </p>
          </div>
        </div>
      </section>

      {/* ============ WHAT I BUILT ============ */}
      <section className="px-6 pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="section-label mb-4">What I Built</div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
            File sharing, with more control.
          </h2>

          <div className="space-y-4">
            {built.map((item, i) => (
              <div
                key={i}
                className="rounded-xl p-6 md:p-7 flex items-start gap-5"
                style={{
                  background: "rgba(10,16,32,0.7)",
                  border: "1px solid rgba(99,179,237,0.1)",
                }}
              >
                <div
                  className="flex-shrink-0 flex items-center justify-center text-sm font-bold"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                    background:
                      "linear-gradient(135deg, rgba(59,130,246,0.2), rgba(6,182,212,0.15))",
                    border: "1px solid rgba(99,179,237,0.25)",
                    color: "#67e8f9",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="flex-1 min-w-0">
                  <h3
                    className="text-lg font-semibold mb-2.5 leading-snug"
                    style={{ color: "#fff" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-[15px] leading-[1.7]"
                    style={{ color: "rgba(148,163,184,0.85)" }}
                  >
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ STANDOUT FEATURE ============ */}
      <section className="px-6 pb-16">
        <div className="max-w-5xl mx-auto">
          <div
            className="rounded-2xl p-7 md:p-10 relative overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(59,130,246,0.1), rgba(6,182,212,0.05))",
              border: "1px solid rgba(6,182,212,0.2)",
            }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{
                background: "linear-gradient(90deg, #3b82f6, #06b6d4)",
              }}
            />
            <div className="section-label mb-4">Standout Feature</div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 max-w-3xl">
              Download activity, visible only to the owner.
            </h2>
            <div
              className="space-y-4 text-base md:text-[17px] leading-relaxed max-w-3xl"
              style={{ color: "rgba(148,163,184,0.9)" }}
            >
              <p>
                Sharing a file is only part of the experience. I also wanted
                file owners to have useful insight into what happens after a
                link is shared.
              </p>
              <p>
                LinkFilo includes download history that shows the owner when
                their file was downloaded, along with the downloader's public
                IP address. This information is private to the file owner.
                People downloading a file only see the total number of views
                and downloads — they cannot access the owner's detailed
                download history.
              </p>
              <p>
                Combined with the ability to revoke a link, it gives owners
                more visibility and control over the files they share.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ DEVELOPMENT JOURNEY ============ */}
      <section className="px-6 pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="section-label mb-4">Development Journey</div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
            My first real lesson in building a web app.
          </h2>

          <div
            className="space-y-5 text-base md:text-[17px] leading-relaxed max-w-3xl mb-10"
            style={{ color: "rgba(148,163,184,0.88)" }}
          >
            <p>
              The core file-sharing feature was relatively smooth to build.
              The harder part was everything around it: authentication,
              account handling, username setup and management, account
              settings, and public profiles.
            </p>
            <p>
              LinkFilo was my first project where I was learning and
              implementing many of these concepts at the same time. That
              made the account system take longer than expected, but it
              also gave me practical experience that made later projects
              easier to approach.
            </p>
          </div>

          <div className="section-label mb-4">Timeline</div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
            From experiment to a fuller product.
          </h2>

          <div className="max-w-3xl space-y-6">
            {timeline.map((t, i) => (
              <div key={i} className="flex items-start gap-6">
                <div
                  className="flex-shrink-0 text-xs font-semibold"
                  style={{
                    color: "#67e8f9",
                    letterSpacing: "0.5px",
                    paddingTop: "6px",
                    minWidth: "90px",
                  }}
                >
                  {t.label}
                </div>
                <div
                  className="flex-1 pb-6"
                  style={{
                    borderBottom:
                      i < timeline.length - 1
                        ? "1px solid rgba(99,179,237,0.08)"
                        : "none",
                  }}
                >
                  <p
                    className="text-[15px] leading-[1.7]"
                    style={{ color: "rgba(148,163,184,0.9)" }}
                  >
                    {t.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ OUTCOME ============ */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="section-label mb-4">Outcome</div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 max-w-3xl">
            An experiment that became a real product.
          </h2>
          <div
            className="space-y-4 text-base md:text-[17px] leading-relaxed max-w-3xl"
            style={{ color: "rgba(148,163,184,0.88)" }}
          >
            <p>
              LinkFilo grew from a simple idea into a live file-sharing
              platform with user accounts, public profiles, file previews,
              link revocation, and owner-only download history.
            </p>
            <p>
              More than anything, it became a major learning project. Building
              LinkFilo helped me understand the challenges of authentication,
              user accounts, and product features beyond the main functionality
              — experience I carried into the SaaS projects that followed.
            </p>
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="px-6 pb-24">
        <div className="max-w-5xl mx-auto">
          <div
            className="rounded-2xl p-8 md:p-12 text-center"
            style={{
              background:
                "linear-gradient(135deg, rgba(59,130,246,0.08), rgba(6,182,212,0.04))",
              border: "1px solid rgba(99,179,237,0.15)",
            }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Have a similar project?
            </h2>
            <p
              className="text-base mb-8 max-w-xl mx-auto"
              style={{ color: "rgba(148,163,184,0.85)" }}
            >
              I build websites, stores, and custom web tools. Let's talk.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/contact" className="btn-primary">
                Get in Touch
              </Link>
              <Link href="/work" className="btn-secondary">
                Back to Work
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
