import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const projectRoot = process.cwd();
const errors = [];
const warnings = [];

function reportError(message) {
  errors.push(message);
  console.error(`ERROR: ${message}`);
}

function reportWarning(message) {
  warnings.push(message);
  console.warn(`WARN: ${message}`);
}

async function readProjectFile(path) {
  try {
    return await readFile(resolve(projectRoot, path), "utf8");
  } catch {
    reportError(`Required file not found: ${path}`);
    return "";
  }
}

const requiredFiles = [
  "app/layout.tsx",
  "app/robots.ts",
  "app/sitemap.ts",
  "app/manifest.ts",
  "lib/seo/config.ts",
  "lib/seo/canonical.ts",
  "lib/seo/metadata.ts",
  "lib/seo/structured-data.ts",
  "components/seo/json-ld.tsx",
  "config/seo-routes.json",
];

for (const path of requiredFiles) await readProjectFile(path);

const routesSource = await readProjectFile("config/seo-routes.json");
let routes = [];

try {
  routes = JSON.parse(routesSource);
  if (!Array.isArray(routes)) throw new TypeError("Route registry must be an array");
} catch (error) {
  reportError(`Invalid route registry: ${error.message}`);
}

const paths = new Set();
const canonicals = new Set();
const titles = new Set();
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

for (const [index, route] of routes.entries()) {
  const label = `Route entry ${index + 1}`;
  for (const field of ["path", "canonical", "title", "description"]) {
    if (typeof route?.[field] !== "string" || !route[field].trim()) {
      reportError(`${label} is missing ${field}`);
    }
  }

  if (typeof route?.path === "string") {
    if (!route.path.startsWith("/") || route.path.includes("?")) {
      reportError(`${label} path must be a clean absolute path beginning with /`);
    }
    if (paths.has(route.path)) reportError(`Duplicate route path: ${route.path}`);
    paths.add(route.path);
  }

  if (typeof route?.canonical === "string" && route.canonical.trim()) {
    if (canonicals.has(route.canonical)) {
      reportError(`Duplicate canonical URL: ${route.canonical}`);
    }
    canonicals.add(route.canonical);
  }

  if (typeof route?.title === "string" && route.title.trim()) {
    const normalizedTitle = route.title.trim().toLowerCase();
    if (titles.has(normalizedTitle)) reportError(`Duplicate metadata title: ${route.title}`);
    titles.add(normalizedTitle);
  }

  if (route?.indexable !== undefined && typeof route.indexable !== "boolean") {
    reportError(`${label} indexable must be a boolean when supplied`);
  }
}

if (routes.filter((route) => route?.indexable).length === 0) {
  reportWarning("No indexable routes are registered; sitemap.xml will be empty.");
}

const layoutSource = await readProjectFile("app/layout.tsx");
if (!/export\s+const\s+metadata\b/.test(layoutSource)) {
  reportError("app/layout.tsx must export the default Metadata API configuration");
}

const productionValidation = process.env.SEO_VALIDATE_PRODUCTION === "true";
if (productionValidation) {
  let siteUrl;
  try {
    siteUrl = new URL(configuredSiteUrl ?? "");
  } catch {
    reportError("Set NEXT_PUBLIC_SITE_URL to the real production URL");
  }

  if (siteUrl && (siteUrl.protocol !== "https:" || /(^|\.)example\.(com|org|net)$|\.example$|\.invalid$/i.test(siteUrl.hostname))) {
    reportError("NEXT_PUBLIC_SITE_URL must be a real HTTPS production domain, not a placeholder");
  }
  if (process.env.SEO_DEPLOYMENT_ENV !== "production") {
    reportError('Set SEO_DEPLOYMENT_ENV="production" for production validation');
  }
  if (process.env.SEO_INDEXING_ENABLED === "false") {
    reportError("SEO_INDEXING_ENABLED=false prevents production indexing");
  }
  for (const [key, value] of [
    ["NEXT_PUBLIC_SITE_NAME", process.env.NEXT_PUBLIC_SITE_NAME],
    ["NEXT_PUBLIC_SITE_DESCRIPTION", process.env.NEXT_PUBLIC_SITE_DESCRIPTION],
  ]) {
    if (!value?.trim() || /^TODO\b/i.test(value.trim())) {
      reportError(`${key} must contain client-approved production information`);
    }
  }
  if (routes.filter((route) => route?.indexable).length === 0) {
    reportError("Register at least one real indexable route before production launch");
  }
}

