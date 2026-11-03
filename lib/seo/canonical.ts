import { siteConfig } from "@/lib/seo/config";

export function getCanonicalUrl(path: string): string {
  const baseUrl = new URL(siteConfig.url);
  const suppliedPath = path.trim();
  const pathUrl = new URL(
    suppliedPath.startsWith("/") ? suppliedPath : `/${suppliedPath}`,
    baseUrl,
  );

  pathUrl.search = "";
  pathUrl.hash = "";
  pathUrl.pathname = pathUrl.pathname.replace(/\/+$/, "") || "/";

  return pathUrl.toString();
}