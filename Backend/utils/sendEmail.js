require("dotenv").config({ path: "../.env" });
const nodemailer = require("nodemailer");

async function sendEmail(arg1, arg2, arg3) {
  let to, subject, text, html;

  if (typeof arg1 === "object") {
    to = arg1.to;
    subject = arg1.subject || "Notification";
    text = arg1.text;
    html = arg1.html;
  } else {
    const name = arg1;
    text = arg2;
    to = arg3;
    subject = `Reminder for ${name}`;
    html = `<p>Hello <b>${name}</b>,</p><p>${text}</p>`;
  }

  if (!to) throw new Error("No recipient email provided");

  const port = Number(process.env.SMTP_PORT) || 587;
  const secure = port === 465;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: `"Cancer Prognosis App" <${process.env.SMTP_USER}>`,
    to,
    subject,
    text,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent to: ${to}`);
    console.log("Message ID:", info.messageId);
  } catch (error) {
    console.error("Failed to send email:", error.message);
  }
}

module.exports = sendEmail;
