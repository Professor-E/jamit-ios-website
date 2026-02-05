"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import DownloadIcon from "@/components/DownloadIcon";

const ASSET_VERSION = "20260204-1";

const featureBlocks = [
  {
    title: "Pick Your Challenge",
    description:
      "Jump into Guess It, One Shot, Match, or Pass & Play from the main hub. One tap gets the round started.",
    cta: "Choose a mode →",
    image: {
      src: `/assets/home.PNG?v=${ASSET_VERSION}`,
      alt: "Game modes and account overview screen",
    },
  },
  {
    title: "In-Game Energy",
    description:
      "Jump straight into the action with a vibrant in-game view that keeps everyone locked in.",
    cta: "See the gameplay →",
    image: {
      src: `/assets/game.PNG?v=${ASSET_VERSION}`,
      alt: "In-game screen with live round action",
    },
  },
  {
    title: "Countdown Pressure",
    description:
      "A dramatic timer keeps the room focused so every guess lands under real-game pressure.",
    cta: "Feel the rush →",
    image: {
      src: "/assets/game-countdown.PNG",
      alt: "Countdown round screen with vinyl timer",
    },
  },
  {
    title: "Build Custom Playlists",
    description:
      "Create a new playlist in seconds, add your own songs, and spin a fresh mix for the party.",
    cta: "Create a playlist →",
    image: {
      src: "/assets/empty-playlist.PNG",
      alt: "Empty playlist screen with add songs prompt",
    },
  },
  {
    title: "Play Curated Sets",
    description:
      "Dive into classic collections with track previews and iconic album art for instant nostalgia.",
    cta: "Open a mix →",
    image: {
      src: "/assets/existing-playlist.PNG",
      alt: "Playlist detail screen with song list",
    },
  },
  {
    title: "Stock Up on Disks",
    description:
      "Top up Golden Disks right in the app to keep the games flowing without interruption.",
    cta: "Visit the shop →",
    image: {
      src: `/assets/shop.PNG?v=${ASSET_VERSION}`,
      alt: "Disk shop screen with coin bundles",
    },
  },
];

const APP_STORE_URL = "https://www.apple.com/app-store/";
const HERO_WORDS = [
  { text: "speed", color: "#1EE604" },
  { text: "race", color: "#FF9F43" },
  { text: "tempo", color: "#4DA6FF" },
  { text: "countdown", color: "#FF4D8D" },
];
const HERO_WORD_INTERVAL_MS = 2200;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

type FeatureBlock = {
  title: string;
  description: string;
  cta: string;
  image: {
    src: string;
    alt: string;
  };
};

type FeatureCardProps = {
  block: FeatureBlock;
  flip: boolean;
  shouldReduceMotion: boolean;
};

type PhoneMockupProps = {
  screenshotSrc: string;
  screenshotAlt: string;
};

function PhoneMockup({ screenshotSrc, screenshotAlt }: PhoneMockupProps) {
  return (
    <div className="relative w-[220px] aspect-[147/300] sm:w-[260px] md:w-[320px]">
      <div className="absolute left-[5.2%] right-[5.2%] top-[2.1%] bottom-[2.1%] z-0 overflow-hidden rounded-[28px] bg-black sm:rounded-[32px] md:rounded-[36px]">
        <Image
          src={screenshotSrc}
          alt={screenshotAlt}
          fill
          sizes="(max-width: 768px) 220px, 320px"
          className="object-cover object-top"
        />
      </div>
      <Image
        src="/assets/iPhone-17-pro-max.png"
        alt="iPhone 17 Pro Max frame"
        fill
        sizes="(max-width: 768px) 220px, 320px"
        className="pointer-events-none z-10 object-contain drop-shadow-[0_30px_80px_rgba(20,18,30,0.25)]"
      />
    </div>
  );
}

