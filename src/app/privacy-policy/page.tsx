import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <>
      <div className="legal-hero">
        <div className="legal-hero-inner">
          <div className="legal-badge">Legal</div>
          <h1>Privacy Policy</h1>
          <p>Last updated: March 2026 &mdash; sitecroftdev.com</p>
        </div>
      </div>
      <div className="legal-content">
        <div className="legal-inner">
          <div className="legal-nav">
            <p>Also read</p>
            <div className="legal-nav-links">
              <Link href="/privacy-policy" className="active">Privacy Policy</Link>
              <Link href="/terms-and-conditions">Terms of Service</Link>
              <Link href="/cookie-policy">Cookie Policy</Link>
            </div>
          </div>

          <div className="legal-section">
            <h2>1. Who We Are</h2>
            <p>Our website address is: <a href="https://sitecroftdev.com">https://sitecroftdev.com</a></p>
            <p>Sitecroft is a solo web development service operated by Saad, based in Karachi, Pakistan. For privacy-related enquiries, contact us at <a href="mailto:contact@dnnengineer.com">contact@dnnengineer.com</a>.</p>
          </div>

          <div className="legal-section">
            <h2>2. What Personal Data We Collect and Why</h2>
            <h3>Contact Forms</h3>
            <p>When you submit a contact form on this website, we collect your name, email address, and the message content you provide. This information is used solely to respond to your enquiry and discuss potential services. Contact form data is retained for up to 6 months for customer service purposes and is not used for marketing.</p>
            <h3>Analytics</h3>
            <p>We do not currently use any third-party analytics services. Vercel, our hosting provider, may collect anonymous performance data as part of their platform operations. This data is not accessible to us unless reviewed in the Vercel dashboard.</p>
            <h3>Cookies</h3>
            <p>This website uses minimal cookies as described in our <Link href="/cookie-policy">Cookie Policy</Link>. This site is built with Next.js and hosted on Vercel. No additional analytics or tracking cookies are set by Sitecroft.</p>
          </div>

          <div className="legal-section">
            <h2>3. Third-Party Services</h2>
            <p>The following third-party services are used on this site:</p>
            <div className="plugin-block">
              <h4>Vercel</h4>
              <p>Our hosting and deployment platform. Vercel may process request data (IP addresses, browser information) as part of their edge network and security operations. See <a href="https://vercel.com/legal/privacy-policy" target="_blank">Vercel&rsquo;s Privacy Policy</a> for details.</p>
            </div>
            <div className="plugin-block">
              <h4>Hostinger SMTP</h4>
              <p>We use Hostinger SMTP to send contact form emails. Your name, email address, and message are transmitted through Hostinger&rsquo;s email servers for delivery purposes only.</p>
            </div>
          </div>

          <div className="legal-section">
            <h2>4. Who We Share Your Data With</h2>
            <p>We do not sell, trade, or share your personal data with third parties for marketing purposes. Your data may be shared only in the following limited circumstances:</p>
            <ul>
              <li>With Vercel for hosting and security purposes</li>
              <li>With Hostinger for email delivery</li>
              <li>If required to do so by law or legal process</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>5. How Long We Retain Your Data</h2>
            <ul>
              <li><strong>Contact form submissions:</strong> Retained for up to 6 months</li>
              <li><strong>Server logs:</strong> Retained by Vercel as per their data retention policies</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>6. What Rights You Have Over Your Data</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Request a copy of the personal data we hold about you</li>
              <li>Request correction of inaccurate personal data</li>
              <li>Request deletion of your personal data (subject to legal obligations)</li>
              <li>Object to processing of your personal data</li>
            </ul>
            <p>To exercise any of these rights, contact us at <a href="mailto:contact@dnnengineer.com">contact@dnnengineer.com</a>.</p>
          </div>

          <div className="legal-section">
            <h2>7. Where Your Data Is Sent</h2>
            <p>This website is hosted on Vercel&rsquo;s global edge network. Contact form data is transmitted via Hostinger SMTP for email delivery. Both services implement appropriate data protection safeguards.</p>
          </div>

          <div className="legal-section">
            <h2>8. How We Protect Your Data</h2>
            <p>We take reasonable technical measures to protect your data including SSL encryption (HTTPS), restricted admin access, and use of trusted platforms with established security practices.</p>
          </div>

          <div className="legal-section">
            <h2>9. Data Breach Procedures</h2>
            <p>In the event of a data breach that is likely to result in a risk to your rights and freedoms, we will notify affected individuals and relevant authorities as required by applicable law, within the timeframes specified by those laws.</p>
          </div>

          <div className="legal-section">
            <h2>10. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. The date at the top of this page reflects the most recent revision. Continued use of the website after changes constitutes acceptance of the updated policy.</p>
          </div>

          <div className="legal-section">
            <h2>11. Contact</h2>
            <p>For privacy-related questions or to exercise your data rights, contact us at <a href="mailto:contact@dnnengineer.com">contact@dnnengineer.com</a>.</p>
          </div>
        </div>
      </div>
    </>
  );
}