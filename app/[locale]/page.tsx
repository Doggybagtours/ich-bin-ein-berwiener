import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import JsonLd from "@/components/JsonLd";
import { buildHomeStructuredData } from "@/lib/json-ld";
import { generateRouteMetadata } from "@/lib/route-metadata";
import HomeHero from "@/sections/HomeHero";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return generateRouteMetadata(locale, "home");
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [t, structuredData] = await Promise.all([
    getTranslations("HomePage"),
    getTranslations({ locale, namespace: "StructuredData" }),
  ]);

  const jsonLd = buildHomeStructuredData(
    locale,
    structuredData("eventDescription"),
    structuredData("offerDescription"),
  );

  return (
    <div className="page-bg page-bg--white">
      <JsonLd data={jsonLd} />
      <HomeHero
        firstEditionTicker={t("firstEditionTicker")}
        eventTagline={t("eventTagline")}
        subheadline={t("subheadline")}
        intro={t("intro")}
        eventDetails={t("eventDetails")}
        freeEventLabel={t("freeEventLabel")}
        freeEventMessage={t("freeEventMessage")}
        videoAriaLabel={t("videoAriaLabel")}
        crossLinksAriaLabel={t("crossLinksAriaLabel")}
        crossLinks={[
          { href: "/about", label: t("linkAbout") },
          { href: "/when", label: t("linkWhen") },
          { href: "/who", label: t("linkWho") },
        ]}
        countdown={{
          days: t("countdownDays"),
          hours: t("countdownHours"),
          minutes: t("countdownMinutes"),
          seconds: t("countdownSeconds"),
        }}
      />
    </div>
  );
}
