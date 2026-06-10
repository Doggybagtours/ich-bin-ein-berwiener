import { use } from "react";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import PageSection from "@/components/PageSection";
import PageShell from "@/components/PageShell";
import CommunityEventCard from "@/sections/CommunityEventCard";

type Props = {
  params: Promise<{ locale: string }>;
};

const eventKeys = ["event1", "event2", "event3", "event4"] as const;

export default function CommunityPage({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);

  const t = useTranslations("CommunityPage");

  return (
    <PageShell title={t("title")} background="alt">
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
