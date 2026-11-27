"use client";

import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

const MAX_FEEDBACK = 2500;
const MAX_PHOTO_BYTES = 2 * 1024 * 1024;
const ALLOWED_PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp"];

type FeedbackPayload = {
  clientName: string;
  email: string;
  project: string;
  rating: number;
  feedback: string;
  displayPermission: boolean;
  photoDisplayPermission: boolean;
  honeypot: string;
  photo?: {
    fileName: string;
    mimeType: string;
    base64: string;
  };
};

const RATING_LABELS = ["", "Poor", "Fair", "Good", "Very good", "Excellent"];


function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      const comma = result.indexOf(",");
      if (comma < 0) reject(new Error("Could not read the selected photo."));
      else resolve(result.slice(comma + 1));
    };
    reader.onerror = () => reject(new Error("Could not read the selected photo."));
    reader.readAsDataURL(file);
  });
}

export default function FeedbackForm() {
  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [project, setProject] = useState("");
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [displayPermission, setDisplayPermission] = useState(false);
  const [photoDisplayPermission, setPhotoDisplayPermission] = useState(false);
  const [photo, setPhoto] = useState<File | null>(null);
  const [honeypot, setHoneypot] = useState("");
  const [busy, setBusy] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [photoError, setPhotoError] = useState("");
  const inFlight = useRef(false);

  const handlePhoto = (event: ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0] || null;
    setPhotoError("");
    setPhoto(null);
    setPhotoDisplayPermission(false);

    if (!selected) return;
    if (!ALLOWED_PHOTO_TYPES.includes(selected.type)) {
      setPhotoError("Please choose a JPG, PNG, or WebP image.");
      event.target.value = "";
      return;
    }
    if (selected.size > MAX_PHOTO_BYTES) {
      setPhotoError("The photo must be 2 MB or smaller.");
      event.target.value = "";
      return;
    }
    setPhoto(selected);
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inFlight.current || busy) return;

    const cleanName = clientName.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanProject = project.trim();
    const cleanFeedback = feedback.trim();

    if (!cleanName || cleanName.length > 120) {
      setStatus({ type: "error", message: "Please enter your name (up to 120 characters)." });
      return;
    }
    if (cleanEmail && (cleanEmail.length > 200 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail))) {
      setStatus({ type: "error", message: "Please enter a valid email address, or leave it blank." });
      return;
    }
    if (!cleanProject || cleanProject.length > 160) {
      setStatus({ type: "error", message: "Please enter the project name or type (up to 160 characters)." });
      return;
    }
    if (rating < 1 || rating > 5) {
      setStatus({ type: "error", message: "Please select a rating from 1 to 5 stars." });
      return;
    }
    if (!cleanFeedback || cleanFeedback.length > MAX_FEEDBACK) {
      setStatus({ type: "error", message: `Please enter your feedback (up to ${MAX_FEEDBACK} characters).` });
      return;
    }
    if (photoDisplayPermission && !photo) {
      setStatus({ type: "error", message: "Select a profile photo first, or turn off photo display permission." });
      return;
    }

    inFlight.current = true;
    setBusy(true);
    setStatus(null);

    try {
      const payload: FeedbackPayload = {
        clientName: cleanName,
        email: cleanEmail,
        project: cleanProject,
        rating,
        feedback: cleanFeedback,
        displayPermission,
        photoDisplayPermission: Boolean(photo && photoDisplayPermission),
        honeypot,
      };

      if (photo) {
        payload.photo = {
          fileName: photo.name,
          mimeType: photo.type,
          base64: await fileToBase64(photo),
        };
      }

      const response = await fetch("/api/client-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await response.json().catch(() => null)) as
        | { message?: string; error?: string }
        | null;

      if (response.ok && data) {
        setSubmitted(true);
        setStatus(null);
        setClientName("");
        setEmail("");
        setProject("");
        setRating(0);
        setFeedback("");
        setDisplayPermission(false);
        setPhotoDisplayPermission(false);
        setPhoto(null);
        setHoneypot("");
        const fileInput = document.getElementById("feedback-photo") as HTMLInputElement | null;
        if (fileInput) fileInput.value = "";
      } else {
        setStatus({
          type: "error",
          message:
            data?.error ||
            "We couldn't confirm that your feedback was saved. Please wait before trying again.",
        });
      }
    } catch {
      setStatus({
        type: "error",
        message: "We couldn't confirm that your feedback was saved. Please wait before trying again.",
      });
    } finally {
      inFlight.current = false;
      setBusy(false);
    }
  };

  if (submitted) {
    return (
      <div className="feedback-card feedback-thankyou" role="status" aria-live="polite">
        <div className="feedback-thankyou-icon">
          <CheckCircle2 size={28} />
        </div>
        <h2 className="feedback-heading">Thank you for your feedback!</h2>
        <p className="feedback-sub">
          Your response has been received successfully. I really appreciate you
          taking the time to share your experience with Sitecroft.
        </p>
        <p className="feedback-thankyou-note">
          Your feedback will be reviewed before anything is published.
        </p>
      </div>
    );
  }

  return (
    <div className="feedback-card">
      <h2 className="feedback-heading">Your feedback</h2>
      <p className="feedback-sub">
        Share what went well and anything that could have been better. Your email
        is optional and will only be used if I need to follow up.
      </p>



      <form onSubmit={submit} noValidate>
        <div className="feedback-honeypot" aria-hidden="true">
          <label htmlFor="feedback-hp">Leave this field empty</label>
          <input
            id="feedback-hp"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>

        <div className="feedback-field">
          <label className="feedback-label" htmlFor="feedback-name">Your name *</label>
          <input
            id="feedback-name"
            autoComplete="name"
            maxLength={120}
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            required
          />
        </div>

        <div className="feedback-field">
          <label className="feedback-label" htmlFor="feedback-email">Email (optional)</label>
          <input
            id="feedback-email"
            type="email"
            autoComplete="email"
            maxLength={200}
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="feedback-field">
          <label className="feedback-label" htmlFor="feedback-project">Project *</label>
          <input
            id="feedback-project"
            maxLength={160}
            placeholder="Website, online store, automation..."
            value={project}
            onChange={(e) => setProject(e.target.value)}
            required
          />
        </div>

        <div className="feedback-field">
          <span className="feedback-label">Your rating *</span>
          <div className="feedback-rating" role="group" aria-label="Rate your experience">
            {([1, 2, 3, 4, 5] as const).map((value) => (
              <button
                key={value}
                type="button"
                className="feedback-star"
                aria-label={`${value} star${value === 1 ? "" : "s"}`}
                aria-pressed={rating === value}
                onClick={() => setRating(value)}
              >
                ★
              </button>
            ))}
            <span className="feedback-rating-label">
              {rating ? RATING_LABELS[rating] : "Select a rating"}
            </span>
          </div>
        </div>

        <div className="feedback-field">
          <label className="feedback-label" htmlFor="feedback-text">Your feedback *</label>
          <textarea
            id="feedback-text"
            maxLength={MAX_FEEDBACK}
            placeholder="What was your experience working with Sitecroft like?"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
          />
          <p className="feedback-hint">{feedback.length}/{MAX_FEEDBACK} characters</p>
        </div>

        <div className="feedback-field">
          <label className="feedback-label" htmlFor="feedback-photo">Profile photo (optional)</label>
            <label className="feedback-upload-button" htmlFor="feedback-photo">
              <span className="feedback-upload-symbol" aria-hidden="true">＋</span>
              <span>{photo ? "Choose a different photo" : "Choose photo"}</span>
            </label>
            <input
              id="feedback-photo"
              className="feedback-file-input"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handlePhoto}
            />
          <p className="feedback-hint">JPG, PNG, or WebP. Maximum 2 MB.</p>
          {photoError ? <p className="feedback-hint" role="alert">{photoError}</p> : null}
          {photo ? (
            <div className="feedback-photo-preview">
              <span>Selected: {photo.name}</span>
            </div>
          ) : null}
        </div>

        <label className="feedback-check">
          <input
            type="checkbox"
            checked={displayPermission}
            onChange={(e) => setDisplayPermission(e.target.checked)}
          />
          <span>
            I give Sitecroft permission to display my feedback publicly as a
            testimonial. My feedback will remain private unless approved and
            published by Sitecroft.
          </span>
        </label>

        <label className="feedback-check">
          <input
            type="checkbox"
            checked={photoDisplayPermission}
            disabled={!photo}
            onChange={(e) => setPhotoDisplayPermission(e.target.checked)}
          />
          <span>
            I separately give permission to display the selected profile photo
            alongside my testimonial. This is optional and can be left unchecked.
          </span>
        </label>

        <button className="feedback-submit" type="submit" disabled={busy}>
          {busy ? (
            <><Loader2 size={17} className="spin" /> Sending feedback...</>
          ) : (
            "Submit feedback"
          )}
        </button>

        {status?.type === "error" ? (
          <div className="feedback-status error" role="alert">
            <AlertCircle size={18} />
            <div>{status.message}</div>
          </div>
        ) : null}
      </form>

      <p className="feedback-privacy">
        Your submission is sent privately to Sitecroft for review. Permission to
        display a testimonial does not mean it will be published automatically.
      </p>
    </div>
  );
}
