import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "alamzweb@gmail.com",
    pass: "ktzn yqfm aamp cmbu",
  },
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, service, promoCode, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const mailOptions = {
      from: `"Sitecroft Contact" <contact@dnnengineer.com>`,
      to: "contact@dnnengineer.com",
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: 'DM Sans', Arial, sans-serif; background: #060b14; padding: 40px; color: #e2e8f0;">
          <div style="max-width: 600px; margin: 0 auto; background: #0a1020; border-radius: 16px; padding: 32px; border: 1px solid rgba(99,179,237,0.12);">
            <div style="height: 2px; background: linear-gradient(90deg,#3b82f6,#06b6d4); border-radius: 16px 16px 0 0; margin: -32px -32px 24px -32px;"></div>
            <h2 style="color: #fff; font-size: 20px; margin-bottom: 20px;">New Contact Form Submission</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; color: #64748b; font-size: 13px; width: 120px;">Name</td>
                <td style="padding: 10px 0; color: #fff; font-size: 14px;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #64748b; font-size: 13px;">Email</td>
                <td style="padding: 10px 0; color: #06b6d4; font-size: 14px;"><a href="mailto:${email}" style="color:#06b6d4;">${email}</a></td>
              </tr>
              ${phone ? `<tr><td style="padding:10px 0;color:#64748b;font-size:13px;">Phone</td><td style="padding:10px 0;color:#fff;font-size:14px;">${phone}</td></tr>` : ""}
              ${service ? `<tr><td style="padding:10px 0;color:#64748b;font-size:13px;">Service</td><td style="padding:10px 0;color:#fff;font-size:14px;">${service}</td></tr>` : ""}
              ${promoCode ? `<tr><td style="padding:10px 0;color:#64748b;font-size:13px;">Promo Code</td><td style="padding:10px 0;color:#06b6d4;font-size:14px;font-weight:700;letter-spacing:1px;">${promoCode}</td></tr>` : ""}
              <tr>
                <td style="padding: 10px 0; color: #64748b; font-size: 13px; vertical-align: top;">Message</td>
                <td style="padding: 10px 0; color: #fff; font-size: 14px; line-height: 1.7; white-space: pre-wrap;">${message}</td>
              </tr>
            </table>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Message sent successfully! I'll get back to you within 24 hours." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again or email me directly at contact@dnnengineer.com." },
      { status: 500 }
    );
  }
}