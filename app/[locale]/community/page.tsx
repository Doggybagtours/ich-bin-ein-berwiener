import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import JsonLd from "@/components/JsonLd";
import PageSection from "@/components/PageSection";
import PageShell from "@/components/PageShell";
import CommunityEventCard from "@/sections/CommunityEventCard";
import { buildPageStructuredData } from "@/lib/json-ld";
import { generateRouteMetadata } from "@/lib/route-metadata";

type Props = {
  params: Promise<{ locale: string }>;
};

const eventKeys = ["event1", "event2", "event3", "event4"] as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return generateRouteMetadata(locale, "community");
}

export default async function CommunityPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [t, meta] = await Promise.all([
    getTranslations("CommunityPage"),
    getTranslations({ locale, namespace: "Metadata" }),
  ]);

  const jsonLd = buildPageStructuredData(
    {
      locale,
      name: meta("communityTitle"),
      description: meta("communityDescription"),
      pathname: "/community",
    },
    [
      { name: meta("breadcrumbHome"), pathname: "/" },
      { name: t("title"), pathname: "/community" },
    ],
  );

  return (
    <PageShell title={t("title")} background="alt">
      <JsonLd data={jsonLd} />
      <p>{t("description")}</p>

      <PageSection title={t("acrossWorldTitle")} variant="flyer">
        <p>{t("acrossWorldIntro")}</p>

        <div className="community-events">
          {eventKeys.map((key) => (
            <CommunityEventCard
              key={key}
              flag={t(`${key}Flag`)}
              location={t(`${key}Location`)}
              eventName={t(`${key}Name`)}
              href={key === "event1" ? "/when" : undefined}
            />
          ))}
          <div className="community-events__future">
            <p>{t("acrossWorldFuture")}</p>
          </div>
        </div>

        <p className="community-events__note">{t("acrossWorldNote")}</p>
      </PageSection>
    </PageShell>
  );
}
