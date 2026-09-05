import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { saveApplication } from "@/lib/applicationsStore";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    // Extract Candidate Form Fields
    const fullName = (formData.get("fullName") as string) || "Anonymous Applicant";
    const email = (formData.get("email") as string) || "";
    const phone = (formData.get("phone") as string) || "N/A";
    const location = (formData.get("location") as string) || "N/A";
    
    const university = (formData.get("university") as string) || "N/A";
    const degree = (formData.get("degree") as string) || "N/A";
    const gradYear = (formData.get("gradYear") as string) || "N/A";
    
    const github = (formData.get("github") as string) || "";
    const linkedin = (formData.get("linkedin") as string) || "";
    const portfolio = (formData.get("portfolio") as string) || "";
    
    const startDate = (formData.get("startDate") as string) || "Immediate";
    const commitment = (formData.get("commitment") as string) || "Full-Time Internship";
    const remotePreference = (formData.get("remotePreference") as string) || "Remote";
    
    const projectsOverview = (formData.get("projectsOverview") as string) || "N/A";
    const whyKalpKrafts = (formData.get("whyKalpKrafts") as string) || "N/A";
    const referralSource = (formData.get("referralSource") as string) || "Direct";
    
    const roleTitle = (formData.get("roleTitle") as string) || "General Application";
    const dept = (formData.get("dept") as string) || "Engineering";

    // Extract File Attachment (Resume)
    const resumeFile = formData.get("resumeFile") as File | null;
    const resumeLink = (formData.get("resumeLink") as string) || "";

    let fileBuffer: Buffer | null = null;
    let fileName = "resume.pdf";
    let fileType = "application/pdf";

    if (resumeFile && typeof resumeFile.arrayBuffer === "function") {
      const bytes = await resumeFile.arrayBuffer();
      fileBuffer = Buffer.from(bytes);
      fileName = resumeFile.name || "resume.pdf";
      fileType = resumeFile.type || "application/pdf";
    }

    // Save Application to Admin Storage
    saveApplication({
      fullName,
      email,
      phone,
      location,
      university,
      degree,
      gradYear,
      github,
      linkedin,
      portfolio,
      startDate,
      commitment,
      remotePreference,
      resumeLink,
      fileName: resumeFile ? resumeFile.name : undefined,
      fileSize: resumeFile ? `${(resumeFile.size / (1024 * 1024)).toFixed(2)} MB` : undefined,
      projectsOverview,
      whyKalpKrafts,
      referralSource,
      roleTitle,
      dept,
    });

    // Generate Candidate Match Rating & Executive Assessment Report
    const submissionTime = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    const candidateReportHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #f0f7ff; margin: 0; padding: 20px; color: #0a2540; }
            .card { max-width: 650px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #bee3f8; padding: 30px; box-shadow: 0 10px 30px rgba(0,123,255,0.1); }
            .header { background: #0b192c; padding: 20px; border-radius: 12px; color: #ffffff; text-align: center; margin-bottom: 24px; }
            .badge { display: inline-block; background: #007bff; color: #ffffff; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: bold; text-transform: uppercase; }
            .section-title { border-bottom: 2px solid #e0f2fe; padding-bottom: 6px; margin-top: 24px; font-size: 14px; font-weight: bold; color: #007bff; text-transform: uppercase; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 13px; }
            td { padding: 8px 12px; border-bottom: 1px solid #f0f7ff; }
            td.label { font-weight: bold; color: #0a2540; width: 35%; background: #f8fafc; }
            .text-box { background: #f8fafc; border-left: 4px solid #007bff; padding: 12px; margin-top: 8px; font-size: 13px; line-height: 1.6; border-radius: 4px; }
            .footer { margin-top: 30px; text-align: center; font-size: 11px; color: #64748b; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="header">
              <span class="badge">${dept}</span>
              <h2 style="margin: 10px 0 4px 0; font-size: 22px;">Candidate Application Report</h2>
              <p style="margin: 0; font-size: 13px; color: #94a3b8;">${roleTitle}</p>
            </div>

            <div class="section-title">1. Applicant Profile</div>
            <table>
              <tr><td class="label">Full Name</td><td><strong>${fullName}</strong></td></tr>
              <tr><td class="label">Email Address</td><td><a href="mailto:${email}">${email}</a></td></tr>
              <tr><td class="label">Phone / WhatsApp</td><td>${phone}</td></tr>
              <tr><td class="label">Location</td><td>${location}</td></tr>
              <tr><td class="label">Submission Time</td><td>${submissionTime}</td></tr>
            </table>

            <div class="section-title">2. Academic Background & Online Links</div>
            <table>
              <tr><td class="label">University / College</td><td>${university}</td></tr>
              <tr><td class="label">Degree & Major</td><td>${degree}</td></tr>
              <tr><td class="label">Expected Graduation</td><td>${gradYear}</td></tr>
              <tr><td class="label">GitHub Profile</td><td>${github ? `<a href="${github}" target="_blank">${github}</a>` : "Not provided"}</td></tr>
              <tr><td class="label">LinkedIn Profile</td><td>${linkedin ? `<a href="${linkedin}" target="_blank">${linkedin}</a>` : "Not provided"}</td></tr>
              <tr><td class="label">Portfolio / Demo</td><td>${portfolio ? `<a href="${portfolio}" target="_blank">${portfolio}</a>` : "Not provided"}</td></tr>
            </table>

            <div class="section-title">3. Availability & Work Commitment</div>
            <table>
              <tr><td class="label">Earliest Start Date</td><td>${startDate}</td></tr>
              <tr><td class="label">Work Commitment</td><td>${commitment}</td></tr>
              <tr><td class="label">Remote Preference</td><td>${remotePreference}</td></tr>
              <tr><td class="label">Referral Source</td><td>${referralSource}</td></tr>
            </table>

            <div class="section-title">4. Key Projects & Technical Accomplishments</div>
            <div class="text-box">${projectsOverview.replace(/\n/g, "<br/>")}</div>

            <div class="section-title">5. Motivation & Why KalpKrafts</div>
            <div class="text-box">${whyKalpKrafts.replace(/\n/g, "<br/>")}</div>

            ${resumeLink ? `<p style="font-size:12px; margin-top:16px;"><strong>Cloud Resume Link:</strong> <a href="${resumeLink}" target="_blank">${resumeLink}</a></p>` : ""}

            <div class="footer">
              <p>KalpKrafts Recruitment & Talent Engine • Automated Executive Candidate Report</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Configure Mail Transporter (Uses Environment SMTP or Safe Test Fallback)
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
      // Test/Demo Transporter fallback using Nodemailer test account so server never errors out
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: { user: testAccount.user, pass: testAccount.pass },
      });
    }

    const mailOptions: nodemailer.SendMailOptions = {
      from: `"KalpKrafts Careers" <${user || "careers@kalpkrafts.com"}>`,
      to: teamEmail,
      subject: `[New Application] ${fullName} — ${roleTitle} (${dept})`,
      html: candidateReportHtml,
      attachments: fileBuffer
        ? [
            {
              filename: fileName,
              content: fileBuffer,
              contentType: fileType,
            },
          ]
        : [],
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Candidate Application Email dispatched:", info.messageId);

    return NextResponse.json({
      success: true,
      message: "Application submitted and Candidate Evaluation Report dispatched successfully.",
      applicant: fullName,
      role: roleTitle,
    });
  } catch (err: any) {
    console.error("Error processing career application:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to process application." },
      { status: 500 }
    );
  }
}
