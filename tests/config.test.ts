import { describe, expect, it } from "vitest";
import { buildLocationSchema, buildSchema } from "@/lib/schema";
import { locations } from "@/lib/locations";
import { resolveSiteOrigin, siteConfig, whatsappHref, whatsappMessage } from "@/lib/site-config";

describe("verified central configuration", () => {
  it("uses the verified contact targets and encoded message", () => {
    expect(siteConfig.phoneHref).toBe("tel:+447990101321");
    expect(whatsappHref()).toContain("wa.me/447990101321");
    expect(decodeURIComponent(whatsappHref())).toContain(whatsappMessage);
  });
  it("emits parseable schema without unsupported business claims", () => {
    const json = JSON.stringify(buildSchema());
    expect(() => JSON.parse(json)).not.toThrow();
    for (const forbidden of ["address", "aggregateRating", "openingHours", "email", "PostalAddress", "hasMap"]) expect(json).not.toContain(`\"${forbidden}\"`);
    expect(json).toContain("RoofingContractor");
    expect(json).toContain("FAQPage");
  });
  it("defines three unique, schema-ready location pages", () => {
    expect(locations).toHaveLength(3);
    expect(new Set(locations.map(({ slug }) => slug)).size).toBe(3);
    expect(new Set(locations.map(({ title }) => title)).size).toBe(3);
    for (const location of locations) {
      const json = JSON.stringify(buildLocationSchema(location));
      expect(() => JSON.parse(json)).not.toThrow();
      expect(json).toContain("BreadcrumbList");
      expect(json).toContain("Service");
      expect(json).toContain(`${location.name}, Cheshire, United Kingdom`);
    }
    expect(locations.filter(({ workExample }) => "images" in workExample).map(({ slug }) => slug)).toEqual(["christleton", "rowton", "waverton"]);
    expect(new Set(locations.map(({ guidance }) => guidance.title)).size).toBe(3);
    expect(new Set(locations.map(({ guidance }) => guidance.introduction)).size).toBe(3);
    for (const location of locations) expect(location.guidance.items).toHaveLength(3);
  });
  it("uses an explicit canonical URL before Netlify deployment URLs", () => {
    expect(resolveSiteOrigin({
      NODE_ENV: "production",
      SITE_URL: "https://www.vallanoroofing.co.uk/path",
      URL: "https://vallanoroofing.netlify.app"
    })).toBe("https://www.vallanoroofing.co.uk");
  });
  it("uses Netlify's production URL when SITE_URL is not configured", () => {
    expect(resolveSiteOrigin({
      NODE_ENV: "production",
      URL: "https://vallanoroofing.netlify.app"
    })).toBe("https://vallanoroofing.netlify.app");
  });
  it("rejects an insecure production URL", () => {
    expect(() => resolveSiteOrigin({
      NODE_ENV: "production",
      URL: "http://vallanoroofing.netlify.app"
    })).toThrow("must use HTTPS");
  });
});