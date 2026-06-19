import type { Metadata } from "next";
import type { Locale } from "next-intl";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { ogImageHeight, ogImageWidth, siteName, siteUrl } from "@/lib/site";

const HREFLANG_TAGS: Record<Locale, string> = {
  de: "de-DE",
  en: "en-GB",
};

const productionRobots: Metadata["robots"] = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
};

type PageMetadataOptions = {
  locale: Locale;
  pathname: string;
  title: string;
  description: string;
  openGraphTitle?: string;
  openGraphDescription?: string;
  keywords?: string[];
  absoluteTitle?: boolean;
};

function localizedUrl(locale: Locale, pathname: string) {
  const path = getPathname({ locale, href: pathname });
  return `${siteUrl}${path}`;
}

export function openGraphImageUrl(locale: Locale | string) {
  const localeRoot = getPathname({ locale: locale as Locale, href: "/" });
  return `${siteUrl}${localeRoot}/opengraph-image`;
}

export function buildLanguageAlternates(pathname: string) {
  const languages = Object.fromEntries(
    routing.locales.map((locale) => [
      HREFLANG_TAGS[locale],
      localizedUrl(locale, pathname),
    ]),
  ) as Record<string, string>;

  languages["x-default"] = localizedUrl(routing.defaultLocale, pathname);

  return languages;
}

export function createPageMetadata({
  locale,
  pathname,
  title,
  description,
  openGraphTitle,
  openGraphDescription,
  keywords,
  absoluteTitle = false,
}: PageMetadataOptions): Metadata {
  const canonical = localizedUrl(locale, pathname);
  const ogImage = openGraphImageUrl(locale);
  const openGraphLocale = locale === "de" ? "de_DE" : "en_GB";
  const alternateOpenGraphLocale = locale === "de" ? ["en_GB"] : ["de_DE"];
  const ogTitle = openGraphTitle ?? title;
  const ogDescription = openGraphDescription ?? description;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    ...(keywords?.length ? { keywords } : {}),
    robots: productionRobots,
    alternates: {
      canonical,
      languages: buildLanguageAlternates(pathname),
    },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: canonical,
      siteName,
      locale: openGraphLocale,
      alternateLocale: alternateOpenGraphLocale,
      type: "website",
      images: [
        {
          url: ogImage,
          width: ogImageWidth,
          height: ogImageHeight,
          alt: siteName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: [ogImage],
    },
  };
}

export function localizedUrlForRoute(locale: Locale, pathname: string) {
  return localizedUrl(locale, pathname);
}

export function parseKeywords(raw: string) {
  return raw.split(",").map((keyword) => keyword.trim()).filter(Boolean);
}