function FeatureCard({ block, flip, shouldReduceMotion }: FeatureCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center center"],
  });

  const lockPoint = 0.85;
  const textXRaw = useTransform(scrollYProgress, [0, lockPoint], [
    flip ? "50vw" : "-50vw",
    "0vw",
  ]);
  const textOpacityRaw = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const phoneXRaw = useTransform(scrollYProgress, [0, lockPoint], [
    flip ? "-50vw" : "50vw",
    "0vw",
  ]);
  const phoneOpacityRaw = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const phoneYRaw = useTransform(scrollYProgress, [0, lockPoint], [22, 0]);
  const phoneRotateRaw = useTransform(scrollYProgress, [0, lockPoint], [-2, 0]);
  const springConfig = { stiffness: 120, damping: 28, mass: 0.8 };
  const textX = useSpring(textXRaw, springConfig);
  const textOpacity = useSpring(textOpacityRaw, springConfig);
  const phoneX = useSpring(phoneXRaw, springConfig);
  const phoneOpacity = useSpring(phoneOpacityRaw, springConfig);
  const phoneY = useSpring(phoneYRaw, springConfig);
  const phoneRotate = useSpring(phoneRotateRaw, springConfig);

  return (
    <motion.div
      ref={cardRef}
      className={`grid items-center gap-10 px-8 py-12 md:grid-cols-[1fr_1fr] md:px-12 ${
        flip ? "md:[&>div:first-child]:order-2" : ""
      }`}
    >
      <motion.div
        className="space-y-4"
        style={shouldReduceMotion ? undefined : { x: textX, opacity: textOpacity }}
      >
        <h3 className="font-display text-3xl font-semibold leading-tight tracking-tight text-[color:var(--beat-ink)] md:text-4xl">
          {block.title}
        </h3>
        <p className="font-body text-lg leading-7 text-[color:var(--beat-ink-soft)] md:text-xl">
          {block.description}
        </p>
        <a
          href={APP_STORE_URL}
          target="_blank"
          rel="noreferrer"
          className="font-body text-base font-semibold text-[color:var(--beat-purple)] transition hover:translate-x-1"
        >
          {block.cta}
        </a>
      </motion.div>

      <motion.div
        className="flex items-center justify-center"
        style={
          shouldReduceMotion
            ? undefined
            : { x: phoneX, y: phoneY, rotate: phoneRotate, opacity: phoneOpacity }
        }
      >
        <PhoneMockup
          screenshotSrc={block.image.src}
          screenshotAlt={block.image.alt}
        />
      </motion.div>
    </motion.div>
  );
}

