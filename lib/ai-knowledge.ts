export type KnowledgeStatus = "pending_review" | "conflict" | "approved" | "rejected";
export type KnowledgeKind = "public_fact" | "internal_policy" | "approved_reply" | "escalation_rule" | "privacy_rule";
export type KnowledgeAudience = "customer_safe" | "assistant_only";

export type KnowledgeProvenance = {
  sourceId: string;
  evidenceReferenceIds: readonly string[];
  reviewedBy: string | null;
  reviewedAt: string | null;
};

export type KnowledgeItem = {
  id: string;
  category: string;
  topic: string;
  content: string;
  kind: KnowledgeKind;
  audience: KnowledgeAudience;
  status: KnowledgeStatus;
  containsPersonalData: boolean;
  provenance: KnowledgeProvenance;
  conflictNote: string | null;
};

export type KnowledgeValidation = {
  valid: boolean;
  issues: readonly string[];
};

export function validateKnowledgeItem(item: KnowledgeItem): KnowledgeValidation {
  const issues: string[] = [];
  if (!item.id.trim()) issues.push("A stable item id is required.");
  if (!item.category.trim()) issues.push("A category is required.");
  if (!item.topic.trim()) issues.push("A topic is required.");
  if (!item.content.trim()) issues.push("Content is required.");
  if (!item.provenance.sourceId.trim()) issues.push("A source id is required.");
  if (item.containsPersonalData) issues.push("Personal data must not be stored in the static knowledge base.");

  if (item.status === "approved") {
    if (!item.provenance.reviewedBy) issues.push("Approved knowledge requires a reviewer.");
    if (!item.provenance.reviewedAt) issues.push("Approved knowledge requires a review date.");
    if (item.provenance.evidenceReferenceIds.length === 0) issues.push("Approved knowledge requires at least one private evidence reference id.");
    if (item.conflictNote) issues.push("An item with an unresolved conflict cannot be approved.");
  }
  if (item.status === "conflict" && !item.conflictNote) issues.push("Conflicted knowledge requires a conflict note.");

  return { valid: issues.length === 0, issues };
}

export function getApprovedKnowledge(items: readonly KnowledgeItem[]): readonly KnowledgeItem[] {
  const seen = new Set<string>();
  const approved: KnowledgeItem[] = [];

  for (const item of items) {
    if (seen.has(item.id)) throw new Error(`Duplicate knowledge item id: ${item.id}`);
    seen.add(item.id);
    if (item.status !== "approved") continue;
    const validation = validateKnowledgeItem(item);
    if (!validation.valid) throw new Error(`Invalid approved knowledge item ${item.id}: ${validation.issues.join(" ")}`);
    approved.push(item);
  }
  return approved;
}

export function getCustomerSafeKnowledge(items: readonly KnowledgeItem[]): readonly KnowledgeItem[] {
  return getApprovedKnowledge(items).filter(({ audience }) => audience === "customer_safe");
}

// Fail closed: no CSV row is available to an assistant until individually reviewed and approved.
export const knowledgeItems: readonly KnowledgeItem[] = [];