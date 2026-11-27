import type { Metadata } from "next";
import FeedbackForm from "@/components/FeedbackForm";
import "./feedback.css";

export const metadata: Metadata = {
  title: "Client Feedback | Sitecroft",
  description:
    "Share your experience working with Sitecroft. Your feedback helps improve future projects.",
};

export default function FeedbackPage() {
  return (
    <>
      <section className="page-hero">
        <div className="page-hero-bg" />
        <div className="page-hero-grid" />
        <div className="page-hero-inner">
          <div className="page-badge">
            <div className="badge-dot" />
            Client Feedback
          </div>
          <h1>
            Share Your <span>Experience</span>
          </h1>
          <p>
            Thanks for working with Sitecroft. A few words about your experience
            help me improve and help future clients know what to expect.
          </p>
        </div>
      </section>

      <section className="feedback-section">
        <FeedbackForm />
      </section>
    </>
  );
}