const checkUrl = process.env.SEO_CHECK_URL?.trim();
if (checkUrl) {
  let baseUrl;
  try {
    baseUrl = new URL(checkUrl);
  } catch {
    reportError("SEO_CHECK_URL must be a valid absolute URL");
  }

  if (baseUrl) {
    const rootUrl = new URL("/", baseUrl);
    const liveRoutes = new Map([[rootUrl.href, rootUrl]]);
    const sitemapRoutes = new Set();
    for (const pathname of ["/robots.txt", "/sitemap.xml"]) {
      try {
        const response = await fetch(new URL(pathname, baseUrl));
        const body = await response.text();
        if (!response.ok) {
          reportError(`${pathname} returned HTTP ${response.status}`);
        } else if (pathname === "/robots.txt") {
          if (!/^\s*user-agent:/im.test(body)) reportError("robots.txt has no User-agent rule");
        } else if (!/<urlset\b|<sitemapindex\b/.test(body)) {
          reportError("sitemap.xml does not contain a sitemap XML root element");
        } else {
          for (const match of body.matchAll(/<loc>(.*?)<\/loc>/gs)) {
            try {
              const routeUrl = new URL(match[1].replaceAll("&amp;", "&"));
              sitemapRoutes.add(routeUrl.href);
              liveRoutes.set(routeUrl.href, routeUrl);
            } catch {
              reportError(`Invalid sitemap location: ${match[1]}`);
            }
          }
        }
      } catch (error) {
        reportError(`Could not fetch ${pathname}: ${error.message}`);
      }
    }

    const seenTitles = new Set();
    const seenCanonicals = new Set();
    const checkedLinks = new Set();
    for (const routeUrl of liveRoutes.values()) {
      if (routeUrl.origin !== baseUrl.origin) {
        reportError(`Sitemap URL is outside SEO_CHECK_URL origin: ${routeUrl}`);
        continue;
      }

      try {
        const response = await fetch(routeUrl);
        const html = await response.text();
        if (!response.ok) {
          reportError(`${routeUrl.pathname} returned HTTP ${response.status}`);
          continue;
        }

        const title = html.match(/<title[^>]*>(.*?)<\/title>/is)?.[1]?.trim();
        const description = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i)?.[1];
        const canonical = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i)?.[1];
        const robots = html.match(/<meta\s+name="robots"\s+content="([^"]*)"/i)?.[1] ?? "";
        if (!title) reportError(`${routeUrl.pathname} has no title`);
        if (!description) reportError(`${routeUrl.pathname} has no meta description`);
        if (!canonical) reportError(`${routeUrl.pathname} has no canonical link`);
        if (sitemapRoutes.has(routeUrl.href) && /\bnoindex\b/i.test(robots)) {
          reportError(`${routeUrl.pathname} is listed in the sitemap but marked noindex`);
        }
        if (routeUrl.pathname === "/" && !sitemapRoutes.has(routeUrl.href) && !/\bnoindex\b/i.test(robots)) {
          reportError("The blank root bootstrap route must remain noindex until it is replaced");
        }
        if (title && seenTitles.has(title)) reportError(`Duplicate live title: ${title}`);
        if (title) seenTitles.add(title);
        if (canonical && seenCanonicals.has(canonical)) {
          reportError(`Duplicate live canonical URL: ${canonical}`);
        }
        if (canonical) seenCanonicals.add(canonical);

        for (const match of html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)) {
          try {
            JSON.parse(match[1]);
          } catch {
            reportError(`${routeUrl.pathname} contains invalid JSON-LD`);
          }
        }

        for (const match of html.matchAll(/<a\b[^>]*\bhref=["']([^"']+)["'][^>]*>/gi)) {
          const href = match[1];
          if (/^(#|mailto:|tel:|javascript:)/i.test(href)) continue;
          const linkUrl = new URL(href, routeUrl);
          if (linkUrl.origin !== baseUrl.origin || checkedLinks.has(linkUrl.href)) continue;
          checkedLinks.add(linkUrl.href);
          let linkResponse = await fetch(linkUrl, { method: "HEAD" });
          if (linkResponse.status === 405) linkResponse = await fetch(linkUrl);
          if (!linkResponse.ok) {
            reportError(`Broken internal link ${linkUrl.pathname}: HTTP ${linkResponse.status}`);
          }
        }
      } catch (error) {
        reportError(`Could not validate ${routeUrl}: ${error.message}`);
      }
    }
  }
} else {
  reportWarning("Live robots, sitemap, metadata, JSON-LD, and link checks skipped; set SEO_CHECK_URL to run them.");
}

if (warnings.length) console.log(`SEO validation completed with ${warnings.length} warning(s).`);
if (errors.length) {
  console.error(`SEO validation failed with ${errors.length} error(s).`);
  process.exitCode = 1;
} else {
  console.log("SEO foundation checks passed.");
}