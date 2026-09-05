import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { saveInquiry } from "@/lib/applicationsStore";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const fullName = body.fullName || body.name || "Website Visitor";
    const email = body.email || "";
    const phone = body.phone || "N/A";
    const subject = body.subject || body.interest || "General Inquiry";
    const message = body.message || "No message body provided.";

    // Save Inquiry to Admin Storage
    saveInquiry({
      fullName,
      email,
      phone,
      subject,
      message,
    });

    const submissionTime = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

    const contactReportHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #f0f7ff; margin: 0; padding: 20px; color: #0a2540; }
            .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #bee3f8; padding: 30px; box-shadow: 0 10px 30px rgba(0,123,255,0.1); }
            .header { background: #0b192c; padding: 20px; border-radius: 12px; color: #ffffff; text-align: center; margin-bottom: 24px; }
            .badge { display: inline-block; background: #007bff; color: #ffffff; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: bold; text-transform: uppercase; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 13px; }
            td { padding: 8px 12px; border-bottom: 1px solid #f0f7ff; }
            td.label { font-weight: bold; color: #0a2540; width: 30%; background: #f8fafc; }
            .text-box { background: #f8fafc; border-left: 4px solid #007bff; padding: 14px; margin-top: 12px; font-size: 13px; line-height: 1.6; border-radius: 4px; }
            .footer { margin-top: 30px; text-align: center; font-size: 11px; color: #64748b; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="header">
              <span class="badge">General Communication</span>
              <h2 style="margin: 10px 0 4px 0; font-size: 20px;">New Inbound Inquiry</h2>
              <p style="margin: 0; font-size: 13px; color: #94a3b8;">${subject}</p>
            </div>

            <table>
              <tr><td class="label">Sender Name</td><td><strong>${fullName}</strong></td></tr>
              <tr><td class="label">Email Address</td><td><a href="mailto:${email}">${email}</a></td></tr>
              <tr><td class="label">Phone Number</td><td>${phone}</td></tr>
              <tr><td class="label">Inquiry Subject</td><td>${subject}</td></tr>
              <tr><td class="label">Received At</td><td>${submissionTime}</td></tr>
            </table>

            <h4 style="margin-top: 20px; font-size: 13px; color: #007bff; text-transform: uppercase;">Message Content</h4>
            <div class="text-box">${message.replace(/\n/g, "<br/>")}</div>

            <div class="footer">
              <p>KalpKrafts Platform Operations • Inbound Communication Dispatcher</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const host = process.env.SMTP_HOST || "smtp.gmail.com";
    const port = parseInt(process.env.SMTP_PORT || "587");
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const teamEmail = process.env.TEAM_EMAIL || "careers@kalpkrafts.com";

    let transporter;

    if (user && pass) {
      transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass },
      });
    } else {
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: { user: testAccount.user, pass: testAccount.pass },
      });
    }

    const mailOptions: nodemailer.SendMailOptions = {
      from: `"KalpKrafts Inbound" <${user || "contact@kalpkrafts.com"}>`,
      to: teamEmail,
      subject: `[Website Inquiry] ${subject} — ${fullName}`,
      html: contactReportHtml,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Inbound Contact Email dispatched:", info.messageId);

    return NextResponse.json({
      success: true,
      message: "Communication received and dispatched to team inbox successfully.",
    });
  } catch (err: any) {
    console.error("Error processing contact inquiry:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to process inquiry." },
      { status: 500 }
    );
  }
}
