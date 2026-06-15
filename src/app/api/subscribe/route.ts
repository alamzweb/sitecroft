import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { readFileSync } from "fs";
import { join } from "path";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/** Call the Google Apps Script with a given payload and return parsed JSON */
async function callGoogleScript(payload: Record<string, unknown>) {
  const url = process.env.GOOGLE_SCRIPT_URL;
  if (!url) return null;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return await res.json();
  } catch (err) {
    console.error("Google Apps Script call failed:", err);
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, email } = body;

    if (!firstName || !email) {
      return NextResponse.json(
        { error: "First name and email are required." },
        { status: 400 }
      );
    }

    const now = new Date();
    const formattedDate = now.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    const googleScriptUrl = process.env.GOOGLE_SCRIPT_URL;

    // Step 1: Check if email already exists in Google Sheets
    if (googleScriptUrl) {
      const checkResult = await callGoogleScript({
        dispatch: "check",
        email,
      });

      if (checkResult?.exists) {
        return NextResponse.json(
          {
            message: "You're already subscribed! Thanks for being part of the Sitecroft community.",
            alreadySubscribed: true,
          },
          { status: 200 }
        );
      }
    }

    // Step 2: Add the subscriber to Google Sheets (with subscription + emailStatus columns)
    if (googleScriptUrl) {
      await callGoogleScript({
        dispatch: "add",
        firstName,
        email,
        date: formattedDate,
        subscription: "Active",
        emailStatus: "Pending",
      });
    }

    // Step 3: Send Welcome Email
    let emailSent = false;
    try {
      // Read and encode the logo
      const logoPath = join(process.cwd(), "public", "logo.png");
      const logoBuffer = readFileSync(logoPath);
      const logoBase64 = logoBuffer.toString("base64");

      const mailOptions = {
        from: `"Saad @ Sitecroft" <${process.env.SMTP_USER}>`,
        to: email,
        subject: `Hey ${firstName}! Welcome to the Sitecroft Newsletter 🎉`,
        html: `
          <div style="font-family: 'DM Sans', Arial, sans-serif; background: #060b14; padding: 40px; color: #e2e8f0;">
            <div style="max-width: 600px; margin: 0 auto; background: #0a1020; border-radius: 16px; padding: 32px; border: 1px solid rgba(99,179,237,0.12);">
              <!-- Gradient top bar -->
              <div style="height: 3px; background: linear-gradient(90deg, #3b82f6, #06b6d4, #3b82f6); border-radius: 16px 16px 0 0; margin: -32px -32px 28px -32px;"></div>

              <!-- Logo -->
              <div style="text-align: center; margin-bottom: 24px;">
                <img src="cid:sitecroft-logo" alt="Sitecroft" style="height: 40px; width: auto; display: inline-block;" />
              </div>

              <!-- Greeting -->
              <h2 style="color: #fff; font-size: 22px; margin-bottom: 4px; text-align: center;">Hey ${firstName}, Saad here! 👋</h2>

              <p style="color: #64748b; font-size: 13px; text-align: center; margin-bottom: 24px; font-style: italic;">Founder of Sitecroft</p>

              <p style="color: #94a3b8; font-size: 15px; line-height: 1.7; text-align: center; margin-bottom: 20px;">
                Welcome to the Sitecroft newsletter — I'm really glad you're here! I started Sitecroft to help businesses build fast, modern websites that actually work, and this newsletter is my way of keeping you in the loop.
              </p>

              <p style="color: #94a3b8; font-size: 15px; line-height: 1.7; text-align: center; margin-bottom: 28px;">
                No spam, no fluff — just the good stuff, delivered straight to your inbox.
              </p>

              <!-- Card -->
              <div style="background: rgba(59,130,246,0.08); border: 1px solid rgba(59,130,246,0.15); border-radius: 12px; padding: 24px; margin-bottom: 28px; text-align: center;">
                <p style="color: #63b3ed; font-size: 14px; font-weight: 600; margin-bottom: 8px;">Here's what you can expect:</p>
                <p style="color: #94a3b8; font-size: 13px; line-height: 1.8; margin: 0;">
                  🎉 Exclusive offers & discounts on services<br>
                  🚀 New services, plugins & product releases
                </p>
              </div>

              <!-- CTA Button -->
              <div style="text-align: center; margin-bottom: 28px;">
                <a href="https://sitecroft.com" style="display: inline-block; background: linear-gradient(135deg, #3b82f6, #06b6d4); color: #fff; padding: 14px 32px; border-radius: 10px; font-size: 14px; font-weight: 600; text-decoration: none; box-shadow: 0 0 20px rgba(59,130,246,0.3);">Visit Sitecroft</a>
              </div>

              <!-- Friendly note -->
              <p style="color: #94a3b8; font-size: 13px; text-align: center; line-height: 1.7; margin-bottom: 24px;">
                Got any questions or need help with something? Just hit reply — I'm always happy to help. 😊
              </p>

              <!-- Divider -->
              <div style="height: 1px; background: rgba(99,179,237,0.1); margin-bottom: 20px;"></div>

              <!-- Personal Sign-off -->
              <p style="color: #94a3b8; font-size: 14px; text-align: center; margin-bottom: 4px; line-height: 1.6;">
                Talk soon,<br>
                <span style="color: #fff; font-weight: 600;">Saad</span>
              </p>
              <p style="color: #64748b; font-size: 12px; text-align: center; margin-bottom: 0;">
                Founder, Sitecroft
              </p>

              <!-- Footer -->
              <div style="height: 1px; background: rgba(99,179,237,0.08); margin: 20px 0;"></div>
              <p style="color: #475569; font-size: 11px; text-align: center; line-height: 1.6; margin: 0;">
                You're receiving this because you subscribed at sitecroft.com.<br>
                If this wasn't you, no worries — just ignore this email.
              </p>

              <p style="color: #334155; font-size: 11px; text-align: center; margin-top: 16px;">
                © ${new Date().getFullYear()} Sitecroft. All rights reserved.
              </p>
            </div>
          </div>
        `,
        attachments: [
          {
            filename: "logo.png",
            content: logoBuffer,
            cid: "sitecroft-logo",
          },
        ],
      };

      await transporter.sendMail(mailOptions);
      emailSent = true;
    } catch (emailError) {
      console.error("Welcome email failed:", emailError);
      emailSent = false;
    }

    // Step 4: Update the emailStatus in Google Sheets
    if (googleScriptUrl) {
      await callGoogleScript({
        dispatch: "updateEmailStatus",
        email,
        emailStatus: emailSent ? "Sent" : "Failed",
      });
    }

    if (emailSent) {
      return NextResponse.json(
        { message: "Subscribed successfully! Check your inbox for a welcome email." },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Subscribed! Welcome email could not be sent — please contact us if you need assistance." },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Subscribe error:", error);
    return NextResponse.json(
      { error: "Failed to subscribe. Please try again later." },
      { status: 500 }
    );
  }
}