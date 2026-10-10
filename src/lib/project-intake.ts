/**
 * Sitecroft — Project Intake Shared Definitions
 *
 * Single source of truth for the client intake form. These types, option
 * arrays, length limits, and validation helpers are imported by BOTH the
 * client form (src/components/ProjectIntakeForm.tsx) and the server route
 * (src/app/api/project-inquiry/route.ts) so client and server validation
 * never drift apart.
 */

/* ── Field length limits (server + client enforced) ── */
export const LIMITS = {
  fullName: 120,
  email: 200,
  companyName: 160,
  currentWebsiteUrl: 300,
  projectDescription: 4000,
  referenceLinks: 2000,
  problemUrl: 300,
  problemDescription: 3000,
  timeline: 200,
  maxServices: 15,
} as const;

/* ── Service options (Step 2) ── */
export interface ServiceOption {
  value: string;
  label: string;
}

export const SERVICE_OPTIONS: ServiceOption[] = [
  { value: "WordPress website", label: "WordPress website" },
  { value: "WooCommerce store", label: "WooCommerce store" },
  { value: "Custom website", label: "Custom website" },
  { value: "Landing page", label: "Landing page" },
  { value: "Web application / SaaS", label: "Web application / SaaS" },
  { value: "Website redesign", label: "Website redesign" },
  { value: "Bug fixing", label: "Bug fixing" },
  { value: "Website maintenance / support", label: "Website maintenance / support" },
  { value: "n8n automation", label: "n8n automation" },
  { value: "AI automation / AI agent", label: "AI automation / AI agent" },
  { value: "API integration", label: "API integration" },
  { value: "React / Next.js development", label: "React / Next.js development" },
  { value: "Python development", label: "Python development" },
  { value: "Deployment / hosting / domain / DNS / technical setup", label: "Deployment / hosting / domain / DNS / technical setup" },
  { value: "Other", label: "Other" },
];

/** Value used to toggle the conditional bug-fixing questions. */
export const BUG_FIXING_SERVICE = "Bug fixing";

/* ── Budget options (Step 3, optional) ── */
export const BUDGET_OPTIONS: string[] = [
  "Under $100",
  "$100 - $300",
  "$300 - $600",
  "$600 - $1,000",
  "$1,000 - $2,500",
  "$2,500+",
  "Not sure yet",
  "Prefer not to say",
];

/* ── Materials availability options (Step 3, required) ── */
export const MATERIALS_OPTIONS: string[] = [
  "Yes, everything is ready",
  "Some materials are ready",
  "Nothing is ready yet",
  "Not sure",
];

/* ── Submission payload shape ── */
export interface ProjectInquiry {
  fullName: string;
  email: string;
  companyName: string;
  currentWebsiteUrl: string;
  services: string[];
  projectDescription: string;
  referenceLinks: string;
  // Conditional (bug fixing)
  problemUrl: string;
  problemDescription: string;
  // Budget & timeline
  budget: string;
  timeline: string;
  materials: string;
  // Honeypot — must be empty
  honeypot: string;
}

/* ── Validation helpers ── */

/** Trim + collapse outer whitespace for free-text fields. */
export function normalizeText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

/** Trim outer whitespace while preserving line breaks (multi-line fields). */
export function normalizeMultiline(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value: string): boolean {
  return value.length <= LIMITS.email && EMAIL_RE.test(value);
}

/** True when the bug-fixing service is selected. */
export function isBugFixingSelected(services: string[]): boolean {
  return services.includes(BUG_FIXING_SERVICE);
}

export interface ValidationResult {
  ok: boolean;
  /** Field key -> human-readable message, only when ok === false. */
  errors: Partial<Record<keyof ProjectInquiry, string>>;
}

/**
 * Server-side validation of every submitted field.
 * Mirrors the client-side checks in ProjectIntakeForm.tsx.
 */
