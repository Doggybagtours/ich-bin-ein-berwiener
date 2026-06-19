import type { Metadata } from "next";
import type { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { createPageMetadata, parseKeywords } from "@/lib/metadata";
import type { PublicRoute } from "@/lib/site";

type RouteKey =
  | "home"
  | "about"
  | "when"
  | "who"
  | "doggyBagTours"
  | "community"
  | "shop"
  | "murphy";

const routeConfig: Record<
  RouteKey,
  { pathname: PublicRoute; prefix: string; absoluteTitle?: boolean }
> = {
  home: { pathname: "/", prefix: "home", absoluteTitle: true },
  about: { pathname: "/about", prefix: "about" },
  when: { pathname: "/when", prefix: "when" },
  who: { pathname: "/who", prefix: "who" },
  doggyBagTours: { pathname: "/doggybagtours", prefix: "doggyBagTours" },
  community: { pathname: "/community", prefix: "community" },
  shop: { pathname: "/shop", prefix: "shop" },
  murphy: { pathname: "/murphy", prefix: "murphy" },
};

export async function generateRouteMetadata(
  locale: string,
  route: RouteKey,
): Promise<Metadata> {
  const { pathname, prefix, absoluteTitle } = routeConfig[route];
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return createPageMetadata({
    locale: locale as Locale,
    pathname,
    title: t(`${prefix}Title`),
    description: t(`${prefix}Description`),
    openGraphTitle: t(`${prefix}OgTitle`),
    openGraphDescription: t(`${prefix}OgDescription`),
    keywords: parseKeywords(t(`${prefix}Keywords`)),
    absoluteTitle,
  });
}
