import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import {
  getApprovedKnowledge,
  getCustomerSafeKnowledge,
  knowledgeItems,
  validateKnowledgeItem,
  type KnowledgeItem
} from "@/lib/ai-knowledge";

function item(overrides: Partial<KnowledgeItem> = {}): KnowledgeItem {
  return {
    id: "business-name",
    category: "Business",
    topic: "Business name",
    content: "Vallano Roofing",
    kind: "public_fact",
    audience: "customer_safe",
    status: "pending_review",
    containsPersonalData: false,
    provenance: {
      sourceId: "kb-csv-row-6",
      evidenceReferenceIds: [],
      reviewedBy: null,
      reviewedAt: null
    },
    conflictNote: null,
    ...overrides
  };
}

describe("private AI knowledge contract", () => {
  it("starts with an empty approved knowledge set", () => {
    expect(knowledgeItems).toEqual([]);
    expect(getApprovedKnowledge(knowledgeItems)).toEqual([]);
  });

  it("excludes pending, conflicted and rejected items", () => {
    const items = [
      item(),
      item({ id: "service-area", status: "conflict", conflictNote: "Conflicts with verified priority areas." }),
      item({ id: "price-guide", status: "rejected" })
    ];
    expect(getApprovedKnowledge(items)).toEqual([]);
  });

  it("rejects approval without review provenance and private evidence references", () => {
    const candidate = item({ status: "approved" });
    const result = validateKnowledgeItem(candidate);
    expect(result.valid).toBe(false);
    expect(result.issues).toContain("Approved knowledge requires a reviewer.");
    expect(result.issues).toContain("Approved knowledge requires a review date.");
    expect(result.issues).toContain("Approved knowledge requires at least one private evidence reference id.");
    expect(() => getApprovedKnowledge([candidate])).toThrow("Invalid approved knowledge item");
  });

  it("rejects personal data from the static knowledge base", () => {
    const candidate = item({
      status: "approved",
      containsPersonalData: true,
      provenance: { sourceId: "private-lead", evidenceReferenceIds: ["PRIVATE-1"], reviewedBy: "Jamie", reviewedAt: "2026-09-28" }
    });
    expect(validateKnowledgeItem(candidate).issues).toContain("Personal data must not be stored in the static knowledge base.");
  });

  it("separates customer-safe facts from assistant-only policy", () => {
    const provenance = { sourceId: "approved-register", evidenceReferenceIds: ["PRIVATE-1"], reviewedBy: "Jamie", reviewedAt: "2026-09-28" };
    const publicFact = item({ status: "approved", provenance });
    const internalPolicy = item({ id: "handover", kind: "internal_policy", audience: "assistant_only", status: "approved", provenance });
    expect(getApprovedKnowledge([publicFact, internalPolicy])).toHaveLength(2);
    expect(getCustomerSafeKnowledge([publicFact, internalPolicy])).toEqual([publicFact]);
  });

  it("rejects duplicate ids to prevent ambiguous retrieval", () => {
    expect(() => getApprovedKnowledge([item(), item()])).toThrow("Duplicate knowledge item id");
  });

  it("is disconnected from public routes and the sitemap", () => {
    const appRoot = join(process.cwd(), "app");
    const routeFiles = readdirSync(appRoot, { recursive: true })
      .filter((path): path is string => typeof path === "string" && /(?:page|route|sitemap)\.tsx?$/.test(path));
    for (const path of routeFiles) {
      expect(readFileSync(join(appRoot, path), "utf8")).not.toContain("@/lib/ai-knowledge");
    }
    expect(readFileSync(join(process.cwd(), ".gitignore"), "utf8")).toContain(".private/");
  });
});