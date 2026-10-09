"use client";

import React, { useState } from "react";
import {
  Copy,
  Check,
  Send,
  Loader2,
  Phone,
  FileText,
  Globe,
  ExternalLink,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { profile } from "@/data/profile";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Toast } from "@/components/ui/Toast";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { contactSchema, ContactFormData } from "@/lib/validators";
import emailjs from "@emailjs/browser";

export function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
    honeypot: "",
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [revealedPhone, setRevealedPhone] = useState<string | null>(null);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setIsCopied(true);
      setToastMessage("Email copied to clipboard");
      setTimeout(() => {
        setIsCopied(false);
        setToastMessage(null);
      }, 3000);
    } catch {
      setToastMessage("Failed to copy. Please use email link.");
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  const handleRevealPhone = () => {
    // Client-side anti-scrape assembly: assembled on user click
    const country = "+91";
    const part1 = "85954";
    const part2 = "07590";
    setRevealedPhone(`${country} ${part1} ${part2}`);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormErrors({});
    setStatus("submitting");

    // Client-side Zod validation
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const fieldName = issue.path[0] as string;
        fieldErrors[fieldName] = issue.message;
      });
      setFormErrors(fieldErrors);
      setStatus("idle");
      return;
    }

    // Honeypot check (silently drop bot submissions)
    if (formData.honeypot && formData.honeypot.length > 0) {
      setStatus("success");
      setStatusMessage("Thank you! Your message has been sent successfully.");
      setFormData({ name: "", email: "", message: "", honeypot: "" });
      return;
    }

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setStatus("error");
      setStatusMessage(
        "EmailJS is not configured with keys yet. Please provide your Service ID, Template ID, and Public Key."
      );
      return;
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          name: formData.name,
          from_name: formData.name,
          email: formData.email,
          from_email: formData.email,
          reply_to: formData.email,
          message: formData.message,
          to_name: "Sagar Vashist",
        },
        publicKey
      );

      setStatus("success");
      setStatusMessage("Thank you! Your message has been sent successfully.");
      setFormData({ name: "", email: "", message: "", honeypot: "" });
    } catch (err: unknown) {
      setStatus("error");
      const msg =
        err instanceof Error
          ? err.message
          : "Unable to deliver message at this time. Please try again or use direct email.";
      setStatusMessage(msg);
    }
  };

  const mailtoFallback = `mailto:${profile.email}?subject=${encodeURIComponent(
    formData.name ? `Contact from ${formData.name}` : "Portfolio Inquiry"
  )}&body=${encodeURIComponent(formData.message || "")}`;

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="section-padding relative border-t border-[var(--line)]"
    >
      <div className="site-container">
        {/* Section Header */}
        <SectionHeader
          index="06"
          label="CONTACT"
          title="Let's build something together."
          subLabel="GET IN TOUCH"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Inquiries & Links */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <Reveal delay={0.1}>
              <p className="text-base sm:text-lg text-[var(--text-muted)] leading-relaxed">
                Open to internships, full-time roles and collaborations. The fastest
                way to reach me is email.
              </p>
            </Reveal>

            {/* Email Contact Card with Copy Button */}
            <Reveal delay={0.15}>
              <div className="glass-card p-6 flex flex-col gap-4">
                <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] font-semibold">
                  PRIMARY EMAIL
                </span>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <a
                    href={`mailto:${profile.email}`}
                    className="font-mono text-base sm:text-lg text-[var(--text)] hover:text-[var(--accent)] transition-colors break-all"
                  >
                    {profile.email}
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    aria-label="Copy email address to clipboard"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--accent)] transition-all cursor-pointer text-xs font-mono self-start sm:self-auto shrink-0"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[var(--accent)]" />
                        <span className="text-[var(--accent)]">COPIED</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>COPY</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </Reveal>

            {/* Anti-Scrape Phone Reveal */}
            <Reveal delay={0.2}>
              <div className="glass-card p-6 flex flex-col gap-3">
                <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] font-semibold">
                  PHONE CONTACT
                </span>

                {revealedPhone ? (
                  <a
                    href={`tel:${revealedPhone.replace(/\s+/g, "")}`}
                    className="font-mono text-base text-[var(--text)] hover:text-[var(--accent)] transition-colors flex items-center gap-2"
                  >
                    <Phone className="w-4 h-4 text-[var(--accent)]" />
                    <span>{revealedPhone}</span>
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={handleRevealPhone}
                    className="inline-flex items-center gap-2 px-4 py-2 min-h-[44px] rounded-full border border-[var(--line)] bg-[var(--surface)] hover:border-[var(--accent)] text-[var(--text-muted)] hover:text-[var(--text)] font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer self-start"
                  >
                    <Phone className="w-3.5 h-3.5 text-[var(--accent)]" />
                    <span>Reveal phone</span>
                  </button>
                )}
              </div>
            </Reveal>

            {/* Social and Reference Link Buttons */}
            <Reveal delay={0.25}>
              <div className="flex flex-wrap gap-3">
                <a
                  href={profile.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 min-h-[44px] rounded-full border border-[var(--line)] bg-[var(--surface)] hover:border-[var(--accent)] hover:text-[var(--accent)] font-mono text-xs uppercase tracking-wider text-[var(--text-muted)] transition-colors"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>

                <a
                  href={profile.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 min-h-[44px] rounded-full border border-[var(--line)] bg-[var(--surface)] hover:border-[var(--accent)] hover:text-[var(--accent)] font-mono text-xs uppercase tracking-wider text-[var(--text-muted)] transition-colors"
                >
                  <LinkedinIcon className="w-4 h-4" />
                  <span>LinkedIn</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>

                <a
                  href={profile.links.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 min-h-[44px] rounded-full border border-[var(--line)] bg-[var(--surface)] hover:border-[var(--accent)] hover:text-[var(--accent)] font-mono text-xs uppercase tracking-wider text-[var(--text-muted)] transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  <span>Resume (PDF)</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>

                <a
                  href={profile.links.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 min-h-[44px] rounded-full border border-[var(--line)] bg-[var(--surface)] hover:border-[var(--accent)] hover:text-[var(--accent)] font-mono text-xs uppercase tracking-wider text-[var(--text-muted)] transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  <span>Website</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </div>
            </Reveal>

            {/* Location & Timezone Line */}
            <Reveal delay={0.3}>
              <div className="pt-4 border-t border-[var(--line)] font-mono text-xs uppercase tracking-widest text-[var(--text-dim)] flex items-center gap-2">
                <span>{profile.location}</span>
                <span>•</span>
                <span>TIMEZONE: IST (UTC+5:30)</span>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <Reveal delay={0.2}>
              <div className="glass-card p-6 sm:p-8 md:p-10">
                <h3 className="font-display text-2xl font-bold tracking-tight text-[var(--text)] mb-2">
                  Send a direct message
                </h3>
                <p className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)] mb-8">
                  I typically respond within 24 hours.
                </p>

                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-6"
                >
                  {/* Honeypot field (hidden from view & screen readers) */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="honeypot">Leave empty</label>
                    <input
                      type="text"
                      id="honeypot"
                      name="honeypot"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.honeypot}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Name field */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block font-mono text-xs uppercase tracking-wider text-[var(--text-muted)] mb-2"
                    >
                      Your Name <span className="text-[var(--accent)]">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      aria-invalid={!!formErrors.name}
                      aria-describedby={formErrors.name ? "name-error" : undefined}
                      className={`w-full px-4 py-3 rounded-xl bg-[var(--bg-elev)] border text-[var(--text)] placeholder:text-[var(--text-dim)] text-base transition-colors focus-visible:outline-none focus-visible:border-[var(--accent)] ${
                        formErrors.name
                          ? "border-red-500/80"
                          : "border-[var(--line)]"
                      }`}
                    />
                    {formErrors.name && (
                      <p
                        id="name-error"
                        className="mt-1.5 font-mono text-xs text-red-400"
                      >
                        {formErrors.name}
                      </p>
                    )}
                  </div>

                  {/* Email field */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block font-mono text-xs uppercase tracking-wider text-[var(--text-muted)] mb-2"
                    >
                      Email Address <span className="text-[var(--accent)]">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="jane@example.com"
                      aria-invalid={!!formErrors.email}
                      aria-describedby={formErrors.email ? "email-error" : undefined}
                      className={`w-full px-4 py-3 rounded-xl bg-[var(--bg-elev)] border text-[var(--text)] placeholder:text-[var(--text-dim)] text-base transition-colors focus-visible:outline-none focus-visible:border-[var(--accent)] ${
                        formErrors.email
                          ? "border-red-500/80"
                          : "border-[var(--line)]"
                      }`}
                    />
                    {formErrors.email && (
                      <p
                        id="email-error"
                        className="mt-1.5 font-mono text-xs text-red-400"
                      >
                        {formErrors.email}
                      </p>
                    )}
                  </div>

                  {/* Message field */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block font-mono text-xs uppercase tracking-wider text-[var(--text-muted)] mb-2"
                    >
                      Message <span className="text-[var(--accent)]">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Hi Sagar, I'd like to talk about..."
                      aria-invalid={!!formErrors.message}
                      aria-describedby={
                        formErrors.message ? "message-error" : undefined
                      }
                      className={`w-full px-4 py-3 rounded-xl bg-[var(--bg-elev)] border text-[var(--text)] placeholder:text-[var(--text-dim)] text-base transition-colors resize-y focus-visible:outline-none focus-visible:border-[var(--accent)] ${
                        formErrors.message
                          ? "border-red-500/80"
                          : "border-[var(--line)]"
                      }`}
                    />
                    {formErrors.message && (
                      <p
                        id="message-error"
                        className="mt-1.5 font-mono text-xs text-red-400"
                      >
                        {formErrors.message}
                      </p>
                    )}
                  </div>

                  {/* Submission Status Region */}
                  <div
                    aria-live="polite"
                    aria-atomic="true"
                    className="min-h-[24px]"
                  >
                    {status === "success" && (
                      <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 font-mono text-xs">
                        {statusMessage}
                      </div>
                    )}

                    {status === "error" && (
                      <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 font-mono text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <span>{statusMessage}</span>
                        <a
                          href={mailtoFallback}
                          className="underline hover:text-white font-semibold shrink-0"
                        >
                          Send via Email Client →
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={status === "submitting"}
                    className="w-full sm:w-auto"
                    icon={
                      status === "submitting" ? (
                        <Loader2 className="w-4 h-4 animate-spin text-[#060708]" />
                      ) : (
                        <Send className="w-4 h-4 text-[#060708]" />
                      )
                    }
                  >
                    {status === "submitting"
                      ? "Sending message..."
                      : "Send message"}
                  </Button>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Accessible Toast for Email Copy */}
      <Toast message={toastMessage} />
    </section>
  );
}
