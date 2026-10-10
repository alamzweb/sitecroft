/**
 * Sitecroft — Project Inquiries → Google Sheets
 * ---------------------------------------------------------------
 * This Apps Script is the storage backend for the /start-a-project
 * intake form. It appends each new inquiry as one row and returns a
 * simple JSON result to the Next.js server route.
 *
 * SETUP (see google-apps-script/README.md for full instructions):
 *  1. Create a Google Sheet and set its ID below (SPREADSHEET_ID).
 *  2. Set SHARED_SECRET to a long random string — it MUST match the
 *     INQUIRY_SECRET env var used by the Next.js server route.
 *  3. Run ensureHeader() once to create the header row + tab.
 *  4. Deploy → New deployment → Web app:
 *       Execute as: Me
 *       Who has access: Anyone
 *     Copy the /exec URL into INQUIRY_SCRIPT_URL (server env only).
 *
 * SECURITY NOTE: The web app URL is public, so the shared secret is the
 * only gate. Keep it long, random, and server-side only. Anyone who
 * obtains it could write rows, so rotate it if it leaks.
 */

/* ── CONFIG (edit these two values) ── */
var SPREADSHEET_ID = 'PASTE_YOUR_SPREADSHEET_ID_HERE';
var SHEET_NAME = 'Sitecroft Project Inquiries';
var SHARED_SECRET = 'PASTE_A_LONG_RANDOM_SECRET_HERE';

/* Column order — must match toSheetRow() in src/lib/project-intake.ts */
var HEADERS = [
  'Timestamp',
  'Full name',
  'Email',
  'Company / business name',
  'Current website URL',
  'Services',
  'Project description',
  'Reference links',
  'Bug — website URL',
  'Bug — problem description',
  'Budget',
  'Timeline',
  'Materials availability',
  'Status',
];

/** Return the target sheet, creating it if necessary. */
function getSheet_() {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  return sheet;
}

/** Create the header row. Run this once after setup. */
function ensureHeader() {
  var sheet = getSheet_();
  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
  sheet.setFrozenRows(1);
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Web app entry point. Expects a JSON body:
 *   { secret, dispatch: "add-inquiry", timestamp, fullName, email, ... }
 */
function doPost(e) {
  try {
    var body = JSON.parse((e.postData && e.postData.contents) || '{}');

    // Validate the shared secret
    if (!SHARED_SECRET || body.secret !== SHARED_SECRET) {
      return json_({ ok: false, error: 'unauthorized' });
    }

    if (body.dispatch !== 'add-inquiry') {
      return json_({ ok: false, error: 'unsupported_dispatch' });
    }

    var sheet = getSheet_();

    // Lazily ensure the header row exists.
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    // Build the row in the exact HEADERS order.
    var row = [
      body.timestamp || new Date().toISOString(),
      body.fullName || '',
      body.email || '',
      body.companyName || '',
      body.currentWebsiteUrl || '',
      body.services || '',
      body.projectDescription || '',
      body.referenceLinks || '',
      body.problemUrl || '',
      body.problemDescription || '',
      body.budget || '',
      body.timeline || '',
      body.materials || '',
      body.status || 'New',
    ];

    sheet.appendRow(row);

    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

/** Simple health check via GET (optional). */
function doGet() {
  return json_({ ok: true, service: 'sitecroft-project-inquiries' });
}
