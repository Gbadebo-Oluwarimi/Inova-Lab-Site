import type { MetadataRoute } from "next";
import { getCanonicalUrl } from "@/lib/seo/canonical";
import { siteConfig } from "@/lib/seo/config";

export default function robots(): MetadataRoute.Robots {
  const blockCrawling = siteConfig.deploymentEnvironment !== "production";

  return {
    rules: {
      userAgent: "*",
      ...(blockCrawling ? { disallow: "/" } : { allow: "/" }),
    },
    ...(siteConfig.indexingEnabled
      ? { sitemap: getCanonicalUrl("/sitemap.xml"), host: siteConfig.url }
      : {}),
  };
}