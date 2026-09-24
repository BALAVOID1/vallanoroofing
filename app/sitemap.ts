import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { locationPath, locations } from "@/lib/locations";
import { servicePages, servicePath } from "@/lib/service-pages";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-09-24");
  return [
    { url: `${siteConfig.url}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    ...servicePages.map((service) => ({
      url: `${siteConfig.url}${servicePath(service)}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.9
    })),
    ...locations.map((location) => ({
      url: `${siteConfig.url}${locationPath(location)}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8
    }))
  ];
}