import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import {
  validateInquiry,
  toSheetRow,
  isBugFixingSelected,
  type ProjectInquiry,
} from "@/lib/project-intake";

/* ── Runtime config (server-side only — never exposed to the client) ── */
const INQUIRY_SCRIPT_URL = process.env.INQUIRY_SCRIPT_URL;
const INQUIRY_SECRET = process.env.INQUIRY_SECRET;
const INQUIRY_NOTIFY_EMAIL = process.env.INQUIRY_NOTIFY_EMAIL || "contact@dnnengineer.com";

/* ── Email transport (reuses the existing SMTP configuration) ── */
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/* ── Simple in-memory per-IP throttle ──
 * Note: on serverless this is best-effort per instance; it raises the bar for
 * casual abuse without adding infrastructure. Harder protection can be layered
 * on later via Vercel/WAF if needed. */
const RATE_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_MAX = 5; // max 5 submissions per window per IP
const rateMap = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (rateMap.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  if (hits.length >= RATE_MAX) {
    rateMap.set(ip, hits);
    return true;
  }
  hits.push(now);
  rateMap.set(ip, hits);
  // Opportunistic cleanup so the map does not grow unbounded
  if (rateMap.size > 5000) {
    for (const [key, times] of rateMap) {
      const fresh = times.filter((t) => now - t < RATE_WINDOW_MS);
      if (fresh.length === 0) rateMap.delete(key);
      else rateMap.set(key, fresh);
    }
  }
  return false;
}

function clientIp(request: NextRequest): string {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return request.headers.get("x-real-ip") || "unknown";
}

/* ── Forward the inquiry to the Google Apps Script (writes to the Sheet) ──
 * Diagnostics log only safe metadata: env-var names, HTTP status codes, and
 * the Apps Script's own error code. Secrets, the full URL, email addresses,
 * and submitted inquiry contents are never logged. */
async function appendToSheet(row: Record<string, unknown>): Promise<boolean> {
  // 1) Missing local environment variables.
  if (!INQUIRY_SCRIPT_URL || !INQUIRY_SECRET) {
    console.warn(
      "Project inquiry: sheet storage not configured — missing INQUIRY_SCRIPT_URL or INQUIRY_SECRET"
    );
    return false;
  }
  try {
    const res = await fetch(INQUIRY_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret: INQUIRY_SECRET, dispatch: "add-inquiry", ...row }),
      // Avoid caching the write
      cache: "no-store",
    });

    // 2) Non-2xx HTTP response from Apps Script.
    if (!res.ok) {
      console.error("Project inquiry: Apps Script returned non-2xx status", res.status);
      return false;
    }

    // 3a) Malformed / non-JSON body must NOT be treated as a successful save.
    let parsed: unknown;
    try {
      parsed = await res.json();
    } catch (parseErr) {
      console.error(
        "Project inquiry: Apps Script response was not valid JSON",
        parseErr instanceof Error ? parseErr.message : "unknown"
      );
      return false;
    }
    if (typeof parsed !== "object" || parsed === null) {
      console.error("Project inquiry: Apps Script response was not a JSON object");
      return false;
    }

    // 3b) Require an explicit { ok: true }; anything else is a failure.
    const data = parsed as { ok?: boolean; error?: string };
    if (data.ok !== true) {
      console.error(
        "Project inquiry: Apps Script reported failure",
        typeof data.error === "string" ? data.error : "no error field"
      );
      return false;
    }
    return true;
  } catch (err) {
    // 4) Network / fetch-level error.
    console.error("Project inquiry: sheet append failed", err instanceof Error ? err.message : "unknown");
    return false;
  }
}

