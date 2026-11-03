# SEO Foundation Setup

This project contains technical SEO infrastructure only. It has no designed pages, business copy, location pages, or client-specific structured data. The root route is an intentionally blank, noindex App Router placeholder so the project remains buildable while website development is pending.

## Configuration Files

- `lib/seo/config.ts` centralizes the production origin, site name and description, deployment/indexing state, icon paths, and optional business profile.
- `.env.example` lists the environment variables. Copy it to `.env.local` for local work, then replace the TODO/example values with client-approved facts.
- `lib/seo/metadata.ts` builds default metadata and page-level metadata using the Next.js Metadata API. It sets `metadataBase`, title defaults/templates, descriptions, canonicals, robots rules, Open Graph, Twitter cards, and optional icons/social images.
- `lib/seo/canonical.ts` creates same-origin absolute canonical URLs, removes query strings/fragments, and normalizes trailing slashes.
- `config/seo-routes.json` is the indexable-route registry used by `app/sitemap.ts` and the validator. It is empty until real pages exist.
- `app/robots.ts` allows production crawling and points to the sitemap when indexing is enabled. Development and staging disallow crawling; non-production metadata is also noindex.
- `app/manifest.ts` prepares a web manifest and only advertises icons when icon paths are configured.
- `lib/seo/types.ts` contains page SEO, keyword mapping, service, location, business, blog, and article types.
- `lib/seo/structured-data.ts` provides Organization, LocalBusiness, WebSite, WebPage, BreadcrumbList, Service, Article, and Place generators. Generators omit unavailable fields and return `null` when the required real business/site details are missing.
- `components/seo/json-ld.tsx` is a reusable Server Component that safely serializes JSON-LD.
- `next.config.ts` preserves the generated Next.js cache-component settings, enables compression, disables the powered-by header, configures AVIF/WebP image output, sets `trailingSlash: false`, and adds conservative security headers. HSTS is sent only in production.
- `scripts/validate-seo.mjs` performs local route-registry/config checks and can optionally check a deployed site's robots.txt, sitemap, metadata, JSON-LD, and internal links.

No analytics IDs, social profiles, business addresses, hours, phone numbers, coordinates, ratings, or reviews have been invented. The existing `inova-comps/` assets are left unchanged and are not assumed to be approved brand or social-sharing images.

## Production Domain and Indexing

Set these deployment variables:

```env
NEXT_PUBLIC_SITE_URL=https://www.your-real-domain.example
NEXT_PUBLIC_SITE_NAME=Client-approved business or website name
NEXT_PUBLIC_SITE_DESCRIPTION=Accurate, client-approved website description
SEO_DEPLOYMENT_ENV=production
SEO_INDEXING_ENABLED=true
```

Replace the example hostname with the canonical HTTPS origin. Do not include a path, query, or trailing slash. With a placeholder or invalid domain, the global metadata stays noindex and the sitemap remains empty. Production `robots.txt` still allows crawling so valid production pages are not accidentally blocked. Set `SEO_DEPLOYMENT_ENV=staging` on preview/staging deployments; staging is noindex and disallowed in robots.txt. Local development defaults to the same safeguards.

`SEO_INDEXING_ENABLED=false` is an explicit production noindex override. Do not set it to `false` on the public production deployment after launch.

The framework's generated root route currently returns `null`, sets noindex, and is omitted from the sitemap. Keep it that way until a real page is approved; replace it during later website development.

## Business Information

Enter verified values in the environment, not in the structured-data generators. Optional fields include business name/description/category, phone/email, address components, latitude/longitude, opening-hours JSON, comma-separated service areas and social profile URLs, Google Maps URL, and an approved logo URL. Leave a field blank when the client has not supplied it.

`SEO_BUSINESS_HOURS_JSON` accepts an array such as:

```json
[{"dayOfWeek":"Monday","opens":"09:00","closes":"17:00"}]
```

The LocalBusiness generator does not emit an address, geo coordinates, opening hours, or social profiles unless those values are present. It does not create ratings or reviews. The category value is stored for future content/schema decisions; it is not guessed into a schema type.

## Page Metadata

Keep route files as Server Components and export page metadata through the helper:

```tsx
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Client-approved page title",
  description: "A unique, factual description of this page.",
  path: "/approved-route",
  keywords: ["client-approved topic"],
});
```