export function validateInquiry(raw: Record<string, unknown>): ValidationResult {
  const errors: Partial<Record<keyof ProjectInquiry, string>> = {};

  const fullName = normalizeText(raw.fullName);
  const email = normalizeText(raw.email).toLowerCase();
  const companyName = normalizeText(raw.companyName);
  const currentWebsiteUrl = normalizeText(raw.currentWebsiteUrl);
  const projectDescription = normalizeMultiline(raw.projectDescription);
  const referenceLinks = normalizeMultiline(raw.referenceLinks);
  const problemUrl = normalizeText(raw.problemUrl);
  const problemDescription = normalizeMultiline(raw.problemDescription);
  const timeline = normalizeText(raw.timeline);
  const materials = normalizeText(raw.materials);
  const budget = normalizeText(raw.budget);

  const rawServices = Array.isArray(raw.services)
    ? (raw.services as unknown[]).map((s) => normalizeText(s))
    : [];
  const services = Array.from(new Set(rawServices.filter(Boolean)));

  // Full name — required
  if (!fullName) errors.fullName = "Please enter your full name.";
  else if (fullName.length > LIMITS.fullName) errors.fullName = `Full name must be ${LIMITS.fullName} characters or fewer.`;

  // Email — required + valid
  if (!email) errors.email = "Please enter your email address.";
  else if (!isValidEmail(email)) errors.email = "Please enter a valid email address.";

  // Company / website — optional, length-capped
  if (companyName.length > LIMITS.companyName) errors.companyName = `Company name must be ${LIMITS.companyName} characters or fewer.`;
  if (currentWebsiteUrl.length > LIMITS.currentWebsiteUrl) errors.currentWebsiteUrl = "Website URL is too long.";

  // Services — required, at least one, capped
  if (services.length === 0) errors.services = "Please select at least one service.";
  else if (services.length > LIMITS.maxServices) errors.services = "Please select fewer services.";

  // Project description — required
  if (!projectDescription) errors.projectDescription = "Please describe your project.";
  else if (projectDescription.length > LIMITS.projectDescription) errors.projectDescription = `Description must be ${LIMITS.projectDescription} characters or fewer.`;

  // Reference links — optional, length-capped
  if (referenceLinks.length > LIMITS.referenceLinks) errors.referenceLinks = "Reference links are too long.";

  // Conditional — bug fixing
  if (isBugFixingSelected(services)) {
    if (!problemDescription) errors.problemDescription = "Please describe the problem or error.";
    else if (problemDescription.length > LIMITS.problemDescription) errors.problemDescription = `Problem description must be ${LIMITS.problemDescription} characters or fewer.`;
    if (problemUrl.length > LIMITS.problemUrl) errors.problemUrl = "URL is too long.";
  }

  // Budget — optional, but if present must be a known option
  if (budget && !BUDGET_OPTIONS.includes(budget)) errors.budget = "Please choose a valid budget option.";

  // Timeline — optional, length-capped
  if (timeline.length > LIMITS.timeline) errors.timeline = `Timeline must be ${LIMITS.timeline} characters or fewer.`;

  // Materials — required, must be a known option
  if (!materials) errors.materials = "Please select your materials availability.";
  else if (!MATERIALS_OPTIONS.includes(materials)) errors.materials = "Please select a valid option.";

  return { ok: Object.keys(errors).length === 0, errors };
}

/* ── Sheet row mapping ── */

export interface SheetRow {
  timestamp: string;
  fullName: string;
  email: string;
  companyName: string;
  currentWebsiteUrl: string;
  services: string;
  projectDescription: string;
  referenceLinks: string;
  problemUrl: string;
  problemDescription: string;
  budget: string;
  timeline: string;
  materials: string;
  status: string;
}

/**
 * Flatten the services + reference links into readable, single-cell strings
 * for the spreadsheet, then return the ordered row values.
 */
export function toSheetRow(data: ProjectInquiry, timestamp: string): SheetRow {
  return {
    timestamp,
    fullName: normalizeText(data.fullName),
    email: normalizeText(data.email).toLowerCase(),
    companyName: normalizeText(data.companyName),
    currentWebsiteUrl: normalizeText(data.currentWebsiteUrl),
    // Multiple selections preserved as a readable, delimited list
    services: Array.from(new Set(data.services.filter(Boolean))).join(", "),
    projectDescription: normalizeMultiline(data.projectDescription),
    // Multiple links preserved, one per line
    referenceLinks: normalizeMultiline(data.referenceLinks),
    problemUrl: normalizeText(data.problemUrl),
    problemDescription: normalizeMultiline(data.problemDescription),
    budget: normalizeText(data.budget),
    timeline: normalizeText(data.timeline),
    materials: normalizeText(data.materials),
    status: "New",
  };
}

