import type { MetadataRoute } from "next";
import type { Locale } from "next-intl";
import { routing } from "@/i18n/routing";
import { buildLanguageAlternates, localizedUrlForRoute } from "@/lib/metadata";
import { publicRoutes } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return publicRoutes.flatMap((pathname) =>
    routing.locales.map((locale) => ({
      url: localizedUrlForRoute(locale as Locale, pathname),
      lastModified,
      changeFrequency: pathname === "/" ? ("weekly" as const) : ("monthly" as const),
      priority:
        pathname === "/"
          ? 1
          : pathname === "/when" || pathname === "/about"
            ? 0.9
            : 0.7,
      alternates: {
        languages: buildLanguageAlternates(pathname),
      },
    })),
  );
}
