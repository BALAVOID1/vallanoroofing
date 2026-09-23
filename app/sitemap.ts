import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
export default function sitemap(): MetadataRoute.Sitemap { return [{ url: `${siteConfig.url}/`, lastModified: new Date("2026-09-22"), changeFrequency: "monthly", priority: 1 }]; }