import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo/config";

export default function manifest(): MetadataRoute.Manifest {
  const icons = [siteConfig.faviconPath, siteConfig.appleIconPath]
    .filter((path): path is string => Boolean(path))
    .map((src) => ({ src }));

  return {
    name: siteConfig.name,
    short_name: siteConfig.name.slice(0, 12),
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    ...(icons.length ? { icons } : {}),
  };
}