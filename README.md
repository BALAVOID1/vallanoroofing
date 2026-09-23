# Vallano Roofing website

Production-focused single-page website built with Next.js 15 App Router, React 19 and TypeScript.

## Run locally

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm test
SITE_URL=https://example.test npm run build
npm run test:e2e
```

Set the real canonical `SITE_URL` before production deployment. Production origins must use HTTPS. See `.env.example`; unverified optional URLs stay unset and are omitted from rendered content/schema.

## Content and assets

- Business data, contact links and canonical origin are centralised in `lib/site-config.ts`.
- Only supplied Vallano project photography is used. See `ASSET-REPLACEMENT.md`.
- The schema deliberately omits address, geo, email, ratings, opening hours and unverified profiles.
- Google Analytics is optional. If enabled later, obtain any consent legally required before loading it. Contact events include only event name and placement—never message text, phone numbers or postcodes.

## Deployment

Configure the preferred HTTPS host as `SITE_URL`. At the platform/DNS layer, permanently redirect HTTP and the alternate hostname to that origin while preserving paths and query strings. Next.js consistently emits clean, non-trailing-slash canonicals; campaign query strings therefore remain usable while canonicalising to `/`.

After deployment, validate the live output in Schema.org Validator and Google Rich Results Test. FAQ schema describes visible content, but no rich-result eligibility is promised. Run a mobile Lighthouse audit and submit the generated sitemap through Search Console.

## Future location pages

Do not mass-produce village doorway pages. A village page should be added only when it provides substantial unique value: verified local work, original photography, distinct useful copy and village-specific FAQs. Never infer job locations from the supplied images.