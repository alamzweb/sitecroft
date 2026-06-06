import Link from "next/link";

export default function TermsOfServicePage() {
  return (
    <>
      <div className="legal-hero">
        <div className="legal-hero-inner">
          <div className="legal-badge">Legal</div>
          <h1>Terms of Service</h1>
          <p>Last updated: March 2026 &mdash; sitecroftdev.com</p>
        </div>
      </div>
      <div className="legal-content">
        <div className="legal-inner">
          <div className="legal-nav">
            <p>Also read</p>
            <div className="legal-nav-links">
              <Link href="/privacy-policy">Privacy Policy</Link>
              <Link href="/terms-and-conditions" className="active">Terms of Service</Link>
              <Link href="/cookie-policy">Cookie Policy</Link>
            </div>
          </div>

          <div className="legal-section">
            <h2>1. Agreement to Terms</h2>
            <p>By accessing sitecroftdev.com or purchasing any service from Sitecroft, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our services.</p>
          </div>

          <div className="legal-section">
            <h2>2. Services</h2>
            <p>Sitecroft provides web development services including custom-coded websites, WordPress development, WooCommerce store setup, bug and error fixing, website maintenance, and domain and hosting setup. All services are performed remotely.</p>
            <p>Service scope, timeline, and pricing are agreed upon before work begins. Any additional requirements outside the original scope may incur additional charges, which will be communicated clearly before proceeding.</p>
          </div>

          <div className="legal-section">
            <h2>3. Payment</h2>
            <p>Payment terms are agreed upon before each project begins. For most projects, a portion of the payment is required upfront before work commences, with the remainder due upon delivery.</p>
            <p>Prices listed on the website are starting rates. Final pricing depends on project scope and will be confirmed in writing before work begins.</p>
          </div>

          <div className="legal-section">
            <h2>4. Revisions and Delivery</h2>
            <p>Sitecroft offers revisions on all projects until the client is satisfied, provided the revision requests are within the original agreed scope. Requests for new features or significant changes outside the original scope may be treated as new work.</p>
            <p>Estimated delivery timelines are provided upfront and are approximate. Delays caused by late client feedback or missing content are not the responsibility of Sitecroft.</p>
          </div>

          <div className="legal-section">
            <h2>5. Client Responsibilities</h2>
            <p>The client agrees to:</p>
            <ul>
              <li>Provide all necessary content, credentials, and information in a timely manner</li>
              <li>Review and provide feedback within a reasonable timeframe</li>
              <li>Ensure they have the rights to any content, images, or materials provided</li>
              <li>Not use delivered work for any illegal or unethical purposes</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>6. Refund Policy</h2>
            <p>Refunds are handled on a case-by-case basis. Generally:</p>
            <ul>
              <li>If work has not yet started, a full refund of any upfront payment may be issued</li>
              <li>If work is in progress, a partial refund may be considered based on work completed</li>
              <li>Completed and delivered work is not eligible for a refund unless it materially fails to meet the agreed specifications</li>
            </ul>
            <p>To request a refund or discuss a dispute, contact us at <a href="mailto:contact@dnnengineer.com">contact@dnnengineer.com</a>.</p>
          </div>

          <div className="legal-section">
            <h2>7. Intellectual Property</h2>
            <p>Upon full payment, the client owns the delivered website and its content. Sitecroft retains the right to showcase completed work in its portfolio unless the client requests otherwise in writing.</p>
            <p>Sitecroft does not claim ownership over any content, branding, or materials provided by the client.</p>
          </div>

          <div className="legal-section">
            <h2>8. Limitation of Liability</h2>
            <p>Sitecroft is not liable for any indirect, incidental, or consequential damages arising from the use of our services or delivered products. Our total liability is limited to the amount paid for the specific service in question.</p>
          </div>

          <div className="legal-section">
            <h2>9. Termination</h2>
            <p>Either party may terminate an ongoing project with written notice. In such cases, payment is due for all work completed up to the point of termination. Sitecroft reserves the right to refuse service to anyone at any time.</p>
          </div>

          <div className="legal-section">
            <h2>10. Changes to Terms</h2>
            <p>These Terms of Service may be updated periodically. The date at the top of this page reflects the most recent revision. Continued use of our services after changes constitutes acceptance of the updated terms.</p>
          </div>

          <div className="legal-section">
            <h2>11. Contact</h2>
            <p>For questions about these Terms, contact us at <a href="mailto:contact@dnnengineer.com">contact@dnnengineer.com</a>.</p>
          </div>
        </div>
      </div>
    </>
  );
}