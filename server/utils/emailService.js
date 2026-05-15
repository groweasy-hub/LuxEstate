const nodemailer = require("nodemailer");
const siteConfig = require("../config/siteConfig");

const SITE_URL = process.env.CLIENT_URL || "http://localhost:3000";

function getTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

function from() {
  return `"${siteConfig.brandName}" <${process.env.SMTP_USER || siteConfig.email}>`;
}

function adminEmail() {
  return process.env.ADMIN_EMAIL || siteConfig.email || process.env.SMTP_USER;
}

function htmlWrap(body) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>${siteConfig.brandName}</title>
</head>
<body style="margin:0;padding:0;background-color:#080808;font-family:'Georgia',serif;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#080808;padding:40px 16px;">
  <tr>
    <td align="center">
      <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">
        <tr><td style="height:3px;background:linear-gradient(90deg,#8B6914,#C9A84C,#E8C96A,#C9A84C,#8B6914);border-radius:2px 2px 0 0;"></td></tr>
        <tr>
          <td style="background:linear-gradient(160deg,#0f0d08 0%,#1a1208 50%,#0f0d08 100%);padding:40px 48px 32px;border-left:1px solid rgba(201,168,76,0.15);border-right:1px solid rgba(201,168,76,0.15);">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td>
                  <div style="margin-bottom:6px;font-family:'Georgia',serif;font-size:30px;font-weight:600;letter-spacing:0.08em;color:#E8C96A;">
                    ${siteConfig.brandName}
                  </div>
                  <p style="margin:0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:10px;letter-spacing:0.25em;text-transform:uppercase;color:rgba(201,168,76,0.55);">
                    ${siteConfig.brandTagline} | Since ${siteConfig.sinceYear}
                  </p>
                </td>
                <td align="right" valign="middle">
                  <table cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td style="width:44px;height:44px;border:1px solid rgba(201,168,76,0.3);text-align:center;vertical-align:middle;">
                        <div style="width:18px;height:18px;background:rgba(201,168,76,0.15);border:1px solid rgba(201,168,76,0.4);margin:auto;"></div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="background:#0f0d08;border-left:1px solid rgba(201,168,76,0.15);border-right:1px solid rgba(201,168,76,0.15);padding:0 48px;">
            <div style="height:1px;background:linear-gradient(90deg,transparent,rgba(201,168,76,0.4),transparent);"></div>
          </td>
        </tr>
        <tr>
          <td style="background:linear-gradient(180deg,#0f0d08 0%,#0a0a0a 100%);padding:48px;border-left:1px solid rgba(201,168,76,0.15);border-right:1px solid rgba(201,168,76,0.15);">
            ${body}
          </td>
        </tr>
        <tr><td style="height:1px;background:linear-gradient(90deg,transparent,rgba(201,168,76,0.3),transparent);border-left:1px solid rgba(201,168,76,0.15);border-right:1px solid rgba(201,168,76,0.15);"></td></tr>
        <tr>
          <td style="background:#080808;padding:28px 48px;border:1px solid rgba(201,168,76,0.1);border-top:none;border-radius:0 0 4px 4px;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td>
                  <p style="margin:0 0 4px;font-family:'Helvetica Neue',Arial,sans-serif;font-size:11px;color:rgba(201,168,76,0.5);letter-spacing:0.15em;text-transform:uppercase;">${siteConfig.brandName}</p>
                  <p style="margin:0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:11px;color:rgba(245,240,232,0.2);line-height:1.7;">Copyright ${siteConfig.rightsYear} ${siteConfig.brandName}. All rights reserved.<br/>Powered by Kommu Tech &amp; Marketing Pvt. Ltd</p>
                </td>
                <td align="right" valign="top">
                  <p style="margin:0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:10px;color:rgba(245,240,232,0.2);letter-spacing:0.08em;text-transform:uppercase;line-height:1.9;">RERA Registered<br/>Zero Brokerage<br/>Award Winning</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr><td style="height:3px;background:linear-gradient(90deg,#8B6914,#C9A84C,#E8C96A,#C9A84C,#8B6914);border-radius:0 0 2px 2px;"></td></tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}

function detailRow(label, value) {
  return `
  <tr>
    <td style="padding:14px 20px;border-bottom:1px solid rgba(255,255,255,0.04);">
      <p style="margin:0 0 3px;font-family:'Helvetica Neue',Arial,sans-serif;font-size:9px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(201,168,76,0.55);">${label}</p>
      <p style="margin:0;font-family:'Georgia',serif;font-size:14px;color:#f5f0e8;font-weight:400;">${value}</p>
    </td>
  </tr>`;
}

function resolveImageUrl(url) {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return "";
}

