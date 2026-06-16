"use client";
import { useState, FormEvent } from "react";
import { CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    promoCode: "",
    message: "",
  });
  const [status, setStatus] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setSent(true);
        setFormData({ name: "", email: "", phone: "", service: "", promoCode: "", message: "" });
      } else {
        setStatus({ type: "error", msg: data.error || "Something went wrong. Please try again." });
      }
    } catch {
      setStatus({ type: "error", msg: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <>
        <section className="page-hero">
          <div className="page-hero-bg" />
          <div className="page-hero-grid" />
          <div className="page-hero-inner">
            <div className="page-badge"><div className="badge-dot" />Get In Touch</div>
            <h1>Let's Build Something <span>Together</span></h1>
            <p>Describe your project and I'll get back to you within 24 hours with a clear plan and quote. No commitment required.</p>
          </div>
        </section>

        <section className="contact-section">
          <div className="contact-inner" style={{ display: "flex", justifyContent: "center" }}>
            <div className="contact-form-wrap" style={{ maxWidth: 520, textAlign: "center" }}>
              <div style={{ fontSize: 56, marginBottom: 16, color: "#22c55e", display: "flex", justifyContent: "center" }}>
                <CheckCircle size={56} stroke="#22c55e" strokeWidth={1.5} />
              </div>
              <div className="form-title" style={{ fontSize: 22 }}>Message Sent!</div>
              <div className="form-sub" style={{ fontSize: 15, marginBottom: 8 }}>
                Thank you for reaching out. I've received your message and will get back to you within 24 hours.
              </div>
              <div className="response-badge" style={{ justifyContent: "center", marginTop: 16 }}>
                <div className="response-dot" />
                <p><strong>Currently available</strong> for new projects.</p>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="page-hero">
        <div className="page-hero-bg" />
        <div className="page-hero-grid" />
        <div className="page-hero-inner">
          <div className="page-badge"><div className="badge-dot" />Get In Touch</div>
          <h1>Let's Build Something <span>Together</span></h1>
          <p>Describe your project and I'll get back to you within 24 hours with a clear plan and quote. No commitment required.</p>
        </div>
      </section>

      <section className="contact-section">
        <div className="contact-inner">
          <div className="contact-info">
            <h2>How Can I Help You?</h2>
            <p>Whether you need a new website, a redesign, a fix, or just want to ask a question — I read every message personally and respond quickly.</p>
            <div className="contact-card">
              <div className="contact-card-icon" style={{ background: "rgba(59,130,246,0.1)" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </div>
              <div><h4>Email</h4><a href="mailto:contact@dnnengineer.com">contact@dnnengineer.com</a></div>
            </div>
            <div className="contact-card">
              <div className="contact-card-icon" style={{ background: "rgba(6,182,212,0.1)" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <div><h4>Location</h4><span>Karachi, Pakistan</span></div>
            </div>
            <div className="contact-card">
              <div className="contact-card-icon" style={{ background: "rgba(16,185,129,0.1)" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <div><h4>Response Time</h4><span>Within 24 hours</span></div>
            </div>
            <div className="response-badge">
              <div className="response-dot" />
              <p><strong>Currently available</strong> for new projects. Feel free to reach out anytime.</p>
            </div>
          </div>
          <div className="contact-form-wrap">
            <div className="form-title">Send a Message</div>
            <div className="form-sub">Fill in the details below and I'll get back to you shortly.</div>
            <form onSubmit={handleSubmit}>
              <div className="form-field">
                <label className="field-label" htmlFor="name">Your Name *</label>
                <input id="name" name="name" type="text" required placeholder="John Doe" value={formData.name} onChange={handleChange} />
              </div>
              <div className="form-field">
                <label className="field-label" htmlFor="email">Email Address *</label>
                <input id="email" name="email" type="email" required placeholder="john@example.com" value={formData.email} onChange={handleChange} />
              </div>
              <div className="form-field">
                <label className="field-label" htmlFor="phone">Phone Number (optional)</label>
                <input id="phone" name="phone" type="tel" placeholder="+1 234 567 890" value={formData.phone} onChange={handleChange} />
              </div>
              <div className="form-field">
                <label className="field-label" htmlFor="service">Service Interested In</label>
                <select id="service" name="service" value={formData.service} onChange={handleChange}>
                  <option value="">Select a service...</option>
                  <option value="Standard WordPress Site">Standard WordPress Site</option>
                  <option value="Custom Code Website">Custom Code Website</option>
                  <option value="WooCommerce Store">WooCommerce Store</option>
                  <option value="WordPress Support & Tasks">WordPress Support & Tasks</option>
                  <option value="Landing Page">Landing Page</option>
                  <option value="Custom Feature / Page Edits">Custom Feature / Page Edits</option>
                  <option value="Bug & Error Fixing">Bug & Error Fixing</option>
                  <option value="Website Maintenance">Website Maintenance</option>
                  <option value="Domain & Hosting Setup">Domain & Hosting Setup</option>
                  <option value="Something else">Something else</option>
                </select>
              </div>
              <div className="form-field">
                <label className="field-label" htmlFor="promoCode">Promo Code (Optional)</label>
                <input id="promoCode" name="promoCode" type="text" placeholder="e.g. SITECROFT-XXXXX" value={formData.promoCode} onChange={handleChange} />
              </div>
              <div className="form-field">
                <label className="field-label" htmlFor="message">Tell Me About Your Project *</label>
                <textarea id="message" name="message" required placeholder="Describe what you need — budget, timeline, features, etc." value={formData.message} onChange={handleChange} />
              </div>
              <button type="submit" className="form-submit" disabled={loading}>
                {loading ? "Sending..." : "Send Message"}
              </button>
              {status && (
                <div className={`form-status ${status.type === "success" ? "form-success" : "form-error"}`}>
                  {status.msg}
                </div>
              )}
            </form>
            <p className="form-note">I'll reply within 24 hours. Your information is kept private and never shared.</p>
          </div>
        </div>
      </section>
    </>
  );
}