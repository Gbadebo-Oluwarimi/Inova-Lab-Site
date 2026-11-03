import type {
  AddressInformation,
  BusinessHour,
  BusinessInformation,
} from "@/lib/seo/types";

function optionalValue(value: string | undefined): string | undefined {
  const normalized = value?.trim();
  return normalized && !/^TODO\b/i.test(normalized) ? normalized : undefined;
}

function parseSiteUrl(value: string | undefined): URL | undefined {
  if (!value) return undefined;

  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url : undefined;
  } catch {
    return undefined;
  }
}

function parseBusinessHours(value: string | undefined): BusinessHour[] | undefined {
  if (!value) return undefined;

  try {
    const hours: unknown = JSON.parse(value);
    if (!Array.isArray(hours)) return undefined;

    const validHours = hours.filter(
      (entry): entry is BusinessHour =>
        typeof entry === "object" &&
        entry !== null &&
        typeof entry.dayOfWeek === "string" &&
        typeof entry.opens === "string" &&
        typeof entry.closes === "string",
    );

    return validHours.length > 0 ? validHours : undefined;
  } catch {
    return undefined;
  }
}

function parseCoordinates(): BusinessInformation["coordinates"] {
  const rawLatitude = optionalValue(process.env.SEO_BUSINESS_LATITUDE);
  const rawLongitude = optionalValue(process.env.SEO_BUSINESS_LONGITUDE);
  if (!rawLatitude || !rawLongitude) return undefined;

  const latitude = Number(rawLatitude);
  const longitude = Number(rawLongitude);

  return Number.isFinite(latitude) && Number.isFinite(longitude)
    ? { latitude, longitude }
    : undefined;
}

function parseAddress(): AddressInformation | undefined {
  const address: AddressInformation = {
    streetAddress: optionalValue(process.env.SEO_BUSINESS_STREET_ADDRESS),
    addressLocality: optionalValue(process.env.SEO_BUSINESS_LOCALITY),
    addressRegion: optionalValue(process.env.SEO_BUSINESS_REGION),
    postalCode: optionalValue(process.env.SEO_BUSINESS_POSTAL_CODE),
    addressCountry: optionalValue(process.env.SEO_BUSINESS_COUNTRY),
  };

  return Object.values(address).some(Boolean) ? address : undefined;
}

function parseList(value: string | undefined): string[] | undefined {
  const entries = value
    ?.split(",")
    .map((entry) => optionalValue(entry))
    .filter((entry): entry is string => Boolean(entry));

  return entries?.length ? entries : undefined;
}

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const parsedSiteUrl = parseSiteUrl(rawSiteUrl);
const isPlaceholderHost =
  !parsedSiteUrl ||
  parsedSiteUrl.hostname === "example.com" ||
  parsedSiteUrl.hostname.endsWith(".example") ||
  parsedSiteUrl.hostname.endsWith(".invalid");
const deploymentValue = process.env.SEO_DEPLOYMENT_ENV?.trim().toLowerCase();
const deploymentEnvironment =
  deploymentValue === "production" || deploymentValue === "staging"
    ? deploymentValue
    : "development";
const siteName = optionalValue(process.env.NEXT_PUBLIC_SITE_NAME);
const siteDescription = optionalValue(process.env.NEXT_PUBLIC_SITE_DESCRIPTION);

export const siteConfig = {
  url: parsedSiteUrl?.origin ?? "https://example.com",
  urlIsConfigured: Boolean(parsedSiteUrl && !isPlaceholderHost),
  name: siteName ?? "Inova",
  nameIsConfigured: Boolean(siteName),
  description:
    siteDescription ??
    "Your trusted medical laboratory and diagnostic centre in Nigeria.",
  descriptionIsConfigured: Boolean(siteDescription),
  defaultOgImage: optionalValue(process.env.NEXT_PUBLIC_DEFAULT_OG_IMAGE),
  faviconPath: optionalValue(process.env.NEXT_PUBLIC_FAVICON_PATH),
  appleIconPath: optionalValue(process.env.NEXT_PUBLIC_APPLE_ICON_PATH),
  deploymentEnvironment,
  indexingEnabled:
    process.env.NODE_ENV === "production" &&
    deploymentEnvironment === "production" &&
    Boolean(parsedSiteUrl && !isPlaceholderHost) &&
    process.env.SEO_INDEXING_ENABLED?.trim().toLowerCase() !== "false",
};

export const businessConfig: BusinessInformation = {
  name: optionalValue(process.env.SEO_BUSINESS_NAME),
  description: optionalValue(process.env.SEO_BUSINESS_DESCRIPTION),
  category: optionalValue(process.env.SEO_BUSINESS_CATEGORY),
  schemaType: optionalValue(process.env.SEO_ORGANIZATION_SCHEMA_TYPE),
  address: parseAddress(),
  phone: optionalValue(process.env.SEO_BUSINESS_PHONE),
  email: optionalValue(process.env.SEO_BUSINESS_EMAIL),
  hours: parseBusinessHours(optionalValue(process.env.SEO_BUSINESS_HOURS_JSON)),
  coordinates: parseCoordinates(),
  serviceAreas: parseList(process.env.SEO_SERVICE_AREAS),
  socialProfiles: parseList(process.env.SEO_SOCIAL_PROFILES),
  googleMapsUrl: optionalValue(process.env.SEO_GOOGLE_MAPS_URL),
  logoUrl: optionalValue(process.env.SEO_BUSINESS_LOGO_URL),
};