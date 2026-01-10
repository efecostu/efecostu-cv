"use client";
import React, { useState } from "react";

const ContactMe: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      setError(null);

      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `New contact request from: ${email}`
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to send. Please try again."
        );
      }

      setIsSubmitted(true);
      setEmail("");

      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    } catch (err) {
      console.error("Contact error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to send. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-20 px-4 flex flex-col items-center justify-center text-center">
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-[var(--foreground)]">
          Contact Me
        </h2>
        <p className="text-base mb-6 text-[var(--foreground)]">
          Leave your email and I'll get back to you
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-2"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-grow px-4 py-2 rounded-md border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--muted-foreground)]"
            required
            disabled={isSubmitting}
          />
          <button
            type="submit"
            className="px-6 py-2 bg-[var(--foreground)] text-[var(--background)] rounded-md hover:opacity-90 transition-opacity disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send"}
          </button>
        </form>

        {isSubmitted && (
          <p className="mt-2 text-green-500 text-sm">Thanks! I'll be in touch soon.</p>
        )}

        {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
      </div>
    </div>
  );
};

export default ContactMe;
