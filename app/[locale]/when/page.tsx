import Image from "next/image";
import { use } from "react";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import PageShell from "@/components/PageShell";
import PageSection from "@/components/PageSection";

type Props = {
  params: Promise<{ locale: string }>;
};

const routeStopKeys = [
  "routeStop1",
  "routeStop2",
  "routeStop3",
  "routeStop4",
] as const;

export default function WhenPage({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);

  const t = useTranslations("WhenPage");

  return (
    <PageShell title={t("title")}>
      <PageSection title={t("dateTitle")}>
        <p className="text-xl font-semibold text-text-primary">{t("date")}</p>
        <p>{t("time")}</p>
      </PageSection>

      <PageSection title={t("routeTitle")}>
        <div className="media-placeholder media-placeholder--featured">
          <Image
            src="/images/Brandenburger Tor 2.png"
            alt={t("startLocation")}
            width={1254}
            height={1254}
            className="when-page__featured-image"
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>

        <div className="when-route">
          <div className="when-route__segment">
            <p className="when-route__label">{t("startLabel")}</p>
            <p className="when-route__primary">{t("startLocation")}</p>
            <p className="when-route__secondary">{t("startDetail")}</p>
          </div>

          <div className="when-route__segment">
            <p className="when-route__label">{t("routeLabel")}</p>
            <ol className="when-route__stops">
              {routeStopKeys.map((key) => (
                <li key={key} className="when-route__stop">
                  {t(key)}
                </li>
              ))}
            </ol>
          </div>

          <div className="when-route__segment when-route__segment--finish">
            <p className="when-route__label">{t("finishLabel")}</p>
            <p className="when-route__primary">{t("finishLocation")}</p>
            <p className="when-route__secondary">{t("finishDetail")}</p>
          </div>
        </div>
      </PageSection>

      <PageSection title={t("practicalTitle")}>
        <p>{t("practical1")}</p>
        <p>{t("practical2")}</p>
        <p>{t("practical3")}</p>
      </PageSection>
    </PageShell>
  );
}
