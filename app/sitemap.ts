import type { MetadataRoute } from "next";
import seoRoutes from "@/config/seo-routes.json";
import { getCanonicalUrl } from "@/lib/seo/canonical";
import { siteConfig } from "@/lib/seo/config";
import type { SeoRouteDefinition } from "@/lib/seo/types";

const routes = seoRoutes as SeoRouteDefinition[];

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteConfig.indexingEnabled) return [];

  return routes
    .filter((route) => route.indexable)
    .map((route) => ({
      url: getCanonicalUrl(route.canonical),
      ...(route.lastModified ? { lastModified: route.lastModified } : {}),
    }));
}