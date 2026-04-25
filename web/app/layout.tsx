import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Sidebar } from "@/components/Sidebar";
import { KbdShortcuts } from "@/components/KbdShortcuts";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  title: "karpathy-rust · 12mo plan",
  description: "Backend → remote Rust/Solana offer in 12 months. Minimal, education-first.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}
        style={{ ["--sidebar-w" as string]: "220px" }}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <KbdShortcuts />
          <div className="min-h-screen">
            <Sidebar />
            <div
              className="transition-[padding] duration-200 md:pl-[var(--sidebar-w)]"
            >
              <main className="mx-auto max-w-5xl px-6 py-10 md:py-14">{children}</main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
