import type { Metadata } from "next";
import { AppProviders } from "@/components/providers/app-providers";
import { PageTransition } from "@/components/providers/page-transition";
import "./globals.css";

export const metadata: Metadata = {
  title: "ResumeForge AI",
  description:
    "Premium AI-powered resume builder with polished templates and real-time previews.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark h-full" data-scroll-behavior="smooth">
      <body className="min-h-full bg-background text-foreground antialiased">
        <AppProviders>
          <PageTransition>{children}</PageTransition>
        </AppProviders>
      </body>
    </html>
  );
}
