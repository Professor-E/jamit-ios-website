import Image from "next/image";
import Link from "next/link";
import DownloadIcon from "@/components/DownloadIcon";

const APP_STORE_URL = "https://www.apple.com/app-store/";

export default function PrivacyPolicyPage() {
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
                  Privacy Policy
                </h1>
                <p className="mt-3 text-sm text-[color:var(--beat-ink-soft)] md:text-base">
                  App Name: Jam It!
                </p>
                <p className="text-sm text-[color:var(--beat-ink-soft)] md:text-base">
                  Last Updated: February 3, 2026
                </p>
              </div>

              <p className="text-base leading-7 text-[color:var(--beat-ink-soft)] md:text-lg">
                This Privacy Policy explains how Jam It! ("we," "our," or "us") handles information when you use our
                mobile application (the "App").
              </p>

              <p className="text-base leading-7 text-[color:var(--beat-ink-soft)] md:text-lg">
                Jam It! is a music-based guessing game available exclusively on the Apple App Store. The App does not
                require account creation, login, or registration.
              </p>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-[color:var(--beat-ink)] md:text-2xl">
                  1. Information We Do Not Collect
                </h2>
                <p className="text-base leading-7 text-[color:var(--beat-ink-soft)] md:text-lg">
                  Jam It! is designed to minimize data collection.
                </p>
                <p className="text-base leading-7 text-[color:var(--beat-ink-soft)] md:text-lg">We do not:</p>
                <ul className="list-disc space-y-2 pl-6 text-base leading-7 text-[color:var(--beat-ink-soft)] md:text-lg">
                  <li>Require user accounts or sign-in</li>
                  <li>Collect names, email addresses, or phone numbers</li>
                  <li>Collect precise location data</li>
                  <li>Collect contacts, photos, or personal files</li>
                  <li>Collect payment or billing information</li>
                  <li>Store personal identifiers on our own servers</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-[color:var(--beat-ink)] md:text-2xl">
                  2. Information Collected Automatically by Third-Party Services
                </h2>
                <p className="text-base leading-7 text-[color:var(--beat-ink-soft)] md:text-lg">
                  Jam It! does not directly collect personal data. However, certain information may be processed
                  automatically through Apple and Google services that enable core functionality.
                </p>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-[color:var(--beat-ink)] md:text-xl">2.1 Apple Frameworks</h3>
                  <p className="text-base leading-7 text-[color:var(--beat-ink-soft)] md:text-lg">
                    Jam It! uses the following Apple-provided technologies:
                  </p>
                  <div className="space-y-3">
                    <div>
                      <p className="text-base font-semibold text-[color:var(--beat-ink)] md:text-lg">Apple MusicKit</p>
                      <p className="text-base leading-7 text-[color:var(--beat-ink-soft)] md:text-lg">
                        Used to access song metadata and play music clips required for gameplay. Jam It! does not
                        access or store users' personal Apple Music libraries.
                      </p>
                    </div>
                    <div>
                      <p className="text-base font-semibold text-[color:var(--beat-ink)] md:text-lg">iCloud (CloudKit)</p>
                      <p className="text-base leading-7 text-[color:var(--beat-ink-soft)] md:text-lg">
                        Used to support gameplay features such as multiplayer sessions, scores, and game state syncing.
                        Data is stored securely within Apple's infrastructure.
                      </p>
                    </div>
                    <div>
                      <p className="text-base font-semibold text-[color:var(--beat-ink)] md:text-lg">Push Notifications</p>
                      <p className="text-base leading-7 text-[color:var(--beat-ink-soft)] md:text-lg">
                        Used to deliver gameplay-related notifications (such as invitations or updates), if enabled by
                        the user.
                      </p>
                    </div>
                  </div>
                  <p className="text-base leading-7 text-[color:var(--beat-ink-soft)] md:text-lg">
                    All data handled by Apple frameworks is governed by Apple's Privacy Policy.
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-[color:var(--beat-ink)] md:text-xl">
                    2.2 Advertising (Google AdMob)
                  </h3>
                  <p className="text-base leading-7 text-[color:var(--beat-ink-soft)] md:text-lg">
                    Jam It! displays advertisements using Google AdMob.
                  </p>
                  <p className="text-base leading-7 text-[color:var(--beat-ink-soft)] md:text-lg">
                    AdMob may automatically collect:
                  </p>
                  <ul className="list-disc space-y-2 pl-6 text-base leading-7 text-[color:var(--beat-ink-soft)] md:text-lg">
                    <li>Advertising Identifier</li>
                    <li>IP address</li>
                    <li>Approximate location</li>
                    <li>Ad interaction data</li>
                    <li>App usage information related to advertisements</li>
                  </ul>
                  <p className="text-base leading-7 text-[color:var(--beat-ink-soft)] md:text-lg">
                    This data is used to:
                  </p>
                  <ul className="list-disc space-y-2 pl-6 text-base leading-7 text-[color:var(--beat-ink-soft)] md:text-lg">
                    <li>Serve advertisements</li>
                    <li>Measure ad performance</li>
                    <li>Prevent fraud and abuse</li>
                  </ul>
                  <p className="text-base leading-7 text-[color:var(--beat-ink-soft)] md:text-lg">
                    Jam It! does not receive personally identifiable information from Google AdMob.
                  </p>
                  <p className="text-base leading-7 text-[color:var(--beat-ink-soft)] md:text-lg">
                    Users may manage ad personalization through their device's privacy and advertising settings.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-[color:var(--beat-ink)] md:text-2xl">3. How Information Is Used</h2>
                <p className="text-base leading-7 text-[color:var(--beat-ink-soft)] md:text-lg">
                  Information processed through Apple and Google services is used solely to:
                </p>
                <ul className="list-disc space-y-2 pl-6 text-base leading-7 text-[color:var(--beat-ink-soft)] md:text-lg">
                  <li>Enable gameplay functionality</li>
                  <li>Support multiplayer features</li>
                  <li>Display advertisements</li>
                  <li>Improve performance and stability</li>
                  <li>Deliver notifications when enabled</li>
                </ul>
                <p className="text-base leading-7 text-[color:var(--beat-ink-soft)] md:text-lg">
                  Jam It! does not sell, rent, or trade user data.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-[color:var(--beat-ink)] md:text-2xl">4. Children's Privacy</h2>
                <p className="text-base leading-7 text-[color:var(--beat-ink-soft)] md:text-lg">
                  Jam It! is available to users under and over the age of 18.
                </p>
                <p className="text-base leading-7 text-[color:var(--beat-ink-soft)] md:text-lg">The App:</p>
                <ul className="list-disc space-y-2 pl-6 text-base leading-7 text-[color:var(--beat-ink-soft)] md:text-lg">
                  <li>Does not require accounts</li>
                  <li>Does not knowingly collect personal information from children</li>
                  <li>Uses only Apple and Google system services that comply with applicable child privacy regulations</li>
                </ul>
                <p className="text-base leading-7 text-[color:var(--beat-ink-soft)] md:text-lg">
                  If you believe a child has provided personal information improperly, please contact us.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-[color:var(--beat-ink)] md:text-2xl">5. Data Retention</h2>
                <p className="text-base leading-7 text-[color:var(--beat-ink-soft)] md:text-lg">
                  Jam It! does not store personal data on its own servers.
                </p>
                <p className="text-base leading-7 text-[color:var(--beat-ink-soft)] md:text-lg">
                  Any data processed through Apple iCloud or Google AdMob is retained according to their respective
                  privacy policies and only as long as necessary to provide services.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-[color:var(--beat-ink)] md:text-2xl">6. International Availability</h2>
                <p className="text-base leading-7 text-[color:var(--beat-ink-soft)] md:text-lg">
                  Jam It! is available in the United States and other countries worldwide, excluding Venezuela.
                </p>
                <p className="text-base leading-7 text-[color:var(--beat-ink-soft)] md:text-lg">
                  Data may be processed in regions where Apple or Google operate infrastructure.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-[color:var(--beat-ink)] md:text-2xl">7. Security</h2>
                <p className="text-base leading-7 text-[color:var(--beat-ink-soft)] md:text-lg">
                  Jam It! relies on Apple's and Google's industry-standard security practices, including encryption and
                  secure data handling, to protect information processed through their services.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-[color:var(--beat-ink)] md:text-2xl">8. Changes to This Privacy Policy</h2>
                <p className="text-base leading-7 text-[color:var(--beat-ink-soft)] md:text-lg">
                  We may update this Privacy Policy periodically. Updates will be reflected by revising the "Last
                  Updated" date.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-[color:var(--beat-ink)] md:text-2xl">9. Contact Information</h2>
                <p className="text-base leading-7 text-[color:var(--beat-ink-soft)] md:text-lg">
                  For questions or concerns regarding this Privacy Policy:
                </p>
                <p className="text-base leading-7 text-[color:var(--beat-ink-soft)] md:text-lg">
                  Support Email: help@jamit-ios.com
                </p>
                <p className="text-base leading-7 text-[color:var(--beat-ink-soft)] md:text-lg">
                  Developers:
                  <br />
                  Jan Szmajda
                  <br />
                  Dominik Grzeszczak
                  <br />
                  Breck Massey
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
