export type SearchIntent = "informational" | "navigational" | "commercial" | "transactional";

export interface KeywordMapping {
  primary: string;
  secondary?: string[];
  intent?: SearchIntent;
  targetPath?: string;
}

export interface AddressInformation {
  streetAddress?: string;
  addressLocality?: string;
  addressRegion?: string;
  postalCode?: string;
  addressCountry?: string;
}

export interface BusinessHour {
  dayOfWeek: string;
  opens: string;
  closes: string;
}

export interface BusinessCoordinates {
  latitude: number;
  longitude: number;
}

export interface BusinessInformation {
  name?: string;
  description?: string;
  category?: string;
  schemaType?: string;
  address?: AddressInformation;
  phone?: string;
  email?: string;
  hours?: BusinessHour[];
  coordinates?: BusinessCoordinates;
  serviceAreas?: string[];
  socialProfiles?: string[];
  googleMapsUrl?: string;
  logoUrl?: string;
}

export interface PageSeoMetadata {
  title: string;
  description?: string;
  path: string;
  canonical?: string;
  keywords?: string[];
  image?: string;
  noIndex?: boolean;
}

export interface ServiceInformation {
  name: string;
  description?: string;
  path: string;
  serviceType?: string;
  serviceAreas?: string[];
  keywords?: KeywordMapping;
}

export interface LocationInformation {
  name: string;
  path: string;
  description?: string;
  address?: AddressInformation;
  coordinates?: BusinessCoordinates;
  serviceAreas?: string[];
}

export interface BlogMetadata {
  title: string;
  slug: string;
  excerpt?: string;
  authorName?: string;
  publishedAt?: string;
  updatedAt?: string;
  image?: string;
  keywords?: KeywordMapping;
}

export interface ArticleMetadata extends BlogMetadata {
  description?: string;
}

export interface SeoRouteDefinition {
  path: string;
  canonical: string;
  title: string;
  description: string;
  indexable: boolean;
  lastModified?: string;
}