import type { Locale } from "next-intl";
import {
  eventEndDate,
  eventLocation,
  eventRoute,
  eventSchemaId,
  eventStartDate,
  organizationLogoPath,
  organizationSchemaId,
  organizer,
  siteName,
  siteUrl,
  websiteSchemaId,
} from "@/lib/site";
import { localizedUrlForRoute, openGraphImageUrl } from "@/lib/metadata";

type LocaleParam = Locale | string;

type BreadcrumbItem = {
  name: string;
  pathname: string;
};

type EventSchemaInput = {
  locale: LocaleParam;
  description: string;
  offerDescription: string;
};

type WebPageSchemaInput = {
  locale: LocaleParam;
  name: string;
  description: string;
  pathname: string;
};

export type StructuredDataGraph = {
  "@context": "https://schema.org";
  "@graph": Record<string, unknown>[];
};

function schemaImage(locale: LocaleParam) {
  return openGraphImageUrl(locale as Locale);
}

function organizationLogoUrl() {
  return `${siteUrl}${organizationLogoPath}`;
}

/** schema.org Organization — Doggy Bag Tours GmbH */
export function buildOrganizationSchema() {
  return {
    "@type": "Organization",
    "@id": organizationSchemaId(),
    name: organizer.legalName,
    url: organizer.url,
    logo: {
      "@type": "ImageObject",
      url: organizationLogoUrl(),
    },
  };
}

/** schema.org WebSite — Ich bin ein Berwiener */
export function buildWebSiteSchema(locale: LocaleParam) {
  return {
    "@type": "WebSite",
    "@id": websiteSchemaId(),
    name: siteName,
    url: localizedUrlForRoute(locale, "/"),
    inLanguage: locale === "de" ? "de-DE" : "en-GB",
    publisher: {
      "@id": organizationSchemaId(),
    },
  };
}

/** schema.org Event — Ich bin ein Berwiener */
export function buildEventSchema({
  locale,
  description,
  offerDescription,
}: EventSchemaInput) {
  return {
    "@type": "Event",
    "@id": eventSchemaId(),
    name: siteName,
    description,
    startDate: eventStartDate,
    endDate: eventEndDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    isAccessibleForFree: true,
    image: [schemaImage(locale)],
    url: localizedUrlForRoute(locale, "/"),
    location: {
      "@type": "Place",
      name: eventLocation.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: eventLocation.name,
        addressLocality: eventLocation.locality,
        addressCountry: eventLocation.country,
      },
    },
    organizer: {
      "@type": "Organization",
      "@id": organizationSchemaId(),
      name: organizer.legalName,
      url: organizer.url,
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: localizedUrlForRoute(locale, "/"),
      description: offerDescription,
    },
  };
}

/** Homepage graph: Organization + WebSite + Event */
export function buildHomeStructuredData(
  locale: LocaleParam,
  eventDescription: string,
  offerDescription: string,
): StructuredDataGraph {
  return {
    "@context": "https://schema.org",
    "@graph": [
      buildOrganizationSchema(),
      buildWebSiteSchema(locale),
      buildEventSchema({ locale, description: eventDescription, offerDescription }),
    ],
  };
}

/** When & Where page: include Event alongside page context */
export function buildWhenStructuredData(
  locale: LocaleParam,
  eventDescription: string,
  offerDescription: string,
  page: WebPageSchemaInput,
  breadcrumbs: BreadcrumbItem[],
): StructuredDataGraph {
  const eventWithRoute = `${eventDescription} Route: ${eventRoute}.`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      buildOrganizationSchema(),
      buildEventSchema({
        locale,
        description: eventWithRoute,
        offerDescription,
      }),
      buildWebPageSchema(page),
      buildBreadcrumbSchema(locale, breadcrumbs),
    ],
  };
}

/** Inner pages: WebPage + BreadcrumbList */
export function buildPageStructuredData(
  page: WebPageSchemaInput,
  breadcrumbs: BreadcrumbItem[],
): StructuredDataGraph {
  return {
    "@context": "https://schema.org",
    "@graph": [
      buildOrganizationSchema(),
      buildWebPageSchema(page),
      buildBreadcrumbSchema(page.locale, breadcrumbs),
    ],
  };
}

export function buildWebPageSchema({
  locale,
  name,
  description,
  pathname,
}: WebPageSchemaInput) {
  return {
    "@type": "WebPage",
    "@id": `${localizedUrlForRoute(locale, pathname)}#webpage`,
    name,
    description,
    url: localizedUrlForRoute(locale, pathname),
    inLanguage: locale === "de" ? "de-DE" : "en-GB",
    isPartOf: {
      "@id": websiteSchemaId(),
    },
    about: {
      "@id": eventSchemaId(),
    },
    publisher: {
      "@id": organizationSchemaId(),
    },
  };
}

export function buildBreadcrumbSchema(locale: LocaleParam, items: BreadcrumbItem[]) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${localizedUrlForRoute(locale, items.at(-1)?.pathname ?? "/")}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: localizedUrlForRoute(locale, item.pathname),
    })),
  };
}
