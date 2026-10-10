# Project Intake Form — Google Sheets + Apps Script Setup

This integration stores each `/start-a-project` submission as one row in a
Google Sheet. Email notifications are sent from the Next.js server using the
existing SMTP configuration — **no new email provider is required**.

Until you complete these steps, the form will correctly validate and submit
locally, but the server will return a **503 "couldn't save your inquiry"**
error because storage is not configured yet. That is intentional: an inquiry
is never falsely reported as saved.

---

## 1. Create the Google Sheet

1. Go to <https://sheets.new> and create a new spreadsheet.
2. Name it something like **Sitecroft Project Inquiries**.
3. Copy the **Spreadsheet ID** from the URL:
   `https://docs.google.com/spreadsheets/d/THIS_IS_THE_ID/edit`
4. (Optional) Rename the default tab to **Project Inquiries** — the script
   will create it automatically if it doesn't exist.

## 2. Add the Apps Script

1. In the spreadsheet, open **Extensions → Apps Script**.
2. Delete any starter code and paste the entire contents of
   [`project-inquiries.gs`](./project-inquiries.gs).
3. At the top of the file, set:
   - `SPREADSHEET_ID` — paste the ID you copied in step 1.
   - `SHARED_SECRET` — a **long, random string** (e.g. 40+ characters). You
     can generate one with:
     `openssl rand -hex 32`
4. Click **Save**.

## 3. Create the header row (one time)

1. In the Apps Script editor, select the function **`ensureHeader`** in the
   toolbar dropdown.
2. Click **Run**. Approve the authorization prompt when asked (it will ask
   for access to your Google Sheets — this is expected).
3. Check your spreadsheet: row 1 should now contain the column headers.

## 4. Deploy as a Web App

1. Click **Deploy → New deployment**.
2. Click the gear icon → **Web app**.
3. Set:
   - **Description:** Project inquiries
   - **Execute as:** **Me**
   - **Who has access:** **Anyone**
     > "Anyone" is required so the Vercel server (which has no Google session)
     > can POST to it. Access is protected by the shared secret instead.
4. Click **Deploy**, authorize if prompted, then **copy the `/exec` Web app URL**.
5. This URL is `INQUIRY_SCRIPT_URL` — it goes **only** in server env vars.

> After editing the script in the future, you must **Deploy → Manage
> deployments → Edit (pencil) → Version: New version → Deploy** for changes
> to take effect.

## 5. Configure environment variables

These live in **`.env.local`** (local) and in **Vercel → Project → Settings →
Environment Variables** (production). They are server-side only and are never
exposed to the browser.

| Variable | Value | Required |
| --- | --- | --- |
| `INQUIRY_SCRIPT_URL` | The `/exec` Web app URL from step 4 | Yes (for storage) |
| `INQUIRY_SECRET` | The same random string you set as `SHARED_SECRET` | Yes (for storage) |
| `INQUIRY_NOTIFY_EMAIL` | Email that receives new-inquiry notifications (default `contact@dnnengineer.com`) | Optional |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS` | Already present — reused for the notification email | Yes (for email) |

**Never** put `INQUIRY_SECRET` or `INQUIRY_SCRIPT_URL` in any `NEXT_PUBLIC_*`
variable or commit them. `.env*` is already git-ignored.

### Vercel setup

1. Vercel dashboard → your project → **Settings → Environment Variables**.
2. Add `INQUIRY_SCRIPT_URL`, `INQUIRY_SECRET`, and (optionally)
   `INQUIRY_NOTIFY_EMAIL` for the **Production** environment (and Preview if
   desired).
3. **Redeploy** so the new variables are picked up (env changes require a new
   build).

## 6. Verify

1. With env vars set locally, run `npm run dev` and submit the form at
   `http://localhost:3000/start-a-project`.
2. Confirm a new row appears in the Google Sheet with `Status = New`.
3. Confirm the notification email arrives at `INQUIRY_NOTIFY_EMAIL`.

---

## Spreadsheet columns

One row per successful submission, in this order:

`Timestamp · Full name · Email · Company / business name · Current website URL · Services · Project description · Reference links · Bug — website URL · Bug — problem description · Budget · Timeline · Materials availability · Status`

- **Services** keeps multiple selections as a readable comma-separated list.
- **Reference links** keeps multiple links, one per line.
- **Status** starts as `New` — update it manually as you triage inquiries.

## Security & abuse notes

- The Web app URL is publicly reachable. The **shared secret** is the only
  gate, so keep it long and random and rotate it if it ever leaks. It is
  compared server-side and never sent to the browser.
- The Next.js route also applies a **honeypot field** and a simple **per-IP
  throttle** (5 submissions / 10 minutes). On serverless this throttle is
  best-effort per instance. For stronger protection later, consider a Vercel
  Firewall/WAF rule on `/api/project-inquiry`.
- Email is **best-effort**: if sending fails but the row was stored, the
  submission still succeeds and is safe in the Sheet. Storage is the source of
  truth.

