import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { locationPath, locations } from "@/lib/locations";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-09-24");
  return [
    { url: `${siteConfig.url}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    ...locations.map((location) => ({
      url: `${siteConfig.url}${locationPath(location)}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8
    }))
  ];
}