/* ── Escape user content before embedding in the HTML email ── */
function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/* ── Build the branded notification email ── */
function buildNotificationEmail(
  inquiry: ProjectInquiry,
  timestamp: string,
): { subject: string; html: string; text: string } {
  const bugSelected = isBugFixingSelected(inquiry.services);
  const services = inquiry.services.map(esc).join(", ");

  const row = (label: string, value: string, opts?: { pre?: boolean }) => {
    if (!value) return "";
    const cell = opts?.pre
      ? `<div style="white-space:pre-wrap;line-height:1.6;">${esc(value)}</div>`
      : esc(value);
    return `<tr>
      <td style="padding:10px 0;color:#64748b;font-size:13px;width:150px;vertical-align:top;">${label}</td>
      <td style="padding:10px 0;color:#fff;font-size:14px;">${cell}</td>
    </tr>`;
  };

  const html = `
    <div style="font-family:'DM Sans',Arial,sans-serif;background:#060b14;padding:40px;color:#e2e8f0;">
      <div style="max-width:640px;margin:0 auto;background:#0a1020;border-radius:16px;padding:32px;border:1px solid rgba(99,179,237,0.12);">
        <div style="height:2px;background:linear-gradient(90deg,#3b82f6,#06b6d4);border-radius:16px 16px 0 0;margin:-32px -32px 24px -32px;"></div>
        <h2 style="color:#fff;font-size:20px;margin-bottom:6px;">New Project Inquiry</h2>
        <p style="color:#64748b;font-size:13px;margin-bottom:20px;">Received ${esc(timestamp)}</p>
        <table style="width:100%;border-collapse:collapse;">
          ${row("Full name", inquiry.fullName)}
          <tr>
            <td style="padding:10px 0;color:#64748b;font-size:13px;width:150px;vertical-align:top;">Email</td>
            <td style="padding:10px 0;font-size:14px;"><a href="mailto:${esc(inquiry.email)}" style="color:#06b6d4;">${esc(inquiry.email)}</a></td>
          </tr>
          ${row("Company", inquiry.companyName)}
          ${row("Current website", inquiry.currentWebsiteUrl)}
          <tr>
            <td style="padding:10px 0;color:#64748b;font-size:13px;vertical-align:top;">Services</td>
            <td style="padding:10px 0;color:#fff;font-size:14px;">${services}</td>
          </tr>
          ${row("Project description", inquiry.projectDescription, { pre: true })}
          ${row("Reference links", inquiry.referenceLinks, { pre: true })}
          ${bugSelected ? row("Bug — website URL", inquiry.problemUrl) : ""}
          ${bugSelected ? row("Bug — problem", inquiry.problemDescription, { pre: true }) : ""}
          ${row("Budget", inquiry.budget)}
          ${row("Timeline", inquiry.timeline)}
          ${row("Materials availability", inquiry.materials)}
        </table>
        <p style="color:#475569;font-size:11px;margin-top:24px;">Submitted via sitecroftdev.vercel.app/start-a-project</p>
      </div>
    </div>
  `;

  const text = [
    "New Project Inquiry",
    `Received ${timestamp}`,
    "",
    `Full name: ${inquiry.fullName}`,
    `Email: ${inquiry.email}`,
    inquiry.companyName ? `Company: ${inquiry.companyName}` : "",
    inquiry.currentWebsiteUrl ? `Current website: ${inquiry.currentWebsiteUrl}` : "",
    `Services: ${services}`,
    "",
    `Project description:\n${inquiry.projectDescription}`,
    inquiry.referenceLinks ? `\nReference links:\n${inquiry.referenceLinks}` : "",
    bugSelected && inquiry.problemUrl ? `\nBug — website URL: ${inquiry.problemUrl}` : "",
    bugSelected && inquiry.problemDescription ? `\nBug — problem:\n${inquiry.problemDescription}` : "",
    inquiry.budget ? `\nBudget: ${inquiry.budget}` : "",
    inquiry.timeline ? `Timeline: ${inquiry.timeline}` : "",
    `Materials availability: ${inquiry.materials}`,
    "",
    "Submitted via sitecroftdev.vercel.app/start-a-project",
  ].join("\n");

  return { subject: `New Project Inquiry from ${inquiry.fullName}`, html, text };
}

/* ── Resolve the From address ──
 * Gmail SMTP only accepts a MAIL FROM for the authenticated account or a
 * verified "Send mail as" alias. We default to the authenticated SMTP_USER so
 * the message is always accepted. If you verify contact@dnnengineer.com as a
 * Gmail send-as alias, set INQUIRY_FROM_EMAIL=contact@dnnengineer.com to send
 * AS the Sitecroft contact address (no code change needed). */
function resolveFromAddress(): string {
  const configured = (process.env.INQUIRY_FROM_EMAIL || "").trim();
  const address = configured || (process.env.SMTP_USER || "").trim();
  return address ? `"Sitecroft" <${address}>` : "";
}

/* ── Build the visitor confirmation (receipt) email ── */
function buildConfirmationEmail(inquiry: ProjectInquiry): { subject: string; html: string; text: string } {
  const trimmedName = inquiry.fullName.trim();
  const firstName = trimmedName ? trimmedName.split(/\s+/)[0] : "there";
  const subject = "We've received your project inquiry — Sitecroft";

  const text = [
    `Hi ${firstName},`,
    "",
    "Thank you for contacting Sitecroft!",
    "",
    "We've successfully received your project inquiry and the information you submitted. We'll review the details and get back to you if we need any additional information or to discuss the next steps.",
    "",
    "Thank you for considering Sitecroft for your project.",
    "",
    "Best regards,",
    "Saad Alam",
    "Sitecroft",
  ].join("\n");

  const html = `
    <div style="font-family:'DM Sans',Arial,sans-serif;background:#060b14;padding:40px;color:#e2e8f0;">
      <div style="max-width:600px;margin:0 auto;background:#0a1020;border-radius:16px;padding:32px;border:1px solid rgba(99,179,237,0.12);">
        <div style="height:2px;background:linear-gradient(90deg,#3b82f6,#06b6d4);border-radius:16px 16px 0 0;margin:-32px -32px 24px -32px;"></div>
        <h2 style="color:#fff;font-size:20px;margin:0 0 18px;">Thanks for reaching out!</h2>
        <p style="color:#e2e8f0;font-size:15px;line-height:1.7;margin:0 0 14px;">Hi ${esc(firstName)},</p>
        <p style="color:#94a3b8;font-size:15px;line-height:1.7;margin:0 0 14px;">Thank you for contacting Sitecroft!</p>
        <p style="color:#94a3b8;font-size:15px;line-height:1.7;margin:0 0 14px;">We&rsquo;ve successfully received your project inquiry and the information you submitted. We&rsquo;ll review the details and get back to you if we need any additional information or to discuss the next steps.</p>
        <p style="color:#94a3b8;font-size:15px;line-height:1.7;margin:0 0 22px;">Thank you for considering Sitecroft for your project.</p>
        <p style="color:#e2e8f0;font-size:15px;line-height:1.7;margin:0;">Best regards,<br><span style="color:#fff;font-weight:600;">Saad Alam</span><br><span style="color:#64748b;font-size:13px;">Sitecroft</span></p>
      </div>
    </div>
  `;

  return { subject, html, text };
}



