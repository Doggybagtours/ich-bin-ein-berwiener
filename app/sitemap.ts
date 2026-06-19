import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { localizedAbsoluteUrl, publicRoutes } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return publicRoutes.flatMap((pathname) =>
    routing.locales.map((locale) => ({
      url: localizedAbsoluteUrl(locale, pathname),
      lastModified,
      changeFrequency: pathname === "/" ? ("weekly" as const) : ("monthly" as const),
      priority:
        pathname === "/"
          ? 1
          : pathname === "/when" || pathname === "/about"
            ? 0.9
            : 0.7,
    })),
  );
}
