"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import DownloadIcon from "@/components/DownloadIcon";

const APP_STORE_URL = "https://www.apple.com/app-store/";

const teamMembers = [
  {
    name: "Jan Szmajda",
    role: "Developer",
    bio: "Avid soccer player and double-major in math and computer science & engineering. LOVES his goldendoodle named Pola!",
    photo: "/assets/Jan.png",
    photoPosition: "50% 20%",
    photoScale: 1.3,
    photoShiftY: 3,
    links: {
      github: "https://github.com/janszmajda",
      linkedin: "https://www.linkedin.com/in/janszmajda/",
      instagram: "https://www.instagram.com/jan.szmajda/",
    },
  },
  {
    name: "Dominik Grzeszczak",
    role: "Developer",
    bio: "Double majoring in electrical engineering and computer science and finance. Takes ANY opportunity to go skiing!",
    photo: "/assets/Dom.jpg",
    photoPosition: "-10% 0%",
    photoScale: 1.15,
    photoShiftY: -2,
    links: {
      github: "https://github.com/Professor-E",
      linkedin: "https://www.linkedin.com/in/dominik-grzeszczak-184982285/",
      instagram: "https://www.instagram.com/grzeszczak.dominik/",
    },
  },
  {
    name: "Breck Massey",
    role: "Developer",
    bio: "Majoring in electrical engineering and computer science. ALWAYS active in the gym and playing spikeball!",
    photo: "/assets/Breck.jpeg",
    photoPosition: "50% 50%",
    photoScale: 1.3,
    photoShiftY: 18,
    links: {
      github: "https://github.com/BreckMasseyMain",
      linkedin: "https://www.linkedin.com/in/breckcmassey/",
      instagram: "https://www.instagram.com/breckmassey/",
    },
  },
];

export default function AboutUsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, []);

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
          <section className="mx-auto w-full max-w-[1240px] px-6 py-12 text-center md:px-10">
            <h1 className="text-4xl font-bold leading-tight text-[color:var(--beat-ink)] md:text-5xl">
              A Team Who Loves Rythym
            </h1>
            <p className="mt-3 text-base leading-7 text-[color:var(--beat-ink-soft)] md:text-lg">
              We&apos;re a trio of MIT students building Jam It! which is meant to be played loud, together, and on repeat.
            </p>
          </section>

          <section className="mt-3 flex justify-center pb-8">
            <div className="mx-auto w-full max-w-[1200px] px-6 py-2 md:px-10">
              <div className="grid w-full items-stretch justify-items-center gap-8 md:grid-cols-3 md:gap-10">
                {teamMembers.map((member) => (
                  <div
                    key={member.name}
                    className="flex h-full w-full max-w-[420px] min-h-[460px] flex-col justify-center rounded-[28px] border-2 border-gray-200 bg-white px-8 py-14 text-center shadow-[0_16px_38px_rgba(20,16,45,0.12)] transition-transform duration-300 ease-out hover:scale-[1.03] md:min-h-[520px] md:px-10 md:py-16"
                  >
                    <div className="relative mx-auto h-32 w-32 overflow-hidden rounded-full border-2 border-[color:var(--beat-purple)]/40 md:h-36 md:w-36">
                      <Image
                        src={member.photo}
                        alt={`${member.name} portrait`}
                        fill
                        sizes="(max-width: 768px) 128px, 144px"
                        className="object-cover"
                        style={{
                          objectPosition: member.photoPosition,
                          transform: `translateY(${member.photoShiftY ?? 0}px) scale(${member.photoScale ?? 1})`,
                          transformOrigin: "center",
                        }}
                      />
                    </div>
                    <h3 className="mt-5 font-display text-xl font-semibold text-[color:var(--beat-ink)] md:text-2xl">
                      {member.name}
                    </h3>
                    <p className="font-display text-sm font-semibold uppercase tracking-[0.28em] text-[color:var(--beat-purple)]/90">
                      {member.role}
                    </p>
                    <p className="mt-4 text-sm leading-6 text-[color:var(--beat-ink-soft)] md:text-base">
                      {member.bio}
                    </p>
                    <div className="mt-5 flex items-center justify-center gap-3">
                      <a
                        href={member.links.github}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-[color:var(--beat-ink-soft)] transition hover:border-[color:var(--beat-purple)]/40 hover:text-[color:var(--beat-purple)]"
                      >
                        <Image
                          src="/assets/brand-github.svg"
                          alt="GitHub"
                          width={18}
                          height={18}
                        />
                      </a>
                      <a
                        href={member.links.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-[color:var(--beat-ink-soft)] transition hover:border-[color:var(--beat-purple)]/40 hover:text-[color:var(--beat-purple)]"
                      >
                        <Image
                          src="/assets/brand-linkedin.svg"
                          alt="LinkedIn"
                          width={18}
                          height={18}
                        />
                      </a>
                      <a
                        href={member.links.instagram}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-[color:var(--beat-ink-soft)] transition hover:border-[color:var(--beat-purple)]/40 hover:text-[color:var(--beat-purple)]"
                      >
                        <Image
                          src="/assets/brand-instagram.svg"
                          alt="Instagram"
                          width={18}
                          height={18}
                        />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>

      <section className="mx-auto w-full max-w-5xl px-6 pb-12 md:px-10">
        <div className="rounded-[28px] bg-[color:var(--beat-purple)] px-8 py-10 text-center text-white">
          <h2 className="text-2xl font-bold leading-tight md:text-3xl">Want to join our journey?</h2>
          <p className="mt-3 text-sm leading-6 text-white/80 md:text-base">
            Jam It! is just the beginning. Download the app
            <br />
            and see what we&apos;ve built.
          </p>
          <div className="mt-4">
            <Link
              href={APP_STORE_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-semibold text-[color:var(--beat-purple)] shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:shadow-black/30"
            >
              <DownloadIcon className="h-4 w-4" />
              Download App
            </Link>
          </div>
        </div>
      </section>

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