function imageBlock(imageUrl, caption) {
  const src = resolveImageUrl(imageUrl);
  if (!src) return "";

  return `
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:36px;border-radius:6px;overflow:hidden;border:1px solid rgba(201,168,76,0.2);">
      <tr>
        <td style="padding:0;line-height:0;">
          <img src="${src}" alt="${caption}" width="504" style="display:block;width:100%;max-height:240px;object-fit:cover;border-radius:5px 5px 0 0;"/>
        </td>
      </tr>
      <tr><td style="height:3px;background:linear-gradient(90deg,#8B6914,#C9A84C,#E8C96A,#C9A84C,#8B6914);"></td></tr>
      <tr>
        <td style="background:rgba(201,168,76,0.06);padding:10px 18px;">
          <p style="margin:0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(201,168,76,0.65);">&#9670; &nbsp;${caption}</p>
        </td>
      </tr>
    </table>`;
}

function buildUserEmail(lead, imageUrl, offerDiscount) {
  const hasOffer = Boolean(lead.offerTitle);
  const hasProject = Boolean(lead.projectInterested);

  const subject = hasOffer
    ? `Your Exclusive Offer Enquiry - ${lead.offerTitle}`
    : hasProject
      ? `Your Property Enquiry - ${lead.projectInterested}`
      : `Thank You for Contacting ${siteConfig.brandName}`;

  const headline = hasOffer ? "Your Deal Is Being Processed" : "We've Received Your Enquiry";

  const intro = hasOffer
    ? `Thank you for your interest in the <strong style="color:#C9A84C;">${lead.offerTitle}</strong> offer. Our dedicated property expert will reach out within <strong style="color:#E8C96A;">2 hours</strong> to help you claim this exclusive deal.`
    : hasProject
      ? `Thank you for your interest in <strong style="color:#C9A84C;">${lead.projectInterested}</strong>. Our dedicated property advisor will reach out within <strong style="color:#E8C96A;">2 hours</strong> to schedule your complimentary site visit.`
      : `Thank you for reaching out to ${siteConfig.brandName}. Our team will get back to you within <strong style="color:#E8C96A;">2 hours</strong>.`;

  const imgCaption = hasOffer
    ? (lead.offerTitle || lead.projectInterested || "Featured Property")
    : (lead.projectInterested || "Featured Property");

  const rows = [
    ["Full Name", lead.name],
    ["Phone", lead.phone],
    lead.email ? ["Email Address", lead.email] : null,
    hasProject ? ["Property", lead.projectInterested] : null,
    hasOffer ? ["Offer", lead.offerTitle] : null,
    hasOffer && offerDiscount ? ["Discount Claimed", offerDiscount] : null,
    lead.message ? ["Your Message", lead.message] : null,
  ].filter(Boolean);

  const body = `
    ${imageBlock(imageUrl, imgCaption)}

    <p style="margin:0 0 12px;font-family:'Helvetica Neue',Arial,sans-serif;font-size:10px;letter-spacing:0.25em;text-transform:uppercase;color:rgba(201,168,76,0.6);">Enquiry Confirmation</p>
    <h1 style="margin:0 0 20px;font-family:'Georgia',serif;font-size:28px;font-weight:400;color:#f5f0e8;line-height:1.3;">${headline}</h1>
    <div style="width:60px;height:1px;background:linear-gradient(90deg,#C9A84C,#E8C96A);margin-bottom:28px;"></div>
    <p style="margin:0 0 36px;font-family:'Helvetica Neue',Arial,sans-serif;font-size:15px;line-height:1.8;color:rgba(245,240,232,0.7);">${intro}</p>

    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:rgba(201,168,76,0.04);border:1px solid rgba(201,168,76,0.18);border-radius:6px;margin-bottom:36px;overflow:hidden;">
      <tr><td style="padding:16px 20px 12px;border-bottom:1px solid rgba(201,168,76,0.15);"><p style="margin:0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:9px;letter-spacing:0.25em;text-transform:uppercase;color:rgba(201,168,76,0.7);">&#9670; &nbsp;Enquiry Details</p></td></tr>
      ${rows.map(([label, value]) => detailRow(label, value)).join("")}
    </table>

    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:6px;margin-bottom:36px;">
      <tr><td style="padding:16px 20px 12px;border-bottom:1px solid rgba(255,255,255,0.05);"><p style="margin:0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:9px;letter-spacing:0.25em;text-transform:uppercase;color:rgba(245,240,232,0.35);">What Happens Next</p></td></tr>
      ${[
        ["01", "Our expert reviews your enquiry"],
        ["02", "You receive a call within 2 hours"],
        ["03", "Site visit scheduled at your convenience"],
      ].map(([num, text]) => `
      <tr><td style="padding:14px 20px;border-bottom:1px solid rgba(255,255,255,0.04);">
        <table cellpadding="0" cellspacing="0" border="0"><tr>
          <td style="padding-right:14px;vertical-align:top;"><span style="font-family:'Georgia',serif;font-size:18px;color:rgba(201,168,76,0.4);font-weight:300;">${num}</span></td>
          <td style="vertical-align:middle;"><p style="margin:0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;color:rgba(245,240,232,0.6);">${text}</p></td>
        </tr></table>
      </td></tr>`).join("")}
    </table>

    <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom:36px;">
      <tr><td style="background:linear-gradient(135deg,#C9A84C,#E8C96A);border-radius:4px;">
        <a href="${SITE_URL}/projects" style="display:inline-block;padding:16px 40px;font-family:'Helvetica Neue',Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:#060606;text-decoration:none;">Browse Properties &rarr;</a>
      </td></tr>
    </table>

    <p style="margin:0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;color:rgba(245,240,232,0.35);line-height:1.7;">
      Need immediate assistance?<br/>
      Call us at <a href="${siteConfig.phoneHref}" style="color:#C9A84C;text-decoration:none;">${siteConfig.phoneDisplay}</a> &nbsp;|&nbsp;
      <a href="mailto:${siteConfig.email}" style="color:#C9A84C;text-decoration:none;">${siteConfig.email}</a>
    </p>`;

  return { subject, html: htmlWrap(body) };
}

