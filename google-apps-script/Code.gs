/**
 * Sitecroft Client Feedback → Google Sheets
 *
 * Create a NEW Apps Script project for feedback so the existing project inquiry
 * endpoint and spreadsheet tab remain unchanged.
 *
 * Setup:
 * 1. Create a Google Sheet and copy its spreadsheet ID into SPREADSHEET_ID.
 * 2. Create a long random secret and put it in SHARED_SECRET.
 * 3. Run ensureHeader() once and authorize the script.
 * 4. Deploy as a Web app: Execute as Me; access Anyone.
 * 5. Copy the /exec URL into FEEDBACK_SCRIPT_URL.
 * 6. Set the same secret in FEEDBACK_SECRET (server environment only).
 *
 * Optional photo upload:
 * - Create a Drive folder for client testimonial photos.
 * - Set PHOTO_FOLDER_ID below.
 * - The script uploads photos to that folder and enables link viewing.
 * - Only upload a photo when the client has explicitly checked photo permission.
 * - For stricter privacy, leave PHOTO_FOLDER_ID blank; feedback still saves,
 *   and the script skips photo storage.
 *
 * NOTE: A public view link is generated only for a submitted photo. The photo
 * is not displayed on the website automatically; manually review the row and
 * permission fields before using it.
 */

var SPREADSHEET_ID = "1aY2K0nECjlFSZRzijhqkFPslJLKsHvPbFT0T1JjDBCA";
var SHEET_NAME = "Sitecroft Client Feedback";
var SHARED_SECRET = "`a7K9mP2xQ8vR5nT3bW6yH1cD4jL0zF8q`";
var PHOTO_FOLDER_ID = "1iirdZ_tELXzjKopP6cCupYSXJGkLLPOe"; // Optional Drive folder ID

var HEADERS = [
  "Timestamp",
  "Client name",
  "Email",
  "Project",
  "Rating",
  "Feedback",
  "Display feedback permission",
  "Display photo permission",
  "Photo URL",
  "Review status"
];

function getSheet_() {
  var spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = spreadsheet.insertSheet(SHEET_NAME);
  return sheet;
}

function ensureHeader() {
  var sheet = getSheet_();
  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
  sheet.setFrozenRows(1);
}

function json_(object) {
  return ContentService.createTextOutput(JSON.stringify(object))
    .setMimeType(ContentService.MimeType.JSON);
}

function savePhoto_(photo, photoPermission) {
  if (!photo) return "";
  if (photoPermission !== true) {
    // Do not retain a photo if the user did not explicitly consent to its use.
    return "";
  }
  if (!PHOTO_FOLDER_ID) {
    // No configured folder: do not upload; the text feedback can still be saved.
    return "";
  }

  var allowed = ["image/jpeg", "image/png", "image/webp"];
  if (allowed.indexOf(photo.mimeType) === -1) throw new Error("unsupported_photo_type");

  var bytes = Utilities.base64Decode(photo.base64);
  if (bytes.length > 2 * 1024 * 1024) throw new Error("photo_too_large");

  var safeName = String(photo.fileName || "client-photo")
    .replace(/[^\w.\- ]/g, "_")
    .substring(0, 100);
  var blob = Utilities.newBlob(bytes, photo.mimeType, safeName);
  var folder = DriveApp.getFolderById(PHOTO_FOLDER_ID);
  var file = folder.createFile(blob);

  // Public link access is needed for an image to be displayed on a public site.
  // This runs only after explicit photo-display permission was given.
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  return file.getUrl();
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    var body = JSON.parse((e.postData && e.postData.contents) || "{}");

    if (!SHARED_SECRET || body.secret !== SHARED_SECRET) {
      return json_({ ok: false, error: "unauthorized" });
    }
    if (body.dispatch !== "add-feedback") {
      return json_({ ok: false, error: "unsupported_dispatch" });
    }

    var name = String(body.clientName || "").trim();
    var email = String(body.email || "").trim();
    var project = String(body.project || "").trim();
    var rating = Number(body.rating);
    var feedback = String(body.feedback || "").trim();

    if (!name || name.length > 120 || project.length > 160 ||
        !feedback || feedback.length > 2500 ||
        rating < 1 || rating > 5 || Math.floor(rating) !== rating) {
      return json_({ ok: false, error: "invalid_fields" });
    }

    // A honeypot hit is acknowledged but never stored.
    if (String(body.honeypot || "").trim()) {
      return json_({ ok: true });
    }

    lock.waitLock(10000);
    var sheet = getSheet_();
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
      sheet.setFrozenRows(1);
    }

    var photoUrl = "";
    try {
      photoUrl = savePhoto_(body.photo || null, body.photoDisplayPermission === true);
    } catch (photoError) {
      // The feedback text is more important than an optional photo.
      // Do not fail the entire feedback submission if photo storage fails.
      photoUrl = "";
    }

    var row = [
      new Date().toISOString(),
      name,
      email,
      project,
      rating,
      feedback,
      body.displayPermission === true ? "Yes" : "No",
      body.photoDisplayPermission === true && photoUrl ? "Yes" : "No",
      photoUrl,
      "Pending review"
    ];

    sheet.appendRow(row);
    return json_({ ok: true, photoUrl: photoUrl });
  } catch (error) {
    return json_({ ok: false, error: "save_failed" });
  } finally {
    try {
      lock.releaseLock();
    } catch (ignored) {}
  }
}

function doGet() {
  return json_({ ok: true, service: "sitecroft-client-feedback" });
}
