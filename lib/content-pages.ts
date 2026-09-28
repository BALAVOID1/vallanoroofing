export type ContentPage = {
  slug: "roof-problem-photo-checklist" | "roof-leak-investigation" | "what-to-do-when-your-roof-leaks" | "slipped-or-missing-roof-tiles";
  title: string;
  description: string;
  published: string;
  lastModified: string;
  schemaType: "Article";
};

export const contentPages = [
  {
    slug: "roof-problem-photo-checklist",
    title: "What Photos to Send | Vallano Roofing",
    description: "A safe, practical checklist of the photos that help Jamie assess a roof problem, and what never to do. Send them by WhatsApp with your postcode.",
    published: "2026-09-28",
    lastModified: "2026-09-28",
    schemaType: "Article"
  },
  {
    slug: "roof-leak-investigation",
    title: "Roof Leak Investigation | Vallano Roofing",
    description: "How a roof leak is traced: why the stain isn't always below the entry point, what weather and timing tell us, and what photos can and can't show.",
    published: "2026-09-28",
    lastModified: "2026-09-28",
    schemaType: "Article"
  },
  {
    slug: "what-to-do-when-your-roof-leaks",
    title: "What to Do When Your Roof Leaks | Vallano Roofing",
    description: "Immediate, practical steps when a roof leaks: stay safe, limit internal damage, record what happened and send useful details for an initial review.",
    published: "2026-09-28",
    lastModified: "2026-09-28",
    schemaType: "Article"
  },
  {
    slug: "slipped-or-missing-roof-tiles",
    title: "Slipped or Missing Roof Tiles | Vallano Roofing",
    description: "What slipped or missing roof tiles can mean, warning signs to look for safely, when repair is needed and which photographs help with an initial review.",
    published: "2026-09-28",
    lastModified: "2026-09-28",
    schemaType: "Article"
  }
] as const satisfies readonly ContentPage[];

export function getContentPage(slug: ContentPage["slug"]): ContentPage {
  const page = contentPages.find((entry) => entry.slug === slug);
  if (!page) throw new Error(`Unknown content page: ${slug}`);
  return page;
}

export function contentPagePath(page: ContentPage): `/${ContentPage["slug"]}` {
  return `/${page.slug}`;
}