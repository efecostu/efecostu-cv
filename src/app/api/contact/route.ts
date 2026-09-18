import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }

  const { name, email, message, website } = (body ?? {}) as Record<string, unknown>;

  // Honeypot: real users never see this field, bots fill it in.
  if (typeof website === "string" && website.trim()) {
    return NextResponse.json({ message: "Message sent" }, { status: 200 });
  }

  if (typeof name !== "string" || !name.trim() || name.length > 120) {
    return NextResponse.json({ message: "Name is required" }, { status: 400 });
  }
  if (typeof email !== "string" || !EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json({ message: "A valid email is required" }, { status: 400 });
  }
  if (typeof message !== "string" || !message.trim()) {
    return NextResponse.json({ message: "Message is required" }, { status: 400 });
  }
  if (message.length > 5000) {
    return NextResponse.json({ message: "Message is too long" }, { status: 400 });
  }

  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) {
    console.error("Contact form: GMAIL_USER / GMAIL_APP_PASSWORD not configured");
    return NextResponse.json({ message: "Mail service unavailable" }, { status: 503 });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  const cleanName = name.trim();
  const cleanEmail = email.trim();
  const cleanMessage = message.trim();

  try {
    await transporter.sendMail({
      from: `"efecostu.space" <${user}>`,
      to: user,
      replyTo: `"${cleanName.replace(/"/g, "")}" <${cleanEmail}>`,
      subject: `[efecostu.space] Message from ${cleanName}`,
      text: `From: ${cleanName} <${cleanEmail}>\n\n${cleanMessage}`,
    });
  } catch (error) {
    console.error("Contact form: sendMail failed", error);
    return NextResponse.json(
      { message: "An error occurred while sending the message" },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: "Message sent" }, { status: 200 });
}
