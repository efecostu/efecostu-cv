"use client";

import { useState } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";
import Reveal from "./Reveal";

type Status = "idle" | "loading" | "success" | "error";

const inputClass =
  "w-full h-11 px-3 rounded-md border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]/70 focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-transparent transition-shadow duration-200";

const labelClass = "block text-sm font-medium text-[var(--foreground)] mb-1.5";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorText, setErrorText] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorText("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, website }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.message ?? "Failed to send message");
      }

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      setErrorText(error instanceof Error ? error.message : "Failed to send message");
      setStatus("error");
    }
  };

  return (
    <div className="py-16 sm:py-20 px-4">
      <Reveal>
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-4 text-[var(--foreground)]">contact</h2>
        <p className="mb-8 text-base text-[var(--muted-foreground)] leading-relaxed max-w-[62ch]">
          Open to conversations about strategy, industrial B2B and data-driven operations. I usually reply within a
          day; you can also write directly to{" "}
          <a href="mailto:efecostu01@gmail.com" className="text-[var(--link)] hover:underline underline-offset-4">
            efecostu01@gmail.com
          </a>
          .
        </p>
      </Reveal>

      <Reveal delay={80}>
        <form onSubmit={handleSubmit} className="space-y-5 max-w-md">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="contact-name" className={labelClass}>
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                name="name"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClass}
                maxLength={120}
                required
              />
            </div>
            <div>
              <label htmlFor="contact-email" className={labelClass}>
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                name="email"
                autoComplete="email"
                inputMode="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
                maxLength={254}
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="contact-message" className={labelClass}>
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={`${inputClass} h-36 py-3 resize-y`}
              maxLength={5000}
              required
            />
          </div>

          <input
            type="text"
            name="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="hidden"
          />

          <button
            type="submit"
            disabled={status === "loading"}
            className="cursor-pointer inline-flex items-center justify-center h-11 px-6 rounded-md bg-[var(--primary)] text-[var(--primary-foreground)] text-sm font-medium hover:opacity-90 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] disabled:opacity-50 disabled:cursor-not-allowed transition-[opacity,transform] duration-200"
          >
            {status === "loading" ? "Sending…" : "Send message"}
          </button>

          <div aria-live="polite" className="min-h-[1.5rem]">
            {status === "success" && (
              <p className="inline-flex items-start gap-2 text-sm text-[var(--success)]">
                <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" strokeWidth={1.75} />
                Thanks, your message is on its way. I&apos;ll get back to you soon.
              </p>
            )}
            {status === "error" && (
              <p className="inline-flex items-start gap-2 text-sm text-[var(--danger)]" role="alert">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" strokeWidth={1.75} />
                <span>
                  {errorText || "Failed to send message."} Please try again or email me directly.
                </span>
              </p>
            )}
          </div>
        </form>
      </Reveal>
    </div>
  );
}