/* ── POST handler ── */
export async function POST(request: NextRequest) {
  try {
    // Throttle by IP
    if (isRateLimited(clientIp(request))) {
      return NextResponse.json(
        { error: "Too many requests. Please try again in a few minutes." },
        { status: 429 }
      );
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }
    const raw = (body ?? {}) as Record<string, unknown>;

    // Honeypot — silently accept but do not store/notify.
    const honeypot = typeof raw.honeypot === "string" ? raw.honeypot : "";
    if (honeypot.trim() !== "") {
      return NextResponse.json({ message: "Thanks! Your project inquiry has been received." }, { status: 200 });
    }

    // Server-side validation of every field
    const { ok, errors } = validateInquiry(raw);
    if (!ok) {
      return NextResponse.json({ error: "Please correct the highlighted fields.", errors }, { status: 400 });
    }

    const inquiry: ProjectInquiry = {
      fullName: String(raw.fullName).trim(),
      email: String(raw.email).trim().toLowerCase(),
      companyName: typeof raw.companyName === "string" ? raw.companyName.trim() : "",
      currentWebsiteUrl: typeof raw.currentWebsiteUrl === "string" ? raw.currentWebsiteUrl.trim() : "",
      services: Array.isArray(raw.services) ? (raw.services as string[]) : [],
      projectDescription: String(raw.projectDescription).trim(),
      referenceLinks: typeof raw.referenceLinks === "string" ? raw.referenceLinks.trim() : "",
      problemUrl: typeof raw.problemUrl === "string" ? raw.problemUrl.trim() : "",
      problemDescription: typeof raw.problemDescription === "string" ? raw.problemDescription.trim() : "",
      budget: typeof raw.budget === "string" ? raw.budget : "",
      timeline: typeof raw.timeline === "string" ? raw.timeline.trim() : "",
      materials: String(raw.materials),
      honeypot: "",
    };

    const now = new Date();
    const timestamp = now.toLocaleString("en-US", {
      year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit",
    });
    const row = toSheetRow(inquiry, timestamp);

    // 1) Persist to Google Sheets — the source of truth. If this fails, the
    //    inquiry must NOT be reported as submitted.
    const stored = await appendToSheet(row as unknown as Record<string, unknown>);
    if (!stored) {
      return NextResponse.json(
        { error: "We couldn't save your inquiry right now. Please try again shortly or email contact@dnnengineer.com." },
        { status: 503 }
      );
    }

    // 2) Email notifications (best-effort). Storage already succeeded, so a
    //    failure here must never fail the request or re-save to Sheets.
    const fromAddress = resolveFromAddress();

    // 2a) Admin notification → the Sitecraft contact address.
    if (fromAddress) {
      try {
        const { subject, html, text } = buildNotificationEmail(inquiry, timestamp);
        await transporter.sendMail({
          from: fromAddress,
          to: INQUIRY_NOTIFY_EMAIL,
          replyTo: inquiry.email,
          subject,
          html,
          text,
        });
      } catch (emailError) {
        // Storage succeeded; do not fail the request if the email fails.
        console.error("Project inquiry: admin notification email failed", emailError instanceof Error ? emailError.message : "unknown");
      }

      // 2b) Visitor confirmation → the address they submitted. Kept independent
      //     of the admin email so one failure never blocks the other.
      try {
        const { subject, html, text } = buildConfirmationEmail(inquiry);
        await transporter.sendMail({
          from: fromAddress,
          to: inquiry.email,
          replyTo: INQUIRY_NOTIFY_EMAIL,
          subject,
          html,
          text,
        });
      } catch (emailError) {
        console.error("Project inquiry: visitor confirmation email failed", emailError instanceof Error ? emailError.message : "unknown");
      }
    } else {
      console.error("Project inquiry: SMTP_USER (or INQUIRY_FROM_EMAIL) not set — skipping email notifications");
    }

    return NextResponse.json(
      { message: "Thanks! Your project inquiry has been received." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Project inquiry error:", error instanceof Error ? error.message : "unknown");
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

