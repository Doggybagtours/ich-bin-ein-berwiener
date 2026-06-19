import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import InviteChecklist from "@/components/InviteChecklist";
import JsonLd from "@/components/JsonLd";
import PageSection from "@/components/PageSection";
import PageShell from "@/components/PageShell";
import AwardCard from "@/sections/AwardCard";
import FeaturedProfileSection from "@/sections/FeaturedProfileSection";
import { buildPageStructuredData } from "@/lib/json-ld";
import { generateRouteMetadata } from "@/lib/route-metadata";

type Props = {
  params: Promise<{ locale: string }>;
};

const awardKeys = ["award1", "award2", "award3", "award4"] as const;
const inviteKeys = ["invite1", "invite2", "invite3", "invite4", "invite5"] as const;
const murphyParagraphKeys = [
  "murphyParagraph1",
  "murphyParagraph2",
  "murphyParagraph3",
  "murphyParagraph4",
] as const;
const magnusParagraphKeys = [
  "magnusParagraph1",
  "magnusParagraph2",
  "magnusParagraph3",
] as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return generateRouteMetadata(locale, "who");
}

export default async function WhoPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [t, meta] = await Promise.all([
    getTranslations("WhoPage"),
    getTranslations({ locale, namespace: "Metadata" }),
  ]);

  const jsonLd = buildPageStructuredData(
    {
      locale,
      name: meta("whoTitle"),
      description: meta("whoDescription"),
      pathname: "/who",
    },
    [
      { name: meta("breadcrumbHome"), pathname: "/" },
      { name: t("title"), pathname: "/who" },
    ],
  );

  return (
    <PageShell title={t("title")} background="alt" width="wide">
      <JsonLd data={jsonLd} />
      <FeaturedProfileSection
        id="murphy-feature-title"
        title={t("murphyTitle")}
        titleHref="/murphy"
        badge={t("murphyApproved")}
        imageSrc="/images/Murphy/WHO IS MURPHY.png"
        imageAlt={t("murphyImageAlt")}
        paragraphs={murphyParagraphKeys.map((key) => t(key))}
        imageFirst
        priority
      />

      <FeaturedProfileSection
        id="magnus-feature-title"
        title={t("magnusTitle")}
        badge={t("magnusBadge")}
        imageSrc="/images/Magnus/WHO IS MAGNUS 2.png"
        imageAlt={t("magnusImageAlt")}
        paragraphs={magnusParagraphKeys.map((key) => t(key))}
        imageFirst={false}
      />

      <PageSection title={t("joinTitle")} variant="flyer">
        <p className="text-xl font-semibold text-text-primary">{t("intro")}</p>
        <p>{t("paragraph1")}</p>
        <InviteChecklist items={inviteKeys.map((key) => t(key))} />
        <p>{t("paragraph2")}</p>
      </PageSection>

      <PageSection title={t("awardsTitle")} variant="flyer">
        <p className="text-text-primary/75">{t("awardsIntro")}</p>
        <div className="grid gap-6 sm:grid-cols-2">
          {awardKeys.map((key) => (
            <AwardCard
              key={key}
              icon={t(`${key}Icon`)}
              title={t(`${key}Title`)}
            />
          ))}
        </div>
      </PageSection>
    </PageShell>
  );
}
