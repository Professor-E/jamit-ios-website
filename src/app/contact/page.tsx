"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import DownloadIcon from "@/components/DownloadIcon";

const APP_STORE_URL = "https://www.apple.com/app-store/";

export default function ContactPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    message: false,
  });

  const handleChange =
    (field: "name" | "email" | "message") =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = event.target.value;
      setFormValues((prev) => ({ ...prev, [field]: value }));
      if (errors[field] && value.trim()) {
        setErrors((prev) => ({ ...prev, [field]: false }));
      }
    };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = {
      name: !formValues.name.trim(),
      email: !formValues.email.trim(),
      message: !formValues.message.trim(),
    };

    setErrors(nextErrors);

    if (nextErrors.name || nextErrors.email || nextErrors.message) {
      alert("Please fill out all sections. Each section is mandatory.");
      return;
    }
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <div className="min-h-screen bg-[color:var(--beat-cream)] text-[color:var(--beat-ink)]">
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
                <div className="rounded-2xl bg-white/95 p-3 text-sm font-semibold text-[color:var(--beat-purple)] shadow-lg shadow-black/20 backdrop-blur">
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
                  className="space-y-5 px-10 py-10 text-sm md:px-12 md:py-12"
                  onSubmit={handleSubmit}
                >
                  <div>
                    <label className="font-display text-xs font-normal uppercase tracking-[0.18em] text-[color:var(--beat-ink-soft)]">
                      Name*
                    </label>
                    <input
                      type="text"
                      placeholder="Jane Smith"
                      value={formValues.name}
                      onChange={handleChange("name")}
                      aria-invalid={errors.name}
                      className={`mt-2 w-full rounded-md border bg-[#CACACA] px-4 py-2.5 text-sm text-[#2D2D2D] placeholder:text-[#3A3A3A] focus:outline-none ${
                        errors.name ? "border-red-500" : "border-transparent"
                      }`}
                    />
                  </div>
                  <div>
                    <label className="font-display text-xs font-normal uppercase tracking-[0.18em] text-[color:var(--beat-ink-soft)]">
                      Email*
                    </label>
                    <input
                      type="email"
                      placeholder="jane@framer.com"
                      value={formValues.email}
                      onChange={handleChange("email")}
                      aria-invalid={errors.email}
                      className={`mt-2 w-full rounded-md border bg-[#CACACA] px-4 py-2.5 text-sm text-[#2D2D2D] placeholder:text-[#3A3A3A] focus:outline-none ${
                        errors.email ? "border-red-500" : "border-transparent"
                      }`}
                    />
                  </div>
                  <div>
                    <label className="font-display text-xs font-normal uppercase tracking-[0.18em] text-[color:var(--beat-ink-soft)]">
                      Message*
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Tell us about a bug, suggest a feature, or tell us about your day..."
                      value={formValues.message}
                      onChange={handleChange("message")}
                      aria-invalid={errors.message}
                      className={`mt-2 w-full rounded-md border bg-[#CACACA] px-4 py-3 text-sm text-[#2D2D2D] placeholder:text-[#3A3A3A] focus:outline-none ${
                        errors.message ? "border-red-500" : "border-transparent"
                      }`}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-full bg-[color:var(--beat-purple)] py-3 text-sm font-semibold text-white shadow-inner shadow-black/20 transition duration-200 ease-out hover:-translate-y-0.5 hover:opacity-95 hover:shadow-[0_10px_20px_rgba(108,81,214,0.35)] active:translate-y-0 active:scale-[0.99]"
                  >
                    Submit
                  </button>
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
