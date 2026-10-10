"use client";

import { useState, useRef, FormEvent } from "react";
import { ArrowLeft, ArrowRight, Loader2, CheckCircle2, AlertCircle, Pencil } from "lucide-react";
import {
  SERVICE_OPTIONS,
  BUDGET_OPTIONS,
  MATERIALS_OPTIONS,
  LIMITS,
  isBugFixingSelected,
  isValidEmail,
  type ProjectInquiry,
} from "@/lib/project-intake";

type Errors = Partial<Record<keyof ProjectInquiry, string>>;

interface FormState {
  fullName: string;
  email: string;
  companyName: string;
  currentWebsiteUrl: string;
  services: string[];
  projectDescription: string;
  referenceLinks: string;
  problemUrl: string;
  problemDescription: string;
  budget: string;
  timeline: string;
  materials: string;
}

const EMPTY: FormState = {
  fullName: "",
  email: "",
  companyName: "",
  currentWebsiteUrl: "",
  services: [],
  projectDescription: "",
  referenceLinks: "",
  problemUrl: "",
  problemDescription: "",
  budget: "",
  timeline: "",
  materials: "",
};

const TOTAL_STEPS = 4;

const STEP_NAMES = ["About you", "Your project", "Budget & timeline", "Review & submit"];

/** Validate a single step's fields. Returns error map (empty = valid). */
function validateStep(step: number, s: FormState): Errors {
  const e: Errors = {};

  if (step === 1) {
    if (!s.fullName.trim()) e.fullName = "Please enter your full name.";
    else if (s.fullName.length > LIMITS.fullName) e.fullName = `Name must be ${LIMITS.fullName} characters or fewer.`;
    if (!s.email.trim()) e.email = "Please enter your email address.";
    else if (!isValidEmail(s.email.trim().toLowerCase())) e.email = "Please enter a valid email address.";
    if (s.companyName.length > LIMITS.companyName) e.companyName = `Company name must be ${LIMITS.companyName} characters or fewer.`;
    if (s.currentWebsiteUrl.length > LIMITS.currentWebsiteUrl) e.currentWebsiteUrl = "Website URL is too long.";
  }

  if (step === 2) {
    if (s.services.length === 0) e.services = "Please select at least one service.";
    if (!s.projectDescription.trim()) e.projectDescription = "Please describe your project.";
    else if (s.projectDescription.length > LIMITS.projectDescription) e.projectDescription = `Description must be ${LIMITS.projectDescription} characters or fewer.`;
    if (s.referenceLinks.length > LIMITS.referenceLinks) e.referenceLinks = "Reference links are too long.";
    if (isBugFixingSelected(s.services)) {
      if (!s.problemDescription.trim()) e.problemDescription = "Please describe the problem or error.";
      else if (s.problemDescription.length > LIMITS.problemDescription) e.problemDescription = `Problem description must be ${LIMITS.problemDescription} characters or fewer.`;
      if (s.problemUrl.length > LIMITS.problemUrl) e.problemUrl = "URL is too long.";
    }
  }

  if (step === 3) {
    if (!s.materials) e.materials = "Please select your materials availability.";
    if (s.timeline.length > LIMITS.timeline) e.timeline = `Timeline must be ${LIMITS.timeline} characters or fewer.`;
  }

  return e;
}

