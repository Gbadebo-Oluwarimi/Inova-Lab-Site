import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/seo/canonical";
import { siteConfig } from "@/lib/seo/config";
import type { PageSeoMetadata } from "@/lib/seo/types";

export const defaultRobots: Metadata["robots"] = {
  index: siteConfig.indexingEnabled,
  follow: siteConfig.indexingEnabled,
  googleBot: {
    index: siteConfig.indexingEnabled,
    follow: siteConfig.indexingEnabled,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
};

export const noIndexMetadata: Metadata = {
  robots: {
    index: false,
    follow: true,
    googleBot: { index: false, follow: true },
  },
};

function getSocialImage(image?: string): string | undefined {
  const selectedImage = image ?? siteConfig.defaultOgImage;
  if (!selectedImage) return undefined;

  try {
    return new URL(selectedImage, siteConfig.url).toString();
  } catch {
    return undefined;
  }
}

export function createPageMetadata(page: PageSeoMetadata): Metadata {
  const canonical = getCanonicalUrl(page.canonical ?? page.path);
  const description = page.description ?? siteConfig.description;
  const image = getSocialImage(page.image);
  const robots = page.noIndex ? noIndexMetadata.robots : defaultRobots;

  return {
    title: page.title,
    description,
    keywords: page.keywords,
    alternates: { canonical },
    robots,
    openGraph: {
      type: "website",
      title: page.title,
      description,
      url: canonical,
      ...(image ? { images: [image] } : {}),
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title: page.title,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}

export function createDefaultMetadata(): Metadata {
  const image = getSocialImage();

  return {
    metadataBase: new URL(siteConfig.url),
    applicationName: siteConfig.name,
    title: {
      default: siteConfig.name,
      template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    alternates: { canonical: getCanonicalUrl("/") },
    robots: defaultRobots,
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title: siteConfig.name,
      description: siteConfig.description,
      url: getCanonicalUrl("/"),
      ...(image ? { images: [image] } : {}),
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title: siteConfig.name,
      description: siteConfig.description,
      ...(image ? { images: [image] } : {}),
    },
    icons: {
      icon: siteConfig.faviconPath,
      apple: siteConfig.appleIconPath,
    },
  };
}