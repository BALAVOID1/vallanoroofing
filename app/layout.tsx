import type { Metadata, Viewport } from "next";
import { Inter, Roboto_Slab } from "next/font/google";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const slab = Roboto_Slab({ subsets: ["latin"], variable: "--font-accent", weight: ["700"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.title,
  description: siteConfig.description,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  openGraph: { title: siteConfig.title, description: siteConfig.description, url: "/", siteName: siteConfig.name, locale: "en_GB", type: "website", images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Vallano Roofing — repair-led roof repairs" }] },
  twitter: { card: "summary_large_image", title: siteConfig.title, description: siteConfig.description, images: ["/opengraph-image"] },
  icons: { icon: siteConfig.icon, apple: "/apple-icon" },
  manifest: "/manifest.webmanifest",
  verification: siteConfig.verification ? { google: siteConfig.verification } : undefined
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#000000" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en-GB" className={`${inter.variable} ${slab.variable}`}><body>{children}</body></html>;
}