import { describe, expect, it } from "vitest";
import { buildSchema } from "@/lib/schema";
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