function buildAdminEmail(lead, imageUrl) {
  const source = (lead.source || "other").replace(/_/g, " ");
  const imgCaption = lead.projectInterested || lead.offerTitle || "Property";

  const rows = [
    ["Name", lead.name],
    ["Phone", lead.phone],
    lead.email ? ["Email", lead.email] : null,
    ["Source", source],
    lead.projectInterested ? ["Project", lead.projectInterested] : null,
    lead.offerTitle ? ["Offer", lead.offerTitle] : null,
    lead.offerDiscount ? ["Discount", lead.offerDiscount] : null,
    lead.message ? ["Message", lead.message] : null,
    ["Submitted", new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })],
  ].filter(Boolean);

  const subject = `New Lead - ${lead.name} (${lead.phone})`;

  const body = `
    ${imageBlock(imageUrl, imgCaption)}

    <p style="margin:0 0 12px;font-family:'Helvetica Neue',Arial,sans-serif;font-size:10px;letter-spacing:0.25em;text-transform:uppercase;color:rgba(201,168,76,0.6);">Admin Notification</p>
    <h1 style="margin:0 0 20px;font-family:'Georgia',serif;font-size:28px;font-weight:400;color:#f5f0e8;line-height:1.3;">New Lead Received</h1>
    <div style="width:60px;height:1px;background:linear-gradient(90deg,#C9A84C,#E8C96A);margin-bottom:28px;"></div>
    <p style="margin:0 0 36px;font-family:'Helvetica Neue',Arial,sans-serif;font-size:15px;line-height:1.8;color:rgba(245,240,232,0.7);">
      A new enquiry has been submitted via <strong style="color:#C9A84C;">${source}</strong>. Review and follow up promptly.
    </p>

    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:rgba(201,168,76,0.04);border:1px solid rgba(201,168,76,0.18);border-radius:6px;margin-bottom:36px;overflow:hidden;">
      <tr><td style="padding:16px 20px 12px;border-bottom:1px solid rgba(201,168,76,0.15);"><p style="margin:0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:9px;letter-spacing:0.25em;text-transform:uppercase;color:rgba(201,168,76,0.7);">&#9670; &nbsp;Lead Details</p></td></tr>
      ${rows.map(([label, value]) => detailRow(label, value)).join("")}
    </table>

    <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom:36px;">
      <tr><td style="background:linear-gradient(135deg,#C9A84C,#E8C96A);border-radius:4px;">
        <a href="${SITE_URL}/admin/leads" style="display:inline-block;padding:16px 40px;font-family:'Helvetica Neue',Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:#060606;text-decoration:none;">View in Dashboard &rarr;</a>
      </td></tr>
    </table>`;

  return { subject, html: htmlWrap(body) };
}

async function sendLeadEmails(
  lead,
  { projectImage = "", offerImage = "", offerDiscount = "" } = {},
) {
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (!smtpUser || !smtpPass) {
    console.warn("Email skipped: SMTP_USER or SMTP_PASS not set");
    return;
  }

  const transporter = getTransporter();

  try {
    await transporter.verify();
  } catch (err) {
    console.error("SMTP connection failed:", err.message);
    return;
  }

  const imageUrl = offerImage || projectImage || "";
  const sends = [];

  if (lead.email) {
    const { subject, html } = buildUserEmail(lead, imageUrl, offerDiscount);
    sends.push(
      transporter
        .sendMail({
          from: from(),
          to: lead.email,
          replyTo: siteConfig.email,
          subject,
          html,
        })
        .then(() => console.log(`User email sent -> ${lead.email}`))
        .catch((err) => console.error("User email error:", err.message)),
    );
  }

  const { subject, html } = buildAdminEmail(lead, imageUrl);
  sends.push(
    transporter
      .sendMail({
        from: from(),
        to: adminEmail(),
        replyTo: siteConfig.email,
        subject,
        html,
      })
      .then(() => console.log(`Admin email sent -> ${adminEmail()}`))
      .catch((err) => console.error("Admin email error:", err.message)),
  );

  await Promise.all(sends);
}

module.exports = { sendLeadEmails };
