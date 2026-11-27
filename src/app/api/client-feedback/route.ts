import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";
export const maxDuration = 30;

const SCRIPT_URL = process.env.FEEDBACK_SCRIPT_URL;
const SECRET = process.env.FEEDBACK_SECRET;
const NOTIFY_EMAIL = process.env.FEEDBACK_NOTIFY_EMAIL || "contact@dnnengineer.com";
const MAX_FEEDBACK = 2500;
const MAX_PHOTO_BYTES = 2 * 1024 * 1024;
const MAX_REQUEST_BYTES = 3_200_000;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const rateMap = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (rateMap.get(ip) || []).filter((time) => now - time < RATE_WINDOW_MS);
  if (hits.length >= RATE_MAX) {
    rateMap.set(ip, hits);
    return true;
  }
  hits.push(now);
  rateMap.set(ip, hits);
  if (rateMap.size > 5000) {
    for (const [key, times] of rateMap) {
      const fresh = times.filter((time) => now - time < RATE_WINDOW_MS);
      if (fresh.length) rateMap.set(key, fresh);
      else rateMap.delete(key);
    }
  }
  return false;
}

function getIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function clean(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

type FeedbackInput = {
  clientName: string;
  email: string;
  project: string;
  rating: number;
  feedback: string;
  displayPermission: boolean;
  photoDisplayPermission: boolean;
  honeypot: string;
  photo?: { fileName: string; mimeType: string; base64: string };
};

function validate(body: Record<string, unknown>): {
  input?: FeedbackInput;
  error?: string;
} {
  const clientName = clean(body.clientName, 120);
  const email = clean(body.email, 200).toLowerCase();
  const project = clean(body.project, 160);
  const feedback = clean(body.feedback, MAX_FEEDBACK);
  const rating = Number(body.rating);
  const displayPermission = body.displayPermission === true;
  const photoDisplayPermission = body.photoDisplayPermission === true;
  const honeypot = clean(body.honeypot, 300);

  if (!clientName) return { error: "Please enter your name." };
  if (typeof body.clientName === "string" && body.clientName.trim().length > 120)
    return { error: "Name is too long." };
  if (email && (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200))
    return { error: "Please enter a valid email address." };
  if (!project) return { error: "Please enter your project name or type." };
  if (typeof body.project === "string" && body.project.trim().length > 160)
    return { error: "Project name is too long." };
  if (!Number.isInteger(rating) || rating < 1 || rating > 5)
    return { error: "Please select a rating from 1 to 5." };
  if (!feedback) return { error: "Please write your feedback." };
  if (typeof body.feedback === "string" && body.feedback.trim().length > MAX_FEEDBACK)
    return { error: "Your feedback is too long." };

  let photo: FeedbackInput["photo"];
  if (body.photo !== undefined && body.photo !== null) {
    if (typeof body.photo !== "object") return { error: "Invalid photo." };
    const raw = body.photo as Record<string, unknown>;
    const fileName = clean(raw.fileName, 120);
    const mimeType = clean(raw.mimeType, 40);
    const base64 = typeof raw.base64 === "string" ? raw.base64 : "";
    if (!ALLOWED_TYPES.has(mimeType)) return { error: "Unsupported photo format." };
    if (!base64 || base64.length > Math.ceil((MAX_PHOTO_BYTES * 4) / 3) + 16)
      return { error: "Photo must be 2 MB or smaller." };
    const bytes = Buffer.from(base64, "base64");
    if (bytes.byteLength > MAX_PHOTO_BYTES) return { error: "Photo must be 2 MB or smaller." };
    // Verify the base64 payload round-trips; reject malformed encodings.
    if (bytes.toString("base64").replace(/=+$/, "") !== base64.replace(/=+$/, ""))
      return { error: "Invalid photo data." };
    photo = { fileName: fileName || "client-photo", mimeType, base64 };
  }
  if (photoDisplayPermission && !photo)
    return { error: "A photo is required for photo display permission." };

  return {
    input: {
      clientName,
      email,
      project,
      rating,
      feedback,
      displayPermission,
      photoDisplayPermission: Boolean(photo && photoDisplayPermission),
      honeypot,
      photo,
    },
  };
}

async function saveFeedback(input: FeedbackInput): Promise<{ ok: boolean; photoUrl?: string; error?: string }> {
  if (!SCRIPT_URL || !SECRET) {
    console.error("Client feedback: missing FEEDBACK_SCRIPT_URL or FEEDBACK_SECRET");
    return { ok: false, error: "storage_not_configured" };
  }

  const { photo, ...fields } = input;
  const response = await fetch(SCRIPT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
    body: JSON.stringify({
      secret: SECRET,
      dispatch: "add-feedback",
      ...fields,
      photo: photo || null,
    }),
  });

  if (!response.ok) {
    console.error("Client feedback: Apps Script HTTP status", response.status);
    return { ok: false, error: "storage_http_error" };
  }

  const result = (await response.json().catch(() => null)) as
    | { ok?: boolean; photoUrl?: string; error?: string }
    | null;

  if (!result || result.ok !== true) {
    console.error("Client feedback: Apps Script save failed", result?.error || "invalid_response");
    return { ok: false, error: result?.error || "storage_failed" };
  }
  return { ok: true, photoUrl: result.photoUrl };
}

