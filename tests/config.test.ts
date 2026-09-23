import { describe, expect, it } from "vitest";
import { buildSchema } from "@/lib/schema";
import { siteConfig, whatsappHref, whatsappMessage } from "@/lib/site-config";

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
});