export default function Home() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const [heroWordIndex, setHeroWordIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroWordIndex((prev) => (prev + 1) % HERO_WORDS.length);
    }, HERO_WORD_INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);

  const floatSlow = shouldReduceMotion ? {} : { y: [0, -12, 0] };
  const floatNoteLeft = shouldReduceMotion
    ? {}
    : { y: [0, -18, 0], rotate: [-8, 8, -8] };
  const floatNoteRight = shouldReduceMotion
    ? {}
    : { y: [0, 16, 0], rotate: [6, -6, 6] };
  const spinRecord = shouldReduceMotion ? {} : { rotate: 360 };
  const heroTextY = useTransform(scrollYProgress, [0, 0.3], [0, -40]);
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.75]);
  const heroArtY = useTransform(scrollYProgress, [0, 0.35], [0, 45]);
  const heroArtScale = useTransform(scrollYProgress, [0, 0.35], [1, 0.98]);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <div className="bg-[color:var(--beat-cream)] text-[color:var(--beat-ink)]">
      <div className="gradient-hero relative flex min-h-screen flex-col overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 top-16 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -right-20 bottom-16 h-96 w-96 rounded-full bg-black/20 blur-3xl" />
        </div>

        <header className="relative z-10 flex w-full items-center justify-between px-6 pb-4 pt-5 md:px-12 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 md:pl-6 lg:pl-10"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-[4px] bg-transparent">
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
          </motion.div>

          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="ml-auto hidden items-center gap-5 text-sm font-medium text-white/80 md:flex"
          >
            <Link className="transition hover:text-white" href="/">
              Home
            </Link>
            <Link className="transition hover:text-white" href="/about-us">
              About Us
            </Link>
            <Link className="transition hover:text-white" href="/contact">
              Contact
            </Link>
          </motion.nav>

          <motion.a
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            href={APP_STORE_URL}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-[color:var(--beat-purple)] shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:shadow-black/30 md:ml-4 md:inline-flex"
          >
            <DownloadIcon className="h-4 w-4" />
            Download App
          </motion.a>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-2 md:hidden"
          >
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[color:var(--beat-purple)] shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:shadow-black/30"
            >
              <DownloadIcon className="h-4 w-4" />
              Download App
            </a>
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
          </motion.div>
        </header>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              id="mobile-nav"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="relative z-20 px-6 md:hidden"
            >
              <div className="mt-2 rounded-2xl bg-white/95 p-3 text-sm font-semibold text-[color:var(--beat-purple)] shadow-lg shadow-black/20 backdrop-blur">
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

        <section
          id="home"
          className="relative z-10 mx-auto grid flex-1 items-center gap-16 px-6 pb-16 md:grid-cols-[1.1fr_0.9fr] md:gap-20 md:px-12"
        >
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.15 } },
            }}
            style={
              shouldReduceMotion
                ? undefined
                : { y: heroTextY, opacity: heroTextOpacity }
            }
            className="md:pl-6 lg:pl-10"
          >
            <motion.h1
              variants={fadeUp}
              className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl"
            >
              Jam It!
              <span className="block text-white/90">
                <span className="inline-flex items-baseline gap-2 whitespace-nowrap">
                  <span>Experience the</span>
                  <span className="inline-flex h-[1.05em] w-[10ch] items-baseline justify-start overflow-hidden align-baseline">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={HERO_WORDS[heroWordIndex].text}
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: "0%", opacity: 1 }}
                        exit={{ y: "-100%", opacity: 0 }}
                        transition={{ duration: 0.45, ease: "easeOut" }}
                        className="block leading-[1.05]"
                        style={{
                          color: HERO_WORDS[heroWordIndex].color,
                          textShadow: "none",
                        }}
                      >
                        {HERO_WORDS[heroWordIndex].text}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                </span>
              </span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-xl text-base leading-7 text-white/80 md:text-lg"
            >
              The ultimate song guessing game designed to test your music knowledge.
              Crisp rounds, instant feedback, and a premium social vibe.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-4">
              <a
                id="download"
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-[color:var(--beat-purple)] shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:shadow-black/40"
                href={APP_STORE_URL}
                target="_blank"
                rel="noreferrer"
              >
                <DownloadIcon className="h-4 w-4" />
                Download App
              </a>
              <a
                className="rounded-full border border-white/40 px-7 py-3 text-sm font-semibold text-white/90 transition hover:border-white hover:text-white"
                href="#modes"
              >
                Explore Modes
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative flex items-center justify-center"
            style={shouldReduceMotion ? undefined : { y: heroArtY, scale: heroArtScale }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative mx-auto flex w-fit items-center justify-center p-[24px]"
            >
              <motion.div
                animate={floatSlow}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                <motion.div
                  animate={spinRecord}
                  transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
                  className="card-glow rounded-full"
                >
                  <Image
                    src="/assets/large-vinyl.svg"
                    alt="Vinyl record"
                    width={355}
                    height={355}
                    priority
                    sizes="(max-width: 768px) 215px, 355px"
                    className="h-auto w-[215px] sm:w-[255px] md:w-[355px]"
                  />
                </motion.div>
              </motion.div>

              <motion.div
                className="absolute -left-6 top-6 sm:-left-16 sm:top-8"
                animate={floatNoteLeft}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  src="/assets/music-note.svg"
                  alt="Music note"
                  width={70}
                  height={70}
                  className="opacity-90"
                />
              </motion.div>
              <motion.div
                className="absolute -right-4 bottom-4 sm:-right-10"
                animate={floatNoteRight}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  src="/assets/music-note.svg"
                  alt="Music note"
                  width={56}
                  height={56}
                  className="opacity-70"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </section>
      </div>

      <section id="modes" className="mx-auto max-w-6xl px-6 py-20 md:px-12">
        <div className="space-y-16">
          {featureBlocks.map((block, index) => (
            <FeatureCard
              key={block.title}
              block={block}
              flip={index % 2 !== 0}
              shouldReduceMotion={shouldReduceMotion ?? false}
            />
          ))}
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