function buildAdminEmail(input: FeedbackInput, timestamp: string, photoUrl?: string) {
  const photoRow = photoUrl
    ? `<tr><td style="padding:10px 0;color:#64748b">Photo</td><td><a style="color:#06b6d4" href="${escapeHtml(photoUrl)}">Open uploaded photo</a></td></tr>`
    : "";
  const permission = input.displayPermission ? "Yes — eligible for manual review" : "No";
  const photoPermission = input.photoDisplayPermission ? "Yes" : "No";
  const safeFeedback = escapeHtml(input.feedback).replace(/\n/g, "<br>");
  const html = `
    <div style="font-family:Arial,sans-serif;background:#060b14;padding:28px;color:#e2e8f0">
      <div style="max-width:640px;margin:auto;background:#0a1020;border:1px solid #1e293b;border-radius:14px;padding:28px">
        <div style="height:3px;background:linear-gradient(90deg,#3b82f6,#06b6d4);margin:-28px -28px 24px;border-radius:14px 14px 0 0"></div>
        <h2 style="color:#fff;margin:0 0 8px">New Sitecroft Client Feedback</h2>
        <p style="color:#64748b;font-size:13px">Received ${escapeHtml(timestamp)}</p>
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <tr><td style="padding:10px 0;color:#64748b;width:150px">Name</td><td>${escapeHtml(input.clientName)}</td></tr>
          <tr><td style="padding:10px 0;color:#64748b">Email</td><td>${input.email ? escapeHtml(input.email) : "Not provided"}</td></tr>
          <tr><td style="padding:10px 0;color:#64748b">Project</td><td>${escapeHtml(input.project)}</td></tr>
          <tr><td style="padding:10px 0;color:#64748b">Rating</td><td>${input.rating}/5</td></tr>
          <tr><td style="padding:10px 0;color:#64748b;vertical-align:top">Feedback</td><td style="line-height:1.7">${safeFeedback}</td></tr>
          <tr><td style="padding:10px 0;color:#64748b">Display feedback</td><td>${permission}</td></tr>
          <tr><td style="padding:10px 0;color:#64748b">Display photo</td><td>${photoPermission}</td></tr>
          ${photoRow}
        </table>
        <p style="color:#64748b;font-size:12px;margin-top:24px">Review the submission in the feedback spreadsheet before publishing anything.</p>
      </div>
    </div>`;
  const text = [
    "New Sitecroft Client Feedback",
    `Received: ${timestamp}`,
    `Name: ${input.clientName}`,
    `Email: ${input.email || "Not provided"}`,
    `Project: ${input.project}`,
    `Rating: ${input.rating}/5`,
    "",
    "Feedback:",
    input.feedback,
    "",
    `Display feedback permission: ${permission}`,
    `Display photo permission: ${photoPermission}`,
    photoUrl ? `Photo: ${photoUrl}` : "",
    "Review the feedback spreadsheet before publishing.",
  ].filter(Boolean).join("\n");
  return { subject: `New Sitecroft feedback (${input.rating}/5)`, html, text };
}

export async function POST(request: NextRequest) {
  try {
    if (isRateLimited(getIp(request))) {
      return NextResponse.json({ error: "Too many submissions. Please try again in a few minutes." }, { status: 429 });
    }

    const contentLength = Number(request.headers.get("content-length") || 0);
    if (contentLength > MAX_REQUEST_BYTES) {
      return NextResponse.json({ error: "The request is too large. Please use a smaller photo." }, { status: 413 });
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }

    const raw = (body ?? {}) as Record<string, unknown>;
    if (typeof raw.honeypot === "string" && raw.honeypot.trim()) {
      return NextResponse.json({ message: "Thanks! Your feedback has been received." });
    }

    const checked = validate(raw);
    if (!checked.input) {
      return NextResponse.json({ error: checked.error || "Please check your feedback." }, { status: 400 });
    }

    const input = checked.input;
    const saved = await saveFeedback(input);
    if (!saved.ok) {
      return NextResponse.json(
        { error: "We couldn't save your feedback right now. Please try again later or email contact@dnnengineer.com." },
        { status: 503 },
      );
    }

    const timestamp = new Date().toLocaleString("en-US", {
      timeZone: "UTC",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    });

    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const { subject, html, text } = buildAdminEmail(input, timestamp, saved.photoUrl);
        await transporter.sendMail({
          from: process.env.INQUIRY_FROM_EMAIL || process.env.SMTP_USER,
          to: NOTIFY_EMAIL,
          replyTo: input.email || NOTIFY_EMAIL,
          subject,
          html,
          text,
        });
      } catch (error) {
        console.error("Client feedback: notification email failed", error instanceof Error ? error.message : "unknown");
      }
    }

    return NextResponse.json({
      message: "Thank you for sharing your experience. Your feedback has been received and will be reviewed before anything is published.",
    });
  } catch (error) {
    console.error("Client feedback error:", error instanceof Error ? error.message : "unknown");
    return NextResponse.json({ error: "Something went wrong. Please try again later." }, { status: 500 });
  }
}
