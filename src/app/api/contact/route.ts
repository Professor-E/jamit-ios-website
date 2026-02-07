import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
const REQUIRED_ENV_VARS = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS"];

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
};

const sanitizeHeaderValue = (value: string) => value.replace(/[\r\n]+/g, " ").trim();

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const isValidEmail = (value: string) => EMAIL_REGEX.test(value.trim());

const validatePayload = (payload: ContactPayload) => {
  const errors: string[] = [];
  const name = payload.name?.trim() ?? "";
  const email = payload.email?.trim() ?? "";
  const message = payload.message?.trim() ?? "";

  if (!name) {
    errors.push("Name is required.");
  }
  if (!email) {
    errors.push("Email is required.");
  } else if (!isValidEmail(email)) {
    errors.push("A valid email address is required.");
  }
  if (!message) {
    errors.push("Message is required.");
  }

  return { errors, name, email, message };
};

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { errors, name, email, message } = validatePayload(payload);

  if (errors.length > 0) {
    return NextResponse.json({ error: errors[0] }, { status: 400 });
  }

  const missingVars = REQUIRED_ENV_VARS.filter((key) => !process.env[key]);
  if (missingVars.length > 0) {
    return NextResponse.json(
      { error: "Email service is not configured yet." },
      { status: 500 }
    );
  }

  const port = Number(process.env.SMTP_PORT ?? "587");
  const secure = process.env.SMTP_SECURE === "true" || port === 465;

  const createTransporter = (options: { port: number; secure: boolean }) =>
    nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: options.port,
      secure: options.secure,
      requireTLS: !options.secure,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

  const shouldRetryInsecure = (error: unknown) => {
    if (!(error instanceof Error)) {
      return false;
    }
    const message = error.message.toLowerCase();
    return (
      message.includes("wrong version number") ||
      message.includes("ssl routines") ||
      message.includes("ssl3_get_record") ||
      message.includes("tls")
    );
  };

  const fromAddress = process.env.MAIL_FROM ?? "Jam It Contact <no-reply@jamit-ios.com>";
  const toAddress = process.env.MAIL_TO ?? "help@jamit-ios.com";
  const safeName = sanitizeHeaderValue(name);
  const safeEmail = sanitizeHeaderValue(email);

  const subject = `Jam It Contact: ${safeName}`;
  const textBody = [
    `Name: ${safeName}`,
    `Email: ${safeEmail}`,
    "",
    "Message:",
    message,
  ].join("\n");
  const htmlBody = `
    <p><strong>Name:</strong> ${escapeHtml(safeName)}</p>
    <p><strong>Email:</strong> ${escapeHtml(safeEmail)}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
  `;

  const mailOptions = {
    from: fromAddress,
    to: toAddress,
    replyTo: `${safeName} <${safeEmail}>`,
    subject,
    text: textBody,
    html: htmlBody,
  };

  try {
    const transporter = createTransporter({ port, secure });
    await transporter.sendMail(mailOptions);
  } catch (error) {
    if (secure && shouldRetryInsecure(error)) {
      try {
        const fallbackPort = port === 465 ? 587 : port;
        const fallbackTransporter = createTransporter({
          port: fallbackPort,
          secure: false,
        });
        await fallbackTransporter.sendMail(mailOptions);
        return NextResponse.json({ ok: true });
      } catch (fallbackError) {
        console.error("SMTP fallback failed:", fallbackError);
      }
    } else {
      console.error("SMTP send failed:", error);
    }
    return NextResponse.json(
      { error: "Unable to send your message right now." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
