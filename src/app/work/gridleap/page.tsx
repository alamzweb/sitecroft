"use client";

import Link from "next/link";
import { useEffect } from "react";

const meta = {
  client: "GridLeap",
  tagline: "The instant CSV-to-mobile dashboard.",
  category: "Personal SaaS",
  liveUrl: "https://gridleap.vercel.app",
};

const stats = [
  { label: "Project Type", value: "Personal SaaS" },
  { label: "Core Input", value: "CSV Spreadsheets" },
  { label: "Main Focus", value: "Mobile Dashboards" },
  { label: "Platform", value: "Next.js + Supabase" },
];

const stack = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Supabase",
  "Vercel",
  "Framer Motion",
  "PapaParse",
];

const built = [
  {
    title: "CSV upload and processing",
    body: "A CSV upload workflow that reads spreadsheet data and identifies its rows, columns, and structure. The goal was to turn an ordinary spreadsheet file into a dashboard without making users manually rebuild their data.",
  },
  {
    title: "Responsive dashboard views",
    body: "GridLeap adapts the way data is presented to the screen. On mobile, users get a polished card-based dashboard that is easier to explore on a small display. On laptops and larger screens, the data is presented in a more familiar spreadsheet-style view.",
  },
  {
    title: "KPI cards and key metrics",
    body: "Important numbers can be highlighted through KPI cards, helping users quickly understand the key information in their spreadsheet instead of having to scan every row and column.",
  },
  {
    title: "Password-protected dashboards",
    body: "Dashboard owners can optionally add a password to protect access. This provides an additional layer of control when sharing a dashboard with others.",
  },
];

const timeline = [
  {
    label: "The Idea",
    body: "Noticed how difficult spreadsheets can be to use on mobile. A conversation with ChatGPT helped turn that problem into the idea for GridLeap.",
  },
  {
    label: "Core Development",
    body: "Built the CSV processing and dashboard generation system, working through how to recognize spreadsheet structure and present the data in useful cards and views.",
  },
  {
    label: "Refinement",
    body: "Worked on the responsive experience, KPI cards, password protection, and white-label branding to make the dashboard product more complete.",
  },
];

export default function GridLeapPage() {
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
            Spreadsheets weren't built for every screen.
          </h2>
          <div
            className="space-y-5 text-base md:text-[17px] leading-relaxed max-w-3xl"
            style={{ color: "rgba(148,163,184,0.88)" }}
          >
            <p>
              GridLeap started with a problem I noticed while using
              spreadsheets on mobile. Traditional spreadsheet layouts can be
              difficult to navigate on a small screen, especially when a file
              contains many rows and columns.
            </p>
            <p>
              The idea came together during a conversation with ChatGPT.
              I wanted to build a tool that could take an ordinary CSV file
              and turn it into a dashboard that was easier to explore on a
              phone, while still keeping a familiar spreadsheet experience
              on larger screens.
            </p>
            <p>
              The goal was to make spreadsheet data more accessible and
              readable without asking users to manually create a dashboard
              from scratch.
            </p>
          </div>
        </div>
      </section>

      {/* ============ WHAT I BUILT ============ */}
      <section className="px-6 pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="section-label mb-4">What I Built</div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
            From CSV file to interactive dashboard.
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
              A dashboard that adapts to the screen.
            </h2>
            <div
              className="space-y-4 text-base md:text-[17px] leading-relaxed max-w-3xl"
              style={{ color: "rgba(148,163,184,0.9)" }}
            >
              <p>
                The same spreadsheet can feel very different depending on
                where it's opened. A wide table that works on a laptop can
                become difficult to read and navigate on a phone.
              </p>
              <p>
                GridLeap presents data in a mobile-friendly card layout
                on smaller screens, making key information easier to scan.
                On laptops and larger displays, users can work with a more
                traditional spreadsheet-style view.
              </p>
              <p>
                This responsive approach keeps the data useful across
                devices, instead of forcing the mobile experience to be
                a scaled-down version of a desktop spreadsheet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ DEVELOPMENT JOURNEY ============ */}
      <section className="px-6 pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="section-label mb-4">Development Journey</div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 max-w-3xl">
            The hard part was understanding the data.
          </h2>
          <div
            className="space-y-5 text-base md:text-[17px] leading-relaxed max-w-3xl mb-12"
            style={{ color: "rgba(148,163,184,0.88)" }}
          >
            <p>
              One of the most time-consuming parts of building GridLeap
              was the CSV processing and dashboard generation system.
              The application needed to recognize the structure of
              different spreadsheets, understand their rows and columns,
              and turn that information into useful dashboard cards.
            </p>
            <p>
              Getting the generated dashboards to look organized and
              meaningful across different kinds of data took a lot of
              refinement. After the core dashboard experience, white-label
              branding and related customization introduced another set
              of challenges to work through.
            </p>
          </div>

          <div className="section-label mb-4">Timeline</div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
            From a mobile problem to a working SaaS.
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
            A spreadsheet problem turned into a SaaS product.
          </h2>
          <div
            className="space-y-4 text-base md:text-[17px] leading-relaxed max-w-3xl"
            style={{ color: "rgba(148,163,184,0.88)" }}
          >
            <p>
              GridLeap turned a common spreadsheet frustration into a
              working SaaS product. It makes CSV data easier to explore
              on mobile, keeps a familiar spreadsheet experience on
              larger screens, and gives users a simple way to create
              and share dashboards.
            </p>
            <p>
              What began as an idea from a conversation became a complete
              product with CSV processing, responsive dashboard views,
              KPI cards, and optional password protection — while also
              giving me hands-on experience with the challenges of
              building a data-driven web application.
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
