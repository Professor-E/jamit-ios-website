import Image from "next/image";
import Link from "next/link";
import DownloadIcon from "@/components/DownloadIcon";

const APP_STORE_URL = "https://www.apple.com/app-store/";

export default function TermsOfUsePage() {
  return (
    <div className="min-h-screen bg-[color:var(--beat-cream)] text-[color:var(--beat-ink)]">
      <div className="flex min-h-screen flex-col">
        <div className="bg-[color:var(--beat-purple)]">
          <header className="relative z-10 flex w-full items-center justify-between px-6 pb-4 pt-5 md:px-12 lg:px-16">
            <Link
              href="/"
              className="flex items-center gap-2 md:ml-6 lg:ml-10 transition hover:opacity-90 active:scale-[0.98]"
            >
              <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-[8px] bg-transparent">
                <Image
                  src="/assets/app-logo.svg"
                  alt="Jam It! logo"
                  width={28}
                  height={28}
                  priority
                  className="rounded-[8px]"
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

            <Link
              href={APP_STORE_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-[color:var(--beat-purple)] shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:shadow-black/30 md:hidden"
            >
              <DownloadIcon className="h-4 w-4" />
              Download App
            </Link>
          </header>
        </div>

        <main className="flex-1">
          <section className="mx-auto w-full max-w-4xl px-6 py-12 md:px-10">
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold leading-tight text-[color:var(--beat-ink)] md:text-5xl">
                  Terms of Use
                </h1>
                <p className="mt-3 text-sm text-[color:var(--beat-ink-soft)] md:text-base">
                  Last Updated: February 3, 2026
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-[color:var(--beat-ink)] md:text-2xl">Terms of Service</h2>
                <p className="text-base leading-7 text-[color:var(--beat-ink-soft)] md:text-lg">
                  These Terms of Service ("Terms") govern your use of Jam It! (the "App"). By using the App, you agree
                  to these Terms.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-[color:var(--beat-ink)] md:text-2xl">1. Use of the App</h2>
                <p className="text-base leading-7 text-[color:var(--beat-ink-soft)] md:text-lg">
                  Jam It! is provided for entertainment purposes only. You agree not to misuse, exploit, or interfere
                  with the App.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-[color:var(--beat-ink)] md:text-2xl">2. Eligibility</h2>
                <p className="text-base leading-7 text-[color:var(--beat-ink-soft)] md:text-lg">
                  The App is available to users under and over the age of 18. No account or registration is required.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-[color:var(--beat-ink)] md:text-2xl">3. Purchases &amp; Subscriptions</h2>
                <p className="text-base leading-7 text-[color:var(--beat-ink-soft)] md:text-lg">
                  Jam It! may offer in-app purchases or subscriptions. All transactions are processed by Apple's App
                  Store. Jam It! does not store payment information.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-[color:var(--beat-ink)] md:text-2xl">4. Advertisements</h2>
                <p className="text-base leading-7 text-[color:var(--beat-ink-soft)] md:text-lg">
                  Jam It! may display advertisements provided by Google AdMob. Ad content is governed by Google's
                  policies.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-[color:var(--beat-ink)] md:text-2xl">5. Intellectual Property</h2>
                <p className="text-base leading-7 text-[color:var(--beat-ink-soft)] md:text-lg">
                  All content, visuals, audio, animations, and code are owned by the Jam It! development team or
                  licensors and may not be reused without permission.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-[color:var(--beat-ink)] md:text-2xl">6. Third-Party Services</h2>
                <p className="text-base leading-7 text-[color:var(--beat-ink-soft)] md:text-lg">
                  Jam It! integrates Apple MusicKit, iCloud (CloudKit), Push Notifications, and Google AdMob. Use of
                  these services is governed by their respective terms.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-[color:var(--beat-ink)] md:text-2xl">7. Disclaimer</h2>
                <p className="text-base leading-7 text-[color:var(--beat-ink-soft)] md:text-lg">
                  The App is provided "as is" without warranties of any kind.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-[color:var(--beat-ink)] md:text-2xl">8. Limitation of Liability</h2>
                <p className="text-base leading-7 text-[color:var(--beat-ink-soft)] md:text-lg">
                  Jam It! is not liable for damages arising from use or inability to use the App.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-[color:var(--beat-ink)] md:text-2xl">9. Changes to Terms</h2>
                <p className="text-base leading-7 text-[color:var(--beat-ink-soft)] md:text-lg">
                  Terms may be updated periodically. Continued use constitutes acceptance.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-[color:var(--beat-ink)] md:text-2xl">10. Contact</h2>
                <p className="text-base leading-7 text-[color:var(--beat-ink-soft)] md:text-lg">
                  Email: help@jamit-ios.com
                </p>
                <p className="text-base leading-7 text-[color:var(--beat-ink-soft)] md:text-lg">
                  Developers: Jan Szmajda, Dominik Grzeszczak, Breck Massey
                </p>
              </div>
            </div>
          </section>
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
