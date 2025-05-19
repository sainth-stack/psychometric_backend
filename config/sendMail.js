import {statusUpdateTemplate} from "./template.js";
import nodemailer from 'nodemailer'
// Configure the SMTP transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for 587
  auth: {
    user: "vishnuvardhan6613@gmail.com",
    pass: "ltbe agcb kerh wvwp",
  },
});


export const sendEmail = async (to, subject, body, useHtmlTemplate = false) => {
  console.log("body at mail", body );
  const mailOptions = {
    from: "aneel@talentspotify.com",
    to,
    subject,
    text: useHtmlTemplate ? undefined : body, 
    html: useHtmlTemplate ? statusUpdateTemplate(body) : undefined, 
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully:", info.messageId);
  } catch (error) {
    console.error("❌ Error sending email:", error.message);
  }
};
