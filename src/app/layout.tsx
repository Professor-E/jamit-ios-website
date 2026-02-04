import type { Metadata } from "next";
import { Baloo_2, Poppins } from "next/font/google";
import "./globals.css";
import PageTransition from "@/components/PageTransition";

const displayFont = Baloo_2({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "700"],
});

const bodyFont = Poppins({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Jam It!",
  description:
    "Jam It! is a music guessing game with fast rounds, multiple modes, and a premium social vibe.",
  icons: {
    icon: "/assets/app-logo.svg",
    shortcut: "/assets/app-logo.svg",
    apple: "/assets/app-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bodyFont.variable} ${displayFont.variable} antialiased`}>
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
