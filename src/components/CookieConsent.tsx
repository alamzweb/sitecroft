"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie, X, Settings2, Check, ShieldCheck } from "lucide-react";

type ConsentCategory = "necessary" | "analytics" | "marketing";
type ConsentRecord = Record<ConsentCategory, boolean>;

const STORAGE_KEY = "sitecroft_cookie_consent";

const DEFAULT_CONSENT: ConsentRecord = {
  necessary: true,
  analytics: false,
  marketing: false,
};

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [consent, setConsent] = useState<ConsentRecord>(DEFAULT_CONSENT);

  /* Load existing consent on mount */
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        setVisible(true);
      } else {
        const parsed = JSON.parse(stored) as ConsentRecord;
        setConsent({ ...DEFAULT_CONSENT, ...parsed });
      }
    } catch {
      setVisible(true);
    }
  }, []);

  /* Persist & dispatch a custom event for analytics scripts */
  const saveConsent = (record: ConsentRecord) => {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ ...record, savedAt: new Date().toISOString() })
      );
    } catch {
      /* storage unavailable — fail silently */
    }
    window.dispatchEvent(
      new CustomEvent("sitecroft:consent", { detail: record })
    );
  };

  const handleAcceptAll = () => {
    const all: ConsentRecord = { necessary: true, analytics: true, marketing: true };
    setConsent(all);
    saveConsent(all);
    setVisible(false);
    setShowDetails(false);
  };

  const handleRejectAll = () => {
    const rejected: ConsentRecord = { necessary: true, analytics: false, marketing: false };
    setConsent(rejected);
    saveConsent(rejected);
    setVisible(false);
    setShowDetails(false);
  };

  const handleSavePreferences = () => {
    saveConsent(consent);
    setVisible(false);
    setShowDetails(false);
  };

  const toggleCategory = (category: ConsentCategory) => {
    if (category === "necessary") return; // always on
    setConsent((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  if (!visible) return null;

  return (
    <>
      {/* ── Backdrop (only when customize is open) ── */}
      {showDetails && (
        <div
          className="cookie-backdrop"
          onClick={() => setShowDetails(false)}
          aria-hidden="true"
        />
      )}

      {/* ── Banner ── */}
      <div
        className={`cookie-banner ${showDetails ? "expanded" : ""}`}
        role="dialog"
        aria-live="polite"
        aria-label="Cookie consent"
      >
        {!showDetails ? (
          /* ── Compact view ── */
          <div className="cookie-compact">
            <div className="cookie-compact-header">
              <div className="cookie-icon-wrap">
                <Cookie size={18} />
              </div>
              <div className="cookie-compact-text">
                <h4>We use cookies</h4>
                <p>
                  We use cookies to enhance your experience, analyze traffic, and
                  improve our service. You can accept all, reject non-essential, or
                  customize your preferences.{" "}
                  <Link href="/cookie-policy" className="cookie-link">
                    Read our Cookie Policy
                  </Link>
                </p>
              </div>
            </div>
            <div className="cookie-compact-actions">
              <button
                type="button"
                className="cookie-btn cookie-btn-ghost"
                onClick={() => setShowDetails(true)}
              >
                <Settings2 size={14} />
                Customize
              </button>
              <button
                type="button"
                className="cookie-btn cookie-btn-secondary"
                onClick={handleRejectAll}
              >
                Reject All
              </button>
              <button
                type="button"
                className="cookie-btn cookie-btn-primary"
                onClick={handleAcceptAll}
              >
                Accept All
              </button>
            </div>
          </div>
        ) : (
          /* ── Expanded view with category toggles ── */
          <div className="cookie-expanded">
            <div className="cookie-expanded-header">
              <div className="cookie-icon-wrap">
                <ShieldCheck size={18} />
              </div>
              <div>
                <h4>Privacy Preferences</h4>
                <p>
                  Choose how we use cookies on this site. You can change these
                  settings anytime.{" "}
                  <Link href="/cookie-policy" className="cookie-link">
                    Cookie Policy
                  </Link>
                </p>
              </div>
              <button
                type="button"
                className="cookie-close"
                onClick={() => setShowDetails(false)}
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>

            <div className="cookie-categories">
              {/* Necessary */}
              <div className="cookie-category">
                <div className="cookie-category-info">
                  <div className="cookie-category-head">
                    <h5>Necessary</h5>
                    <span className="cookie-badge cookie-badge-locked">
                      Always active
                    </span>
                  </div>
                  <p>
                    Required for the site to function &mdash; routing, security, and
                    load balancing. Cannot be disabled.
                  </p>
                </div>
                <div className="cookie-toggle cookie-toggle-locked" aria-hidden="true">
                  <div className="cookie-toggle-knob" />
                </div>
              </div>

              {/* Analytics */}
              <div className="cookie-category">
                <div className="cookie-category-info">
                  <div className="cookie-category-head">
                    <h5>Analytics</h5>
                    <span className="cookie-badge cookie-badge-optional">
                      Optional
                    </span>
                  </div>
                  <p>
                    Help us understand how visitors interact with the site via
                    Vercel Web Analytics, Google Analytics, and Umami. Used to
                    improve performance and content.
                  </p>
                </div>
                <button
                  type="button"
                  className={`cookie-toggle ${consent.analytics ? "on" : ""}`}
                  onClick={() => toggleCategory("analytics")}
                  aria-label="Toggle analytics cookies"
                  aria-pressed={consent.analytics}
                >
                  <div className="cookie-toggle-knob" />
                </button>
              </div>

              {/* Marketing */}
              <div className="cookie-category">
                <div className="cookie-category-info">
                  <div className="cookie-category-head">
                    <h5>Marketing</h5>
                    <span className="cookie-badge cookie-badge-optional">
                      Optional
                    </span>
                  </div>
                  <p>
                    Used to deliver personalized ads and measure campaign
                    performance. We do not currently use marketing cookies, but
                    enabling this category future-proofs your preferences.
                  </p>
                </div>
                <button
                  type="button"
                  className={`cookie-toggle ${consent.marketing ? "on" : ""}`}
                  onClick={() => toggleCategory("marketing")}
                  aria-label="Toggle marketing cookies"
                  aria-pressed={consent.marketing}
                >
                  <div className="cookie-toggle-knob" />
                </button>
              </div>
            </div>

            <div className="cookie-expanded-actions">
              <button
                type="button"
                className="cookie-btn cookie-btn-ghost"
                onClick={handleRejectAll}
              >
                Reject All
              </button>
              <button
                type="button"
                className="cookie-btn cookie-btn-secondary"
                onClick={handleSavePreferences}
              >
                <Check size={14} />
                Save Preferences
              </button>
              <button
                type="button"
                className="cookie-btn cookie-btn-primary"
                onClick={handleAcceptAll}
              >
                Accept All
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}