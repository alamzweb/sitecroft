import Link from "next/link";

export default function CookiePolicyPage() {
  return (
    <>
      <div className="legal-hero">
        <div className="legal-hero-inner">
          <div className="legal-badge">Legal</div>
          <h1>Cookie Policy</h1>
          <p>Last updated: March 2026 &mdash; sitecroftdev.com</p>
        </div>
      </div>
      <div className="legal-content">
        <div className="legal-inner">
          <div className="legal-nav">
            <p>Also read</p>
            <div className="legal-nav-links">
              <Link href="/privacy-policy">Privacy Policy</Link>
              <Link href="/terms-and-conditions">Terms of Service</Link>
              <Link href="/cookie-policy" className="active">Cookie Policy</Link>
            </div>
          </div>

          <div className="legal-section">
            <h2>1. What Are Cookies?</h2>
            <p>Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work, improve performance, and provide information to the website owner. Cookies can be &ldquo;session cookies&rdquo; that expire when you close your browser, or &ldquo;persistent cookies&rdquo; that remain on your device for a set period of time.</p>
          </div>

          <div className="legal-section">
            <h2>2. How We Use Cookies</h2>
            <p>Sitecroft uses minimal cookies and browser storage. This website is built with Next.js and hosted on Vercel. The following categories apply:</p>

            <div className="cookie-cat">
              <div className="cookie-cat-header">
                <div className="cookie-cat-dot" style={{ background: "#22c55e" }} />
                <div>
                  <h3>Essential</h3>
                  <p>These cookies are necessary for the website to function. Next.js may use session-based cookies for routing and navigation. Vercel may set cookies for load balancing and security. You cannot opt out of these.</p>
                </div>
              </div>
            </div>

            <div className="cookie-cat">
              <div className="cookie-cat-header">
                <div className="cookie-cat-dot" style={{ background: "#3b82f6" }} />
                <div>
                  <h3>Analytics</h3>
                  <p>We do not currently use any third-party analytics services (such as Google Analytics) on this website. No analytics cookies are set by Sitecroft itself. Vercel, our hosting provider, may collect anonymous performance metrics as part of their platform operations, but this data is not accessible to us unless explicitly reviewed in the Vercel dashboard.</p>
                </div>
              </div>
            </div>

            <div className="cookie-cat">
              <div className="cookie-cat-header">
                <div className="cookie-cat-dot" style={{ background: "#f59e0b" }} />
                <div>
                  <h3>Third-Party Services</h3>
                  <p>The following third-party services are used on this website and may set their own cookies:</p>
                  <ul style={{ marginTop: 8 }}>
                    <li><strong>Vercel</strong> &mdash; our hosting and deployment platform. Vercel may set cookies for performance monitoring, security, and edge network functionality. See <a href="https://vercel.com/legal/privacy-policy" target="_blank">Vercel&rsquo;s Privacy Policy</a> for details.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="legal-section">
            <h2>3. Managing Cookies</h2>
            <p>You can control cookies in the following ways:</p>
            <ul>
              <li><strong>Browser settings:</strong> Most browsers allow you to view, block, or delete cookies. Check your browser&rsquo;s help documentation for instructions.</li>
              <li><strong>Block all cookies:</strong> You can set your browser to block all cookies, but this may affect website functionality.</li>
              <li><strong>Delete cookies:</strong> You can delete existing cookies at any time through your browser settings.</li>
            </ul>
            <p>Please note that disabling essential cookies may affect how the website functions.</p>
          </div>

          <div className="legal-section">
            <h2>4. localStorage</h2>
            <p>This website does not currently use browser localStorage for storing user data. Any future use of localStorage will be documented in an update to this policy.</p>
          </div>

          <div className="legal-section">
            <h2>5. Updates to This Policy</h2>
            <p>This Cookie Policy may be updated when new features or services are added. The date at the top reflects the latest revision. We recommend reviewing this page periodically.</p>
          </div>

          <div className="legal-section">
            <h2>6. Contact</h2>
            <p>Questions about our use of cookies? Contact us at <a href="mailto:contact@dnnengineer.com">contact@dnnengineer.com</a>.</p>
          </div>
        </div>
      </div>
    </>
  );
}