export default function ProjectIntakeForm() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "success" | "uncertain">("idle");
  const [submitMsg, setSubmitMsg] = useState("");
  const [honeypot, setHoneypot] = useState("");

  // Synchronous in-flight guard — prevents duplicate requests even if the user
  // double-clicks faster than React can re-render (state updates are async).
  const inFlight = useRef(false);

  const showBug = isBugFixingSelected(form.services);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key as keyof Errors]) return prev;
      const next = { ...prev };
      delete next[key as keyof Errors];
      return next;
    });
  };

  const toggleService = (value: string) => {
    setForm((prev) => ({
      ...prev,
      services: prev.services.includes(value)
        ? prev.services.filter((s) => s !== value)
        : [...prev.services, value],
    }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next.services;
      return next;
    });
  };

  const goNext = () => {
    const stepErrors = validateStep(step, form);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});
    setStep((s) => Math.min(TOTAL_STEPS, s + 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goBack = () => {
    setErrors({});
    setStep((s) => Math.max(1, s - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const jumpTo = (target: number) => {
    setErrors({});
    setStep(target);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Navigation only. Enter in a text field advances the step; it can never
    // submit the inquiry. The real submission runs only in submitInquiry().
    if (step !== TOTAL_STEPS) {
      goNext();
    }
  };

  const submitInquiry = async () => {

    // The inquiry is only ever submitted from the final review step (step 4),
    // and only via an explicit Submit action. On steps 1–3 an implicit form
    // submission (e.g. pressing Enter in a text field) must never call the
    // API — treat it as "continue to the next step" instead, so the review
    // screen can never be bypassed.
    if (inFlight.current || submitState === "submitting" || submitState === "success") return; // prevent duplicates

    // Re-validate all steps that carry required data before submitting.
    const all: Errors = {
      ...validateStep(1, form),
      ...validateStep(2, form),
      ...validateStep(3, form),
    };
    if (Object.keys(all).length > 0) {
      setErrors(all);
      if (all.fullName || all.email || all.companyName || all.currentWebsiteUrl) setStep(1);
      else if (all.services || all.projectDescription || all.referenceLinks || all.problemUrl || all.problemDescription) setStep(2);
      else setStep(3);
      return;
    }

    setSubmitState("submitting");
    setSubmitMsg("");
    inFlight.current = true;

    const payload: ProjectInquiry = {
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      companyName: form.companyName.trim(),
      currentWebsiteUrl: form.currentWebsiteUrl.trim(),
      services: form.services,
      projectDescription: form.projectDescription.trim(),
      referenceLinks: form.referenceLinks.trim(),
      problemUrl: form.problemUrl.trim(),
      problemDescription: form.problemDescription.trim(),
      budget: form.budget,
      timeline: form.timeline.trim(),
      materials: form.materials,
      honeypot,
    };

    try {
      const res = await fetch("/api/project-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // Parse defensively: a non-JSON or empty body must not be treated as success.
      let data: { message?: string; error?: string; errors?: Errors } | null = null;
      try {
        data = (await res.json()) as { message?: string; error?: string; errors?: Errors };
      } catch {
        data = null;
      }

      if (res.ok && data) {
        // Confirmed success: server stored the inquiry and returned a message.
        setSubmitState("success");
        setSubmitMsg(data.message || "Thanks! Your project inquiry has been received.");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (res.status === 400 && data && data.errors) {
        // Validation errors: nothing was saved; safe to fix and retry.
        setErrors(data.errors);
        setSubmitState("idle");
        if (data.errors.fullName || data.errors.email || data.errors.companyName || data.errors.currentWebsiteUrl) setStep(1);
        else if (data.errors.services || data.errors.projectDescription || data.errors.referenceLinks || data.errors.problemUrl || data.errors.problemDescription) setStep(2);
        else setStep(3);
      } else {
        // Ambiguous: 5xx, unparseable body, or an unexpected status. The server
        // may have ALREADY saved the inquiry (e.g. the Sheets write committed but
        // the response was lost). Never claim a hard failure and never auto-
        // resubmit (that would create a duplicate). Keep the data and give a safe
        // recovery path.
        setSubmitState("uncertain");
        setSubmitMsg(
          "We couldn't confirm whether your inquiry was received. It may already have been saved, so please don't submit again. Check your email for a confirmation, or contact contact@dnnengineer.com and we'll take care of it."
        );
      }
    } catch {
      // Network-level failure: the request may or may not have reached the server.
      // Treat as ambiguous — never auto-resubmit.
      setSubmitState("uncertain");
      setSubmitMsg(
        "We couldn't confirm whether your inquiry was received. It may already have been saved, so please don't submit again. Check your email for a confirmation, or contact contact@dnnengineer.com and we'll take care of it."
      );
    } finally {
      inFlight.current = false;
    }
  };

  /* ── Success screen ── */
  if (submitState === "success") {
    return (
      <div className="intake-card">
        <div className="intake-success">
          <div className="intake-success-icon">
            <CheckCircle2 size={48} stroke="#22c55e" strokeWidth={1.5} />
          </div>
          <div className="form-title" style={{ fontSize: 22 }}>Inquiry Received!</div>
          <div className="form-sub" style={{ fontSize: 15 }}>
            {submitMsg} I&apos;ll review the details and get back to you within 24 hours.
          </div>
          <div className="response-badge" style={{ justifyContent: "center", marginTop: 20 }}>
            <div className="response-dot" />
            <p><strong>Currently available</strong> for new projects.</p>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="intake-card">
      {/* Progress */}
      <div className="intake-progress">
        <div className="intake-progress-head">
          <span className="intake-step-count">Step {step} of {TOTAL_STEPS}</span>
          <span className="intake-step-name">{STEP_NAMES[step - 1]}</span>
        </div>
        <div
          className="intake-progress-track"
          role="progressbar"
          aria-valuemin={1} aria-valuemax={TOTAL_STEPS} aria-valuenow={step}
          aria-label={`Step ${step} of ${TOTAL_STEPS}`}
        >
          <div className="intake-progress-bar" style={{ width: `${(step / TOTAL_STEPS) * 100}%` }} />
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        {/* Honeypot — hidden from users, bots fill it */}
        <div className="intake-honeypot" aria-hidden="true">
          <label htmlFor="intake-hp">Leave this field empty</label>
          <input id="intake-hp" name="intake_hp" type="text" tabIndex={-1} autoComplete="off"
            value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
        </div>

        {step === 1 && (
          <fieldset className="intake-step">
            <legend className="form-title">About you</legend>
            <div className="form-sub">How can I reach you about this project?</div>

            <div className="form-field">
              <label className="field-label" htmlFor="fullName">Full name *</label>
              <input id="fullName" name="fullName" type="text" autoComplete="name"
                placeholder="Jane Doe" maxLength={LIMITS.fullName}
                value={form.fullName} onChange={(e) => set("fullName", e.target.value)}
                aria-invalid={!!errors.fullName} aria-describedby={errors.fullName ? "fullName-err" : undefined}
                className={errors.fullName ? "input-error" : undefined} />
              {errors.fullName && <p className="field-error" id="fullName-err">{errors.fullName}</p>}
            </div>

            <div className="form-field">
              <label className="field-label" htmlFor="email">Email address *</label>
              <input id="email" name="email" type="email" autoComplete="email"
                placeholder="jane@example.com" maxLength={LIMITS.email}
                value={form.email} onChange={(e) => set("email", e.target.value)}
                aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-err" : undefined}
                className={errors.email ? "input-error" : undefined} />
              {errors.email && <p className="field-error" id="email-err">{errors.email}</p>}
            </div>

            <div className="form-field">
              <label className="field-label" htmlFor="companyName">Company / business name (optional)</label>
              <input id="companyName" name="companyName" type="text" autoComplete="organization"
                placeholder="Acme Inc." maxLength={LIMITS.companyName}
                value={form.companyName} onChange={(e) => set("companyName", e.target.value)} />
            </div>

            <div className="form-field">
              <label className="field-label" htmlFor="currentWebsiteUrl">Current website URL (optional)</label>
              <input id="currentWebsiteUrl" name="currentWebsiteUrl" type="url" autoComplete="url"
                placeholder="https://yoursite.com" maxLength={LIMITS.currentWebsiteUrl}
                value={form.currentWebsiteUrl} onChange={(e) => set("currentWebsiteUrl", e.target.value)}
                aria-invalid={!!errors.currentWebsiteUrl} aria-describedby={errors.currentWebsiteUrl ? "cur-err" : undefined}
                className={errors.currentWebsiteUrl ? "input-error" : undefined} />
              {errors.currentWebsiteUrl && <p className="field-error" id="cur-err">{errors.currentWebsiteUrl}</p>}
            </div>
          </fieldset>
        )}



        {step === 2 && (
          <fieldset className="intake-step">
            <legend className="form-title">Your project</legend>
            <div className="form-sub">Tell me what you need — I&apos;ll take it from there.</div>

            <div className="form-field">
              <span className="field-label">Services needed *</span>
              <p className="field-hint">Select all that apply.</p>
              <div className="intake-pills" role="group" aria-label="Services needed">
                {SERVICE_OPTIONS.map((opt) => {
                  const active = form.services.includes(opt.value);
                  return (
                    <label key={opt.value} className={`intake-pill${active ? " active" : ""}`}>
                      <input type="checkbox" checked={active} onChange={() => toggleService(opt.value)} />
                      <span>{opt.label}</span>
                    </label>
                  );
                })}
              </div>
              {errors.services && <p className="field-error">{errors.services}</p>}
            </div>

            <div className="form-field">
              <label className="field-label" htmlFor="projectDescription">Project description *</label>
              <textarea id="projectDescription" name="projectDescription"
                placeholder="What would you like built, improved, or fixed? Describe your goals, must-have features, and any ideas you already have."
                maxLength={LIMITS.projectDescription} rows={6}
                value={form.projectDescription} onChange={(e) => set("projectDescription", e.target.value)}
                aria-invalid={!!errors.projectDescription} aria-describedby={errors.projectDescription ? "desc-err" : undefined}
                className={errors.projectDescription ? "input-error" : undefined} />
              <div className="field-meta">{form.projectDescription.length}/{LIMITS.projectDescription}</div>
              {errors.projectDescription && <p className="field-error" id="desc-err">{errors.projectDescription}</p>}
            </div>

            <div className="form-field">
              <label className="field-label" htmlFor="referenceLinks">Example websites or reference links (optional)</label>
              <textarea id="referenceLinks" name="referenceLinks"
                placeholder="Paste any links that show the style or features you like (one per line)."
                maxLength={LIMITS.referenceLinks} rows={3}
                value={form.referenceLinks} onChange={(e) => set("referenceLinks", e.target.value)} />
            </div>

            {showBug && (
              <div className="intake-conditional">
                <div className="intake-conditional-title">Bug fixing details</div>
                <div className="form-field">
                  <label className="field-label" htmlFor="problemUrl">
                    Website / project URL {form.currentWebsiteUrl ? "(optional — you provided one above)" : "(optional)"}
                  </label>
                  <input id="problemUrl" name="problemUrl" type="url"
                    placeholder="https://yoursite.com" maxLength={LIMITS.problemUrl}
                    value={form.problemUrl} onChange={(e) => set("problemUrl", e.target.value)}
                    className={errors.problemUrl ? "input-error" : undefined} />
                  {errors.problemUrl && <p className="field-error">{errors.problemUrl}</p>}
                </div>
                <div className="form-field">
                  <label className="field-label" htmlFor="problemDescription">Description of the problem or error *</label>
                  <textarea id="problemDescription" name="problemDescription"
                    placeholder="What's happening? Include any error messages, when it started, and what you've already tried."
                    maxLength={LIMITS.problemDescription} rows={4}
                    value={form.problemDescription} onChange={(e) => set("problemDescription", e.target.value)}
                    aria-invalid={!!errors.problemDescription} aria-describedby={errors.problemDescription ? "prob-err" : undefined}
                    className={errors.problemDescription ? "input-error" : undefined} />
                  {errors.problemDescription && <p className="field-error" id="prob-err">{errors.problemDescription}</p>}
                </div>
              </div>
            )}
          </fieldset>
        )}



        {step === 3 && (
          <fieldset className="intake-step">
            <legend className="form-title">Budget and timeline</legend>
            <div className="form-sub">Rough estimates are fine — nothing here is binding.</div>

            <div className="form-field">
              <label className="field-label" htmlFor="budget">Approximate budget (optional)</label>
              <select id="budget" name="budget" value={form.budget} onChange={(e) => set("budget", e.target.value)}>
                <option value="">Select a range...</option>
                {BUDGET_OPTIONS.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            <div className="form-field">
              <label className="field-label" htmlFor="timeline">Desired completion date or timeline (optional)</label>
              <input id="timeline" name="timeline" type="text"
                placeholder="e.g. ASAP, within 3 weeks, end of the month"
                maxLength={LIMITS.timeline}
                value={form.timeline} onChange={(e) => set("timeline", e.target.value)} />
            </div>

            <div className="form-field">
              <span className="field-label">Content and materials availability *</span>
              <div className="intake-radios" role="radiogroup" aria-label="Content and materials availability">
                {MATERIALS_OPTIONS.map((m) => (
                  <label key={m} className={`intake-radio${form.materials === m ? " active" : ""}`}>
                    <input type="radio" name="materials" value={m}
                      checked={form.materials === m} onChange={() => set("materials", m)} />
                    <span>{m}</span>
                  </label>
                ))}
              </div>
              {errors.materials && <p className="field-error">{errors.materials}</p>}
            </div>
          </fieldset>
        )}

        {step === 4 && <ReviewStep form={form} onJump={jumpTo} />}

        {/* Nav buttons */}
        <div className="intake-nav">
          {step > 1 && (
            <button type="button" className="btn-secondary intake-nav-btn" onClick={goBack}>
              <ArrowLeft size={16} /> Back
            </button>
          )}
          {step < 4 ? (
            <button type="button" className="form-submit intake-nav-btn intake-nav-continue" onClick={goNext}>
              Continue <ArrowRight size={16} />
            </button>
          ) : (
            <button
              type="button"
              className="form-submit intake-nav-btn intake-nav-continue"
              onClick={submitInquiry}
              disabled={submitState === "submitting"}
            >
              {submitState === "submitting" ? (<><Loader2 size={16} className="spin" /> Submitting...</>) : "Submit Project Inquiry"}
            </button>
          )}
        </div>

        {(submitState === "uncertain") && (
          <div className="form-status form-error" role="alert">
            <AlertCircle size={15} style={{ verticalAlign: "-2px", marginRight: 6 }} />
            {submitMsg}
          </div>
        )}
      </form>

      <p className="form-note">Your information is kept private and never shared.</p>
    </div>
  );
}



/* ── Review step (module-level components — never created during render) ── */
interface ReviewRowProps {
  label: string;
  value: string;
  step: number;
  onJump: (target: number) => void;
}

function ReviewRow({ label, value, step, onJump }: ReviewRowProps) {
  return (
    <div className="review-row">
      <div className="review-label">{label}</div>
      <div className="review-value">{value || <span className="review-empty">—</span>}</div>
      <button type="button" className="review-edit" onClick={() => onJump(step)} aria-label={`Edit ${label}`}>
        <Pencil size={14} /> Edit
      </button>
    </div>
  );
}

interface ReviewSectionProps {
  title: string;
  step: number;
  onJump: (target: number) => void;
  children: React.ReactNode;
}

function ReviewSection({ title, step, onJump, children }: ReviewSectionProps) {
  return (
    <div className="review-section">
      <button type="button" className="review-section-title" onClick={() => onJump(step)}>
        {title} <Pencil size={13} />
      </button>
      {children}
    </div>
  );
}

function ReviewStep({ form, onJump }: { form: FormState; onJump: (target: number) => void }) {
  const showBug = isBugFixingSelected(form.services);

  return (
    <div className="intake-step">
      <div className="form-title">Review &amp; submit</div>
      <div className="form-sub">Check your answers below. You can edit any step before submitting.</div>

      <ReviewSection title="About you" step={1} onJump={onJump}>
        <ReviewRow label="Full name" value={form.fullName} step={1} onJump={onJump} />
        <ReviewRow label="Email" value={form.email} step={1} onJump={onJump} />
        <ReviewRow label="Company / business name" value={form.companyName} step={1} onJump={onJump} />
        <ReviewRow label="Current website URL" value={form.currentWebsiteUrl} step={1} onJump={onJump} />
      </ReviewSection>

      <ReviewSection title="Your project" step={2} onJump={onJump}>
        <ReviewRow label="Services" value={form.services.join(", ")} step={2} onJump={onJump} />
        <ReviewRow label="Project description" value={form.projectDescription} step={2} onJump={onJump} />
        <ReviewRow label="Reference links" value={form.referenceLinks} step={2} onJump={onJump} />
        {showBug && (
          <>
            <ReviewRow label="Bug — website URL" value={form.problemUrl} step={2} onJump={onJump} />
            <ReviewRow label="Bug — problem description" value={form.problemDescription} step={2} onJump={onJump} />
          </>
        )}
      </ReviewSection>

      <ReviewSection title="Budget &amp; timeline" step={3} onJump={onJump}>
        <ReviewRow label="Approximate budget" value={form.budget} step={3} onJump={onJump} />
        <ReviewRow label="Timeline" value={form.timeline} step={3} onJump={onJump} />
        <ReviewRow label="Materials availability" value={form.materials} step={3} onJump={onJump} />
      </ReviewSection>

      <p className="intake-privacy">
        <strong>Privacy notice:</strong> The information you submit here will be used solely to
        review and respond to your project inquiry. It is never shared with third parties or used
        for marketing without your consent.
      </p>
    </div>
  );
}

