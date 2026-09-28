import type { ContentPage } from "./content-pages";
import type { ServicePage } from "./service-pages";

export type ProjectArea = "Christleton" | "Rowton" | "Waverton";
export type ProjectRoofType = "Tile" | "Slate" | "Flat roof";
export type ProjectPhotoStage = "before" | "during" | "completed";
export type ProjectServiceSlug = ServicePage["slug"];
export type ProjectGuideSlug = ContentPage["slug"];

export type VerifiedField<T> = {
  value: T | null;
  verified: boolean;
  verifiedAt: string | null;
  verifiedBy: string | null;
  sourceNote: string | null;
};

export type ProjectPhoto = {
  id: string;
  stage: ProjectPhotoStage;
  src: VerifiedField<string>;
  alt: VerifiedField<string>;
  visiblyShows: VerifiedField<string>;
  customerPrivacyApproved: boolean;
  publicationApproved: boolean;
  approvedAt: string | null;
  approvedBy: string | null;
};

export type DraftProject = {
  status: "draft";
  slug: VerifiedField<string>;
  repairType: VerifiedField<string>;
  area: VerifiedField<ProjectArea>;
  roofType: VerifiedField<ProjectRoofType>;
  reportedIssue: VerifiedField<string>;
  repairCompleted: VerifiedField<string>;
  completedMonth: VerifiedField<string>;
  serviceSlug: VerifiedField<ProjectServiceSlug>;
  suppliedInformation: VerifiedField<string>;
  visibleEvidence: VerifiedField<string>;
  inspectionFindings: VerifiedField<string>;
  affectedComponent: VerifiedField<string>;
  repairSteps: VerifiedField<readonly string[]>;
  outcome: VerifiedField<string>;
  handoverInformation: VerifiedField<string>;
  photos: readonly ProjectPhoto[];
  relatedGuideSlugs: VerifiedField<readonly ProjectGuideSlug[]>;
  relatedProjectSlugs: VerifiedField<readonly string[]>;
  preciseAddressWithheld: boolean;
  customerIdentityWithheld: boolean;
  customerPublicationConsent: boolean;
  finalFactualReviewComplete: boolean;
  finalPrivacyReviewComplete: boolean;
};

export type PublicationReadiness = {
  ready: boolean;
  issues: readonly string[];
};

const requiredFields = [
  "slug", "repairType", "area", "roofType", "reportedIssue", "repairCompleted",
  "completedMonth", "serviceSlug", "suppliedInformation", "visibleEvidence",
  "inspectionFindings", "affectedComponent", "repairSteps", "outcome",
  "handoverInformation", "relatedGuideSlugs", "relatedProjectSlugs"
] as const satisfies readonly (keyof DraftProject)[];

function isCompleteField(field: VerifiedField<unknown>, allowEmptyArray = false): boolean {
  if (!field.verified || !field.verifiedAt || !field.verifiedBy || !field.sourceNote) return false;
  if (field.value === null) return false;
  if (typeof field.value === "string") return field.value.trim().length > 0;
  if (Array.isArray(field.value)) return allowEmptyArray || field.value.length > 0;
  return true;
}

function unverifiedField<T>(): VerifiedField<T> {
  return { value: null, verified: false, verifiedAt: null, verifiedBy: null, sourceNote: null };
}

export function createDraftProject(): DraftProject {
  return {
    status: "draft",
    slug: unverifiedField(),
    repairType: unverifiedField(),
    area: unverifiedField(),
    roofType: unverifiedField(),
    reportedIssue: unverifiedField(),
    repairCompleted: unverifiedField(),
    completedMonth: unverifiedField(),
    serviceSlug: unverifiedField(),
    suppliedInformation: unverifiedField(),
    visibleEvidence: unverifiedField(),
    inspectionFindings: unverifiedField(),
    affectedComponent: unverifiedField(),
    repairSteps: unverifiedField(),
    outcome: unverifiedField(),
    handoverInformation: unverifiedField(),
    photos: [],
    relatedGuideSlugs: unverifiedField(),
    relatedProjectSlugs: unverifiedField(),
    preciseAddressWithheld: false,
    customerIdentityWithheld: false,
    customerPublicationConsent: false,
    finalFactualReviewComplete: false,
    finalPrivacyReviewComplete: false
  };
}

export function assessProjectPublicationReadiness(project: DraftProject): PublicationReadiness {
  const issues: string[] = [];

  for (const key of requiredFields) {
    const field = project[key];
    if (!isCompleteField(field as VerifiedField<unknown>, key === "relatedProjectSlugs")) issues.push(`${key} is not fully verified.`);
  }

  if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(project.completedMonth.value ?? "")) {
    issues.push("completedMonth must use verified YYYY-MM format.");
  }
  if (project.photos.length < 3) issues.push("Approved before, during and completed photographs are required.");
  for (const stage of ["before", "during", "completed"] as const) {
    const photos = project.photos.filter((photo) => photo.stage === stage);
    if (photos.length === 0) {
      issues.push(`A ${stage} photograph is required.`);
      continue;
    }
    for (const photo of photos) {
      if (!isCompleteField(photo.src) || !isCompleteField(photo.alt) || !isCompleteField(photo.visiblyShows)) {
        issues.push(`Photograph ${photo.id} is not fully verified.`);
      }
      if (!photo.customerPrivacyApproved || !photo.publicationApproved || !photo.approvedAt || !photo.approvedBy) {
        issues.push(`Photograph ${photo.id} is not approved for publication.`);
      }
    }
  }
  if (!project.preciseAddressWithheld) issues.push("The precise property address must be withheld.");
  if (!project.customerIdentityWithheld) issues.push("The customer identity must be withheld.");
  if (!project.customerPublicationConsent) issues.push("Customer publication consent is required.");
  if (!project.finalFactualReviewComplete) issues.push("Final factual review is required.");
  if (!project.finalPrivacyReviewComplete) issues.push("Final privacy review is required.");

  return { ready: issues.length === 0, issues };
}

// Deliberately empty. Drafts must not be added until every field passes verification.
export const draftProjects: readonly DraftProject[] = [];