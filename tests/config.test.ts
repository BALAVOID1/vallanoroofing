import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { buildContentPageSchema, buildLocationSchema, buildSchema, buildServicePageSchema } from "@/lib/schema";
import { contentPagePath, contentPages } from "@/lib/content-pages";
import { locations } from "@/lib/locations";
import { servicePages, servicePath } from "@/lib/service-pages";
import { resolveSiteOrigin, siteConfig, whatsappHref, whatsappMessage } from "@/lib/site-config";
import { assessProjectPublicationReadiness, createDraftProject, draftProjects, type DraftProject, type ProjectPhoto, type VerifiedField } from "@/lib/projects";

function verified<T>(value: T): VerifiedField<T> {
  return { value, verified: true, verifiedAt: "2026-09-28", verifiedBy: "Jamie", sourceNote: "Verified project record" };
}

function approvedPhoto(stage: ProjectPhoto["stage"]): ProjectPhoto {
  return {
    id: `${stage}-photo`, stage,
    src: verified(`/work/${stage}.webp`),
    alt: verified(`${stage} stage of the verified roof repair`),
    visiblyShows: verified(`Verified ${stage} repair stage`),
    customerPrivacyApproved: true,
    publicationApproved: true,
    approvedAt: "2026-09-28",
    approvedBy: "Jamie"
  };
}

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
  it("defines six unique, schema-ready service pages", () => {
    expect(servicePages.map(({ slug }) => slug)).toEqual([
      "slate-roof-repairs",
      "chimney-flashing-repairs",
      "leadwork-repairs",
      "storm-damage-roof-repairs",
      "tile-roof-repairs",
      "flat-roof-repairs"
    ]);
    expect(new Set(servicePages.map(({ title }) => title)).size).toBe(6);
    expect(new Set(servicePages.map(({ description }) => description)).size).toBe(6);
    for (const service of servicePages) {
      expect(servicePath(service)).toBe(`/${service.slug}`);
      const json = JSON.stringify(buildServicePageSchema(service));
      expect(() => JSON.parse(json)).not.toThrow();
      expect(json).toContain("BreadcrumbList");
      expect(json).toContain("FAQPage");
      expect(json).toContain("Service");
      for (const area of siteConfig.areas) expect(json).toContain(`${area}, Cheshire, United Kingdom`);
      expect(json.toLowerCase()).not.toContain("chester");
    }
  });
  it("defines published content pages with unique metadata and accurate schema dates", () => {
    expect(contentPages.map(({ slug }) => slug)).toEqual([
      "roof-problem-photo-checklist",
      "roof-leak-investigation",
      "what-to-do-when-your-roof-leaks",
      "slipped-or-missing-roof-tiles"
    ]);
    expect(new Set(contentPages.map(({ title }) => title)).size).toBe(contentPages.length);
    expect(new Set(contentPages.map(({ description }) => description)).size).toBe(contentPages.length);
    for (const page of contentPages) {
      expect(contentPagePath(page)).toBe(`/${page.slug}`);
      expect(page.published).toBe("2026-09-28");
      expect(page.lastModified).toBe("2026-09-28");
      expect(page.schemaType).toBe("Article");
      const json = JSON.stringify(buildContentPageSchema(page, page.title));
      expect(json).toContain('"@type":"Article"');
      expect(json).toContain('"@type":"BreadcrumbList"');
      expect(json).toContain("https://vallanoroofing.co.uk/#business");
      expect(json).toContain('"datePublished":"2026-09-28"');
      expect(json).toContain('"dateModified":"2026-09-28"');
    }
  });
  it("uses the non-www production canonical", () => {
    expect(siteConfig.url).toBe("https://vallanoroofing.co.uk");
  });
  it("keeps project records private until every field and image is verified", () => {
    expect(draftProjects).toEqual([]);
    const incomplete = assessProjectPublicationReadiness(createDraftProject());
    expect(incomplete.ready).toBe(false);
    expect(incomplete.issues).toContain("Customer publication consent is required.");
    expect(incomplete.issues).toContain("Approved before, during and completed photographs are required.");

    const complete: DraftProject = {
      status: "draft",
      slug: verified("verified-tile-repair-christleton"),
      repairType: verified("Tile roof repair"),
      area: verified("Christleton"),
      roofType: verified("Tile"),
      reportedIssue: verified("A displaced roof tile reported by the homeowner"),
      repairCompleted: verified("The confirmed local tile defect was repaired"),
      completedMonth: verified("2026-09"),
      serviceSlug: verified("tile-roof-repairs"),
      suppliedInformation: verified("Ground-level photographs and a written description"),
      visibleEvidence: verified("One tile visibly out of alignment"),
      inspectionFindings: verified("Verified findings from the retained inspection record"),
      affectedComponent: verified("Local tiled roof covering"),
      repairSteps: verified(["Verified repair step", "Verified final check"]),
      outcome: verified("Verified completion outcome"),
      handoverInformation: verified("Completion photographs supplied"),
      photos: [approvedPhoto("before"), approvedPhoto("during"), approvedPhoto("completed")],
      relatedGuideSlugs: verified(["slipped-or-missing-roof-tiles"]),
      relatedProjectSlugs: verified([]),
      preciseAddressWithheld: true,
      customerIdentityWithheld: true,
      customerPublicationConsent: true,
      finalFactualReviewComplete: true,
      finalPrivacyReviewComplete: true
    };
    expect(assessProjectPublicationReadiness(complete)).toEqual({ ready: true, issues: [] });
  });
  it("does not connect private project drafts to public routes or the sitemap", () => {
    expect(readFileSync(join(process.cwd(), "app", "sitemap.ts"), "utf8")).not.toContain("projects");
    const publicRouteFiles = readdirSync(join(process.cwd(), "app"), { recursive: true })
      .filter((path): path is string => typeof path === "string" && path.endsWith("page.tsx"));
    for (const path of publicRouteFiles) {
      expect(readFileSync(join(process.cwd(), "app", path), "utf8")).not.toContain("@/lib/projects");
    }
  });
  it("uses neutral, non-location work-image filenames", () => {
    const filenames = readdirSync(join(process.cwd(), "public", "work"));
    expect(filenames).not.toHaveLength(0);
    for (const filename of filenames) {
      expect(filename).not.toMatch(/christleton|rowton|waverton|chester|newbury/i);
    }
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