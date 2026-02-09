"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import DownloadIcon from "@/components/DownloadIcon";

const APP_STORE_URL = "https://www.apple.com/app-store/";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
const CONFETTI_COLORS = ["#FDE047", "#FDBA74", "#F472B6", "#60A5FA", "#A78BFA", "#34D399"];

type FormValues = {
  name: string;
  email: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

type ConfettiPiece = {
  id: string;
  x: number;
  y: number;
  dx: number;
  dy: number;
  upX: number;
  upY: number;
  rotation: number;
  color: string;
  delay: number;
  size: number;
  duration: number;
};

export default function ContactPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formValues, setFormValues] = useState<FormValues>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [formStatus, setFormStatus] = useState<{
    state: "idle" | "submitting" | "success" | "error";
    message: string;
  }>({ state: "idle", message: "" });
  const [confettiPieces, setConfettiPieces] = useState<ConfettiPiece[]>([]);
  const [screenConfettiPieces, setScreenConfettiPieces] = useState<ConfettiPiece[]>([]);
  const confettiTimeoutRef = useRef<number | null>(null);
  const screenConfettiTimeoutRef = useRef<number | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const submitButtonRef = useRef<HTMLButtonElement | null>(null);

  const isValidEmail = (value: string) => EMAIL_REGEX.test(value.trim());

  const validateField = (field: keyof FormValues, value: string) => {
    const trimmedValue = value.trim();
    if (!trimmedValue) {
      return `${field === "message" ? "Message" : field[0].toUpperCase()}${field.slice(
        1
      )} is required.`;
    }
    if (field === "email" && !isValidEmail(trimmedValue)) {
      return "Enter a valid email address (gmail.com, yahoo.com, etc.).";
    }
    return "";
  };

  const validateForm = (values: FormValues) => {
    const nextErrors: FormErrors = {};
    (Object.keys(values) as Array<keyof FormValues>).forEach((field) => {
      const error = validateField(field, values[field]);
      if (error) {
        nextErrors[field] = error;
      }
    });
    return nextErrors;
  };

  const triggerConfetti = () => {
    if (typeof window === "undefined") {
      return;
    }
    const form = formRef.current;
    const button = submitButtonRef.current;
    if (!form || !button) {
      return;
    }

    const formRect = form.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();
    const originX = buttonRect.left - formRect.left + buttonRect.width / 2;
    const originY = buttonRect.top - formRect.top + buttonRect.height / 2;

    const pieces = Array.from({ length: 24 }, (_, index) => ({
      id: `${Date.now()}-burst-${index}`,
      x: originX,
      y: originY,
      upX: Math.round((Math.random() - 0.5) * 30),
      upY: Math.round(-90 - Math.random() * 60),
      dx: Math.round((Math.random() - 0.5) * 260),
      dy: Math.round(60 + Math.random() * 140),
      rotation: Math.round((Math.random() - 0.5) * 360),
      color: CONFETTI_COLORS[index % CONFETTI_COLORS.length],
      delay: Math.round(Math.random() * 120),
      size: 6 + Math.random() * 4,
      duration: 1000 + Math.random() * 350,
    }));

    if (confettiTimeoutRef.current) {
      window.clearTimeout(confettiTimeoutRef.current);
    }
    setConfettiPieces(pieces);
    confettiTimeoutRef.current = window.setTimeout(() => {
      setConfettiPieces([]);
    }, 1100);

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const screenPieces = Array.from({ length: 90 }, (_, index) => ({
      id: `${Date.now()}-screen-${index}`,
      x: Math.random() * screenWidth,
      y: -40 - Math.random() * 80,
      upX: 0,
      upY: 0,
      dx: Math.round((Math.random() - 0.5) * 120),
      dy: Math.round(screenHeight + 200 + Math.random() * 200),
      rotation: Math.round((Math.random() - 0.5) * 720),
      color: CONFETTI_COLORS[index % CONFETTI_COLORS.length],
      delay: Math.round(Math.random() * 280),
      size: 6 + Math.random() * 6,
      duration: 1600 + Math.random() * 800,
    }));

    if (screenConfettiTimeoutRef.current) {
      window.clearTimeout(screenConfettiTimeoutRef.current);
    }
    setScreenConfettiPieces(screenPieces);
    screenConfettiTimeoutRef.current = window.setTimeout(() => {
      setScreenConfettiPieces([]);
    }, 2600);
  };

  const handleChange =
    (field: "name" | "email" | "message") =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = event.target.value;
      setFormValues((prev) => ({ ...prev, [field]: value }));
      if (formStatus.state !== "idle") {
        setFormStatus({ state: "idle", message: "" });
      }
      if (errors[field]) {
        const nextError = validateField(field, value);
        setErrors((prev) => {
          if (!nextError) {
            const { [field]: _, ...rest } = prev;
            return rest;
          }
          return { ...prev, [field]: nextError };
        });
      }
    };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateForm(formValues);

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setFormStatus({
        state: "error",
        message: "Please fill out all sections with valid information.",
      });
      return;
    }

    setFormStatus({ state: "submitting", message: "Sending your message..." });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        const friendlyMessage =
          response.status >= 500
            ? "We couldn't send your message right now. Please try again or email help@jamit-ios.com."
            : result?.error || "Please check your info and try again.";
        setFormStatus({ state: "error", message: friendlyMessage });
        return;
      }

      setFormValues({ name: "", email: "", message: "" });
      setErrors({});
      setFormStatus({
        state: "success",
        message: "Thanks! Your message has been sent.",
      });
      triggerConfetti();
    } catch (error) {
      const message =
        error instanceof Error && error.message
          ? error.message
          : "We couldn't send your message right now. Please try again or email help@jamit-ios.com.";
      setFormStatus({ state: "error", message });
    }
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <div className="min-h-screen bg-[color:var(--beat-cream)] text-[color:var(--beat-ink)]">
      {screenConfettiPieces.length > 0 && (
        <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
          {screenConfettiPieces.map((piece) => (
            <span
              key={piece.id}
              className="confetti-piece confetti-shower"
              style={
                {
                  left: piece.x,
                  top: piece.y,
                  width: `${piece.size}px`,
                  height: `${piece.size * 1.6}px`,
                  backgroundColor: piece.color,
                  animationDelay: `${piece.delay}ms`,
                  ["--dx" as string]: `${piece.dx}px`,
                  ["--dy" as string]: `${piece.dy}px`,
                  ["--rot" as string]: `${piece.rotation}deg`,
                  ["--dur" as string]: `${piece.duration}ms`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      )}
      <div className="flex min-h-screen flex-col">
        <div className="bg-[color:var(--beat-purple)]">
          <header className="relative z-10 flex w-full items-center justify-between px-6 pb-4 pt-5 md:px-12 lg:px-16">
            <Link
              href="/"
              className="flex items-center gap-2 md:ml-6 lg:ml-10 transition hover:opacity-90 active:scale-[0.98]"
            >
              <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-[4px] bg-transparent">
                <Image
                  src="/assets/app-logo.svg"
                  alt="Jam It! logo"
                  width={28}
                  height={28}
                  priority
                  className="rounded-[4px]"
                />
              </div>
              <span className="font-display text-lg font-semibold text-white">Jam It!</span>
            </Link>

            <nav className="ml-auto hidden items-center gap-5 text-sm font-medium text-white/80 md:flex">
              <Link className="transition hover:text-white" href="/">
                Home
              </Link>
              <Link className="transition hover:text-white" href="/about-us">
                About Us
              </Link>
              <Link className="transition hover:text-white" href="/contact">
                Contact
              </Link>
            </nav>

            <Link
              href={APP_STORE_URL}
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-[color:var(--beat-purple)] shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:shadow-black/30 md:ml-4 md:inline-flex"
            >
              <DownloadIcon className="h-4 w-4" />
              Download App
            </Link>

            <div className="flex items-center gap-2 md:hidden">
              <Link
                href={APP_STORE_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[color:var(--beat-purple)] shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:shadow-black/30"
              >
                <DownloadIcon className="h-4 w-4" />
                Download App
              </Link>
              <button
                type="button"
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-nav"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/35 bg-white/15 text-white transition hover:bg-white/25"
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="flex flex-col items-center justify-center">
                  <span
                    className={`h-0.5 w-5 rounded-full bg-white transition-transform duration-200 ${
                      mobileMenuOpen ? "translate-y-[6px] rotate-45" : ""
                    }`}
                  />
                  <span
                    className={`mt-1 h-0.5 w-5 rounded-full bg-white transition-opacity duration-200 ${
                      mobileMenuOpen ? "opacity-0" : "opacity-100"
                    }`}
                  />
                  <span
                    className={`mt-1 h-0.5 w-5 rounded-full bg-white transition-transform duration-200 ${
                      mobileMenuOpen ? "-translate-y-[6px] -rotate-45" : ""
                    }`}
                  />
                </span>
              </button>
            </div>
          </header>

          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                id="mobile-nav"
                initial={{ opacity: 0, height: 0, y: -8 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -8 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="overflow-hidden px-6 pb-4 md:hidden"
              >
                <div className="rounded-2xl bg-white p-3 text-sm font-semibold text-[color:var(--beat-purple)] shadow-lg shadow-black/20 backdrop-blur">
                <Link
                  className="block rounded-xl px-3 py-2 transition hover:bg-[color:var(--beat-purple)]/10"
                  href="/"
                  onClick={closeMobileMenu}
                >
                  Home
                </Link>
                <Link
                  className="block rounded-xl px-3 py-2 transition hover:bg-[color:var(--beat-purple)]/10"
                  href="/about-us"
                  onClick={closeMobileMenu}
                >
                  About Us
                </Link>
                <Link
                  className="block rounded-xl px-3 py-2 transition hover:bg-[color:var(--beat-purple)]/10"
                  href="/contact"
                  onClick={closeMobileMenu}
                >
                  Contact
                </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <main className="flex flex-1 flex-col">
          <div className="mx-auto w-full max-w-[1240px] px-6 py-12 md:px-10">
            <section className="text-center">
              <h1 className="text-4xl font-bold leading-tight text-[color:var(--beat-ink)] md:text-5xl">
                Get in Touch
              </h1>
              <p className="mt-3 text-base leading-7 text-[color:var(--beat-ink-soft)] md:text-lg">
                Have questions, feedback, or song requests? We&apos;d love to hear from you.
              </p>
            </section>

            <section className="mt-6 rounded-[28px] border border-gray-200 bg-white shadow-[0_24px_70px_rgba(20,16,45,0.1)]">
              <div className="grid overflow-hidden rounded-[28px] md:grid-cols-[360px_1fr]">
                <div className="bg-[color:var(--beat-purple)] px-10 py-12 text-white">
                  <h2 className="font-display text-base font-normal uppercase tracking-[0.18em]">
                    Contact Information
                  </h2>
                  <div className="mt-6 space-y-5 text-sm">
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/15">
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M4 6h16v12H4z" />
                          <path d="m4 7 8 6 8-6" />
                        </svg>
                      </span>
                      <div>
                        <p className="text-white/70">Email</p>
                        <p className="font-semibold">help@jamit-ios.com</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/15">
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M12 21s7-7 7-11a7 7 0 1 0-14 0c0 4 7 11 7 11z" />
                          <circle cx="12" cy="10" r="2.5" />
                        </svg>
                      </span>
                      <div>
                        <p className="text-white/70">Location</p>
                        <p className="font-semibold">Cambridge, MA</p>
                      </div>
                    </div>
                  </div>
                </div>

                <form
                  ref={formRef}
                  className="relative space-y-5 px-10 py-10 text-sm md:px-12 md:py-12"
                  onSubmit={handleSubmit}
                >
                  <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    {confettiPieces.map((piece) => (
                      <span
                        key={piece.id}
                        className="confetti-piece confetti-burst"
                        style={
                          {
                            left: piece.x,
                            top: piece.y,
                            width: `${piece.size}px`,
                            height: `${piece.size * 1.6}px`,
                            backgroundColor: piece.color,
                            animationDelay: `${piece.delay}ms`,
                            ["--upx" as string]: `${piece.upX}px`,
                            ["--upy" as string]: `${piece.upY}px`,
                            ["--dx" as string]: `${piece.dx}px`,
                            ["--dy" as string]: `${piece.dy}px`,
                            ["--rot" as string]: `${piece.rotation}deg`,
                            ["--dur" as string]: `${piece.duration}ms`,
                          } as React.CSSProperties
                        }
                      />
                    ))}
                  </div>
                  <div>
                    <label className="font-display text-xs font-normal uppercase tracking-[0.18em] text-[color:var(--beat-ink-soft)]">
                      Name*
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="John Doe"
                      value={formValues.name}
                      onChange={handleChange("name")}
                      autoComplete="name"
                      required
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "contact-name-error" : undefined}
                      className={`mt-2 w-full rounded-md border bg-[#CACACA] px-4 py-2.5 text-sm text-[#2D2D2D] placeholder:text-[#7A7A7A] focus:outline-none ${
                        errors.name ? "border-red-500" : "border-transparent"
                      }`}
                    />
                    {errors.name && (
                      <p id="contact-name-error" className="mt-2 text-xs text-red-600">
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="font-display text-xs font-normal uppercase tracking-[0.18em] text-[color:var(--beat-ink-soft)]">
                      Email*
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="john.doe@email.com"
                      value={formValues.email}
                      onChange={handleChange("email")}
                      autoComplete="email"
                      inputMode="email"
                      required
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "contact-email-error" : undefined}
                      className={`mt-2 w-full rounded-md border bg-[#CACACA] px-4 py-2.5 text-sm text-[#2D2D2D] placeholder:text-[#7A7A7A] focus:outline-none ${
                        errors.email ? "border-red-500" : "border-transparent"
                      }`}
                    />
                    {errors.email && (
                      <p id="contact-email-error" className="mt-2 text-xs text-red-600">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="font-display text-xs font-normal uppercase tracking-[0.18em] text-[color:var(--beat-ink-soft)]">
                      Message*
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      placeholder="Tell us about a bug, suggest a feature, or tell us about your day..."
                      value={formValues.message}
                      onChange={handleChange("message")}
                      required
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? "contact-message-error" : undefined}
                      className={`mt-2 w-full rounded-md border bg-[#CACACA] px-4 py-3 text-sm text-[#2D2D2D] placeholder:text-[#7A7A7A] focus:outline-none ${
                        errors.message ? "border-red-500" : "border-transparent"
                      }`}
                    />
                    {errors.message && (
                      <p id="contact-message-error" className="mt-2 text-xs text-red-600">
                        {errors.message}
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={formStatus.state === "submitting"}
                    ref={submitButtonRef}
                    className="w-full rounded-full bg-[color:var(--beat-purple)] py-3 text-sm font-semibold text-white shadow-inner shadow-black/20 transition duration-200 ease-out hover:-translate-y-0.5 hover:opacity-95 hover:shadow-[0_10px_20px_rgba(108,81,214,0.35)] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none active:translate-y-0 active:scale-[0.99]"
                  >
                    {formStatus.state === "submitting" ? "Sending..." : "Submit"}
                  </button>
                  {formStatus.message && (
                    <p
                      className={`text-sm ${
                        formStatus.state === "success"
                          ? "text-green-600"
                          : formStatus.state === "error"
                            ? "text-red-600"
                            : "text-[color:var(--beat-ink-soft)]"
                      }`}
                      aria-live="polite"
                    >
                      {formStatus.message}
                    </p>
                  )}
                  <style jsx>{`
                    .confetti-piece {
                      position: absolute;
                      border-radius: 2px;
                      opacity: 0;
                      transform: translate(0, 0) rotate(0deg);
                    }

                    .confetti-burst {
                      animation: confetti-burst var(--dur, 900ms) ease-out forwards;
                    }

                    .confetti-shower {
                      animation: confetti-shower var(--dur, 1800ms) ease-out forwards;
                    }

                    @keyframes confetti-burst {
                      0% {
                        opacity: 1;
                        transform: translate(0, 0) rotate(0deg);
                      }
                      45% {
                        opacity: 1;
                        transform: translate(var(--upx), var(--upy)) rotate(var(--rot));
                      }
                      100% {
                        opacity: 0;
                        transform: translate(var(--dx), var(--dy)) rotate(var(--rot));
                      }
                    }

                    @keyframes confetti-shower {
                      0% {
                        opacity: 0;
                        transform: translate(0, 0) rotate(0deg);
                      }
                      15% {
                        opacity: 1;
                      }
                      100% {
                        opacity: 0;
                        transform: translate(var(--dx), var(--dy)) rotate(var(--rot));
                      }
                    }
                  `}</style>
                </form>
              </div>
            </section>
          </div>
        </main>
      </div>

      <footer className="bg-[#2b2b2b] px-6 py-8 text-xs text-white/70 md:px-12 lg:px-16">
        <div className="grid w-full gap-4 text-center md:grid-cols-3 md:items-center md:text-left">
          <div className="md:ml-6 lg:ml-10 md:justify-self-start">
            <p className="font-display text-sm font-semibold text-white">Jam It!</p>
            <p className="mt-1 text-[10px] text-white/60">A Jan, Dom, and Breck App</p>
          </div>
          <div className="flex items-center justify-center gap-2 text-[10px] text-white/60 md:justify-self-center">
            <Link href="/privacy-policy" className="transition hover:text-white">
              Privacy
            </Link>
            <span className="text-white/30">|</span>
            <Link href="/terms-of-use" className="transition hover:text-white">
              Terms of Use
            </Link>
          </div>
          <p className="text-[10px] text-white/50 md:justify-self-end">
            © 2026 Jam It App. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