The canonical is derived from `path` unless `canonical` is deliberately supplied. Set `noIndex: true` for private, utility, duplicate, or pre-launch pages. Add only indexable, published routes to `config/seo-routes.json`, with their canonical URL, unique title/description, and `indexable: true`; do not include redirects, query variants, or noindex routes.

Example registry entry (replace with an actual route when it exists):

```json
[
  {
    "path": "/approved-route",
    "canonical": "/approved-route",
    "title": "Client-approved page title",
    "description": "A unique, factual description of this page.",
    "indexable": true
  }
]
```

## Structured Data

Import the relevant generator and pass its result to `JsonLd` in the future page or layout that owns that entity. For example, use `generateBreadcrumbJsonLd([{ name, path }, ...])` for a visible breadcrumb trail and `generateServiceJsonLd(service)` only for a real service page. The root layout already renders Organization and WebSite JSON-LD when enough real configuration exists; both generators return `null` while their required details are missing. Article dates, author, image, and publisher must come from the actual article record.

Use the Schema.org validator and Google's Rich Results Test after deploying real content. A syntactically valid JSON-LD block does not guarantee a rich result.

## Icons and Social Sharing

Provide approved assets in the future and set `NEXT_PUBLIC_FAVICON_PATH`, `NEXT_PUBLIC_APPLE_ICON_PATH`, and `NEXT_PUBLIC_DEFAULT_OG_IMAGE` to their public paths (for example `/favicon.ico`, `/apple-icon.png`, `/og-image.jpg`). These are intentionally blank by default; no placeholder image is served or referenced. The OG image should be a real, representative brand image with appropriate dimensions and alt/ownership approval.

## Sitemap and Search Console

`app/sitemap.ts` generates `/sitemap.xml` from the indexable entries in `config/seo-routes.json`. Add a route only after it exists, returns successfully, has unique metadata, and is intended for search. The sitemap is empty until then. After deployment, open `https://your-real-domain/sitemap.xml`, confirm it contains only canonical production URLs, then add/verify the domain in Google Search Console and submit `/sitemap.xml` under **Sitemaps**. Also inspect important URLs with URL Inspection and monitor indexing/Coverage reports. Do not submit a staging sitemap.

## Google Analytics

Create a GA4 property and web data stream in the client's Google Analytics account, then record the measurement ID in the deployment secret/configuration system. Implement the official Google tag through an approved analytics integration during website development, with the client's consent-management and privacy requirements. No tracking script is installed by this SEO-only foundation. Verify events in GA4 Realtime/DebugView after deployment and ensure the production and staging environments are distinguished.

## Validation Before Deployment

Run the local checks and production build:

```sh
npm run seo:validate
npm run lint
npm run build
```

Local validation checks the SEO route registry for missing/duplicate titles, paths, and canonicals. The empty registry and skipped live checks are expected before pages are added. To make missing deployment values blocking, set the real values and run:

```sh
SEO_VALIDATE_PRODUCTION=true SEO_DEPLOYMENT_ENV=production NEXT_PUBLIC_SITE_URL=https://your-real-domain.example NEXT_PUBLIC_SITE_NAME="Approved name" NEXT_PUBLIC_SITE_DESCRIPTION="Approved description" npm run seo:validate
```

After deploying or starting the production server, validate live endpoints and generated pages:

```sh
SEO_CHECK_URL=https://your-real-domain.example npm run seo:validate
```

The live mode checks robots.txt/sitemap.xml availability and XML locations, then checks sitemap pages for title, description, canonical, parseable JSON-LD, duplicate title/canonical values, and broken internal anchor links. When real pages exist, also run an external crawler and validate redirects, image responses/alt text, and links not discoverable from sitemap pages. Search Console and Schema.org validation remain external checks.

## Performance and Routing Notes

The project keeps the generated Next.js 16 cache-component/partial-prefetching defaults and relies on Next.js production build optimizations. Use `next/image` for future page images; AVIF and WebP output are configured, and no remote hosts are allowlisted until an image provider is selected. Use `next/font` (local or Google) when a real typeface is chosen; no font or visual design has been selected here.

Compression is enabled. No custom cache lifetimes or redirects are added without content and hosting requirements. `trailingSlash: false` is the canonical route convention; add explicit permanent redirects only when real legacy URLs are known. Review CSP, Permissions-Policy, HSTS subdomain policy, and any iframe requirements with the hosting/security owner before tightening them.