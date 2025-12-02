import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getFileTree } from "@/lib/file-tree";
import { LayoutClient } from "@/components/layout-client";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Granite - Obsidian Web App",
  description: "If you ever wanted an Obsidian web app, this is it. A modern file explorer and markdown editor.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Granite",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fileTree = getFileTree( process.env.ROOT_DIR || process.cwd());
  const branches = [
    { value: "main", label: "main" },
    { value: "develop", label: "develop" },
    { value: "feature/auth", label: "feature/auth" },
    { value: "feature/ui-updates", label: "feature/ui-updates" },
    { value: "hotfix/critical-bug", label: "hotfix/critical-bug" },
  ];

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <LayoutClient fileTree={fileTree} branches={branches}>
          {children}
        </LayoutClient>
      </body>
    </html>
  );
}
