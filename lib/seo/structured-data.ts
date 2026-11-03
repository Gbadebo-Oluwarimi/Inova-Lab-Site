import { businessConfig, siteConfig } from "@/lib/seo/config";
import { getCanonicalUrl } from "@/lib/seo/canonical";
import type {
  AddressInformation,
  ArticleMetadata,
  BusinessInformation,
  LocationInformation,
  ServiceInformation,
} from "@/lib/seo/types";

export type JsonLdObject = Record<string, unknown>;

function toPostalAddress(address: AddressInformation): JsonLdObject {
  return {
    "@type": "PostalAddress",
    streetAddress: address.streetAddress,
    addressLocality: address.addressLocality,
    addressRegion: address.addressRegion,
    postalCode: address.postalCode,
    addressCountry: address.addressCountry,
  };
}

function toOpeningHours(hours: NonNullable<BusinessInformation["hours"]>) {
  return hours.map((entry) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: entry.dayOfWeek,
    opens: entry.opens,
    closes: entry.closes,
  }));
}

export function generateOrganizationJsonLd(
  business: BusinessInformation = businessConfig,
): JsonLdObject | null {
  if (!business.name || !siteConfig.urlIsConfigured) return null;

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: business.name,
    description: business.description,
    url: siteConfig.url,
    email: business.email,
    telephone: business.phone,
    logo: business.logoUrl,
    sameAs: business.socialProfiles?.length ? business.socialProfiles : undefined,
    address: business.address ? toPostalAddress(business.address) : undefined,
    areaServed: business.serviceAreas,
  };
}

export function generateLocalBusinessJsonLd(
  business: BusinessInformation = businessConfig,
): JsonLdObject | null {
  if (!business.name || !siteConfig.urlIsConfigured) return null;

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.name,
    description: business.description,
    url: siteConfig.url,
    telephone: business.phone,
    email: business.email,
    address: business.address ? toPostalAddress(business.address) : undefined,
    geo: business.coordinates
      ? {
          "@type": "GeoCoordinates",
          latitude: business.coordinates.latitude,
          longitude: business.coordinates.longitude,
        }
      : undefined,
    openingHoursSpecification: business.hours?.length
      ? toOpeningHours(business.hours)
      : undefined,
    areaServed: business.serviceAreas,
    sameAs: business.socialProfiles?.length ? business.socialProfiles : undefined,
    hasMap: business.googleMapsUrl,
  };
}

export function generateWebsiteJsonLd(): JsonLdObject | null {
  if (!siteConfig.nameIsConfigured || !siteConfig.urlIsConfigured) return null;

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    publisher: businessConfig.name
      ? { "@id": `${siteConfig.url}/#organization` }
      : undefined,
  };
}

export function generateWebPageJsonLd(input: {
  title: string;
  path: string;
  description?: string;
}): JsonLdObject | null {
  if (!siteConfig.urlIsConfigured) return null;

  const canonical = getCanonicalUrl(input.path);
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: input.title,
    description: input.description,
    url: canonical,
    isPartOf: siteConfig.nameIsConfigured
      ? { "@id": `${siteConfig.url}/#website` }
      : undefined,
  };
}

export function generateBreadcrumbJsonLd(
  items: Array<{ name: string; path: string }>,
): JsonLdObject | null {
  const validItems = items.filter((item) => item.name.trim() && item.path.trim());
  if (!siteConfig.urlIsConfigured || validItems.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: validItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: getCanonicalUrl(item.path),
    })),
  };
}

export function generateServiceJsonLd(
  service: ServiceInformation,
): JsonLdObject | null {
  if (!service.name.trim() || !siteConfig.urlIsConfigured) return null;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    serviceType: service.serviceType,
    url: getCanonicalUrl(service.path),
    provider: businessConfig.name
      ? { "@id": `${siteConfig.url}/#organization` }
      : undefined,
    areaServed: service.serviceAreas,
  };
}

export function generateArticleJsonLd(
  article: ArticleMetadata,
): JsonLdObject | null {
  if (!article.title.trim() || !siteConfig.urlIsConfigured) return null;

  const canonical = getCanonicalUrl(`/${article.slug.replace(/^\/+/, "")}`);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description ?? article.excerpt,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    image: article.image,
    author: article.authorName
      ? { "@type": "Person", name: article.authorName }
      : undefined,
    publisher: businessConfig.name
      ? { "@id": `${siteConfig.url}/#organization` }
      : undefined,
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
  };
}

export function generateLocationJsonLd(
  location: LocationInformation,
): JsonLdObject | null {
  if (!location.name.trim() || !siteConfig.urlIsConfigured) return null;

  return {
    "@context": "https://schema.org",
    "@type": "Place",
    name: location.name,
    description: location.description,
    url: getCanonicalUrl(location.path),
    address: location.address ? toPostalAddress(location.address) : undefined,
    geo: location.coordinates
      ? {
          "@type": "GeoCoordinates",
          latitude: location.coordinates.latitude,
          longitude: location.coordinates.longitude,
        }
      : undefined,
  };
}