// utils/sendEmail.js
/*import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MANAGER_EMAIL,      // your manager email
        pass: process.env.MANAGER_EMAIL_PASS, // app password from Gmail
      },
    });

    await transporter.sendMail({
      from: process.env.MANAGER_EMAIL,
      to,
      subject,
      text,
    });

    console.log("✅ Email sent successfully");
  } catch (error) {
    console.error("❌ Email sending failed:", error.message);
  }
};

export default sendEmail;
*/
/*import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const sendEmail = async (to, subject, text) => {
  try {
    // Log environment variables for debugging
    console.log("Using MANAGER_EMAIL:", process.env.MANAGER_EMAIL);
    console.log("Using MANAGER_EMAIL_PASS:", process.env.MANAGER_EMAIL_PASS);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MANAGER_EMAIL,      // Your manager email
        pass: process.env.MANAGER_EMAIL_PASS, // App password from Gmail
      },
    });

    // Verify connection configuration
    await transporter.verify();
    console.log("✅ SMTP server connection verified");

    // Send email
    await transporter.sendMail({
      from: process.env.MANAGER_EMAIL,
      to,
      subject,
      text,
    });

    console.log("✅ Email sent successfully");
  } catch (error) {
    console.error("❌ Email sending failed:", error.message);
    throw error; // Re-throw the error for better debugging
  }
};

export default sendEmail;*/
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const sendEmail = async (to, subject, text) => {
  try {
    console.log("Preparing to send email...");
    console.log("Recipient (to):", to);
    console.log("Subject:", subject);
    console.log("Text:", text);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MANAGER_EMAIL,      // Your manager email
        pass: process.env.MANAGER_EMAIL_PASS, // App password from Gmail
      },
    });

    await transporter.verify();
    console.log("✅ SMTP server connection verified");

    await transporter.sendMail({
      from: process.env.MANAGER_EMAIL,
      to,
      subject,
      text,
    });

    console.log("✅ Email sent successfully");
  } catch (error) {
    console.error("❌ Email sending failed:", error.message);
    throw error;
  }
};

export default sendEmail;