export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ichbineinberwiener.com";

export const siteLocales = ["de", "en"] as const;

export type SiteLocale = (typeof siteLocales)[number];

export function normalizeSiteUrl(url: string = siteUrl): string {
  return url.replace(/\/$/, "");
}

/** Locale-prefixed pathname, e.g. `/de/about`. Safe for sitemap generation without request context. */
export function localizedPathname(locale: SiteLocale | string, pathname: string): string {
  return pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;
}

/** Absolute URL for a locale + pathname. */
export function localizedAbsoluteUrl(locale: SiteLocale | string, pathname: string): string {
  return `${normalizeSiteUrl()}${localizedPathname(locale, pathname)}`;
}

export const siteName = "Ich bin ein Berwiener";

export const ogImagePath = "/favicon/android-chrome-512x512.png";

export const ogImageWidth = 1200;
export const ogImageHeight = 630;

export const organizationLogoPath = "/images/doggy bag tours/logo.png";

/** ISO 8601 — Sunday 21 June 2026, 12:30 Berlin time */
export const eventStartDate = "2026-06-21T12:30:00+02:00";

/** Approximate end of the walk for Event schema */
export const eventEndDate = "2026-06-21T15:30:00+02:00";

export const organizer = {
  legalName: "Doggy Bag Tours GmbH",
  name: "Doggy Bag Tours GmbH",
  url: "https://doggybagtours.com",
} as const;

export const eventRoute =
  "Brandenburger Tor → Unter den Linden → Museumsinsel";

export const eventLocation = {
  name: "Pariser Platz",
  locality: "Berlin",
  country: "DE",
} as const;

/** Public routes included in sitemap and SEO. */
export const publicRoutes = [
  "/",
  "/about",
  "/when",
  "/who",
  "/doggybagtours",
  "/community",
  "/shop",
  "/murphy",
] as const;

export type PublicRoute = (typeof publicRoutes)[number];

export function organizationSchemaId() {
  return `${siteUrl}/#organization`;
}

export function websiteSchemaId() {
  return `${siteUrl}/#website`;
}

export function eventSchemaId() {
  return `${siteUrl}/#event`;
}
