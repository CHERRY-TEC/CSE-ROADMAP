import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "InternPrep - AI/ML Internship Roadmap",
  description: "4-year AI/ML internship preparation roadmap with progress tracking, resources, projects, and interview prep",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <div className="mesh-bg" />
        <div className="grid-bg" />
        <div className="floating-orb w-96 h-96 bg-primary/20 top-20 -left-48" style={{ animationDelay: "0s" }} />
        <div className="floating-orb w-72 h-72 bg-accent/15 bottom-20 -right-36" style={{ animationDelay: "2s" }} />
        <div className="floating-orb w-64 h-64 bg-cyan/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ animationDelay: "4s" }} />
        <Navbar />
        <main className="flex-1 pt-16 relative z-10">{children}</main>
      </body>
    </html>
  );
}
