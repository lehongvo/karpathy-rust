import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import { KbdShortcuts } from "@/components/KbdShortcuts";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  title: "karpathy-rust · 12mo plan",
  description: "Backend → Remote Rust/Solana offer in 12 months. Minimal, education-first.",
};

const NAV = [
  { href: "/", label: "home" },
  { href: "/plan", label: "plan" },
  { href: "/progress", label: "progress" },
  { href: "/resources", label: "resources" },
  { href: "/decisions", label: "decisions" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <KbdShortcuts />
          <header className="border-b border-white/10">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
              <Link href="/" className="font-mono text-sm">
                <span className="gradient-text font-bold">karpathy-rust</span>
              </Link>
              <nav className="flex gap-5 font-mono text-sm text-white/70">
                {NAV.map((n) => (
                  <Link key={n.href} href={n.href} className="hover:text-white">
                    {n.label}
                  </Link>
                ))}
              </nav>
            </div>
          </header>
          <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
          <footer className="border-t border-white/10 py-6 text-center font-mono text-xs text-white/40">
            <kbd>g h</kbd> home · <kbd>g p</kbd> plan · <kbd>g r</kbd> progress · <kbd>g s</kbd> resources · <kbd>g d</kbd> decisions
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
