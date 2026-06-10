import { use } from "react";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import HomeHero from "@/sections/HomeHero";

type Props = {
  params: Promise<{ locale: string }>;
};

export default function HomePage({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);

  const t = useTranslations("HomePage");

  return (
    <div className="page-bg page-bg--white">
      <HomeHero
        firstEditionTicker={t("firstEditionTicker")}
        eventTagline={t("eventTagline")}
        subheadline={t("subheadline")}
        eventDetails={t("eventDetails")}
        freeEventLabel={t("freeEventLabel")}
        freeEventMessage={t("freeEventMessage")}
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
