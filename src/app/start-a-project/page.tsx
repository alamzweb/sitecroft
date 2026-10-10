import type { Metadata } from "next";
import ProjectIntakeForm from "@/components/ProjectIntakeForm";

export const metadata: Metadata = {
  title: "Start a Project",
  description:
    "Tell me about your website or app project. A short, guided intake form — WordPress, custom code, e-commerce, automation, and more. Free consultation, no commitment.",
};

export default function StartAProjectPage() {
  return (
    <>
      <section className="page-hero">
        <div className="page-hero-bg" />
        <div className="page-hero-grid" />
        <div className="page-hero-inner">
          <div className="page-badge"><div className="badge-dot" />Project Intake</div>
          <h1>Start a <span>Project</span></h1>
          <p>
            Answer a few quick questions and I&apos;ll get back to you within 24 hours with a clear plan
            and quote. No commitment required.
          </p>
        </div>
      </section>

      <section className="intake-section">
        <ProjectIntakeForm />
      </section>
    </>
  );
}
