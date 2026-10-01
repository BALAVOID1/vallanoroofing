# Vallano Roofing website

Production-focused local roofing website built with Next.js 15 App Router, React 19 and TypeScript.

## Public website

The production build contains 15 public, indexable content pages:

- Homepage: `/`
- Seven service pages:
  - `/slate-roof-repairs`
  - `/chimney-flashing-repairs`
  - `/leadwork-repairs`
  - `/storm-damage-roof-repairs`
  - `/roof-valley-repairs`
  - `/tile-roof-repairs`
  - `/flat-roof-repairs`
- Three priority-area pages:
  - `/roof-repairs/christleton`
  - `/roof-repairs/rowton`
  - `/roof-repairs/waverton`
- Four evergreen roofing-information pages:
  - `/roof-problem-photo-checklist`
  - `/roof-leak-investigation`
  - `/what-to-do-when-your-roof-leaks`
  - `/slipped-or-missing-roof-tiles`

Next.js also generates technical routes for `robots.txt`, `sitemap.xml`, the web manifest, icons and the Open Graph image.

## Run and validate locally

```bash
npm install
npm run dev
npm run lint
npm run build
npm run typecheck
npm test
npm run test:e2e
git diff --check
```

Run the production build before `typecheck` when `.next/types` has not yet been generated or has been removed.

## Canonical and metadata policy

- The canonical production origin is fixed in `lib/site-config.ts` as `https://vallanoroofing.co.uk`.
- Public pages emit clean, non-trailing-slash canonical URLs.
- Service, location and roofing-information pages have unique metadata and structured data.
- `app/sitemap.ts` includes all 14 public content pages.
- `app/robots.ts` allows crawling and identifies the canonical sitemap and host.

At the platform and DNS layers, permanently redirect HTTP and the alternate `www` hostname to the canonical non-www HTTPS origin while preserving paths and query strings.

## Content and structured data

- Business data and contact targets are centralised in `lib/site-config.ts`.
- Service-page data is maintained in `lib/service-pages.ts`.
- Location-page data is maintained in `lib/locations.ts`.
- Roofing-information metadata and dates are maintained in `lib/content-pages.ts`.
- JSON-LD uses the consistent business ID `https://vallanoroofing.co.uk/#business` and appropriate `RoofingContractor`, `Service`, `Article`, `BreadcrumbList`, `WebPage`, `FAQPage` and related entities.
- The schema deliberately omits an unverified address, geo coordinates, email address, ratings and opening hours.
- Only supplied Vallano project photography is used. See `ASSET-REPLACEMENT.md`.

## Private and unpublished frameworks

- `lib/projects.ts` is a fail-closed typed framework for future verified project records. Its project collection is empty and it is not imported by a public route or the sitemap.
- `docs/PROJECT-PAGE-DRAFT-TEMPLATE.md` is an internal drafting template, not a website route. It must contain no customer address or other private customer data.
- `lib/ai-knowledge.ts` is a fail-closed contract for a future private assistant knowledge base. Its approved knowledge collection is empty and it is not imported by a public route or the sitemap.
- `.private/` is gitignored. Private source CSV files, conflict reports, review registers, customer information and evidence records must remain there or in another approved private system and must never enter the public website build.

## Analytics and privacy

Google Analytics configuration is optional. If analytics is enabled, obtain any consent legally required before loading it. Contact events are designed to include only the event name and CTA placement—never names, message text, telephone numbers, full addresses or postcodes.

## Deployment checks

Before committing or deploying:

1. Run lint, production build, TypeScript, unit tests, Playwright tests and `git diff --check`.
2. Confirm all 14 public routes appear in the generated build and sitemap.
3. Confirm rendered canonicals use `https://vallanoroofing.co.uk`.
4. Confirm `.private/` remains ignored and no private project or AI-knowledge source is present in generated output.
5. Review the complete working-tree diff and untracked-file list.

After deployment, verify the live canonical redirects, all public routes, `robots.txt` and `sitemap.xml`. Validate structured data using Schema.org Validator and Google Rich Results Test, run a mobile Lighthouse audit and submit the sitemap through Google Search Console and Bing Webmaster Tools.

## Future location and project pages

Do not mass-produce village doorway pages. Add a location or project page only when it provides substantial verified value such as genuine local work, approved original photography, distinct useful copy and relevant FAQs. Never infer a job location from an image, and never publish a customer’s identity or precise property address.